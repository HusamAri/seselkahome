'use client';

function InstagramGlyph({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

type Props = { name: string; handle: string; url: string };

/**
 * Instagram profile card. Instagram's oEmbed only supports single posts (not
 * profiles), so this is a styled, on-brand profile preview that links out —
 * not a live feed. Swap in an official post embed if a post URL is provided.
 */
export function InstagramEmbed({ name, handle, url }: Props) {
  const initial = name.trim().charAt(0).toUpperCase();
  return (
    <div className="overflow-hidden rounded-[1.1rem] border border-line bg-bg/60">
      {/* header — avatar ring + identity */}
      <div className="flex items-center gap-3 px-4 py-3.5">
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full p-[2px]"
          style={{ background: 'linear-gradient(45deg,#f9ce34,#ee2a7b 45%,#6228d7)' }}
        >
          <span className="flex h-full w-full items-center justify-center rounded-full bg-card font-display text-lg text-fg">
            {initial}
          </span>
        </span>
        <div className="min-w-0 flex-1">
          <span className="block truncate font-display text-lg leading-none text-fg">{name}</span>
          <span className="mt-1 block truncate text-[0.78rem] text-muted">{handle}</span>
        </div>
        <span className="text-muted"><InstagramGlyph size={20} /></span>
      </div>

      {/* decorative feed strip — gradients, not stand-in photos */}
      <div className="grid grid-cols-3 gap-px bg-line/60" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="flex aspect-square items-center justify-center bg-surface/70 text-muted/40"
            style={{ background: `linear-gradient(${135 + i * 25}deg, rgba(184,148,118,0.22), rgba(110,74,90,0.14))` }}
          >
            <InstagramGlyph size={18} />
          </div>
        ))}
      </div>

      {/* CTA */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        data-stop
        className="flex items-center justify-center gap-2 border-t border-line px-4 py-3 text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-fg transition-colors duration-300 hover:bg-accent-fill hover:text-on-accent"
      >
        <InstagramGlyph size={15} />
        Instagram&apos;da görüntüle
      </a>
    </div>
  );
}
