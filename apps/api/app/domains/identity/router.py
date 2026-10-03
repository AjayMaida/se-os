from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.infrastructure.database import get_db
from app.domains.identity.schemas import *
from typing import Any

router = APIRouter(prefix="/auth", tags=["auth"])
users_router = APIRouter(prefix="/users", tags=["users"])

def success_response(data: Any = None, meta: Any = None):
    return {"success": True, "data": data, "error": None, "meta": meta}

@router.post("/register")
async def register(req: UserRegisterRequest, db: AsyncSession = Depends(get_db)):
    return success_response({"msg": "Registered successfully"})

@router.post("/login")
async def login(req: UserLoginRequest, db: AsyncSession = Depends(get_db)):
    return success_response({"access_token": "token", "refresh_token": "refresh", "token_type": "bearer", "expires_in": 1800})

@router.post("/refresh")
async def refresh(db: AsyncSession = Depends(get_db)):
    return success_response({"msg": "Token refreshed"})

@router.post("/logout")
async def logout(db: AsyncSession = Depends(get_db)):
    return success_response({"msg": "Logged out"})

@router.post("/google")
async def google_auth(req: GoogleOAuthRequest, db: AsyncSession = Depends(get_db)):
    return success_response({"msg": "Google auth successful"})

@users_router.get("/me")
async def get_me(db: AsyncSession = Depends(get_db)):
    return success_response({"id": "uuid", "email": "test@test.com", "is_active": True})

@users_router.put("/me")
async def update_me(req: UpdateProfileRequest, db: AsyncSession = Depends(get_db)):
    return success_response({"msg": "Profile updated"})

@users_router.post("/me/onboarding")
async def onboarding(req: OnboardingRequest, db: AsyncSession = Depends(get_db)):
    return success_response({"msg": "Onboarding completed"})

@users_router.delete("/me")
async def delete_me(db: AsyncSession = Depends(get_db)):
    return success_response({"msg": "Account deleted"})

@users_router.get("/me/profile")
async def get_profile(db: AsyncSession = Depends(get_db)):
    return success_response({"profile": {}})
