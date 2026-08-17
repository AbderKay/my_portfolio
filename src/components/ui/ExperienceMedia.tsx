"use client";

import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import Image from "next/image";
import type { GalleryImage } from "@/lib/media";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { useLightbox } from "./Lightbox";

const SIZES = "(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 480px";
const frameShadow = "0 0 0 1px var(--glass-border), 0 22px 55px -32px var(--glow-primary)";

/**
 * Experience media inside a clean glass frame:
 *  • 1 image  → single image, revealed on enter
 *  • 2+       → auto slideshow, one at a time, every 3s (fade + slide + scale),
 *               loops, pauses on hover
 * Plus a scroll reveal, a subtle scroll parallax, and a hover zoom + glow.
 * No counters/labels. CSS drives opacity so an image is always visible even if
 * the GSAP ticker stalls; reduced motion stays static on the first image.
 */
export function ExperienceMedia({
  images,
  accent = "var(--primary)",
  interval = 3000,
  fit = "cover",
  zoomable = true,
}: {
  images: GalleryImage[];
  accent?: string;
  /** ms between slides when there are 2+ images. */
  interval?: number;
  /** object-fit: "cover" fills the frame, "contain" shows the whole image. */
  fit?: "cover" | "contain";
  /** When false, clicking the image does NOT open the fullscreen lightbox. */
  zoomable?: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);
  const count = images.length;
  const isSlideshow = count > 1;
  const [index, setIndex] = useState(0);
  const paused = useRef(false);
  const fitCls = fit === "contain" ? "object-contain" : "object-cover";
  const lightbox = useLightbox();

  // Props for the frame that opens the lightbox — omitted entirely when the
  // media is not zoomable (e.g. a card that should ignore clicks on its image).
  const zoomProps = zoomable
    ? {
        onClick: () => lightbox.open(images[index].src, images[index].title),
        role: "button" as const,
        tabIndex: 0,
        "aria-label": "Open image full screen",
        onKeyDown: (e: ReactKeyboardEvent) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            lightbox.open(images[index].src, images[index].title);
          }
        },
      }
    : {};
  const zoomCursor = zoomable ? "cursor-zoom-in" : "";

  // reveal on enter + subtle scroll parallax
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !root.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".em-reveal", {
        autoAlpha: 0,
        y: 26,
        scale: 0.96,
        filter: "blur(8px)",
        duration: 0.9,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: { trigger: root.current, start: "top 85%", once: true },
      });
      gsap.to(".em-parallax", {
        yPercent: -5,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  // slideshow: advance every 3s, paused on hover
  useEffect(() => {
    if (!isSlideshow) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(() => {
      if (!paused.current) setIndex((i) => (i + 1) % count);
    }, interval);
    return () => window.clearInterval(id);
  }, [isSlideshow, count, interval]);

  // fade + slide + scale flourish on slide change (opacity handled by CSS)
  const firstRun = useRef(true);
  useEffect(() => {
    if (!isSlideshow) return;
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const el = root.current?.querySelector<HTMLElement>(`.em-slide[data-i="${index}"]`);
    if (el) {
      gsap.fromTo(
        el,
        { xPercent: 6, scale: 1.06 },
        { xPercent: 0, scale: 1, duration: 1, ease: "power2.out" }
      );
    }
  }, [index, isSlideshow]);

  if (!count) return null;

  const hoverGlow = (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 z-10 rounded-media opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      style={{ boxShadow: `inset 0 0 60px -22px ${accent}` }}
    />
  );

  if (isSlideshow) {
    return (
      <div
        ref={root}
        onMouseEnter={() => (paused.current = true)}
        onMouseLeave={() => (paused.current = false)}
        {...zoomProps}
        className={cn(
          "em-reveal em-parallax group relative aspect-[16/10] w-full overflow-hidden rounded-media border border-line",
          zoomCursor
        )}
        style={{ boxShadow: frameShadow }}
      >
        {images.map((img, i) => (
          <Image
            key={img.src}
            src={img.src}
            alt={img.title}
            data-i={i}
            fill
            sizes={SIZES}
            priority={i === 0}
            unoptimized={/\.gif$/i.test(img.src)}
            className={cn(
              "em-slide transition-[opacity,transform] duration-[900ms] ease-premium group-hover:scale-[1.04]",
              fitCls,
              i === index ? "opacity-100" : "opacity-0"
            )}
          />
        ))}
        {hoverGlow}
      </div>
    );
  }

  // single image
  return (
    <div
      ref={root}
      {...zoomProps}
      className={cn(
        "em-reveal em-parallax group relative aspect-[16/10] w-full overflow-hidden rounded-media border border-line",
        zoomCursor
      )}
      style={{ boxShadow: frameShadow }}
    >
      <Image
        src={images[0].src}
        alt={images[0].title}
        fill
        sizes={SIZES}
        unoptimized={/\.gif$/i.test(images[0].src)}
        className={cn(
          "transition-transform duration-700 ease-premium group-hover:scale-[1.05]",
          fitCls
        )}
      />
      {hoverGlow}
    </div>
  );
}
