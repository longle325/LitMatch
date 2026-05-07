import { describe, it, expect, beforeEach } from "vitest";
import { useGameStore } from "@/stores/game-store";

describe("gameStore", () => {
  beforeEach(() => {
    // Reset store to initial state before each test
    useGameStore.getState().resetAll();
  });

  it("starts with null profile and zero points", () => {
    const state = useGameStore.getState();
    expect(state.profile).toBeNull();
    expect(state.points).toBe(0);
    expect(state.matches).toEqual([]);
  });

  it("setProfile stores the user profile", () => {
    useGameStore.getState().setProfile({ username: "Test", grade: 11 });
    expect(useGameStore.getState().profile).toEqual({
      username: "Test",
      grade: 11,
    });
  });

  it("matchCharacter adds to matches and awards 10 points", () => {
    useGameStore.getState().matchCharacter("chi-pheo");
    const state = useGameStore.getState();
    expect(state.matches).toContain("chi-pheo");
    expect(state.points).toBe(10);
  });

  it("matchCharacter is idempotent", () => {
    useGameStore.getState().matchCharacter("chi-pheo");
    useGameStore.getState().matchCharacter("chi-pheo");
    expect(useGameStore.getState().points).toBe(10);
    expect(useGameStore.getState().matches).toHaveLength(1);
  });

  it("skipCharacter adds to skipped list", () => {
    useGameStore.getState().skipCharacter("mi");
    expect(useGameStore.getState().skipped).toContain("mi");
  });

  it("completeChallenge calculates score and awards points", () => {
    useGameStore.getState().matchCharacter("chi-pheo");
    const result = useGameStore.getState().completeChallenge(
      "chi-pheo",
      [1, 1, 0, 1, 1], // user answers
      [1, 1, 0, 1, 1]  // correct answers — 5/5
    );
    expect(result.score).toBe(5);
    expect(result.passed).toBe(true);
    expect(result.perfect).toBe(true);
    expect(result.awarded).toBe(115); // 50 + 40 + 25
    expect(useGameStore.getState().points).toBe(10 + 115);
  });

  it("retryChallenge subtracts previous points", () => {
    useGameStore.getState().matchCharacter("chi-pheo");
    useGameStore.getState().completeChallenge("chi-pheo", [1, 1, 0, 1, 1], [1, 1, 0, 1, 1]);
    const pointsBefore = useGameStore.getState().points;
    useGameStore.getState().retryChallenge("chi-pheo");
    expect(useGameStore.getState().points).toBe(pointsBefore - 115);
    expect(useGameStore.getState().completed["chi-pheo"]).toBeUndefined();
  });

  it("resetAll restores initial state", () => {
    useGameStore.getState().setProfile({ username: "A", grade: 10 });
    useGameStore.getState().matchCharacter("mi");
    useGameStore.getState().resetAll();
    const state = useGameStore.getState();
    expect(state.profile).toBeNull();
    expect(state.points).toBe(0);
    expect(state.matches).toEqual([]);
  });
});
