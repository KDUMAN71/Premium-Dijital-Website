"use client";

import React from "react";
import { SearchX, Ban, TrendingDown } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const problems = [
  {
    icon: <SearchX size={28} />,
    title: "Görünmezlik Sorunu",
    desc: "Sektörünüzle ilgili aramaların %90'ında ilk sayfada yoksanız, potansiyel müşterileriniz için yoksunuz demektir.",
  },
  {
    icon: <Ban size={28} />,
    title: "Verimsiz İçerik",
    desc: "Binlerce kelime içerik üretiyor ancak Google botlarına konunun uzmanı (Authority) olduğunuzu kanıtlayamıyorsunuz.",
  },
  {
    icon: <TrendingDown size={28} />,
    title: "Durağan Trafik",
    desc: "Teknik SEO hataları yüzünden siteniz 'tarama bütçesi' sınırına takılıyor ve yeni sayfalarınız asla indekslenmiyor.",
  },
];

export default function ProblemMirror() {
  return (
    <section className="py-24 md:py-32 bg-[#050505] relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <ScrollReveal>
          <div className="mb-16 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6 italic leading-tight">
              Sadece Bir Web Siteniz mi Var, <br />
              <span className="text-brand-purple">
                Yoksa Bir Dijital Otoriteniz mi?
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
              Google aramalarının %75'i asla ilk sayfayı geçmez. Eğer orada
              yoksanız, büyüme potansiyelinizin büyük kısmını rakiplerinize terk
              ediyorsunuz.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((prob, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-brand-blue/30 transition-all duration-500 group">
                <div className="mb-6 text-brand-blue group-hover:scale-110 transition-transform duration-500">
                  {prob.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-white/90">
                  {prob.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {prob.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
