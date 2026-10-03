import uuid
from typing import Optional, List
from sqlalchemy import String, Enum as SQLEnum, ForeignKey, Float, Text, Integer, Boolean
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import JSON
import enum
from datetime import datetime
from app.shared.base_model import BaseModel

class Difficulty(str, enum.Enum):
    EASY = "easy"
    MEDIUM = "medium"
    HARD = "hard"

class SessionStatus(str, enum.Enum):
    IN_PROGRESS = "in_progress"
    SUBMITTED = "submitted"
    ASSESSED = "assessed"

class Topic(str, enum.Enum):
    ARRAYS = "arrays"
    STRINGS = "strings"
    LINKED_LISTS = "linked_lists"
    TREES = "trees"
    GRAPHS = "graphs"
    DYNAMIC_PROGRAMMING = "dynamic_programming"

class InterviewSession(BaseModel):
    __tablename__ = "interview_sessions"
    
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id"))
    problem_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("coding_problems.id"))
    problem_title: Mapped[str] = mapped_column(String(255))
    difficulty: Mapped[Difficulty] = mapped_column(SQLEnum(Difficulty))
    language: Mapped[str] = mapped_column(String(50))
    code_snapshot: Mapped[Optional[str]] = mapped_column(Text)
    video_url: Mapped[Optional[str]] = mapped_column(String(1024))
    audio_transcript: Mapped[Optional[str]] = mapped_column(Text)
    started_at: Mapped[Optional[datetime]] = mapped_column(nullable=True)
    ended_at: Mapped[Optional[datetime]] = mapped_column(nullable=True)
    duration_seconds: Mapped[int] = mapped_column(Integer, default=0)
    status: Mapped[SessionStatus] = mapped_column(SQLEnum(SessionStatus), default=SessionStatus.IN_PROGRESS)

class InterviewAssessment(BaseModel):
    __tablename__ = "interview_assessments"
    
    session_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("interview_sessions.id"))
    overall_score: Mapped[float] = mapped_column(Float)
    code_score: Mapped[float] = mapped_column(Float)
    communication_score: Mapped[float] = mapped_column(Float)
    process_score: Mapped[float] = mapped_column(Float)
    quality_score: Mapped[float] = mapped_column(Float)
    feedback_json: Mapped[dict] = mapped_column(JSON)
    ai_model_used: Mapped[str] = mapped_column(String(255))
    assessed_at: Mapped[Optional[datetime]] = mapped_column(nullable=True)

class CodingProblem(BaseModel):
    __tablename__ = "coding_problems"
    
    title: Mapped[str] = mapped_column(String(255))
    description: Mapped[str] = mapped_column(Text)
    difficulty: Mapped[Difficulty] = mapped_column(SQLEnum(Difficulty))
    topic: Mapped[Topic] = mapped_column(SQLEnum(Topic))
    company_tags: Mapped[dict] = mapped_column(JSON)
    examples: Mapped[dict] = mapped_column(JSON)
    constraints: Mapped[dict] = mapped_column(JSON)
    starter_code: Mapped[dict] = mapped_column(JSON)
    solution_code: Mapped[dict] = mapped_column(JSON)
    test_cases: Mapped[dict] = mapped_column(JSON)
    source_url: Mapped[Optional[str]] = mapped_column(String(1024))

class PracticeSession(BaseModel):
    __tablename__ = "practice_sessions"
    
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id"))
    problem_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("coding_problems.id"))
    language: Mapped[str] = mapped_column(String(50))
    code: Mapped[str] = mapped_column(Text)
    passed_tests: Mapped[int] = mapped_column(Integer)
    total_tests: Mapped[int] = mapped_column(Integer)
    time_ms: Mapped[int] = mapped_column(Integer)
    memory_mb: Mapped[float] = mapped_column(Float)
    status: Mapped[str] = mapped_column(String(50))
    submitted_at: Mapped[Optional[datetime]] = mapped_column(nullable=True)

class LeetCodeStats(BaseModel):
    __tablename__ = "leetcode_stats"
    
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id"), unique=True)
    username: Mapped[str] = mapped_column(String(255))
    easy_solved: Mapped[int] = mapped_column(Integer, default=0)
    medium_solved: Mapped[int] = mapped_column(Integer, default=0)
    hard_solved: Mapped[int] = mapped_column(Integer, default=0)
    total_solved: Mapped[int] = mapped_column(Integer, default=0)
    streak: Mapped[int] = mapped_column(Integer, default=0)
    last_synced: Mapped[Optional[datetime]] = mapped_column(nullable=True)
