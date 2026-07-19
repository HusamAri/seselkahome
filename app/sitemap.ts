import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';
import { products } from '@/lib/brand';

// Static export: emitted as /sitemap.xml at build time.
// URLs use trailing slashes to match next.config trailingSlash + canonicals.
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const productPages: MetadataRoute.Sitemap = products
    .filter((product) => !product.hidden && !product.custom)
    .map((product) => ({
      url: `${SITE_URL}/urunler/${product.id}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: product.sold ? 0.5 : 0.8,
    }));

  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/rehber/`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/rehber/hasir-dekorasyon-rehberi/`, lastModified: new Date('2026-07-19'), changeFrequency: 'monthly', priority: 0.8 },
    ...productPages,
    { url: `${SITE_URL}/mesafeli-satis/`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/kvkk-aydinlatma/`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];
}
