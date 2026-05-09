/**
 * API client for the FastAPI backend.
 *
 * During MVP development this file is mostly a stub — the app works
 * with local seed data and Zustand state.  Once the backend is live
 * swap the mock implementations for real fetch calls.
 */

import { API_BASE } from "./constants";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`API ${res.status}: ${body}`);
  }
  return res.json() as Promise<T>;
}

/* ── Typed helpers (activate when backend is running) ── */

export const api = {
  getDeck: (userId: string) => request(`/deck?user_id=${userId}`),
  swipe: (userId: string, characterId: string, direction: "left" | "right") =>
    request("/interactions/swipe", {
      method: "POST",
      body: JSON.stringify({
        user_id: userId,
        character_id: characterId,
        direction,
      }),
    }),
  getChallenge: (characterId: string) =>
    request(`/characters/${characterId}/challenge`),
  submitChallenge: (
    userId: string,
    characterId: string,
    answers: number[]
  ) =>
    request("/challenges/submit", {
      method: "POST",
      body: JSON.stringify({
        user_id: userId,
        character_id: characterId,
        answers,
      }),
    }),
  getLeaderboard: (limit = 50) => request(`/leaderboard?limit=${limit}`),
  createUser: (username: string, gradeLevel: number) =>
    request("/users", {
      method: "POST",
      body: JSON.stringify({ username, grade_level: gradeLevel }),
    }),
};

/**
 * SSE helper for chat streaming.
 * Returns an async generator of text chunks.
 */
export async function* streamChat(
  userId: string,
  characterId: string,
  message: string
): AsyncGenerator<string> {
  const res = await fetch(`${API_BASE}/chat/stream`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id: userId,
      character_id: characterId,
      message,
    }),
  });

  if (!res.ok || !res.body) {
    throw new Error("Chat stream failed");
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      if (line.startsWith("data: ")) {
        yield line.slice(6);
      }
    }
  }
}
