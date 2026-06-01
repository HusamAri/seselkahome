'use client';

import { createContext, useCallback, useContext, useRef, useState } from 'react';

type CartCtx = {
  count: number;
  /** Add a piece by name (increments count + shows a toast). */
  add: (name: string) => void;
  /** Cart button: empty -> hint, otherwise route to the order form. */
  open: () => void;
};

// Safe no-op default so <ProductCard> works even without a provider (e.g. lab).
const Ctx = createContext<CartCtx>({ count: 0, add: () => {}, open: () => {} });
export const useCart = () => useContext(Ctx);

/**
 * Lightweight shop cart for a made-to-order brand: a running selection that
 * leads into the order form. No checkout/backend. Renders a calm toast.
 */
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 2400);
  }, []);

  const add = useCallback(
    (name: string) => {
      setCount((c) => c + 1);
      showToast(`${name} listeye eklendi`);
    },
    [showToast],
  );

  const open = useCallback(() => {
    setCount((c) => {
      if (c === 0) showToast('Listeniz henüz boş');
      else {
        showToast(`${c} parça · Siparişi Detaylandırın`);
        const el = document.getElementById('siparis');
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 88;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
      return c;
    });
  }, [showToast]);

  return (
    <Ctx.Provider value={{ count, add, open }}>
      {children}
      <div
        aria-live="polite"
        className={`fixed bottom-6 left-1/2 z-[70] -translate-x-1/2 rounded-full border border-line bg-bg/90 px-5 py-3 text-sm text-fg shadow-[0_18px_50px_-28px_rgba(42,37,32,0.5)] backdrop-blur-md transition-all duration-500 ease-quiet ${
          toast ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
        }`}
      >
        <b className="font-display text-base">Seselka</b>
        <span className="mx-1.5 text-line">·</span>
        {toast ?? ''}
      </div>
    </Ctx.Provider>
  );
}
