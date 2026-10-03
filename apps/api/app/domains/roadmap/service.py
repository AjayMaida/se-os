from sqlalchemy.ext.asyncio import AsyncSession
from app.domains.roadmap.repository import RoadmapRepository
from app.domains.roadmap.models import Roadmap
from app.domains.roadmap.schemas import RoadmapBase
import uuid

class RoadmapService:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.repo = RoadmapRepository(db)
        
    async def generate_roadmap(self, user_id: uuid.UUID, data: dict) -> Roadmap:
        # Business logic for triggering roadmap generation
        pass
        
    async def get_roadmap(self, roadmap_id: uuid.UUID) -> Roadmap:
        return await self.repo.get_roadmap(roadmap_id)
        
    async def update_roadmap(self, roadmap_id: uuid.UUID, data: dict):
        roadmap = await self.repo.get_roadmap(roadmap_id)
        if not roadmap:
            raise ValueError("Roadmap not found")
        # Update logic
        await self.repo.update_roadmap(roadmap)
        await self.db.commit()
