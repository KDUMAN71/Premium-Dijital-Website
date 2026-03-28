"use client";

import React from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import {
  ScrollStagger,
  ScrollStaggerItem,
} from "@/components/ui/ScrollStagger";

const packages = [
  {
    name: "Başlangıç",
    price: "12.000",
    priceNote: "TL/ay",
    rule: "veya bütçe × %15 (büyük olan)",
    highlight: false,
    tag: null,
    features: [
      "1 platform (Facebook veya Instagram)",
      "Aylık 3 kreatif üretimi",
      "Haftalık performans raporu",
      "GA4 + Pixel kurulumu",
      "3 aylık taahhüt",
    ],
    cta: "Başlayalım",
    ctaHref: "/iletisim",
  },
  {
    name: "Büyüme",
    price: "18.000",
    priceNote: "TL/ay",
    rule: "veya bütçe × %15 (büyük olan)",
    highlight: true,
    tag: "En Çok Tercih Edilen",
    features: [
      "Facebook + Instagram (2 platform)",
      "Aylık 6 kreatif + A/B test",
      "CAPI kurulumu ve optimizasyon",
      "Tam huni kampanya mimarisi",
      "Haftalık rapor + aylık strateji görüşmesi",
      "6 aylık taahhüt",
    ],
    cta: "Görüşme Talep Et",
    ctaHref: "/iletisim",
  },
  {
    name: "Pro",
    price: "26.000",
    priceNote: "TL/ay",
    rule: "veya bütçe × %15 (büyük olan)",
    highlight: false,
    tag: null,
    features: [
      "Tüm Meta platformları (+ WhatsApp + Audience Network)",
      "Aylık 10+ kreatif, video dahil",
      "Çok dilli kampanya (sağlık turizmi için)",
      "Dedike hesap yöneticisi",
      "Looker Studio özel dashboard",
      "12 aylık taahhüt",
    ],
    cta: "Teklif Al",
    ctaHref: "/iletisim",
  },
];

export default function MetaPackages() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Başlık */}
        <div className="mb-16 text-center">
          <ScrollReveal>
            <span className="inline-block px-4 py-1.5 rounded-full border border-brand-blue/30 bg-brand-blue/5 text-brand-blue text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
              Paketler & Fiyatlandırma
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6">
              Bütçenize Uygun{" "}
              <span className="text-brand-purple">Büyüme Paketi</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Her paket, Meta ekosisteminde sürdürülebilir büyüme için
              tasarlandı. Strateji, kreatif ve veri — hepsi dahil.
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
                {/* Highlighted glow */}
                {pkg.highlight && (
                  <div className="absolute inset-0 bg-gradient-to-b from-brand-purple/10 to-transparent pointer-events-none" />
                )}

                <div className="relative z-10 p-8 flex flex-col h-full">
                  {/* Tag */}
                  {pkg.tag && (
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 rounded-full bg-brand-purple text-white text-[10px] font-black uppercase tracking-widest">
                        {pkg.tag}
                      </span>
                    </div>
                  )}

                  {/* İsim + Fiyat */}
                  <div className="mb-8">
                    <h3 className="text-lg font-black uppercase tracking-widest text-white/60 mb-4">
                      {pkg.name}
                    </h3>
                    <div className="flex items-end gap-2">
                      <span className="text-4xl font-black text-white tracking-tighter">
                        {pkg.price}
                      </span>
                      <span className="text-white/40 text-sm mb-1">
                        {pkg.priceNote}
                      </span>
                    </div>
                    <p className="text-white/30 text-[10px] mt-2 font-medium">
                      {pkg.rule}
                    </p>
                  </div>

                  {/* Özellikler */}
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

                  {/* CTA */}
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

        {/* Alt not */}
        <ScrollReveal>
          <div className="mt-10 p-6 rounded-3xl border border-white/5 bg-white/[0.02] space-y-2">
            {[
              "★ Sağlık turizmi & çok dilli projeler: tüm paketlere +%40–50 premium",
              "★ İlk ay %50 tanışma indirimi (min 3 ay taahhüt)",
              "★ Reklam bütçesi Meta'ya ayrıca ödenir",
            ].map((note, i) => (
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
