"use client";

import React from "react";
import { Search, Zap, MousePointerClick, BarChart3 } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import {
  ScrollStagger,
  ScrollStaggerItem,
} from "@/components/ui/ScrollStagger";

const pillars = [
  {
    icon: Search,
    title: "Potansiyel Müşteri Yakalama",
    subtitle: "Arama Ağı & PMax Kampanyaları",
    desc: "Google aramalarında, niyeti yüksek kullanıcıları belirli anahtar kelime grupları ile yakalıyoruz. Negatif kelime disiplini ile bütçenizi boşa harcamadan, AI destekli PMax kampanyalarıyla maksimum etki sağlıyoruz.",
    features: [
      "Anahtar Kelime Analizi",
      "Negatif Kelime Yönetimi",
      "PMax Optimizasyonu",
    ],
    color: "#0000C8",
  },
  {
    icon: Zap,
    title: "Marka ve Hatırlatma Reklamları",
    subtitle: "YouTube & Görüntülü Reklam Ağı",
    desc: "YouTube ve Görüntülü Reklam Ağı ile markanızı güvenilir bir otorite olarak konumlandırıyoruz. Daha önce ilgi göstermiş kullanıcıları yeniden hedefleyerek dönüşüm olasılığını artırıyoruz.",
    features: [
      "Görsel Hikaye Anlatımı",
      "Dinamik Yeniden Pazarlama",
      "Brand Safety",
    ],
    color: "#BE29EC",
  },
  {
    icon: MousePointerClick,
    title: "Dönüşüm Odaklı Açılış Sayfaları",
    subtitle: "Landing Page & UX Optimizasyonu",
    desc: "Reklam tıklamalarını gerçek müşteriye dönüştürüyoruz. Açılış sayfalarınızı hız, kullanıcı deneyimi ve ikna tasarımıyla optimize ederek maksimum dönüşüm sağlıyoruz.",
    features: [
      "Hızlı ve Stabil Sayfalar",
      "Psikolojik İkna Kurgusu",
      "A/B Test Yönetimi",
    ],
    color: "#0000C8",
  },
  {
    icon: BarChart3,
    title: "Reklam Performansı ve ROI Takibi",
    subtitle: "GA4 & GTM ile Ölçümleme",
    desc: "Kampanya performansınızı uçtan uca izliyoruz. GA4 ve GTM ile yatırım getirinizi ölçüyor, veri odaklı optimizasyonlarla bütçenizi en doğru şekilde kullanıyoruz.",
    features: [
      "Server-Side Tracking",
      "Özel Dönüşüm Kurulumu",
      "ROAS Odaklı Raporlama",
    ],
    color: "#BE29EC",
  },
];

export default function PerformanceSystem() {
  return (
    <section
      id="sistem"
      className="relative py-24 md:py-32 overflow-hidden border-t border-white/5"
    >
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Üst Başlık Alanı */}
        <div className="mb-20 text-center">
          <ScrollReveal>
            <span className="inline-block px-4 py-1.5 rounded-full border border-brand-blue/30 bg-brand-blue/5 text-brand-blue text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
              Büyüme Metodolojisi
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6">
              Premium Performans{" "}
              <span className="text-brand-purple">Mimarisi</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Her tıklamanın yatırım getirisini ölçüyor, anahtar kelimeden
              açılış sayfasına, reklam metinlerinden dönüşüm izlemeye kadar tüm
              adımlarda veri odaklı optimizasyon sağlıyoruz.
            </p>
          </ScrollReveal>
        </div>

        {/* 4 Katmanlı Grid */}
        <ScrollStagger className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {pillars.map((pillar, idx) => (
            <ScrollStaggerItem key={idx}>
              <div className="group relative h-full p-8 md:p-10 rounded-[2.5rem] border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 overflow-hidden">
                {/* Background Glow */}
                <div
                  className="absolute -right-20 -top-20 w-40 h-40 blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-700"
                  style={{ backgroundColor: pillar.color }}
                />

                <div className="relative z-10 flex flex-col h-full">
                  {/* İkon & Başlık */}
                  <div className="flex items-start justify-between mb-8">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center border border-white/10 bg-white/5 group-hover:scale-110 transition-transform duration-500"
                      style={{
                        color: pillar.color,
                        boxShadow: `0 0 20px ${pillar.color}20`,
                      }}
                    >
                      <pillar.icon size={28} />
                    </div>
                    <span className="text-3xl font-black text-white/5 italic select-none">
                      0{idx + 1}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-1">{pillar.title}</h3>
                    <p className="text-xs font-bold uppercase tracking-widest text-brand-blue/60 mb-4">
                      {pillar.subtitle}
                    </p>
                    <p className="text-gray-400 text-sm leading-relaxed mb-8">
                      {pillar.desc}
                    </p>
                  </div>

                  {/* Özellik Çipleri */}
                  <div className="mt-auto flex flex-wrap gap-2">
                    {pillar.features.map((feat) => (
                      <span
                        key={feat}
                        className="text-[10px] font-medium bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-white/70"
                      >
                        {feat}
                      </span>
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
