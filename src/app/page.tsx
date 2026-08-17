import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Timeline } from "@/components/sections/Timeline";
import { Certifications } from "@/components/sections/Certifications";
import { Leadership } from "@/components/sections/Leadership";
import { Contact } from "@/components/sections/Contact";
import { HireCta } from "@/components/sections/HireCta";
import { profile } from "@/data/profile";
import { timeline } from "@/data/timeline";
import { certifications } from "@/data/certifications";
import { projects } from "@/data/projects";
import { leadership } from "@/data/leadership";
import { experienceCaptions, certificationCaptions } from "@/data/experiences";
import { readGallery, readReport, readFirstPdf, readLogo } from "@/lib/media";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role.en,
  email: profile.email,
  address: { "@type": "PostalAddress", addressLocality: profile.location.en },
  url: "https://abderrahman-kayouh.vercel.app",
  sameAs: [profile.socials.github, profile.socials.linkedin],
};

export default function Home() {
  // Read images from public/ folders at build time (server-only).
  const timelineWithMedia = timeline.map((entry) => ({
    ...entry,
    images: readGallery(`experiences/${entry.slug}`, experienceCaptions[entry.slug]),
    report: readReport(`experiences/${entry.slug}`),
  }));

  const certsWithMedia = certifications.map((cert) => ({
    ...cert,
    images: readGallery(`certifications/${cert.slug}`, certificationCaptions[cert.slug]),
    pdf: readFirstPdf(`certifications/${cert.slug}`),
    logoSrc: readLogo(cert.logo ?? cert.slug),
  }));

  // Projects: for those with a folder, auto-load its images as the card media.
  const projectsWithMedia = projects.map((p) => {
    if (!p.slug) return p;
    const folder = readGallery(`projects/${p.slug}`);
    return folder.length ? { ...p, media: folder.map((g) => g.src) } : p;
  });

  const leadershipWithMedia = leadership.map((role) => ({
    ...role,
    images: readGallery(`leadership/${role.slug}`),
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects projects={projectsWithMedia} />
        <Timeline entries={timelineWithMedia} />
        <Certifications certs={certsWithMedia} />
        <Leadership roles={leadershipWithMedia} />
        <Contact />
        <HireCta />
      </main>
      <Footer />
    </>
  );
}
