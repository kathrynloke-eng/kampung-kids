"use client";

import Link from "next/link";
import { Onboarding } from "@/components/Onboarding";
import { LessonCard } from "@/components/LessonCard";
import { localizedLessonsForAge, localizedMissions } from "@/i18n/content";
import { useI18n } from "@/i18n/provider";
import { useProgress } from "@/lib/progress";

export default function HomePage() {
  const { state, hydrated, isLessonComplete, isMissionApproved } = useProgress();
  const { t, locale } = useI18n();

  if (!hydrated) {
    return (
      <div className="rounded-[2rem] bg-white/70 p-8 text-center text-slate-500">
        {t("loading")}
      </div>
    );
  }

  if (!state.profile) {
    return <Onboarding />;
  }

  const ageLessons = localizedLessonsForAge(state.profile.ageBand, locale);
  const featured = ageLessons.slice(0, 3);
  const openMissions = localizedMissions(locale).filter(
    (m) =>
      ageLessons.some((l) => l.id === m.lessonId) && !isMissionApproved(m.id),
  ).length;

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[2.25rem] bg-teal-800 px-6 py-8 text-white shadow-[0_25px_60px_rgba(15,118,110,0.35)]">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-orange-400/30 blur-2xl" />
        <div className="absolute -bottom-16 left-10 h-44 w-44 rounded-full bg-cyan-300/20 blur-2xl" />
        <div className="relative space-y-3">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-teal-100">
            {t("brand")}
          </p>
          <h1 className="max-w-md font-display text-4xl leading-tight sm:text-5xl">
            {t("heroTitle")}
          </h1>
          <p className="max-w-md text-base leading-relaxed text-teal-50/90">
            {t("heroBlurb")}
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/learn"
              className="rounded-2xl bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/30"
            >
              {t("continueLearning")}
            </Link>
            <Link
              href="/missions"
              className="rounded-2xl bg-white/15 px-5 py-3 text-sm font-bold text-white ring-1 ring-white/30"
            >
              {t("openMissions", { count: openMissions })}
            </Link>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-3 gap-3">
        {[
          { label: t("lessonsDone"), value: state.completedLessons.length },
          { label: t("stars"), value: state.totalStars },
          { label: t("badges"), value: state.earnedBadges.length },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl bg-white/80 px-3 py-4 text-center ring-1 ring-teal-900/5"
          >
            <p className="font-display text-2xl text-teal-900">{stat.value}</p>
            <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
              {stat.label}
            </p>
          </div>
        ))}
      </section>

      <section className="space-y-3">
        <div className="flex items-end justify-between gap-3">
          <h2 className="font-display text-2xl text-teal-950">{t("forYourAge")}</h2>
          <Link href="/learn" className="text-sm font-bold text-teal-700">
            {t("seeAll")}
          </Link>
        </div>
        <div className="space-y-3">
          {featured.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              done={isLessonComplete(lesson.id)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
