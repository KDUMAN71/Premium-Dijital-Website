import Link from "next/link";

export default function WebSitesiSeoVeDonusumAltyapisiPage() {
  return (
    <main className="relative bg-brand-dark text-white">
      <section className="relative mx-auto max-w-6xl px-4 py-20 sm:px-5 sm:py-24 md:px-6 md:py-32">
        <div className="inline-flex items-center rounded-full border border-brand-blue/20 bg-white/5 px-4 py-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/85 sm:text-xs sm:tracking-[0.28em]">
            Hizmetler
          </span>
        </div>

        <h1 className="mt-5 text-4xl font-bold tracking-tighter uppercase text-white sm:text-5xl md:text-7xl">
          Web Sitesi, SEO ve{" "}
          <span className="text-brand-blue">Dönüşüm Altyapısı</span>
        </h1>

        <p className="mt-6 max-w-3xl text-base leading-relaxed text-gray-300 sm:text-lg md:text-xl">
          Web sitesi tasarımı, teknik SEO, hız optimizasyonu, ölçüm sistemleri
          ve dönüşüm odaklı altyapı ile markanızın dijital görünürlüğünü ve
          müşteri kazanma kapasitesini güçlendiren hizmet alanımız.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            "Web Sitesi ve Landing Page Tasarımı",
            "Teknik SEO Çalışmaları",
            "E-Ticaret Sistemleri Altyapısı",
            "GA4 + GTM Ölçüm Altyapısı",
          ].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-white/80"
            >
              {item}
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl sm:p-8 md:p-10">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Sayfa Hazırlanıyor
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-300 sm:text-base">
            Bu sayfayı; web sitesi hizmet kapsamı, SEO yaklaşımı, dönüşüm
            mimarisi, teknik optimizasyon katmanları ve örnek sayfa akışlarıyla
            detaylandıracağız.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/iletisim#analiz"
              className="inline-flex items-center justify-center rounded-full bg-brand-blue px-6 py-4 text-sm font-bold text-white transition hover:shadow-[0_0_28px_rgba(0,0,200,0.22)]"
            >
              Ücretsiz Analiz Al
            </Link>

            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-4 text-sm font-semibold text-white/85 transition hover:bg-white/10 hover:text-white"
            >
              Anasayfaya Dön
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
