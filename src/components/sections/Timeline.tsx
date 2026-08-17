"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { Briefcase, FileText, GraduationCap } from "lucide-react";
import type { TimelineEntry } from "@/data/timeline";
import type { GalleryImage } from "@/lib/media";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ExperienceMedia } from "@/components/ui/ExperienceMedia";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

export type TimelineEntryWithMedia = TimelineEntry & {
  images: GalleryImage[];
  report?: string | null;
};

export function Timeline({ entries }: { entries: TimelineEntryWithMedia[] }) {
  const root = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const { t, ui } = useI18n();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // progress line draws as the list scrolls through the viewport
      gsap.fromTo(
        ".tl-progress",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 70%",
            end: "bottom 70%",
            scrub: 0.6,
          },
        }
      );

      // per-row reveal — cards slide in from their own side
      gsap.utils.toArray<HTMLElement>(".tl-row").forEach((row) => {
        const card = row.querySelector<HTMLElement>(".tl-card");
        const node = row.querySelector<HTMLElement>(".tl-node");
        const left = card?.dataset.side === "left";
        const tl = gsap.timeline({
          scrollTrigger: { trigger: row, start: "top 82%", once: true },
        });
        if (node) {
          tl.from(node, {
            scale: 0,
            opacity: 0,
            duration: 0.5,
            ease: "back.out(1.7)",
            immediateRender: false,
          });
        }
        if (card) {
          tl.from(
            card,
            {
              x: left ? -48 : 48,
              y: 24,
              opacity: 0,
              duration: 0.8,
              ease: "power3.out",
              immediateRender: false,
            },
            "-=0.25"
          );
        }
      });

      // ambient glow — gentle float (no ScrollTrigger)
      gsap.to(".tl-aurora", {
        yPercent: 12,
        x: 18,
        duration: 9,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={root} className="container-x relative scroll-mt-24 py-24">
      <div
        aria-hidden
        className="tl-aurora pointer-events-none absolute left-1/2 top-1/3 -z-0 h-[45vmax] w-[45vmax] -translate-x-1/2 rounded-full opacity-25 blur-[110px]"
        style={{ background: "radial-gradient(closest-side, var(--glow-primary), transparent 70%)" }}
      />

      <div className="relative z-10">
        <SectionHeading
          index="05"
          slug={ui.sections.experience.slug}
          title={ui.sections.experience.title}
          subtitle={ui.sections.experience.subtitle}
        />

        <ul ref={listRef} className="relative">
          {/* center (desktop) / left (mobile) rail */}
          <span
            aria-hidden
            className="absolute inset-y-0 left-5 w-px -translate-x-1/2 bg-line md:left-1/2"
          />
          <span
            aria-hidden
            className="tl-progress absolute inset-y-0 left-5 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-primary via-accent3 to-accent md:left-1/2"
            style={{ boxShadow: "0 0 12px -2px var(--glow-primary)" }}
          />

          {entries.map((entry, i) => {
            const Icon = entry.kind === "work" ? Briefcase : GraduationCap;
            const kindColor = entry.kind === "work" ? "#60a5fa" : "#34d399";
            const left = i % 2 === 0;
            return (
              <li
                key={entry.slug}
                className="tl-row relative pb-16 pl-14 last:pb-0 md:grid md:grid-cols-2 md:gap-x-16 md:pl-0"
              >
                {/* connectors */}
                <span
                  aria-hidden
                  className="absolute left-5 top-6 h-px w-9 -translate-x-0 bg-line md:hidden"
                />
                <span
                  aria-hidden
                  className={cn(
                    "absolute top-6 hidden h-px w-8 bg-line md:block",
                    left ? "right-1/2" : "left-1/2"
                  )}
                />

                {/* node on the rail */}
                <span
                  className="tl-node absolute left-5 top-2 z-10 grid h-9 w-9 -translate-x-1/2 place-items-center rounded-full border bg-surface md:left-1/2"
                  style={{ borderColor: kindColor, color: kindColor, boxShadow: `0 0 18px -6px ${kindColor}` }}
                >
                  <Icon size={15} />
                </span>

                {/* card */}
                <article
                  data-side={left ? "left" : "right"}
                  style={{ "--cat": kindColor } as CSSProperties}
                  className={cn(
                    "tl-card glow-frame glass group relative rounded-card p-4 transition-transform duration-500 hover:-translate-y-1",
                    left
                      ? "md:col-start-1 md:ml-auto md:mr-9 md:max-w-md"
                      : "md:col-start-2 md:mr-auto md:ml-9 md:max-w-md"
                  )}
                >
                  {/* premium accent glow border on hover */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 z-20 rounded-card border border-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ borderColor: "var(--cat)", boxShadow: "0 22px 55px -22px var(--cat)" }}
                  />
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span
                      className="rounded-full px-2.5 py-0.5 font-mono text-[0.62rem] uppercase tracking-wider"
                      style={{ background: "color-mix(in srgb, var(--cat) 16%, transparent)", color: "var(--cat)" }}
                    >
                      {entry.kind === "work" ? ui.timeline.experience : ui.timeline.education}
                    </span>
                    <span className="font-mono text-[0.7rem] text-faint">{t(entry.period)}</span>
                  </div>

                  <h3 className="font-display text-step-1 font-semibold leading-tight tracking-tight">
                    {t(entry.role)}
                  </h3>
                  <p className="mt-0.5 text-sm text-muted">{t(entry.org)}</p>

                  {entry.images.length ? (
                    <div className="mt-4">
                      <ExperienceMedia
                        images={entry.images}
                        accent={kindColor}
                        zoomable={!entry.noLightbox}
                      />
                    </div>
                  ) : null}

                  <ul className="mt-4 space-y-1.5 font-mono text-xs text-muted">
                    {t(entry.points).map((p, j) => (
                      <li key={j} className="flex gap-2">
                        <span style={{ color: "var(--cat)" }}>▸</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>

                  {entry.report ? (
                    <div className="mt-4 flex flex-wrap gap-3">
                      <a
                        href={entry.report}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2 font-mono text-xs text-text transition-colors hover:border-primary hover:text-primary"
                      >
                        <FileText size={14} /> {ui.timeline.report}
                      </a>
                    </div>
                  ) : null}
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
