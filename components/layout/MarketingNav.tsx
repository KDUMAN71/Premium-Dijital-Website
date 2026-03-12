"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";

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
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-1" aria-label="Ana menü">
        {items.map((it) => {
          const isActive =
            it.href === "/" ? pathname === "/" : pathname.startsWith(it.href);

          return (
            <Link
              key={it.href}
              href={it.href}
              className={cn(
                "relative px-4 py-2 text-[14px] font-semibold transition-all duration-200 rounded-full",
                isActive
                  ? "text-white"
                  : "text-white/65 hover:text-white hover:bg-white/5",
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="nav-active-pill"
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(190,41,236,0.2), rgba(0,0,200,0.2))",
                    border: "1px solid rgba(190,41,236,0.3)",
                  }}
                  transition={{ type: "spring", duration: 0.4 }}
                />
              )}
              <span className="relative z-10">{it.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Mobil Hamburger */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
        aria-expanded={open}
        className="md:hidden relative z-[120] flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 transition-colors hover:bg-white/10"
      >
        <span
          className={cn(
            "h-0.5 w-5 bg-white transition-all duration-300",
            open && "rotate-45 translate-y-2",
          )}
        />
        <span
          className={cn(
            "h-0.5 w-5 bg-white transition-all duration-300",
            open && "opacity-0 scale-x-0",
          )}
        />
        <span
          className={cn(
            "h-0.5 w-5 bg-white transition-all duration-300",
            open && "-rotate-45 -translate-y-2",
          )}
        />
      </button>

      {/* Mobil Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute left-0 right-0 top-full z-[110] border-b border-white/10 bg-[#050505]/98 backdrop-blur-2xl md:hidden"
          >
            <nav
              className="flex flex-col px-6 py-6 gap-1"
              aria-label="Mobil menü"
            >
              {items.map((it, idx) => {
                const isActive =
                  it.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(it.href);

                return (
                  <motion.div
                    key={it.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04, duration: 0.25 }}
                  >
                    <Link
                      href={it.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-4 py-3.5 text-[15px] font-semibold transition-all",
                        isActive
                          ? "text-white bg-white/8"
                          : "text-white/65 hover:text-white hover:bg-white/5",
                      )}
                    >
                      {isActive && (
                        <span
                          className="h-1.5 w-1.5 rounded-full shrink-0"
                          style={{
                            background:
                              "linear-gradient(135deg, #be29ec, #0000c8)",
                          }}
                        />
                      )}
                      {it.label}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: items.length * 0.04 + 0.05 }}
                className="mt-4 pt-4 border-t border-white/8"
              >
                <Link
                  href="/iletisim#analiz"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center rounded-xl px-6 py-4 text-[15px] font-bold text-white w-full"
                  style={{
                    background: "linear-gradient(90deg, #be29ec, #0000c8)",
                  }}
                >
                  Ücretsiz Analiz Başlat
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
