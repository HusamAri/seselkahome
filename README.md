# Seselka Home

Brand storefront for **Seselka Home** — handwoven baskets made from recycled
paper, crafted by women artisans. Positioning: **Sessiz Cesaret** (quiet
courage) / *sessiz lüks*. *Rooted in nature · Reimagined by hand.*

A **Next.js 14 (App Router) + TypeScript + Tailwind** site with a calm,
deliberate motion system (Framer Motion + Lenis). It builds to a **static
export** and deploys to **GitHub Pages** at
`https://husamari.github.io/seselkahome/`.

> The previous vanilla HTML/CSS/JS site is archived under [`/legacy`](legacy/).

## Tech stack

- **Next.js 14** App Router, static export (`output: 'export'`).
- **TypeScript** + **Tailwind CSS** (brand tokens wired in `tailwind.config.ts`).
- **Framer Motion** for transform/opacity-only motion; **Lenis** smooth scroll.
- All motion respects `prefers-reduced-motion`; light/dark locked via
  `prefers-color-scheme`.

## Brand tokens

Single source of truth, pulled from the *SESELKA HOME — Adaptive Logo System*
board: [`lib/brand.ts`](lib/brand.ts) + [`app/globals.css`](app/globals.css),
documented in [`BRAND.md`](BRAND.md). Six Turkish-named colors (LOOM, CLAY, INK,
LINEN, EMBER, FIG PLUM), the ember-dot signature, and the type pairing.

## Project structure

```
seselkahome/
├── app/
│   ├── layout.tsx                # fonts, metadata, SmoothScrollProvider
│   ├── template.tsx              # PageTransition (replays per route)
│   ├── globals.css               # tokens + dual-mode + reduced-motion
│   ├── page.tsx                  # homepage (renders the lab view)
│   └── seselka-lab/page.tsx      # demo composition + README block
├── components/
│   ├── motion/                   # RevealText, RevealImage, ParallaxImage, PageTransition
│   ├── providers/                # SmoothScrollProvider (Lenis)
│   └── ProductCard.tsx
├── lib/
│   ├── brand.ts                  # brand tokens + sample products
│   └── basePath.ts               # /seselkahome prefix helpers
├── public/assets/                # images (hero, products, logo, seal…)
├── legacy/                       # archived vanilla site
└── .github/workflows/            # ci.yml (PR build) + deploy-pages.yml
```

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export -> ./out
```

> In dev the basePath is disabled (served at `/`). The production build applies
> the `/seselkahome` basePath for GitHub Pages.

## Continuous integration & deployment

- **CI** — `.github/workflows/ci.yml` runs `npm ci` + `next build` on Node 20/22
  for every PR to `main`.
- **Deploy** — `.github/workflows/deploy-pages.yml` builds the static export and
  publishes `./out` to GitHub Pages on every push to `main`
  (Pages source: GitHub Actions).
