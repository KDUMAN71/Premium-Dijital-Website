// components/sections/case-studies/CaseStudiesSection.tsx
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CaseStudy } from "@/components/sections/case-studies/case-study-data";

/* ─────────────────────────────────────────────
   Sayı animasyonu
───────────────────────────────────────────── */
function useCounter(target: number, duration = 1200, active = false) {
  const [count, setCount] = useState(0);
  const prefersReduced = useReducedMotion();
  useEffect(() => {
    if (!active || prefersReduced) {
      setCount(target);
      return;
    }
    let v = 0;
    const step = target / (duration / 16);
    const t = setInterval(() => {
      v += step;
      if (v >= target) {
        setCount(target);
        clearInterval(t);
      } else setCount(Math.floor(v));
    }, 16);
    return () => clearInterval(t);
  }, [active, target, duration, prefersReduced]);
  return count;
}

function parseMetric(raw: string) {
  const m = raw
    .replace(/\s/g, "")
    .match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);
  if (!m) return { num: 0, prefix: "", suffix: raw };
  return { num: parseFloat(m[2]), prefix: m[1], suffix: m[3] };
}

function AnimatedMetric({
  value,
  label,
  active,
  size = "md",
}: {
  value: string;
  label?: string;
  active: boolean;
  size?: "lg" | "md" | "sm";
}) {
  const { num, prefix, suffix } = parseMetric(value);
  const isDecimal = num % 1 !== 0;
  const count = useCounter(isDecimal ? num * 10 : num, 1200, active);
  const display = isDecimal ? (count / 10).toFixed(1) : count.toString();

  const sizeClass = {
    lg: "text-5xl sm:text-6xl md:text-7xl",
    md: "text-3xl sm:text-4xl",
    sm: "text-2xl sm:text-3xl",
  }[size];

  return (
    <div className="flex flex-col items-center gap-1 text-center">
      {label && (
        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#be29ec]">
          {label}
        </p>
      )}
      <p
        className={`font-black leading-none tracking-tighter tabular-nums text-white ${sizeClass}`}
      >
        {prefix}
        {display}
        {suffix}
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Featured kart
───────────────────────────────────────────── */
function FeaturedCard({ c, index }: { c: CaseStudy; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const secondary = c.home?.secondaryMetrics ?? [];

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: prefersReduced ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-[#0a0a0a] sm:rounded-[2.5rem] lg:rounded-[3rem]"
      style={{
        boxShadow:
          "0 0 80px rgba(190,41,236,0.06), 0 32px 80px rgba(0,0,0,0.5)",
      }}
      itemScope
      itemType="https://schema.org/Article"
    >
      {/* Arka plan parıltıları */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-32 -left-32 h-64 w-64 rounded-full bg-[#be29ec] opacity-[0.06] blur-[80px]" />
        <div className="absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-[#0000c8] opacity-[0.06] blur-[80px]" />
        {/* Ghost chart */}
        <svg
          className="absolute bottom-0 right-0 h-28 w-48 opacity-[0.04] md:h-36 md:w-64"
          aria-hidden="true"
          viewBox="0 0 240 80"
          preserveAspectRatio="xMaxYMax meet"
        >
          {[30, 45, 38, 55, 48, 72, 65, 88, 78, 95, 85, 100].map((h, i) => (
            <rect
              key={i}
              x={i * 20 + 2}
              y={80 - h * 0.75}
              width={16}
              height={h * 0.75}
              rx="3"
              fill="white"
            />
          ))}
          <polyline
            points="10,57 30,46 50,51 70,38 90,44 110,26 130,31 150,14 170,20 190,5 210,11 230,5"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_300px]">
        {/* Sol — içerik */}
        <div className="flex flex-col justify-between gap-8 p-6 sm:p-8 md:p-10 lg:p-12">
          {/* Katman 1: rozetler */}
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="inline-flex items-center rounded-full border px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.2em]"
              style={{
                borderColor: "rgba(190,41,236,0.3)",
                color: "#d8b4fe",
                background: "rgba(190,41,236,0.08)",
              }}
            >
              {c.sector}
            </span>
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-white/50">
              {c.timeframeDays} Gün
            </span>
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-white/50">
              {c.tag}
            </span>
            <span className="ml-auto text-[9px] font-black uppercase tracking-[0.2em] text-white/18">
              Kanıt Dosyası #{String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Katman 2: başlık + tek cümle */}
          <div className="flex flex-col gap-3">
            <h3
              className="text-2xl font-black uppercase leading-[0.95] tracking-tighter text-white sm:text-3xl md:text-[2.2rem] lg:text-[2.4rem]"
              itemProp="headline"
            >
              {c.home?.title}
            </h3>
            <p
              className="text-sm leading-relaxed text-white/65 sm:text-[15px]"
              itemProp="description"
            >
              {c.home?.summary}
            </p>
          </div>

          {/* Katman 3: servis etiketleri — ne yapıldı */}
          <div className="flex flex-wrap gap-2">
            {c.serviceTags.map((tag) => (
              <span
                key={tag}
                className="rounded-lg border border-white/8 bg-white/4 px-3 py-1.5 text-[11px] font-semibold text-white/55"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col gap-3 border-t border-white/6 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href={`/sonuclar/${c.slug}`}
              className="text-[11px] font-black uppercase tracking-[0.22em] text-white/50 transition-colors hover:text-white"
              itemProp="url"
            >
              Tüm Sonucu Gör →
            </Link>
            <Link
              href="#analiz"
              className="inline-flex items-center justify-center rounded-full px-6 py-3.5 text-[11px] font-black uppercase tracking-[0.18em] text-white transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(190,41,236,0.45)]"
              style={{
                background: "linear-gradient(90deg,#be29ec,#0000c8)",
                boxShadow: "0 0 20px rgba(190,41,236,0.25)",
              }}
            >
              Benzer Sonucu Bizim İçin Uygula →
            </Link>
          </div>
        </div>

        {/* Sağ — metrik paneli */}
        <div
          className="flex flex-col items-center justify-center gap-5 border-t border-white/5 p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-10"
          style={{
            background:
              "linear-gradient(160deg,rgba(190,41,236,0.05),rgba(0,0,200,0.07))",
          }}
        >
          {/* Ana metrik */}
          <div
            className="flex w-full flex-col items-center gap-2 rounded-2xl border p-6 text-center"
            style={{
              borderColor: "rgba(190,41,236,0.18)",
              background: "rgba(190,41,236,0.07)",
            }}
          >
            <AnimatedMetric
              value={c.home?.primaryMetric?.value ?? ""}
              label={c.home?.primaryMetric?.label}
              active={visible}
              size="lg"
            />
            {c.home?.primaryMetric?.context && (
              <p className="mt-1 text-[10px] leading-snug text-white/40 max-w-[150px]">
                {c.home.primaryMetric.context}
              </p>
            )}
          </div>

          {/* Öncesi → Sonrası bandı */}
          <div className="flex w-full items-center gap-3">
            <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/25 whitespace-nowrap">
              Öncesi
            </span>
            <div className="relative flex-1 h-px overflow-hidden">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(90deg,rgba(255,255,255,0.06),rgba(190,41,236,0.5),rgba(0,0,200,0.5))",
                }}
              />
              <motion.div
                className="absolute top-1/2 h-1 w-6 -translate-y-1/2 rounded-full blur-[2px]"
                style={{
                  background:
                    "linear-gradient(90deg,transparent,#be29ec,#0000c8,transparent)",
                }}
                animate={{ x: visible ? ["0%", "800%"] : "0%" }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 0.5,
                }}
              />
            </div>
            <span
              className="text-[9px] font-bold uppercase tracking-[0.18em] whitespace-nowrap"
              style={{ color: "#be29ec" }}
            >
              Sonrası
            </span>
          </div>

          {/* İkincil metrikler */}
          {secondary.length > 0 && (
            <div className="grid w-full grid-cols-2 gap-3">
              {secondary.slice(0, 2).map((m, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-1.5 rounded-xl border border-white/8 p-4 text-center"
                  style={{ background: "rgba(255,255,255,0.02)" }}
                >
                  <AnimatedMetric
                    value={m.value}
                    label={m.label}
                    active={visible}
                    size="sm"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}

/* ─────────────────────────────────────────────
   Kompakt kart
───────────────────────────────────────────── */
function CompactCard({ c, index }: { c: CaseStudy; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Tek vurucu cümle: sorun → kaldıraç → sonuç
  const insight = c.home?.insight
    ? `${c.home.insight.issue} — ${c.home.insight.lever} ile ${c.home.insight.result}`
    : c.home?.bullets?.[0];

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: prefersReduced ? 0 : 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        delay: index * 0.1,
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-[1.5rem] border border-white/8 bg-[#0a0a0a] p-5 transition-all duration-300 hover:border-white/15 sm:rounded-[2rem] sm:p-6"
      style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.35)" }}
      itemScope
      itemType="https://schema.org/Article"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-400 group-hover:opacity-100 rounded-[inherit]"
        style={{
          background:
            "linear-gradient(135deg,rgba(190,41,236,0.03),rgba(0,0,200,0.03))",
        }}
      />

      <div className="relative z-10 flex flex-col gap-4">
        {/* Katman 1: sektör + index */}
        <div className="flex items-center justify-between gap-2">
          <span
            className="inline-flex items-center rounded-full border px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.16em]"
            style={{
              borderColor: "rgba(190,41,236,0.22)",
              color: "#d8b4fe",
              background: "rgba(190,41,236,0.06)",
            }}
          >
            {c.sector}
          </span>
          <span className="font-mono text-[10px] font-black text-white/18">
            #{String(index + 2).padStart(2, "0")}
          </span>
        </div>

        {/* Katman 1: büyük metrik */}
        <div
          className="flex flex-col items-center rounded-xl border py-5 text-center"
          style={{
            borderColor: "rgba(190,41,236,0.14)",
            background: "rgba(190,41,236,0.05)",
          }}
        >
          <AnimatedMetric
            value={c.home?.primaryMetric?.value ?? ""}
            label={c.home?.primaryMetric?.label}
            active={visible}
            size="md"
          />
        </div>

        {/* Katman 2: başlık */}
        <h3
          className="text-[15px] font-black uppercase leading-snug tracking-tight text-white sm:text-base"
          itemProp="headline"
        >
          {c.home?.title}
        </h3>

        {/* Katman 3: tek vurucu cümle */}
        {insight && (
          <p className="text-[12px] leading-relaxed text-white/60">{insight}</p>
        )}

        {/* Servis etiketleri */}
        <div className="flex flex-wrap gap-1.5">
          {c.serviceTags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-white/8 bg-white/4 px-2 py-1 text-[10px] font-semibold text-white/50"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Alt CTA */}
      <div className="relative z-10 mt-5 flex items-center justify-between border-t border-white/6 pt-4">
        <Link
          href={`/sonuclar/${c.slug}`}
          className="text-[10px] font-black uppercase tracking-[0.18em] text-white/45 transition-colors hover:text-white"
          itemProp="url"
        >
          Sonucu Gör →
        </Link>
        <Link
          href="#analiz"
          className="text-[10px] font-black uppercase tracking-[0.16em] transition-colors hover:text-white"
          style={{ color: "#be29ec" }}
        >
          Benimle Uygula →
        </Link>
      </div>
    </motion.article>
  );
}

/* ─────────────────────────────────────────────
   JSON-LD
───────────────────────────────────────────── */
function Schema({ items, total }: { items: CaseStudy[]; total: number }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Premium Dijital — Müşteri Sonuçları",
    description:
      "Dijital pazarlama, SEO ve performans reklamcılığıyla elde edilen ölçülebilir sonuçlar",
    numberOfItems: total,
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Article",
        name: c.home?.title,
        description: c.home?.summary,
        url: `https://premiumdijital.com/sonuclar/${c.slug}`,
        about: { "@type": "Thing", name: c.sector },
      },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/* ─────────────────────────────────────────────
   Ana bileşen
───────────────────────────────────────────── */
export default function CaseStudiesSection({
  items,
  totalCount,
}: {
  items: CaseStudy[];
  totalCount?: number;
}) {
  if (!items?.length) return null;
  const [featured, ...rest] = items;
  const total = totalCount ?? items.length;

  return (
    <section
      id="sonuclar"
      aria-label="Müşteri sonuçları"
      className="border-t border-white/5 bg-[#07070d] px-4 py-16 sm:px-5 sm:py-20 md:px-6 md:py-28"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      <Schema items={items} total={total} />

      <div className="mx-auto max-w-6xl">
        {/* Başlık */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-16"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 mb-4">
                <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-white/50">
                  Sonuçlar
                </span>
              </div>
              <h2
                className="text-3xl font-bold uppercase tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl"
                itemProp="name"
              >
                Söz değil,{" "}
                <span className="bg-gradient-to-r from-[#be29ec] to-[#0000c8] bg-clip-text text-transparent">
                  veri.
                </span>
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-white/55 sm:text-right">
              Yorum değil, uygulama sonrası ölçülen gerçek sonuçlar.
            </p>
          </div>
        </motion.div>

        {/* Featured */}
        {featured && <FeaturedCard c={featured} index={0} />}

        {/* Kompakt grid */}
        {rest.length > 0 && (
          <div
            className={`mt-5 grid gap-5 sm:mt-6 md:mt-8 ${
              rest.length === 1
                ? "grid-cols-1 max-w-lg"
                : rest.length === 2
                  ? "grid-cols-1 sm:grid-cols-2"
                  : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {rest.slice(0, 3).map((c, i) => (
              <CompactCard key={c.slug} c={c} index={i} />
            ))}
          </div>
        )}

        {/* Alt CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center md:mt-16"
        >
          <Link
            href="/sonuclar"
            className="group inline-flex flex-col items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 py-4 transition-all hover:bg-white/10 hover:scale-[1.02]"
          >
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-white/60 transition-colors group-hover:text-white">
              Tüm Sonuçları Gör
            </span>
            <span className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.2em] text-white/30">
              {total}+ sektörler arası gerçek sonuç
            </span>
          </Link>
          <Link
            href="#analiz"
            className="inline-flex items-center justify-center rounded-full px-8 py-4 text-[11px] font-black uppercase tracking-[0.24em] text-white transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(190,41,236,0.4)]"
            style={{
              background: "linear-gradient(90deg,#be29ec,#0000c8)",
              boxShadow: "0 0 24px rgba(190,41,236,0.25)",
            }}
          >
            Ücretsiz Analiz Başlat →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
