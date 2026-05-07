/* ──────────────────────────────────────────────────────────────
   Shared domain types for LitMatch.
   Single source of truth — import from "@/types" everywhere.
   ────────────────────────────────────────────────────────────── */

/** A literary character profile card. */
export interface Character {
  id: string;
  name: string;
  work: string;
  author: string;
  initial: string;
  /** Gradient stop A for the fallback art card */
  artA: string;
  /** Gradient stop B for the fallback art card */
  artB: string;
  artTitle: string;
  /** Remote image URL (optional — falls back to gradient art) */
  image?: string;
  /** Portrait crop used in collection cards */
  portrait?: string;
  /** Small avatar used in chat */
  avatar?: string;
  imageBrief: string;
  bio: string;
  quote: string;
  personality: string;
  conflict: string;
  context: string;
  /** Curated source snippets for grounded chat */
  sources: string[];
  /** Short voice description for chat persona */
  voice: string;
  /** Challenge questions for this character */
  challenge: ChallengeQuestion[];
}

/** A single challenge question (multiple choice). */
export interface ChallengeQuestion {
  text: string;
  options: string[];
  /** Index of the correct option */
  answer: number;
  explanation: string;
}

/** Persisted result of a completed challenge. */
export interface ChallengeResult {
  score: number;
  passed: boolean;
  perfect: boolean;
  awarded: number;
  answers: number[];
}

/** A single chat message. */
export interface ChatMessage {
  from: "user" | "bot";
  text: string;
}

/** User profile created during onboarding. */
export interface UserProfile {
  username: string;
  grade: number;
}

/** Demo leaderboard entry. */
export interface LeaderboardEntry {
  name: string;
  points: number;
  unlocked: number;
}

/** The full persisted game state shape. */
export interface GameState {
  profile: UserProfile | null;
  points: number;
  streak: number;
  matches: string[];
  skipped: string[];
  completed: Record<string, ChallengeResult>;
  chats: Record<string, ChatMessage[]>;
}
