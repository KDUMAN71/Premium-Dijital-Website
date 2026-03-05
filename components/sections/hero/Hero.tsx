// components/sections/hero/Hero.tsx (SERVER)
import ShimmerButton from "@/components/ui/ShimmerButton";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[90svh] flex items-center bg-brand-dark overflow-hidden"
    >
      {/* Arka Plan: Hafif teknolojik derinlik efekti */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,100,255,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-20 mx-auto w-full max-w-6xl px-6 pt-32 pb-20">
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.95] uppercase italic text-white">
          Dijital Karmaşada <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-purple">
            Net Bir Yol Çiziyoruz.
          </span>
        </h1>

        <p className="mt-8 max-w-3xl text-xl md:text-3xl text-gray-300 font-light italic leading-tight">
          “Sermayenizi pazar payını domine eden bir büyüme motoruna
          dönüştürüyoruz.”
        </p>

        <div className="mt-12 flex flex-wrap items-center gap-6">
          {/* 1. Buton: Işıldayan (Analiz Başlat) */}
          <ShimmerButton
            href="#iletisim"
            variant="primary"
            showShimmer={true}
            className="px-12 py-5 text-sm font-black uppercase tracking-[0.2em]"
          >
            Ücretsiz Analiz Başlat →
          </ShimmerButton>

          {/* 2. Buton: Şeffaf (Hizmetleri Gör) */}
          <ShimmerButton
            href="#hizmetler"
            variant="ghost"
            className="px-12 py-5 text-sm font-black uppercase tracking-[0.2em] border-white/10"
          >
            Hizmetleri Gör
          </ShimmerButton>
        </div>
      </div>
    </section>
  );
}
