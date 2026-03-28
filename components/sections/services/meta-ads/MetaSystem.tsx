"use client";

import React from "react";
import { motion } from "framer-motion";
import { Megaphone, Users, ShoppingBag } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import {
  ScrollStagger,
  ScrollStaggerItem,
} from "@/components/ui/ScrollStagger";

const stages = [
  {
    phase: "TOF",
    label: "Keşfet",
    color: "#BE29EC",
    icon: Megaphone,
    title: "Doğru Kişi, Doğru An",
    desc: "Ürününüzü henüz bilmeyenlere ulaşıyoruz. Video ve görselle dikkat çekiyor, merak uyandırıyoruz.",
    tactics: ["Advantage+ Audience", "Lookalike 1-3%", "Video Views"],
    phaseLabel: "Awareness",
  },
  {
    phase: "MOF",
    label: "Değerlendir",
    color: "gradient",
    icon: Users,
    title: "İlgi → Niyet",
    desc: "Markanızla etkileşime girenleri besliyoruz. Sosyal kanıt, detay ve güven mesajlarıyla karar sürecini hızlandırıyoruz.",
    tactics: ["Retargeting", "Engagement Custom", "Testimonial Creative"],
    phaseLabel: "Consideration",
  },
  {
    phase: "BOF",
    label: "Kazan",
    color: "#0000C8",
    icon: ShoppingBag,
    title: "Niyet → Müşteri",
    desc: "Satın almaya hazır kitleyi dönüştürüyoruz. Güçlü CTA, özel teklif ve frictionless süreçle kapanışı tamamlıyoruz.",
    tactics: ["Conversions Objective", "Dynamic Ads", "WhatsApp CTA"],
    phaseLabel: "Conversion",
  },
];

const getColor = (color: string, opacity = 1) => {
  if (color === "gradient") return `rgba(100, 0, 160, ${opacity})`;
  return color;
};

export default function MetaSystem() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Başlık */}
        <div className="mb-16 text-center">
          <ScrollReveal>
            <span className="inline-block px-4 py-1.5 rounded-full border border-brand-blue/30 bg-brand-blue/5 text-brand-blue text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
              Büyüme Mimarisi
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6">
              Farkındalıktan Satışa —{" "}
              <span className="text-brand-purple">Tam Huni Sistem</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Tek kampanya yeterli değildir. Her aşamada farklı mesaj, farklı
              format, farklı hedef. Huni boyunca müşteriyi elinde tutuyoruz.
            </p>
          </ScrollReveal>
        </div>

        {/* Funnel Görsel — animasyonlu ok bağlantısı */}
        <ScrollReveal>
          <div className="mb-16 flex items-center justify-center gap-2 sm:gap-4 overflow-x-auto pb-2">
            {stages.map((stage, idx) => (
              <React.Fragment key={stage.phase}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15, duration: 0.5 }}
                  className="flex flex-col items-center gap-2 text-center min-w-[100px]"
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center border border-white/10"
                    style={{
                      background:
                        stage.color === "gradient"
                          ? "linear-gradient(135deg, #BE29EC, #0000C8)"
                          : `${stage.color}18`,
                      color:
                        stage.color === "gradient" ? "#fff" : stage.color,
                      boxShadow:
                        stage.color === "gradient"
                          ? "0 0 24px rgba(190,41,236,0.2)"
                          : `0 0 24px ${stage.color}20`,
                    }}
                  >
                    <stage.icon size={24} />
                  </div>
                  <span
                    className="text-xs font-black uppercase tracking-widest"
                    style={{
                      color:
                        stage.color === "gradient" ? "#BE29EC" : stage.color,
                    }}
                  >
                    {stage.phase}
                  </span>
                  <span className="text-[10px] text-white/40 font-medium">
                    {stage.phaseLabel}
                  </span>
                </motion.div>

                {idx < stages.length - 1 && (
                  <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileInView={{ scaleX: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.15 + 0.3, duration: 0.4 }}
                    className="flex items-center"
                    style={{ transformOrigin: "left" }}
                  >
                    <div className="h-px w-8 sm:w-16 bg-gradient-to-r from-brand-purple/50 to-brand-blue/50" />
                    <div className="w-0 h-0 border-t-4 border-b-4 border-l-4 border-transparent border-l-brand-blue/50" />
                  </motion.div>
                )}
              </React.Fragment>
            ))}
          </div>
        </ScrollReveal>

        {/* 3 Aşama Kartı */}
        <ScrollStagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            const baseColor = getColor(stage.color);
            return (
              <ScrollStaggerItem key={idx}>
                <div className="group relative h-full p-8 rounded-[2.5rem] border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 overflow-hidden">
                  {/* Glow */}
                  <div
                    className="absolute -right-10 -top-10 w-32 h-32 blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-700"
                    style={{ backgroundColor: baseColor }}
                  />

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Phase badge */}
                    <div className="flex items-center justify-between mb-6">
                      <span
                        className="text-xs font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full border"
                        style={{
                          color:
                            stage.color === "gradient" ? "#BE29EC" : stage.color,
                          borderColor:
                            stage.color === "gradient"
                              ? "#BE29EC40"
                              : `${stage.color}40`,
                          backgroundColor:
                            stage.color === "gradient"
                              ? "#BE29EC08"
                              : `${stage.color}08`,
                        }}
                      >
                        {stage.label}
                      </span>
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10 bg-white/5 group-hover:scale-110 transition-transform"
                        style={{ color: baseColor }}
                      >
                        <Icon size={20} />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-3 text-white">
                      {stage.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-1">
                      {stage.desc}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-auto">
                      {stage.tactics.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-medium bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-white/70"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollStaggerItem>
            );
          })}
        </ScrollStagger>
      </div>
    </section>
  );
}
