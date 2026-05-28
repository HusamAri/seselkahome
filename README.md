# Seselka Home

[![NodeJS with Webpack](https://github.com/HusamAri/seselkahome/actions/workflows/webpack.yml/badge.svg)](https://github.com/HusamAri/seselkahome/actions/workflows/webpack.yml)

Brand site for **Seselka Home** — handwoven baskets made from recycled paper,
crafted by women artisans. *Rooted in nature · Reimagined by hand.*

A zero-framework **static site** (HTML + CSS) whose JavaScript is bundled with
webpack. No server, no database — it can be served from any static host.

## Tech stack

- **HTML / CSS** — hand-authored, no UI framework.
- **Vanilla JS** (`app.js`) — navigation, cart/toast, the CSS "Süreç" weaving
  process, scroll reveals, and the date-gated Bayram popup.
- **React** — a small floating **Tweaks** panel (design/motion controls),
  compiled from JSX.
- **webpack + Babel** — bundle `app.js` and the React panel into a single
  `dist/bundle.js`. React/ReactDOM are compiled in (no CDN runtime).

## Project structure

```
seselkahome/
├── index.html                    # the whole page (loads dist/bundle.js)
├── styles.css                    # layout + component styles
├── colors_and_type.css           # design tokens (color, type scale)
├── app.js                        # vanilla site interactions  ┐ bundled
├── tweaks-panel.jsx              # reusable React Tweaks controls │  into
├── tweaks-app.jsx                # mounts the Tweaks panel        ┘ dist/bundle.js
├── webpack.config.js             # build config
├── package.json
├── dist/bundle.js                # built bundle (committed; served by the page)
├── assets/                       # images (hero, products, logo, seal…)
└── .github/workflows/webpack.yml # CI: `npm install && npx webpack` on Node 18/20/22
```

## Getting started

The built bundle is committed, so viewing the site needs no build step:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

To work on the JavaScript:

```bash
npm install
npm run build     # one-off production bundle → dist/bundle.js
npm run watch     # rebuild on change (development mode)
```

> After editing `app.js`, `tweaks-panel.jsx`, or `tweaks-app.jsx`, **rebuild**
> (`npm run build`) and commit the updated `dist/bundle.js` — the page serves
> the bundle, not the source files.

## Features

- **Sections:** fixed nav + cart, hero, tagline marquee, *Hikâye* story,
  *Süreç* (3D CSS weaving process), stats band, product list with cart + toast,
  *Mutlu Ev* gallery, *Sipariş* form, footer.
- **Instagram embeds** inside the *Hikâye*, *Süreç*, and *Ürünler* sections
  (official `embed.js`; posts must be public to render).
- **Tweaks panel** — motion / density / accent controls. Hidden on a normal
  load; it only appears when a design host activates edit mode.

### Bayram popup

A dismissible holiday popup that shows **only within a date window**, once per
browser session. Configure the window in `app.js` (`bayramPopup()`):

```js
const START = '2026-05-27';   // inclusive (YYYY-MM-DD, local time)
const END   = '2026-05-29';   // inclusive
```

Append `?bayram=preview` to the URL to force it open for testing, regardless of
the date.

## Continuous integration

`.github/workflows/webpack.yml` runs `npm install && npx webpack` on Node 18,
20, and 22 for every push/PR to the development branch, verifying the bundle
builds.

## Deployment

The site is fully static and uses relative paths, so it works from any static
host (GitHub Pages, Vercel, Netlify, Cloudflare Pages, …) including under a
subpath. Two client-side resources load from CDNs at runtime: Google Fonts and
Instagram's `embed.js`.
