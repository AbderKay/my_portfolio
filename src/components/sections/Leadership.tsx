"use client";

import type { CSSProperties } from "react";
import { Users } from "lucide-react";
import type { LeadershipRole } from "@/data/leadership";
import type { GalleryImage } from "@/lib/media";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { LeadershipMedia } from "@/components/ui/LeadershipMedia";
import { Reveal } from "@/components/ui/Reveal";
import { categoryColor } from "@/lib/categories";
import { useI18n } from "@/lib/i18n";

export type LeadershipRoleWithMedia = LeadershipRole & { images: GalleryImage[] };

export function Leadership({ roles }: { roles: LeadershipRoleWithMedia[] }) {
  const cat = categoryColor("Leadership");
  const { t, ui } = useI18n();

  return (
    <section id="leadership" className="container-x scroll-mt-24 py-24">
      <SectionHeading
        index="07"
        slug={ui.sections.leadership.slug}
        title={ui.sections.leadership.title}
        subtitle={ui.sections.leadership.subtitle}
      />

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {roles.map((role, i) => (
          <Reveal key={role.file} delay={(i % 3) * 0.05}>
            <article
              style={{ "--cat": cat } as CSSProperties}
              className="group glow-frame relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface transition-transform duration-500 hover:-translate-y-1.5"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 z-20 rounded-card border opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ borderColor: "var(--cat)", boxShadow: "0 20px 50px -20px var(--cat)" }}
              />

              <div className="p-3 pb-0">
                {role.images.length ? (
                  <LeadershipMedia images={role.images} accent={cat} />
                ) : (
                  <MediaFrame
                    accent={cat}
                    label="Photos"
                    icon={<Users size={18} />}
                    aspect="aspect-[16/9]"
                  />
                )}
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span
                    className="rounded-full px-2.5 py-0.5 font-mono text-[0.62rem] uppercase tracking-wider"
                    style={{
                      background: "color-mix(in srgb, var(--cat) 15%, transparent)",
                      color: "var(--cat)",
                    }}
                  >
                    {ui.nav.leadership}
                  </span>
                  <span className="font-mono text-[0.62rem] text-faint">{t(role.period)}</span>
                </div>
                <h3 className="font-display text-step-1 font-semibold tracking-tight">
                  {t(role.role)}
                </h3>
                <p className="mt-1 font-mono text-xs" style={{ color: "var(--cat)" }}>
                  {t(role.org)}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {t(role.description)}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
