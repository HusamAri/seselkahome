import Image from 'next/image';
import { withBase } from '@/lib/basePath';
import { instagram } from '@/lib/brand';

function IgIcon({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

/**
 * Instagram — curated, auto-scrolling ("kendiliğinden akan") strip of real
 * Seselka imagery linking to @seselkahome. Pure-CSS marquee (no JS, SSG-safe):
 * the track holds the set twice and slides -50% for a seamless loop; pauses on
 * hover/focus, disabled under prefers-reduced-motion (falls back to a manually
 * scrollable row). The duplicated second set is decorative (aria-hidden), so
 * screen readers and keyboard focus only see each tile once.
 */
export function InstagramFeed() {
  const tiles = instagram.posts;
  return (
    <div>
      <div className="mx-auto flex max-w-wrap flex-col items-center gap-4 px-6 text-center">
        <span className="eyebrow">Instagram</span>
        <h2 className="font-display font-medium leading-[0.95] text-fg text-[clamp(2.25rem,5.5vw,4rem)]">
          Atölyeden kareler<span className="text-accent">.</span>
        </h2>
        <p className="max-w-md text-sm leading-relaxed text-muted">
          Üretim anları, yeni parçalar ve evlere yerleşen örgüler — günlük akışımız {instagram.handle}.
        </p>
        <a
          href={instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 inline-flex items-center gap-2 rounded-full bg-accent-fill px-6 py-3 text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-on-accent transition-transform duration-500 ease-quiet hover:-translate-y-0.5 active:scale-[0.98]"
        >
          <IgIcon /> {instagram.handle} · Takip et
        </a>
      </div>

      <div className="ig-marquee group relative mt-12 w-full overflow-hidden">
        <div className="ig-marquee-track flex w-max">
          {[...tiles, ...tiles].map((t, i) => {
            const dup = i >= tiles.length;
            return (
              <a
                key={i}
                href={t.href ?? instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-hidden={dup}
                tabIndex={dup ? -1 : 0}
                className="group/ig relative mr-4 block aspect-square w-44 shrink-0 overflow-hidden rounded-[1.1rem] sm:mr-5 sm:w-56"
              >
                <Image
                  src={withBase(t.image)}
                  alt={dup ? '' : t.alt}
                  fill
                  sizes="(min-width:640px) 224px, 176px"
                  className="object-cover transition-transform duration-700 ease-quiet group-hover/ig:scale-105"
                />
                <span className="absolute inset-0 flex items-center justify-center text-linen opacity-0 transition-all duration-300 group-hover/ig:bg-ink/35 group-hover/ig:opacity-100">
                  <IgIcon size={26} />
                </span>
              </a>
            );
          })}
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-bg to-transparent sm:w-20" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-bg to-transparent sm:w-20" />
      </div>
    </div>
  );
}
