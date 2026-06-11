import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Parisienne, Plus_Jakarta_Sans } from 'next/font/google';
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

// Script = handwritten signature accent (maker "imza").
const script = Parisienne({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-script',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://seselkahome.com'),
  title: 'Seselka Home | El Yapımı Kağıt Hasır Tasarım Ev Objeleri',
  description:
    'Geri dönüştürülmüş kağıtların kadın emeğiyle zamansız dekorasyon nesnelerine dönüşme hikayesi. Sürdürülebilir, el yapımı hasır sepet ve dekoratif objeler.',
  alternates: { canonical: '/' },
  icons: {
    icon: `${BASE_PATH}/assets/favicon-48.png`,
    apple: `${BASE_PATH}/assets/apple-touch-icon.png`,
  },
  openGraph: {
    title: 'Seselka Home | El Yapımı Kağıt Hasır Tasarım Ev Objeleri',
    description:
      'Geri dönüştürülmüş kağıtların kadın emeğiyle zamansız dekorasyon nesnelerine dönüşme hikayesi. Sürdürülebilir, el yapımı hasır sepet ve dekoratif objeler.',
    url: 'https://seselkahome.com',
    siteName: 'Seselka Home',
    locale: 'tr_TR',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f4efe6' },
    { media: '(prefers-color-scheme: dark)', color: '#15120f' },
  ],
  colorScheme: 'light dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${display.variable} ${body.variable} ${script.variable}`}>
      <body>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
