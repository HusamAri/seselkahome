'use client';

import { useState } from 'react';
import { contact, products } from '@/lib/brand';

const PIECES = [...products.filter((p) => !p.custom).map((p) => p.name), 'Özel Sipariş'];

/**
 * Made-to-order inquiry. Static-export friendly: composes a mailto with the
 * order details, mirroring the artisan workshop flow (production starts on
 * confirmation). No backend.
 */
export function OrderForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('fn') || '').trim();
    const email = String(data.get('em') || '').trim();
    const piece = String(data.get('prc') || '');
    const note = String(data.get('msg') || '').trim();

    const subject = `Seselka - Talep: ${piece}`;
    const body = [`Ad: ${name}`, `E-posta: ${email}`, `Parça: ${piece}`, `Not: ${note || '-'}`].join('\n');
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setSent(true);
    window.setTimeout(() => setSent(false), 2600);
  }

  const field = 'w-full rounded-[3px] border border-line bg-bg px-4 py-3 text-sm text-fg placeholder:text-muted/70 focus:border-accent focus:outline-none';
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

      <div>
        <label className={label} htmlFor="prc">Parça</label>
        <select className={field} id="prc" name="prc" defaultValue={PIECES[0]}>
          {PIECES.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={label} htmlFor="msg">Not</label>
        <textarea className={`${field} min-h-28 resize-y`} id="msg" name="msg" placeholder="Renk, ölçü, kapı eşiğine bırakma notu..." />
      </div>

      <button
        type="submit"
        className="inline-flex items-center gap-2 bg-accent-fill px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-on-accent transition-transform duration-500 ease-quiet hover:-translate-y-0.5 motion-reduce:hover:translate-y-0"
      >
        {sent ? 'E-posta açılıyor' : 'Gönder'} <span aria-hidden="true">&rarr;</span>
      </button>
    </form>
  );
}
