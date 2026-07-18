import { getMission, lessons } from "@/data/content";
import { dateKey, daysSince } from "@/lib/dates";
import type {
  AgeBand,
  Lesson,
  Mission,
  PracticeEntry,
  ProgressState,
} from "@/lib/types";

export type PracticeSuggestion =
  | {
      kind: "revisit";
      lesson: Lesson;
      mission: Mission;
      daysSincePractice: number;
    }
  | {
      kind: "finish-mission";
      lesson: Lesson;
      mission: Mission;
    }
  | {
      kind: "new-lesson";
      lesson: Lesson;
      mission: Mission;
    }
  | {
      kind: "free-pick";
      lesson: Lesson;
      mission: Mission;
    };

function lastPracticeForMission(
  entries: PracticeEntry[],
  proofs: ProgressState["proofs"],
  missionId: string,
): string | null {
  const fromEntries = entries
    .filter((e) => e.missionId === missionId)
    .map((e) => e.submittedAt);
  const fromProofs = proofs
    .filter((p) => p.missionId === missionId && p.status === "approved")
    .map((p) => p.reviewedAt ?? p.submittedAt);
  const all = [...fromEntries, ...fromProofs].sort();
  return all.length ? all[all.length - 1] : null;
}

export function practicedToday(
  state: ProgressState,
  today = dateKey(),
): boolean {
  return state.practiceDates.includes(today);
}

export function getPracticeSuggestion(
  state: ProgressState,
  ageBand: AgeBand,
  today = dateKey(),
): PracticeSuggestion | null {
  const ageLessons = lessons.filter((l) => l.ageBands.includes(ageBand));
  if (ageLessons.length === 0) return null;

  // 1) Revisit an approved skill not practiced recently (3+ days)
  const revisits = ageLessons
    .map((lesson) => {
      const mission = getMission(lesson.missionId);
      if (!mission) return null;
      const approved = state.proofs.some(
        (p) => p.missionId === mission.id && p.status === "approved",
      );
      if (!approved) return null;
      const last = lastPracticeForMission(
        state.practiceEntries,
        state.proofs,
        mission.id,
      );
      if (!last) return null;
      const gap = daysSince(last, today);
      if (gap < 3) return null;
      const practicedTodayAlready = state.practiceEntries.some(
        (e) => e.missionId === mission.id && e.dateKey === today,
      );
      if (practicedTodayAlready) return null;
      return { lesson, mission, gap };
    })
    .filter(Boolean) as Array<{
    lesson: Lesson;
    mission: Mission;
    gap: number;
  }>;

  revisits.sort((a, b) => b.gap - a.gap);
  if (revisits[0]) {
    return {
      kind: "revisit",
      lesson: revisits[0].lesson,
      mission: revisits[0].mission,
      daysSincePractice: revisits[0].gap,
    };
  }

  // 2) Finish a mission whose lesson is done but not approved yet
  for (const lesson of ageLessons) {
    if (!state.completedLessons.includes(lesson.id)) continue;
    const mission = getMission(lesson.missionId);
    if (!mission) continue;
    const approved = state.proofs.some(
      (p) => p.missionId === mission.id && p.status === "approved",
    );
    const pending = state.proofs.some(
      (p) => p.missionId === mission.id && p.status === "pending",
    );
    if (!approved && !pending) {
      return { kind: "finish-mission", lesson, mission };
    }
    if (pending) {
      return { kind: "finish-mission", lesson, mission };
    }
  }

  // 3) Start next unfinished lesson
  for (const lesson of ageLessons) {
    if (state.completedLessons.includes(lesson.id)) continue;
    const mission = getMission(lesson.missionId);
    if (!mission) continue;
    return { kind: "new-lesson", lesson, mission };
  }

  // 4) Free pick — any favorite approved skill for today's keep-up
  const favorites = ageLessons
    .map((lesson) => {
      const mission = getMission(lesson.missionId);
      if (!mission) return null;
      const approved = state.proofs.some(
        (p) => p.missionId === mission.id && p.status === "approved",
      );
      if (!approved) return null;
      const doneToday = state.practiceEntries.some(
        (e) => e.missionId === mission.id && e.dateKey === today,
      );
      if (doneToday) return null;
      return { lesson, mission };
    })
    .filter(Boolean) as Array<{ lesson: Lesson; mission: Mission }>;

  if (favorites[0]) {
    return {
      kind: "free-pick",
      lesson: favorites[0].lesson,
      mission: favorites[0].mission,
    };
  }

  // Fallback first lesson
  const lesson = ageLessons[0];
  const mission = getMission(lesson.missionId);
  if (!mission) return null;
  return { kind: "free-pick", lesson, mission };
}
