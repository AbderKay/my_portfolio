"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";
import { smoothScrollTo } from "@/lib/scroll";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { useI18n } from "@/lib/i18n";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { ui } = useI18n();

  const links = [
    { href: "#about", label: ui.nav.about },
    { href: "#skills", label: ui.nav.skills },
    { href: "#projects", label: ui.nav.projects },
    { href: "#experience", label: ui.nav.experience },
    { href: "#leadership", label: ui.nav.leadership },
    { href: "#contact", label: ui.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onNavClick = (href: string) => (e: MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    smoothScrollTo(href);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b border-line bg-bg/80 backdrop-blur-md"
          : "border-b border-transparent"
      )}
    >
      <nav className="container-x flex h-16 items-center justify-between">
        <a href="#" className="font-display text-lg font-semibold tracking-tight">
          {profile.firstName.charAt(0)}
          {profile.lastName.charAt(0)}
          <span className="text-primary">.</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={onNavClick(l.href)}
                className="mono-label text-muted transition-colors hover:text-text"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <LanguageToggle />
          <ThemeToggle />
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full border border-line-strong px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-text transition-colors hover:border-primary hover:text-primary md:inline-block"
          >
            GitHub ↗
          </a>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="font-mono text-sm text-text md:hidden"
          >
            {open ? ui.nav.close : ui.nav.menu}
          </button>
        </div>
      </nav>

      {open ? (
        <ul className="border-t border-line bg-bg/95 px-6 py-4 md:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={onNavClick(l.href)}
                className="block py-2 font-mono text-sm text-muted hover:text-primary"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </header>
  );
}
