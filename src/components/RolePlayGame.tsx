"use client";

import { useState } from "react";
import { useI18n } from "@/i18n/provider";
import type { Lesson } from "@/lib/types";

type Simulation = {
  scene: string;
  backdrop: string;
  steps: Array<{ emoji: string; label: string }>;
};

function simulationFor(lesson: Lesson): Simulation {
  const simulations: Record<string, Simulation> = {
    "greeting-friends": {
      scene: "Neighbourhood walkway",
      backdrop: "🏠 🌿 🏠",
      steps: [
        { emoji: "👵", label: "Smile and greet Auntie" },
        { emoji: "👨", label: "Say hello to Uncle" },
        { emoji: "🧒", label: "Welcome a new friend" },
      ],
    },
    "queue-kampung": {
      scene: "Busy canteen queue",
      backdrop: "🍜 🧍 🧍 🧍",
      steps: [
        { emoji: "🚶", label: "Join the back of the queue" },
        { emoji: "⏳", label: "Wait calmly for your turn" },
        { emoji: "🙌", label: "Take your turn fairly" },
      ],
    },
    "hari-raya-sharing": {
      scene: "Sharing at home",
      backdrop: "🏡 🍪 🧸",
      steps: [
        { emoji: "🎁", label: "Choose something to share" },
        { emoji: "🤝", label: "Offer it kindly" },
        { emoji: "😊", label: "See your friend smile" },
      ],
    },
    "eurasian-welcome": {
      scene: "Playground game",
      backdrop: "🛝 ⚽ 🌤️",
      steps: [
        { emoji: "👀", label: "Notice someone on their own" },
        { emoji: "👋", label: "Invite them to play" },
        { emoji: "⚽", label: "Make space for everyone" },
      ],
    },
    "please-thank-you": {
      scene: "Family kitchen",
      backdrop: "🏡 🍽️ 💛",
      steps: [
        { emoji: "🙏", label: "Ask kindly with please" },
        { emoji: "💬", label: "Say thank you" },
        { emoji: "❤️", label: "Say sorry when needed" },
      ],
    },
    "tidy-space": {
      scene: "Shared play corner",
      backdrop: "🧸 📚 🧺",
      steps: [
        { emoji: "🧸", label: "Put away a toy" },
        { emoji: "📚", label: "Stack the books neatly" },
        { emoji: "✨", label: "Leave the space nicer" },
      ],
    },
    "shoes-off": {
      scene: "Home doorway",
      backdrop: "🚪 👟 🏡",
      steps: [
        { emoji: "👟", label: "Take off your shoes" },
        { emoji: "🧺", label: "Place them neatly together" },
        { emoji: "🏠", label: "Enter with care" },
      ],
    },
    "listening-ears": {
      scene: "Story circle",
      backdrop: "📖 👂 🌈",
      steps: [
        { emoji: "👂", label: "Turn your listening ears on" },
        { emoji: "🤫", label: "Let the speaker finish" },
        { emoji: "💬", label: "Reply after listening" },
      ],
    },
    "playground-fair": {
      scene: "Playground turn-taking",
      backdrop: "🛝 🧒 ⚽",
      steps: [
        { emoji: "🙋", label: "Invite someone to join" },
        { emoji: "🔄", label: "Take turns fairly" },
        { emoji: "🎉", label: "Cheer for everyone" },
      ],
    },
    "mrt-kind-seat": {
      scene: "MRT ride",
      backdrop: "🚇 💺 🧓",
      steps: [
        { emoji: "👀", label: "Notice someone who needs a seat" },
        { emoji: "🪑", label: "Offer your seat politely" },
        { emoji: "😊", label: "Make their journey kinder" },
      ],
    },
    "recycle-hero": {
      scene: "Recycling corner",
      backdrop: "♻️ 🧴 📦",
      steps: [
        { emoji: "🧴", label: "Pick a clean, dry item" },
        { emoji: "♻️", label: "Put it in the recycling bin" },
        { emoji: "🌍", label: "Help care for our home" },
      ],
    },
  };

  return simulations[lesson.id] ?? {
    scene: "Everyday kampung moment",
    backdrop: "🏡 🌤️ 💛",
    steps: [
      { emoji: "👀", label: "Notice the moment" },
      { emoji: "💬", label: lesson.tryThis },
      { emoji: "❤️", label: "Choose a kind action" },
    ],
  };
}

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
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const simulation = simulationFor(lesson);
  const activeStep = simulation.steps[step];

  const advance = () => {
    if (step === simulation.steps.length - 1) {
      onComplete();
      return;
    }
    setStep((current) => current + 1);
  };

  if (complete) {
    return (
      <section className="rounded-[1.75rem] bg-emerald-50 p-5 ring-1 ring-emerald-200">
        <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-700">
          🎮 {t("lessonStepGame")}
        </p>
        <h2 className="mt-2 font-display text-xl text-emerald-900">{t("missionSimulationTitle")}</h2>
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

  return (
    <section className="space-y-4 rounded-[1.75rem] bg-gradient-to-br from-violet-100 via-fuchsia-50 to-amber-50 p-5 ring-1 ring-violet-200">
      <div>
        <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-violet-700">
          🎮 {t("lessonStepGame")}
        </p>
        <h2 className="mt-2 font-display text-xl text-violet-950">{t("missionSimulationTitle")}</h2>
        <p className="mt-1 text-sm font-semibold leading-relaxed text-violet-900/80">
          {t("missionSimulationBlurb")}
        </p>
      </div>

      {!started ? (
        <div className="rounded-[1.5rem] bg-white/75 p-5 text-center ring-1 ring-violet-200">
          <p className="text-5xl" aria-hidden>{simulation.backdrop}</p>
          <h3 className="mt-3 font-display text-xl text-violet-950">{simulation.scene}</h3>
          <p className="mt-2 text-sm font-bold text-violet-900/80">{lesson.tryThis}</p>
          <button type="button" onClick={() => setStarted(true)} className="kid-btn kid-btn-primary mt-4">
            {t("missionSimulationStart")}
          </button>
        </div>
      ) : (
        <div className="relative overflow-hidden rounded-[1.5rem] border-4 border-white bg-gradient-to-b from-sky-200 via-cyan-100 to-emerald-200 p-4 shadow-inner">
          <span className="pointer-events-none absolute left-3 top-2 text-3xl opacity-70" aria-hidden>☁️</span>
          <span className="pointer-events-none absolute right-3 top-7 text-2xl opacity-70" aria-hidden>☁️</span>
          <div className="relative flex min-h-56 flex-col items-center justify-between text-center">
            <div className="rounded-full bg-white/90 px-3 py-1 text-xs font-extrabold text-violet-900 shadow-sm">
              {t("missionSimulationProgress", { count: step + 1, target: simulation.steps.length })}
            </div>
            <div className="space-y-2">
              <p className="text-7xl drop-shadow-md" aria-hidden>{activeStep.emoji}</p>
              <p className="max-w-56 rounded-2xl bg-white/90 px-4 py-2 text-sm font-extrabold text-violet-950 shadow-sm">
                {activeStep.label}
              </p>
            </div>
            <button type="button" onClick={advance} className="kid-btn bg-violet-700 text-white shadow-violet-700/25">
              {t("missionSimulationDoAction")}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
