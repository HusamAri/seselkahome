import { brand, contact } from '@/lib/brand';

const COLS = [
  { h: 'Atölye', items: [{ t: 'Hikaye', href: '#hikaye' }, { t: 'Süreç', href: '#surec' }, { t: 'Koleksiyon', href: '#koleksiyon' }] },
  { h: 'Koleksiyon', items: [{ t: 'Asılı Sepet', href: '#koleksiyon' }, { t: 'Yuvarlak Sepet', href: '#koleksiyon' }, { t: 'Özel Ölçü', href: '#siparis' }] },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto max-w-wrap px-6 py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <a href="#top" className="flex items-baseline gap-1.5 font-display text-3xl text-fg">
              seselka<span className="h-2 w-2 translate-y-[-0.15em] rounded-full bg-accent" aria-hidden="true" />
              <span className="text-lg uppercase tracking-[0.3em] text-muted">Home</span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Doğada köklenir.<br />Elde yeniden doğar.<br />Zamansız kalır.
            </p>
          </div>

          {COLS.map((col) => (
            <div key={col.h}>
              <h4 className="text-[0.7rem] uppercase tracking-[0.2em] text-accent">{col.h}</h4>
              <ul className="mt-4 space-y-2.5 text-sm text-fg/80">
                {col.items.map((it) => (
                  <li key={it.t}>
                    <a className="transition-colors hover:text-accent" href={it.href}>{it.t}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-[0.7rem] uppercase tracking-[0.2em] text-accent">İletişim</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-fg/80">
              <li><a className="transition-colors hover:text-accent" href={`mailto:${contact.email}`}>{contact.email}</a></li>
              {contact.phone ? <li><a className="transition-colors hover:text-accent" href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a></li> : null}
              <li className="text-muted">{contact.location}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 text-xs uppercase tracking-[0.18em] text-muted sm:flex-row sm:items-center">
          <span>Doğal · Sessiz · Zamansız</span>
          <span>© {brand.founded} Seselka Home</span>
        </div>
      </div>
    </footer>
  );
}
