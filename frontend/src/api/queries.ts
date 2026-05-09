/**
 * TanStack Query hooks — ported from main branch.
 *
 * These wrap the ApiClient so components get caching, loading states,
 * and automatic refetch for free.
 */

import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@/api/mock-client";
import { useGameStore } from "@/stores/game-store";

export const queryKeys = {
  deck: ["deck"] as const,
  character: (id: string) => ["character", id] as const,
  challenge: (id: string) => ["challenge", id] as const,
  leaderboard: ["leaderboard"] as const,
};

export function useDeck() {
  return useQuery({
    queryKey: queryKeys.deck,
    queryFn: api.getDeck,
  });
}

export function useCharacter(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.character(id ?? ""),
    queryFn: () => api.getCharacter(id as string),
    enabled: !!id,
  });
}

export function useChallenge(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.challenge(id ?? ""),
    queryFn: () => api.getChallenge(id as string),
    enabled: !!id,
  });
}

export function useLeaderboard() {
  return useQuery({
    queryKey: queryKeys.leaderboard,
    queryFn: api.getLeaderboard,
  });
}

export function useMatchMutation() {
  const matchCharacter = useGameStore((state) => state.matchCharacter);
  return useMutation({
    mutationFn: async (id: string) => {
      await api.recordMatch(id);
      matchCharacter(id);
      return id;
    },
  });
}

export function useSubmitChallengeMutation() {
  const saveChallenge = useGameStore((state) => state.completed);
  const completeChallenge = useGameStore((state) => state.completeChallenge);
  return useMutation({
    mutationFn: async ({ id, answers }: { id: string; answers: number[] }) => {
      const result = await api.submitChallenge(id, answers);
      // Store uses its own scoring, but we can also accept the API result
      void saveChallenge;
      void completeChallenge;
      return result;
    },
  });
}
