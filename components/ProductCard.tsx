'use client';

import Image from 'next/image';
import { withBase } from '@/lib/basePath';
import { type Product } from '@/lib/brand';
import { BuyButton } from '@/components/shop/BuyButton';
import { InstagramIcon } from '@/components/shop/InstagramIcon';
import { PriceTag } from '@/components/shop/PriceTag';
import { useProductModal } from '@/components/shop/ProductModalProvider';

type Props = { product: Product; priority?: boolean };

// Largest real piece (the mirror) fills the stage; others scale by real cm.
const MAX_CM = 50;
const MIN_RATIO = 0.46; // floor so the smallest piece is still substantial

function sizePct(cm?: number) {
  const r = Math.max(MIN_RATIO, Math.min(1, (cm ?? 30) / MAX_CM));
  return `${Math.round(r * 100)}%`;
}

export function ProductCard({ product, priority = false }: Props) {
  const { name, image, sub, badge, desc, meta, sold, custom } = product;
  const modal = useProductModal();

  // Made-to-order — full-width banner card with the wax seal (no detail modal).
  if (custom) {
    return (
      <article className="flex h-full flex-col items-start gap-6 rounded-[1.7rem] bg-card p-7 shadow-[0_30px_60px_-38px_rgba(120,70,25,0.45)] sm:flex-row sm:items-center">
        <Image src={withBase(image)} alt="" width={72} height={72} className="h-16 w-16 shrink-0 object-contain opacity-90" />
        <div className="flex-1">
          <span className="block text-[0.62rem] uppercase tracking-[0.2em] text-muted">{sub}</span>
          <h3 className="mt-1 font-display text-[1.9rem] leading-none text-fg">
            Yaşam alanınıza <span className="italic text-accent">özel</span>
          </h3>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">{desc}</p>
        </div>
        <div className="w-full sm:w-52">
          <BuyButton product={product} />
        </div>
      </article>
    );
  }

  const dim = sold ? 'opacity-55 grayscale' : '';

  // Mouse: a click anywhere on the card (except real controls) opens the detail
  // modal. Keyboard/AT users get the dedicated "detay" button (top-right).
  function activate(e: React.MouseEvent) {
    if ((e.target as HTMLElement).closest('[data-stop]')) return;
    modal.open(product);
  }

  return (
    <article onClick={activate} className="group relative flex h-full cursor-pointer flex-col">
      <span
        className={`absolute left-4 top-4 z-20 rounded-full px-3 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.16em] ${
          sold ? 'bg-ink/80 text-linen' : badge ? 'bg-accent-fill text-on-accent' : 'hidden'
        }`}
      >
        {sold ? 'Satıldı' : badge}
      </span>

      {/* detail trigger — the accessible, focusable control; cue on hover/focus */}
      <button
        type="button"
        data-stop
        onClick={() => modal.open(product)}
        aria-label={`${name} detaylarını gör`}
        className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-line bg-bg/70 text-fg opacity-0 backdrop-blur transition-all duration-500 ease-quiet group-hover:opacity-100 focus-visible:opacity-100 motion-reduce:opacity-100"
      >
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" /></svg>
      </button>

      {/* image stage — fixed height for every card; cutout sized by real cm */}
      <div className="relative z-10 -mb-14 flex h-64 items-end justify-center px-6">
        <div
          className={`relative h-full ${dim} ${
            sold ? '' : 'transition-transform duration-700 ease-quiet group-hover:-translate-y-2 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0'
          }`}
          style={{ width: sizePct(product.cm) }}
        >
          <Image
            src={withBase(image)}
            alt={sold ? `${name} (satıldı)` : name}
            fill
            priority={priority}
            sizes="(min-width:1024px) 26vw, (min-width:640px) 60vw, 80vw"
            className="object-contain object-bottom drop-shadow-[0_22px_30px_rgba(120,70,25,0.28)]"
          />
        </div>
      </div>

      {/* text block — flex-1 so all cards end at the same height */}
      <div className={`flex flex-1 flex-col rounded-[1.7rem] px-6 pb-6 pt-20 shadow-[0_34px_64px_-36px_rgba(120,70,25,0.5)] ${sold ? 'bg-card/70' : 'bg-card'}`}>
        <div className="flex items-start justify-between gap-3">
          <PriceTag product={product} size="card" />
          {meta?.[0] ? (
            <span className="shrink-0 rounded-full border border-line px-3 py-1 text-[0.62rem] uppercase tracking-[0.1em] text-muted">{meta[0]}</span>
          ) : null}
        </div>
        <span className="mt-4 block text-[0.62rem] uppercase tracking-[0.2em] text-muted">{sub}</span>
        <h3 className={`mt-1 font-display text-2xl leading-none ${sold ? 'text-muted' : 'text-fg'}`}>
          {name}
          <span className={sold ? 'text-accent/50' : 'text-accent'}>.</span>
        </h3>
        {desc ? <p className="mt-2 text-sm leading-relaxed text-muted">{desc}</p> : null}
        {product.maker ? <MakerTag maker={product.maker} /> : null}

        {/* CTA pinned to the bottom of every card */}
        <div className="mt-6 pt-2 [margin-top:auto]">
          {sold ? (
            <span
              aria-disabled="true"
              className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-full border border-line py-3.5 text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-muted"
            >
              Satıldı
            </span>
          ) : (
            <BuyButton product={product} />
          )}
        </div>
      </div>
    </article>
  );
}

/**
 * Maker credit: a tag showing "Üreten Eller: Banu Kayaalp"; on hover/focus the
 * panel behind it reveals the Instagram-linked handle. data-stop keeps a tap
 * from also opening the product modal — it goes straight to Instagram.
 */
function MakerTag({ maker }: { maker: NonNullable<Product['maker']> }) {
  return (
    <a
      href={maker.instagram}
      target="_blank"
      rel="noopener noreferrer"
      data-noscroll
      data-stop
      aria-label={`Üreten Eller: ${maker.name} — Instagram ${maker.handle}`}
      className="group/mk mt-5 block overflow-hidden rounded-[1rem] border border-line bg-bg/50 transition-colors duration-300 hover:border-accent/40 focus-visible:border-accent/40"
    >
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div>
          <span className="block text-[0.56rem] uppercase tracking-[0.2em] text-muted">Üreten Eller</span>
          <span className="mt-0.5 block font-display text-lg leading-none text-fg">{maker.name}</span>
        </div>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-fg transition-all duration-300 group-hover/mk:border-accent/40 group-hover/mk:bg-accent-fill group-hover/mk:text-on-accent">
          <InstagramIcon />
        </span>
      </div>
      <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-quiet group-hover/mk:grid-rows-[1fr] group-focus-visible/mk:grid-rows-[1fr]">
        <div className="overflow-hidden">
          <div className="flex items-center gap-2 border-t border-line px-4 py-2.5 text-[0.8rem] font-medium text-accent">
            <InstagramIcon />
            {maker.handle}
          </div>
        </div>
      </div>
    </a>
  );
}
