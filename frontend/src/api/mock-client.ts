/**
 * Mock API client — ported from main branch.
 *
 * Implements the ApiClient interface using local seed data.
 * When the backend is live, swap for a real HTTP implementation
 * using the helpers in api-client.ts.
 */

import { characters, findCharacter } from "@/data/seed";
import { demoLeaders } from "@/data/seed";
import { scoreChallenge } from "@/lib/scoring";
import type {
  Character,
  ChallengeQuestion,
  ChallengeResult,
  LeaderboardEntry,
} from "@/types";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface ApiClient {
  getDeck: () => Promise<Character[]>;
  getCharacter: (id: string) => Promise<Character>;
  recordMatch: (id: string) => Promise<{ ok: true }>;
  getChallenge: (id: string) => Promise<ChallengeQuestion[]>;
  submitChallenge: (id: string, answers: number[]) => Promise<ChallengeResult>;
  getLeaderboard: () => Promise<LeaderboardEntry[]>;
  streamChat: (input: ChatRequest) => AsyncIterable<string>;
}

export interface ChatRequest {
  characterId: string;
  message: string;
  signal?: AbortSignal;
}

/** Simulates word-by-word streaming like the real SSE backend. */
async function* mockStreamChat({
  characterId,
  message,
  signal,
}: ChatRequest): AsyncIterable<string> {
  const character = findCharacter(characterId);
  if (!character) throw new Error(`Unknown character: ${characterId}`);

  const reply = composeReply(character, message);
  const chunks = reply.match(/\S+\s*/g) ?? [reply];
  for (const chunk of chunks) {
    if (signal?.aborted) return;
    await delay(35);
    yield chunk;
  }
}

function composeReply(character: Character, text: string): string {
  const lower = text.toLowerCase();
  if (
    lower.includes("essay") ||
    lower.includes("bài văn mẫu") ||
    lower.includes("viết bài")
  ) {
    return "Mình không tạo bài văn mẫu hoàn chỉnh. Mình có thể giúp bạn lập dàn ý, tìm luận điểm và dẫn chứng để bạn tự viết bằng giọng của mình.";
  }
  if (lower.includes("không rõ") || lower.includes("ngoài tác phẩm")) {
    return "Phần này chưa có đủ nguồn trong bộ ghi chú hiện có, nên mình không khẳng định như sự thật văn bản. Ta có thể quay lại các chi tiết đã duyệt trước.";
  }
  const source =
    character.sources.find((item) =>
      lower
        .split(/\s+/)
        .some((word) => word.length > 3 && item.toLowerCase().includes(word))
    ) ?? character.sources[0];
  return `Theo giọng của ${character.name}, câu trả lời nên xuất phát từ mâu thuẫn cốt lõi: ${character.conflict} Ghi chú nguồn liên quan: ${source} Đây là diễn giải học tập, không phải trích dẫn nguyên văn toàn bộ tác phẩm.`;
}

export const mockClient: ApiClient = {
  async getDeck() {
    await delay(0);
    return characters;
  },
  async getCharacter(id) {
    await delay(0);
    const character = findCharacter(id);
    if (!character) throw new Error(`Unknown character: ${id}`);
    return character;
  },
  async recordMatch(_id) {
    await delay(0);
    return { ok: true as const };
  },
  async getChallenge(id) {
    await delay(0);
    const character = findCharacter(id);
    if (!character) throw new Error(`Unknown character: ${id}`);
    return character.challenge;
  },
  async submitChallenge(id, answers) {
    await delay(0);
    const character = findCharacter(id);
    if (!character) throw new Error(`Unknown character: ${id}`);
    return scoreChallenge(character, answers);
  },
  async getLeaderboard() {
    await delay(0);
    return demoLeaders;
  },
  streamChat(input) {
    return mockStreamChat(input);
  },
};

/** Active API client. Swap mockClient for httpClient when backend is live. */
export const api: ApiClient = mockClient;
