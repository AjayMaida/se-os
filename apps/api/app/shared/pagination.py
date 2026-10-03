from pydantic import BaseModel, Field
from typing import Generic, TypeVar, List, Optional
import math

T = TypeVar("T")

class PageParams(BaseModel):
    page: int = Field(1, ge=1)
    size: int = Field(20, ge=1, le=100)

class PagedResponse(BaseModel, Generic[T]):
    items: List[T]
    total: int
    page: int
    size: int
    pages: int

def paginate(items: List[T], total: int, params: PageParams) -> PagedResponse[T]:
    return PagedResponse(
        items=items,
        total=total,
        page=params.page,
        size=params.size,
        pages=math.ceil(total / params.size) if total > 0 else 0
    )
