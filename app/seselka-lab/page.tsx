import type { Metadata } from 'next';
import { ParallaxImage } from '@/components/motion/ParallaxImage';
import { RevealImage } from '@/components/motion/RevealImage';
import { RevealText } from '@/components/motion/RevealText';
import { ProductCard } from '@/components/ProductCard';
import { CartProvider } from '@/components/shop/CartProvider';
import { brand, products } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'Seselka Lab · Sessiz Cesaret',
  description: 'Foundation lab — motion system, product cards, and brand tokens composed in real structure.',
};

const DISPLAY = 'font-display font-medium';

export default function SeselkaLab() {
  return (
    <CartProvider>
    <main className="bg-bg text-fg">
      {/* ---------------------------------------------------- README / dev notes */}
      <ReadmeBlock />

      {/* ---------------------------------------------------- minimal header */}
      <header className="mx-auto flex max-w-wrap items-center justify-between px-6 py-6">
        <a href="#top" className="flex items-baseline gap-1.5 font-display text-2xl tracking-wide text-fg">
          seselka<span className="h-1.5 w-1.5 translate-y-[-0.15em] rounded-full bg-accent" aria-hidden="true" />
          <span className="text-base uppercase tracking-[0.3em] text-muted">Home</span>
        </a>
        <nav className="hidden gap-8 text-xs font-medium uppercase tracking-[0.18em] text-muted sm:flex">
          <a className="transition-colors hover:text-fg" href="#koleksiyon">Koleksiyon</a>
          <a className="transition-colors hover:text-fg" href="#hikaye">Hikâye</a>
        </nav>
      </header>

      {/* ---------------------------------------------------- HERO */}
      <section id="top" className="relative min-h-[90vh] w-full overflow-hidden">
        <ParallaxImage
          src="/assets/hero-mutlu-ev.webp"
          alt="Seselka: nişte ayna, vazo ve örme sepet"
          priority
          strength={0.1}
          sizes="100vw"
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/25 to-ink/70" aria-hidden="true" />

        <div className="relative z-10 mx-auto flex min-h-[90vh] max-w-wrap flex-col justify-end px-6 pb-20 pt-36">
          <span className="text-[0.72rem] uppercase tracking-[0.22em] text-linen/80">Seselka Home · {brand.founded}</span>
          <RevealText
            as="h1"
            text={['Sessiz', 'Cesaret']}
            className="mt-3 text-linen"
            lineClassName={`${DISPLAY} text-[clamp(3.5rem,13vw,10rem)] leading-[0.84]`}
          />
          <p className="mt-7 max-w-xl text-base leading-relaxed text-linen/85 sm:text-lg">
            Geri dönüşen kâğıt, bir kadın ustanın elinde sabırla örülür. Gösterişsiz, sakin, kalıcı: eve ait olan her şey.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#koleksiyon"
              className="inline-flex items-center gap-2 bg-accent-fill px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-on-accent transition-transform duration-500 ease-quiet hover:-translate-y-0.5 motion-reduce:hover:translate-y-0"
            >
              Koleksiyon <span aria-hidden="true">&rarr;</span>
            </a>
            <a
              href="#hikaye"
              className="inline-flex items-center px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-linen ring-1 ring-inset ring-linen/40 transition-colors hover:bg-linen/10"
            >
              Hikâyemiz
            </a>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- PRODUCT GRID */}
      <section id="koleksiyon" className="bg-bg">
        <div className="mx-auto max-w-wrap px-6 py-24 md:py-32">
          <div className="flex items-end justify-between gap-8">
            <div>
              <span className="eyebrow">Koleksiyon</span>
              <RevealText
                as="h2"
                text={['Atölyeden,', 'eve.']}
                className="mt-3 text-fg"
                lineClassName={`${DISPLAY} text-[clamp(2.5rem,6vw,4.75rem)] leading-[0.92]`}
              />
            </div>
            <p className="hidden max-w-[15rem] text-sm leading-relaxed text-muted md:block">
              Şu anda hazır parçalar. Her biri elde örülür; üretim siparişle başlar.
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-x-6 gap-y-24 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p, i) => (
              <ProductCard key={p.id} product={p} priority={i < 2} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- EDITORIAL STORY BAND */}
      <section id="hikaye" className="bg-surface">
        <div className="mx-auto grid max-w-wrap items-center gap-12 px-6 py-24 md:grid-cols-[1.05fr_1fr] md:gap-16 md:py-32">
          <ParallaxImage
            src="/assets/hero-hikaye.webp"
            alt="Seselka hikâyesi: örgülü amblem ve kuru dal"
            strength={0.14}
            sizes="(min-width:768px) 50vw, 100vw"
            className="aspect-[4/5] w-full rounded-[3px]"
          />

          <div>
            <span className="eyebrow">Hikâye</span>
            <RevealText
              as="h2"
              text={['Doğadan ilhamla,', 'kadın emeğiyle.']}
              className="mt-3 text-fg"
              lineClassName={`${DISPLAY} text-[clamp(2.25rem,5vw,4rem)] leading-[0.95]`}
            />
            <RevealText
              as="p"
              text={[
                'Atılacak kâğıt şehirden toplanır, ince şeritlere kesilir',
                've hasır geleneğinden gelen bir teknikle kordonlanır.',
                'Atölyede 26 kadın usta kendi temposunda çalışır;',
                'hiçbir parça bir diğerinin tıpatıp aynısı değildir.',
              ]}
              className="mt-6 max-w-md text-fg/80"
              lineClassName="text-base leading-[1.85]"
              delay={0.1}
            />
            <p className="mt-8 font-display text-lg italic text-muted">Rooted in nature · Reimagined by hand</p>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- FULL-BLEED REVEAL */}
      <section className="bg-bg">
        <div className="mx-auto max-w-wrap px-6 py-24 md:py-32">
          <RevealImage
            src="/assets/photo-packaging.webp"
            alt="Seselka paketi: kutu, kuşak, mum mührü ve örme sepet"
            sizes="(min-width:1200px) 1200px, 100vw"
            className="aspect-[16/9] w-full rounded-[3px]"
          />
          <div className="mt-12 flex flex-col items-center text-center">
            <span className="block h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
            <RevealText
              as="p"
              text={brand.taglines.primary}
              className="mt-6 text-fg"
              lineClassName={`${DISPLAY} text-[clamp(1.75rem,4vw,3rem)] leading-tight`}
            />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- FOOTER */}
      <footer className="border-t border-line bg-surface">
        <div className="mx-auto flex max-w-wrap flex-col items-start justify-between gap-6 px-6 py-12 sm:flex-row sm:items-center">
          <a href="#top" className="flex items-baseline gap-1.5 font-display text-2xl text-fg">
            seselka<span className="h-1.5 w-1.5 translate-y-[-0.15em] rounded-full bg-accent" aria-hidden="true" />
            <span className="text-base uppercase tracking-[0.3em] text-muted">Home</span>
          </a>
          <div className="text-xs uppercase tracking-[0.18em] text-muted">
            <span>{brand.taglines.short}</span>
            <span className="mx-3 text-line">/</span>
            <span>© {brand.founded} Seselka Home</span>
          </div>
        </div>
      </footer>
    </main>
    </CartProvider>
  );
}

/* ============================================================
   README block — how to reuse the foundation, and where the
   brand tokens come from. Rendered at the top of the lab.
   ============================================================ */
function ReadmeBlock() {
  const items: Array<{ name: string; how: string }> = [
    { name: '<RevealText text as className lineClassName delay />', how: 'Line-masked headline. Pass "\\n" or string[] for the lines you want.' },
    { name: '<RevealImage src alt priority className sizes />', how: 'Slow scale(1.04→1) + fade on enter. Set aspect/size via className.' },
    { name: '<ParallaxImage src alt strength className sizes />', how: 'Subtle scroll drift. strength ~0.1–0.16. Inner image is oversized so no edge shows.' },
    { name: '<ProductCard name price image sub badge cta href />', how: 'Commerce card: hover scale, display-serif name + ember dot, price, calm CTA.' },
    { name: '<PageTransition> (app/template.tsx)', how: 'Signature fig-plum wipe under 600ms, replays per route.' },
    { name: '<SmoothScrollProvider> (app/layout.tsx)', how: 'Lenis smooth scroll; auto-disabled under reduced motion.' },
  ];

  return (
    <details className="border-b border-line bg-surface text-fg">
      <summary className="mx-auto max-w-wrap cursor-pointer px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
        Geliştirici notları · bileşenleri nasıl yeniden kullanırım?
      </summary>
      <div className="mx-auto max-w-wrap px-6 pb-8">
        <p className="max-w-2xl text-sm leading-relaxed text-fg/80">
          Marka token&apos;ları (6 Türkçe renk, tipografi, logo varyantları) <code className="text-accent">lib/brand.ts</code> +{' '}
          <code className="text-accent">app/globals.css</code> içinde tek kaynaktan tanımlıdır; kaynak: &laquo;SESELKA HOME — Adaptive
          Logo System&raquo; marka panosu. Tailwind&apos;e <code className="text-accent">tailwind.config.ts</code> üzerinden bağlıdır.
          Açık/koyu mod <code className="text-accent">prefers-color-scheme</code> ile kilitlenir; tüm hareket{' '}
          <code className="text-accent">prefers-reduced-motion</code>&apos;a saygı duyar.
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {items.map((it) => (
            <li key={it.name} className="rounded-[3px] border border-line bg-bg/60 p-4">
              <code className="block text-[0.78rem] text-fg">{it.name}</code>
              <span className="mt-1.5 block text-xs leading-relaxed text-muted">{it.how}</span>
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
}
