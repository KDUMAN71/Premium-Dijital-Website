"use client";

import React from "react";
import { Code2, PenTool, Globe2, CheckCircle2 } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import {
  ScrollStagger,
  ScrollStaggerItem,
} from "@/components/ui/ScrollStagger";

const pillars = [
  {
    icon: Code2,
    title: "Teknik Mimari",
    subtitle: "Kusursuz Altyapı",
    desc: "Google botlarının sitenizi en verimli şekilde taraması için tarama bütçesini (crawl budget) optimize ediyor, Core Web Vitals metriklerini mühendislik hassasiyetiyle yapılandırıyoruz.",
    items: [
      "JS & CSS Optimizasyonu",
      "Schema.org Veri Yapıları",
      "Index Yönetimi",
    ],
    color: "#0000C8",
  },
  {
    icon: PenTool,
    title: "Semantik İçerik",
    subtitle: "Topical Authority",
    desc: "Sadece kelime değil, konu otoritesi (Topical Authority) inşa ediyoruz. Semantik içerik mimarisiyle sitenizi Google'ın gözünde 'konunun uzmanı' haline getiriyoruz.",
    items: [
      "İçerik Kümeleme (Clusters)",
      "NLP Odaklı Yazım",
      "E-E-A-T Disiplini",
    ],
    color: "#BE29EC",
  },
  {
    icon: Globe2,
    title: "Dijital Otorite",
    subtitle: "Güven & Referans",
    desc: "Nitelikli dijital PR ve doğal backlink stratejileriyle web sitenizin domain otoritesini (DA/PA) yükselterek rakiplerinizin önüne geçmenizi sağlıyoruz.",
    items: [
      "Stratejik Link İnşası",
      "Marka Sinyalleri",
      "Niş Otorite Yönetimi",
    ],
    color: "#0000C8",
  },
];

export default function StrategyPillars() {
  return (
    <section
      id="strateji"
      className="relative py-24 md:py-32 overflow-hidden border-t border-white/5 bg-[#050505]"
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-20 text-center lg:text-left lg:flex lg:items-end lg:justify-between">
          <ScrollReveal>
            <div className="max-w-2xl">
              <span className="text-brand-blue text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block">
                SEO Büyüme Matrisi
              </span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6">
                Sürdürülebilir Büyüme <br />
                <span className="text-white/30 italic">Üç Temel Sütun</span>
              </h2>
            </div>
          </ScrollReveal>
        </div>

        <ScrollStagger className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar, idx) => (
            <ScrollStaggerItem key={idx}>
              <div className="group relative h-full p-8 rounded-[2.5rem] border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500">
                {/* Visual Accent */}
                <div
                  className="absolute -right-4 -top-4 w-24 h-24 blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-700"
                  style={{ backgroundColor: pillar.color }}
                />

                <div className="relative z-10 flex flex-col h-full">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-8 bg-white/5 border border-white/10 text-white/80 group-hover:scale-110 transition-transform duration-500"
                    style={{ color: pillar.color }}
                  >
                    <pillar.icon size={24} />
                  </div>

                  <h3 className="text-2xl font-bold mb-1">{pillar.title}</h3>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-brand-blue/60 mb-6">
                    {pillar.subtitle}
                  </p>

                  <p className="text-gray-400 text-sm leading-relaxed mb-8">
                    {pillar.desc}
                  </p>

                  <div className="mt-auto pt-6 border-t border-white/5 space-y-3">
                    {pillar.items.map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <CheckCircle2
                          size={14}
                          className="text-brand-purple opacity-50"
                        />
                        <span className="text-[11px] font-medium text-white/60">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollStaggerItem>
          ))}
        </ScrollStagger>
      </div>
    </section>
  );
}
