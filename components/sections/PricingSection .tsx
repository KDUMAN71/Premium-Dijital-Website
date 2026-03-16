"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useInView,
} from "framer-motion";
import { ArrowRight, Check, Zap, Settings, MessageSquare } from "lucide-react";

/* ─────────────────────────────────────────────
   Fiyat paketleri
───────────────────────────────────────────── */
const PACKAGES = [
  {
    id: "starter",
    tier: "Hızlı Başlangıç",
    tech: "WordPress / Webflow",
    icon: <Zap size={20} />,
    color: "#22c55e",
    badge: null,
    tagline: "Hızlı, uygun fiyatlı, yönetimi kolay.",
    price: "₺18.000",
    priceNote: "başlangıç fiyatı",
    billingNote: "Proje kapsamına göre netleşir · KDV hariç",
    includes: [
      "Kurumsal web sitesi tasarımı (5–10 sayfa)",
      "Mobil uyumlu responsive yapı",
      "Temel SEO kurulumu",
      "İletişim formu & harita entegrasyonu",
      "Google Analytics kurulumu",
      "1 ay ücretsiz teknik destek",
    ],
    notIncludes: [
      "Özel animasyon & interaktivite",
      "Çok dilli yapı",
      "CRM / rezervasyon entegrasyonu",
    ],
    cta: "Başlangıç Paketi İçin Görüşelim",
    ctaNote: "Ücretsiz ilk görüşme · Teklif bağlayıcı değildir",
  },
  {
    id: "custom",
    tier: "Özel Sistem",
    tech: "Next.js / Headless",
    icon: <Settings size={20} />,
    color: "#be29ec",
    badge: "Önerilen",
    tagline: "Sınır tanımayan performans, tam bağımsızlık.",
    price: "₺45.000",
    priceNote: "başlangıç fiyatı",
    billingNote: "Kapsam görüşmede netleşir · KDV hariç",
    includes: [
      "Tam özel tasarım & geliştirme",
      "Next.js — milisaniyelik performans",
      "Teknik SEO mühendisliği",
      "GA4 & GTM ileri ölçümleme",
      "Çok dilli altyapı (isteğe bağlı)",
      "CRO odaklı landing page'ler",
      "3 ay öncelikli teknik destek",
    ],
    notIncludes: [],
    cta: "Özel Proje Teklifi Alın",
    ctaNote: "Ücretsiz ilk görüşme · Teklif bağlayıcı değildir",
  },
] as const;

/* Ek hizmetler */
const ADDONS = [
  { label: "Aylık SEO & İçerik Paketi", price: "₺4.500/ay'dan" },
  { label: "GA4 & GTM Kurulumu (standalone)", price: "₺3.500'den" },
  { label: "Hız & Core Web Vitals Optimizasyonu", price: "₺4.000'den" },
  { label: "Landing Page (tek sayfa)", price: "₺6.500'den" },
] as const;

type PackageId = (typeof PACKAGES)[number]["id"];

/* ─────────────────────────────────────────────
   Ana bileşen
───────────────────────────────────────────── */
export default function PricingSection() {
  const [active, setActive] = useState<PackageId>("custom");
  const prefersReduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.1 });

  const pkg = PACKAGES.find((p) => p.id === active)!;

  return (
    <section
      ref={sectionRef}
      id="fiyatlandirma"
      className="border-t border-white/8 bg-[#030305] px-4 py-20 sm:px-5 sm:py-24 md:px-6"
      itemScope
      itemType="https://schema.org/OfferCatalog"
    >
      <div className="mx-auto max-w-5xl">
        {/* Başlık */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 text-center"
        >
          <p className="mb-4 text-[11px] font-black uppercase tracking-[0.4em] text-brand-purple">
            Fiyatlandırma
          </p>
          <h2
            className="text-4xl font-black uppercase italic leading-none tracking-tighter text-white sm:text-5xl"
            itemProp="name"
          >
            Şeffaf Başlangıç,{" "}
            <span className="text-white/20">Özel Teklif.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-white/50">
            Başlangıç fiyatları şeffaf. Tam kapsam ve kesin fiyat ilk görüşmede
            — ücretsiz — netleşir.
          </p>
        </motion.div>

        {/* Tier toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10 flex justify-center"
        >
          <div className="flex gap-1 rounded-2xl border border-white/10 bg-white/4 p-1.5">
            {PACKAGES.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setActive(p.id)}
                aria-pressed={active === p.id}
                className="cursor-pointer relative flex items-center gap-2 rounded-xl px-5 py-2.5 text-[12px] font-black uppercase tracking-wider transition-all duration-200"
                style={
                  active === p.id
                    ? { background: "white", color: "black" }
                    : { color: "rgba(255,255,255,0.40)" }
                }
              >
                {p.badge && active === p.id && (
                  <span
                    className="rounded-full px-2 py-0.5 text-[9px] font-black"
                    style={{ background: p.color, color: "white" }}
                  >
                    {p.badge}
                  </span>
                )}
                {p.tier}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Ana içerik */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: prefersReduced ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: prefersReduced ? 0 : -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]"
          >
            {/* Sol — dahil olanlar */}
            <div
              className="rounded-2xl border p-7"
              style={{
                borderColor: `${pkg.color}28`,
                background: `${pkg.color}07`,
              }}
              itemScope
              itemType="https://schema.org/Offer"
            >
              {/* Paket başlığı */}
              <div className="mb-6 flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-2xl"
                    style={{ background: `${pkg.color}20`, color: pkg.color }}
                  >
                    {pkg.icon}
                  </span>
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white/35">
                      {pkg.tech}
                    </p>
                    <p className="text-[17px] font-bold text-white">
                      {pkg.tier}
                    </p>
                  </div>
                </div>
                {pkg.badge && (
                  <span
                    className="rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-wider"
                    style={{
                      borderColor: `${pkg.color}40`,
                      color: pkg.color,
                      background: `${pkg.color}12`,
                    }}
                  >
                    {pkg.badge}
                  </span>
                )}
              </div>

              <p className="mb-6 text-[14px] leading-relaxed text-white/60">
                {pkg.tagline}
              </p>

              {/* Dahil olanlar */}
              <p className="mb-3 text-[10px] font-black uppercase tracking-[0.22em] text-white/30">
                Dahil Olanlar
              </p>
              <div className="flex flex-col gap-2">
                {pkg.includes.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <Check
                      size={14}
                      className="mt-0.5 shrink-0"
                      style={{ color: pkg.color }}
                    />
                    <span className="text-[13px] text-white/75">{item}</span>
                  </div>
                ))}
              </div>

              {/* Dahil olmayanlar */}
              {pkg.notIncludes.length > 0 && (
                <div className="mt-5 border-t border-white/6 pt-5">
                  <p className="mb-3 text-[10px] font-black uppercase tracking-[0.22em] text-white/20">
                    Bu Pakete Dahil Değil
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {pkg.notIncludes.map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <span className="mt-0.5 text-[12px] text-white/20">
                          —
                        </span>
                        <span className="text-[12px] text-white/35">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sağ — fiyat + CTA */}
            <div className="flex flex-col gap-5">
              {/* Fiyat kartı */}
              <div className="rounded-2xl border border-white/8 bg-white/3 p-6">
                <p className="mb-1 text-[11px] font-black uppercase tracking-[0.2em] text-white/30">
                  Başlangıç Fiyatı
                </p>
                <div className="flex items-baseline gap-2 mt-2 mb-1">
                  <span
                    className="text-[40px] font-black leading-none tracking-tighter text-white"
                    itemProp="price"
                  >
                    {pkg.price}
                  </span>
                </div>
                <p className="text-[12px] text-white/40">{pkg.priceNote}</p>
                <div className="mt-4 rounded-xl border border-white/6 bg-white/3 px-4 py-3">
                  <p className="text-[11px] leading-relaxed text-white/40">
                    {pkg.billingNote}
                  </p>
                </div>
              </div>

              {/* Sağlık & turizm notu */}
              <div className="rounded-xl border border-white/6 bg-white/2 px-4 py-3">
                <p className="text-[11px] leading-relaxed text-white/40">
                  <span className="font-bold text-white/55">
                    Sağlık turizmi & uluslararası projeler
                  </span>{" "}
                  için çok dilli yapı, medikal SEO ve uluslararası hasta akışı
                  ihtiyaçları fiyatı etkiler — görüşmede netleştiriyoruz.
                </p>
              </div>

              {/* CTA */}
              <Link
                href="/iletisim#analiz"
                className="group relative flex cursor-pointer items-center justify-between overflow-hidden rounded-xl px-6 py-4 text-[12px] font-black uppercase tracking-[0.1em] text-white transition-all hover:scale-[1.01]"
                style={{ background: "linear-gradient(90deg,#be29ec,#0000c8)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 0 24px rgba(190,41,236,0.35)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <span className="absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative z-10">{pkg.cta}</span>
                <ArrowRight
                  size={15}
                  className="relative z-10 transition-transform group-hover:translate-x-1"
                />
              </Link>
              <p className="text-center text-[11px] text-white/25">
                {pkg.ctaNote}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Ek hizmetler */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 border-t border-white/6 pt-10"
        >
          <p className="mb-6 text-center text-[11px] font-black uppercase tracking-[0.3em] text-white/25">
            Ek & Bağımsız Hizmetler
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {ADDONS.map((a, i) => (
              <motion.div
                key={a.label}
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.35 + i * 0.06 }}
                className="flex items-center justify-between rounded-xl border border-white/7 bg-white/2 px-5 py-3.5"
              >
                <span className="text-[13px] font-medium text-white/70">
                  {a.label}
                </span>
                <span className="shrink-0 text-[12px] font-bold text-white/45">
                  {a.price}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Alt mesaj */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 flex flex-col items-center gap-4 text-center"
        >
          <div className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/3 px-6 py-4">
            <MessageSquare size={16} className="shrink-0 text-brand-purple" />
            <p className="text-[13px] leading-relaxed text-white/55">
              Bütçeniz net değilse sorun değil. İlk görüşmede ihtiyacı ve
              seçenekleri birlikte değerlendiriyoruz.
              <Link
                href="/iletisim#analiz"
                className="ml-1 font-bold text-white/70 underline underline-offset-2 hover:text-white transition-colors"
              >
                Görüşme ayarla →
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
