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

function chooseVoice(voices: SpeechSynthesisVoice[], locale: Locale) {
  const language = speechLang[locale].toLowerCase();
  const preferredNames =
    locale === "en"
      ? /samantha|ava|karen|moira|serena|zira|aria|jenny|sonia|google uk english female|google us english/i
      : null;

  return [...voices].sort((a, b) => {
    const score = (voice: SpeechSynthesisVoice) => {
      let value = voice.localService ? 5 : 0;
      const voiceLanguage = voice.lang.toLowerCase();
      if (voiceLanguage.startsWith(language)) value += 100;
      if (locale === "en" && /^en-(sg|gb|au|us)/.test(voiceLanguage)) value += 30;
      if (preferredNames?.test(voice.name)) value += 80;
      return value;
    };
    return score(b) - score(a);
  })[0];
}

export function StoryReader({ text }: { text: string }) {
  const { locale, t } = useI18n();
  const [reading, setReading] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const speechSessionRef = useRef(0);
  const supported = useSyncExternalStore(
    subscribeToSpeechSupport,
    getSpeechSupport,
    () => false,
  );

  useEffect(() => {
    if (!supported) return;
    const refreshVoices = () => setVoices(window.speechSynthesis.getVoices());
    refreshVoices();
    window.speechSynthesis.addEventListener("voiceschanged", refreshVoices);
    return () => window.speechSynthesis.removeEventListener("voiceschanged", refreshVoices);
  }, [supported]);

  useEffect(() => {
    return () => {
      speechSessionRef.current += 1;
      window.speechSynthesis?.cancel();
    };
  }, []);

  const stop = () => {
    speechSessionRef.current += 1;
    window.speechSynthesis.cancel();
    utteranceRef.current = null;
    setReading(false);
  };

  const readStory = () => {
    if (!supported) return;
    stop();

    const session = speechSessionRef.current + 1;
    speechSessionRef.current = session;
    const segments =
      locale === "en"
        ? [
            "Hello, Kampung Kid! Ready ah? Let's enjoy this story together.",
            text,
            "Nice one! Now, let's try it out in real life, can?",
          ]
        : [text];
    const voice = chooseVoice(voices, locale);

    const speakSegment = (index: number) => {
      if (speechSessionRef.current !== session) return;
      const utterance = new SpeechSynthesisUtterance(segments[index]);
      utterance.lang = speechLang[locale];
      if (voice) utterance.voice = voice;
      utterance.rate = index === 1 || locale !== "en" ? 0.92 : 0.98;
      utterance.pitch = index === 1 || locale !== "en" ? 1.02 : 1.06;
      utterance.onend = () => {
        if (speechSessionRef.current !== session) return;
        if (index < segments.length - 1) speakSegment(index + 1);
        else setReading(false);
      };
      utterance.onerror = () => {
        if (speechSessionRef.current === session) setReading(false);
      };
      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    };

    setReading(true);
    speakSegment(0);
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
