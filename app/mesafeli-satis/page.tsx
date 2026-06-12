import { Fragment } from 'react';
import type { Metadata } from 'next';
import { LegalShell } from '@/components/site/LegalShell';
import { payment, seller } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'Ön Bilgilendirme & Mesafeli Satış Sözleşmesi | Seselka Home',
  description:
    'Seselka Home siparişe özel el yapımı ürünler için ön bilgilendirme koşulları, mesafeli satış sözleşmesi, cayma hakkı istisnası, teslimat ve uyuşmazlık çözümü.',
  alternates: { canonical: '/mesafeli-satis/' },
};

const deposit = Math.round(payment.deposit * 100);

/** Satıcı künyesi — boş alanlar (VKN/telefon) otomatik gizlenir. */
const idRows = (
  [
    ['Satıcı', seller.legalName],
    ['Vergi / T.C. Kimlik No', seller.taxId],
    ['İl / İlçe', `${seller.city} / ${seller.district}`],
    ['E-posta', seller.email],
    ['Telefon', seller.phone],
  ] as [string, string][]
).filter(([, v]) => v);

export default function MesafeliSatisPage() {
  return (
    <LegalShell
      title="Ön Bilgilendirme & Mesafeli Satış Sözleşmesi"
      updated="Haziran 2026"
      lead="Bu metin; 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği kapsamında, Seselka Home üzerinden ilettiğiniz siparişe özel üretim talepleri için ön bilgilendirme ve satış koşullarını açıklar."
    >
      <h2>1. Satıcı Bilgileri</h2>
      <dl>
        {idRows.map(([k, v]) => (
          <Fragment key={k}>
            <dt>{k}</dt>
            <dd>{k === 'E-posta' ? <a href={`mailto:${v}`}>{v}</a> : v}</dd>
          </Fragment>
        ))}
      </dl>
      <p>
        Satıcı, esnaf muafiyeti kapsamında kendi ev/atölye ortamında üretim yapan bir gerçek
        kişidir. Bu sayfada yer alan künye, eksik bilgiler tamamlandıkça güncellenir.
      </p>

      <h2>2. Alıcı (Tüketici)</h2>
      <p>
        Bu internet sitesi üzerinden ürün ya da siparişe özel üretim talebinde bulunan gerçek
        kişiyi ifade eder. Talep formunda paylaştığınız ad, e-posta ve (verdiyseniz) telefon
        bilgileri, sözleşmenin tarafı olarak sizi tanımlamak ve siparişinizi yürütmek için
        kullanılır.
      </p>

      <h2>3. Sözleşmenin Konusu</h2>
      <p>
        Bu sözleşmenin konusu, Alıcı’nın Seselka Home üzerinden elektronik ortamda sipariş verdiği
        ya da talep ettiği ürünlerin satışı ve teslimi ile tarafların hak ve yükümlülüklerinin
        belirlenmesidir. Ürünler, geri dönüştürülmüş kâğıttan el emeğiyle örülen dekoratif ev
        objeleridir.
      </p>

      <h2>4. Ürünlerin Niteliği ve Sipariş Süreci</h2>
      <p>
        Seselka Home <strong>seri/stok üretim yapmaz</strong>; her parça, siparişiniz üzerine
        üreten kadınların ellerinde size özel olarak üretilir. El işçiliğinin doğası gereği renk,
        doku ve ölçüde küçük farklılıklar olağandır ve ayıp sayılmaz. Sipariş süreci genel olarak
        şu adımlardan oluşur:
      </p>
      <ul>
        <li><strong>Talep:</strong> Formla ürünü, ölçüyü ve rengi iletirsiniz.</li>
        <li><strong>Görüşme &amp; Teklif:</strong> Fiyat ve üretim süresini birlikte netleştiririz.</li>
        <li><strong>Görsel Onayı:</strong> Benzer işlerin ya da taslağın fotoğraflarını paylaşırız.</li>
        <li><strong>Kapora:</strong> Onayladığınız teklifin kaporasıyla sipariş üretime alınır.</li>
        <li><strong>Üretim &amp; Teslim:</strong> Tamamlanan parça özenle paketlenip kargoya verilir.</li>
      </ul>

      <h2>5. Fiyat, Ödeme ve Kapora</h2>
      <p>
        Ürünlerin fiyatları, görüşme sırasında siparişinizin kapsamına göre netleştirilir ve
        tarafınıza yazılı olarak iletilir. Siparişe özel üretim, onayladığınız teklif üzerinden
        alınan yaklaşık <strong>%{deposit} kapora</strong> ile üretim sırasına alınır; kalan bakiye,
        teslim öncesinde tahsil edilir. Kabul edilen ödeme yöntemi (banka havalesi/EFT veya güvenli
        ödeme bağlantısı) görüşmede paylaşılır.
      </p>

      <h2>6. Teslimat</h2>
      <p>
        Ürünler kargo ile teslim edilir. Siparişe özel üretim olduğundan üretim ve teslim süresi
        ürüne göre değişir; taraflarca kararlaştırılan süre, siparişinizde ayrıca belirtilir.
        Kargo sırasında oluşabilecek hasarlara karşı, teslim aldığınız paketi açmadan kontrol
        etmenizi ve hasar halinde tutanak tutturmanızı öneririz.
      </p>

      <h2>7. Cayma Hakkı ve İstisnası</h2>
      <p>
        Mesafeli sözleşmelerde tüketici, kural olarak malı teslim aldığı tarihten itibaren{' '}
        <strong>14 gün</strong> içinde herhangi bir gerekçe göstermeden cayma hakkına sahiptir.
      </p>
      <p>
        Ancak Seselka Home ürünleri, <strong>tüketicinin istekleri veya kişisel ihtiyaçları
        doğrultusunda hazırlanan, siparişe/kişiye özel mallar</strong> niteliğindedir. Bu nedenle,
        Mesafeli Sözleşmeler Yönetmeliği’nin 15. maddesinin birinci fıkrasının (b) bendi uyarınca{' '}
        <strong>cayma hakkının istisnası</strong> kapsamındadır ve bu ürünlerde cayma hakkı
        kullanılamaz. Bu husus, siparişinizi onaylamadan önce tarafınıza açıkça bildirilir.
      </p>

      <h2>8. Sipariş İptali ve Kapora İadesi</h2>
      <p>
        Üretime <strong>başlanmadan önce</strong> talebinizi iptal etmek isterseniz, alınmışsa
        kaporanız iade edilir. Kişiye özel üretim başladıktan sonra, malzeme ve emek tahsis edilmiş
        olduğundan kapora iade edilmeyebilir; bu durum sipariş onayında belirtilir. Tarafımızdan
        kaynaklı bir nedenle siparişin tamamlanamaması halinde ödenen tutar eksiksiz iade edilir.
      </p>

      <h2>9. Ayıplı Mal</h2>
      <p>
        Teslim edilen ürünün ayıplı (kusurlu/hasarlı) olması halinde, 6502 sayılı Kanun’un ayıplı
        mala ilişkin hükümleri saklıdır. Böyle bir durumda makul süre içinde bizimle iletişime
        geçmeniz halinde değişim, onarım veya bedel iadesi seçenekleri değerlendirilir.
      </p>

      <h2>10. Uyuşmazlık Çözümü ve Arabuluculuk</h2>
      <p>
        Bu sözleşmeden doğabilecek uyuşmazlıklarda; her yıl yeniden belirlenen parasal sınırın
        altındaki başvurular için <strong>Tüketici Hakem Heyetleri</strong>, bu sınırın üzerindeki
        uyuşmazlıklar için <strong>Tüketici Mahkemeleri</strong> yetkilidir. Tüketici mahkemesinde
        görülen uyuşmazlıklarda, dava açılmadan önce <strong>arabulucuya başvurulması dava
        şartıdır</strong>. Başvurularınızı yerleşim yerinizdeki ilgili mercilere yapabilirsiniz.
      </p>

      <h2>11. İletişim</h2>
      <p>
        Sipariş, ön bilgilendirme veya bu sözleşmeye ilişkin her türlü soru ve talebiniz için{' '}
        <a href={`mailto:${seller.email}`}>{seller.email}</a> adresinden bize ulaşabilirsiniz.
      </p>
    </LegalShell>
  );
}
