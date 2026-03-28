"use client";

import { Play, Smartphone, Timer, RefreshCw } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";

const formats = [
  {
    icon: Play,
    color: "#FF0000",
    name: "In-Stream Reklamlar",
    badge: "Atlanabilir / Atlanamaz",
    desc: "Video içeriklerinin başında veya ortasında gösterilen reklamlar. 30 saniye izlenince ödeme yapılır — bütçe dostu ve hedefli.",
    best: "Marka bilinirliği + dönüşüm",
    sectors: ["Sağlık", "Turizm", "E-ticaret"],
  },
  {
    icon: Smartphone,
    color: "#BE29EC",
    name: "YouTube Shorts",
    badge: "Dikey Format · 60 sn",
    desc: "Mobil öncelikli kısa videolar. Genç kitle ve hızlı farkındalık için ideal. Organik içerikle reklam arasındaki sınırı eritir.",
    best: "Farkındalık + organik büyüme",
    sectors: ["Estetik", "Moda", "Turizm"],
  },
  {
    icon: Timer,
    color: "#0000C8",
    name: "Bumper Ads",
    badge: "6 Saniye · Atlanamaz",
    desc: "6 saniyelik güçlü mesaj. Hatırlatma ve kampanya desteği için mükemmel. Diğer kampanyalarla birlikte kullanıldığında etki 2x artar.",
    best: "Hatırlatma + retargeting desteği",
    sectors: ["Tüm sektörler"],
  },
  {
    icon: RefreshCw,
    color: "#BE29EC",
    name: "Video Yeniden Pazarlama",
    badge: "Sıcak Kitle · Yüksek ROI",
    desc: "Kanalınızı veya reklamınızı izleyenlere özel kampanya. En düşük maliyetle en yüksek dönüşüm. Hazır kitleyi kapatır.",
    best: "Dönüşüm + satış kapama",
    sectors: ["Sağlık", "Turizm", "B2B"],
  },
];

export default function VideoFormats() {
  const shouldReduce = useReducedMotion();

  return (
    <section className="relative py-24 md:py-32 border-t border-white/5 bg-brand-dark text-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Başlık */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <ScrollReveal>
            <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/50 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
              Video Türleri
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6">
              Hedefinize Göre{" "}
              <span className="text-brand-purple">Doğru Format</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Her kampanya hedefi farklı bir video formatı gerektirir. Sektör
              ve bütçenize göre en verimli kombinasyonu seçiyoruz.
            </p>
          </ScrollReveal>
        </div>

        {/* 2×2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {formats.map((fmt, i) => {
            const Icon = fmt.icon;
            return (
              <motion.div
                key={i}
                initial={shouldReduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="relative rounded-[2rem] border border-white/8 bg-white/[0.02] p-8 flex flex-col gap-5 overflow-hidden hover:border-white/15 transition-colors duration-300"
              >
                {/* Corner glow */}
                <div
                  className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-[80px] opacity-15 pointer-events-none"
                  style={{ background: fmt.color }}
                />

                {/* İkon + İsim + Badge */}
                <div className="flex items-start gap-4">
                  <div
                    className="shrink-0 flex items-center justify-center w-12 h-12 rounded-2xl"
                    style={{
                      background: `${fmt.color}15`,
                      border: `1px solid ${fmt.color}30`,
                    }}
                  >
                    <Icon className="w-5 h-5" style={{ color: fmt.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-black text-base tracking-tight text-white">
                        {fmt.name}
                      </h3>
                      <span
                        className="inline-block px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest"
                        style={{
                          background: `${fmt.color}20`,
                          color: fmt.color,
                          border: `1px solid ${fmt.color}30`,
                        }}
                      >
                        {fmt.badge}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Açıklama */}
                <p className="text-white/60 text-sm leading-relaxed">
                  {fmt.desc}
                </p>

                {/* En iyi kullanım */}
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">
                    En iyi kullanım:
                  </span>
                  <span
                    className="text-[11px] font-bold"
                    style={{ color: fmt.color }}
                  >
                    {fmt.best}
                  </span>
                </div>

                {/* Sektör badge'leri */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                  {fmt.sectors.map((s, si) => (
                    <span
                      key={si}
                      className="px-3 py-1 rounded-full bg-white/5 border border-white/8 text-white/50 text-[10px] font-bold uppercase tracking-widest"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
