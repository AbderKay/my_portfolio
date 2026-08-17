"use client";

import type { CSSProperties } from "react";
import { Brain, Database, Workflow, Terminal, type LucideIcon } from "lucide-react";
import { skills } from "@/data/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { useI18n } from "@/lib/i18n";

const icons: Record<string, LucideIcon> = {
  brain: Brain,
  database: Database,
  workflow: Workflow,
  terminal: Terminal,
};

// adaptive accent per domain
const accents: Record<string, string> = {
  brain: "#38bdf8",
  database: "#8b5cf6",
  workflow: "#22d3ee",
  terminal: "#60a5fa",
};

export function Skills() {
  const { t, ui } = useI18n();
  return (
    <section id="skills" className="container-x scroll-mt-24 py-24">
      <SectionHeading
        index="02"
        slug={ui.sections.skills.slug}
        title={ui.sections.skills.title}
        subtitle={ui.sections.skills.subtitle}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {skills.map((group, i) => {
          const Icon = icons[group.icon] ?? Terminal;
          const cat = accents[group.icon] ?? "var(--primary)";
          return (
            <Reveal key={group.file} delay={i * 0.05}>
              <div
                style={{ "--cat": cat } as CSSProperties}
                className="group glow-frame relative h-full overflow-hidden rounded-card border border-line bg-surface transition-transform duration-500 hover:-translate-y-1"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 z-20 rounded-card border opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ borderColor: "var(--cat)", boxShadow: "0 20px 50px -22px var(--cat)" }}
                />
                <div className="flex items-center gap-3 border-b border-line px-4 py-3">
                  <span className="win-dots relative inline-block h-3 w-3" />
                  <span className="ml-10 font-mono text-xs text-faint">{group.file}</span>
                </div>
                <div className="p-5">
                  <div className="mb-4 flex items-center gap-2.5">
                    <Icon size={18} style={{ color: "var(--cat)" }} />
                    <h3 className="font-display text-step-1 font-semibold">
                      {t(group.title)}
                    </h3>
                  </div>
                  <ul className="space-y-2 font-mono text-sm text-muted">
                    {t(group.items).map((item) => (
                      <li key={item} className="flex gap-2">
                        <span style={{ color: "var(--cat)" }}>▸</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
