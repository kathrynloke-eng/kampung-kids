"use client";

import { useI18n } from "@/i18n/provider";
import type { Badge } from "@/lib/types";

export function BadgeTile({
  badge,
  earned,
  completionCount,
}: {
  badge: Badge;
  earned: boolean;
  completionCount: number;
}) {
  const { t } = useI18n();

  return (
    <div
      className={`animate-rise rounded-[1.6rem] p-4 text-center outline outline-2 transition ${
        earned
          ? "bg-gradient-to-b from-amber-50 to-orange-50 outline-amber-200 shadow-[0_14px_30px_rgba(234,88,12,0.14)]"
          : "bg-white/50 outline-slate-200/80 opacity-55 grayscale"
      }`}
    >
      <div
        className={`mx-auto flex h-16 w-16 items-center justify-center rounded-[1.25rem] text-3xl ${
          earned
            ? "animate-float bg-gradient-to-br from-amber-200 to-orange-300 shadow-inner"
            : "bg-slate-100"
        }`}
        aria-hidden
      >
        {badge.icon}
      </div>
      <h3 className="mt-3 font-display text-base text-teal-950">{badge.name}</h3>
      <p className="mt-1 text-xs font-semibold leading-relaxed text-slate-600">
        {badge.description}
      </p>
      <p className="mt-2 text-[11px] font-extrabold text-sky-700">
        {t("badgeTrackerProgress", { count: completionCount, target: 5 })}
      </p>
      <p
        className={`mt-2 text-[11px] font-extrabold uppercase tracking-wide ${
          earned ? "text-orange-600" : "text-slate-400"
        }`}
      >
        {earned ? `★ ${t("earned")}` : t("locked")}
      </p>
    </div>
  );
}
