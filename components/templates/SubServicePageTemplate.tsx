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
    bgImage: string;
    primaryCta: { label: string; href: string };
    secondaryCta?: { label: string; href: string }; // Opsiyonel yapıldı
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
      <section className="relative overflow-hidden py-28 md:py-36 min-h-[600px] flex items-center">
        {/* Arka Plan Görseli */}
        <NextImage
          src={hero.bgImage}
          alt={hero.title}
          fill
          priority
          className="object-cover absolute inset-0 z-0 opacity-100"
        />
        <div className="absolute inset-0 bg-brand-dark/75 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/70 to-transparent z-20" />

        {/* Hizalama Konteyneri: max-w-7xl mx-auto ile sola yapışma engellendi */}
        <div className="mx-auto max-w-7xl px-6 relative z-30 w-full">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs font-bold text-white/60 tracking-[0.2em] uppercase mb-4 block border-l-2 border-brand-blue pl-4">
                {hero.eyebrow}
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight mb-6">
                {hero.title}{" "}
                <span className="text-[#BE29EC] italic">{hero.accent}</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-xl leading-relaxed">
                {hero.description}
              </p>

              {/* SHIMMER BUTTON ENTEGRASYONU */}
              <div className="flex flex-col sm:flex-row gap-4">
                <ShimmerButton
                  href={hero.primaryCta.href}
                  variant="primary"
                  size="lg"
                >
                  {hero.primaryCta.label}
                </ShimmerButton>

                {/* Güvenli render kontrolü ile TypeError engellendi */}
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
                <div className="mt-12 flex flex-wrap gap-8 text-sm text-gray-400 border-t border-white/10 pt-8">
                  {hero.stats.map((stat, i) => (
                    <div key={i}>
                      <div className="font-bold text-lg text-white">
                        {stat.value}
                      </div>
                      <div className="uppercase tracking-widest text-[10px] mt-1 font-semibold">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 3. STICKY NAV ── */}
      {customNav}

      {/* ── 4. SAYFA İÇERİĞİ (Children) ── */}
      <div className="relative z-10">{children}</div>

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
