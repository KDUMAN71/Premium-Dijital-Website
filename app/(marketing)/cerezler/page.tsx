import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Çerez Politikası | Premium Dijital",
  description:
    "Premium Dijital web sitesinde kullanılan çerezler, amaçları ve nasıl yönetileceğine ilişkin bilgiler.",
  robots: { index: false, follow: false },
};

const UPDATED = "24 Mart 2026";

const COOKIE_TYPES = [
  {
    name: "Zorunlu Çerezler",
    desc: "Sitenin çalışması için teknik olarak gerekli çerezlerdir. Bu çerezler devre dışı bırakılamaz.",
    examples: ["Oturum yönetimi", "Güvenlik token'ları", "CSRF koruması"],
    duration: "Oturum süresi",
    canOptOut: false,
  },
  {
    name: "Analitik Çerezler",
    desc: "Site ziyaretçi davranışını anonim olarak ölçen Google Analytics (GA4) çerezleridir.",
    examples: ["_ga", "_ga_XXXXXX", "Sayfa görüntüleme", "Ziyaretçi sayımı"],
    duration: "2 yıla kadar",
    canOptOut: true,
  },
  {
    name: "Pazarlama Çerezleri",
    desc: "Meta Pixel tarafından reklam hedefleme ve dönüşüm ölçümü için kullanılan çerezlerdir. Yalnızca onay verilmesi durumunda aktifleşir.",
    examples: ["_fbp", "_fbc", "Meta reklam optimizasyonu"],
    duration: "90 gün",
    canOptOut: true,
  },
  {
    name: "Tercih Çerezleri",
    desc: "Kullanıcı tercihlerini (dil, arayüz ayarları) hatırlamak için kullanılan çerezlerdir.",
    examples: ["Dil seçimi", "Tema tercihi"],
    duration: "1 yıla kadar",
    canOptOut: true,
  },
];

export default function CerezlerPage() {
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
          <span className="text-white/40">Çerez Politikası</span>
        </nav>

        {/* Başlık */}
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase italic mb-4">
          Çerez{" "}
          <span className="bg-gradient-to-r from-brand-blue to-brand-purple bg-clip-text text-transparent">
            Politikası
          </span>
        </h1>
        <p className="text-[12px] uppercase tracking-widest text-white/25 mb-16">
          Son güncelleme: {UPDATED}
        </p>

        <div className="space-y-14 text-white/60 text-[15px] leading-relaxed">
          {/* Bölüm 1 */}
          <Section title="1. Çerez Nedir?">
            <p>
              Çerezler (cookies), bir web sitesini ziyaret ettiğinizde tarayıcınız aracılığıyla
              cihazınıza kaydedilen küçük metin dosyalarıdır. Çerezler, web sitelerinin daha iyi
              çalışmasına, ziyaretçi deneyiminin geliştirilmesine ve kullanım analizi yapılmasına
              olanak tanır.
            </p>
          </Section>

          {/* Bölüm 2 */}
          <Section title="2. Kullandığımız Çerezler">
            <div className="space-y-6 mt-2">
              {COOKIE_TYPES.map((ct) => (
                <div
                  key={ct.name}
                  className="border border-white/5 rounded-2xl p-6 bg-white/[0.02] space-y-3"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-bold text-white/85 text-[14px] uppercase tracking-tight">
                      {ct.name}
                    </h3>
                    <span
                      className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shrink-0 ${
                        ct.canOptOut
                          ? "bg-brand-purple/10 text-brand-purple border border-brand-purple/20"
                          : "bg-white/5 text-white/30 border border-white/10"
                      }`}
                    >
                      {ct.canOptOut ? "Opsiyonel" : "Zorunlu"}
                    </span>
                  </div>
                  <p className="text-[13px] text-white/50">{ct.desc}</p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {ct.examples.map((ex) => (
                      <span
                        key={ex}
                        className="text-[11px] text-white/35 border border-white/5 rounded-lg px-3 py-1 bg-white/[0.02]"
                      >
                        {ex}
                      </span>
                    ))}
                  </div>
                  <p className="text-[12px] text-white/30">
                    <span className="font-bold text-white/40">Süre:</span> {ct.duration}
                  </p>
                </div>
              ))}
            </div>
          </Section>

          {/* Bölüm 3 */}
          <Section title="3. Çerezleri Kontrol Etme">
            <p>
              Çerez tercihlerinizi tarayıcı ayarlarından yönetebilirsiniz. Çerezleri engellemek veya
              silmek için tarayıcınızın yardım bölümüne başvurabilirsiniz:
            </p>
            <ul className="mt-4 space-y-2 list-disc list-inside marker:text-brand-purple">
              <li>
                <strong className="text-white/70">Google Chrome:</strong> Ayarlar → Gizlilik ve
                Güvenlik → Çerezler
              </li>
              <li>
                <strong className="text-white/70">Mozilla Firefox:</strong> Tercihler → Gizlilik ve
                Güvenlik → Çerezler
              </li>
              <li>
                <strong className="text-white/70">Safari:</strong> Tercihler → Gizlilik → Çerezler
              </li>
              <li>
                <strong className="text-white/70">Microsoft Edge:</strong> Ayarlar → Gizlilik,
                Arama ve Hizmetler → Çerezler
              </li>
            </ul>
            <p className="mt-4">
              Zorunlu çerezlerin engellenmesi, sitenin bazı işlevlerinin çalışmamasına neden
              olabilir.
            </p>
          </Section>

          {/* Bölüm 4 */}
          <Section title="4. Üçüncü Taraf Çerezleri">
            <p>
              Web sitemizde üçüncü taraflara ait çerezler de kullanılmaktadır. Bu çerezler,
              ilgili firmaların kendi gizlilik politikaları kapsamında yönetilir:
            </p>
            <ul className="mt-4 space-y-3 list-disc list-inside marker:text-brand-purple">
              <li>
                <strong className="text-white/70">Google Analytics</strong> — Ziyaretçi analitikleri
                için. Google'ın gizlilik politikası:{" "}
                <span className="text-brand-blue">policies.google.com/privacy</span>
              </li>
              <li>
                <strong className="text-white/70">Meta (Facebook) Pixel</strong> — Reklam
                dönüşümlerini ölçmek için. Meta'nın gizlilik politikası:{" "}
                <span className="text-brand-blue">facebook.com/privacy/policy</span>
              </li>
            </ul>
          </Section>

          {/* Bölüm 5 */}
          <Section title="5. Çerez Süresi">
            <p>Çerezler süre bakımından iki türe ayrılır:</p>
            <ul className="mt-4 space-y-3 list-disc list-inside marker:text-brand-purple">
              <li>
                <strong className="text-white/70">Oturum Çerezleri:</strong> Tarayıcı kapatıldığında
                otomatik olarak silinir. Gezinti boyunca geçici veri tutmak için kullanılır.
              </li>
              <li>
                <strong className="text-white/70">Kalıcı Çerezler:</strong> Belirli bir son kullanma
                tarihine kadar cihazda saklanır. Tercih hatırlama ve analitik amaçlı kullanılır.
              </li>
            </ul>
          </Section>

          {/* Bölüm 6 */}
          <Section title="6. İletişim">
            <p>
              Çerez politikamıza ilişkin sorularınız için:{" "}
              <a href="mailto:info@premiumdijital.com" className="text-brand-blue hover:underline">
                info@premiumdijital.com
              </a>
            </p>
            <p className="mt-2">
              Daha fazla bilgi için{" "}
              <Link href="/gizlilik" className="text-brand-blue hover:underline">
                Gizlilik Politikamızı
              </Link>{" "}
              ve{" "}
              <Link href="/kvkk" className="text-brand-blue hover:underline">
                KVKK Aydınlatma Metnimizi
              </Link>{" "}
              inceleyebilirsiniz.
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
