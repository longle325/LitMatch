/**
 * Real backend client. Each method talks to the FastAPI backend on port 8081
 * and translates the response into the FE's expected shape using helpers from
 * `./adapter.ts`.
 *
 * Phase status (kept in sync with `task.md`):
 *   ✅  createUser             — Phase 2A
 *   ✅  getLeaderboard         — Phase 2B
 *   ⏳  getDeck                — Phase 3 (slug merge ready, not flipped)
 *   ⏳  getCharacter           — Phase 3
 *   ⏳  recordMatch / recordSkip — Phase 3
 *   ⏳  getChallenge / submit  — Phase 3 (needs backend `correct_answers` echo)
 *   ⏳  streamChat / history   — Phase 4 (SSE parser TBD)
 */

import type {
  Character,
  ChallengeQuestion,
  ChallengeResult,
  ChatMessage,
  LeaderboardEntry,
  UserProfile,
} from "@/types";
import {
  ApiError,
  apiFetch,
  mergeBackendCharacter,
  rememberCharacterId,
  requireCurrentUserId,
  resolveSlugToUuid,
  type BackendCharacterCard,
} from "./adapter";
import type { ApiClient, ChatRequest, CreateUserInput } from "./types";

interface BackendUser {
  id: string;
  username: string;
  grade_level: number;
  total_score: number;
  created_at: string;
}

interface BackendLeaderboardEntry {
  rank: number;
  user_id: string;
  username: string;
  total_score: number;
  characters_unlocked: number;
}

interface BackendLeaderboardResponse {
  entries: BackendLeaderboardEntry[];
}

interface BackendDeckResponse {
  characters: BackendCharacterCard[];
}

interface BackendChallengeQuestion {
  id: number;
  question: string;
  options: string[];
  explanation?: string | null;
}

interface BackendChallengeQuestionsResponse {
  character_id: string;
  questions: BackendChallengeQuestion[];
}

interface BackendChallengeResult {
  score: number;
  total: number;
  passed: boolean;
  points_earned: number;
  explanations: string[];
}

interface BackendSwipeResponse {
  matched: boolean;
  points_earned: number;
  match_status: string | null;
}

// ─── Helpers ──────────────────────────────────────────────────────────────

function notImplemented(method: string): never {
  throw new ApiError(
    `realClient.${method} chưa được triển khai (Phase 4). ` +
      `Tắt cờ tương ứng trong VITE_REAL_ENDPOINTS để dùng mock.`,
    501,
  );
}

// ─── Client ───────────────────────────────────────────────────────────────

export const realClient: ApiClient = {
  async createUser(input: CreateUserInput): Promise<UserProfile> {
    const user = await apiFetch<BackendUser>("/users", {
      method: "POST",
      body: { username: input.username, grade_level: input.grade },
    });
    return {
      username: user.username,
      grade: input.grade,
      userId: user.id,
    };
  },

  async getDeck(): Promise<Character[]> {
    const res = await apiFetch<BackendDeckResponse>("/deck", {
      withUser: true,
    });
    return res.characters
      .map((card) => mergeBackendCharacter(card))
      .filter((c): c is Character => c !== undefined);
  },

  async getCharacter(slug: string): Promise<Character> {
    const uuid = await resolveSlugToUuid(slug);
    const card = await apiFetch<BackendCharacterCard>(
      `/characters/${uuid}`,
    );
    const merged = mergeBackendCharacter(card);
    if (!merged) {
      throw new ApiError(`Không tìm thấy nhân vật ${slug}.`, 404);
    }
    return merged;
  },

  async recordMatch(slug: string): Promise<{ ok: true }> {
    const uuid = await resolveSlugToUuid(slug);
    const userId = requireCurrentUserId();
    await apiFetch<BackendSwipeResponse>("/interactions/swipe", {
      method: "POST",
      body: { user_id: userId, character_id: uuid, direction: "right" },
    });
    return { ok: true };
  },

  async recordSkip(slug: string): Promise<{ ok: true }> {
    const uuid = await resolveSlugToUuid(slug);
    const userId = requireCurrentUserId();
    await apiFetch<BackendSwipeResponse>("/interactions/swipe", {
      method: "POST",
      body: { user_id: userId, character_id: uuid, direction: "left" },
    });
    return { ok: true };
  },

  async getChallenge(slug: string): Promise<ChallengeQuestion[]> {
    const uuid = await resolveSlugToUuid(slug);
    const res = await apiFetch<BackendChallengeQuestionsResponse>(
      `/characters/${uuid}/challenge`,
    );
    rememberCharacterId(slug, uuid);
    return res.questions.map((q, index) => ({
      // Backend `id` is an int; FE keys by `${slug}-q${index+1}` for parity
      // with the seed convention. The original int is not needed FE-side.
      id: `${slug}-q${index + 1}`,
      text: q.question,
      options: q.options,
      // `answer` is intentionally hidden by the backend pre-submission; FE
      // renders the question without it. The Challenge result page reads
      // `correct_answers` from the submission response (Phase 3 backend tweak).
      answer: -1,
      explanation: q.explanation ?? "",
    }));
  },

  async submitChallenge(
    slug: string,
    answers: number[],
  ): Promise<ChallengeResult> {
    const uuid = await resolveSlugToUuid(slug);
    const userId = requireCurrentUserId();
    const res = await apiFetch<BackendChallengeResult>(
      "/challenges/submit",
      {
        method: "POST",
        body: { user_id: userId, character_id: uuid, answers },
      },
    );
    return {
      score: res.score,
      passed: res.passed,
      perfect: res.score === res.total,
      awarded: res.points_earned,
      answers: [...answers],
    };
  },

  async getLeaderboard(): Promise<LeaderboardEntry[]> {
    const res = await apiFetch<BackendLeaderboardResponse>("/leaderboard");
    return res.entries.map((entry) => ({
      name: entry.username,
      points: entry.total_score,
      unlocked: entry.characters_unlocked,
      userId: entry.user_id,
    }));
  },

  async getChatHistory(_slug: string): Promise<ChatMessage[]> {
    // Phase 4 — wire to GET /chat/history. Stubbed for now so flipping the
    // `chat` flag fails loudly rather than silently returning empty history.
    return notImplemented("getChatHistory");
  },

  streamChat(_input: ChatRequest): AsyncIterable<string> {
    // Phase 4 — fetch+SSE parser. Until then, hard fail when the `chat` flag
    // is on so we don't ship a half-working chat path.
    return notImplemented("streamChat");
  },
};
