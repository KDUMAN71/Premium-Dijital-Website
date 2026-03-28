"use client";

import React from "react";
import { ShieldAlert, ZapOff, Database } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import {
  ScrollStagger,
  ScrollStaggerItem,
} from "@/components/ui/ScrollStagger";

const problems = [
  {
    icon: <ShieldAlert className="text-brand-purple w-12 h-12" />,
    title: "Yanlış Hedefleme",
    desc: "Reklamlarınız doğru kişilere ulaşmıyor ve bütçenizin bir kısmı istenmeyen tıklamalara harcanıyor.",
  },
  {
    icon: <ZapOff className="text-brand-blue w-12 h-12" />,
    title: "Dönüşüm Kaybı",
    desc: "Reklam ve açılış sayfanız uyumsuz, ziyaretçiler geldiğinde teklif veya satın alma işlemini tamamlamıyor.",
  },
  {
    icon: <Database className="text-brand-purple w-12 h-12" />,
    title: "Veri Takibi Eksik",
    desc: "Hangi kelimelerin ve kampanyaların gerçek müşteriye dönüştüğünü göremiyorsunuz, bu da bütçenizi yanlış yönlendirmenize yol açıyor.",
  },
];

export default function DiagnosisSection() {
  return (
    <section
      id="teshis"
      className="relative py-24 md:py-32 overflow-hidden border-t border-white/5 "
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Sol içerik */}
          <div className="lg:col-span-5">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-brand-blue text-[10px] font-bold uppercase tracking-widest mb-6">
                Sistem Analizi
              </div>

              <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-8 text-white">
                Reklam Bütçenizin <br />
                <span className="text-brand-purple">
                  %40’ı Boşa mı Harcanıyor?
                </span>
              </h2>

              <p className="text-gray-400 text-lg leading-relaxed mb-10">
                Google Ads kampanyalarındaki düşük performans genellikle bir
                ayar sorunu değil,
                <strong> sistem tasarımı ve optimizasyon eksikliği</strong>{" "}
                kaynaklıdır. Doğru analizle bütçenizi en verimli şekilde
                kullanabilirsiniz.
              </p>

              <div className="flex items-center gap-4 p-5 rounded-2xl bg-brand-blue/5 border border-brand-blue/10">
                <div className="text-xs text-gray-300 italic leading-relaxed">
                  "Her boşa harcanan TL, kazanabileceğiniz bir müşteriyi
                  kaybetmek demektir."
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Sağ problem kartları */}
          <div className="lg:col-span-7">
            <ScrollStagger className="space-y-4">
              {problems.map((p, idx) => (
                <ScrollStaggerItem key={idx}>
                  <div className="group relative p-8 rounded-[2.5rem] border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-500 overflow-hidden">
                    <div className="relative z-10 flex gap-6 items-start">
                      <div className="shrink-0 p-4 rounded-2xl bg-white/5 group-hover:bg-white/10 transition-colors">
                        {p.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-brand-blue transition-colors text-white">
                          {p.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          {p.desc}
                        </p>
                      </div>
                    </div>
                    {/* Alt çizgi animasyonu */}
                    <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-brand-blue transition-all duration-700 group-hover:w-full" />
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
