"use client";

import { Github, Linkedin, Mail, CalendarClock } from "lucide-react";
import { profile } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { useI18n } from "@/lib/i18n";
import { ContactForm } from "./ContactForm";

export function Contact() {
  const { ui } = useI18n();
  return (
    <section id="contact" className="container-x scroll-mt-24 py-24">
      <SectionHeading
        index="08"
        slug={ui.sections.contact.slug}
        title={ui.sections.contact.title}
        subtitle={ui.sections.contact.subtitle}
      />

      <div className="grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal className="space-y-6">
          <p className="text-step-0 leading-relaxed text-muted">
            {ui.contact.intro}
          </p>

          <div className="flex flex-col gap-3">
            <a
              href={profile.socials.email}
              className="inline-flex items-center gap-3 font-mono text-sm text-text transition-colors hover:text-primary"
            >
              <Mail size={16} className="text-primary" /> {profile.email}
            </a>
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 font-mono text-sm text-text transition-colors hover:text-primary"
            >
              <Github size={16} className="text-primary" /> github.com/AbderKay
            </a>
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 font-mono text-sm text-text transition-colors hover:text-primary"
            >
              <Linkedin size={16} className="text-primary" /> in/abderrahman-kayouh
            </a>
            {profile.calendar ? (
              <a
                href={profile.calendar}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 font-mono text-sm text-text transition-colors hover:text-primary"
              >
                <CalendarClock size={16} className="text-primary" /> {ui.contact.bookCall}
              </a>
            ) : null}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
