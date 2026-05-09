export type Grade = 10 | 11 | 12;

export interface UserProfile {
  username: string;
  grade: Grade;
}

export interface ChallengeQuestion {
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
  challenge: ChallengeQuestion[];
}

export type ChatRole = "user" | "bot";

export interface ChatMessage {
  from: ChatRole;
  text: string;
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
}
