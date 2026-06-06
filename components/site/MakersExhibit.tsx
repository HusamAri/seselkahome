'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { withBase } from '@/lib/basePath';
import { products } from '@/lib/brand';
import { useLenis } from '@/components/providers/SmoothScrollProvider';
import { RevealText } from '@/components/motion/RevealText';

/** Makers whose pieces are currently live (hidden products are left out). */
const makers = products
  .filter((p) => p.maker && !p.hidden)
  .map((p) => ({ ...p.maker!, piece: p.name, sub: p.sub, cutout: p.image }));

function InstagramIcon({ size = 15 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

const ARROW = (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" /></svg>
);

/**
 * "Üreten Eller" — a small exhibition honouring the makers. A short intro with
 * a hero image; clicking it slides a slim gallery drawer in from the side where
 * each maker's Instagram sits beside their piece, hung like a gallery exhibit.
 */
export function MakersExhibit() {
  const lenis = useLenis();
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    closeRef.current?.focus();
    return () => {
      lenis?.start();
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [open, lenis, close]);

  return (
    <>
      <div>
        {/* header */}
        <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <span className="eyebrow">Sergi · Üreten Eller</span>
            <RevealText
              as="h2"
              text={['Görünmeyen emeği,', 'görünür kılmak.']}
              className="mt-5 text-fg"
              lineClassName="font-display font-medium text-[clamp(2.25rem,5vw,4rem)] leading-[0.95]"
            />
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={open}
              className="group mt-8 inline-flex items-center gap-2.5 rounded-full bg-accent-fill py-2 pl-6 pr-2 text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-on-accent transition-transform duration-500 ease-quiet hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Üreten elleri keşfet
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-on-accent/15 transition-transform duration-500 ease-quiet group-hover:translate-x-0.5 group-hover:-translate-y-0.5">{ARROW}</span>
            </button>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-muted">
            Her sepet, her ilmek bir kadının elinden çıkıyor. Burası onların sergisi: ürettikleri parçayı ve kendi sayfalarını yan yana, saygıyla.
          </p>
        </div>

        {/* wide hero — a gallery banner; also opens the drawer */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Üreten Eller sergisini aç"
          aria-haspopup="dialog"
          className="group relative mt-12 block w-full overflow-hidden rounded-[1.9rem] border border-line shadow-[0_50px_90px_-50px_rgba(120,70,25,0.45)] md:mt-14"
        >
          <div className="aspect-[16/9] w-full overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element -- intrinsic-aspect art, static export */}
            <img
              src={withBase('/assets/ureten-eller-hero.webp')}
              alt="Üreten eller — ellerinde örgü şekillenen bir kadın"
              className="h-full w-full object-cover transition-transform duration-[1.2s] ease-quiet group-hover:scale-[1.04]"
            />
          </div>
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/5 to-transparent" />
          <span className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full bg-bg/85 px-4 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-fg backdrop-blur transition-transform duration-500 ease-quiet group-hover:-translate-y-0.5">
            Sergiyi aç {ARROW}
          </span>
        </button>
      </div>

      {/* ---- gallery drawer ---- */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Üreten Eller — sergi"
        className={`fixed inset-0 z-[90] ${open ? '' : 'pointer-events-none'}`}
      >
        <button
          type="button"
          aria-hidden="true"
          tabIndex={-1}
          onClick={close}
          className={`absolute inset-0 bg-ink/55 backdrop-blur-[3px] transition-opacity duration-500 ease-quiet ${open ? 'opacity-100' : 'opacity-0'}`}
        />
        <aside
          data-lenis-prevent
          className={`absolute right-0 top-0 flex h-full w-[min(92vw,430px)] flex-col overflow-y-auto overscroll-contain border-l border-line bg-surface shadow-[0_0_120px_-20px_rgba(0,0,0,0.6)] transition-transform duration-500 ease-quiet ${open ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <header className="flex items-start justify-between gap-4 px-7 pt-8">
            <div>
              <span className="eyebrow">Üreten Eller</span>
              <h3 className="mt-3 font-display text-[2rem] leading-none text-fg">Emeğe saygı<span className="text-accent">.</span></h3>
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Kapat"
              className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-fg transition-colors duration-300 hover:bg-bg"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
            </button>
          </header>

          <p className="mt-4 px-7 text-sm leading-relaxed text-muted">
            Her parçanın arkasında bir el, bir hikâye. Seselka’yı var eden kadınların imzası — her birinin sayfasına dokununca ulaşırsınız.
          </p>

          <ul className="mt-2 px-7 pb-10">
            {makers.map((m) => (
              <li key={m.handle} className="border-b border-line/70 last:border-0">
                <a
                  href={m.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/m flex items-start gap-5 py-7"
                >
                  {/* the piece, hung like an exhibit */}
                  <div className="relative flex w-20 shrink-0 flex-col items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-muted/70" aria-hidden="true" />
                    <span className="h-6 w-px bg-line" aria-hidden="true" />
                    {/* eslint-disable-next-line @next/next/no-img-element -- transparent cutout, static export */}
                    <img
                      src={withBase(m.cutout)}
                      alt={m.piece}
                      className="mt-1 h-20 w-20 object-contain drop-shadow-[0_16px_18px_rgba(0,0,0,0.4)] transition-transform duration-500 ease-quiet group-hover/m:-translate-y-1"
                    />
                  </div>
                  {/* placard */}
                  <div className="flex-1 pt-3">
                    <span className="block text-[0.55rem] uppercase tracking-[0.2em] text-muted">{m.piece}</span>
                    <span className="mt-1.5 block font-display text-xl leading-none text-fg">{m.name}</span>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors group-hover/m:text-fg">
                      <InstagramIcon /> {m.handle}
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </>
  );
}
