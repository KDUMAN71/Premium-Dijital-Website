"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useInView,
} from "framer-motion";
import {
  Blocks,
  ArrowRight,
  AlertCircle,
  TrendingUp,
  Zap,
  ShieldCheck,
  MousePointer2,
  BarChart3,
  Search,
  Cpu,
  Globe,
  Target,
  Check,
} from "lucide-react";

const AUTO_INTERVAL = 6000;

/* ─────────────────────────────────────────────
   Tier verileri
───────────────────────────────────────────── */
const TIERS = [
  {
    id: "agile" as const,
    label: "Çevik Başlangıç",
    tech: "WordPress / Webflow",
    desc: "Hızlı, ekonomik ve yönetimi kolay çözümler.",
  },
  {
    id: "custom" as const,
    label: "Mühendislik Harikası",
    tech: "Next.js / Custom Code",
    desc: "Tam bağımsız, ölçeklenebilir, yüksek performanslı özel sistemler.",
  },
];

/* ─────────────────────────────────────────────
   Profil verileri
───────────────────────────────────────────── */
const PROFILES = [
  {
    id: "new" as const,
    icon: <Blocks size={18} />,
    label: "Sıfırdan Web Sitesi İstiyorum",
    accentColor: "#be29ec",
    tiers: {
      agile: {
        description:
          "Dijital varlığınızı kanıtlanmış platformlar üzerinde hızla hayata geçiriyoruz. 2–3 haftada yayında, kolayca yönetilebilir yapı.",
        services: [
          {
            icon: <Globe size={18} />,
            title: "Hızlı Kurulum",
            desc: "Sektörel standartlara uygun, 2–3 haftada yayına hazır altyapı.",
          },
          {
            icon: <Zap size={18} />,
            title: "Kolay Yönetim",
            desc: "Kod bilgisi gerektirmeyen, panel üzerinden tam içerik kontrolü.",
          },
          {
            icon: <Search size={18} />,
            title: "Standart SEO",
            desc: "Arama motorları için gerekli tüm temel optimizasyonlar.",
          },
          {
            icon: <ShieldCheck size={18} />,
            title: "Bulut Güvenlik",
            desc: "Otomatik yedekleme ve SSL güvenlik katmanları.",
          },
        ],
        cta: "Hızlı Başlayalım",
      },
      custom: {
        description:
          "Dijital varlığınızı sarsılmaz bir temel üzerine inşa ediyoruz. İlk adımdan itibaren her pikseli büyümeye odaklı kurguluyoruz.",
        services: [
          {
            icon: <Cpu size={18} />,
            title: "Next.js Mimarisi",
            desc: "Dünyanın en hızlı web teknolojisiyle milisaniyelik sayfa açılışları.",
          },
          {
            icon: <Target size={18} />,
            title: "Stratejik UX",
            desc: "Hazır şablon değil, iş modelinize özel dönüşüm odaklı tasarım.",
          },
          {
            icon: <Search size={18} />,
            title: "Teknik SEO Mühendisliği",
            desc: "Kod düzeyinde semantik veri yapılandırması.",
          },
          {
            icon: <BarChart3 size={18} />,
            title: "İleri Ölçümleme",
            desc: "GA4 ve GTM ile her kullanıcı hareketini anlamlandıran veri seti.",
          },
        ],
        cta: "Proje Mimarisi Oluşturalım",
      },
    },
  },
  {
    id: "fix" as const,
    icon: <AlertCircle size={18} />,
    label: "Web Sitem Var, Upgrade İstiyorum",
    accentColor: "#f97316",
    tiers: {
      agile: {
        description:
          "Mevcut trafiğinizi kazanca dönüştürme zamanı. Tema, hız ve içerik revizyonuyla sitenizi modern standartlara taşıyoruz.",
        services: [
          {
            icon: <Zap size={18} />,
            title: "Tema & Hız Revizyonu",
            desc: "Eski yapınızı modern arayüz ve hız iyileştirmeleriyle güncelliyoruz.",
          },
          {
            icon: <MousePointer2 size={18} />,
            title: "İçerik Modernizasyonu",
            desc: "Mevcut sayfalarınızı daha profesyonel ve ikna edici hale getiriyoruz.",
          },
          {
            icon: <Search size={18} />,
            title: "SEO Onarımı",
            desc: "Hatalı linkleri gidererek sıralama kaybını durduruyoruz.",
          },
          {
            icon: <ShieldCheck size={18} />,
            title: "Güvenlik Yamaları",
            desc: "Güncelliğini yitirmiş yapıları temizleyip güvene alıyoruz.",
          },
        ],
        cta: "Modernizasyon Başlat",
      },
      custom: {
        description:
          "Sitenizdeki teknik engelleri veriyle tespit edip performans motoruna dönüştürüyoruz. CRO odaklı, mühendislik dokunuşu.",
        services: [
          {
            icon: <Cpu size={18} />,
            title: "Platform Değişimi",
            desc: "Eski yapınızı Next.js altyapısına taşıyarak teknik borçtan kurtarıyoruz.",
          },
          {
            icon: <BarChart3 size={18} />,
            title: "CRO Denetimi",
            desc: "Trafik neden satışa dönmüyor? Isı haritaları ve veriyle tespit ediyoruz.",
          },
          {
            icon: <Target size={18} />,
            title: "Dönüşüm Optimizasyonu",
            desc: "Satış hunisindeki sızıntıları mühendislik dokunuşuyla gideriyoruz.",
          },
          {
            icon: <Zap size={18} />,
            title: "Core Web Vitals",
            desc: "Google'ın en yeni hız standartlarına uyumlu teknik restorasyon.",
          },
        ],
        cta: "Sistemi Yeniden İnşa Et",
      },
    },
  },
  {
    id: "grow" as const,
    icon: <TrendingUp size={18} />,
    label: "Rakiplerimden Ayrışmak İstiyorum",
    accentColor: "#0000c8",
    tiers: {
      agile: {
        description:
          "Rakiplerinizin kapsamadığı fırsatları görünürlük ve içerik otoritesiyle değere dönüştürüyoruz.",
        services: [
          {
            icon: <Search size={18} />,
            title: "İçerik Otoritesi",
            desc: "Rakiplerin kapsamadığı anahtar kelimelerle görünürlük artışı.",
          },
          {
            icon: <Target size={18} />,
            title: "Arayüz Güncellemesi",
            desc: "Sektör standartlarının üzerinde modern ve kurumsal imaj.",
          },
          {
            icon: <BarChart3 size={18} />,
            title: "Rekabet Takibi",
            desc: "Rakiplerin performansını izleyen analitik kurgu.",
          },
          {
            icon: <Zap size={18} />,
            title: "Mobil Performans",
            desc: "Mobil ziyaretçiler için kusursuzlaştırılmış kullanıcı deneyimi.",
          },
        ],
        cta: "Görünürlüğü Artır",
      },
      custom: {
        description:
          "Liderlik bir tercih değil, doğru teknolojinin sonucudur. Rakiplerinizin teknik açıklarını veriyle fırsata çeviriyoruz.",
        services: [
          {
            icon: <Cpu size={18} />,
            title: "Özel Yazılım Çözümleri",
            desc: "Sadece sizin markanıza özel interaktif özellikler.",
          },
          {
            icon: <Search size={18} />,
            title: "Teknik Otorite İnşası",
            desc: "Semantik SEO ve yüksek hızla Google'da sarsılmaz liderlik.",
          },
          {
            icon: <BarChart3 size={18} />,
            title: "Öngörülü Analiz",
            desc: "Veri madenciliği ile kullanıcı eğilimlerini rakiplerden önce okuyun.",
          },
          {
            icon: <Zap size={18} />,
            title: "Sektörel Benchmark",
            desc: "Hız ve UX skorlarında sektör ortalamasının üzerine çıkış.",
          },
        ],
        cta: "Sektör Liderliği Stratejisi Al",
      },
    },
  },
] as const;

type ProfileId = (typeof PROFILES)[number]["id"];
type TierId = (typeof TIERS)[number]["id"];

/* ─────────────────────────────────────────────
   SEO JSON-LD — tüm servisler schema'ya girer
───────────────────────────────────────────── */
function ServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Web Sitesi, SEO ve Dönüşüm Altyapısı",
    provider: { "@type": "Organization", name: "Premium Dijital" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Web Sitesi Hizmet Paketleri",
      itemListElement: [
        ...PROFILES.flatMap((p) =>
          TIERS.map((t) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: `${p.label} — ${t.label}`,
              description: p.tiers[t.id].description,
            },
          })),
        ),
      ],
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ─────────────────────────────────────────────
   Ana bileşen
───────────────────────────────────────────── */
export default function ServiceProfileSelector() {
  const [activeProfile, setActiveProfile] = useState<ProfileId>("new");
  const [activeTier, setActiveTier] = useState<TierId>("custom");
  const [isPaused, setIsPaused] = useState(false);
  const prefersReduced = useReducedMotion();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  /* Sadece ekranda görününce auto-play çalışır */
  const isVisible = useInView(sectionRef, { amount: 0.3 });

  const profile = PROFILES.find((p) => p.id === activeProfile)!;
  const tierData = profile.tiers[activeTier];

  /* Auto-play — visible + paused kontrolü */
  const startCycle = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (prefersReduced) return;
    intervalRef.current = setInterval(() => {
      setActiveProfile((current) => {
        const idx = PROFILES.findIndex((p) => p.id === current);
        return PROFILES[(idx + 1) % PROFILES.length].id;
      });
    }, AUTO_INTERVAL);
  }, [prefersReduced]);

  useEffect(() => {
    if (isVisible && !isPaused) startCycle();
    else if (intervalRef.current) clearInterval(intervalRef.current);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isVisible, isPaused, startCycle]);

  return (
    <section
      ref={sectionRef}
      id="kapsam"
      className="relative overflow-hidden bg-[#050507] px-4 py-24 sm:px-5 md:px-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      itemScope
      itemType="https://schema.org/Service"
    >
      <ServiceSchema />

      {/* "SİZ" arka plan */}
      <div
        className="pointer-events-none absolute inset-x-0 top-8 select-none overflow-hidden text-center"
        aria-hidden="true"
      >
        <span className="text-[22vw] font-black uppercase leading-none tracking-tighter text-white/[0.025]">
          SİZ
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Başlık */}
        <div className="mb-14 text-center">
          <p className="mb-4 text-[11px] font-black uppercase tracking-[0.4em] text-brand-purple">
            Hizmet Kapsamı
          </p>
          <h2
            className="text-5xl font-black uppercase italic leading-none tracking-tighter text-white md:text-6xl lg:text-7xl"
            itemProp="name"
          >
            Hangi <span className="text-white/20">Durumdasınız?</span>
          </h2>
        </div>

        {/* 1. Katman: Profil seçimi */}
        <div className="mb-6 flex flex-wrap justify-center gap-3">
          {PROFILES.map((p) => {
            const isActive = activeProfile === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setActiveProfile(p.id)}
                aria-pressed={isActive}
                className="flex cursor-pointer items-center gap-3 rounded-2xl border px-5 py-3.5 transition-all duration-300 hover:brightness-110"
                style={
                  isActive
                    ? {
                        borderColor: `${p.accentColor}50`,
                        background: `${p.accentColor}12`,
                        color: "white",
                        boxShadow: `0 0 30px ${p.accentColor}15`,
                      }
                    : {
                        borderColor: "rgba(255,255,255,0.08)",
                        background: "transparent",
                        color: "rgba(255,255,255,0.45)",
                      }
                }
              >
                {/* Radio göstergesi */}
                <span
                  className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200"
                  style={
                    isActive
                      ? {
                          borderColor: p.accentColor,
                          background: p.accentColor,
                        }
                      : { borderColor: "rgba(255,255,255,0.25)" }
                  }
                >
                  {isActive && (
                    <Check size={9} className="text-white" strokeWidth={3} />
                  )}
                </span>
                <span style={{ color: isActive ? p.accentColor : "inherit" }}>
                  {p.icon}
                </span>
                <span className="text-[12px] font-black uppercase tracking-widest">
                  {p.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* 2. Katman: Tier toggle */}
        <div className="mb-14 flex justify-center">
          <div className="flex gap-1 rounded-2xl border border-white/10 bg-white/5 p-1.5">
            {TIERS.map((t) => {
              const isActive = activeTier === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActiveTier(t.id)}
                  aria-pressed={isActive}
                  className="cursor-pointer rounded-xl px-6 py-2.5 text-[11px] font-black uppercase tracking-widest transition-all duration-200"
                  style={
                    isActive
                      ? {
                          background: "white",
                          color: "black",
                          boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
                        }
                      : { color: "rgba(255,255,255,0.35)" }
                  }
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Ana panel */}
        <div className="grid items-stretch gap-8 lg:grid-cols-12">
          {/* Sol — 5/12 */}
          <div className="flex flex-col gap-5 lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeProfile}-${activeTier}`}
                initial={{ opacity: 0, x: prefersReduced ? 0 : -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: prefersReduced ? 0 : 16 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col justify-center rounded-[2rem] border border-white/6 bg-gradient-to-br from-white/[0.04] to-transparent p-8"
              >
                <div className="mb-6">
                  <p className="mb-1 text-[10px] font-black uppercase tracking-[0.28em] text-white/30">
                    Seçilen Altyapı
                  </p>
                  <p className="text-[14px] font-bold text-white/75">
                    {TIERS.find((t) => t.id === activeTier)?.tech}
                  </p>
                </div>

                <p
                  className="text-[18px] font-medium italic leading-relaxed text-white/90 md:text-[20px]"
                  itemProp="description"
                >
                  "{tierData.description}"
                </p>
              </motion.div>
            </AnimatePresence>

            {/* CTA */}
            <Link
              href="/iletisim#analiz"
              className="group relative flex cursor-pointer items-center justify-between overflow-hidden rounded-2xl px-6 py-5 text-[12px] font-black uppercase tracking-[0.18em] text-white transition-all hover:scale-[1.02]"
              style={{
                background: "linear-gradient(90deg,#be29ec,#0000c8)",
                boxShadow: "0 0 30px rgba(190,41,236,0.3)",
              }}
            >
              <span className="absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative z-10">{tierData.cta} →</span>
              <ArrowRight
                size={16}
                className="relative z-10 transition-transform group-hover:translate-x-1"
              />
            </Link>

            {/* Trust notu */}
            <p className="text-center text-[11px] text-white/25">
              Ücretsiz ilk görüşme · Teklif bağlayıcı değildir
            </p>
          </div>

          {/* Sağ — 7/12 */}
          <div className="lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-2">
              <AnimatePresence mode="wait">
                {tierData.services.map((s, i) => (
                  <motion.div
                    key={`${activeProfile}-${activeTier}-${s.title}`}
                    initial={{ opacity: 0, y: prefersReduced ? 0 : 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.28 }}
                    className="group rounded-[1.5rem] border border-white/6 bg-white/[0.03] p-5 transition-all hover:border-white/15 hover:bg-white/[0.06]"
                  >
                    <div className="mb-3 flex items-center gap-3">
                      <div
                        className="rounded-xl p-2.5 transition-all group-hover:scale-110"
                        style={{
                          background: "rgba(255,255,255,0.06)",
                          color: profile.accentColor,
                        }}
                      >
                        {s.icon}
                      </div>
                      <h4 className="text-[15px] font-bold text-white">
                        {s.title}
                      </h4>
                    </div>
                    <p className="text-[13px] leading-relaxed text-white/50 transition-colors group-hover:text-white/75">
                      {s.desc}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
