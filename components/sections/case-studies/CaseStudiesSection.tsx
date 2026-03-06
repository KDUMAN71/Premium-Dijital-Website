// components/sections/case-studies/CaseStudiesSection.tsx
import Link from "next/link";
import { CaseStudy } from "@/components/sections/case-studies/case-study-data";

export default function CaseStudiesSection({ items }: { items: CaseStudy[] }) {
  return (
    <section
      id="vakalar"
      className="py-32 px-6 max-w-7xl mx-auto bg-brand-dark overflow-hidden"
    >
      <div className="text-center mb-24">
        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase italic text-white/95">
          Vaka <span className="text-brand-blue font-light">Analizleri</span>
        </h2>
        <p className="mt-8 text-gray-400 max-w-2xl mx-auto italic text-lg leading-relaxed font-light">
          "Dijital kapasite mimarisinin reel iş sonuçlarına yansıması."
        </p>
      </div>

      {/* 2 KARTLI PREMIUM DÜZEN */}
      <div className="grid grid-cols-1 gap-5 md:gap-8 lg:grid-cols-2 lg:gap-12">
        {items.slice(0, 4).map((c, index) => (
          <article
            key={c.slug}
            className={`group relative flex min-h-0 flex-col gap-6 overflow-hidden rounded-[2rem] border border-white/5 bg-[#0a0a0a] p-5 transition-all duration-500 hover:border-brand-blue/30 sm:rounded-[2.5rem] sm:p-7 md:flex-row md:gap-8 md:p-8 lg:gap-10 lg:rounded-[3rem] lg:p-10 ${
              index >= 2 ? "hidden md:flex" : "flex"
            }`}
          >
            {/* Sol: Veri & Metrik Paneli */}
            <div className="flex w-full shrink-0 flex-col justify-between border-b border-white/10 pb-6 md:w-[160px] md:border-b-0 md:border-r md:pb-0 md:pr-8 lg:w-[180px] lg:pr-10">
              <div>
                <span className="mb-4 block text-[9px] leading-none font-black uppercase tracking-[0.28em] text-white/25 sm:text-[10px] md:mb-5 md:text-[11px] md:tracking-[0.35em] lg:mb-6 lg:tracking-[0.4em]">
                  {c.sector}
                </span>

                <div className="rounded-[1.6rem] border border-brand-blue/20 bg-brand-blue/10 p-5 text-center shadow-[0_0_30px_rgba(0,100,255,0.03)] sm:rounded-[1.8rem] sm:p-6 md:rounded-3xl md:p-7 lg:p-8">
                  <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.18em] text-brand-blue sm:text-[10px] sm:tracking-[0.24em] md:mb-3 md:tracking-[0.3em]">
                    {c.home?.primaryMetric?.label}
                  </p>
                  <p className="text-4xl font-black italic leading-none tracking-tighter text-white sm:text-[2.6rem] md:text-5xl">
                    {c.home?.primaryMetric?.value}
                  </p>
                </div>
              </div>

              <div className="mt-5 text-[9px] uppercase italic leading-tight text-white/10 sm:mt-6 sm:text-[10px]">
                PROJE: {c.timeframeDays} GÜN <br /> // {c.tag}
              </div>
            </div>

            {/* Sağ: İçerik & Strateji Paneli */}
            <div className="flex min-w-0 flex-grow flex-col justify-between">
              <div>
                <h3 className="mb-4 line-clamp-2 text-2xl font-black uppercase italic leading-[0.95] tracking-tighter text-white/95 sm:text-[1.9rem] md:mb-5 md:text-[2rem] lg:mb-6 lg:text-3xl">
                  {c.home?.title}
                </h3>

                <p className="mb-6 line-clamp-3 text-sm italic leading-relaxed text-gray-400 sm:text-[15px] md:mb-8 md:text-base lg:mb-10">
                  {c.home?.summary}
                </p>

                <ul className="space-y-3 md:space-y-4">
                  {c.home?.bullets?.map((b: string, i: number) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.14em] text-white/40 sm:text-[11px] sm:tracking-[0.18em] md:gap-4 md:text-[12px] md:tracking-widest"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue shadow-[0_0_10px_#0066ff]" />
                      <span className="line-clamp-1">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-5 md:mt-10 md:pt-6 lg:mt-12 lg:pt-8">
                <Link
                  href={`/vaka-calismalari/${c.slug}`}
                  className="text-[10px] font-black uppercase tracking-[0.22em] text-brand-blue transition-colors hover:text-white sm:text-[11px] sm:tracking-[0.3em] md:tracking-[0.4em]"
                >
                  Stratejik Analiz →
                </Link>
                <div className="h-2.5 w-2.5 rounded-full bg-brand-blue shadow-[0_0_15px_#0066ff] animate-pulse" />
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* ALT CTA: TÜM VAKALAR */}
      <div className="mt-20 text-center">
        <Link
          href="/vaka-calismalari"
          className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-12 py-5 text-[11px] font-black uppercase tracking-[0.45em] text-white/70 hover:text-white hover:bg-white/10 transition-all hover:scale-105"
        >
          Tüm Vakaları Gör
        </Link>
      </div>
    </section>
  );
}
