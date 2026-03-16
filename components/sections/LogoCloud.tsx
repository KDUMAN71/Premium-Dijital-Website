// components/sections/LogoCloud.tsx
"use client";

import { motion } from "framer-motion";

const logos = [
  { name: "Google Analytics", src: "/img/logos/google_analytics.svg" },
  { name: "Google Ads", src: "/img/logos/google-ads.svg" },
  { name: "Google Cloud", src: "/img/logos/google_cloud.svg" },
  { name: "Next.js", src: "/img/logos/nextjs.svg" },
  { name: "Facebook", src: "/img/logos/facebook.svg" },
  { name: "WordPress", src: "/img/logos/wordpress.svg" },
  { name: "React", src: "/img/logos/reactjs.svg" },
  { name: "Shopify", src: "/img/logos/shopify.svg" },
];

const duplicatedLogos = [...logos, ...logos, ...logos];

export default function LogoCloud() {
  return (
    <section className="py-12 sm:py-14 bg-brand-dark relative overflow-hidden border-y border-white/5">
      <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-brand-dark via-brand-dark/90 to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-brand-dark via-brand-dark/90 to-transparent z-10" />

      <div className="max-w-7xl mx-auto px-6 mb-8 sm:mb-10 text-center">
        <p className="text-[11px] uppercase tracking-[0.18em] text-white/50 font-bold">
          Kullandığımız Teknolojiler & Operasyon Standartları
        </p>
      </div>

      <div className="flex overflow-hidden">
        <motion.div
          className="flex gap-32 items-center whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 40,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {duplicatedLogos.map((logo, index) => (
            <div
              key={index}
              className="group relative flex items-center justify-center w-[220px] h-24"
            >
              <div className="absolute inset-0 bg-brand-blue/20 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <img
                src={logo.src}
                alt={logo.name}
                className="h-14 md:h-16 w-auto max-w-[180px] object-contain opacity-45 grayscale invert brightness-[1.8] contrast-100 group-hover:opacity-100 group-hover:grayscale-0 group-hover:invert-0 group-hover:brightness-100 transition-all duration-700 relative z-10 filter"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
