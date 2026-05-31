import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/lib/brand';

type Props = {
  name: string;
  price?: number | null;
  image: string;
  href?: string;
  sub?: string;
  badge?: string;
  /** Calm CTA label. Commerce-first default. */
  cta?: string;
  priority?: boolean;
  sizes?: string;
};

/**
 * Commerce product card. Image holds a gentle hover scale (no flashy overlay),
 * name in the display serif with the ember signature dot, price, and a calm CTA.
 * Built to feel buyable, not decorative.
 */
export function ProductCard({
  name,
  price,
  image,
  href = '#',
  sub,
  badge,
  cta = 'Sepete ekle',
  priority = false,
  sizes = '(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw',
}: Props) {
  return (
    <Link href={href} className="group block focus:outline-none">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[3px] bg-surface">
        <Image
          src={image}
          alt={name}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-700 ease-quiet group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
        {badge ? (
          <span className="absolute left-3 top-3 bg-bg/85 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-fg backdrop-blur-sm">
            {badge}
          </span>
        ) : null}
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-4">
        <div className="min-w-0">
          {sub ? (
            <span className="block truncate text-[0.68rem] uppercase tracking-[0.18em] text-muted">{sub}</span>
          ) : null}
          <h3 className="font-display text-2xl leading-none text-fg">
            {name}
            <span className="text-accent">.</span>
          </h3>
        </div>
        <span className="shrink-0 font-body text-sm tabular-nums text-fg/80">{formatPrice(price ?? null)}</span>
      </div>

      <span className="mt-3 inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-fg">
        {cta}
        <span className="inline-block transition-transform duration-500 ease-quiet group-hover:translate-x-1 motion-reduce:transition-none">
          &rarr;
        </span>
      </span>
    </Link>
  );
}
