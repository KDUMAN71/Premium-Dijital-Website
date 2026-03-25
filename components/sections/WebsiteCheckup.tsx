"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "framer-motion";

/* ─────────────────────────────────────────────
   Veri
───────────────────────────────────────────── */
const QUESTIONS = [
  {
    id: "speed",
    category: "Hız",
    categoryIcon: "⚡",
    text: "Sayfanız kaç saniyede açılıyor?",
    subtext: "3sn+ bekleyen ziyaretçilerin %53'ü ayrılıyor.",
    options: [
      { label: "3 saniyeden fazla", score: 0, grade: "F" },
      { label: "1–3 saniye arası", score: 1, grade: "C" },
      { label: "1 saniyenin altı", score: 2, grade: "A" },
      { label: "Bilmiyorum", score: 0, grade: "?" },
    ],
    xray: "speed",
  },
  {
    id: "pagespeed",
    category: "Performans",
    categoryIcon: "📊",
    text: "Google PageSpeed Insights'ta mobil skorunuz kaç?",
    subtext: "Google bu skoru sıralama faktörü olarak kullanıyor.",
    options: [
      { label: "0–49 (Kötü)", score: 0, grade: "F" },
      { label: "50–89 (Geliştirilmeli)", score: 1, grade: "C" },
      { label: "90–100 (İyi)", score: 2, grade: "A" },
      { label: "Hiç bakmadım", score: 0, grade: "?" },
    ],
    xray: "performance",
  },
  {
    id: "seo",
    category: "SEO",
    categoryIcon: "🔍",
    text: "Google'da sektör + şehir aramasında ilk sayfada çıkıyor musunuz?",
    subtext: "İlk sayfada olmayan site, pratikte yok hükmünde.",
    options: [
      { label: "Hayır, görünmüyorum", score: 0, grade: "F" },
      { label: "Bazen, kararsız", score: 1, grade: "C" },
      { label: "Evet, üst sıralardayım", score: 2, grade: "A" },
      { label: "Kontrol etmedim", score: 0, grade: "?" },
    ],
    xray: "seo",
  },
  {
    id: "mobile",
    category: "Mobil",
    categoryIcon: "📱",
    text: "Sitenizin mobil uyumluluğunu test ettiniz mi?",
    subtext: "Mobil trafik artık masaüstünü geçti.",
    options: [
      { label: "Hayır", score: 0, grade: "F" },
      { label: "Evet, sorunlar var", score: 1, grade: "C" },
      { label: "Evet, sorunsuz", score: 2, grade: "A" },
      { label: "Emin değilim", score: 0, grade: "?" },
    ],
    xray: "mobile",
  },
  {
    id: "analytics",
    category: "Analitik",
    categoryIcon: "📈",
    text: "GA4 veya herhangi bir analitik aracı aktif mi?",
    subtext: "Ölçemediğinizi yönetemezsiniz.",
    options: [
      { label: "Hayır, yok", score: 0, grade: "F" },
      { label: "Var ama kullanmıyorum", score: 1, grade: "C" },
      { label: "Aktif kullanıyorum", score: 2, grade: "A" },
    ],
    xray: "analytics",
  },
  {
    id: "tracking",
    category: "Takip",
    categoryIcon: "🎯",
    text: "Form, telefon ve WhatsApp tıklamaları ölçümleniyor mu?",
    subtext: "Bu aksiyonları görmeden neyin işe yaradığını bilemezsiniz.",
    options: [
      { label: "Hayır, göremiyorum", score: 0, grade: "F" },
      { label: "Emin değilim", score: 0, grade: "?" },
      { label: "Evet, takip ediyorum", score: 2, grade: "A" },
    ],
    xray: "tracking",
  },
];

const MAX_SCORE = QUESTIONS.length * 2; // 12

/* ─────────────────────────────────────────────
   Sol panel — Diagnosis Screen
───────────────────────────────────────────── */
const XRAY_CONFIGS: Record<
  string,
  {
    label: string;
    color: string;
    elements: {
      type: "bar" | "grid" | "lines" | "dots" | "chart" | "code";
      highlight: boolean;
    }[];
  }
> = {
  speed: {
    label: "Hız Analizi",
    color: "#ef4444",
    elements: [
      { type: "bar", highlight: true },
      { type: "grid", highlight: false },
      { type: "lines", highlight: false },
    ],
  },
  performance: {
    label: "Performans",
    color: "#f97316",
    elements: [
      { type: "chart", highlight: true },
      { type: "bar", highlight: false },
      { type: "dots", highlight: false },
    ],
  },
  seo: {
    label: "SEO Durumu",
    color: "#eab308",
    elements: [
      { type: "lines", highlight: false },
      { type: "grid", highlight: true },
      { type: "bar", highlight: false },
    ],
  },
  mobile: {
    label: "Mobil Uyum",
    color: "#8b5cf6",
    elements: [
      { type: "dots", highlight: true },
      { type: "lines", highlight: false },
      { type: "grid", highlight: false },
    ],
  },
  analytics: {
    label: "Analitik",
    color: "#3b82f6",
    elements: [
      { type: "chart", highlight: true },
      { type: "code", highlight: false },
      { type: "dots", highlight: false },
    ],
  },
  tracking: {
    label: "Dönüşüm Takibi",
    color: "#22c55e",
    elements: [
      { type: "code", highlight: true },
      { type: "chart", highlight: false },
      { type: "grid", highlight: false },
    ],
  },
};

function DiagnosisScreen({
  activeXray,
  grades,
}: {
  activeXray: string | null;
  grades: Record<string, { grade: string; score: number }>;
}) {
  const config = activeXray ? XRAY_CONFIGS[activeXray] : null;
  const prefersReduced = useReducedMotion();

  return (
    <div className="flex flex-col justify-between h-full">
      {/* Browser chrome */}
      <div className="rounded-[1.25rem] border border-white/10 bg-black/40 overflow-hidden">
        {/* Tarayıcı başlık çubuğu */}
        <div className="flex items-center gap-2 border-b border-white/8 bg-white/3 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ background: config ? config.color : "rgba(0,0,200,0.5)" }}
          />
          <div className="ml-2 flex-1 rounded-md border border-white/8 bg-white/5 px-3 py-1 text-[10px] font-mono text-white/30">
            sirketiniz.com
          </div>
        </div>

        {/* Sayfa içeriği — X-Ray alanı */}
        <div className="relative min-h-[180px] p-4 sm:p-5">
          {/* Arka plan grid her zaman var */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />

          {/* Statik sayfa wireframe */}
          <div className="relative z-10 space-y-3">
            {/* Header bar */}
            <div
              className={`h-7 rounded-lg border transition-all duration-500 ${config?.elements[0]?.type === "bar" && config.elements[0].highlight ? "border-red-500/40 bg-red-500/10" : "border-white/8 bg-white/4"}`}
            />

            {/* İki kolon */}
            <div className="grid grid-cols-[1.2fr_0.8fr] gap-3">
              <div
                className={`h-20 rounded-xl border transition-all duration-500 ${config?.elements[1]?.highlight ? `border-opacity-40 bg-opacity-10` : "border-white/8 bg-white/4"}`}
                style={
                  config?.elements[1]?.highlight
                    ? {
                        borderColor: `${config.color}40`,
                        background: `${config.color}10`,
                      }
                    : {}
                }
              />
              <div className="space-y-2">
                <div
                  className={`h-[38px] rounded-xl border transition-all duration-500 ${config?.elements[2]?.highlight ? "" : "border-white/8 bg-white/4"}`}
                  style={
                    config?.elements[2]?.highlight
                      ? {
                          borderColor: `${config.color}40`,
                          background: `${config.color}10`,
                        }
                      : {}
                  }
                />
                <div className="h-[38px] rounded-xl border border-white/8 bg-white/4" />
              </div>
            </div>

            {/* CTA bar */}
            <div className="h-8 w-32 rounded-full border border-white/8 bg-white/4" />
          </div>

          {/* X-Ray overlay — aktif soruya göre */}
          <AnimatePresence>
            {config && (
              <motion.div
                key={activeXray}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: prefersReduced ? 0 : 0.35 }}
                className="absolute inset-0 z-20 rounded-b-[1.25rem] flex items-end p-4"
                style={{
                  background: `linear-gradient(to top, ${config.color}18, transparent)`,
                }}
              >
                {/* Aktif sinyal etiketi */}
                <div
                  className="flex items-center gap-2 rounded-full border px-3 py-2"
                  style={{
                    borderColor: `${config.color}50`,
                    background: `${config.color}20`,
                  }}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full animate-pulse"
                    style={{ background: config.color }}
                  />
                  <span
                    className="font-mono text-[12px] font-bold tracking-wide"
                    style={{ color: config.color }}
                  >
                    {config.label} Analiz Ediliyor
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Biriken grade etiketleri */}
      {Object.keys(grades).length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-2">
          {QUESTIONS.map((q) => {
            const g = grades[q.id];
            if (!g)
              return (
                <div
                  key={q.id}
                  className="rounded-xl border border-white/6 bg-white/3 px-2 py-2 text-center"
                >
                  <div className="font-mono text-[10px] font-semibold text-white/30">
                    {q.category}
                  </div>
                  <div className="mt-1 font-mono text-base font-black text-white/20">
                    —
                  </div>
                </div>
              );

            const gradeColor =
              g.grade === "A"
                ? "#22c55e"
                : g.grade === "C"
                  ? "#f97316"
                  : g.grade === "F"
                    ? "#ef4444"
                    : "#6b7280";

            return (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25, ease: "backOut" }}
                className="rounded-xl border px-2 py-2 text-center"
                style={{
                  borderColor: `${gradeColor}30`,
                  background: `${gradeColor}10`,
                }}
              >
                <div
                  className="font-mono text-[9px]"
                  style={{ color: `${gradeColor}80` }}
                >
                  {q.category}
                </div>
                <div
                  className="mt-0.5 font-mono text-base font-black"
                  style={{ color: gradeColor }}
                >
                  {g.grade}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Sonuç ekranı
───────────────────────────────────────────── */
function ResultScreen({
  score,
  grades,
  onReset,
}: {
  score: number;
  grades: Record<string, { grade: string; score: number }>;
  onReset: () => void;
}) {
  const pct = Math.round((score / MAX_SCORE) * 100);

  const level = score <= 4 ? "critical" : score <= 8 ? "medium" : "good";
  const levelConfig = {
    critical: {
      color: "#ef4444",
      label: "Kritik Altyapı Sorunları",
      desc: "Siteniz ziyaretçi ve müşteri kaybettiriyor. Önce temeli onarmalısınız.",
      cta: "Ücretsiz Analiz — Öncelikleri Belirleyelim",
      layers: [
        { name: "Temel", sub: "Hız · Teknik Altyapı · Mobil", active: true },
        { name: "Boru", sub: "Ölçümleme · Takip · GA4", active: false },
        { name: "Motor", sub: "Dönüşüm · Reklam · Büyüme", active: false },
      ],
    },
    medium: {
      color: "#f97316",
      label: "Geliştirilmesi Gereken Alanlar Var",
      desc: "Temel sağlam ama boşluklar kapatılmadan büyüme sınırlı kalır.",
      cta: "Hangi Katmandan Başlayacağınızı Konuşalım",
      layers: [
        { name: "Temel", sub: "Hız · Teknik · Mobil", active: true },
        { name: "Boru", sub: "Ölçümleme · Takip · GA4", active: true },
        { name: "Motor", sub: "Dönüşüm · Reklam · Büyüme", active: false },
      ],
    },
    good: {
      color: "#22c55e",
      label: "Teknik Altyapı Sağlam",
      desc: "Sistem hazır. Şimdi dönüşümü ve büyümeyi hızlandırma zamanı.",
      cta: "Dönüşüm Optimizasyonunu Birlikte Planlayalım",
      layers: [
        { name: "Temel", sub: "Hız · Teknik · Mobil", active: true },
        { name: "Boru", sub: "Ölçümleme · Takip · GA4", active: true },
        { name: "Motor", sub: "Dönüşüm · Reklam · Büyüme", active: true },
      ],
    },
  }[level];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="grid gap-0 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]"
    >
      {/* Sol — skor */}
      <div className="flex flex-col justify-center gap-6 border-b border-white/10 p-6 sm:p-8 lg:border-b-0 lg:border-r">
        <div>
          <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">
            Teşhis Raporu
          </div>
          <h3 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {levelConfig.label}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-white/55">
            {levelConfig.desc}
          </p>
        </div>

        {/* Skor halkası — SVG */}
        <div className="flex items-center gap-5">
          <div className="relative h-20 w-20 shrink-0">
            <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90">
              <circle
                cx="40"
                cy="40"
                r="32"
                fill="none"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="6"
              />
              <motion.circle
                cx="40"
                cy="40"
                r="32"
                fill="none"
                stroke={levelConfig.color}
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 32}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 32 }}
                animate={{
                  strokeDashoffset: 2 * Math.PI * 32 * (1 - pct / 100),
                }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                style={{
                  filter: `drop-shadow(0 0 6px ${levelConfig.color}60)`,
                }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-mono text-xl font-black text-white">
                {score}
              </span>
              <span className="font-mono text-[9px] text-white/35">
                /{MAX_SCORE}
              </span>
            </div>
          </div>

          {/* Sistem katmanları */}
          <div className="flex flex-col gap-2 flex-1">
            {levelConfig.layers.map((layer, i) => (
              <div
                key={layer.name}
                className="flex items-center gap-3 rounded-xl border px-3 py-2 transition-all"
                style={
                  layer.active
                    ? {
                        borderColor: `${levelConfig.color}30`,
                        background: `${levelConfig.color}08`,
                      }
                    : {
                        borderColor: "rgba(255,255,255,0.06)",
                        background: "rgba(255,255,255,0.02)",
                        opacity: 0.4,
                      }
                }
              >
                <span
                  className="h-1.5 w-1.5 rounded-full shrink-0"
                  style={{
                    background: layer.active
                      ? levelConfig.color
                      : "rgba(255,255,255,0.15)",
                  }}
                />
                <div>
                  <div className="text-[11px] font-bold text-white/70">
                    {layer.name}
                  </div>
                  <div className="text-[9px] text-white/30">{layer.sub}</div>
                </div>
                {layer.active && (
                  <span
                    className="ml-auto text-[9px] font-black uppercase tracking-wider"
                    style={{ color: levelConfig.color }}
                  >
                    ✓
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Link
            href="/#analiz"
            className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-[12px] font-bold uppercase tracking-[0.12em] text-white transition-all hover:scale-[1.02]"
            style={{
              background: `linear-gradient(90deg,#be29ec,#0000c8)`,
              boxShadow: "0 0 20px rgba(190,41,236,0.3)",
            }}
          >
            {levelConfig.cta} →
          </Link>
          <button
            type="button"
            onClick={onReset}
            className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/30 transition-colors hover:text-white/60"
          >
            Testi Yeniden Başlat
          </button>
        </div>
      </div>

      {/* Sağ — grade özeti */}
      <div className="p-6 sm:p-8">
        <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">
          Kategori Detayı
        </div>

        <div className="mt-5 space-y-3">
          {QUESTIONS.map((q) => {
            const g = grades[q.id];
            const gradeColor = !g
              ? "#6b7280"
              : g.grade === "A"
                ? "#22c55e"
                : g.grade === "C"
                  ? "#f97316"
                  : g.grade === "F"
                    ? "#ef4444"
                    : "#6b7280";
            const gradeLabel = !g
              ? "—"
              : g.grade === "A"
                ? "İyi"
                : g.grade === "C"
                  ? "Geliştirilmeli"
                  : g.grade === "F"
                    ? "Kritik"
                    : "Bilinmiyor";

            return (
              <div
                key={q.id}
                className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/3 px-4 py-3"
              >
                <span className="text-base">{q.categoryIcon}</span>
                <div className="flex-1">
                  <div className="text-[13px] font-semibold text-white/80">
                    {q.category}
                  </div>
                  <div className="mt-0.5 h-1 w-full rounded-full bg-white/8 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: gradeColor }}
                      initial={{ width: 0 }}
                      animate={{ width: g ? `${(g.score / 2) * 100}%` : "0%" }}
                      transition={{
                        duration: 0.6,
                        delay: 0.1,
                        ease: "easeOut",
                      }}
                    />
                  </div>
                </div>
                <span
                  className="font-mono text-[11px] font-black shrink-0"
                  style={{ color: gradeColor }}
                >
                  {gradeLabel}
                </span>
              </div>
            );
          })}
        </div>

        <p className="mt-5 text-[11px] leading-relaxed text-white/40">
          * Bu değerlendirme kendi beyanınıza dayanmaktadır. Gerçek teknik
          analiz için uzman incelemesi gerekir.
        </p>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Ana bileşen
───────────────────────────────────────────── */
export default function WebsiteCheckup() {
  const [started, setStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [grades, setGrades] = useState<
    Record<string, { grade: string; score: number }>
  >({});
  const [selected, setSelected] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const prefersReduced = useReducedMotion();

  const question = QUESTIONS[currentQ];
  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);

  const handleSelect = (optionIndex: number) => {
    setSelected(optionIndex);
    const opt = question.options[optionIndex];

    const newAnswers = { ...answers, [question.id]: opt.score };
    const newGrades = {
      ...grades,
      [question.id]: { grade: opt.grade, score: opt.score },
    };

    setAnswers(newAnswers);
    setGrades(newGrades);

    setTimeout(
      () => {
        if (currentQ < QUESTIONS.length - 1) {
          setCurrentQ((q) => q + 1);
          setSelected(null);
        } else {
          setDone(true);
        }
      },
      prefersReduced ? 0 : 400,
    );
  };

  const handleReset = () => {
    setStarted(false);
    setCurrentQ(0);
    setAnswers({});
    setGrades({});
    setSelected(null);
    setDone(false);
  };

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(0,82,255,0.12),transparent_35%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.04),transparent_35%,transparent_70%,rgba(255,255,255,0.02))]" />
      <div className="pointer-events-none absolute -right-16 top-10 h-48 w-48 rounded-full bg-brand-blue/15 blur-3xl" />
      <div className="pointer-events-none absolute -left-10 bottom-0 h-44 w-44 rounded-full bg-brand-blue/8 blur-3xl" />

      <div className="relative z-10">
        {!started ? (
          /* ── Intro ekranı ── */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="grid gap-0 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]"
          >
            {/* Sol — statik diagnosis mockup */}
            <div className="border-b border-white/10 p-6 sm:p-8 lg:border-b-0 lg:border-r">
              <div className="mb-4">
                <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">
                  Teşhis Ekranı
                </div>
              </div>
              {/* Browser mockup — statik */}
              <div className="rounded-[1.25rem] border border-white/10 bg-black/40 overflow-hidden">
                <div className="flex items-center gap-2 border-b border-white/8 bg-white/3 px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <div className="ml-2 flex-1 rounded-md border border-white/8 bg-white/5 px-3 py-1 text-[10px] font-mono text-white/30">
                    sirketiniz.com
                  </div>
                </div>
                <div className="relative p-5 min-h-[160px]">
                  <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)",
                      backgroundSize: "20px 20px",
                    }}
                  />
                  <div className="relative z-10 space-y-3">
                    <div className="h-7 rounded-lg border border-white/8 bg-white/4" />
                    <div className="grid grid-cols-[1.2fr_0.8fr] gap-3">
                      <div className="h-20 rounded-xl border border-white/8 bg-white/4" />
                      <div className="space-y-2">
                        <div className="h-[38px] rounded-xl border border-white/8 bg-white/4" />
                        <div className="h-[38px] rounded-xl border border-white/8 bg-white/4" />
                      </div>
                    </div>
                    <div className="h-8 w-32 rounded-full border border-white/8 bg-white/4" />
                  </div>
                  {/* Soru işareti overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-2 opacity-30">
                      <span className="font-mono text-5xl font-black text-white/40">
                        ?
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* 6 boş grade kutusu */}
              <div className="mt-4 grid grid-cols-3 gap-2">
                {QUESTIONS.map((q) => (
                  <div
                    key={q.id}
                    className="rounded-xl border border-white/6 bg-white/3 px-2 py-2 text-center"
                  >
                    <div className="font-mono text-[9px] text-white/20">
                      {q.category}
                    </div>
                    <div className="mt-1 font-mono text-base font-black text-white/15">
                      —
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sağ — intro içerik */}
            <div className="flex flex-col justify-center gap-6 p-6 sm:p-8">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#be29ec]/25 bg-[#be29ec]/10 px-3 py-1.5 mb-4">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#be29ec] animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#be29ec]">
                    Ücretsiz · 2 Dakika
                  </span>
                </div>
                <h3 className="text-2xl font-bold leading-snug tracking-tight text-white sm:text-3xl">
                  Web siteniz ne kadar
                  <br />
                  <span
                    style={{
                      background: "linear-gradient(90deg,#be29ec,#0000c8)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    sağlıklı?
                  </span>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55 sm:text-[15px]">
                  6 soruluk hızlı teşhis ile sitenizin hız, SEO, mobil uyum ve
                  ölçümleme durumunu değerlendirin. Hangi katmanda sorun
                  olduğunu görmek için bir dakikanızı ayırın.
                </p>
              </div>

              {/* Kategori önizleme */}
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {QUESTIONS.map((q) => (
                  <div
                    key={q.id}
                    className="flex items-center gap-2 rounded-xl border border-white/8 bg-white/3 px-3 py-2.5"
                  >
                    <span className="text-sm">{q.categoryIcon}</span>
                    <span className="text-[11px] font-semibold text-white/50">
                      {q.category}
                    </span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setStarted(true)}
                className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-xl px-8 text-[13px] font-bold uppercase tracking-[0.1em] text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: "linear-gradient(90deg,#be29ec,#0000c8)",
                  boxShadow: "0 0 24px rgba(190,41,236,0.35)",
                }}
              >
                <span className="absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative z-10">Testi Başlat →</span>
              </button>

              <p className="text-[10px] text-white/25">
                Cevaplarınız kaydedilmez. Sonuçlar anında gösterilir.
              </p>
            </div>
          </motion.div>
        ) : done ? (
          <ResultScreen
            score={totalScore}
            grades={grades}
            onReset={handleReset}
          />
        ) : (
          <div className="grid gap-0 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            {/* Sol — Diagnosis Screen */}
            <div className="border-b border-white/10 p-6 sm:p-8 lg:border-b-0 lg:border-r">
              <div className="mb-4 flex items-center justify-between">
                <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">
                  Teşhis Ekranı
                </div>
                <div className="font-mono text-[11px] text-white/40">
                  {currentQ + 1}/{QUESTIONS.length}
                </div>
              </div>

              <DiagnosisScreen activeXray={question.xray} grades={grades} />
            </div>

            {/* Sağ — Sorular */}
            <div className="flex flex-col p-6 sm:p-8">
              {/* Progress */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
                    Dijital Check-up
                  </span>
                  <span className="font-mono text-[11px] text-white/40">
                    {Math.round((currentQ / QUESTIONS.length) * 100)}%
                    tamamlandı
                  </span>
                </div>
                <div className="h-1 w-full rounded-full bg-white/8 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: "linear-gradient(90deg,#be29ec,#0000c8)",
                    }}
                    animate={{
                      width: `${(currentQ / QUESTIONS.length) * 100}%`,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {/* Soru */}
              <AnimatePresence>
                <motion.div
                  key={currentQ}
                  initial={{ opacity: 0, x: prefersReduced ? 0 : 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: prefersReduced ? 0 : -16 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col gap-5 flex-1"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-base">{question.categoryIcon}</span>
                      <span
                        className="text-[10px] font-bold uppercase tracking-[0.2em]"
                        style={{ color: XRAY_CONFIGS[question.xray].color }}
                      >
                        {question.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold leading-snug text-white sm:text-xl">
                      {question.text}
                    </h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-white/60">
                      {question.subtext}
                    </p>
                  </div>

                  {/* Seçenekler */}
                  <div className="flex flex-col gap-2.5">
                    {question.options.map((opt, i) => {
                      const isSelected = selected === i;
                      const optColor =
                        opt.grade === "A"
                          ? "#22c55e"
                          : opt.grade === "C"
                            ? "#f97316"
                            : opt.grade === "F"
                              ? "#ef4444"
                              : "#6b7280";

                      return (
                        <motion.button
                          key={opt.label}
                          type="button"
                          onClick={() => handleSelect(i)}
                          disabled={selected !== null}
                          whileHover={selected === null ? { scale: 1.01 } : {}}
                          whileTap={selected === null ? { scale: 0.99 } : {}}
                          className="flex items-center justify-between rounded-xl border px-4 py-3.5 text-left transition-all duration-200 disabled:cursor-default"
                          style={
                            isSelected
                              ? {
                                  borderColor: `${optColor}50`,
                                  background: `${optColor}12`,
                                }
                              : {
                                  borderColor: "rgba(255,255,255,0.08)",
                                  background: "rgba(255,255,255,0.03)",
                                }
                          }
                        >
                          <span
                            className="text-[13px] font-semibold"
                            style={{
                              color: isSelected
                                ? "white"
                                : "rgba(255,255,255,0.65)",
                            }}
                          >
                            {opt.label}
                          </span>
                          {isSelected && (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-black text-white"
                              style={{ background: optColor }}
                            >
                              {opt.grade === "A"
                                ? "✓"
                                : opt.grade === "C"
                                  ? "~"
                                  : opt.grade === "F"
                                    ? "✗"
                                    : "?"}
                            </motion.span>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Alt not */}
              <p className="mt-6 text-[11px] text-white/35">
                Cevaplarınız yalnızca bu sayfada kullanılır, kaydedilmez.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
