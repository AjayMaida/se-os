from fastapi import APIRouter
from fastapi.responses import StreamingResponse
import json
import asyncio
from app.schemas.mentor import ChatRequest

router = APIRouter(prefix="/ai/v1/mentor", tags=["mentor"])

@router.post("/chat")
async def chat(request: ChatRequest):
    async def stream_response():
        # Mock streaming
        words = ["Here ", "is ", "your ", "advice, ", "my ", "friend."]
        for word in words:
            yield f'data: {json.dumps({"content": word})}\n\n'
            await asyncio.sleep(0.1)
            
    return StreamingResponse(stream_response(), media_type='text/event-stream')
