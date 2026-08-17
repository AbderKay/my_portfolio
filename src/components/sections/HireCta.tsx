"use client";

import { type MouseEvent } from "react";
import { profile } from "@/data/profile";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { smoothScrollTo } from "@/lib/scroll";
import { useI18n } from "@/lib/i18n";

/**
 * Final cinematic call-to-action, after the visitor has seen everything.
 * A single "Hire Me" button that scrolls back up to the contact terminal.
 */
export function HireCta() {
  const { t, ui } = useI18n();
  const scrollToContact = (e: MouseEvent) => {
    e.preventDefault();
    smoothScrollTo("#contact");
  };

  return (
    <section className="relative overflow-hidden py-32">
      {/* cinematic space atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 40%, var(--glow-primary), transparent 70%), radial-gradient(40% 50% at 80% 90%, var(--glow-accent), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
      />

      <div className="container-x relative z-10 flex flex-col items-center text-center">
        <Reveal>
          <p className="mono-label mb-5 text-primary">{ui.hireCta.label}</p>
          <h2 className="mx-auto max-w-4xl font-display text-[clamp(2.5rem,7vw,5.5rem)] font-bold leading-[0.95] tracking-tight">
            {ui.hireCta.titleTop}
            <br />
            <span className="text-aurora">{ui.hireCta.titleBottom}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-step-0 text-muted">
            {ui.hireCta.body}
          </p>
          <div className="mt-10 flex justify-center">
            <MagneticButton
              href="#contact"
              onClick={scrollToContact}
              variant="solid"
              className="px-8 py-4 text-base"
            >
              {ui.hireCta.hireMe}
            </MagneticButton>
          </div>
          <p className="mt-6 font-mono text-xs text-faint">
            {t(profile.status)}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
