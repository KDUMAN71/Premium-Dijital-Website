export const metadata = {
  title: "Hizmetler | Premium Dijital",
  description:
    "Performans pazarlaması, web & dönüşüm altyapıları, marka & görsel iletişim. Ölçülebilir büyüme sistemi.",
};

export default function HizmetlerPage() {
  return (
    <main className="bg-brand-dark text-white">
      <section className="mx-auto max-w-6xl px-6 py-24">
        <p className="text-xs uppercase tracking-[0.3em] text-white/50">
          Hizmetler
        </p>
        <h1 className="mt-4 text-4xl md:text-6xl font-bold tracking-tighter">
          Büyüme Sistemini
          <span className="text-brand-blue"> Baştan Kuruyoruz.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-gray-300">
          Burada her hizmeti ayrı bir sayfa veya section olarak
          detaylandıracağız. Şimdilik bu sayfa “site mimarisi” için yer tutucu.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Performans Pazarlaması",
              desc: "Google/Meta odaklı yapı, teklif stratejileri ve kalite skoru.",
            },
            {
              title: "Web & Dönüşüm Altyapıları",
              desc: "Landing mimarisi, Core Web Vitals ve ölçüm altyapısı (GA4/GTM).",
            },
            {
              title: "Marka & Görsel İletişim",
              desc: "Premium algı, görsel dil ve motion sistem.",
            },
          ].map((c) => (
            <article
              key={c.title}
              className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-8"
            >
              <h2 className="text-xl font-bold">{c.title}</h2>
              <p className="mt-3 text-gray-300/90">{c.desc}</p>
            </article>
          ))}
        </div>

        <div className="mt-14">
          <a
            href="/iletisim"
            className="shimmer-effect inline-flex items-center justify-center rounded-full px-10 py-4
                       bg-brand-blue text-white font-bold uppercase tracking-widest
                       hover:shadow-[0_0_35px_rgba(0,0,200,0.35)] transition
                       relative overflow-hidden"
          >
            Ücretsiz Analiz Al →
          </a>
        </div>
      </section>
    </main>
  );
}
