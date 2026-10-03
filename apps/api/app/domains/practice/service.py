from sqlalchemy.ext.asyncio import AsyncSession
from app.domains.practice.repository import PracticeRepository
from app.domains.practice.models import InterviewSession, SessionStatus
from app.shared.events import InterviewSessionSubmitted
from app.infrastructure.rabbitmq import get_publisher
import uuid
import httpx

class PracticeService:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.repo = PracticeRepository(db)
        
    async def get_problems(self):
        return await self.repo.get_problems()
        
    async def create_interview_session(self, user_id: uuid.UUID, problem_id: uuid.UUID, language: str) -> InterviewSession:
        session = InterviewSession(user_id=user_id, problem_id=problem_id, problem_title="Mock", difficulty="EASY", language=language)
        await self.repo.create_interview_session(session)
        await self.db.commit()
        return session
        
    async def submit_session(self, session_id: uuid.UUID, code: str, duration: int):
        session = await self.repo.get_interview_session(session_id)
        if not session:
            raise ValueError("Session not found")
            
        session.status = SessionStatus.SUBMITTED
        session.code_snapshot = code
        session.duration_seconds = duration
        await self.repo.update_interview_session(session)
        await self.db.commit()
        
        publisher = await get_publisher()
        await publisher.publish_event(InterviewSessionSubmitted(user_id=session.user_id, payload={"session_id": str(session.id)}))
        
    async def run_code(self, code: str, language: str) -> dict:
        # Calls Piston API or similar
        async with httpx.AsyncClient() as client:
            # Mocking Piston API call
            return {"run": {"output": "Mock output", "code": 0}}
