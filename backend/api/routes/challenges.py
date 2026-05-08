"""
Challenge endpoints.

GET  /api/v1/characters/{character_id}/challenge
  Returns the 5-question challenge for a character.

POST /api/v1/challenges/submit
  Grades answers, awards points, updates match status.
"""

from __future__ import annotations

from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from api.deps import get_db
from core.config import settings
from models.db_models import MatchStatus
from models.schemas import (
    ChallengeQuestion,
    ChallengeQuestionsResponse,
    ChallengeResult,
    ChallengeSubmission,
)
from services import db_postgres as db

router = APIRouter(tags=["challenges"])


@router.get(
    "/characters/{character_id}/challenge",
    response_model=ChallengeQuestionsResponse,
)
async def get_challenge(
    character_id: UUID,
    session: AsyncSession = Depends(get_db),
):
    character = await db.get_character(session, character_id)
    if not character:
        raise HTTPException(status_code=404, detail="Character not found.")

    challenge = await db.get_challenge_for_character(session, character_id)
    if not challenge:
        raise HTTPException(
            status_code=404,
            detail="No challenge available for this character.",
        )

    # Strip correct_answer_index before sending to client
    questions = [
        ChallengeQuestion(
            id=q["id"],
            question=q["question"],
            options=q["options"],
        )
        for q in challenge.questions
    ]
    return ChallengeQuestionsResponse(
        character_id=character_id,
        questions=questions,
    )


@router.post("/challenges/submit", response_model=ChallengeResult)
async def submit_challenge(
    body: ChallengeSubmission,
    session: AsyncSession = Depends(get_db),
):
    # Validate user
    user = await db.get_user(session, body.user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")

    # Validate match exists
    match = await db.get_match(session, body.user_id, body.character_id)
    if not match or match.status == MatchStatus.SWIPED_LEFT:
        raise HTTPException(
            status_code=403,
            detail="You must match with this character first.",
        )

    # Prevent re-submission after passing
    if match.status == MatchStatus.CHALLENGE_PASSED:
        raise HTTPException(
            status_code=409,
            detail="Challenge already passed for this character.",
        )

    # Load challenge
    challenge = await db.get_challenge_for_character(session, body.character_id)
    if not challenge:
        raise HTTPException(
            status_code=404,
            detail="No challenge available for this character.",
        )

    questions = challenge.questions
    if len(body.answers) != len(questions):
        raise HTTPException(
            status_code=422,
            detail=f"Expected {len(questions)} answers, got {len(body.answers)}.",
        )

    # Grade
    score = 0
    explanations: list[str] = []
    for q, user_answer in zip(questions, body.answers):
        if user_answer == q["correct_answer_index"]:
            score += 1
        explanations.append(q.get("explanation", ""))

    total = len(questions)
    passed = score >= settings.CHALLENGE_PASS_THRESHOLD

    # Calculate points
    points = settings.POINTS_CHALLENGE_COMPLETE
    if passed:
        points += settings.POINTS_CHALLENGE_PASS_BONUS
        await db.update_match_status(
            session,
            body.user_id,
            body.character_id,
            MatchStatus.CHALLENGE_PASSED,
        )
    if score == total:
        points += settings.POINTS_PERFECT_SCORE_BONUS

    await db.add_points(session, body.user_id, points)

    return ChallengeResult(
        score=score,
        total=total,
        passed=passed,
        points_earned=points,
        explanations=explanations,
    )
