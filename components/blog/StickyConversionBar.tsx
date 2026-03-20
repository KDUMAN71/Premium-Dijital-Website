"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, ArrowRight } from "lucide-react";
import type { CtaConfig } from "@/lib/blog/cta-config";
import type { BlogCategory } from "@/lib/blog/mdx";

interface StickyConversionBarProps {
  ctaConfig: CtaConfig;
  category: BlogCategory;
  slug: string;
}

export default function StickyConversionBar({
  ctaConfig,
  category,
  slug,
}: StickyConversionBarProps) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);

  // sessionStorage key — her yazı için bağımsız
  const storageKey = `pd_sticky_dismissed_${slug}`;

  useEffect(() => {
    // Daha önce kapatıldıysa gösterme
    try {
      if (sessionStorage.getItem(storageKey) === "1") {
        setDismissed(true);
        return;
      }
    } catch {
      // sessionStorage erişilemiyorsa devam et
    }

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const pct = Math.round((scrollTop / docHeight) * 100);
      setScrollPct(pct);
      setVisible(pct >= 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [storageKey]);

  const handleDismiss = () => {
    setVisible(false);
    setDismissed(true);
    try {
      sessionStorage.setItem(storageKey, "1");
    } catch {
      // ignore
    }
  };

  if (dismissed || !visible) return null;

  const message =
    scrollPct >= 70 ? ctaConfig.stickyMsg70 : ctaConfig.stickyMsg;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 transform transition-transform duration-300"
      role="complementary"
      aria-label="Dönüşüm çubuğu"
      data-cta="sticky"
      data-category={category}
      data-post={slug}
    >
      {/* Desktop bar */}
      <div className="hidden md:block border-t border-white/8 bg-[#06060a]/95 backdrop-blur-xl shadow-[0_-4px_30px_rgba(190,41,236,0.1)]">
        <div className="mx-auto max-w-[1100px] px-6 py-3.5 flex items-center justify-between gap-6">
          <p className="text-sm font-medium text-white/65 leading-tight">
            {message}
          </p>

          <div className="flex shrink-0 items-center gap-3">
            <Link
              href={ctaConfig.href}
              className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90"
              style={{ background: "linear-gradient(90deg,#be29ec,#0000c8)" }}
              data-cta="sticky-button"
              data-category={category}
              data-post={slug}
            >
              {ctaConfig.buttonText}
              <ArrowRight size={13} />
            </Link>

            <button
              onClick={handleDismiss}
              className="flex h-8 w-8 items-center justify-center rounded-full text-white/25 hover:text-white/60 hover:bg-white/5 transition-all"
              aria-label="Kapat"
            >
              <X size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile pill */}
      <div className="md:hidden px-4 pb-4">
        <div className="relative rounded-2xl border border-brand-purple/20 bg-[#06060a]/95 backdrop-blur-xl shadow-[0_-4px_30px_rgba(190,41,236,0.15)] px-5 py-4 flex items-center gap-3">
          <Link
            href={ctaConfig.href}
            className="flex-1 text-center rounded-xl py-3 text-[11px] font-bold uppercase tracking-widest text-white"
            style={{ background: "linear-gradient(90deg,#be29ec,#0000c8)" }}
            data-cta="sticky-mobile-button"
            data-category={category}
            data-post={slug}
          >
            {ctaConfig.buttonText}
          </Link>
          <button
            onClick={handleDismiss}
            className="shrink-0 flex h-8 w-8 items-center justify-center rounded-full text-white/25 hover:text-white/60 transition-all"
            aria-label="Kapat"
          >
            <X size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
