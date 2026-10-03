from typing import AsyncGenerator
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from app.config import settings

class Database:
    def __init__(self):
        self.engine = create_async_engine(
            settings.DATABASE_URL,
            echo=settings.DEBUG,
            future=True
        )
        self.session_factory = async_sessionmaker(
            self.engine, expire_on_commit=False, class_=AsyncSession
        )
        
    async def connect(self):
        pass
        
    async def disconnect(self):
        await self.engine.dispose()

db = Database()

async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with db.session_factory() as session:
        yield session
