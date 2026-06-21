/**
 * SEO yardımcıları — JSON-LD (schema.org) yapısal verisi tek kaynaktan.
 * Statik export'ta server component'lerde render edilir, böylece SSG HTML'ine
 * girer ve crawler'lar görür. Veriler lib/brand.ts'ten beslenir.
 */
import { brand, contact, faqs, instagram, products, reviews, salePrice, seller, type Product } from '@/lib/brand';

/** Canonical site kökü — app/layout.tsx metadataBase ile aynı olmalı. */
export const SITE_URL = 'https://seselkahome.com';

export const absUrl = (path: string) => `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`;

/** Sitede gösterilen efektif satış fiyatı (indirim hariç tutulanlar dışında). */
function effectivePrice(p: Product): number | null {
  if (p.price == null) return null;
  return p.noDiscount ? p.price : salePrice(p.price);
}

/** Organization — marka kimliği (sitewide). */
export function organizationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: brand.name,
    url: SITE_URL,
    email: contact.email,
    logo: absUrl('/assets/apple-touch-icon.png'),
    image: absUrl('/assets/koleksiyon-hero.webp'),
    description:
      'Geri dönüştürülmüş kağıttan, kadın emeğiyle elde örülen hasır sepet, avize ve dekoratif ev objeleri. Siparişe özel üretim.',
    founder: { '@type': 'Person', name: seller.legalName },
    foundingDate: String(brand.founded),
    areaServed: { '@type': 'Country', name: 'Türkiye' },
    address: {
      '@type': 'PostalAddress',
      addressLocality: seller.district,
      addressRegion: seller.city,
      addressCountry: 'TR',
    },
    sameAs: [instagram.url],
  };
}

/** WebSite — site düğümü. */
export function webSiteLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: brand.name,
    url: SITE_URL,
    inLanguage: 'tr-TR',
    publisher: { '@id': `${SITE_URL}/#organization` },
  };
}

/** Tüm tekliflerde ortak: Türkiye geneli ücretsiz kargo. */
const SHIPPING_DETAILS = {
  '@type': 'OfferShippingDetails',
  shippingRate: { '@type': 'MonetaryAmount', value: 0, currency: 'TRY' },
  shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'TR' },
  deliveryTime: {
    '@type': 'ShippingDeliveryTime',
    transitTime: { '@type': 'QuantitativeValue', minValue: 1, maxValue: 4, unitCode: 'DAY' },
  },
};

/** Siparişe/kişiye özel üretim → cayma istisnası (Mesafeli Söz. Yön. md. 15/1-b). */
const RETURN_POLICY = {
  '@type': 'MerchantReturnPolicy',
  applicableCountry: 'TR',
  returnPolicyCategory: 'https://schema.org/MerchantReturnNotPermitted',
};

/** Tek bir ürün için Product düğümü (TRY fiyat + made-to-order/sold uç durumları). */
function productLd(p: Product) {
  const node: Record<string, unknown> = {
    '@type': 'Product',
    '@id': `${SITE_URL}/#urun-${p.id}`,
    name: p.name,
    category: p.sub,
    image: (p.gallery?.length ? p.gallery : [p.image]).map(absUrl),
    description: p.desc ?? '',
    brand: { '@type': 'Brand', name: brand.name },
    material: 'Geri dönüştürülmüş kağıt',
  };
  const price = effectivePrice(p);
  if (p.sold) {
    node.offers = {
      '@type': 'Offer',
      priceCurrency: 'TRY',
      ...(p.price != null ? { price: p.price } : {}),
      availability: 'https://schema.org/SoldOut',
      url: `${SITE_URL}/#koleksiyon`,
      shippingDetails: SHIPPING_DETAILS,
      hasMerchantReturnPolicy: RETURN_POLICY,
    };
  } else if (price != null) {
    node.offers = {
      '@type': 'Offer',
      priceCurrency: 'TRY',
      price,
      availability: 'https://schema.org/PreOrder', // siparişe özel üretim
      itemCondition: 'https://schema.org/NewCondition',
      url: `${SITE_URL}/#koleksiyon`,
      shippingDetails: SHIPPING_DETAILS,
      hasMerchantReturnPolicy: RETURN_POLICY,
    };
  }
  // price === null (Özel Ölçü) kalemleri grafiğe alınmadığından offers her zaman vardır.

  // Gerçek müşteri yorumları (görünür Yorumlar bölümüyle birebir eşleşir) → yıldız
  // zengin sonucu. Yorumu olmayan ürüne puan UYDURULMAZ.
  const productReviews = reviews.filter((r) => r.piece === p.name);
  if (productReviews.length) {
    node.review = productReviews.map((r) => ({
      '@type': 'Review',
      reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5, worstRating: 1 },
      author: { '@type': 'Person', name: r.name },
      ...(r.text ? { reviewBody: r.text } : {}),
    }));
    node.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: productReviews.reduce((s, r) => s + r.rating, 0) / productReviews.length,
      reviewCount: productReviews.length,
      bestRating: 5,
      worstRating: 1,
    };
  }

  return node;
}

/** Tüm görünür ürünler için Product grafiği (home'da render edilir). */
export function productsLd() {
  return {
    '@context': 'https://schema.org',
    // Fiyatsız "Özel Ölçü" (custom) kartı hariç: Product için offers/review/
    // aggregateRating zorunlu ve fiyatsız öğe geçerli bir teklif üretemez.
    '@graph': products.filter((p) => !p.hidden && p.price != null).map(productLd),
  };
}

/** FAQPage — görünür SSS bölümüyle birebir aynı sorulardan üretilir. */
export function faqLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}
