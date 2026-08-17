import type Lenis from "lenis";

// Shared reference to the single Lenis instance created by SmoothScroll, so
// anchor navigation can drive premium smooth-scroll through the same engine.
let instance: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  instance = l;
};

export const getLenis = () => instance;
