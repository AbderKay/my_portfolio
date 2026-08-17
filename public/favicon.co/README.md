# favicon.co

Favicon assets for the portfolio. In Next.js everything under `public/` is
served from the site root, so these are reachable at `/favicon.co/<file>`.
They are wired via `metadata.icons` in `src/app/layout.tsx`.

## Files (generated from `icon.svg`)

- `icon.svg`        — scalable source, primary favicon for modern browsers
- `favicon.ico`     — 32×32 (PNG-in-ICO) fallback for older browsers
- `icon.png`        — 512×512 PNG
- `apple-icon.png`  — 180×180 PNG for iOS home-screen

## Design

A "squircle" on the deep-navy brand base with the aurora gradient
(steel-cyan → violet → amber), a bold geometric **A** monogram with the
signature accent dot, and subtle circuit-node accents — a modern, tech-forward
mark that stays legible down to 16px.

## Regenerating

Edit `icon.svg`, then re-run the generator (uses `sharp`):

```bash
NODE_PATH=./node_modules node scripts/gen-favicon.js
```

(or re-run the one-off script used to create these files).
