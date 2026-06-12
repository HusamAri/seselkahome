import { contact, orderFlow, payment } from '@/lib/brand';

const depositPct = Math.round(payment.deposit * 100);
const balancePct = 100 - depositPct;

function BankIcon({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 9.5 12 4l9 5.5" />
      <path d="M5 10v8M10 10v8M14 10v8M19 10v8M3 21h18" />
    </svg>
  );
}

function CardIcon({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="M2.5 9.5h19" />
    </svg>
  );
}

const Arrow = (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

function Check() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-accent" aria-hidden="true"><path d="M5 12.5 10 17 19 7" /></svg>
  );
}

/**
 * "Sipariş & Ödeme" — the bespoke order journey + how payment works. A calm
 * vertical timeline (data in lib/brand.ts) followed by a payment panel that
 * explains the deposit and lists both methods (havale + secure card link).
 * Pure presentation, so it stays a server component. IBAN/card link fall back
 * to tasteful copy until the real details are filled in brand.ts `payment`.
 */
export function OrderProcess() {
  const mailto = `mailto:${contact.email}?subject=${encodeURIComponent('Seselka - Sipariş & Ödeme hakkında')}`;

  return (
    <div>
      <div className="max-w-2xl">
        <span className="eyebrow">Sipariş & Ödeme</span>
        <h2 className="mt-5 font-display font-medium leading-[0.95] text-fg text-[clamp(2.25rem,5.5vw,4.5rem)]">
          Atölyeden evinize,<br />adım adım<span className="text-accent">.</span>
        </h2>
        <p className="mt-6 text-base leading-relaxed text-muted">
          Seselka’da her parça siparişe özel örülür. Süreç baştan sona şeffaf, ödeme adil ve güvenlidir. İşte bir siparişin yolculuğu.
        </p>
      </div>

      {/* journey timeline */}
      <ol className="relative mt-14 max-w-2xl md:mt-16">
        {orderFlow.map((s, i) => {
          const last = i === orderFlow.length - 1;
          return (
            <li key={s.n} className="relative flex gap-5">
              <div className="flex flex-col items-center">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-bg font-display text-lg text-accent">
                  {s.n}
                </span>
                {!last ? <span className="mt-1.5 w-px flex-1 bg-line" aria-hidden="true" /> : null}
              </div>
              <div className={last ? 'pt-1.5' : 'pb-9 pt-1.5'}>
                <h3 className="font-display text-2xl leading-none text-fg">{s.t}</h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">{s.d}</p>
              </div>
            </li>
          );
        })}
      </ol>

      {/* payment panel */}
      <div className="mt-16 grid gap-8 rounded-[1.6rem] border border-line bg-surface p-6 shadow-[0_40px_80px_-50px_rgba(120,70,25,0.45)] sm:p-9 md:mt-20 md:grid-cols-[1.05fr_1fr] md:gap-12">
        <div>
          <span className="eyebrow">Ödeme</span>
          <h3 className="mt-4 font-display text-[clamp(1.6rem,3vw,2.3rem)] leading-tight text-fg">
            Güven veren, adil bir ödeme.
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Üretim, <strong className="font-semibold text-fg">%{depositPct} kapora</strong> ile başlar. Kalanı, parçanız tamamlanıp fotoğraflarını onayladıktan sonra, teslimden hemen önce alırız.
          </p>
          <ul className="mt-6 space-y-3 text-sm leading-relaxed text-fg/85">
            <li className="flex gap-2.5"><Check /><span><strong className="font-semibold text-fg">%{depositPct} kapora</strong> ile siparişiniz üretim sırasına girer.</span></li>
            <li className="flex gap-2.5"><Check /><span>Kalan <strong className="font-semibold text-fg">%{balancePct}</strong> teslimattan önce ödenir.</span></li>
            <li className="flex gap-2.5"><Check /><span>Ödeme; havale/EFT ya da güvenli kart linki ile.</span></li>
          </ul>
          <p className="mt-6 border-t border-line pt-5 text-xs leading-relaxed text-muted">
            <strong className="font-semibold text-fg/80">Kapora & iptal:</strong> Her parça el emeğiyle ve yalnızca size özel üretildiği için, üretime geçildikten sonra kapora iade edilmez. Üretim başlamadan önce talebinizi dilediğiniz an ücretsiz iptal edebilirsiniz.
          </p>
        </div>

        {/* methods */}
        <div className="space-y-4">
          <div className="rounded-[1.1rem] border border-line bg-bg p-5">
            <div className="flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-accent">
              <BankIcon /> Havale / EFT
            </div>
            {payment.iban ? (
              <div className="mt-3">
                <p className="select-all font-mono text-sm tracking-wide text-fg">{payment.iban}</p>
                <p className="mt-1.5 text-xs text-muted">
                  {payment.ibanName}{payment.bankName ? ` · ${payment.bankName}` : ''}
                </p>
              </div>
            ) : (
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Hesap bilgileri, siparişiniz onaylandığında sizinle paylaşılır.
              </p>
            )}
          </div>

          <div className="rounded-[1.1rem] border border-line bg-bg p-5">
            <div className="flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-accent">
              <CardIcon /> Kart ile ödeme
            </div>
            {payment.cardLink ? (
              <a
                href={payment.cardLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-accent-fill px-5 py-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-on-accent transition-transform duration-500 ease-quiet hover:-translate-y-0.5 active:scale-[0.98]"
              >
                Güvenli ödeme sayfası {Arrow}
              </a>
            ) : (
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Siparişinize özel, güvenli bir kart ödeme linki iletilir (kapora ve bakiye için).
              </p>
            )}
            <p className="mt-3 text-[0.68rem] leading-relaxed text-muted">
              Kart bilgileriniz bizde tutulmaz; ödeme, sağlayıcının güvenli sayfasında alınır.
            </p>
          </div>

          <a href={mailto} className="inline-flex items-center gap-1.5 pt-1 text-xs font-medium text-accent transition-colors duration-300 hover:text-fg">
            Ödeme hakkında soru sor {Arrow}
          </a>
        </div>
      </div>
    </div>
  );
}
