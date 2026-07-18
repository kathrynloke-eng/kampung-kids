"use client";

import type { MissionProof } from "@/lib/types";
import { useI18n } from "@/i18n/provider";

export function ProofMedia({ proof }: { proof: MissionProof }) {
  const { t } = useI18n();
  const story = proof.transcript || proof.note;

  return (
    <div className="mt-3 space-y-3">
      {proof.drawingDataUrl ? (
        <div>
          <p className="text-xs font-extrabold uppercase tracking-wide text-orange-600">
            {t("yourDrawing")}
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={proof.drawingDataUrl}
            alt={t("yourDrawing")}
            className="mt-1 max-h-56 w-full rounded-2xl object-contain ring-1 ring-orange-200"
          />
        </div>
      ) : null}

      {proof.audioDataUrl ? (
        <div>
          <p className="text-xs font-extrabold uppercase tracking-wide text-teal-700">
            {t("playVoice")}
          </p>
          <audio controls src={proof.audioDataUrl} className="mt-1 w-full" />
        </div>
      ) : null}

      {story ? (
        <div>
          <p className="text-xs font-extrabold uppercase tracking-wide text-slate-500">
            {t("yourVoice")}
          </p>
          <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-700">
            {story}
          </p>
        </div>
      ) : null}
    </div>
  );
}
