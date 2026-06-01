'use client';

import Lenis from 'lenis';
import { createContext, useContext, useEffect, useState } from 'react';

const LenisContext = createContext<Lenis | null>(null);

/** Access the Lenis instance (e.g. for programmatic lenis.scrollTo). */
export const useLenis = () => useContext(LenisContext);

/**
 * Mounts Lenis smooth scroll and drives it from a single RAF loop.
 * Framer Motion's useScroll reads native scroll position, which Lenis updates,
 * so scroll-linked motion stays in sync without extra wiring.
 * Respects prefers-reduced-motion: skips Lenis entirely (native scroll).
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const instance = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    setLenis(instance);

    let frame = 0;
    const raf = (time: number) => {
      instance.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // Global smooth-anchor handler: any in-page #link lands just below the
    // floating nav, consistently through Lenis. Skips links that opt out.
    const NAV_OFFSET = 88;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a || a.dataset.noscroll !== undefined) return;
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      if (href === '#top') {
        instance.scrollTo(0);
        return;
      }
      const y = (el as HTMLElement).getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
      instance.scrollTo(y);
    };
    document.addEventListener('click', onClick);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('click', onClick);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
