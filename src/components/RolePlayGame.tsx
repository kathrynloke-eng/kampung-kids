"use client";

import { useState, type ReactNode } from "react";
import { useI18n } from "@/i18n/provider";
import type { Lesson } from "@/lib/types";

type SceneKind = "conversation" | "queue" | "sort" | "help" | "share";

type Scene = {
  kind: SceneKind;
  title: string;
  setting: string;
  backdrop: string;
};

function sceneFor(lesson: Lesson): Scene {
  if (["greeting-friends", "salam-respect", "neighbour-hello"].includes(lesson.id)) {
    return { kind: "conversation", title: "Hello, neighbour!", setting: "HDB corridor", backdrop: "🏠 🌿 🏠" };
  }
  if (["queue-kampung", "playground-fair"].includes(lesson.id)) {
    return { kind: "queue", title: "Take your turn", setting: lesson.id === "queue-kampung" ? "Canteen queue" : "Playground", backdrop: lesson.id === "queue-kampung" ? "🍜 🧍 🧍 🧍" : "🛝 🧒 ⚽" };
  }
  if (["tidy-space", "shoes-off", "recycle-hero", "chopsticks-care"].includes(lesson.id)) {
    return { kind: "sort", title: "Put things in their home", setting: lesson.id === "recycle-hero" ? "Recycling corner" : "Home and play space", backdrop: lesson.id === "recycle-hero" ? "♻️ 🧴 📦" : "🧸 📚 🧺" };
  }
  if (["hari-raya-sharing", "eurasian-welcome", "mid-autumn-share", "national-day-pride", "team-play-spirit", "table-manners-sg"].includes(lesson.id)) {
    return { kind: "share", title: "Make someone feel included", setting: "Kampung gathering", backdrop: "🏡 🎁 😊" };
  }
  if (["deepavali-light", "help-at-home", "mrt-kind-seat", "vesak-compassion"].includes(lesson.id)) {
    return { kind: "help", title: "Spot a chance to help", setting: lesson.id === "mrt-kind-seat" ? "MRT carriage" : "Home and community", backdrop: lesson.id === "mrt-kind-seat" ? "🚇 💺 🧓" : "🏡 💛 🌤️" };
  }
  return { kind: "conversation", title: "Kind words in action", setting: "Everyday kampung moment", backdrop: "🏡 💬 🌈" };
}

function GameShell({
  children,
  title,
  setting,
  backdrop,
  progress,
}: {
  children: ReactNode;
  title: string;
  setting: string;
  backdrop: string;
  progress: string;
}) {
  return (
    <div className="relative min-h-72 overflow-hidden rounded-[1.6rem] border-4 border-white bg-gradient-to-b from-sky-200 via-cyan-100 to-emerald-200 p-4 shadow-inner">
      <span className="pointer-events-none absolute left-3 top-2 text-3xl opacity-70" aria-hidden>☁️</span>
      <span className="pointer-events-none absolute right-3 top-8 text-2xl opacity-70" aria-hidden>☁️</span>
      <div className="relative flex items-center justify-between gap-2">
        <div className="rounded-full bg-white/90 px-3 py-1 text-xs font-extrabold text-violet-900 shadow-sm">{progress}</div>
        <span className="text-xl" aria-hidden>{backdrop}</span>
      </div>
      <div className="relative mt-3 text-center">
        <p className="font-display text-xl text-violet-950">{title}</p>
        <p className="text-xs font-bold text-violet-800">📍 {setting}</p>
      </div>
      {children}
    </div>
  );
}

function ConversationScene({ scene, prompt, onDone }: { scene: Scene; prompt: string; onDone: () => void }) {
  const { t } = useI18n();
  const greetingScene = scene.title === "Hello, neighbour!";
  const people = greetingScene
    ? [
        { emoji: "👵", name: "Auntie Mei", line: "A warm greeting makes my day!" },
        { emoji: "👨🏽", name: "Uncle Raj", line: "Hello, neighbour!" },
        { emoji: "🧒🏾", name: "A new friend", line: "Thanks for welcoming me!" },
      ]
    : [
        { emoji: "👨‍👩‍👧", name: "Family", line: "Kind words help us feel close." },
        { emoji: "🧒🏽", name: "Friend", line: "Thanks for speaking with care!" },
        { emoji: "🧑🏽‍🏫", name: "Teacher", line: "That was thoughtful and brave." },
      ];
  const [step, setStep] = useState(0);
  const person = people[step];
  const act = () => {
    if (step === people.length - 1) onDone();
    else setStep((current) => current + 1);
  };

  return (
    <GameShell title={scene.title} setting={scene.setting} backdrop={scene.backdrop} progress={t("missionSimulationProgress", { count: step + 1, target: people.length })}>
      <div className="mt-5 flex flex-col items-center gap-3">
        <button type="button" onClick={act} className="group rounded-full bg-white/85 p-4 text-7xl shadow-lg transition hover:scale-110 active:scale-95" aria-label={`Greet ${person.name}`}>
          <span className="inline-block animate-bounce">{person.emoji}</span>
        </button>
        <div className="rounded-2xl bg-white/90 px-4 py-3 text-center shadow-sm">
          <p className="font-display text-lg text-violet-950">{person.name}</p>
          <p className="mt-1 text-sm font-bold text-slate-600">Tap them, then practise: {prompt}</p>
        </div>
        <p className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-extrabold text-white">👋 {person.line}</p>
      </div>
    </GameShell>
  );
}

function QueueScene({ scene, onDone }: { scene: Scene; onDone: () => void }) {
  const { t } = useI18n();
  const [step, setStep] = useState(0);
  const stages = [
    { emoji: "🚶", text: "Tap to join at the back of the line" },
    { emoji: "⏳", text: "Tap to wait patiently — no cutting!" },
    { emoji: "🙌", text: "It is your turn. Tap to take it fairly." },
  ];
  const stage = stages[step];
  const act = () => step === stages.length - 1 ? onDone() : setStep((current) => current + 1);

  return (
    <GameShell title={scene.title} setting={scene.setting} backdrop={scene.backdrop} progress={t("missionSimulationProgress", { count: step + 1, target: stages.length })}>
      <div className="mt-7 flex flex-col items-center gap-5">
        <div className="flex items-end gap-1 rounded-3xl bg-white/70 p-3 text-4xl shadow-sm" aria-label="Queue">
          <span>🧒</span><span>🧑</span><span>👩</span><span className={step === 0 ? "animate-bounce" : ""}>🧒</span><span>🍜</span>
        </div>
        <button type="button" onClick={act} className="rounded-full bg-orange-500 px-6 py-4 text-5xl shadow-lg transition hover:scale-110 active:scale-95" aria-label={stage.text}>
          {stage.emoji}
        </button>
        <p className="max-w-64 rounded-2xl bg-white/90 px-4 py-3 text-center text-sm font-extrabold text-violet-950 shadow-sm">{stage.text}</p>
      </div>
    </GameShell>
  );
}

function SortScene({ scene, onDone }: { scene: Scene; onDone: () => void }) {
  const { t } = useI18n();
  const recycle = scene.setting === "Recycling corner";
  const objects = recycle
    ? [{ emoji: "🧴", home: "Recycle" }, { emoji: "📦", home: "Recycle" }, { emoji: "🍌", home: "Compost" }]
    : [{ emoji: "🧸", home: "Toy basket" }, { emoji: "📚", home: "Book shelf" }, { emoji: "👟", home: "Shoe rack" }];
  const homes = recycle ? ["Recycle", "Compost", "Rubbish"] : ["Toy basket", "Book shelf", "Shoe rack"];
  const [item, setItem] = useState(0);
  const [pickedUp, setPickedUp] = useState(false);
  const [message, setMessage] = useState("Tap the object to pick it up.");
  const active = objects[item];
  const place = (home: string) => {
    if (!pickedUp) return;
    if (home !== active.home) {
      setMessage("Try another home — you can do it!");
      return;
    }
    if (item === objects.length - 1) onDone();
    else {
      setItem((current) => current + 1);
      setPickedUp(false);
      setMessage("Great job! Pick up the next item.");
    }
  };

  return (
    <GameShell title={scene.title} setting={scene.setting} backdrop={scene.backdrop} progress={t("missionSimulationProgress", { count: item + 1, target: objects.length })}>
      <div className="mt-4 flex flex-col items-center gap-3">
        <button type="button" onClick={() => { setPickedUp(true); setMessage("Now tap the right home."); }} className={`rounded-full bg-white/90 p-3 text-6xl shadow-lg transition ${pickedUp ? "scale-110 ring-4 ring-amber-300" : "hover:scale-110"}`} aria-label="Pick up item">
          {active.emoji}
        </button>
        <p className="text-center text-sm font-extrabold text-violet-950">{message}</p>
        <div className="grid w-full grid-cols-3 gap-2">
          {homes.map((home) => (
            <button key={home} type="button" onClick={() => place(home)} className="min-h-20 rounded-2xl bg-white/90 px-2 text-xs font-extrabold text-violet-900 shadow-sm transition hover:-translate-y-1 disabled:opacity-60" disabled={!pickedUp}>
              {home === "Recycle" ? "♻️" : home === "Compost" ? "🌱" : home === "Rubbish" ? "🗑️" : home === "Toy basket" ? "🧺" : home === "Book shelf" ? "📚" : "👟"}<br />{home}
            </button>
          ))}
        </div>
      </div>
    </GameShell>
  );
}

function HelpingScene({ scene, onDone }: { scene: Scene; onDone: () => void }) {
  const { t } = useI18n();
  const people = ["👵", "🧑", "🧒"];
  const [step, setStep] = useState(0);
  const act = () => step === people.length - 1 ? onDone() : setStep((current) => current + 1);
  return (
    <GameShell title={scene.title} setting={scene.setting} backdrop={scene.backdrop} progress={t("missionSimulationProgress", { count: step + 1, target: people.length })}>
      <div className="mt-6 flex flex-col items-center gap-4">
        <p className="text-sm font-extrabold text-violet-950">Who could use a little help?</p>
        <button type="button" onClick={act} className="rounded-full bg-white/90 p-5 text-7xl shadow-lg transition hover:scale-110 active:scale-95" aria-label="Help this person">
          <span className="inline-block animate-pulse">{people[step]}</span>
        </button>
        <p className="max-w-64 rounded-2xl bg-white/90 px-4 py-3 text-center text-sm font-extrabold text-violet-950">Tap the person, then offer a kind helping hand.</p>
        <span className="rounded-full bg-rose-500 px-4 py-2 text-sm font-extrabold text-white">🤝 They feel cared for!</span>
      </div>
    </GameShell>
  );
}

function SharingScene({ scene, onDone }: { scene: Scene; onDone: () => void }) {
  const { t } = useI18n();
  const gifts = ["🍪", "⚽", "💌"];
  const friends = ["🧒", "👧", "🧑"];
  const [step, setStep] = useState(0);
  const [holding, setHolding] = useState(false);
  const gift = gifts[step];
  const give = () => {
    if (!holding) return;
    if (step === gifts.length - 1) onDone();
    else { setStep((current) => current + 1); setHolding(false); }
  };
  return (
    <GameShell title={scene.title} setting={scene.setting} backdrop={scene.backdrop} progress={t("missionSimulationProgress", { count: step + 1, target: gifts.length })}>
      <div className="mt-5 flex flex-col items-center gap-4">
        <p className="text-sm font-extrabold text-violet-950">Pick something kind to share, then give it to a friend.</p>
        <button type="button" onClick={() => setHolding(true)} className={`rounded-full bg-white/90 p-3 text-6xl shadow-lg transition ${holding ? "scale-110 ring-4 ring-amber-300" : "hover:scale-110"}`} aria-label="Pick up item to share">{gift}</button>
        <div className="flex gap-4">
          {friends.map((friend) => <button key={friend} type="button" onClick={give} disabled={!holding} className="rounded-full bg-white/90 p-3 text-5xl shadow-sm transition hover:-translate-y-1 disabled:opacity-50" aria-label="Give to friend">{friend}</button>)}
        </div>
        <p className="rounded-full bg-pink-500 px-4 py-2 text-sm font-extrabold text-white">{holding ? "Tap a friend to share!" : "Tap the gift to pick it up."}</p>
      </div>
    </GameShell>
  );
}

export function RolePlayGame({ lesson, storyComplete, complete, onComplete }: { lesson: Lesson; storyComplete: boolean; complete: boolean; onComplete: () => void }) {
  const { t } = useI18n();
  const [started, setStarted] = useState(false);
  const scene = sceneFor(lesson);

  if (complete) return <section className="rounded-[1.75rem] bg-emerald-50 p-5 ring-1 ring-emerald-200"><p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-700">🎮 {t("lessonStepGame")}</p><h2 className="mt-2 font-display text-xl text-emerald-900">{t("missionSimulationTitle")}</h2><p className="mt-1 font-semibold text-emerald-800">✓ {t("miniGameDone")}</p></section>;
  if (!storyComplete) return <section className="rounded-[1.75rem] bg-slate-100/90 p-5 text-slate-500 ring-1 ring-slate-200"><p className="text-xs font-extrabold uppercase tracking-[0.16em]">🔒 {t("lessonStepGame")}</p><p className="mt-2 text-sm font-semibold">{t("gameLocked")}</p></section>;

  return (
    <section className="space-y-4 rounded-[1.75rem] bg-gradient-to-br from-violet-100 via-fuchsia-50 to-amber-50 p-5 ring-1 ring-violet-200">
      <div><p className="text-xs font-extrabold uppercase tracking-[0.16em] text-violet-700">🎮 {t("lessonStepGame")}</p><h2 className="mt-2 font-display text-xl text-violet-950">Mission Theatre</h2><p className="mt-1 text-sm font-semibold leading-relaxed text-violet-900/80">Practise the real-life action in a playful scene, then take it outside.</p></div>
      {!started ? <div className="rounded-[1.5rem] bg-white/75 p-5 text-center ring-1 ring-violet-200"><p className="text-5xl" aria-hidden>{scene.backdrop}</p><h3 className="mt-3 font-display text-xl text-violet-950">{scene.setting}</h3><p className="mt-2 text-sm font-bold text-violet-900/80">{lesson.tryThis}</p><button type="button" onClick={() => setStarted(true)} className="kid-btn kid-btn-primary mt-4">{t("missionSimulationStart")}</button></div> : scene.kind === "conversation" ? <ConversationScene scene={scene} prompt={lesson.tryThis} onDone={onComplete} /> : scene.kind === "queue" ? <QueueScene scene={scene} onDone={onComplete} /> : scene.kind === "sort" ? <SortScene scene={scene} onDone={onComplete} /> : scene.kind === "help" ? <HelpingScene scene={scene} onDone={onComplete} /> : <SharingScene scene={scene} onDone={onComplete} />}
    </section>
  );
}
