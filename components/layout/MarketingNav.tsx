"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Crosshair, LayoutPanelTop, Palette, Workflow } from "lucide-react";
import { cn } from "@/utils/cn";

/* ─────────────────────────────────────────────
   Sabitler
───────────────────────────────────────────── */
const SERVICES = [
  {
    href: "/cozumler/ppc-performans-pazarlama",
    label: "PPC & Performans Pazarlama",
    desc: "Google Ads, Meta Ads, ölçülebilir ROAS",
    icon: Crosshair,
  },
  {
    href: "/cozumler/web-seo-donusum",
    label: "Web Sitesi, SEO & Dönüşüm",
    desc: "Teknik altyapı, organik büyüme, CRO",
    icon: LayoutPanelTop,
  },
  {
    href: "/cozumler/marka-gorsel-iletisim",
    label: "Marka & Görsel İletişim",
    desc: "Kimlik, UI/UX, stratejik içerik",
    icon: Palette,
  },
  {
    href: "/cozumler/dijital-operasyon-sistemi",
    label: "Dijital Operasyon Sistemi",
    desc: "CRM, otomasyon, AI iş akışları",
    icon: Workflow,
  },
];

const NAV_ITEMS = [
  { href: "/", label: "Anasayfa" },
  { href: "/cozumler", label: "Çözümler", hasDropdown: true },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/sonuclar", label: "Sonuçlar" },
  { href: "/blog", label: "Blog" },
  { href: "/iletisim", label: "İletişim" },
];

/* ─────────────────────────────────────────────
   Dropdown — ayrı bileşen
───────────────────────────────────────────── */
function ServicesDropdown({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.97 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      className="absolute left-1/2 top-full mt-3 w-[520px] -translate-x-1/2 overflow-hidden rounded-2xl border border-white/10 bg-[#060606]/98 backdrop-blur-2xl"
      style={{
        boxShadow:
          "0 24px 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(190,41,236,0.1)",
      }}
    >
      <div className="border-b border-white/6 px-5 py-3.5">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
          Hizmet Alanları
        </p>
      </div>

      <div className="p-2">
        {SERVICES.map((s) => {
          const Icon = s.icon;

          return (
            <Link
              key={s.href}
              href={s.href}
              onClick={onClose}
              className="group flex items-center gap-4 rounded-xl px-4 py-3.5 transition-all duration-200 hover:bg-white/[0.06]"
            >
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-200 group-hover:scale-[1.05]"
                style={{
                  background:
                    "linear-gradient(135deg,rgba(190,41,236,0.12),rgba(0,0,200,0.12))",
                  border: "1px solid rgba(190,41,236,0.18)",
                }}
              >
                <Icon
                  className="h-[18px] w-[18px] text-white/75 transition-colors group-hover:text-white"
                  strokeWidth={1.8}
                />
              </span>

              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-white/75 transition-colors group-hover:text-white">
                  {s.label}
                </p>
                <p className="mt-0.5 text-[11px] text-white/35">{s.desc}</p>
              </div>

              <span className="shrink-0 text-[11px] text-white/0 transition-all group-hover:translate-x-0.5 group-hover:text-white/30">
                →
              </span>
            </Link>
          );
        })}
      </div>

      <div className="border-t border-white/6 px-5 py-3.5">
        <Link
          href="/cozumler"
          onClick={onClose}
          className="group flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.2em] text-white/35 transition-colors hover:text-white"
        >
          <span>Tüm Çözümleri İncele</span>
          <span className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   MarketingNav
───────────────────────────────────────────── */
export default function MarketingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const handleDropdownEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    closeTimer.current = setTimeout(() => setDropdownOpen(false), 180);
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-[100] transition-all duration-500",
        scrolled
          ? "border-b border-white/8 bg-[#050505]/92 backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      {/* ── Ana bar ── */}
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="group flex shrink-0 items-center gap-3.5">
          <span
            className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-[1.04]"
            style={{
              background: "linear-gradient(135deg,#be29ec,#0000c8)",
              boxShadow:
                "0 0 22px rgba(190,41,236,0.35), 0 0 40px rgba(0,0,200,0.2)",
            }}
          >
            <span className="flex h-[calc(100%-2px)] w-[calc(100%-2px)] items-center justify-center rounded-[14px] bg-[#050505]">
              <Image
                src="/img/premiumdijital-logo.webp"
                alt="Premium Dijital Reklam Ajansı"
                width={120}
                height={86}
                className="h-auto w-full object-contain p-1"
                priority
              />
            </span>
          </span>

          {/* Tek satır marka */}
          <span
            className="text-[18px] font-black uppercase tracking-[0.04em]"
            style={{
              background: "linear-gradient(90deg,#ffffff,#be29ec,#0000c8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Premium Dijital
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Ana menü"
        >
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);

            if (item.hasDropdown) {
              return (
                <div
                  key={item.href}
                  ref={dropdownRef}
                  className="relative"
                  onMouseEnter={handleDropdownEnter}
                  onMouseLeave={handleDropdownLeave}
                >
                  <button
                    type="button"
                    onClick={() => setDropdownOpen((v) => !v)}
                    aria-expanded={dropdownOpen}
                    aria-haspopup="true"
                    className={cn(
                      "flex items-center gap-1.5 rounded-full px-4 py-2.5 text-[14px] font-medium transition-all duration-200",
                      active || dropdownOpen
                        ? "text-white"
                        : "text-white/70 hover:text-white",
                    )}
                  >
                    <span
                      className={cn(
                        "relative transition-all duration-200",
                        active || dropdownOpen
                          ? "[text-shadow:0_0_16px_rgba(190,41,236,0.12)]"
                          : "",
                      )}
                    >
                      {item.label}
                      {active && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full"
                          style={{
                            background:
                              "linear-gradient(90deg,#be29ec,#0000c8)",
                            boxShadow: "0 0 10px rgba(190,41,236,0.25)",
                          }}
                          transition={{
                            type: "spring",
                            bounce: 0.2,
                            duration: 0.4,
                          }}
                        />
                      )}
                    </span>

                    <motion.span
                      className="text-[9px] text-white/40"
                      animate={{ rotate: dropdownOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      ▾
                    </motion.span>
                  </button>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <ServicesDropdown
                        onClose={() => setDropdownOpen(false)}
                      />
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-full px-4 py-2.5 text-[14px] font-medium transition-all duration-200",
                  active ? "text-white" : "text-white/70 hover:text-white",
                )}
              >
                <span
                  className={cn(
                    "relative transition-all duration-200",
                    active
                      ? "[text-shadow:0_0_16px_rgba(190,41,236,0.12)]"
                      : "",
                  )}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full"
                      style={{
                        background: "linear-gradient(90deg,#be29ec,#0000c8)",
                        boxShadow: "0 0 10px rgba(190,41,236,0.25)",
                      }}
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.4,
                      }}
                    />
                  )}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center md:flex">
          <Link
            href="/#analiz"
            className="group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-xl px-5 text-[12px] font-bold uppercase tracking-[0.05em] text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: "linear-gradient(90deg,#be29ec,#0000c8)",
              boxShadow:
                "0 0 14px rgba(190,41,236,0.22), 0 0 32px rgba(0,0,200,0.10)",
            }}
          >
            <span className="absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/18 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative z-10">Ücretsiz Analiz</span>
          </Link>
        </div>

        {/* Mobil hamburger */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={mobileOpen}
          className="relative z-[120] flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-xl border border-white/15 bg-white/5 transition-colors hover:bg-white/10 md:hidden"
        >
          <span
            className={cn(
              "h-[2px] w-5 rounded-full bg-white transition-all duration-300",
              mobileOpen && "translate-y-[7px] rotate-45",
            )}
          />
          <span
            className={cn(
              "h-[2px] w-5 rounded-full bg-white transition-all duration-300",
              mobileOpen && "scale-x-0 opacity-0",
            )}
          />
          <span
            className={cn(
              "h-[2px] w-5 rounded-full bg-white transition-all duration-300",
              mobileOpen && "-translate-y-[7px] -rotate-45",
            )}
          />
        </button>
      </div>

      {/* ── Mobil panel ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="absolute left-0 right-0 top-full border-b border-white/8 bg-[#050505]/98 backdrop-blur-2xl md:hidden"
          >
            <nav
              className="flex flex-col gap-1 px-5 py-5"
              aria-label="Mobil menü"
            >
              {NAV_ITEMS.map((item, idx) => {
                const active = isActive(item.href);

                if (item.hasDropdown) {
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.04, duration: 0.22 }}
                    >
                      <button
                        type="button"
                        onClick={() => setMobileServicesOpen((v) => !v)}
                        className={cn(
                          "flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-[15px] font-semibold transition-all",
                          active || mobileServicesOpen
                            ? "bg-white/8 text-white"
                            : "text-white/70 hover:bg-white/5 hover:text-white",
                        )}
                      >
                        <span>{item.label}</span>
                        <motion.span
                          className="text-[11px] text-white/35"
                          animate={{ rotate: mobileServicesOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          ▾
                        </motion.span>
                      </button>

                      <AnimatePresence>
                        {mobileServicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{
                              duration: 0.22,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            className="overflow-hidden"
                          >
                            <div className="ml-4 mt-1 flex flex-col gap-0.5 border-l border-white/8 pb-2 pl-4">
                              {SERVICES.map((s) => {
                                const Icon = s.icon;

                                return (
                                  <Link
                                    key={s.href}
                                    href={s.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium text-white/60 transition-all hover:bg-white/5 hover:text-white"
                                  >
                                    <Icon
                                      className="h-4 w-4 shrink-0 text-white/45"
                                      strokeWidth={1.8}
                                    />
                                    <span className="min-w-0">{s.label}</span>
                                  </Link>
                                );
                              })}

                              <Link
                                href="/cozumler"
                                onClick={() => setMobileOpen(false)}
                                className="mt-1 px-3 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-white/30 transition-colors hover:text-white"
                              >
                                Tüm Çözümler →
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                }

                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04, duration: 0.22 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-4 py-3.5 text-[15px] font-semibold transition-all",
                        active
                          ? "bg-white/8 text-white"
                          : "text-white/70 hover:bg-white/5 hover:text-white",
                      )}
                    >
                      {active && (
                        <span
                          className="h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{
                            background:
                              "linear-gradient(135deg,#be29ec,#0000c8)",
                            boxShadow: "0 0 6px rgba(190,41,236,0.6)",
                          }}
                        />
                      )}
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}

              {/* Mobil CTA */}
              <motion.div
                className="mt-3 flex flex-col gap-2 border-t border-white/8 pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: NAV_ITEMS.length * 0.04 + 0.06 }}
              >
                <Link
                  href="/#analiz"
                  onClick={() => setMobileOpen(false)}
                  className="group relative flex w-full items-center justify-center overflow-hidden rounded-xl px-6 py-4 text-[15px] font-bold text-white"
                  style={{
                    background: "linear-gradient(90deg,#be29ec,#0000c8)",
                    boxShadow: "0 0 20px rgba(190,41,236,0.35)",
                  }}
                >
                  <span className="absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <span className="relative z-10">Ücretsiz Analiz Başlat</span>
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
