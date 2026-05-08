"""
Character chat endpoint with SSE streaming.

POST /api/v1/chat/stream
  Opens a Server-Sent Events connection and streams the character's
  response token-by-token.

Pipeline:
  1. Validate user has matched with the character
  2. Codex agent searches knowledge_base/ for literary context
  3. System prompt assembled (character voice + context)
  4. LLM response streamed via SSE
"""

from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sse_starlette.sse import EventSourceResponse

from api.deps import get_chat, get_db
from models.db_models import MatchStatus
from models.schemas import ChatRequest
from services import db_postgres as db
from services.chat_service import ChatService

router = APIRouter(prefix="/chat", tags=["chat"])


@router.post("/stream")
async def chat_stream(
    body: ChatRequest,
    session: AsyncSession = Depends(get_db),
    chat_service: ChatService = Depends(get_chat),
):
    # Verify user exists
    user = await db.get_user(session, body.user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")

    # Verify character exists
    character = await db.get_character(session, body.character_id)
    if not character:
        raise HTTPException(status_code=404, detail="Character not found.")

    # Verify user has matched with this character
    match = await db.get_match(session, body.user_id, body.character_id)
    if not match or match.status == MatchStatus.SWIPED_LEFT:
        raise HTTPException(
            status_code=403,
            detail="You must match with this character before chatting.",
        )

    async def event_generator():
        async for chunk in chat_service.stream_response(
            character_slug=character.slug,
            character_name=character.name,
            user_message=body.message,
            voice_instructions=character.voice_instructions,
        ):
            yield {"data": chunk}

    return EventSourceResponse(event_generator())
