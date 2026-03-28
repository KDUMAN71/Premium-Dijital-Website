"use client";

import React from "react";
import { Search, Map, Cpu, LineChart } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const steps = [
  {
    icon: <Search />,
    title: "Derinlemesine Analiz",
    desc: "Mevcut teknik hataları, tarama bütçesi sızıntılarını ve içerik boşluklarını veri disipliniyle tespit ediyoruz.",
  },
  {
    icon: <Map />,
    title: "Semantik Yol Haritası",
    desc: "Rakiplerinizin zayıf olduğu 'Topical Authority' alanlarını belirleyerek içerik hiyerarşisini planlıyoruz.",
  },
  {
    icon: <Cpu />,
    title: "Teknik Uygulama",
    desc: "Core Web Vitals ve Schema yapılandırmalarını mühendislik hassasiyetiyle web sitenize entegre ediyoruz.",
  },
  {
    icon: <LineChart />,
    title: "Otorite Takibi",
    desc: "Dijital PR ve veri zekası ile büyüme ivmesini takip ediyor, her ay stratejiyi rakamlarla güncelliyoruz.",
  },
];

export default function SeoMethodology() {
  return (
    <section className="py-24 md:py-32 bg-brand-dark">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <ScrollReveal>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-12 italic">
            SEO Bir <span className="text-brand-purple">Maratondur</span>, Bir
            Sprint Değil.
          </h2>
          <div className="relative p-10 rounded-3xl bg-white/5 border border-white/10 italic text-gray-400 text-lg leading-relaxed">
            "SEO'yu bir meşe ağacı dikmek gibi düşünün. İlk aylar toprağın
            altındaki kökleri (teknik altyapı) güçlendiririz. Meyveler (organik
            trafik) ancak kökler sağlamlaştığında kalıcı ve devasa olur.
            Rakipleriniz rüzgarda savrulurken, sizin otoriteniz yerinde kalır."
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {steps.map((step, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="relative group text-center p-8">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6 text-brand-purple group-hover:bg-brand-purple group-hover:text-white transition-all duration-500">
                  {step.icon}
                </div>
                <h3 className="text-lg font-bold mb-3">{step.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {step.desc}
                </p>
                {i !== steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 -right-2 w-4 h-[1px] bg-white/10" />
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
