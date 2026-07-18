"use client";

import { BadgeTile } from "@/components/BadgeTile";
import { Onboarding } from "@/components/Onboarding";
import { ProofMedia } from "@/components/ProofMedia";
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
      <section
        id="stars"
        className="relative scroll-mt-24 overflow-hidden rounded-[2.4rem] bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500 p-6 text-white shadow-[0_28px_50px_rgba(234,88,12,0.35)]"
      >
        <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-yellow-200/40 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-10 left-8 h-32 w-32 rounded-full bg-white/20 blur-2xl" />
        <p className="relative text-sm font-extrabold uppercase tracking-[0.2em] text-orange-50">
          {t("awardsTitle")}
        </p>
        <h1 className="relative mt-1 font-display text-4xl">{t("awardsHero")}</h1>
        <p className="relative mt-2 max-w-md font-semibold text-orange-50">
          {t("awardsBlurb")}
        </p>
        <div className="relative mt-5 flex gap-3">
          <div className="rounded-2xl bg-white/20 px-4 py-3 backdrop-blur-sm">
            <p className="font-display text-3xl leading-none">{state.totalStars}</p>
            <p className="mt-1 text-[10px] font-extrabold uppercase tracking-wide text-orange-50">
              ★ {t("stars")}
            </p>
          </div>
          <div className="rounded-2xl bg-white/20 px-4 py-3 backdrop-blur-sm">
            <p className="font-display text-3xl leading-none">{earned.length}</p>
            <p className="mt-1 text-[10px] font-extrabold uppercase tracking-wide text-orange-50">
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
                  <ProofMedia proof={proof} />
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      <section id="badges" className="space-y-3 scroll-mt-24">
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
