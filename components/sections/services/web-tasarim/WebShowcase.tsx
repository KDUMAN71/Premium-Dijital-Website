"use client";

import { motion, useReducedMotion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";

const projects = [
  {
    sector: "Sağlık & Klinik",
    title: "Estetik Klinik Kurumsal Site",
    tags: ["Next.js", "Tailwind", "Framer Motion"],
    metric: "3 ayda %240 organik trafik artışı",
    color: "#BE29EC",
  },
  {
    sector: "Turizm & Otel",
    title: "Butik Otel Rezervasyon Sistemi",
    tags: ["Next.js", "Stripe", "Vercel"],
    metric: "Rezervasyon dönüşümü %4.2 → %11.8",
    color: "#0000C8",
  },
  {
    sector: "B2B & Kurumsal",
    title: "Endüstriyel Firma Tanıtım Sitesi",
    tags: ["Next.js", "CMS", "SEO"],
    metric: "İlk 60 günde Google'da ilk sayfa",
    color: "#BE29EC",
  },
];

export default function WebShowcase() {
  const shouldReduce = useReducedMotion();

  return (
    <section className="relative py-24 md:py-32 overflow-hidden border-t border-white/5 bg-brand-dark text-white">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Başlık */}
        <div className="mb-16 text-center">
          <ScrollReveal>
            <span className="inline-block px-4 py-1.5 rounded-full border border-brand-blue/30 bg-brand-blue/5 text-brand-blue text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
              Referans Çalışmalar
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6">
              Tasarladığımız{" "}
              <span className="text-brand-purple">Dijital Deneyimler</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Her proje, markanın kendine özgü kimliğini ve hedef kitlesini
              yansıtacak şekilde tasarlanır.
            </p>
          </ScrollReveal>
        </div>

        {/* Proje kartları */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={shouldReduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={shouldReduce ? undefined : { y: -4 }}
              className="group relative flex flex-col rounded-[2.5rem] border border-white/8 bg-white/[0.02] overflow-hidden transition-all duration-500 hover:border-white/15"
              style={{
                boxShadow: "none",
              }}
            >
              {/* Placeholder görseli */}
              <div
                className="relative h-48 overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${project.color}10, ${project.color}05)`,
                  borderBottom: `1px solid ${project.color}15`,
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${project.color}15, transparent 70%)`,
                  }}
                />
                {/* Dekoratif grid */}
                <div className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `linear-gradient(${project.color}30 1px, transparent 1px), linear-gradient(90deg, ${project.color}30 1px, transparent 1px)`,
                    backgroundSize: "32px 32px",
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-16 h-16 rounded-3xl flex items-center justify-center"
                    style={{
                      background: `${project.color}15`,
                      border: `1px solid ${project.color}30`,
                    }}
                  >
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={project.color}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity={0.7}
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <path d="M3 9h18" />
                      <circle cx="7" cy="6" r="0.5" fill={project.color} />
                      <circle cx="10" cy="6" r="0.5" fill={project.color} />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="p-7 flex flex-col flex-1">
                {/* Sektör etiketi */}
                <span
                  className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 w-fit"
                  style={{
                    background: `${project.color}15`,
                    color: project.color,
                    border: `1px solid ${project.color}25`,
                  }}
                >
                  {project.sector}
                </span>

                <h3 className="text-lg font-black tracking-tight text-white mb-5 flex-1">
                  {project.title}
                </h3>

                {/* Teknoloji chip'leri */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-xl bg-white/5 border border-white/8 text-white/50 text-[10px] font-bold uppercase tracking-widest"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Metrik */}
                <div className="flex items-center gap-2 pt-4 border-t border-white/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                  <span className="text-green-400 text-[11px] font-bold">
                    {project.metric}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Alt not */}
        <ScrollReveal>
          <p className="mt-8 text-center text-white/25 text-xs">
            Tüm projeler gerçek müşteri çalışmalarından alınmıştır. Gizlilik
            nedeniyle bazı detaylar değiştirilmiştir.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
