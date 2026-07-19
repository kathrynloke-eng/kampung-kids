"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ProofMedia } from "@/components/ProofMedia";
import { getLocalizedMission } from "@/i18n/content";
import { useI18n } from "@/i18n/provider";
import type { GrownupRole, RewardItem } from "@/lib/types";
import { useProgress } from "@/lib/progress";

const treatIcons = [
  "🎁", "🍦", "🍪", "🧁", "🍫", "🍿", "🍓", "🍉",
  "🍕", "🍔", "🍟", "🥞", "🧋", "🍹", "🎮", "🎨",
  "🧸", "📚", "⚽", "🛴", "🎬", "🎢", "🦁", "🌟",
];

export default function GrownupsPage() {
  const { t, locale } = useI18n();
  const {
    state,
    hydrated,
    streak,
    pendingProofs,
    approvedProofs,
    recentPractice,
    pendingRedemptions,
    approveProof,
    rejectProof,
    verifyPin,
    changePin,
    fulfillRedemption,
    cancelRedemption,
    upsertReward,
    toggleReward,
  } = useProgress();

  const [unlocked, setUnlocked] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState("");
  const [role, setRole] = useState<GrownupRole>("parent");
  const [newPin, setNewPin] = useState("");
  const [pinMessage, setPinMessage] = useState("");
  const [customTitle, setCustomTitle] = useState("");
  const [customCost, setCustomCost] = useState("5");
  const [customEmoji, setCustomEmoji] = useState("🎁");

  const ageLabel = useMemo(() => {
    if (!state.profile) return "";
    if (state.profile.ageBand === "4-6") return t("age46");
    if (state.profile.ageBand === "7-9") return t("age79");
    return t("age1012");
  }, [state.profile, t]);

  if (!hydrated) {
    return (
      <div className="rounded-[2rem] bg-white/70 p-8 text-center text-slate-500">
        {t("loading")}
      </div>
    );
  }

  if (!unlocked) {
    return (
      <div className="mx-auto max-w-md space-y-5">
        <div>
          <Link href="/settings" className="text-sm font-bold text-teal-700">
            ← {t("settingsTitle")}
          </Link>
          <h1 className="mt-3 font-display text-3xl text-teal-950">
            {t("grownupsTitle")}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            {t("grownupsBlurb")}
          </p>
        </div>

        <form
          className="space-y-4 rounded-[1.75rem] bg-white/90 p-5 ring-1 ring-teal-900/5"
          onSubmit={(e) => {
            e.preventDefault();
            if (verifyPin(pin)) {
              setUnlocked(true);
              setPinError("");
              setPin("");
              return;
            }
            setPinError(t("wrongPin"));
          }}
        >
          <label className="block space-y-2">
            <span className="text-sm font-bold text-teal-900">{t("enterPin")}</span>
            <input
              type="password"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={4}
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 4))}
              className="w-full rounded-2xl border border-teal-900/10 bg-white px-4 py-3 text-center text-2xl tracking-[0.4em] text-slate-800 outline-none ring-orange-400/40 focus:ring-4"
              placeholder="••••"
            />
          </label>
          {pinError ? (
            <p className="rounded-xl bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
              {pinError}
            </p>
          ) : (
            <p className="text-xs text-slate-500">{t("parentPinPrompt")}</p>
          )}
          <button
            type="submit"
            className="w-full rounded-2xl bg-teal-800 px-4 py-3.5 text-base font-bold text-white shadow-lg shadow-teal-800/25"
          >
            {t("unlockDashboard")}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Link href="/settings" className="text-sm font-bold text-teal-700">
            ← {t("settingsTitle")}
          </Link>
          <h1 className="mt-3 font-display text-3xl text-teal-950">
            {t("grownupsTitle")}
          </h1>
          <p className="mt-1 text-sm text-slate-600">{t("grownupsBlurb")}</p>
        </div>
        <button
          type="button"
          onClick={() => setUnlocked(false)}
          className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700"
        >
          {t("lockDashboard")}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {(["parent", "teacher"] as GrownupRole[]).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setRole(option)}
            className={`rounded-2xl px-4 py-3 text-sm font-bold ${
              role === option
                ? "bg-teal-700 text-white"
                : "bg-white text-teal-900 ring-1 ring-teal-900/10"
            }`}
          >
            {option === "parent" ? t("roleParent") : t("roleTeacher")}
          </button>
        ))}
      </div>

      {role === "teacher" ? (
        <p className="rounded-2xl bg-cyan-50 px-4 py-3 text-sm text-cyan-900">
          {t("tipTeacher")}
        </p>
      ) : null}

      <section className="rounded-[1.75rem] bg-white/90 p-5 ring-1 ring-teal-900/5">
        <h2 className="font-display text-xl text-teal-900">{t("childOverview")}</h2>
        {state.profile ? (
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                {t("yourName")}
              </p>
              <p className="font-display text-xl text-teal-950">
                {state.profile.name}
              </p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                {t("yourAge")}
              </p>
              <p className="text-sm font-semibold text-teal-900">{ageLabel}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                {t("stars")}
              </p>
              <p className="font-display text-xl text-teal-950">{state.totalStars}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                {t("badges")}
              </p>
              <p className="font-display text-xl text-teal-950">
                {state.earnedBadges.length}
              </p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                {t("streakDays")}
              </p>
              <p className="font-display text-xl text-teal-950">{streak}</p>
            </div>
          </div>
        ) : (
          <p className="mt-2 text-sm text-slate-600">{t("noChildYet")}</p>
        )}
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-2xl text-teal-950">{t("waitingTreats")}</h2>
        {pendingRedemptions.length === 0 ? (
          <p className="rounded-2xl bg-white/80 px-4 py-5 text-sm text-slate-600 ring-1 ring-teal-900/5">
            {t("noPending")}
          </p>
        ) : (
          <ul className="space-y-3">
            {pendingRedemptions.map((item) => (
              <li
                key={item.id}
                className="rounded-[1.75rem] bg-white/90 p-5 ring-1 ring-teal-900/5"
              >
                <p className="font-display text-xl text-teal-950">
                  <span aria-hidden>{item.emoji} </span>
                  {item.title}
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-orange-600">
                  ★ {item.cost} · {t("pendingProof")}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => fulfillRedemption(item.id)}
                    className="rounded-2xl bg-teal-700 px-4 py-2.5 text-sm font-bold text-white"
                  >
                    {t("fulfillTreat")}
                  </button>
                  <button
                    type="button"
                    onClick={() => cancelRedemption(item.id)}
                    className="rounded-2xl bg-orange-50 px-4 py-2.5 text-sm font-bold text-orange-800"
                  >
                    {t("refundTreat")}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-2xl text-teal-950">{t("practiceLogTitle")}</h2>
        {recentPractice.length === 0 ? (
          <p className="rounded-2xl bg-white/80 px-4 py-5 text-sm text-slate-600 ring-1 ring-teal-900/5">
            {t("noPracticeYet")}
          </p>
        ) : (
          <ul className="space-y-2">
            {recentPractice.map((entry) => {
              const mission = getLocalizedMission(entry.missionId, locale);
              return (
                <li
                  key={entry.id}
                  className="rounded-2xl bg-white/85 p-4 text-sm ring-1 ring-teal-900/5"
                >
                  <p className="font-bold text-teal-900">
                    {mission?.title ?? entry.missionId}
                  </p>
                  <p className="text-xs text-slate-500">{entry.dateKey}</p>
                  {entry.note ? (
                    <p className="mt-1 text-slate-600">{entry.note}</p>
                  ) : null}
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-2xl text-teal-950">{t("pendingQueue")}</h2>
        {pendingProofs.length === 0 ? (
          <p className="rounded-2xl bg-white/80 px-4 py-5 text-sm text-slate-600 ring-1 ring-teal-900/5">
            {t("noPending")}
          </p>
        ) : (
          <ul className="space-y-3">
            {pendingProofs.map((proof) => {
              const mission = getLocalizedMission(proof.missionId, locale);
              return (
                <li
                  key={`${proof.missionId}-${proof.submittedAt}`}
                  className="rounded-[1.75rem] bg-white/90 p-5 ring-1 ring-teal-900/5"
                >
                  <p className="font-display text-xl text-teal-950">
                    {mission?.title ?? proof.missionId}
                  </p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-orange-600">
                    {t("pendingProof")}
                    {mission ? ` · ★ ${mission.stars}` : ""}
                  </p>
                  <ProofMedia proof={proof} />
                  <p className="mt-2 text-xs text-slate-400">
                    {new Date(proof.submittedAt).toLocaleString()}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => approveProof(proof.missionId, role)}
                      className="rounded-2xl bg-teal-700 px-4 py-2.5 text-sm font-bold text-white"
                    >
                      {t("approve")}
                    </button>
                    <button
                      type="button"
                      onClick={() => rejectProof(proof.missionId)}
                      className="rounded-2xl bg-orange-50 px-4 py-2.5 text-sm font-bold text-orange-800"
                    >
                      {t("reject")}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {approvedProofs.length > 0 ? (
        <section className="space-y-3">
          <h2 className="font-display text-2xl text-teal-950">{t("approvedLog")}</h2>
          <ul className="space-y-2">
            {[...approvedProofs].reverse().map((proof) => {
              const mission = getLocalizedMission(proof.missionId, locale);
              return (
                <li
                  key={`${proof.missionId}-${proof.reviewedAt ?? proof.submittedAt}`}
                  className="rounded-2xl bg-white/85 p-4 text-sm ring-1 ring-teal-900/5"
                >
                  <p className="font-bold text-teal-900">
                    {mission?.title ?? proof.missionId}
                  </p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-teal-700">
                    {t("parentConfirmed", { stars: proof.starsEarned })}
                    {proof.reviewedBy
                      ? ` · ${proof.reviewedBy === "teacher" ? t("roleTeacher") : t("roleParent")}`
                      : ""}
                  </p>
                  <ProofMedia proof={proof} />
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      <section className="space-y-3 rounded-[1.75rem] bg-white/90 p-5 ring-1 ring-teal-900/5">
        <h2 className="font-display text-xl text-teal-900">{t("manageTreats")}</h2>
        <ul className="space-y-2">
          {state.rewards.map((reward) => (
            <li
              key={reward.id}
              className="flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-teal-50/60 px-3 py-2"
            >
              <span className="text-sm font-bold text-teal-900">
                {reward.emoji} {reward.title}
              </span>
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-1 rounded-xl bg-white px-2 py-1.5 text-xs font-extrabold text-teal-800">
                  <span aria-hidden>★</span>
                  <span className="sr-only">{t("treatCost")}</span>
                  <input
                    key={`${reward.id}-${reward.cost}`}
                    type="number"
                    inputMode="numeric"
                    min="1"
                    defaultValue={reward.cost}
                    onBlur={(event) => {
                      const cost = Number(event.target.value);
                      if (!Number.isSafeInteger(cost) || cost < 1) {
                        event.target.value = String(reward.cost);
                      } else if (cost !== reward.cost) {
                        upsertReward({ ...reward, cost });
                      }
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") event.currentTarget.blur();
                    }}
                    className="w-12 bg-transparent text-center outline-none"
                    aria-label={`${t("treatCost")}: ${reward.title}`}
                  />
                </label>
                <button
                  type="button"
                  onClick={() => toggleReward(reward.id, !reward.enabled)}
                  className="rounded-xl bg-white px-3 py-1.5 text-xs font-extrabold text-teal-800"
                >
                  {reward.enabled ? t("earned") : t("locked")}
                </button>
              </div>
            </li>
          ))}
        </ul>
        <form
          className="mt-3 space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            const cost = Number(customCost);
            if (!customTitle.trim() || !Number.isFinite(cost) || cost < 1) return;
            const reward: RewardItem = {
              id: `custom-${Date.now()}`,
              title: customTitle.trim(),
              description: customTitle.trim(),
              cost: Math.round(cost),
              emoji: customEmoji || "🎁",
              enabled: true,
              custom: true,
            };
            upsertReward(reward);
            setCustomTitle("");
            setCustomCost("5");
          }}
        >
          <div className="grid grid-cols-8 gap-1.5 sm:grid-cols-12" aria-label="Choose a treat icon">
            {treatIcons.map((icon) => (
              <button
                key={icon}
                type="button"
                onClick={() => setCustomEmoji(icon)}
                aria-label={`Use ${icon} for this treat`}
                aria-pressed={customEmoji === icon}
                className={`flex aspect-square items-center justify-center rounded-xl text-xl transition ${
                  customEmoji === icon
                    ? "bg-orange-200 ring-2 ring-orange-500"
                    : "bg-teal-50 hover:bg-teal-100"
                }`}
              >
                {icon}
              </button>
            ))}
          </div>
          <div className="grid gap-2 sm:grid-cols-[auto_1fr_auto_auto]">
            <input
              value={customEmoji}
              onChange={(e) => setCustomEmoji(e.target.value.slice(0, 2))}
              className="w-14 rounded-xl border border-teal-900/10 px-2 py-2 text-center"
              aria-label="Custom emoji"
            />
            <input
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              placeholder={t("treatName")}
              className="rounded-xl border border-teal-900/10 px-3 py-2 text-sm"
            />
            <input
              value={customCost}
              onChange={(e) => setCustomCost(e.target.value.replace(/\D/g, ""))}
              placeholder={t("treatCost")}
              className="w-20 rounded-xl border border-teal-900/10 px-3 py-2 text-sm"
            />
            <button
              type="submit"
              className="rounded-xl bg-orange-500 px-3 py-2 text-xs font-extrabold text-white"
            >
              {t("addTreat")}
            </button>
          </div>
        </form>
      </section>

      <section className="space-y-3 rounded-[1.75rem] bg-white/90 p-5 ring-1 ring-teal-900/5">
        <h2 className="font-display text-xl text-teal-900">{t("changePin")}</h2>
        <form
          className="flex flex-col gap-3 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
            const result = changePin(newPin);
            if (!result.ok) {
              setPinMessage(t(result.errorKey));
              return;
            }
            setPinMessage(t("pinUpdated"));
            setNewPin("");
          }}
        >
          <label className="flex-1 space-y-2">
            <span className="sr-only">{t("newPin")}</span>
            <input
              type="password"
              inputMode="numeric"
              maxLength={4}
              value={newPin}
              onChange={(e) =>
                setNewPin(e.target.value.replace(/\D/g, "").slice(0, 4))
              }
              placeholder={t("newPin")}
              className="w-full rounded-2xl border border-teal-900/10 bg-white px-4 py-3 text-base text-slate-800 outline-none ring-orange-400/40 focus:ring-4"
            />
          </label>
          <button
            type="submit"
            className="rounded-2xl bg-teal-800 px-5 py-3 text-sm font-bold text-white"
          >
            {t("savePin")}
          </button>
        </form>
        {pinMessage ? (
          <p className="text-sm font-semibold text-teal-800">{pinMessage}</p>
        ) : null}
      </section>
    </div>
  );
}
