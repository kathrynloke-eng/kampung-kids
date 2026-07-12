"use client";

import { useState } from "react";
import type { AgeBand } from "@/lib/types";
import { useI18n } from "@/i18n/provider";
import { useProgress } from "@/lib/progress";

const bands: AgeBand[] = ["4-6", "7-9", "10-12"];

export function Onboarding() {
  const { setProfile } = useProgress();
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [ageBand, setAgeBand] = useState<AgeBand>("7-9");

  const ageLabel = {
    "4-6": t("age46"),
    "7-9": t("age79"),
    "10-12": t("age1012"),
  };

  return (
    <section className="animate-rise space-y-6 rounded-[2rem] bg-white/80 p-6 shadow-[0_20px_60px_rgba(13,148,136,0.12)] ring-1 ring-teal-900/5 backdrop-blur">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">
          {t("welcome")}
        </p>
        <h1 className="font-display text-3xl leading-tight text-teal-950 sm:text-4xl">
          {t("joinKampung")}
        </h1>
        <p className="max-w-md text-base leading-relaxed text-slate-600">
          {t("joinBlurb")}
        </p>
      </div>

      <label className="block space-y-2">
        <span className="text-sm font-bold text-teal-900">{t("yourName")}</span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t("namePlaceholder")}
          className="w-full rounded-2xl border border-teal-900/10 bg-white px-4 py-3 text-base text-slate-800 outline-none ring-orange-400/40 placeholder:text-slate-400 focus:ring-4"
        />
      </label>

      <fieldset className="space-y-3">
        <legend className="text-sm font-bold text-teal-900">{t("yourAge")}</legend>
        <div className="grid gap-2">
          {bands.map((band) => (
            <button
              key={band}
              type="button"
              onClick={() => setAgeBand(band)}
              className={`rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
                ageBand === band
                  ? "bg-teal-700 text-white shadow-lg shadow-teal-700/25"
                  : "bg-teal-50 text-teal-900 hover:bg-teal-100"
              }`}
            >
              {ageLabel[band]}
            </button>
          ))}
        </div>
      </fieldset>

      <button
        type="button"
        onClick={() => setProfile(name, ageBand)}
        className="w-full rounded-2xl bg-orange-500 px-4 py-3.5 text-base font-bold text-white shadow-lg shadow-orange-500/30 transition hover:bg-orange-600 active:scale-[0.99]"
      >
        {t("startLearning")}
      </button>

      <p className="text-center text-xs text-slate-500">{t("pinHint")}</p>
    </section>
  );
}
