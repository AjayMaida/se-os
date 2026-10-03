import uuid
from typing import Optional
from sqlalchemy import String, ForeignKey, Text, Boolean, Integer
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import JSON
from datetime import datetime
from app.shared.base_model import BaseModel

class PortfolioProject(BaseModel):
    __tablename__ = "portfolio_projects"
    
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id"))
    name: Mapped[str] = mapped_column(String(255))
    description: Mapped[str] = mapped_column(Text)
    tech_stack: Mapped[dict] = mapped_column(JSON)
    github_url: Mapped[Optional[str]] = mapped_column(String(1024))
    live_url: Mapped[Optional[str]] = mapped_column(String(1024))
    thumbnail_url: Mapped[Optional[str]] = mapped_column(String(1024))
    status: Mapped[str] = mapped_column(String(50))
    started_at: Mapped[Optional[datetime]] = mapped_column(nullable=True)
    completed_at: Mapped[Optional[datetime]] = mapped_column(nullable=True)
    is_public: Mapped[bool] = mapped_column(Boolean, default=True)

class GitHubProfile(BaseModel):
    __tablename__ = "github_profiles"
    
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id"), unique=True)
    username: Mapped[str] = mapped_column(String(255))
    access_token_encrypted: Mapped[Optional[str]] = mapped_column(Text)
    public_repos: Mapped[int] = mapped_column(Integer, default=0)
    followers: Mapped[int] = mapped_column(Integer, default=0)
    following: Mapped[int] = mapped_column(Integer, default=0)
    contributions_this_year: Mapped[int] = mapped_column(Integer, default=0)
    streak: Mapped[int] = mapped_column(Integer, default=0)
    last_synced: Mapped[Optional[datetime]] = mapped_column(nullable=True)
