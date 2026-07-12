"use client";

import { BadgeTile } from "@/components/BadgeTile";
import { Onboarding } from "@/components/Onboarding";
import { getLocalizedMission, localizedBadges } from "@/i18n/content";
import { useI18n } from "@/i18n/provider";
import { useProgress } from "@/lib/progress";

export default function AwardsPage() {
  const { state, hydrated, hasBadge, resetProgress } = useProgress();
  const { t, locale } = useI18n();

  if (!hydrated) return null;
  if (!state.profile) return <Onboarding />;

  const allBadges = localizedBadges(locale);
  const earned = allBadges.filter((b) => hasBadge(b.id));
  const locked = allBadges.filter((b) => !hasBadge(b.id));
  const recent = [...state.proofs].reverse().slice(0, 5);

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] bg-gradient-to-br from-orange-500 to-amber-500 p-6 text-white shadow-xl shadow-orange-500/25">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-50">
          {t("awardsTitle")}
        </p>
        <h1 className="mt-1 font-display text-4xl">{t("awardsHero")}</h1>
        <p className="mt-2 max-w-md text-orange-50">{t("awardsBlurb")}</p>
        <div className="mt-4 flex gap-6">
          <div>
            <p className="font-display text-3xl">{state.totalStars}</p>
            <p className="text-xs font-bold uppercase tracking-wide text-orange-100">
              {t("stars")}
            </p>
          </div>
          <div>
            <p className="font-display text-3xl">{earned.length}</p>
            <p className="text-xs font-bold uppercase tracking-wide text-orange-100">
              {t("badges")}
            </p>
          </div>
        </div>
      </section>

      {recent.length > 0 ? (
        <section className="space-y-3">
          <h2 className="font-display text-2xl text-teal-950">{t("recentProofs")}</h2>
          <ul className="space-y-2">
            {recent.map((proof) => {
              const mission = getLocalizedMission(proof.missionId, locale);
              return (
                <li
                  key={`${proof.missionId}-${proof.submittedAt}`}
                  className="rounded-2xl bg-white/85 p-4 text-sm ring-1 ring-teal-900/5"
                >
                  <p className="font-bold text-teal-900">
                    {mission?.title ?? proof.missionId}
                  </p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-orange-600">
                    {proof.status === "approved"
                      ? t("parentConfirmed", { stars: proof.starsEarned })
                      : proof.status === "rejected"
                        ? t("reject")
                        : t("pendingProof")}
                  </p>
                  <p className="mt-1 text-slate-600">{proof.note}</p>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      <section className="space-y-3">
        <h2 className="font-display text-2xl text-teal-950">{t("badgeShelf")}</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {[...earned, ...locked].map((badge) => (
            <BadgeTile key={badge.id} badge={badge} earned={hasBadge(badge.id)} />
          ))}
        </div>
      </section>

      <button
        type="button"
        onClick={() => {
          if (confirm(t("resetConfirm"))) resetProgress();
        }}
        className="text-xs font-semibold text-slate-400 underline"
      >
        {t("resetProgress")}
      </button>
    </div>
  );
}
