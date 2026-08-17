# Certification images

Drop certificate/logo images into the matching folder — they load automatically:

- `ieee/`
- `aws/`
- `dubai-world-trade-centre/`
- `taylor-francis/`

Rules:
- Sorted **alphabetically**; the first image is the cover.
- Supported: `.jpg .jpeg .png .webp .avif .gif`.
- Card text (title, issuer, description, date, credential link) lives in
  `src/data/certifications.ts` → `featuredCertifications`. Fill in the
  placeholders (`date`, `credentialUrl`, `description`) with your real details.
- Optional image captions: `src/data/experiences.ts` → `certificationCaptions`.

To add a **new** certification card: create a folder here, add an entry in
`featuredCertifications`, drop images in. No component changes needed.

Read at build time — restart dev / redeploy after adding images.
