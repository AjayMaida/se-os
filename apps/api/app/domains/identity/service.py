from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional, Tuple
from app.domains.identity.repository import UserRepository
from app.domains.identity.models import User, UserProfile, RefreshToken
from app.domains.identity.schemas import UserRegisterRequest, UserLoginRequest, OnboardingRequest, UpdateProfileRequest
from app.shared.security import hash_password, verify_password, create_access_token, create_refresh_token
from app.shared.events import DomainEvent, UserRegistered, OnboardingCompleted
from app.infrastructure.rabbitmq import get_publisher
import uuid
import hashlib
from datetime import datetime, timezone, timedelta

class AuthService:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.repo = UserRepository(db)
        
    async def register_user(self, req: UserRegisterRequest) -> User:
        existing_user = await self.repo.get_by_email(req.email)
        if existing_user:
            raise ValueError("Email already registered")
            
        hashed_pw = hash_password(req.password)
        new_user = User(email=req.email, hashed_password=hashed_pw)
        await self.repo.create_user(new_user)
        
        # Create profile
        profile = UserProfile(user_id=new_user.id, full_name=req.full_name)
        await self.repo.create_profile(profile)
        
        await self.db.commit()
        
        publisher = await get_publisher()
        await publisher.publish_event(UserRegistered(user_id=new_user.id, payload={"email": new_user.email}))
        return new_user
        
    async def login(self, req: UserLoginRequest) -> Tuple[str, str]:
        user = await self.repo.get_by_email(req.email)
        if not user or not user.hashed_password:
            raise ValueError("Invalid credentials")
            
        if not verify_password(req.password, user.hashed_password):
            raise ValueError("Invalid credentials")
            
        access_token = create_access_token({"sub": str(user.id)})
        refresh_token = create_refresh_token({"sub": str(user.id)})
        
        token_hash = hashlib.sha256(refresh_token.encode()).hexdigest()
        await self.repo.create_refresh_token(RefreshToken(
            user_id=user.id, 
            token_hash=token_hash, 
            expires_at=datetime.now(timezone.utc) + timedelta(days=7)
        ))
        await self.db.commit()
        return access_token, refresh_token
        
    async def google_oauth(self, token: str) -> Tuple[str, str]:
        # Dummy implementation for Google OAuth
        pass
        
    async def refresh_token(self, refresh_token: str) -> Tuple[str, str]:
        # Verify and refresh
        pass
        
    async def logout(self, user_id: uuid.UUID) -> None:
        await self.repo.revoke_all_user_tokens(user_id)
        await self.db.commit()

class UserService:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.repo = UserRepository(db)
        
    async def complete_onboarding(self, user_id: uuid.UUID, req: OnboardingRequest):
        profile = await self.repo.get_profile_by_user_id(user_id)
        if not profile:
            raise ValueError("Profile not found")
            
        profile.career_goal = req.career_goal
        profile.current_level = req.current_level
        profile.years_experience = req.years_experience
        profile.daily_study_hours = req.daily_hours
        profile.onboarding_completed = True
        
        await self.repo.update_profile(profile)
        await self.db.commit()
        
        publisher = await get_publisher()
        await publisher.publish_event(OnboardingCompleted(user_id=user_id, payload={"goal": req.career_goal}))
        
    async def get_current_user(self, user_id: uuid.UUID) -> User:
        user = await self.repo.get_by_id(user_id)
        if not user:
            raise ValueError("User not found")
        return user
        
    async def update_profile(self, user_id: uuid.UUID, req: UpdateProfileRequest):
        profile = await self.repo.get_profile_by_user_id(user_id)
        if not profile:
            raise ValueError("Profile not found")
            
        if req.full_name is not None: profile.full_name = req.full_name
        if req.bio is not None: profile.bio = req.bio
        if req.github_username is not None: profile.github_username = req.github_username
        if req.linkedin_url is not None: profile.linkedin_url = req.linkedin_url
        
        await self.repo.update_profile(profile)
        await self.db.commit()
        
    async def delete_account(self, user_id: uuid.UUID):
        await self.repo.delete_user(user_id)
        await self.db.commit()
