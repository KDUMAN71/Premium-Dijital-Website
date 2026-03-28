"use client";

import Link from "next/link";
import { ArrowRight, Target, Share2 } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function FinalCTA() {
  return (
    <section className="py-24 border-t border-white/5 bg-gradient-to-b from-brand-dark to-[#080808]">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="relative p-12 md:p-20 rounded-[3rem] border border-brand-blue/20 bg-brand-blue/5 overflow-hidden text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-none">
              Performansı <br />
              <span className="text-brand-purple">
                Sürdürülebilir Büyümeye Taşıyın
              </span>
            </h2>
            <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto">
              Yatırımınızın geri dönüşünü maksimize eden veri odaklı çözümler
              sunuyoruz. <br />
              Diğer performans ve dönüşüm odaklı hizmetlerimizi keşfettiniz mi?
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/hizmetler/performans-pazarlama/google-ads-yonetimi"
                className="group flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-blue transition-all"
              >
                <Target size={18} className="text-brand-blue" />
                <span className="text-sm font-bold uppercase tracking-widest">
                  Google Ads Yönetimi
                </span>
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <Link
                href="/hizmetler/performans-pazarlama/landing-page-optimizasyonu"
                className="group flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-purple transition-all"
              >
                <Share2 size={18} className="text-brand-purple" />
                <span className="text-sm font-bold uppercase tracking-widest">
                  Landing Page Optimizasyonu
                </span>
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
