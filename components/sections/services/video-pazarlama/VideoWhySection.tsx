"use client";

import { useEffect, useRef, useState } from "react";
import { TrendingUp, Search, BarChart3 } from "lucide-react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";

const stats = [
  {
    prefix: "",
    value: 2,
    suffix: "x",
    label: "Satın Alma Olasılığı",
    desc: "Video izleyen kullanıcılar markayı satın alma olasılığı 2 kat daha yüksek",
    color: "#BE29EC",
    icon: TrendingUp,
  },
  {
    prefix: "#",
    value: 2,
    suffix: "",
    label: "Dünya Arama Motoru",
    desc: "YouTube, Google'dan sonra dünyanın en büyük 2. arama motorudur",
    color: "#FF0000",
    icon: Search,
  },
  {
    prefix: "%",
    value: 80,
    suffix: "",
    label: "LP Dönüşüm Artışı",
    desc: "Video içeren landing page'ler ortalama %80 daha fazla dönüşüm üretir",
    color: "#0000C8",
    icon: BarChart3,
  },
];

function CountUp({
  end,
  prefix,
  suffix,
  color,
  shouldAnimate,
}: {
  end: number;
  prefix: string;
  suffix: string;
  color: string;
  shouldAnimate: boolean;
}) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView || !shouldAnimate) {
      setDisplay(end);
      return;
    }
    const duration = 1800;
    const start = performance.now();
    const raf = requestAnimationFrame(function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(raf);
  }, [isInView, end, shouldAnimate]);

  return (
    <div
      ref={ref}
      className="text-5xl md:text-6xl font-black tracking-tighter"
      style={{ color }}
    >
      {prefix}
      {display}
      {suffix}
    </div>
  );
}

export default function VideoWhySection() {
  const shouldReduce = useReducedMotion();

  return (
    <section className="relative py-24 md:py-32 border-t border-white/5 bg-brand-dark text-white overflow-hidden">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-20 blur-[120px]"
        style={{ background: "radial-gradient(circle, #BE29EC, #0000C8)" }}
      />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Başlık */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <ScrollReveal>
            <span className="inline-block px-4 py-1 rounded-full border border-white/10 bg-white/5 text-white/50 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
              Neden Video?
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6 leading-tight">
              Video Artık Seçenek Değil,{" "}
              <span className="text-brand-purple">Zorunluluk</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Rakipleriniz videoyla güven inşa ederken siz hâlâ fotoğrafla ikna
              etmeye mi çalışıyorsunuz?
            </p>
          </ScrollReveal>
        </div>

        {/* 3 stat kartı */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={shouldReduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative rounded-[2rem] border border-white/8 bg-white/[0.02] p-8 flex flex-col gap-4 overflow-hidden"
              >
                {/* Corner glow */}
                <div
                  className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[60px] opacity-20 pointer-events-none"
                  style={{ background: stat.color }}
                />

                <div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-2xl"
                  style={{
                    background: `${stat.color}15`,
                    border: `1px solid ${stat.color}30`,
                  }}
                >
                  <Icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>

                <CountUp
                  end={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  color={stat.color}
                  shouldAnimate={!shouldReduce}
                />

                <div>
                  <div className="font-black text-sm uppercase tracking-widest text-white mb-2">
                    {stat.label}
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {stat.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Sektöre özel callout */}
        <ScrollReveal>
          <div className="rounded-[2rem] border border-brand-purple/20 bg-brand-purple/5 p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div
              className="shrink-0 text-3xl w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ background: "#BE29EC15", border: "1px solid #BE29EC30" }}
            >
              🏥
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-brand-purple mb-2">
                Sektöre Özel Not
              </p>
              <p className="text-white/80 text-sm leading-relaxed">
                Sağlık ve turizm sektöründe video, güven&apos;in birincil
                taşıyıcısıdır. Doktor yüzü, hasta yorumu veya destinasyon
                hissi — bunları fotoğraf veremez.{" "}
                <span className="text-white font-bold">
                  Video izleyen potansiyel hasta %80 daha hızlı randevu talep
                  eder.
                </span>
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
