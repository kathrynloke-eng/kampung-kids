"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Onboarding } from "@/components/Onboarding";
import { StoryReader } from "@/components/StoryReader";
import {
  getLocalizedLesson,
  getLocalizedMission,
} from "@/i18n/content";
import { useI18n } from "@/i18n/provider";
import { useProgress } from "@/lib/progress";

export default function LessonDetailPage() {
  const params = useParams<{ lessonId: string }>();
  const { state, hydrated, completeLesson, isLessonComplete } = useProgress();
  const { t, locale } = useI18n();
  const lesson = getLocalizedLesson(params.lessonId, locale);

  if (!hydrated) return null;
  if (!state.profile) return <Onboarding />;

  if (!lesson) {
    return (
      <div className="rounded-3xl bg-white/80 p-6">
        <p>{t("lessonNotFound")}</p>
        <Link href="/learn" className="mt-3 inline-block font-bold text-teal-700">
          {t("backLearn")}
        </Link>
      </div>
    );
  }

  const mission = getLocalizedMission(lesson.missionId, locale);
  const done = isLessonComplete(lesson.id);

  return (
    <article className="space-y-5">
      <Link href="/learn" className="text-sm font-bold text-teal-700">
        {t("backLessons")}
      </Link>

      <header className="overflow-hidden rounded-[2rem] bg-white/90 ring-1 ring-teal-900/5">
        <div
          className="h-28 w-full"
          style={{
            background: `linear-gradient(120deg, ${lesson.accent}, ${lesson.accent}88 45%, #fff7ed)`,
          }}
        />
        <div className="space-y-2 px-5 pb-5 pt-4">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-teal-50 px-2.5 py-0.5 text-[11px] font-bold uppercase text-teal-800">
              {t(lesson.pillar)}
            </span>
            <span className="rounded-full bg-orange-50 px-2.5 py-0.5 text-[11px] font-bold uppercase text-orange-700">
              {t(lesson.heritage === "shared" ? "shared" : lesson.heritage)}
            </span>
          </div>
          <h1 className="font-display text-3xl text-teal-950">{lesson.title}</h1>
          <p className="text-slate-600">{lesson.summary}</p>
        </div>
      </header>

      <section className="space-y-2 rounded-[1.75rem] bg-white/85 p-5 ring-1 ring-teal-900/5">
        <h2 className="font-display text-xl text-teal-900">{t("storyTime")}</h2>
        <p className="leading-relaxed text-slate-700">{lesson.story}</p>
        <StoryReader text={lesson.story} />
      </section>

      <section className="space-y-2 rounded-[1.75rem] bg-orange-50/80 p-5 ring-1 ring-orange-200/70">
        <h2 className="font-display text-xl text-orange-800">{t("tryThis")}</h2>
        <p className="leading-relaxed text-orange-950/80">{lesson.tryThis}</p>
        <p className="pt-2 text-sm font-semibold text-orange-800">
          {t("think")} {lesson.reflectionPrompt}
        </p>
      </section>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => completeLesson(lesson.id)}
          className="flex-1 rounded-2xl bg-teal-700 px-4 py-3.5 text-sm font-bold text-white"
        >
          {done ? t("lessonDone") : t("finishLesson")}
        </button>
        {mission ? (
          <Link
            href={`/missions/${mission.id}`}
            className="flex-1 rounded-2xl bg-orange-500 px-4 py-3.5 text-center text-sm font-bold text-white"
          >
            {t("doMission")}
          </Link>
        ) : null}
      </div>
    </article>
  );
}
