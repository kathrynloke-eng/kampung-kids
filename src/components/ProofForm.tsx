"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useI18n } from "@/i18n/provider";
import type { Mission } from "@/lib/types";
import { useProgress } from "@/lib/progress";

export function ProofForm({ mission }: { mission: Mission }) {
  const router = useRouter();
  const { t } = useI18n();
  const { submitProof, isMissionApproved, isMissionPending } = useProgress();
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (isMissionApproved(mission.id)) {
    return (
      <div className="animate-pop rounded-[1.75rem] bg-teal-700 p-6 text-white shadow-xl shadow-teal-700/30">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-100">
          {t("awardUnlocked")}
        </p>
        <h2 className="mt-2 font-display text-3xl">{t("wellDone")}</h2>
        <p className="mt-2 text-teal-50">
          {t("earnedStarsBadge", { stars: mission.stars })}
        </p>
        <button
          type="button"
          onClick={() => router.push("/awards")}
          className="mt-5 rounded-2xl bg-white px-4 py-3 text-sm font-bold text-teal-800"
        >
          {t("seeAwards")}
        </button>
      </div>
    );
  }

  if (isMissionPending(mission.id) || submitted) {
    return (
      <div className="animate-pop rounded-[1.75rem] bg-orange-500 p-6 text-white shadow-xl shadow-orange-500/30">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-100">
          {t("pendingTitle")}
        </p>
        <h2 className="mt-2 font-display text-3xl">{t("pendingTitle")}</h2>
        <p className="mt-2 text-orange-50">{t("pendingBlurb")}</p>
        <button
          type="button"
          onClick={() => router.push("/grownups")}
          className="mt-5 rounded-2xl bg-white px-4 py-3 text-sm font-bold text-orange-700"
        >
          {t("grownupsLink")}
        </button>
      </div>
    );
  }

  return (
    <form
      className="space-y-4 rounded-[1.75rem] bg-white/90 p-5 ring-1 ring-teal-900/5"
      onSubmit={(e) => {
        e.preventDefault();
        const result = submitProof({
          missionId: mission.id,
          note,
        });
        if (!result.ok) {
          setError(t(result.errorKey));
          return;
        }
        setError("");
        setSubmitted(true);
      }}
    >
      <div>
        <h2 className="font-display text-2xl text-teal-950">{t("proveTitle")}</h2>
        <p className="mt-1 text-sm leading-relaxed text-slate-600">
          {mission.proofHint}
        </p>
      </div>

      <label className="block space-y-2">
        <span className="text-sm font-bold text-teal-900">{t("whatDidYouDo")}</span>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={4}
          placeholder={t("proofPlaceholder")}
          className="w-full resize-none rounded-2xl border border-teal-900/10 bg-white px-4 py-3 text-base text-slate-800 outline-none ring-orange-400/40 focus:ring-4"
        />
      </label>

      {error ? (
        <p className="rounded-xl bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        className="w-full rounded-2xl bg-orange-500 px-4 py-3.5 text-base font-bold text-white shadow-lg shadow-orange-500/25 hover:bg-orange-600"
      >
        {t("submitForApproval")}
      </button>
    </form>
  );
}
