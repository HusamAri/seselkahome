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
  desc?: string;
  meta?: string[];
  /** Made-to-order piece: routes to the order form instead of the cart. */
  custom?: boolean;
};

/** Shop catalog — real product photography, Sessiz Cesaret copy. */
export const products: Product[] = [
  {
    id: 'asili-sepet', name: 'Asılı Sepet', sub: 'Duvar · Sepet', price: 1480,
    image: '/assets/products/asili-sepet.webp', badge: 'Yeni',
    desc: 'Elde örülmüş, kuru çiçekleriyle; duvarda ya da kapı arkasında zarif, sessiz bir köşe.',
    meta: ['Ø ~28 cm', 'Doğal', 'El yapımı'],
  },
  {
    id: 'yuvarlak-sepet', name: 'Yuvarlak Sepet', sub: 'Sepet · Tepsi', price: 1180,
    image: '/assets/products/yuvarlak-sepet.webp',
    desc: 'Yuvarlak, sık örgülü hasır sepet. Ekmekten meyveye, masada gündelik bir güzellik.',
    meta: ['Ø ~30 cm', 'Doğal ton', 'Stokta'],
  },
  {
    id: 'horoz-sepet', name: 'Bayram Horozu', sub: 'Dekoratif · Bayram', price: 1680,
    image: '/assets/products/horoz-sepet.webp', badge: 'Az sayıda',
    desc: 'Horoz formunda örme sepet; bayrama özel, ikramlık şekerleriyle küçük bir sürpriz.',
    meta: ['~25 cm', 'Doğal', 'Az sayıda'],
  },
  {
    id: 'ozel', name: 'Özel Ölçü', sub: 'Ölçüye özel', price: null, custom: true,
    image: '/assets/wax-seal.webp',
    desc: 'Aklınızdaki ölçü, kullanım ya da renk için bize yazın. Atölye sırasına alınır, üretim 4-6 hafta sürer.',
    meta: ['Konuşalım', 'Ölçüye özel', '4-6 hafta'],
  },
];

/** Currency formatter — Turkish locale, calm typographic price. */
export function formatPrice(value: number | null): string {
  if (value == null) return 'Konuşalım';
  return '₺ ' + value.toLocaleString('tr-TR');
}

export const contact = {
  email: 'atolye@seselka.com',
  phone: '+90 232 000 00 00',
  location: 'İzmir',
};

export const heroMeta = [
  { k: 'Malzeme', v: 'Geri dönüşen kâğıt' },
  { k: 'Üretim', v: '10-14 gün' },
  { k: 'Atölye', v: 'İzmir' },
];

export type Step = { n: string; t: string; d: string };
export const processSteps: Step[] = [
  { n: '01', t: 'Geri dönüşüm', d: 'Toplanan kâğıtları yıkar, dinlendirir ve yeniden hammaddeye çeviririz. Kullanılan suyun büyük kısmı geri kazanılır.' },
  { n: '02', t: 'Kordon', d: 'Kâğıt ince şeritlere kesilir, elde sıkıca bükülür; hasır gibi sağlam, doğal bir lif çıkar.' },
  { n: '03', t: 'Örgü', d: 'Kordonlar bir kadın ustanın elinde formuna kavuşur. Bir sepet ortalama 34 saat sürer.' },
  { n: '04', t: 'İmza', d: 'Her parça mum mührü, el yazısı bir not ve geri dönüşen ambalajla yolculuğuna başlar.' },
];

export type Stat = { big: string; unit: string; label: string; sub: string };
export const stats: Stat[] = [
  { big: '8.4', unit: 't', label: 'Geri dönüşen kâğıt', sub: '2025’te atölyede yeniden hayata kazandırılan kâğıt.' },
  { big: '100', unit: '%', label: 'Doğal lif', sub: 'Hiçbir parçada plastik, sentetik reçine ya da yapay boya yok.' },
  { big: '26', unit: '', label: 'Kadın usta', sub: 'Atölye ve evlerinde, kendi temposunda çalışan ekip.' },
];
