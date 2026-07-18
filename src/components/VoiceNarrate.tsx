"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/i18n/locales";
import { useI18n } from "@/i18n/provider";

type SpeechRecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
};

type SpeechRecognitionEventLike = {
  resultIndex: number;
  results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal?: boolean }>;
};

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognitionLike;
    webkitSpeechRecognition?: new () => SpeechRecognitionLike;
  }
}

const speechLang: Record<Locale, string> = {
  en: "en-SG",
  zh: "zh-CN",
  ms: "ms-MY",
  ta: "ta-IN",
};

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export function VoiceNarrate({
  transcript,
  audioDataUrl,
  onTranscript,
  onAudio,
}: {
  transcript: string;
  audioDataUrl: string;
  onTranscript: (text: string) => void;
  onAudio: (dataUrl: string) => void;
}) {
  const { t, locale } = useI18n();
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(true);
  const [seconds, setSeconds] = useState(0);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const Speech =
      typeof window !== "undefined"
        ? window.SpeechRecognition || window.webkitSpeechRecognition
        : undefined;
    setSupported(Boolean(Speech) || Boolean(navigator.mediaDevices?.getUserMedia));
    return () => {
      stopAll();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stopAll = () => {
    recognitionRef.current?.stop();
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
    }
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setListening(false);
  };

  const start = async () => {
    onTranscript("");
    onAudio("");
    setSeconds(0);

    const Speech = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (Speech) {
      const recognition = new Speech();
      recognition.lang = speechLang[locale];
      recognition.continuous = true;
      recognition.interimResults = true;
      let finalText = "";
      recognition.onresult = (event) => {
        let interim = "";
        for (let i = event.resultIndex; i < event.results.length; i += 1) {
          const piece = event.results[i][0]?.transcript ?? "";
          if ((event.results[i] as { isFinal?: boolean }).isFinal) {
            finalText = `${finalText} ${piece}`.trim();
          } else {
            interim += piece;
          }
        }
        onTranscript(`${finalText} ${interim}`.trim());
      };
      recognition.onerror = () => {
        setListening(false);
      };
      recognition.onend = () => {
        setListening(false);
      };
      recognitionRef.current = recognition;
      recognition.start();
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, {
          type: recorder.mimeType || "audio/webm",
        });
        if (blob.size > 0 && blob.size < 1_200_000) {
          onAudio(await blobToDataUrl(blob));
        }
        stream.getTracks().forEach((track) => track.stop());
      };
      mediaRecorderRef.current = recorder;
      recorder.start();
    } catch {
      if (!Speech) {
        setSupported(false);
        return;
      }
    }

    setListening(true);
    timerRef.current = window.setInterval(() => {
      setSeconds((s) => {
        if (s >= 29) {
          stopAll();
          return 30;
        }
        return s + 1;
      });
    }, 1000);
  };

  if (!supported) {
    return (
      <p className="rounded-2xl bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900">
        {t("speakUnsupported")}
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm font-extrabold text-teal-900">
        {listening ? t("speakListening") : t("speakTap")}
      </p>

      <div className="flex flex-col items-center gap-3 rounded-[1.75rem] bg-gradient-to-b from-teal-50 to-cyan-50 px-4 py-6">
        <button
          type="button"
          onClick={() => (listening ? stopAll() : void start())}
          className={`flex h-28 w-28 items-center justify-center rounded-full text-4xl text-white shadow-lg transition active:scale-95 ${
            listening
              ? "animate-pulse bg-rose-500 shadow-rose-500/30"
              : "bg-teal-600 shadow-teal-600/30"
          }`}
          aria-pressed={listening}
        >
          {listening ? "⏹" : "🎤"}
        </button>
        <p className="font-display text-lg text-teal-900">
          {listening ? t("speakStop") : transcript || audioDataUrl ? t("speakAgain") : t("proofModeSpeak")}
        </p>
        {listening ? (
          <p className="text-xs font-bold text-teal-700">{seconds}s / 30s</p>
        ) : null}
      </div>

      {transcript ? (
        <div className="rounded-2xl bg-white px-4 py-3 ring-1 ring-teal-900/10">
          <p className="text-xs font-extrabold uppercase tracking-wide text-orange-600">
            {t("heardYouSay")}
          </p>
          <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-700">
            {transcript}
          </p>
        </div>
      ) : null}

      {audioDataUrl ? (
        <div className="space-y-1">
          <p className="text-xs font-extrabold uppercase tracking-wide text-teal-700">
            {t("yourVoice")}
          </p>
          <audio controls src={audioDataUrl} className="w-full" />
        </div>
      ) : null}
    </div>
  );
}
