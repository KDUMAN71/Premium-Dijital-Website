import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

interface RelatedAnalysisProps {
  href: string;
  title: string;
  description: string;
}

/**
 * MDX içinde kullanılan internal link callout bileşeni.
 * Topic cluster mimarisini güçlendirir.
 *
 * Kullanım (MDX içinde):
 * <RelatedAnalysis
 *   href="/hizmetler/web-seo-donusum"
 *   title="Web Sitesi, SEO & Dönüşüm Çözümü"
 *   description="Kısa açıklama..."
 * />
 */
export default function RelatedAnalysis({
  href,
  title,
  description,
}: RelatedAnalysisProps) {
  return (
    <Link href={href} className="group block not-prose my-10">
      <div className="relative overflow-hidden rounded-2xl border border-brand-purple/20 bg-white/[0.02] px-6 py-5 transition-all duration-300 hover:border-brand-purple/40 hover:bg-white/[0.04]">
        {/* Arka plan ışığı */}
        <div
          className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: "radial-gradient(circle, rgba(190,41,236,0.12), transparent)",
          }}
        />

        <div className="relative z-10 flex items-start gap-4">
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-purple/10 border border-brand-purple/20">
            <BookOpen size={15} className="text-brand-purple" />
          </div>

          <div className="flex-1 min-w-0">
            <p className="mb-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-purple/70">
              İlgili İçerik
            </p>
            <h4 className="text-sm font-semibold text-white leading-snug mb-1">
              {title}
            </h4>
            <p className="text-xs text-white/45 leading-relaxed line-clamp-2">
              {description}
            </p>
          </div>

          <ArrowRight
            size={16}
            className="mt-1 shrink-0 text-white/20 transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand-purple"
          />
        </div>
      </div>
    </Link>
  );
}
