"use client";

import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { smoothScrollTo } from "@/lib/scroll";
import { useI18n } from "@/lib/i18n";

/**
 * Interactive scroll cue: a mouse-wheel dot that falls and fades, a breathing
 * glow beam, and a stack of downward chevrons rippling on an infinite GSAP
 * timeline — inviting the user downward. Clicking scrolls to the next section.
 */
export function ScrollIndicator() {
  const root = useRef<HTMLButtonElement>(null);
  const { ui } = useI18n();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const ctx = gsap.context(() => {
      gsap.to(".si-dot", {
        y: 14,
        opacity: 0,
        duration: 1.3,
        ease: "power1.inOut",
        repeat: -1,
        repeatDelay: 0.1,
      });
      gsap.fromTo(
        ".si-beam",
        { scaleY: 0.2, opacity: 0.3, transformOrigin: "top" },
        {
          scaleY: 1,
          opacity: 1,
          duration: 1.6,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        }
      );
      // rippling chevrons
      gsap.fromTo(
        ".si-chevron",
        { opacity: 0.15, y: -4 },
        {
          opacity: 1,
          y: 2,
          duration: 0.9,
          ease: "sine.inOut",
          stagger: { each: 0.16, repeat: -1, yoyo: true },
        }
      );
      gsap.to(root.current, {
        y: 6,
        duration: 2.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <button
      ref={root}
      type="button"
      onClick={() => smoothScrollTo("#about")}
      aria-label="Scroll to content"
      className="group flex flex-col items-center gap-2"
    >
      <span className="mono-label transition-colors group-hover:text-primary">
        {ui.scroll}
      </span>
      <span className="relative flex h-9 w-[22px] items-start justify-center rounded-full border border-line-strong pt-1.5 transition-colors group-hover:border-primary">
        <span className="si-dot h-1.5 w-1.5 rounded-full bg-primary" />
      </span>
      <span className="si-beam h-6 w-px bg-gradient-to-b from-primary to-transparent" />
      {/* animated downward chevrons */}
      <span className="-mt-1 flex flex-col items-center text-primary">
        {[0, 1, 2].map((i) => (
          <ChevronDown key={i} size={14} className="si-chevron -mt-2" strokeWidth={2} />
        ))}
      </span>
    </button>
  );
}
