"use client";

import { useMemo, useState } from "react";
import { LessonCard } from "@/components/LessonCard";
import { Onboarding } from "@/components/Onboarding";
import { localizedLessonsForAge } from "@/i18n/content";
import { useI18n } from "@/i18n/provider";
import { useProgress } from "@/lib/progress";
import type { Pillar } from "@/lib/types";

const filters: Array<"all" | Pillar> = ["all", "culture", "manners", "character"];

export default function LearnPage() {
  const { state, hydrated, isLessonComplete } = useProgress();
  const { t, locale } = useI18n();
  const [filter, setFilter] = useState<(typeof filters)[number]>("all");

  const list = useMemo(() => {
    if (!state.profile) return [];
    const base = localizedLessonsForAge(state.profile.ageBand, locale);
    if (filter === "all") return base;
    return base.filter((l) => l.pillar === filter);
  }, [state.profile, filter, locale]);

  if (!hydrated) return null;
  if (!state.profile) return <Onboarding />;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-3xl text-teal-950">{t("learnTitle")}</h1>
        <p className="mt-1 text-slate-600">{t("learnBlurb")}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            className={`rounded-full px-3.5 py-2 text-xs font-bold uppercase tracking-wide ${
              filter === item
                ? "bg-teal-700 text-white"
                : "bg-white/80 text-teal-800 ring-1 ring-teal-900/10"
            }`}
          >
            {item === "all" ? t("all") : t(item)}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {list.map((lesson) => (
          <LessonCard
            key={lesson.id}
            lesson={lesson}
            done={isLessonComplete(lesson.id)}
          />
        ))}
      </div>
    </div>
  );
}
