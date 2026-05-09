/**
 * Challenge scoring — ported from main branch, enhanced with perfect bonus.
 */

import type { Character, ChallengeResult } from "@/types";
import { POINTS } from "@/lib/constants";

export function scoreChallenge(
  character: Character,
  answers: number[]
): ChallengeResult {
  const score = character.challenge.reduce(
    (total, question, index) =>
      total + (answers[index] === question.answer ? 1 : 0),
    0
  );
  const passed = score >= POINTS.PASS_THRESHOLD;
  const perfect = score === character.challenge.length;
  const awarded =
    POINTS.CHALLENGE_COMPLETE +
    (passed ? POINTS.CHALLENGE_PASS_BONUS : 0) +
    (perfect ? POINTS.PERFECT_SCORE_BONUS : 0);
  return { score, passed, perfect, awarded, answers: [...answers] };
}
