import { Fragment } from 'react';
import type { Metadata } from 'next';
import { LegalShell } from '@/components/site/LegalShell';
import { seller } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'KVKK Aydınlatma Metni | Seselka Home',
  description:
    'Seselka Home tarafından, 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında kişisel verilerinizin işlenmesine ilişkin aydınlatma metni.',
  alternates: { canonical: '/kvkk-aydinlatma/' },
};

/** Veri sorumlusu künyesi — boş alanlar (VKN/telefon) otomatik gizlenir. */
const idRows = (
  [
    ['Veri Sorumlusu', seller.legalName],
    ['Vergi / T.C. Kimlik No', seller.taxId],
    ['İl / İlçe', `${seller.city} / ${seller.district}`],
    ['E-posta', seller.email],
    ['Telefon', seller.phone],
  ] as [string, string][]
).filter(([, v]) => v);

export default function KvkkAydinlatmaPage() {
  return (
    <LegalShell
      title="KVKK Aydınlatma Metni"
      updated="Haziran 2026"
      lead="Bu aydınlatma metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu’nun (KVKK) 10. maddesi uyarınca, Seselka Home ile iletişime geçtiğinizde kişisel verilerinizin nasıl işlendiği konusunda sizi bilgilendirmek için hazırlanmıştır."
    >
      <h2>1. Veri Sorumlusu</h2>
      <dl>
        {idRows.map(([k, v]) => (
          <Fragment key={k}>
            <dt>{k}</dt>
            <dd>{k === 'E-posta' ? <a href={`mailto:${v}`}>{v}</a> : v}</dd>
          </Fragment>
        ))}
      </dl>

      <h2>2. İşlenen Kişisel Veriler</h2>
      <p>Talep formu aracılığıyla bize ilettiğinizde aşağıdaki veriler işlenebilir:</p>
      <ul>
        <li><strong>Kimlik:</strong> Ad, soyad.</li>
        <li><strong>İletişim:</strong> E-posta adresi ve (paylaşırsanız) telefon numarası.</li>
        <li><strong>Talep/Sipariş içeriği:</strong> İlgilendiğiniz ürün, ölçü, renk/palet, teslim tarihi ve notunuzda paylaştığınız bilgiler.</li>
      </ul>

      <h2>3. Verilerin İşlenme Amaçları</h2>
      <ul>
        <li>Talebinizi yanıtlamak ve sizinle iletişim kurmak,</li>
        <li>Teklif, sipariş ve siparişe özel üretim sürecini yürütmek,</li>
        <li>Ürünün teslimat ve satış sonrası süreçlerini sağlamak,</li>
        <li>İlgili mevzuattan doğan yükümlülükleri yerine getirmek.</li>
      </ul>

      <h2>4. İşlemenin Hukuki Sebebi</h2>
      <p>
        Kişisel verileriniz, KVKK’nın 5. maddesinde yer alan; bir sözleşmenin kurulması veya ifasıyla
        doğrudan ilgili olması (md. 5/2-c), veri sorumlusunun meşru menfaatleri (md. 5/2-f) ve hukuki
        yükümlülüğün yerine getirilmesi (md. 5/2-ç) hukuki sebeplerine dayanılarak işlenir. Açık rıza
        gerektiren durumlarda işleme, ayrıca alınan açık rızanıza dayandırılır.
      </p>

      <h2>5. Verilerin Toplanma Yöntemi</h2>
      <p>
        Bu internet sitesindeki talep formu, bir sunucuya veri göndermez; doldurduğunuz bilgilerle
        tarayıcınızdaki <strong>e-posta uygulaması üzerinden doğrudan satıcıya bir e-posta
        oluşturulur</strong>. Verileriniz bu sitenin sunucularında toplanmaz veya saklanmaz; yalnızca
        gönderdiğiniz e-posta üzerinden satıcıya ulaşır. Site, reklam veya ziyaretçi takibi amaçlı
        çerez (cookie) kullanmaz.
      </p>

      <h2>6. Verilerin Aktarılması</h2>
      <p>
        Kişisel verileriniz, kural olarak üçüncü kişilerle paylaşılmaz. Yalnızca siparişinizin
        teslimi için kargo/lojistik hizmeti veren taraflarla ve yasal olarak yetkili kamu kurum ve
        kuruluşlarıyla, işleme amacıyla ve mevzuatla sınırlı olarak paylaşılabilir.
      </p>

      <h2>7. Saklama Süresi</h2>
      <p>
        Kişisel verileriniz, işleme amacının gerektirdiği süre ve ilgili mevzuatta öngörülen yasal
        süreler boyunca saklanır; bu sürelerin sonunda silinir, yok edilir veya anonim hale getirilir.
      </p>

      <h2>8. İlgili Kişi Olarak Haklarınız</h2>
      <p>KVKK’nın 11. maddesi uyarınca; kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme, işlenme amacını öğrenme, eksik/yanlış işlenmişse düzeltilmesini, şartları oluştuğunda silinmesini veya yok edilmesini isteme ve işlemenin münhasıran otomatik sistemlerle analiz edilmesi suretiyle aleyhinize bir sonuç ortaya çıkmasına itiraz etme haklarına sahipsiniz.</p>

      <h2>9. Başvuru ve İletişim</h2>
      <p>
        Yukarıdaki haklarınıza ilişkin taleplerinizi{' '}
        <a href={`mailto:${seller.email}`}>{seller.email}</a> adresine ileterek bize
        ulaştırabilirsiniz. Talebiniz, niteliğine göre en kısa sürede ve en geç KVKK’da öngörülen
        süre içinde sonuçlandırılır.
      </p>
    </LegalShell>
  );
}
