'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { withBase } from '@/lib/basePath';
import { useLenis } from '@/components/providers/SmoothScrollProvider';

const KEY = 'seselka-launch-promo';

/**
 * Launch-special promo, shown once per browser session shortly after load.
 * The banner image is the call-to-action: clicking it dismisses and scrolls to
 * the collection. Dismissal is remembered in sessionStorage. Static-export safe.
 */
export function LaunchPopup() {
  const lenis = useLenis();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Show once per session, a beat after load.
  useEffect(() => {
    try {
      if (sessionStorage.getItem(KEY)) return;
    } catch {
      /* storage blocked — still show */
    }
    setMounted(true);
    const t = setTimeout(() => setOpen(true), 700);
    return () => clearTimeout(t);
  }, []);

  const dismiss = useCallback(() => {
    setOpen(false);
    try {
      sessionStorage.setItem(KEY, '1');
    } catch {
      /* ignore */
    }
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setMounted(false), 450);
  }, []);

  // Lock scroll + Esc + focus while open.
  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss();
    };
    document.addEventListener('keydown', onKey);
    closeRef.current?.focus();
    return () => {
      lenis?.start();
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [open, lenis, dismiss]);

  useEffect(() => () => { if (hideTimer.current) clearTimeout(hideTimer.current); }, []);

  const shop = useCallback(() => {
    dismiss();
    const el = document.getElementById('koleksiyon');
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 88;
    setTimeout(() => {
      if (lenis) lenis.scrollTo(y);
      else window.scrollTo({ top: y, behavior: 'smooth' });
    }, 140);
  }, [dismiss, lenis]);

  if (!mounted) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Açılışa özel indirim"
      className={`fixed inset-0 z-[95] flex items-center justify-center p-4 sm:p-6 ${open ? '' : 'pointer-events-none'}`}
    >
      <button
        type="button"
        aria-hidden="true"
        tabIndex={-1}
        onClick={dismiss}
        className={`absolute inset-0 bg-ink/55 backdrop-blur-[3px] transition-opacity duration-500 ease-quiet ${open ? 'opacity-100' : 'opacity-0'}`}
      />
      <div
        className={`relative w-[92vw] max-w-[680px] transition-all duration-500 ease-quiet ${
          open ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-4 scale-[0.97] opacity-0'
        }`}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={dismiss}
          aria-label="Kapat"
          className="absolute -right-3 -top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-bg text-fg shadow-[0_12px_30px_-12px_rgba(42,37,32,0.6)] transition-colors duration-300 hover:bg-surface"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
        </button>

        <button
          type="button"
          onClick={shop}
          aria-label="Açılışa özel %30 indirim — alışverişe başla"
          className="block w-full overflow-hidden rounded-[1.4rem] shadow-[0_40px_120px_-40px_rgba(42,37,32,0.7)]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- intrinsic-aspect promo art, static export */}
          <img
            src={withBase('/assets/launch-promo.webp')}
            alt="Açılışa özel %30 indirim — seçili ürünlerde geçerli"
            className="block h-auto w-full"
          />
        </button>
      </div>
    </div>
  );
}
