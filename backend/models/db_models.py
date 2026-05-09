"""
SQLAlchemy ORM models for LitMatch.

Tables:
  users       - student accounts and scores
  characters  - literary character profiles
  matches     - user <-> character swipe state
  challenges  - per-character quiz questions (JSONB)
"""

from __future__ import annotations

import enum
import uuid
from datetime import datetime, timezone

from sqlalchemy import (
    Column,
    DateTime,
    Enum,
    ForeignKey,
    Integer,
    String,
    Text,
    UniqueConstraint,
)
from sqlalchemy.dialects.postgresql import JSON, UUID
from sqlalchemy.orm import relationship

from core.database import Base


# ---------------------------------------------------------------------------
# Enums
# ---------------------------------------------------------------------------
class MatchStatus(str, enum.Enum):
    SWIPED_LEFT = "SWIPED_LEFT"
    SWIPED_RIGHT = "SWIPED_RIGHT"
    CHAT_UNLOCKED = "CHAT_UNLOCKED"
    CHALLENGE_PASSED = "CHALLENGE_PASSED"


# ---------------------------------------------------------------------------
# Users
# ---------------------------------------------------------------------------
class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    username = Column(String(50), unique=True, nullable=False, index=True)
    grade_level = Column(Integer, nullable=False)
    total_score = Column(Integer, default=0, nullable=False)
    created_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )

    # relationships
    matches = relationship("Match", back_populates="user", lazy="selectin")


# ---------------------------------------------------------------------------
# Characters
# ---------------------------------------------------------------------------
class Character(Base):
    __tablename__ = "characters"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    slug = Column(String(100), unique=True, nullable=False, index=True)
    name = Column(String(100), nullable=False)
    author = Column(String(100), nullable=False)
    work_title = Column(String(200), nullable=False)
    short_bio = Column(Text)
    avatar_url = Column(String(500))
    difficulty_level = Column(Integer, default=1, nullable=False)
    personality_traits = Column(JSON)  # JSONB list of strings
    emotional_conflicts = Column(Text)
    social_context = Column(Text)
    famous_quote = Column(Text)
    voice_instructions = Column(Text)  # override prompt for chat

    # relationships
    challenges = relationship("Challenge", back_populates="character", lazy="selectin")
    matches = relationship("Match", back_populates="character", lazy="selectin")


# ---------------------------------------------------------------------------
# Matches  (user <-> character state)
# ---------------------------------------------------------------------------
class Match(Base):
    __tablename__ = "matches"
    __table_args__ = (
        UniqueConstraint("user_id", "character_id", name="uq_user_character"),
    )

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    )
    character_id = Column(
        UUID(as_uuid=True),
        ForeignKey("characters.id", ondelete="CASCADE"),
        nullable=False,
    )
    status = Column(Enum(MatchStatus), default=MatchStatus.SWIPED_RIGHT, nullable=False)
    created_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )

    # relationships
    user = relationship("User", back_populates="matches")
    character = relationship("Character", back_populates="matches")


# ---------------------------------------------------------------------------
# Challenges
# ---------------------------------------------------------------------------
class Challenge(Base):
    """
    Stores per-character challenge questions as a JSONB column.

    Expected questions JSON shape:
    [
      {
        "id": 1,
        "question": "...",
        "options": ["A", "B", "C", "D"],
        "correct_answer_index": 2,
        "explanation": "..."
      },
      ...
    ]
    """

    __tablename__ = "challenges"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    character_id = Column(
        UUID(as_uuid=True),
        ForeignKey("characters.id", ondelete="CASCADE"),
        nullable=False,
        unique=True,
    )
    questions = Column(JSON, nullable=False)

    # relationships
    character = relationship("Character", back_populates="challenges")
