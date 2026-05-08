"""
Chat orchestration service.

Implements the simplified pipeline (Codex replaces GraphRAG):

  1. Receive user message
  2. Codex agent searches knowledge_base/ for relevant literary context
  3. Assemble system prompt  (character voice + retrieved context)
  4. Stream LLM response token-by-token via an async generator

The route layer wraps the generator in an SSE EventSourceResponse.
"""

from __future__ import annotations

import logging
from typing import AsyncIterator, Optional

from openai import AsyncOpenAI

from core.config import settings
from core.prompt_templates import build_character_prompt
from services.codex_agent import CodexKnowledgeAgent
from services.knowledge_retriever import KnowledgeRetriever

logger = logging.getLogger(__name__)


class ChatService:
    """Orchestrates context retrieval + LLM streaming for character chat."""

    def __init__(
        self,
        codex_agent: Optional[CodexKnowledgeAgent],
        knowledge_retriever: Optional[KnowledgeRetriever] = None,
        openai_client: Optional[AsyncOpenAI] = None,
        chat_model: Optional[str] = None,
    ):
        self.codex = codex_agent
        self.retriever = knowledge_retriever
        self.client = openai_client or AsyncOpenAI(
            api_key=settings.OPENAI_API_KEY,
        )
        self.chat_model = chat_model or settings.CHAT_MODEL

    # ------------------------------------------------------------------
    # Public streaming API
    # ------------------------------------------------------------------
    async def stream_response(
        self,
        character_slug: str,
        character_name: str,
        user_message: str,
        voice_instructions: Optional[str] = None,
    ) -> AsyncIterator[str]:
        """
        Yield streamed text chunks for a character chat turn.

        Parameters
        ----------
        character_slug : str
            e.g. "chi_pheo"
        character_name : str
            e.g. "Chí Phèo"
        user_message : str
            The student's question.
        voice_instructions : str | None
            Per-character prompt override (from DB).
        """
        # Step 1 — retrieve character-scoped literary context.
        retrieved_context = ""
        if self.retriever is not None:
            retrieved_context = self.retriever.search_context(
                character_slug, user_message
            )
        if not retrieved_context and self.codex is not None:
            retrieved_context = await self.codex.search_context(
                character_name, user_message
            )
        if not retrieved_context:
            retrieved_context = (
                "(Không tìm thấy ngữ cảnh cụ thể trong kho kiến thức. "
                "Hãy trả lời dựa trên hiểu biết chung về nhân vật.)"
            )

        # Step 2 — build the system prompt
        system_prompt = build_character_prompt(
            character_slug=character_slug,
            character_name=character_name,
            retrieved_context=retrieved_context,
            voice_instructions=voice_instructions,
        )

        # Step 3 — stream the LLM response
        stream = await self.client.chat.completions.create(
            model=self.chat_model,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_message},
            ],
            stream=True,
            temperature=0.7,
            max_tokens=1024,
        )

        async for chunk in stream:
            delta = chunk.choices[0].delta
            if delta.content:
                yield delta.content


# ---------------------------------------------------------------------------
# Factory (used by deps.py)
# ---------------------------------------------------------------------------
_service: Optional[ChatService] = None


def get_chat_service(
    codex_agent: Optional[CodexKnowledgeAgent],
    knowledge_retriever: Optional[KnowledgeRetriever] = None,
) -> ChatService:
    global _service
    if _service is None:
        _service = ChatService(
            codex_agent=codex_agent,
            knowledge_retriever=knowledge_retriever,
        )
    return _service
