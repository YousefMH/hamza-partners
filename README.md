# حمزة وشركاؤه | Hamza & Partners

Premium Arabic RTL landing page for Hamza & Partners — a corporate law-firm site built with Vite, React, TypeScript, Tailwind CSS, and Framer Motion.

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4
- Framer Motion
- Lucide React
- React Router

## Getting started

```bash
npm install
npm run dev
```

The app runs at [http://127.0.0.1:4321](http://127.0.0.1:4321) by default.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server on port 4321 |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run oxlint |

## Content & placeholders

All firm copy that should be easy to replace lives under `src/data/`:

- `siteConfig.ts` — firm name, contact, nav, CTAs, hero images
- `services.ts` — 15 practice areas (featured: حوكمة الشركات والاندماجات والاستحواذات)
- `team.ts` — placeholder lawyer profiles
- `industries.ts` — sectors served
- `experience.ts` — anonymized experience themes
- `articles.ts` — insight cards
- `content.ts` — why-us points, trust indicators, stats

Contact form validation is client-side; submission uses a mock API in `src/lib/form.ts` ready to swap for a real endpoint.

## Routes

- `/` — full landing page
- `/services/:slug` — service detail stub

## Notes

- Site is fully `dir="rtl"` / `lang="ar"`
- Ivory / charcoal / gold palette with subtle Greek architectural motifs
- Fonts: Noto Kufi Arabic (headings) + IBM Plex Sans Arabic (body)
- Respects `prefers-reduced-motion`
