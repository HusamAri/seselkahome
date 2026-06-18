/**
 * Branded 404 — calm Seselka voice, on-brand warm composition, a clear way back.
 * Renders inside RootLayout (fonts + grain + bg), so it only needs its content.
 * Static export emits this as out/404.html (GitHub Pages serves it on 404).
 */
export default function NotFound() {
  return (
    <main className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-bg px-6 py-24 text-center text-fg">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[760px] max-w-[120vw] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(var(--glow), 0.45), transparent 64%)' }}
      />
      <div className="relative">
        <span className="eyebrow">404</span>
        <h1 className="mt-6 font-display font-medium leading-[0.86] text-fg text-[clamp(3rem,12vw,8rem)]">
          İpin ucu<br />kaçmış.
        </h1>
        <p className="mx-auto mt-7 max-w-md text-base leading-relaxed text-muted">
          Aradığınız sayfa örülmemiş ya da başka bir köşeye taşınmış olabilir. Sizi atölyeye geri götürelim.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href="/"
            className="group inline-flex items-center gap-2.5 rounded-full bg-accent-fill py-2 pl-6 pr-2 text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-on-accent transition-transform duration-500 ease-quiet hover:-translate-y-0.5 active:scale-[0.98]"
          >
            Ana sayfa
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-on-accent/15 transition-transform duration-500 ease-quiet group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" /></svg>
            </span>
          </a>
          <a
            href="/#koleksiyon"
            className="inline-flex items-center rounded-full border border-line px-6 py-3 text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-fg transition-colors duration-500 hover:bg-surface"
          >
            Koleksiyona git
          </a>
        </div>
      </div>
    </main>
  );
}
