"use client";

import { useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Github, ExternalLink, FileText, ArrowUpRight, Users, ChevronDown, Cpu, FlaskConical, type LucideIcon } from "lucide-react";
import { type Project } from "@/data/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectMedia } from "@/components/ui/ProjectMedia";
import { Reveal } from "@/components/ui/Reveal";
import { categoryColor } from "@/lib/categories";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

const linkIcon = (label: string) => {
  if (/github/i.test(label)) return Github;
  if (/report|writeup|pdf|paper/i.test(label)) return FileText;
  return ExternalLink;
};

function ProjectCard({ project }: { project: Project }) {
  const { t, ui } = useI18n();
  const cat = categoryColor(project.category);
  const collaborators = project.collaborators ?? [];
  const [showCollab, setShowCollab] = useState(false);
  return (
    <article
      style={{ "--cat": cat } as CSSProperties}
      className="group glow-frame relative flex flex-col overflow-hidden rounded-card border border-line bg-surface transition-transform duration-500 hover:-translate-y-1.5"
    >
      {/* glowing category border + shadow on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 rounded-card border opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ borderColor: "var(--cat)", boxShadow: "0 20px 50px -20px var(--cat)" }}
      />

      {/* media preview zone */}
      <div className="p-3 pb-0">
        <ProjectMedia project={project} accent={cat} />
      </div>

      {/* body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span
            className="rounded-full px-2.5 py-0.5 font-mono text-[0.62rem] uppercase tracking-wider"
            style={{ background: "color-mix(in srgb, var(--cat) 15%, transparent)", color: "var(--cat)" }}
          >
            {ui.projects.categories[project.category] ?? project.category}
          </span>
          {project.badge ? (
            <span
              className="rounded-full px-2.5 py-0.5 font-mono text-[0.62rem] uppercase tracking-wider"
              style={{ background: "var(--cat)", color: "#06121a" }}
            >
              ★ {t(project.badge)}
            </span>
          ) : null}
          <span className="font-mono text-[0.7rem] text-faint">
            {t(project.context)} · {t(project.year)}
          </span>
        </div>

        <h3 className="font-display text-step-1 font-semibold tracking-tight">
          {t(project.title)}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{t(project.summary)}</p>

        {/* the problem it solves */}
        {project.problem ? (
          <div
            className="mt-3 rounded-inset px-3 py-2 text-xs leading-relaxed text-text"
            style={{ background: "color-mix(in srgb, var(--cat) 10%, transparent)" }}
          >
            <span
              className="font-mono uppercase tracking-wider"
              style={{ color: "var(--cat)" }}
            >
              {ui.projects.solves}{" "}
            </span>
            {t(project.problem)}
          </div>
        ) : null}

        {/* achievements */}
        <ul className="mt-4 space-y-1.5 border-l-2 pl-4 font-mono text-xs text-muted"
            style={{ borderColor: "color-mix(in srgb, var(--cat) 45%, transparent)" }}>
          {t(project.details).map((d, i) => (
            <li key={i}>
              <span style={{ color: "var(--cat)" }}>›</span> {d}
            </li>
          ))}
        </ul>

        {/* technical stack */}
        <p className="mono-label mt-4 mb-2 text-faint">{ui.projects.stack}</p>
        <div className="flex flex-wrap gap-2">
          {t(project.tags).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-line-strong px-2.5 py-0.5 font-mono text-[0.62rem] uppercase tracking-wider text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* links */}
        {project.links?.length ? (
          <div className="mt-5 flex flex-wrap gap-4 border-t border-line pt-4">
            {project.links.map((l) => {
              const Icon = linkIcon(l.label.en);
              return (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-[color:var(--cat)]"
                >
                  <Icon size={14} /> {t(l.label)} <ArrowUpRight size={12} />
                </a>
              );
            })}
          </div>
        ) : null}

        {/* collaborators — "See more" toggle */}
        {collaborators.length ? (
          <div className="mt-4 border-t border-line pt-4">
            <button
              type="button"
              onClick={() => setShowCollab((v) => !v)}
              aria-expanded={showCollab}
              className="inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-[color:var(--cat)]"
            >
              <Users size={13} />
              {showCollab ? ui.projects.seeLess : ui.projects.seeMore}
              <ChevronDown
                size={13}
                className={cn("transition-transform duration-300", showCollab && "rotate-180")}
              />
            </button>
            <AnimatePresence initial={false}>
              {showCollab ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="mono-label mt-3 mb-2 text-faint">
                    {ui.projects.collaborators}
                  </p>
                  <ul className="space-y-1.5 font-mono text-xs text-muted">
                    {collaborators.map((c) => (
                      <li key={c} className="flex gap-2">
                        <span style={{ color: "var(--cat)" }}>›</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        ) : null}
      </div>
    </article>
  );
}

/** One labelled group (Engineering or Research) with its heading + card grid. */
function ProjectGroup({
  label,
  subtitle,
  accent,
  icon: Icon,
  items,
}: {
  label: string;
  subtitle: string;
  accent: string;
  icon: LucideIcon;
  items: Project[];
}) {
  if (!items.length) return null;
  return (
    <div className="mt-14 first:mt-10">
      <Reveal className="mb-6">
        <div className="flex items-center gap-3">
          <span
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border"
            style={{
              borderColor: `color-mix(in srgb, ${accent} 45%, transparent)`,
              color: accent,
              background: `color-mix(in srgb, ${accent} 12%, transparent)`,
            }}
          >
            <Icon size={17} />
          </span>
          <h3
            className="font-display text-step-1 font-semibold tracking-tight"
            style={{ color: accent }}
          >
            {label}
          </h3>
          <span className="h-px flex-1 bg-line" />
        </div>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{subtitle}</p>
      </Reveal>

      <div className="grid gap-5 md:grid-cols-2">
        {items.map((p, i) => (
          <Reveal key={p.file} delay={(i % 2) * 0.05}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export function Projects({ projects }: { projects: Project[] }) {
  const { ui } = useI18n();
  const engineering = projects.filter((p) => p.group !== "research");
  const research = projects.filter((p) => p.group === "research");

  return (
    <section id="projects" className="container-x scroll-mt-24 py-24">
      <SectionHeading
        index="03"
        slug={ui.sections.projects.slug}
        title={ui.sections.projects.title}
        subtitle={ui.sections.projects.subtitle}
      />

      <ProjectGroup
        label={ui.projects.engineeringTitle}
        subtitle={ui.projects.engineeringSubtitle}
        accent="var(--primary)"
        icon={Cpu}
        items={engineering}
      />

      <ProjectGroup
        label={ui.projects.researchTitle}
        subtitle={ui.projects.researchSubtitle}
        accent="#34d399"
        icon={FlaskConical}
        items={research}
      />
    </section>
  );
}
