"use client";

import { motion } from "framer-motion";
import { Zap, PenTool, Search } from "lucide-react";
import { BackgroundDetail } from "../ui/BackgroundDetail";

const services = [
  {
    title: "Performans & Sosyal Medya",
    desc: "Sermayenizi kâra dönüştüren agresif reklam ve içerik yönetimi.",
    icon: <Zap className="h-5 w-5 text-brand-blue sm:h-6 sm:w-6" />,
    bullets: [
      "Google & Meta Ads Yönetimi",
      "Sosyal Medya İçerik Planlama",
      "Remarketing (Yeniden Pazarlama)",
      "Rakip & Sektör Analizi",
    ],
    cta: "ROI Odaklı Strateji →",
    glow: "bg-brand-blue/10",
  },
  {
    title: "Web & SEO Altyapıları",
    desc: "Milisaniyelik hızda, Google dostu dönüşüm mimarisi.",
    icon: <Search className="h-5 w-5 text-brand-blue sm:h-6 sm:w-6" />,
    bullets: [
      "Teknik & Yerel SEO Çalışması",
      "Next.js / WordPress Landing",
      "Hız & Core Web Vitals",
      "GA4 + GTM Ölçüm Kurulumu",
    ],
    cta: "Görünürlüğü Artır →",
    glow: "bg-brand-blue/5",
  },
  {
    title: "Marka & Görsel İletişim",
    desc: "Premium algı yaratan, satışa hizmet eden tasarım sistemi.",
    icon: <PenTool className="h-5 w-5 text-brand-blue sm:h-6 sm:w-6" />,
    bullets: [
      "Görsel Dil & UI Kit Tasarımı",
      "Motion & Mikro Etkileşimler",
      "Satış Odaklı Sunum Tasarımı",
      "Kurumsal Kimlik İnşası",
    ],
    cta: "Markanı Güçlendir →",
    glow: "bg-brand-blue/10",
  },
];

export default function EcosystemV2() {
  return (
    <section
      id="hizmetler"
      className="relative overflow-hidden bg-brand-dark px-4 py-16 sm:px-5 sm:py-20 md:px-6 md:py-28"
    >
      <BackgroundDetail />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-10 text-center sm:mb-12 md:mb-20">
          <h2 className="text-3xl font-bold tracking-tighter uppercase italic text-white sm:text-4xl md:text-7xl">
            Büyüme{" "}
            <span className="whitespace-nowrap font-light text-brand-blue">
              Ekosistemimiz
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl border-b border-white/5 pb-6 text-sm italic leading-relaxed text-gray-400 sm:mt-5 sm:pb-7 sm:text-base md:mt-6 md:pb-8 md:text-lg">
            "Teknik altyapıdan kreatif stratejiye, dijital kapasitenizi uçtan
            uca inşa ediyoruz."
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="group relative"
            >
              <div className="relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/5 bg-[#080808]/50 p-6 backdrop-blur-xl transition-all duration-500 hover:border-brand-blue/30 hover:bg-[#0c0c0c] sm:rounded-[2.25rem] sm:p-7 md:rounded-[3rem] md:p-10">
                {/* Glow */}
                <div
                  className={`absolute -top-20 -right-20 h-40 w-40 rounded-full blur-[80px] opacity-0 transition-opacity duration-700 group-hover:opacity-100 ${service.glow}`}
                />

                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-[0_0_20px_rgba(0,100,255,0.05)] transition-all duration-500 group-hover:border-brand-blue/40 sm:mb-7 sm:h-14 sm:w-14 sm:rounded-2xl md:mb-8">
                  {service.icon}
                </div>

                <h3 className="text-xl font-bold italic tracking-tight uppercase transition-colors group-hover:text-brand-blue sm:text-2xl">
                  {service.title}
                </h3>

                <p className="mt-4 mb-6 text-sm font-medium italic leading-relaxed text-gray-400 sm:mb-7 md:mb-8">
                  {service.desc}
                </p>

                <ul className="mt-auto mb-8 space-y-3 sm:space-y-4 md:mb-10">
                  {service.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-3 text-[11px] font-bold uppercase tracking-[0.14em] text-white/40 transition-colors group-hover:text-white/70 sm:text-[12px] sm:tracking-[0.18em]"
                    >
                      <span className="mt-[0.4rem] h-1 w-1 shrink-0 rounded-full bg-brand-blue shadow-[0_0_8px_rgba(0,100,255,0.8)]" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="text-[10px] font-black uppercase tracking-[0.24em] text-brand-blue/60 transition-all group-hover:text-brand-blue sm:tracking-[0.3em]">
                  {service.cta}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
