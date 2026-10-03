from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.infrastructure.database import get_db
from typing import Any

router = APIRouter(prefix="/career", tags=["career"])

def success_response(data: Any = None, meta: Any = None):
    return {"success": True, "data": data, "error": None, "meta": meta}

@router.get("/resumes")
async def get_resumes(db: AsyncSession = Depends(get_db)):
    return success_response([])

@router.get("/jobs")
async def get_jobs(db: AsyncSession = Depends(get_db)):
    return success_response([])

@router.get("/jobs/stats")
async def get_jobs_stats(db: AsyncSession = Depends(get_db)):
    return success_response({})

@router.get("/prep")
async def get_prep(db: AsyncSession = Depends(get_db)):
    return success_response([])
