from fastapi import APIRouter
from app.schemas.assessment import AssessmentRequest, AssessmentResponse

router = APIRouter(prefix="/ai/v1/assessment", tags=["assessment"])

@router.post("/session")
async def trigger_assessment(request: AssessmentRequest):
    return {"status": "assessment_started"}

@router.get("/{session_id}", response_model=AssessmentResponse)
async def get_assessment(session_id: str):
    return AssessmentResponse(
        overall_score=8.5,
        code_score=9.0,
        communication_score=8.0,
        process_score=8.5,
        quality_score=8.5,
        code_feedback={"correctness": "Good", "complexity": "O(N)", "quality": "Clean", "edge_cases": "Handled"},
        communication_feedback={"clarity": "Clear", "trade_offs": "Discussed"},
        process_feedback={"planning": "Good", "testing": "Adequate"},
        actionable_items=["Write more tests", "Speak louder"]
    )
