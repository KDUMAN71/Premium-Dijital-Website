export const metadata = {
  title: "Hakkımızda | Premium Dijital",
  description:
    "Premium Dijital: veri odaklı büyüme, performans pazarlaması ve dönüşüm sistemleri.",
};

export default function HakkimizdaPage() {
  return (
    <main className="bg-brand-dark text-white">
      <section className="mx-auto max-w-6xl px-6 py-24">
        <p className="text-xs uppercase tracking-[0.3em] text-white/50">
          Hakkımızda
        </p>
        <h1 className="mt-4 text-4xl md:text-6xl font-bold tracking-tighter">
          Ajans Değil,
          <span className="text-brand-purple"> Strateji Ortağı.</span>
        </h1>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-8">
            <h2 className="text-xl font-bold">Misyon</h2>
            <p className="mt-3 text-gray-300/90 leading-relaxed">
              Markaların dijitalde yalnızca görünür olmasını değil, ölçülebilir
              şekilde büyümesini sağlarız.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-8">
            <h2 className="text-xl font-bold">Yaklaşım</h2>
            <p className="mt-3 text-gray-300/90 leading-relaxed">
              Reklam + landing + ölçüm altyapısı tek sistemdir. Biz bu sistemi
              tasarlar, kurar ve optimize ederiz.
            </p>
          </div>
        </div>

        <div className="mt-14">
          <a
            href="/vaka-calismalari"
            className="inline-flex items-center justify-center rounded-full px-10 py-4
                       border border-white/15 bg-white/5 hover:bg-white/10 transition
                       font-bold uppercase tracking-widest"
          >
            Vaka Çalışmalarını Gör →
          </a>
        </div>
      </section>
    </main>
  );
}
