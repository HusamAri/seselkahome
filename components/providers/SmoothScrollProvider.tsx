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

    return () => {
      cancelAnimationFrame(frame);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
