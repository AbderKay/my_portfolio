// Recovery for "stale chunk" errors: after a new deploy, a visitor still running
// the previous build can request JS/CSS chunk hashes that no longer exist. The
// failed load surfaces as a client-side exception. Detecting it and reloading
// once pulls the fresh build and repairs the page transparently.

const CHUNK_ERROR =
  /ChunkLoadError|Loading chunk [\w-]+ failed|Loading CSS chunk|dynamically imported module|module script failed|is not a valid JavaScript MIME type/i;

export function isChunkLoadError(error: unknown): boolean {
  if (!error) return false;
  const e = error as { name?: string; message?: string };
  return CHUNK_ERROR.test(e.name || "") || CHUNK_ERROR.test(e.message || "");
}

/**
 * Reloads the page once (throttled to at most once per 10s) to recover from a
 * stale-deploy chunk error. Returns true if a reload was triggered. The throttle
 * prevents a reload loop when a deploy is genuinely broken.
 */
export function reloadOnceForChunkError(error: unknown): boolean {
  if (typeof window === "undefined" || !isChunkLoadError(error)) return false;
  try {
    const key = "__chunk_reload_at";
    const last = Number(sessionStorage.getItem(key) || "0");
    if (Date.now() - last > 10_000) {
      sessionStorage.setItem(key, String(Date.now()));
      window.location.reload();
      return true;
    }
  } catch {
    /* storage blocked (private mode) — fall through to the manual retry UI */
  }
  return false;
}
