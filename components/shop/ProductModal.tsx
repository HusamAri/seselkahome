'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { withBase } from '@/lib/basePath';
import { formatPrice, type Product } from '@/lib/brand';
import { useLenis } from '@/components/providers/SmoothScrollProvider';
import { BuyButton } from '@/components/shop/BuyButton';
import { InstagramEmbed } from '@/components/shop/InstagramEmbed';

type Props = {
  /** Product to show; kept mounted through the close transition. */
  active: Product | null;
  open: boolean;
  onClose: () => void;
};

/** Product detail dialog: gallery + price + order CTA, with an optional
 *  "Üreten Eller" block (usage paragraph + maker note + Instagram). */
export function ProductModal({ active, open, onClose }: Props) {
  const lenis = useLenis();
  const closeRef = useRef<HTMLButtonElement>(null);
  const [idx, setIdx] = useState(0);

  // Reset gallery to the first image whenever a new product opens.
  useEffect(() => {
    setIdx(0);
  }, [active?.id]);

  // Esc to close + focus the close button on open.
  useEffect(() => {
    if (!open) return;
    const prevFocus = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    closeRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      prevFocus?.focus?.();
    };
  }, [open, onClose]);

  // Lock background scroll (Lenis + native fallback for reduced-motion).
  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      lenis?.start();
      document.body.style.overflow = prev;
    };
  }, [open, lenis]);

  if (!active) return null;

  const { name, sub, price, meta, desc, use, maker, sold } = active;
  const images = active.gallery?.length ? active.gallery : [active.image];
  const hero = images[Math.min(idx, images.length - 1)];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${name} — ürün detayı`}
      className={`fixed inset-0 z-[90] flex items-end justify-center sm:items-center sm:p-6 ${
        open ? '' : 'pointer-events-none'
      }`}
    >
      {/* backdrop */}
      <button
        type="button"
        aria-label="Kapat"
        tabIndex={-1}
        onClick={onClose}
        className={`absolute inset-0 bg-ink/45 backdrop-blur-[3px] transition-opacity duration-500 ease-quiet ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* panel */}
      <div
        data-lenis-prevent
        className={`relative max-h-[92vh] w-full overflow-y-auto overscroll-contain rounded-t-[1.8rem] bg-card shadow-[0_-30px_80px_-40px_rgba(42,37,32,0.6)] transition-all duration-500 ease-quiet sm:max-w-4xl sm:rounded-[1.8rem] sm:shadow-[0_40px_120px_-50px_rgba(42,37,32,0.7)] ${
          open ? 'translate-y-0 opacity-100 sm:scale-100' : 'translate-y-6 opacity-0 sm:translate-y-0 sm:scale-[0.97]'
        }`}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Kapat"
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-bg/80 text-fg backdrop-blur transition-colors duration-300 hover:bg-surface"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
        </button>

        <div className="grid md:grid-cols-2">
          {/* ---------- media ---------- */}
          <div className="relative flex flex-col gap-4 p-5 sm:p-7">
            <div
              className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.3rem] border border-line"
              style={{ background: 'radial-gradient(120% 100% at 50% 12%, rgba(var(--glow),0.5), transparent 62%)' }}
            >
              <Image
                key={hero}
                src={withBase(hero)}
                alt={sold ? `${name} (satıldı)` : name}
                fill
                priority
                sizes="(min-width:768px) 42vw, 90vw"
                className={`object-contain p-6 drop-shadow-[0_26px_36px_rgba(120,70,25,0.3)] ${sold ? 'opacity-70 grayscale' : ''}`}
              />
              {sold ? (
                <span className="absolute left-4 top-4 rounded-full bg-ink/80 px-3 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-linen">
                  Satıldı
                </span>
              ) : null}
            </div>

            {images.length > 1 ? (
              <div className="flex gap-3">
                {images.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    data-stop
                    onClick={() => setIdx(i)}
                    aria-label={`${name} görsel ${i + 1}`}
                    aria-current={i === idx}
                    className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-[0.8rem] border bg-bg/50 transition-colors ${
                      i === idx ? 'border-accent' : 'border-line hover:border-accent/40'
                    }`}
                  >
                    <Image src={withBase(src)} alt="" fill sizes="64px" className="object-contain p-1.5" />
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          {/* ---------- info ---------- */}
          <div className="flex flex-col px-5 pb-7 sm:px-7 sm:pb-8 md:pt-7">
            <span className="block text-[0.62rem] uppercase tracking-[0.2em] text-muted">{sub}</span>
            <h2 className={`mt-1 font-display text-[2.4rem] leading-[0.95] ${sold ? 'text-muted' : 'text-fg'}`}>
              {name}<span className={sold ? 'text-accent/50' : 'text-accent'}>.</span>
            </h2>

            <div className="mt-3 flex items-center gap-3">
              <span className={`font-display text-2xl leading-none ${sold ? 'text-muted line-through decoration-1' : 'text-fg'}`}>
                {formatPrice(price)}
              </span>
              {sold ? <span className="rounded-full bg-ink/10 px-2.5 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-muted">Tek parça · satıldı</span> : null}
            </div>

            {meta?.length ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {meta.map((m) => (
                  <span key={m} className="rounded-full border border-line px-3 py-1 text-[0.62rem] uppercase tracking-[0.1em] text-muted">{m}</span>
                ))}
              </div>
            ) : null}

            {desc ? <p className="mt-5 text-sm leading-relaxed text-muted">{desc}</p> : null}

            {/* primary action — price is above; order/sold sits right here */}
            <div className="mt-6">
              {sold ? (
                <span
                  aria-disabled="true"
                  className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-full border border-line py-3.5 text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-muted"
                >
                  Satıldı
                </span>
              ) : (
                <BuyButton product={active} onAfterAct={onClose} />
              )}
            </div>

            {use ? (
              <div className="mt-7 border-t border-line pt-6">
                <span className="block text-[0.6rem] uppercase tracking-[0.2em] text-accent">Nasıl yaşar?</span>
                <p className="mt-2 text-sm leading-[1.85] text-fg/80">{use}</p>
              </div>
            ) : null}

            {maker ? (
              <div className="mt-7 border-t border-line pt-6">
                <span className="block text-[0.6rem] uppercase tracking-[0.2em] text-muted">Üreten Eller</span>
                <span className="mt-1 block font-display text-xl leading-none text-fg">{maker.name}</span>
                {maker.note ? <p className="mt-2.5 text-sm leading-[1.85] text-muted">{maker.note}</p> : null}
                <div className="mt-4">
                  <InstagramEmbed name={maker.name} handle={maker.handle} url={maker.instagram} />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
