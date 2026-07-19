"use client";

import Link from "next/link";
import { PillarGlyph } from "@/components/KidArt";
import { useI18n } from "@/i18n/provider";
import type { Lesson } from "@/lib/types";

export function LessonCard({
  lesson,
  done,
}: {
  lesson: Lesson;
  done?: boolean;
}) {
  const { t } = useI18n();

  const pillarKey =
    lesson.pillar === "culture"
      ? "culture"
      : lesson.pillar === "manners"
        ? "manners"
        : "character";

  const heritageKey =
    lesson.heritage === "shared"
      ? "shared"
      : lesson.heritage === "chinese"
        ? "chinese"
        : lesson.heritage === "malay"
          ? "malay"
          : lesson.heritage === "indian"
            ? "indian"
            : "eurasian";

  return (
    <Link
      href={`/learn/${lesson.id}`}
      className="group block animate-rise overflow-hidden rounded-[1.85rem] bg-white/90 p-4 shadow-[0_14px_36px_rgba(15,118,110,0.1)] outline outline-2 outline-white transition hover:-translate-y-1 hover:shadow-[0_20px_44px_rgba(15,118,110,0.16)]"
    >
      <div className="flex items-start gap-3">
        <div className="h-16 w-16 shrink-0 transition group-hover:rotate-3 group-hover:scale-105">
          <PillarGlyph pillar={lesson.pillar} accent={lesson.accent} />
        </div>
        <div className="min-w-0 flex-1 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-teal-100 px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wide text-teal-800">
              {t(pillarKey)}
            </span>
            <span className="text-[11px] font-bold text-slate-500">
              {t(heritageKey)}
            </span>
            {done ? (
              <span className="rounded-full bg-amber-200 px-2 py-0.5 text-[11px] font-extrabold text-amber-900">
                ✓ {t("done")}
              </span>
            ) : null}
          </div>
          <h3 className="font-display text-xl leading-tight text-teal-950 group-hover:text-teal-800">
            {lesson.title}
          </h3>
          <p className="text-sm font-semibold leading-relaxed text-slate-600">
            {lesson.summary}
          </p>
          <p className="pt-1 text-sm font-extrabold text-orange-600">
            {done ? t("missionReminderCta") : t("continueLearning")} →
          </p>
        </div>
      </div>
    </Link>
  );
}
