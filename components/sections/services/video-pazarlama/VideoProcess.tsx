"use client";

import { motion, useReducedMotion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";

const steps = [
  {
    number: "01",
    color: "#BE29EC",
    title: "Strateji & Hedef Belirleme",
    desc: "Sektörünüzü, hedef kitlenizi ve kampanya amacınızı analiz ediyoruz. Marka bilinirliği mi, lead mi, satış mı — her hedef farklı video stratejisi gerektirir.",
    output: "Kampanya brief'i + hedef kitle haritası",
  },
  {
    number: "02",
    color: "#0000C8",
    title: "Script & Prodüksiyon Rehberliği",
    desc: "Videonuzun senaryosunu yazıyor, çekim brief'i hazırlıyoruz. Mevcut ekibinizle veya önerdiğimiz prodüksiyon partneriyle çalışabilirsiniz.",
    output: "Video script'i + çekim brief'i",
  },
  {
    number: "03",
    color: "#BE29EC",
    title: "Kampanya Kurulumu & Hedefleme",
    desc: "Google Ads'te YouTube kampanyasını kuruyoruz. Demografi, ilgi alanı, anahtar kelime ve yeniden pazarlama kitlelerini yapılandırıyoruz.",
    output: "Canlı kampanya + tracking kurulumu",
  },
  {
    number: "04",
    color: "#0000C8",
    title: "Optimizasyon & Raporlama",
    desc: "Haftalık performans takibi, A/B test ve bütçe optimizasyonu. View-through dönüşümler dahil tüm metrikleri şeffaf raporluyoruz.",
    output: "Haftalık rapor + aylık strateji görüşmesi",
  },
];

export default function VideoProcess() {
  const shouldReduce = useReducedMotion();

  return (
    <section className="relative py-24 md:py-32 border-t border-white/5 bg-brand-dark text-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Başlık */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <ScrollReveal>
            <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/50 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
              Nasıl Çalışıyoruz
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6">
              Strateji&apos;den{" "}
              <span className="text-brand-purple">Sonuca</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Her proje dört adımda ilerler. Sizi her adımda bilgilendiriyor,
              çıktıları paylaşıyoruz.
            </p>
          </ScrollReveal>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Dikey çizgi */}
          <div
            className="absolute left-[2.75rem] top-8 bottom-8 w-px hidden md:block"
            style={{
              background:
                "linear-gradient(180deg, #BE29EC, #0000C8, #BE29EC, #0000C8)",
            }}
          />

          <div className="space-y-10">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={shouldReduce ? false : { opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-6 md:gap-10"
              >
                {/* Numara */}
                <div className="shrink-0 relative">
                  <div
                    className="w-[5.5rem] h-[5.5rem] rounded-[1.5rem] flex items-center justify-center"
                    style={{
                      background: `${step.color}10`,
                      border: `1px solid ${step.color}30`,
                    }}
                  >
                    <span
                      className="text-4xl font-black tracking-tighter leading-none select-none"
                      style={{ color: `${step.color}60` }}
                    >
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* İçerik */}
                <div className="flex-1 pt-2">
                  <h3 className="text-xl font-black tracking-tight text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-4">
                    {step.desc}
                  </p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/8">
                    <span
                      className="text-[10px] font-bold uppercase tracking-widest"
                      style={{ color: step.color }}
                    >
                      Çıktı:
                    </span>
                    <span className="text-[11px] font-medium text-white/60">
                      {step.output}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
