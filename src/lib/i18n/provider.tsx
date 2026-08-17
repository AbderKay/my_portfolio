"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_LANG,
  LANG_STORAGE_KEY,
  resolve,
  type Lang,
  type Loc,
} from "./config";
import { dictionaries, type UIDict } from "./dictionary";

type I18n = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggle: () => void;
  /** Resolve a `Loc` (or bare value) to the current language. */
  t: <T>(value: Loc<T> | T) => T;
  /** UI chrome strings for the current language. */
  ui: UIDict;
};

const I18nContext = createContext<I18n | null>(null);

/**
 * Language provider. SSR and the first client render both use `DEFAULT_LANG`
 * (English), so hydration always matches; a saved preference is applied in an
 * effect right after mount, swapping text with no layout shift. Persisted to
 * localStorage and mirrored onto `<html lang>` for accessibility/SEO.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LANG_STORAGE_KEY);
      if (saved === "en" || saved === "fr") setLangState(saved);
    } catch {
      /* ignore storage errors (private mode, etc.) */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<I18n>(
    () => ({
      lang,
      setLang,
      toggle: () => setLang(lang === "en" ? "fr" : "en"),
      t: <T,>(v: Loc<T> | T) => resolve(v, lang),
      ui: dictionaries[lang],
    }),
    [lang, setLang]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18n {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within a LanguageProvider");
  return ctx;
}
