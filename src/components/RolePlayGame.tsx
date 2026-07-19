"use client";

import { useState } from "react";
import { Mascot } from "@/components/KidArt";
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

function NeighbourSprite({ stepIndex, happy }: { stepIndex: number; happy: boolean }) {
  const shirt = ["#f97316", "#7c3aed", "#ec4899"][stepIndex % 3];
  const skin = ["#f3c39a", "#a96e4b", "#7b4b31"][stepIndex % 3];
  return (
    <svg viewBox="0 0 130 180" className={`h-full w-full drop-shadow-xl transition-transform duration-500 ${happy ? "-translate-y-3 rotate-3" : "animate-bob"}`} role="img" aria-label="Neighbour">
      <ellipse cx="65" cy="168" rx="43" ry="8" fill="#0f766e" opacity=".18" />
      <path d="M29 155c3-39 18-61 36-61s34 22 37 61H29z" fill={shirt} />
      <path d="M39 150c11 8 40 8 52 0" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" opacity=".65" />
      <circle cx="65" cy="62" r="34" fill={skin} />
      <path d="M33 56c2-29 20-42 34-42 19 0 32 14 34 37-12-8-23-11-35-9-12 1-22 7-33 14z" fill="#253347" />
      <circle cx="53" cy="64" r="3.5" fill="#1f2937" /><circle cx="77" cy="64" r="3.5" fill="#1f2937" />
      <circle cx="44" cy="76" r="5" fill="#fb7185" opacity=".45" /><circle cx="86" cy="76" r="5" fill="#fb7185" opacity=".45" />
      <path d={happy ? "M54 78c6 10 16 10 22 0" : "M56 81c5 3 13 3 18 0"} fill="none" stroke="#1f2937" strokeWidth="3" strokeLinecap="round" />
      <path d={happy ? "M97 104c16-10 18-25 11-36" : "M97 104c13-4 17-14 13-25"} fill="none" stroke={shirt} strokeWidth="13" strokeLinecap="round" />
      <circle cx={happy ? "110" : "109"} cy={happy ? "66" : "80"} r="8" fill={skin} />
    </svg>
  );
}

function HdbCorridor({ stepIndex, happy }: { stepIndex: number; happy: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-sky-100" aria-hidden>
      <svg viewBox="0 0 800 430" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
        <rect width="800" height="430" fill="#c9f2f1" />
        <path d="M0 75h800v248H0z" fill="#f8edda" />
        <path d="M0 75h800" stroke="#0f766e" strokeWidth="16" />
        <path d="M0 323h800v107H0z" fill="#a9d7d1" />
        <path d="M0 323h800" stroke="#7bbeb5" strokeWidth="7" />
        <path d="M10 94h230v192H10z" fill="#f3d38b" opacity=".55" />
        <path d="M35 125h150v155H35z" fill="#f4a261" /><path d="M50 140h120v140H50z" fill="#f9c97b" />
        <circle cx="151" cy="211" r="7" fill="#9a5a28" />
        <path d="M262 95h192v210H262z" fill="#d5eee9" /><path d="M284 118h148v110H284z" fill="#89c8d0" />
        <path d="M291 128h62v90M363 128h62v90" stroke="#e8f8f5" strokeWidth="8" />
        <path d="M478 125h150v155H478z" fill="#0f766e" /><path d="M493 140h120v140H493z" fill="#2cb5aa" />
        <circle cx="595" cy="211" r="7" fill="#e8c06e" />
        <path d="M651 101h105v195H651z" fill="#d7d5e2" /><path d="M667 126h73v140H667z" fill="#a1a6b4" />
        <rect x="745" y="145" width="8" height="22" rx="4" fill="#fbbf24" />
        <path d="M0 365h800" stroke="#edf7f3" strokeWidth="4" strokeDasharray="10 12" opacity=".85" />
        <g transform="translate(210 258)"><rect x="0" y="42" width="46" height="35" rx="5" fill="#bf7a3d" /><path d="M5 42c7-40 32-40 38 0" fill="#4f8f58" /><circle cx="18" cy="25" r="14" fill="#4f9c60" /><circle cx="33" cy="25" r="17" fill="#59ad6d" /></g>
        <g transform="translate(632 266)"><rect x="0" y="42" width="46" height="35" rx="5" fill="#bf7a3d" /><path d="M5 42c7-40 32-40 38 0" fill="#4f8f58" /><circle cx="18" cy="25" r="14" fill="#4f9c60" /><circle cx="33" cy="25" r="17" fill="#59ad6d" /></g>
      </svg>
      <div className={`absolute bottom-3 left-[12%] h-36 w-28 transition-transform duration-500 ${happy ? "translate-x-3" : "animate-bob"}`}><Mascot mood={happy ? "cheer" : "wave"} className="h-full w-full" /></div>
      <div className="absolute bottom-0 right-[11%] h-44 w-32"><NeighbourSprite stepIndex={stepIndex} happy={happy} /></div>
    </div>
  );
}

function SimpleScene({ scenario, stepIndex }: { scenario: Scenario; stepIndex: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-sky-200 via-amber-50 to-emerald-200" aria-hidden>
      <div className="absolute inset-x-0 bottom-0 h-28 bg-emerald-300/70" />
      <div className="absolute left-[10%] top-12 text-8xl opacity-80">{scenario.scenery[0]}</div>
      <div className="absolute right-[14%] top-16 text-7xl opacity-80">{scenario.scenery[1]}</div>
      <div className="absolute bottom-5 left-[15%] h-32 w-24 animate-bob"><Mascot mood="wave" className="h-full w-full" /></div>
      <div className="absolute bottom-3 right-[14%] h-40 w-28"><NeighbourSprite stepIndex={stepIndex} happy={false} /></div>
    </div>
  );
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

      <div className="relative min-h-[32rem] px-4 pb-5 pt-4">
        {scenario.setting === "HDB corridor" ? <HdbCorridor stepIndex={stepIndex} happy={showReaction} /> : <SimpleScene scenario={scenario} stepIndex={stepIndex} />}
        <div className="relative flex items-center justify-between rounded-2xl bg-white/85 px-4 py-2 shadow-sm backdrop-blur-sm">
          <span className="text-sm font-black text-violet-950">📍 {scenario.setting}</span>
          <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-extrabold text-violet-900">Look, then choose</span>
        </div>

        <div className="relative mx-auto mt-5 max-w-md text-center">
          <p className="text-sm font-extrabold text-violet-900">{step.cue}</p>
          <span className="mt-4 inline-block rounded-full bg-violet-950 px-4 py-1.5 text-sm font-black text-white shadow">Meet {step.characterName}</span>
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
