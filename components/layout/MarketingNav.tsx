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
      {/* Desktop Nav - Zarif Hover Etkisi */}
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

      {/* Mobile button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="md:hidden flex h-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 text-xs font-bold uppercase tracking-widest"
      >
        Menü
      </button>

      {/* Mobile Panel (Açıldığında) */}
      {open && (
        <div className="absolute left-0 right-0 top-20 z-[110] border-b border-white/10 bg-brand-dark/95 p-6 backdrop-blur-2xl md:hidden">
          <div className="flex flex-col gap-4">
            {items.map((it) => (
              <Link
                key={it.href}
                href={it.href}
                onClick={() => setOpen(false)}
                className="text-xl font-bold"
              >
                {it.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
