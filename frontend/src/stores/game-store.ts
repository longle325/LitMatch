/**
 * Game state store (Zustand + localStorage persistence).
 *
 * Manages: matches, points, streaks, completed challenges, chat history.
 * Design pattern: single store with action slices, persisted to localStorage.
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { appStorage } from "@/lib/storage";
import type { ChatMessage, ChallengeResult, UserProfile } from "@/types";
import { STORAGE_KEY, POINTS } from "@/lib/constants";
import { calculateChallengePoints } from "@/lib/utils";

/* ── State shape ─────────────────────────────────────────────── */

interface GameState {
  profile: UserProfile | null;
  points: number;
  streak: number;
  matches: string[];
  skipped: string[];
  completed: Record<string, ChallengeResult>;
  chats: Record<string, ChatMessage[]>;
}

interface GameActions {
  /** Set user profile (onboarding). */
  setProfile: (profile: UserProfile) => void;

  /** Add a character to matched list + award match points. */
  matchCharacter: (characterId: string) => void;

  /** Skip a character (left swipe). */
  skipCharacter: (characterId: string) => void;

  /** Reset skipped deck so user can re-discover. */
  resetSkipped: () => void;

  /** Record a challenge result and award points. */
  completeChallenge: (characterId: string, answers: number[], correctAnswers: number[]) => ChallengeResult;

  /** Retry a challenge — subtract old points first. */
  retryChallenge: (characterId: string) => void;

  /** Append a chat message. */
  addChatMessage: (characterId: string, message: ChatMessage) => void;

  /** Check if user has matched with a character. */
  isMatched: (characterId: string) => boolean;

  /** Full reset for demo purposes. */
  resetAll: () => void;
}

const initialState: GameState = {
  profile: null,
  points: 0,
  streak: 1,
  matches: [],
  skipped: [],
  completed: {},
  chats: {},
};

/* ── Store ────────────────────────────────────────────────────── */

export const useGameStore = create<GameState & GameActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      setProfile: (profile) => set({ profile }),

      matchCharacter: (characterId) => {
        const state = get();
        if (state.matches.includes(characterId)) return;
        set({
          matches: [...state.matches, characterId],
          points: state.points + POINTS.MATCH,
        });
      },

      skipCharacter: (characterId) => {
        const state = get();
        if (state.skipped.includes(characterId)) return;
        set({ skipped: [...state.skipped, characterId] });
      },

      resetSkipped: () => set({ skipped: [] }),

      completeChallenge: (characterId, userAnswers, correctAnswers) => {
        const state = get();
        const score = userAnswers.reduce(
          (acc, ans, i) => acc + (ans === correctAnswers[i] ? 1 : 0),
          0
        );
        const { points: awarded, passed, perfect } = calculateChallengePoints(
          score,
          POINTS.TOTAL_QUESTIONS,
          POINTS.PASS_THRESHOLD
        );

        const result: ChallengeResult = {
          score,
          passed,
          perfect,
          awarded,
          answers: userAnswers,
        };

        set({
          points: state.points + awarded,
          completed: { ...state.completed, [characterId]: result },
        });

        return result;
      },

      retryChallenge: (characterId) => {
        const state = get();
        const prev = state.completed[characterId];
        if (!prev) return;
        const { [characterId]: _, ...rest } = state.completed;
        set({
          points: Math.max(0, state.points - prev.awarded),
          completed: rest,
        });
      },

      addChatMessage: (characterId, message) => {
        const state = get();
        const existing = state.chats[characterId] ?? [];
        set({
          chats: {
            ...state.chats,
            [characterId]: [...existing, message],
          },
        });
      },

      isMatched: (characterId) => get().matches.includes(characterId),

      resetAll: () => set(initialState),
    }),
    {
      name: STORAGE_KEY,
      storage: appStorage,
    }
  )
);
