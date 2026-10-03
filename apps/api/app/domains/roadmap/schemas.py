from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from uuid import UUID
from datetime import datetime
from .models import GoalType, Status, TaskType

class RoadmapBase(BaseModel):
    title: str
    description: Optional[str] = None
    
class RoadmapResponse(RoadmapBase):
    id: UUID
    user_id: UUID
    career_goal_id: UUID
    status: Status
    total_phases: int
    current_phase: int
    progress_percentage: float
    ai_generated: bool
    generated_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)
