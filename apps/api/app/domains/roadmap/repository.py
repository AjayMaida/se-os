from typing import Optional, List
from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.domains.roadmap.models import Roadmap, RoadmapPhase, Milestone, DailyPlan, PlanTask

class RoadmapRepository:
    def __init__(self, db: AsyncSession):
        self.db = db
        
    async def create_roadmap(self, roadmap: Roadmap) -> Roadmap:
        self.db.add(roadmap)
        await self.db.flush()
        return roadmap
        
    async def get_roadmap(self, roadmap_id: UUID) -> Optional[Roadmap]:
        stmt = select(Roadmap).where(Roadmap.id == roadmap_id)
        result = await self.db.execute(stmt)
        return result.scalars().first()
        
    async def get_user_roadmaps(self, user_id: UUID) -> List[Roadmap]:
        stmt = select(Roadmap).where(Roadmap.user_id == user_id)
        result = await self.db.execute(stmt)
        return list(result.scalars().all())
        
    async def update_roadmap(self, roadmap: Roadmap) -> Roadmap:
        self.db.add(roadmap)
        await self.db.flush()
        return roadmap
