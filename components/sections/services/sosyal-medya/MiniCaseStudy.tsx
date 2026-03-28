"use client";

import { TrendingUp, Target, ShieldCheck, ArrowUpRight } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import {
  ScrollStagger,
  ScrollStaggerItem,
} from "@/components/ui/ScrollStagger";

const stats = [
  {
    label: "Takipçi Büyümesi",
    value: "+340%",
    sub: "6 ayda 1.2K → 5.3K",
    color: "#BE29EC",
  },
  {
    label: "Etkileşim Oranı",
    value: "8.4%",
    sub: "Sektör ort. %2.1",
    color: "#0000C8",
  },
];

const actions = [
  {
    title: "İçerik Sütunları Yeniden Tasarlandı",
    desc: "Hasta hikayeleri + eğitim + tanıtım kombinasyonu ile profil dönüşüm odaklı hale getirildi.",
  },
  {
    title: "Reels Odaklı Strateji",
    desc: "Keşfet erişimi 12x arttı, organik reach rakiplerini 5 kat geçti.",
  },
  {
    title: "Topluluk Yönetimi",
    desc: "Yorum yanıtlama sistemi ile güven inşa edildi, profil ziyaretten randevuya dönüşüm sağlandı.",
  },
];

export default function MiniCaseStudy() {
  return (
    <section
      id="vaka"
      className="relative py-24 md:py-32 overflow-hidden border-t border-white/5 bg-brand-dark"
    >
      <div className="absolute -left-20 top-1/2 h-[300px] w-[300px] -translate-y-1/2 rounded-full bg-brand-purple/5 blur-[120px]" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Sol: metin */}
          <div className="lg:col-span-6">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-brand-purple text-[10px] font-bold uppercase tracking-widest mb-6">
                <Target size={12} />
                Vaka Analizi
              </div>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 leading-tight">
                Estetik Klinik —{" "}
                <span className="text-white/40 font-medium">
                  Instagram Organik Büyüme
                </span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-10">
                İçerik sütunları yeniden tasarlandı, Reels odaklı strateji ile
                keşfet erişimi artırıldı ve topluluk yönetimiyle{" "}
                <strong>organik randevu talebi %180 büyüdü.</strong>
              </p>

              <div className="space-y-6">
                {actions.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-purple/10 text-brand-purple">
                      <ShieldCheck size={14} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">
                        {item.title}
                      </h4>
                      <p className="text-white/40 text-xs">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Sağ: metrik kartları */}
          <div className="lg:col-span-6">
            <ScrollStagger className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {stats.map((stat, idx) => (
                <ScrollStaggerItem key={idx}>
                  <div className="group relative p-8 rounded-[2rem] border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 overflow-hidden">
                    <div
                      className="absolute -right-10 -top-10 w-24 h-24 blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity"
                      style={{ backgroundColor: stat.color }}
                    />
                    <div className="relative z-10">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center mb-6 bg-white/5 border border-white/10 group-hover:scale-110 transition-transform"
                        style={{ color: stat.color }}
                      >
                        <TrendingUp size={20} />
                      </div>
                      <div
                        className="text-5xl font-black tracking-tighter mb-2"
                        style={{ color: stat.color }}
                      >
                        {stat.value}
                      </div>
                      <div className="text-white font-bold text-sm mb-1">
                        {stat.label}
                      </div>
                      <div className="text-white/30 text-[10px] uppercase tracking-widest font-medium">
                        {stat.sub}
                      </div>
                    </div>
                  </div>
                </ScrollStaggerItem>
              ))}

              <ScrollStaggerItem className="sm:col-span-2">
                <div className="p-6 rounded-2xl bg-gradient-to-r from-brand-purple/10 to-brand-blue/10 border border-brand-purple/20 flex items-center justify-between group cursor-default">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-black/40 flex items-center justify-center text-brand-purple border border-white/5">
                      <ArrowUpRight size={20} />
                    </div>
                    <div>
                      <div className="text-xs text-white/50 font-bold uppercase tracking-wider">
                        Nihai Sonuç
                      </div>
                      <div className="text-white font-bold">
                        Organik Randevu Talebi: +180%
                      </div>
                    </div>
                  </div>
                  <span className="hidden sm:block text-[10px] font-black text-brand-purple uppercase tracking-widest border-b border-brand-purple/30">
                    Rakamlarla Kanıtlandı
                  </span>
                </div>
              </ScrollStaggerItem>
            </ScrollStagger>
          </div>
        </div>
      </div>
    </section>
  );
}
