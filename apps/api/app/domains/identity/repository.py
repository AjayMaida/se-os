from typing import Optional, List
from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update
from app.domains.identity.models import User, UserProfile, RefreshToken
from datetime import datetime

class UserRepository:
    def __init__(self, db: AsyncSession):
        self.db = db
        
    async def create_user(self, user: User) -> User:
        self.db.add(user)
        await self.db.flush()
        return user
        
    async def get_by_id(self, user_id: UUID) -> Optional[User]:
        stmt = select(User).where(User.id == user_id, User.is_deleted == False)
        result = await self.db.execute(stmt)
        return result.scalars().first()
        
    async def get_by_email(self, email: str) -> Optional[User]:
        stmt = select(User).where(User.email == email, User.is_deleted == False)
        result = await self.db.execute(stmt)
        return result.scalars().first()
        
    async def get_by_google_id(self, google_id: str) -> Optional[User]:
        stmt = select(User).where(User.google_id == google_id, User.is_deleted == False)
        result = await self.db.execute(stmt)
        return result.scalars().first()
        
    async def update_user(self, user: User) -> User:
        self.db.add(user)
        await self.db.flush()
        return user
        
    async def delete_user(self, user_id: UUID) -> bool:
        stmt = update(User).where(User.id == user_id).values(is_deleted=True)
        await self.db.execute(stmt)
        return True
        
    async def create_profile(self, profile: UserProfile) -> UserProfile:
        self.db.add(profile)
        await self.db.flush()
        return profile
        
    async def get_profile_by_user_id(self, user_id: UUID) -> Optional[UserProfile]:
        stmt = select(UserProfile).where(UserProfile.user_id == user_id, UserProfile.is_deleted == False)
        result = await self.db.execute(stmt)
        return result.scalars().first()
        
    async def update_profile(self, profile: UserProfile) -> UserProfile:
        self.db.add(profile)
        await self.db.flush()
        return profile
        
    async def create_refresh_token(self, token: RefreshToken) -> RefreshToken:
        self.db.add(token)
        await self.db.flush()
        return token
        
    async def get_refresh_token(self, token_hash: str) -> Optional[RefreshToken]:
        stmt = select(RefreshToken).where(RefreshToken.token_hash == token_hash, RefreshToken.revoked == False)
        result = await self.db.execute(stmt)
        return result.scalars().first()
        
    async def revoke_refresh_token(self, token_hash: str) -> None:
        stmt = update(RefreshToken).where(RefreshToken.token_hash == token_hash).values(revoked=True)
        await self.db.execute(stmt)
        
    async def revoke_all_user_tokens(self, user_id: UUID) -> None:
        stmt = update(RefreshToken).where(RefreshToken.user_id == user_id).values(revoked=True)
        await self.db.execute(stmt)
