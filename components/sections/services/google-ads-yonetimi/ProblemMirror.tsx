"use client";
import {
  ScrollStagger,
  ScrollStaggerItem,
} from "@/components/ui/ScrollStagger";
import { AlertCircle, MousePointerClick, TrendingDown } from "lucide-react";

const problems = [
  {
    icon: <AlertCircle className="text-brand-purple" />,
    title: "Bütçeniz boşa mı gidiyor?",
    desc: "Reklam harcaması var ama müşteri sayısı beklediğiniz seviyede değil mi?",
  },
  {
    icon: <MousePointerClick className="text-brand-blue" />,
    title: "Tıklama var, dönüşüm yok mu?",
    desc: "Ziyaretçiler geliyor ancak satış veya teklif taleplerine dönüşmüyor mu?",
  },
  {
    icon: <TrendingDown className="text-brand-purple" />,
    title: "Maliyetler kontrolsüz mü?",
    desc: "Müşteri edinme maliyetleriniz (CPA) her geçen gün karlılığınızı mı düşürüyor?",
  },
];

export default function ProblemMirror() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight">
            Reklamlarınız çalışıyor gibi görünüyor ama <br />
            <span className="text-white/40 italic font-medium">
              gerçek sonuçlar yerinde mi sayıyor?
            </span>
          </h2>
        </div>

        <ScrollStagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((p, i) => (
            <ScrollStaggerItem key={i}>
              <div className="h-full p-8 rounded-[2rem] border border-white/5 bg-white/[0.02] hover:border-white/10 transition-all group">
                <div className="mb-6 opacity-40 group-hover:opacity-100 transition-opacity transform group-hover:scale-110 duration-500">
                  {p.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{p.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </ScrollStaggerItem>
          ))}
        </ScrollStagger>
      </div>
    </section>
  );
}
