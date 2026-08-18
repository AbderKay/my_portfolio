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
    en: "Engineering student in Data & AI, I bridge applied research and production by designing intelligent systems combining predictive Machine Learning, data engineering, and LLM-based solutions.",
    fr: "Élève-ingénieur en Data & IA, je fais le pont entre recherche appliquée et production en concevant des systèmes intelligents combinant Machine Learning prédictif, ingénierie des données et solutions LLM.",
  } as Loc,
  location: {
    en: "Morocco · Open to relocation",
    fr: "Maroc · Ouvert à la mobilité"
  } as Loc,
  email: "abderrahmankayouh67@gmail.com",
  status: {
    en: "Open to final-year internships in ML / AI / Data Engineering & research",
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
      "My path has been shaped by a single ambition: to understand data, design intelligent systems, and turn them into concrete solutions.",
      "Across my projects and experiences, I have tackled a wide range of problems — from data engineering and Machine Learning to computer vision, LLMs, and automation. These experiences taught me to look beyond the model or the algorithm: to understand the need, build a robust solution, measure its performance, and think through its deployment.",
      "In parallel, my experience in a Junior Enterprise — notably leading a team of 7 — helped me grow my leadership, autonomy, and ability to collaborate on concrete projects.",
      "Today, I want to put this blend of technical and human skills at the service of ambitious projects, where I can keep learning, building, and creating value.",
    ],
    fr: [
      "Mon parcours s'est construit autour d'une même ambition : comprendre les données, concevoir des systèmes intelligents et les transformer en solutions concrètes.",
      "À travers mes projets et expériences, j'ai travaillé sur des problématiques variées allant de l'ingénierie des données et du Machine Learning à la vision par ordinateur, aux LLMs et à l'automatisation. Ces expériences m'ont appris à aller au-delà du modèle ou de l'algorithme : comprendre le besoin, construire une solution robuste, mesurer ses performances et réfléchir à son déploiement.",
      "En parallèle, mon expérience en Junior Entreprise, notamment à la tête d'une équipe de 7 personnes, m'a permis de développer mon leadership, mon autonomie et ma capacité à collaborer autour de projets concrets.",
      "Aujourd'hui, je cherche à mettre cette combinaison de compétences techniques et humaines au service de projets ambitieux, où je peux continuer à apprendre, construire et créer de la valeur.",
    ],
  } as Loc<string[]>,
  languages: [
    { name: { en: "Arabic", fr: "Arabe" } as Loc, level: { en: "Native", fr: "Langue maternelle" } as Loc },
    { name: { en: "French", fr: "Français" } as Loc, level: { en: "Fluent", fr: "Courant" } as Loc },
    { name: { en: "English", fr: "Anglais" } as Loc, level: { en: "Professional", fr: "Professionnel" } as Loc },
  ],
  // Rotating roles for the hero typewriter (all honest to current/target work).
  heroRoles: {
    en: ["Data & AI Engineering"],
    fr: ["Data & AI Engineering"],
  } as Loc<string[]>,
  // Compact hero highlights (real, traceable).
  heroStats: [
    { value: "2+", label: { en: "Internships", fr: "Stages" } as Loc },
    { value: "1", label: { en: "Research Proposal", fr: " Pistes de recherche" } as Loc },
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
