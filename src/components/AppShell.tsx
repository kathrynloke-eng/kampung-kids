"use client";

import Link from "next/link";
import { BottomNav } from "@/components/BottomNav";
import { Mascot } from "@/components/KidArt";
import { OfflineBanner, ServiceWorkerRegister } from "@/components/OfflineSupport";
import { useI18n } from "@/i18n/provider";
import { useProgress } from "@/lib/progress";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { state, hydrated, streak, children: kidProfiles, activeChildId, selectChild, addChild } = useProgress();
  const { t } = useI18n();

  return (
    <div className="relative flex min-h-full flex-1 flex-col">
      <ServiceWorkerRegister />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="kampung-orb kampung-orb-a" />
        <div className="kampung-orb kampung-orb-b" />
        <div className="kampung-pattern" />
      </div>

      <header className="relative z-10 mx-auto flex w-full max-w-3xl items-center justify-between gap-3 px-4 pb-2 pt-5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="h-14 w-12 shrink-0 animate-float">
            <Mascot mood="wave" className="h-full w-full" />
          </div>
          <div className="min-w-0">
            <p className="font-display text-xl font-semibold tracking-tight text-teal-900">
              {t("brand")}
            </p>
            {hydrated && state.profile ? (
              <div className="flex items-center gap-2">
                <select value={activeChildId ?? ""} onChange={(event) => selectChild(event.target.value)} className="max-w-32 rounded-lg bg-transparent text-sm font-semibold text-teal-800/80">
                  {kidProfiles.map((child) => <option key={child.id} value={child.id}>{child.name}</option>)}
                </select>
                <button type="button" onClick={addChild} className="rounded-lg bg-teal-100 px-2 py-1 text-xs font-bold text-teal-800">+ Kid</button>
                <span className="text-sm font-semibold text-teal-800/80">★{state.totalStars}{streak > 0 ? ` · 🔥${streak}` : ""}</span>
              </div>
            ) : (
              <p className="text-sm font-semibold text-teal-800/70">{t("tagline")}</p>
            )}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/settings"
            className="rounded-full bg-white/80 px-3 py-2 text-xs font-extrabold text-teal-800 ring-1 ring-teal-900/10"
            title={t("settingsNavHint")}
          >
            ⚙️
          </Link>
          <Link
            href="/rewards"
            className="star-chip"
            aria-label={`${state.totalStars} ${t("stars")}`}
          >
            <span aria-hidden className="text-lg">
              ★
            </span>
            <span className="font-display text-lg">
              {hydrated ? state.totalStars : 0}
            </span>
          </Link>
        </div>
      </header>

      <div className="relative z-10 px-4">
        <OfflineBanner
          offlineLabel={t("youAreOffline")}
          onlineLabel={t("youAreOnline")}
        />
      </div>

      <main className="relative z-10 mx-auto w-full max-w-3xl flex-1 px-4 pb-32 pt-2">
        {children}
      </main>

      <BottomNav />
    </div>
  );
}
