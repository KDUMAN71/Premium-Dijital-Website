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

      <div className="relative z-20 mx-auto w-full max-w-6xl px-5 pb-10 pt-24 sm:px-6 md:px-8">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-6 lg:gap-10">
          {/* SOL */}
          <div className="flex w-full min-w-0 flex-col gap-5 md:w-[54%] md:shrink-0 lg:w-[52%]">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 backdrop-blur-sm sm:px-4">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-purple" />
              <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-white/60 sm:text-[10px] sm:tracking-[0.2em]">
                Premium Dijital Reklam Ajansı
              </span>
            </div>

            <h1 className="text-[2.25rem] font-black uppercase italic leading-[0.9] tracking-tighter text-white xs:text-[2.4rem] sm:text-[3.25rem] md:text-[3rem] lg:text-[3.5rem]">
              <span className="block break-words sm:whitespace-nowrap">
                Dijital Karmaşada
              </span>
              <span className="block break-words bg-gradient-to-r from-brand-purple to-brand-blue bg-clip-text text-transparent sm:whitespace-nowrap">
                Net Bir Yön Bulun.
              </span>
            </h1>

            <p className="max-w-[420px] text-[0.95rem] font-light leading-relaxed text-white/50 sm:text-base">
              Reklam, SEO ve veri altyapısını tek bir büyüme sisteminde kalibre
              ediyoruz.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:gap-3">
              <div className="w-full sm:w-auto">
                <ShimmerButton
                  href="#iletisim"
                  variant="primary"
                  size="md"
                  className="w-full sm:w-auto"
                >
                  Ücretsiz Analiz Başlat →
                </ShimmerButton>
              </div>

              <div className="w-full sm:w-auto">
                <ShimmerButton
                  href="#hizmetler"
                  variant="secondary"
                  size="md"
                  showShimmer={false}
                  className="w-full sm:w-auto"
                >
                  Hizmetleri Gör
                </ShimmerButton>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
              <span className="text-center text-[9px] uppercase tracking-[0.14em] text-white/25 sm:text-[10px] sm:tracking-[0.2em]">
                Google · Meta · GA4 · Search Console
              </span>
              <div className="h-px flex-1 bg-gradient-to-l from-white/10 to-transparent" />
            </div>
          </div>

          {/* SAĞ */}
          <div className="flex w-full items-center justify-center md:w-[46%] md:-mt-20 md:justify-end lg:w-[48%]">
            <div className="w-full max-w-[300px] sm:max-w-[340px] md:max-w-[340px] lg:max-w-[360px]">
              <CompassVisual />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
