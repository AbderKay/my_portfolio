"use client";

import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const LANGS = ["en", "fr"] as const;

/**
 * Segmented EN | FR language switch in the nav. Both options are visible; the
 * active one is highlighted. Switching is instant (no page reload) via the
 * i18n context, and works identically on desktop and mobile.
 */
export function LanguageToggle() {
  const { lang, setLang, ui } = useI18n();

  return (
    <div
      role="group"
      aria-label={ui.langToggle.label}
      className="inline-flex h-9 items-center rounded-full border border-line-strong p-0.5 font-mono text-[0.7rem] font-semibold uppercase tracking-wider"
    >
      {LANGS.map((l, i) => (
        <div key={l} className="flex items-center">
          {i > 0 ? <span className="px-0.5 text-faint" aria-hidden>|</span> : null}
          <button
            type="button"
            onClick={() => setLang(l)}
            aria-pressed={lang === l}
            aria-label={l === "en" ? ui.langToggle.toEnglish : ui.langToggle.toFrench}
            className={cn(
              "rounded-full px-2 py-1 transition-colors",
              lang === l
                ? "bg-primary/15 text-primary"
                : "text-muted hover:text-text"
            )}
          >
            {l}
          </button>
        </div>
      ))}
    </div>
  );
}
