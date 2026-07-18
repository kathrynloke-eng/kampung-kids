"use client";

import { useState } from "react";
import { Onboarding } from "@/components/Onboarding";
import { useI18n } from "@/i18n/provider";
import { useProgress } from "@/lib/progress";

export default function RewardsPage() {
  const { t } = useI18n();
  const {
    state,
    hydrated,
    requestReward,
    pendingRedemptions,
  } = useProgress();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  if (!hydrated) return null;
  if (!state.profile) return <Onboarding />;

  const catalog = state.rewards.filter((r) => r.enabled);
  const mine = [...state.redemptions].reverse().slice(0, 8);

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[2.2rem] bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500 p-6 text-white shadow-[0_24px_50px_rgba(234,88,12,0.3)]">
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-orange-50">
          {t("treatsTitle")}
        </p>
        <h1 className="mt-1 font-display text-4xl">{t("treatsHero")}</h1>
        <p className="mt-2 max-w-md font-semibold text-orange-50">
          {t("treatsBlurb")}
        </p>
        <div className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-white/20 px-4 py-3 backdrop-blur-sm">
          <span className="font-display text-3xl leading-none">{state.totalStars}</span>
          <span className="text-xs font-extrabold uppercase tracking-wide">
            ★ {t("stars")} {t("toSpend")}
          </span>
        </div>
      </section>

      {pendingRedemptions.length > 0 ? (
        <section className="rounded-[1.75rem] bg-orange-50 p-4 ring-1 ring-orange-200">
          <h2 className="font-display text-xl text-orange-900">
            {t("waitingTreats")}
          </h2>
          <ul className="mt-2 space-y-2">
            {pendingRedemptions.map((r) => (
              <li key={r.id} className="flex items-center gap-2 text-sm font-bold text-orange-800">
                <span aria-hidden>{r.emoji}</span>
                {r.title} · ★{r.cost} · {t("pendingProof")}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="space-y-3">
        <h2 className="font-display text-2xl text-teal-950">{t("chooseTreat")}</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {catalog.map((reward) => {
            const canAfford = state.totalStars >= reward.cost;
            return (
              <div
                key={reward.id}
                className="rounded-[1.75rem] bg-white/95 p-4 shadow-[0_12px_30px_rgba(15,118,110,0.08)] outline outline-2 outline-white"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-3xl">
                    {reward.emoji}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-lg text-teal-950">{reward.title}</h3>
                    <p className="text-sm font-semibold text-slate-600">
                      {reward.description}
                    </p>
                    <p className="mt-1 text-sm font-extrabold text-orange-600">
                      ★ {reward.cost}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  disabled={!canAfford}
                  onClick={() => {
                    const result = requestReward(reward.id);
                    if (!result.ok) {
                      setError(t(result.errorKey));
                      setMessage("");
                      return;
                    }
                    setError("");
                    setMessage(t("treatRequested"));
                  }}
                  className={`kid-btn mt-3 w-full text-sm ${
                    canAfford
                      ? "kid-btn-primary"
                      : "cursor-not-allowed bg-slate-200 text-slate-500"
                  }`}
                >
                  {canAfford ? t("pickTreat") : t("needMoreStars")}
                </button>
              </div>
            );
          })}
        </div>
        {message ? (
          <p className="rounded-xl bg-teal-50 px-3 py-2 text-sm font-semibold text-teal-800">
            {message}
          </p>
        ) : null}
        {error ? (
          <p className="rounded-xl bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
            {error}
          </p>
        ) : null}
      </section>

      {mine.length > 0 ? (
        <section className="space-y-2">
          <h2 className="font-display text-2xl text-teal-950">{t("myTreats")}</h2>
          <ul className="space-y-2">
            {mine.map((r) => (
              <li
                key={r.id}
                className="rounded-2xl bg-white/85 px-4 py-3 text-sm ring-1 ring-teal-900/5"
              >
                <span aria-hidden>{r.emoji} </span>
                <span className="font-bold text-teal-900">{r.title}</span>
                <span className="ml-2 text-xs font-extrabold uppercase text-orange-600">
                  {r.status === "fulfilled"
                    ? t("treatFulfilled")
                    : r.status === "cancelled"
                      ? t("treatCancelled")
                      : t("pendingProof")}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
