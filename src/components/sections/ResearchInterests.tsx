"use client";

import { FlaskConical } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { useI18n } from "@/lib/i18n";

/**
 * Compact "Research Interests" block placed right under Technical Skills.
 * Reuses the portfolio's pill/tag visual language; premium but lightweight.
 */
export function ResearchInterests() {
  const { ui } = useI18n();
  return (
    <section id="research-interests" className="container-x scroll-mt-24 pb-24">
      <Reveal>
        <p className="mono-label mb-3 text-primary">
          <span className="text-faint">{"// "}</span>research_interests
        </p>
        <h2 className="font-display text-step-2 font-semibold tracking-tight">
          {ui.researchInterests.title}
        </h2>
        <p className="mt-3 max-w-2xl text-step-0 text-muted">
          {ui.researchInterests.subtitle}
        </p>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="mt-6 flex flex-wrap gap-3">
          {ui.researchInterests.items.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface px-4 py-2 text-sm text-muted transition-colors duration-300 hover:border-primary hover:text-text"
            >
              <FlaskConical size={14} className="shrink-0 text-primary" />
              {item}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
