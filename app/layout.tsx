import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';
import { BASE_PATH } from '@/lib/basePath';
import './globals.css';

// Display = high-contrast serif (the SESELKA wordmark).
// Body = light humanist sans (labels + copy). latin-ext covers Turkish glyphs.
const display = Cormorant_Garamond({
  subsets: ['latin', 'latin-ext'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const body = Plus_Jakarta_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://seselka.com'),
  title: 'Seselka Home · Sessiz Cesaret',
  description:
    'Geri dönüşen kâğıttan, bir kadın ustanın elinde örülen zamansız ev objeleri. Sessiz lüks: doğal, sessiz, zamansız.',
  icons: {
    icon: `${BASE_PATH}/assets/favicon-48.png`,
    apple: `${BASE_PATH}/assets/apple-touch-icon.png`,
  },
  openGraph: {
    title: 'Seselka Home · Sessiz Cesaret',
    description: 'Made for home. Made to last.',
    locale: 'tr_TR',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#f4efe6',
  colorScheme: 'light dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${display.variable} ${body.variable}`}>
      <body>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
