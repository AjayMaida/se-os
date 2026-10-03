from typing import Optional, List
from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.domains.practice.models import CodingProblem, InterviewSession, PracticeSession, SessionStatus

class PracticeRepository:
    def __init__(self, db: AsyncSession):
        self.db = db
        
    async def get_problems(self) -> List[CodingProblem]:
        stmt = select(CodingProblem)
        result = await self.db.execute(stmt)
        return list(result.scalars().all())
        
    async def create_interview_session(self, session: InterviewSession) -> InterviewSession:
        self.db.add(session)
        await self.db.flush()
        return session
        
    async def get_interview_session(self, session_id: UUID) -> Optional[InterviewSession]:
        stmt = select(InterviewSession).where(InterviewSession.id == session_id)
        result = await self.db.execute(stmt)
        return result.scalars().first()
        
    async def update_interview_session(self, session: InterviewSession) -> InterviewSession:
        self.db.add(session)
        await self.db.flush()
        return session
