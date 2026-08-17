// Server-only: uses fs. Import this from Server Components / build code only.
import fs from "node:fs";
import path from "node:path";

export type GalleryImage = { src: string; title: string };

const IMAGE_RE = /\.(jpe?g|png|webp|avif|gif)$/i;

/** Turn "01-main.jpg" into a readable fallback caption: "Main". */
function prettify(file: string): string {
  return file
    .replace(IMAGE_RE, "")
    .replace(/^\d+[-_.\s]*/, "")
    .replace(/[-_]+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Reads every image in public/<subdir>, sorted alphabetically (natural order,
 * so 01, 02, 10 sort correctly). Titles come from the optional captions map
 * (keyed by filename); anything without an explicit caption falls back to a
 * prettified filename. Missing folders return []. Runs at build time on the
 * server — add images to the folder and redeploy, no code changes needed.
 */
export function readGallery(
  subdir: string,
  captions: Record<string, string> = {}
): GalleryImage[] {
  const dir = path.join(process.cwd(), "public", subdir);
  let files: string[] = [];
  try {
    files = fs.readdirSync(dir).filter((f) => IMAGE_RE.test(f));
  } catch {
    return [];
  }
  files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  return files.map((file, i) => {
    const pretty = prettify(file);
    return {
      src: `/${subdir}/${file}`,
      title: captions[file] || pretty || `Photo ${i + 1}`,
    };
  });
}

/**
 * Returns the public URL of public/<subdir>/report.pdf if it exists, else null.
 * Lets a card show a "Report" button only when a report has been added.
 */
export function readReport(subdir: string): string | null {
  const p = path.join(process.cwd(), "public", subdir, "report.pdf");
  try {
    fs.accessSync(p);
    return `/${subdir}/report.pdf`;
  } catch {
    return null;
  }
}

const LOGO_EXTS = ["svg", "png", "webp", "jpg", "jpeg"];

/**
 * Resolves a logo file in public/logos/<key>.<ext> (any common extension),
 * returning its URL or null. Lets a card show the issuer logo when the file is
 * present, and fall back gracefully when it isn't.
 */
export function readLogo(key: string): string | null {
  const base = path.join(process.cwd(), "public", "logos");
  for (const ext of LOGO_EXTS) {
    try {
      fs.accessSync(path.join(base, `${key}.${ext}`));
      return `/logos/${key}.${ext}`;
    } catch {
      /* try next extension */
    }
  }
  return null;
}

/**
 * Returns the public URL of the certificate PDF in public/<subdir> if one
 * exists (prefers certificate.pdf, else the first .pdf alphabetically), else
 * null. Used to link a certification card to its document.
 */
export function readFirstPdf(subdir: string): string | null {
  const dir = path.join(process.cwd(), "public", subdir);
  let pdfs: string[] = [];
  try {
    pdfs = fs.readdirSync(dir).filter((f) => f.toLowerCase().endsWith(".pdf"));
  } catch {
    return null;
  }
  if (!pdfs.length) return null;
  pdfs.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  const file = pdfs.find((f) => f.toLowerCase() === "certificate.pdf") ?? pdfs[0];
  return `/${subdir}/${file}`;
}
