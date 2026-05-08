import { create } from "zustand";
import { persist } from "zustand/middleware";
import { appStorage } from "@/lib/storage";
import type {
  ChallengeResult,
  ChatMessage,
  UserProfile,
  Grade,
} from "@/types";
import {
  POINTS_PER_MATCH,
} from "@/lib/scoring";

interface AppState {
  profile: UserProfile | null;
  points: number;
  streak: number;
  matches: string[];
  skipped: string[];
  completed: Record<string, ChallengeResult>;
  chats: Record<string, ChatMessage[]>;

  setProfile: (username: string, grade: Grade) => void;
  matchCharacter: (id: string) => void;
  skipCharacter: (id: string) => void;
  resetSkipped: () => void;
  appendChat: (id: string, message: ChatMessage) => void;
  saveChallenge: (id: string, result: ChallengeResult) => void;
  retryChallenge: (id: string) => void;
  resetAll: () => void;
}

const initial = {
  profile: null as UserProfile | null,
  points: 0,
  streak: 1,
  matches: [] as string[],
  skipped: [] as string[],
  completed: {} as Record<string, ChallengeResult>,
  chats: {} as Record<string, ChatMessage[]>,
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      ...initial,

      setProfile: (username, grade) =>
        set({ profile: { username, grade } }),

      matchCharacter: (id) =>
        set((state) =>
          state.matches.includes(id)
            ? state
            : {
                matches: [...state.matches, id],
                points: state.points + POINTS_PER_MATCH,
              },
        ),

      skipCharacter: (id) =>
        set((state) =>
          state.skipped.includes(id)
            ? state
            : { skipped: [...state.skipped, id] },
        ),

      resetSkipped: () => set({ skipped: [] }),

      appendChat: (id, message) =>
        set((state) => ({
          chats: {
            ...state.chats,
            [id]: [...(state.chats[id] || []), message],
          },
        })),

      saveChallenge: (id, result) =>
        set((state) => ({
          completed: { ...state.completed, [id]: result },
          points: state.points + result.awarded,
        })),

      retryChallenge: (id) =>
        set((state) => {
          const previous = state.completed[id];
          if (!previous) return state;
          const next = { ...state.completed };
          delete next[id];
          return {
            completed: next,
            points: Math.max(0, state.points - previous.awarded),
          };
        }),

      resetAll: () => set({ ...initial }),
    }),
    {
      name: "litmatch-state",
      storage: appStorage,
    },
  ),
);
