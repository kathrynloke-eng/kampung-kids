"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Onboarding } from "@/components/Onboarding";
import { ProofForm } from "@/components/ProofForm";
import {
  getLocalizedBadge,
  getLocalizedLesson,
  getLocalizedMission,
} from "@/i18n/content";
import { useI18n } from "@/i18n/provider";
import { useProgress } from "@/lib/progress";

export default function MissionDetailPage() {
  const params = useParams<{ missionId: string }>();
  const {
    state,
    hydrated,
    isLessonComplete,
    missionCompletionCount,
    hasBadge,
  } = useProgress();
  const { t, locale } = useI18n();
  const mission = getLocalizedMission(params.missionId, locale);

  if (!hydrated) return null;
  if (!state.profile) return <Onboarding />;

  if (!mission) {
    return (
      <div className="rounded-3xl bg-white/80 p-6">
        <p>{t("missionNotFound")}</p>
        <Link href="/missions" className="mt-3 inline-block font-bold text-teal-700">
          {t("backMissions")}
        </Link>
      </div>
    );
  }

  const lesson = getLocalizedLesson(mission.lessonId, locale);
  const lessonComplete = isLessonComplete(mission.lessonId);
  const badge = getLocalizedBadge(mission.badgeId, locale);
  const completionCount = missionCompletionCount(mission.id);
  const badgeEarned = hasBadge(mission.badgeId);

  if (!lessonComplete) {
    return (
      <div className="mx-auto max-w-md space-y-5 rounded-[2rem] bg-white/90 p-6 text-center ring-1 ring-teal-900/5">
        <p className="text-4xl" aria-hidden>🔒</p>
        <h1 className="font-display text-3xl text-teal-950">{t("missionLockedTitle")}</h1>
        <p className="text-sm font-semibold leading-relaxed text-slate-600">
          {t("missionLockedBlurb")}
        </p>
        <Link href={`/learn/${mission.lessonId}`} className="kid-btn kid-btn-primary w-full">
          {t("finishLessonFirst")}
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <Link href="/missions" className="text-sm font-bold text-teal-700">
        {t("backMissions")}
      </Link>

      <section className="rounded-[2rem] bg-white/90 p-5 ring-1 ring-teal-900/5">
        <p className="text-xs font-bold uppercase tracking-wide text-orange-600">
          {t("liveWhatLearned")}
        </p>
        <h1 className="mt-1 font-display text-3xl text-teal-950">{mission.title}</h1>
        <p className="mt-2 leading-relaxed text-slate-600">{mission.description}</p>
        <div className="mt-4 flex flex-wrap gap-2 text-sm">
          <span className="rounded-full bg-teal-50 px-3 py-1 font-semibold text-teal-800">
            {t("from")} {lesson?.title}
          </span>
          <span className="rounded-full bg-orange-50 px-3 py-1 font-semibold text-orange-700">
            {mission.stars} {t("stars")}
          </span>
          {badge ? (
            <span className="rounded-full bg-sky-50 px-3 py-1 font-semibold text-sky-800">
              {t("badge")} {badge.name}
            </span>
          ) : null}
        </div>
      </section>

      <section className="rounded-[1.75rem] bg-gradient-to-br from-sky-50 to-indigo-50 p-4 ring-1 ring-sky-200/80">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-sky-700">
              🏅 {t("badgeTrackerTitle")}
            </p>
            <p className="mt-1 text-sm font-bold text-slate-700">
              {badgeEarned
                ? t("badgeTrackerUnlocked")
                : t("badgeTrackerProgress", { count: completionCount, target: 5 })}
            </p>
          </div>
          <div className="rounded-2xl bg-white px-3 py-2 text-center shadow-sm ring-1 ring-sky-200">
            <p className="font-display text-2xl leading-none text-sky-800">
              {badgeEarned ? "✓" : completionCount}
            </p>
            <p className="text-[10px] font-extrabold uppercase text-sky-700">
              {badgeEarned ? t("earned") : " / 5"}
            </p>
          </div>
        </div>
      </section>

      <ProofForm mission={mission} />
    </div>
  );
}
