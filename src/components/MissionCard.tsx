"use client";

import Link from "next/link";
import { useI18n } from "@/i18n/provider";
import type { Mission } from "@/lib/types";

export function MissionCard({
  mission,
  lessonTitle,
  lessonComplete = true,
  complete,
  pending,
}: {
  mission: Mission;
  lessonTitle: string;
  lessonComplete?: boolean;
  complete?: boolean;
  pending?: boolean;
}) {
  const { t } = useI18n();

  const content = (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wide text-orange-700">
            🚀 {t("realWorldMission")}
          </p>
          <h3 className="font-display text-xl text-teal-950">{mission.title}</h3>
          <p className="text-sm font-semibold text-slate-500">
            {t("after")} {lessonTitle}
          </p>
          <p className="pt-1 text-sm font-semibold leading-relaxed text-slate-600">
            {mission.description}
          </p>
        </div>
        <div className="shrink-0 rounded-[1.25rem] bg-gradient-to-b from-amber-300 to-orange-400 px-3 py-2 text-center text-amber-950 shadow-md">
          <p className="font-display text-2xl leading-none">{mission.stars}</p>
          <p className="text-[10px] font-extrabold uppercase">{t("stars")}</p>
        </div>
      </div>
      <p
        className={`mt-3 text-sm font-extrabold ${
          complete
            ? "text-teal-700"
            : pending
              ? "text-orange-600"
              : "text-teal-700"
        }`}
      >
        {complete
          ? `★ ${t("awardEarned")}`
          : pending
            ? t("waitingApproval")
            : lessonComplete
              ? t("submitProof")
              : `🔒 ${t("finishLessonFirst")}`}
      </p>
    </>
  );

  const className = `block animate-rise overflow-hidden rounded-[1.85rem] bg-gradient-to-br from-white via-white to-orange-50 p-4 shadow-[0_14px_36px_rgba(234,88,12,0.1)] outline outline-2 outline-white ${
    lessonComplete ? "transition hover:-translate-y-1" : "opacity-70 grayscale"
  }`;

  return lessonComplete ? (
    <Link href={`/missions/${mission.id}`} className={className}>
      {content}
    </Link>
  ) : (
    <div className={className} aria-disabled="true">
      {content}
    </div>
  );
}
