# Seselka Home — Brand Tokens

Single source of truth, pulled from the **"SESELKA HOME — Adaptive Logo System"** board.
Encoded in [`lib/brand.ts`](lib/brand.ts) + [`app/globals.css`](app/globals.css), wired to Tailwind in [`tailwind.config.ts`](tailwind.config.ts).

## Positioning
**Sessiz Cesaret** (Quiet Courage) / *Sessiz lüks* — calm, confident, understated. The product is the hero; motion frames it, never performs.

## Palette (hex printed on the board)

| Token | Hex | Role | Balance |
|-------|-----|------|--------:|
| LOOM | `#E4D9C4` | Doğallık, sadelik, arka plan | 40% |
| CLAY | `#B89476` | Sıcaklık, toprak, el emeği | 20% |
| INK | `#2A2520` | Güç, kalite, yazı rengi | 15% |
| LINEN | `#F4EFE6` | Nefes, açıklık, denge | 10% |
| EMBER | `#A8362B` | Tutku, detay, vurgu — **marka imzası (kırmızı nokta)** | 5% |
| FIG PLUM | `#6E4A5A` | İç dünya, kadınlık, zarafet — **kurucu vurgusu (accent only)** | 5% |

## Semantic tokens (dual-mode)
Components use semantic tokens, not raw hexes, so light/dark flip cleanly. Dark mode is a **locked brand override** via `prefers-color-scheme` (not auto-inversion); contrast verified AA in both modes.

| Token | Light | Dark |
|-------|-------|------|
| `--bg` | linen `#F4EFE6` | deep ink `#221E1A` |
| `--surface` | loom `#E4D9C4` | ink `#2A2520` |
| `--fg` | ink `#2A2520` | linen `#F4EFE6` |
| `--muted` | `#6E6052` | clay `#B89476` |
| `--accent` | ember `#A8362B` | lightened ember `#D8897B` |
| `--wipe` | fig plum `#6E4A5A` | fig plum `#6E4A5A` |

## Typography
- **Display:** Cormorant Garamond (high-contrast serif — the SESELKA wordmark).
- **Body:** Plus Jakarta Sans (light, tracked humanist sans — labels + copy).

> Not labeled on the board — closest identifiable match. Swap in `lib/brand.ts` + `app/layout.tsx` if the licensed brand fonts differ. Both load `latin-ext` for Turkish glyphs.

## Logo variants
Primary (vertical), horizontal, symbol (S&K monogram), small-size, seal/badge ("2026 · Made to last"), monochrome. Assets in `public/assets/` (`logo-primary-vertical-clean.png`, `monogram.webp`, `wax-seal.webp`, `icon-monogram-clean.png`).

## Usage laws (KULLANIM İLKELERİ)
1. Logo form never changes.
2. The ember red dot is the brand signature.
3. Fig plum appears only as a sparing accent (here: solely the page-transition wipe).
4. Quiet luxury, naturalness, timelessness preserved in every use.
