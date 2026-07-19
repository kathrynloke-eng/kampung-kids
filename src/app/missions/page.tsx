"use client";

import { MissionCard } from "@/components/MissionCard";
import { Onboarding } from "@/components/Onboarding";
import {
  getLocalizedLesson,
  localizedLessonsForAge,
  localizedMissions,
} from "@/i18n/content";
import { useI18n } from "@/i18n/provider";
import { useProgress } from "@/lib/progress";

export default function MissionsPage() {
  const {
    state,
    hydrated,
    isLessonComplete,
    isMissionApproved,
    isMissionPending,
  } = useProgress();
  const { t, locale } = useI18n();

  if (!hydrated) return null;
  if (!state.profile) return <Onboarding />;

  const ageLessonIds = new Set(
    localizedLessonsForAge(state.profile.ageBand, locale).map((l) => l.id),
  );
  const visible = localizedMissions(locale).filter((m) =>
    ageLessonIds.has(m.lessonId),
  );

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-3xl text-teal-950">{t("missionsTitle")}</h1>
        <p className="mt-1 text-slate-600">{t("missionsBlurb")}</p>
      </div>

      <div className="space-y-3">
        {visible.map((mission) => {
          const lesson = getLocalizedLesson(mission.lessonId, locale);
          return (
            <MissionCard
              key={mission.id}
              mission={mission}
              lessonTitle={lesson?.title ?? "Lesson"}
              lessonComplete={isLessonComplete(mission.lessonId)}
              complete={isMissionApproved(mission.id)}
              pending={isMissionPending(mission.id)}
            />
          );
        })}
      </div>
    </div>
  );
}
