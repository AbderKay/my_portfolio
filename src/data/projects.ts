import type { Loc } from "@/lib/i18n/config";

export type ProjectLink = { label: Loc; href: string };

export type Project = {
  file: string;
  /** Optional folder under public/projects/<slug> for auto-loaded images. */
  slug?: string;
  title: Loc;
  /** Stable English key — drives filtering and category color. Not displayed raw. */
  category: string;
  year: Loc;
  context: Loc;
  summary: Loc;
  /** One line: the concrete problem this project solves. */
  problem?: Loc;
  details: Loc<string[]>;
  tags: Loc<string[]>;
  featured?: boolean;
  badge?: Loc;
  links?: ProjectLink[];
  /** Ordered media (images) shown as an auto-playing carousel in the card. */
  media?: string[];
  /** Live-site URL shown as an embedded preview in the card's media zone. */
  embed?: string;
  /** Cover screenshot shown over the embed until the viewer starts the demo. */
  embedPoster?: string;
  /** Set false if the live site blocks iframing (X-Frame-Options); the demo
   *  then opens in a new tab instead of embedding. Defaults to true. */
  embedFrameable?: boolean;
  /** Teammates shown under a "See more" toggle on the card (names, universal). */
  collaborators?: string[];
  /** Section group. Set automatically on export from RESEARCH_FILES. */
  group?: "engineering" | "research";
};

const GITHUB: Loc = { en: "GitHub", fr: "GitHub" };
const REPORT: Loc = { en: "Report", fr: "Rapport" };
const FILES: Loc = { en: "Files", fr: "Fichiers" };

const NASA_MEDIA = [
  "/nasa_space_apps_challenge/01.png",
  "/nasa_space_apps_challenge/02.jpeg",
  "/nasa_space_apps_challenge/03.jpeg",
  "/nasa_space_apps_challenge/04.jpeg",
  "/nasa_space_apps_challenge/05.jpeg",
  "/nasa_space_apps_challenge/06.jpeg",
  "/nasa_space_apps_challenge/07.jpeg",
  "/nasa_space_apps_challenge/08.jpeg",
  "/nasa_space_apps_challenge/10.jpeg",
];

// Categories used by the filter bar (stable English keys; labels localized in UI).
export const projectCategories = [
  "All",
  "Machine Learning",
  "NLP & LLM",
  "AI & Automation",
  "R&D",
  "Data Engineering",
  "Full-Stack",
] as const;

const projectList: Project[] = [
  {
    file: "shark_tag.ipynb",
    title: {
      en: "NASA Space Apps — Smart Shark Behaviour Tag",
      fr: "NASA Space Apps — Balise intelligente de comportement des requins",
    },
    category: "Machine Learning",
    year: { en: "2025", fr: "2025" },
    context: {
      en: "NASA Space Apps Challenge — Global Nominee",
      fr: "NASA Space Apps Challenge — Nominé mondial",
    },
    summary: {
      en: "A NASA Space Apps Challenge project — Global Nominee — applying predictive machine learning to real-world marine data to track apex-predator behaviour in real time.",
      fr: "Un projet du NASA Space Apps Challenge — nominé mondial — appliquant le machine learning prédictif à des données marines réelles pour suivre en temps réel le comportement d'un super-prédateur.",
    },
    problem: {
      en: "Turning noisy, real-world marine environmental data into real-time behavioural insight on apex predators.",
      fr: "Transformer des données environnementales marines réelles et bruitées en informations comportementales en temps réel sur les super-prédateurs.",
    },
    details: {
      en: [
        "Global Nominee — earned international recognition at the NASA Space Apps Challenge.",
        "Predictive ML & analytics on 10,000+ real-world marine data points; surfaced migratory patterns.",
        "Designed a smart-tag concept and shipped an end-to-end prototype under hackathon pressure.",
        "Delivered through tight team collaboration and rapid, real-world problem-solving.",
      ],
      fr: [
        "Nominé mondial — reconnaissance internationale au NASA Space Apps Challenge.",
        "ML prédictif & analytics sur plus de 10 000 points de données marines réelles ; mise en évidence de schémas migratoires.",
        "Conception d'une balise intelligente et livraison d'un prototype complet sous la pression d'un hackathon.",
        "Réalisé grâce à une collaboration d'équipe soudée et une résolution de problèmes rapide et concrète.",
      ],
    },
    tags: {
      en: ["AI & ML", "Predictive Analytics", "Marine Data", "Teamwork"],
      fr: ["IA & ML", "Analytique prédictive", "Données marines", "Travail d'équipe"],
    },
    featured: true,
    badge: { en: "Global Nominee", fr: "Nominé mondial" },
    media: NASA_MEDIA,
    embed: "https://ocean-eye-space-view-87165.vercel.app/",
    embedPoster: NASA_MEDIA[0],
    links: [{ label: GITHUB, href: "https://github.com/AbderKay" }],
  },
  {
    file: "autoexpert.js",
    title: {
      en: "AutoExpert — Automotive Agency Platform",
      fr: "AutoExpert — Plateforme pour agence automobile",
    },
    category: "Full-Stack",
    year: { en: "2025", fr: "2025" },
    context: { en: "Internship — AH Digital", fr: "Stage — AH Digital" },
    summary: {
      en: "A web platform for an automotive agency with an automated backend (n8n) and real-time reporting (Supabase) over 50+ vehicles.",
      fr: "Une plateforme web pour une agence automobile, avec un backend automatisé (n8n) et un reporting en temps réel (Supabase) sur plus de 50 véhicules.",
    },
    problem: {
      en: "Manual vehicle-catalogue management and slow, disconnected reporting for an auto agency.",
      fr: "Gestion manuelle du catalogue de véhicules et reporting lent et cloisonné pour une agence automobile.",
    },
    details: {
      en: [
        "Automated backend workflows using n8n.",
        "Managed a catalogue of 50+ vehicles with real-time Supabase reporting.",
      ],
      fr: [
        "Automatisation des workflows backend avec n8n.",
        "Gestion d'un catalogue de plus de 50 véhicules avec reporting Supabase en temps réel.",
      ],
    },
    tags: {
      en: ["n8n", "Supabase", "Automation", "Full-Stack"],
      fr: ["n8n", "Supabase", "Automatisation", "Full-Stack"],
    },
    embed: "https://auto-expert-nu.vercel.app/",
    embedPoster: "/Auto_Expert/cover.png",
    links: [
      { label: GITHUB, href: "https://github.com/AbderKay/Auto-Expert-" },
      { label: REPORT, href: "/Auto_Expert/report.pdf" },
    ],
  },
  {
    file: "hotel_system.sql",
    slug: "hotel-management",
    title: {
      en: "Hotel Management System — Full-Stack",
      fr: "Système de gestion hôtelière — Full-Stack",
    },
    category: "Full-Stack",
    year: { en: "2025", fr: "2025" },
    context: { en: "University project", fr: "Projet universitaire" },
    summary: {
      en: "A full-stack hotel management system (Java / Spring Boot / React / Oracle PL/SQL) handling 200+ reservations across 5 business modules.",
      fr: "Un système full-stack de gestion hôtelière (Java / Spring Boot / React / Oracle PL/SQL) gérant plus de 200 réservations à travers 5 modules métier.",
    },
    problem: {
      en: "Fragmented, manual handling of 200+ hotel reservations across disconnected processes.",
      fr: "Gestion manuelle et fragmentée de plus de 200 réservations hôtelières via des processus cloisonnés.",
    },
    details: {
      en: [
        "5 business modules with Oracle PL/SQL procedures.",
        "Java backend exposing REST APIs; React frontend.",
        "Managed 200+ reservations with reporting via REST.",
      ],
      fr: [
        "5 modules métier avec des procédures Oracle PL/SQL.",
        "Backend Java exposant des API REST ; frontend React.",
        "Gestion de plus de 200 réservations avec reporting via REST.",
      ],
    },
    tags: {
      en: ["Java", "Spring Boot", "React", "Oracle PL/SQL"],
      fr: ["Java", "Spring Boot", "React", "Oracle PL/SQL"],
    },
    collaborators: ["Mohamed Afkir", "Project Team"],
    links: [{ label: GITHUB, href: "https://github.com/AbderKay" }],
  },
  {
    file: "ah_chat_digital.py",
    slug: "ah-chat-digital",
    title: {
      en: "AH-Chat-Digital — Support Automation & NLP Integration",
      fr: "AH-Chat-Digital — Automatisation du Support & Intégration NLP",
    },
    category: "AI & Automation",
    year: { en: "2025", fr: "2025" },
    context: {
      en: "Internship — AH Digital, Technopark Agadir",
      fr: "Stage — AH Digital, Technopark Agadir",
    },
    summary: {
      en: "A customer support automation dashboard integrating n8n workflows and NLP for automated inquiry routing, reducing response times by ~60%.",
      fr: "Un tableau de bord d'automatisation du support client intégrant des workflows n8n et du NLP pour le routage automatique, réduisant le temps de réponse d'environ 60 %.",
    },
    problem: {
      en: "Repetitive support inquiries causing long response times and manual dispatching overhead.",
      fr: "Des demandes de support répétitives entraînant des délais de réponse longs et un traitement manuel important.",
    },
    details: {
      en: [
        "Configured end-to-end automation pipelines using n8n to connect chat channels with internal workflows.",
        "Integrated lightweight NLP and prompt parsing to classify incoming messages and draft automated replies.",
        "Built an interactive tracking dashboard to monitor conversation status and reduce response bottlenecks by ~60%.",
      ],
      fr: [
        "Conception de pipelines d'automatisation avec n8n reliant les canaux de messagerie aux processus internes.",
        "Intégration de briques NLP légères pour la classification des messages entrants et le pré-remplissage des réponses.",
        "Création d'un tableau de bord de suivi pour superviser les échanges et réduire le temps de réponse moyen d'environ 60 %.",
      ],
    },
    tags: {
      en: ["n8n", "Workflow Automation", "NLP Basics", "Dashboard", "APIs"],
      fr: ["n8n", "Automatisation", "Bases NLP", "Dashboard", "APIs"],

    },
    featured: true,
    badge: { en: "Production", fr: "Production" },
    links: [{ label: GITHUB, href: "https://github.com/AbderKay/ah-digitalstage-ai-chat" }],
  },
  {
    file: "tomatosort.py",
    slug: "tomatosort",
    title: {
      en: "TomatoSort Pro — Real-Time Tomato Sorting (CV)",
      fr: "TomatoSort Pro — Tri de tomates en temps réel (Vision)",
    },
    category: "Machine Learning",
    year: { en: "2025", fr: "2025" },
    context: {
      en: "Personal · Computer Vision",
      fr: "Personnel · Vision par ordinateur",
    },
    summary: {
      en: "A real-time computer-vision system that sorts cherry tomatoes on a line — flagging healthy tomatoes vs. foreign objects from a live camera feed, CPU-optimized for edge deployment.",
      fr: "Un système de vision par ordinateur en temps réel qui trie les tomates cerises sur une ligne — distinguant les tomates saines des objets étrangers à partir d'un flux caméra en direct, optimisé CPU pour un déploiement edge.",
    },
    problem: {
      en: "Manual, slow and error-prone visual quality inspection on a tomato sorting line.",
      fr: "Inspection visuelle qualité manuelle, lente et sujette aux erreurs sur une ligne de tri de tomates.",
    },
    details: {
      en: [
        "YOLOv8-Nano detection (tomato / foreign_object) — mAP@50 0.846, precision 0.92, recall 0.86.",
        "Intel OpenVINO CPU-optimized inference for real-time edge deployment.",
        "Streamlit dashboard + lightweight OpenCV window, with MLOps & PLC-control scaffolding.",
      ],
      fr: [
        "Détection YOLOv8-Nano (tomate / objet_étranger) — mAP@50 0,846, précision 0,92, rappel 0,86.",
        "Inférence optimisée CPU avec Intel OpenVINO pour un déploiement edge en temps réel.",
        "Tableau de bord Streamlit + fenêtre OpenCV légère, avec une base MLOps & de contrôle PLC.",
      ],
    },
    tags: {
      en: ["YOLOv8", "OpenVINO", "OpenCV", "Streamlit", "Python"],
      fr: ["YOLOv8", "OpenVINO", "OpenCV", "Streamlit", "Python"],
    },
    collaborators: ["Malak Rhalem", "Hajar Hamouch", "Amina Toumi", "Taha Hajji"],
    featured: true,
    badge: { en: "Computer Vision", fr: "Vision par ordinateur" },
    links: [{ label: GITHUB, href: "https://github.com/AbderKay/tomatosort-pro" }],
  },
  {
    file: "prescription_ocr.py",
    slug: "prescription-ocr",
    title: {
      en: "Research Draft",
      fr: "Research Draft",
    },
    category: "R&D",
    year: { en: "In progress", fr: "En cours" },
    context: {
      en: "Independent research project",
      fr: "Projet de recherche indépendant",
    },
    summary: {
      en: "A research effort to extract structured medical information from handwritten Moroccan prescriptions, multilingual (FR/AR), evolving toward continual learning.",
      fr: "Un travail de recherche pour extraire des informations médicales structurées d'ordonnances marocaines manuscrites, multilingue (FR/AR), évoluant vers l'apprentissage continu.",
    },
    problem: {
      en: "Handwritten Moroccan prescriptions (FR/AR) are unstructured and hard to digitize reliably.",
      fr: "Les ordonnances marocaines manuscrites (FR/AR) sont non structurées et difficiles à numériser de façon fiable.",
    },
    details: {
      en: [
        "Handwritten text recognition on real Moroccan prescriptions.",
        "Structured information extraction into JSON, multilingual (French & Arabic).",
        "Research-oriented architecture aimed at future personalization & continual learning.",
      ],
      fr: [
        "Reconnaissance de texte manuscrit sur de vraies ordonnances marocaines.",
        "Extraction d'informations structurées en JSON, multilingue (français & arabe).",
        "Architecture orientée recherche visant la personnalisation future & l'apprentissage continu.",
      ],
    },
    tags: {
      en: ["Computer Vision", "OCR", "NLP", "Research"],
      fr: ["Vision par ordinateur", "OCR", "NLP", "Recherche"],
    },
    featured: true,
    badge: { en: "In progress", fr: "En cours" },
    links: [
      {
        label: FILES,
        href: "https://drive.google.com/drive/folders/1PO7NSu40roxmDrxqTR-hrZWLGrOOExak?usp=drive_link",
      },
    ],
  },
  {
    // Keeps file + slug so the existing card image (public/projects/
    // rag-document-understanding) is reused unchanged.
    file: "rag_extraction.py",
    slug: "rag-document-understanding",
    title: {
      en: "Vala Bleu Ops Copilot — Agentic RAG & MLOps",
      fr: "Vala Bleu Ops Copilot — RAG agentique & MLOps",
    },
    category: "NLP & LLM",
    year: { en: "In progress", fr: "En cours" },
    context: {
      en: "PFA · Internship — Vala Bleu, Agadir",
      fr: "PFA · Stage — Vala Bleu, Agadir",
    },
    summary: {
      en: "An operational copilot for IT Ops at Vala Bleu (web host, Agadir): multilingual FR/EN document RAG and server-log anomaly detection, orchestrated by an agentic router, with 100% local LLM inference on an NVIDIA GPU.",
      fr: "Un copilote opérationnel pour l'Ops IT chez Vala Bleu (hébergeur web, Agadir) : RAG documentaire multilingue FR/EN et détection d'anomalies sur les logs serveur, orchestrés par un routeur agentique, avec inférence LLM 100 % locale sur GPU NVIDIA.",
    },
    problem: {
      en: "Unifying business knowledge (docs, tickets) and operational state (logs) in one assistant, without letting sensitive data leave the premises.",
      fr: "Unifier la connaissance métier (docs, tickets) et l'état opérationnel (logs) dans un seul assistant, sans jamais faire sortir de données sensibles.",
    },
    details: {
      en: [
        "Multilingual FR/EN document RAG (PostgreSQL + pgvector).",
        "Server-log anomaly detection (Isolation Forest).",
        "Agentic router directing queries to RAG, Logs, or both.",
        "100% local LLM inference on NVIDIA GPU; sensitive-data anonymization.",
        "RAGAS evaluation; FastAPI API + Streamlit dashboard, dockerized.",
      ],
      fr: [
        "RAG documentaire multilingue FR/EN (PostgreSQL + pgvector).",
        "Détection d'anomalies sur les logs serveur (Isolation Forest).",
        "Routeur agentique dirigeant les requêtes vers RAG, Logs ou les deux.",
        "Inférence LLM 100 % locale sur GPU NVIDIA ; anonymisation des données sensibles.",
        "Évaluation RAGAS ; API FastAPI + dashboard Streamlit, dockerisés.",
      ],
    },
    tags: {
      en: ["Python", "FastAPI", "LangChain", "pgvector", "RAGAS", "Docker"],
      fr: ["Python", "FastAPI", "LangChain", "pgvector", "RAGAS", "Docker"],
    },
    featured: true,
    badge: { en: "In progress", fr: "En cours" },
  },
  {
    // Keeps file + slug so the existing Sentinel Finance card image
    // (public/projects/sentinel-finance/01.webp) is reused unchanged.
    file: "sentinel_finance.py",
    slug: "sentinel-finance",
    title: {
      en: "ALM Surrender Risk",
      fr: "ALM Surrender Risk",
    },
    category: "Machine Learning",
    year: { en: "In progress", fr: "En cours" },
    context: { en: "Actuarial & Finance", fr: "Actuariat & Finance" },
    summary: {
      en: "Life-insurance surrender-risk modelling: a Monte-Carlo simulation engine, interest-rate calibration (Vasicek / Hull-White) and a predictive ML model with SHAP, served through a FastAPI API and a Streamlit dashboard under a Solvency II framework.",
      fr: "Modélisation du risque de rachat en assurance-vie : moteur de simulation Monte-Carlo, calibrage des taux (Vasicek / Hull-White) et modèle ML prédictif avec SHAP, exposés via une API FastAPI et un dashboard Streamlit dans un cadre Solvabilité II.",
    },
    problem: {
      en: "Anticipating dynamic policy surrenders and their impact on asset-liability management (ALM).",
      fr: "Anticiper les rachats dynamiques de contrats et leur impact sur la gestion actif-passif (ALM).",
    },
    details: {
      en: [
        "Data pipeline & ETL feeding a Monte-Carlo simulation engine.",
        "Predictive ML model with SHAP interpretability.",
        "Stochastic rate calibration (Vasicek / Hull-White).",
        "Dynamic surrender formula within a Solvency II framework.",
        "FastAPI API & Streamlit dashboard; ALM financial-analysis report.",
      ],
      fr: [
        "Pipeline de données & ETL alimentant un moteur de simulation Monte-Carlo.",
        "Modèle ML prédictif avec interprétabilité SHAP.",
        "Calibrage stochastique des taux (Vasicek / Hull-White).",
        "Formule de rachat dynamique dans un cadre Solvabilité II.",
        "API FastAPI & dashboard Streamlit ; rapport d'analyse financière ALM.",
      ],
    },
    tags: {
      en: ["Python", "Monte-Carlo", "SHAP", "FastAPI", "Streamlit", "Solvency II"],
      fr: ["Python", "Monte-Carlo", "SHAP", "FastAPI", "Streamlit", "Solvabilité II"],
    },
    collaborators: ["Sabrina Elkhallouki — Financial Engineering Student & Decision Making"],
    featured: true,
    badge: { en: "In progress", fr: "En cours" },
  },
  {
    file: "supplychain_bi.pbix",
    slug: "supplychain-bi",
    title: {
      en: "Supply Chain BI — DataCo Analysis",
      fr: "BI Supply Chain — Analyse DataCo",
    },
    category: "Data Engineering",
    year: { en: "2025", fr: "2025" },
    context: { en: "University project", fr: "Projet universitaire" },
    summary: {
      en: "A business-intelligence project over 100,000+ rows: ETL into a star-schema warehouse feeding 8 financial KPIs and interactive Power BI dashboards.",
      fr: "Un projet de business intelligence sur plus de 100 000 lignes : ETL vers un entrepôt en schéma en étoile alimentant 8 KPI financiers et des tableaux de bord Power BI interactifs.",
    },
    problem: {
      en: "Turning 100k+ rows of raw supply-chain data into decision-ready financial KPIs.",
      fr: "Transformer plus de 100 000 lignes de données brutes de supply chain en KPI financiers prêts pour la décision.",
    },
    details: {
      en: [
        "ETL over 100,000+ rows.",
        "3-star-schema data warehouse.",
        "8 financial KPIs surfaced through interactive Power BI dashboards.",
      ],
      fr: [
        "ETL sur plus de 100 000 lignes.",
        "Entrepôt de données en schéma en étoile (3 étoiles).",
        "8 KPI financiers présentés via des tableaux de bord Power BI interactifs.",
      ],
    },
    tags: {
      en: ["ETL", "Data Warehouse", "Power BI", "BI"],
      fr: ["ETL", "Data Warehouse", "Power BI", "BI"],
    },
    collaborators: ["Hayat Latif"],
    links: [{ label: GITHUB, href: "https://github.com/AbderKay" }],
  },
];

// Display order within each group (by `file`).
//  Engineering: Vala Bleu → TomatoSort → AutoExpert → AH-Chat → Hotel → Supply Chain
//  Research:    Medical Prescription OCR → ALM Surrender Risk → NASA Shark Tag
const PROJECT_ORDER = [
  // Engineering Projects
  "rag_extraction.py", // Vala Bleu Ops Copilot
  "tomatosort.py", // TomatoSort
  "autoexpert.js", // AutoExpert
  "ah_chat_digital.py", // AH-Chat
  "hotel_system.sql", // Hotel Management
  "supplychain_bi.pbix", // Supply Chain BI
  // Research & Experimental Work
  "prescription_ocr.py", // Medical Prescription OCR (Research Draft)
  "sentinel_finance.py", // ALM Surrender Risk
  "shark_tag.ipynb", // NASA Smart Shark Behaviour Tag
];

// Projects that belong to the "Research & Experimental Work" group.
const RESEARCH_FILES = new Set([
  "prescription_ocr.py",
  "sentinel_finance.py",
  "shark_tag.ipynb",
]);

const rank = (file: string) => {
  const i = PROJECT_ORDER.indexOf(file);
  return i === -1 ? PROJECT_ORDER.length : i;
};

export const projects: Project[] = [...projectList]
  .sort((a, b) => rank(a.file) - rank(b.file))
  .map((p) => ({
    ...p,
    group: RESEARCH_FILES.has(p.file) ? "research" : "engineering",
  }));
