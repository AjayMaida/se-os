from pydantic import BaseModel, EmailStr, ConfigDict, Field
from typing import Optional, List
from uuid import UUID
from datetime import datetime
from .models import Role, CurrentLevel

class UserBase(BaseModel):
    email: EmailStr

class UserRegisterRequest(UserBase):
    password: str = Field(min_length=8)
    full_name: Optional[str] = None

class UserLoginRequest(BaseModel):
    email: EmailStr
    password: str

class GoogleOAuthRequest(BaseModel):
    token: str

class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    expires_in: int

class UserProfileResponse(BaseModel):
    id: UUID
    full_name: Optional[str]
    avatar_url: Optional[str]
    bio: Optional[str]
    github_username: Optional[str]
    linkedin_url: Optional[str]
    career_goal: Optional[str]
    current_level: Optional[CurrentLevel]
    years_experience: Optional[float]
    daily_study_hours: Optional[float]
    onboarding_completed: bool

    model_config = ConfigDict(from_attributes=True)

class UserResponse(UserBase):
    id: UUID
    is_active: bool
    is_verified: bool
    role: Role
    created_at: datetime
    profile: Optional[UserProfileResponse] = None

    model_config = ConfigDict(from_attributes=True)

class OnboardingRequest(BaseModel):
    career_goal: str
    timeline_months: int
    current_level: CurrentLevel
    years_experience: float
    skills: List[str]
    daily_hours: float
    preferred_study_time: str

class UpdateProfileRequest(BaseModel):
    full_name: Optional[str] = None
    bio: Optional[str] = None
    github_username: Optional[str] = None
    linkedin_url: Optional[str] = None
