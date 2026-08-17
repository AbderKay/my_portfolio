"use client";

import { useEffect, useRef, type ReactNode, type MouseEvent } from "react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type Variant = "solid" | "outline";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: (e: MouseEvent) => void;
  download?: boolean;
  target?: string;
  variant?: Variant;
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
};

/**
 * Premium CTA: GSAP magnetic pull toward the cursor + a glow layer that
 * expands on hover, subtle elevation, and an animated border sheen.
 * Renders an <a> when `href` is set, otherwise a submit <button>.
 * Magnetism is disabled under reduced motion / coarse pointers.
 */
export function MagneticButton({
  children,
  href,
  onClick,
  download,
  target,
  variant = "solid",
  className,
  ariaLabel,
  disabled,
}: Props) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const qx = useRef<gsap.QuickToFunc | null>(null);
  const qy = useRef<gsap.QuickToFunc | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (reduce || !fine) return;
    qx.current = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
    qy.current = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });
  }, []);

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el || !qx.current || !qy.current) return;
    const r = el.getBoundingClientRect();
    qx.current((e.clientX - (r.left + r.width / 2)) * 0.35);
    qy.current((e.clientY - (r.top + r.height / 2)) * 0.35);
  };
  const onLeave = () => {
    qx.current?.(0);
    qy.current?.(0);
  };

  const base = cn(
    "group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-6 py-3 font-mono text-sm font-medium transition-[box-shadow,transform] duration-300 will-change-transform",
    variant === "solid"
      ? "bg-accent text-accent-ink hover:shadow-[0_0_30px_-6px_var(--glow-accent)]"
      : "border border-line-strong text-text hover:border-primary hover:text-primary hover:shadow-[0_0_28px_-8px_var(--glow-primary)]",
    disabled && "pointer-events-none opacity-70",
    className
  );

  const inner = (
    <>
      {/* glow that expands on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-0 scale-0 rounded-full opacity-0 transition-all duration-500 ease-premium group-hover:scale-100 group-hover:opacity-100"
        style={{
          background:
            variant === "solid"
              ? "radial-gradient(closest-side, rgba(255,255,255,0.25), transparent)"
              : "radial-gradient(closest-side, var(--glow-primary), transparent)",
        }}
      />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </>
  );

  if (href) {
    return (
      <a
        ref={ref}
        href={href}
        onClick={onClick}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        download={download}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        aria-label={ariaLabel}
        className={base}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      ref={ref}
      type="submit"
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      aria-label={ariaLabel}
      aria-busy={disabled}
      disabled={disabled}
      className={base}
    >
      {inner}
    </button>
  );
}
