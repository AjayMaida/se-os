import redis.asyncio as redis
from app.config import settings
from typing import Optional, Any
import json
from functools import wraps

class RedisClient:
    def __init__(self):
        self.redis = redis.from_url(settings.REDIS_URL, decode_responses=True)
        
    async def get(self, key: str) -> Optional[str]:
        return await self.redis.get(key)
        
    async def set(self, key: str, value: str, ex: Optional[int] = None):
        await self.redis.set(key, value, ex=ex)
        
    async def delete(self, key: str):
        await self.redis.delete(key)
        
    async def rate_limit(self, key: str, limit: int, period: int) -> bool:
        current = await self.redis.get(key)
        if current and int(current) >= limit:
            return False
        pipe = self.redis.pipeline()
        pipe.incr(key)
        pipe.expire(key, period)
        await pipe.execute()
        return True

redis_client = RedisClient()
