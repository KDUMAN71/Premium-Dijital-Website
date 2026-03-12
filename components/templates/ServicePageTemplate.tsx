import Link from "next/link";
import React from "react";
import ServiceHeroTrustStrip from "@/components/templates/ServiceHeroTrustStrip";
import ServicePageStickyNav from "@/components/templates/ServicePageStickyNav";

type ServicePageTemplateProps = {
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  primaryCtaHref: string;
  primaryCtaLabel: string;
  secondaryCtaHref?: string;
  secondaryCtaLabel?: string;
  trustItems?: {
    label: string;
    href?: string;
    icon: React.ReactNode;
  }[];
  navItems?: {
    id: string;
    label: string;
  }[];
  heroVisual?: React.ReactNode;
  children?: React.ReactNode;
};

export default function ServicePageTemplate({
  eyebrow,
  title,
  accent,
  description,
  primaryCtaHref,
  primaryCtaLabel,
  secondaryCtaHref = "/hizmetler",
  secondaryCtaLabel = "Tüm Hizmetleri Gör",
  trustItems,
  navItems,
  heroVisual,
  children,
}: ServicePageTemplateProps) {
  return (
    <main className="bg-brand-dark text-white">
      {/* HERO */}
      <section className="relative overflow-hidden">
        {heroVisual ? (
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute inset-y-0 right-0 w-full lg:w-[62%]">
              {heroVisual}
            </div>
          </div>
        ) : null}

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-5 sm:py-20 md:px-6 md:py-28">
          <div className="max-w-4xl lg:max-w-[52%]">
            <div className="inline-flex items-center rounded-full border border-brand-blue/20 bg-white/5 px-4 py-2 shadow-[0_0_20px_rgba(0,0,200,0.08)] backdrop-blur-xl">
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/85 sm:text-xs sm:tracking-[0.28em]">
                {eyebrow}
              </span>
            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl">
              {title} <span className="text-brand-blue">{accent}</span>
            </h1>

            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-gray-300 sm:text-base md:text-lg">
              {description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={primaryCtaHref}
                className="inline-flex items-center justify-center rounded-full bg-brand-blue px-6 py-4 text-sm font-bold text-white shadow-[0_0_20px_rgba(0,0,200,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(0,0,200,0.35)]"
              >
                {primaryCtaLabel}
              </Link>

              <Link
                href={secondaryCtaHref}
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-4 text-sm font-semibold text-white/85 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:text-white"
              >
                {secondaryCtaLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {trustItems?.length ? <ServiceHeroTrustStrip items={trustItems} /> : null}
      {navItems?.length ? <ServicePageStickyNav items={navItems} /> : null}

      {children}

      {/* FINAL CTA */}
      <section className="border-t border-white/10 bg-black/40">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-5 sm:py-20 md:px-6 md:py-24">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl sm:p-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Dijital Büyümenizi
              <span className="text-brand-blue"> Birlikte Planlayalım.</span>
            </h2>

            <p className="mt-4 max-w-2xl text-sm text-gray-300 sm:text-base">
              Reklam, web altyapısı, SEO ve marka iletişimi katmanlarını
              birlikte değerlendirip markanız için en doğru büyüme stratejisini
              belirleyelim.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/iletisim#analiz"
                className="inline-flex items-center justify-center rounded-full bg-brand-blue px-8 py-4 text-sm font-bold text-white transition hover:shadow-[0_0_30px_rgba(0,0,200,0.35)]"
              >
                Ücretsiz Analiz Al →
              </Link>

              <Link
                href="/iletisim"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-4 text-sm font-semibold text-white/85 transition hover:bg-white/10 hover:text-white"
              >
                İletişime Geç
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
