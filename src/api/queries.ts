import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@/api/client";
import { useAppStore } from "@/stores/useAppStore";

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
  const matchCharacter = useAppStore((state) => state.matchCharacter);
  return useMutation({
    mutationFn: async (id: string) => {
      await api.recordMatch(id);
      matchCharacter(id);
      return id;
    },
  });
}

export function useSubmitChallengeMutation() {
  const saveChallenge = useAppStore((state) => state.saveChallenge);
  return useMutation({
    mutationFn: async ({ id, answers }: { id: string; answers: number[] }) => {
      const result = await api.submitChallenge(id, answers);
      saveChallenge(id, result);
      return result;
    },
  });
}
