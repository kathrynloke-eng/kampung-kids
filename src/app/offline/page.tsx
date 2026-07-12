"use client";

import Link from "next/link";
import { useI18n } from "@/i18n/provider";

export default function OfflinePage() {
  const { t } = useI18n();

  return (
    <div className="mx-auto max-w-md space-y-5 rounded-[2rem] bg-white/90 p-8 text-center ring-1 ring-teal-900/5">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-700">
        {t("brand")}
      </p>
      <h1 className="font-display text-3xl text-teal-950">{t("offlineTitle")}</h1>
      <p className="text-sm leading-relaxed text-slate-600">{t("youAreOffline")}</p>
      <p className="text-sm text-slate-500">{t("offlineCaching")}</p>
      <Link
        href="/"
        className="inline-block rounded-2xl bg-teal-800 px-5 py-3 text-sm font-bold text-white"
      >
        {t("navHome")}
      </Link>
    </div>
  );
}
