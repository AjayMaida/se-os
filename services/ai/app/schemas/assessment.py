from pydantic import BaseModel
from typing import List, Dict

class AssessmentRequest(BaseModel):
    session_id: str
    user_id: str
    code: str
    audio_transcript: str
    telemetry: dict

class AssessmentResponse(BaseModel):
    overall_score: float
    code_score: float
    communication_score: float
    process_score: float
    quality_score: float
    code_feedback: Dict[str, str]
    communication_feedback: Dict[str, str]
    process_feedback: Dict[str, str]
    actionable_items: List[str]
