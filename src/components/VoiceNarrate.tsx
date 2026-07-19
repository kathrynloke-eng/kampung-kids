"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
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

const MAX_RECORDING_SECONDS = 120;
const RECORDING_AUDIO_BITRATE = 24_000;

function formatRecordingTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

const subscribeToVoiceSupport = () => () => {};

function getVoiceSupport() {
  return Boolean(
    window.SpeechRecognition ||
      window.webkitSpeechRecognition ||
      navigator.mediaDevices?.getUserMedia,
  );
}

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
  onBusyChange,
}: {
  transcript: string;
  audioDataUrl: string;
  onTranscript: (text: string) => void;
  onAudio: (dataUrl: string) => void;
  onBusyChange: (busy: boolean) => void;
}) {
  const { t, locale } = useI18n();
  const supported = useSyncExternalStore(
    subscribeToVoiceSupport,
    getVoiceSupport,
    () => false,
  );
  const [recording, setRecording] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [captureUnavailable, setCaptureUnavailable] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const stop = useCallback(() => {
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    clearTimer();
    setRecording(false);

    const recorder = mediaRecorderRef.current;
    if (recorder?.state === "recording") {
      setProcessing(true);
      onBusyChange(true);
      recorder.stop();
      return;
    }

    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    onBusyChange(false);
  }, [clearTimer, onBusyChange]);

  useEffect(() => {
    return () => {
      recognitionRef.current?.abort();
      if (mediaRecorderRef.current?.state === "recording") {
        mediaRecorderRef.current.stop();
      }
      streamRef.current?.getTracks().forEach((track) => track.stop());
      clearTimer();
    };
  }, [clearTimer]);

  const start = async () => {
    onTranscript("");
    onAudio("");
    onBusyChange(true);
    setSeconds(0);
    setCaptureUnavailable(false);
    setRecording(true);

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
        // Audio capture can still succeed when browser transcription is unavailable.
      };
      recognitionRef.current = recognition;
      try {
        recognition.start();
      } catch {
        recognitionRef.current = null;
      }
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const recorder = new MediaRecorder(stream, {
        audioBitsPerSecond: RECORDING_AUDIO_BITRATE,
      });
      chunksRef.current = [];
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data);
      };
      recorder.onstop = async () => {
        try {
          const blob = new Blob(chunksRef.current, {
            type: recorder.mimeType || "audio/webm",
          });
          if (blob.size > 0 && blob.size < 1_200_000) {
            onAudio(await blobToDataUrl(blob));
          }
        } finally {
          stream.getTracks().forEach((track) => track.stop());
          streamRef.current = null;
          mediaRecorderRef.current = null;
          setProcessing(false);
          onBusyChange(false);
        }
      };
      mediaRecorderRef.current = recorder;
      recorder.start();
    } catch {
      if (!Speech) {
        setRecording(false);
        setCaptureUnavailable(true);
        onBusyChange(false);
        return;
      }
    }

    timerRef.current = window.setInterval(() => {
      setSeconds((current) => {
        if (current >= MAX_RECORDING_SECONDS - 1) {
          stop();
          return MAX_RECORDING_SECONDS;
        }
        return current + 1;
      });
    }, 1000);
  };

  if (!supported || captureUnavailable) {
    return (
      <p className="rounded-2xl bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900">
        {t("speakUnsupported")}
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm font-extrabold text-teal-900">
        {processing ? t("speakSaving") : recording ? t("speakListening") : t("speakTap")}
      </p>

      <div className="flex flex-col items-center gap-3 rounded-[1.75rem] bg-gradient-to-b from-teal-50 to-cyan-50 px-4 py-6">
        <button
          type="button"
          onClick={recording ? stop : () => void start()}
          disabled={processing}
          className={`flex h-28 w-28 items-center justify-center rounded-full text-4xl text-white shadow-lg transition active:scale-95 disabled:cursor-wait disabled:opacity-70 ${
            recording ? "animate-pulse bg-rose-500 shadow-rose-500/30" : "bg-teal-600 shadow-teal-600/30"
          }`}
          aria-pressed={recording}
        >
          {processing ? "⏳" : recording ? "⏹" : "🎤"}
        </button>
        <p className="font-display text-lg text-teal-900">
          {processing ? t("speakSaving") : recording ? t("speakStop") : transcript || audioDataUrl ? t("speakAgain") : t("proofModeSpeak")}
        </p>
        {recording ? (
          <p className="text-xs font-bold text-teal-700">
            {formatRecordingTime(seconds)} / {formatRecordingTime(MAX_RECORDING_SECONDS)}
          </p>
        ) : null}
      </div>

      {transcript ? (
        <div className="rounded-2xl bg-white px-4 py-3 ring-1 ring-teal-900/10">
          <p className="text-xs font-extrabold uppercase tracking-wide text-orange-600">{t("heardYouSay")}</p>
          <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-700">{transcript}</p>
        </div>
      ) : null}

      {audioDataUrl ? (
        <div className="space-y-1">
          <p className="text-xs font-extrabold uppercase tracking-wide text-teal-700">{t("yourVoice")}</p>
          <audio controls src={audioDataUrl} className="w-full" />
        </div>
      ) : null}
    </div>
  );
}
