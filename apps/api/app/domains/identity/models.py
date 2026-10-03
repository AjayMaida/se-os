import uuid
from datetime import datetime
from typing import Optional, List
from sqlalchemy import String, Boolean, Enum as SQLEnum, ForeignKey, Float, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import JSON
import enum
from app.shared.base_model import BaseModel

class Role(str, enum.Enum):
    USER = "user"
    MENTOR = "mentor"
    ADMIN = "admin"

class CurrentLevel(str, enum.Enum):
    BEGINNER = "beginner"
    INTERMEDIATE = "intermediate"
    ADVANCED = "advanced"

class User(BaseModel):
    __tablename__ = "users"
    
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    hashed_password: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    is_verified: Mapped[bool] = mapped_column(Boolean, default=False)
    google_id: Mapped[Optional[str]] = mapped_column(String(255), unique=True, nullable=True)
    github_id: Mapped[Optional[str]] = mapped_column(String(255), unique=True, nullable=True)
    role: Mapped[Role] = mapped_column(SQLEnum(Role), default=Role.USER)
    
    profile: Mapped["UserProfile"] = relationship(back_populates="user", uselist=False)
    preferences: Mapped["UserPreferences"] = relationship(back_populates="user", uselist=False)
    refresh_tokens: Mapped[list["RefreshToken"]] = relationship(back_populates="user")

class UserProfile(BaseModel):
    __tablename__ = "user_profiles"
    
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), unique=True)
    full_name: Mapped[Optional[str]] = mapped_column(String(255))
    avatar_url: Mapped[Optional[str]] = mapped_column(String(1024))
    bio: Mapped[Optional[str]] = mapped_column(Text)
    github_username: Mapped[Optional[str]] = mapped_column(String(255))
    linkedin_url: Mapped[Optional[str]] = mapped_column(String(1024))
    career_goal: Mapped[Optional[str]] = mapped_column(String(255))
    current_level: Mapped[Optional[CurrentLevel]] = mapped_column(SQLEnum(CurrentLevel))
    years_experience: Mapped[Optional[float]] = mapped_column(Float, default=0.0)
    daily_study_hours: Mapped[Optional[float]] = mapped_column(Float, default=1.0)
    onboarding_completed: Mapped[bool] = mapped_column(Boolean, default=False)
    
    user: Mapped["User"] = relationship(back_populates="profile")

class UserPreferences(BaseModel):
    __tablename__ = "user_preferences"
    
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), unique=True)
    notification_email: Mapped[bool] = mapped_column(Boolean, default=True)
    notification_push: Mapped[bool] = mapped_column(Boolean, default=False)
    study_reminder_time: Mapped[Optional[str]] = mapped_column(String(5)) # HH:MM
    theme: Mapped[str] = mapped_column(String(50), default="system")
    language: Mapped[str] = mapped_column(String(50), default="en")
    
    user: Mapped["User"] = relationship(back_populates="preferences")

class RefreshToken(BaseModel):
    __tablename__ = "refresh_tokens"
    
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))
    token_hash: Mapped[str] = mapped_column(String(512), unique=True, index=True)
    expires_at: Mapped[datetime] = mapped_column()
    revoked: Mapped[bool] = mapped_column(Boolean, default=False)
    
    user: Mapped["User"] = relationship(back_populates="refresh_tokens")
