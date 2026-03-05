"use client";

import { motion } from "framer-motion";
import { Zap, Layout, PenTool, Search, Share2, Code2 } from "lucide-react";
import { BackgroundDetail } from "../ui/BackgroundDetail";

const services = [
  {
    title: "Performans & Sosyal Medya",
    desc: "Sermayenizi kâra dönüştüren agresif reklam ve içerik yönetimi.",
    icon: <Zap className="w-6 h-6 text-brand-blue" />,
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
    icon: <Search className="w-6 h-6 text-brand-blue" />,
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
    icon: <PenTool className="w-6 h-6 text-brand-blue" />,
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
      className="py-32 px-6 bg-brand-dark relative overflow-hidden"
    >
      <BackgroundDetail />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase italic text-white">
            Büyüme{" "}
            <span className="text-brand-blue font-light whitespace-nowrap">
              Ekosistemimiz
            </span>
          </h2>
          <p className="mt-6 text-gray-400 max-w-2xl mx-auto text-lg italic border-b border-white/5 pb-8">
            "Teknik altyapıdan kreatif stratejiye, dijital kapasitenizi uçtan
            uca inşa ediyoruz."
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }}
              className="group relative p-10 rounded-[3rem] border border-white/5 bg-[#080808]/50 backdrop-blur-xl flex flex-col transition-all duration-500 hover:border-brand-blue/30 hover:bg-[#0c0c0c] overflow-hidden"
            >
              {/* İlk dosyadaki Aura Glow efekti buraya uyarlandı */}
              <div
                className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${service.glow}`}
              />

              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/10 group-hover:border-brand-blue/40 transition-all duration-500 shadow-[0_0_20px_rgba(0,100,255,0.05)]">
                {service.icon}
              </div>

              <h3 className="text-2xl font-bold mb-4 italic tracking-tight uppercase group-hover:text-brand-blue transition-colors">
                {service.title}
              </h3>

              <p className="text-gray-400 text-sm leading-relaxed mb-8 font-medium italic">
                {service.desc}
              </p>

              <ul className="space-y-4 mb-10 mt-auto">
                {service.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-center gap-3 text-[12px] font-bold text-white/40 uppercase tracking-widest group-hover:text-white/70 transition-colors"
                  >
                    <span className="w-1 h-1 bg-brand-blue rounded-full shadow-[0_0_8px_rgba(0,100,255,0.8)]" />
                    {bullet}
                  </li>
                ))}
              </ul>

              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-blue/60 group-hover:text-brand-blue transition-all">
                {service.cta}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
