import { faqs } from '@/lib/brand';
import { JsonLd } from '@/components/site/JsonLd';
import { faqLd } from '@/lib/seo';

/**
 * SSS — accessible, JS-free accordion (native <details>). Renders the matching
 * FAQPage JSON-LD from the same `faqs` source, so the structured data always
 * equals the visible text (Google's FAQ rich-result requirement).
 */
export function Faq() {
  return (
    <div>
      <JsonLd data={faqLd()} />
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="eyebrow">SSS</span>
          <h2 className="mt-5 font-display font-medium leading-[0.95] text-fg text-[clamp(2.25rem,5.5vw,4rem)]">
            Sıkça sorulanlar<span className="text-accent">.</span>
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-muted">
          Siparişe özel üretim, kapora, kargo ve bakım hakkında en çok merak edilenler.
        </p>
      </div>

      <div className="mt-12 border-t border-line">
        {faqs.map((f) => (
          <details key={f.q} className="group border-b border-line">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-5 py-5 [&::-webkit-details-marker]:hidden">
              <span className="font-display text-lg leading-snug text-fg sm:text-xl">{f.q}</span>
              <span
                className="mt-1.5 shrink-0 text-accent transition-transform duration-300 ease-quiet group-open:rotate-45"
                aria-hidden="true"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </summary>
            <p className="max-w-2xl pb-6 text-sm leading-[1.85] text-muted">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
