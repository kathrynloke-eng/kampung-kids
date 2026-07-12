"use client";

import Link from "next/link";
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
      className="group block animate-rise rounded-[1.75rem] bg-white/85 p-4 shadow-[0_12px_40px_rgba(15,118,110,0.08)] ring-1 ring-teal-900/5 transition hover:-translate-y-0.5 hover:shadow-[0_18px_50px_rgba(15,118,110,0.14)]"
    >
      <div className="flex items-start gap-3">
        <div
          className="mt-0.5 h-12 w-12 shrink-0 rounded-2xl"
          style={{
            background: `linear-gradient(145deg, ${lesson.accent}, ${lesson.accent}99)`,
          }}
          aria-hidden
        />
        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-teal-50 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-teal-800">
              {t(pillarKey)}
            </span>
            <span className="text-[11px] font-semibold text-slate-500">
              {t(heritageKey)}
            </span>
            {done ? (
              <span className="rounded-full bg-orange-100 px-2 py-0.5 text-[11px] font-bold text-orange-700">
                {t("done")}
              </span>
            ) : null}
          </div>
          <h3 className="font-display text-lg text-teal-950 group-hover:text-teal-800">
            {lesson.title}
          </h3>
          <p className="text-sm leading-relaxed text-slate-600">{lesson.summary}</p>
        </div>
      </div>
    </Link>
  );
}
