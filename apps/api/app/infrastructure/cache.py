import json
from functools import wraps
from app.infrastructure.redis import redis_client
from typing import Callable, Any

def build_cache_key(prefix: str, *args, **kwargs) -> str:
    key_parts = [str(arg) for arg in args] + [f"{k}={v}" for k, v in kwargs.items()]
    return f"{prefix}:{':'.join(key_parts)}"

def cache_response(ttl_seconds: int = 3600, key_prefix: str = "cache"):
    def decorator(func: Callable):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            cache_key = build_cache_key(key_prefix, *args, **kwargs)
            cached = await redis_client.get(cache_key)
            if cached:
                return json.loads(cached)
                
            result = await func(*args, **kwargs)
            
            # Simplified caching logic for dict/list results
            if isinstance(result, (dict, list)):
                await redis_client.set(cache_key, json.dumps(result), ex=ttl_seconds)
            return result
        return wrapper
    return decorator

async def invalidate_cache(key: str):
    await redis_client.delete(key)
