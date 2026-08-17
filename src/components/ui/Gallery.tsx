"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import type { GalleryImage } from "@/lib/media";
import { cn } from "@/lib/utils";

type Props = {
  images: GalleryImage[];
  accent?: string;
  aspect?: string;
};

/**
 * Experience/certification gallery: a cover thumbnail (first image) that opens
 * a smooth Framer Motion lightbox with prev/next, captions, keyboard nav
 * (←/→/Esc), mobile swipe, and lazy-loaded images. Scalable — the images array
 * is read from the folder, so dropping in more files "just works".
 */
export function Gallery({ images, accent = "var(--primary)", aspect = "aspect-[16/10]" }: Props) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const count = images.length;

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + count) % count),
    [count]
  );

  useEffect(() => {
    if (!open) return;
    const el = document.documentElement;
    el.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      el.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, go]);

  if (!count) return null;

  const openAt = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  return (
    <>
      {/* cover */}
      <button
        type="button"
        onClick={() => openAt(0)}
        aria-label="Open gallery"
        className={cn(
          "group/gal relative w-full overflow-hidden rounded-inset border border-line bg-surface-2",
          aspect
        )}
      >
        <Image
          src={images[0].src}
          alt={images[0].title}
          fill
          sizes="(max-width: 768px) 100vw, 600px"
          className="object-cover transition-transform duration-500 group-hover/gal:scale-105"
        />
        <span className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover/gal:bg-black/40">
          <span
            className="grid h-11 w-11 scale-90 place-items-center rounded-full border border-glass-border bg-bg/70 opacity-0 backdrop-blur transition-all duration-300 group-hover/gal:scale-100 group-hover/gal:opacity-100"
            style={{ color: accent }}
          >
            <Expand size={18} />
          </span>
        </span>
        {count > 1 ? (
          <span className="absolute bottom-2.5 right-2.5 rounded-full border border-glass-border bg-bg/70 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-wider text-text backdrop-blur">
            {count} photos
          </span>
        ) : null}
        {/* caption of the cover */}
        <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 text-left font-mono text-xs text-white/90">
          {images[0].title}
        </span>
      </button>

      {/* lightbox */}
      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            {/* close */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close gallery"
              className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-glass-border bg-bg/70 text-text backdrop-blur transition-colors hover:text-[color:var(--primary)]"
            >
              <X size={18} />
            </button>

            {/* prev / next */}
            {count > 1 ? (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    go(-1);
                  }}
                  aria-label="Previous image"
                  className="absolute left-3 z-10 grid h-11 w-11 place-items-center rounded-full border border-glass-border bg-bg/70 text-text backdrop-blur transition-colors hover:text-[color:var(--primary)] sm:left-6"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    go(1);
                  }}
                  aria-label="Next image"
                  className="absolute right-3 z-10 grid h-11 w-11 place-items-center rounded-full border border-glass-border bg-bg/70 text-text backdrop-blur transition-colors hover:text-[color:var(--primary)] sm:right-6"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            ) : null}

            {/* image + caption */}
            <motion.figure
              key={index}
              className="relative flex max-h-full max-w-5xl flex-col items-center gap-4"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              drag={count > 1 ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80) go(1);
                else if (info.offset.x > 80) go(-1);
              }}
            >
              <div className="relative max-h-[75vh] w-full overflow-hidden rounded-media">
                <Image
                  src={images[index].src}
                  alt={images[index].title}
                  width={1600}
                  height={1000}
                  sizes="90vw"
                  className="h-auto max-h-[75vh] w-auto object-contain"
                  priority
                />
              </div>
              <figcaption className="flex items-center gap-3 font-mono text-sm text-white/90">
                <span style={{ color: accent }}>{String(index + 1).padStart(2, "0")}</span>
                <span>{images[index].title}</span>
                <span className="text-white/40">/ {count}</span>
              </figcaption>
            </motion.figure>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
