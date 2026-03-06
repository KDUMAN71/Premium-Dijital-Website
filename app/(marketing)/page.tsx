// app/(marketing)/page.tsx
import Hero from "@/components/sections/hero/Hero";
import LogoCloud from "@/components/sections/LogoCloud";
import FAQSection from "@/components/sections/faq/FAQSection";
import { homeFaqs } from "@/components/sections/faq/faq-data";
import CaseStudiesSection from "@/components/sections/case-studies/CaseStudiesSection";
import { homeCaseStudies } from "@/components/sections/case-studies/case-study-data";
import AnalysisForm from "@/components/sections/AnalysisForm";
import Ecosystem from "@/components/sections/Ecosystem";
import ProcessRoadmap from "@/components/sections/ProcessRoadmap";
import EcosystemV2 from "@/components/sections/EcosystemV2";
import Reveal from "@/components/ui/Reveal";

export default function Page() {
  return (
    <main className="relative">
      <Hero />

      {/* Logo Cloud */}
      <Reveal delay={0.08}>
        <LogoCloud />
      </Reveal>

      <Reveal delay={0.14}>
        <Ecosystem />
      </Reveal>

      <Reveal delay={0.18}>
        <EcosystemV2 />
      </Reveal>

      {/* TRUST STRIP */}
      <section className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-5 md:px-6 py-10 sm:py-12 md:py-14">
        <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10">
          <p className="text-xs sm:text-sm uppercase tracking-[0.22em] text-white/50">
            Premium Operasyon Standardı
          </p>

          <div className="mt-5 sm:mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 text-white/70 text-xs sm:text-sm">
            <div className="rounded-2xl bg-black/20 border border-white/10 px-4 py-3 sm:px-5 sm:py-4 text-center">
              GA4 + GTM
            </div>
            <div className="rounded-2xl bg-black/20 border border-white/10 px-4 py-3 sm:px-5 sm:py-4 text-center">
              Core Web Vitals
            </div>
            <div className="rounded-2xl bg-black/20 border border-white/10 px-4 py-3 sm:px-5 sm:py-4 text-center">
              Google Ads
            </div>
            <div className="rounded-2xl bg-black/20 border border-white/10 px-4 py-3 sm:px-5 sm:py-4 text-center">
              SEO + CRO
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT WRAPPER */}
      <div className="relative z-10 bg-brand-dark shadow-[0_-50px_100px_rgba(0,0,0,1)]">
        {/* SERVICES */}
        <section
          id="hizmetler"
          className="relative mx-auto w-full max-w-6xl px-4 sm:px-5 md:px-6 py-16 sm:py-20 md:py-28"
        >
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-7xl font-bold tracking-tighter uppercase text-white/95">
              Büyüme <span className="text-brand-blue">Ekosistemimiz</span>
            </h2>

            <p className="mt-4 sm:mt-5 text-gray-200 max-w-2xl mx-auto italic text-sm sm:text-base md:text-lg font-light">
              Taktiksel müdahalelerle değil, bütünleşik çözümlerle domine
              ediyoruz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8">
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
            ].map((card, index) => (
              <Reveal key={card.title} delay={0.12 + index * 0.14}>
                <article className="rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-5 sm:p-6 md:p-8 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/10 to-transparent opacity-60" />

                  <div className="relative">
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                      {card.title}
                    </h3>

                    <p className="mt-3 text-sm sm:text-base text-gray-300/90">
                      {card.desc}
                    </p>

                    <ul className="mt-5 sm:mt-6 space-y-2 text-gray-300">
                      {card.bullets.map((t) => (
                        <li key={t} className="text-sm opacity-90">
                          • {t}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 sm:mt-8 text-brand-blue font-bold text-sm sm:text-base">
                      {card.cta}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* PROCESS */}
        <Reveal delay={0.12}>
          <ProcessRoadmap />
        </Reveal>

        {/* ANALYSIS FORM */}
        <section
          id="analiz-section"
          className="bg-brand-dark relative z-10 border-t border-white/5"
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

        {/* CASE STUDIES */}
        <Reveal delay={0.16}>
          <CaseStudiesSection items={homeCaseStudies} />
        </Reveal>

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
