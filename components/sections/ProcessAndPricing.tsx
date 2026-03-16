"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Rocket,
  Shield,
  Cpu,
  BarChart3,
  Clock,
  Zap,
} from "lucide-react";
import Link from "next/link";

interface Props {
  activeProfile: "new" | "fix" | "grow";
  activeTier: "agile" | "custom";
}

export default function ProcessAndPricing({
  activeProfile,
  activeTier,
}: Props) {
  const isCustom = activeTier === "custom";

  return (
    <section className="bg-[#050507] py-32 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* 1. BÖLÜM: YOL HARİTASI (Dinamik Süreç) */}
        <div className="mb-24">
          <div className="mb-16">
            <p className="text-brand-purple text-[10px] font-black uppercase tracking-[0.4em] mb-4">
              Sistem Devreye Alma
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter uppercase italic">
              Operasyonel <span className="text-white/20">Süreç.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {getSteps(activeProfile).map((step, i) => (
              <div key={i} className="relative group">
                <div className="mb-6 flex items-center gap-4">
                  <span className="text-4xl font-black text-white/5 group-hover:text-brand-purple/20 transition-colors">
                    0{i + 1}
                  </span>
                  <div className="h-px flex-1 bg-white/10 group-hover:bg-brand-purple/30 transition-all" />
                </div>
                <h4 className="text-[15px] font-bold text-white mb-2 uppercase tracking-tighter italic">
                  {step.title}
                </h4>
                <p className="text-[13px] text-white/40 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 2. BÖLÜM: YATIRIM MODELLEMESİ (Fiyatlandırma & Özellikler) */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Sol: Teknik Özellikler ve Değer Önerisi */}
          <div className="lg:col-span-7 p-10 md:p-12 rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent flex flex-col justify-between">
            <div>
              <div className="inline-block px-4 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-black text-brand-purple uppercase tracking-widest mb-8">
                {isCustom
                  ? "Next.js / Mühendislik Odaklı"
                  : "WordPress / Çevik Başlangıç"}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 uppercase italic tracking-tighter">
                Sistem <span className="text-white/20">Kapasitesi.</span>
              </h3>

              <div className="grid sm:grid-cols-2 gap-y-6 gap-x-12 mb-12">
                {getFeatures(activeTier).map((f, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check
                      size={16}
                      className="text-brand-purple mt-0.5 shrink-0"
                    />
                    <div>
                      <p className="text-sm font-bold text-white/90">
                        {f.title}
                      </p>
                      <p className="text-xs text-white/40 mt-1">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-sm text-white/30 italic leading-relaxed max-w-xl">
              * Bu modelleme, seçtiğiniz stratejiye göre optimize edilmiştir.
              Projenin kesin kapsamı teknik keşif seansından sonra mühürlenir.
            </p>
          </div>

          {/* Sağ: Yatırım Özeti Kartı */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="p-10 rounded-[2.5rem] border border-white/10 bg-white/[0.02] flex-1 flex flex-col justify-center">
              <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-4">
                Tahmini Yatırım Skalası
              </p>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-6xl font-black text-white tracking-tighter italic">
                  {isCustom ? "5.000€" : "1.500€"}
                </span>
                <span className="text-2xl font-bold text-white/20">+</span>
              </div>
              <p className="text-sm text-white/50 font-medium mb-10">
                Proje Bazlı Başlangıç Bütçesi
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
                  <Clock size={18} className="text-brand-purple mb-3" />
                  <p className="text-[10px] font-bold text-white/30 uppercase">
                    Süre
                  </p>
                  <p className="text-sm font-bold text-white">
                    {isCustom ? "8-12 Hafta" : "2-4 Hafta"}
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
                  <Shield size={18} className="text-brand-blue mb-3" />
                  <p className="text-[10px] font-bold text-white/30 uppercase">
                    Destek
                  </p>
                  <p className="text-sm font-bold text-white">12 Ay Teknik</p>
                </div>
              </div>
            </div>

            <Link
              href="/iletisim#teklif"
              className="group relative flex items-center justify-between overflow-hidden rounded-2xl p-7 text-xs font-black uppercase tracking-[0.2em] text-white transition-all hover:scale-[1.02]"
              style={{
                background: "linear-gradient(90deg, #be29ec, #0000c8)",
                boxShadow: "0 0 40px rgba(190,41,236,0.3)",
              }}
            >
              <span className="relative z-10">Özel Teklif Analizi Alın →</span>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   YARDIMCI VERİ FONKSİYONLARI
───────────────────────────────────────────── */

function getSteps(profile: string) {
  if (profile === "new")
    return [
      {
        title: "Stratejik Keşif",
        desc: "Pazar ve rakip verileriyle markanızın dijital temellerini kurguluyoruz.",
      },
      {
        title: "Sistem Tasarımı",
        desc: "Kullanıcı deneyimini (UX) ve dönüşüm kanallarını matematiksel olarak çiziyoruz.",
      },
      {
        title: "Üretim Fazı",
        desc: "Tasarımı en güncel kod standartları ve SEO DNA'sı ile hayata geçiriyoruz.",
      },
      {
        title: "Lansman & Veri",
        desc: "Ölçümleme araçlarını bağlayarak sistemi canlıya alıyor ve izlemeye başlıyoruz.",
      },
    ];
  if (profile === "fix")
    return [
      {
        title: "Teknik Teşhis",
        desc: "Mevcut sistemdeki veri sızıntılarını ve performans engellerini tespit ediyoruz.",
      },
      {
        title: "Restorasyon",
        desc: "Hız ve UX sorunlarını gidererek altyapıyı modern standartlara taşıyoruz.",
      },
      {
        title: "Dönüşüm Ayarı",
        desc: "Dönüşüm hunisindeki kaçakları veri odaklı A/B testleriyle onarıyoruz.",
      },
      {
        title: "Performans İzleme",
        desc: "İyileştirmelerin etkisini anlık izleyerek büyüme döngüsünü süreklileştiriyoruz.",
      },
    ];
  return [
    {
      title: "Otorite Analizi",
      desc: "Rakiplerin teknik açıklarını ve sektördeki boşlukları veriyle belirliyoruz.",
    },
    {
      title: "Liderlik İnşası",
      desc: "Teknik SEO ve ileri düzey UX ile markanızı pazarın en tepesine taşıyoruz.",
    },
    {
      title: "Ölçekleme",
      desc: "Trafiği ve satışları artıracak teknolojik araçları sisteme entegre ediyoruz.",
    },
    {
      title: "Sürekli Optimizasyon",
      desc: "Zirvede kalmak için sistemi güncel trendler ve verilerle güncelliyoruz.",
    },
  ];
}

function getFeatures(tier: string) {
  if (tier === "custom")
    return [
      {
        title: "Next.js Mimarisi",
        desc: "Tam bağımsız ve milisaniyelik sayfa hızı.",
      },
      {
        icon: <BarChart3 />,
        title: "Teknik SEO Domine",
        desc: "Kod düzeyinde semantik veri yapılandırması.",
      },
      {
        icon: <Zap />,
        title: "Sınırsız Ölçekleme",
        desc: "Yoğun trafikte asla yavaşlamayan altyapı.",
      },
      {
        icon: <Shield />,
        title: "Enterprise Güvenlik",
        desc: "Markanıza özel bağımsız sunucu mimarisi.",
      },
    ];
  return [
    {
      title: "Yönetilebilir CMS",
      desc: "WordPress tabanlı, kolay içerik yönetimi.",
    },
    {
      title: "Hızlı Pazar Girişi",
      desc: "2-4 hafta içinde yayına hazır sistem.",
    },
    {
      title: "SEO Uyumlu Tema",
      desc: "Modern ve mobil öncelikli hazır altyapı.",
    },
    {
      title: "Ekonomik Bakım",
      desc: "Düşük maliyetli sunucu ve destek süreçleri.",
    },
  ];
}
