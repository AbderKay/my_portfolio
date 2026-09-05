"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";
import { gsap } from "@/lib/gsap";

const words = ["Engineering Student", "Researcher", "Leader"];

/**
 * GSAP intro preloader: a counter races 000 → 100 while a word cycles and a
 * progress bar fills, then the whole curtain slides up (power4.inOut) and the
 * component unmounts. Scroll is locked while active. Skipped for reduced motion.
 */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let fallback = 0;
    const unlock = () => {
      window.clearTimeout(fallback);
      html.style.overflow = "";
      // Signal other components (e.g. the hero) to start their intro.
      window.__preloaderDone = true;
      window.dispatchEvent(new Event("preloader:done"));
      setDone(true);
    };

    // lock scroll while the curtain is up
    html.style.overflow = "hidden";
    window.scrollTo(0, 0);

    if (reduce) {
      unlock();
      return;
    }

    // Failsafe: never trap the user behind the curtain if rAF is throttled
    // (tab loaded in background, reduced power mode, etc.).
    fallback = window.setTimeout(unlock, 5200);

    const counter = { v: 0 };
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: unlock });
      tl.to(counter, {
        v: 100,
        duration: 2.4,
        ease: "power2.inOut",
        onUpdate: () => {
          if (numRef.current) {
            numRef.current.textContent = String(Math.round(counter.v)).padStart(
              3,
              "0"
            );
          }
        },
      })
        .to(".pl-bar", { scaleX: 1, duration: 2.4, ease: "power2.inOut" }, 0)
        .fromTo(
          ".pl-word",
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.28,
            ease: "power3.out",
          },
          0.15
        )
        .to(
          [".pl-content"],
          { yPercent: -120, opacity: 0, duration: 0.6, ease: "power4.in" },
          "+=0.15"
        )
        .to(root.current, {
          yPercent: -100,
          duration: 0.9,
          ease: "power4.inOut",
        });
    }, root);

    return () => {
      window.clearTimeout(fallback);
      ctx.revert();
      html.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[9999] flex flex-col justify-between bg-bg px-[clamp(1.25rem,5vw,4rem)] py-8"
      aria-hidden
    >
      <div className="pl-content flex items-center justify-between">
        <span className="font-display text-lg font-semibold tracking-tight">
          {profile.firstName.charAt(0)}
          {profile.lastName.charAt(0)}
          <span className="text-accent">.</span>
        </span>
        <span className="mono-label">Portfolio — 2026</span>
      </div>

      <div className="pl-content flex flex-col items-center gap-4">
        <div className="h-8 overflow-hidden">
          {words.map((w) => (
            <div
              key={w}
              className="pl-word font-display text-step-1 font-medium text-muted"
            >
              {w}
            </div>
          ))}
        </div>
      </div>

      <div className="pl-content flex items-end justify-between gap-6">
        <div className="w-full">
          <div className="h-px w-full origin-left overflow-hidden bg-line">
            <span className="pl-bar block h-full w-full origin-left scale-x-0 bg-primary" />
          </div>
        </div>
        <span
          ref={numRef}
          className="font-display text-[clamp(3rem,10vw,7rem)] font-bold leading-none tracking-tight tabular-nums"
        >
          000
        </span>
      </div>
    </div>
  );
}
