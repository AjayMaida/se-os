from fastapi import APIRouter
from app.schemas.roadmap import RoadmapGenerationRequest, RoadmapGenerationResponse

router = APIRouter(prefix="/ai/v1/roadmap", tags=["roadmap"])

@router.post("/generate")
async def generate_roadmap(request: RoadmapGenerationRequest):
    return {"status": "accepted", "message": "Roadmap generation started"}

@router.post("/generate/stream")
async def generate_roadmap_stream(request: RoadmapGenerationRequest):
    return {"status": "streaming_not_implemented_yet"}
