import { ParallaxImage } from '@/components/motion/ParallaxImage';
import { RevealImage } from '@/components/motion/RevealImage';
import { RevealText } from '@/components/motion/RevealText';
import { ProductCard } from '@/components/ProductCard';
import { OrderForm } from '@/components/site/OrderForm';
import { ProcessSteps } from '@/components/site/ProcessSteps';
import { SiteFooter } from '@/components/site/SiteFooter';
import { SiteNav } from '@/components/site/SiteNav';
import { brand, formatPrice, heroMeta, products, stats } from '@/lib/brand';

const H2 = 'font-display font-medium text-[clamp(2.75rem,7vw,6rem)] leading-[0.9]';
const featured = products[0];
const rest = products.slice(1);

export default function Home() {
  return (
    <>
      <SiteNav />

      <main id="top" className="bg-bg text-fg">
        {/* ---------------------------------------------------- HERO (editorial split) */}
        <section className="relative overflow-hidden">
          <div className="mx-auto grid min-h-[100dvh] max-w-wrap items-center gap-10 px-6 pb-16 pt-28 md:grid-cols-[1.04fr_0.96fr] md:gap-14 md:pb-0 md:pt-24">
            <div className="relative z-10">
              <span className="eyebrow">Sessiz Cesaret · {brand.founded}</span>
              <RevealText
                as="h1"
                text={['Eve ait,', 'elde örülü.']}
                className="mt-6 text-fg"
                lineClassName="font-display font-medium text-[clamp(2.75rem,7.5vw,7rem)] leading-[0.86]"
              />
              <p className="mt-7 max-w-md text-base leading-relaxed text-fg/70 sm:text-lg">
                Geri dönüştürülen kâğıt, bir kadın ustanın elinde örülerek gündelik yaşam için zamansız objelere dönüşür.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a
                  href="#koleksiyon"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-accent-fill py-2 pl-6 pr-2 text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-on-accent transition-transform duration-500 ease-quiet hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  Koleksiyon
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

        {/* ---------------------------------------------------- TAGLINE STRIP */}
        <div className="border-y border-line bg-surface/40">
          <div className="mx-auto flex max-w-wrap items-center justify-center gap-5 px-6 py-5 text-[0.66rem] uppercase tracking-[0.28em] text-muted">
            <span>Doğal</span>
            <span className="text-accent" aria-hidden="true">◆</span>
            <span>Sessiz</span>
            <span className="text-accent" aria-hidden="true">◆</span>
            <span>Zamansız</span>
          </div>
        </div>

        {/* ---------------------------------------------------- COLLECTION */}
        <section id="koleksiyon" className="scroll-mt-28">
          <div className="mx-auto max-w-wrap px-6 py-28 md:py-40">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="eyebrow">Koleksiyon</span>
                <RevealText as="h2" text={['Atölyeden,', 'eve.']} className="mt-5 text-fg" lineClassName={H2} />
              </div>
              <p className="max-w-xs text-sm leading-relaxed text-muted">
                Şu anda hazır parçalar. Her biri elde örülür; üretim siparişle başlar.
              </p>
            </div>

            {/* featured piece — editorial split */}
            <div className="mt-16 grid items-center gap-10 md:grid-cols-2 md:gap-16">
              <div className="rounded-[1.8rem] border border-line bg-surface/30 p-2">
                <RevealImage
                  src={featured.image}
                  alt={featured.name}
                  sizes="(min-width:768px) 50vw, 90vw"
                  className="aspect-[4/5] w-full rounded-[1.35rem]"
                />
              </div>
              <div>
                <span className="text-[0.66rem] uppercase tracking-[0.2em] text-muted">{featured.sub}</span>
                <RevealText as="h3" text={featured.name} className="mt-2 text-fg" lineClassName="font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-[0.95]" />
                <p className="mt-5 max-w-md text-base leading-relaxed text-fg/75">
                  Elde örülmüş, kuru çiçekleriyle; duvarda ya da kapı arkasında zarif, sessiz bir köşe.
                </p>
                <div className="mt-7 flex items-center gap-6">
                  <span className="font-display text-2xl text-fg">{formatPrice(featured.price)}</span>
                  <a href="#siparis" className="group inline-flex items-center gap-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-fg">
                    Sipariş ver
                    <span className="flex h-7 w-7 items-center justify-center rounded-full border border-line transition-transform duration-500 ease-quiet group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" /></svg>
                    </span>
                  </a>
                </div>
              </div>
            </div>

            {/* the rest — double-bezel grid */}
            <div className="mt-24 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2">
              {rest.map((p, i) => (
                <ProductCard
                  key={p.id}
                  name={p.name}
                  sub={p.sub}
                  price={p.price}
                  image={p.image}
                  badge={p.badge}
                  href="#siparis"
                  priority={i < 2}
                  cta={p.price == null ? 'Sipariş ver' : 'İncele'}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- STORY */}
        <section id="hikaye" className="scroll-mt-28 bg-surface">
          <div className="mx-auto grid max-w-wrap items-center gap-12 px-6 py-28 md:grid-cols-[1fr_1.05fr] md:gap-20 md:py-40">
            <div className="order-2 md:order-1">
              <span className="eyebrow">Hikâye · 01</span>
              <RevealText as="h2" text={['Doğadan ilhamla,', 'kadın emeğiyle.']} className="mt-5 text-fg" lineClassName="font-display font-medium text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[0.95]" />
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
          <div className="mx-auto max-w-wrap px-6 py-28 md:py-40">
            <div className="max-w-2xl">
              <span className="eyebrow">Süreç · 02</span>
              <RevealText as="h2" text={['Bir kâğıt, dört nefes,', 'bir parça.']} className="mt-5 text-fg" lineClassName={H2} />
              <p className="mt-6 text-base leading-relaxed text-muted">
                Her parça aynı dört aşamadan geçer: toplanır, kordon edilir, örülür ve mum mührüyle imzalanır.
              </p>
            </div>
            <ProcessSteps />
          </div>
        </section>

        {/* ---------------------------------------------------- STATS (dark band) */}
        <section className="bg-ink text-linen">
          <div className="mx-auto max-w-wrap px-6 py-24 md:py-32">
            <p className="max-w-xl font-display text-[clamp(1.6rem,3.4vw,2.6rem)] leading-tight text-linen">
              Doğadan aldığını, doğanın hızında geri ver.
            </p>
            <div className="mt-16 grid gap-12 sm:grid-cols-3">
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
          <div className="mx-auto grid max-w-wrap items-center gap-12 px-6 py-28 md:grid-cols-[1fr_1.1fr] md:gap-16 md:py-40">
            <div className="rounded-[1.8rem] border border-line bg-bg/40 p-2">
              <RevealImage
                src="/assets/photo-basket.webp"
                alt="Örme sepetler, keten örtü ve Seselka etiketi"
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
    </>
  );
}
