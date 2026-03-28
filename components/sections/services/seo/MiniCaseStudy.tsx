"use client";

import React from "react";
import { TrendingUp, Award, Globe } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function MiniCaseStudy() {
  return (
    <section className="py-24 md:py-32 bg-brand-dark border-t border-white/5">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 text-brand-purple text-[10px] font-bold uppercase tracking-widest">
                <Award size={14} /> Başarı Hikayesi
              </span>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter italic">
                Organik Trafikte <br />{" "}
                <span className="text-brand-blue">%450 Büyüme</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Rekabetin en yoğun olduğu e-ticaret nişlerinden birinde, teknik
                mimariyi ve semantik içerik kurgusunu yeniden tasarlayarak
                markayı 6 ayda sektör liderliğine taşıdık.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-6">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-3xl font-black text-white mb-1">
                    2.4s → 0.9s
                  </div>
                  <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    LCP İyileşmesi
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-3xl font-black text-brand-purple mb-1">
                    +1.2k
                  </div>
                  <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    Top 3 Kelime
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="relative group p-1 rounded-[3rem] bg-gradient-to-br from-brand-blue/20 to-brand-purple/20">
              <div className="bg-[#080808] rounded-[2.8rem] p-8 md:p-12">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                    <Globe size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">
                      Global Lojistik Portalı
                    </h4>
                    <p className="text-xs text-gray-500 uppercase tracking-widest">
                      B2B SEO Operasyonu
                    </p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex justify-between items-end border-b border-white/5 pb-4">
                    <span className="text-sm text-gray-400">
                      Yıllık Organik Lead Artışı
                    </span>
                    <span className="text-xl font-bold text-brand-blue">
                      +230%
                    </span>
                  </div>
                  <div className="flex justify-between items-end border-b border-white/5 pb-4">
                    <span className="text-sm text-gray-400">
                      Domain Otoritesi (DA)
                    </span>
                    <span className="text-xl font-bold text-brand-purple">
                      12 → 44
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
