from pydantic import BaseModel
from typing import List, Optional

class RoadmapGenerationRequest(BaseModel):
    user_id: str
    user_profile: dict

class Milestone(BaseModel):
    title: str
    description: str
    skills: List[str]
    resources: List[str]

class Phase(BaseModel):
    title: str
    duration_weeks: int
    milestones: List[Milestone]

class RoadmapGenerationResponse(BaseModel):
    roadmap_id: str
    phases: List[Phase]
