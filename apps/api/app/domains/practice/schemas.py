from pydantic import BaseModel
from uuid import UUID
from datetime import datetime
from typing import Optional, List

class ProblemResponse(BaseModel):
    id: UUID
    title: str
    difficulty: str
    topic: str
    
class CreateInterviewSessionRequest(BaseModel):
    problem_id: UUID
    language: str
    
class RunCodeRequest(BaseModel):
    code: str
    language: str
    
class SubmitSessionRequest(BaseModel):
    code_snapshot: str
    duration_seconds: int
