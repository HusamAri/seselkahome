'use client';

import { useEffect, useState } from 'react';
import { withBase } from '@/lib/basePath';
import { instagram } from '@/lib/brand';

type Tile = { key: string; image: string; alt: string; href: string };

/** Minimal slice of a Behold.so JSON-feed post (behold.so/docs/json-feeds). */
type BeholdPost = {
  id?: string;
  permalink?: string;
  mediaUrl?: string;
  thumbnailUrl?: string;
  altText?: string;
  prunedCaption?: string;
  sizes?: { small?: { mediaUrl?: string }; medium?: { mediaUrl?: string } };
};

/** Curated fallback — real Seselka imagery, shown server-side and whenever the
 *  live feed is unset or unreachable. */
const CURATED: Tile[] = instagram.posts.map((p, i) => ({
  key: `c${i}`,
  image: p.image,
  alt: p.alt,
  href: p.href ?? instagram.url,
}));

function IgIcon({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

/** One marquee row. The set is rendered twice and the track slides a full set
 *  width for a seamless loop; the duplicate half is decorative (aria-hidden). */
function MarqueeRow({ row, reverse }: { row: Tile[]; reverse: boolean }) {
  return (
    <div className={`flex w-max ${reverse ? 'ig-marquee-track-rev' : 'ig-marquee-track'}`}>
      {[...row, ...row].map((t, i) => {
        const dup = i >= row.length;
        return (
          <a
            key={`${reverse ? 'b' : 'a'}-${t.key}-${i}`}
            href={t.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-hidden={dup}
            tabIndex={dup ? -1 : 0}
            className="group/ig relative mr-4 block h-44 w-44 shrink-0 overflow-hidden rounded-[1.2rem] sm:mr-5 sm:h-60 sm:w-60"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- curated (local) + live (Behold CDN) mix; static export */}
            <img
              src={withBase(t.image)}
              alt={dup ? '' : t.alt}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-quiet group-hover/ig:scale-110"
            />
            <span className="absolute inset-0 flex items-center justify-center text-linen opacity-0 transition-all duration-300 group-hover/ig:bg-ink/40 group-hover/ig:opacity-100">
              <IgIcon size={30} />
            </span>
          </a>
        );
      })}
    </div>
  );
}

/**
 * Instagram — immersive, auto-scrolling ("kendiliğinden akan") two-row wall.
 * Rows scroll in opposite directions. Renders the curated fallback on the
 * server, then — if `instagram.feedUrl` is set — fetches the live Behold.so JSON
 * feed on the client and swaps in the latest posts (Behold's free tier handles
 * the Instagram token/refresh + daily updates, so the site stays static, no
 * secrets). Pauses on hover/focus; under prefers-reduced-motion the animation
 * stops and the rows become manually scrollable. Tiles fill their box (cover).
 */
export function InstagramFeed() {
  const [tiles, setTiles] = useState<Tile[]>(CURATED);

  useEffect(() => {
    if (!instagram.feedUrl) return;
    let cancelled = false;
    fetch(instagram.feedUrl)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((data: { posts?: BeholdPost[] }) => {
        const mapped = (data.posts ?? [])
          .map((p, i): Tile | null => {
            const image = p.sizes?.medium?.mediaUrl ?? p.sizes?.small?.mediaUrl ?? p.thumbnailUrl ?? p.mediaUrl;
            if (!image) return null;
            return {
              key: p.id ?? `l${i}`,
              image,
              alt: p.altText || p.prunedCaption || `${instagram.handle} Instagram gönderisi`,
              href: p.permalink ?? instagram.url,
            };
          })
          .filter((t): t is Tile => t !== null);
        if (!cancelled && mapped.length) setTiles(mapped);
      })
      .catch(() => {
        /* network/parse error — keep the curated fallback */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Second row: same tiles rotated, so the two rows never sit in lockstep.
  const half = Math.ceil(tiles.length / 2);
  const rowB = tiles.length > 2 ? [...tiles.slice(half), ...tiles.slice(0, half)] : tiles;

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

      <div className="ig-marquee group relative mt-12 w-full overflow-hidden md:mt-16">
        <div className="flex flex-col gap-4 sm:gap-5">
          <MarqueeRow row={tiles} reverse={false} />
          <MarqueeRow row={rowB} reverse />
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-bg to-transparent sm:w-24" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-bg to-transparent sm:w-24" />
      </div>
    </div>
  );
}
