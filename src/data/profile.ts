import type { Loc } from "@/lib/i18n/config";

export const profile = {
  name: "Abderrahman Kayouh",
  firstName: "Abderrahman",
  lastName: "Kayouh",
  role: {
    en: "Engineering Student — AI / ML & Data",
    fr: "Élève-Ingénieur — IA / ML & Data",
  } as Loc,
  tagline: {
    en: "As a Data & AI engineering student, I bridge applied research and production by designing intelligent systems that combine predictive Machine Learning, data engineering, and LLM solutions. Backed by experience in leadership and project management, I pair technical rigor, product vision, and a hands-on mindset to turn real-world problems into reliable, deployable Data & AI solutions with measurable business impact.",
    fr: "Élève-ingénieur en Data & IA, je fais le pont entre recherche appliquée et production en concevant des systèmes intelligents combinant Machine Learning prédictif, ingénierie des données et solutions LLM. Fort d'expériences en leadership et gestion de projet, j'associe rigueur technique, vision produit et sens du concret pour transformer des problématiques réelles en solutions Data & IA fiables, déployables et à impact métier.",
  } as Loc,
  location: {
    en: "Agadir, Morocco (Open to Relocation)",
    fr: "Agadir, Maroc (Mobile)"
  } as Loc,
  email: "abderrahmankayouh67@gmail.com",
  status: {
    en: "Open to ML / AI / Data Engineering & research PFE internships",
    fr: "Ouvert aux stages PFE en ML / IA / Data Engineering & recherche",
  } as Loc,
  terminalUser: "abder",
  terminalHost: "ml-station",
  socials: {
    github: "https://github.com/AbderKay",
    linkedin: "https://www.linkedin.com/in/abderrahman-kayouh",
    email: "mailto:abderrahmankayouh67@gmail.com",
  },
  // Placeholder — a real CV lives at /public/cv.pdf to enable the download button.
  cvPath: "/CV_Abderrahman_Kayouh_PFE_2027.pdf",
  // Portrait lives at /public/portrait.jpg. If the file is missing, the hero
  // gracefully falls back to a styled placeholder (see HeroPortrait).
  photo: "/me.png",
  // Optional scheduling link (Cal.com / Calendly). Empty hides the "Book a call".
  calendar: "",
  about: {
    en: [
      "Engineering student at ENSA Agadir specializing in Big Data, Data Science & Artificial Intelligence, seeking a 6-month Final-Year Internship (PFE) starting February/March 2027.",
      "I build Data & AI solutions spanning Data Engineering, Machine Learning, LLMs, and Computer Vision, with a strong focus on deployment and business impact.",
      "Through hands-on projects, I have built strong technical execution skills, while leading a 7-person team as Junior Enterprise President strengthened my leadership, autonomy, and communication.",
      "My goal: transform real-world problems into concrete, reliable, and deployable Data & AI solutions.",
    ],
    fr: [
      "Élève-ingénieur à l'ENSA Agadir, spécialisé en Big Data, Data Science & Intelligence Artificielle, je recherche un stage de fin d'études (PFE) de 6 mois à partir de février/mars 2027.",
      "Je construis des solutions Data & IA allant de l'ingénierie des données et du Machine Learning aux LLMs et à la Vision par ordinateur, avec une approche orientée déploiement et impact métier.",
      "Mes projets m'ont permis de développer une forte capacité d'exécution technique, tandis que mon expérience à la tête d'une équipe de 7 personnes en Junior Entreprise a renforcé mon leadership, mon autonomie et ma communication.",
      "Mon objectif : transformer des problématiques réelles en solutions Data & IA concrètes, fiables et déployables.",
    ],
  } as Loc<string[]>,
  languages: [
    { name: { en: "Arabic", fr: "Arabe" } as Loc, level: { en: "Native", fr: "Langue maternelle" } as Loc },
    { name: { en: "French", fr: "Français" } as Loc, level: { en: "Fluent", fr: "Courant" } as Loc },
    { name: { en: "English", fr: "Anglais" } as Loc, level: { en: "Professional", fr: "Professionnel" } as Loc },
  ],
  // Rotating roles for the hero typewriter (all honest to current/target work).
  heroRoles: {
    en: ["AI Development", "Machine Learning Engineering", "Data Engineering", "MLOps"],
    fr: ["Développement IA", "Ingénierie Machine Learning", "Ingénierie des Données", "MLOps"],
  } as Loc<string[]>,
  // Compact hero highlights (real, traceable).
  heroStats: [
    { value: "2+", label: { en: "Internships", fr: "Stages" } as Loc },
    { value: "1", label: { en: "Research Draft", fr: "Projet de recherche" } as Loc },
    { value: "7", label: { en: "Team Led", fr: "Équipe dirigée" } as Loc },
  ],
  // Headline stats — every number here is real and traceable.
  stats: [
    { value: 10000, suffix: "+", label: { en: "Marine data points analysed — NASA predictive ML (Global Nominee)", fr: "Points de données marines analysés — ML prédictif NASA (nominé mondial)" } as Loc },
    { value: 14, suffix: "", label: { en: "Professional certifications earned", fr: "Certifications professionnelles obtenues" } as Loc },
    { value: 7, suffix: "+", label: { en: "Projects across ML, data & full-stack", fr: "Projets en ML, data & full-stack" } as Loc },
    { value: 7, suffix: "", label: { en: "Engineers led as JEEA President", fr: "Ingénieurs encadrés en tant que président de la JEEA" } as Loc },
  ],
};

export type Profile = typeof profile;
