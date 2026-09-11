"use client";

import { useEffect } from "react";
import { reloadOnceForChunkError } from "@/lib/chunkReload";

/**
 * Ultimate error boundary (catches errors in the root layout too). Its main job
 * is to auto-recover from stale-deploy chunk errors; anything else falls back to
 * a minimal, self-styled retry screen (globals.css may not be available here).
 */
export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    reloadOnceForChunkError(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#0a0e12",
          color: "#e7e5e4",
          fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif",
          padding: "2rem",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: "28rem" }}>
          <h1 style={{ fontSize: "1.25rem", fontWeight: 600, margin: "0 0 0.5rem" }}>
            Something went wrong
          </h1>
          <p style={{ color: "#a8a29e", margin: "0 0 1.5rem", lineHeight: 1.5 }}>
            The page failed to load. This can happen right after a site update —
            reloading usually fixes it.
          </p>
          <button
            onClick={() => {
              try {
                sessionStorage.removeItem("__chunk_reload_at");
              } catch {
                /* ignore */
              }
              window.location.reload();
            }}
            style={{
              cursor: "pointer",
              borderRadius: "9999px",
              border: "1px solid #3f3f46",
              background: "#e7e5e4",
              color: "#0a0e12",
              padding: "0.6rem 1.4rem",
              fontSize: "0.9rem",
              fontWeight: 600,
            }}
          >
            Reload
          </button>
        </div>
      </body>
    </html>
  );
}
