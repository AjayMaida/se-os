from fastapi import APIRouter
from app.schemas.planner import PlanRequest, PlanResponse

router = APIRouter(prefix="/ai/v1/planner", tags=["planner"])

@router.post("/generate", response_model=PlanResponse)
async def generate_plan(request: PlanRequest):
    return PlanResponse(tasks=[], total_minutes=0)
