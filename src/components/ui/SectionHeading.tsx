import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  index: string;
  slug: string;
  title: string;
  subtitle?: string;
};

/**
 * "// 03. projects" style section header — the editorial numbering motif
 * that ties the whole page together.
 */
export function SectionHeading({ index, slug, title, subtitle }: SectionHeadingProps) {
  return (
    <Reveal className="mb-10">
      <p className="mono-label mb-3 text-primary">
        <span className="text-faint">{"// "}{index}.</span> {slug}
      </p>
      <h2 className="font-display text-step-2 font-semibold tracking-tight">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 max-w-2xl text-step-0 text-muted">{subtitle}</p>
      ) : null}
    </Reveal>
  );
}
