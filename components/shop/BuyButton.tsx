'use client';

import { type Product } from '@/lib/brand';
import { useCart } from '@/components/shop/CartProvider';

type Props = {
  product: Product;
  className?: string;
  /** Runs after the action fires (e.g. close a modal, scroll to the form). */
  onAfterAct?: () => void;
};

/** Dark, full-width add-to-cart (or "Bize yazın" for made-to-order). */
export function BuyButton({ product, className = '', onAfterAct }: Props) {
  const cart = useCart();
  const base =
    'flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-bg bg-fg transition-all duration-500 ease-quiet hover:bg-ink active:scale-[0.99]';

  if (product.custom) {
    return (
      <a href="#siparis" data-stop onClick={onAfterAct} className={`${base} ${className}`}>
        Bize yazın
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" /></svg>
      </a>
    );
  }

  return (
    <button
      type="button"
      data-stop
      onClick={() => {
        cart.add(product.name);
        onAfterAct?.();
      }}
      className={`${base} ${className}`}
    >
      Sipariş listesine ekle
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
    </button>
  );
}
