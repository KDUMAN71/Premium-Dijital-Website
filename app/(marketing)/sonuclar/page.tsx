export const metadata = {
  title: "Vaka Çalışmaları | Premium Dijital",
  description:
    "Anonim ve sektör bazlı vaka çalışmaları: CPA düşürme, dönüşüm altyapısı, premium algı.",
};

export default function VakaCalismalariPage() {
  return (
    <main className="bg-brand-dark text-white">
      <section className="mx-auto max-w-6xl px-6 py-24">
        <p className="text-xs uppercase tracking-[0.3em] text-white/50">
          Vaka Çalışmaları
        </p>
        <h1 className="mt-4 text-4xl md:text-6xl font-bold tracking-tighter">
          Sektör Bazlı
          <span className="text-brand-purple"> Gerçek Senaryolar.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-gray-300">
          Burayı anonim sektör vakalarıyla dolduracağız. (Metriğe dayalı, “ne
          değişti / neden değişti” formatı.)
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Sağlık Hizmeti",
              tag: "Lead Gen",
              desc: "Kalite sinyalleri + CPA optimizasyonu.",
            },
            {
              title: "B2B & Sanayi",
              tag: "High Intent",
              desc: "Search yapısı + landing CRO + ölçüm.",
            },
            {
              title: "E-Ticaret",
              tag: "ROAS",
              desc: "Katalog + remarketing + dönüşüm oranı.",
            },
          ].map((c) => (
            <article
              key={c.title}
              className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-8"
            >
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-xl font-bold">{c.title}</h2>
                <span className="text-[11px] uppercase tracking-[0.25em] text-white/60">
                  {c.tag}
                </span>
              </div>
              <p className="mt-3 text-gray-300/90">{c.desc}</p>
              <div className="mt-8 text-brand-blue font-bold">İncele →</div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
