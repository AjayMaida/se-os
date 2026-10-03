from pydantic import BaseModel
from typing import Generic, TypeVar, Optional, Any

T = TypeVar("T")

class BaseResponse(BaseModel, Generic[T]):
    success: bool = True
    data: Optional[T] = None
    error: Optional[str] = None
    meta: Optional[Any] = None

class ErrorResponse(BaseResponse[None]):
    success: bool = False

class HealthResponse(BaseModel):
    status: str
    version: str
    environment: str
