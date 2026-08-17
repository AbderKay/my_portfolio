"use client";

import { useState } from "react";
import { ArrowUpRight, Eye, ExternalLink, Play } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

type Props = {
  url: string;
  title: string;
  accent?: string;
  aspect?: string;
  /** Cover screenshot shown over the embed until the viewer starts the demo. */
  poster?: string;
  /** Whether the site allows being framed. If false, the demo opens in a new
   *  tab instead of embedding (some sites send X-Frame-Options: DENY). */
  frameable?: boolean;
};

/**
 * Live-site media zone. For frameable sites: a screenshot cover with a
 * "Live Demo" button that loads the interactive site in-place ("Preview"
 * returns). For sites that block framing: the cover with a "Live Demo" button
 * that opens the real site in a new tab.
 */
export function MediaEmbed({
  url,
  title,
  accent = "var(--primary)",
  aspect = "aspect-[16/10]",
  poster,
  frameable = true,
}: Props) {
  const { ui } = useI18n();
  const [playing, setPlaying] = useState(frameable && !poster);
  const [loaded, setLoaded] = useState(false);

  const containerCls = cn(
    "group/embed relative w-full overflow-hidden rounded-inset border border-line bg-surface-2",
    aspect
  );

  const badge = (
    <span
      className="absolute left-2.5 top-2.5 z-20 inline-flex items-center gap-1.5 rounded-full border border-glass-border bg-bg/70 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-wider backdrop-blur"
      style={{ color: accent }}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span
          className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
          style={{ background: accent }}
        />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
      </span>
      {ui.embed.live}
    </span>
  );

  const openLink = (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="absolute right-2.5 top-2.5 z-20 inline-flex items-center gap-1.5 rounded-full border border-glass-border bg-bg/70 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-wider text-text backdrop-blur transition-colors hover:text-[color:var(--primary)]"
    >
      {ui.embed.open} <ExternalLink size={11} />
    </a>
  );

  // Cover + play control (shown before playing, or always when not frameable).
  const showCover = poster && (!frameable || !playing);

  return (
    <div className={containerCls}>
      {showCover ? (
        <>
          <Image
            src={poster}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            className="object-cover"
          />
          {frameable ? (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label={ui.embed.startDemo}
              className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-black/35 transition-colors hover:bg-black/25"
            >
              <span
                className="grid h-14 w-14 place-items-center rounded-full border border-glass-border bg-bg/70 backdrop-blur transition-transform duration-300 group-hover/embed:scale-110"
                style={{ color: accent }}
              >
                <Play size={22} className="ml-0.5" fill="currentColor" />
              </span>
              <span className="rounded-full border border-glass-border bg-bg/70 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-text backdrop-blur">
                {ui.embed.liveDemo}
              </span>
            </button>
          ) : (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={ui.embed.openNewTab}
              className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-black/35 transition-colors hover:bg-black/25"
            >
              <span
                className="grid h-14 w-14 place-items-center rounded-full border border-glass-border bg-bg/70 backdrop-blur transition-transform duration-300 group-hover/embed:scale-110"
                style={{ color: accent }}
              >
                <ArrowUpRight size={22} />
              </span>
              <span className="rounded-full border border-glass-border bg-bg/70 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-text backdrop-blur">
                {ui.embed.liveDemo}
              </span>
            </a>
          )}
        </>
      ) : (
        <>
          {!loaded ? (
            <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-surface-2 to-surface" />
          ) : null}
          <iframe
            src={url}
            title={title}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            referrerPolicy="no-referrer"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            className={cn(
              "absolute inset-0 h-full w-full border-0 transition-opacity duration-500",
              loaded ? "opacity-100" : "opacity-0"
            )}
          />
          {poster ? (
            <button
              type="button"
              onClick={() => setPlaying(false)}
              className="absolute bottom-2.5 left-2.5 z-20 inline-flex items-center gap-1.5 rounded-full border border-glass-border bg-bg/70 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-wider text-text backdrop-blur transition-colors hover:text-[color:var(--primary)]"
            >
              <Eye size={11} /> {ui.embed.preview}
            </button>
          ) : null}
        </>
      )}

      {badge}
      {openLink}
    </div>
  );
}
