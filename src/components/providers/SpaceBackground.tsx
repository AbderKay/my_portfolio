"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

type Star = {
  x: number;
  y: number;
  depth: number; // 0 (far) .. 1 (near) — drives parallax + size
  r: number;
  base: number; // base alpha
  tw: number; // twinkle speed
  warm: boolean;
};
type Dust = { x: number; y: number; vx: number; vy: number; r: number };
type Shooter = { x: number; y: number; vx: number; vy: number; life: number; len: number };

/**
 * Deep-space environment: soft CSS nebulae / aurora / planet drifting via GSAP,
 * plus a canvas field of parallax twinkling stars, cosmic dust that parts around
 * the cursor, and occasional shooting stars. Cursor gently shifts the star
 * layers (depth parallax) and a light follows the pointer.
 * Fixed, behind content, pointer-events:none. Capped counts + DPR for 60fps;
 * a calm static frame under reduced motion.
 */
export function SpaceBackground() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const rootEl = rootRef.current;
    if (!canvas || !rootEl) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const styles = getComputedStyle(document.documentElement);
    const primary = styles.getPropertyValue("--primary").trim() || "#57b6c9";
    const accent = styles.getPropertyValue("--accent").trim() || "#e8a24c";

    let w = 0;
    let h = 0;
    let raf = 0;
    let stars: Star[] = [];
    let dust: Dust[] = [];
    let shooters: Shooter[] = [];
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };

    const build = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const starCount = Math.min(240, Math.floor((w * h) / 6800));
      stars = Array.from({ length: starCount }, () => {
        const depth = Math.random();
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          depth,
          r: 0.4 + depth * 1.4,
          base: 0.25 + Math.random() * 0.6,
          tw: 0.6 + Math.random() * 2.2,
          warm: Math.random() > 0.85,
        };
      });

      const dustCount = Math.min(46, Math.floor((w * h) / 42000));
      dust = Array.from({ length: dustCount }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        r: Math.random() * 1.2 + 0.4,
      }));
    };
    build();

    const spawnShooter = () => {
      if (reduce || document.hidden) return;
      const fromLeft = Math.random() > 0.5;
      const speed = 8 + Math.random() * 6;
      shooters.push({
        x: fromLeft ? -40 : w + 40,
        y: Math.random() * h * 0.5,
        vx: (fromLeft ? 1 : -1) * speed,
        vy: speed * (0.35 + Math.random() * 0.3),
        life: 1,
        len: 90 + Math.random() * 80,
      });
    };
    // occasional shooting stars
    const shooterTimer = window.setInterval(
      spawnShooter,
      4200 + Math.random() * 3000
    );

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      // ease pointer influence
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;

      // stars (parallax by depth + twinkle)
      for (const s of stars) {
        const px = s.x + mouse.x * s.depth * 28;
        const py = s.y + mouse.y * s.depth * 28;
        const a = reduce
          ? s.base
          : s.base + Math.sin(t * 0.001 * s.tw + s.x) * 0.28;
        ctx.globalAlpha = Math.max(0.05, Math.min(1, a));
        ctx.fillStyle = s.warm ? accent : primary;
        ctx.beginPath();
        ctx.arc(px, py, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // cosmic dust (drift + repel from pointer)
      const mpx = w / 2 + mouse.tx * (w / 2);
      const mpy = h / 2 + mouse.ty * (h / 2);
      for (const d of dust) {
        if (!reduce) {
          d.x += d.vx;
          d.y += d.vy;
          if (d.x < 0) d.x = w;
          if (d.x > w) d.x = 0;
          if (d.y < 0) d.y = h;
          if (d.y > h) d.y = 0;
          const dx = d.x - mpx;
          const dy = d.y - mpy;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < 14000) {
            const f = (14000 - dist2) / 14000;
            d.x += (dx / Math.sqrt(dist2 || 1)) * f * 1.1;
            d.y += (dy / Math.sqrt(dist2 || 1)) * f * 1.1;
          }
        }
        ctx.globalAlpha = 0.35;
        ctx.fillStyle = primary;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // shooting stars
      shooters = shooters.filter((sh) => sh.life > 0 && sh.x > -120 && sh.x < w + 120);
      for (const sh of shooters) {
        sh.x += sh.vx;
        sh.y += sh.vy;
        sh.life -= 0.012;
        const grad = ctx.createLinearGradient(
          sh.x,
          sh.y,
          sh.x - sh.vx * (sh.len / 10),
          sh.y - sh.vy * (sh.len / 10)
        );
        grad.addColorStop(0, primary);
        grad.addColorStop(1, "transparent");
        ctx.globalAlpha = Math.max(0, sh.life) * 0.9;
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(sh.x, sh.y);
        ctx.lineTo(sh.x - sh.vx * (sh.len / 10), sh.y - sh.vy * (sh.len / 10));
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
    };

    const frame = (t: number) => {
      draw(t);
      raf = requestAnimationFrame(frame);
    };
    if (reduce) draw(0);
    else raf = requestAnimationFrame(frame);

    // ---- GSAP: nebula / aurora / planet continuous drift + cursor light ----
    const gctx = gsap.context(() => {
      if (reduce) return;
      gsap.to(".sb-neb1", {
        xPercent: 8,
        yPercent: 6,
        scale: 1.12,
        duration: 18,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
      gsap.to(".sb-neb2", {
        xPercent: -7,
        yPercent: -5,
        scale: 1.1,
        duration: 22,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
      gsap.to(".sb-neb3", {
        xPercent: 5,
        yPercent: -8,
        opacity: 0.55,
        duration: 26,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
      gsap.to(".sb-aurora", {
        xPercent: 12,
        opacity: 0.55,
        duration: 20,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, rootEl);

    let lx: gsap.QuickToFunc | null = null;
    let ly: gsap.QuickToFunc | null = null;
    if (!reduce && lightRef.current) {
      lx = gsap.quickTo(lightRef.current, "x", { duration: 0.9, ease: "power3" });
      ly = gsap.quickTo(lightRef.current, "y", { duration: 0.9, ease: "power3" });
    }

    const onMove = (e: MouseEvent) => {
      mouse.tx = e.clientX / window.innerWidth - 0.5;
      mouse.ty = e.clientY / window.innerHeight - 0.5;
      lx?.(e.clientX - window.innerWidth / 2);
      ly?.(e.clientY - window.innerHeight / 2);
    };
    let resizeT = 0;
    const onResize = () => {
      window.clearTimeout(resizeT);
      resizeT = window.setTimeout(build, 200);
    };
    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else if (!reduce) raf = requestAnimationFrame(frame);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(shooterTimer);
      window.clearTimeout(resizeT);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      gctx.revert();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* nebula clouds */}
      <div
        className="sb-neb1 absolute -right-[10%] -top-[15%] h-[70vmax] w-[70vmax] rounded-full opacity-50 blur-[90px]"
        style={{
          background:
            "radial-gradient(closest-side, var(--glow-primary), transparent 70%)",
        }}
      />
      <div
        className="sb-neb2 absolute -bottom-[20%] -left-[12%] h-[65vmax] w-[65vmax] rounded-full opacity-45 blur-[90px]"
        style={{
          background:
            "radial-gradient(closest-side, var(--glow-accent), transparent 70%)",
        }}
      />
      <div
        className="sb-neb3 absolute left-1/2 top-1/3 h-[55vmax] w-[55vmax] -translate-x-1/2 rounded-full opacity-35 blur-[100px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(90,120,200,0.30), transparent 70%)",
        }}
      />
      {/* aurora band */}
      <div
        className="sb-aurora absolute -top-[10%] left-[-10%] h-[40vh] w-[120%] opacity-40 blur-[70px]"
        style={{
          background:
            "linear-gradient(100deg, transparent, var(--glow-primary), transparent 60%)",
        }}
      />
      {/* cursor-following light */}
      <div
        ref={lightRef}
        className="absolute left-1/2 top-1/2 h-[42vmax] w-[42vmax] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[80px]"
        style={{
          background:
            "radial-gradient(closest-side, var(--glow-primary), transparent 70%)",
        }}
      />
      {/* star / dust / shooting-star field */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-80" />
    </div>
  );
}
