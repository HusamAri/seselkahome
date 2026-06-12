import { SiteFooter } from '@/components/site/SiteFooter';

/**
 * Shared chrome for long-form legal/utility pages (Mesafeli Satış, KVKK).
 * Pure server component: a light static header (brand → home) and the shared
 * footer reused with `sectionBase="/"` so its in-page anchors resolve back to
 * the homepage sections. Body copy is styled via `.legal-prose` in globals.css.
 */
export function LegalShell({
  title,
  updated,
  lead,
  children,
}: {
  title: string;
  updated: string;
  lead?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="border-b border-line bg-surface/40">
        <div className="mx-auto flex max-w-wrap items-center justify-between px-6 py-5">
          <a href="/" className="flex items-baseline gap-1.5 font-display text-2xl text-fg">
            seselka
            <span className="h-1.5 w-1.5 translate-y-[-0.15em] rounded-full bg-accent" aria-hidden="true" />
            <span className="text-sm uppercase tracking-[0.32em] text-muted">Home</span>
          </a>
          <a
            href="/"
            className="text-[0.72rem] font-medium uppercase tracking-[0.16em] text-muted transition-colors hover:text-accent"
          >
            ← Ana sayfa
          </a>
        </div>
      </header>

      <main className="bg-bg text-fg">
        <article className="mx-auto max-w-3xl px-6 py-20 md:py-28">
          <span className="eyebrow">Yasal</span>
          <h1 className="mt-5 font-display font-medium leading-[0.95] text-fg text-[clamp(2.25rem,5vw,3.5rem)]">
            {title}
          </h1>
          <p className="mt-4 text-xs uppercase tracking-[0.16em] text-muted">Son güncelleme · {updated}</p>
          {lead ? <p className="mt-7 text-base leading-[1.9] text-fg/75">{lead}</p> : null}

          <div className="legal-prose mt-12">{children}</div>

          <p className="mt-16 border-t border-line pt-6 text-xs leading-relaxed text-muted">
            Bu metin bilgilendirme amaçlıdır ve hukuki danışmanlık yerine geçmez. Nihai yasal
            metinler için bir mali müşavir veya hukukçudan onay alınması önerilir.
          </p>
        </article>
      </main>

      <SiteFooter sectionBase="/" />
    </>
  );
}
