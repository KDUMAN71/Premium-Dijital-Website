"use client";

import React from "react";
import NextImage from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Target, Share2 } from "lucide-react";
import ShimmerButton from "@/components/ui/ShimmerButton";
import ScrollReveal from "@/components/ui/ScrollReveal";

type SubServicePageTemplateProps = {
  seo: {
    title: string;
    description: string;
    url: string;
    faqs?: { q: string; a: string }[];
    breadcrumb: { name: string; href: string }[];
  };
  hero: {
    eyebrow: string;
    title: string;
    accent: string;
    description: string;
    bgImage?: string;
    heroVisual?: React.ReactNode;
    primaryCta: { label: string; href: string };
    secondaryCta?: { label: string; href: string };
    stats?: { label: string; value: string }[];
  };
  finalCta?: {
    title?: React.ReactNode;
    description?: string;
    links: { label: string; href: string; icon: "target" | "share" }[];
  };
  children: React.ReactNode;
  customNav?: React.ReactNode;
};

export default function SubServicePageTemplate({
  seo,
  hero,
  finalCta,
  children,
  customNav,
}: SubServicePageTemplateProps) {
  return (
    <main className="bg-brand-dark text-white">
      {/* ── 1. SEO ŞEMALARI ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Service",
              name: seo.title,
              description: seo.description,
              provider: { "@type": "Organization", name: "Premium Dijital" },
              url: seo.url,
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: seo.breadcrumb.map((item, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: item.name,
                item: item.href,
              })),
            },
            ...(seo.faqs
              ? [
                  {
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    mainEntity: seo.faqs.map((f) => ({
                      "@type": "Question",
                      name: f.q,
                      acceptedAnswer: { "@type": "Answer", text: f.a },
                    })),
                  },
                ]
              : []),
          ]),
        }}
      />

      {/* ── 2. HERO SECTION ── */}
      <section
        className="relative overflow-hidden flex items-center"
        style={{
          minHeight: "calc(100svh - 80px)",
          maxHeight: "calc(100svh - 80px)",
          marginTop: "80px",
        }}
      >
        {/* Arka Plan — bgImage VEYA koyu gradient */}
        {hero.bgImage ? (
          <>
            {/* Koyu arka plan — tüm breakpoint'lerde */}
            <div className="absolute inset-0 bg-brand-dark z-0" />
            {/* Görsel — md+ ekranlarda görünür, kırpılmaz, oranı korunur */}
            <div className="absolute inset-0 z-[1] hidden md:flex items-center justify-end overflow-hidden">
              <img
                src={hero.bgImage}
                alt=""
                aria-hidden="true"
                className="h-full w-auto object-contain object-right opacity-80"
              />
            </div>
            {/* Gradient overlay — soldan metni korur */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/85 to-brand-dark/30 z-[2]" />
            {/* Mobilde tam karartma */}
            <div className="absolute inset-0 bg-brand-dark/60 z-[2] md:hidden" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-brand-dark z-0" />
            <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-[#08081a] to-brand-dark z-10" />
          </>
        )}

        {/* İçerik konteyneri — pt artık navbar offset'e gerek yok */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-30 w-full py-8">
          {hero.heroVisual ? (
            /* İki kolonlu layout — SVG visual varsa: sol %38, sağ %62 */
            <div className="grid grid-cols-1 lg:grid-cols-[38%_62%] gap-6 lg:gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col justify-center"
              >
                <span className="text-[10px] font-bold text-white/60 tracking-[0.2em] uppercase mb-3 block border-l-2 border-brand-blue pl-3">
                  {hero.eyebrow}
                </span>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter leading-tight mb-3 sm:mb-4">
                  {hero.title}{" "}
                  <span className="text-[#BE29EC] italic">{hero.accent}</span>
                </h1>
                <p className="text-sm sm:text-base text-gray-300 mb-5 sm:mb-6 leading-relaxed">
                  {hero.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <ShimmerButton
                    href={hero.primaryCta.href}
                    variant="primary"
                    size="lg"
                  >
                    {hero.primaryCta.label}
                  </ShimmerButton>
                  {hero.secondaryCta && (
                    <ShimmerButton
                      href={hero.secondaryCta.href}
                      variant="secondary"
                      size="lg"
                    >
                      {hero.secondaryCta.label}
                    </ShimmerButton>
                  )}
                </div>
                {hero.stats && (
                  <div className="mt-5 sm:mt-6 flex flex-wrap gap-4 sm:gap-6 text-sm text-gray-400 border-t border-white/10 pt-4 sm:pt-5">
                    {hero.stats.map((stat, i) => (
                      <div key={i}>
                        <div className="font-bold text-sm sm:text-base text-white">
                          {stat.value}
                        </div>
                        <div className="uppercase tracking-widest text-[8px] sm:text-[9px] mt-0.5 font-semibold">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="hidden lg:flex items-center justify-center"
              >
                {hero.heroVisual}
              </motion.div>
            </div>
          ) : (
            /* Tek kolonlu layout — bgImage varsa */
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-[10px] sm:text-xs font-bold text-white/60 tracking-[0.2em] uppercase mb-3 block border-l-2 border-brand-blue pl-4">
                  {hero.eyebrow}
                </span>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold tracking-tighter leading-tight mb-4 sm:mb-5">
                  {hero.title}{" "}
                  <span className="text-[#BE29EC] italic">{hero.accent}</span>
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-6 sm:mb-8 max-w-sm sm:max-w-xl leading-relaxed">
                  {hero.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <ShimmerButton
                    href={hero.primaryCta.href}
                    variant="primary"
                    size="lg"
                  >
                    {hero.primaryCta.label}
                  </ShimmerButton>
                  {hero.secondaryCta && (
                    <ShimmerButton
                      href={hero.secondaryCta.href}
                      variant="secondary"
                      size="lg"
                    >
                      {hero.secondaryCta.label}
                    </ShimmerButton>
                  )}
                </div>
                {hero.stats && (
                  <div className="mt-6 sm:mt-8 flex flex-wrap gap-5 sm:gap-8 text-sm text-gray-400 border-t border-white/10 pt-5 sm:pt-6">
                    {hero.stats.map((stat, i) => (
                      <div key={i}>
                        <div className="font-bold text-base sm:text-lg text-white">
                          {stat.value}
                        </div>
                        <div className="uppercase tracking-widest text-[9px] sm:text-[10px] mt-1 font-semibold">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </div>
      </section>

      {/* ── 3. STICKY NAV ── */}
      {customNav && React.isValidElement(customNav)
        ? React.cloneElement(customNav as React.ReactElement, {
            key: "sticky-nav",
          })
        : customNav}

      {/* ── 4. SAYFA İÇERİĞİ (Children) ── */}
      <div className="relative z-10">
        {React.Children.map(children, (child, i) =>
          React.isValidElement(child) && !child.key
            ? React.cloneElement(child as React.ReactElement, {
                key: `child-${i}`,
              })
            : child,
        )}
      </div>

      {/* ── 5. FINAL CTA (Entegre) ── */}
      <section className="py-24 border-t border-white/5 bg-gradient-to-b from-brand-dark to-[#080808]">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <div className="relative p-12 md:p-20 rounded-[3rem] border border-brand-blue/20 bg-brand-blue/5 overflow-hidden">
            <ScrollReveal>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-none">
                {finalCta?.title || (
                  <>
                    Performansı <br />
                    <span className="text-brand-purple">
                      Sürdürülebilir Büyümeye Taşıyın
                    </span>
                  </>
                )}
              </h2>
              <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto">
                {finalCta?.description ||
                  "Yatırımınızın geri dönüşünü maksimize eden veri odaklı çözümler sunuyoruz."}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {(
                  finalCta?.links || [
                    {
                      label: "Google Ads Yönetimi",
                      href: "/hizmetler/performans-pazarlama/google-ads-yonetimi",
                      icon: "target",
                    },
                    {
                      label: "Landing Page Optimizasyonu",
                      href: "/hizmetler/performans-pazarlama/landing-page-optimizasyonu",
                      icon: "share",
                    },
                  ]
                ).map((link, i) => (
                  <Link
                    key={i}
                    href={link.href}
                    className="group flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-blue transition-all"
                  >
                    {link.icon === "target" ? (
                      <Target size={18} className="text-brand-blue" />
                    ) : (
                      <Share2 size={18} className="text-brand-purple" />
                    )}
                    <span className="text-sm font-bold uppercase tracking-widest text-white/90">
                      {link.label}
                    </span>
                    <ArrowRight
                      size={14}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  );
}
