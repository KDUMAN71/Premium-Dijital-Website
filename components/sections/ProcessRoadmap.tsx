"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const steps = [
  {
    id: "01",
    title: "Analiz",
    desc: "Sektörel sis perdesini aralıyor, mevcut durumunuzu ve rakiplerinizi verilerle röntgenliyoruz.",
    details: ["Teknik Denetim", "Pazar Analizi", "Veri Takibi Kontrolü"],
  },
  {
    id: "02",
    title: "Strateji",
    desc: "Sermayenizi koruyan ve maksimum ROI sağlayan size özel dijital kapasite mimarisini çiziyoruz.",
    details: ["Kanal Planlaması", "Bütçe Optimizasyonu", "Funnel Tasarımı"],
  },
  {
    id: "03",
    title: "Uygulama",
    desc: "Kağıt üzerindeki planı Next.js hızında ve Google Ads hassasiyetinde hayata geçiriyoruz.",
    details: [
      "Kreatif Prodüksiyon",
      "Kampanya Kurulumu",
      "Landing Page Yayını",
    ],
  },
  {
    id: "04",
    title: "Optimizasyon",
    desc: "Zirve yolculuğunda rotayı pazarın nabzına ve gerçek verilere göre anlık güncelliyoruz.",
    details: ["A/B Testleri", "Ölçeklendirme", "Haftalık Raporlama"],
  },
];

export default function ProcessRoadmap() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section
      id="surec"
      className="overflow-hidden border-t border-white/5 bg-brand-dark px-4 py-16 sm:px-5 sm:py-20 md:px-6 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-10 text-3xl font-bold tracking-tighter uppercase italic sm:mb-12 sm:text-4xl md:mb-20 md:text-7xl">
          Süreç <span className="font-light text-brand-blue">Mimarisi</span>
        </h2>

        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Sol: Adım Seçici */}
          <div className="space-y-3 sm:space-y-4">
            {steps.map((step, index) => (
              <button
                key={step.id}
                type="button"
                onMouseEnter={() => setActiveStep(index)}
                onClick={() => setActiveStep(index)}
                className={`group w-full rounded-2xl border p-5 text-left transition-all duration-500 sm:rounded-3xl sm:p-6 md:p-8 ${
                  activeStep === index
                    ? "border-brand-blue/40 bg-white/[0.04] shadow-[0_0_30px_rgba(0,100,255,0.1)]"
                    : "border-white/5 bg-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <div className="flex items-center gap-4 sm:gap-5 md:gap-6">
                  <span
                    className={`text-xl font-black italic transition-colors sm:text-2xl ${
                      activeStep === index ? "text-brand-blue" : "text-white/20"
                    }`}
                  >
                    {step.id}
                  </span>

                  <h3 className="text-xl font-bold uppercase italic tracking-tight sm:text-2xl">
                    {step.title}
                  </h3>
                </div>
              </button>
            ))}
          </div>

          {/* Sağ: Detay Paneli */}
          <div className="relative min-h-[320px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#080808] p-6 sm:min-h-[360px] sm:rounded-[2.5rem] sm:p-8 md:min-h-[400px] md:rounded-[3rem] md:p-10">
            {/* Dinamik Arkaplan Glow */}
            <div className="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-brand-blue/10 blur-[90px] sm:h-56 sm:w-56 md:h-64 md:w-64 md:blur-[100px]" />

            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10"
            >
              <h4 className="mb-4 text-[10px] font-black uppercase tracking-[0.24em] text-brand-blue italic sm:mb-5 sm:text-[11px] sm:tracking-[0.3em] md:mb-6 md:text-xs md:tracking-[0.4em]">
                Aşama Detayları // {steps[activeStep].title}
              </h4>

              <p className="mb-6 text-lg font-medium italic leading-relaxed text-white/80 sm:mb-8 sm:text-xl md:mb-10 md:text-2xl">
                "{steps[activeStep].desc}"
              </p>

              <div className="grid gap-2.5 sm:gap-3">
                {steps[activeStep].details.map((detail, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/5 px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white/60 sm:gap-4 sm:px-5 sm:py-4 sm:text-sm sm:tracking-[0.22em] md:px-6 md:tracking-widest"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-blue shadow-[0_0_10px_rgba(0,100,255,1)]" />
                    {detail}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
