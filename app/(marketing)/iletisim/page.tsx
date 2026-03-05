// app/(marketing)/iletisim/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import AnalysisForm from "@/components/sections/AnalysisForm";

export const metadata: Metadata = {
  title: "İletişim | Premium Dijital",
  description:
    "Premium Dijital ile iletişime geçin. Ücretsiz analiz talebi bırakın; 24 saat içinde stratejik geri dönüş.",
};

export default function ContactPage() {
  return (
    <main className="pt-24">
      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* Ambient glows */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-1/2 h-80 w-[52rem] -translate-x-1/2 rounded-full bg-brand-blue/20 blur-[140px]" />
          <div className="absolute top-40 left-1/4 h-72 w-[42rem] rounded-full bg-brand-purple/15 blur-[140px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="grid gap-10 md:grid-cols-[1.05fr_.95fr] md:items-start">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.35em] text-white/60">
                24 Saat İçinde Dönüş • KVKK Uyumlu
              </div>

              <h1 className="mt-6 text-5xl md:text-7xl font-black tracking-tighter leading-[1.0]">
                İletişime Geçin,
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-purple">
                  Stratejiyi Başlatalım.
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-gray-400 text-lg md:text-xl leading-relaxed">
                Kurumsal görünüm, güçlü pazarlama ve ölçülebilir sonuçlar.
                İhtiyacınızı netleştirip en doğru rotayı birlikte çıkaralım.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link
                  href="#analiz"
                  className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-brand-blue px-10 text-[12px] font-black uppercase tracking-[0.35em] text-white shadow-[0_0_40px_rgba(0,0,200,0.35)] transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full animate-[shimmer_2.6s_infinite]" />
                  <span className="relative z-10">Ücretsiz Analiz Talebi</span>
                </Link>

                <Link
                  href="/vaka-calismalari"
                  className="inline-flex h-14 items-center justify-center rounded-full border border-white/10 bg-white/5 px-10 text-[12px] font-black uppercase tracking-[0.35em] text-white/80 hover:text-white hover:bg-white/10 transition"
                >
                  Vaka Çalışmaları
                </Link>
              </div>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
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

            {/* Right: Contact cards */}
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
                  Analiz talebiniz sonrası en geç <b>24 saat</b> içinde geri
                  dönüş yapılır. Çalışma başlamadan önce hedef, kapsam ve
                  KPI’lar netleştirilir.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ANALYSIS FORM (reuse) */}
      <AnalysisForm />
    </main>
  );
}
