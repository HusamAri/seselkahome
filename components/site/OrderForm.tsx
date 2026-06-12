'use client';

import { useState } from 'react';
import { contact, products } from '@/lib/brand';
import { useCart } from '@/components/shop/CartProvider';

const PIECES = [...products.filter((p) => !p.custom && !p.sold && !p.hidden).map((p) => p.name), 'Özel Sipariş'];

/**
 * Made-to-order inquiry. Static-export friendly: composes a mailto with the
 * order. If the cart has pieces, the mail lists ALL of them (with quantities);
 * otherwise it falls back to a single-piece inquiry. No backend.
 */
export function OrderForm() {
  const cart = useCart();
  const [sent, setSent] = useState(false);
  const hasItems = cart.items.length > 0;

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get('fn') || '').trim();
    const email = String(data.get('em') || '').trim();
    const phone = String(data.get('ph') || '').trim();
    const size = String(data.get('sz') || '').trim();
    const palette = String(data.get('pl') || '').trim();
    const deadline = String(data.get('dl') || '').trim();
    const note = String(data.get('msg') || '').trim();
    const piece = String(data.get('prc') || '');

    const lines = hasItems ? cart.items.map((i) => `- ${i.name} × ${i.qty}`) : [`- ${piece}`];
    const subject = hasItems ? `Seselka - Sipariş (${cart.count} parça)` : `Seselka - Tasarım Talebi: ${piece}`;

    const head = [`Ad: ${name}`, `E-posta: ${email}`];
    if (phone) head.push(`Telefon: ${phone}`);
    const detail: string[] = [];
    if (size) detail.push(`Ölçü: ${size}`);
    if (palette) detail.push(`Renk / Palet: ${palette}`);
    if (deadline) detail.push(`Teslim tarihi: ${deadline}`);

    const parts = [...head, '', 'Sipariş listesi:', ...lines];
    if (detail.length) parts.push('', 'Detaylar:', ...detail);
    parts.push('', `Not: ${note || '-'}`);
    parts.push('', 'KVKK Aydınlatma Metni okundu ve onaylandı.');
    const body = parts.join('\n');
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setSent(true);
    window.setTimeout(() => setSent(false), 2600);
  }

  const field = 'w-full rounded-[3px] border border-line bg-bg px-4 py-3 text-sm text-fg placeholder:text-muted focus:border-accent focus:outline-none';
  const label = 'mb-1.5 block text-[0.7rem] uppercase tracking-[0.16em] text-muted';

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="fn">Adınız</label>
          <input className={field} id="fn" name="fn" type="text" autoComplete="name" placeholder="Defne Aksoy" required />
        </div>
        <div>
          <label className={label} htmlFor="em">E-posta</label>
          <input className={field} id="em" name="em" type="email" autoComplete="email" placeholder="defne@ev.com" required />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="ph">Telefon <span className="normal-case tracking-normal text-muted/70">(opsiyonel)</span></label>
          <input className={field} id="ph" name="ph" type="tel" autoComplete="tel" placeholder="05__ ___ __ __" />
        </div>
        <div>
          <label className={label} htmlFor="dl">Teslim tarihi <span className="normal-case tracking-normal text-muted/70">(opsiyonel)</span></label>
          <input className={field} id="dl" name="dl" type="text" placeholder="Örn. yeni yıl, doğum günü…" />
        </div>
      </div>

      {hasItems ? (
        <div>
          <span className={label}>Sipariş listeniz ({cart.count} parça)</span>
          <ul className="divide-y divide-line/60 rounded-[3px] border border-line bg-bg/60">
            {cart.items.map((i) => (
              <li key={i.name} className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm text-fg">
                <span>{i.name}</span>
                <span className="text-muted tabular-nums">× {i.qty}</span>
              </li>
            ))}
          </ul>
          <button type="button" onClick={cart.openCart} className="mt-2 text-xs text-muted underline-offset-2 transition-colors hover:text-accent hover:underline">
            Listeyi düzenle
          </button>
        </div>
      ) : (
        <div>
          <label className={label} htmlFor="prc">İlgilendiğiniz tasarım</label>
          <select className={field} id="prc" name="prc" defaultValue={PIECES[0]}>
            {PIECES.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="sz">Ölçü / boyut <span className="normal-case tracking-normal text-muted/70">(opsiyonel)</span></label>
          <input className={field} id="sz" name="sz" type="text" placeholder="Örn. 40×30 cm, masa boyu…" />
        </div>
        <div>
          <label className={label} htmlFor="pl">Renk & palet <span className="normal-case tracking-normal text-muted/70">(opsiyonel)</span></label>
          <input className={field} id="pl" name="pl" type="text" placeholder="Örn. naturel, ekru, toprak…" />
        </div>
      </div>

      <div>
        <label className={label} htmlFor="msg">Notunuz</label>
        <textarea className={`${field} min-h-28 resize-y`} id="msg" name="msg" placeholder="Düşlediğiniz form, yaşam alanınız ya da ilham görselleriniz hakkında birkaç satır..." />
      </div>

      <p className="text-xs leading-relaxed text-muted">
        Bu form bir <strong className="font-medium text-fg/75">taleptir</strong>; bu aşamada ödeme ya da kapora alınmaz. Size dönüp teklifi, üretim süresini ve süreci birlikte netleştiririz. Satış ve teslimat koşulları için{' '}
        <a href="/mesafeli-satis/" className="underline underline-offset-2 transition-colors hover:text-accent">Ön Bilgilendirme &amp; Mesafeli Satış</a>{' '}sayfamıza göz atabilirsiniz.
      </p>

      <label className="flex items-start gap-2.5 text-xs leading-relaxed text-muted">
        <input type="checkbox" name="kvkk" required className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--accent-fill)]" />
        <span>
          <a href="/kvkk-aydinlatma/" className="text-fg/80 underline underline-offset-2 transition-colors hover:text-accent">KVKK Aydınlatma Metni</a>’ni okudum; iletişim bilgilerimin talebimi yanıtlamak amacıyla işlenmesini onaylıyorum.
        </span>
      </label>

      <button
        type="submit"
        className="inline-flex items-center gap-2 bg-accent-fill px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-on-accent transition-transform duration-500 ease-quiet hover:-translate-y-0.5 motion-reduce:hover:translate-y-0"
      >
        {sent ? 'E-posta açılıyor' : hasItems ? 'Siparişi İlet' : 'Talebi İlet'} <span aria-hidden="true">&rarr;</span>
      </button>
    </form>
  );
}
