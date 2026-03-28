"use client";

import { motion, useReducedMotion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";

const techs = [
  {
    name: "Next.js",
    desc: "React framework, SSR & SSG",
    abbr: "NX",
    color: "#ffffff",
  },
  {
    name: "Tailwind CSS",
    desc: "Utility-first CSS sistemi",
    abbr: "TW",
    color: "#38bdf8",
  },
  {
    name: "Framer Motion",
    desc: "Profesyonel animasyon katmanı",
    abbr: "FM",
    color: "#BE29EC",
  },
  {
    name: "Vercel",
    desc: "Edge deployment & CDN",
    abbr: "VC",
    color: "#0000C8",
  },
  {
    name: "Figma",
    desc: "UI/UX tasarım & prototip",
    abbr: "FG",
    color: "#f24e1e",
  },
  {
    name: "TypeScript",
    desc: "Tip güvenli geliştirme",
    abbr: "TS",
    color: "#3178c6",
  },
];

export default function WebTechStack() {
  const shouldReduce = useReducedMotion();

  return (
    <section className="relative py-24 md:py-32 border-t border-white/5 bg-brand-dark text-white overflow-hidden">
      <div
        className="pointer-events-none absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-10 blur-[120px]"
        style={{ background: "radial-gradient(circle, #0000C8, #BE29EC)" }}
      />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Başlık */}
        <div className="mb-16 text-center">
          <ScrollReveal>
            <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/50 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
              Teknoloji & Altyapı
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6">
              Doğru Araçla{" "}
              <span className="text-brand-purple">Doğru Sonuç</span>
            </h2>
          </ScrollReveal>
        </div>

        {/* Teknoloji grid */}
        <div className="mb-12">
          <p className="text-white/40 text-xs font-bold uppercase tracking-[0.2em] mb-6 text-center">
            Şu An Kullandıklarımız
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {techs.map((tech, i) => (
              <motion.div
                key={i}
                initial={shouldReduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="relative flex items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.02] p-5 overflow-hidden group hover:border-white/15 transition-all duration-300"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 0% 50%, ${tech.color}08, transparent 60%)`,
                  }}
                />
                {/* Logo placeholder */}
                <div
                  className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-[11px] font-black"
                  style={{
                    background: `${tech.color}12`,
                    border: `1px solid ${tech.color}25`,
                    color: tech.color,
                  }}
                >
                  {tech.abbr}
                </div>
                <div className="min-w-0">
                  <div className="font-black text-sm text-white truncate">
                    {tech.name}
                  </div>
                  <div className="text-white/40 text-[11px] leading-snug mt-0.5">
                    {tech.desc}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Takip notu */}
        <ScrollReveal>
          <div className="flex gap-5 items-start rounded-[2rem] border border-brand-blue/20 bg-brand-blue/5 p-7">
            <div
              className="shrink-0 text-2xl w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ background: "#0000C815", border: "1px solid #0000C830" }}
            >
              🔭
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-brand-blue mb-2">
                Sürekli Takip Edilen Alan
              </p>
              <p className="text-white/70 text-sm leading-relaxed">
                Web teknolojileri hızla evriliyor. AI destekli tasarım araçları,
                edge computing ve yeni framework&apos;leri sürekli takip ediyor;
                her projeye en güncel ve sürdürülebilir teknolojiyi öneriyoruz.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
