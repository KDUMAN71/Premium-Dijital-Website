"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, Search, PenTool } from "lucide-react";

const pillars = [
  {
    title: "PPC ve Performans Pazarlama",
    desc: "Daha fazla talep, daha nitelikli dönüşüm ve daha verimli reklam performansı.",
    href: "/hizmetler/ppc-ve-performans-pazarlama",
    icon: <Zap className="h-5 w-5 text-brand-blue sm:h-6 sm:w-6" />,
    bullets: [
      "Google Ads Yönetimi",
      "Meta Ads Yönetimi",
      "Yeniden Pazarlama Kurguları",
      "Bütçe ve Teklif Stratejileri",
    ],
    stack: ["Google Ads", "Meta Ads", "GA4"],
    cta: "PPC Hizmetlerini İncele →",
    glow: "bg-brand-blue/10",
  },
  {
    title: "Web Sitesi, SEO ve Dönüşüm Altyapısı",
    desc: "Görünürlüğü, hızı ve müşteri kazanma kapasitesini birlikte güçlendiren dijital altyapı.",
    href: "/hizmetler/web-sitesi-seo-ve-donusum-altyapisi",
    icon: <Search className="h-5 w-5 text-brand-blue sm:h-6 sm:w-6" />,
    bullets: [
      "Web Sitesi ve Landing Page Tasarımı",
      "Teknik SEO Çalışmaları",
      "E-Ticaret Sistemleri Altyapısı",
      "GA4 + GTM Ölçüm Altyapısı",
    ],
    stack: ["Search Console", "Google Analytics", "Core Web Vitals"],
    cta: "Web ve SEO Altyapısını İncele →",
    glow: "bg-brand-blue/5",
  },
  {
    title: "Marka & Görsel İletişim",
    desc: "Markanızı daha güçlü, daha tutarlı ve daha premium gösteren iletişim sistemi.",
    href: "/hizmetler/marka-ve-gorsel-iletisim",
    icon: <PenTool className="h-5 w-5 text-brand-blue sm:h-6 sm:w-6" />,
    bullets: [
      "Kurumsal Kimlik Tasarımı",
      "Görsel Dil ve UI Sistemi",
      "Sunum ve Dijital Tasarım Çalışmaları",
      "Sosyal Medya Görsel İletişimi",
    ],
    stack: ["Adobe", "Figma", "Canva", "Meta"],
    cta: "Marka İletişimini İncele →",
    glow: "bg-brand-blue/10",
  },
];

export default function GrowthEcosystem() {
  return (
    <section
      id="hizmetler"
      className="relative overflow-hidden bg-brand-dark px-4 py-16 sm:px-5 sm:py-20 md:px-6 md:py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,200,0.05)_0%,transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-10 text-center sm:mb-12 md:mb-14">
          <div className="inline-flex items-center rounded-full border border-brand-blue/20 bg-white/5 px-4 py-2 shadow-[0_0_20px_rgba(0,0,200,0.08)]">
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/85 sm:text-xs sm:tracking-[0.28em]">
              Dijital Büyüme Altyapısı
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-bold tracking-tighter uppercase text-white/95 sm:text-4xl md:mt-5 md:text-7xl">
            Büyüme <span className="text-brand-blue">Ekosistemimiz</span>
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-sm font-light italic leading-relaxed text-gray-300 sm:mt-5 sm:text-base md:text-lg">
            Reklam, web, SEO, marka ve ölçüm katmanlarını tek tek yönetmek
            yerine; markanız için birlikte çalışan, birbirini besleyen ve
            tamamen büyüme hedeflerinize hizmet eden güçlü bir dijital ekosistem
            kuruyoruz.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6 xl:gap-8">
          {pillars.map((pillar, index) => (
            <motion.article
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{
                delay: index * 0.12,
                duration: 0.65,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-2xl transition-all duration-500 hover:border-brand-blue/30 hover:bg-white/[0.07] sm:rounded-[2.25rem] sm:p-6 md:rounded-[2.6rem] md:p-7"
            >
              <div
                className={`absolute -top-20 -right-20 h-40 w-40 rounded-full blur-[80px] opacity-0 transition-opacity duration-700 group-hover:opacity-100 ${pillar.glow}`}
              />

              <div className="relative mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-[0_0_20px_rgba(0,100,255,0.05)] transition-all duration-500 group-hover:border-brand-blue/40 sm:h-14 sm:w-14">
                {pillar.icon}
              </div>

              <h3 className="relative text-xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-brand-blue sm:text-2xl">
                {pillar.title}
              </h3>

              <p className="relative mt-3 text-sm leading-relaxed text-gray-300/90 sm:text-[15px] md:text-base">
                {pillar.desc}
              </p>

              <ul className="relative mt-5 space-y-2.5 sm:mt-6">
                {pillar.bullets.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-relaxed text-white/75"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue shadow-[0_0_10px_rgba(0,100,255,1)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Teknoloji / platform sinyali */}
              <div className="relative mt-5 flex flex-wrap gap-2 sm:mt-6">
                {pillar.stack.map((item) => (
                  <span
                    key={item}
                    title={item}
                    className="inline-flex items-center rounded-full border border-white/8 bg-black/20 px-3 py-2 text-[10px] font-bold text-white/65 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-300 group-hover:border-brand-blue/20 group-hover:text-white/85"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="relative mt-5 sm:mt-6">
                <Link
                  href={pillar.href}
                  className="inline-flex items-center justify-center rounded-full border border-brand-blue/30 bg-brand-blue/15 px-4 py-2.5 text-xs font-bold text-white transition-all duration-300 hover:border-brand-blue/50 hover:bg-brand-blue/25 hover:text-white hover:shadow-[0_0_28px_rgba(0,0,200,0.22)] sm:px-5 sm:text-sm"
                >
                  {pillar.cta}
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
