import { ParallaxImage } from '@/components/motion/ParallaxImage';
import { RevealImage } from '@/components/motion/RevealImage';
import { RevealText } from '@/components/motion/RevealText';
import { ProductCard } from '@/components/ProductCard';
import { CartProvider } from '@/components/shop/CartProvider';
import { OrderForm } from '@/components/site/OrderForm';
import { ProcessSteps } from '@/components/site/ProcessSteps';
import { SiteFooter } from '@/components/site/SiteFooter';
import { SiteNav } from '@/components/site/SiteNav';
import { brand, heroMeta, products, stats } from '@/lib/brand';

const H2 = 'font-display font-medium text-[clamp(2.5rem,6.5vw,5.5rem)] leading-[0.92]';

export default function Home() {
  return (
    <CartProvider>
      <SiteNav />

      <main id="top" className="bg-bg text-fg">
        {/* ---------------------------------------------------- HERO (compact, shop-leading) */}
        <section className="relative overflow-hidden">
          <div className="mx-auto grid max-w-wrap items-center gap-10 px-6 pb-16 pt-32 md:min-h-[88vh] md:grid-cols-[1.04fr_0.96fr] md:gap-14 md:pb-12 md:pt-28">
            <div className="relative z-10">
              <span className="eyebrow">Sessiz Cesaret · {brand.founded}</span>
              <RevealText
                as="h1"
                text={['Eve ait,', 'elde örülü.']}
                className="mt-6 text-fg"
                lineClassName="font-display font-medium text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.86]"
              />
              <p className="mt-7 max-w-md text-base leading-relaxed text-fg/70 sm:text-lg">
                Geri dönüştürülen kâğıt, bir kadın ustanın elinde örülerek gündelik yaşam için zamansız objelere dönüşür.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a
                  href="#urunler"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-accent-fill py-2 pl-6 pr-2 text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-on-accent transition-transform duration-500 ease-quiet hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  Koleksiyona git
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-on-accent/15 transition-transform duration-500 ease-quiet group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" /></svg>
                  </span>
                </a>
                <a href="#hikaye" className="inline-flex items-center rounded-full border border-line px-6 py-3 text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-fg transition-colors duration-500 hover:bg-surface">
                  Hikâyemiz
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
              <div className="rounded-[2rem] border border-line bg-surface/30 p-2.5">
                <RevealImage
                  src="/assets/photo-detail.webp"
                  alt="Seselka hediye seti: kraft kutu, mum mührü ve örme kese"
                  priority
                  sizes="(min-width:768px) 48vw, 90vw"
                  className="aspect-[4/5] w-full rounded-[1.6rem]"
                />
              </div>
              <span className="absolute -left-3 top-10 hidden h-2.5 w-2.5 rounded-full bg-accent md:block" aria-hidden="true" />
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- SHOP */}
        <section id="urunler" className="scroll-mt-28 border-t border-line">
          <div className="mx-auto max-w-wrap px-6 py-24 md:py-32">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="eyebrow">Koleksiyon</span>
                <RevealText as="h2" text={['Atölyeden, eve.']} className="mt-5 text-fg" lineClassName={H2} />
              </div>
              <p className="max-w-xs text-sm leading-relaxed text-muted">
                Elde örülmüş, hazır parçalar. Sepete ekleyin; üretim siparişle başlar, 10-14 günde kapınızda.
              </p>
            </div>

            {/* lead piece */}
            <div className="mt-14">
              <ProductCard product={products[0]} featured priority />
            </div>

            {/* catalog */}
            <div className="mt-20 grid grid-cols-1 gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {products.slice(1).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- STORY */}
        <section id="hikaye" className="scroll-mt-28 bg-surface">
          <div className="mx-auto grid max-w-wrap items-center gap-12 px-6 py-24 md:grid-cols-[1fr_1.05fr] md:gap-20 md:py-32">
            <div className="order-2 md:order-1">
              <span className="eyebrow">Hikâye · 01</span>
              <RevealText as="h2" text={['Doğadan ilhamla,', 'kadın emeğiyle.']} className="mt-5 text-fg" lineClassName="font-display font-medium text-[clamp(2.25rem,5vw,4rem)] leading-[0.95]" />
              <RevealText
                as="p"
                text={[
                  'Seselka Home, atılacak kâğıdı yeniden ele alır. Her parça önce',
                  'şehirden toplanır; sonra ince şeritlere kesilir, kordonlanır ve',
                  'hasır geleneğinden gelen bir teknikle örülür.',
                ]}
                className="mt-7 max-w-md text-fg/75"
                lineClassName="text-base leading-[1.9]"
                delay={0.08}
              />
              <p className="mt-6 max-w-md text-base leading-[1.9] text-muted">
                Atölyede 26 kadın usta kendi temposunda çalışır. Bir sepetin tamamlanması ortalama 34 saat sürer; hiçbir parça bir diğerinin tıpatıp aynısı değildir.
              </p>
              <p className="mt-9 font-display text-xl italic text-accent">Rooted in nature · Reimagined by hand</p>
            </div>

            <div className="order-1 rounded-[1.8rem] border border-line bg-bg/40 p-2 md:order-2">
              <ParallaxImage
                src="/assets/photo-packaging.webp"
                alt="Seselka ambalajı: kraft kutu, kuşak, mum mührü ve örme sepet"
                strength={0.14}
                sizes="(min-width:768px) 50vw, 90vw"
                className="aspect-[4/5] w-full rounded-[1.35rem]"
              />
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- PROCESS */}
        <section id="surec" className="scroll-mt-28">
          <div className="mx-auto max-w-wrap px-6 py-24 md:py-32">
            <div className="max-w-2xl">
              <span className="eyebrow">Süreç · 02</span>
              <RevealText as="h2" text={['Bir kâğıt, dört nefes,', 'bir parça.']} className="mt-5 text-fg" lineClassName="font-display font-medium text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[0.95]" />
              <p className="mt-6 text-base leading-relaxed text-muted">
                Her parça aynı dört aşamadan geçer: toplanır, kordon edilir, örülür ve mum mührüyle imzalanır.
              </p>
            </div>
            <ProcessSteps />
          </div>
        </section>

        {/* ---------------------------------------------------- STATS */}
        <section className="bg-ink text-linen">
          <div className="mx-auto max-w-wrap px-6 py-24 md:py-28">
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
            <div className="rounded-[1.8rem] border border-line bg-bg/40 p-2">
              <RevealImage
                src="/assets/photo-detail.webp"
                alt="Seselka hediye seti: kutu, mum mühürlü zarf ve kese"
                sizes="(min-width:768px) 45vw, 90vw"
                className="aspect-[4/5] w-full rounded-[1.35rem]"
              />
            </div>

            <div>
              <span className="eyebrow">Sipariş · 03</span>
              <RevealText as="h2" text={['Siparişe', 'başlayın.']} className="mt-5 text-fg" lineClassName="font-display font-medium text-[clamp(2.5rem,6vw,5rem)] leading-[0.92]" />
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
                Üretim, siparişin onayından sonra başlar. Ev ölçülerinize özel boyut da yapılabilir; aşağıya yazmanız yeterli.
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
