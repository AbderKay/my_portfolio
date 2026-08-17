"use client";

import { Award, FileText } from "lucide-react";
import type { Certification } from "@/data/certifications";
import type { GalleryImage } from "@/lib/media";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { ExperienceMedia } from "@/components/ui/ExperienceMedia";
import { Reveal } from "@/components/ui/Reveal";
import { useI18n } from "@/lib/i18n";

export type CertificationWithMedia = Certification & {
  images: GalleryImage[];
  pdf?: string | null;
  logoSrc?: string | null;
};

/** Fallback issuer monogram, e.g. "Amazon Web Services" → "AWS". */
function monogram(issuer: string): string {
  const words = issuer
    .replace(/[^A-Za-z0-9 ]/g, " ")
    .split(/\s+/)
    .filter((w) => w && !/^(of|the|and)$/i.test(w));
  if (words.length === 1) return words[0].slice(0, 3).toUpperCase();
  return words.map((w) => w[0]).join("").slice(0, 3).toUpperCase();
}

function CertCard({ cert }: { cert: CertificationWithMedia }) {
  const { ui } = useI18n();
  return (
    <article className="glow-frame glass group relative flex h-full flex-col overflow-hidden rounded-card transition-transform duration-500 hover:-translate-y-1">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 rounded-card border border-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:border-primary group-hover:shadow-[0_18px_45px_-18px_var(--glow-primary)]"
      />

      {/* certificate image (reuses ExperienceMedia: 2+ images alternate every
          2s; single shows once) — or an elegant placeholder when only a PDF /
          nothing is uploaded yet */}
      <div className="p-3 pb-0">
        {cert.images.length ? (
          <ExperienceMedia
            images={cert.images}
            accent="var(--primary)"
            interval={2000}
            fit="contain"
          />
        ) : (
          <MediaFrame label={ui.certs.certificate} icon={<Award size={18} />} aspect="aspect-[16/10]" />
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-inset border border-line-strong bg-surface-2 text-primary">
            {cert.logoSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={cert.logoSrc}
                alt={`${cert.issuer} logo`}
                className="h-6 w-6 object-contain"
              />
            ) : (
              <span className="font-mono text-[0.62rem] font-bold tracking-tight text-primary">
                {monogram(cert.issuer)}
              </span>
            )}
          </span>
          <div>
            <h3 className="font-display text-step-1 font-semibold leading-tight tracking-tight">
              {cert.name}
            </h3>
            <p className="font-mono text-xs text-primary">{cert.issuer}</p>
          </div>
        </div>

        {cert.description ? (
          <p className="mt-3 text-sm leading-relaxed text-muted">{cert.description}</p>
        ) : null}

        <div className="mt-auto flex items-center justify-between border-t border-line pt-4 font-mono text-xs">
          <span className="text-faint">{cert.date}</span>
          {cert.pdf ? (
            <a
              href={cert.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-primary"
            >
              <FileText size={12} /> {ui.certs.viewCertificate}
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export function Certifications({ certs }: { certs: CertificationWithMedia[] }) {
  const { ui } = useI18n();
  return (
    <section id="certifications" className="container-x scroll-mt-24 py-24">
      <SectionHeading
        index="06"
        slug={ui.sections.certifications.slug}
        title={ui.sections.certifications.title}
        subtitle={ui.sections.certifications.subtitle}
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {certs.map((c, i) => (
          <Reveal key={c.slug} delay={(i % 3) * 0.05}>
            <CertCard cert={c} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
