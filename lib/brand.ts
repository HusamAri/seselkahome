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
    primary: 'Doğada köklenir, elde yeniden doğar.',
    short: 'Zamansız kalır.',
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
  /** Sold/archive piece: shown dimmed, not orderable. */
  sold?: boolean;
  /** Relative visual size of the cutout, by real dimensions (1 = base). */
  scale?: number;
};

/** Shop catalog — real product photography, Sessiz Cesaret copy. */
export const products: Product[] = [
  {
    id: 'asili-sepet', name: 'Asılı Sepet', sub: 'Duvar · Sepet', price: 1480,
    image: '/assets/products/asili-sepet.webp', badge: 'Yeni', scale: 0.86,
    desc: 'Kuru çiçek tasarımıyla birlikte; duvarda ya da kapı arkasında rafine ve sessiz bir köşe.',
    meta: ['Ø ~28 cm', 'Doğal lif', 'El yapımı dekor'],
  },
  {
    id: 'yuvarlak-sepet', name: 'Yuvarlak Sepet', sub: 'Sepet · Tepsi', price: 1180,
    image: '/assets/products/yuvarlak-sepet.webp', scale: 0.9,
    desc: 'Sık örgülü ve dayanıklı form. Masada ekmekten meyveye, gündelik yaşamın içinde sanatsal bir detay.',
    meta: ['Ø ~30 cm', 'Doğal ton', 'Siparişe özel'],
  },
  {
    id: 'horoz-sepet', name: 'Bayram Horozu', sub: 'Dekoratif · Bayram', price: 1680,
    image: '/assets/products/horoz-sepet.webp', badge: 'Sınırlı sayıda', scale: 0.8,
    desc: 'Geleneksel hasır teknikleriyle elde örülen horoz formlu sepet; ikramlarınıza eşlik eden sıcak bir karşılaşma.',
    meta: ['~25 cm', 'Organik doku', 'Özel seri'],
  },
  {
    id: 'orgu-ayna', name: 'Güneş Ayna', sub: 'Duvar · Ayna', price: 2240,
    image: '/assets/products/orgu-ayna.webp', sold: true, scale: 1.55,
    desc: 'Güneş formunda, elde örülmüş çerçeveli yuvarlak ayna. Tek parça olarak üretildi; sahibini buldu.',
    meta: ['Ø ~50 cm', 'Doğal lif', 'Tek parça'],
  },
  {
    id: 'ozel', name: 'Özel Ölçü', sub: 'Ölçüye özel', price: null, custom: true,
    image: '/assets/wax-seal.webp',
    desc: 'Düşlediğiniz ölçü, form veya kullanım amacını bize ulaştırın. Kağıttan dallar atölyemizde tamamen sizin için şekillensin.',
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
  phone: '+90 212 000 00 00',
  location: 'İstanbul',
};

export const heroMeta = [
  { k: 'Malzeme', v: 'Geri dönüşen kağıt' },
  { k: 'Üretim', v: 'Siparişe özel' },
  { k: 'Atölye', v: 'İstanbul' },
];

export type Step = { n: string; t: string; d: string };
export const processSteps: Step[] = [
  { n: '01', t: 'Toplama ve Dönüşüm', d: 'Şehrin atık kağıtları kimyasal işlemlere uğramadan, tamamen fiziksel yöntemlerle temizlenip ayıklanarak atölyemizin ham maddesine dönüşür.' },
  { n: '02', t: 'Kordon ve Dal Formu', d: 'Temizlenen kağıtlar ince şeritler halinde kesilerek elde sıkıca bükülür. Ortaya hasır kadar dayanıklı, organik lif yapısında kağıt dallar çıkar.' },
  { n: '03', t: 'Örgü ve Zanaat', d: 'Hazırlanan kordonlar bir kadın ustanın ellerinde biçim kazanır. Sabır ve sakinlikle yürütülen bu örgü sürecinde kağıt, yeni ve zamansız bir gövdeye kavuşur.' },
  { n: '04', t: 'Özen ve İmza', d: 'Üretimi tamamlanan her parça, el yazısı özel bir not ve mum mührüyle taçlandırılarak sürdürülebilir el yapımı ambalajına girer.' },
];

export type Stat = { big: string; unit: string; label: string; sub: string };
export const stats: Stat[] = [
  { big: '8.4', unit: 't', label: 'Dönüşen kağıt', sub: 'Atölyede sanatsal tasarımlarla yeniden hayata kazandırılan kağıt miktarı.' },
  { big: '100', unit: '%', label: 'Doğal içerik', sub: 'Üretimin hiçbir aşamasında plastik, sentetik reçine ya da yapay boya kullanılmaz.' },
  { big: '26', unit: '', label: 'Kadın usta', sub: 'Atölyede ve evlerinde, kendi ritimleriyle üretime katılan zanaatkar kadınlar.' },
];
