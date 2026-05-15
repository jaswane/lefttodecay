import type { Locale, LocalizedText } from "./types";

export const DEFAULT_LOCALE: Locale = "en";

export function t(text: LocalizedText | undefined, locale: Locale = DEFAULT_LOCALE): string {
  if (!text) return "";
  return text[locale] ?? text.en;
}
