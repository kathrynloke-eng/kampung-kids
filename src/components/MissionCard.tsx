"use client";

import Link from "next/link";
import { useI18n } from "@/i18n/provider";
import type { Mission } from "@/lib/types";

export function MissionCard({
  mission,
  lessonTitle,
  complete,
  pending,
}: {
  mission: Mission;
  lessonTitle: string;
  complete?: boolean;
  pending?: boolean;
}) {
  const { t } = useI18n();

  return (
    <Link
      href={`/missions/${mission.id}`}
      className="block animate-rise rounded-[1.75rem] bg-white/85 p-4 ring-1 ring-teal-900/5 transition hover:-translate-y-0.5 hover:shadow-[0_18px_50px_rgba(234,88,12,0.12)]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-xs font-bold uppercase tracking-wide text-orange-600">
            {t("realWorldMission")}
          </p>
          <h3 className="font-display text-lg text-teal-950">{mission.title}</h3>
          <p className="text-sm text-slate-500">
            {t("after")} {lessonTitle}
          </p>
          <p className="pt-1 text-sm leading-relaxed text-slate-600">
            {mission.description}
          </p>
        </div>
        <div className="shrink-0 rounded-2xl bg-orange-50 px-3 py-2 text-center">
          <p className="font-display text-xl text-orange-600">{mission.stars}</p>
          <p className="text-[10px] font-bold uppercase text-orange-700">
            {t("stars")}
          </p>
        </div>
      </div>
      <p className="mt-3 text-sm font-semibold text-teal-700">
        {complete
          ? t("awardEarned")
          : pending
            ? t("waitingApproval")
            : t("submitProof")}
      </p>
    </Link>
  );
}
