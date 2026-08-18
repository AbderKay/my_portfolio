"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import { ArrowUpRight, FileText, Github, Linkedin, Mail, MapPin, CalendarClock } from "lucide-react";
import { profile } from "@/data/profile";
import { gsap } from "@/lib/gsap";
import { Typewriter } from "@/components/ui/Typewriter";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import { smoothScrollTo } from "@/lib/scroll";
import { useI18n } from "@/lib/i18n";
import { HeroPortrait } from "./HeroPortrait";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const { t, ui } = useI18n();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let ctx: gsap.Context | null = null;
    let done = false;
    let fallback = 0;
    let safety = 0;

    const reveal = () => {
      gsap.set(".hero-rise", { opacity: 1, y: 0 });
      gsap.set(".hero-photo", { opacity: 1, scale: 1 });
    };

    const play = () => {
      if (done) return;
      done = true;
      window.clearTimeout(fallback);
      ctx = gsap.context(() => {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .to(".hero-rise", { opacity: 1, y: 0, duration: 0.8, stagger: 0.09 })
          .to(
            ".hero-photo",
            { opacity: 1, scale: 1, duration: 0.9, ease: "power3.out" },
            "-=0.7"
          );
      }, root);
      safety = window.setTimeout(reveal, 1800);
    };

    if (reduce) {
      gsap.set(".hero-rise, .hero-photo", { opacity: 1, y: 0, scale: 1 });
      return;
    }

    gsap.set(".hero-rise", { opacity: 0, y: 26 });
    gsap.set(".hero-photo", { opacity: 0, scale: 0.9 });

    if (window.__preloaderDone) {
      play();
    } else {
      window.addEventListener("preloader:done", play, { once: true });
      fallback = window.setTimeout(play, 6000);
    }

    return () => {
      window.removeEventListener("preloader:done", play);
      window.clearTimeout(fallback);
      window.clearTimeout(safety);
      ctx?.revert();
    };
  }, []);

  const scrollToContact = (e: MouseEvent) => {
    e.preventDefault();
    smoothScrollTo("#contact");
  };

  return (
    <section
      ref={root}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-16"
    >
      <div className="container-x relative z-10 grid w-full items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        {/* LEFT — identity */}
        <div>
          {/* PFE / research-internship status + technical domains */}
          <div className="hero-rise mb-5 space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3.5 py-1.5 font-mono text-[0.72rem] font-medium leading-tight text-primary">
              <span className="relative flex h-2 w-2 shrink-0" aria-hidden>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              {ui.hero.seeking}
            </span>
            <p className="max-w-xl font-mono text-[0.72rem] leading-relaxed text-muted">
              {ui.hero.domains}
            </p>
          </div>

          <h1 className="hero-rise font-display text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[0.95] tracking-tight">
            {profile.firstName}
            <br />
            {profile.lastName}
            <span className="text-accent">.</span>
          </h1>

          <div className="hero-rise mt-4 font-display text-step-1 font-medium text-muted">
            <span className="text-faint">&gt;_</span>{" "}
            <Typewriter words={t(profile.heroRoles)} className="text-primary" />
          </div>

          <p className="hero-rise mt-6 max-w-xl text-step-0 text-muted">
            {t(profile.tagline)}
          </p>

          {/* availability / location */}
          <div className="hero-rise mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted">
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={13} className="text-primary" /> {t(profile.location)}
            </span>
            <span className="text-faint">·</span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarClock size={13} className="text-primary" /> {ui.hero.availability}
            </span>
          </div>

          <div className="hero-rise mt-8 flex flex-wrap gap-3">
            <MagneticButton href={profile.cvPath} target="_blank" variant="solid">
              <FileText size={16} /> {ui.hero.viewCv}
            </MagneticButton>
            <MagneticButton
              href="#contact"
              onClick={scrollToContact}
              variant="outline"
            >
              {ui.hero.contactMe} <ArrowUpRight size={16} />
            </MagneticButton>
          </div>

          {/* socials */}
          <div className="hero-rise mt-6 flex items-center gap-3">
            {[
              { href: profile.socials.github, icon: Github, label: "GitHub" },
              { href: profile.socials.linkedin, icon: Linkedin, label: "LinkedIn" },
              { href: profile.socials.email, icon: Mail, label: "Email" },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                className="rounded-full border border-line-strong p-2.5 text-muted transition-colors hover:border-primary hover:text-primary"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>

          {/* stats */}
          <div className="hero-rise mt-9 flex flex-wrap gap-8">
            {profile.heroStats.map((s, i) => (
              <div key={i}>
                <div className="font-display text-step-2 font-bold leading-none tracking-tight">
                  {s.value}
                </div>
                <div className="mono-label mt-1">{t(s.label)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — dynamic portrait */}
        <div className="hero-photo flex justify-center lg:justify-end">
          <HeroPortrait />
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block">
        <ScrollIndicator />
      </div>
    </section>
  );
}
