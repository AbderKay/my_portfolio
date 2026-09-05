"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { profile } from "@/data/profile";
import { gsap } from "@/lib/gsap";

/**
 * Circular premium portrait as the hero's visual focus. A luminous glass ring
 * around a perfectly round photo, a deep layered background glow, a slowly
 * rotating gradient rim, and GSAP motion: a natural float (bob + sway + micro
 * rotation), a breathing scale, and a smooth 3D perspective tilt that follows
 * the pointer with layered-depth badges. Circular at every size; static under
 * reduced motion; falls back to initials if the photo is missing.
 */
export function HeroPortrait() {
  const wrap = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      // natural float — vertical bob + gentle sway + micro rotation
      gsap.to(wrap.current, { y: -14, duration: 3.6, ease: "sine.inOut", repeat: -1, yoyo: true });
      gsap.to(wrap.current, { x: 7, duration: 5.4, ease: "sine.inOut", repeat: -1, yoyo: true });
      gsap.to(wrap.current, { rotation: 1.6, duration: 6.2, ease: "sine.inOut", repeat: -1, yoyo: true });
      // breathing scale
      gsap.to(card.current, { scale: 1.02, duration: 4.2, ease: "sine.inOut", repeat: -1, yoyo: true });
      // rotating rim, breathing halo, depth bob
      gsap.to(".hp-rim", { rotate: 360, duration: 22, ease: "none", repeat: -1 });
      gsap.to(".hp-halo", {
        opacity: 1,
        scale: 1.14,
        duration: 2.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
      gsap.to(".hp-depth", {
        y: -6,
        duration: 2.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.4,
      });
    }, wrap);

    // 3D perspective tilt following the pointer
    if (!fine || !card.current) return () => ctx.revert();
    gsap.set(card.current, { transformPerspective: 800, transformStyle: "preserve-3d" });
    const rx = gsap.quickTo(card.current, "rotationX", { duration: 0.7, ease: "power3" });
    const ry = gsap.quickTo(card.current, "rotationY", { duration: 0.7, ease: "power3" });
    const layers = gsap.utils.toArray<HTMLElement>(".hp-depth");
    const lqx = layers.map((l) => gsap.quickTo(l, "x", { duration: 0.7, ease: "power3" }));
    const lqy = layers.map((l) => gsap.quickTo(l, "y", { duration: 0.7, ease: "power3" }));

    const onMove = (e: MouseEvent) => {
      const el = wrap.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - (r.left + r.width / 2)) / r.width;
      const py = (e.clientY - (r.top + r.height / 2)) / r.height;
      ry(px * 16);
      rx(-py * 16);
      lqx.forEach((q, i) => q(px * (14 + i * 8)));
      lqy.forEach((q, i) => q(py * (8 + i * 5)));
    };
    const onLeave = () => {
      rx(0);
      ry(0);
      lqx.forEach((q) => q(0));
      lqy.forEach((q) => q(0));
    };
    const el = wrap.current;
    el?.addEventListener("mousemove", onMove);
    el?.addEventListener("mouseleave", onLeave);

    return () => {
      el?.removeEventListener("mousemove", onMove);
      el?.removeEventListener("mouseleave", onLeave);
      ctx.revert();
    };
  }, []);

  const showPhoto = Boolean(profile.photo) && !imgError;

  return (
    <div ref={wrap} className="relative aspect-square w-[clamp(240px,32vw,360px)]">
      {/* deep background glow for depth */}
      <div
        aria-hidden
        className="absolute -inset-16 -z-10 rounded-full opacity-100 blur-3xl"
        style={{
          background:
            "radial-gradient(52% 52% at 66% 22%, var(--glow-primary), transparent 68%), radial-gradient(48% 48% at 28% 86%, var(--glow-accent), transparent 70%)",
        }}
      />
      {/* luminous breathing halo hugging the frame */}
      <div
        aria-hidden
        className="hp-halo absolute -inset-3 -z-10 rounded-full opacity-90 blur-2xl"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in srgb, var(--primary) 60%, transparent), transparent 74%)",
        }}
      />

      {/* rotating gradient rim */}
      <div
        aria-hidden
        className="hp-rim absolute inset-0 rounded-full opacity-70 blur-[2px]"
        style={{
          background:
            "conic-gradient(from 90deg, var(--primary), var(--accent3), var(--accent), var(--primary))",
        }}
      />

      {/* glassmorphism ring + circular photo (tilt target) */}
      <div
        ref={card}
        className="glass absolute inset-[6px] rounded-full p-[2px] will-change-transform"
        style={{
          boxShadow:
            "0 0 0 1px color-mix(in srgb, var(--primary) 35%, transparent), 0 0 40px -10px var(--glow-primary), 0 0 90px -28px var(--primary), var(--shadow)",
        }}
      >
        <div className="relative h-full w-full overflow-hidden rounded-full border border-line-strong bg-surface-2">
          {showPhoto ? (
            <Image
              src={profile.photo}
              alt={profile.name}
              fill
              priority
              sizes="(max-width: 1024px) 300px, 360px"
              className="object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center font-display text-[clamp(3rem,8vw,5rem)] font-bold text-primary"
              style={{
                background:
                  "radial-gradient(80% 70% at 50% 20%, var(--surface-2), var(--surface))",
              }}
            >
              {profile.firstName.charAt(0)}
              {profile.lastName.charAt(0)}
            </div>
          )}
          {/* top-right sheen following global light */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(55% 45% at 74% 12%, rgba(255,255,255,0.14), transparent 60%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
