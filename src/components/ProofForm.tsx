"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { DrawPad } from "@/components/DrawPad";
import { VoiceNarrate } from "@/components/VoiceNarrate";
import { dateKey } from "@/lib/dates";
import { useI18n } from "@/i18n/provider";
import type { Mission } from "@/lib/types";
import { useProgress } from "@/lib/progress";

type ProofTab = "speak" | "draw";

function MediaForm({
  title,
  hint,
  submitLabel,
  onSubmit,
}: {
  title: string;
  hint: string;
  submitLabel: string;
  onSubmit: (input: {
    transcript: string;
    drawingDataUrl: string;
    audioDataUrl: string;
  }) => string | null;
}) {
  const { t } = useI18n();
  const [tab, setTab] = useState<ProofTab>("speak");
  const [transcript, setTranscript] = useState("");
  const [audioDataUrl, setAudioDataUrl] = useState("");
  const [drawingDataUrl, setDrawingDataUrl] = useState("");
  const [error, setError] = useState("");

  return (
    <form
      className="space-y-4 rounded-[1.85rem] bg-white/95 p-5 shadow-[0_16px_40px_rgba(15,118,110,0.1)] outline outline-2 outline-white"
      onSubmit={(e) => {
        e.preventDefault();
        const err = onSubmit({ transcript, drawingDataUrl, audioDataUrl });
        if (err) {
          setError(err);
          return;
        }
        setError("");
      }}
    >
      <div>
        <h2 className="font-display text-2xl text-teal-950">{title}</h2>
        <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-600">
          {hint}
        </p>
        <p className="mt-2 text-sm font-extrabold text-orange-600">
          {t("whatDidYouDo")}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 rounded-2xl bg-teal-50 p-1">
        {(
          [
            { id: "speak" as const, label: t("proofModeSpeak"), icon: "🎤" },
            { id: "draw" as const, label: t("proofModeDraw"), icon: "🎨" },
          ] as const
        ).map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => setTab(option.id)}
            className={`rounded-xl px-3 py-3 text-sm font-extrabold transition ${
              tab === option.id
                ? "bg-white text-teal-900 shadow"
                : "text-teal-700"
            }`}
          >
            <span aria-hidden>{option.icon} </span>
            {option.label}
          </button>
        ))}
      </div>

      {tab === "speak" ? (
        <VoiceNarrate
          transcript={transcript}
          audioDataUrl={audioDataUrl}
          onTranscript={setTranscript}
          onAudio={setAudioDataUrl}
        />
      ) : (
        <DrawPad value={drawingDataUrl} onChange={setDrawingDataUrl} />
      )}

      {error ? (
        <p className="rounded-xl bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
          {error}
        </p>
      ) : null}

      <button type="submit" className="kid-btn kid-btn-primary w-full text-base">
        {submitLabel}
      </button>
    </form>
  );
}

export function ProofForm({ mission }: { mission: Mission }) {
  const router = useRouter();
  const { t } = useI18n();
  const {
    state,
    submitProof,
    logPractice,
    isMissionApproved,
    isMissionPending,
  } = useProgress();
  const [submitted, setSubmitted] = useState(false);
  const [practiceDone, setPracticeDone] = useState(false);
  const [showPractice, setShowPractice] = useState(false);

  const practicedThisMissionToday = useMemo(
    () =>
      state.practiceEntries.some(
        (e) => e.missionId === mission.id && e.dateKey === dateKey(),
      ),
    [state.practiceEntries, mission.id],
  );

  if (isMissionApproved(mission.id)) {
    if (practiceDone || practicedThisMissionToday) {
      return (
        <div className="animate-pop space-y-3 overflow-hidden rounded-[2rem] bg-gradient-to-br from-teal-500 to-cyan-700 p-6 text-white shadow-xl shadow-teal-700/30">
          <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-teal-100">
            ★ {t("practiceLogged")}
          </p>
          <h2 className="font-display text-3xl">{t("practiceKeepGoing")}</h2>
          <p className="font-semibold text-teal-50">{t("practiceBonusStar")}</p>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="kid-btn mt-2 bg-white text-sm text-teal-800"
          >
            {t("practiceBackHome")}
          </button>
        </div>
      );
    }

    if (showPractice) {
      return (
        <MediaForm
          title={t("practiceAgain")}
          hint={t("practiceAgainHint")}
          submitLabel={t("practiceSubmit")}
          onSubmit={(input) => {
            const result = logPractice({
              missionId: mission.id,
              note: input.transcript,
              transcript: input.transcript,
              drawingDataUrl: input.drawingDataUrl,
              audioDataUrl: input.audioDataUrl,
            });
            if (!result.ok) return t(result.errorKey);
            setPracticeDone(true);
            return null;
          }}
        />
      );
    }

    return (
      <div className="animate-pop space-y-4 overflow-hidden rounded-[2rem] bg-gradient-to-br from-teal-500 to-cyan-700 p-6 text-white shadow-xl shadow-teal-700/30">
        <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-teal-100">
          ★ {t("awardUnlocked")}
        </p>
        <h2 className="font-display text-3xl">{t("wellDone")}</h2>
        <p className="font-semibold text-teal-50">
          {t("earnedStarsBadge", { stars: mission.stars })}
        </p>
        <p className="text-sm font-semibold text-teal-50/90">
          {t("practiceKeepCue")}
        </p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => setShowPractice(true)}
            className="kid-btn kid-btn-primary text-sm"
          >
            {t("practiceAgain")}
          </button>
          <button
            type="button"
            onClick={() => router.push("/awards")}
            className="kid-btn bg-white/20 text-sm text-white ring-2 ring-white/40"
          >
            {t("seeAwards")}
          </button>
        </div>
      </div>
    );
  }

  if (isMissionPending(mission.id) || submitted) {
    return (
      <div className="animate-pop overflow-hidden rounded-[2rem] bg-gradient-to-br from-orange-400 to-amber-500 p-6 text-white shadow-xl shadow-orange-500/30">
        <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-orange-100">
          {t("pendingTitle")}
        </p>
        <h2 className="mt-2 font-display text-3xl">{t("pendingTitle")}</h2>
        <p className="mt-2 font-semibold text-orange-50">{t("pendingBlurb")}</p>
        <button
          type="button"
          onClick={() => router.push("/grownups")}
          className="kid-btn mt-5 bg-white text-sm text-orange-700"
        >
          {t("grownupsLink")}
        </button>
      </div>
    );
  }

  return (
    <MediaForm
      title={t("proveTitle")}
      hint={mission.proofHint}
      submitLabel={t("submitForApproval")}
      onSubmit={(input) => {
        const result = submitProof({
          missionId: mission.id,
          note: input.transcript,
          transcript: input.transcript,
          drawingDataUrl: input.drawingDataUrl,
          audioDataUrl: input.audioDataUrl,
        });
        if (!result.ok) return t(result.errorKey);
        setSubmitted(true);
        return null;
      }}
    />
  );
}
