// app/(marketing)/layout.tsx

import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import MarketingNav from "@/components/layout/MarketingNav";
import WhatsAppCTAGlass from "@/components/global/WhatsAppCTAGlass";
import SocialSidebar from "@/components/global/SocialSidebar";
import NavWrapper from "@/components/layout/NavWrapper";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative isolate min-h-screen bg-brand-dark text-white selection:bg-brand-blue/30 overflow-x-clip">
      <header>
        <NavWrapper>
          <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-4">
              <span className="h-16 w-16 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-purple p-[2px] shadow-[0_0_30px_rgba(0,0,200,0.25)]">
                <span className="flex h-full w-full items-center justify-center rounded-2xl bg-brand-dark">
                  <Image
                    src="/img/premiumdijital-logo.webp"
                    alt="Premium Dijital Reklam Ajansı"
                    width={160}
                    height={115}
                    priority
                    className="h-14 w-auto object-contain"
                  />
                </span>
              </span>

              <span className="font-bold text-white uppercase tracking-widest">
                PREMIUM{" "}
                <span className="text-brand-blue brightness-150 drop-shadow-[0_0_8px_rgba(0,0,200,0.4)]">
                  DIJITAL
                </span>
              </span>
            </Link>

            {/* Menü */}
            <MarketingNav />

            {/* CTA */}
            <div className="hidden md:block">
              <Link
                href="/iletisim#analiz"
                className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-brand-blue px-10 text-[14px] font-bold uppercase tracking-wider text-white shadow-[0_0_30px_rgba(0,0,200,0.4)] transition-all hover:scale-105 active:scale-95"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-shimmer" />
                <span className="relative z-10">Randevu Al</span>
              </Link>
            </div>
          </div>
        </NavWrapper>
      </header>

      {/* GLOBAL AMBIENT LIGHT LAYER */}
      <div className="pointer-events-none fixed inset-0 -z-0">
        <div className="absolute -top-40 left-1/2 h-96 w-[60rem] -translate-x-1/2 rounded-full bg-brand-blue/10 blur-[140px]" />
        <div className="absolute top-[40vh] left-1/4 h-96 w-[46rem] rounded-full bg-brand-purple/10 blur-[140px]" />
      </div>

      {/* SOCIALS */}
      <SocialSidebar />
      {/* <aside
        className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-5"
        aria-label="Sosyal bağlantılar"
      >
        {[
          { label: "LinkedIn", text: "Ln", href: "https://www.linkedin.com" },
          { label: "Instagram", text: "Ig", href: "https://www.instagram.com" },
          { label: "Facebook", text: "Fb", href: "https://www.facebook.com" },
          { label: "X", text: "X", href: "https://x.com" },
        ].map((item) => (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            className="shimmer-effect w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl relative overflow-hidden"
          >
            <span className="text-sm font-bold opacity-80">{item.text}</span>
          </a>
        ))}
      </aside> */}

      {/* WHATSAPP (Premium) */}
      {/* <WhatsAppCTA /> */}
      <WhatsAppCTAGlass />

      <main id="content" className="relative z-10 pt-20">
        {children}
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 overflow-hidden border-t border-white/10 bg-black/85 backdrop-blur-xl">
        {/* Ambient glow layer */}
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <div className="absolute -top-24 left-1/2 h-72 w-[48rem] -translate-x-1/2 rounded-full bg-brand-blue/15 blur-[120px]" />
          <div className="absolute -bottom-28 left-1/4 h-72 w-[40rem] rounded-full bg-brand-purple/15 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 pt-12 pb-8 sm:px-5 sm:pt-16 sm:pb-9 md:px-6 md:pt-20 md:pb-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-12">
            {/* Brand */}
            <div className="col-span-1">
              <a
                href="/"
                className="group inline-flex items-center gap-3 cursor-pointer select-none"
              >
                <Image
                  src="/img/premiumdijital-logo-500px.webp"
                  alt="Premium Dijital"
                  width={240}
                  height={170}
                  className="h-14 w-auto object-contain drop-shadow-[0_0_25px_rgba(0,0,200,0.25)] sm:h-16 md:h-20"
                  priority={false}
                />
                <div>
                  <div className="mt-2 text-sm font-semibold tracking-tight text-white/90 sm:mt-3 sm:text-base md:mt-4">
                    Premium{" "}
                    <span className="text-brand-blue brightness-150">
                      Dijital
                    </span>
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-white/60 sm:text-xs sm:tracking-[0.22em] md:tracking-[0.28em]">
                    Reklam {" · "} Dönüşüm {" · "} Büyüme
                  </div>
                </div>
              </a>

              <p className="mt-4 text-sm italic leading-relaxed text-white/60 sm:mt-5 md:mt-6">
                İstanbul merkezli ajansımızla markanızı pazarın zirvesine
                taşıyoruz.
              </p>
            </div>

            {/* Expertise */}
            <div>
              <h2 className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em] text-white/60 sm:mb-5 sm:text-xs sm:tracking-[0.28em] md:mb-6 md:tracking-widest">
                Sektörel Uzmanlık
              </h2>
              <ul className="space-y-2.5 text-sm text-white/60 sm:space-y-3">
                {["Sağlık Turizmi", "B2B & Sanayi", "E-Ticaret ROI"].map(
                  (t) => (
                    <li key={t} className="transition hover:text-white">
                      {t}
                    </li>
                  ),
                )}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em] text-white/60 sm:mb-5 sm:text-xs sm:tracking-[0.28em] md:mb-6 md:tracking-widest">
                Taktik Servisler
              </h4>
              <ul className="space-y-2.5 text-sm text-white/60 sm:space-y-3">
                {[
                  "Google & YouTube Ads",
                  "Meta (IG/FB) Ads",
                  "SEO & İçerik",
                ].map((t) => (
                  <li key={t} className="transition hover:text-white">
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em] text-white/60 sm:mb-5 sm:text-xs sm:tracking-[0.28em] md:mb-6 md:tracking-widest">
                İletişim
              </h4>

              <a
                href="mailto:info@premiumdijital.com"
                className="inline-flex break-all font-bold text-brand-purple transition-colors hover:text-brand-blue"
              >
                info@premiumdijital.com
              </a>

              <div className="mt-5 sm:mt-6">
                <a
                  href="/iletisim#analiz"
                  className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-xl border border-brand-blue/25 bg-brand-blue/15 py-3.5 text-[10px] font-bold uppercase tracking-[0.22em] text-brand-blue transition hover:border-brand-blue/45 hover:bg-brand-blue/25 hover:shadow-[0_0_40px_rgba(0,0,200,0.22)] sm:py-4 sm:tracking-widest"
                >
                  <span className="pointer-events-none absolute -left-24 top-0 h-full w-24 bg-white/10 blur-xl transition-transform duration-700 group-hover:translate-x-[32rem]" />
                  Randevu Al
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 sm:mt-12 sm:pt-7 md:mt-16 md:flex-row md:gap-4 md:pt-8">
            <div className="text-center text-[9px] uppercase tracking-[0.22em] text-white/50 sm:text-[10px] sm:tracking-[0.3em] md:text-left md:tracking-[0.4em]">
              {"(c) "} {new Date().getFullYear()} Premium Dijital Reklam Ajansı
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 text-[9px] uppercase tracking-[0.18em] text-white/50 sm:gap-3 sm:text-[10px] sm:tracking-[0.24em] md:justify-end md:gap-4 md:tracking-[0.3em]">
              <a className="transition hover:text-white" href="#gizlilik">
                Gizlilik
              </a>
              <span className="opacity-30">.</span>
              <a className="transition hover:text-white" href="#kvkk">
                KVKK
              </a>
              <span className="opacity-30">.</span>
              <a className="transition hover:text-white" href="#cerezler">
                Çerezler
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
