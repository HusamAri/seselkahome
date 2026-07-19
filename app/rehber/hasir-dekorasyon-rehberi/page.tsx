import type { Metadata } from 'next';
import Image from 'next/image';
import { JsonLd } from '@/components/site/JsonLd';
import { SiteFooter } from '@/components/site/SiteFooter';
import { absUrl, SITE_URL } from '@/lib/seo';

const TITLE = 'Hasır Dekorasyon Rehberi: Doğal Dokuları Eve Taşımanın 7 Yolu';
const DESCRIPTION =
  'Hasır sepet, avize ve sehpa gibi doğal dokulu ürünleri salon, yatak odası ve antrede dengeli kullanmak için 7 zamansız dekorasyon fikri.';
const PATH = '/rehber/hasir-dekorasyon-rehberi/';

export const metadata: Metadata = {
  title: `${TITLE} | Seselka Home`,
  description: DESCRIPTION,
  keywords: ['hasır dekorasyon', 'hasır ürünler', 'doğal dekorasyon', 'kağıt hasır', 'el yapımı ev dekorasyonu'],
  alternates: { canonical: PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PATH,
    type: 'article',
    publishedTime: '2026-07-19',
    images: [
      {
        url: '/assets/products/hasir-avize-3.webp',
        alt: 'Yemek masasının üzerinde el yapımı hasır avize ile doğal dekorasyon',
      },
    ],
  },
};

export default function HasirDecorationGuidePage() {
  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${absUrl(PATH)}#article`,
    headline: TITLE,
    description: DESCRIPTION,
    image: absUrl('/assets/products/hasir-avize-3.webp'),
    datePublished: '2026-07-19',
    dateModified: '2026-07-19',
    inLanguage: 'tr-TR',
    mainEntityOfPage: absUrl(PATH),
    author: { '@type': 'Organization', name: 'Seselka Home', url: SITE_URL },
    publisher: { '@id': `${SITE_URL}/#organization` },
  };
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: absUrl('/') },
      { '@type': 'ListItem', position: 2, name: 'Rehber', item: absUrl('/rehber/') },
      { '@type': 'ListItem', position: 3, name: TITLE, item: absUrl(PATH) },
    ],
  };

  return (
    <>
      <JsonLd data={articleLd} />
      <JsonLd data={breadcrumbLd} />

      <header className="border-b border-line bg-surface/40">
        <div className="mx-auto flex max-w-wrap items-center justify-between px-6 py-5">
          <a href="/" className="flex items-baseline gap-1.5 font-display text-2xl text-fg">
            seselka
            <span className="h-1.5 w-1.5 translate-y-[-0.15em] rounded-full bg-accent" aria-hidden="true" />
            <span className="text-sm uppercase tracking-[0.32em] text-muted">Home</span>
          </a>
          <a href="/rehber/" className="text-[0.72rem] font-medium uppercase tracking-[0.16em] text-muted transition-colors hover:text-accent">
            ← Tüm rehberler
          </a>
        </div>
      </header>

      <main id="top" className="bg-bg text-fg">
        <article>
          <header className="mx-auto max-w-4xl px-6 pb-12 pt-20 text-center md:pb-16 md:pt-28">
            <nav aria-label="Sayfa yolu" className="text-xs uppercase tracking-[0.16em] text-muted">
              <a href="/" className="hover:text-accent">Ana Sayfa</a>
              <span aria-hidden="true"> · </span>
              <a href="/rehber/" className="hover:text-accent">Rehber</a>
            </nav>
            <span className="eyebrow mt-8 inline-block">Dekorasyon · 8 dk okuma</span>
            <h1 className="mt-6 font-display text-[clamp(3rem,7.5vw,6rem)] font-medium leading-[0.9]">
              Hasır dekorasyon rehberi<span className="text-accent">.</span>
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-[1.8] text-fg/70">
              Doğal dokuları eve taşımanın 7 dengeli ve zamansız yolu.
            </p>
            <p className="mt-6 text-xs uppercase tracking-[0.16em] text-muted">
              Seselka Home · 19 Temmuz 2026
            </p>
          </header>

          <div className="relative mx-auto aspect-[16/8] max-w-[1400px] overflow-hidden md:rounded-[2rem]">
            <Image
              src="/assets/products/hasir-avize-3.webp"
              alt="Yemek masasının üzerinde el yapımı hasır avize ve doğal dokulu ev dekorasyonu"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <div className="legal-prose mx-auto max-w-3xl px-6 py-16 md:py-24">
            <p>
              Hasır dekorasyon, bir evi bütünüyle bohem göstermek zorunda değildir. Örgülü bir yüzey; ahşap, keten, seramik ve taş gibi doğal dekoratif malzemeler arasında sessiz bir bağ kurabilir. Doğru ölçü ve doğru yerde kullanıldığında hasır ürünler yalnızca sıcaklık eklemez, mekandaki sert çizgileri de yumuşatır.
            </p>
            <p>
              Seselka’da geleneksel hasır görünümü, geri dönüştürülmüş kağıdın elde bükülüp kordona dönüştürülmesiyle yeniden yorumlanır. Bu nedenle her parçada doğal dokunun tanıdık hissi ile kağıdın dönüşüm hikayesi birlikte yaşar.
            </p>

            <h2>1. Tek bir odak parçasıyla başlayın</h2>
            <p>
              Bir odada çok sayıda örgülü obje kullanmak yerine önce tek bir güçlü parça seçin. Yemek masasının üzerinde <a href="/urunler/hasir-avize/">el yapımı hasır avize</a>, koltuğun yanında <a href="/urunler/hasir-sehpa/">kağıt hasır sehpa</a> veya antrede geniş bir sepet yeterli olabilir. Tek odak, malzemenin dokusunu görünür kılar ve dekorasyonun temaya dönüşmesini engeller.
            </p>

            <h2>2. Hasırı düz ve sakin yüzeylerle dengeleyin</h2>
            <p>
              Hasırın örgü dokusu görsel olarak hareketlidir. Bu hareketi kireç tonlu bir duvar, düz keten perde, mat seramik veya sade bir ahşap yüzeyle dengeleyin. Desenli tekstiller de kullanılabilir ancak aynı görüş alanında birden fazla güçlü desen olduğunda hasırın el işçiliği geri planda kalır.
            </p>

            <h2>3. Aynı tonda değil, aynı sıcaklıkta malzemeler seçin</h2>
            <p>
              Doğal dekorasyon her parçanın bej olması anlamına gelmez. Açık kağıt hasır; ceviz ağacı, kiremit, mürdüm, zeytin yeşili ve kırık beyazla birlikte çalışabilir. Renkleri birebir eşleştirmek yerine sıcak veya soğuk alt tonlarını uyumlu tutun. Böylece mekan katmanlı görünür fakat dağılmaz.
            </p>

            <figure className="my-12">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem]">
                <Image
                  src="/assets/products/sehpa-3.webp"
                  alt="Koltuğun yanında kitap ve kahveyle kullanılan el örgüsü hasır sehpa"
                  fill
                  sizes="(min-width:768px) 768px, 92vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 text-sm text-muted">
                İşlevli bir parça, doğal dokuyu gündelik yaşamın içine taşır.
              </figcaption>
            </figure>

            <h2>4. Dekoratif objeyi gündelik bir işleve bağlayın</h2>
            <p>
              En kalıcı dekorasyon kararları yalnızca güzel görünen değil, kullanılan parçalardır. <a href="/urunler/yuvarlak-sepet/">Yuvarlak Sepet</a> masada ekmek ve meyveye, girişte anahtar ve mektuplara yer açar. <a href="/urunler/asili-sepet/">Asılı Sepet</a> kurutulmuş çiçekleri taşırken boş bir duvara derinlik verir. Kullanım, objenin evle kurduğu ilişkiyi güçlendirir.
            </p>

            <h2>5. Küçük mekanlarda zemini değil, duvarı kullanın</h2>
            <p>
              Dar antrelerde ve küçük yatak odalarında duvara asılan sepetler, örgü çerçeveli aynalar ve hafif dekoratif objeler doğal doku eklerken dolaşım alanını korur. Farklı parçaları yan yana kullanacaksanız aralarında boşluk bırakın. Hasırın gölgeleri de kompozisyonun bir parçasıdır.
            </p>

            <h2>6. Işığın örgüden geçmesine izin verin</h2>
            <p>
              Hasır aydınlatmanın etkisi yalnızca lambanın formundan gelmez. Örgünün arasından geçen ışık tavanda ve duvarda yumuşak gölgeler oluşturur. Avizeyi çok güçlü, soğuk bir ampulle kullanmak yerine sıcak renk sıcaklığında ve gözü yormayan bir ışık seçin. Yemek masası ve dinlenme köşeleri bu etki için uygun alanlardır.
            </p>

            <h2>7. Bakımı dekorasyon kararının parçası yapın</h2>
            <p>
              Kağıt hasır ürünlerin tozunu kuru, yumuşak bir bez veya fırçayla alın. Doğrudan su, yoğun nem ve uzun süreli güneş, doğal lif yapısının formunu ve rengini etkileyebilir. Banyo gibi sürekli nemli alanlar yerine salon, antre, yatak odası ve kapalı yemek alanlarını tercih edin.
            </p>

            <h2>Hasır ürün seçerken nelere bakılmalı?</h2>
            <ul>
              <li><strong>Ölçü:</strong> Ürünün yalnızca çapını değil, çevresinde bırakacağı boşluğu da hesaplayın.</li>
              <li><strong>İşlev:</strong> Sepetin, sehpanın veya aydınlatmanın günlük yaşamda nerede kullanılacağını belirleyin.</li>
              <li><strong>Malzeme:</strong> Ürünün doğal hasırdan mı, kağıt kordondan mı yoksa sentetik liften mi üretildiğini sorun.</li>
              <li><strong>Üretim biçimi:</strong> El yapımı parçalarda küçük form farklılıklarının kusur değil, üretimin izi olduğunu kabul edin.</li>
              <li><strong>Bakım:</strong> Ürünün yaşayacağı alanın nem ve doğrudan güneş koşullarını değerlendirin.</li>
            </ul>

            <h2>Kağıt hasır ile doğal hasır arasındaki fark nedir?</h2>
            <p>
              Doğal hasır; saz, rattan veya benzeri bitkisel liflerden üretilebilir. Kağıt hasırda ise kağıt şeritleri bükülerek örülebilir bir kordon elde edilir. Görsel olarak benzer bir sıcaklık taşısalar da kaynak malzeme, bakım ihtiyacı ve üretim hikayesi farklıdır. Seselka parçaları geri dönüştürülmüş kağıdın elde şekillendirilmesiyle üretilir.
            </p>

            <aside className="mt-12 rounded-[1.5rem] border border-line bg-card p-7 md:p-9">
              <span className="eyebrow">Atölyeden eve</span>
              <h2 className="mt-4">Evinize uyacak parçayı bulun.</h2>
              <p>
                Sepet, avize ve sehpa seçeneklerini inceleyin. Her parça stoktan değil, siparişinizle birlikte elde örülür.
              </p>
              <a
                href="/#koleksiyon"
                className="mt-6 inline-flex rounded-full bg-fg px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-bg no-underline"
              >
                Koleksiyonu keşfet
              </a>
            </aside>
          </div>
        </article>
      </main>

      <SiteFooter sectionBase="/" />
    </>
  );
}
