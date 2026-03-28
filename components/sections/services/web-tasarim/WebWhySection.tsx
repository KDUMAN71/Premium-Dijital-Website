"use client";

import { useEffect, useRef, useState } from "react";
import { Building2, Globe, BarChart2, Handshake } from "lucide-react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";

const benefits = [
  {
    icon: Building2,
    color: "#BE29EC",
    title: "Kurumsal İtibar",
    desc: "Dijital çağda web sitesi olmayan kurum, kapısız ofis gibidir. Kurumsal güveninizin ilk ve en güçlü dijital yansıması.",
  },
  {
    icon: Globe,
    color: "#0000C8",
    title: "7/24 Keşfedilebilirlik",
    desc: "Çalışma saatinden bağımsız, dünyanın her yerinden her an bulunabilir olun. Uyurken bile temsil edilin.",
  },
  {
    icon: BarChart2,
    color: "#BE29EC",
    title: "Ölçülebilir Varlık",
    desc: "Kimin geldiğini, ne aradığını, nerede kaldığını bilin. Veriye dayalı kararlar alın, sürekli iyileştirin.",
  },
  {
    icon: Handshake,
    color: "#0000C8",
    title: "Güven & Referans",
    desc: "Kurumsal karar vericilerin %94'ü ilk olarak web sitesine bakıyor. İlk izlenim, çoğu zaman son izlenimdir.",
  },
];

const stats = [
  {
    value: 88,
    suffix: "%",
    label: "Kötü Tasarımı Terk Ediyor",
    desc: "Kötü tasarımlı siteyi 15 saniye içinde terk ediyor ve bir daha gelmiyor.",
    color: "#BE29EC",
  },
  {
    value: 0.05,
    suffix: "sn",
    label: "İlk İzlenim Süresi",
    desc: "İlk izlenim oluşması için yeterli süre. Tasarım bu milisaniyede kazanır ya da kaybeder.",
    color: "#0000C8",
    isDecimal: true,
  },
  {
    value: 75,
    suffix: "%",
    label: "Güveni Tasarımdan Ölçüyor",
    desc: "Kullanıcıların %75'i bir markanın güvenilirliğini web sitesinin tasarımından değerlendiriyor.",
    color: "#BE29EC",
  },
];

function CountUp({
  end,
  suffix,
  color,
  isDecimal,
  shouldAnimate,
}: {
  end: number;
  suffix: string;
  color: string;
  isDecimal?: boolean;
  shouldAnimate: boolean;
}) {
  const [display, setDisplay] = useState(isDecimal ? "0.00" : "0");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView || !shouldAnimate) {
      setDisplay(isDecimal ? end.toFixed(2) : String(Math.round(end)));
      return;
    }
    const duration = 1800;
    const start = performance.now();
    const raf = requestAnimationFrame(function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * end;
      setDisplay(isDecimal ? current.toFixed(2) : String(Math.round(current)));
      if (progress < 1) requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(raf);
  }, [isInView, end, shouldAnimate, isDecimal]);

  return (
    <div
      ref={ref}
      className="text-5xl md:text-6xl font-black tracking-tighter"
      style={{ color }}
    >
      {display}
      {suffix}
    </div>
  );
}

export default function WebWhySection() {
  const shouldReduce = useReducedMotion();

  return (
    <section className="relative py-24 md:py-32 border-t border-white/5 bg-brand-dark text-white overflow-hidden">
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-15 blur-[120px]"
        style={{ background: "radial-gradient(circle, #BE29EC, #0000C8)" }}
      />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Başlık */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <ScrollReveal>
            <span className="inline-block px-4 py-1 rounded-full border border-white/10 bg-white/5 text-white/50 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
              Neden Profesyonel Web Sitesi?
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6 leading-tight">
              Dijital Varlığınız{" "}
              <span className="text-brand-purple">Kurumunuzu Temsil Eder</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Web siteniz sadece bir sayfa değil — markanızın dünyaya açılan
              penceresi, kitlenizle kurduğunuz ilk köprü, kurumsal güveninizin
              dijital yansıması.
            </p>
          </ScrollReveal>
        </div>

        {/* 4 fayda kartı */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-16">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={i}
                initial={shouldReduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative rounded-[2rem] border border-white/8 bg-white/[0.02] p-7 flex gap-5 overflow-hidden"
              >
                <div
                  className="absolute -top-8 -right-8 w-28 h-28 rounded-full blur-[50px] opacity-15 pointer-events-none"
                  style={{ background: b.color }}
                />
                <div
                  className="shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center"
                  style={{
                    background: `${b.color}15`,
                    border: `1px solid ${b.color}30`,
                  }}
                >
                  <Icon className="w-5 h-5" style={{ color: b.color }} />
                </div>
                <div>
                  <h3 className="font-black text-sm uppercase tracking-widest text-white mb-2">
                    {b.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 3 stat kartı */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={shouldReduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative rounded-[2rem] border border-white/8 bg-white/[0.02] p-8 flex flex-col gap-4 overflow-hidden"
            >
              <div
                className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[60px] opacity-20 pointer-events-none"
                style={{ background: stat.color }}
              />
              <CountUp
                end={stat.value}
                suffix={stat.suffix}
                color={stat.color}
                isDecimal={stat.isDecimal}
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
          ))}
        </div>
      </div>
    </section>
  );
}
