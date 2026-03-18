"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { allCaseStudies } from "@/components/sections/case-studies/case-study-data";

/* ─── Sabitler ──────────────────────────────────────────────────────────── */

const SERVICE_AREAS = [
  "Tümü",
  "Performans & Büyüme",
  "Dijital Mimari",
  "Marka & Strateji",
  "Dijital Operasyon",
] as const;

const PRIORITY_SECTORS = ["Sağlık & Medikal", "Yerel Hizmet / Franchise"];

const ALL_SECTORS = [
  "Tümü",
  ...PRIORITY_SECTORS,
  ...Array.from(new Set(allCaseStudies.map((c) => c.sector))).filter(
    (s) => !PRIORITY_SECTORS.includes(s),
  ),
];

const SERVICE_ICONS: Record<string, string> = {
  "Performans & Büyüme": "⚡",
  "Dijital Mimari": "🏗",
  "Marka & Strateji": "✦",
  "Dijital Operasyon": "⚙",
};

/* ─── Sektör atmosfer sistemi ───────────────────────────────────────────── */

type Atm = {
  bg: string;
  glow: string;
  accent: string;
  symbol: string;
  gridColor: string;
};

const SECTOR_ATM: Record<string, Atm> = {
  "Sağlık & Medikal": {
    bg: "linear-gradient(135deg,rgba(16,185,129,0.14) 0%,rgba(4,60,40,0.22) 60%,rgba(190,41,236,0.06) 100%)",
    glow: "radial-gradient(circle at 25% 40%,rgba(16,185,129,0.2) 0%,transparent 55%), radial-gradient(circle at 75% 70%,rgba(52,211,153,0.12) 0%,transparent 40%)",
    accent: "#10b981",
    symbol: "✚",
    gridColor: "rgba(16,185,129,0.12)",
  },
  "Teknoloji & Kurumsal": {
    bg: "linear-gradient(135deg,rgba(99,102,241,0.14) 0%,rgba(20,18,60,0.22) 60%,rgba(0,0,200,0.1) 100%)",
    glow: "radial-gradient(circle at 70% 30%,rgba(99,102,241,0.2) 0%,transparent 50%), radial-gradient(circle at 20% 70%,rgba(139,92,246,0.12) 0%,transparent 40%)",
    accent: "#818cf8",
    symbol: "◈",
    gridColor: "rgba(99,102,241,0.1)",
  },
  "E-Ticaret / Moda": {
    bg: "linear-gradient(135deg,rgba(236,72,153,0.12) 0%,rgba(88,28,135,0.2) 60%,rgba(190,41,236,0.1) 100%)",
    glow: "radial-gradient(circle at 60% 25%,rgba(236,72,153,0.18) 0%,transparent 50%), radial-gradient(circle at 30% 70%,rgba(192,38,211,0.12) 0%,transparent 40%)",
    accent: "#f472b6",
    symbol: "◆",
    gridColor: "rgba(236,72,153,0.1)",
  },
  "Yazılım / SaaS": {
    bg: "linear-gradient(135deg,rgba(14,165,233,0.12) 0%,rgba(7,60,100,0.22) 60%,rgba(0,0,200,0.1) 100%)",
    glow: "radial-gradient(circle at 75% 35%,rgba(14,165,233,0.18) 0%,transparent 50%), radial-gradient(circle at 20% 65%,rgba(56,189,248,0.12) 0%,transparent 40%)",
    accent: "#38bdf8",
    symbol: "⬡",
    gridColor: "rgba(14,165,233,0.1)",
  },
  "Sanayi / Üretim": {
    bg: "linear-gradient(135deg,rgba(245,158,11,0.12) 0%,rgba(70,45,10,0.22) 60%,rgba(120,53,15,0.1) 100%)",
    glow: "radial-gradient(circle at 65% 30%,rgba(245,158,11,0.16) 0%,transparent 50%), radial-gradient(circle at 25% 68%,rgba(251,191,36,0.1) 0%,transparent 40%)",
    accent: "#f59e0b",
    symbol: "⬟",
    gridColor: "rgba(245,158,11,0.1)",
  },
  "Yerel Hizmet / Franchise": {
    bg: "linear-gradient(135deg,rgba(52,211,153,0.12) 0%,rgba(4,90,65,0.2) 60%,rgba(190,41,236,0.07) 100%)",
    glow: "radial-gradient(circle at 60% 30%,rgba(52,211,153,0.18) 0%,transparent 50%), radial-gradient(circle at 22% 68%,rgba(16,185,129,0.12) 0%,transparent 40%)",
    accent: "#34d399",
    symbol: "◎",
    gridColor: "rgba(52,211,153,0.1)",
  },
};

function getAtm(sector: string): Atm {
  return (
    SECTOR_ATM[sector] ?? {
      bg: "linear-gradient(135deg,rgba(190,41,236,0.1) 0%,rgba(0,0,200,0.12) 100%)",
      glow: "radial-gradient(circle at 60% 40%,rgba(190,41,236,0.15) 0%,transparent 55%)",
      accent: "#be29ec",
      symbol: "◇",
      gridColor: "rgba(190,41,236,0.1)",
    }
  );
}

/* Kart üstü atmosfer bloğu */
function CardVisual({ sector }: { sector: string }) {
  const atm = getAtm(sector);
  const gridId = `g-${sector.replace(/[^a-z]/gi, "").slice(0, 6)}`;

  return (
    <div
      className="relative overflow-hidden"
      style={{ height: 148, background: "#070707" }}
    >
      {/* Zemin gradient */}
      <div className="absolute inset-0" style={{ background: atm.bg }} />
      {/* Işık glow'ları */}
      <div className="absolute inset-0" style={{ background: atm.glow }} />
      {/* Grid dokusu */}
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id={gridId}
            width="28"
            height="28"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 28 0 L 0 0 0 28"
              fill="none"
              stroke={atm.gridColor}
              strokeWidth="0.6"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${gridId})`} />
      </svg>
      {/* Sağ taraf büyük sembol */}
      <div
        aria-hidden
        className="absolute right-5 top-1/2 -translate-y-1/2 select-none font-black leading-none"
        style={{ fontSize: 80, color: atm.accent, opacity: 0.14 }}
      >
        {atm.symbol}
      </div>
      {/* Sol ince accent çizgisi */}
      <div
        className="absolute left-0 top-0 h-full w-[3px] opacity-40"
        style={{
          background: `linear-gradient(to bottom, transparent, ${atm.accent}, transparent)`,
        }}
      />
      {/* Alt fade — içerikle geçiş */}
      <div
        className="absolute inset-x-0 bottom-0 h-14"
        style={{
          background: "linear-gradient(to bottom, transparent, #070707)",
        }}
      />
    </div>
  );
}

/* ─── Filtre butonu ─────────────────────────────────────────────────────── */

function FilterBtn({
  label,
  active,
  onClick,
  priority,
  icon,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  priority?: boolean;
  icon?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="cursor-pointer inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] font-bold transition-all duration-200"
      style={
        active
          ? {
              background: "linear-gradient(90deg,#be29ec,#0000c8)",
              color: "white",
              boxShadow: "0 0 14px rgba(190,41,236,0.22)",
            }
          : {
              border: priority
                ? "1px solid rgba(190,41,236,0.2)"
                : "1px solid rgba(255,255,255,0.08)",
              background: priority
                ? "rgba(190,41,236,0.05)"
                : "rgba(255,255,255,0.03)",
              color: priority
                ? "rgba(216,180,254,0.7)"
                : "rgba(255,255,255,0.45)",
            }
      }
    >
      {icon && <span className="text-[10px]">{icon}</span>}
      {priority && !active && !icon && (
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#be29ec]" />
      )}
      {label}
    </button>
  );
}

/* Metrik badge */
function MetricBadge({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <span
        className="text-xl font-black tracking-tighter leading-none sm:text-2xl"
        style={{
          background: "linear-gradient(90deg,#be29ec,#0000c8)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {value}
      </span>
      <span className="mt-1 text-[9px] font-bold uppercase tracking-[0.15em] text-white/28">
        {label}
      </span>
    </div>
  );
}

/* ─── Ana sayfa ─────────────────────────────────────────────────────────── */

export default function BasariHikayeleriPage() {
  const [activeSector, setActiveSector] = useState("Tümü");
  const [activeService, setActiveService] = useState("Tümü");

  const filtered = useMemo(
    () =>
      allCaseStudies.filter((cs) => {
        const sectorOk = activeSector === "Tümü" || cs.sector === activeSector;
        const serviceOk =
          activeService === "Tümü" || cs.serviceArea === activeService;
        return sectorOk && serviceOk;
      }),
    [activeSector, activeService],
  );

  const hasFilter = activeSector !== "Tümü" || activeService !== "Tümü";

  function clearFilters() {
    setActiveSector("Tümü");
    setActiveService("Tümü");
  }

  return (
    <main className="relative min-h-screen bg-brand-dark text-white">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-32 pb-10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(190,41,236,0.07), transparent 55%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(190,41,236,0.25), transparent)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
          <p className="text-[11px] font-black uppercase tracking-[0.35em] text-white/25">
            Başarı Hikayeleri
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight leading-[1.05] sm:text-5xl md:text-6xl">
            Söz değil,{" "}
            <span
              style={{
                background: "linear-gradient(90deg,#be29ec,#0000c8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              veri.
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/40 md:text-lg">
            Farklı sektörlerden gerçek sonuçlar. Ölçülebilir problemler,
            sistematik çözümler, kanıtlanmış büyüme.
          </p>

          {/* Sayaçlar */}
          <div className="mt-8 flex flex-wrap items-center gap-8 border-t border-white/6 pt-8">
            {[
              { v: `${allCaseStudies.length}`, l: "Vaka" },
              { v: `${ALL_SECTORS.length - 1}`, l: "Sektör" },
              { v: "4", l: "Hizmet Alanı" },
            ].map((s) => (
              <div key={s.l} className="flex items-baseline gap-2">
                <span
                  className="text-3xl font-black tracking-tighter"
                  style={{
                    background: "linear-gradient(90deg,#be29ec,#0000c8)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {s.v}
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/25">
                  {s.l}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sticky filtre bar ─────────────────────────────────────────────── */}
      <div className="sticky top-20 z-30 border-b border-white/6 bg-[#050505]/95 backdrop-blur-xl">
        <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-0 sm:divide-x sm:divide-white/6">
            {/* Hizmet Alanı */}
            <div className="sm:pr-8">
              <p className="mb-2.5 text-[9px] font-black uppercase tracking-[0.32em] text-white/18">
                Hizmet Alanı
              </p>
              <div className="flex flex-wrap gap-2">
                <FilterBtn
                  label="Tümü"
                  active={activeService === "Tümü"}
                  onClick={() => setActiveService("Tümü")}
                />
                {SERVICE_AREAS.filter((s) => s !== "Tümü").map((area) => (
                  <FilterBtn
                    key={area}
                    label={area}
                    active={activeService === area}
                    onClick={() => setActiveService(area)}
                    icon={SERVICE_ICONS[area]}
                  />
                ))}
              </div>
            </div>

            {/* Sektör */}
            <div className="sm:pl-8">
              <p className="mb-2.5 text-[9px] font-black uppercase tracking-[0.32em] text-white/18">
                Sektör
              </p>
              <div className="flex flex-wrap gap-2">
                {ALL_SECTORS.map((s) => (
                  <FilterBtn
                    key={s}
                    label={s}
                    active={activeSector === s}
                    onClick={() => setActiveSector(s)}
                    priority={PRIORITY_SECTORS.includes(s)}
                  />
                ))}
              </div>
            </div>
          </div>

          {hasFilter && (
            <div className="mt-3.5 flex items-center justify-between border-t border-white/5 pt-3">
              <p className="text-[11px] text-white/22">
                <span className="font-bold text-white/40">
                  {filtered.length}
                </span>{" "}
                sonuç
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="cursor-pointer text-[11px] font-bold text-white/22 transition hover:text-white/55"
              >
                Filtreleri temizle ×
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Kartlar ───────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 md:py-14">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-24 text-center">
            <p className="text-5xl opacity-30">◎</p>
            <p className="text-lg font-bold text-white/35">
              Bu kombinasyon için henüz vaka yok.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="cursor-pointer text-sm font-bold text-brand-purple transition hover:text-white"
            >
              Tüm vakaları göster →
            </button>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2">
            {filtered.map((cs) => {
              const atm = getAtm(cs.sector);
              return (
                <Link
                  key={cs.slug}
                  href={`/basari-hikayeleri/${cs.slug}`}
                  className="group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-white/8 bg-[#070707] transition-all duration-300 hover:border-white/15"
                  style={{ boxShadow: "0 4px 40px rgba(0,0,0,0.35)" }}
                >
                  {/* Hover — kart kenarlığı accent rengi alır */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      boxShadow: `inset 0 0 0 1px ${atm.accent}30`,
                    }}
                  />

                  {/* ── Görsel blok ── */}
                  <CardVisual sector={cs.sector} />

                  {/* ── İçerik ── */}
                  <div className="relative z-10 flex flex-1 flex-col px-6 pb-6 pt-4 sm:px-7 sm:pb-7">
                    {/* Etiketler */}
                    <div className="mb-4 flex flex-wrap items-center gap-2">
                      <span
                        className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em]"
                        style={{
                          border: `1px solid ${atm.accent}35`,
                          background: `${atm.accent}12`,
                          color: atm.accent,
                        }}
                      >
                        {PRIORITY_SECTORS.includes(cs.sector) && (
                          <span
                            className="h-1.5 w-1.5 shrink-0 rounded-full"
                            style={{ background: atm.accent }}
                          />
                        )}
                        {cs.sector}
                      </span>

                      {cs.serviceArea && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-white/7 bg-white/[0.03] px-2.5 py-1 text-[10px] font-semibold text-white/30">
                          <span className="text-[9px]">
                            {SERVICE_ICONS[cs.serviceArea]}
                          </span>
                          {cs.serviceArea}
                        </span>
                      )}

                      <span className="ml-auto rounded-full border border-white/5 bg-white/[0.02] px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-white/20">
                        {cs.timeframeDays} gün
                      </span>
                    </div>

                    {/* Başlık */}
                    <h2 className="text-lg font-black leading-snug tracking-tight text-white/88 transition-colors duration-200 group-hover:text-white sm:text-xl">
                      {cs.home?.title ?? cs.title}
                    </h2>

                    {/* Özet */}
                    <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-white/38">
                      {cs.home?.summary ?? cs.summary}
                    </p>

                    {/* Metrikler */}
                    <div
                      className="mt-5 grid border-t border-white/6 pt-4"
                      style={{
                        gridTemplateColumns: `repeat(${Math.min(cs.metrics.length, 3)}, 1fr)`,
                      }}
                    >
                      {cs.metrics.slice(0, 3).map((m, i) => (
                        <div
                          key={i}
                          className={`flex justify-center ${i > 0 ? "border-l border-white/5" : ""}`}
                        >
                          <MetricBadge value={m.value} label={m.label} />
                        </div>
                      ))}
                    </div>

                    {/* Alt: tag'ler + CTA */}
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <div className="flex flex-wrap gap-1.5">
                        {cs.serviceTags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-lg border border-white/5 bg-white/[0.025] px-2 py-1 text-[10px] font-medium text-white/28"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span
                        className="shrink-0 text-[11px] font-black uppercase tracking-[0.15em] transition-all duration-200 group-hover:translate-x-0.5"
                        style={{ color: `${atm.accent}80` }}
                      >
                        Hikayeyi Oku →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* ── Alt CTA ───────────────────────────────────────────────────────── */}
      <section className="border-t border-white/6 py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
          <p className="text-[11px] font-black uppercase tracking-[0.35em] text-white/20">
            Sıradaki
          </p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-white/88 sm:text-4xl">
            Sizin sektörünüzde de{" "}
            <span
              style={{
                background: "linear-gradient(90deg,#be29ec,#0000c8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              benzer sonuçlar
            </span>{" "}
            mümkün.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/32">
            30 dakikalık ücretsiz analiz görüşmesinde mevcut dijital durumunuzu
            değerlendirip size özel büyüme projeksiyonu sunuyoruz.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/iletisim"
              className="inline-flex items-center justify-center rounded-full px-8 py-4 text-[13px] font-black uppercase tracking-[0.16em] text-white transition-all hover:scale-[1.02]"
              style={{
                background: "linear-gradient(90deg,#be29ec,#0000c8)",
                boxShadow: "0 0 24px rgba(190,41,236,0.22)",
              }}
            >
              Ücretsiz Analiz Başlat →
            </Link>
            <Link
              href="/hizmetler"
              className="inline-flex items-center justify-center rounded-full border border-white/8 bg-white/[0.04] px-8 py-4 text-[13px] font-bold uppercase tracking-[0.13em] text-white/45 transition hover:bg-white/[0.08] hover:text-white"
            >
              Hizmetlerimizi İncele
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
