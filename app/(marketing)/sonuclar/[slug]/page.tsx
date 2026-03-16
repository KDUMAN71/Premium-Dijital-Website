import Link from "next/link";
import { notFound } from "next/navigation";
import { allCaseStudies } from "@/components/sections/case-studies/case-study-data";

type ParamsPromise = Promise<{ id: string }>;

function SectionTitle({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-10">
      <p className="text-[11px] uppercase tracking-[0.35em] text-white/45">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-2xl md:text-3xl font-extrabold tracking-tight text-white/95">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 max-w-3xl text-white/70 leading-relaxed">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold tracking-wide text-white/70">
      {children}
    </span>
  );
}

export default async function CaseStudyPage({
  params,
}: {
  params: ParamsPromise;
}) {
  const { id } = await params;
  const cs = allCaseStudies.find((item) => item.slug === id);

  if (!cs) {
    notFound();
  }

  return (
    <main className="relative min-h-screen bg-brand-dark pb-24 pt-32">
      <div className="mx-auto max-w-7xl px-6">
        <header className="mb-16 border-b border-white/10 pb-12">
          <div className="flex flex-wrap items-center gap-3">
            <Pill>{cs.sector}</Pill>
            {cs.serviceTags.map((tag: string) => (
              <Pill key={tag}>{tag}</Pill>
            ))}
          </div>

          <h1 className="mt-8 text-3xl md:text-5xl font-black tracking-tight leading-[1.1] text-white/95">
            {cs.title}
          </h1>

          <p className="mt-8 max-w-4xl text-lg text-white/70 leading-relaxed md:text-xl italic font-light">
            {cs.summary}
          </p>
        </header>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-20">
            <section>
              <SectionTitle
                eyebrow="Genel Bakış"
                title="Mevcut Durum ve Stratejik Hedef"
              />
              <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                <div>
                  <h3 className="text-[11px] uppercase tracking-widest text-brand-blue font-bold mb-3">
                    Mevcut Durum
                  </h3>
                  <p className="text-white/70 leading-relaxed italic font-light">
                    {cs.context?.situation}
                  </p>
                </div>
                <div>
                  <h3 className="text-[11px] uppercase tracking-widest text-brand-blue font-bold mb-3">
                    Stratejik Hedef
                  </h3>
                  <p className="text-white/70 leading-relaxed italic font-medium">
                    {cs.context?.goal}
                  </p>
                </div>
              </div>
            </section>

            <section>
              <SectionTitle
                eyebrow="Hikâye & Süreç"
                title="Pazara Giriş ve Dönüşüm Stratejisi"
                subtitle={cs.story?.problem}
              />

              <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-white font-bold text-lg mb-4 italic">
                      01. Stratejik Yaklaşım
                    </h3>
                    <p className="text-gray-400 leading-relaxed font-light italic">
                      {cs.story?.approach}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-4 italic">
                      02. Uygulama ve Teknik Hamleler
                    </h3>
                    <p className="text-gray-400 leading-relaxed font-light italic">
                      {cs.story?.execution}
                    </p>
                  </div>
                </div>

                <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-10">
                  <h3 className="text-white font-bold text-lg mb-6 italic">
                    Ne Yaptık?
                  </h3>
                  <div className="space-y-6">
                    <p className="text-gray-300 italic font-medium leading-relaxed">
                      {cs.strategicNote}
                    </p>
                    <div className="pt-6 border-t border-white/10">
                      <p className="text-[11px] uppercase tracking-[0.35em] text-brand-blue font-bold">
                        Sonuç Odaklı Çıktı:
                      </p>
                      <p className="mt-2 text-white font-black italic text-xl leading-snug">
                        {cs.story?.results}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <SectionTitle
                eyebrow="Uygulama"
                title="Süreci Nasıl Yönetiyoruz?"
                subtitle={cs.story?.implementationSubtitle}
              />
              <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {cs.context?.approach.map((step: string, idx: number) => (
                  <li
                    key={idx}
                    className="flex items-start gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-6"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-blue/20 text-[10px] font-bold text-brand-blue">
                      {idx + 1}
                    </span>
                    <span className="text-white/80 italic text-sm">{step}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-32 space-y-8">
              <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-10 backdrop-blur-sm shadow-2xl">
                <h3 className="text-[11px] uppercase tracking-[0.35em] text-white/45 mb-8">
                  Anahtar Metrikler
                </h3>
                <div className="space-y-8">
                  {cs.metrics.map(
                    (metric: { label: string; value: string }, idx: number) => (
                      <div key={idx} className="group">
                        <p className="text-[10px] uppercase tracking-widest text-brand-blue font-bold mb-1">
                          {metric.label}
                        </p>
                        <p className="text-4xl font-black italic text-white tracking-tighter">
                          {metric.value}
                        </p>
                      </div>
                    ),
                  )}
                </div>
                <div className="mt-12 pt-8 border-t border-white/10">
                  <div className="flex items-center gap-2 text-white/40">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-blue animate-pulse" />
                    <span className="text-[10px] font-mono uppercase">
                      Proje Süresi: {cs.timeframeDays} Gün
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-[2.5rem] border border-brand-blue/20 bg-brand-blue/5 p-10">
                <h3 className="text-xl font-bold text-white mb-4 italic leading-tight">
                  Sizin de başarı hikayenizi <br /> birlikte yazalım mı?
                </h3>
                <p className="text-sm text-white/60 leading-relaxed italic mb-8">
                  Veriye dayalı stratejilerle, büyüme hedeflerinizi somut bir
                  başarı hikayesine dönüştürüyoruz
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <Link
                    href="/iletisim"
                    className="inline-flex items-center justify-center rounded-full bg-brand-blue px-6 py-4 text-xs font-black uppercase tracking-[0.28em] hover:shadow-[0_0_45px_rgba(0,100,200,0.45)] transition"
                  >
                    Randevu Al →
                  </Link>
                  <Link
                    href="/#analiz"
                    className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-4 text-xs font-bold uppercase tracking-[0.22em] text-white/80 hover:bg-white/10 transition"
                  >
                    Ücretsiz Analiz
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/sonuclar"
            className="text-sm font-bold text-white/70 hover:text-white transition"
          >
            ← Tüm vaka listesine dön
          </Link>
          <Link
            href="/#vaka"
            className="text-sm font-bold text-brand-blue hover:text-white transition"
          >
            Sıradaki Vaka Analizi →
          </Link>
        </div>
      </div>
    </main>
  );
}
