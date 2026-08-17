"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

/**
 * FR/EN language switch. Sits directly above the theme toggle in the nav and
 * mirrors its look — a bordered pill whose label cross-fades when toggled.
 * Shows the language you'd switch TO, so the action reads clearly.
 */
export function LanguageToggle() {
  const { lang, toggle, ui } = useI18n();
  const reduce = useReducedMotion();
  const next = lang === "en" ? "FR" : "EN";
  const label = lang === "en" ? ui.langToggle.toFrench : ui.langToggle.toEnglish;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-full border border-line-strong font-mono text-[0.7rem] font-semibold uppercase tracking-wider text-muted transition-colors hover:border-primary hover:text-primary"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={next}
          initial={reduce ? undefined : { y: -12, opacity: 0 }}
          animate={reduce ? undefined : { y: 0, opacity: 1 }}
          exit={reduce ? undefined : { y: 12, opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="absolute"
        >
          {next}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
