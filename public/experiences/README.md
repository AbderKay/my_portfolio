# Experience images

Drop images into the matching folder — they load automatically (no code changes):

- `ai-intern/`
- `engineering-degree/`
- `specialized-training/`
- `jeea-president/`

Rules:
- Images are sorted **alphabetically**, so name them `01-...`, `02-...`, `03-...`.
- The **first** image (e.g. `01-main.jpg`) becomes the cover/thumbnail.
- Supported: `.jpg .jpeg .png .webp .avif .gif`.
- Optional captions: edit `src/data/experiences.ts` → `experienceCaptions` (map filename → title). Anything without a caption gets an auto title from its filename.

After adding images, restart the dev server / redeploy for them to appear (folders are read at build time).
