'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import type { Product } from '@/lib/brand';
import { ProductModal } from '@/components/shop/ProductModal';

type Ctx = { open: (p: Product) => void; close: () => void };
const Ctx = createContext<Ctx>({ open: () => {}, close: () => {} });
export const useProductModal = () => useContext(Ctx);

/**
 * Owns the product-detail dialog. `active` stays mounted through the close
 * transition (so it can fade out); `shown` drives the open/close animation.
 * While a product is active the rest of the page is marked `inert` so focus and
 * the screen-reader cursor stay inside the dialog.
 */
export function ProductModalProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState<Product | null>(null);
  const [shown, setShown] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const bgRef = useRef<HTMLDivElement>(null);

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

  // Inert the rest of the page (everything but the dialog) while it's open.
  useEffect(() => {
    if (bgRef.current) bgRef.current.inert = active != null;
  }, [active]);

  // Clear any pending close timer on unmount.
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  return (
    <Ctx.Provider value={{ open, close }}>
      <div ref={bgRef}>{children}</div>
      <ProductModal active={active} open={shown} onClose={close} />
    </Ctx.Provider>
  );
}
