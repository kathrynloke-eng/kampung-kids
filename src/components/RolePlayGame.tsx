"use client";

import { useState } from "react";
import { useI18n } from "@/i18n/provider";
import type { Lesson } from "@/lib/types";

type Choice = {
  id: string;
  emoji: string;
  label: string;
  kind?: "right" | "tryAgain";
};

type ScenarioStep = {
  character: string;
  characterName: string;
  cue: string;
  question: string;
  correctId: string;
  choices: Choice[];
  celebration: string;
  coaching: string;
};

type Scenario = {
  setting: string;
  scenery: string[];
  title: string;
  intro: string;
  steps: ScenarioStep[];
};

const greetingSteps: ScenarioStep[] = [
  {
    character: "👵🏽",
    characterName: "Auntie Mei",
    cue: "Auntie Mei is carrying some groceries home.",
    question: "What is a friendly way to greet her?",
    correctId: "smile",
    choices: [
      { id: "shout", emoji: "📣", label: "Shout from far away" },
      { id: "smile", emoji: "👋", label: "Smile, wave, and say hello", kind: "right" },
      { id: "hide", emoji: "🙈", label: "Hide and walk away" },
    ],
    celebration: "Auntie Mei smiles: “Hello! That made my day.”",
    coaching: "Auntie is busy carrying things. A calm smile and hello feels kind.",
  },
  {
    character: "👨🏽",
    characterName: "Uncle Raj",
    cue: "Uncle Raj is unlocking his door in the corridor.",
    question: "How can you help him feel welcome?",
    correctId: "greet",
    choices: [
      { id: "greet", emoji: "😊", label: "Say “Hi, Uncle!” with a smile", kind: "right" },
      { id: "rush", emoji: "🏃", label: "Rush past without looking" },
      { id: "grab", emoji: "😤", label: "Push in front of him" },
    ],
    celebration: "Uncle Raj waves back: “Hello, neighbour!”",
    coaching: "A warm greeting lets neighbours know they belong in the kampung too.",
  },
  {
    character: "🧒🏾",
    characterName: "A new neighbour",
    cue: "A new child looks a little unsure near the lift.",
    question: "What could you do first?",
    correctId: "welcome",
    choices: [
      { id: "point", emoji: "😆", label: "Point and laugh" },
      { id: "welcome", emoji: "🤝", label: "Smile and say “Hello, I’m your neighbour!”", kind: "right" },
      { id: "ignore", emoji: "😶", label: "Pretend not to see them" },
    ],
    celebration: "Your new neighbour grins: “Thanks for saying hi!”",
    coaching: "New places can feel big. A smile and hello is a brave, kind start.",
  },
];

function scenarioFor(lesson: Lesson): Scenario {
  if (["greeting-friends", "salam-respect", "neighbour-hello"].includes(lesson.id)) {
    return {
      setting: "HDB corridor",
      scenery: ["🏢", "🌿", "🏢"],
      title: "Hello Hero",
      intro: "Meet your neighbours and help each person feel welcome.",
      steps: greetingSteps,
    };
  }

  if (["queue-kampung", "playground-fair"].includes(lesson.id)) {
    return {
      setting: lesson.id === "queue-kampung" ? "School canteen" : "Playground slide",
      scenery: lesson.id === "queue-kampung" ? ["🍜", "🚶", "🏫"] : ["🛝", "⚽", "🌤️"],
      title: "Fair Turn Hero",
      intro: "Choose kind actions while you wait for your turn.",
      steps: [
        { character: "🧒🏽", characterName: "A hungry classmate", cue: "A line is forming for lunch.", question: "Where is the fair place to stand?", correctId: "back", choices: [{ id: "front", emoji: "↪️", label: "Squeeze into the front" }, { id: "back", emoji: "🔚", label: "Join at the back of the line", kind: "right" }, { id: "skip", emoji: "🏃", label: "Run around everyone" }], celebration: "Your classmate nods: “Thanks for waiting your turn!”", coaching: "Everyone gets a turn when we join the back calmly." },
        { character: "👧🏽", characterName: "A friend", cue: "The line is moving slowly.", question: "What can you do while you wait?", correctId: "wait", choices: [{ id: "wait", emoji: "⏳", label: "Wait calmly and chat softly", kind: "right" }, { id: "push", emoji: "💥", label: "Push the person in front" }, { id: "complain", emoji: "😫", label: "Shout that it is taking too long" }], celebration: "Your friend says: “Waiting with you feels easy!”", coaching: "Waiting can be tricky. A calm body helps everyone feel safe." },
        { character: "🧑🏽‍🍳", characterName: "The stall helper", cue: "It is finally your turn to order.", question: "What is a kind way to begin?", correctId: "thanks", choices: [{ id: "thanks", emoji: "🙏", label: "Smile, order politely, and say thank you", kind: "right" }, { id: "demand", emoji: "😠", label: "Demand your food loudly" }, { id: "turn", emoji: "🙃", label: "Turn away without speaking" }], celebration: "The stall helper smiles: “Thank you for your good manners!”", coaching: "Polite words make everyday moments kinder." },
      ],
    };
  }

  if (["tidy-space", "shoes-off", "recycle-hero", "chopsticks-care"].includes(lesson.id)) {
    return {
      setting: lesson.id === "recycle-hero" ? "Recycling corner" : "Home play space",
      scenery: lesson.id === "recycle-hero" ? ["♻️", "🧴", "📦"] : ["🏠", "🧸", "🧺"],
      title: "Careful Helper",
      intro: "Spot a caring action and make the space better for everyone.",
      steps: [
        { character: "🧸", characterName: "A toy truck", cue: "A toy truck is blocking the walking path.", question: "What should you do?", correctId: "tidy", choices: [{ id: "tidy", emoji: "🧺", label: "Put it safely in its home", kind: "right" }, { id: "kick", emoji: "🦶", label: "Kick it across the room" }, { id: "leave", emoji: "🤷", label: "Leave it for someone else" }], celebration: "The path is clear. Everyone can walk safely!", coaching: "Putting things away is a small action that cares for everyone." },
        { character: "🧒🏽", characterName: "Your little sibling", cue: "Your sibling is looking for a favourite book.", question: "How can you help?", correctId: "shelf", choices: [{ id: "shelf", emoji: "📚", label: "Return books neatly to the shelf", kind: "right" }, { id: "hide", emoji: "🙈", label: "Hide the books" }, { id: "scatter", emoji: "💨", label: "Scatter more toys" }], celebration: "“I found it!” your sibling cheers.", coaching: "A tidy space makes it easier for everyone to find what they need." },
        { character: "👨‍👩‍👧", characterName: "Your family", cue: "The room is ready for the next activity.", question: "What is a caring finishing touch?", correctId: "check", choices: [{ id: "check", emoji: "✨", label: "Check the floor and leave it clear", kind: "right" }, { id: "mess", emoji: "🌀", label: "Make another mess" }, { id: "run", emoji: "🏃", label: "Run off without checking" }], celebration: "Your family says: “What a thoughtful helper!”", coaching: "A quick final check shows pride in caring for your shared space." },
      ],
    };
  }

  return {
    setting: "Kampung gathering",
    scenery: ["🏡", "💛", "🌈"],
    title: "Kindness Quest",
    intro: "Notice how someone feels, then choose a kind action.",
    steps: [
      { character: "🧒🏽", characterName: "A friend", cue: "A friend is standing alone at the gathering.", question: "What could make them feel included?", correctId: "invite", choices: [{ id: "invite", emoji: "🤝", label: "Invite them to join you", kind: "right" }, { id: "ignore", emoji: "😶", label: "Ignore them" }, { id: "tease", emoji: "😝", label: "Tease them" }], celebration: "Your friend smiles: “I’m glad you asked me!”", coaching: "A small invitation can make someone feel they belong." },
      { character: "👵🏽", characterName: "An elder", cue: "An elder is carrying a few things.", question: "What is a thoughtful choice?", correctId: "help", choices: [{ id: "help", emoji: "👐", label: "Offer to carry one light item", kind: "right" }, { id: "watch", emoji: "👀", label: "Just watch" }, { id: "rush", emoji: "🏃", label: "Rush past" }], celebration: "“Thank you, that is very helpful,” they say.", coaching: "Offering help shows care. Always ask first, then listen." },
      { character: "👧🏽", characterName: "A teammate", cue: "Your teammate has not had a turn yet.", question: "How can you be fair?", correctId: "share", choices: [{ id: "keep", emoji: "🔒", label: "Keep the turn for yourself" }, { id: "share", emoji: "🎁", label: "Pass it over and cheer them on", kind: "right" }, { id: "leave", emoji: "🚶", label: "Leave the game" }], celebration: "Your teammate cheers: “Thanks for sharing the turn!”", coaching: "Sharing a turn helps every person feel part of the team." },
    ],
  };
}

function ScenarioGame({ scenario, onDone }: { scenario: Scenario; onDone: () => void }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showReaction, setShowReaction] = useState(false);
  const step = scenario.steps[stepIndex];
  const selected = step.choices.find((choice) => choice.id === selectedId);

  const choose = (choice: Choice) => {
    setSelectedId(choice.id);
    setShowReaction(choice.id === step.correctId);
  };

  const continueScene = () => {
    if (stepIndex === scenario.steps.length - 1) {
      onDone();
      return;
    }
    setStepIndex((value) => value + 1);
    setSelectedId(null);
    setShowReaction(false);
  };

  return (
    <div className="overflow-hidden rounded-[1.75rem] border-4 border-white bg-gradient-to-b from-sky-200 via-cyan-100 to-emerald-100 shadow-inner">
      <div className="flex items-center justify-between bg-violet-950 px-4 py-2 text-white">
        <span className="text-xs font-black uppercase tracking-[0.16em]">Scene {stepIndex + 1} of {scenario.steps.length}</span>
        <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-extrabold">❤️❤️❤️ Kindness</span>
      </div>

      <div className="relative min-h-[27rem] px-4 pb-5 pt-4">
        <span className="absolute left-4 top-3 text-4xl opacity-70" aria-hidden>☁️</span>
        <span className="absolute right-6 top-10 text-3xl opacity-70" aria-hidden>☁️</span>
        <div className="relative flex items-center justify-between rounded-2xl bg-white/70 px-4 py-2 shadow-sm">
          <span className="text-sm font-black text-violet-950">📍 {scenario.setting}</span>
          <span className="text-2xl" aria-hidden>{scenario.scenery.join(" ")}</span>
        </div>

        <div className="relative mx-auto mt-5 max-w-md text-center">
          <p className="text-sm font-extrabold text-violet-900">{step.cue}</p>
          <div className="mt-3 inline-flex flex-col items-center">
            <span className={`rounded-full bg-white/90 p-4 text-7xl shadow-xl ring-4 ${showReaction ? "animate-bounce ring-emerald-300" : "ring-white"}`} aria-label={step.characterName}>{step.character}</span>
            <span className="-mt-2 rounded-full bg-violet-900 px-3 py-1 text-xs font-black text-white shadow">{step.characterName}</span>
          </div>
          <h3 className="mt-4 font-display text-2xl text-violet-950">{step.question}</h3>
        </div>

        {!showReaction ? (
          <div className="relative mt-5 grid gap-2 sm:grid-cols-3">
            {step.choices.map((choice) => {
              const isSelected = selectedId === choice.id;
              const isWrong = isSelected && choice.id !== step.correctId;
              return (
                <button key={choice.id} type="button" onClick={() => choose(choice)} className={`min-h-28 rounded-2xl border-2 px-3 py-3 text-center shadow-sm transition hover:-translate-y-1 active:translate-y-0 ${isWrong ? "border-orange-300 bg-orange-50" : "border-white bg-white/90 hover:border-violet-300"}`}>
                  <span className="block text-3xl" aria-hidden>{choice.emoji}</span>
                  <span className="mt-1 block text-sm font-extrabold leading-snug text-violet-950">{choice.label}</span>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="relative mt-5 rounded-3xl bg-emerald-600 p-4 text-center text-white shadow-lg">
            <p className="text-3xl" aria-hidden>✨ 🙌 ✨</p>
            <p className="mt-1 font-display text-xl">Great choice!</p>
            <p className="mt-2 font-bold">{step.celebration}</p>
            <button type="button" onClick={continueScene} className="mt-4 rounded-2xl bg-white px-5 py-3 text-sm font-black text-emerald-800 shadow-sm transition hover:scale-105">{stepIndex === scenario.steps.length - 1 ? "Finish practice" : "Meet the next person →"}</button>
          </div>
        )}

        {selected && !showReaction ? <div className="relative mt-4 rounded-2xl bg-orange-100 px-4 py-3 text-center text-sm font-bold text-orange-950 ring-1 ring-orange-200"><span className="mr-1" aria-hidden>💡</span>{step.coaching} Pick another action and try again.</div> : null}
      </div>
    </div>
  );
}

export function RolePlayGame({ lesson, storyComplete, complete, onComplete }: { lesson: Lesson; storyComplete: boolean; complete: boolean; onComplete: () => void }) {
  const { t } = useI18n();
  const [started, setStarted] = useState(false);
  const [replaying, setReplaying] = useState(false);
  const scenario = scenarioFor(lesson);

  const finishSimulation = () => {
    if (complete) {
      setStarted(false);
      setReplaying(false);
      return;
    }
    onComplete();
  };

  if (complete && !replaying) {
    return <section className="rounded-[1.75rem] bg-emerald-50 p-5 ring-1 ring-emerald-200"><p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-700">🎮 {t("lessonStepGame")}</p><h2 className="mt-2 font-display text-xl text-emerald-900">{scenario.title} complete!</h2><p className="mt-1 font-semibold text-emerald-800">✓ {t("miniGameDone")}</p><button type="button" onClick={() => { setStarted(false); setReplaying(true); }} className="kid-btn kid-btn-primary mt-4">{t("replayMiniGame")}</button></section>;
  }

  if (!storyComplete) {
    return <section className="rounded-[1.75rem] bg-slate-100/90 p-5 text-slate-500 ring-1 ring-slate-200"><p className="text-xs font-extrabold uppercase tracking-[0.16em]">🔒 {t("lessonStepGame")}</p><p className="mt-2 text-sm font-semibold">{t("gameLocked")}</p></section>;
  }

  return (
    <section className="space-y-4 rounded-[1.75rem] bg-gradient-to-br from-violet-100 via-fuchsia-50 to-amber-50 p-5 ring-1 ring-violet-200">
      <div>
        <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-violet-700">🎮 {t("lessonStepGame")}</p>
        <h2 className="mt-2 font-display text-2xl text-violet-950">{scenario.title}</h2>
        <p className="mt-1 text-sm font-semibold leading-relaxed text-violet-900/80">{scenario.intro}</p>
      </div>
      {!started ? <div className="rounded-[1.5rem] bg-white/80 p-5 text-center ring-1 ring-violet-200"><p className="text-5xl" aria-hidden>{scenario.scenery.join(" ")}</p><h3 className="mt-3 font-display text-xl text-violet-950">{scenario.setting}</h3><p className="mt-2 text-sm font-bold text-violet-900/80">Help the characters one scene at a time. If a choice does not fit, you will get a gentle hint and can try again.</p><button type="button" onClick={() => setStarted(true)} className="kid-btn kid-btn-primary mt-4">Start the scene</button></div> : <ScenarioGame scenario={scenario} onDone={finishSimulation} />}
    </section>
  );
}
