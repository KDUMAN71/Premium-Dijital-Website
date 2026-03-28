"use client";

import { Play } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";

const sectors = [
  {
    sector: "Sağlık & Estetik Klinik",
    color: "#BE29EC",
    icon: "🏥",
    title: "Doktor Güveni → Randevu Talebi",
    desc: "Uzman doktor tanıtımı ve hasta hikayeleriyle güven inşa edip randevu dönüşümü sağlıyoruz.",
    funnel: [
      { step: "In-Stream Video", sub: "Doktor tanıtımı" },
      { step: "YouTube + GDN", sub: "Sağlık arayanlar" },
      { step: "Randevu Formu", sub: "CTA ile yönlendirme" },
    ],
    metrics: [
      { label: "Görüntülenme Maliyeti", value: "₺0.08 avg" },
      { label: "Randevu Dönüşümü", value: "+185%" },
    ],
  },
  {
    sector: "Turizm & Otel",
    color: "#0000C8",
    icon: "🏨",
    title: "Destinasyon Hissi → Rezervasyon",
    desc: "Sinematik destinasyon videoları ve deneyim hikayeleriyle rezervasyon kararını hızlandırıyoruz.",
    funnel: [
      { step: "YouTube Shorts", sub: "Destinasyon keşfi" },
      { step: "In-Stream Retargeting", sub: "Gezginler kitlesi" },
      { step: "Rezervasyon Sayfası", sub: "Sezon öncesi kampanya" },
    ],
    metrics: [
      { label: "Video Tamamlama Oranı", value: "%68 avg" },
      { label: "Rezervasyon Artışı", value: "+220%" },
    ],
  },
];

export default function VideoSectors() {
  const shouldReduce = useReducedMotion();

  return (
    <section className="relative py-24 md:py-32 border-t border-white/5 bg-brand-dark text-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Başlık */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <ScrollReveal>
            <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/50 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
              Sektör Senaryoları
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6">
              Sektörünüze Özel{" "}
              <span className="text-brand-purple">Video Stratejisi</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Genel şablonlar değil, sektörünüzün dinamiklerine göre
              tasarlanmış video funnel'ları.
            </p>
          </ScrollReveal>
        </div>

        {/* 2 büyük kart */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sectors.map((s, i) => (
            <motion.div
              key={i}
              initial={shouldReduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative rounded-[2.5rem] border overflow-hidden"
              style={{ borderColor: `${s.color}25` }}
            >
              {/* Background gradient */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, ${s.color}08, transparent 60%)`,
                }}
              />

              <div className="relative z-10 p-8 md:p-10 flex flex-col gap-6">
                {/* Header */}
                <div className="flex items-start gap-4">
                  <div
                    className="shrink-0 text-2xl w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{
                      background: `${s.color}15`,
                      border: `1px solid ${s.color}30`,
                    }}
                  >
                    {s.icon}
                  </div>
                  <div>
                    <span
                      className="inline-block px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-2"
                      style={{
                        background: `${s.color}20`,
                        color: s.color,
                        border: `1px solid ${s.color}30`,
                      }}
                    >
                      {s.sector}
                    </span>
                    <h3 className="text-xl font-black tracking-tight text-white leading-tight">
                      {s.title}
                    </h3>
                  </div>
                </div>

                {/* Açıklama */}
                <p className="text-white/60 text-sm leading-relaxed">{s.desc}</p>

                {/* Mini funnel */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-0">
                  {s.funnel.map((f, fi) => (
                    <div key={fi} className="flex items-center gap-1 sm:gap-0">
                      <div className="flex flex-col items-center">
                        <div
                          className="px-3 py-2 rounded-xl text-center"
                          style={{
                            background: `${s.color}12`,
                            border: `1px solid ${s.color}25`,
                          }}
                        >
                          <div
                            className="text-[11px] font-black uppercase tracking-widest leading-none"
                            style={{ color: s.color }}
                          >
                            {f.step}
                          </div>
                          <div className="text-[10px] text-white/40 mt-0.5">
                            {f.sub}
                          </div>
                        </div>
                      </div>
                      {fi < s.funnel.length - 1 && (
                        <span
                          className="text-sm font-bold mx-1 sm:mx-2 shrink-0"
                          style={{ color: `${s.color}60` }}
                        >
                          →
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Video thumbnail placeholder */}
                <div
                  className="relative mt-2 rounded-2xl overflow-hidden bg-black/40 border border-white/10"
                  style={{ aspectRatio: "16/9" }}
                >
                  {/* Sinematik gradient overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, ${s.color}20, transparent)`,
                    }}
                  />
                  {/* Play butonu */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm">
                      <Play className="w-6 h-6 text-white ml-1" fill="white" />
                    </div>
                  </div>
                  {/* Etiket */}
                  <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/60 text-[10px] font-bold text-white/70 backdrop-blur-sm">
                    Örnek Video Yakında
                  </div>
                </div>

                {/* Metrikler */}
                <div className="flex gap-4 pt-2">
                  {s.metrics.map((m, mi) => (
                    <div
                      key={mi}
                      className="flex-1 px-4 py-3 rounded-2xl border border-white/8 bg-white/[0.02]"
                    >
                      <div
                        className="text-lg font-black tracking-tight"
                        style={{ color: s.color }}
                      >
                        {m.value}
                      </div>
                      <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-0.5">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
