export type Locale = "en" | "zh" | "ms" | "ta";

export const locales: Locale[] = ["en", "zh", "ms", "ta"];

export const localeLabels: Record<Locale, string> = {
  en: "English",
  zh: "中文",
  ms: "Bahasa Melayu",
  ta: "தமிழ்",
};

export const localeNativeShort: Record<Locale, string> = {
  en: "EN",
  zh: "中文",
  ms: "BM",
  ta: "தமிழ்",
};
