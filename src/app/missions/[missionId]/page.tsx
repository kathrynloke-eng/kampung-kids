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
  const { state, hydrated } = useProgress();
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
  const badge = getLocalizedBadge(mission.badgeId, locale);

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

      <ProofForm mission={mission} />
    </div>
  );
}
