"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { localeLabels, locales, type Locale } from "@/i18n/locales";
import { useI18n } from "@/i18n/provider";

export default function SettingsPage() {
  const { t, locale, setLocale } = useI18n();
  const [online, setOnline] = useState(true);
  const [swReady, setSwReady] = useState(false);

  useEffect(() => {
    const update = () => setOnline(navigator.onLine);
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistration().then((reg) => {
        setSwReady(Boolean(reg));
      });
    }
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-teal-950">{t("settingsTitle")}</h1>
      </div>

      <section className="space-y-3 rounded-[1.75rem] bg-white/90 p-5 ring-1 ring-teal-900/5">
        <h2 className="font-display text-xl text-teal-900">{t("language")}</h2>
        <p className="text-sm text-slate-600">{t("languageBlurb")}</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {locales.map((code: Locale) => (
            <button
              key={code}
              type="button"
              onClick={() => setLocale(code)}
              className={`rounded-2xl px-4 py-3 text-left text-sm font-bold ${
                locale === code
                  ? "bg-teal-700 text-white"
                  : "bg-teal-50 text-teal-900"
              }`}
            >
              {localeLabels[code]}
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-3 rounded-[1.75rem] bg-white/90 p-5 ring-1 ring-teal-900/5">
        <h2 className="font-display text-xl text-teal-900">{t("offlineTitle")}</h2>
        <p className="text-sm text-slate-600">
          {swReady || process.env.NODE_ENV === "production"
            ? t("offlineReady")
            : t("offlineCaching")}
        </p>
        <p
          className={`rounded-xl px-3 py-2 text-sm font-semibold ${
            online ? "bg-teal-50 text-teal-800" : "bg-slate-800 text-white"
          }`}
        >
          {online ? t("youAreOnline") : t("youAreOffline")}
        </p>
        <div className="rounded-xl bg-orange-50 px-3 py-3 text-sm text-orange-900">
          <p className="font-bold">{t("installApp")}</p>
          <p className="mt-1">{t("installBlurb")}</p>
        </div>
      </section>

      <Link
        href="/grownups"
        className="block rounded-[1.75rem] bg-teal-800 px-5 py-5 text-white shadow-lg shadow-teal-800/25"
      >
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-100">
          {t("grownupsTitle")}
        </p>
        <p className="mt-1 font-display text-2xl">{t("grownupsLink")}</p>
        <p className="mt-2 text-sm text-teal-50">{t("grownupsBlurb")}</p>
      </Link>
    </div>
  );
}
