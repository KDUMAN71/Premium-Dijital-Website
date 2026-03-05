// components/sections/case-studies/CaseStudiesSection.tsx
import Link from "next/link";
import { CaseStudy } from "@/components/sections/case-studies/case-study-data";

export default function CaseStudiesSection({ items }: { items: any[] }) {
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {items.map((c) => (
          <article
            key={c.slug}
            className="group relative bg-[#0a0a0a] border border-white/5 rounded-[3rem] p-12 flex flex-col md:flex-row gap-12 transition-all duration-500 hover:border-brand-blue/30 overflow-hidden min-h-[480px]"
          >
            {/* Sol: Veri & Metrik Paneli */}
            <div className="flex flex-col justify-between w-full md:w-[180px] shrink-0 border-b md:border-b-0 md:border-r border-white/10 pb-10 md:pb-0 md:pr-12">
              <div>
                <span className="text-[11px] font-black text-white/25 uppercase tracking-[0.4em] block mb-6 leading-none">
                  {c.sector}
                </span>
                <div className="bg-brand-blue/10 border border-brand-blue/20 rounded-3xl p-8 text-center shadow-[0_0_30px_rgba(0,100,255,0.03)]">
                  <p className="text-[10px] font-bold text-brand-blue uppercase tracking-[0.3em] mb-3">
                    {c.home?.primaryMetric?.label}
                  </p>
                  <p className="text-5xl font-black italic text-white leading-none tracking-tighter">
                    {c.home?.primaryMetric?.value}
                  </p>
                </div>
              </div>
              <div className="mt-8 text-[10px] font-mono text-white/10 uppercase italic leading-tight">
                PROJE: {c.timeframeDays} GÜN <br /> // {c.tag}
              </div>
            </div>

            {/* Sağ: İçerik & Strateji Paneli */}
            <div className="flex flex-col flex-grow justify-between">
              <div>
                <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white/95 mb-6 line-clamp-2 leading-[0.95]">
                  {c.home?.title}
                </h3>
                <p className="text-base text-gray-400 italic mb-10 line-clamp-3 leading-relaxed">
                  {c.home?.summary}
                </p>
                <ul className="space-y-4">
                  {c.home?.bullets?.map((b: string, i: number) => (
                    <li
                      key={i}
                      className="flex items-center gap-4 text-[12px] font-bold text-white/40 uppercase tracking-widest"
                    >
                      <span className="w-1.5 h-1.5 bg-brand-blue rounded-full shadow-[0_0_10px_#0066ff]" />
                      <span className="line-clamp-1">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* dizinine göre [id] linklemesi */}
              <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between">
                <Link
                  href={`/vaka-calismalari/${c.slug}`}
                  className="text-[11px] font-black text-brand-blue uppercase tracking-[0.4em] hover:text-white transition-colors"
                >
                  Stratejik Analiz →
                </Link>
                <div className="w-2.5 h-2.5 rounded-full bg-brand-blue animate-pulse shadow-[0_0_15px_#0066ff]" />
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
