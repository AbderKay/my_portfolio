"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

type LightboxItem = { src: string; alt: string };
type LightboxApi = { open: (src: string, alt?: string) => void; close: () => void };

const LightboxContext = createContext<LightboxApi | null>(null);

/** Access the global lightbox. Safe to call anywhere under the provider. */
export function useLightbox(): LightboxApi {
  const ctx = useContext(LightboxContext);
  // No-op fallback so components never crash if used outside the provider.
  return ctx ?? { open: () => {}, close: () => {} };
}

/**
 * App-wide image lightbox. Any image can call `useLightbox().open(src)` to
 * present the original at full size in a fullscreen overlay — object-contain so
 * nothing is cropped or distorted, with a smooth scale/fade in-and-out, a clear
 * close button, backdrop + Escape to dismiss, and a scroll lock while open.
 */
export function LightboxProvider({ children }: { children: ReactNode }) {
  const [item, setItem] = useState<LightboxItem | null>(null);

  const open = useCallback((src: string, alt = "") => setItem({ src, alt }), []);
  const close = useCallback(() => setItem(null), []);

  // lock body scroll + close on Escape while open
  useEffect(() => {
    if (!item) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [item, close]);

  return (
    <LightboxContext.Provider value={{ open, close }}>
      {children}
      <AnimatePresence>
        {item ? (
          <motion.div
            key="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Image preview"
            className="fixed inset-0 z-[130] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={close}
          >
            <button
              type="button"
              aria-label="Close preview"
              onClick={close}
              className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur transition-colors duration-200 hover:border-primary hover:text-primary sm:right-6 sm:top-6"
            >
              <X size={20} />
            </button>

            <motion.img
              src={item.src}
              alt={item.alt}
              className="max-h-[90vh] max-w-[94vw] select-none rounded-media object-contain shadow-2xl"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              draggable={false}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </LightboxContext.Provider>
  );
}
