"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  images: string[];
  alt?: string;
  accent?: string;
  aspect?: string;
  /** ms between auto-advances */
  interval?: number;
};

/**
 * Auto-advancing image presentation for a card's media zone — cross-fades
 * through the images like a short looping video. Timer-based (robust), pauses
 * under reduced motion, and lets the viewer jump via the dots.
 */
export function MediaCarousel({
  images,
  alt = "",
  accent = "var(--primary)",
  aspect = "aspect-[16/10]",
  interval = 2600,
}: Props) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const t = setInterval(() => setI((p) => (p + 1) % images.length), interval);
    return () => clearInterval(t);
  }, [images.length, interval]);

  if (!images.length) return null;

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-inset border border-line bg-surface-2",
        aspect
      )}
    >
      {images.map((src, idx) => (
        <Image
          key={src}
          src={src}
          alt={`${alt} — ${idx + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 600px"
          priority={idx === 0}
          className={cn(
            "object-cover transition-opacity duration-700 ease-premium",
            idx === i ? "opacity-100" : "opacity-0"
          )}
        />
      ))}

      {/* bottom gradient for legibility */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16"
        style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.4))" }}
      />

      {/* dots */}
      <div className="absolute bottom-2.5 left-1/2 flex -translate-x-1/2 gap-1.5">
        {images.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setI(idx)}
            aria-label={`Show image ${idx + 1}`}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              idx === i ? "w-4" : "w-1.5 opacity-50 hover:opacity-80"
            )}
            style={{ background: idx === i ? accent : "var(--muted)" }}
          />
        ))}
      </div>
    </div>
  );
}
