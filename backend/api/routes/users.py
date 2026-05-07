"""
User registration / profile endpoints.

POST /api/v1/users          – create a new user (onboarding)
GET  /api/v1/users/{user_id} – get user profile
"""

from __future__ import annotations

from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from api.deps import get_db
from models.schemas import UserCreate, UserResponse
from services import db_postgres as db

router = APIRouter(prefix="/users", tags=["users"])


@router.post(
    "",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_user(
    body: UserCreate,
    session: AsyncSession = Depends(get_db),
):
    existing = await db.get_user_by_username(session, body.username)
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Username already taken.",
        )
    user = await db.create_user(session, body.username, body.grade_level)
    return user


@router.get("/{user_id}", response_model=UserResponse)
async def get_user(
    user_id: UUID,
    session: AsyncSession = Depends(get_db),
):
    user = await db.get_user(session, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")
    return user
