export type Grade = 10 | 11 | 12;

export interface UserProfile {
  username: string;
  grade: Grade;
  /**
   * Backend-issued user UUID, present once `POST /users` has run.
   * Optional for two reasons:
   *   1. Mock-only mode never sets it.
   *   2. Migration path — when real auth/sessions land, this field is
   *      replaced by a session token read from cookies/headers. Always go
   *      through `getCurrentUserId()` in src/api/adapter.ts rather than
   *      reading this directly.
   */
  userId?: string;
}

export interface ChatSource {
  title: string;
  snippet: string;
}

export interface ChallengeQuestion {
  /**
   * Stable identifier of the form `${characterId}-q${1-based index}`.
   * Auto-generated in `src/data/characters.ts` for the mock layer; the
   * backend is expected to assign and persist these per docs/API.md §5.2.
   */
  id: string;
  text: string;
  options: string[];
  answer: number;
  explanation: string;
}

export interface Character {
  id: string;
  name: string;
  work: string;
  author: string;
  initial: string;
  artA: string;
  artB: string;
  artTitle: string;
  image?: string;
  images?: string[];
  genre?: string;
  portrait?: string;
  avatar?: string;
  imageBrief: string;
  bio: string;
  quote: string;
  personality: string;
  conflict: string;
  context: string;
  sources: string[];
  voice: string;
  chatOpening?: string;
  suggestedQuestions?: string[];
  interpretationThemes?: string[];
  symbols?: string[];
  challenge: ChallengeQuestion[];
}

export type ChatRole = "user" | "bot";

export interface ChatMessage {
  from: ChatRole;
  text: string;
  /**
   * Retrieval citations attached to bot messages, sourced from the backend
   * SSE `source` events. Mock layer leaves this undefined.
   */
  sources?: ChatSource[];
}

export interface ChallengeResult {
  score: number;
  passed: boolean;
  perfect: boolean;
  awarded: number;
  answers: number[];
}

export interface LeaderboardEntry {
  name: string;
  points: number;
  unlocked: number;
  /**
   * Backend-issued UUID. Present on real responses, undefined for the mock
   * `demoLeaders` seed. Used by the leaderboard view to detect whether the
   * current user is already in the response and avoid double-listing.
   */
  userId?: string;
}
