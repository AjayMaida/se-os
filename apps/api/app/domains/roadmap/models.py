import uuid
from typing import Optional, List
from sqlalchemy import String, Boolean, Enum as SQLEnum, ForeignKey, Float, Text, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import JSON
import enum
from datetime import datetime
from app.shared.base_model import BaseModel

class GoalType(str, enum.Enum):
    BACKEND = "backend"
    FRONTEND = "frontend"
    FULLSTACK = "fullstack"
    AI_ML = "ai_ml"
    DEVOPS = "devops"
    CLOUD = "cloud"
    SECURITY = "security"
    DATA = "data"

class Status(str, enum.Enum):
    ACTIVE = "active"
    PAUSED = "paused"
    COMPLETED = "completed"

class TaskType(str, enum.Enum):
    LEARN = "learn"
    PRACTICE = "practice"
    PROJECT = "project"
    REVIEW = "review"
    REST = "rest"

class CareerGoal(BaseModel):
    __tablename__ = "career_goals"
    
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id"))
    goal_type: Mapped[GoalType] = mapped_column(SQLEnum(GoalType))
    target_role: Mapped[str] = mapped_column(String(255))
    target_company: Mapped[Optional[str]] = mapped_column(String(255))
    timeline_months: Mapped[int] = mapped_column(Integer)
    status: Mapped[Status] = mapped_column(SQLEnum(Status), default=Status.ACTIVE)
    
class Roadmap(BaseModel):
    __tablename__ = "roadmaps"
    
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id"))
    career_goal_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("career_goals.id"))
    title: Mapped[str] = mapped_column(String(255))
    description: Mapped[Optional[str]] = mapped_column(Text)
    status: Mapped[Status] = mapped_column(SQLEnum(Status), default=Status.ACTIVE)
    total_phases: Mapped[int] = mapped_column(Integer, default=0)
    current_phase: Mapped[int] = mapped_column(Integer, default=1)
    progress_percentage: Mapped[float] = mapped_column(Float, default=0.0)
    ai_generated: Mapped[bool] = mapped_column(Boolean, default=True)
    generated_at: Mapped[Optional[datetime]] = mapped_column(nullable=True)

class RoadmapPhase(BaseModel):
    __tablename__ = "roadmap_phases"
    
    roadmap_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("roadmaps.id"))
    phase_number: Mapped[int] = mapped_column(Integer)
    title: Mapped[str] = mapped_column(String(255))
    description: Mapped[Optional[str]] = mapped_column(Text)
    duration_weeks: Mapped[int] = mapped_column(Integer)
    status: Mapped[Status] = mapped_column(SQLEnum(Status), default=Status.ACTIVE)
    order: Mapped[int] = mapped_column(Integer)

class Milestone(BaseModel):
    __tablename__ = "milestones"
    
    phase_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("roadmap_phases.id"))
    title: Mapped[str] = mapped_column(String(255))
    description: Mapped[Optional[str]] = mapped_column(Text)
    skills: Mapped[List[str]] = mapped_column(JSON)
    estimated_days: Mapped[int] = mapped_column(Integer)
    status: Mapped[Status] = mapped_column(SQLEnum(Status), default=Status.ACTIVE)
    completed_at: Mapped[Optional[datetime]] = mapped_column(nullable=True)
    order: Mapped[int] = mapped_column(Integer)

class DailyPlan(BaseModel):
    __tablename__ = "daily_plans"
    
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id"))
    date: Mapped[datetime] = mapped_column()
    status: Mapped[Status] = mapped_column(SQLEnum(Status), default=Status.ACTIVE)
    tasks: Mapped[dict] = mapped_column(JSON)
    generated_at: Mapped[Optional[datetime]] = mapped_column(nullable=True)
    completion_rate: Mapped[float] = mapped_column(Float, default=0.0)

class PlanTask(BaseModel):
    __tablename__ = "plan_tasks"
    
    daily_plan_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("daily_plans.id"))
    type: Mapped[TaskType] = mapped_column(SQLEnum(TaskType))
    title: Mapped[str] = mapped_column(String(255))
    description: Mapped[Optional[str]] = mapped_column(Text)
    resource_url: Mapped[Optional[str]] = mapped_column(String(1024))
    duration_minutes: Mapped[int] = mapped_column(Integer)
    status: Mapped[Status] = mapped_column(SQLEnum(Status), default=Status.ACTIVE)
    completed_at: Mapped[Optional[datetime]] = mapped_column(nullable=True)
