"use client";

import Link from "next/link";
import { lastNDays, dateKey } from "@/lib/dates";
import {
  getPracticeSuggestion,
  practicedToday as hasPracticedToday,
} from "@/lib/practice";
import { useI18n } from "@/i18n/provider";
import { getLocalizedLesson, getLocalizedMission } from "@/i18n/content";
import { useProgress } from "@/lib/progress";

export function DailyPractice() {
  const { t, locale } = useI18n();
  const { state, streak, practicedToday } = useProgress();

  if (!state.profile) return null;

  const suggestion = getPracticeSuggestion(state, state.profile.ageBand);
  const week = lastNDays(7);
  const today = dateKey();
  const doneToday = practicedToday || hasPracticedToday(state);

  const localizedLesson = suggestion
    ? getLocalizedLesson(suggestion.lesson.id, locale) ?? suggestion.lesson
    : null;
  const localizedMission = suggestion
    ? getLocalizedMission(suggestion.mission.id, locale) ?? suggestion.mission
    : null;

  const title =
    suggestion?.kind === "revisit"
      ? t("practiceRevisitTitle")
      : suggestion?.kind === "finish-mission"
        ? t("practiceFinishTitle")
        : suggestion?.kind === "new-lesson"
          ? t("practiceNewTitle")
          : t("practiceFreeTitle");

  const blurb =
    suggestion?.kind === "revisit"
      ? t("practiceRevisitBlurb", { days: suggestion.daysSincePractice })
      : suggestion?.kind === "finish-mission"
        ? t("practiceFinishBlurb")
        : suggestion?.kind === "new-lesson"
          ? t("practiceNewBlurb")
          : t("practiceFreeBlurb");

  const href =
    suggestion?.kind === "new-lesson"
      ? `/learn/${suggestion.lesson.id}`
      : suggestion
        ? `/missions/${suggestion.mission.id}`
        : "/missions";

  return (
    <section className="kid-panel-playful animate-rise space-y-4 p-5 shadow-[0_16px_40px_rgba(234,88,12,0.12)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-orange-600">
            {t("practiceToday")}
          </p>
          <h2 className="mt-1 font-display text-2xl text-teal-950">
            {doneToday ? t("practiceDoneToday") : title}
          </h2>
          <p className="mt-1 text-sm font-semibold text-slate-600">
            {doneToday ? t("practiceDoneBlurb") : blurb}
          </p>
        </div>
        <div className="shrink-0 rounded-2xl bg-gradient-to-b from-orange-400 to-amber-500 px-3 py-2 text-center text-white shadow-md" aria-label={`${streak} ${t("streakDays")}`}>
          <p className="font-display text-2xl leading-none">{streak}</p>
          <p className="text-[10px] font-extrabold uppercase">{t("streakDays")}</p>
        </div>
      </div>

      <div className="flex justify-between gap-1">
        {week.map((day) => {
          const active = state.practiceDates.includes(day);
          const isToday = day === today;
          return (
            <div key={day} className="flex flex-1 flex-col items-center gap-1">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-extrabold ${
                  active
                    ? "bg-teal-600 text-white"
                    : isToday
                      ? "bg-orange-100 text-orange-700 ring-2 ring-orange-300"
                      : "bg-slate-100 text-slate-400"
                }`}
                title={day}
                aria-label={`${new Date(day + "T12:00:00").toLocaleDateString(locale, { weekday: "long" })}${active ? ", complete" : ""}`}
              >
                {active ? "★" : isToday ? "·" : ""}
              </div>
              <span className="text-[9px] font-bold uppercase text-slate-500">
                {new Date(day + "T12:00:00").toLocaleDateString(locale, {
                  weekday: "narrow",
                })}
              </span>
            </div>
          );
        })}
      </div>

      {localizedMission && localizedLesson ? (
        <div className="rounded-2xl bg-white/90 p-4 ring-1 ring-teal-900/5">
          <p className="text-xs font-bold uppercase tracking-wide text-teal-700">
            {localizedLesson.title}
          </p>
          <p className="mt-1 font-display text-lg text-teal-950">
            {localizedMission.title}
          </p>
          <Link
            href={href}
            className="kid-btn kid-btn-primary mt-3 w-full text-sm"
          >
            {doneToday && suggestion?.kind !== "revisit" && suggestion?.kind !== "free-pick"
              ? t("seeAll")
              : suggestion?.kind === "revisit" || suggestion?.kind === "free-pick"
                ? t("practiceAgain")
                : suggestion?.kind === "finish-mission"
                  ? t("submitProof")
                  : t("continueLearning")}
          </Link>
        </div>
      ) : null}
    </section>
  );
}
