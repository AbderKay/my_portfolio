"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

type StatCounterProps = {
  value: number;
  suffix?: string;
  label: string;
};

/**
 * Counts up to the target number when scrolled into view.
 * Purpose: draws the eye to the evidence numbers — the emotional hook.
 */
export function StatCounter({ value, suffix = "", label }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(value);
      return;
    }
    let raf = 0;
    let start: number | null = null;
    const duration = 1500;
    const tick = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, reduce]);

  return (
    <div ref={ref} className="p-4 md:p-5">
      <div className="font-display text-step-1 font-bold leading-none tracking-tight md:text-step-2">
        {display.toLocaleString("en-US")}
        <span className="text-primary">{suffix}</span>
      </div>
      <p className="mt-2 text-[0.72rem] leading-snug text-muted">{label}</p>
    </div>
  );
}
