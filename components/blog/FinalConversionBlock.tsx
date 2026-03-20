import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { CtaConfig } from "@/lib/blog/cta-config";
import type { BlogCategory } from "@/lib/blog/mdx";

interface FinalConversionBlockProps {
  ctaConfig: CtaConfig;
  category: BlogCategory;
  slug: string;
}

const VALUE_PROPS = [
  "Kişiselleştirilmiş analiz — işletmenize özel bulgular",
  "Net aksiyon planı — ilk hafta içinde başlayın",
  "Ölçülebilir hedefler — tahmin değil, veri",
];

export default function FinalConversionBlock({
  ctaConfig,
  category,
  slug,
}: FinalConversionBlockProps) {
  return (
    <div
      className="mt-16 relative overflow-hidden rounded-2xl"
      data-cta="article-end"
      data-category={category}
      data-post={slug}
    >
      {/* Gradient border effect */}
      <div
        className="absolute inset-0 rounded-2xl opacity-40"
        style={{
          background:
            "linear-gradient(135deg, rgba(190,41,236,0.3), rgba(0,0,200,0.2))",
          padding: "1px",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-[1px] rounded-[15px]"
        style={{ background: "#06060a" }}
        aria-hidden="true"
      />

      {/* Arka plan ambient */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at 80% 0%, rgba(190,41,236,0.08) 0%, transparent 60%), radial-gradient(ellipse at 20% 100%, rgba(0,0,200,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 p-8 md:p-10">
        {/* Üst etiket */}
        <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-purple/70">
          {ctaConfig.tag}
        </p>

        {/* Ana başlık */}
        <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-4 max-w-lg">
          {ctaConfig.midHeadline}
        </h3>

        {/* Alt metin */}
        <p className="text-[15px] text-white/55 leading-relaxed mb-8 max-w-md">
          {ctaConfig.midSub}
        </p>

        {/* Değer önerileri + CTA — yan yana (md+) */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          {/* Value props */}
          <ul className="space-y-3">
            {VALUE_PROPS.map((prop) => (
              <li key={prop} className="flex items-start gap-3">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-purple/15">
                  <Check size={11} className="text-brand-purple" strokeWidth={3} />
                </div>
                <span className="text-sm text-white/65 leading-snug">{prop}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="shrink-0 flex flex-col items-start md:items-end gap-3">
            <Link
              href={ctaConfig.href}
              className="inline-flex items-center gap-2.5 rounded-xl px-7 py-4 text-sm font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90"
              style={{ background: "linear-gradient(90deg,#be29ec,#0000c8)" }}
              data-cta="article-end-button"
              data-category={category}
              data-post={slug}
            >
              {ctaConfig.buttonText}
              <ArrowRight size={16} />
            </Link>
            <p className="text-[10px] text-white/30 font-medium">
              Ücretsiz · 1 iş günü yanıt · Taahhüt yok
            </p>
          </div>
        </div>

        {/* Sosyal kanıt şeridi */}
        <div className="mt-8 pt-6 border-t border-white/5">
          <p className="text-[11px] text-white/30 leading-relaxed">
            Premium Dijital, 30+ aktif müşterisiyle Türkiye&apos;nin büyüyen dijital ajanslarından biridir.
            Her analiz süreci işletmeye özel hazırlanır.
          </p>
        </div>
      </div>
    </div>
  );
}
