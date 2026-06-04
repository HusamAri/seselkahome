'use client';

import { createContext, useCallback, useContext, useRef, useState } from 'react';
import type { Product } from '@/lib/brand';
import { ProductModal } from '@/components/shop/ProductModal';

type Ctx = { open: (p: Product) => void; close: () => void };
const Ctx = createContext<Ctx>({ open: () => {}, close: () => {} });
export const useProductModal = () => useContext(Ctx);

/**
 * Owns the product-detail dialog. `active` stays mounted through the close
 * transition (so it can fade out); `shown` drives the open/close animation.
 */
export function ProductModalProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState<Product | null>(null);
  const [shown, setShown] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const open = useCallback((p: Product) => {
    if (timer.current) clearTimeout(timer.current);
    setActive(p);
    // Mount first, then flip to "shown" on the next frame so the transition runs.
    requestAnimationFrame(() => setShown(true));
  }, []);

  const close = useCallback(() => {
    setShown(false);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setActive(null), 500);
  }, []);

  return (
    <Ctx.Provider value={{ open, close }}>
      {children}
      <ProductModal active={active} open={shown} onClose={close} />
    </Ctx.Provider>
  );
}
