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
    accent: "group-hover:text-brand-blue", // Tutarlılık için brand-blue devam
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
      className="py-32 px-6 bg-brand-dark relative overflow-hidden"
    >
      {/* Arkaplan hafif ışıma efekti */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(0,0,200,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-20">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-6 italic">
            Büyüme{" "}
            <span className="text-brand-blue font-light">Ekosistemimiz</span>
          </h2>
          <p className="text-gray-500 max-w-2xl text-lg italic border-l-2 border-brand-blue/30 pl-6">
            "Sıradan bir ajans değil, dijital kapasite mimarisini uçtan uca inşa
            eden stratejik ortağınızız."
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative group"
            >
              {/* Kart Gövdesi */}
              <div className="h-full p-10 rounded-[3rem] border border-white/5 bg-[#080808]/50 backdrop-blur-xl transition-all duration-500 group-hover:border-brand-blue/30 group-hover:bg-[#0c0c0c] flex flex-col relative overflow-hidden">
                {/* Dinamik Glow Efekti */}
                <div
                  className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${service.glow}`}
                />

                <h3
                  className={`text-2xl font-bold mb-6 transition-colors duration-300 ${service.accent}`}
                >
                  {service.title}
                </h3>

                <p className="text-gray-400 leading-relaxed mb-10 font-medium italic">
                  {service.description}
                </p>

                {/* Badge'ler */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {service.tools.map((tool, j) => (
                    <span
                      key={j}
                      className="text-[9px] uppercase tracking-[0.2em] font-black px-4 py-2 bg-white/5 rounded-full border border-white/5 text-white/20 group-hover:text-white/60 group-hover:border-brand-blue/20 transition-all"
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
