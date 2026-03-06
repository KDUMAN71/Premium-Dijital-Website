"use client";

import { motion } from "framer-motion";

const services = [
  {
    title: "Performans Odaklı Reklamcılık",
    description:
      "Google ve Meta algoritmalarını satışa zorluyoruz. Veriye dayalı bütçe yönetimi ile her kuruşun takibini yapıyoruz.",
    tools: ["Google Ads", "Meta Business", "TikTok Ads"],
    accent: "group-hover:text-brand-blue",
    glow: "bg-brand-blue/10",
  },
  {
    title: "Teknik SEO & İçerik Mimarisi",
    description:
      "Sadece sıralama değil, pazar otoritesi inşa ediyoruz. Next.js hızında, Google botlarının sevdiği teknik altyapılar.",
    tools: ["Search Console", "Semrush", "Next.js SEO"],
    accent: "group-hover:text-brand-blue",
    glow: "bg-brand-blue/5",
  },
  {
    title: "Dönüşüm Optimizasyonu (CRO)",
    description:
      "Gelen trafiği müşteriye dönüştürme sanatı. Isı haritaları ve A/B testleri ile kullanıcı deneyimini kusursuzlaştırıyoruz.",
    tools: ["Hotjar", "VWO", "GA4"],
    accent: "group-hover:text-brand-blue",
    glow: "bg-brand-blue/10",
  },
];

export default function Ecosystem() {
  return (
    <section
      id="ekosistem"
      className="relative overflow-hidden bg-brand-dark px-4 py-16 sm:px-5 sm:py-20 md:px-6 md:py-28"
    >
      {/* Arkaplan hafif ışıma efekti */}
      <div className="pointer-events-none absolute top-0 left-1/2 h-full w-full -translate-x-1/2 bg-[radial-gradient(circle_at_center,rgba(0,0,200,0.03)_0%,transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-10 sm:mb-12 md:mb-20">
          <h2 className="mb-4 text-3xl font-bold tracking-tighter uppercase italic sm:mb-5 sm:text-4xl md:mb-6 md:text-7xl">
            Büyüme{" "}
            <span className="font-light text-brand-blue">Ekosistemimiz</span>
          </h2>

          <p className="max-w-2xl border-l-2 border-brand-blue/30 pl-4 text-sm italic leading-relaxed text-gray-500 sm:pl-5 sm:text-base md:pl-6 md:text-lg">
            "Sıradan bir ajans değil, dijital kapasite mimarisini uçtan uca inşa
            eden stratejik ortağınızız."
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{
                delay: i * 0.12,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative group"
            >
              {/* Kart Gövdesi */}
              <div className="relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/5 bg-[#080808]/50 p-6 backdrop-blur-xl transition-all duration-500 group-hover:border-brand-blue/30 group-hover:bg-[#0c0c0c] sm:rounded-[2.25rem] sm:p-7 md:rounded-[3rem] md:p-10">
                {/* Dinamik Glow Efekti */}
                <div
                  className={`absolute -top-20 -right-20 h-40 w-40 rounded-full blur-[80px] opacity-0 transition-opacity duration-700 group-hover:opacity-100 ${service.glow}`}
                />

                <h3
                  className={`text-xl font-bold leading-tight transition-colors duration-300 sm:text-2xl ${service.accent}`}
                >
                  {service.title}
                </h3>

                <p className="mt-5 mb-8 text-sm font-medium italic leading-relaxed text-gray-400 sm:mt-6 sm:mb-9 sm:text-base md:mb-10">
                  {service.description}
                </p>

                {/* Badge'ler */}
                <div className="mt-auto flex flex-nowrap gap-1.5 sm:gap-2">
                  {service.tools.map((tool, j) => (
                    <span
                      key={j}
                      className="min-w-0 flex-1 truncate rounded-full border border-white/5 bg-white/5 px-2 py-2 text-center text-[8px] font-black uppercase tracking-[0.12em] text-white/20 transition-all group-hover:border-brand-blue/20 group-hover:text-white/60 sm:px-3 sm:text-[9px] sm:tracking-[0.16em]"
                      title={tool}
                    >
                      {tool}
                    </span>
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
