"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

type Node3 = { x: number; y: number; z: number; r: number };
type Pulse = { e: number; t: number; speed: number };

type Palette = {
  node: (a: number) => string;
  edge: (a: number) => string;
  pulse: (a: number) => string;
  nodeA: number;
  edgeA: number;
  canvasOpacity: number;
};

/**
 * Ambient environment: soft CSS nebulae / aurora drifting via GSAP, plus a
 * canvas rendering a rotating 3D graph — nodes connected to their nearest
 * neighbours with data "pulses" travelling along the links (a neural-network /
 * distributed-system motif). Perspective projection, gentle auto-rotation,
 * cursor parallax and subtle scroll drift. Theme-aware (re-colours live on
 * light/dark switch), reduced on mobile / low-power, static under reduced
 * motion, and paused when the tab is hidden. Fixed, behind content,
 * pointer-events:none.
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
    if (!ctx) return; // graceful fallback: nebulae only

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const lowPower = (navigator.hardwareConcurrency || 8) <= 4;
    const light = () =>
      document.documentElement.getAttribute("data-theme") === "light";

    const readPalette = (): Palette =>
      light()
        ? {
            // deep teal / slate on the light "paper" — structure + depth,
            // kept subtle so dark text stays perfectly readable.
            node: (a) => `rgba(24,96,116,${a})`,
            edge: (a) => `rgba(42,96,122,${a})`,
            pulse: (a) => `rgba(199,122,34,${a})`,
            nodeA: 0.5,
            edgeA: 0.22,
            canvasOpacity: 0.9,
          }
        : {
            node: (a) => `rgba(126,205,224,${a})`,
            edge: (a) => `rgba(110,170,205,${a})`,
            pulse: (a) => `rgba(232,162,76,${a})`,
            nodeA: 0.6,
            edgeA: 0.16,
            canvasOpacity: 0.95,
          };

    let palette = readPalette();

    let w = 0;
    let h = 0;
    let cx = 0;
    let cy = 0;
    let spread = 0;
    let raf = 0;
    let nodes: Node3[] = [];
    let edges: [number, number][] = [];
    let pulses: Pulse[] = [];
    let ay = 0.5; // start on a pleasant 3/4 view
    let scrollY = 0;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };

    // projection buffers (filled each frame)
    let px = new Float32Array(0);
    let py = new Float32Array(0);
    let pa = new Float32Array(0); // depth alpha 0(far)..1(near)
    let ps = new Float32Array(0); // perspective scale

    const counts = () => {
      const small = isMobile || lowPower;
      return { N: small ? 30 : 74, K: small ? 2 : 3, P: small ? 2 : 6 };
    };

    const build = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      cx = w / 2;
      cy = h / 2;
      spread = Math.max(w, h) * 0.4;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const { N, K, P } = counts();
      nodes = Array.from({ length: N }, () => {
        let x = 0;
        let y = 0;
        let z = 0;
        let d = 2;
        while (d > 1) {
          x = Math.random() * 2 - 1;
          y = Math.random() * 2 - 1;
          z = Math.random() * 2 - 1;
          d = x * x + y * y + z * z;
        }
        return { x, y: y * 0.82, z, r: 1.1 + Math.random() * 1.7 };
      });

      // connect each node to its K nearest neighbours (deduped)
      edges = [];
      const seen = new Set<string>();
      for (let i = 0; i < N; i++) {
        const ds: { j: number; d: number }[] = [];
        for (let j = 0; j < N; j++) {
          if (i === j) continue;
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dz = nodes[i].z - nodes[j].z;
          ds.push({ j, d: dx * dx + dy * dy + dz * dz });
        }
        ds.sort((a, b) => a.d - b.d);
        for (let k = 0; k < K && k < ds.length; k++) {
          const j = ds[k].j;
          const key = i < j ? `${i}-${j}` : `${j}-${i}`;
          if (!seen.has(key)) {
            seen.add(key);
            edges.push([i, j]);
          }
        }
      }

      pulses = edges.length
        ? Array.from({ length: P }, () => ({
            e: Math.floor(Math.random() * edges.length),
            t: Math.random(),
            speed: 0.006 + Math.random() * 0.01,
          }))
        : [];

      px = new Float32Array(N);
      py = new Float32Array(N);
      pa = new Float32Array(N);
      ps = new Float32Array(N);
    };
    build();

    const FOV = 3.2;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;

      if (!reduce) ay += 0.0011;
      const rotY = ay + mouse.x * 0.5 + scrollY * 0.00014;
      const rotX = 0.2 + mouse.y * 0.32;
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      // rotate + project
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const x1 = n.x * cosY - n.z * sinY;
        let z1 = n.x * sinY + n.z * cosY;
        const y1 = n.y * cosX - z1 * sinX;
        z1 = n.y * sinX + z1 * cosX;
        const sc = FOV / (FOV - z1);
        px[i] = cx + x1 * spread * sc;
        py[i] = cy + y1 * spread * sc;
        ps[i] = sc;
        pa[i] = Math.max(0, Math.min(1, (z1 + 1) / 2));
      }

      // edges
      ctx.lineWidth = 1;
      for (let k = 0; k < edges.length; k++) {
        const i = edges[k][0];
        const j = edges[k][1];
        const a = Math.min(pa[i], pa[j]);
        ctx.strokeStyle = palette.edge(palette.edgeA * (0.3 + a * 0.7));
        ctx.beginPath();
        ctx.moveTo(px[i], py[i]);
        ctx.lineTo(px[j], py[j]);
        ctx.stroke();
      }

      // nodes (+ soft halo on the near ones)
      for (let i = 0; i < nodes.length; i++) {
        const a = pa[i];
        const rad = nodes[i].r * ps[i] * (0.55 + a * 0.6);
        if (a > 0.62) {
          ctx.fillStyle = palette.node(0.05 * a);
          ctx.beginPath();
          ctx.arc(px[i], py[i], rad * 3.2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = palette.node(palette.nodeA * (0.28 + a * 0.72));
        ctx.beginPath();
        ctx.arc(px[i], py[i], rad, 0, Math.PI * 2);
        ctx.fill();
      }

      // data pulses travelling along links
      if (!reduce && edges.length) {
        for (const p of pulses) {
          p.t += p.speed;
          if (p.t >= 1) {
            p.t = 0;
            p.e = Math.floor(Math.random() * edges.length);
            p.speed = 0.006 + Math.random() * 0.01;
          }
          const i = edges[p.e][0];
          const j = edges[p.e][1];
          const x = px[i] + (px[j] - px[i]) * p.t;
          const y = py[i] + (py[j] - py[i]) * p.t;
          const a = (pa[i] + pa[j]) / 2;
          ctx.fillStyle = palette.pulse(0.16 * a);
          ctx.beginPath();
          ctx.arc(x, y, 5 * (0.6 + a), 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = palette.pulse(0.85 * a);
          ctx.beginPath();
          ctx.arc(x, y, 1.7 * (0.6 + a), 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const frame = () => {
      draw();
      raf = requestAnimationFrame(frame);
    };
    canvas.style.opacity = String(palette.canvasOpacity);
    draw(); // paint an initial frame immediately
    if (!reduce) raf = requestAnimationFrame(frame);

    // ---- GSAP: nebula / aurora continuous drift + cursor light ----
    const gctx = gsap.context(() => {
      if (reduce) return;
      gsap.to(".sb-neb1", { xPercent: 8, yPercent: 6, scale: 1.12, duration: 18, ease: "sine.inOut", repeat: -1, yoyo: true });
      gsap.to(".sb-neb2", { xPercent: -7, yPercent: -5, scale: 1.1, duration: 22, ease: "sine.inOut", repeat: -1, yoyo: true });
      gsap.to(".sb-neb3", { xPercent: 5, yPercent: -8, opacity: 0.55, duration: 26, ease: "sine.inOut", repeat: -1, yoyo: true });
      gsap.to(".sb-aurora", { xPercent: 12, opacity: 0.55, duration: 20, ease: "sine.inOut", repeat: -1, yoyo: true });
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
    const onScroll = () => {
      scrollY = window.scrollY || window.pageYOffset || 0;
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
    // live re-colour when the theme toggles
    const themeObs = new MutationObserver(() => {
      palette = readPalette();
      canvas.style.opacity = String(palette.canvasOpacity);
      draw(); // repaint immediately with the new palette
    });
    themeObs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(resizeT);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      themeObs.disconnect();
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
        style={{ background: "radial-gradient(closest-side, var(--glow-primary), transparent 70%)" }}
      />
      <div
        className="sb-neb2 absolute -bottom-[20%] -left-[12%] h-[65vmax] w-[65vmax] rounded-full opacity-45 blur-[90px]"
        style={{ background: "radial-gradient(closest-side, var(--glow-accent), transparent 70%)" }}
      />
      <div
        className="sb-neb3 absolute left-1/2 top-1/3 h-[55vmax] w-[55vmax] -translate-x-1/2 rounded-full opacity-35 blur-[100px]"
        style={{ background: "radial-gradient(closest-side, rgba(90,120,200,0.30), transparent 70%)" }}
      />
      {/* aurora band */}
      <div
        className="sb-aurora absolute -top-[10%] left-[-10%] h-[40vh] w-[120%] opacity-40 blur-[70px]"
        style={{ background: "linear-gradient(100deg, transparent, var(--glow-primary), transparent 60%)" }}
      />
      {/* cursor-following light */}
      <div
        ref={lightRef}
        className="absolute left-1/2 top-1/2 h-[42vmax] w-[42vmax] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[80px]"
        style={{ background: "radial-gradient(closest-side, var(--glow-primary), transparent 70%)" }}
      />
      {/* 3D neural-network / data-graph field */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
