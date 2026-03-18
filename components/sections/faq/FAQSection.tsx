"use client";

import Link from "next/link";
import { useState, useRef, useCallback } from "react";
import { useReducedMotion, motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

/* ─────────────────────────────────────────────────────────────────────────────
   FAQSection — Evrensel, Reusable FAQ Bileşeni

   DAVRANIŞ:
   — İlk `defaultVisible` soru (default: 4) görünür, diğerleri DOM'da gizli
   — "+N Soru Daha ↓" butonu ile geri kalanlar açılır (hidden class kalkar)
   — Tümü açıkken sticky "↑ Daralt" butonu ekranın altında sabit kalır
   — Daralt → liste kapanır + section başına smooth scroll

   NOT: Tüm <details> her zaman DOM'da bulunur; slice ile kaldırılmaz.
   Kaldırılırsa yeni eklenen <details> kapalı başlar ve içerik görünmez.

   PROPS:
   id             — anchor id (default: "sss")
   title          — başlık düz metin kısmı
   accentText     — brand renkli vurgu kelimesi (opsiyonel)
   accentColor    — "purple" | "blue" (default: "purple")
   subtitle       — h2 altı açıklama (opsiyonel)
   items          — FAQItem[]
   defaultVisible — başlangıçta kaç soru görünür (default: 4)
   showCta        — her sorunun altında CTA butonu (default: false)
   ctaLabel       — CTA metni
   ctaHref        — CTA href
───────────────────────────────────────────────────────────────────────────── */

export type FAQItem = { q: string; a: string };

function toPlain(s: string) {
  return s.replace(/<[^>]*>/g, "").trim();
}

export default function FAQSection({
  id = "sss",
  title,
  accentText,
  accentColor = "purple",
  subtitle,
  items,
  defaultVisible = 4,
  showCta = false,
  ctaLabel = "Hemen Analiz Al →",
  ctaHref = "/iletisim",
}: {
  id?: string;
  title: string;
  accentText?: string;
  accentColor?: "purple" | "blue";
  subtitle?: string;
  items: FAQItem[];
  defaultVisible?: number;
  showCta?: boolean;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  const prefersReduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [showAll, setShowAll] = useState(false);

  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.08,
  });

  const hiddenCount = Math.max(0, items.length - defaultVisible);

  /* Daralt: gizle + section başına scroll */
  const collapse = useCallback(() => {
    setShowAll(false);
    if (!prefersReduced) {
      setTimeout(() => {
        sectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 50);
    }
  }, [prefersReduced]);

  /* Renk token map */
  const isBlue = accentColor === "blue";
  const accent = {
    text: isBlue ? "text-brand-blue" : "text-brand-purple",
    borderLow: isBlue ? "border-brand-blue/20" : "border-brand-purple/20",
    hoverBorder: isBlue
      ? "hover:border-brand-blue/20"
      : "hover:border-brand-purple/20",
    openBorder: isBlue
      ? "open:border-brand-blue/25"
      : "open:border-brand-purple/25",
    openShadow: isBlue
      ? "open:shadow-[0_0_30px_rgba(0,0,200,0.10)]"
      : "open:shadow-[0_0_30px_rgba(190,41,236,0.10)]",
    iconOpen: isBlue
      ? "group-open:border-brand-blue/30 group-open:bg-brand-blue/10"
      : "group-open:border-brand-purple/30 group-open:bg-brand-purple/10",
    expandBorder: isBlue ? "border-brand-blue/25" : "border-brand-purple/25",
    expandText: isBlue ? "text-brand-blue" : "text-brand-purple",
    expandHover: isBlue
      ? "hover:border-brand-blue/40 hover:bg-brand-blue/10"
      : "hover:border-brand-purple/40 hover:bg-brand-purple/10",
    ctaBase: isBlue
      ? "border-brand-blue/50 bg-brand-blue/30 hover:border-brand-blue/70 hover:bg-brand-blue/40 hover:shadow-[0_0_30px_rgba(0,0,200,0.25)]"
      : "border-brand-purple/50 bg-brand-purple/30 hover:border-brand-purple/70 hover:bg-brand-purple/40 hover:shadow-[0_0_30px_rgba(190,41,236,0.25)]",
  };

  /* JSON-LD — tüm sorular (gizli/görünür fark etmez, Google hepsini okur) */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: toPlain(f.q),
      acceptedAnswer: { "@type": "Answer", text: toPlain(f.a) },
    })),
  };

  /* Animasyon varyantları */
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: prefersReduced ? 0 : 0.07 } },
  };
  const itemVariant = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
  };

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative z-10 border-t border-white/10 bg-black/30"
    >
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div
        ref={inViewRef}
        className="mx-auto max-w-4xl px-4 py-16 sm:px-5 sm:py-20 md:px-6 md:py-24"
      >
        {/* ── Başlık ── */}
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
            {accentText && (
              <>
                {" "}
                <span className={accent.text}>{accentText}</span>
              </>
            )}
          </h2>

          {subtitle && (
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-300 sm:text-base">
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* ── Accordion listesi — TÜM SORULAR HER ZAMAN DOM'DA ── */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="mt-10 space-y-4"
        >
          {items.map((faq, index) => {
            /* defaultVisible sonrasındakiler gizlenir — hidden ile */
            const isHidden = !showAll && index >= defaultVisible;

            return (
              <motion.div
                key={faq.q}
                variants={itemVariant}
                className={isHidden ? "hidden" : undefined}
                aria-hidden={isHidden ? true : undefined}
              >
                <details
                  className={[
                    "group rounded-2xl border border-white/10 bg-white/5 p-2",
                    "backdrop-blur-xl transition-all duration-300",
                    accent.hoverBorder,
                    "hover:bg-white/[0.08]",
                    accent.openBorder,
                    "open:bg-white/[0.07]",
                    accent.openShadow,
                  ].join(" ")}
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 text-base font-bold leading-snug sm:text-lg">
                    <span
                      className={[
                        "transition-colors duration-300",
                        isBlue
                          ? "group-open:text-brand-blue"
                          : "group-open:text-brand-purple",
                      ].join(" ")}
                    >
                      {faq.q}
                    </span>

                    <span
                      className={[
                        "flex h-9 w-9 shrink-0 items-center justify-center",
                        "rounded-full border border-white/10 bg-white/5",
                        accent.text,
                        "transition-all duration-300",
                        "group-open:rotate-180 group-open:text-white",
                        accent.iconOpen,
                      ].join(" ")}
                      aria-hidden="true"
                    >
                      ↓
                    </span>
                  </summary>

                  <div className="px-4 pb-4 pt-1">
                    <div
                      className={[
                        "border-l pl-4 text-sm leading-relaxed text-gray-300",
                        accent.borderLow,
                      ].join(" ")}
                    >
                      {faq.a}
                    </div>

                    {showCta && (
                      <div className="mt-5">
                        <Link
                          href={ctaHref}
                          className={[
                            "shimmer-effect inline-flex items-center justify-center",
                            "overflow-hidden rounded-full border px-6 py-3",
                            "text-[11px] font-bold uppercase text-white transition",
                            "sm:px-8 sm:text-xs",
                            accent.ctaBase,
                          ].join(" ")}
                        >
                          {ctaLabel}
                        </Link>
                      </div>
                    )}
                  </div>
                </details>
              </motion.div>
            );
          })}

          {/* ── Tümünü Gör butonu ── */}
          {!showAll && hiddenCount > 0 && (
            <motion.button
              type="button"
              onClick={() => setShowAll(true)}
              initial={{ opacity: 0, y: prefersReduced ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className={[
                "group flex w-full cursor-pointer items-center justify-center gap-3",
                "rounded-2xl border bg-white/[0.03] px-6 py-4",
                "transition-all duration-300",
                accent.expandBorder,
                accent.expandText,
                accent.expandHover,
              ].join(" ")}
            >
              <span className="text-sm font-bold">
                +{hiddenCount} Soru Daha
              </span>
              <motion.span
                animate={prefersReduced ? {} : { y: [0, 4, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.4,
                  ease: "easeInOut",
                }}
                aria-hidden="true"
              >
                ↓
              </motion.span>
            </motion.button>
          )}
        </motion.div>

        {/* ── Alt CTA — "Cevabını bulamadın mı?" ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 flex flex-col items-center gap-3 text-center md:mt-16"
        >
          <p className="text-sm text-white/35">
            Cevabını bulamadığın bir soru mu var?
          </p>
          <Link
            href={ctaHref}
            className="group relative inline-flex h-11 items-center justify-center overflow-hidden rounded-xl px-8 text-[13px] font-bold uppercase tracking-[0.08em] text-white transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(190,41,236,0.4)]"
            style={{
              background: "linear-gradient(90deg,#be29ec,#0000c8)",
              boxShadow: "0 0 20px rgba(190,41,236,0.3)",
            }}
          >
            <span className="absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative z-10">{ctaLabel}</span>
          </Link>
        </motion.div>
      </div>

      {/* ── Sticky "Daralt" butonu — tüm sorular açıkken ── */}
      <AnimatePresence>
        {showAll && hiddenCount > 0 && (
          <motion.div
            key="collapse-btn"
            initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="sticky bottom-6 z-50 flex justify-center px-4 pb-2"
          >
            <button
              type="button"
              onClick={collapse}
              className="flex cursor-pointer items-center gap-2 rounded-full border border-white/15 bg-[#0d0d1a]/90 px-5 py-2.5 text-xs font-bold text-white/70 shadow-[0_4px_24px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-300 hover:border-white/25 hover:text-white"
            >
              <span aria-hidden="true" className="text-sm leading-none">
                ↑
              </span>
              <span>Daralt</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
