"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState } from "react";

const steps = [
  {
    id: "01",
    title: "Analiz",
    tagline: "Neyin işe yaramadığını bilmeden strateji kurulamaz.",
    desc: "Mevcut durumunuzu, rakiplerinizi ve sektörünüzü veriyle haritalıyoruz. Sezgiye değil, somut bulgulara dayanan bir başlangıç noktası belirliyoruz.",
    duration: "1–2 hafta",
    output: "Durum Raporu & Fırsat Haritası",
    color: {
      active: "rgba(190,41,236,0.15)",
      border: "rgba(190,41,236,0.35)",
      glow: "rgba(190,41,236,0.12)",
      dot: "#be29ec",
      text: "#d8b4fe",
    },
    details: [
      {
        label: "Teknik SEO denetimi",
        note: "Core Web Vitals, indexleme, site mimarisi",
      },
      {
        label: "Reklam hesabı analizi",
        note: "Mevcut kampanya performansı ve bütçe verimliliği",
      },
      {
        label: "Rakip & pazar araştırması",
        note: "Sektörde kim ne yapıyor, boşluklar nerede",
      },
      {
        label: "GA4 & veri altyapısı kontrolü",
        note: "Doğru ölçüm yapılıyor mu, hangi veriler eksik",
      },
      {
        label: "Hedef kitle segmentasyonu",
        note: "Kimi, hangi mesajla, hangi kanaldan hedefliyoruz",
      },
    ],
  },
  {
    id: "02",
    title: "Strateji",
    tagline: "Her işletme farklıdır. Şablonla strateji olmaz.",
    desc: "Analiz bulgularını eyleme dönüştürüyoruz. Hangi kanallar, hangi sırayla, ne kadar bütçeyle — hepsini önceliklendirilmiş bir yol haritasına bağlıyoruz.",
    duration: "1 hafta",
    output: "Dijital Büyüme Yol Haritası",
    color: {
      active: "rgba(99,102,241,0.15)",
      border: "rgba(99,102,241,0.35)",
      glow: "rgba(99,102,241,0.12)",
      dot: "#6366f1",
      text: "#a5b4fc",
    },
    details: [
      {
        label: "Kanal & öncelik planlaması",
        note: "SEO, PPC, sosyal medya — hangisi önce, neden",
      },
      {
        label: "Bütçe dağılımı & ROI projeksiyonu",
        note: "Harcama nereye gidiyor, ne zaman geri dönüyor",
      },
      {
        label: "Dönüşüm hunisi (funnel) tasarımı",
        note: "Farkındalıktan satışa her adım kurgulanıyor",
      },
      {
        label: "İçerik & anahtar kelime stratejisi",
        note: "Hangi içerikler hangi müşteriyi çeker",
      },
      {
        label: "KPI & başarı kriterleri",
        note: "Neyi ölçeceğiz, başarı nasıl görünüyor",
      },
    ],
  },
  {
    id: "03",
    title: "Uygulama",
    tagline: "Strateji rafta kalmaz — her şey zamanında devreye girer.",
    desc: "Onaylanan planı sistemli ve koordineli şekilde hayata geçiriyoruz. Her teslim için net tarih, net sorumluluk — sürpriz yok.",
    duration: "2–4 hafta",
    output: "Canlı Kampanyalar & Yayına Alınan Sistem",
    color: {
      active: "rgba(59,130,246,0.15)",
      border: "rgba(59,130,246,0.35)",
      glow: "rgba(59,130,246,0.12)",
      dot: "#3b82f6",
      text: "#93c5fd",
    },
    details: [
      {
        label: "Web sitesi & landing page geliştirme",
        note: "Dönüşüm odaklı tasarım ve teknik altyapı",
      },
      {
        label: "Reklam kampanyası kurulumu",
        note: "Google Ads, Meta Ads — hedefleme, kreatif, teklif",
      },
      {
        label: "SEO teknik iyileştirmeleri",
        note: "Schema, hız, mobil uyum, iç bağlantı mimarisi",
      },
      {
        label: "GA4 + GTM ölçüm altyapısı",
        note: "Her dönüşüm izleniyor, veri doğrulanıyor",
      },
      {
        label: "İçerik üretimi & yayın takvimi",
        note: "Planlanan içerikler zamanında hazır ve yayında",
      },
    ],
  },
  {
    id: "04",
    title: "Optimizasyon",
    tagline: "Kurmak bitişin değil, başlangıcın adıdır.",
    desc: "Gerçek veriye bakarak neyin işe yaradığını güçlendiriyor, işe yaramayanı hızla revize ediyoruz. Haftalık raporlarla her adımı şeffaf tutuyoruz.",
    duration: "Sürekli",
    output: "Haftalık Rapor & Büyüme Aksiyonları",
    color: {
      active: "rgba(0,0,200,0.15)",
      border: "rgba(0,0,200,0.38)",
      glow: "rgba(0,0,200,0.12)",
      dot: "#0000c8",
      text: "#93c5fd",
    },
    details: [
      {
        label: "A/B testi & kreatif optimizasyon",
        note: "Hangi başlık, hangi görsel, hangi teklif daha iyi çalışıyor",
      },
      {
        label: "Bütçe yeniden dağılımı",
        note: "Performans verilerine göre bütçe en verimli kanala kayıyor",
      },
      {
        label: "SEO içerik güncelleme",
        note: "Sıralama kaybeden sayfalar güncelleniyor, yeni fırsatlar ekleniyor",
      },
      {
        label: "Dönüşüm oranı optimizasyonu (CRO)",
        note: "Aynı trafik, daha fazla dönüşüm — form, sayfa, akış iyileştirme",
      },
      {
        label: "Haftalık performans raporu",
        note: "Sayılar, yorumlar ve bir sonraki hafta aksiyonları",
      },
    ],
  },
];

const schemaData = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Premium Dijital ile Dijital Büyüme Süreci",
  description:
    "Analiz, strateji, uygulama ve sürekli optimizasyondan oluşan 4 aşamalı dijital büyüme metodolojisi",
  step: steps.map((s, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: s.title,
    text: s.desc,
    itemListElement: s.details.map((d) => ({
      "@type": "HowToDirection",
      text: `${d.label}: ${d.note}`,
    })),
  })),
};


export default function ProcessRoadmap() {
  const [activeStep, setActiveStep] = useState(0);
  const prefersReduced = useReducedMotion();
  const current = steps[activeStep];

  return (
    <section
      id="surec"
      aria-label="Çalışma sürecimiz"
      className="border-t border-white/5 bg-brand-dark px-4 py-16 sm:px-5 sm:py-20 md:px-6 md:py-28"
      itemScope
      itemType="https://schema.org/HowTo"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="mx-auto max-w-6xl">
        {/*
          Layout: sol kolon = başlık + adım listesi (flex-col)
                  sağ kolon = detay paneli (self-start ile tepeye hizalı)
          Başlık sol kolonda olduğu için sağ panel her zaman tepeden başlıyor.
        */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16 lg:items-start">
          {/* ── SOL: Başlık + Adım listesi ── */}
          <div className="flex flex-col gap-8 md:gap-10">
            {/* Başlık */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 mb-5">
                <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-white/50">
                  Nasıl Çalışıyoruz
                </span>
              </div>
              <h2
                className="text-3xl font-bold tracking-tighter uppercase sm:text-4xl md:text-5xl lg:text-6xl"
                itemProp="name"
              >
                Söz değil,{" "}
                <span className="bg-gradient-to-r from-[#be29ec] to-[#0000c8] bg-clip-text text-transparent">
                  sistem
                </span>
                <span className="block text-white/30 text-xl sm:text-2xl md:text-3xl font-light normal-case tracking-normal mt-2">
                  4 aşama · şeffaf süreç · ölçülebilir sonuç
                </span>
              </h2>
            </motion.div>

            {/* Adım seçici */}
            <div
              className="space-y-3 sm:space-y-4"
              role="tablist"
              aria-label="Süreç adımları"
            >
              {steps.map((step, index) => {
                const isActive = activeStep === index;
                return (
                  <motion.button
                    key={step.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`step-panel-${step.id}`}
                    id={`step-tab-${step.id}`}
                    onMouseEnter={() => setActiveStep(index)}
                    onClick={() => setActiveStep(index)}
                    initial={{ opacity: 0, x: prefersReduced ? 0 : -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{
                      delay: index * 0.08,
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="group w-full rounded-2xl border text-left transition-all duration-300 sm:rounded-3xl"
                    style={{
                      background: isActive ? step.color.active : "transparent",
                      borderColor: isActive
                        ? step.color.border
                        : "rgba(255,255,255,0.06)",
                      boxShadow: isActive
                        ? `0 0 28px ${step.color.glow}`
                        : "none",
                      padding: isActive ? "1.25rem 1.5rem" : "1rem 1.5rem",
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className="font-mono text-xl font-black tabular-nums transition-colors duration-300 sm:text-2xl"
                        style={{
                          color: isActive
                            ? step.color.dot
                            : "rgba(255,255,255,0.15)",
                        }}
                      >
                        {step.id}
                      </span>
                      <div className="flex-1 min-w-0">
                        <h3
                          className="text-lg font-bold uppercase tracking-tight sm:text-xl"
                          style={{
                            color: isActive ? "#fff" : "rgba(255,255,255,0.6)",
                          }}
                        >
                          {step.title}
                        </h3>
                        <AnimatePresence>
                          {isActive && (
                            <motion.p
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{
                                duration: 0.28,
                                ease: [0.16, 1, 0.3, 1],
                              }}
                              className="mt-1 text-[12px] leading-relaxed overflow-hidden"
                              style={{ color: step.color.text }}
                            >
                              {step.tagline}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                      <span
                        className="shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold whitespace-nowrap transition-all duration-300"
                        style={{
                          background: isActive
                            ? "rgba(255,255,255,0.07)"
                            : "transparent",
                          color: isActive
                            ? step.color.text
                            : "rgba(255,255,255,0.2)",
                          border: isActive
                            ? `0.5px solid ${step.color.border}`
                            : "0.5px solid transparent",
                        }}
                      >
                        {step.duration}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* ── SAĞ: Detay paneli — self-start ile tepeye hizalı ── */}
          <div
            className="relative overflow-hidden rounded-[2rem] border bg-[#06060e] self-start sm:rounded-[2.5rem] md:rounded-[2.75rem]"
            style={{ borderColor: current.color.border }}
            role="tabpanel"
            id={`step-panel-${current.id}`}
            aria-labelledby={`step-tab-${current.id}`}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full blur-[100px] transition-all duration-700"
              style={{ background: current.color.dot, opacity: 0.12 }}
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 right-0 z-0 select-none overflow-hidden leading-none font-black tracking-tighter text-white"
              style={{
                fontSize: "clamp(120px, 20vw, 180px)",
                opacity: 0.05,
                transform: "translateX(20%) translateY(10%)",
                transition: "opacity 0.3s ease",
              }}
            >
              {current.id}
            </div>

            <AnimatePresence>
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: prefersReduced ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: prefersReduced ? 0 : -8 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 p-6 sm:p-8 md:p-10"
              >
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                  <span
                    className="text-[10px] font-black uppercase tracking-[0.28em]"
                    style={{ color: current.color.text }}
                  >
                    Aşama {current.id} — {current.title}
                  </span>
                  <span
                    className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em]"
                    style={{
                      background: current.color.active,
                      color: current.color.text,
                      border: `0.5px solid ${current.color.border}`,
                    }}
                  >
                    📄 {current.output}
                  </span>
                </div>

                <p className="mb-7 text-base font-medium leading-relaxed text-white/75 sm:text-lg">
                  {current.desc}
                </p>

                <div className="space-y-2.5" role="list">
                  {current.details.map((detail, i) => (
                    <motion.div
                      key={detail.label}
                      initial={{ opacity: 0, x: prefersReduced ? 0 : 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.3 }}
                      role="listitem"
                      className="flex items-start gap-3 rounded-xl border px-4 py-3"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        borderColor: "rgba(255,255,255,0.06)",
                      }}
                    >
                      <span
                        className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{
                          background: current.color.dot,
                          boxShadow: `0 0 6px ${current.color.dot}`,
                        }}
                      />
                      <div className="min-w-0">
                        <span className="block text-[13px] font-bold text-white/85">
                          {detail.label}
                        </span>
                        <span className="block text-[11px] leading-relaxed text-white/40 mt-0.5">
                          {detail.note}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Alt güven bandı ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 md:mt-20"
        >
          {[
            "Haftalık şeffaf raporlama",
            "Onaysız adım atılmaz",
            "Her aşamada somut çıktı",
            "Veriyle yönetilen optimizasyon",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="h-1 w-1 rounded-full"
                style={{
                  background: "linear-gradient(90deg,#be29ec,#0000c8)",
                  boxShadow: "0 0 6px rgba(190,41,236,0.6)",
                }}
              />
              <span className="text-[12px] font-medium text-white/35">
                {item}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
