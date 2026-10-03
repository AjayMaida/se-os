from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.infrastructure.database import get_db
from app.domains.roadmap.schemas import RoadmapResponse
from typing import Any

router = APIRouter(prefix="/roadmap", tags=["roadmap"])

def success_response(data: Any = None, meta: Any = None):
    return {"success": True, "data": data, "error": None, "meta": meta}

@router.post("/generate")
async def generate_roadmap(db: AsyncSession = Depends(get_db)):
    return success_response({"msg": "Roadmap generation triggered"})

@router.get("")
async def get_roadmap(db: AsyncSession = Depends(get_db)):
    return success_response([])

@router.get("/{roadmap_id}")
async def get_roadmap_by_id(roadmap_id: str, db: AsyncSession = Depends(get_db)):
    return success_response({})

@router.put("/{roadmap_id}")
async def update_roadmap(roadmap_id: str, db: AsyncSession = Depends(get_db)):
    return success_response({})

@router.get("/daily-plan/today")
async def get_daily_plan_today(db: AsyncSession = Depends(get_db)):
    return success_response({})

@router.post("/daily-plan/generate")
async def generate_daily_plan(db: AsyncSession = Depends(get_db)):
    return success_response({})

@router.patch("/tasks/{task_id}/complete")
async def complete_task(task_id: str, db: AsyncSession = Depends(get_db)):
    return success_response({})

@router.patch("/tasks/{task_id}/skip")
async def skip_task(task_id: str, db: AsyncSession = Depends(get_db)):
    return success_response({})

@router.get("/milestones")
async def get_milestones(db: AsyncSession = Depends(get_db)):
    return success_response([])

@router.patch("/milestones/{milestone_id}/complete")
async def complete_milestone(milestone_id: str, db: AsyncSession = Depends(get_db)):
    return success_response({})
