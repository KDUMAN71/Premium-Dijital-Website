"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useInView,
} from "framer-motion";
import {
  ArrowRight,
  ShoppingCart,
  Phone,
  Star,
  MapPin,
  Calendar,
  Heart,
  Search,
  ChevronRight,
} from "lucide-react";

/* ─────────────────────────────────────────────
   Sektör verileri — her biri gerçek endüstri
   rengi ve kendine özgü layout mantığı ile
───────────────────────────────────────────── */
const SHOWCASES = [
  {
    id: "klinik",
    sector: "Sağlık & Klinik",
    title: "MediCare Estetik Klinik",
    url: "medicare-klinik.com",
    tag: "Sağlık Turizmi",
    desc: "Güven inşa eden, randevu almayı kolaylaştıran, uluslararası hastalara hitap eden klinik altyapısı.",
    highlights: ["Online randevu", "Çok dilli", "Hasta portalı"],
    /* Sağlık = temiz beyaz/açık mavi — steril, güvenilir */
    accent: "#0ea5e9",
    accentSecondary: "#0284c7",
    bg: "#f0f9ff",
    isDark: false,
  },
  {
    id: "turizm",
    sector: "Turizm & Konaklama",
    title: "Aegean Boutique Hotels",
    url: "aegeanboutique.com",
    tag: "Lüks Turizm",
    desc: "Rezervasyon dönüşümünü maksimize eden, sezon yönetimine uygun premium konaklama deneyimi.",
    highlights: ["Rezervasyon motoru", "Galeri sistemi", "Çok dilli"],
    /* Turizm = altın/amber — lüks, sıcak, davetkar */
    accent: "#d97706",
    accentSecondary: "#b45309",
    bg: "#0c0a06",
    isDark: true,
  },
  {
    id: "eticaret",
    sector: "E-Ticaret & Marka",
    title: "Nomad Studio Shop",
    url: "nomadstudio.co",
    tag: "Premium Ürün",
    desc: "Ürünü sahneleyen, hikaye anlatan ve satışa dönüştüren yüksek performanslı e-ticaret altyapısı.",
    highlights: ["Ürün sahneleme", "Hızlı checkout", "Stok yönetimi"],
    /* E-Ticaret = siyah/gri — modern, minimal, ürün odaklı */
    accent: "#f4f4f5",
    accentSecondary: "#a1a1aa",
    bg: "#09090b",
    isDark: true,
  },
] as const;

/* ─────────────────────────────────────────────
   SAĞLIK KLİNİĞİ MOCKUP
   — Açık tema, steril beyaz, güven odaklı
   — Nav: logo + menü + "Randevu Al" CTA
   — Hero: doktor görseli + güven badges
   — İçerik: hizmetler + doktor profilleri
───────────────────────────────────────────── */
function KlinikMockup() {
  return (
    <div
      className="w-full overflow-hidden rounded-2xl border shadow-2xl"
      style={{ background: "#03080f", borderColor: "#0ea5e920" }}
    >
      {/* Browser chrome */}
      <div
        className="flex items-center gap-1.5 border-b px-3 py-2.5"
        style={{ background: "#020609", borderColor: "#0ea5e912" }}
      >
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/10" />
        <span
          className="h-2 w-2 rounded-full"
          style={{ background: "#0ea5e9" }}
        />
        <div
          className="ml-2 flex flex-1 items-center gap-1.5 rounded-md border px-2.5 py-1 text-[9px]"
          style={{
            background: "#0c1825",
            borderColor: "#0ea5e918",
            color: "#0ea5e9",
          }}
        >
          🔒 medicare-klinik.com
        </div>
      </div>

      {/* Nav */}
      <div
        className="flex items-center justify-between border-b px-5 py-3"
        style={{ borderColor: "#0ea5e912", background: "rgba(0,0,0,0.3)" }}
      >
        <div className="flex items-center gap-2">
          <div
            className="flex h-7 w-7 items-center justify-center rounded-lg"
            style={{ background: "linear-gradient(135deg,#0ea5e9,#0284c7)" }}
          >
            <Heart size={13} className="text-white" />
          </div>
          <div>
            <div className="text-[11px] font-black text-white leading-tight">
              MediCare
            </div>
            <div
              className="text-[8px] font-semibold uppercase tracking-wider"
              style={{ color: "#38bdf8" }}
            >
              Estetik Klinik
            </div>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          {["Tedaviler", "Doktorlar", "Sağlık Turizmi", "İletişim"].map((t) => (
            <span key={t} className="text-[9px] font-semibold text-white/40">
              {t}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Phone size={11} style={{ color: "#0ea5e9" }} />
          <div
            className="rounded-lg px-3 py-1.5 text-[9px] font-black text-white uppercase tracking-wide"
            style={{ background: "linear-gradient(90deg,#0ea5e9,#0284c7)" }}
          >
            Randevu Al
          </div>
        </div>
      </div>

      {/* Hero */}
      <div
        className="relative overflow-hidden px-5 py-5"
        style={{
          background: "linear-gradient(135deg,#041020,#03080f)",
          minHeight: 130,
        }}
      >
        <div
          className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full blur-3xl"
          style={{ background: "#0ea5e918" }}
        />
        <div className="grid grid-cols-[1fr_auto] gap-4 items-start">
          <div>
            <div className="mb-3 flex flex-wrap gap-1.5">
              <div
                className="flex items-center gap-1 rounded-full border px-2 py-0.5 text-[8px] font-bold"
                style={{
                  borderColor: "#0ea5e930",
                  color: "#38bdf8",
                  background: "#0ea5e910",
                }}
              >
                <span className="text-yellow-400">★</span> 4.9 · 2.400+ Hasta
              </div>
              <div
                className="flex items-center gap-1 rounded-full border px-2 py-0.5 text-[8px] font-bold"
                style={{
                  borderColor: "#0ea5e930",
                  color: "#38bdf8",
                  background: "#0ea5e910",
                }}
              >
                ✓ JCI Akredite
              </div>
            </div>
            <div className="mb-0.5 text-[18px] font-black text-white leading-tight">
              Sağlıkta
            </div>
            <div
              className="mb-3 text-[18px] font-black leading-tight"
              style={{ color: "#0ea5e9" }}
            >
              Güven & Uzmanlık
            </div>
            <div className="flex gap-2">
              <div
                className="rounded-lg px-3 py-2 text-[9px] font-black text-white"
                style={{ background: "linear-gradient(90deg,#0ea5e9,#0284c7)" }}
              >
                Ücretsiz Danışma
              </div>
              <div
                className="rounded-lg border px-3 py-2 text-[9px] font-bold"
                style={{ borderColor: "#0ea5e925", color: "#38bdf8" }}
              >
                Tedaviler →
              </div>
            </div>
          </div>
          {/* Doktor silueti */}
          <div className="relative">
            <div
              className="h-24 w-20 overflow-hidden rounded-2xl border"
              style={{
                background: "linear-gradient(180deg,#0a2540,#041020)",
                borderColor: "#0ea5e920",
              }}
            >
              <svg viewBox="0 0 64 80" className="w-full h-full" fill="none">
                <circle cx="32" cy="20" r="12" fill="#0284c7" />
                <path d="M8 80 C8 52 56 52 56 80" fill="#0369a1" />
                <rect
                  x="24"
                  y="34"
                  width="16"
                  height="3"
                  rx="1.5"
                  fill="white"
                  opacity="0.6"
                />
                <circle cx="32" cy="20" r="5" fill="#7dd3fc" opacity="0.6" />
              </svg>
            </div>
            <div
              className="absolute -bottom-1 -right-1 rounded-full p-1 border-2 border-[#03080f]"
              style={{ background: "#22c55e" }}
            >
              <div className="h-1.5 w-1.5 rounded-full bg-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Tedavi kategorileri — orta doldurucu */}
      <div
        className="px-5 py-4 border-t"
        style={{ borderColor: "#0ea5e910", background: "#020810" }}
      >
        <div
          className="mb-2.5 text-[9px] font-black uppercase tracking-wider"
          style={{ color: "#0ea5e9" }}
        >
          Tedavi Alanlarımız
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {[
            { icon: "🦷", label: "Diş Estetiği" },
            { icon: "💉", label: "Estetik" },
            { icon: "👁", label: "Göz" },
            { icon: "🫀", label: "Kardiyoloji" },
            { icon: "🦴", label: "Ortopedi" },
            { icon: "🧬", label: "Onkoloji" },
            { icon: "🩺", label: "Dahiliye" },
            { icon: "✂️", label: "Cerrahi" },
          ].map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center gap-1 rounded-xl border p-2"
              style={{ borderColor: "#0ea5e915", background: "#041020" }}
            >
              <span className="text-sm">{s.icon}</span>
              <span
                className="text-[7px] font-semibold text-center leading-tight"
                style={{ color: "#7dd3fc" }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Sosyal kanıt */}
      <div
        className="border-t px-5 py-3"
        style={{ borderColor: "#0ea5e910", background: "rgba(0,0,0,0.3)" }}
      >
        <div className="flex items-center justify-between">
          <div className="flex -space-x-2">
            {["#0284c7", "#0369a1", "#0ea5e9"].map((c, i) => (
              <div
                key={i}
                className="h-6 w-6 rounded-full border-2"
                style={{ background: c, borderColor: "#03080f" }}
              />
            ))}
            <div
              className="flex h-6 w-6 items-center justify-center rounded-full border-2 text-[7px] font-black"
              style={{
                background: "#041020",
                borderColor: "#03080f",
                color: "#38bdf8",
              }}
            >
              +9K
            </div>
          </div>
          <div className="text-[9px] text-white/30">Tedavi edilen hasta</div>
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                size={8}
                className="fill-yellow-400 text-yellow-400"
              />
            ))}
            <span className="ml-1 text-[8px] font-bold text-white/50">4.9</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   TURİZM & KONAKLAMA MOCKUP
   — Koyu lüks tema, altın/amber aksan
   — Büyük hero görsel, rezervasyon formu
   — Oda kartları, özellikler
───────────────────────────────────────────── */
function TurizmMockup() {
  return (
    <div
      className="w-full overflow-hidden rounded-2xl border shadow-2xl"
      style={{ background: "#0c0a06", borderColor: "#d9770620" }}
    >
      {/* Browser chrome */}
      <div
        className="flex items-center gap-1.5 border-b px-3 py-2.5"
        style={{ background: "#0a0805", borderColor: "#d9770615" }}
      >
        <span className="h-2 w-2 rounded-full bg-red-800/60" />
        <span className="h-2 w-2 rounded-full bg-yellow-800/60" />
        <span className="h-2 w-2 rounded-full bg-green-800/60" />
        <div
          className="ml-2 flex flex-1 items-center rounded-md px-2.5 py-1 text-[9px] border"
          style={{
            background: "#1a1509",
            borderColor: "#d9770620",
            color: "#d97706",
          }}
        >
          aegeanboutique.com
        </div>
      </div>

      {/* Nav */}
      <div
        className="flex items-center justify-between px-5 py-3 border-b"
        style={{ borderColor: "#d9770618", background: "rgba(0,0,0,0.4)" }}
      >
        <div
          className="text-[13px] font-black tracking-widest uppercase"
          style={{ color: "#d97706" }}
        >
          AEGEAN
        </div>
        <div className="hidden sm:flex gap-4">
          {["Odalar", "Restorant", "Spa"].map((t) => (
            <span key={t} className="text-[10px] font-semibold text-white/50">
              {t}
            </span>
          ))}
        </div>
        <div
          className="rounded-lg px-3 py-1.5 text-[9px] font-black uppercase tracking-wide text-black"
          style={{ background: "#d97706" }}
        >
          Rezervasyon
        </div>
      </div>

      {/* Hero — büyük görsel + tagline + slider */}
      <div
        className="relative overflow-hidden"
        style={{
          minHeight: 140,
          background: "linear-gradient(180deg,#1a1206,#0c0a06)",
        }}
      >
        <div className="grid grid-cols-[1fr_auto] gap-0">
          {/* Sol: metin */}
          <div className="relative px-5 py-5">
            <div className="absolute inset-0 flex items-end opacity-30">
              <svg
                viewBox="0 0 200 100"
                className="w-full"
                preserveAspectRatio="xMidYMax slice"
              >
                <path
                  d="M0 80 Q50 60 100 70 Q150 80 200 60 L200 100 L0 100Z"
                  fill="#1a1206"
                />
                <circle cx="160" cy="25" r="18" fill="#d97706" opacity="0.3" />
              </svg>
            </div>
            <div className="relative z-10">
              <div
                className="mb-1 text-[9px] font-black uppercase tracking-[0.3em]"
                style={{ color: "#d97706" }}
              >
                Ege Kıyısında
              </div>
              <div className="text-[20px] font-black text-white leading-tight">
                Lüksü
              </div>
              <div
                className="text-[20px] font-black leading-tight"
                style={{ color: "#d97706" }}
              >
                Keşfedin
              </div>
              <div className="mt-2 text-[9px] text-white/40">
                Eşsiz Ege manzarası, butik konfor
              </div>
            </div>
          </div>
          {/* Sağ: slider görseli */}
          <div
            className="relative w-28 overflow-hidden"
            style={{ background: "linear-gradient(135deg,#2d1f0a,#1a1206)" }}
          >
            {/* Sahil/otel silueti */}
            <svg
              viewBox="0 0 80 100"
              className="absolute inset-0 h-full w-full"
              fill="none"
              preserveAspectRatio="xMidYMid slice"
            >
              <rect
                x="10"
                y="30"
                width="60"
                height="50"
                rx="4"
                fill="#2d1f0a"
              />
              <rect
                x="15"
                y="35"
                width="12"
                height="10"
                rx="1"
                fill="#d97706"
                fillOpacity="0.4"
              />
              <rect
                x="32"
                y="35"
                width="12"
                height="10"
                rx="1"
                fill="#d97706"
                fillOpacity="0.25"
              />
              <rect
                x="49"
                y="35"
                width="12"
                height="10"
                rx="1"
                fill="#d97706"
                fillOpacity="0.15"
              />
              <rect
                x="15"
                y="52"
                width="12"
                height="10"
                rx="1"
                fill="#d97706"
                fillOpacity="0.2"
              />
              <rect
                x="32"
                y="52"
                width="12"
                height="10"
                rx="1"
                fill="#d97706"
                fillOpacity="0.35"
              />
              <rect
                x="49"
                y="52"
                width="12"
                height="10"
                rx="1"
                fill="#d97706"
                fillOpacity="0.1"
              />
              <circle cx="40" cy="18" r="10" fill="#d97706" fillOpacity="0.2" />
              <circle cx="40" cy="18" r="6" fill="#d97706" fillOpacity="0.3" />
              <path
                d="M0 85 Q20 75 40 80 Q60 85 80 75 L80 100 L0 100Z"
                fill="#0c0a06"
              />
            </svg>
            {/* Slider gösterge noktaları */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-1 rounded-full"
                  style={{
                    width: i === 1 ? 12 : 4,
                    background: i === 1 ? "#d97706" : "rgba(255,255,255,0.3)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Rezervasyon bar */}
      <div
        className="mx-4 -mt-3 relative z-10 rounded-xl border p-3 shadow-xl"
        style={{ background: "#1a1509", borderColor: "#d9770630" }}
      >
        <div className="grid grid-cols-3 gap-2">
          {[
            { icon: <Calendar size={9} />, label: "Giriş", val: "15 Mar" },
            { icon: <Calendar size={9} />, label: "Çıkış", val: "18 Mar" },
            { icon: <MapPin size={9} />, label: "Misafir", val: "2 Kişi" },
          ].map((f) => (
            <div key={f.label} className="flex flex-col gap-0.5">
              <div
                className="flex items-center gap-1 text-[7px] font-bold uppercase tracking-wider"
                style={{ color: "#d97706" }}
              >
                {f.icon} {f.label}
              </div>
              <div className="text-[10px] font-bold text-white/80">{f.val}</div>
            </div>
          ))}
        </div>
        <div
          className="mt-2.5 w-full rounded-lg py-2 text-center text-[9px] font-black uppercase tracking-widest text-black"
          style={{ background: "#d97706" }}
        >
          Müsaitlik Kontrol Et
        </div>
      </div>

      {/* Oda kartları */}
      <div className="px-4 pb-4 pt-5">
        <div
          className="mb-2.5 text-[9px] font-black uppercase tracking-wider"
          style={{ color: "#d97706" }}
        >
          Odalarımız
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { name: "Deluxe Suit", price: "€280", tag: "Deniz Manzarası" },
            { name: "Villa Suite", price: "€520", tag: "Özel Havuz" },
          ].map((r) => (
            <div
              key={r.name}
              className="overflow-hidden rounded-xl border"
              style={{ borderColor: "#d9770618", background: "#1a1509" }}
            >
              {/* Oda görseli placeholder */}
              <div
                className="relative h-12 overflow-hidden"
                style={{
                  background: "linear-gradient(135deg,#2d1f0a,#1a1206)",
                }}
              >
                <div
                  className="absolute bottom-1 right-1 rounded-full px-1.5 py-0.5 text-[7px] font-bold text-black"
                  style={{ background: "#d97706" }}
                >
                  {r.tag}
                </div>
              </div>
              <div className="p-2">
                <div className="text-[9px] font-bold text-white/80">
                  {r.name}
                </div>
                <div className="text-[8px]" style={{ color: "#d97706" }}>
                  Gecelik {r.price}'dan
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   E-TİCARET MOCKUP
   — Ultra minimal siyah/beyaz
   — Ürün grid, sepet, satın alma odaklı
   — Product spotlight
───────────────────────────────────────────── */
function EticaretMockup() {
  return (
    <div
      className="w-full overflow-hidden rounded-2xl border shadow-2xl"
      style={{ background: "#09090b", borderColor: "#ffffff12" }}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 border-b border-white/6 bg-black/40 px-3 py-2.5">
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/10" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <div className="ml-2 flex flex-1 items-center gap-1.5 rounded-md border border-white/8 bg-white/4 px-2.5 py-1 text-[9px] text-white/30">
          nomadstudio.co
        </div>
        <ShoppingCart size={11} className="text-white/30" />
        <div className="flex h-4 w-4 items-center justify-center rounded-full bg-white text-[7px] font-black text-black">
          2
        </div>
      </div>

      {/* Nav */}
      <div className="flex items-center justify-between border-b border-white/6 px-5 py-3">
        <div className="text-[13px] font-black uppercase tracking-[0.25em] text-white">
          NOMAD
        </div>
        <div className="hidden sm:flex items-center gap-1 rounded-xl border border-white/8 bg-white/4 px-3 py-1.5">
          <Search size={10} className="text-white/40" />
          <span className="text-[9px] text-white/30">Ara...</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <ShoppingCart size={15} className="text-white/60" />
            <div className="absolute -right-1.5 -top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-white text-[7px] font-black text-black">
              2
            </div>
          </div>
          <div className="rounded-lg bg-white px-3 py-1.5 text-[9px] font-black text-black">
            Giriş Yap
          </div>
        </div>
      </div>

      {/* Kampanya banner */}
      <div
        className="flex items-center justify-center gap-2 border-b border-white/6 py-2"
        style={{ background: "linear-gradient(90deg,#18181b,#27272a,#18181b)" }}
      >
        <div className="h-1.5 w-1.5 rounded-full bg-white" />
        <span className="text-[9px] font-bold uppercase tracking-wider text-white/70">
          Yeni Sezon — %20 İndirim
        </span>
        <ChevronRight size={9} className="text-white/40" />
      </div>

      {/* Öne çıkan ürün */}
      <div
        className="relative overflow-hidden px-5 py-5"
        style={{ background: "linear-gradient(135deg,#18181b,#09090b)" }}
      >
        <div className="grid grid-cols-[1fr_auto] gap-4 items-center">
          <div>
            <div className="mb-1.5 text-[8px] font-black uppercase tracking-[0.3em] text-white/30">
              Yeni Koleksiyon
            </div>
            <div className="mb-0.5 text-[18px] font-black text-white leading-tight">
              Nomad
            </div>
            <div className="mb-3 text-[18px] font-black leading-tight text-white/25">
              Carry Series
            </div>
            <div className="mb-3 flex items-baseline gap-2">
              <span className="text-[16px] font-black text-white">₺2.490</span>
              <span className="text-[11px] text-white/30 line-through">
                ₺3.100
              </span>
              <span className="rounded-md bg-white px-1.5 py-0.5 text-[8px] font-black text-black">
                %20
              </span>
            </div>
            <div className="flex gap-2">
              <div className="rounded-lg bg-white px-3 py-2 text-[9px] font-black text-black">
                Sepete Ekle
              </div>
              <div className="rounded-lg border border-white/15 px-3 py-2 text-[9px] font-semibold text-white/60">
                İncele
              </div>
            </div>
          </div>
          {/* Ürün görseli */}
          <div
            className="relative h-24 w-20 overflow-hidden rounded-2xl border border-white/10"
            style={{ background: "linear-gradient(135deg,#27272a,#3f3f46)" }}
          >
            <svg
              viewBox="0 0 64 80"
              className="absolute inset-0 w-full h-full"
              fill="none"
            >
              <rect
                x="12"
                y="28"
                width="40"
                height="32"
                rx="6"
                fill="white"
                fillOpacity="0.12"
              />
              <rect
                x="12"
                y="28"
                width="40"
                height="32"
                rx="6"
                stroke="white"
                strokeOpacity="0.2"
                strokeWidth="1"
              />
              <path
                d="M24 28 C24 20 40 20 40 28"
                stroke="white"
                strokeOpacity="0.3"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
              />
              <rect
                x="20"
                y="40"
                width="24"
                height="2"
                rx="1"
                fill="white"
                fillOpacity="0.15"
              />
            </svg>
            <div className="absolute top-2 right-2 rounded-full bg-white/10 p-1">
              <Heart size={8} className="text-white/50" />
            </div>
          </div>
        </div>
      </div>

      {/* Kategori bar */}
      <div
        className="flex gap-2 overflow-hidden border-t border-white/6 px-4 py-2.5"
        style={{ background: "#0f0f10" }}
      >
        {["Çantalar", "Aksesuarlar", "Yeni Sezon", "Kampanyalar"].map(
          (c, i) => (
            <div
              key={c}
              className="shrink-0 rounded-lg border px-3 py-1.5 text-[9px] font-semibold"
              style={
                i === 0
                  ? {
                      borderColor: "rgba(255,255,255,0.25)",
                      color: "white",
                      background: "rgba(255,255,255,0.1)",
                    }
                  : {
                      borderColor: "rgba(255,255,255,0.06)",
                      color: "rgba(255,255,255,0.35)",
                    }
              }
            >
              {c}
            </div>
          ),
        )}
      </div>

      {/* Ürün grid */}
      <div className="px-4 pb-4">
        <div className="mb-2.5 flex items-center justify-between">
          <span className="text-[9px] font-black uppercase tracking-wider text-white/30">
            Tüm Ürünler
          </span>
          <span className="text-[9px] text-white/20">32 ürün</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { price: "₺1.890", badge: "Yeni" },
            { price: "₺2.490", badge: "%20" },
            { price: "₺890", badge: null },
          ].map((p, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl border border-white/6"
              style={{ background: "#18181b" }}
            >
              <div
                className="relative h-14 flex items-center justify-center"
                style={{ background: "#27272a" }}
              >
                {p.badge && (
                  <div className="absolute top-1.5 left-1.5 rounded-md bg-white px-1.5 py-0.5 text-[7px] font-black text-black">
                    {p.badge}
                  </div>
                )}
                <div className="h-8 w-8 rounded-lg border border-white/10 bg-white/5" />
              </div>
              <div className="p-2">
                <div className="text-[8px] text-white/30 mb-0.5">
                  Nomad Series
                </div>
                <div className="text-[9px] font-bold text-white">{p.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* Mockup'lar static obje yerine lazy render — sadece aktif olan mount edilir */
function ActiveMockup({ id }: { id: (typeof SHOWCASES)[number]["id"] }) {
  if (id === "klinik") return <KlinikMockup />;
  if (id === "turizm") return <TurizmMockup />;
  return <EticaretMockup />;
}

/* ─────────────────────────────────────────────
   Tasarım standartları
───────────────────────────────────────────── */
const STANDARDS = [
  {
    id: "optical" as const,
    icon: "◎",
    title: "Optik Denge",
    subtitle: "Optical Precision",
    tag: "Algısal Mühendislik",
    desc: "Her eleman, insan gözünün kusurlarını düzelterek yerleştirilir. Sonuç: istemsiz bir mükemmellik algısı.",
  },
  {
    id: "kinetic" as const,
    icon: "◈",
    title: "Kinetik Akış",
    subtitle: "Kinetic Motion",
    tag: "İpeksi Etkileşim",
    desc: "Geçişler ve etkileşimler kullanıcıyı yönlendirir, dikkatini dağıtmaz. Her hareket bir amaç taşır.",
  },
  {
    id: "chromatic" as const,
    icon: "◐",
    title: "Kromatik Derinlik",
    subtitle: "Chromatic Depth",
    tag: "Prestij Paleti",
    desc: "Marka renkleri karanlık modun derinliğiyle harmanlanır. Bir ekran değil, bir prestij alanı.",
  },
] as const;

type StandardId = (typeof STANDARDS)[number]["id"];

/* Demo bileşenleri — sofistike */
function OpticalDemo() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden p-6">
      {/* Blueprint grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(190,41,236,0.12) 1px,transparent 1px),linear-gradient(90deg,rgba(190,41,236,0.12) 1px,transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />
      {/* Altın oran sarmal */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-10"
        viewBox="0 0 300 240"
        fill="none"
      >
        <path
          d="M150 120 Q150 30 240 30 Q330 30 330 120 Q330 210 150 210 Q-30 210 -30 30 Q-30 -150 150 -150"
          stroke="#be29ec"
          strokeWidth="0.8"
          fill="none"
        />
        <rect
          x="60"
          y="40"
          width="180"
          height="160"
          rx="2"
          stroke="#0000c8"
          strokeWidth="0.5"
          fill="none"
        />
        <rect
          x="60"
          y="40"
          width="111"
          height="99"
          rx="2"
          stroke="#be29ec"
          strokeWidth="0.5"
          fill="none"
        />
      </svg>

      <div className="relative z-10 flex w-full max-w-[240px] flex-col gap-4">
        <div className="text-center">
          <p className="mb-3 text-[9px] font-black uppercase tracking-[0.3em] text-white/25">
            Optik Hiyerarşi
          </p>
          {/* Tipografi ölçek demonstrasyonu */}
          <div className="flex flex-col items-center gap-1">
            <span className="text-[32px] font-black leading-none tracking-tighter text-white">
              Başlık
            </span>
            <span className="text-[20px] font-bold leading-none tracking-tight text-white/60">
              Alt Başlık
            </span>
            <span className="text-[13px] font-medium leading-none text-white/35">
              Açıklama metni
            </span>
            <span className="text-[10px] font-normal leading-none text-white/20">
              Yardımcı metin
            </span>
          </div>
        </div>
        {/* Ölçek göstergesi */}
        <div className="flex items-center gap-2">
          <div
            className="h-px flex-1"
            style={{ background: "linear-gradient(90deg,transparent,#be29ec)" }}
          />
          <div className="rounded-full border border-white/10 bg-white/4 px-2.5 py-1 text-[9px] font-mono text-white/35">
            φ = 1.618
          </div>
          <div
            className="h-px flex-1"
            style={{ background: "linear-gradient(90deg,#0000c8,transparent)" }}
          />
        </div>
        {/* Grid sütunları */}
        <div className="grid grid-cols-8 gap-1">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-8 rounded"
              style={{
                background:
                  i < 5
                    ? `rgba(190,41,236,${0.08 + i * 0.04})`
                    : `rgba(0,0,200,${0.05 + (i - 5) * 0.04})`,
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            />
          ))}
        </div>
        <p className="text-center text-[8px] text-white/15">
          Her eleman matematiksel oranlarla hizalanır
        </p>
      </div>
    </div>
  );
}

function KineticDemo() {
  const prefersReduced = useReducedMotion();
  const [scene, setScene] = useState<"idle" | "navigate" | "modal" | "hover">(
    "idle",
  );
  const demoRef = useRef<HTMLDivElement>(null);
  const isVisible = useInView(demoRef, { amount: 0.5 });

  // Interval sadece ekranda görününce çalışır, görünmeyince durur
  useEffect(() => {
    if (prefersReduced || !isVisible) return;
    const scenes: (typeof scene)[] = ["navigate", "modal", "hover", "idle"];
    let i = 0;
    const t = setInterval(() => {
      i = (i + 1) % scenes.length;
      setScene(scenes[i]);
    }, 2200);
    return () => clearInterval(t);
  }, [prefersReduced, isVisible]);

  return (
    <div
      ref={demoRef}
      className="relative flex h-full w-full flex-col items-center justify-center gap-4 overflow-hidden p-5"
    >
      <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/25">
        Sayfa Geçişi Simülasyonu
      </p>

      {/* Mini browser frame */}
      <div
        className="relative w-full overflow-hidden rounded-xl border border-white/8 bg-[#08080f]"
        style={{ height: 180 }}
      >
        {/* Browser chrome */}
        <div className="flex items-center gap-1.5 border-b border-white/6 bg-black/40 px-3 py-2">
          <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/10" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
          <div className="ml-2 h-3 flex-1 rounded bg-white/5" />
        </div>

        {/* Sayfa A — ana sayfa */}
        <AnimatePresence>
          {(scene === "idle" || scene === "hover") && (
            <motion.div
              key="pageA"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: prefersReduced ? 0 : -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-0 bottom-0 top-8 p-3"
            >
              {/* Hero alanı */}
              <div
                className="mb-2 h-14 overflow-hidden rounded-lg"
                style={{
                  background: "linear-gradient(135deg,#1a0533,#08050f)",
                }}
              >
                <div className="flex h-full items-center px-3 gap-2">
                  <div className="flex-1">
                    <div className="mb-1 h-3 w-20 rounded bg-white/20" />
                    <div className="h-2 w-14 rounded bg-white/10" />
                    <div
                      className="mt-2 h-4 w-12 rounded-full"
                      style={{
                        background: "linear-gradient(90deg,#be29ec,#0000c8)",
                      }}
                    />
                  </div>
                  <div className="h-10 w-10 rounded-lg bg-white/5 border border-white/8" />
                </div>
              </div>
              {/* Kart grid */}
              <div className="grid grid-cols-3 gap-1.5">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={
                      scene === "hover" && i === 1
                        ? {
                            y: -3,
                            borderColor: "rgba(190,41,236,0.4)",
                            background: "rgba(190,41,236,0.08)",
                          }
                        : {
                            y: 0,
                            borderColor: "rgba(255,255,255,0.06)",
                            background: "rgba(255,255,255,0.03)",
                          }
                    }
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-lg border p-2"
                  >
                    <div
                      className="mb-1 h-1.5 w-6 rounded-full"
                      style={{
                        background:
                          i === 1 && scene === "hover"
                            ? "#be29ec"
                            : "rgba(255,255,255,0.15)",
                      }}
                    />
                    <div className="h-1 w-full rounded-full bg-white/6" />
                    <div className="mt-0.5 h-1 w-3/4 rounded-full bg-white/4" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sayfa B — geçiş sonrası */}
        <AnimatePresence>
          {scene === "navigate" && (
            <motion.div
              key="pageB"
              initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-0 bottom-0 top-8 p-3"
            >
              <div className="mb-2 h-5 w-24 rounded bg-white/15" />
              <div className="space-y-1.5">
                {[100, 80, 65, 45].map((w, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: i * 0.07,
                      duration: 0.3,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="h-2 rounded-full bg-white/8"
                    style={{ width: `${w}%` }}
                  />
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.3,
                  duration: 0.35,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="mt-3 h-7 w-20 rounded-lg"
                style={{ background: "linear-gradient(90deg,#be29ec,#0000c8)" }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal açılışı */}
        <AnimatePresence>
          {scene === "modal" && (
            <>
              <motion.div
                key="overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 top-8"
                style={{
                  background: "rgba(0,0,0,0.6)",
                  backdropFilter: "blur(2px)",
                }}
              />
              <motion.div
                key="modal"
                initial={{
                  opacity: 0,
                  scale: prefersReduced ? 1 : 0.88,
                  y: prefersReduced ? 0 : 12,
                }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-1/2 top-1/2 w-32 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-white/15 bg-[#0f0f1e] p-3 shadow-2xl"
                style={{ boxShadow: "0 0 40px rgba(190,41,236,0.2)" }}
              >
                <div className="mb-2 h-2 w-16 rounded bg-white/20" />
                <div className="mb-1 h-1.5 w-full rounded bg-white/8" />
                <div className="mb-2 h-1.5 w-3/4 rounded bg-white/6" />
                <div
                  className="h-5 w-full rounded-lg"
                  style={{
                    background: "linear-gradient(90deg,#be29ec,#0000c8)",
                  }}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Sahne göstergesi */}
        <div className="absolute bottom-2 right-2 rounded-full border border-white/8 bg-black/40 px-2 py-0.5 text-[7px] font-mono text-white/25 backdrop-blur-sm">
          {scene === "idle"
            ? "STATIC"
            : scene === "navigate"
              ? "PAGE TRANSITION"
              : scene === "modal"
                ? "MODAL OPEN"
                : "HOVER STATE"}
        </div>
      </div>

      {/* Sahne seçici */}
      <div className="flex gap-2">
        {(["navigate", "modal", "hover"] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setScene(s)}
            className="cursor-pointer rounded-full border px-3 py-1 text-[9px] font-bold uppercase tracking-wider transition-all"
            style={
              scene === s
                ? {
                    borderColor: "rgba(190,41,236,0.4)",
                    background: "rgba(190,41,236,0.1)",
                    color: "#be29ec",
                  }
                : {
                    borderColor: "rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.3)",
                  }
            }
          >
            {s === "navigate" ? "Geçiş" : s === "modal" ? "Modal" : "Hover"}
          </button>
        ))}
      </div>
    </div>
  );
}

function ChromaticDemo() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-5 p-6">
      <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/25">
        Kromatik Derinlik Sistemi
      </p>

      {/* Renk skalası — gradient derinlik */}
      <div className="w-full max-w-[240px] space-y-2">
        {[
          {
            label: "Aksiyon — CTA, Vurgu",
            colors: ["#be29ec", "#9b22c4", "#7c10aa", "#5d0090"],
          },
          {
            label: "Güven — Nav, Bilgi",
            colors: ["#0000c8", "#0000a0", "#000078", "#000050"],
          },
          {
            label: "Prestij — Arka Plan",
            colors: ["#1a1a2e", "#0f0f1e", "#08080f", "#030305"],
          },
        ].map((row) => (
          <div key={row.label}>
            <p className="mb-1 text-[8px] font-semibold text-white/25">
              {row.label}
            </p>
            <div className="flex gap-1">
              {row.colors.map((c, i) => (
                <div key={i} className="group relative flex-1">
                  <div
                    className="h-8 rounded-lg transition-all group-hover:scale-y-110"
                    style={{
                      background: c,
                      boxShadow: i === 0 ? `0 0 12px ${c}60` : "none",
                    }}
                  />
                  <p className="mt-0.5 text-center text-[7px] font-mono text-white/15">
                    {c}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Kontrast oranı göstergesi */}
      <div className="flex items-center gap-3 rounded-xl border border-white/6 bg-white/3 px-4 py-2.5">
        <div
          className="h-5 w-5 rounded-full"
          style={{ background: "#be29ec" }}
        />
        <div className="h-px flex-1 bg-white/10" />
        <div className="text-[9px] font-mono font-bold text-white/40">
          14.2:1
        </div>
        <div className="h-px flex-1 bg-white/10" />
        <div className="h-5 w-5 rounded-full bg-[#030305] border border-white/10" />
        <span className="text-[8px] text-green-400/60">WCAG AAA ✓</span>
      </div>
    </div>
  );
}

/* Demo'lar static obje yerine lazy render — sadece aktif olan mount edilir */
function ActiveDemo({ id }: { id: StandardId }) {
  if (id === "optical") return <OpticalDemo />;
  if (id === "kinetic") return <KineticDemo />;
  return <ChromaticDemo />;
}

/* ─────────────────────────────────────────────
   Ana bileşen
───────────────────────────────────────────── */
export default function DesignShowcase() {
  const [activeShowcase, setActiveShowcase] = useState(0);
  const [activeStandard, setActiveStandard] = useState<StandardId | null>(null);
  const prefersReduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.1 });
  const showcase = SHOWCASES[activeShowcase];

  return (
    <section
      ref={sectionRef}
      id="tasarim"
      className="overflow-hidden border-t border-white/6 bg-[#030305] px-4 py-20 sm:px-5 sm:py-24 md:px-6 md:py-28"
      itemScope
      itemType="https://schema.org/CreativeWork"
    >
      <div className="mx-auto max-w-7xl">
        {/* Başlık */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end"
        >
          <div>
            <p className="mb-4 text-[11px] font-black uppercase tracking-[0.4em] text-brand-purple">
              Tasarım Felsefesi
            </p>
            <h2
              className="text-4xl font-black uppercase italic leading-none tracking-tighter text-white sm:text-5xl md:text-6xl"
              itemProp="name"
            >
              Estetik <span className="text-white/18">Disiplini.</span>
            </h2>
          </div>
          <p className="text-[16px] leading-relaxed text-white/55 lg:max-w-md lg:justify-self-end">
            Her piksel, markanızın sessiz gücünü temsil etmek üzere matematiksel
            bir kesinlikle yerleştirilir.
          </p>
        </motion.div>

        {/* Sektör tab'ları */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-8 flex flex-wrap gap-2"
        >
          {SHOWCASES.map((s, i) => {
            const isActive = activeShowcase === i;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setActiveShowcase(i)}
                aria-pressed={isActive}
                className="cursor-pointer rounded-full border px-5 py-2.5 text-[13px] font-bold transition-all duration-300 hover:brightness-110"
                style={
                  isActive
                    ? {
                        borderColor: `${s.accent}50`,
                        background: `${s.accent}15`,
                        color: "white",
                      }
                    : {
                        borderColor: "rgba(255,255,255,0.08)",
                        background: "transparent",
                        color: "rgba(255,255,255,0.40)",
                      }
                }
              >
                {s.sector}
              </button>
            );
          })}
        </motion.div>

        {/* Mockup + detay */}
        <div className="mb-16 grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start">
          <AnimatePresence>
            <motion.div
              key={activeShowcase}
              initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: prefersReduced ? 0 : -10 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            >
              <ActiveMockup id={showcase.id} />
            </motion.div>
          </AnimatePresence>

          <AnimatePresence>
            <motion.div
              key={`d-${activeShowcase}`}
              initial={{ opacity: 0, x: prefersReduced ? 0 : 14 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.32 }}
              className="flex flex-col gap-5"
            >
              <div
                className="rounded-2xl border p-6"
                style={{
                  borderColor: `${showcase.accent}25`,
                  background: `${showcase.accent}08`,
                }}
              >
                <div
                  className="mb-1 inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-wider"
                  style={{
                    borderColor: `${showcase.accent}35`,
                    color: showcase.accent,
                    background: `${showcase.accent}12`,
                  }}
                >
                  {showcase.tag}
                </div>
                <h3 className="mt-3 text-[20px] font-bold text-white">
                  {showcase.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-white/65">
                  {showcase.desc}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {showcase.highlights.map((h) => (
                    <span
                      key={h}
                      className="rounded-full border border-white/8 bg-white/4 px-3 py-1 text-[11px] font-semibold text-white/55"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                {SHOWCASES.filter((_, i) => i !== activeShowcase).map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setActiveShowcase(SHOWCASES.indexOf(s))}
                    className="cursor-pointer flex items-center gap-3 rounded-xl border border-white/6 bg-white/2 px-4 py-3 text-left transition-all hover:border-white/12 hover:bg-white/4"
                  >
                    <div
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ background: s.accent }}
                    />
                    <span className="text-[13px] font-semibold text-white/60">
                      {s.sector}
                    </span>
                    <ArrowRight size={12} className="ml-auto text-white/20" />
                  </button>
                ))}
              </div>

              {/* CTA — yazı rengi accent'e göre adaptif */}
              <Link
                href="/iletisim#analiz"
                className="group relative flex cursor-pointer items-center justify-between overflow-hidden rounded-xl border px-6 py-4 text-[12px] font-black uppercase tracking-[0.1em] transition-all duration-300 hover:scale-[1.01]"
                style={{
                  background: `linear-gradient(90deg,${showcase.accent},${showcase.accentSecondary})`,
                  borderColor: `${showcase.accent}40`,
                  /* e-ticaret açık renk → koyu yazı, diğerleri → beyaz yazı */
                  color: showcase.id === "eticaret" ? "#09090b" : "white",
                  boxShadow: "none",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    `0 0 24px ${showcase.accent}40`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <span className="absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-black/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative z-10">Sektörünüz İçin Konuşalım</span>
                <ArrowRight
                  size={15}
                  className="relative z-10 transition-transform group-hover:translate-x-1"
                />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Tasarım standartları */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="border-t border-white/6 pt-14"
        >
          <p className="mb-2 text-center text-[11px] font-black uppercase tracking-[0.3em] text-white/25">
            Minimum Tasarım Çıtamız
          </p>
          <p className="mb-10 text-center text-[14px] text-white/35">
            Tıklayın — her standardı canlı olarak deneyimleyin.
          </p>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
            <div className="flex flex-col gap-3">
              {STANDARDS.map((s, i) => {
                const isActive = activeStandard === s.id;
                return (
                  <motion.button
                    key={s.id}
                    type="button"
                    onClick={() => setActiveStandard(isActive ? null : s.id)}
                    aria-pressed={isActive}
                    initial={{ opacity: 0, x: prefersReduced ? 0 : -12 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.45, delay: 0.35 + i * 0.08 }}
                    className="cursor-pointer flex items-start gap-4 rounded-2xl border p-5 text-left transition-all duration-300 hover:brightness-110"
                    style={
                      isActive
                        ? {
                            borderColor: "rgba(190,41,236,0.35)",
                            background: "rgba(190,41,236,0.08)",
                          }
                        : {
                            borderColor: "rgba(255,255,255,0.07)",
                            background: "rgba(255,255,255,0.02)",
                          }
                    }
                  >
                    <span
                      className="mt-0.5 text-xl leading-none"
                      style={{
                        background: "linear-gradient(135deg,#be29ec,#0000c8)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {s.icon}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <h4 className="text-[15px] font-bold text-white/90">
                          {s.title}
                        </h4>
                        <span className="shrink-0 rounded-full border border-white/10 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-white/30">
                          {s.tag}
                        </span>
                      </div>
                      <p className="text-[13px] leading-relaxed text-white/50">
                        {s.desc}
                      </p>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            <div
              className="relative min-h-[280px] overflow-hidden rounded-2xl border border-white/8 bg-[#060608] lg:min-h-0"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 0%,rgba(190,41,236,0.06),transparent 60%)",
              }}
            >
              <AnimatePresence>
                {activeStandard ? (
                  <motion.div
                    key={activeStandard}
                    initial={{ opacity: 0, scale: prefersReduced ? 1 : 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: prefersReduced ? 1 : 0.97 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                  >
                    <ActiveDemo id={activeStandard} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-8 text-center"
                  >
                    <div className="flex gap-3">
                      {["◎", "◈", "◐"].map((icon, i) => (
                        <span
                          key={i}
                          className="text-2xl"
                          style={{
                            background:
                              "linear-gradient(135deg,#be29ec,#0000c8)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            opacity: 0.3 + i * 0.2,
                          }}
                        >
                          {icon}
                        </span>
                      ))}
                    </div>
                    <p className="text-[13px] text-white/25">
                      Soldan bir standart seçin
                    </p>
                    <p className="text-[11px] text-white/15">
                      Canlı demo burada görünecek
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
