// app/(marketing)/ucretsiz-analiz/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import AnalysisForm from "@/components/sections/AnalysisForm";
import {
  submitAnalysisAction,
  submitQuickContactAction,
} from "@/app/(marketing)/_actions/analysis";

export const metadata: Metadata = {
  title: "Dijital Performans Analizi | Premium Dijital",
  description:
    "Reklam bütçeniz, web siteniz ve dönüşüm altyapınızı analiz ediyoruz. Başvurunuzu iletin, 1 iş günü içinde stratejik geri dönüş yapalım.",
};

export default function AnalizPage() {
  return (
    <main className="pt-24">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-1/2 h-80 w-[52rem] -translate-x-1/2 rounded-full bg-brand-blue/20 blur-[140px]" />
          <div className="absolute top-40 left-1/4 h-72 w-[42rem] rounded-full bg-brand-purple/15 blur-[140px]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 py-24 text-center">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05]">
            Dijitalde büyümek istiyor
            <br />
            ama nereden başlayacağınızı
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-purple">
              {" "}
              bilmiyor musunuz?
            </span>
          </h1>

          <p className="mt-8 text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
            Ücretsiz analiz isteyin. Web sitenizi, reklam performansınızı ve
            dönüşüm altyapınızı inceleyelim.
            <br />
            <span className="text-white font-semibold">
              24 saat içinde net bir büyüme planı gönderelim.
            </span>
          </p>

          <div className="mt-10">
            <Link
              href="#analiz"
              className="inline-flex h-14 items-center justify-center rounded-full bg-brand-blue px-10 text-sm font-black uppercase tracking-[0.3em] text-white shadow-[0_0_40px_rgba(0,0,200,0.35)] hover:scale-[1.02] transition"
            >
              Ücretsiz Analiz İste
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <div>✓ Reklam hesabı analizi</div>
            <div>✓ Web sitesi dönüşüm analizi</div>
            <div>✓ Büyüme yol haritası</div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            Dijitalde en sık gördüğümüz problemler
          </h2>

          <div className="mt-12 grid md:grid-cols-2 gap-6 text-left text-gray-300">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              Reklam veriliyor ama müşteri gelmiyor
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              Web sitesi var ama dönüşüm yok
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              Ajans rapor gönderiyor ama sonuç yok
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              Reklam bütçesi artıyor ama kâr artmıyor
            </div>
          </div>

          <p className="mt-10 text-gray-400">
            Bu yüzden her çalışmaya detaylı analiz ile başlıyoruz.
          </p>
        </div>
      </section>

      {/* ANALIZ VALUE */}
      <section className="py-24 bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-3xl md:text-4xl font-bold">
            Ücretsiz Analizde Neleri İnceliyoruz?
          </h2>

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="rounded-2xl border border-white/10 p-8">
              <h3 className="font-bold text-lg">Reklam Performansı</h3>
              <ul className="mt-4 space-y-2 text-gray-400 text-sm">
                <li>Google Ads kampanya yapısı</li>
                <li>Anahtar kelime performansı</li>
                <li>CPC / CPA analizi</li>
                <li>Bütçe dağılımı</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 p-8">
              <h3 className="font-bold text-lg">Web Sitesi</h3>
              <ul className="mt-4 space-y-2 text-gray-400 text-sm">
                <li>Landing page dönüşüm yapısı</li>
                <li>UX problemleri</li>
                <li>Mobil performans</li>
                <li>Site hızı</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 p-8">
              <h3 className="font-bold text-lg">Dönüşüm Altyapısı</h3>
              <ul className="mt-4 space-y-2 text-gray-400 text-sm">
                <li>GA4 & conversion tracking</li>
                <li>Form / telefon dönüşümleri</li>
                <li>WhatsApp lead takibi</li>
                <li>Müşteri yolculuğu analizi</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FORM */}
      <section id="analiz" className="py-24">
        <AnalysisForm
          onSubmitAction={submitAnalysisAction}
          onQuickSubmitAction={submitQuickContactAction}
        />
      </section>

      {/* SÜREÇ */}
      <section className="py-24 bg-white/[0.02]">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            Süreç Nasıl İlerler?
          </h2>

          <div className="mt-16 grid md:grid-cols-4 gap-8 text-sm text-gray-400">
            <div>
              <div className="text-3xl font-bold text-white">1</div>
              Analiz talebinizi inceleriz
            </div>

            <div>
              <div className="text-3xl font-bold text-white">2</div>
              Dijital varlıklarınızı analiz ederiz
            </div>

            <div>
              <div className="text-3xl font-bold text-white">3</div>
              Size stratejik geri dönüş göndeririz
            </div>

            <div>
              <div className="text-3xl font-bold text-white">4</div>
              Uygun ise görüşme planlarız
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-center text-3xl md:text-4xl font-bold">
            Sık Sorulan Sorular
          </h2>

          <div className="mt-12 space-y-6 text-gray-400">
            <div>
              <div className="font-semibold text-white">
                Ön analiz ne kadar sürer?
              </div>
              Başvurunuzu aldıktan sonra en geç 1 iş günü içinde geri dönüş
              yapılır.
            </div>

            <div>
              <div className="font-semibold text-white">
                Çalışma zorunluluğu var mı?
              </div>
              Hayır. Ön analiz sonrası karar tamamen size aittir. Herhangi bir
              taahhüt gerektirmez.
            </div>

            <div>
              <div className="font-semibold text-white">
                Hangi bilgileri paylaşmam gerekiyor?
              </div>
              Yalnızca başvuru formundaki bilgiler yeterlidir. Reklam hesabı
              veya analitik erişimi ihtiyaç halinde ayrıca talep edilir.
            </div>

            <div>
              <div className="font-semibold text-white">
                Her başvuru değerlendiriliyor mu?
              </div>
              Başvurular incelenerek uygun görülen projeler için süreç
              başlatılır.
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
