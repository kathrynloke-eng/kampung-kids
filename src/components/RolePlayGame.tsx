"use client";

import { useState } from "react";
import { useI18n } from "@/i18n/provider";
import type { Lesson } from "@/lib/types";

export function RolePlayGame({
  lesson,
  storyComplete,
  complete,
  onComplete,
}: {
  lesson: Lesson;
  storyComplete: boolean;
  complete: boolean;
  onComplete: () => void;
}) {
  const { t } = useI18n();
  const [answer, setAnswer] = useState<"kind" | "notKind" | "walkAway" | null>(null);

  if (complete) {
    return (
      <section className="rounded-[1.75rem] bg-emerald-50 p-5 ring-1 ring-emerald-200">
        <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-700">
          🎮 {t("lessonStepGame")}
        </p>
        <h2 className="mt-2 font-display text-xl text-emerald-900">{t("rolePlayTitle")}</h2>
        <p className="mt-1 font-semibold text-emerald-800">✓ {t("miniGameDone")}</p>
      </section>
    );
  }

  if (!storyComplete) {
    return (
      <section className="rounded-[1.75rem] bg-slate-100/90 p-5 text-slate-500 ring-1 ring-slate-200">
        <p className="text-xs font-extrabold uppercase tracking-[0.16em]">🔒 {t("lessonStepGame")}</p>
        <p className="mt-2 text-sm font-semibold">{t("gameLocked")}</p>
      </section>
    );
  }

  const options = [
    { id: "kind" as const, label: lesson.tryThis },
    { id: "notKind" as const, label: t("rolePlayNotKind") },
    { id: "walkAway" as const, label: t("rolePlayWalkAway") },
  ];
  const correct = answer === "kind";

  return (
    <section className="space-y-4 rounded-[1.75rem] bg-gradient-to-br from-violet-100 via-fuchsia-50 to-amber-50 p-5 ring-1 ring-violet-200">
      <div>
        <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-violet-700">
          🎮 {t("lessonStepGame")}
        </p>
        <h2 className="mt-2 font-display text-xl text-violet-950">{t("rolePlayTitle")}</h2>
        <p className="mt-1 text-sm font-semibold leading-relaxed text-violet-900/80">
          {t("rolePlayScenario", { prompt: lesson.reflectionPrompt })}
        </p>
        <p className="mt-2 text-sm font-extrabold text-violet-800">{t("rolePlayChoose")}</p>
      </div>
      <div className="space-y-2">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => setAnswer(option.id)}
            className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-bold transition ${
              answer === option.id
                ? option.id === "kind"
                  ? "bg-emerald-500 text-white ring-2 ring-emerald-300"
                  : "bg-rose-100 text-rose-800 ring-2 ring-rose-300"
                : "bg-white/90 text-violet-950 ring-1 ring-violet-200 hover:-translate-y-0.5"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
      {answer && !correct ? (
        <p className="rounded-xl bg-rose-100 px-3 py-2 text-sm font-bold text-rose-800">
          {t("rolePlayTryAgain")}
        </p>
      ) : null}
      {correct ? (
        <div className="space-y-3 rounded-2xl bg-emerald-100 p-3 text-emerald-900">
          <p className="text-sm font-extrabold">{t("rolePlayCorrect")}</p>
          <button type="button" onClick={onComplete} className="kid-btn kid-btn-primary w-full">
            {t("finishGame")}
          </button>
        </div>
      ) : null}
    </section>
  );
}
