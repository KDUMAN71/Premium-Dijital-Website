// components/sections/hero/Hero.tsx
import ShimmerButton from "@/components/ui/ShimmerButton";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[78svh] items-center overflow-hidden bg-brand-dark sm:min-h-[82svh] md:min-h-[90svh]"
    >
      {/* Arka Plan: Hafif teknolojik derinlik efekti */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,100,255,0.05)_0%,transparent_70%)]" />

      <div className="relative z-20 mx-auto w-full max-w-6xl px-4 pt-20 pb-16 sm:px-5 sm:pt-24 sm:pb-18 md:px-6 md:pt-32 md:pb-20">
        <h1 className="text-4xl font-bold tracking-tighter leading-[0.96] uppercase italic text-white sm:text-5xl md:text-8xl md:leading-[0.95]">
          Dijital Karmaşada <br />
          <span className="bg-gradient-to-r from-brand-blue to-brand-purple bg-clip-text text-transparent">
            Net Bir Yol Çiziyoruz.
          </span>
        </h1>

        <p className="mt-6 max-w-3xl text-base font-light italic leading-relaxed text-gray-300 sm:mt-7 sm:text-lg md:mt-8 md:text-3xl md:leading-tight">
          “Sermayenizi pazar payını domine eden bir büyüme motoruna
          dönüştürüyoruz.”
        </p>

        <div className="mt-10 flex flex-col items-stretch gap-3 sm:mt-12 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 md:gap-6">
          <ShimmerButton
            href="#iletisim"
            variant="primary"
            showShimmer={true}
            className="w-full px-6 py-4 text-center text-xs font-black uppercase tracking-[0.16em] sm:w-auto sm:px-8 sm:text-sm md:px-12 md:py-5 md:tracking-[0.2em]"
          >
            Ücretsiz Analiz Başlat →
          </ShimmerButton>

          <ShimmerButton
            href="#hizmetler"
            variant="ghost"
            className="w-full border-white/10 px-6 py-4 text-center text-xs font-black uppercase tracking-[0.16em] sm:w-auto sm:px-8 sm:text-sm md:px-12 md:py-5 md:tracking-[0.2em]"
          >
            Hizmetleri Gör
          </ShimmerButton>
        </div>
      </div>
    </section>
  );
}
