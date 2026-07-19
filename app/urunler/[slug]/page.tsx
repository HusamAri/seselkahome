import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/site/JsonLd';
import { SiteFooter } from '@/components/site/SiteFooter';
import { formatPrice, products, salePrice } from '@/lib/brand';
import { absUrl, productLd } from '@/lib/seo';

type Props = { params: { slug: string } };

const catalogProducts = products.filter((product) => !product.hidden && !product.custom);

export function generateStaticParams() {
  return catalogProducts.map((product) => ({ slug: product.id }));
}

export function generateMetadata({ params }: Props): Metadata {
  const product = catalogProducts.find((item) => item.id === params.slug);
  if (!product) return {};

  const description = product.desc ?? `${product.name}, Seselka Home tarafından siparişe özel ve elde örülür.`;
  const canonical = `/urunler/${product.id}/`;

  return {
    title: `${product.name} | El Yapımı Kağıt Hasır | Seselka Home`,
    description,
    alternates: { canonical },
    openGraph: {
      title: `${product.name} | Seselka Home`,
      description,
      url: canonical,
      type: 'website',
      images: [{ url: product.image, alt: product.alt ?? product.name }],
    },
  };
}

export default function ProductPage({ params }: Props) {
  const product = catalogProducts.find((item) => item.id === params.slug);
  if (!product) notFound();

  const gallery = product.gallery?.length ? product.gallery : [product.image];
  const displayPrice = product.price == null
    ? null
    : product.noDiscount || product.sold
      ? product.price
      : salePrice(product.price);
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: absUrl('/') },
      { '@type': 'ListItem', position: 2, name: 'Koleksiyon', item: absUrl('/#koleksiyon') },
      { '@type': 'ListItem', position: 3, name: product.name, item: absUrl(`/urunler/${product.id}/`) },
    ],
  };

  return (
    <>
      <JsonLd data={productLd(product)} />
      <JsonLd data={breadcrumbLd} />

      <header className="border-b border-line bg-surface/40">
        <div className="mx-auto flex max-w-wrap items-center justify-between px-6 py-5">
          <a href="/" className="flex items-baseline gap-1.5 font-display text-2xl text-fg">
            seselka
            <span className="h-1.5 w-1.5 translate-y-[-0.15em] rounded-full bg-accent" aria-hidden="true" />
            <span className="text-sm uppercase tracking-[0.32em] text-muted">Home</span>
          </a>
          <a href="/#koleksiyon" className="text-[0.72rem] font-medium uppercase tracking-[0.16em] text-muted transition-colors hover:text-accent">
            ← Koleksiyon
          </a>
        </div>
      </header>

      <main id="top" className="bg-bg text-fg">
        <article className="mx-auto max-w-wrap px-6 py-16 md:py-24">
          <nav aria-label="Sayfa yolu" className="text-xs uppercase tracking-[0.16em] text-muted">
            <a href="/" className="hover:text-accent">Ana Sayfa</a>
            <span aria-hidden="true"> · </span>
            <a href="/#koleksiyon" className="hover:text-accent">Koleksiyon</a>
            <span aria-hidden="true"> · </span>
            <span aria-current="page">{product.name}</span>
          </nav>

          <div className="mt-8 grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20">
            <div className="grid gap-4 sm:grid-cols-2">
              {gallery.map((src, index) => (
                <div
                  key={src}
                  className={`relative overflow-hidden rounded-[1.6rem] border border-line bg-card ${
                    index === 0 ? 'aspect-[4/5] sm:col-span-2' : 'aspect-square'
                  }`}
                >
                  <Image
                    src={src}
                    alt={product.galleryAlt?.[index] ?? product.alt ?? product.name}
                    fill
                    priority={index === 0}
                    sizes={index === 0 ? '(min-width:1024px) 55vw, 92vw' : '(min-width:1024px) 27vw, 45vw'}
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            <div className="lg:sticky lg:top-8 lg:self-start">
              <span className="eyebrow">{product.sub}</span>
              <h1 className="mt-5 font-display text-[clamp(3rem,7vw,5.5rem)] font-medium leading-[0.9]">
                {product.name}<span className="text-accent">.</span>
              </h1>

              <div className="mt-7 flex flex-wrap items-baseline gap-3">
                {displayPrice != null ? (
                  <span className="font-display text-3xl text-fg">{formatPrice(displayPrice)}</span>
                ) : null}
                {!product.noDiscount && !product.sold && product.price != null ? (
                  <span className="text-sm text-muted line-through">{formatPrice(product.price)}</span>
                ) : null}
                {product.sold ? (
                  <span className="rounded-full border border-line px-3 py-1 text-xs uppercase tracking-[0.14em] text-muted">Satıldı</span>
                ) : (
                  <span className="rounded-full border border-accent/30 px-3 py-1 text-xs uppercase tracking-[0.14em] text-accent">Siparişe özel</span>
                )}
              </div>

              <p className="mt-7 text-base leading-[1.9] text-fg/75">{product.desc}</p>
              {product.use ? <p className="mt-5 text-base leading-[1.9] text-muted">{product.use}</p> : null}

              {product.meta?.length ? (
                <ul className="mt-8 grid gap-3 border-y border-line py-6 sm:grid-cols-3 lg:grid-cols-1">
                  {product.meta.map((item) => (
                    <li key={item} className="text-sm text-fg/80">{item}</li>
                  ))}
                </ul>
              ) : null}

              {!product.sold ? (
                <a
                  href={`/#siparis`}
                  className="mt-8 flex w-full items-center justify-center rounded-full bg-fg py-4 text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-bg transition-colors hover:bg-ink"
                >
                  Bu parça için sipariş talebi oluştur
                </a>
              ) : null}

              <div className="legal-prose mt-10">
                <h2>Malzeme ve üretim</h2>
                <p>
                  Geri dönüştürülmüş kağıt ince şeritlere ayrılır, elde bükülerek dayanıklı kağıt kordona dönüşür ve kadın ustaların ellerinde tek tek örülür. Stok tutulmaz; her yeni parça sipariş üzerine hazırlanır.
                </p>
                <h2>Teslimat ve bakım</h2>
                <p>
                  Üretim süresi parçaya göre 2 ile 6 hafta arasındadır. Türkiye geneline ücretsiz kargo yapılır. Formunu ve rengini koruması için kuru, yumuşak bir bezle temizleyin; su, yoğun nem ve uzun süreli doğrudan güneşten uzak tutun.
                </p>
              </div>
            </div>
          </div>
        </article>
      </main>

      <SiteFooter sectionBase="/" />
    </>
  );
}
