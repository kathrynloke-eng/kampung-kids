"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { Locale } from "@/i18n/locales";
import { useI18n } from "@/i18n/provider";

const speechLang: Record<Locale, string> = {
  en: "en-SG",
  zh: "zh-CN",
  ms: "ms-MY",
  ta: "ta-IN",
};

const subscribeToSpeechSupport = () => () => {};

function getSpeechSupport() {
  return "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
}

export function StoryReader({ text }: { text: string }) {
  const { locale, t } = useI18n();
  const [reading, setReading] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const supported = useSyncExternalStore(
    subscribeToSpeechSupport,
    getSpeechSupport,
    () => false,
  );

  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  const stop = () => {
    window.speechSynthesis.cancel();
    utteranceRef.current = null;
    setReading(false);
  };

  const readStory = () => {
    if (!supported) return;
    stop();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = speechLang[locale];
    utterance.rate = 0.86;
    utterance.pitch = 1.08;
    utterance.onend = () => setReading(false);
    utterance.onerror = () => setReading(false);
    utteranceRef.current = utterance;
    setReading(true);
    window.speechSynthesis.speak(utterance);
  };

  if (!supported) {
    return (
      <p className="mt-3 text-sm font-semibold text-teal-800">
        {t("storyReadUnsupported")}
      </p>
    );
  }

  return (
    <div className="mt-4 flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={reading ? stop : readStory}
        aria-pressed={reading}
        className={`inline-flex min-h-12 items-center gap-2 rounded-2xl px-4 py-3 font-bold shadow-sm transition active:scale-[0.98] ${
          reading
            ? "bg-rose-500 text-white shadow-rose-500/20"
            : "bg-teal-700 text-white shadow-teal-700/20"
        }`}
      >
        <span aria-hidden="true" className="text-xl">
          {reading ? "⏹" : "🔊"}
        </span>
        {reading ? t("storyStopReading") : t("storyReadAloud")}
      </button>
      {reading ? (
        <p aria-live="polite" className="text-sm font-bold text-teal-800">
          {t("storyReading")}
        </p>
      ) : null}
    </div>
  );
}
