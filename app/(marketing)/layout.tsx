// app/(marketing)/layout.tsx
import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import MarketingNav from "@/components/layout/MarketingNav";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative isolate min-h-screen bg-brand-dark text-white selection:bg-brand-blue/30">
      <header className="fixed left-0 right-0 top-0 z-[100] border-b border-white/5 bg-brand-dark/80 backdrop-blur-xl">
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

            <span className="text-xl font-bold tracking-tight uppercase">
              Premium <span className="text-brand-blue">Dijital</span>
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
      </header>

      {/* GLOBAL AMBIENT LIGHT LAYER */}
      <div className="pointer-events-none fixed inset-0 -z-0">
        <div className="absolute -top-40 left-1/2 h-96 w-[60rem] -translate-x-1/2 rounded-full bg-brand-blue/10 blur-[140px]" />
        <div className="absolute top-[40vh] left-1/4 h-96 w-[46rem] rounded-full bg-brand-purple/10 blur-[140px]" />
      </div>

      {/* SOCIALS */}
      <aside
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
      </aside>

      {/* WHATSAPP */}
      <div className="fixed right-6 bottom-6 z-50">
        <a
          href="https://wa.me/90XXXXXXXXXX"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp ile iletişime geç"
          className="shimmer-effect flex items-center gap-3 bg-[#25D366] px-6 py-4 rounded-full shadow-[0_10px_40px_rgba(37,211,102,0.4)] relative overflow-hidden"
        >
          <span className="text-white font-bold text-sm uppercase">
            Büyümeyi Başlatın
          </span>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
          </span>
        </a>
      </div>

      <main id="content" className="relative z-10 pt-20">
        {children}
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/10 bg-black/85 backdrop-blur-xl">
        {/* Ambient glow layer */}
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <div className="absolute -top-24 left-1/2 h-72 w-[48rem] -translate-x-1/2 rounded-full bg-brand-blue/15 blur-[120px]" />
          <div className="absolute -bottom-28 left-1/4 h-72 w-[40rem] rounded-full bg-brand-purple/15 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
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
                  className="h-20 w-auto object-contain drop-shadow-[0_0_25px_rgba(0,0,200,0.25)]"
                  priority={false}
                />
                <div>
                  <div className="text-base font-semibold tracking-tight text-white/90 mt-4">
                    Premium <span className="text-brand-blue">Dijital</span>
                  </div>
                  <div className="text-xs uppercase tracking-[0.28em] text-white/45">
                    Reklam {" · "} Dönüşüm {" · "} Büyüme
                  </div>
                </div>
              </a>

              <p className="mt-6 text-gray-400 text-sm italic leading-relaxed">
                İstanbul merkezli ajansımızla markanızı pazarın zirvesine
                taşıyoruz.
              </p>
            </div>

            {/* Expertise */}
            <div>
              <h4 className="font-bold mb-6 uppercase text-xs text-white/50 tracking-widest">
                Sektörel Uzmanlık
              </h4>
              <ul className="text-gray-400 text-sm space-y-3">
                {["Sağlık Turizmi", "B2B & Sanayi", "E-Ticaret ROI"].map(
                  (t) => (
                    <li key={t} className="hover:text-white transition">
                      {t}
                    </li>
                  ),
                )}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-bold mb-6 uppercase text-xs text-white/50 tracking-widest">
                Taktik Servisler
              </h4>
              <ul className="text-gray-400 text-sm space-y-3">
                {[
                  "Google & YouTube Ads",
                  "Meta (IG/FB) Ads",
                  "SEO & İçerik",
                ].map((t) => (
                  <li key={t} className="hover:text-white transition">
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold mb-6 uppercase text-xs text-white/50 tracking-widest">
                İletişim
              </h4>

              <a
                href="mailto:info@premiumdijital.com"
                className="inline-flex font-bold text-brand-purple hover:text-brand-blue transition-colors"
              >
                info@premiumdijital.com
              </a>

              <div className="mt-6">
                <a
                  href="/iletisim#analiz"
                  className="group w-full inline-flex items-center justify-center rounded-xl
                             bg-brand-blue/15 text-brand-blue border border-brand-blue/25
                             py-4 text-[10px] font-bold uppercase tracking-widest
                             hover:bg-brand-blue/25 hover:border-brand-blue/45
                             hover:shadow-[0_0_40px_rgba(0,0,200,0.22)]
                             transition relative overflow-hidden"
                >
                  <span
                    className="pointer-events-none absolute -left-24 top-0 h-full w-24 bg-white/10 blur-xl
                                   group-hover:translate-x-[32rem] transition-transform duration-700"
                  />
                  Randevu Al
                </a>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-[10px] text-white/35 tracking-[0.4em] uppercase">
              {"(c) "} {new Date().getFullYear()} Premium Dijital Reklam Ajansı
            </div>

            <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-white/40">
              <a className="hover:text-white transition" href="#gizlilik">
                Gizlilik
              </a>
              <span className="opacity-30">.</span>
              <a className="hover:text-white transition" href="#kvkk">
                KVKK
              </a>
              <span className="opacity-30">.</span>
              <a className="hover:text-white transition" href="#cerezler">
                Çerezler
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
