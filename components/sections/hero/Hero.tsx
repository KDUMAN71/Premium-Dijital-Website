// components/sections/hero/Hero.tsx
import Link from "next/link";
import CompassVisual from "@/components/sections/hero/CompassVisual";
import ShimmerButton from "@/components/ui/ShimmerButton";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-brand-dark"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_50%,rgba(190,41,236,0.07)_0%,rgba(0,0,200,0.04)_50%,transparent_80%)]" />

      <div className="relative z-20 mx-auto w-full max-w-6xl px-5 pt-24 pb-10 sm:px-6 md:px-8">
        <div className="flex flex-col items-center gap-10 md:flex-row md:items-start md:gap-6 lg:gap-10">
          {/* SOL */}
          <div className="flex w-full min-w-0 flex-col gap-6 md:w-[54%] md:shrink-0 lg:w-[52%]">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-purple" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
                Premium Dijital Reklam Ajansı
              </span>
            </div>

            {/* Font 3rem sabit — "Dijital Karmaşada" ve "Net Bir Yön Bulun." kesinlikle 2 satır */}
            <h1 className="text-[3rem] font-black tracking-tighter leading-[0.92] uppercase italic text-white sm:text-[3.25rem] md:text-[3rem] lg:text-[3.5rem]">
              <span className="block whitespace-nowrap">Dijital Karmaşada</span>
              <span className="block whitespace-nowrap bg-gradient-to-r from-brand-purple to-brand-blue bg-clip-text text-transparent">
                Net Bir Yön Bulun.
              </span>
            </h1>

            <p className="max-w-[420px] text-[0.9rem] font-light leading-relaxed text-white/50 sm:text-base">
              Reklam, SEO ve veri altyapısını tek bir büyüme sisteminde kalibre
              ediyoruz.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:gap-3">
              <ShimmerButton href="#iletisim" variant="primary" size="md">
                Ücretsiz Analiz Başlat →
              </ShimmerButton>

              <ShimmerButton
                href="#hizmetler"
                variant="secondary"
                size="md"
                showShimmer={false}
              >
                Hizmetleri Gör
              </ShimmerButton>
            </div>

            <div className="flex items-center gap-4 pt-1">
              <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/25">
                Google · Meta · GA4 · Search Console
              </span>
              <div className="h-px flex-1 bg-gradient-to-l from-white/10 to-transparent" />
            </div>
          </div>

          {/* SAĞ — md:-mt-20 ile yeterince yukarı */}
          <div className="flex w-full items-center justify-center md:w-[46%] md:-mt-20 md:justify-end lg:w-[48%]">
            <div className="w-full max-w-[360px] md:max-w-[340px] lg:max-w-[360px]">
              <CompassVisual />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
