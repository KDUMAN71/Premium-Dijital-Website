"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React from "react";
import Image from "next/image";

export default function HeroMotion() {
  const { scrollY } = useScroll();

  // Görselin scroll ile hafif küçülmesi ve kaybolması (Odak metinde kalsın diye)
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 0.9]);
  const y = useTransform(scrollY, [0, 400], [0, 50]);

  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden pointer-events-none">
      <motion.div
        style={{ opacity, scale, y }}
        className="relative w-full h-full max-w-[1200px] flex items-center justify-center"
      >
        {/* ANA GÖRSEL: Senin istediğin o etkileyici pusula görseli */}
        <div className="relative w-full h-[80%] md:h-full opacity-60">
          <Image
            src="/img/hero/hero-pusula.webp" // Görsel yolunun doğruluğunu kontrol et hocam
            alt="Premium Pusula"
            fill
            priority
            className="object-contain object-center"
          />
        </div>

        {/* Arka Plan Glow: Görseli derinleştiren mavi ışıma */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,100,255,0.15)_0%,transparent_70%)]" />
      </motion.div>

      {/* Teknik Detaylar (Sadece dekoratif kalsın diye) */}
      <div className="absolute inset-0 opacity-10 font-mono text-[10px] uppercase tracking-[0.5em] text-white">
        <div className="absolute top-20 left-10">System_Active // PD_ARCH</div>
        <div className="absolute bottom-20 right-10 italic">
          Premium_Digital_2026
        </div>
      </div>
    </div>
  );
}
