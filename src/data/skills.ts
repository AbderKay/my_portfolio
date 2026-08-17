import type { Loc } from "@/lib/i18n/config";

export type SkillGroup = {
  file: string;
  icon: string;
  title: Loc;
  items: Loc<string[]>;
};

export const skills: SkillGroup[] = [
  {
    file: "machine_learning.py",
    icon: "brain",
    title: { en: "Machine Learning & AI", fr: "Machine Learning & IA" },
    items: {
      en: [
        "ML Modeling with Scikit-learn (Classification & Regression)",
        "Deep Learning Basics (TensorFlow, Keras)",
        "Predictive Modeling & Feature Engineering",
        "Model Evaluation, Validation & Metrics Optimization",
        "NLP & Conversational AI (Foundations)",
        "Applied RAG & Document Understanding",
        "Computer Vision & Applied OCR",
      ],
      fr: [
        "Modélisation ML avec Scikit-learn (Classification & Régression)",
        "Bases du Deep Learning (TensorFlow, Keras)",
        "Modélisation prédictive & Feature Engineering",
        "Évaluation de modèles, validation & optimisation des métriques",
        "Notions de NLP & IA conversationnelle",
        "RAG appliqué & Compréhension de documents",
        "Vision par ordinateur & OCR appliqué",
      ],
    },
  },
  {
    file: "data_engineering.sql",
    icon: "database",
    title: { en: "Data Engineering & BI", fr: "Data Engineering & BI" },
    items: {
      en: [
        "SQL & Oracle PL/SQL",
        "ETL Pipeline Design & Data Cleaning",
        "Data Warehouse Modeling (Star Schema)",
        "Business Intelligence (Power BI, Tableau)",
        "Relational & Cloud Databases (PostgreSQL, Supabase)",
        "Decision Reporting & KPI Tracking",
      ],
      fr: [
        "SQL & Oracle PL/SQL",
        "Conception de pipelines ETL & Nettoyage de données",
        "Modélisation d'entrepôt de données (Schéma en étoile)",
        "Business Intelligence (Power BI, Tableau)",
        "Bases de données relationnelles & Cloud (PostgreSQL, Supabase)",
        "Reporting décisionnel & Suivi des KPIs",
      ],
    },
  },
  {
    file: "mlops.yaml",
    icon: "workflow",
    title: { en: "MLOps, Tools & Delivery", fr: "MLOps, Outils & Méthodes" },
    items: {
      en: [
        "Model Serving & REST APIs (FastAPI / Flask)",
        "Basic Containerization (Docker)",
        "Workflow Automation (n8n, Make)",
        "Version Control (Git & GitHub)",
        "Agile & Scrum Delivery / Team Coordination",
      ],
      fr: [
        "Déploiement de modèles & APIs REST (FastAPI / Flask)",
        "Bases de la conteneurisation (Docker)",
        "Automatisation de workflows (n8n, Make)",
        "Gestion de versions (Git & GitHub)",
        "Méthodes Agiles / Scrum & Coordination d'équipe",
      ],
    },
  },
  {
    file: "languages.sh",
    icon: "terminal",
    title: { en: "Languages & Technologies", fr: "Langages & Technologies" },
    items: {
      en: [
        "Python (Pandas, NumPy, Scikit-learn, TensorFlow/Keras)",
        "SQL (PostgreSQL, MySQL, Oracle)",
        "Java / Spring Boot (Beginner / Academic)",
        "TypeScript / React (Beginner / UI Basics)",
        "Bash & Linux (Basic Commands & Scripting)",
      ],
      fr: [
        "Python (Pandas, NumPy, Scikit-learn, TensorFlow/Keras)",
        "SQL (PostgreSQL, MySQL, Oracle)",
        "Java / Spring Boot (Débutant / Projets académiques)",
        "TypeScript / React (Débutant / Notions UI)",
        "Bash & Linux (Commandes de base & Scripting)",
      ],
    },
  },
];