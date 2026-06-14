import Image from 'next/image';
import { withBase } from '@/lib/basePath';
import { contact, specialSeries } from '@/lib/brand';

function InstagramIcon({ size = 14 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

const MailArrow = (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

/**
 * Premium signature collection. The series banner is "shoppable": hovering (or
 * tapping) a hotspot over a piece reveals a tag-style popup with its photo,
 * description and a minimal Seselka mark. One handwritten maker signature for the
 * whole section. Contact-for-price. Pure-CSS, so this stays a server component.
 */
export function SpecialSeries() {
  const { eyebrow, title, maker, note, hero, heroAlt, items } = specialSeries;
  const mailto = `mailto:${contact.email}?subject=${encodeURIComponent(`Özel Seri: ${title} · Fiyat talebi`)}`;

  return (
    <div>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="mt-5 font-display font-medium leading-[0.95] text-fg text-[clamp(2.25rem,5.5vw,4.5rem)]">
            {title}<span className="text-accent">.</span>
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-muted">{note}</p>
      </div>

      {/* shoppable banner */}
      <div className="relative mt-10">
        <div className="overflow-hidden rounded-[1.9rem] border border-line shadow-[0_50px_90px_-50px_rgba(120,70,25,0.45)]">
          <div className="relative aspect-[16/9] w-full">
            <Image src={withBase(hero)} alt={heroAlt ?? `${title} — ${maker.name} özel serisi`} fill priority sizes="(min-width:1024px) 1120px, 100vw" className="object-cover" />
          </div>
        </div>

        {/* hotspots + tag popups */}
        <div className="pointer-events-none absolute inset-0">
          {items.map((it) => {
            const x = parseFloat(it.hotspot.x);
            const hPos = x < 34 ? 'left-0' : x > 66 ? 'right-0' : 'left-1/2 -translate-x-1/2';
            const vPos = it.hotspot.place === 'above' ? 'bottom-full mb-3.5' : 'top-full mt-3.5';
            return (
              <div key={it.id} className="group absolute" style={{ left: it.hotspot.x, top: it.hotspot.y }}>
                <button
                  type="button"
                  aria-label={`${it.name} — ürünü gör`}
                  className="pointer-events-auto absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full p-2.5 outline-none"
                >
                  <span className="relative flex h-3 w-3 items-center justify-center">
                    <span className="absolute h-full w-full rounded-full bg-linen/50 opacity-70 motion-safe:animate-ping" aria-hidden="true" />
                    <span className="relative h-3 w-3 rounded-full border border-linen/90 bg-ink/30 shadow-[0_2px_6px_rgba(0,0,0,0.4)] backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:border-accent group-hover:bg-accent-fill group-focus-within:scale-110 group-focus-within:bg-accent-fill" />
                  </span>
                </button>

                <div
                  className={`pointer-events-none absolute z-10 w-56 max-w-[72vw] ${hPos} ${vPos} translate-y-1.5 scale-95 opacity-0 transition-all duration-300 ease-quiet group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:scale-100 group-focus-within:opacity-100`}
                >
                  <div className="overflow-hidden rounded-[1.1rem] border border-ink/10 bg-linen shadow-[0_30px_60px_-22px_rgba(42,37,32,0.65)]">
                    <div className="relative aspect-[4/3] w-full">
                      <Image src={withBase(it.image)} alt={it.alt ?? it.name} fill sizes="224px" className="object-cover" />
                    </div>
                    <div className="px-3.5 pb-3.5 pt-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-display text-lg leading-none text-ink">{it.name}</span>
                        <Image src={withBase('/assets/favicon-48.png')} alt="Seselka" width={20} height={20} className="h-5 w-5 shrink-0 opacity-50" />
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-ink/65">{it.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* one signature + credit + contact */}
      <div className="mt-10 flex flex-col items-center gap-4 text-center">
        <span className="text-[0.6rem] uppercase tracking-[0.22em] text-muted">Üreten Eller · Özel Seri</span>
        <a href={maker.instagram} target="_blank" rel="noopener noreferrer" className="group inline-flex flex-col items-center gap-2">
          <span className="font-script text-[2.9rem] leading-[0.85] text-accent transition-colors duration-300 group-hover:text-fg">{maker.name}</span>
          <span className="inline-flex items-center gap-1.5 text-xs text-muted transition-colors duration-300 group-hover:text-fg"><InstagramIcon /> {maker.handle}</span>
        </a>
        <a
          href={mailto}
          className="mt-1 inline-flex items-center gap-2 rounded-full bg-accent-fill px-6 py-3 text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-on-accent transition-transform duration-500 ease-quiet hover:-translate-y-0.5 active:scale-[0.98]"
        >
          Fiyat için iletişime geçin {MailArrow}
        </a>
      </div>
    </div>
  );
}
