'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { withBase } from '@/lib/basePath';
import { products } from '@/lib/brand';
import { useLenis } from '@/components/providers/SmoothScrollProvider';
import { RevealText } from '@/components/motion/RevealText';

/** Makers whose pieces are live, grouped so each maker appears once with all of
 *  their pieces (the framed photo uses the lifestyle shot). Hidden left out. */
type MakerGroup = { name: string; handle: string; instagram: string; pieces: { name: string; photo: string; alt: string }[] };
const makers: MakerGroup[] = Object.values(
  products
    .filter((p) => p.maker && !p.hidden)
    .reduce<Record<string, MakerGroup>>((acc, p) => {
      const m = p.maker!;
      (acc[m.instagram] ??= { name: m.name, handle: m.handle, instagram: m.instagram, pieces: [] }).pieces.push({
        name: p.name,
        photo: p.gallery?.[0] ?? p.image,
        alt: p.alt ?? p.name,
      });
      return acc;
    }, {}),
);

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

/** A piece, framed and hung from a nail like a picture on a gallery wall. */
function FramedPiece({ name, photo, alt }: { name: string; photo: string; alt: string }) {
  return (
    <figure className="relative flex flex-col items-center pt-10">
      {/* nail + two wires */}
      <span className="absolute left-1/2 top-0 z-10 h-2 w-2 -translate-x-1/2 rounded-full bg-ink/70 ring-2 ring-linen/40" aria-hidden="true" />
      <span className="absolute left-1/2 top-1.5 h-10 w-px origin-top -rotate-[15deg] bg-ink/25" aria-hidden="true" />
      <span className="absolute left-1/2 top-1.5 h-10 w-px origin-top rotate-[15deg] bg-ink/25" aria-hidden="true" />
      {/* frame */}
      <div className="w-full rounded-[2px] border-[7px] border-[#b08d68] bg-linen p-2 shadow-[0_34px_50px_-22px_rgba(0,0,0,0.55)] transition-transform duration-500 ease-quiet hover:-translate-y-1">
        <div className="relative aspect-square w-full overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element -- gallery photo, static export */}
          <img src={withBase(photo)} alt={alt} loading="lazy" className="h-full w-full object-cover" />
        </div>
      </div>
      <figcaption className="mt-4 text-center font-display text-lg leading-none text-fg">{name}</figcaption>
    </figure>
  );
}

/**
 * "Üreten Eller" exhibition. A short intro with a hero; opening it reveals a
 * full-screen gallery wall where each piece hangs framed from a nail, grouped
 * by maker — emeğe saygı, in an art-gallery feel.
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
              Sergiyi gez
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-on-accent/15 transition-transform duration-500 ease-quiet group-hover:translate-x-0.5 group-hover:-translate-y-0.5">{ARROW}</span>
            </button>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-muted">
            Her sepet, her ilmek bir kadının elinden çıkıyor. Burası onların sergisi: her parça, üreteniyle birlikte, duvarda asılı.
          </p>
        </div>

        {/* wide hero — also opens the gallery */}
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

      {/* ---- full-screen gallery wall ---- */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Üreten Eller — sergi"
        className={`fixed inset-0 z-[95] ${open ? '' : 'pointer-events-none'}`}
      >
        <div
          data-lenis-prevent
          className={`absolute inset-0 overflow-y-auto overscroll-contain bg-surface transition-opacity duration-500 ease-quiet ${open ? 'opacity-100' : 'opacity-0'}`}
          style={{ backgroundImage: 'radial-gradient(120% 90% at 50% -10%, rgba(255,255,255,0.06), transparent 60%)' }}
        >
          <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-line bg-surface/85 px-6 py-4 backdrop-blur-md md:px-10">
            <div>
              <span className="eyebrow">Üreten Eller</span>
              <p className="mt-1.5 font-display text-xl leading-none text-fg sm:text-2xl">Emeğe saygı<span className="text-accent">.</span></p>
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Sergiyi kapat"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-bg/60 text-fg transition-colors duration-300 hover:bg-bg"
            >
              <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
            </button>
          </header>

          <div className="mx-auto max-w-wrap px-6 py-14 md:px-10 md:py-20">
            <p className="mx-auto mb-14 max-w-md text-center text-sm leading-relaxed text-muted md:mb-20">
              Her parçanın arkasında bir el, bir hikâye. Seselka’yı var eden kadınların eserleri. Sayfalarına dokunarak ulaşabilirsiniz.
            </p>

            {makers.map((m) => (
              <section key={m.instagram} className="mb-20 last:mb-0 md:mb-28">
                {/* artist signature */}
                <div className="mb-12 flex flex-col items-center text-center md:mb-16">
                  <a href={m.instagram} target="_blank" rel="noopener noreferrer" className="group/m inline-flex flex-col items-center gap-2">
                    <span className="font-script text-[2.6rem] leading-[0.85] text-accent transition-colors duration-300 group-hover/m:text-fg sm:text-5xl">{m.name}</span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-muted transition-colors duration-300 group-hover/m:text-fg"><InstagramIcon size={13} /> {m.handle}</span>
                  </a>
                </div>
                {/* hung pieces */}
                <div className="grid grid-cols-2 gap-x-7 gap-y-14 sm:grid-cols-3 sm:gap-x-10 md:gap-y-20 lg:grid-cols-4">
                  {m.pieces.map((pc) => (
                    <FramedPiece key={pc.photo} name={pc.name} photo={pc.photo} alt={pc.alt} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
