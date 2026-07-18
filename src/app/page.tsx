"use client";

import Link from "next/link";
import { Onboarding } from "@/components/Onboarding";
import { DailyPractice } from "@/components/DailyPractice";
import { LessonCard } from "@/components/LessonCard";
import { Mascot, SunnyClouds } from "@/components/KidArt";
import { localizedLessonsForAge, localizedMissions } from "@/i18n/content";
import { useI18n } from "@/i18n/provider";
import { useProgress } from "@/lib/progress";
import { useConvexAuth } from "convex/react";
import { ParentAuth } from "@/components/ParentAuth";

export default function HomePage() {
  const { isAuthenticated, isLoading: authLoading } = useConvexAuth();
  const { state, hydrated, isLessonComplete, isMissionApproved } = useProgress();
  const { t, locale } = useI18n();

  if (authLoading) {
    return <div className="kid-panel p-8 text-center text-slate-500">Getting things ready…</div>;
  }

  if (!isAuthenticated) {
    return <ParentAuth />;
  }

  if (!hydrated) {
    return (
      <div className="kid-panel p-8 text-center text-slate-500">{t("loading")}</div>
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
  const journeySteps = [
    { icon: "📖", label: t("lessonsDone"), complete: state.completedLessons.length > 0 },
    { icon: "🚀", label: t("navMissions"), complete: state.proofs.length > 0 },
    { icon: "🏆", label: t("badges"), complete: state.earnedBadges.length > 0 },
  ];

  return (
    <div className="space-y-7">
      <section className="relative overflow-hidden rounded-[2.4rem] bg-gradient-to-br from-teal-600 via-teal-700 to-cyan-800 px-5 pb-6 pt-5 text-white shadow-[0_28px_60px_rgba(15,118,110,0.35)]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 opacity-90">
          <SunnyClouds className="h-full w-full" />
        </div>
        <div className="relative grid gap-4 sm:grid-cols-[1.2fr_0.8fr] sm:items-end">
          <div className="space-y-3 pt-6">
            <div className="flex flex-wrap items-center gap-2">
              <p className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.18em] text-teal-50">
                {t("brand")}
              </p>
              <span className="rounded-full bg-amber-300/95 px-2.5 py-1 text-xs font-extrabold text-amber-950 shadow-sm">
                ★ {state.totalStars}
              </span>
            </div>
            <h1 className="max-w-md font-display text-4xl leading-[1.05] sm:text-5xl">
              {t("heroTitle")}
            </h1>
            <p className="max-w-md text-base font-semibold leading-relaxed text-teal-50/95">
              {t("heroBlurb")}
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <Link href="/learn" className="kid-btn kid-btn-primary">
                {t("continueLearning")}
              </Link>
              <Link href="/missions" className="kid-btn kid-btn-ghost">
                {t("openMissions", { count: openMissions })}
              </Link>
            </div>
          </div>
          <div className="mx-auto w-36 animate-float sm:w-44 sm:justify-self-end">
            <Mascot mood="cheer" className="h-auto w-full drop-shadow-lg" />
          </div>
        </div>
      </section>

      <section className="kid-panel-playful animate-rise p-4" aria-label={t("brand")}>
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-orange-600">
              {t("practiceToday")}
            </p>
            <p className="mt-0.5 font-display text-lg text-teal-950">
              {t("continueLearning")}
            </p>
          </div>
          <span className="animate-twinkle text-2xl" aria-hidden>✨</span>
        </div>
        <div className="mt-3 flex items-center justify-between px-1">
          {journeySteps.map((step) => (
            <div key={step.label} className="flex flex-col items-center gap-1.5">
              <span
                className={`quest-step ${step.complete ? "quest-step-done" : ""}`}
                title={step.label}
              >
                {step.complete ? "✓" : step.icon}
              </span>
              <span className="max-w-16 text-center text-[9px] font-extrabold uppercase tracking-wide text-teal-800">
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      <DailyPractice />

      <section className="grid grid-cols-3 gap-3">
        {[
          {
            label: t("lessonsDone"),
            value: state.completedLessons.length,
            tone: "bg-teal-100 text-teal-800",
            href: "/learn",
          },
          {
            label: t("stars"),
            value: state.totalStars,
            tone: "bg-amber-100 text-amber-800",
            href: "/awards#stars",
          },
          {
            label: t("badges"),
            value: state.earnedBadges.length,
            tone: "bg-orange-100 text-orange-800",
            href: "/awards#badges",
          },
        ].map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className={`stat-bubble ${stat.tone} transition hover:-translate-y-1 hover:brightness-105 active:scale-[0.98]`}
          >
            <p className="font-display text-3xl leading-none">{stat.value}</p>
            <p className="mt-1 text-[10px] font-extrabold uppercase tracking-wide opacity-80">
              {stat.label}
            </p>
          </Link>
        ))}
      </section>

      <section className="space-y-3">
        <div className="flex items-end justify-between gap-3">
          <h2 className="font-display text-2xl text-teal-950">{t("forYourAge")}</h2>
          <Link
            href="/learn"
            className="rounded-full bg-teal-700 px-3 py-1.5 text-xs font-extrabold text-white"
          >
            {t("seeAll")}
          </Link>
        </div>
        <div className="space-y-3">
          {featured.map((lesson, i) => (
            <div key={lesson.id} style={{ animationDelay: `${i * 60}ms` }}>
              <LessonCard
                lesson={lesson}
                done={isLessonComplete(lesson.id)}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
