"use client";

import { useEffect } from "react";
import { reloadOnceForChunkError } from "@/lib/chunkReload";

/**
 * Page-level error boundary. Auto-recovers from stale-deploy chunk errors;
 * otherwise offers a retry that re-renders the segment, or a full reload.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    reloadOnceForChunkError(error);
  }, [error]);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "28rem" }}>
        <h1 style={{ fontSize: "1.25rem", fontWeight: 600, margin: "0 0 0.5rem" }}>
          Something went wrong
        </h1>
        <p style={{ color: "var(--muted, #a8a29e)", margin: "0 0 1.5rem", lineHeight: 1.5 }}>
          The page failed to load. This can happen right after a site update —
          reloading usually fixes it.
        </p>
        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
          <button
            onClick={() => reset()}
            style={{
              cursor: "pointer",
              borderRadius: "9999px",
              border: "1px solid var(--line-strong, #3f3f46)",
              background: "transparent",
              color: "inherit",
              padding: "0.6rem 1.4rem",
              fontSize: "0.9rem",
              fontWeight: 600,
            }}
          >
            Try again
          </button>
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
              border: "1px solid transparent",
              background: "var(--primary, #e7e5e4)",
              color: "var(--bg, #0a0e12)",
              padding: "0.6rem 1.4rem",
              fontSize: "0.9rem",
              fontWeight: 600,
            }}
          >
            Reload
          </button>
        </div>
      </div>
    </main>
  );
}
