// app/(marketing)/page.tsx
import Hero from "@/components/sections/hero/Hero";
import LogoCloud from "@/components/sections/LogoCloud"; // Yeni bileşen
import FAQSection from "@/components/sections/faq/FAQSection";
import { homeFaqs } from "@/components/sections/faq/faq-data";
import CaseStudiesSection from "@/components/sections/case-studies/CaseStudiesSection";
import { homeCaseStudies } from "@/components/sections/case-studies/case-study-data";
import AnalysisForm from "@/components/sections/AnalysisForm";
import Ecosystem from "@/components/sections/Ecosystem";
import ProcessRoadmap from "@/components/sections/ProcessRoadmap";
import EcosystemV2 from "@/components/sections/EcosystemV2";

export default function Page() {
  return (
    <main className="relative">
      <Hero />

      {/* Yeni Akışkan ve Büyük Logo Bölümü */}
      <LogoCloud />

      <Ecosystem />
      <EcosystemV2 />

      {/* =========================================================
          TRUST / LOGO STRIP
         ========================================================= */}
      <section className="relative z-10 mx-auto w-full max-w-6xl px-6 py-14">
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl px-8 py-10">
          <p className="text-sm uppercase tracking-[0.22em] text-white/50">
            Premium Operasyon Standardı
          </p>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-white/70 text-sm">
            <div className="rounded-2xl bg-black/20 border border-white/10 px-5 py-4">
              GA4 + GTM
            </div>
            <div className="rounded-2xl bg-black/20 border border-white/10 px-5 py-4">
              Core Web Vitals
            </div>
            <div className="rounded-2xl bg-black/20 border border-white/10 px-5 py-4">
              Google Ads
            </div>
            <div className="rounded-2xl bg-black/20 border border-white/10 px-5 py-4">
              SEO + CRO
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CONTENT WRAPPER (eski sayfadaki gibi üstten shadow ile geçiş)
         ========================================================= */}
      <div className="relative z-10 bg-brand-dark shadow-[0_-50px_100px_rgba(0,0,0,1)]">
        {/* =========================================================
            SERVICES (Benim sürümüm) - id=hizmetler
           ========================================================= */}
        <section
          id="hizmetler"
          className="relative mx-auto w-full max-w-6xl py-28 px-6"
        >
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase text-white/95">
              Büyüme <span className="text-brand-blue">Ekosistemimiz</span>
            </h2>
            <p className="mt-5 text-gray-200 max-w-2xl mx-auto italic text-lg font-light">
              Taktiksel müdahalelerle değil, bütünleşik çözümlerle domine
              ediyoruz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Performans Pazarlaması",
                desc: "Sermayenizi kâra dönüştüren agresif reklam yönetimi.",
                bullets: [
                  "Google & YouTube Ads",
                  "Meta (IG/FB) Ads",
                  "Remarketing",
                  "Bütçe ve teklif stratejileri",
                ],
                cta: "ROI Odaklı Reklamcılık →",
              },
              {
                title: "Web & Dönüşüm Altyapıları",
                desc: "Milisaniyelik hızda çalışan yüksek dönüşümlü landing mimarisi.",
                bullets: [
                  "Next.js / WordPress Landing",
                  "Core Web Vitals optimizasyonu",
                  "CRO (A/B test hazırlığı)",
                  "GA4 + GTM ölçüm altyapısı",
                ],
                cta: "Dönüşüm Mimarisini Kur →",
              },
              {
                title: "Marka & Görsel İletişim",
                desc: "Premium algı yaratan, satışa hizmet eden tasarım sistemi.",
                bullets: [
                  "Görsel dil + UI kit",
                  "Motion & mikro etkileşim",
                  "Teklif/sunum tasarımı",
                  "Kurumsal kimlik",
                ],
                cta: "Premium Görsel Dil →",
              },
            ].map((card) => (
              <article
                key={card.title}
                className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-8 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/10 to-transparent opacity-60" />
                <div className="relative">
                  <h3 className="text-2xl font-bold tracking-tight">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-gray-300/90">{card.desc}</p>
                  <ul className="mt-6 space-y-2 text-gray-300">
                    {card.bullets.map((t) => (
                      <li key={t} className="text-sm opacity-90">
                        • {t}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 text-brand-blue font-bold">
                    {card.cta}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* =========================================================
            SÜREÇ (Eski sayfadaki 3 kartlı tasarım) - id=surec
           ========================================================= */}
        {/* <section
          id="surec"
          className="py-32 px-6 max-w-6xl mx-auto border-t border-white/5"
        >
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase text-white/95">
            Yolu Nasıl <span className="text-brand-blue">Aydınlatıyoruz?</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                n: "01",
                t: "Analiz",
                d: "Sektörel sis perdesini aralıyor, mevcut durumunuzu verilerle ölçümlüyoruz.",
              },
              {
                n: "02",
                t: "Rota",
                d: "Sermayenizi koruyan ve maksimum ROI sağlayan o doğru yolu çiziyoruz.",
              },
              {
                n: "03",
                t: "Zirve",
                d: "Yolculuk boyunca rotayı pazarın nabzına göre anlık güncelliyoruz.",
              },
            ].map((step) => (
              <div
                key={step.n}
                className="group p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all"
              >
                <span className="text-6xl font-black text-brand-purple/20 block mb-6">
                  {step.n}
                </span>
                <h4 className="text-2xl font-bold mb-4">{step.t}</h4>
                <p className="text-gray-400 leading-relaxed">{step.d}</p>
              </div>
            ))}
          </div>
        </section> */}

        <ProcessRoadmap />

        {/* =========================================================
            EKOSİSTEM (Eski sayfadaki koyu premium kartlar)
           ========================================================= */}
        {/* <section className="py-32 px-6 bg-white/[0.01]">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase text-white/95">
              Büyüme <span className="text-brand-purple">Ekosistemimiz</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-8 text-left">
              {[
                {
                  title: "Performans",
                  tools: ["Google Ads", "Meta Ads", "TikTok Ads"],
                },
                {
                  title: "Mimari",
                  tools: ["Next.js", "SEO Tekniği", "UX Tasarım"],
                },
                {
                  title: "Otorite",
                  tools: ["Sosyal Strateji", "Kreatif İçerik", "Dijital PR"],
                },
              ].map((service) => (
                <div
                  key={service.title}
                  className="p-12 rounded-[3rem] bg-[#080808] border border-white/10 shadow-2xl group hover:border-brand-blue/50 transition-colors"
                >
                  <h3 className="text-3xl font-bold mb-8 group-hover:text-brand-blue transition-colors">
                    {service.title}
                  </h3>
                  <ul className="space-y-4">
                    {service.tools.map((t) => (
                      <li
                        key={t}
                        className="flex items-center gap-4 text-gray-300 font-medium"
                      >
                        <span className="w-1.5 h-1.5 bg-brand-purple rounded-full" />{" "}
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* =========================================================
    STRATEJİK DÖNÜŞÜM NOKTASI: ANALİZ FORMU
    ========================================================= */}
        <section
          id="analiz-section"
          className="bg-brand-dark relative z-10 border-t border-white/5"
        >
          <AnalysisForm />
        </section>

        {/* =========================================================
            SSS (Eski sayfadaki “Stratejik Soru & Cevap” stili) - id=sss
           ========================================================= */}
        <FAQSection
          id="sss"
          title={"Stratejik {accent}SSS"}
          accent="purple"
          items={homeFaqs}
          ctaHref="/iletisim"
          ctaLabel="Hemen Analiz Al →"
        />

        {/* =========================================================
    VAKA (CASE STUDIES) - id=vaka
   ========================================================= */}

        <CaseStudiesSection id="vaka" items={homeCaseStudies} />
        {/* =========================================================
            CONTACT CTA (Benim eklediğim)
           ========================================================= */}
        <section
          id="iletisim"
          className="relative mx-auto w-full max-w-6xl py-28 px-6"
        >
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-10 md:p-14 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/15 to-transparent opacity-70" />
            <div className="relative">
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase text-white/95">
                15 Dakikalık Ücretsiz Analiz ile{" "}
                <span className="text-brand-blue">Başlayalım.</span>
              </h2>
              <p className="mt-5 text-gray-200/90 max-w-2xl">
                Mevcut reklam hesap yapınızı, landing performansınızı ve ölçüm
                altyapınızı hızlıca değerlendirip net aksiyon listesi çıkaralım.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  className="shimmer-effect bg-brand-blue px-10 py-4 rounded-full font-bold text-sm md:text-base uppercase tracking-widest relative overflow-hidden"
                  href="https://wa.me/90XXXXXXXXXX"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp’tan Başlat →
                </a>
                <a
                  className="px-10 py-4 rounded-full font-semibold text-sm md:text-base border border-white/15 bg-white/5 hover:bg-white/10 transition"
                  href="mailto:info@premiumdijital.com"
                >
                  E-posta ile İletişim
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Not: Footer layout.tsx’te kalıyor */}
      </div>
    </main>
  );
}
