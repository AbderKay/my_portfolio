/**
 * i18n primitives. `Loc<T>` is the shape every translatable value in the data
 * files takes — a plain `{ en, fr }` pair. Non-translatable values (URLs,
 * dates, tech names, proper nouns) stay bare strings and pass through `t()`
 * untouched, so we only localize what actually needs it.
 */
export type Lang = "en" | "fr";

export const LANGS: readonly Lang[] = ["en", "fr"] as const;
export const DEFAULT_LANG: Lang = "en";
export const LANG_STORAGE_KEY = "portfolio-lang";

/** A value that exists in both languages. */
export type Loc<T = string> = { en: T; fr: T };

/** True when a value is a `{ en, fr }` pair rather than a bare value. */
function isLoc(v: unknown): v is Loc<unknown> {
  return (
    typeof v === "object" &&
    v !== null &&
    !Array.isArray(v) &&
    "en" in (v as Record<string, unknown>) &&
    "fr" in (v as Record<string, unknown>)
  );
}

/** Resolve a `Loc<T>` (or a bare `T`) to the value for `lang`. */
export function resolve<T>(value: Loc<T> | T, lang: Lang): T {
  return isLoc(value) ? (value[lang] as T) : (value as T);
}
