import type { Loc } from "@/lib/i18n/config";

export type TimelineEntry = {
  kind: "work" | "education";
  file: string;
  /** Folder under public/experiences/<slug> that holds this entry's images. */
  slug: string;
  role: Loc;
  org: Loc;
  period: Loc;
  points: Loc<string[]>;
  /** When true, this entry's image is shown but not clickable (no lightbox). */
  noLightbox?: boolean;
};

// Display order (top → bottom of the vertical timeline):
//  1. AI Developer — Intern
//  2. Engineering Degree
//  3. Specialized Training
//  4. President — JEEA
export const timeline: TimelineEntry[] = [
  {
    kind: "work",
    file: "experience.log",
    slug: "vala-bleu",
    // Image is displayed but intentionally NOT clickable (no lightbox).
    noLightbox: true,
    role: { en: "AI & MLOps Intern (PFA)", fr: "Stagiaire IA & MLOps (PFA)" },
    org: {
      en: "Vala Bleu — Web Host & IA · Agadir",
      fr: "Vala Bleu — Hébergeur web & IA · Agadir",
    },
    period: { en: "June  – Sep 2026", fr: "juin – Sept 2026" },
    points: {
      en: [
        "Building Vala Bleu Ops Copilot — an agentic RAG + MLOps assistant for IT Ops.",
        "Multilingual FR/EN document RAG (pgvector) + server-log anomaly detection (Isolation Forest).",
        "100% local LLM inference on NVIDIA GPU; RAGAS evaluation, FastAPI / Streamlit, Docker.",
      ],
      fr: [
        "Développement du Vala Bleu Ops Copilot — assistant agentique RAG + MLOps pour l'Ops IT.",
        "RAG documentaire multilingue FR/EN (pgvector) + détection d'anomalies logs (Isolation Forest).",
        "Inférence LLM 100 % locale sur GPU NVIDIA ; évaluation RAGAS, FastAPI / Streamlit, Docker.",
      ],
    },
  },
  {
    kind: "work",
    file: "experience.log",
    slug: "ensa-research",
    role: {
      en: "Research Intern (R&D) — Medical Prescription OCR",
      fr: "Stagiaire Recherche (R&D) — OCR d'ordonnances médicales",
    },
    org: {
      en: "École Nationale des Sciences Appliquées (ENSA) · Agadir",
      fr: "École Nationale des Sciences Appliquées (ENSA) · Agadir",
    },
    period: { en: "In progress", fr: "En cours" },
    points: {
      en: [
        "Research work to extract structured medical information from handwritten Moroccan prescriptions, multilingual (FR/AR), evolving toward continual learning.",
      ],
      fr: [
        "Un travail de recherche pour extraire des informations médicales structurées d'ordonnances marocaines manuscrites, multilingue (FR/AR), évoluant vers l'apprentissage continu.",
      ],
    },
  },
  {
    kind: "work",
    file: "experience.log",
    slug: "ai-intern",
    role: { en: "AI Developer — Intern", fr: "Développeur IA — Stagiaire" },
    org: {
      en: "AH Digital-Adopt IA · Technopark Agadir",
      fr: "AH Digital-Adopt IA · Technopark Agadir",
    },
    period: { en: "Jun – Aug 2025", fr: "Juin – Août 2025" },
    points: {
      en: [
        "Built & deployed a production chatbot with MLOps monitoring (~60% faster response).",
        "Improved RAG extraction accuracy from ~70% to 92%.",
        "Delivered AutoExpert automotive platform (n8n + Supabase).",
      ],
      fr: [
        "Conception & déploiement d'un chatbot en production avec monitoring MLOps (réponse ~60 % plus rapide).",
        "Amélioration de la précision d'extraction RAG d'environ 70 % à 92 %.",
        "Livraison de la plateforme automobile AutoExpert (n8n + Supabase).",
      ],
    },
  },
  {
    kind: "education",
    file: "education.log",
    slug: "engineering-degree",
    role: {
      en: "Engineering Degree — Big Data, Data Science & AI",
      fr: "Diplôme d'ingénieur — Big Data, Data Science & IA",
    },
    org: {
      en: "École Nationale des Sciences Appliquées (ENSA) · Agadir",
      fr: "École Nationale des Sciences Appliquées (ENSA) · Agadir",
    },
    period: { en: "2022 – Present", fr: "2022 – présent" },
    points: {
      en: [
        "Cycle Ingénieur (Bac+5), specialty: Big Data, Data Science & AI.",
        "Includes integrated preparatory classes.",
      ],
      fr: [
        "Cycle Ingénieur (Bac+5), spécialité : Big Data, Data Science & IA.",
        "Inclut les classes préparatoires intégrées.",
      ],
    },
  },
  {
    kind: "education",
    file: "education.log",
    slug: "specialized-training",
    role: {
      en: "Specialized Training — AI & Data Science",
      fr: "Formation spécialisée — IA & Data Science",
    },
    org: {
      en: "Moroccan Digital Academy · UM6P",
      fr: "Moroccan Digital Academy · UM6P",
    },
    period: { en: "2023", fr: "2023" },
    points: {
      en: ["Specialized program in Artificial Intelligence & Data Science."],
      fr: ["Programme spécialisé en Intelligence Artificielle & Data Science."],
    },
  },
  {
    kind: "work",
    file: "experience.log",
    slug: "jeea-president",
    role: {
      en: "President — Junior Enterprise JEEA",
      fr: "Président — Junior Entreprise JEEA",
    },
    org: { en: "ENSA Agadir", fr: "ENSA Agadir" },
    period: { en: "2024 – 2025", fr: "2024 – 2025" },
    points: {
      en: [
        "Led a 7-person team; delivered 2 client projects.",
        "Built 2+ company partnerships; official representation & negotiation.",
      ],
      fr: [
        "Direction d'une équipe de 7 personnes ; 2  projets clients livrés.",
        "Plus de 2 partenariats d'entreprise ; représentation officielle & négociation.",
      ],
    },
  },
  {
    kind: "education",
    file: "education.log",
    slug: "high-school",
    role: {
      en: "Baccalauréat — Physical Sciences (First in Track)",
      fr: "Baccalauréat — Sciences Physiques (major de promotion)",
    },
    org: { en: "Houara High School", fr: "Lycée Houara" },
    period: { en: "2022", fr: "2022" },
    points: {
      en: ["Graduated first in the Physical Sciences track."],
      fr: ["Major de la filière Sciences Physiques."],
    },
  },
];
