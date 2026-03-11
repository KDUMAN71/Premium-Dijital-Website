// app/(marketing)/page.tsx
import Hero from "@/components/sections/hero/Hero";
import LogoCloud from "@/components/sections/LogoCloud";
import FAQSection from "@/components/sections/faq/FAQSection";
import { homeFaqs } from "@/components/sections/faq/faq-data";
import CaseStudiesSection from "@/components/sections/case-studies/CaseStudiesSection";
import { homeCaseStudies } from "@/components/sections/case-studies/case-study-data";
import AnalysisForm from "@/components/sections/AnalysisForm";
import ProcessRoadmap from "@/components/sections/ProcessRoadmap";
import Reveal from "@/components/ui/Reveal";
import GrowthEcosystem from "@/components/sections/GrowthEcosystem";

const serviceCards = [
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
];

export default function Page() {
  return (
    <main className="relative">
      <Hero />

      {/* LOGO CLOUD */}
      <Reveal delay={0.08}>
        <LogoCloud />
      </Reveal>

      {/* TRUST STRIP */}
      <section className="relative z-10 mx-auto w-full max-w-6xl px-4 py-10 sm:px-5 sm:py-12 md:px-6 md:py-14">
        <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-6 backdrop-blur-2xl sm:rounded-3xl sm:px-6 sm:py-8 md:px-8 md:py-10">
          <p className="text-xs uppercase tracking-[0.22em] text-white/50 sm:text-sm">
            Premium Operasyon Standardı
          </p>

          <div className="mt-5 grid grid-cols-2 gap-3 text-xs text-white/70 sm:mt-6 sm:gap-4 sm:text-sm md:grid-cols-4 md:gap-6">
            <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-center sm:px-5 sm:py-4">
              GA4 + GTM
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-center sm:px-5 sm:py-4">
              Core Web Vitals
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-center sm:px-5 sm:py-4">
              Google Ads
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-center sm:px-5 sm:py-4">
              SEO + CRO
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT WRAPPER */}
      <div className="relative z-10 bg-brand-dark shadow-[0_-50px_100px_rgba(0,0,0,1)]">
        <Reveal delay={0.12}>
          <GrowthEcosystem />
        </Reveal>

        {/* PROCESS */}
        <Reveal delay={0.12}>
          <ProcessRoadmap />
        </Reveal>

        {/* CASE STUDIES */}
        <Reveal delay={0.16}>
          <CaseStudiesSection items={homeCaseStudies} />
        </Reveal>

        {/* ANALYSIS FORM */}
        <section
          id="analiz-section"
          className="relative z-10 border-t border-white/5 bg-brand-dark"
        >
          <AnalysisForm />
        </section>

        {/* FAQ */}
        <FAQSection
          id="sss"
          title={"Stratejik {accent}SSS"}
          accent="purple"
          items={homeFaqs}
          ctaHref="/iletisim"
          ctaLabel="Hemen Analiz Al →"
        />

        {/* CONTACT CTA */}
        <Reveal delay={0.06}>
          <section
            id="iletisim"
            className="relative mx-auto w-full max-w-6xl px-4 py-14 sm:px-5 sm:py-18 md:px-6 md:py-24"
          >
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-2xl sm:rounded-3xl sm:p-7 md:p-14">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/15 to-transparent opacity-70" />

              <div className="relative">
                <h2 className="text-3xl font-bold tracking-tighter uppercase text-white/95 sm:text-4xl md:text-7xl">
                  15 Dakikalık Ücretsiz Analiz ile{" "}
                  <span className="text-brand-blue">Başlayalım.</span>
                </h2>

                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-200/90 sm:mt-5 sm:text-base md:text-lg">
                  Mevcut reklam hesap yapınızı, landing performansınızı ve ölçüm
                  altyapınızı hızlıca değerlendirip net aksiyon listesi
                  çıkaralım.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:gap-4">
                  <a
                    className="shimmer-effect relative inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-brand-blue px-6 py-4 text-center text-xs font-bold uppercase tracking-[0.16em] text-white sm:w-auto sm:px-8 sm:text-sm md:px-10 md:text-base md:tracking-widest"
                    href="https://wa.me/90XXXXXXXXXX"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp’tan Başlat →
                  </a>

                  <a
                    className="inline-flex w-full items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-4 text-center text-sm font-semibold transition hover:bg-white/10 sm:w-auto sm:px-8 md:px-10 md:text-base"
                    href="mailto:info@premiumdijital.com"
                  >
                    E-posta ile İletişim
                  </a>
                </div>
              </div>
            </div>
          </section>
        </Reveal>
      </div>
    </main>
  );
}
