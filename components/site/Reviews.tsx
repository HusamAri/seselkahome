import Image from 'next/image';
import { withBase } from '@/lib/basePath';
import { contact, reviews } from '@/lib/brand';

function Stars({ n }: { n: number }) {
  return (
    <span className="inline-flex gap-0.5 text-accent" aria-label={`${n} / 5 yıldız`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" width="14" height="14" fill={i < n ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
          <path d="M12 2.5l2.9 6.1 6.6.7-4.9 4.5 1.3 6.5L12 17.6 6.1 20.8l1.3-6.5L2.5 9.3l6.6-.7z" />
        </svg>
      ))}
    </span>
  );
}

function InstagramIcon({ size = 14 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

/**
 * Customer reviews with their own photos. Static-export friendly: the list is
 * curated in lib/brand.ts and customers submit theirs (with a photo) via a
 * mailto CTA — no backend.
 */
export function Reviews() {
  const mailto = `mailto:${contact.email}?subject=${encodeURIComponent('Seselka - Ev Sahibi Yorumu')}&body=${encodeURIComponent('Aldığınız parça:\nŞehir:\nDeğerlendirmeniz:\n\n(Lütfen evinizdeki fotoğrafınızı bu e-postaya ekleyin, sayfamızda sergileyelim.)')}`;

  return (
    <section id="yorumlar" className="scroll-mt-28 border-t border-line">
      <div className="mx-auto max-w-wrap px-6 py-24 md:py-32">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow">Ev Sahiplerinden</span>
            <h2 className="mt-5 font-display font-medium leading-[0.95] text-fg text-[clamp(2.5rem,6.5vw,5rem)]">
              Onların evinde<span className="text-accent">.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            Satın alanların kendi köşelerinden kareler ve sözler. Sen de parçanı evinde yakaladıysan, fotoğrafınla birlikte bize gönder, burada sergileyelim.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-6 md:mt-16 md:gap-7">
          {reviews.map((r) => (
            <figure key={`${r.name}-${r.piece}`} className="flex w-full max-w-[36rem] flex-col overflow-hidden rounded-[1.7rem] bg-card shadow-[0_34px_64px_-40px_rgba(120,70,25,0.5)] transition-transform duration-500 ease-quiet hover:-translate-y-1 motion-reduce:hover:translate-y-0 sm:flex-row">
              <div className="relative aspect-[4/3] w-full shrink-0 sm:aspect-auto sm:w-48 md:w-56">
                <Image src={withBase(r.image)} alt={r.alt ?? `${r.name} — ${r.piece}`} fill sizes="(min-width:640px) 14rem, 100vw" className="object-cover" />
              </div>
              <figcaption className="flex flex-1 flex-col p-6">
                <Stars n={r.rating} />
                {r.text ? (
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-fg/80">“{r.text}”</p>
                ) : (
                  <div className="mt-3 flex-1" aria-hidden="true" />
                )}
                <div className="mt-5 flex items-end justify-between gap-3 border-t border-line pt-4">
                  <div>
                    <span className="block font-display text-lg leading-none text-fg">{r.name}</span>
                    <span className="mt-1.5 block text-[0.62rem] uppercase tracking-[0.16em] text-muted">{r.location ? `${r.location} · ` : ''}{r.piece}</span>
                  </div>
                  {r.instagram ? (
                    <a href={r.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-1.5 text-xs font-medium text-accent transition-colors duration-300 hover:text-fg">
                      <InstagramIcon /> {r.handle}
                    </a>
                  ) : null}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-3">
          <a
            href={mailto}
            className="inline-flex items-center gap-2 rounded-full bg-accent-fill px-7 py-3.5 text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-on-accent transition-transform duration-500 ease-quiet hover:-translate-y-0.5 active:scale-[0.98]"
          >
            Deneyimini paylaş
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </a>
          <span className="text-xs text-muted">Fotoğrafınla birlikte bir e-posta yeter.</span>
        </div>
      </div>
    </section>
  );
}
