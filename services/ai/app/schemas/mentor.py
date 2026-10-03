from pydantic import BaseModel

class ChatRequest(BaseModel):
    user_id: str
    message: str
    session_id: str

class ChatResponse(BaseModel):
    content: str
