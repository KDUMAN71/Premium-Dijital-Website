"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const items = [
  { href: "/", label: "Anasayfa" },
  { href: "/hizmetler", label: "Hizmetler" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/vaka-calismalari", label: "Vaka Çalışmaları" },
  { href: "/blog", label: "Blog" },
  { href: "/iletisim", label: "İletişim" },
];

export default function MarketingNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop Nav - Mevcut Premium Görünüm Korundu */}
      <nav className="hidden md:flex items-center gap-1" aria-label="Ana menü">
        {items.map((it) => (
          <Link
            key={it.href}
            href={it.href}
            className="px-5 py-2 text-[15px] font-semibold text-white/80 transition-all hover:text-white hover:bg-white/5 rounded-full"
          >
            {it.label}
          </Link>
        ))}
      </nav>

      {/* Mobil Hamburger Butonu - Daha Şık ve Hareketli */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="md:hidden relative z-[120] flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 transition-colors hover:bg-white/10"
      >
        <span
          className={`h-0.5 w-5 bg-white transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`}
        />
        <span
          className={`h-0.5 w-5 bg-white transition-all duration-300 ${open ? "opacity-0" : ""}`}
        />
        <span
          className={`h-0.5 w-5 bg-white transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`}
        />
      </button>

      {/* Mobil Panel - Yukarıdan Aşağı Süzülen Premium Efekt */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute left-0 right-0 top-20 z-[110] overflow-hidden border-b border-white/10 bg-brand-dark/95 backdrop-blur-2xl md:hidden"
          >
            <nav className="flex flex-col gap-4 p-8">
              {items.map((it, idx) => (
                <motion.div
                  key={it.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link
                    href={it.href}
                    onClick={() => setOpen(false)}
                    className="text-xl font-bold uppercase tracking-widest text-white/90 hover:text-brand-blue transition-colors"
                  >
                    {it.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
