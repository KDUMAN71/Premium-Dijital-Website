"use client";

import { CheckCircle2, Layers } from "lucide-react";
import ShimmerButton from "@/components/ui/ShimmerButton"; // Reusable
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function SeoFactorsMatrix() {
  return (
    <section className="py-24 bg-[#050505] border-t border-white/5">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 italic text-white">
              275+ Kriter, <br />
              <span className="text-brand-blue text-3xl md:text-5xl">
                Sıfır Hata Disiplini.
              </span>
            </h2>
            <div className="space-y-6 mb-10 text-gray-400 text-lg leading-relaxed">
              <p>
                SEO sadece anahtar kelimelerden ibaret değildir. Google,
                sitenizi 275&apos;ten fazla teknik ve semantik sinyale göre
                derecelendirir.
              </p>
              <p className="p-4 rounded-2xl bg-brand-blue/5 border border-brand-blue/10 border-dashed text-sm italic">
                <strong>Stratejik Not:</strong> Kusursuz SEO altyapısı, Google
                Ads &quot;Kalite Puanınızı&quot; yükselterek reklam
                maliyetlerinizi (CPC) %30&apos;a kadar optimize eder.
              </p>
            </div>
            <div className="w-full sm:w-auto">
              <ShimmerButton
                href="#checkup"
                variant="primary"
                size="md"
                className="w-full sm:w-auto"
              >
                Teknik Kriter Listesini Talep Edin →
              </ShimmerButton>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 gap-4">
            {[
              {
                title: "Teknik Mimari",
                desc: "Core Web Vitals, Schema ve Tarama Bütçesi.",
              },
              {
                title: "Semantik Derinlik",
                desc: "Topical Authority ve NLP odaklı içerik.",
              },
              {
                title: "Otorite Sinyalleri",
                desc: "EEAT disiplini ve dijital PR inşası.",
              },
              {
                title: "Dönüşüm (CRO)",
                desc: "Trafiği müşteriye dönüştüren kullanıcı deneyimi.",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 group hover:border-brand-blue/30 transition-all"
              >
                <CheckCircle2 size={18} className="text-brand-blue mb-4" />
                <h4 className="text-white font-bold text-sm mb-2">{f.title}</h4>
                <p className="text-[10px] text-gray-500 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
