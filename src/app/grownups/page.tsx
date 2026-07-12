"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { getLocalizedMission } from "@/i18n/content";
import { useI18n } from "@/i18n/provider";
import type { GrownupRole } from "@/lib/types";
import { useProgress } from "@/lib/progress";

export default function GrownupsPage() {
  const { t, locale } = useI18n();
  const {
    state,
    hydrated,
    pendingProofs,
    approvedProofs,
    approveProof,
    rejectProof,
    verifyPin,
    changePin,
  } = useProgress();

  const [unlocked, setUnlocked] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState("");
  const [role, setRole] = useState<GrownupRole>("parent");
  const [newPin, setNewPin] = useState("");
  const [pinMessage, setPinMessage] = useState("");

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
            <p className="text-xs text-slate-500">{t("pinHint")}</p>
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
          </div>
        ) : (
          <p className="mt-2 text-sm text-slate-600">{t("noChildYet")}</p>
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
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">
                    {proof.note}
                  </p>
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
                  <p className="mt-1 text-slate-600">{proof.note}</p>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

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
