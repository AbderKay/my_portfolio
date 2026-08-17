"use client";

import { useEffect, useRef } from "react";
import { profile } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatCounter } from "@/components/ui/StatCounter";
import { gsap } from "@/lib/gsap";
import { useI18n } from "@/lib/i18n";

export function About() {
  const root = useRef<HTMLElement>(null);
  const { t, ui } = useI18n();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const ctx = gsap.context(() => {
      gsap.from(".about-3d", {
        y: 60,
        opacity: 0,
        rotationX: -14,
        rotationY: 6,
        transformOrigin: "center bottom",
        duration: 1,
        ease: "power3.out",
        stagger: 0.15,
        immediateRender: false, // stay visible if the trigger never fires
        scrollTrigger: { trigger: root.current, start: "top 72%", once: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={root}
      className="container-x scroll-mt-24 py-24"
      style={{ perspective: "1200px" }}
    >
      <SectionHeading
        index="01"
        slug={ui.sections.about.slug}
        title={ui.sections.about.title}
      />

      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]" style={{ transformStyle: "preserve-3d" }}>
        <div className="about-3d space-y-5 will-change-transform">
          {t(profile.about).map((p, i) => (
            <p key={i} className="text-step-0 leading-relaxed text-muted">
              {p}
            </p>
          ))}

          <div className="flex flex-wrap gap-2 pt-2">
            {profile.languages.map((l, i) => (
              <span
                key={i}
                className="rounded-full border border-line-strong px-3 py-1 font-mono text-xs text-muted"
              >
                {t(l.name)} — <span className="text-text">{t(l.level)}</span>
              </span>
            ))}
          </div>
        </div>

        {/* whoami card */}
        <div className="about-3d will-change-transform">
          <div className="glow-frame card-surface overflow-hidden">
            <div className="flex items-center gap-3 border-b border-line px-4 py-3">
              <span className="win-dots relative inline-block h-3 w-3" />
              <span className="ml-10 font-mono text-xs text-faint">whoami.json</span>
            </div>
            <dl className="space-y-3 p-5 font-mono text-sm">
              {[
                { k: ui.about.whoami.name, v: profile.name },
                { k: ui.about.whoami.role, v: t(profile.role) },
                { k: ui.about.whoami.location, v: t(profile.location) },
                { k: ui.about.whoami.email, v: profile.email },
              ].map(({ k, v }) => (
                <div key={k} className="flex flex-wrap gap-x-3">
                  <dt className="text-faint">{k}</dt>
                  <dd className="text-text">
                    <span className="text-primary">:</span> {v}
                  </dd>
                </div>
              ))}
              <div className="flex flex-wrap gap-x-3 border-t border-line pt-3">
                <dt className="text-faint">{ui.about.whoami.status}</dt>
                <dd className="text-primary">✓ {t(profile.status)}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* stat band */}
      <div className="about-3d mt-10 will-change-transform">
        <div className="grid grid-cols-2 divide-line overflow-hidden rounded-card border border-line lg:grid-cols-4">
          {profile.stats.map((s, i) => (
            <div
              key={i}
              className="border-b border-r border-line bg-surface last:border-r-0 lg:border-b-0"
            >
              <StatCounter value={s.value} suffix={s.suffix} label={t(s.label)} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
