export type AgeBand = "4-6" | "7-9" | "10-12";

export type Pillar = "culture" | "manners" | "character";

export type Heritage =
  | "shared"
  | "chinese"
  | "malay"
  | "indian"
  | "eurasian";

export type ProofType = "parent-confirm" | "photo-note" | "reflection";

export type ProofStatus = "pending" | "approved" | "rejected";

export type GrownupRole = "parent" | "teacher";

export interface Lesson {
  id: string;
  title: string;
  pillar: Pillar;
  heritage: Heritage;
  ageBands: AgeBand[];
  summary: string;
  story: string;
  tryThis: string;
  reflectionPrompt: string;
  missionId: string;
  accent: string;
}

export interface Mission {
  id: string;
  lessonId: string;
  title: string;
  description: string;
  proofType: ProofType;
  proofHint: string;
  stars: number;
  badgeId: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface ChildProfile {
  name: string;
  ageBand: AgeBand;
  createdAt: string;
}

export interface MissionProof {
  missionId: string;
  note: string;
  submittedAt: string;
  status: ProofStatus;
  /** @deprecated use status */
  parentConfirmed?: boolean;
  starsEarned: number;
  reviewedAt?: string;
  reviewedBy?: GrownupRole;
}

export interface ProgressState {
  profile: ChildProfile | null;
  completedLessons: string[];
  proofs: MissionProof[];
  earnedBadges: string[];
  totalStars: number;
  parentPin: string;
}
