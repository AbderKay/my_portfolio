export type Certification = {
  /** Folder under public/certifications/<slug> for the certificate image(s)/PDF. */
  slug: string;
  name: string;
  issuer: string;
  /** Optional — shown when set, otherwise the line is omitted. */
  description?: string;
  /** Issue date, e.g. "2025". */
  date?: string;
  /**
   * Issuer-logo key: the file lives at public/logos/<logo>.(svg|png|webp|jpg).
   * Shared logos can reuse one key (e.g. both Anthropic certs use "anthropic").
   * Falls back to a monogram when the file is missing.
   */
  logo?: string;
};

// Certifications & recognition (13), in fixed display order.
// Drop a certificate image/PDF into public/certifications/<slug>/ and it fills
// the card automatically; drop an issuer logo at public/logos/<logo>.svg.
export const certifications: Certification[] = [
  { slug: "anthropic-mcp", name: "Model Context Protocol: Advanced Topics", issuer: "Anthropic", date: "2026", logo: "anthropic" },
  { slug: "anthropic-claude-api", name: "Building with the Claude API", issuer: "Anthropic", date: "2026", logo: "anthropic" },
  { slug: "aws", name: "AWS", issuer: "Amazon Web Services", date: "2026", logo: "aws" },
  { slug: "datacamp-data-engineer", name: "Data Engineer Associate", issuer: "DataCamp", date: "2026", logo: "datacamp" },
  { slug: "hackerrank-sql", name: "SQL (Advanced) Certificate", issuer: "HackerRank", date: "2026", logo: "hackerrank" },
  { slug: "gitex-africa", name: "AI, Data Science & ML Masterclasses", issuer: "GITEX Africa 2024", date: "2024", logo: "dwtc" },
  { slug: "ieee", name: "IEEE_conference", issuer: "IEEE / IFIP", date: "2024", logo: "ieee" },
  { slug: "taylor-francis", name: "Taylor & Francis — Research", issuer: "Taylor & Francis Group", date: "2026", logo: "taylor-francis" },
  { slug: "bcg-x", name: "Data Science & GenAI Virtual Experience", issuer: "BCG X", date: "2026", logo: "bcg-x" },
  { slug: "deloitte", name: "Data Analytics Virtual Simulation", issuer: "Deloitte", date: "2026", logo: "deloitte" },
  { slug: "university-london", name: "Professional Skills for International Business", issuer: "University of London", date: "2026", logo: "university-london" },
  { slug: "make", name: "Automation Certification", issuer: "Make", date: "2025", logo: "make" },
  { slug: "bank-of-america", name: "Investment Banking Job Simulation", issuer: "Bank of America", date: "2026", logo: "bank-of-america" },
];
