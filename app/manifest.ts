import type { MetadataRoute } from 'next';

// Static export: emitted as /manifest.webmanifest at build time.
export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Seselka Home',
    short_name: 'Seselka',
    description: 'El yapımı, geri dönüştürülmüş kağıttan örülen hasır sepet, avize ve dekoratif ev objeleri.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f4efe6',
    theme_color: '#f4efe6',
    lang: 'tr',
    icons: [
      { src: '/assets/favicon-48.png', sizes: '48x48', type: 'image/png' },
      { src: '/assets/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  };
}
