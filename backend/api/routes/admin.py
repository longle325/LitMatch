"""
Small read-only admin diagnostics.
"""

from __future__ import annotations

from fastapi import APIRouter, Depends

from api.deps import get_retriever
from models.schemas import RagDiagnosticsResponse
from services.knowledge_retriever import KnowledgeRetriever

router = APIRouter(prefix="/admin", tags=["admin"])


@router.get("/rag/diagnostics", response_model=RagDiagnosticsResponse)
async def rag_diagnostics(
    retriever: KnowledgeRetriever = Depends(get_retriever),
):
    return RagDiagnosticsResponse.model_validate(await retriever.diagnostics())
