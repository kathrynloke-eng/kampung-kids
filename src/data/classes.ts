export type ClassId =
  | "friendly-voices"
  | "festival-friends"
  | "kind-heart"
  | "kampung-care"
  | "brave-character";

export interface LearningClass {
  id: ClassId;
  accent: string;
}

export const learningClasses: LearningClass[] = [
  { id: "friendly-voices", accent: "#0D9488" },
  { id: "festival-friends", accent: "#DC2626" },
  { id: "kind-heart", accent: "#D97706" },
  { id: "kampung-care", accent: "#0284C7" },
  { id: "brave-character", accent: "#0F766E" },
];

/** Fallback mapping for lessons without an explicit classId */
export const lessonClassMap: Record<string, ClassId> = {
  "greeting-friends": "friendly-voices",
  "salam-respect": "friendly-voices",
  "please-thank-you": "friendly-voices",
  "cny-respect": "festival-friends",
  "hari-raya-sharing": "festival-friends",
  "deepavali-light": "festival-friends",
  "eurasian-welcome": "kind-heart",
  "honest-heart": "brave-character",
  "racial-harmony": "brave-character",
  "queue-kampung": "kampung-care",
  "tidy-space": "kampung-care",
  "shoes-off": "kampung-care",
};

export function resolveClassId(lessonId: string, classId?: ClassId): ClassId {
  return classId ?? lessonClassMap[lessonId] ?? "kind-heart";
}
