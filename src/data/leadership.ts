import type { Loc } from "@/lib/i18n/config";

export type LeadershipRole = {
  file: string;
  /** Folder under public/leadership/<slug> — drop photos in and they appear. */
  slug: string;
  role: Loc;
  org: Loc;
  period: Loc;
  description: Loc;
};

const leadershipList: LeadershipRole[] = [
  {
    file: "president.log",
    slug: "president",
    role: { en: "President", fr: "Président" },
    org: {
      en: "Junior Enterprise JEEA · ENSA Agadir",
      fr: "Junior Entreprise JEEA · ENSA Agadir",
    },
    period: { en: "2024 – 2025", fr: "2024 – 2025" },
    description: {
      en: "Strategic direction of a 7-member team — 2 client projects delivered, 3+ company partnerships, official representation and negotiation.",
      fr: "Direction stratégique d'une équipe de 7 personnes — 2 projets clients livrés, plus de 3 partenariats d'entreprise, représentation officielle et négociation.",
    },
  },
  {
    file: "communication.log",
    slug: "communication",
    role: { en: "Event Organizer & Host", fr: "Organisateur et Animateur d'événements" },
    org: {
      en: "Smart Home Startup · Injaz Al Maghrib",
      fr: "Smart Home Startup · Injaz Al Maghrib",
    },
    period: { en: "2023 – 2024", fr: "2023 – 2024" },
    description: {
      en: "Communication strategy, visual identity, and digital marketing materials for a student startup.",
      fr: "Stratégie de communication, identité visuelle et supports de marketing digital pour une startup étudiante.",
    },
  },
  {
    file: "advisor.log",
    slug: "advisor",
    role: { en: "Event Moderator", fr: "Animateur d'événements" },
    org: {
      en: "Students' Association · ENSA Agadir",
      fr: "Association des étudiants · ENSA Agadir",
    },
    period: { en: "2025 – Present", fr: "2025 – présent" },
    description: {
      en: "Moderating conferences and inter-school events — hosting panels, coordinating speakers, and running the stage.",
      fr: "Animation de conférences et d'événements inter-écoles — animation de panels, coordination des intervenants et gestion de la scène.",
    },
  },
  {
    file: "aiesec.log",
    slug: "aiesec",
    role: { en: "Marketing & OGX", fr: "Marketing & OGX" },
    org: {
      en: "AIESEC Morocco & AIESEC Agadir",
      fr: "AIESEC Maroc & AIESEC Agadir",
    },
    period: { en: "2024 – 2025", fr: "2024 – 2025" },
    description: {
      en: "Marketing and coordination for international student-mobility programs.",
      fr: "Marketing et coordination de programmes internationaux de mobilité étudiante.",
    },
  },
  {
    file: "hackathons.log",
    slug: "hackathons",
    role: { en: "Hackathons & Competitions", fr: "Hackathons & Compétitions" },
    org: {
      en: "NASA Space Apps · engineering & AI challenges",
      fr: "NASA Space Apps · défis d'ingénierie & d'IA",
    },
    period: { en: "2023 – Present", fr: "2023 – présent" },
    description: {
      en: "NASA Space Apps Challenge Global Nominee; active participant in engineering and AI hackathons and competitions.",
      fr: "Nominé mondial au NASA Space Apps Challenge ; participant actif à des hackathons et compétitions d'ingénierie et d'IA.",
    },
  },
  {
    file: "clubs.log",
    slug: "clubs",
    role: { en: "Clubs & Mentorship", fr: "Clubs & Mentorat" },
    org: { en: "Apps Club · ENSA Agadir", fr: "Apps Club · ENSA Agadir" },
    period: { en: "2023 – Present", fr: "2023 – présent" },
    description: {
      en: "Technical workshops, peer mentorship and training, and hands-on development projects within the Apps Club.",
      fr: "Ateliers techniques, mentorat et formation entre pairs, et projets de développement concrets au sein de l'Apps Club.",
    },
  },
  {
    file: "events.log",
    slug: "events",
    role: {
      en: "Events & Company / University Visits",
      fr: "Événements & visites d'entreprises / universités",
    },
    org: {
      en: "ENSA Agadir · Oracle & partners",
      fr: "ENSA Agadir · Oracle & partenaires",
    },
    period: { en: "2024 – 2026", fr: "2024 – 2026" },
    description: {
      en: "Organized and covered institutional events and company visits — including the official ENSA Agadir visit to Oracle.",
      fr: "Organisation et couverture d'événements institutionnels et de visites d'entreprises — dont la visite officielle de l'ENSA Agadir chez Oracle.",
    },
  },
  {
    file: "sports_culture.log",
    slug: "sports-culture",
    role: { en: "Sports & Cultural Events", fr: "Événements sportifs & culturels" },
    org: { en: "ENSA Agadir", fr: "ENSA Agadir" },
    period: { en: "2022 – Present", fr: "2022 – présent" },
    description: {
      en: "Participation in and organization of campus sports tournaments and cultural events.",
      fr: "Participation et organisation de tournois sportifs et d'événements culturels sur le campus.",
    },
  },
  {
    file: "social.log",
    slug: "social",
    role: { en: "Social Activities", fr: "Activités sociales" },
    org: {
      en: "Student community · ENSA Agadir",
      fr: "Communauté étudiante · ENSA Agadir",
    },
    period: { en: "2023 – Present", fr: "2023 – présent" },
    description: {
      en: "Community initiatives, social outreach, and student-life activities across the school.",
      fr: "Initiatives communautaires, actions sociales et activités de vie étudiante à travers l'école.",
    },
  },
];

// Display order for the Leadership section (by `slug`).
const LEADERSHIP_ORDER = [
  "president",
  "hackathons",
  "events",
  "communication",
  "clubs",
  "advisor",
  "aiesec",
  "sports-culture",
  "social",
];

const rank = (slug: string) => {
  const i = LEADERSHIP_ORDER.indexOf(slug);
  return i === -1 ? LEADERSHIP_ORDER.length : i;
};

export const leadership: LeadershipRole[] = [...leadershipList].sort(
  (a, b) => rank(a.slug) - rank(b.slug)
);
