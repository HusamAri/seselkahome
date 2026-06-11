'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useLenis } from '@/components/providers/SmoothScrollProvider';

export type CartItem = { name: string; qty: number };

type CartCtx = {
  items: CartItem[];
  /** Total quantity across all lines. */
  count: number;
  add: (name: string) => void;
  inc: (name: string) => void;
  dec: (name: string) => void;
  remove: (name: string) => void;
  clear: () => void;
  /** Open the side cart drawer. */
  openCart: () => void;
};

// Safe no-op default so <ProductCard> works even without a provider (e.g. lab).
const Ctx = createContext<CartCtx>({ items: [], count: 0, add: () => {}, inc: () => {}, dec: () => {}, remove: () => {}, clear: () => {}, openCart: () => {} });
export const useCart = () => useContext(Ctx);

const STORE = 'seselka-cart';

/**
 * Real made-to-order cart: a running list of pieces (with quantities) shown in a
 * side drawer, leading into the order form which mails the full list. Persisted
 * to localStorage; no checkout/backend.
 */
export function CartProvider({ children }: { children: React.ReactNode }) {
  const lenis = useLenis();
  const [items, setItems] = useState<CartItem[]>([]);
  const [drawer, setDrawer] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const count = items.reduce((n, i) => n + i.qty, 0);

  // Load + persist.
  useEffect(() => {
    try {
      const s = localStorage.getItem(STORE);
      if (s) setItems(JSON.parse(s));
    } catch {
      /* ignore */
    }
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(STORE, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items]);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 2400);
  }, []);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const add = useCallback((name: string) => {
    setItems((prev) => {
      const ex = prev.find((i) => i.name === name);
      return ex ? prev.map((i) => (i.name === name ? { ...i, qty: i.qty + 1 } : i)) : [...prev, { name, qty: 1 }];
    });
    showToast(`${name} listeye eklendi`);
  }, [showToast]);
  const inc = useCallback((name: string) => setItems((p) => p.map((i) => (i.name === name ? { ...i, qty: i.qty + 1 } : i))), []);
  const dec = useCallback((name: string) => setItems((p) => p.flatMap((i) => (i.name === name ? (i.qty > 1 ? [{ ...i, qty: i.qty - 1 }] : []) : [i]))), []);
  const remove = useCallback((name: string) => setItems((p) => p.filter((i) => i.name !== name)), []);
  const clear = useCallback(() => setItems([]), []);
  const openCart = useCallback(() => setDrawer(true), []);
  const closeCart = useCallback(() => setDrawer(false), []);

  // Drawer: scroll-lock + Esc + focus.
  useEffect(() => {
    if (!drawer) return;
    lenis?.stop();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    };
    document.addEventListener('keydown', onKey);
    closeRef.current?.focus();
    return () => {
      lenis?.start();
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [drawer, lenis, closeCart]);

  const goToOrder = useCallback(() => {
    closeCart();
    const el = document.getElementById('siparis');
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 88;
    setTimeout(() => {
      if (lenis) lenis.scrollTo(y);
      else window.scrollTo({ top: y, behavior: 'smooth' });
    }, 140);
  }, [closeCart, lenis]);

  return (
    <Ctx.Provider value={{ items, count, add, inc, dec, remove, clear, openCart }}>
      {children}

      {/* toast */}
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

      {/* side cart drawer */}
      <div role="dialog" aria-modal="true" aria-label="Sipariş listesi" className={`fixed inset-0 z-[95] ${drawer ? '' : 'pointer-events-none'}`}>
        <button
          type="button"
          aria-hidden="true"
          tabIndex={-1}
          onClick={closeCart}
          className={`absolute inset-0 bg-ink/55 backdrop-blur-[3px] transition-opacity duration-500 ease-quiet ${drawer ? 'opacity-100' : 'opacity-0'}`}
        />
        <aside
          data-lenis-prevent
          className={`absolute right-0 top-0 flex h-full w-[min(92vw,400px)] flex-col border-l border-line bg-bg shadow-[0_0_120px_-20px_rgba(0,0,0,0.6)] transition-transform duration-500 ease-quiet ${
            drawer ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <header className="flex items-start justify-between gap-4 px-6 pt-8">
            <div>
              <span className="eyebrow">Sipariş Listesi</span>
              <h3 className="mt-3 font-display text-[1.8rem] leading-none text-fg">
                {count > 0 ? `${count} parça` : 'Listeniz boş'}
              </h3>
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={closeCart}
              aria-label="Kapat"
              className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-fg transition-colors duration-300 hover:bg-surface"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
            </button>
          </header>

          <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-6">
            {items.length === 0 ? (
              <p className="text-sm leading-relaxed text-muted">
                Henüz parça eklemediniz. Koleksiyondan beğendiklerinizi “Sipariş listesine ekle” ile buraya alın.
              </p>
            ) : (
              <ul className="space-y-5">
                {items.map((it) => (
                  <li key={it.name} className="flex items-center gap-3 border-b border-line/60 pb-5 last:border-0">
                    <span className="flex-1 font-display text-lg leading-tight text-fg">{it.name}</span>
                    <div className="flex items-center gap-3 rounded-full border border-line px-2.5 py-1.5">
                      <button type="button" onClick={() => dec(it.name)} aria-label={`${it.name} azalt`} className="text-fg transition-colors hover:text-accent">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M5 12h14" /></svg>
                      </button>
                      <span className="min-w-4 text-center text-sm tabular-nums text-fg">{it.qty}</span>
                      <button type="button" onClick={() => inc(it.name)} aria-label={`${it.name} artır`} className="text-fg transition-colors hover:text-accent">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
                      </button>
                    </div>
                    <button type="button" onClick={() => remove(it.name)} aria-label={`${it.name} kaldır`} className="text-muted transition-colors hover:text-accent">
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {items.length > 0 ? (
            <footer className="space-y-3 border-t border-line px-6 py-6">
              <button
                type="button"
                onClick={goToOrder}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-fg py-3.5 text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-bg transition-all duration-500 ease-quiet hover:bg-ink active:scale-[0.99]"
              >
                Siparişi tamamla
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </button>
              <button type="button" onClick={clear} className="block w-full text-center text-xs text-muted transition-colors hover:text-accent">
                Listeyi temizle
              </button>
            </footer>
          ) : null}
        </aside>
      </div>
    </Ctx.Provider>
  );
}
