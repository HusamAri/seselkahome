import type { Config } from 'tailwindcss';

/**
 * Brand tokens are pulled from the "SESELKA HOME — Adaptive Logo System" board
 * and encoded once in lib/brand.ts + app/globals.css (CSS variables).
 * Raw palette = fixed brand hexes. Semantic tokens = CSS vars that flip in dark mode.
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // raw brand palette (never changes)
        loom: '#E4D9C4',
        clay: '#B89476',
        ink: '#2A2520',
        ember: '#A8362B',
        linen: '#F4EFE6',
        fig: '#6E4A5A',
        // semantic tokens (dual-mode, driven by CSS variables)
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        fg: 'var(--fg)',
        muted: 'var(--muted)',
        line: 'var(--line)',
        accent: 'var(--accent)',
        'accent-fill': 'var(--accent-fill)',
        'on-accent': 'var(--on-accent)',
        plum: 'var(--plum)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Cormorant Garamond', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        eyebrow: '0.22em',
      },
      transitionTimingFunction: {
        quiet: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      maxWidth: {
        wrap: '1200px',
      },
    },
  },
  plugins: [],
};

export default config;
