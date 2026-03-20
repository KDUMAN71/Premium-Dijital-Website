import Link from "next/link";
import { ArrowRight, CheckCircle, Users, Zap } from "lucide-react";
import type { CtaConfig } from "@/lib/blog/cta-config";
import type { BlogCategory } from "@/lib/blog/mdx";

interface EarlyConversionBlockProps {
  ctaConfig: CtaConfig;
  category: BlogCategory;
  slug: string;
}

const TRUST_ITEMS = [
  { icon: Users, label: "30+ aktif müşteri" },
  { icon: CheckCircle, label: "Ücretsiz ilk analiz" },
  { icon: Zap, label: "1 iş günü yanıt" },
];

export default function EarlyConversionBlock({
  ctaConfig,
  category,
  slug,
}: EarlyConversionBlockProps) {
  return (
    <div className="mx-auto max-w-[760px] px-6 mb-8">
      <div
        className="relative overflow-hidden rounded-2xl border border-brand-purple/15 bg-white/[0.025] px-6 py-5"
        data-cta="early"
        data-category={category}
        data-post={slug}
      >
        {/* Arka plan parıltısı */}
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-[80px] opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(190,41,236,0.25), transparent)",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          {/* Sol: Trust göstergeleri */}
          <div className="flex flex-wrap items-center gap-5">
            {TRUST_ITEMS.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon
                  size={13}
                  className="text-brand-purple shrink-0"
                  strokeWidth={2}
                />
                <span className="text-[11px] font-semibold text-white/55 whitespace-nowrap">
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Sağ: Kompakt CTA */}
          <Link
            href={ctaConfig.href}
            className="inline-flex shrink-0 items-center gap-2 rounded-xl px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90"
            style={{ background: "linear-gradient(90deg,#be29ec,#0000c8)" }}
            data-cta="early-button"
            data-category={category}
            data-post={slug}
          >
            {ctaConfig.buttonText}
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}
