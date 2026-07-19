"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/i18n/provider";
import type { Lesson } from "@/lib/types";

const STAR_TARGET = 5;
const starPositions = [
  { left: 12, top: 58 },
  { left: 34, top: 28 },
  { left: 61, top: 64 },
  { left: 78, top: 24 },
  { left: 49, top: 42 },
  { left: 23, top: 20 },
  { left: 84, top: 57 },
  { left: 40, top: 72 },
];

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
  const [playing, setPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [positionIndex, setPositionIndex] = useState(0);

  useEffect(() => {
    if (!playing || score >= STAR_TARGET) return;
    const timer = window.setInterval(() => {
      setPositionIndex((current) => {
        const step = 1 + Math.floor(Math.random() * (starPositions.length - 1));
        return (current + step) % starPositions.length;
      });
    }, 900);
    return () => window.clearInterval(timer);
  }, [playing, score]);

  const startGame = () => {
    setScore(0);
    setPositionIndex(Math.floor(Math.random() * starPositions.length));
    setPlaying(true);
  };

  const catchStar = () => {
    const nextScore = score + 1;
    setScore(nextScore);
    if (nextScore >= STAR_TARGET) {
      setPlaying(false);
      onComplete();
      return;
    }
    setPositionIndex((current) => (current + 2) % starPositions.length);
  };

  if (complete) {
    return (
      <section className="rounded-[1.75rem] bg-emerald-50 p-5 ring-1 ring-emerald-200">
        <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-700">
          🎮 {t("lessonStepGame")}
        </p>
        <h2 className="mt-2 font-display text-xl text-emerald-900">{t("kindnessDashTitle")}</h2>
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

  const position = starPositions[positionIndex];

  return (
    <section className="space-y-4 rounded-[1.75rem] bg-gradient-to-br from-violet-100 via-fuchsia-50 to-amber-50 p-5 ring-1 ring-violet-200">
      <div>
        <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-violet-700">
          🎮 {t("lessonStepGame")}
        </p>
        <h2 className="mt-2 font-display text-xl text-violet-950">{t("kindnessDashTitle")}</h2>
        <p className="mt-1 text-sm font-semibold leading-relaxed text-violet-900/80">
          {t("rolePlayScenario", { prompt: lesson.tryThis })}
        </p>
      </div>

      {!playing ? (
        <div className="rounded-[1.5rem] bg-white/75 p-4 text-center ring-1 ring-violet-200">
          <p className="text-4xl" aria-hidden>🌟</p>
          <p className="mt-2 text-sm font-bold leading-relaxed text-violet-950">
            {t("kindnessDashBlurb", { target: STAR_TARGET })}
          </p>
          <button type="button" onClick={startGame} className="kid-btn kid-btn-primary mt-4">
            {t("kindnessDashStart")}
          </button>
        </div>
      ) : (
        <div
          className="relative h-60 overflow-hidden rounded-[1.5rem] border-4 border-white bg-gradient-to-b from-sky-200 via-cyan-100 to-emerald-200 shadow-inner"
          aria-label={t("kindnessDashTitle")}
        >
          <span className="pointer-events-none absolute left-4 top-5 text-4xl opacity-70" aria-hidden>☁️</span>
          <span className="pointer-events-none absolute right-5 top-10 text-3xl opacity-70" aria-hidden>☁️</span>
          <span className="pointer-events-none absolute bottom-2 left-5 text-5xl" aria-hidden>🌳</span>
          <span className="pointer-events-none absolute bottom-3 right-5 text-4xl" aria-hidden>🏡</span>
          <div className="absolute left-4 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-extrabold text-violet-900 shadow-sm">
            ⭐ {t("kindnessDashProgress", { count: score, target: STAR_TARGET })}
          </div>
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-violet-700 px-3 py-1 text-xs font-extrabold text-white shadow-sm">
            {t("kindnessDashCatch")}
          </p>
          <button
            type="button"
            onClick={catchStar}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full p-2 text-5xl drop-shadow-[0_4px_4px_rgba(109,40,217,0.35)] transition-[left,top,transform] duration-500 hover:scale-125 focus:scale-125"
            style={{ left: `${position.left}%`, top: `${position.top}%` }}
            aria-label={t("kindnessDashCatch")}
          >
            ⭐
          </button>
        </div>
      )}

      <p aria-live="polite" className="sr-only">
        {t("kindnessDashProgress", { count: score, target: STAR_TARGET })}
      </p>
    </section>
  );
}
