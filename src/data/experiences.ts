/**
 * Image captions for experience galleries.
 * Keyed by folder slug (public/experiences/<slug>), then by filename.
 * Fill in a title for any image; blank/omitted → an automatic "Photo N".
 * The keys below already match the files currently in each folder — just type
 * the titles. Add more files anytime; new ones get an auto title until named.
 */
export const experienceCaptions: Record<string, Record<string, string>> = {
  "vala-bleu": {
    "01.jpg": "",
  },
  "ai-intern": {
    "01.png": "",
    "02.jpeg": "",
  },
  "engineering-degree": {
    "01.jpg": "",
    "02.jpg": "",
  },
  "specialized-training": {
    "01.png": "",
    "02.jpeg": "",
    "03.jpeg": "",
  },
  "jeea-president": {
    "01.png": "",
    "02.jpeg": "",
    "03.jpeg": "",
    "04.png": "",
  },
  "high-school": {
    "01.png": "",
  },
};

/** Optional captions for certification images (public/certifications/<slug>). */
export const certificationCaptions: Record<string, Record<string, string>> = {};
