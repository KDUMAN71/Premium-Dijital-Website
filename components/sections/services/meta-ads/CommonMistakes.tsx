"use client";

import React from "react";
import { Target, Eye, Layers, RefreshCw } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import {
  ScrollStagger,
  ScrollStaggerItem,
} from "@/components/ui/ScrollStagger";

const mistakes = [
  {
    icon: Target,
    color: "#BE29EC",
    title: "Hedefleme Değil, Mesaj Sorunu",
    desc: "Çoğu ajans kitleyi daraltmaya çalışır. Günümüzde Meta'nın AI'ı geniş kitlede kendiliğinden doğru kişiyi bulur — asıl sorun kreatifin o kişiyle konuşmamasıdır.",
  },
  {
    icon: Eye,
    color: "#0000C8",
    title: "Pixel Var, CAPI Yok",
    desc: "iOS 14 sonrası tarayıcı tabanlı takip %30-60 veri kaybettiriyor. CAPI kurulmayan hesaplarda algoritma kör uçuş yapıyor.",
  },
  {
    icon: Layers,
    color: "#BE29EC",
    title: "Reklam & Sayfa Uyumsuzluğu",
    desc: "Reklamda 'Ücretsiz Danışmanlık' yazıyor, landing page'de genel site açılıyor. Bu uyumsuzluk dönüşüm oranını yarıya düşürür.",
  },
  {
    icon: RefreshCw,
    color: "#0000C8",
    title: "Kreatif Yorgunluğu",
    desc: "Aynı görsel 3 haftadan uzun çalışınca frekans artıp etki düşer. Düzenli kreatif rotasyonu olmayan kampanyalar kademeli ölür.",
  },
];

export default function CommonMistakes() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Sol içerik */}
          <div className="lg:col-span-5">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-brand-purple text-[10px] font-bold uppercase tracking-widest mb-6">
                Sistem Analizi
              </div>

              <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-8 text-white">
                Reklam Bütçeniz Neden
                <br />
                <span className="text-brand-purple">
                  Sonuç Üretmiyor?
                </span>
              </h2>

              <p className="text-gray-400 text-lg leading-relaxed mb-10">
                Meta reklamlarında başarısızlığın{" "}
                <strong className="text-white">%90&apos;ı</strong> şu 4 hatadan
                kaynaklanır. Strateji değil, sistem sorunu.
              </p>

              <div className="flex items-center gap-4 p-5 rounded-2xl bg-brand-purple/5 border border-brand-purple/10">
                <div className="text-xs text-gray-300 italic leading-relaxed">
                  &ldquo;Para gitmesi reklam yapıldığı anlamına gelmez. Sonuç
                  gelmesi gerekir.&rdquo;
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Sağ hata kartları */}
          <div className="lg:col-span-7">
            <ScrollStagger className="space-y-4">
              {mistakes.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <ScrollStaggerItem key={idx}>
                    <div className="group relative p-8 rounded-[2.5rem] border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-500 overflow-hidden">
                      <div className="relative z-10 flex gap-6 items-start">
                        <div
                          className="shrink-0 p-4 rounded-2xl bg-white/5 group-hover:bg-white/10 transition-colors"
                          style={{ color: item.color }}
                        >
                          <Icon size={24} />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold mb-2 text-white group-hover:text-brand-purple transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-gray-400 text-sm leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                      <div
                        className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-700 group-hover:w-full"
                        style={{ backgroundColor: item.color }}
                      />
                    </div>
                  </ScrollStaggerItem>
                );
              })}
            </ScrollStagger>
          </div>
        </div>
      </div>
    </section>
  );
}
