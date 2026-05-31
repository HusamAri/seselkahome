import Image from 'next/image';
import Link from 'next/link';
import { withBase } from '@/lib/basePath';
import { formatPrice } from '@/lib/brand';

type Props = {
  name: string;
  price?: number | null;
  image: string;
  href?: string;
  sub?: string;
  badge?: string;
  cta?: string;
  priority?: boolean;
  sizes?: string;
};

/**
 * Commerce product card. Double-bezel enclosure (outer shell + inner core),
 * gentle hover scale, display-serif name with the ember signature dot, price,
 * and a button-in-button CTA. Buyable, not decorative.
 */
export function ProductCard({
  name,
  price,
  image,
  href = '#',
  sub,
  badge,
  cta = 'İncele',
  priority = false,
  sizes = '(min-width:1024px) 30vw, (min-width:640px) 45vw, 90vw',
}: Props) {
  return (
    <Link href={href} className="group block focus:outline-none">
      {/* outer shell */}
      <div className="rounded-[1.6rem] border border-line bg-surface/30 p-2 transition-colors duration-500 ease-quiet group-hover:border-accent/30">
        {/* inner core */}
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.15rem] bg-surface">
          <Image
            src={withBase(image)}
            alt={name}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover transition-transform duration-[900ms] ease-quiet group-hover:scale-[1.05] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
          {badge ? (
            <span className="absolute left-3 top-3 rounded-full border border-line bg-bg/80 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-fg backdrop-blur-sm">
              {badge}
            </span>
          ) : null}
        </div>
      </div>

      <div className="mt-5 flex items-baseline justify-between gap-4 px-1">
        <div className="min-w-0">
          {sub ? <span className="block truncate text-[0.66rem] uppercase tracking-[0.2em] text-muted">{sub}</span> : null}
          <h3 className="mt-1 font-display text-[1.7rem] leading-none text-fg">
            {name}
            <span className="text-accent">.</span>
          </h3>
        </div>
        <span className="shrink-0 font-body text-sm tabular-nums text-fg/70">{formatPrice(price ?? null)}</span>
      </div>

      <span className="mt-4 inline-flex items-center gap-2.5 px-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-fg">
        {cta}
        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-line transition-transform duration-500 ease-quiet group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M7 17 17 7M9 7h8v8" />
          </svg>
        </span>
      </span>
    </Link>
  );
}
