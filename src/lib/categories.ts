/**
 * Adaptive category accent colors. The base theme stays Ink Blueprint; these
 * are used sparingly per card (hover glow, tag, media accent) to encode domain.
 */
const MAP: Record<string, string> = {
  // AI / ML → electric blue / cyan
  "Machine Learning": "#38bdf8",
  "NLP & LLM": "#22d3ee",
  // AI & Automation → teal
  "AI & Automation": "#2dd4bf",
  // Data Engineering → indigo / purple
  "Data Engineering": "#8b5cf6",
  // Research / R&D → emerald
  Research: "#34d399",
  "R&D": "#34d399",
  // Full-stack / Projects → blue
  "Full-Stack": "#60a5fa",
  // Leadership → gold / amber
  Leadership: "#e8a24c",
};

const DEFAULT = "#57b6c9";

export function categoryColor(category?: string): string {
  return (category && MAP[category]) || DEFAULT;
}
