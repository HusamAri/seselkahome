'use client';

import { formatPrice, launchDiscount, salePrice, type Product } from '@/lib/brand';

/**
 * Price display with the launch discount: shows the discounted price with the
 * full price struck through and a quiet "Açılışa özel · %30" line. Sold pieces
 * show the (struck) value; made-to-order shows "Konuşalım".
 */
export function PriceTag({ product, size = 'card' }: { product: Product; size?: 'card' | 'modal' }) {
  const { price, custom, sold } = product;
  const big = size === 'modal' ? 'text-2xl tabular-nums' : 'text-[1.9rem] tabular-nums';

  if (custom || price == null) {
    return <span className={`font-display ${big} leading-none text-fg`}>Konuşalım</span>;
  }

  if (sold) {
    return <span className={`font-display ${big} leading-none text-muted line-through decoration-1`}>{formatPrice(price)}</span>;
  }

  // Excluded from the launch discount — flat full price.
  if (product.noDiscount) {
    return <span className={`font-display ${big} leading-none text-fg`}>{formatPrice(price)}</span>;
  }

  const sale = salePrice(price);
  const pct = Math.round(launchDiscount * 100);
  return (
    <span className="flex flex-col gap-1.5">
      <span className="flex items-baseline gap-2">
        <span className={`font-display ${big} leading-none text-fg`}>{formatPrice(sale)}</span>
        <span className="text-sm text-muted line-through decoration-1">{formatPrice(price)}</span>
      </span>
      <span className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-accent">Açılışa özel · %{pct}</span>
    </span>
  );
}
