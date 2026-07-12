"use client";

import { BottomNav } from "@/components/BottomNav";
import { OfflineBanner, ServiceWorkerRegister } from "@/components/OfflineSupport";
import { useI18n } from "@/i18n/provider";
import { useProgress } from "@/lib/progress";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { state, hydrated } = useProgress();
  const { t } = useI18n();

  return (
    <div className="relative flex min-h-full flex-1 flex-col">
      <ServiceWorkerRegister />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="kampung-orb kampung-orb-a" />
        <div className="kampung-orb kampung-orb-b" />
        <div className="kampung-pattern" />
      </div>

      <header className="relative z-10 mx-auto flex w-full max-w-3xl items-center justify-between px-4 pb-2 pt-5">
        <div>
          <p className="font-display text-lg font-semibold tracking-tight text-teal-900">
            {t("brand")}
          </p>
          {hydrated && state.profile ? (
            <p className="text-sm text-slate-600">
              {t("hiStars", {
                name: state.profile.name,
                stars: state.totalStars,
              })}
            </p>
          ) : (
            <p className="text-sm text-slate-600">{t("tagline")}</p>
          )}
        </div>
        <div
          className="star-chip"
          aria-label={`${state.totalStars} ${t("stars")}`}
        >
          <span aria-hidden>★</span>
          <span>{hydrated ? state.totalStars : 0}</span>
        </div>
      </header>

      <div className="relative z-10 px-4">
        <OfflineBanner
          offlineLabel={t("youAreOffline")}
          onlineLabel={t("youAreOnline")}
        />
      </div>

      <main className="relative z-10 mx-auto w-full max-w-3xl flex-1 px-4 pb-28 pt-2">
        {children}
      </main>

      <BottomNav />
    </div>
  );
}
