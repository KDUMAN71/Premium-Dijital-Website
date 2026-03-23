// app/(marketing)/iletisim/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import AnalysisForm from "@/components/sections/AnalysisForm";
import {
  submitAnalysisAction,
  submitQuickContactAction,
} from "@/app/(marketing)/_actions/analysis";

export const metadata: Metadata = {
  title: "Ücretsiz Dijital Analiz | Premium Dijital",
  description:
    "Reklam bütçeniz boşa gidiyor mu? Web siteniz dönüşüm sağlıyor mu? Ücretsiz analiz isteyin, 24 saat içinde net bir büyüme planı gönderelim.",
};

const problems = [
  "Reklam veriliyor ama müşteri gelmiyor",
  "Web sitesi var ama dönüşüm yok",
  "Ajans rapor gönderiyor ama sonuç yok",
  "Reklam bütçesi artıyor ama kâr artmıyor",
  "Ziyaretçi var ama satış gelmiyor",
  "Hangi kanalın işe yaradığı bilinmiyor",
];

const steps = [
  {
    n: "01",
    title: "Talebi İnceleriz",
    desc: "Formu aldıktan sonra dijital varlıklarınızı incelemeye başlarız.",
  },
  {
    n: "02",
    title: "Analiz Yaparız",
    desc: "Reklam hesabınızı, web sitenizi ve dönüşüm altyapınızı analiz ederiz.",
  },
  {
    n: "03",
    title: "Plan Göndeririz",
    desc: "24 saat içinde somut bulgular ve öncelikli aksiyon planı iletiriz.",
  },
  {
    n: "04",
    title: "Görüşme Planlarız",
    desc: "Uygun görülürse bir strateji görüşmesi organize ederiz.",
  },
];

export default function ContactPage() {
  return (
    <main className="pt-24 bg-[#050505]">
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-1/2 h-80 w-[52rem] -translate-x-1/2 rounded-full bg-brand-blue/20 blur-[140px]" />
          <div className="absolute top-40 left-1/4 h-72 w-[42rem] rounded-full bg-brand-purple/15 blur-[140px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="grid gap-10 md:grid-cols-[1.05fr_.95fr] md:items-start">
            {/* Sol: metin */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.35em] text-white/60">
                24 Saat İçinde Dönüş • KVKK Uyumlu
              </div>

              <h1 className="mt-6 text-5xl md:text-7xl font-black tracking-tighter leading-[1.0]">
                Dijital Pazarlama
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-purple">
                  Çalışıyor mu?
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-gray-400 text-lg md:text-xl leading-relaxed">
                Yoksa sadece bütçe mi harcıyorsunuz? Web sitenizi, reklam
                performansınızı ve dönüşüm altyapınızı{" "}
                <span className="text-white font-semibold">
                  ücretsiz analiz edelim.
                </span>
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link
                  href="#analiz"
                  className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-brand-blue px-10 text-[12px] font-black uppercase tracking-[0.35em] text-white shadow-[0_0_40px_rgba(0,0,200,0.35)] transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full animate-[shimmer_2.6s_infinite]" />
                  <span className="relative z-10">Ücretsiz Analiz İste</span>
                </Link>

                <Link
                  href="/basari-hikayeleri"
                  className="inline-flex h-14 items-center justify-center rounded-full border border-white/10 bg-white/5 px-10 text-[12px] font-black uppercase tracking-[0.35em] text-white/80 hover:text-white hover:bg-white/10 transition"
                >
                  Başarı Hikayeleri
                </Link>
              </div>

              {/* Güven sinyalleri */}
              <div className="mt-10 flex flex-wrap gap-5 text-sm text-gray-400">
                {[
                  "✓ Reklam hesabı analizi",
                  "✓ Web sitesi dönüşüm analizi",
                  "✓ Büyüme yol haritası",
                ].map((t) => (
                  <span key={t} className="text-white/60">
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                {[
                  { k: "Hesap sahipliği", v: "Daima sizde" },
                  { k: "Raporlama", v: "Şeffaf & ölçülebilir" },
                  { k: "Süreç", v: "Net plan, net çıktı" },
                ].map((it) => (
                  <div
                    key={it.k}
                    className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4"
                  >
                    <div className="text-white/50 uppercase tracking-[0.28em] text-[10px] font-black">
                      {it.k}
                    </div>
                    <div className="mt-2 text-white/80 font-bold">{it.v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sağ: iletişim kartları — orijinal korundu */}
            <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-6 md:p-8 backdrop-blur-xl shadow-2xl">
              <div className="text-[10px] uppercase tracking-[0.35em] text-white/40 font-black">
                Hızlı İletişim Kanalları
              </div>

              <div className="mt-6 space-y-4">
                <a
                  href="mailto:info@premiumdijital.com"
                  className="group block rounded-2xl border border-white/10 bg-black/20 px-6 py-5 hover:border-brand-purple/40 hover:bg-white/[0.06] transition"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-white font-bold">E-Posta</div>
                      <div className="mt-1 text-gray-400">
                        info@premiumdijital.com
                      </div>
                    </div>
                    <div className="text-white/50 group-hover:text-brand-purple transition">
                      ↗
                    </div>
                  </div>
                  <div className="mt-4 text-[11px] text-white/50 uppercase tracking-[0.25em]">
                    Kurumsal talepler için
                  </div>
                </a>

                <a
                  href="https://wa.me/90XXXXXXXXXX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-2xl border border-white/10 bg-black/20 px-6 py-5 hover:border-brand-blue/45 hover:bg-white/[0.06] transition"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-white font-bold">WhatsApp</div>
                      <div className="mt-1 text-gray-400">Hızlı ön görüşme</div>
                    </div>
                    <div className="text-white/50 group-hover:text-brand-blue transition">
                      ↗
                    </div>
                  </div>
                  <div className="mt-4 text-[11px] text-white/50 uppercase tracking-[0.25em]">
                    5 dakikada netleştirelim
                  </div>
                </a>

                <a
                  href="#"
                  className="group block rounded-2xl border border-white/10 bg-black/20 px-6 py-5 hover:border-white/25 hover:bg-white/[0.06] transition"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-white font-bold">Takvim</div>
                      <div className="mt-1 text-gray-400">
                        (Yakında) randevu planla
                      </div>
                    </div>
                    <div className="text-white/50 group-hover:text-white transition">
                      ↗
                    </div>
                  </div>
                  <div className="mt-4 text-[11px] text-white/50 uppercase tracking-[0.25em]">
                    Calendly / Google Calendar
                  </div>
                </a>
              </div>

              <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 px-6 py-5">
                <div className="text-[10px] uppercase tracking-[0.35em] text-white/45 font-black">
                  Not
                </div>
                <p className="mt-3 text-sm text-gray-400 leading-relaxed">
                  Analiz talebiniz sonrası en geç{" "}
                  <b className="text-white">1 iş günü</b> içinde geri dönüş
                  yapılır. Çalışma başlamadan önce hedef, kapsam ve KPI'lar
                  netleştirilir.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROBLEM MIRROR ───────────────────────────────── */}
      <section className="py-24 border-t border-white/5">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-16">
            <div className="inline-block text-[10px] uppercase tracking-[0.4em] text-brand-purple font-black mb-4">
              Tanıdık geliyor mu?
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter">
              Dijitalde en sık
              <br />
              <span className="text-white/30">gördüğümüz problemler</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {problems.map((p, i) => (
              <div
                key={i}
                className="group flex items-start gap-4 rounded-2xl border border-white/8 bg-white/[0.03] px-6 py-5 hover:border-brand-purple/30 hover:bg-white/[0.05] transition"
              >
                <span className="mt-[2px] shrink-0 text-brand-purple text-lg">
                  ✗
                </span>
                <span className="text-gray-300 text-sm leading-relaxed">
                  {p}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-white/40 text-sm uppercase tracking-[0.3em] font-black">
              Bu yüzden her çalışmaya detaylı analiz ile başlıyoruz.
            </p>
            <div className="mt-6 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-brand-purple/40 to-transparent" />
          </div>
        </div>
      </section>

      {/* ── FORM ─────────────────────────────────────────── */}
      <section id="analiz">
        <AnalysisForm
          onSubmitAction={submitAnalysisAction}
          onQuickSubmitAction={submitQuickContactAction}
        />
      </section>

      {/* ── NEXT STEP ────────────────────────────────────── */}
      <section className="py-24 border-t border-white/5">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-16">
            <div className="inline-block text-[10px] uppercase tracking-[0.4em] text-brand-blue font-black mb-4">
              Bundan sonra ne olacak?
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter">
              Süreç Nasıl İlerler?
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s) => (
              <div
                key={s.n}
                className="relative rounded-2xl border border-white/8 bg-white/[0.03] p-6"
              >
                <div className="text-4xl font-black text-white/8 leading-none mb-4">
                  {s.n}
                </div>
                <div className="font-bold text-white mb-2">{s.title}</div>
                <div className="text-sm text-gray-400 leading-relaxed">
                  {s.desc}
                </div>
              </div>
            ))}
          </div>

          {/* Son CTA */}
          <div className="mt-20 rounded-[2.5rem] border border-white/8 bg-gradient-to-b from-white/[0.03] to-transparent p-10 md:p-16 text-center relative overflow-hidden">
            <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-48 w-96 bg-brand-blue/10 blur-[80px] rounded-full" />
            <p className="relative text-[10px] uppercase tracking-[0.4em] text-white/40 font-black mb-4">
              Dijital performansınızı birlikte inceleyelim
            </p>
            <h3 className="relative text-2xl md:text-4xl font-black tracking-tighter mb-8">
              İlk adım ücretsiz,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-purple">
                taahhüt yok.
              </span>
            </h3>
            <Link
              href="#analiz"
              className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-brand-blue px-10 text-[12px] font-black uppercase tracking-[0.35em] text-white shadow-[0_0_40px_rgba(0,0,200,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full animate-[shimmer_2.6s_infinite]" />
              <span className="relative z-10">Ücretsiz Analiz İste</span>
            </Link>
            <div className="mt-6 flex flex-wrap justify-center gap-6 text-[11px] text-white/30 uppercase tracking-[0.25em]">
              <span>24 saat içinde dönüş</span>
              <span>·</span>
              <span>KVKK uyumlu</span>
              <span>·</span>
              <span>Zorunlu satış görüşmesi yok</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
