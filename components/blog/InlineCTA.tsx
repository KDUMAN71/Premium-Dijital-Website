import Link from "next/link";
import { ArrowRight, Lightbulb } from "lucide-react";
import type { CtaConfig } from "@/lib/blog/cta-config";
import { defaultCta } from "@/lib/blog/cta-config";

interface InlineCTAProps {
  config?: CtaConfig;
}

/**
 * MDX içinde <InlineCTA /> şeklinde kullanılır.
 * getMdxComponents(ctaConfig) ile kategori bağlamı inject edilir.
 */
export default function InlineCTA({ config = defaultCta }: InlineCTAProps) {
  return (
    <div
      className="not-prose my-12 relative overflow-hidden rounded-2xl border border-brand-purple/25 bg-gradient-to-br from-brand-purple/8 to-brand-blue/5 p-6"
      data-cta="inline"
    >
      {/* Sol dikey aksan çizgisi */}
      <div
        className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full"
        style={{ background: "linear-gradient(180deg,#be29ec,#0000c8)" }}
        aria-hidden="true"
      />

      {/* Arka plan parıltısı */}
      <div
        className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-full blur-[60px] opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(190,41,236,0.4), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 pl-4">
        <div className="flex items-start gap-3 mb-4">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand-purple/15 border border-brand-purple/20">
            <Lightbulb size={14} className="text-brand-purple" />
          </div>
          <div>
            <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.3em] text-brand-purple/70">
              {config.tag}
            </p>
            <h4 className="text-[15px] font-bold text-white leading-snug">
              {config.midHeadline}
            </h4>
          </div>
        </div>

        <p className="text-sm text-white/55 leading-relaxed mb-5">
          {config.midSub}
        </p>

        <Link
          href={config.href}
          className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90"
          style={{ background: "linear-gradient(90deg,#be29ec,#0000c8)" }}
          data-cta="inline-button"
        >
          {config.buttonText}
          <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}
