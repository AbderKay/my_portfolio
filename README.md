# Abderrahman Kayouh — Portfolio

Personal portfolio of **Abderrahman Kayouh** — AI / ML & Data Engineer.
A bilingual (FR / EN), animated single-page site built as a professional digital identity.

🔗 **Live:** _add your Vercel URL here after deploying_

## ✨ Features

- **Bilingual FR / EN** with an instant language switcher
- **Dark / light theme** (set before first paint — no flash)
- **Scroll-driven storytelling** & micro-interactions (GSAP + Framer Motion + Lenis)
- Fully **responsive**, keyboard-accessible, and reduced-motion aware
- **Folder-driven media** — drop images into `public/<section>/` and they appear automatically
- Global **image lightbox**
- **Contact form** (Web3Forms)
- **SEO**: schema.org Person JSON-LD, Open Graph / Twitter cards, `sitemap` & `robots`

## 🛠 Tech stack

- **Framework:** Next.js 15 (App Router) + React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Motion:** GSAP + ScrollTrigger · Framer Motion · Lenis
- **Icons:** lucide-react
- **Deployment:** Vercel

## 🚀 Getting started

Requires Node.js 18.18+ (Node 20+ recommended).

```bash
# install dependencies
npm install

# start the dev server -> http://localhost:3000
npm run dev

# production build
npm run build

# run the production server
npm start
```

## 📁 Project structure

```
src/
  app/          # App Router pages, layout, metadata, API route
  components/   # UI + section components
  data/         # typed content (profile, projects, skills, timeline, ...)
  lib/          # helpers (media, i18n, gsap, ...)
public/         # images & assets, grouped by section
```

Content lives in `src/data/` — edit those typed files to update the portfolio (no JSX changes needed).

## 📫 Contact

- **Email:** abderrahmankayouh67@gmail.com
- **GitHub:** https://github.com/AbderKay
- **LinkedIn:** https://www.linkedin.com/in/abderrahman-kayouh

---

© 2026 Abderrahman Kayouh. All rights reserved.
