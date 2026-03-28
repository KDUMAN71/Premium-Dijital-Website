"use client";

import React from "react";
import { ShieldAlert, ZapOff, Database, Activity } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import {
  ScrollStagger,
  ScrollStaggerItem,
} from "@/components/ui/ScrollStagger";

const seoLeaks = [
  {
    icon: <ShieldAlert className="text-brand-purple" size={24} />,
    title: "Tarama Bütçesi Sızıntısı",
    desc: "Hatalı indeksleme ve teknik mimari bozuklukları, Google botlarının sitenizi yanlış anlamasına ve bütçenizi boşa harcamasına neden olur.",
  },
  {
    icon: <ZapOff className="text-brand-blue" size={24} />,
    title: "Performans & LCP Kayıpları",
    desc: "Core Web Vitals metriklerindeki zayıflık, sadece kullanıcı deneyimini değil, arama motoru sıralamalarınızı da doğrudan aşağı çeker.",
  },
  {
    icon: <Database className="text-brand-purple" size={24} />,
    title: "Semantik Karmaşa",
    desc: "Anahtar kelime yamyamlığı (cannibalization), sayfalarınızın birbirine rakip olmasına ve otoritenin dağılmasına yol açar.",
  },
];

export default function DiagnosisSection() {
  return (
    <section
      id="teshis"
      className="relative py-24 md:py-32 overflow-hidden border-t border-white/5 bg-brand-dark"
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Sol İçerik: Teşhis Giriş */}
          <div className="lg:col-span-5">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-brand-blue text-[10px] font-bold uppercase tracking-widest mb-6">
                <Activity size={12} />
                Sistem Teşhisi
              </div>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-8 leading-tight">
                Görünmeyen Hatalar <br />
                <span className="text-brand-purple">Sıralamanızı Tüketir.</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-10">
                SEO başarısı bir tesadüf değildir; doğru bir **Yol Haritası** ve
                teknik mükemmellik gerektirir. Veri disipliniyle sitenizin
                büyüme kapasitesini engelleyen sızıntıları tespit ediyoruz.
              </p>

              <div className="p-6 rounded-2xl bg-brand-blue/5 border border-brand-blue/10 italic text-xs text-white/50 leading-relaxed">
                "Rakamlarla Kanıtlanmış, Hayallerle Tasarlanmış" prensibimizle,
                her teknik hatayı bir büyüme fırsatına dönüştürüyoruz.
              </div>
            </ScrollReveal>
          </div>

          {/* Sağ İçerik: Sızıntı Kartları */}
          <div className="lg:col-span-7">
            <ScrollStagger className="space-y-4">
              {seoLeaks.map((leak, idx) => (
                <ScrollStaggerItem key={idx}>
                  <div className="group relative p-8 rounded-[2.5rem] border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-500 overflow-hidden">
                    <div className="relative z-10 flex gap-6 items-start">
                      <div className="shrink-0 p-4 rounded-2xl bg-white/5 group-hover:bg-brand-blue/10 group-hover:text-brand-blue transition-colors duration-500">
                        {leak.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors">
                          {leak.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed group-hover:text-white/70 transition-colors">
                          {leak.desc}
                        </p>
                      </div>
                    </div>
                    {/* Hover Vurgu Çizgisi */}
                    <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-brand-blue to-brand-purple transition-all duration-700 group-hover:w-full" />
                  </div>
                </ScrollStaggerItem>
              ))}
            </ScrollStagger>
          </div>
        </div>
      </div>
    </section>
  );
}
