import type { CSSProperties, ReactNode } from "react";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type MediaFrameProps = {
  /** Optional media (image/video/embed) to render; when absent a premium placeholder shows. */
  children?: ReactNode;
  label?: string;
  icon?: ReactNode;
  /** Accent color (usually the category color). */
  accent?: string;
  className?: string;
  aspect?: string;
};

/**
 * A dedicated visual media zone for cards. Renders provided media, or an
 * elegant framed placeholder (blueprint grid + accent glow + label) that is
 * ready to receive a screenshot, video, certificate, logo, diagram, or demo.
 */
export function MediaFrame({
  children,
  label = "Preview",
  icon,
  accent = "var(--primary)",
  className,
  aspect = "aspect-[16/10]",
}: MediaFrameProps) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-inset border border-line bg-surface-2",
        aspect,
        className
      )}
      style={{ "--cat": accent } as CSSProperties}
    >
      {children ? (
        children
      ) : (
        <>
          {/* blueprint grid */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.5]"
            style={{
              backgroundImage:
                "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />
          {/* accent glow */}
          <div
            aria-hidden
            className="absolute -right-8 -top-10 h-32 w-32 rounded-full opacity-40 blur-2xl"
            style={{ background: "var(--cat)" }}
          />
          {/* centered label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-faint">
            <span
              className="grid h-10 w-10 place-items-center rounded-full border border-line-strong"
              style={{ color: "var(--cat)" }}
            >
              {icon ?? <ImageIcon size={18} />}
            </span>
            <span className="font-mono text-[0.7rem] uppercase tracking-wider">
              {label}
            </span>
          </div>
        </>
      )}
    </div>
  );
}
