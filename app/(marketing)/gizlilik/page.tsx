import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Gizlilik Politikası | Premium Dijital",
  description:
    "Premium Dijital Reklam Ajansı ve Pazarlama olarak kişisel verilerinizi nasıl topladığımız, kullandığımız ve koruduğumuza dair gizlilik politikamız.",
  robots: { index: false, follow: false },
};

const UPDATED = "24 Mart 2026";

export default function GizlilikPage() {
  return (
    <main className="bg-brand-dark text-white min-h-screen">
      <section className="max-w-4xl mx-auto px-6 pt-32 pb-24 md:pt-48">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/20 mb-10"
        >
          <Link href="/" className="hover:text-brand-blue transition-colors">
            Ana Sayfa
          </Link>
          <ChevronRight size={10} />
          <span className="text-white/40">Gizlilik Politikası</span>
        </nav>

        {/* Başlık */}
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase italic mb-4">
          Gizlilik{" "}
          <span className="bg-gradient-to-r from-brand-blue to-brand-purple bg-clip-text text-transparent">
            Politikası
          </span>
        </h1>
        <p className="text-[12px] uppercase tracking-widest text-white/25 mb-16">
          Son güncelleme: {UPDATED}
        </p>

        <div className="space-y-14 text-white/60 text-[15px] leading-relaxed">
          {/* Giriş */}
          <p>
            Bu Gizlilik Politikası, <strong className="text-white/80">Premium Dijital Reklam Ajansı ve Pazarlama</strong>{" "}
            ("şirket", "biz") tarafından yönetilen{" "}
            <strong className="text-white/80">premiumdijital.com</strong> web sitesi aracılığıyla
            toplanan kişisel verilerin nasıl işlendiğini açıklamaktadır.
          </p>

          <address className="not-italic border border-white/5 rounded-2xl p-6 bg-white/[0.02] text-[13px] space-y-1">
            <p className="font-bold text-white/80">Premium Dijital Reklam Ajansı ve Pazarlama</p>
            <p>Ziya Gökalp Mah. Süleyman Demirel Bulv. Mall Of İstanbul The Office No:7E D:136</p>
            <p>34490 Başakşehir / İstanbul</p>
            <p className="pt-2">
              <a href="tel:+902129825724" className="hover:text-white transition-colors">
                (0212) 982 57 24
              </a>
            </p>
            <p>
              <a href="mailto:info@premiumdijital.com" className="hover:text-white transition-colors">
                info@premiumdijital.com
              </a>
            </p>
          </address>

          {/* Bölüm 1 */}
          <Section title="1. Toplanan Veriler">
            <p>Web sitemiz ve iletişim formları aracılığıyla aşağıdaki kişisel veriler toplanabilir:</p>
            <ul className="mt-4 space-y-2 list-disc list-inside marker:text-brand-purple">
              <li>Ad ve soyad</li>
              <li>E-posta adresi</li>
              <li>Telefon numarası</li>
              <li>Şirket / marka adı ve web sitesi</li>
              <li>IP adresi ve tarayıcı bilgileri</li>
              <li>Çerez ve analitik verileri</li>
              <li>İletişim formlarında iletilen mesaj içerikleri</li>
            </ul>
          </Section>

          {/* Bölüm 2 */}
          <Section title="2. Verilerin Kullanım Amacı">
            <p>Toplanan kişisel veriler aşağıdaki amaçlarla kullanılmaktadır:</p>
            <ul className="mt-4 space-y-2 list-disc list-inside marker:text-brand-purple">
              <li>Hizmet tekliflerinin hazırlanması ve sunulması</li>
              <li>Talep edilen analiz ve danışmanlık hizmetlerinin sağlanması</li>
              <li>E-posta ile iletişim ve bilgilendirme yapılması</li>
              <li>Site kullanımının analiz edilmesi ve iyileştirilmesi</li>
              <li>Yasal yükümlülüklerin yerine getirilmesi</li>
              <li>Pazarlama ve tanıtım faaliyetleri (açık rıza ile)</li>
            </ul>
          </Section>

          {/* Bölüm 3 */}
          <Section title="3. Verilerin Saklanması">
            <p>
              Kişisel verileriniz, Türkiye'de bulunan güvenli sunucularda SSL şifreleme ile korunarak
              saklanmaktadır. Veriler, işleme amacı ortadan kalktığında veya yasal saklama süresi
              dolduğunda silinmekte ya da anonimleştirilmektedir. Genel saklama süresi{" "}
              <strong className="text-white/80">3 yıl</strong> olup yasal gereklilikler farklı süre
              öngörebilir.
            </p>
          </Section>

          {/* Bölüm 4 */}
          <Section title="4. Üçüncü Taraflarla Paylaşım">
            <p>Kişisel verileriniz aşağıdaki üçüncü taraflarla paylaşılabilir:</p>
            <ul className="mt-4 space-y-2 list-disc list-inside marker:text-brand-purple">
              <li>
                <strong className="text-white/70">Google Analytics (GA4)</strong> — Anonim site
                analitikleri için
              </li>
              <li>
                <strong className="text-white/70">Meta Pixel</strong> — Reklam optimizasyonu için
                (opsiyonel, çerez tercihine göre)
              </li>
              <li>
                <strong className="text-white/70">Resend</strong> — Transaksiyonel e-posta iletimi
                için
              </li>
              <li>
                <strong className="text-white/70">Vercel</strong> — Hosting ve sunucu hizmetleri için
              </li>
            </ul>
            <p className="mt-4">
              Üçüncü taraflarla paylaşım, yalnızca hizmetin yürütülmesi için gerekli minimum veriyle
              ve ilgili tarafların gizlilik politikaları çerçevesinde gerçekleştirilir. Verileriniz
              ticari amaçla üçüncü taraflara satılmaz.
            </p>
          </Section>

          {/* Bölüm 5 */}
          <Section title="5. Kullanıcı Hakları">
            <p>
              Kişisel verilerinize ilişkin aşağıdaki haklara sahipsiniz; bu hakları kullanmak için{" "}
              <a href="mailto:info@premiumdijital.com" className="text-brand-blue hover:underline">
                info@premiumdijital.com
              </a>{" "}
              adresine yazabilirsiniz:
            </p>
            <ul className="mt-4 space-y-2 list-disc list-inside marker:text-brand-purple">
              <li>Verilerinize erişim talep etme</li>
              <li>Hatalı verilerin düzeltilmesini isteme</li>
              <li>Verilerinizin silinmesini talep etme</li>
              <li>Veri işlemeye itiraz etme</li>
              <li>Veri taşınabilirliği talep etme</li>
            </ul>
          </Section>

          {/* Bölüm 6 */}
          <Section title="6. Çerezler">
            <p>
              Web sitemiz zorunlu, analitik ve pazarlama çerezleri kullanmaktadır. Çerez kullanımı
              hakkında detaylı bilgiye{" "}
              <Link href="/cerezler" className="text-brand-blue hover:underline">
                Çerez Politikamız
              </Link>{" "}
              sayfasından ulaşabilirsiniz.
            </p>
          </Section>

          {/* Bölüm 7 */}
          <Section title="7. Politika Değişiklikleri">
            <p>
              Bu gizlilik politikasında yapılacak önemli değişiklikler, web sitemizde yayımlanarak
              duyurulacaktır. Değişiklikler yayımlandıktan sonra siteyi kullanmaya devam etmeniz,
              güncellenmiş politikayı kabul ettiğiniz anlamına gelir.
            </p>
          </Section>

          {/* Bölüm 8 */}
          <Section title="8. İletişim">
            <p>
              Gizlilik politikamıza ilişkin soru ve talepleriniz için{" "}
              <a href="mailto:info@premiumdijital.com" className="text-brand-blue hover:underline">
                info@premiumdijital.com
              </a>{" "}
              adresine e-posta gönderebilir veya{" "}
              <a href="tel:+902129825724" className="text-brand-blue hover:underline">
                (0212) 982 57 24
              </a>{" "}
              numaralı telefonu arayabilirsiniz.
            </p>
          </Section>

          <p className="text-[12px] text-white/20 border-t border-white/5 pt-8">
            Bu metin genel bilgilendirme amaçlıdır; hukuki danışmanlık yerine geçmez.
          </p>
        </div>
      </section>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-lg md:text-xl font-bold text-white/90 mb-4 uppercase tracking-tight">
        {title}
      </h2>
      <div className="text-white/55 leading-relaxed space-y-3">{children}</div>
    </div>
  );
}
