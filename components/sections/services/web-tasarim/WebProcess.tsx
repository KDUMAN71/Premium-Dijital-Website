"use client";

import { motion, useReducedMotion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";

const steps = [
  {
    number: "01",
    color: "#BE29EC",
    title: "Keşif & Strateji",
    desc: "Hedef kitle, rakip analizi, içerik mimarisi ve teknik gereksinimler belirlenir.",
    duration: "3–5 gün",
  },
  {
    number: "02",
    color: "#0000C8",
    title: "Tasarım & Prototip",
    desc: "Figma'da wireframe ve yüksek çözünürlüklü tasarım. Onayınız alınmadan koda geçilmez.",
    duration: "5–10 gün",
  },
  {
    number: "03",
    color: "#BE29EC",
    title: "Geliştirme",
    desc: "Next.js ile hızlı, SEO dostu, mobil öncelikli geliştirme. Her bileşen test edilir.",
    duration: "10–20 gün",
  },
  {
    number: "04",
    color: "#0000C8",
    title: "Test & Optimizasyon",
    desc: "Lighthouse performans, çapraz tarayıcı, mobil uyumluluk ve içerik kontrolleri.",
    duration: "3–5 gün",
  },
  {
    number: "05",
    color: "#BE29EC",
    title: "Lansman & Destek",
    desc: "Vercel üzerinde canlıya alım, domain bağlantısı, Google Analytics kurulumu ve ilk ay destek.",
    duration: "1–2 gün",
  },
];

export default function WebProcess() {
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
              Keşiften <span className="text-brand-purple">Lansmanа</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Her proje beş adımda ilerler. Sizi her aşamada bilgilendiriyor,
              onayınız olmadan bir sonraki adıma geçmiyoruz.
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
                "linear-gradient(180deg, #BE29EC, #0000C8, #BE29EC, #0000C8, #BE29EC)",
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
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="text-xl font-black tracking-tight text-white">
                      {step.title}
                    </h3>
                    <span
                      className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest"
                      style={{
                        background: `${step.color}10`,
                        border: `1px solid ${step.color}25`,
                        color: step.color,
                      }}
                    >
                      {step.duration}
                    </span>
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Toplam süre notu */}
        <ScrollReveal>
          <div className="mt-12 flex items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.02] p-5">
            <span className="text-2xl">⏱️</span>
            <p className="text-white/60 text-sm leading-relaxed">
              <span className="text-white font-bold">Toplam süre:</span> Proje
              kapsamına göre 3–6 hafta. Hızlı başlangıç paketleri{" "}
              <span className="text-brand-purple font-bold">2 haftada teslim.</span>
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
