import type { Metadata } from 'next';
import Image from 'next/image';
import { SiteFooter } from '@/components/site/SiteFooter';

export const metadata: Metadata = {
  title: 'Hasır Dekorasyon ve El Yapımı Ev Objeleri Rehberi | Seselka Home',
  description:
    'Hasır dekorasyon, doğal malzemeler, kağıt hasır ürünlerin kullanımı ve bakımı için Seselka Home rehberleri.',
  alternates: { canonical: '/rehber/' },
};

export default function GuideIndexPage() {
  return (
    <>
      <header className="border-b border-line bg-surface/40">
        <div className="mx-auto flex max-w-wrap items-center justify-between px-6 py-5">
          <a href="/" className="flex items-baseline gap-1.5 font-display text-2xl text-fg">
            seselka
            <span className="h-1.5 w-1.5 translate-y-[-0.15em] rounded-full bg-accent" aria-hidden="true" />
            <span className="text-sm uppercase tracking-[0.32em] text-muted">Home</span>
          </a>
          <a href="/#koleksiyon" className="text-[0.72rem] font-medium uppercase tracking-[0.16em] text-muted transition-colors hover:text-accent">
            Koleksiyon
          </a>
        </div>
      </header>

      <main id="top" className="min-h-[70vh] bg-bg text-fg">
        <section className="mx-auto max-w-wrap px-6 py-20 md:py-28">
          <span className="eyebrow">Seselka Rehber</span>
          <h1 className="mt-5 max-w-4xl font-display text-[clamp(3rem,8vw,6.5rem)] font-medium leading-[0.88]">
            Doğal dokularla <span className="italic text-accent">yaşamak.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-[1.9] text-fg/70">
            Hasır dekorasyon, kağıt örgü, el yapımı ev objeleri ve yavaş üretim üzerine uygulanabilir bilgiler.
          </p>

          <div className="mt-14 max-w-4xl">
            <a
              href="/rehber/hasir-dekorasyon-rehberi/"
              className="group grid overflow-hidden rounded-[1.8rem] border border-line bg-card shadow-[0_34px_64px_-42px_rgba(120,70,25,0.5)] md:grid-cols-[0.9fr_1.1fr]"
            >
              <div className="relative min-h-72 overflow-hidden">
                <Image
                  src="/assets/products/hasir-avize-3.webp"
                  alt="Yemek masasının üzerinde el yapımı hasır avize ile doğal dekorasyon"
                  fill
                  priority
                  sizes="(min-width:768px) 40vw, 92vw"
                  className="object-cover transition-transform duration-700 ease-quiet group-hover:scale-[1.03] motion-reduce:transition-none"
                />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-12">
                <span className="text-[0.65rem] uppercase tracking-[0.2em] text-accent">Dekorasyon · 8 dk</span>
                <h2 className="mt-4 font-display text-4xl leading-[0.98] text-fg">
                  Hasır dekorasyon rehberi: doğal dokuları eve taşımanın 7 yolu
                </h2>
                <p className="mt-5 text-sm leading-[1.8] text-muted">
                  Sepetten avizeye, hasır ürünleri bohem bir kalıba sıkıştırmadan dengeli ve zamansız kullanmanın yolları.
                </p>
                <span className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-fg">
                  Rehberi oku →
                </span>
              </div>
            </a>
          </div>
        </section>
      </main>

      <SiteFooter sectionBase="/" />
    </>
  );
}
