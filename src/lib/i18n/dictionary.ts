import type { Lang } from "./config";

/**
 * UI chrome strings — everything that lives in the components rather than the
 * data files (nav, section headings, buttons, form labels, status lines).
 * Content that belongs to the data files (project copy, bio, timeline points…)
 * is translated there via `Loc` fields, not here.
 */
export type UIDict = {
  nav: { about: string; skills: string; projects: string; experience: string; leadership: string; contact: string; menu: string; close: string };
  langToggle: { label: string; toEnglish: string; toFrench: string };
  hero: { welcome: string; viewCv: string; contactMe: string; seeking: string; domains: string; availability: string };
  sections: Record<
    "about" | "skills" | "projects" | "experience" | "certifications" | "leadership" | "contact",
    { slug: string; title: string; subtitle?: string }
  >;
  about: { whoami: Record<"name" | "role" | "location" | "email" | "status", string> };
  projects: { all: string; solves: string; stack: string; liveDemo: string; screenshots: string; seeMore: string; seeLess: string; collaborators: string; engineeringTitle: string; engineeringSubtitle: string; researchTitle: string; researchSubtitle: string; categories: Record<string, string> };
  researchInterests: { title: string; subtitle: string; items: string[] };
  embed: { live: string; open: string; liveDemo: string; preview: string; startDemo: string; openNewTab: string };
  timeline: { experience: string; education: string; report: string };
  certs: { certificate: string; viewCertificate: string };
  contact: { intro: string; reachLine: string; bookCall: string; fields: Record<"name" | "email" | "subject" | "message", string>; placeholders: Record<"name" | "email" | "subject" | "message", string>; send: string; sending: string; statusOk: string; errorPrefix: string };
  hireCta: { label: string; titleTop: string; titleBottom: string; body: string; hireMe: string };
  scroll: string;
  leadershipMedia: { viewAll: (n: number) => string; hide: string };
};

const en: UIDict = {
  nav: { about: "About", skills: "Skills", projects: "Projects", experience: "Experience", leadership: "Leadership", contact: "Contact", menu: "[ menu ]", close: "[ close ]" },
  langToggle: { label: "Language", toEnglish: "Switch to English", toFrench: "Passer en français" },
  hero: {
    welcome: "Hi, I'm — welcome to my portfolio",
    viewCv: "View CV",
    contactMe: "Contact Me",
    seeking: "Seeking a 6-month PFE / Research Internship — Feb/March 2027",
    domains: "Data Engineering · Machine Learning · Generative AI · MLOps · Applied Research",
    availability: "Available for a 6-month PFE from Feb/March 2027",
  },
  sections: {
    about: { slug: "about_me", title: "About me" },
    skills: { slug: "skills", title: "Technical skills", subtitle: "The stack behind the work — from model training to data pipelines to production." },
    projects: { slug: "projects", title: "Selected work", subtitle: "Case studies from production ML to independent research — filtered by domain." },
    experience: { slug: "experience & education", title: "The journey so far", subtitle: "Scroll through the path — each stop opens with its own photos." },
    certifications: { slug: "certifications & recognition", title: "Certifications & recognition", subtitle: "Recognitions, awards, and industry credentials." },
    leadership: { slug: "leadership", title: "Not only a coder — I build teams too.", subtitle: "Leadership, community, and international programs, given equal weight to the engineering." },
    contact: { slug: "get_in_touch", title: "Get in touch", subtitle: "Open to ML / AI / Data Engineering & research internships — and interesting conversations." },
  },
  about: { whoami: { name: "name", role: "role", location: "location", email: "email", status: "status" } },
  projects: {
    all: "All",
    solves: "Solves ·",
    stack: "// stack",
    liveDemo: "Live Demo",
    screenshots: "Screenshots",
    seeMore: "See more",
    seeLess: "See less",
    collaborators: "Collaborators",
    engineeringTitle: "Engineering Projects",
    engineeringSubtitle: "Production-oriented systems — end-to-end delivery, deployment and measurable impact.",
    researchTitle: "Research & Experimental Work",
    researchSubtitle: "Experimentation, methodology, evaluation and technical challenges — early-stage, exploratory research directions.",
    categories: { "Machine Learning": "Machine Learning", "NLP & LLM": "NLP & LLM", "AI & Automation": "AI & Automation", "R&D": "R&D", Research: "Research", "Data Engineering": "Data Engineering", "Full-Stack": "Full-Stack" },
  },
  researchInterests: {
    title: "Research Interests",
    subtitle: "Directions I want to explore further during a research-oriented PFE.",
    items: [
      "Retrieval-Augmented Generation & LLM Systems",
      "Multilingual NLP & Document AI",
      "Computer Vision & OCR",
      "Continual / Personalized Learning",
      "Data & ML Systems at Scale",
    ],
  },
  embed: { live: "Live", open: "Open", liveDemo: "Live Demo", preview: "Preview", startDemo: "Start live demo", openNewTab: "Open live demo in a new tab" },
  timeline: { experience: "Experience", education: "Education", report: "Report" },
  certs: { certificate: "Certificate", viewCertificate: "View certificate" },
  contact: {
    intro: "The fastest way to reach me is the terminal on the right, or any of the channels below. I reply to everything.",
    reachLine: "",
    bookCall: "Book a call",
    fields: { name: "$ name", email: "$ email", subject: "$ subject", message: "$ message" },
    placeholders: { name: "your name", email: "you@example.com", subject: "internship opportunity / collaboration…", message: "tell me about the role or idea…" },
    send: "Send Message",
    sending: "Sending…",
    statusOk: "$ status: message sent successfully!",
    errorPrefix: "$ error:",
  },
  hireCta: {
    label: "// let's work together",
    titleTop: "Let's build something",
    titleBottom: "worth remembering.",
    body: "I'm looking for ML / AI / Data Engineering and research internships where I can ship real systems and keep learning fast. If that sounds like your team, let's talk.",
    hireMe: "Hire Me",
  },
  scroll: "scroll",
  leadershipMedia: { viewAll: (n) => `View all ${n} photos`, hide: "Hide photos" },
};

const fr: UIDict = {
  nav: { about: "À propos", skills: "Compétences", projects: "Projets", experience: "Parcours", leadership: "Leadership", contact: "Contact", menu: "[ menu ]", close: "[ fermer ]" },
  langToggle: { label: "Langue", toEnglish: "Switch to English", toFrench: "Passer en français" },
  hero: {
    welcome: "Bonjour — bienvenue sur mon portfolio",
    viewCv: "Voir le CV",
    contactMe: "Me contacter",
    seeking: "Recherche un PFE / stage de recherche de 6 mois — Fév/Mars 2027",
    domains: "Data Engineering · Machine Learning · IA générative · MLOps · Recherche appliquée",
    availability: "Disponible pour un PFE de 6 mois à partir de fév/mars 2027",
  },
  sections: {
    about: { slug: "about_me", title: "À propos de moi" },
    skills: { slug: "skills", title: "Compétences techniques", subtitle: "La stack derrière le travail — de l'entraînement des modèles aux pipelines de données jusqu'à la production." },
    projects: { slug: "projects", title: "Travaux sélectionnés", subtitle: "Des études de cas, du ML en production à la recherche indépendante — filtrées par domaine." },
    experience: { slug: "experience & education", title: "Le parcours jusqu'ici", subtitle: "Faites défiler le parcours — chaque étape s'ouvre avec ses propres photos." },
    certifications: { slug: "certifications & recognition", title: "Certifications & distinctions", subtitle: "Distinctions, prix et certifications professionnelles." },
    leadership: { slug: "leadership", title: "Pas seulement un développeur — je bâtis aussi des équipes.", subtitle: "Leadership, engagement associatif et programmes internationaux, au même niveau que l'ingénierie." },
    contact: { slug: "get_in_touch", title: "Entrer en contact", subtitle: "Ouvert aux stages en ML / IA / Data Engineering & recherche — et aux conversations intéressantes." },
  },
  about: { whoami: { name: "name", role: "role", location: "location", email: "email", status: "status" } },
  projects: {
    all: "Tous",
    solves: "Résout ·",
    stack: "// stack",
    liveDemo: "Démo en ligne",
    screenshots: "Captures",
    seeMore: "Voir plus",
    seeLess: "Voir moins",
    collaborators: "Collaborateurs",
    engineeringTitle: "Projets d'ingénierie",
    engineeringSubtitle: "Des systèmes orientés production — livraison de bout en bout, déploiement et impact mesurable.",
    researchTitle: "Recherche & Travaux Expérimentaux",
    researchSubtitle: "Expérimentation, méthodologie, évaluation et défis techniques — pistes de recherche exploratoires, à un stade préliminaire.",
    categories: { "Machine Learning": "Machine Learning", "NLP & LLM": "NLP & LLM", "AI & Automation": "IA & Automatisation", "R&D": "R&D", Research: "Recherche", "Data Engineering": "Data Engineering", "Full-Stack": "Full-Stack" },
  },
  researchInterests: {
    title: "Intérêts de recherche",
    subtitle: "Des pistes que je souhaite approfondir durant un PFE à orientation recherche.",
    items: [
      "Génération augmentée par récupération (RAG) & systèmes LLM",
      "NLP multilingue & IA documentaire",
      "Vision par ordinateur & OCR",
      "Apprentissage continu / personnalisé",
      "Systèmes Data & ML à grande échelle",
    ],
  },
  embed: { live: "En ligne", open: "Ouvrir", liveDemo: "Démo en ligne", preview: "Aperçu", startDemo: "Lancer la démo", openNewTab: "Ouvrir la démo dans un nouvel onglet" },
  timeline: { experience: "Expérience", education: "Formation", report: "Rapport" },
  certs: { certificate: "Certificat", viewCertificate: "Voir le certificat" },
  contact: {
    intro: "Le plus rapide pour me joindre est le terminal à droite, ou l'un des canaux ci-dessous. Je réponds à tout.",
    reachLine: "",
    bookCall: "Réserver un appel",
    fields: { name: "$ nom", email: "$ email", subject: "$ objet", message: "$ message" },
    placeholders: { name: "votre nom", email: "vous@exemple.com", subject: "opportunité de stage / collaboration…", message: "parlez-moi du poste ou de l'idée…" },
    send: "Envoyer le message",
    sending: "Envoi…",
    statusOk: "$ status : message envoyé avec succès !",
    errorPrefix: "$ erreur :",
  },
  hireCta: {
    label: "// travaillons ensemble",
    titleTop: "Construisons quelque chose",
    titleBottom: "dont on se souviendra.",
    body: "Je recherche des stages en ML / IA / Data Engineering et en recherche, où je peux livrer de vrais systèmes et continuer à apprendre vite. Si cela ressemble à votre équipe, parlons-en.",
    hireMe: "Recrutez-moi",
  },
  scroll: "défiler",
  leadershipMedia: { viewAll: (n) => `Voir les ${n} photos`, hide: "Masquer les photos" },
};

export const dictionaries: Record<Lang, UIDict> = { en, fr };
