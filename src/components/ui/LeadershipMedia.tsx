"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import type { GalleryImage } from "@/lib/media";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { useLightbox } from "./Lightbox";
import { useI18n } from "@/lib/i18n";

const SIZES = "(max-width: 768px) 100vw, 360px";
const frameShadow = "0 0 0 1px var(--glass-border), 0 18px 45px -30px var(--glow-primary)";

/**
 * Leadership media: the first photo is always shown. If there are more, a click
 * expands the rest below it as a vertical timeline (rail + nodes), revealed with
 * a staggered GSAP animation; clicking again collapses. Reduced motion just
 * shows/hides without animation.
 */
export function LeadershipMedia({
  images,
  accent = "var(--primary)",
}: {
  images: GalleryImage[];
  accent?: string;
}) {
  const [open, setOpen] = useState(false);
  const rail = useRef<HTMLDivElement>(null);
  const hint = useRef<HTMLSpanElement>(null);
  const count = images.length;
  const lightbox = useLightbox();
  const { ui } = useI18n();

  // gentle continuous bounce on the chevron while collapsed, to draw the eye
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || open || !hint.current) return;
    const tween = gsap.to(hint.current, {
      y: 3,
      duration: 0.7,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
    return () => {
      tween.kill();
      if (hint.current) gsap.set(hint.current, { y: 0 });
    };
  }, [open]);

  useEffect(() => {
    if (!open || !rail.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const ctx = gsap.context(() => {
      gsap.from(".lm-item", {
        opacity: 0,
        y: 26,
        filter: "blur(8px)",
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.14,
      });
      gsap.from(".lm-node", {
        scale: 0,
        opacity: 0,
        duration: 0.4,
        ease: "back.out(1.7)",
        stagger: 0.14,
      });
    }, rail);
    return () => ctx.revert();
  }, [open]);

  if (!count) return null;
  const cover = images[0];
  const rest = images.slice(1);

  return (
    <div>
      {/* cover — always visible */}
      <div
        onClick={() => lightbox.open(cover.src, cover.title)}
        role="button"
        tabIndex={0}
        aria-label="Open photo full screen"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            lightbox.open(cover.src, cover.title);
          }
        }}
        className="group relative aspect-[16/9] w-full cursor-zoom-in overflow-hidden rounded-inset border border-line bg-surface-2"
        style={{ boxShadow: frameShadow }}
      >
        <Image
          src={cover.src}
          alt={cover.title}
          fill
          sizes={SIZES}
          className="object-cover transition-transform duration-700 ease-premium group-hover:scale-[1.05]"
        />
      </div>

      {rest.length ? (
        <>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="mt-3 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-xs transition-all duration-300 hover:-translate-y-0.5"
            style={{
              color: accent,
              borderColor: `color-mix(in srgb, ${accent} 45%, transparent)`,
              background: `color-mix(in srgb, ${accent} 12%, transparent)`,
              boxShadow: open ? "none" : `0 0 22px -8px ${accent}`,
            }}
          >
            <span ref={hint} className="inline-flex">
              <ChevronDown
                size={14}
                className={cn("transition-transform duration-300", open && "rotate-180")}
              />
            </span>
            {open ? ui.leadershipMedia.hide : ui.leadershipMedia.viewAll(count)}
          </button>

          {open ? (
            <div ref={rail} className="relative mt-4 space-y-4 border-l border-line pl-6">
              {rest.map((img) => (
                <div key={img.src} className="lm-item relative">
                  <span
                    className="lm-node absolute -left-[26px] top-3 h-2.5 w-2.5 rounded-full border"
                    style={{ borderColor: accent, background: "var(--bg)" }}
                  />
                  <div
                    onClick={() => lightbox.open(img.src, img.title)}
                    role="button"
                    tabIndex={0}
                    aria-label="Open photo full screen"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        lightbox.open(img.src, img.title);
                      }
                    }}
                    className="group relative aspect-[16/9] w-full cursor-zoom-in overflow-hidden rounded-inset border border-line bg-surface-2"
                    style={{ boxShadow: frameShadow }}
                  >
                    <Image
                      src={img.src}
                      alt={img.title}
                      fill
                      sizes={SIZES}
                      className="object-cover transition-transform duration-700 ease-premium group-hover:scale-[1.05]"
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
