"use client";

import Link from "next/link";
import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export type FAQItem = { q: string; a: string };

/* ─────────────────────────────────────────────
   JSON-LD — SEO: tüm sorular schema'ya giriyor
   (gizli olanlar da — Google okur)
───────────────────────────────────────────── */
function FAQSchema({ items }: { items: FAQItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ─────────────────────────────────────────────
   Tek accordion öğesi
───────────────────────────────────────────── */
function AccordionItem({
  item,
  isOpen,
  onToggle,
  accentColor,
  ctaHref,
  ctaLabel,
  index,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  accentColor: string;
  ctaHref: string;
  ctaLabel: string;
  index: number;
}) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReduced ? 0 : 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        delay: index * 0.04,
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
        isOpen
          ? "border-white/15 bg-white/[0.06]"
          : "border-white/8 bg-white/[0.03] hover:border-white/12 hover:bg-white/[0.05]"
      }`}
      itemScope
      itemType="https://schema.org/Question"
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
      >
        <span
          className="text-[14px] font-semibold leading-snug text-white/85 sm:text-[15px] md:text-base"
          itemProp="name"
        >
          {item.q}
        </span>

        <span
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/15 transition-all duration-300"
          style={
            isOpen
              ? {
                  background: accentColor,
                  borderColor: "transparent",
                  boxShadow: `0 0 10px ${accentColor}55`,
                }
              : {}
          }
        >
          <motion.span
            className="text-[11px] font-black text-white leading-none"
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            +
          </motion.span>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="body"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
            itemScope
            itemType="https://schema.org/Answer"
            itemProp="acceptedAnswer"
          >
            <div className="border-t border-white/8 px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
              <p
                className="text-sm leading-relaxed text-white/60 sm:text-[15px]"
                itemProp="text"
              >
                {item.a}
              </p>
              <div className="mt-5">
                <Link
                  href={ctaHref}
                  className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white/65 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white"
                >
                  {ctaLabel}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Ana bileşen
───────────────────────────────────────────── */
const DEFAULT_VISIBLE = 4; // İlk kaç soru her zaman görünür

export default function FAQSection({
  id = "sss",
  title,
  accent = "purple",
  items,
  ctaHref = "/#analiz",
  ctaLabel = "Ücretsiz Analiz Başlat →",
  defaultVisible = DEFAULT_VISIBLE,
}: {
  id?: string;
  title: string;
  accent?: "blue" | "purple";
  items: FAQItem[];
  ctaHref?: string;
  ctaLabel?: string;
  defaultVisible?: number;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  const accentColor = accent === "blue" ? "#0000c8" : "#be29ec";

  const visibleItems = expanded ? items : items.slice(0, defaultVisible);
  const hiddenCount = items.length - defaultVisible;

  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i));

  /* Daralt — section başına smooth scroll */
  const collapse = useCallback(() => {
    setExpanded(false);
    setOpenIndex(null);
    setTimeout(() => {
      sectionRef.current?.scrollIntoView({
        behavior: prefersReduced ? "auto" : "smooth",
        block: "start",
      });
    }, 50);
  }, [prefersReduced]);

  const [titleBefore, titleAfter] = title.includes("{accent}")
    ? title.split("{accent}")
    : [title, ""];

  return (
    <section
      ref={sectionRef}
      id={id}
      aria-label="Sık sorulan sorular"
      className="relative z-10 border-t border-white/5 px-4 py-16 sm:px-5 sm:py-20 md:px-6 md:py-28"
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      {/* JSON-LD — tüm sorular, görünür/gizli fark etmez */}
      <FAQSchema items={items} />

      <div className="mx-auto max-w-3xl">
        {/* Başlık */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 text-center md:mb-14"
        >
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 mb-5">
            <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-white/50">
              Sık Sorulanlar
            </span>
          </div>
          <h2 className="text-3xl font-bold uppercase tracking-tighter sm:text-4xl md:text-5xl">
            {titleBefore}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(90deg,#be29ec,#0000c8)",
              }}
            >
              {titleAfter}
            </span>
          </h2>
          <p className="mt-3 text-sm text-white/40 sm:text-base">
            Karar vermeden önce en çok sorulan sorular.
          </p>
        </motion.div>

        {/* Accordion listesi */}
        <div className="flex flex-col gap-3">
          <AnimatePresence initial={false}>
            {visibleItems.map((item, i) => (
              <AccordionItem
                key={item.q}
                index={i}
                item={item}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
                accentColor={accentColor}
                ctaHref={ctaHref}
                ctaLabel={ctaLabel}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Genişlet / Daralt kontrolleri */}
        {hiddenCount > 0 && (
          <div className="mt-6 flex items-center justify-center gap-4">
            {!expanded ? (
              /* Tümünü Gör butonu */
              <motion.button
                type="button"
                onClick={() => setExpanded(true)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="group flex items-center gap-2.5 rounded-full border border-white/12 bg-white/5 px-6 py-3 text-[12px] font-bold uppercase tracking-[0.2em] text-white/55 transition-all hover:border-white/20 hover:bg-white/8 hover:text-white"
              >
                <span>+{hiddenCount} Soru Daha</span>
                <motion.span
                  className="text-[10px] text-white/35"
                  animate={{ y: [0, 2, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.8,
                    ease: "easeInOut",
                  }}
                >
                  ↓
                </motion.span>
              </motion.button>
            ) : (
              /* Daralt butonu — sticky konumda */
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="sticky bottom-6 z-50"
              >
                <button
                  type="button"
                  onClick={collapse}
                  className="flex items-center gap-2.5 rounded-full border border-white/15 bg-[#050505]/90 px-6 py-3 text-[12px] font-bold uppercase tracking-[0.2em] text-white/60 shadow-lg backdrop-blur-xl transition-all hover:border-white/25 hover:text-white"
                  style={{
                    boxShadow:
                      "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)",
                  }}
                >
                  <motion.span
                    animate={{ y: [0, -2, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.8,
                      ease: "easeInOut",
                    }}
                    className="text-[10px]"
                  >
                    ↑
                  </motion.span>
                  <span>Başa Dön</span>
                </button>
              </motion.div>
            )}
          </div>
        )}

        {/* Alt CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
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
    </section>
  );
}
