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
      className="py-32 px-6 bg-brand-dark overflow-hidden border-t border-white/5"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase italic mb-20">
          Süreç <span className="text-brand-blue font-light">Mimarisi</span>
        </h2>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Sol: Adım Seçici */}
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div
                key={step.id}
                onMouseEnter={() => setActiveStep(index)}
                className={`group cursor-pointer p-8 rounded-3xl border transition-all duration-500 ${
                  activeStep === index
                    ? "bg-white/[0.04] border-brand-blue/40 shadow-[0_0_30px_rgba(0,100,255,0.1)]"
                    : "bg-transparent border-white/5 opacity-40 hover:opacity-100"
                }`}
              >
                <div className="flex items-center gap-6">
                  <span
                    className={`text-2xl font-black italic transition-colors ${activeStep === index ? "text-brand-blue" : "text-white/20"}`}
                  >
                    {step.id}
                  </span>
                  <h3 className="text-2xl font-bold uppercase italic tracking-tight">
                    {step.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Sağ: Detay Paneli (Resend Tarzı Wireframe) */}
          <div className="relative min-h-[400px] p-10 rounded-[3rem] border border-white/10 bg-[#080808] overflow-hidden">
            {/* Dinamik Arkaplan Glow */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-blue/10 blur-[100px] rounded-full" />

            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="relative z-10"
            >
              <h4 className="text-brand-blue font-black text-xs uppercase tracking-[0.4em] mb-6 italic">
                Aşama Detayları // {steps[activeStep].title}
              </h4>
              <p className="text-2xl text-white/80 font-medium leading-relaxed italic mb-10">
                "{steps[activeStep].desc}"
              </p>

              <div className="grid gap-3">
                {steps[activeStep].details.map((detail, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 py-4 px-6 rounded-2xl bg-white/5 border border-white/5 text-sm font-bold uppercase tracking-widest text-white/60"
                  >
                    <span className="w-1.5 h-1.5 bg-brand-blue rounded-full shadow-[0_0_10px_rgba(0,100,255,1)]" />
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
