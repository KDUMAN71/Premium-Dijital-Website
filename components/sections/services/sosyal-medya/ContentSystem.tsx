"use client";

import { motion, useReducedMotion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";

const cycle = [
  {
    number: "01",
    color: "#BE29EC",
    title: "Strateji",
    desc: "Hedef kitle analizi, rakip incelemesi, içerik sütunları belirleme, ses tonu ve marka kimliği.",
    output: "Aylık içerik stratejisi",
  },
  {
    number: "02",
    color: "#0000C8",
    title: "Üretim",
    desc: "Görsel tasarım, metin yazımı, video edit brief, hashtag araştırması — platform native formatlar.",
    output: "Hazır post materyali",
  },
  {
    number: "03",
    color: "#BE29EC",
    title: "Yayın",
    desc: "Optimum zamanlama, platform bazlı format uyarlaması, story/carousel/reel kombinasyonu.",
    output: "Yayınlanmış içerik",
  },
  {
    number: "04",
    color: "#0000C8",
    title: "Analiz",
    desc: "Etkileşim takibi, erişim analizi, en iyi içerik tespiti, bir sonraki ay stratejisine feed.",
    output: "Aylık performans raporu",
  },
];

export default function ContentSystem() {
  const shouldReduce = useReducedMotion();

  return (
    <section className="relative py-24 md:py-32 border-t border-white/5 bg-brand-dark text-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Başlık */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <ScrollReveal>
            <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/50 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
              İçerik Sistemi
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6">
              İçerik Üretmiyoruz,{" "}
              <span className="text-brand-purple">Sistem Kuruyoruz</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Her post bir strateji kararıdır. Rastgele değil, hedefe yönelik.
            </p>
          </ScrollReveal>
        </div>

        {/* 4 kart yatay döngü — masaüstü */}
        <div className="hidden md:flex items-start gap-0">
          {cycle.map((step, i) => (
            <div key={i} className="flex items-start flex-1 min-w-0">
              <motion.div
                initial={shouldReduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="flex-1 relative rounded-[1.75rem] border border-white/8 bg-white/[0.02] p-7 flex flex-col gap-4 overflow-hidden"
              >
                {/* Corner glow */}
                <div
                  className="absolute -top-8 -right-8 w-24 h-24 rounded-full blur-[50px] opacity-20 pointer-events-none"
                  style={{ background: step.color }}
                />

                {/* Numara */}
                <div
                  className="text-5xl font-black tracking-tighter leading-none select-none mb-1"
                  style={{ color: `${step.color}50` }}
                >
                  {step.number}
                </div>

                <h3
                  className="text-lg font-black tracking-tight"
                  style={{ color: step.color }}
                >
                  {step.title}
                </h3>

                <p className="text-white/55 text-xs leading-relaxed flex-1">
                  {step.desc}
                </p>

                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-widest"
                  style={{
                    background: `${step.color}10`,
                    border: `1px solid ${step.color}25`,
                    color: step.color,
                  }}
                >
                  {step.output}
                </div>
              </motion.div>

              {/* Ok bağlantısı */}
              {i < cycle.length - 1 && (
                <div className="flex items-center justify-center w-8 shrink-0 mt-16">
                  <span className="text-white/20 text-xl font-bold">→</span>
                </div>
              )}
              {/* Son oktan ilke döngü hint'i */}
              {i === cycle.length - 1 && (
                <div className="flex items-center justify-center w-8 shrink-0 mt-16">
                  <span
                    className="text-xl font-bold"
                    style={{ color: "#BE29EC50" }}
                    title="Döngü başa döner"
                  >
                    ↺
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobil: dikey stack */}
        <div className="md:hidden space-y-4">
          {cycle.map((step, i) => (
            <motion.div
              key={i}
              initial={shouldReduce ? false : { opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="relative rounded-[1.75rem] border border-white/8 bg-white/[0.02] p-6 flex gap-5 overflow-hidden"
            >
              <div
                className="shrink-0 text-4xl font-black tracking-tighter leading-none select-none pt-1"
                style={{ color: `${step.color}50` }}
              >
                {step.number}
              </div>
              <div className="flex-1 flex flex-col gap-3">
                <h3
                  className="text-base font-black tracking-tight"
                  style={{ color: step.color }}
                >
                  {step.title}
                </h3>
                <p className="text-white/55 text-xs leading-relaxed">
                  {step.desc}
                </p>
                <div
                  className="inline-flex self-start items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-widest"
                  style={{
                    background: `${step.color}10`,
                    border: `1px solid ${step.color}25`,
                    color: step.color,
                  }}
                >
                  {step.output}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Döngü notu */}
        <ScrollReveal>
          <p className="mt-10 text-center text-white/30 text-xs font-medium">
            Her ay döngü yeniden başlar — strateji güncellenir, içerik gelişir.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
