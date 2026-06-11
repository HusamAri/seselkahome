import Image from 'next/image';
import { withBase } from '@/lib/basePath';
import { contact, specialSeries } from '@/lib/brand';

function InstagramIcon({ size = 16 }: { size?: number }) {
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
 * Premium signature collection. Square photo tiles (no cutout); hovering a tile
 * reveals only its description; each piece carries a handwritten maker signature.
 * Contact-for-price — no cart. Pure-CSS hover, so this stays a server component.
 */
export function SpecialSeries() {
  const { eyebrow, title, maker, note, hero, items } = specialSeries;
  const mailto = `mailto:${contact.email}?subject=${encodeURIComponent(`Özel Seri — ${title} · Fiyat talebi`)}`;

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

      {/* series banner */}
      <div className="mt-10 overflow-hidden rounded-[1.9rem] border border-line shadow-[0_50px_90px_-50px_rgba(120,70,25,0.45)]">
        <div className="relative aspect-[16/9] w-full">
          <Image src={withBase(hero)} alt={`${title} — ${maker.name} özel serisi`} fill priority sizes="(min-width:1024px) 1120px, 100vw" className="object-cover" />
        </div>
      </div>

      {/* maker credit + contact */}
      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <a
          href={maker.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 rounded-full border border-line py-2 pl-2 pr-5 transition-colors duration-300 hover:border-accent/40"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-fg transition-all duration-300 group-hover:border-accent/40 group-hover:bg-accent-fill group-hover:text-on-accent">
            <InstagramIcon size={15} />
          </span>
          <span>
            <span className="block text-[0.58rem] uppercase tracking-[0.2em] text-muted">Üreten Eller</span>
            <span className="block text-sm font-medium text-fg">Songül Güney · {maker.handle}</span>
          </span>
        </a>
        <a
          href={mailto}
          className="inline-flex items-center gap-2 rounded-full bg-accent-fill px-6 py-3 text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-on-accent transition-transform duration-500 ease-quiet hover:-translate-y-0.5 active:scale-[0.98]"
        >
          Fiyat için iletişime geçin {MailArrow}
        </a>
      </div>

      {/* square tiles — hover reveals only the description; handwritten signature below */}
      <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-8 md:mt-12 md:grid-cols-4 md:gap-x-6 md:gap-y-10">
        {items.map((it) => (
          <figure key={it.id}>
            <div className="group relative aspect-square overflow-hidden rounded-[1.2rem] border border-line bg-surface">
              <Image
                src={withBase(it.image)}
                alt={it.name}
                fill
                sizes="(min-width:768px) 25vw, 50vw"
                className="object-cover transition-transform duration-[1.1s] ease-quiet group-hover:scale-[1.06]"
              />
              <figcaption className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/90 via-ink/35 to-transparent p-5 opacity-0 transition-opacity duration-500 ease-quiet group-hover:opacity-100">
                <span className="text-sm leading-relaxed text-linen">{it.desc}</span>
              </figcaption>
            </div>
            <span className="mt-3.5 block text-center font-script text-[1.9rem] leading-none text-accent">{maker.name}</span>
          </figure>
        ))}
      </div>
    </div>
  );
}
