"use client";

import { useEffect, useState } from "react";

/**
 * Cycles through phrases with a type/erase effect. Timer-based (not rAF) so it
 * runs reliably; under reduced motion it shows the first phrase statically.
 */
export function Typewriter({
  words,
  className,
}: {
  words: string[];
  className?: string;
}) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setText(words[0]);
      return;
    }
    const full = words[index % words.length];
    let delay = deleting ? 45 : 90;

    if (!deleting && text === full) {
      delay = 1400; // hold at full word
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      delay = 250;
    }

    const t = setTimeout(() => {
      if (!deleting && text === full) {
        setDeleting(true);
      } else {
        setText((prev) =>
          deleting ? full.slice(0, prev.length - 1) : full.slice(0, prev.length + 1)
        );
      }
    }, delay);

    return () => clearTimeout(t);
  }, [text, deleting, index, words]);

  return (
    <span className={className}>
      {text}
      <span className="ml-0.5 inline-block w-[2px] animate-blink bg-current align-middle" style={{ height: "1em" }} aria-hidden />
    </span>
  );
}
