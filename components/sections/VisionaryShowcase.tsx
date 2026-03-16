"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MoveUpRight, Maximize2, Layers, PenTool, Layout } from "lucide-react";

export default function VisionaryShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scanPos = useTransform(scrollYProgress, [0.2, 0.8], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative bg-[#050507] py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Başlık ve Vizyon */}
        <div className="mb-20 grid lg:grid-cols-2 gap-10 items-end">
          <div>
            <p className="text-brand-purple text-[10px] font-black uppercase tracking-[0.4em] mb-4">
              Görsel Standartlar
            </p>
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter uppercase italic leading-none">
              Estetik <span className="text-white/20">Disiplini.</span>
            </h2>
          </div>
          <p className="text-white/40 text-lg leading-relaxed italic max-w-md">
            "Bizim için tasarım, sadece renklerin uyumu değil; kullanıcının
            zihnindeki rotayı en şık şekilde çizen bir mühendislik
            disiplinidir."
          </p>
        </div>

        {/* Ana Showcase Alanı */}
        <div className="relative group cursor-crosshair">
          {/* Blueprint Izgarası (Arka Plan) */}
          <div
            className="absolute inset-0 z-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(rgba(190,41,236,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(190,41,236,0.1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Masterpiece Görsel Alanı */}
          <div className="relative z-10 aspect-[16/9] md:aspect-[21/9] rounded-[2.5rem] border border-white/10 overflow-hidden bg-[#0a0a0c] shadow-2xl">
            {/* 1. KATMAN: Blueprint (Teknik Çizim Efekti) */}
            <div className="absolute inset-0 grayscale opacity-40 mix-blend-screen pointer-events-none">
              {/* Buraya teknik çizim gibi görünen bir UI mockup gelecek */}
              <div className="w-full h-full flex items-center justify-center border-2 border-dashed border-white/10 text-white/5 font-mono text-[10vw] font-black italic">
                PRECISION
              </div>
            </div>

            {/* 2. KATMAN: Renkli/Final Görsel (Scan ile Açılır) */}
            <motion.div
              className="absolute inset-0 z-10 overflow-hidden"
              style={{ clipPath: `inset(0 0 0 ${scanPos})` }}
            >
              {/* Buraya yüksek kaliteli final UI tasarımı gelecek */}
              <div className="w-full h-full bg-gradient-to-br from-[#0000C8]/20 via-[#BE29EC]/10 to-transparent flex items-center justify-center border-l-2 border-brand-purple">
                <div className="w-3/4 h-3/4 rounded-3xl bg-white/5 backdrop-blur-3xl border border-white/10 shadow-[0_0_100px_rgba(190,41,236,0.1)] p-8">
                  <div className="h-4 w-1/4 bg-white/10 rounded-full mb-4" />
                  <div className="h-12 w-3/4 bg-white/5 rounded-2xl mb-12" />
                  <div className="grid grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="aspect-square rounded-2xl bg-white/[0.03] border border-white/5"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* SCAN ÇİZGİSİ */}
            <motion.div
              className="absolute top-0 bottom-0 w-px z-20 shadow-[0_0_20px_#be29ec]"
              style={{
                left: scanPos,
                background:
                  "linear-gradient(to bottom, transparent, #be29ec, #0000c8, transparent)",
              }}
            />

            {/* Bilgi Pinleri (Sessiz Güç Detayları) */}
            <div className="absolute top-10 right-10 z-30 space-y-4">
              <DetailPin
                icon={<Maximize2 size={12} />}
                label="Optik Denge"
                value="Fixed 1.618"
              />
              <DetailPin
                icon={<PenTool size={12} />}
                label="Tipografi"
                value="Piksel Hassasiyetli"
              />
              <DetailPin
                icon={<Layout size={12} />}
                label="Grid Sistemi"
                value="8px Adaptive"
              />
            </div>
          </div>
        </div>

        {/* Alt Bilgi Kartları */}
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <FeatureCard
            title="Kinetik Akış"
            desc="Statik sayfalardan kaçınıyoruz. Tasarımlarımız, kullanıcının dikkatini yöneten ipeksi bir akışa sahiptir."
          />
          <FeatureCard
            title="Kromatik Derinlik"
            desc="Markanızın renklerini, dijital prestiji temsil eden karanlık modun derinliğiyle mühürlüyoruz."
          />
          <FeatureCard
            title="Sıfır Taviz"
            desc="Her proje, ajansımızın tasarım çıtasını temsil eder. Hiçbir piksel rastgele yerleştirilmez."
          />
        </div>
      </div>
    </section>
  );
}

function DetailPin({
  icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 bg-black/60 backdrop-blur-xl border border-white/10 p-2 rounded-xl pr-4 group-hover:scale-105 transition-transform">
      <div className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center text-brand-purple">
        {icon}
      </div>
      <div>
        <p className="text-[8px] font-black text-white/30 uppercase tracking-widest">
          {label}
        </p>
        <p className="text-[10px] font-bold text-white uppercase">{value}</p>
      </div>
    </div>
  );
}

function FeatureCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="p-8 rounded-[2rem] border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors">
      <h4 className="text-white font-bold mb-3 uppercase tracking-tighter italic">
        {title}
      </h4>
      <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
