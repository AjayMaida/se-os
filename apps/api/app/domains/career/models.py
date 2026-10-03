import uuid
from typing import Optional, List
from sqlalchemy import String, Enum as SQLEnum, ForeignKey, Float, Text, Integer, Boolean, DateTime
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import JSON
import enum
from datetime import datetime
from app.shared.base_model import BaseModel

class JobStatus(str, enum.Enum):
    SAVED = "saved"
    APPLIED = "applied"
    PHONE_SCREEN = "phone_screen"
    TECHNICAL = "technical"
    ONSITE = "onsite"
    OFFER = "offer"
    REJECTED = "rejected"
    WITHDRAWN = "withdrawn"

class Resume(BaseModel):
    __tablename__ = "resumes"
    
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id"))
    title: Mapped[str] = mapped_column(String(255))
    personal_info: Mapped[dict] = mapped_column(JSON)
    summary: Mapped[str] = mapped_column(Text)
    experience: Mapped[dict] = mapped_column(JSON)
    education: Mapped[dict] = mapped_column(JSON)
    skills: Mapped[dict] = mapped_column(JSON)
    projects: Mapped[dict] = mapped_column(JSON)
    certifications: Mapped[dict] = mapped_column(JSON)
    is_primary: Mapped[bool] = mapped_column(Boolean, default=False)

class JobApplication(BaseModel):
    __tablename__ = "job_applications"
    
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id"))
    company_name: Mapped[str] = mapped_column(String(255))
    role_title: Mapped[str] = mapped_column(String(255))
    job_url: Mapped[Optional[str]] = mapped_column(String(1024))
    status: Mapped[JobStatus] = mapped_column(SQLEnum(JobStatus), default=JobStatus.SAVED)
    applied_at: Mapped[Optional[datetime]] = mapped_column(nullable=True)
    notes: Mapped[Optional[str]] = mapped_column(Text)
    salary_min: Mapped[Optional[float]] = mapped_column(Float)
    salary_max: Mapped[Optional[float]] = mapped_column(Float)

class InterviewPrep(BaseModel):
    __tablename__ = "interview_prep"
    
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id"))
    topic: Mapped[str] = mapped_column(String(255))
    question: Mapped[str] = mapped_column(Text)
    answer: Mapped[str] = mapped_column(Text)
    difficulty: Mapped[str] = mapped_column(String(50))
    tags: Mapped[dict] = mapped_column(JSON)
    last_reviewed: Mapped[Optional[datetime]] = mapped_column(nullable=True)
    review_count: Mapped[int] = mapped_column(Integer, default=0)
