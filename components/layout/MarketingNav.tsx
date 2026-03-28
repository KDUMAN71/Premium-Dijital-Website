"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Crosshair,
  LayoutPanelTop,
  Palette,
  Workflow,
  Target,
  Instagram,
  Youtube,
  Share2,
  FileText,
  Code,
  ShoppingBag,
  TrendingUp,
  Wrench,
  UserCheck,
  Map,
  Camera,
  Mic,
  Cpu,
  Database,
  Repeat,
  PieChart,
} from "lucide-react";
import { cn } from "@/utils/cn";

/* ─────────────────────────────────────────────
   Hizmet Katmanları - Optimize Edilmiş Başlıklar
───────────────────────────────────────────── */
const SERVICES = [
  {
    title: "PPC & Performans",
    icon: Crosshair,
    color: "from-[#0000C8]/20 to-[#BE29EC]/20",
    href: "/hizmetler/performans-pazarlama",
    subServices: [
      {
        label: "Google Ads Yönetimi",
        href: "/hizmetler/performans-pazarlama/google-ads-yonetimi",
        icon: Target,
      },
      {
        label: "Meta Ads Yönetimi",
        href: "/hizmetler/performans-pazarlama/meta-ads",
        icon: Instagram,
      },
      {
        label: "YouTube & Video Pazarlama",
        href: "/hizmetler/performans-pazarlama/video-pazarlama",
        icon: Youtube,
      },
      {
        label: "Sosyal Medya Reklamları",
        href: "/hizmetler/performans-pazarlama/sosyal-medya-reklamlari",
        icon: Share2,
      },
      {
        label: "Landing Page Tasarımları",
        href: "/hizmetler/performans-pazarlama/landing-pages",
        icon: FileText,
      },
    ],
  },
  {
    title: "Dijital Mimari",
    icon: LayoutPanelTop,
    color: "from-blue-500/10 to-[#0000C8]/10",
    href: "/hizmetler/dijital-mimari",
    subServices: [
      {
        label: "Özel Web Tasarımı",
        href: "/hizmetler/dijital-mimari/web-tasarim",
        icon: Code,
      },
      {
        label: "E-Ticaret & UX Mimari",
        href: "/hizmetler/dijital-mimari/e-ticaret",
        icon: ShoppingBag,
      },
      {
        label: "SEO & Organik Büyüme",
        href: "/hizmetler/dijital-mimari/seo",
        icon: TrendingUp,
      },
      {
        label: "Hazır Sistemler (CMS/CRM)",
        href: "/hizmetler/dijital-mimari/hazir-sistemler",
        icon: Wrench,
      },
      {
        label: "Dönüşüm Optimizasyonu (CRO)",
        href: "/hizmetler/dijital-mimari/cro",
        icon: UserCheck,
      },
    ],
  },
  {
    title: "Marka & Strateji",
    icon: Palette,
    color: "from-[#BE29EC]/10 to-purple-500/10",
    href: "/hizmetler/marka-stratejisi",
    subServices: [
      {
        label: "Stratejik Yol Haritası",
        href: "/hizmetler/marka-stratejisi/yol-haritasi",
        icon: Map,
      },
      {
        label: "Kurumsal Kimlik Tasarımı",
        href: "/hizmetler/marka-stratejisi/kurumsal-kimlik",
        icon: Palette,
      },
      {
        label: "Medya & Prodüksiyon",
        href: "/hizmetler/marka-stratejisi/medya-uretimi",
        icon: Camera,
      },
      {
        label: "Bütünsel Marka Sesi",
        href: "/hizmetler/marka-stratejisi/marka-sesi",
        icon: Mic,
      },
    ],
  },
  {
    title: "Dijital Operasyon",
    icon: Workflow,
    color: "from-emerald-500/10 to-teal-500/10",
    href: "/hizmetler/dijital-operasyon",
    subServices: [
      {
        label: "AI & İş Akış Otomasyonu",
        href: "/hizmetler/dijital-operasyon/otomasyon",
        icon: Cpu,
      },
      {
        label: "Kurumsal Bilgi Sistemleri",
        href: "/hizmetler/dijital-operasyon/bilgi-sistemleri",
        icon: Database,
      },
      {
        label: "Otonom Satış Makinesi",
        href: "/hizmetler/dijital-operasyon/satis-makinesi",
        icon: Repeat,
      },
      {
        label: "Veri Zekası & Ölçümleme",
        href: "/hizmetler/dijital-operasyon/veri-zekasi",
        icon: PieChart,
      },
    ],
  },
];

const NAV_ITEMS = [
  { href: "/", label: "Anasayfa" },
  { href: "/hizmetler", label: "Hizmetler", hasDropdown: true },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/basari-hikayeleri", label: "Başarı Hikayeleri" },
  { href: "/blog", label: "Blog" },
  { href: "/iletisim", label: "İletişim" },
];

function ServicesDropdown({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.99 }}
      transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
      className="absolute left-1/2 top-full mt-4 w-[1080px] -translate-x-1/2 overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#060606]/98 p-1 backdrop-blur-3xl"
      style={{ boxShadow: "0 40px 100px rgba(0,0,0,0.9)" }}
    >
      <div className="grid grid-cols-4 gap-2 p-3">
        {SERVICES.map((cat) => (
          <div
            key={cat.title}
            className="group/cat rounded-3xl bg-white/[0.02] p-5 transition-colors hover:bg-white/[0.04]"
          >
            <Link
              href={cat.href}
              onClick={onClose}
              className="flex items-center gap-3.5 mb-6 group"
            >
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br border border-white/10 transition-transform group-hover:scale-110 shadow-lg shadow-black/50",
                  cat.color,
                )}
              >
                <cat.icon size={20} className="text-white/80" />
              </div>
              <h3 className="text-[11px] font-black uppercase tracking-widest text-white/90 group-hover:text-brand-blue transition-colors leading-tight">
                {cat.title}
              </h3>
            </Link>
            <div className="flex flex-col gap-1.5">
              {cat.subServices.map((sub) => (
                <Link
                  key={sub.href}
                  href={sub.href}
                  onClick={onClose}
                  className="group/sub flex items-start gap-3.5 rounded-lg px-2 py-2 transition-all hover:bg-white/5"
                >
                  <sub.icon
                    size={16}
                    className="text-white/25 group-hover/sub:text-brand-blue transition-colors shrink-0 mt-0.5"
                  />
                  <span className="text-[12px] font-medium text-white/45 group-hover/sub:text-white/90 transition-colors leading-tight">
                    {sub.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-white/5 bg-white/[0.01] px-8 py-4">
        <Link
          href="/hizmetler"
          onClick={onClose}
          className="group flex items-center justify-between text-[9px] font-black uppercase tracking-[0.4em] text-white/25 hover:text-white transition-colors"
        >
          <span>Dijital Büyüme Mimarisini Keşfedin</span>
          <span className="group-hover:translate-x-1 transition-transform">
            →
          </span>
        </Link>
      </div>
    </motion.div>
  );
}

export default function MarketingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleDropdownEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    closeTimer.current = setTimeout(() => setDropdownOpen(false), 200);
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
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="group flex items-center gap-3.5">
          <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#BE29EC] to-[#0000C8] shadow-lg shadow-[#BE29EC]/20">
            <span className="flex h-[calc(100%-2px)] w-[calc(100%-2px)] items-center justify-center rounded-[10px] bg-[#050505]">
              <Image
                src="/img/brand/premiumdijital-logo.webp"
                alt="Logo"
                width={90}
                height={60}
                className="object-contain p-1"
                priority
              />
            </span>
          </span>
          <span className="text-[16px] font-black uppercase tracking-tight text-white">
            Premium Dijital
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <div
              key={item.href}
              onMouseEnter={item.hasDropdown ? handleDropdownEnter : undefined}
              onMouseLeave={item.hasDropdown ? handleDropdownLeave : undefined}
              className="relative"
            >
              <Link
                href={item.href}
                className={cn(
                  "relative px-4 py-2.5 text-[13px] font-medium transition-colors",
                  isActive(item.href)
                    ? "text-white"
                    : "text-white/65 hover:text-white",
                )}
              >
                {item.label}
                {isActive(item.href) && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-gradient-to-r from-[#BE29EC] to-[#0000C8]"
                  />
                )}
                {item.hasDropdown && (
                  <span className="ml-1 text-[9px] text-white/30">▾</span>
                )}
              </Link>
              <AnimatePresence>
                {item.hasDropdown && dropdownOpen && (
                  <ServicesDropdown onClose={() => setDropdownOpen(false)} />
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        <Link
          href="/iletisim#analiz"
          className="hidden md:block rounded-xl bg-gradient-to-r from-[#BE29EC] to-[#0000C8] px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest text-white transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(190,41,236,0.3)]"
        >
          Ücretsiz Analiz
        </Link>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white/70"
        >
          <Workflow size={24} />
        </button>
      </div>
    </header>
  );
}
