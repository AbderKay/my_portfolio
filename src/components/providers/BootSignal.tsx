"use client";

import { useEffect } from "react";

/**
 * Signals to the inline boot guard (see lib/bootGuard.ts) that React has
 * actually mounted. If this never runs within the watchdog window, the guard
 * assumes a stale/broken load and reloads the page once to pull a fresh build.
 */
export function BootSignal() {
  useEffect(() => {
    window.__appReady = true;
  }, []);
  return null;
}
