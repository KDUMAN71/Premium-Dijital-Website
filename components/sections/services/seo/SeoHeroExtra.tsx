"use client";
import { Zap, ShieldCheck, TrendingDown } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function SeoHeroExtra() {
  return (
    <section className="py-12 border-b border-white/5 bg-brand-dark/50">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ScrollReveal>
            <div className="flex items-start gap-4">
              <Zap className="text-brand-blue shrink-0" size={24} />
              <div>
                <h4 className="text-white font-bold text-sm mb-2">
                  Reklam Maliyeti Optimizasyonu
                </h4>
                <p className="text-gray-500 text-xs leading-relaxed">
                  Güçlü bir SEO altyapısı, Google Ads "Kalite Puanınızı"
                  artırarak tıklama başı maliyetlerinizi (CPC) %30'a kadar
                  düşürür.
                </p>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="flex items-start gap-4">
              <ShieldCheck className="text-brand-purple shrink-0" size={24} />
              <div>
                <h4 className="text-white font-bold text-sm mb-2">
                  Sürdürülebilir Dijital Varlık
                </h4>
                <p className="text-gray-500 text-xs leading-relaxed">
                  SEO bir 'gider' değil, bir 'mülktür'. Reklamı durdurduğunuzda
                  trafik kesilir, SEO ise büyümeye devam eden bir organizmadır.
                </p>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="flex items-start gap-4">
              <TrendingDown className="text-brand-blue shrink-0" size={24} />
              <div>
                <h4 className="text-white font-bold text-sm mb-2">
                  Dönüşüm Odaklı Mimari
                </h4>
                <p className="text-gray-500 text-xs leading-relaxed">
                  Sadece trafik değil, 'niyet' hedefliyoruz. Satın alma
                  aşamasındaki kullanıcıyı en doğru semantik kurguyla
                  yakalıyoruz.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
