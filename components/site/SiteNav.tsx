'use client';

import { useEffect, useState } from 'react';
import { useLenis } from '@/components/providers/SmoothScrollProvider';
import { useCart } from '@/components/shop/CartProvider';

const LINKS = [
  { href: '#koleksiyon', label: 'Koleksiyon' },
  { href: '#hikaye', label: 'Hikaye' },
  { href: '#surec', label: 'Süreç' },
];

const EASE = 'cubic-bezier(0.32,0.72,0,1)';

/** Floating glass island nav. Detached pill, hamburger morphs to X, the mobile
 * menu opens as a full overlay with a staggered reveal. Motion stays calm. */
export function SiteNav() {
  const lenis = useLenis();
  const cart = useCart();
  const [tight, setTight] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setTight(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  // Just close the mobile menu; the global anchor handler (SmoothScrollProvider)
  // performs the offset scroll, and a native fallback covers reduced-motion.
  const go = (href: string) => (e: React.MouseEvent) => {
    setOpen(false);
    if (lenis) return; // global handler will preventDefault + smooth-scroll
    e.preventDefault();
    if (href === '#top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.querySelector(href) as HTMLElement | null;
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 88;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  const Brand = ({ onClick }: { onClick?: (e: React.MouseEvent) => void }) => (
    <a href="#top" onClick={onClick} className="flex items-baseline gap-1.5 font-display text-2xl text-fg">
      seselka
      <span className="h-1.5 w-1.5 translate-y-[-0.15em] rounded-full bg-accent" aria-hidden="true" />
      <span className="text-sm uppercase tracking-[0.32em] text-muted">Home</span>
    </a>
  );

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center">
      <div
        className="pointer-events-auto mx-4 mt-5 w-full max-w-[1080px] rounded-full border border-line px-5 py-2.5 transition-all duration-500"
        style={{
          transitionTimingFunction: EASE,
          background: tight ? 'color-mix(in oklab, var(--bg) 86%, transparent)' : 'color-mix(in oklab, var(--bg) 64%, transparent)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: tight ? '0 18px 50px -28px rgba(42,37,32,0.45)' : 'none',
        }}
      >
        <nav className="flex items-center justify-between gap-4" aria-label="Birincil">
          <Brand onClick={go('#top')} />

          <ul className="hidden items-center gap-8 text-[0.78rem] font-medium uppercase tracking-[0.16em] text-muted md:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={go(l.href)} className="transition-colors duration-300 hover:text-fg">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={cart.open}
              aria-label={`Sipariş listesi (${cart.count} parça)`}
              className="relative flex h-9 w-9 items-center justify-center rounded-full border border-line text-fg transition-colors duration-300 hover:bg-surface"
            >
              <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 7h14l-1.3 11.1a2 2 0 0 1-2 1.9H8.3a2 2 0 0 1-2-1.9L5 7Z" />
                <path d="M9 7V5a3 3 0 0 1 6 0v2" />
              </svg>
              {cart.count > 0 ? (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent-fill px-1 text-[0.58rem] font-semibold text-on-accent">
                  {cart.count}
                </span>
              ) : null}
            </button>
            <a
              href="#siparis"
              onClick={go('#siparis')}
              className="group hidden items-center gap-2 rounded-full bg-accent-fill py-1.5 pl-5 pr-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-on-accent transition-transform duration-500 active:scale-[0.98] sm:inline-flex"
              style={{ transitionTimingFunction: EASE }}
            >
              Sipariş
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-on-accent/15 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M7 17 17 7M9 7h8v8" />
                </svg>
              </span>
            </a>

            <button
              type="button"
              className="relative h-9 w-9 md:hidden"
              aria-label={open ? 'Menüyü kapat' : 'Menü'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span
                className="absolute left-1/2 top-1/2 h-[1.5px] w-5 -translate-x-1/2 bg-fg transition-all duration-500"
                style={{ transitionTimingFunction: EASE, transform: open ? 'translate(-50%,-50%) rotate(45deg)' : 'translate(-50%,-6px)' }}
              />
              <span
                className="absolute left-1/2 top-1/2 h-[1.5px] w-5 -translate-x-1/2 bg-fg transition-all duration-500"
                style={{ transitionTimingFunction: EASE, transform: open ? 'translate(-50%,-50%) rotate(-45deg)' : 'translate(-50%,4px)' }}
              />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile overlay */}
      <div
        className="pointer-events-auto fixed inset-0 z-40 flex flex-col justify-center px-8 transition-opacity duration-500 md:hidden"
        style={{
          transitionTimingFunction: EASE,
          background: 'color-mix(in oklab, var(--bg) 90%, transparent)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          opacity: open ? 1 : 0,
          visibility: open ? 'visible' : 'hidden',
        }}
      >
        <ul className="space-y-2">
          {[...LINKS, { href: '#siparis', label: 'Sipariş' }].map((l, i) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={go(l.href)}
                className="block font-display text-5xl text-fg transition-all duration-700"
                style={{
                  transitionTimingFunction: EASE,
                  transform: open ? 'translateY(0)' : 'translateY(40px)',
                  opacity: open ? 1 : 0,
                  transitionDelay: open ? `${120 + i * 70}ms` : '0ms',
                }}
              >
                {l.label}
                <span className="text-accent">.</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
