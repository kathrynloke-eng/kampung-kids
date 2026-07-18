"use client";

import { useMemo, useState } from "react";
import { LessonCard } from "@/components/LessonCard";
import { Onboarding } from "@/components/Onboarding";
import { learningClasses, resolveClassId } from "@/data/classes";
import { localizedLessonsForAge } from "@/i18n/content";
import { useI18n } from "@/i18n/provider";
import { useProgress } from "@/lib/progress";
import type { ClassId, Pillar } from "@/lib/types";

const pillarFilters: Array<"all" | Pillar> = ["all", "culture", "manners", "character"];

export default function LearnPage() {
  const { state, hydrated, isLessonComplete } = useProgress();
  const { t, locale } = useI18n();
  const [filter, setFilter] = useState<(typeof pillarFilters)[number]>("all");
  const [classFilter, setClassFilter] = useState<"all" | ClassId>("all");

  const list = useMemo(() => {
    if (!state.profile) return [];
    let base = localizedLessonsForAge(state.profile.ageBand, locale);
    if (filter !== "all") base = base.filter((l) => l.pillar === filter);
    if (classFilter !== "all") {
      base = base.filter(
        (l) => resolveClassId(l.id, l.classId) === classFilter,
      );
    }
    return base;
  }, [state.profile, filter, classFilter, locale]);

  const grouped = useMemo(() => {
    const map = new Map<ClassId, typeof list>();
    for (const lesson of list) {
      const cid = resolveClassId(lesson.id, lesson.classId);
      const arr = map.get(cid) ?? [];
      arr.push(lesson);
      map.set(cid, arr);
    }
    return learningClasses
      .map((c) => ({ classId: c.id, lessons: map.get(c.id) ?? [] }))
      .filter((g) => g.lessons.length > 0);
  }, [list]);

  if (!hydrated) return null;
  if (!state.profile) return <Onboarding />;

  const classLabel = (id: ClassId) => {
    if (id === "friendly-voices") return t("classFriendlyVoices");
    if (id === "festival-friends") return t("classFestivalFriends");
    if (id === "kind-heart") return t("classKindHeart");
    if (id === "kampung-care") return t("classKampungCare");
    return t("classBraveCharacter");
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-3xl text-teal-950">{t("learnTitle")}</h1>
        <p className="mt-1 text-slate-600">{t("learnBlurb")}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {pillarFilters.map((item) => (
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

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setClassFilter("all")}
          className={`rounded-full px-3 py-1.5 text-[11px] font-extrabold ${
            classFilter === "all"
              ? "bg-orange-500 text-white"
              : "bg-orange-50 text-orange-800"
          }`}
        >
          {t("allClasses")}
        </button>
        {learningClasses.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setClassFilter(c.id)}
            className={`rounded-full px-3 py-1.5 text-[11px] font-extrabold ${
              classFilter === c.id
                ? "bg-orange-500 text-white"
                : "bg-orange-50 text-orange-800"
            }`}
          >
            {classLabel(c.id)}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {grouped.map((group) => (
          <section key={group.classId} className="space-y-3">
            <h2 className="font-display text-xl text-teal-900">
              {classLabel(group.classId)}
            </h2>
            {group.lessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                done={isLessonComplete(lesson.id)}
              />
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
