import { brand, contact, instagram, seller } from '@/lib/brand';

const COLS = [
  { h: 'Atölye', items: [{ t: 'Hikaye', href: '#hikaye' }, { t: 'Süreç', href: '#surec' }, { t: 'SSS', href: '#sss' }, { t: 'Koleksiyon', href: '#koleksiyon' }] },
  { h: 'Koleksiyon', items: [{ t: 'Asılı Sepet', href: '#koleksiyon' }, { t: 'Yuvarlak Sepet', href: '#koleksiyon' }, { t: 'Özel Ölçü', href: '#siparis' }] },
];

const LEGAL = [
  { t: 'Ön Bilgilendirme & Mesafeli Satış', href: '/mesafeli-satis/' },
  { t: 'KVKK Aydınlatma Metni', href: '/kvkk-aydinlatma/' },
];

/**
 * Site footer. `sectionBase` lets sub-pages (legal) point the in-page anchor
 * links back to the homepage: '' on the home page (native smooth-scroll),
 * '/' on legal pages (navigate home, then jump). Seller block + legal links
 * are required for the Mesafeli Satış / KVKK künye; empty seller fields
 * (taxId/phone) are hidden automatically — never shown as fake values.
 */
export function SiteFooter({ sectionBase = '' }: { sectionBase?: string }) {
  const sellerRows = [
    { k: 'Satıcı', v: seller.legalName },
    { k: 'Vergi / T.C. Kimlik No', v: seller.taxId },
    { k: 'İl / İlçe', v: `${seller.city} / ${seller.district}` },
    { k: 'E-posta', v: seller.email, href: `mailto:${seller.email}` },
    { k: 'Telefon', v: seller.phone, href: seller.phone ? `tel:${seller.phone.replace(/\s/g, '')}` : undefined },
  ].filter((r) => r.v);

  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto max-w-wrap px-6 py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <a href={sectionBase || '#top'} className="flex items-baseline gap-1.5 font-display text-3xl text-fg">
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
                    <a className="transition-colors hover:text-accent" href={`${sectionBase}${it.href}`}>{it.t}</a>
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
              <li><a className="transition-colors hover:text-accent" href={instagram.url} target="_blank" rel="noopener noreferrer">Instagram · {instagram.handle}</a></li>
              <li className="text-muted">{contact.location}</li>
            </ul>
            <h4 className="mt-7 text-[0.7rem] uppercase tracking-[0.2em] text-accent">Yasal</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-fg/80">
              {LEGAL.map((l) => (
                <li key={l.href}>
                  <a className="transition-colors hover:text-accent" href={l.href}>{l.t}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Satıcı künyesi — Mesafeli Satış / KVKK için zorunlu bilgiler */}
        <div className="mt-14 border-t border-line pt-8">
          <h4 className="text-[0.7rem] uppercase tracking-[0.2em] text-accent">Satıcı Bilgileri</h4>
          <dl className="mt-4 grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2 lg:grid-cols-3">
            {sellerRows.map((r) => (
              <div key={r.k} className="flex flex-wrap gap-x-2">
                <dt className="text-muted">{r.k}:</dt>
                <dd className="text-fg/85">
                  {r.href ? <a className="transition-colors hover:text-accent" href={r.href}>{r.v}</a> : r.v}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 max-w-2xl text-xs leading-relaxed text-muted">
            {seller.basis} Satış ve teslimat koşulları için{' '}
            <a className="underline underline-offset-2 transition-colors hover:text-accent" href="/mesafeli-satis/">Ön Bilgilendirme &amp; Mesafeli Satış</a>,
            kişisel verilerin işlenmesi için{' '}
            <a className="underline underline-offset-2 transition-colors hover:text-accent" href="/kvkk-aydinlatma/">KVKK Aydınlatma Metni</a>’ne bakabilirsiniz.
          </p>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 text-xs uppercase tracking-[0.18em] text-muted sm:flex-row sm:items-center">
          <span>Doğal · Sessiz · Zamansız</span>
          <span>© {brand.founded} Seselka Home</span>
        </div>
      </div>
    </footer>
  );
}
