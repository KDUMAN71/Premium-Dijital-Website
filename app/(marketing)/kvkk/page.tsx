import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni | Premium Dijital",
  description:
    "6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında hazırlanan Premium Dijital KVKK Aydınlatma Metni.",
  robots: { index: false, follow: false },
};

const UPDATED = "24 Mart 2026";

export default function KvkkPage() {
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
          <span className="text-white/40">KVKK</span>
        </nav>

        {/* Başlık */}
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase italic mb-4">
          KVKK{" "}
          <span className="bg-gradient-to-r from-brand-blue to-brand-purple bg-clip-text text-transparent">
            Aydınlatma Metni
          </span>
        </h1>
        <p className="text-[12px] uppercase tracking-widest text-white/25 mb-4">
          Son güncelleme: {UPDATED}
        </p>
        <p className="text-[13px] text-white/35 mb-16">
          6698 sayılı Kişisel Verilerin Korunması Kanunu'nun ("KVKK") 10. maddesi kapsamında
          aydınlatma yükümlülüğümüzü yerine getirmek amacıyla hazırlanmıştır.
        </p>

        <div className="space-y-14 text-white/60 text-[15px] leading-relaxed">
          {/* Veri Sorumlusu */}
          <Section title="Veri Sorumlusu">
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
          </Section>

          {/* Bölüm 1 */}
          <Section title="1. Kişisel Verilerin İşlenme Amacı">
            <p>Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:</p>
            <ul className="mt-4 space-y-2 list-disc list-inside marker:text-brand-purple">
              <li>Dijital pazarlama ve reklam yönetimi hizmetlerinin sunulması</li>
              <li>Teklif, analiz ve danışmanlık süreçlerinin yürütülmesi</li>
              <li>Müşteri ilişkilerinin yönetimi ve sözleşme süreçleri</li>
              <li>E-posta ve telefon yoluyla iletişim sağlanması</li>
              <li>Yasal yükümlülüklerin yerine getirilmesi</li>
              <li>Pazarlama ve tanıtım faaliyetleri (açık rıza kapsamında)</li>
              <li>Site güvenliğinin ve teknik altyapının korunması</li>
            </ul>
          </Section>

          {/* Bölüm 2 */}
          <Section title="2. Kişisel Veri Kategorileri">
            <p>İşlenen kişisel veri kategorileri şunlardır:</p>
            <div className="mt-4 space-y-4">
              <DataCategory
                name="Kimlik Verisi"
                items={["Ad, soyad"]}
              />
              <DataCategory
                name="İletişim Verisi"
                items={["E-posta adresi", "Telefon numarası", "Şirket / marka adı"]}
              />
              <DataCategory
                name="İşlem Güvenliği Verisi"
                items={["IP adresi", "Tarayıcı bilgisi", "Giriş logları"]}
              />
              <DataCategory
                name="Pazarlama Verisi"
                items={["Çerez verileri", "Reklam etkileşim verileri", "Kampanya analitikleri"]}
              />
            </div>
          </Section>

          {/* Bölüm 3 */}
          <Section title="3. Kişisel Verilerin Aktarımı">
            <p>
              Kişisel verileriniz, KVKK'nın 8. ve 9. maddeleri uyarınca aşağıdaki koşullarda
              aktarılabilir:
            </p>
            <ul className="mt-4 space-y-2 list-disc list-inside marker:text-brand-purple">
              <li>
                <strong className="text-white/70">Yurt içi iş ortakları:</strong> Hizmet sunumunda
                çalışılan muhasebe, hukuk ve teknik destek firmalarıyla gizlilik sözleşmesi
                kapsamında
              </li>
              <li>
                <strong className="text-white/70">Yurt dışı (Vercel / Resend):</strong> E-posta
                iletimi ve hosting hizmetleri için; söz konusu firmalar GDPR uyumlu veri işleyicilerdir
              </li>
              <li>
                <strong className="text-white/70">Yasal zorunluluk:</strong> Yetkili kamu kurum ve
                kuruluşlarının talepleri doğrultusunda
              </li>
            </ul>
          </Section>

          {/* Bölüm 4 */}
          <Section title="4. Kişisel Verilerin Toplanma Yöntemi ve Hukuki Sebebi">
            <p>
              Kişisel verileriniz; web sitesi iletişim formları, e-posta yazışmaları, telefon
              görüşmeleri ve çerezler aracılığıyla toplanmaktadır. Hukuki dayanak:
            </p>
            <ul className="mt-4 space-y-2 list-disc list-inside marker:text-brand-purple">
              <li>
                <strong className="text-white/70">Açık rıza</strong> (KVKK Madde 5/1) — pazarlama
                iletişimi
              </li>
              <li>
                <strong className="text-white/70">Sözleşmenin kurulması veya ifası</strong> (KVKK
                Madde 5/2-c) — hizmet sunumu
              </li>
              <li>
                <strong className="text-white/70">Meşru menfaat</strong> (KVKK Madde 5/2-f) — site
                güvenliği ve analitik
              </li>
              <li>
                <strong className="text-white/70">Yasal yükümlülük</strong> (KVKK Madde 5/2-ç) —
                yasal kayıt yükümlülükleri
              </li>
            </ul>
          </Section>

          {/* Bölüm 5 */}
          <Section title="5. İlgili Kişinin Hakları (Madde 11)">
            <p>KVKK'nın 11. maddesi kapsamında aşağıdaki haklara sahipsiniz:</p>
            <ul className="mt-4 space-y-2 list-disc list-inside marker:text-brand-purple">
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
              <li>İşlenmiş ise bu konuda bilgi talep etme</li>
              <li>İşlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
              <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme</li>
              <li>Eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme</li>
              <li>Kanun'da öngörülen şartlar çerçevesinde silinmesini veya yok edilmesini isteme</li>
              <li>İşlenen verilerin otomatik sistemler aracılığıyla analizi sonucu aleyhinize çıkan sonuca itiraz etme</li>
              <li>Kanuna aykırı işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme</li>
            </ul>
          </Section>

          {/* Bölüm 6 */}
          <Section title="6. Başvuru Yöntemi">
            <p>
              Haklarınızı kullanmak için aşağıdaki yöntemlerle başvurabilirsiniz:
            </p>
            <ul className="mt-4 space-y-3 list-disc list-inside marker:text-brand-purple">
              <li>
                <strong className="text-white/70">E-posta:</strong>{" "}
                <a href="mailto:info@premiumdijital.com" className="text-brand-blue hover:underline">
                  info@premiumdijital.com
                </a>{" "}
                — konu satırında "KVKK Başvurusu" belirtiniz
              </li>
              <li>
                <strong className="text-white/70">Yazılı başvuru:</strong> Ziya Gökalp Mah.
                Süleyman Demirel Bulv. Mall Of İstanbul The Office No:7E D:136, 34490
                Başakşehir / İstanbul adresine ıslak imzalı dilekçe ile
              </li>
            </ul>
            <p className="mt-4">
              Başvurularınız, talebin niteliğine göre en geç{" "}
              <strong className="text-white/80">30 gün</strong> içinde ücretsiz olarak
              yanıtlanacaktır.
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

function DataCategory({ name, items }: { name: string; items: string[] }) {
  return (
    <div className="border border-white/5 rounded-xl px-5 py-4 bg-white/[0.02]">
      <p className="text-[11px] font-black uppercase tracking-widest text-white/40 mb-2">{name}</p>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item} className="text-[13px] text-white/50 flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-brand-purple inline-block shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
