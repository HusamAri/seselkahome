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
  founded: 2026,
  taglines: {
    primary: 'Doğada köklenir, elde yeniden doğar.',
    short: 'Zamansız kalır.',
  },
  fonts: {
    display: 'Cormorant Garamond', // high-contrast serif — the SESELKA wordmark
    body: 'Plus Jakarta Sans', // light, tracked humanist sans — labels + copy
  },
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
  /** Excluded from the launch discount — shown at full price. */
  noDiscount?: boolean;
  /** Real size in cm (longest dimension); drives proportional render height. */
  cm?: number;
  /** Detail-view photos (lifestyle/close-ups). Falls back to [image]. */
  gallery?: string[];
  /** Detail-page paragraph: what the piece is for / how it lives at home. */
  use?: string;
  /** Crediting the maker, with their Instagram + a sentence on their craft. */
  maker?: { name: string; handle: string; instagram: string; note?: string };
};

/** Shop catalog — real product photography, Sessiz Cesaret copy. */
export const products: Product[] = [
  {
    id: 'asili-sepet', name: 'Asılı Sepet', sub: 'Duvar · Sepet', price: 1850,
    image: '/assets/products/asili-sepet.webp', cm: 28,
    desc: 'Kuru çiçek tasarımıyla birlikte; duvarda ya da kapı arkasında rafine ve sessiz bir köşe.',
    meta: ['Ø ~28 cm', 'Doğal lif', 'El yapımı dekor'],
    gallery: ['/assets/products/asili-1.webp', '/assets/products/asili-2.webp'],
    use: 'Duvarda ya da kapı arkasında; kurutulmuş çiçekler, ince dallar veya sevdiğiniz küçük objelerle eşleştiğinde sessiz, sıcak bir köşe yaratır.',
  },
  {
    id: 'hasir-avize', name: 'Hasır Avize', sub: 'Aydınlatma · Avize', price: 2500, noDiscount: true,
    image: '/assets/products/hasir-avize.webp', badge: 'Yeni', cm: 50,
    desc: 'Elde örülmüş, organik dalgalı formuyla hasır avize; yakıldığında tavana ve duvarlara dantel gibi yumuşak gölgeler düşürür.',
    meta: ['~50 cm', 'Aydınlatma', 'El yapımı'],
    gallery: ['/assets/products/hasir-avize-1.webp', '/assets/products/hasir-avize-2.webp', '/assets/products/hasir-avize-3.webp'],
    use: 'Yemek masasının, antrenin ya da oturma alanının üzerinde tek başına bir heykel gibi durur; ışığını açtığınızda örgü deseni mekâna sıcak, hareketli bir gölge oyununa dönüşür.',
    maker: {
      name: 'Derya Gül', handle: '@deryagu197211', instagram: 'https://www.instagram.com/deryagu197211',
      note: 'Derya bu avizeyi örerken düz ve simetrik bir form peşinde değildi; ışığın kâğıt dalların arasından nasıl süzüleceğini düşündü. Rüzgârda kıpırdayan suyu ve usulca toplanan bulutları hayal ederek her katmanı serbestçe dalgalandırdı. İstediği yalnızca bir aydınlatma değil, yakıldığında tavana ve duvarlara huzur veren, dantel gibi bir gölge oyunu armağan etmekti.',
    },
  },
  {
    id: 'yuvarlak-sepet', name: 'Yuvarlak Sepet', sub: 'Sepet · Tepsi', price: 1650,
    image: '/assets/products/yuvarlak-sepet.webp', cm: 30,
    desc: 'Sık örgülü ve dayanıklı form. Masada ekmekten meyveye, gündelik yaşamın içinde sanatsal bir detay.',
    meta: ['Ø ~30 cm', 'Doğal ton', 'Siparişe özel'],
    gallery: ['/assets/products/yuvarlak-1.webp', '/assets/products/yuvarlak-2.webp', '/assets/products/yuvarlak-3.webp'],
    use: 'Masada ekmekten meyveye, girişte anahtardan mektuba; gündelik dağınıklığı toparlayan, her ortama yakışan sakin bir form.',
  },
  {
    id: 'horoz-sepet', name: 'Bayram Horozu', sub: 'Dekoratif · Bayram', price: 2450,
    image: '/assets/products/horoz-sepet.webp', badge: 'Sınırlı sayıda', cm: 25,
    desc: 'Geleneksel hasır teknikleriyle elde örülen horoz formlu sepet; ikramlarınıza eşlik eden sıcak bir karşılaşma.',
    meta: ['~25 cm', 'Organik doku', 'Özel seri'],
    gallery: ['/assets/products/horoz-1.webp', '/assets/products/horoz-2.webp', '/assets/products/horoz-3.webp'],
    use: 'Bayram ve kahvaltı sofralarının neşeli misafiri. Yumurtalarınızı, şekerlerinizi ya da küçük ikramlarınızı ağırlar; bir rafta tek başına dururken bile sofranıza geleneğin ve el emeğinin sıcaklığını taşır.',
    maker: {
      name: 'Banu Kayaalp', handle: '@banukayaalp', instagram: 'https://www.instagram.com/banukayaalp',
      note: 'Banu, her horozu kağıt ipini sabırla bükerek elde şekillendiriyor; tarağından ibiğine kadar tüm detaylar tek tek örülüyor. Bu yüzden hiçbir parça bir diğerinin tıpatıp aynısı değil.',
    },
  },
  {
    id: 'orgu-ayna', name: 'Güneş Ayna', sub: 'Duvar · Ayna', price: 3900,
    image: '/assets/products/orgu-ayna.webp', sold: true, cm: 50,
    desc: 'Güneş formunda, elde örülmüş çerçeveli yuvarlak ayna. Tek parça olarak üretildi; sahibini buldu.',
    meta: ['Ø ~50 cm', 'Doğal lif', 'Tek parça'],
    use: 'Girişte, konsol üstünde ya da çalışma köşesinde; güneş formuyla duvara doğal bir odak ve yumuşak bir ışık oyunu taşır.',
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

/** Açılışa özel indirim — opening launch discount applied across the catalog. */
export const launchDiscount = 0.3;

/** Launch-discounted price, rounded to the nearest ₺10 for a clean figure. */
export function salePrice(value: number): number {
  if (value <= 0) return value;
  return Math.round((value * (1 - launchDiscount)) / 10) * 10;
}

export const contact = {
  email: 'atolye@seselkahome.com',
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
  { big: 'El', unit: 'le', label: 'Kadın emeği', sub: 'Her parça kadın elinde, “kadın isterse” diye başlayan bir cümlenin elle tutulabilir hali olarak doğar.' },
];
