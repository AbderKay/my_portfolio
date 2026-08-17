import { getLenis } from "./lenis";
import { gsap } from "./gsap";

const NAV_OFFSET = 80;

/**
 * Premium smooth-scroll to a target. Prefers the live Lenis engine (so it feels
 * consistent with the page's inertia), falls back to GSAP ScrollToPlugin, then
 * to native scrollIntoView. Respects reduced motion (jumps instantly).
 */
export function smoothScrollTo(target: string | HTMLElement) {
  const el =
    typeof target === "string"
      ? document.querySelector<HTMLElement>(target)
      : target;
  if (!el) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    el.scrollIntoView();
    return;
  }

  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(el, { offset: -NAV_OFFSET, duration: 1.2 });
    return;
  }

  // Fallback: GSAP ScrollToPlugin (registered in lib/gsap).
  gsap.to(window, {
    duration: 1,
    ease: "power3.inOut",
    scrollTo: { y: el, offsetY: NAV_OFFSET },
  });
}
