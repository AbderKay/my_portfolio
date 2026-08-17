"use client";

import { useState } from "react";
import { Images, MonitorPlay } from "lucide-react";
import type { Project } from "@/data/projects";
import { MediaEmbed } from "./MediaEmbed";
import { ExperienceMedia } from "./ExperienceMedia";
import { MediaFrame } from "./MediaFrame";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

/**
 * Chooses how a project's media zone renders. When a project has both a live
 * demo and screenshots, a small toggle lets the viewer switch between the
 * embedded "Live Demo" (default) and the "Screenshots" gallery. Falls back to
 * whichever single source exists, or an elegant placeholder.
 */
export function ProjectMedia({
  project,
  accent,
}: {
  project: Project;
  accent: string;
}) {
  const { t, ui } = useI18n();
  const title = t(project.title);
  const hasEmbed = Boolean(project.embed);
  const hasMedia = Boolean(project.media?.length);
  const [tab, setTab] = useState<"demo" | "gallery">(hasEmbed ? "demo" : "gallery");

  if (!hasEmbed && !hasMedia) {
    return <MediaFrame accent={accent} label={ui.projects.categories[project.category] ?? project.category} />;
  }

  const showToggle = hasEmbed && hasMedia;
  const tabBase =
    "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[0.62rem] uppercase tracking-wider transition-colors";

  return (
    <div>
      {showToggle ? (
        <div className="mb-2 flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setTab("demo")}
            className={cn(
              tabBase,
              tab === "demo"
                ? "bg-white/5"
                : "border-line-strong text-muted hover:text-text"
            )}
            style={tab === "demo" ? { borderColor: accent, color: accent } : undefined}
          >
            <MonitorPlay size={12} /> {ui.projects.liveDemo}
          </button>
          <button
            type="button"
            onClick={() => setTab("gallery")}
            className={cn(
              tabBase,
              tab === "gallery"
                ? "bg-white/5"
                : "border-line-strong text-muted hover:text-text"
            )}
            style={tab === "gallery" ? { borderColor: accent, color: accent } : undefined}
          >
            <Images size={12} /> {ui.projects.screenshots} ({project.media!.length})
          </button>
        </div>
      ) : null}

      {hasEmbed && (tab === "demo" || !hasMedia) ? (
        <MediaEmbed
          url={project.embed!}
          title={title}
          accent={accent}
          poster={project.embedPoster}
          frameable={project.embedFrameable ?? true}
        />
      ) : (
        <ExperienceMedia
          images={project.media!.map((src) => ({ src, title }))}
          accent={accent}
          interval={3500}
          fit="contain"
        />
      )}
    </div>
  );
}
