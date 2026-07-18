"use client";

import { useState } from "react";
import type { AgeBand } from "@/lib/types";
import { Mascot, SunnyClouds } from "@/components/KidArt";
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

  const ageHint = {
    "4-6": "🌱",
    "7-9": "🧭",
    "10-12": "🛡️",
  };

  return (
    <section className="animate-rise overflow-hidden kid-panel relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 opacity-80">
        <SunnyClouds className="h-full w-full" />
      </div>
      <div className="relative space-y-6 p-6 pt-8">
        <div className="flex items-start gap-3">
          <div className="w-24 shrink-0 animate-wiggle">
            <Mascot mood="wave" className="h-auto w-full" />
          </div>
          <div className="space-y-2 pt-2">
            <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-orange-600">
              {t("welcome")}
            </p>
            <h1 className="font-display text-3xl leading-tight text-teal-950 sm:text-4xl">
              {t("joinKampung")}
            </h1>
            <p className="max-w-md text-base font-semibold leading-relaxed text-slate-600">
              {t("joinBlurb")}
            </p>
          </div>
        </div>

        <label className="block space-y-2">
          <span className="text-sm font-extrabold text-teal-900">{t("yourName")}</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t("namePlaceholder")}
            className="w-full rounded-2xl border-2 border-teal-200 bg-white px-4 py-3.5 text-base font-semibold text-slate-800 outline-none ring-orange-400/40 placeholder:text-slate-400 focus:ring-4"
          />
        </label>

        <fieldset className="space-y-3">
          <legend className="text-sm font-extrabold text-teal-900">{t("yourAge")}</legend>
          <div className="grid gap-2">
            {bands.map((band) => (
              <button
                key={band}
                type="button"
                onClick={() => setAgeBand(band)}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3.5 text-left text-sm font-extrabold transition ${
                  ageBand === band
                    ? "bg-teal-700 text-white shadow-lg shadow-teal-700/25 scale-[1.02]"
                    : "bg-teal-50 text-teal-900 hover:bg-teal-100"
                }`}
              >
                <span className="text-xl" aria-hidden>
                  {ageHint[band]}
                </span>
                {ageLabel[band]}
              </button>
            ))}
          </div>
        </fieldset>

        <button
          type="button"
          onClick={() => setProfile(name, ageBand)}
          className="kid-btn kid-btn-primary w-full text-base"
        >
          {t("startLearning")} ★
        </button>

        <p className="text-center text-xs font-semibold text-slate-500">
          {t("pinHint")}
        </p>
      </div>
    </section>
  );
}
