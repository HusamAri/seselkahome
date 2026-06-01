'use client';

import Image from 'next/image';
import { withBase } from '@/lib/basePath';
import { formatPrice, type Product } from '@/lib/brand';
import { useCart } from '@/components/shop/CartProvider';

type Props = { product: Product; priority?: boolean };

/** Dark, full-width add-to-cart (or "Sipariş ver" for made-to-order). */
function BuyButton({ product, className = '' }: { product: Product; className?: string }) {
  const cart = useCart();
  const base =
    'flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-bg bg-fg transition-all duration-500 ease-quiet hover:bg-ink active:scale-[0.99]';
  if (product.custom) {
    return (
      <a href="#siparis" className={`${base} ${className}`}>
        Bize yazın
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" /></svg>
      </a>
    );
  }
  return (
    <button type="button" onClick={() => cart.add(product.name)} className={`${base} ${className}`}>
      Sipariş listesine ekle
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
    </button>
  );
}

export function ProductCard({ product, priority = false }: Props) {
  const { name, image, sub, badge, desc, price, meta } = product;

  // Made-to-order — wide card with the wax seal, routes to the form.
  if (product.custom) {
    return (
      <article className="flex flex-col items-start gap-6 rounded-[1.7rem] bg-card p-7 shadow-[0_30px_60px_-38px_rgba(120,70,25,0.45)] sm:col-span-2 sm:flex-row sm:items-center lg:col-span-3">
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

  // Sold piece — dimmed, not orderable.
  if (product.sold) {
    return (
      <article className="relative flex flex-col">
        <span className="absolute left-4 top-3 z-20 rounded-full bg-ink/80 px-3 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-linen">
          Satıldı
        </span>

        <div className="relative z-10 -mb-16 flex h-52 items-end justify-center px-8">
          <div
            className="relative h-full w-full origin-bottom opacity-55 grayscale"
            style={{ transform: `scale(${product.scale ?? 1})` }}
          >
            <Image
              src={withBase(image)}
              alt={`${name} (satıldı)`}
              fill
              priority={priority}
              sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 90vw"
              className="object-contain object-bottom drop-shadow-[0_22px_28px_rgba(120,70,25,0.18)]"
            />
          </div>
        </div>

        <div className="rounded-[1.7rem] bg-card/70 px-6 pb-6 pt-20 shadow-[0_34px_64px_-44px_rgba(120,70,25,0.4)]">
          <div className="flex items-start justify-between gap-3">
            <span className="font-display text-[1.9rem] leading-none text-muted line-through decoration-1">{formatPrice(price)}</span>
            {meta?.[0] ? (
              <span className="shrink-0 rounded-full border border-line px-3 py-1 text-[0.62rem] uppercase tracking-[0.1em] text-muted">{meta[0]}</span>
            ) : null}
          </div>
          <span className="mt-4 block text-[0.62rem] uppercase tracking-[0.2em] text-muted">{sub}</span>
          <h3 className="mt-1 font-display text-2xl leading-none text-muted">
            {name}
            <span className="text-accent/50">.</span>
          </h3>
          {desc ? <p className="mt-2 text-sm leading-relaxed text-muted/80">{desc}</p> : null}
          <div className="mt-6">
            <span
              aria-disabled="true"
              className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-full border border-line py-3.5 text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-muted"
            >
              Satıldı
            </span>
          </div>
        </div>
      </article>
    );
  }

  // Standard cutout card — product floats above a warm-white card.
  return (
    <article className="group relative flex flex-col">
      {badge ? (
        <span className="absolute left-4 top-3 z-20 rounded-full bg-accent-fill px-3 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-on-accent">
          {badge}
        </span>
      ) : null}

      <div className="relative z-10 -mb-16 flex h-52 items-end justify-center px-8">
        <div className="relative h-full w-full transition-transform duration-700 ease-quiet group-hover:-translate-y-2 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
          <div className="relative h-full w-full origin-bottom" style={{ transform: `scale(${product.scale ?? 1})` }}>
            <Image
              src={withBase(image)}
              alt={name}
              fill
              priority={priority}
              sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 90vw"
              className="object-contain object-bottom drop-shadow-[0_22px_28px_rgba(120,70,25,0.3)]"
            />
          </div>
        </div>
      </div>

      <div className="rounded-[1.7rem] bg-card px-6 pb-6 pt-20 shadow-[0_34px_64px_-36px_rgba(120,70,25,0.5)]">
        <div className="flex items-start justify-between gap-3">
          <span className="font-display text-[1.9rem] leading-none text-fg">{formatPrice(price)}</span>
          {meta?.[0] ? (
            <span className="shrink-0 rounded-full border border-line px-3 py-1 text-[0.62rem] uppercase tracking-[0.1em] text-muted">{meta[0]}</span>
          ) : null}
        </div>
        <span className="mt-4 block text-[0.62rem] uppercase tracking-[0.2em] text-muted">{sub}</span>
        <h3 className="mt-1 font-display text-2xl leading-none text-fg">
          {name}
          <span className="text-accent">.</span>
        </h3>
        {desc ? <p className="mt-2 text-sm leading-relaxed text-muted">{desc}</p> : null}
        <div className="mt-6">
          <BuyButton product={product} />
        </div>
      </div>
    </article>
  );
}
