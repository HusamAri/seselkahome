/**
 * SESELKA HOME — single source of truth for brand tokens.
 * Pulled verbatim from the "SESELKA HOME — Adaptive Logo System" brand board.
 * Hex values are printed on the board (not guessed). Typefaces are the closest
 * identifiable match to the unlabeled board type and can be swapped here +
 * in app/layout.tsx without touching any component.
 */

export type BrandColor = {
  hex: string;
  /** Turkish role description from the board's RENK SİSTEMİ. */
  role: string;
  /** Recommended usage weight from the board's RENK DENGESİ. */
  weight: number;
};

export const colors = {
  loom: { hex: '#E4D9C4', role: 'Doğallık, sadelik, arka plan', weight: 0.4 },
  clay: { hex: '#B89476', role: 'Sıcaklık, toprak, el emeği', weight: 0.2 },
  ink: { hex: '#2A2520', role: 'Güç, kalite, yazı rengi', weight: 0.15 },
  linen: { hex: '#F4EFE6', role: 'Nefes, açıklık, denge', weight: 0.1 },
  ember: { hex: '#A8362B', role: 'Tutku, detay, vurgu (marka imzası)', weight: 0.05 },
  figPlum: { hex: '#6E4A5A', role: 'İç dünya, kadınlık, zarafet (kurucu vurgusu)', weight: 0.05 },
} satisfies Record<string, BrandColor>;

export const brand = {
  name: 'Seselka Home',
  /** Verbal + motion positioning. */
  positioning: 'Sessiz Cesaret',
  voice: 'Sessiz lüks: sakin, kendinden emin, gösterişsiz.',
  founded: 2026,
  taglines: {
    primary: 'Made for home. Made to last.',
    short: 'Made to last.',
  },
  fonts: {
    display: 'Cormorant Garamond', // high-contrast serif — the SESELKA wordmark
    body: 'Plus Jakarta Sans', // light, tracked humanist sans — labels + copy
  },
  /** Logo variants map to the adaptive system on the board. */
  logos: {
    primary: '/assets/logo-primary-vertical-clean.png',
    monogram: '/assets/monogram.webp',
    seal: '/assets/wax-seal.webp',
    monochrome: '/assets/icon-monogram-clean.png',
  },
  /** KULLANIM İLKELERİ — usage laws, enforced across the system. */
  principles: [
    'Logonun formu değişmez.',
    'Kırmızı nokta (ember) marka imzasıdır.',
    'Mor ton (fig plum) yalnızca seçili alanlarda vurgu olarak kullanılır.',
    'Sessiz lüks, doğallık ve zamansızlık her kullanımda korunur.',
  ],
  colors,
} as const;

export type Product = {
  id: string;
  name: string;
  sub: string;
  /** TRY price, or null for made-to-order pieces. */
  price: number | null;
  image: string;
  badge?: string;
};

/** Sample collection — real Seselka product photography, Sessiz Cesaret copy. */
export const products: Product[] = [
  { id: 'asili-sepet', name: 'Asılı Sepet', sub: 'Duvar · Sepet', price: 1480, image: '/assets/products/asili-sepet.webp', badge: 'Yeni' },
  { id: 'yuvarlak-sepet', name: 'Yuvarlak Sepet', sub: 'Sepet · Tepsi', price: 1180, image: '/assets/products/yuvarlak-sepet.webp' },
  { id: 'horoz-sepet', name: 'Bayram Horozu', sub: 'Dekoratif', price: 1680, image: '/assets/products/horoz-sepet.webp', badge: 'Az sayıda' },
  { id: 'orgu-detay', name: 'El Örgüsü Hediye Seti', sub: 'Kutu · Mum mührü', price: 1980, image: '/assets/photo-detail.webp', badge: 'Hediye' },
  { id: 'hasir-sepet', name: 'Hasır Sepet', sub: 'Yatak odası köşesi', price: 1240, image: '/assets/photo-basket.webp' },
  { id: 'ozel', name: 'Özel Ölçü', sub: 'Ölçüye özel · 4-6 hafta', price: null, image: '/assets/photo-packaging.webp' },
];

/** Currency formatter — Turkish locale, calm typographic price. */
export function formatPrice(value: number | null): string {
  if (value == null) return 'Konuşalım';
  return '₺ ' + value.toLocaleString('tr-TR');
}
