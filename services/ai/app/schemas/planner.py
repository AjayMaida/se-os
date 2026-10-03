from pydantic import BaseModel
from typing import List

class PlanRequest(BaseModel):
    user_id: str
    available_hours: float
    yesterday_completion_rate: float

class Task(BaseModel):
    title: str
    task_type: str
    duration_minutes: int
    description: str

class PlanResponse(BaseModel):
    tasks: List[Task]
    total_minutes: int
