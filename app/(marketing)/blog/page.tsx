export const metadata = {
  title: "Blog | Premium Dijital",
  description:
    "Performans pazarlaması, dönüşüm optimizasyonu, teknik SEO ve ölçüm altyapısı üzerine içerikler.",
};

export default function BlogPage() {
  return (
    <main className="bg-brand-dark text-white">
      <section className="mx-auto max-w-6xl px-6 py-24">
        <p className="text-xs uppercase tracking-[0.3em] text-white/50">Blog</p>
        <h1 className="mt-4 text-4xl md:text-6xl font-bold tracking-tighter">
          Operatif Seviye
          <span className="text-brand-blue"> Performans İçerikleri.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-gray-300">
          Blog stratejisini daha önce kilitlemiştik: operatif seviye,
          ölçülebilir performans içerikleri. Buraya liste ve etiketleme yapısı
          ekleyeceğiz.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "Quality Score nasıl yükseltilir?",
              meta: "Google Ads • 7 dk",
            },
            {
              title: "GA4 + GTM ile doğru dönüşüm ölçümü",
              meta: "Analytics • 8 dk",
            },
            { title: "Landing CRO: %1 → %3 dönüşüm", meta: "CRO • 6 dk" },
            {
              title: "Core Web Vitals ve reklam maliyeti ilişkisi",
              meta: "Web Perf • 5 dk",
            },
          ].map((p) => (
            <article
              key={p.title}
              className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-8"
            >
              <p className="text-xs uppercase tracking-[0.25em] text-white/50">
                {p.meta}
              </p>
              <h2 className="mt-3 text-xl font-bold">{p.title}</h2>
              <div className="mt-8 text-brand-purple font-bold">Oku →</div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
