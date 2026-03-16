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

export default function Page() {
  return (
    <main className="relative">
      <Hero />

      {/* TRUST STRIP */}
      <section
        aria-label="Ölçülen sonuçlar"
        className="relative z-10 mx-auto w-full max-w-6xl px-4 py-8 sm:px-5 sm:py-10 md:px-6 md:py-12"
      >
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-6 backdrop-blur-2xl sm:rounded-3xl sm:px-6 sm:py-8 md:px-10 md:py-8">
          {/* Arka plan parıltısı */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-brand-purple opacity-[0.06] blur-[60px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-brand-blue opacity-[0.06] blur-[60px]"
          />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-0">
            {/* Sol — label */}
            <div className="shrink-0 sm:w-40 sm:border-r sm:border-white/8 sm:pr-6">
              <p className="text-[10px] font-black uppercase tracking-[0.26em] text-white/30 sm:text-[11px]">
                Ölçülen
                <br className="hidden sm:block" /> Sonuçlar
              </p>
            </div>

            {/* Sağ — 4 metrik */}
            <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-1 sm:items-center sm:justify-around sm:gap-0 sm:pl-6 md:gap-0">
              {[
                {
                  stat: "50+",
                  label: "Tamamlanan Proje",
                  color: "#be29ec",
                },
                {
                  stat: "4×",
                  label: "Ortalama ROAS",
                  color: "#a78bfa",
                },
                {
                  stat: "%300+",
                  label: "SEO Trafik Büyümesi",
                  color: "#60a5fa",
                },
                {
                  stat: "1 Gün",
                  label: "Yanıt Süresi",
                  color: "#34d399",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col items-center gap-1 text-center sm:px-4"
                >
                  <span
                    className="text-2xl font-black leading-none tracking-tighter tabular-nums sm:text-3xl"
                    style={{ color: item.color }}
                  >
                    {item.stat}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/35 sm:text-[11px]">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LOGO CLOUD */}
      <Reveal delay={0.08}>
        <LogoCloud />
      </Reveal>

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
          title="Sıkça Sorulan"
          accentText="Sorular"
          accentColor="purple"
          items={homeFaqs}
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
