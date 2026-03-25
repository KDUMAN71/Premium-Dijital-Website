"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useInView,
} from "framer-motion";
import {
  Zap,
  Search,
  BarChart3,
  MonitorSmartphone,
  Cpu,
  LayoutPanelTop,
} from "lucide-react";
import Link from "next/link";

/* ─────────────────────────────────────────────
   Problem sinyalleri export
───────────────────────────────────────────── */
export const PROBLEM_SIGNALS = [
  "Yavaş açılan ve mobilde kullanıcı kaybettiren sayfalar",
  "Teknik altyapısı zayıf ama görsel olarak parlatılmış siteler",
  "Ölçülemeyen kullanıcı aksiyonları ve görünmeyen veri kaybı",
];

export function ProblemSignals() {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {PROBLEM_SIGNALS.map((item) => (
        <div
          key={item}
          className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/6 px-4 py-3 text-sm text-white/70"
        >
          <span className="mt-0.5 shrink-0 text-base leading-none">⚠</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Manifesto verileri
───────────────────────────────────────────── */
const MANIFESTO_ITEMS = [
  {
    id: "strategy",
    icon: <LayoutPanelTop size={18} />,
    title: "Stratejik Temel",
    beforeImage:
      "/img/hizmetler/dijital-mimari/EstetikManifesto-strategy-before-1A.webp",
    afterImage:
      "/img/hizmetler/dijital-mimari/EstetikManifesto-strategy-after-1B.webp",
    old: "Önce tasarımı bitirelim, gerisini sonra hallederiz.",
    new: "Stratejisi kurulmamış bir tasarım sadece dekorasyondur. Mühendislik, ilk pikselden önce başlar.",
    tag: "PLANLAMA",
  },
  {
    id: "speed",
    icon: <Zap size={18} />,
    title: "Hızın Estetiği",
    beforeImage:
      "/img/hizmetler/dijital-mimari/EstetikManifesto-speed-before-2A.webp",
    afterImage:
      "/img/hizmetler/dijital-mimari/EstetikManifesto-speed-after-2B.webp",
    old: "Güzel görünsün, biraz yavaş olsa da olur.",
    new: "Ağırlık bir zenginlik değil, teknik bir zaaftır. Gerçek estetik, milisaniyelik hızın konforuyla mühürlenir.",
    tag: "PERFORMANS",
  },
  {
    id: "seo",
    icon: <Search size={18} />,
    title: "DNA'ya İşlenmiş SEO",
    beforeImage:
      "/img/hizmetler/dijital-mimari/EstetikManifesto-seo-before-3A.webp",
    afterImage:
      "/img/hizmetler/dijital-mimari/EstetikManifesto-seo-after-3B.webp",
    old: "SEO'yu yayından sonra bir ara ekleriz.",
    new: "SEO sonradan eklenmez, yapıya işlenir. Temel atılırken düşünülmeyen SEO, gelecekte yıkıp yeniden inşa etmektir.",
    tag: "GÖRÜNÜRLÜK",
  },
  {
    id: "data",
    icon: <BarChart3 size={18} />,
    title: "Veri Odaklılık",
    beforeImage:
      "/img/hizmetler/dijital-mimari/EstetikManifesto-data-before-4A.webp",
    afterImage:
      "/img/hizmetler/dijital-mimari/EstetikManifesto-data-after-4B.webp",
    old: "Analytics kodu ekledik, yeterli.",
    new: "Kaç kişinin geldiğini bilmek merakı, ne yaptıklarını bilmek ise ciroyu yönetmektir. Her aksiyon görünür olmalı.",
    tag: "ANALİTİK",
  },
  {
    id: "mobile",
    icon: <MonitorSmartphone size={18} />,
    title: "Mobile-First",
    beforeImage:
      "/img/hizmetler/dijital-mimari/EstetikManifesto-mobile-before-5A.webp",
    afterImage:
      "/img/hizmetler/dijital-mimari/EstetikManifesto-mobile-after-5B.webp",
    old: "Masaüstünü mobil ekrana uyduralım.",
    new: "Mobil artık çoğunluk değil, asıldır. Tasarım mobil için doğarsa kusursuzdur, tersi her zaman tavizdir.",
    tag: "MOBİLİTE",
  },
  {
    id: "tech",
    icon: <Cpu size={18} />,
    title: "Teknoloji Yatırımı",
    beforeImage:
      "/img/hizmetler/dijital-mimari/EstetikManifesto-tech-before-6A.webp",
    afterImage:
      "/img/hizmetler/dijital-mimari/EstetikManifesto-tech-after-6B.webp",
    old: "Hazır şablon hızlı olur, sonra geliştiririz.",
    new: "Şablonlar bugünü kurtarır, geleceği ipotek altına alır. Ölçeklenebilir teknoloji, büyümenin önündeki en ucuz sigortadır.",
    tag: "ALTYAPI",
  },
];

const AUTO_INTERVAL = 5000;
const RESUME_DELAY = 5000;
const SCAN_DURATION = (AUTO_INTERVAL / 1000) * 0.9; // 4.5sn — madde değişmeden scan tamamlanır
const CIRCLE_R = 28;
const CIRCLE_C = 2 * Math.PI * CIRCLE_R;

/* ─────────────────────────────────────────────
   DİNAMİK GÖRSEL PANEL (Scan Hızı Interval'e Bağlı)
───────────────────────────────────────────── */
function VisualScanPanel({
  item,
  duration,
}: {
  item: (typeof MANIFESTO_ITEMS)[0];
  duration: number;
}) {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl bg-black border border-white/5 shadow-2xl">
      {/* 1. KATMAN: SONRA (HEDEF) */}
      <img
        src={item.afterImage}
        alt="After"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* 2. KATMAN: ÖNCE (MEVCUT) - Dinamik Key sayesinde her geçişte sıfırlanır */}
      <motion.div
        key={`${item.id}-before`}
        initial={{ clipPath: "inset(0% 0 0 0)" }}
        animate={{ clipPath: "inset(100% 0 0 0)" }}
        transition={{ duration, ease: "linear" }}
        className="absolute inset-0 w-full h-full z-10"
      >
        <img
          src={item.beforeImage}
          alt="Before"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* 3. KATMAN: SCAN ÇİZGİSİ */}
      <motion.div
        key={`${item.id}-line`}
        initial={{ top: "0%" }}
        animate={{ top: "100%" }}
        transition={{ duration, ease: "linear" }}
        className="absolute left-0 right-0 h-[2px] z-20 shadow-[0_0_15px_#be29ec]"
        style={{
          background:
            "linear-gradient(90deg, transparent, #be29ec, #0000c8, transparent)",
        }}
      />
    </div>
  );
}

export default function EsteticManifesto() {
  const [active, setActive] = useState(0);
  const [isAuto, setIsAuto] = useState(true);
  const [progress, setProgress] = useState(0);
  const [tooltip, setTooltip] = useState<number | null>(null);

  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resumeRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  /* Sadece ekranda görününce çalış */
  const isVisible = useInView(sectionRef, { amount: 0.25 });

  const startAuto = useCallback(() => {
    if (prefersReduced) return;
    setIsAuto(true);
    setProgress(0);

    if (progressRef.current) clearInterval(progressRef.current);
    progressRef.current = setInterval(() => {
      setProgress((p) => (p >= 1 ? 1 : p + 0.02));
    }, 100);

    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      setActive((a) => (a + 1) % MANIFESTO_ITEMS.length);
      setProgress(0);
    }, AUTO_INTERVAL);
  }, [prefersReduced]);

  const stopAuto = useCallback(() => {
    setIsAuto(false);
    setProgress(0);
    if (autoRef.current) clearInterval(autoRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
  }, []);

  const handleSelect = useCallback(
    (i: number) => {
      setActive(i);
      stopAuto();
      if (resumeRef.current) clearTimeout(resumeRef.current);
      resumeRef.current = setTimeout(() => startAuto(), RESUME_DELAY);
    },
    [stopAuto, startAuto],
  );

  /* Görünürlüğe göre başlat/durdur */
  useEffect(() => {
    if (isVisible) {
      startAuto();
    } else {
      stopAuto();
    }
    return () => {
      if (autoRef.current) clearInterval(autoRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
      if (resumeRef.current) clearTimeout(resumeRef.current);
    };
  }, [isVisible, startAuto, stopAuto]);

  const dashOffset = CIRCLE_C * (1 - progress);
  const item = MANIFESTO_ITEMS[active];

  return (
    <section
      ref={sectionRef}
      className="relative bg-brand-dark px-4 py-10 sm:px-6 sm:py-12 md:py-16 overflow-visible"
    >
      <div className="mx-auto max-w-[98rem] px-2 overflow-visible">
        <div className="mb-8 md:mb-10">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-purple mb-3">
            Mühendislik Manifestosu
          </p>
          <h3 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase italic leading-none text-white">
            Temelsiz Yapı <span className="text-white/20">Ayakta Durmaz.</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch overflow-visible">
          {/* SOL PANEL (Overflow kaldırıldı) */}
          <div className="lg:col-span-1 flex lg:flex-col items-center justify-center lg:justify-start overflow-visible">
            <div className="flex lg:flex-col gap-4 relative py-2 overflow-visible">
              {MANIFESTO_ITEMS.map((m, i) => {
                const isActive = active === i;
                return (
                  <div key={m.id} className="relative z-50">
                    <AnimatePresence>
                      {tooltip === i && !isActive && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          className="absolute right-full mr-4 top-1/2 -translate-y-1/2 hidden lg:block whitespace-nowrap rounded-lg border border-white/10 bg-[#0a0a0a]/90 backdrop-blur-md px-3 py-1.5 text-[10px] font-bold text-white shadow-2xl z-[100]"
                        >
                          <span className="text-brand-purple mr-2">
                            {String(i + 1).padStart(2, "0")}
                          </span>{" "}
                          {m.title}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <button
                      onClick={() => handleSelect(i)}
                      onMouseEnter={() => setTooltip(i)}
                      onMouseLeave={() => setTooltip(null)}
                      className={`relative flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-500 ${
                        isActive
                          ? "border-brand-purple bg-brand-purple/20 shadow-[0_0_20px_rgba(190,41,236,0.3)] scale-110 text-white"
                          : "border-white/10 bg-white/5 opacity-40 hover:opacity-100 text-white/50"
                      }`}
                    >
                      {isActive && isAuto && (
                        <svg
                          className="absolute -inset-2 h-[3.75rem] w-[3.75rem]"
                          style={{ transform: "rotate(-90deg)" }}
                        >
                          <circle
                            cx="30"
                            cy="30"
                            r={CIRCLE_R}
                            fill="none"
                            stroke="rgba(190,41,236,0.12)"
                            strokeWidth="1.5"
                          />
                          <motion.circle
                            cx="30"
                            cy="30"
                            r={CIRCLE_R}
                            fill="none"
                            stroke="#be29ec"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeDasharray={CIRCLE_C}
                            animate={{ strokeDashoffset: dashOffset }}
                            transition={{ duration: 0.1, ease: "linear" }} // Öneriniz
                          />
                        </svg>
                      )}
                      {m.icon}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SAĞ PANEL */}
          <div className="lg:col-span-11 grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-6 md:p-10 backdrop-blur-3xl overflow-hidden">
            <div className="flex flex-col justify-between gap-6">
              <AnimatePresence>
                <motion.div
                  key={active}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  className="space-y-5 text-white"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-2xl font-black text-brand-purple">
                      {String(active + 1).padStart(2, "0")}
                    </span>
                    <div className="px-3 py-1 rounded-full border border-brand-purple/20 bg-brand-purple/10 text-[9px] font-black tracking-widest text-brand-purple uppercase">
                      {item.tag}
                    </div>
                  </div>
                  <h4 className="text-2xl md:text-3xl font-bold uppercase italic tracking-tighter">
                    {item.title}
                  </h4>
                  <div className="space-y-4">
                    <div className="relative pl-5 border-l border-red-500/25">
                      <p className="text-[10px] font-bold text-red-500/55 uppercase tracking-widest mb-1.5 italic">
                        Geleneksel Yaklaşım
                      </p>
                      <p className="text-[15px] text-white/40 line-through italic leading-relaxed">
                        {item.old}
                      </p>
                    </div>
                    <div className="relative pl-5 border-l-2 border-brand-blue/50 bg-brand-blue/5 py-3 pr-4 rounded-r-xl">
                      <p className="text-[10px] font-bold text-brand-blue uppercase tracking-widest mb-1.5">
                        Mühendislik Yaklaşımı
                      </p>
                      <p className="text-[17px] md:text-[18px] font-bold text-white leading-snug italic">
                        {item.new}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link
                  href="/iletisim"
                  className="flex items-center justify-center rounded-xl bg-gradient-to-r from-[#be29ec] to-[#0000c8] py-3 text-[11px] font-black uppercase tracking-widest text-white transition-transform hover:scale-105"
                >
                  BAŞLAYALIM →
                </Link>
                <Link
                  href="/iletisim"
                  className="flex items-center justify-center rounded-xl border border-white/10 bg-white/5 py-3 text-[11px] font-black uppercase tracking-widest text-white/50 hover:bg-white/10 transition-colors"
                >
                  MODERNİZE ET →
                </Link>
              </div>
            </div>

            <div className="hidden lg:flex items-center justify-center relative aspect-square">
              <AnimatePresence>
                <motion.div
                  key={active}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0"
                >
                  <VisualScanPanel item={item} duration={SCAN_DURATION} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
