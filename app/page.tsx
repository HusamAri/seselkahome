import Image from 'next/image';
import { ParallaxImage } from '@/components/motion/ParallaxImage';
import { RevealImage } from '@/components/motion/RevealImage';
import { RevealText } from '@/components/motion/RevealText';
import { ProductCard } from '@/components/ProductCard';
import { CartProvider } from '@/components/shop/CartProvider';
import { OrderForm } from '@/components/site/OrderForm';
import { ProcessSteps } from '@/components/site/ProcessSteps';
import { SiteFooter } from '@/components/site/SiteFooter';
import { SiteNav } from '@/components/site/SiteNav';
import { withBase } from '@/lib/basePath';
import { brand, heroMeta, products, stats } from '@/lib/brand';

/** Decorative cutout that overflows/overlaps its neighbour (layered depth, md+). */
function FloatCutout({ src, className, rotate = 0 }: { src: string; className: string; rotate?: number }) {
  return (
    <div className={`pointer-events-none absolute z-20 hidden md:block ${className}`} aria-hidden="true">
      <Image
        src={withBase(src)}
        alt=""
        fill
        sizes="240px"
        className="object-contain drop-shadow-[0_28px_36px_rgba(120,70,25,0.42)]"
        style={{ transform: `rotate(${rotate}deg)` }}
      />
    </div>
  );
}

const FRAME_SHADOW = 'shadow-[0_50px_90px_-50px_rgba(120,70,25,0.45)]';

export default function Home() {
  return (
    <CartProvider>
      <SiteNav />

      <main id="top" className="bg-bg text-fg">
        {/* ---------------------------------------------------- HERO (compact, shop-leading) */}
        <section className="relative overflow-hidden">
          <div className="mx-auto grid max-w-wrap items-center gap-10 px-6 pb-16 pt-32 md:min-h-[88vh] md:grid-cols-[1.04fr_0.96fr] md:gap-14 md:pb-12 md:pt-28">
            <div className="relative z-10">
              <span className="eyebrow">Doğada Köklenen · Elde Yeniden Şekillenen · {brand.founded}</span>
              <RevealText
                as="h1"
                text={['Eve ait,', 'elde örülü.']}
                className="mt-6 text-fg"
                lineClassName="font-display font-medium text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.86]"
              />
              <p className="mt-7 max-w-md text-base leading-relaxed text-fg/70 sm:text-lg">
                Geri dönüştürülen kağıt, kadın ustaların ellerinde sabırla bükülerek organik dallara ve gündelik yaşam için zamansız nesnelere dönüşür.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a
                  href="#koleksiyon"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-accent-fill py-2 pl-6 pr-2 text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-on-accent transition-transform duration-500 ease-quiet hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  Koleksiyona git
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-on-accent/15 transition-transform duration-500 ease-quiet group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" /></svg>
                  </span>
                </a>
                <a href="#hikaye" className="inline-flex items-center rounded-full border border-line px-6 py-3 text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-fg transition-colors duration-500 hover:bg-surface">
                  Hikayemiz
                </a>
              </div>

              <div className="mt-12 grid max-w-md grid-cols-3 gap-4 border-t border-line pt-6">
                {heroMeta.map((m) => (
                  <div key={m.k}>
                    <span className="block text-[0.6rem] uppercase tracking-[0.2em] text-muted">{m.k}</span>
                    <span className="mt-1 block font-display text-lg text-fg sm:text-xl">{m.v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className={`rounded-[2rem] border border-line bg-surface/30 p-2.5 ${FRAME_SHADOW}`}>
                <RevealImage
                  src="/assets/photo-detail.webp"
                  alt="Seselka hediye seti: kraft kutu, mum mührü ve örme kese"
                  priority
                  sizes="(min-width:768px) 48vw, 90vw"
                  className="aspect-[4/5] w-full rounded-[1.6rem]"
                />
              </div>
              {/* cutout overflowing the frame — layered depth */}
              <FloatCutout src="/assets/products/yuvarlak-sepet.webp" rotate={-7} className="-bottom-10 -left-12 h-40 w-40 lg:h-48 lg:w-48" />
              <span className="absolute -left-3 top-10 hidden h-2.5 w-2.5 rounded-full bg-accent md:block" aria-hidden="true" />
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- SHOP */}
        <section id="koleksiyon" className="relative scroll-mt-28 overflow-hidden border-t border-line">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-44 h-[520px] w-[860px] max-w-[120vw] -translate-x-1/2 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(var(--glow), 0.45), transparent 64%)' }}
          />
          <div className="relative mx-auto max-w-wrap px-6 py-24 md:py-32">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="eyebrow">Koleksiyon</span>
                <h2 className="mt-5 font-display font-medium text-[clamp(2.5rem,6.5vw,5.5rem)] leading-[0.92] text-fg">
                  Atölyeden <span className="italic text-accent">eve</span>
                </h2>
                <p className="mt-5 max-w-md text-sm leading-relaxed text-muted">
                  Atölyemizde stok bulunmaz. Siparişinizle birlikte size özel örülen her parça, el işçiliğinin benzersiz izlerini taşır.
                </p>
              </div>
              <p className="max-w-xs text-sm leading-relaxed text-muted">
                Elde örülmüş, sınırlı sayıda tasarım nesneler.
              </p>
            </div>

            {/* one swipeable row on all breakpoints; cards equal size */}
            <div className="no-scrollbar -mx-6 mt-12 flex snap-x snap-mandatory items-stretch gap-6 overflow-x-auto overflow-y-clip px-6 pb-4 pt-10 md:mt-16 md:gap-7 md:px-10 lg:[--card-w:340px]">
              {products.map((p, i) => (
                <div
                  key={p.id}
                  className={`shrink-0 snap-start ${
                    p.custom
                      ? 'w-[88%] sm:w-[520px]'
                      : 'w-[80%] sm:w-[330px] lg:w-[var(--card-w,340px)]'
                  }`}
                >
                  <ProductCard product={p} priority={i < 3} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- STORY */}
        <section id="hikaye" className="scroll-mt-28 bg-surface">
          <div className="mx-auto grid max-w-wrap items-center gap-12 px-6 py-24 md:grid-cols-[1fr_1.05fr] md:gap-20 md:py-32">
            <div className="order-2 md:order-1">
              <span className="eyebrow">Hikaye · 01</span>
              <RevealText as="h2" text={['Hayata getiren elden,', 'hayata döndüren ele.']} className="mt-5 text-fg" lineClassName="font-display font-medium text-[clamp(2.25rem,5vw,4rem)] leading-[0.95]" />
              <p className="mt-7 max-w-md text-base leading-[1.9] text-fg/75">
                Seselka’nın kurucusu Sefa Selver, örgünün en yeni öğrencisi. Örerken bulduğu huzuru bir girişime dönüştürdü: bu emeğe destek olmanın, birlikte üretmenin ve o huzuru çoğaltmanın yollarını ararken Seselka doğdu.
              </p>
              <p className="mt-6 max-w-md text-base leading-[1.9] text-muted">
                Burada fabrikadan çıkmış ürünler bulmayacaksınız. Her parça, “kadın isterse” diye başlayan cümlelerin elle tutulabilir hali; sabırla, emekle örülmüş tekil bir hikâye. Bu yüzden hiçbiri bir diğerinin tıpatıp aynısı değildir.
              </p>
              <p className="mt-6 max-w-md text-base leading-[1.9] text-muted">
                Çünkü Seselka değer yaratmak için burada: hem üreten kadınlara, hem dayanışmayla yanında duranlara. İlerici bir vizyon, kadın emeği odaklı bir misyon ve bu yoldaki yaşanmışlıkları paylaşmanın vaadi.
              </p>
              <p className="mt-9 font-display text-xl italic text-accent">Doğada köklenir · Elde yeniden doğar</p>
            </div>

            <div className="relative order-1 md:order-2">
              <div className={`rounded-[1.8rem] border border-line bg-bg/40 p-2 ${FRAME_SHADOW}`}>
                <ParallaxImage
                  src="/assets/photo-packaging.webp"
                  alt="Seselka ambalajı: kraft kutu, kuşak, mum mührü ve örme sepet"
                  strength={0.14}
                  sizes="(min-width:768px) 50vw, 90vw"
                  className="aspect-[4/5] w-full rounded-[1.35rem]"
                />
              </div>
              {/* wax seal overflowing the frame */}
              <FloatCutout src="/assets/wax-seal.webp" rotate={-10} className="-left-9 -top-9 h-24 w-24" />
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- PROCESS */}
        <section id="surec" className="scroll-mt-28">
          <div className="mx-auto max-w-wrap px-6 py-24 md:py-32">
            <div className="max-w-2xl">
              <span className="eyebrow">Süreç · 02</span>
              <RevealText as="h2" text={['Bir kağıt, dört nefes,', 'bir parça.']} className="mt-5 text-fg" lineClassName="font-display font-medium text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[0.95]" />
              <p className="mt-6 text-base leading-relaxed text-muted">
                Doğal malzemeyle yavaşlayan bu süreçte, her nesne el işçiliğinin değerini taşıyan aynı dört özgün aşamadan geçer.
              </p>
            </div>
            <ProcessSteps />
          </div>
        </section>

        {/* ---------------------------------------------------- STATS */}
        <section className="relative bg-ink text-linen">
          {/* a piece crests over the top edge of the dark band */}
          <FloatCutout src="/assets/products/asili-sepet.webp" rotate={5} className="-top-28 right-[7%] h-56 w-44 lg:right-[10%]" />
          <div className="relative mx-auto max-w-wrap px-6 py-24 md:py-28">
            <p className="max-w-xl font-display text-[clamp(1.6rem,3.4vw,2.6rem)] leading-tight text-linen">
              Doğadan aldığını, doğanın hızında geri ver.
            </p>
            <div className="mt-14 grid gap-12 sm:grid-cols-3">
              {stats.map((s) => (
                <div key={s.label} className="border-t border-linen/20 pt-6">
                  <span className="font-display text-[clamp(3.5rem,7vw,5.5rem)] leading-none text-linen">
                    {s.big}
                    <span className="text-[#d8897b]">{s.unit}</span>
                  </span>
                  <span className="mt-4 block text-sm font-semibold uppercase tracking-[0.18em] text-linen/90">{s.label}</span>
                  <span className="mt-2 block max-w-xs text-sm leading-relaxed text-linen/55">{s.sub}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- ORDER */}
        <section id="siparis" className="scroll-mt-28 bg-surface">
          <div className="mx-auto grid max-w-wrap items-center gap-12 px-6 py-24 md:grid-cols-[1fr_1.1fr] md:gap-16 md:py-32">
            <div className={`rounded-[1.8rem] border border-line bg-bg/40 p-2 ${FRAME_SHADOW}`}>
              <RevealImage
                src="/assets/photo-basket.webp"
                alt="Örme sepetler, keten örtü ve Seselka etiketi"
                sizes="(min-width:768px) 45vw, 90vw"
                className="aspect-[4/5] w-full rounded-[1.35rem]"
              />
            </div>

            <div>
              <span className="eyebrow">Sipariş · 03</span>
              <RevealText as="h2" text={['Düşlediğiniz parçayı', 'bize iletin.']} className="mt-5 text-fg" lineClassName="font-display font-medium text-[clamp(2.5rem,6vw,5rem)] leading-[0.92]" />
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
                Atölyemizde seri üretim yapılmaz; nesneler yalnızca sizin için ve siparişiniz üzerine üretilir. Evinizin ölçülerine özel detaylar için aşağıdaki formu kullanabilirsiniz.
              </p>
              <div className="mt-9 rounded-[1.6rem] border border-line bg-bg p-6 sm:p-8">
                <OrderForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </CartProvider>
  );
}
