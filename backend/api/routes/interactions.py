"""
Swipe interaction endpoint.

POST /api/v1/interactions/swipe
  Records a left/right swipe.  If right, creates a match and awards points.
"""

from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from api.deps import get_db
from core.config import settings
from models.schemas import SwipeDirection, SwipeRequest, SwipeResponse, MatchStatus
from services import db_postgres as db

router = APIRouter(prefix="/interactions", tags=["interactions"])


@router.post("/swipe", response_model=SwipeResponse)
async def swipe(
    body: SwipeRequest,
    session: AsyncSession = Depends(get_db),
):
    # Validate user and character exist
    user = await db.get_user(session, body.user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")

    character = await db.get_character(session, body.character_id)
    if not character:
        raise HTTPException(status_code=404, detail="Character not found.")

    # Left swipe → no match
    if body.direction == SwipeDirection.LEFT:
        return SwipeResponse(matched=False, points_earned=0)

    # Right swipe → create match + award points
    existing = await db.get_match(session, body.user_id, body.character_id)
    if existing:
        raise HTTPException(
            status_code=409,
            detail="Already matched with this character.",
        )

    await db.create_match(session, body.user_id, body.character_id)
    await db.add_points(session, body.user_id, settings.POINTS_MATCH)

    return SwipeResponse(
        matched=True,
        points_earned=settings.POINTS_MATCH,
        match_status=MatchStatus.SWIPED_RIGHT,
    )
