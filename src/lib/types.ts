export type AgeBand = "4-6" | "7-9" | "10-12";

export type Pillar = "culture" | "manners" | "character";

export type Heritage =
  | "shared"
  | "chinese"
  | "malay"
  | "indian"
  | "eurasian";

export type ClassId =
  | "friendly-voices"
  | "festival-friends"
  | "kind-heart"
  | "kampung-care"
  | "brave-character";

export type ProofType = "parent-confirm" | "photo-note" | "reflection";

export type ProofStatus = "pending" | "approved" | "rejected";

export type GrownupRole = "parent" | "teacher";

export type RedemptionStatus = "pending" | "fulfilled" | "cancelled";

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
  classId?: ClassId;
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
  parentConfirmed?: boolean;
  starsEarned: number;
  reviewedAt?: string;
  reviewedBy?: GrownupRole;
  drawingDataUrl?: string;
  audioDataUrl?: string;
  transcript?: string;
}

export interface PracticeEntry {
  id: string;
  missionId: string;
  lessonId: string;
  submittedAt: string;
  dateKey: string;
  note: string;
  transcript?: string;
  drawingDataUrl?: string;
  audioDataUrl?: string;
}

export interface RewardItem {
  id: string;
  title: string;
  description: string;
  cost: number;
  emoji: string;
  enabled: boolean;
  custom?: boolean;
}

export interface RewardRedemption {
  id: string;
  rewardId: string;
  title: string;
  emoji: string;
  cost: number;
  status: RedemptionStatus;
  requestedAt: string;
  fulfilledAt?: string;
}

export interface ProgressState {
  profile: ChildProfile | null;
  completedLessons: string[];
  proofs: MissionProof[];
  earnedBadges: string[];
  totalStars: number;
  parentPin: string;
  practiceDates: string[];
  practiceEntries: PracticeEntry[];
  rewards: RewardItem[];
  redemptions: RewardRedemption[];
}
