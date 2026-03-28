"use client";

import React, { useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const formats = [
  {
    label: "Instagram Reels",
    ratio: "9:16",
    img: "/img/hizmetler/ppc-performans-pazarlama/meta-ads/mockup-1.webp",
    tip: "İlk 3 saniye karar verir — hook kritik",
    color: "#E1306C",
  },
  {
    label: "Feed Reklamı",
    ratio: "4:5",
    img: "/img/hizmetler/ppc-performans-pazarlama/meta-ads/mockup-2.webp",
    tip: "4:5 format feed'de %15 daha fazla dikkat çeker",
    color: "#1877F2",
  },
  {
    label: "Carousel",
    ratio: "1:1",
    img: "/img/hizmetler/ppc-performans-pazarlama/meta-ads/mockup-3.webp",
    tip: "Ürün kataloğu ve hikaye anlatımı için ideal",
    color: "#BE29EC",
  },
  {
    label: "WhatsApp Lead",
    ratio: "Click-to-Chat",
    img: "/img/hizmetler/ppc-performans-pazarlama/meta-ads/mockup-4.webp",
    tip: "Doğrudan iletişim — en düşük CPL fırsatı",
    color: "#25D366",
  },
];

export default function CreativeEngine() {
  const [imgErrors, setImgErrors] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);

  return (
    <section className="relative py-24 md:py-32 overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Sol metin */}
          <div className="lg:col-span-5">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-brand-purple text-[10px] font-bold uppercase tracking-widest mb-6">
                Kreatif Motor
              </div>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6 text-white">
                Kazandıran Kreatif,{" "}
                <span className="text-brand-purple italic">
                  Kazandıran Reklam
                </span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                Meta&apos;da performansın{" "}
                <strong className="text-white">%70-80&apos;i</strong>{" "}
                kreativeden geliyor. Bütçeden değil.
              </p>
              <p className="text-white/30 text-xs italic leading-relaxed">
                Kaynak: AppsFlyer State of eCommerce App Marketing
              </p>

              <div className="mt-10 space-y-4">
                {[
                  "Her format için ayrı hook stratejisi",
                  "A/B test sürekli kreatif rotasyonu",
                  "Platform native formatlar (Reels, Stories, Feed)",
                  "Statik + video + carousel kombinasyonu",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-purple shrink-0" />
                    <span className="text-white/70 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Sağ format grid — uniform 2x2 */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-4">
              {formats.map((format, i) => (
                <div
                  key={i}
                  className="group relative rounded-2xl overflow-hidden border border-white/5 bg-white/[0.02] hover:border-white/10 transition-all"
                >
                  {/* Görsel alanı — sabit 4:3 oran */}
                  <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
                    {!imgErrors[i] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={format.img}
                        alt={format.label}
                        className="w-full h-full object-cover"
                        onError={() => {
                          const next = [...imgErrors];
                          next[i] = true;
                          setImgErrors(next);
                        }}
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, ${format.color}15, ${format.color}05)`,
                        }}
                      >
                        <div className="text-center">
                          <div
                            className="text-4xl font-black mb-2"
                            style={{ color: format.color }}
                          >
                            {format.ratio}
                          </div>
                          <div className="text-[10px] text-white/30 uppercase tracking-widest">
                            {format.label}
                          </div>
                        </div>
                      </div>
                    )}
                    {/* Ratio badge */}
                    <div className="absolute top-3 left-3 px-2 py-1 rounded-lg bg-black/70 text-[10px] font-bold text-white/80">
                      {format.ratio}
                    </div>
                  </div>
                  {/* Alt bilgi */}
                  <div className="p-4">
                    <div
                      className="text-sm font-bold mb-1"
                      style={{ color: format.color }}
                    >
                      {format.label}
                    </div>
                    <div className="text-xs text-white/40">{format.tip}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
