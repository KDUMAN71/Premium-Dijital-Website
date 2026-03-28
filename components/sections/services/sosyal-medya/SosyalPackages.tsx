"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import {
  ScrollStagger,
  ScrollStaggerItem,
} from "@/components/ui/ScrollStagger";

const packages = [
  {
    name: "Temel",
    callout: "Fiyat için arayın",
    highlight: false,
    tag: null,
    features: [
      "1 platform (Instagram veya LinkedIn)",
      "Ayda 8 post (görsel + metin)",
      "Story paylaşımı (haftada 2)",
      "Hashtag stratejisi",
      "Aylık performans raporu",
      "3 aylık taahhüt",
    ],
    cta: "Bilgi Alın",
    ctaHref: "/iletisim",
  },
  {
    name: "Büyüme",
    callout: "Fiyat için arayın",
    highlight: true,
    tag: "En Çok Tercih Edilen",
    features: [
      "2 platform (Instagram + Facebook veya LinkedIn)",
      "Ayda 15 post + Reels/Carousel",
      "Story (haftada 3-4) + Highlights",
      "Topluluk yönetimi (yorum yanıtlama)",
      "Rakip analizi ve trend takibi",
      "Haftalık özet + aylık strateji görüşmesi",
      "6 aylık taahhüt",
    ],
    cta: "Görüşme Talep Et",
    ctaHref: "/iletisim",
  },
  {
    name: "Pro",
    callout: "Fiyat için arayın",
    highlight: false,
    tag: null,
    features: [
      "3 platform (Instagram + LinkedIn + YouTube organik)",
      "Ayda 20+ post, tüm formatlar",
      "YouTube kanal optimizasyonu + SEO",
      "Influencer işbirliği koordinasyonu",
      "Çok dilli içerik (sağlık turizmi için)",
      "Dedike içerik yöneticisi",
      "12 aylık taahhüt",
    ],
    cta: "Teklif Alın",
    ctaHref: "/iletisim",
  },
];

const notes = [
  "★ Sağlık turizmi & çok dilli projeler için özel fiyatlandırma uygulanır",
  "★ İlk ay tanışma indirimi mevcuttur — detaylar için arayın",
  "★ Reklam yönetimi ayrıdır — bkz. Meta Ads & Google Ads hizmetleri",
];

export default function SosyalPackages() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Başlık */}
        <div className="mb-16 text-center">
          <ScrollReveal>
            <span className="inline-block px-4 py-1.5 rounded-full border border-brand-blue/30 bg-brand-blue/5 text-brand-blue text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
              Paketler & Kapsam
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6">
              Büyümenize Uygun{" "}
              <span className="text-brand-purple">Sosyal Medya Paketi</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Her paket, sosyal medyada kalıcı ve ölçülebilir büyüme için
              tasarlandı. Fiyatlandırma için bizi arayın — ihtiyacınıza özel
              teklif hazırlıyoruz.
            </p>
          </ScrollReveal>
        </div>

        {/* Paket Kartları */}
        <ScrollStagger className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {packages.map((pkg, idx) => (
            <ScrollStaggerItem key={idx}>
              <div
                className={`relative h-full flex flex-col rounded-[2.5rem] border transition-all duration-500 overflow-hidden ${
                  pkg.highlight
                    ? "border-brand-purple/40 bg-brand-purple/5 scale-[1.02] shadow-[0_0_60px_rgba(190,41,236,0.1)]"
                    : "border-white/5 bg-white/[0.02] hover:bg-white/[0.04]"
                }`}
              >
                {pkg.highlight && (
                  <div className="absolute inset-0 bg-gradient-to-b from-brand-purple/10 to-transparent pointer-events-none" />
                )}

                <div className="relative z-10 p-8 flex flex-col h-full">
                  {pkg.tag && (
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 rounded-full bg-brand-purple text-white text-[10px] font-black uppercase tracking-widest">
                        {pkg.tag}
                      </span>
                    </div>
                  )}

                  <div className="mb-8">
                    <h3 className="text-lg font-black uppercase tracking-widest text-white/60 mb-4">
                      {pkg.name}
                    </h3>
                    <div className="flex items-center gap-2 py-2 px-3 rounded-xl border border-brand-purple/20 bg-brand-purple/5 w-fit">
                      <span className="text-brand-purple text-xs font-black uppercase tracking-widest">
                        📞 {pkg.callout}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {pkg.features.map((feat, fi) => (
                      <li key={fi} className="flex items-start gap-3">
                        <Check
                          size={14}
                          className={`mt-0.5 shrink-0 ${pkg.highlight ? "text-brand-purple" : "text-brand-blue"}`}
                        />
                        <span className="text-white/70 text-sm leading-relaxed">
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={pkg.ctaHref}
                    className={`w-full py-4 rounded-2xl text-center text-sm font-black uppercase tracking-widest transition-all ${
                      pkg.highlight
                        ? "bg-brand-purple text-white hover:bg-brand-purple/90"
                        : "bg-white/5 border border-white/10 text-white/80 hover:border-brand-purple/30 hover:text-white"
                    }`}
                  >
                    {pkg.cta}
                  </Link>
                </div>
              </div>
            </ScrollStaggerItem>
          ))}
        </ScrollStagger>

        {/* Alt notlar */}
        <ScrollReveal>
          <div className="mt-10 p-6 rounded-3xl border border-white/5 bg-white/[0.02] space-y-2">
            {notes.map((note, i) => (
              <p key={i} className="text-white/40 text-xs leading-relaxed">
                {note}
              </p>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
