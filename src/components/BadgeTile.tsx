"use client";

import { useI18n } from "@/i18n/provider";
import type { Badge } from "@/lib/types";

export function BadgeTile({
  badge,
  earned,
}: {
  badge: Badge;
  earned: boolean;
}) {
  const { t } = useI18n();

  return (
    <div
      className={`animate-rise rounded-[1.5rem] p-4 text-center ring-1 transition ${
        earned
          ? "bg-white/90 ring-orange-200 shadow-[0_12px_30px_rgba(234,88,12,0.12)]"
          : "bg-white/40 ring-slate-200/80 opacity-60 grayscale"
      }`}
    >
      <div
        className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl text-2xl ${
          earned ? "animate-float bg-orange-50" : "bg-slate-100"
        }`}
        aria-hidden
      >
        {badge.icon}
      </div>
      <h3 className="mt-3 font-display text-base text-teal-950">{badge.name}</h3>
      <p className="mt-1 text-xs leading-relaxed text-slate-600">
        {badge.description}
      </p>
      <p className="mt-2 text-[11px] font-bold uppercase tracking-wide text-orange-600">
        {earned ? t("earned") : t("locked")}
      </p>
    </div>
  );
}
