"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────
   SVG İllüstrasyonlar — her aşama için
───────────────────────────────────────────── */

/** 01 Analiz — karmaşık ağ netleşiyor */
function IllustrationAnaliz({ active }: { active: boolean }) {
  const nodes = [
    { cx: 80, cy: 60, r: 5 },
    { cx: 200, cy: 40, r: 4 },
    { cx: 300, cy: 80, r: 6 },
    { cx: 150, cy: 130, r: 5 },
    { cx: 260, cy: 150, r: 4 },
    { cx: 60, cy: 160, r: 3 },
    { cx: 340, cy: 50, r: 3 },
  ];
  const edges = [
    [0, 1],
    [1, 2],
    [0, 3],
    [3, 4],
    [2, 4],
    [1, 3],
    [5, 3],
    [2, 6],
    [6, 1],
  ];
  return (
    <svg viewBox="0 0 400 200" className="w-full" aria-hidden="true">
      <defs>
        <radialGradient id="ana-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#be29ec" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#be29ec" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Arka plan glow */}
      <ellipse cx="200" cy="100" rx="180" ry="90" fill="url(#ana-glow)" />
      {/* Kenarlar */}
      {edges.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={nodes[a].cx}
          y1={nodes[a].cy}
          x2={nodes[b].cx}
          y2={nodes[b].cy}
          stroke="#be29ec"
          strokeWidth="1"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: active ? 0.3 : 0.08, pathLength: 1 }}
          transition={{ delay: i * 0.08, duration: 0.6 }}
        />
      ))}
      {/* Merkezde parlayan "odak" halkası */}
      <motion.circle
        cx="200"
        cy="100"
        r="30"
        fill="none"
        stroke="#be29ec"
        strokeWidth="1"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: active ? 0.25 : 0.08, scale: active ? 1 : 0.7 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        style={{ transformOrigin: "200px 100px" }}
      />
      {/* Node'lar */}
      {nodes.map((n, i) => (
        <motion.circle
          key={i}
          cx={n.cx}
          cy={n.cy}
          r={n.r}
          fill={i === 3 ? "#be29ec" : "rgba(190,41,236,0.4)"}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: active ? 1 : 0.3, scale: 1 }}
          transition={{ delay: i * 0.07, duration: 0.4, ease: "backOut" }}
          style={{ transformOrigin: `${n.cx}px ${n.cy}px` }}
        />
      ))}
      {/* Merkez label */}
      <motion.text
        x="200"
        y="105"
        textAnchor="middle"
        fontSize="10"
        fill="#d8b4fe"
        fontFamily="monospace"
        letterSpacing="2"
        initial={{ opacity: 0 }}
        animate={{ opacity: active ? 0.7 : 0.2 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        VERİ HARİTASI
      </motion.text>
    </svg>
  );
}

/** 02 Strateji — dağınık noktalar yol haritasına dönüşüyor */
function IllustrationStrateji({ active }: { active: boolean }) {
  const waypoints = [
    { x: 40, y: 160 },
    { x: 110, y: 110 },
    { x: 180, y: 130 },
    { x: 250, y: 70 },
    { x: 320, y: 90 },
    { x: 370, y: 40 },
  ];
  const pathD = waypoints
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`)
    .join(" ");

  return (
    <svg viewBox="0 0 400 200" className="w-full" aria-hidden="true">
      <defs>
        <linearGradient id="str-lg" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#4f46e5" />
        </linearGradient>
      </defs>
      {/* Grid arka plan */}
      {[40, 80, 120, 160].map((y) => (
        <line
          key={y}
          x1="20"
          y1={y}
          x2="390"
          y2={y}
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="1"
        />
      ))}
      {[80, 160, 240, 320].map((x) => (
        <line
          key={x}
          x1={x}
          y1="20"
          x2={x}
          y2="185"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="1"
        />
      ))}
      {/* Yol çizgisi */}
      <motion.path
        d={pathD}
        fill="none"
        stroke="url(#str-lg)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="1000"
        initial={{ strokeDashoffset: 1000, opacity: 0 }}
        animate={{
          strokeDashoffset: active ? 0 : 1000,
          opacity: active ? 1 : 0.15,
        }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />
      {/* Waypoint'ler */}
      {waypoints.map((p, i) => (
        <motion.g key={i}>
          <motion.circle
            cx={p.x}
            cy={p.y}
            r="6"
            fill={
              i === waypoints.length - 1 ? "#4f46e5" : "rgba(124,58,237,0.6)"
            }
            stroke="#7c3aed"
            strokeWidth="1.5"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: active ? 1 : 0.25 }}
            transition={{
              delay: 0.3 + i * 0.15,
              duration: 0.35,
              ease: "backOut",
            }}
            style={{ transformOrigin: `${p.x}px ${p.y}px` }}
          />
          {i === waypoints.length - 1 && (
            <motion.text
              x={p.x}
              y={p.y - 14}
              textAnchor="middle"
              fontSize="9"
              fill="#a5b4fc"
              fontFamily="monospace"
              letterSpacing="1.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: active ? 0.8 : 0 }}
              transition={{ delay: 1.0, duration: 0.4 }}
            >
              HEDEF
            </motion.text>
          )}
        </motion.g>
      ))}
      {/* Ok ucu */}
      <motion.polygon
        points="362,30 378,40 358,50"
        fill="#4f46e5"
        initial={{ opacity: 0 }}
        animate={{ opacity: active ? 0.8 : 0 }}
        transition={{ delay: 1.2, duration: 0.3 }}
      />
    </svg>
  );
}

/** 03 Uygulama — ekran üzerinde sistem kurulu hale geliyor */
function IllustrationUygulama({ active }: { active: boolean }) {
  const blocks = [
    { x: 40, y: 50, w: 120, h: 30, label: "Web Sitesi" },
    { x: 180, y: 50, w: 90, h: 30, label: "Google Ads" },
    { x: 290, y: 50, w: 80, h: 30, label: "Meta Ads" },
    { x: 40, y: 110, w: 80, h: 30, label: "SEO" },
    { x: 140, y: 110, w: 100, h: 30, label: "GA4 + GTM" },
    { x: 260, y: 110, w: 110, h: 30, label: "İçerik" },
  ];
  return (
    <svg viewBox="0 0 400 200" className="w-full" aria-hidden="true">
      <defs>
        <linearGradient id="uyg-lg" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4f46e5" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>
      {/* Bağlantı çizgileri */}
      {blocks
        .slice(0, 3)
        .map((b, i) =>
          blocks
            .slice(3)
            .map((b2, j) => (
              <motion.line
                key={`${i}-${j}`}
                x1={b.x + b.w / 2}
                y1={b.y + b.h}
                x2={b2.x + b2.w / 2}
                y2={b2.y}
                stroke="#4f46e5"
                strokeWidth="1"
                strokeDasharray="4 4"
                initial={{ opacity: 0 }}
                animate={{ opacity: active ? 0.25 : 0.06 }}
                transition={{ delay: 0.6 + i * 0.1, duration: 0.4 }}
              />
            )),
        )}
      {/* Bloklar */}
      {blocks.map((b, i) => (
        <motion.g key={i}>
          <motion.rect
            x={b.x}
            y={b.y}
            width={b.w}
            height={b.h}
            rx="6"
            fill="rgba(79,70,229,0.15)"
            stroke="#4f46e5"
            strokeWidth="1"
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: active ? 1 : 0.2, scaleY: 1 }}
            transition={{ delay: i * 0.1, duration: 0.4, ease: "backOut" }}
            style={{ transformOrigin: `${b.x + b.w / 2}px ${b.y + b.h / 2}px` }}
          />
          <motion.text
            x={b.x + b.w / 2}
            y={b.y + b.h / 2 + 4}
            textAnchor="middle"
            fontSize="9"
            fill="#93c5fd"
            fontFamily="monospace"
            letterSpacing="1"
            initial={{ opacity: 0 }}
            animate={{ opacity: active ? 0.85 : 0.2 }}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.3 }}
          >
            {b.label}
          </motion.text>
        </motion.g>
      ))}
      {/* "Canlı" rozetleri */}
      {blocks.slice(0, 3).map((b, i) => (
        <motion.circle
          key={i}
          cx={b.x + b.w - 8}
          cy={b.y + 8}
          r="4"
          fill="#22c55e"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: active ? 1 : 0, scale: 1 }}
          transition={{ delay: 0.8 + i * 0.15, duration: 0.3, ease: "backOut" }}
          style={{ transformOrigin: `${b.x + b.w - 8}px ${b.y + 8}px` }}
        />
      ))}
    </svg>
  );
}

/** 04 Optimizasyon — büyüyen grafik, her iterasyon yukarı */
function IllustrationOptimizasyon({ active }: { active: boolean }) {
  const lines = [
    {
      points: "30,160 90,140 150,145 210,120 270,100 330,85 390,60",
      color: "#1d4ed8",
      delay: 0,
    },
    {
      points: "30,170 90,155 150,160 210,138 270,118 330,100 390,72",
      color: "rgba(29,78,216,0.35)",
      delay: 0.15,
    },
  ];
  const bars = [60, 90, 110, 140, 160, 180];

  return (
    <svg viewBox="0 0 420 200" className="w-full" aria-hidden="true">
      <defs>
        <linearGradient id="opt-fill" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Eksen */}
      <line
        x1="30"
        y1="20"
        x2="30"
        y2="175"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="1"
      />
      <line
        x1="30"
        y1="175"
        x2="400"
        y2="175"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="1"
      />
      {/* Yatay grid */}
      {[60, 100, 140].map((y) => (
        <line
          key={y}
          x1="30"
          y1={y}
          x2="400"
          y2={y}
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
      ))}
      {/* Bar'lar */}
      {bars.map((h, i) => (
        <motion.rect
          key={i}
          x={45 + i * 57}
          y={175 - h}
          width={32}
          height={h}
          rx="3"
          fill="rgba(29,78,216,0.18)"
          stroke="rgba(29,78,216,0.4)"
          strokeWidth="1"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: active ? 1 : 0.2, opacity: active ? 1 : 0.2 }}
          transition={{ delay: i * 0.1, duration: 0.5, ease: "backOut" }}
          style={{ transformOrigin: `${45 + i * 57 + 16}px 175px` }}
        />
      ))}
      {/* Ana çizgi */}
      {lines.map((l, li) => (
        <motion.polyline
          key={li}
          points={l.points}
          fill="none"
          stroke={l.color}
          strokeWidth={li === 0 ? 2.5 : 1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="500"
          initial={{ strokeDashoffset: 500, opacity: 0 }}
          animate={{
            strokeDashoffset: active ? 0 : 500,
            opacity: active ? 1 : 0.1,
          }}
          transition={{ delay: l.delay, duration: 1.0, ease: "easeOut" }}
        />
      ))}
      {/* Tepe noktası */}
      <motion.circle
        cx="390"
        cy="60"
        r="5"
        fill="#1d4ed8"
        stroke="#93c5fd"
        strokeWidth="1.5"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: active ? 1 : 0, opacity: active ? 1 : 0 }}
        transition={{ delay: 1.1, duration: 0.4, ease: "backOut" }}
        style={{ transformOrigin: "390px 60px" }}
      />
      <motion.text
        x="390"
        y="50"
        textAnchor="middle"
        fontSize="9"
        fill="#93c5fd"
        fontFamily="monospace"
        letterSpacing="1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: active ? 0.9 : 0 }}
        transition={{ delay: 1.2, duration: 0.3 }}
      >
        ↑ BÜYÜME
      </motion.text>
    </svg>
  );
}

const ILLUSTRATIONS = [
  IllustrationAnaliz,
  IllustrationStrateji,
  IllustrationUygulama,
  IllustrationOptimizasyon,
];

/* ─────────────────────────────────────────────
   Adım verisi
───────────────────────────────────────────── */
const STEPS = [
  {
    id: "01",
    phase: "Analiz",
    duration: "1–2 hafta",
    problem: "Neyin işe yaramadığını bilmiyorsunuz",
    solution: "Veriyle haritalanmış net bir başlangıç noktanız var",
    details: [
      "Teknik SEO denetimi — Core Web Vitals, indexleme, mimari",
      "Rakip & pazar haritası — boşluklar ve fırsatlar görünür",
      "GA4 veri kalite kontrolü — gerçek mi, eksik mi?",
      "Reklam hesabı otopsisi — para nereye gidiyor",
      "Hedef kitle segmentasyonu — kim, ne istiyor, nerede",
    ],
    output: "Durum Raporu & Fırsat Haritası",
    colorFrom: "#be29ec",
    colorTo: "#8b21c4",
  },
  {
    id: "02",
    phase: "Strateji",
    duration: "1 hafta",
    problem: "Hangi kanaldan başlayacağınızı bilmiyorsunuz",
    solution: "Önceliklendirilmiş, bütçeye oturmuş bir yol haritanız var",
    details: [
      "Kanal önceliklendirmesi — hangisi önce, neden",
      "Bütçe dağılımı & ROI projeksiyonu",
      "Dönüşüm hunisi tasarımı — farkındalıktan satışa",
      "İçerik & anahtar kelime stratejisi",
      "KPI tanımı — başarı nasıl ölçülecek",
    ],
    output: "Dijital Büyüme Yol Haritası",
    colorFrom: "#7c3aed",
    colorTo: "#4f46e5",
  },
  {
    id: "03",
    phase: "Uygulama",
    duration: "2–4 hafta",
    problem: "Plan var ama uygulama yok — ya da yanlış sırayla gidiyor",
    solution: "Her şey zamanında devrede, her adım onaylı",
    details: [
      "Web sitesi & landing page — dönüşüm odaklı",
      "Google Ads & Meta Ads kampanya kurulumu",
      "Teknik SEO — schema, hız, mobil, mimari",
      "GA4 + GTM — her dönüşüm izleniyor",
      "İçerik üretimi & yayın takvimi",
    ],
    output: "Canlı Kampanyalar & Yayına Alınan Sistem",
    colorFrom: "#4f46e5",
    colorTo: "#1d4ed8",
  },
  {
    id: "04",
    phase: "Optimizasyon",
    duration: "Sürekli",
    problem: "Sonuçlar geliyor ama ne zaman daha iyi olur bilmiyorsunuz",
    solution: "Her hafta veri, yorum ve bir sonraki aksiyon önünüzde",
    details: [
      "A/B testi — hangi başlık, görsel, teklif daha iyi",
      "Bütçe optimizasyonu — para en verimli kanala kayıyor",
      "CRO — aynı trafik, daha fazla dönüşüm",
      "SEO içerik güncellemesi — sıralama korunuyor, büyüyor",
      "Haftalık rapor — sayılar + yorumlar + aksiyon",
    ],
    output: "Haftalık Rapor & Büyüme Aksiyonları",
    colorFrom: "#1d4ed8",
    colorTo: "#0000c8",
  },
] as const;

const schemaData = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Premium Dijital ile Dijital Büyüme Süreci",
  description:
    "Analiz, strateji, uygulama ve sürekli optimizasyondan oluşan 4 aşamalı dijital büyüme metodolojisi",
  step: STEPS.map((s, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: s.phase,
    text: s.solution,
    itemListElement: s.details.map((d) => ({
      "@type": "HowToDirection",
      text: d,
    })),
  })),
};

/* ─────────────────────────────────────────────
   Sticky sağ panel
───────────────────────────────────────────── */
function DetailPanel({
  step,
  active,
}: {
  step: (typeof STEPS)[number];
  active: boolean;
}) {
  const Illus = ILLUSTRATIONS[STEPS.indexOf(step)];
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      key={step.id}
      initial={{ opacity: 0, x: prefersReduced ? 0 : 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: prefersReduced ? 0 : -16 }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-5"
    >
      {/* İllüstrasyon */}
      <div
        className="overflow-hidden rounded-2xl border p-4"
        style={{
          background: `linear-gradient(135deg, ${step.colorFrom}10, ${step.colorTo}06)`,
          borderColor: `${step.colorFrom}25`,
        }}
      >
        <Illus active={active} />
      </div>

      {/* Problem → Çözüm */}
      <div className="flex flex-col gap-3">
        <div className="flex items-start gap-3 opacity-50">
          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-white/30" />
          <p className="text-sm leading-snug text-white/50 line-through">
            {step.problem}
          </p>
        </div>
        <div className="flex items-start gap-3">
          <span
            className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full"
            style={{
              background: step.colorFrom,
              boxShadow: `0 0 6px ${step.colorFrom}`,
            }}
          />
          <p className="text-base font-bold leading-snug text-white sm:text-lg">
            {step.solution}
          </p>
        </div>
      </div>

      {/* Detaylar */}
      <div
        className="rounded-xl border p-4"
        style={{
          background: `${step.colorFrom}08`,
          borderColor: `${step.colorFrom}20`,
        }}
      >
        <div className="space-y-2">
          {step.details.map((d) => (
            <div
              key={d}
              className="flex items-start gap-2 text-[12px] leading-snug text-white/55 md:text-[13px]"
            >
              <span
                className="mt-[4px] h-1 w-1 shrink-0 rounded-full"
                style={{ background: step.colorFrom }}
              />
              {d}
            </div>
          ))}
        </div>
        <div
          className="mt-3 border-t pt-3 flex items-center gap-2"
          style={{ borderColor: `${step.colorFrom}18` }}
        >
          <span
            className="text-[9px] font-black uppercase tracking-[0.15em]"
            style={{ color: step.colorFrom }}
          >
            Çıktı:
          </span>
          <span className="text-[11px] text-white/45">{step.output}</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Ana bileşen
───────────────────────────────────────────── */
export default function ProcessRoadmapAlt() {
  const [activeStep, setActiveStep] = useState(0);
  const prefersReduced = useReducedMotion();
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Her adım için IntersectionObserver — scroll'da ortalandığında aktifleşiyor
  // rootMargin ile ekranın tam ortasına gelince tetikleniyor
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    stepRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveStep(i);
        },
        { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section
      id="surec"
      aria-label="Çalışma sürecimiz"
      className="border-t border-white/5 bg-brand-dark px-4 py-16 sm:px-5 sm:py-20 md:px-6 md:py-28"
      itemScope
      itemType="https://schema.org/HowTo"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="mx-auto max-w-6xl">
        {/* Başlık */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-20"
        >
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 mb-5">
            <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-white/50">
              Nasıl Çalışıyoruz
            </span>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2
              className="text-3xl font-bold tracking-tighter uppercase sm:text-4xl md:text-5xl lg:text-6xl"
              itemProp="name"
            >
              Bugün <span className="text-white/20 font-light">→</span>{" "}
              <span className="bg-gradient-to-r from-[#be29ec] to-[#0000c8] bg-clip-text text-transparent">
                90 gün sonra
              </span>
            </h2>
            <p className="text-sm text-white/35 sm:text-right sm:max-w-xs">
              Her adımda bir problem çözülür,
              <br className="hidden sm:block" /> bir sonrakine hazır olunur.
            </p>
          </div>
        </motion.div>

        {/* İki kolon: sol adım listesi / sağ sticky panel */}
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:items-start">
          {/* SOL — adım listesi, her adım scroll'a girence aktifleşiyor */}
          <div className="flex flex-col">
            {STEPS.map((step, i) => {
              const isActive = activeStep === i;
              const isPast = i < activeStep;
              return (
                <div
                  key={step.id}
                  ref={(el) => {
                    stepRefs.current[i] = el;
                  }}
                  itemScope
                  itemType="https://schema.org/HowToStep"
                  itemProp="step"
                >
                  <motion.div
                    initial={{ opacity: 0, x: prefersReduced ? 0 : -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{
                      delay: i * 0.08,
                      duration: 0.55,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    onClick={() => setActiveStep(i)}
                    className="cursor-pointer rounded-2xl px-4 py-6 transition-all duration-400 md:px-6 md:py-8"
                    style={{
                      background: isActive
                        ? `linear-gradient(90deg, ${step.colorFrom}12, transparent)`
                        : "transparent",
                      borderLeft: `2px solid ${isActive ? step.colorFrom : isPast ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.05)"}`,
                      opacity: isActive ? 1 : isPast ? 0.5 : 0.45,
                    }}
                  >
                    {/* Numera + faz + süre */}
                    <div className="mb-3 flex items-center gap-3">
                      <span
                        className="font-mono text-3xl font-black leading-none md:text-4xl"
                        style={{
                          color: isActive
                            ? step.colorFrom
                            : "rgba(255,255,255,0.15)",
                        }}
                      >
                        {step.id}
                      </span>
                      <div>
                        <h3
                          className="text-lg font-bold uppercase tracking-tight md:text-xl"
                          style={{
                            color: isActive ? "#fff" : "rgba(255,255,255,0.55)",
                          }}
                          itemProp="name"
                        >
                          {step.phase}
                        </h3>
                        <span
                          className="text-[10px] font-bold uppercase tracking-[0.18em]"
                          style={{
                            color: isActive
                              ? step.colorFrom
                              : "rgba(255,255,255,0.2)",
                          }}
                        >
                          {step.duration}
                        </span>
                      </div>
                    </div>

                    {/* Problem — büyük, okunaklı */}
                    <p
                      className="text-base font-semibold leading-snug md:text-lg"
                      style={{
                        color: isPast
                          ? "rgba(255,255,255,0.2)"
                          : isActive
                            ? "rgba(255,255,255,0.7)"
                            : "rgba(255,255,255,0.35)",
                        textDecoration: isPast ? "line-through" : "none",
                      }}
                    >
                      {step.problem}
                    </p>

                    {/* Çözüm özeti — aktif adımda beliriyor */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{ opacity: 1, height: "auto", marginTop: 8 }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          transition={{
                            duration: 0.32,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="overflow-hidden text-sm font-bold md:text-base"
                          style={{ color: step.colorFrom }}
                          itemProp="text"
                        >
                          → {step.solution}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Ayırıcı */}
                  {i < STEPS.length - 1 && (
                    <div
                      className="mx-4 h-px md:mx-6"
                      style={{ background: "rgba(255,255,255,0.04)" }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* SAĞ — sticky detay paneli, layout değişmiyor */}
          <div className="hidden lg:block lg:sticky lg:top-10">
            <AnimatePresence mode="wait">
              <DetailPanel
                key={activeStep}
                step={STEPS[activeStep]}
                active={true}
              />
            </AnimatePresence>
          </div>
        </div>

        {/* ── Varış noktası ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-16 overflow-hidden rounded-[2rem] border md:mt-20 md:rounded-[2.5rem]"
          style={{
            background:
              "linear-gradient(135deg, rgba(190,41,236,0.1), rgba(0,0,200,0.12))",
            borderColor: "rgba(190,41,236,0.22)",
            boxShadow: "0 0 60px rgba(190,41,236,0.07)",
          }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
          >
            <div className="absolute -top-20 -left-20 h-56 w-56 rounded-full bg-[#be29ec] opacity-[0.07] blur-[80px]" />
            <div className="absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-[#0000c8] opacity-[0.07] blur-[80px]" />
          </div>

          <div className="relative z-10 flex flex-col items-center gap-6 px-6 py-12 text-center md:gap-8 md:px-12 md:py-16">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-full md:h-20 md:w-20"
              style={{
                background:
                  "linear-gradient(135deg, rgba(190,41,236,0.2), rgba(0,0,200,0.2))",
                border: "1px solid rgba(190,41,236,0.3)",
                boxShadow: "0 0 28px rgba(190,41,236,0.18)",
              }}
            >
              <span className="text-2xl md:text-3xl" aria-hidden="true">
                ✦
              </span>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-white/25">
                Süreç tamamlandıktan sonra
              </p>
              <h3 className="text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl md:text-4xl">
                Artık dijital kanallar{" "}
                <span className="bg-gradient-to-r from-[#be29ec] to-[#0000c8] bg-clip-text text-transparent">
                  sizin için çalışıyor.
                </span>
              </h3>
              <p className="mx-auto max-w-xl text-sm leading-relaxed text-white/40 sm:text-base">
                Reklam bütçenizin nereye gittiğini biliyorsunuz. Google'da
                görünüyorsunuz. Rakiplerinizden ayrışıyorsunuz. Operasyonunuz
                otomatik çalışıyor. Ve her hafta bunu veriyle görüyorsunuz.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
              {[
                { val: "4 hafta", label: "ilk sonuçlar" },
                { val: "Haftalık", label: "şeffaf raporlama" },
                { val: "Ölçülebilir", label: "büyüme" },
              ].map((m) => (
                <div key={m.label} className="flex flex-col items-center gap-1">
                  <span className="text-xl font-black text-white md:text-2xl">
                    {m.val}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/28">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <a
                href="#iletisim"
                aria-label="Ücretsiz dijital büyüme analizi başlat"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#be29ec] to-[#0000c8] px-8 py-4 text-xs font-black uppercase tracking-[0.18em] text-white shadow-[0_0_30px_rgba(190,41,236,0.28)] transition-all duration-300 hover:shadow-[0_0_50px_rgba(190,41,236,0.45)] hover:scale-[1.02] sm:px-10"
              >
                Bu Yolculuğu Başlat →
              </a>
              <p className="text-[11px] text-white/22">
                Ücretsiz · Bağlayıcı değil · Ortalama 4 saat yanıt
              </p>
            </div>
          </div>
        </motion.div>

        {/* Alt güven bandı */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
        >
          {[
            "Haftalık şeffaf raporlama",
            "Onaysız adım atılmaz",
            "Her aşamada somut çıktı",
            "Veriyle yönetilen optimizasyon",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="h-1 w-1 rounded-full"
                style={{
                  background: "linear-gradient(90deg,#be29ec,#0000c8)",
                  boxShadow: "0 0 5px rgba(190,41,236,0.5)",
                }}
              />
              <span className="text-[11px] font-medium text-white/28">
                {item}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
