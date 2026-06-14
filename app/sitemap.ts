import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

// Static export: emitted as /sitemap.xml at build time.
// URLs use trailing slashes to match next.config trailingSlash + canonicals.
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/mesafeli-satis/`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/kvkk-aydinlatma/`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];
}
