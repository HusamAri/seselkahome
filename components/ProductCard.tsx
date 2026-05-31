'use client';

import Image from 'next/image';
import { withBase } from '@/lib/basePath';
import { formatPrice, type Product } from '@/lib/brand';
import { useCart } from '@/components/shop/CartProvider';

type Props = {
  product: Product;
  /** Large editorial split layout (the lead piece). */
  featured?: boolean;
  priority?: boolean;
};

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}
function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

/** Add-to-cart (or "Sipariş ver" for made-to-order) — button-in-button. */
function BuyButton({ product }: { product: Product }) {
  const cart = useCart();
  if (product.custom) {
    return (
      <a
        href="#siparis"
        className="group/btn flex w-full items-center justify-between rounded-full border border-line py-2 pl-5 pr-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-fg transition-colors duration-500 ease-quiet hover:border-accent/40 hover:bg-bg"
      >
        Sipariş ver
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-fill text-on-accent transition-transform duration-500 ease-quiet group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5">
          <ArrowIcon />
        </span>
      </a>
    );
  }
  return (
    <button
      type="button"
      onClick={() => cart.add(product.name)}
      className="group/btn flex w-full items-center justify-between rounded-full border border-line py-2 pl-5 pr-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-fg transition-colors duration-500 ease-quiet hover:border-accent/40 hover:bg-surface active:scale-[0.99]"
    >
      Sepete ekle
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-fill text-on-accent transition-transform duration-500 ease-quiet group-hover/btn:rotate-90">
        <PlusIcon />
      </span>
    </button>
  );
}

function Price({ product }: { product: Product }) {
  return <span className="shrink-0 font-display text-xl text-fg sm:text-2xl">{formatPrice(product.price)}</span>;
}

function MetaLine({ product }: { product: Product }) {
  if (!product.meta?.length) return null;
  return <span className="mt-3 block text-[0.62rem] uppercase tracking-[0.18em] text-muted">{product.meta.join(' · ')}</span>;
}

export function ProductCard({ product, featured = false, priority = false }: Props) {
  const { name, image, sub, badge, desc } = product;

  // Made-to-order card: wax seal, no photo, routes to the form.
  if (product.custom) {
    return (
      <article className="flex flex-col justify-between rounded-[1.6rem] border border-line bg-surface/40 p-7">
        <div>
          <Image src={withBase(image)} alt="" width={48} height={48} className="h-12 w-12 object-contain opacity-80" />
          <span className="mt-5 block text-[0.62rem] uppercase tracking-[0.2em] text-muted">{sub}</span>
          <h3 className="mt-1 font-display text-[1.7rem] leading-none text-fg">
            Aklınızdaki parça <span className="text-accent">için</span>
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">{desc}</p>
        </div>
        <div className="mt-6">
          <BuyButton product={product} />
        </div>
      </article>
    );
  }

  if (featured) {
    return (
      <article className="group grid items-center gap-8 md:grid-cols-2 md:gap-14">
        <div className="rounded-[2rem] border border-line bg-surface/30 p-2.5">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.6rem] bg-surface">
            <Image
              src={withBase(image)}
              alt={name}
              fill
              sizes="(min-width:768px) 50vw, 90vw"
              priority={priority}
              className="object-cover transition-transform duration-[900ms] ease-quiet group-hover:scale-[1.04] motion-reduce:group-hover:scale-100"
            />
            {badge ? (
              <span className="absolute left-3 top-3 rounded-full border border-line bg-bg/80 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-fg backdrop-blur-sm">
                {badge}
              </span>
            ) : null}
          </div>
        </div>
        <div>
          <span className="text-[0.66rem] uppercase tracking-[0.2em] text-muted">{sub}</span>
          <h3 className="mt-1.5 font-display text-[clamp(2.25rem,5vw,3.5rem)] leading-[0.95] text-fg">
            {name}
            <span className="text-accent">.</span>
          </h3>
          {desc ? <p className="mt-5 max-w-md text-base leading-relaxed text-fg/75">{desc}</p> : null}
          <MetaLine product={product} />
          <div className="mt-7 flex items-center gap-6">
            <Price product={product} />
            <div className="w-44"><BuyButton product={product} /></div>
          </div>
        </div>
      </article>
    );
  }

  // Standard shop card.
  return (
    <article className="group flex flex-col">
      <div className="rounded-[1.4rem] border border-line bg-surface/30 p-2 transition-colors duration-500 ease-quiet group-hover:border-accent/30">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1rem] bg-surface">
          <Image
            src={withBase(image)}
            alt={name}
            fill
            sizes="(min-width:1024px) 24vw, (min-width:640px) 45vw, 90vw"
            priority={priority}
            className="object-cover transition-transform duration-[900ms] ease-quiet group-hover:scale-[1.05] motion-reduce:group-hover:scale-100"
          />
          {badge ? (
            <span className="absolute left-3 top-3 rounded-full border border-line bg-bg/80 px-2.5 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-fg backdrop-blur-sm">
              {badge}
            </span>
          ) : null}
        </div>
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-3 px-1">
        <div className="min-w-0">
          {sub ? <span className="block truncate text-[0.62rem] uppercase tracking-[0.18em] text-muted">{sub}</span> : null}
          <h3 className="mt-0.5 font-display text-2xl leading-none text-fg">
            {name}
            <span className="text-accent">.</span>
          </h3>
        </div>
        <Price product={product} />
      </div>

      {desc ? <p className="mt-2 px-1 text-sm leading-relaxed text-muted">{desc}</p> : null}

      <div className="mt-4 px-1">
        <BuyButton product={product} />
      </div>
    </article>
  );
}
