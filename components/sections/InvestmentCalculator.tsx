"use client";

import { useState, useMemo, useRef } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useInView,
} from "framer-motion";
import {
  Globe,
  Cpu,
  Layout,
  PenTool,
  FileText,
  ShoppingCart,
  Check,
  Users,
  ArrowRight,
  AlertTriangle,
  Info,
  ChevronRight,
} from "lucide-react";

/* ─────────────────────────────────────────────
   Seçenek tipleri
───────────────────────────────────────────── */
interface Option {
  id: string;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  desc: string;
  delta: number; // Bu seçeneğin baz fiyata etkisi (TL)
}

interface SelectorGroupProps {
  label: string;
  step: string;
  options: Option[];
  active: string;
  onChange: (id: string) => void;
  inView: boolean;
  delay: number;
}

/* ─────────────────────────────────────────────
   Fiyat algoritması
   Baz: ₺18.000 — WP + Şablon + Müşteri içeriği
   Piyasa: kurumsal 35K–150K, e-ticaret 75K–250K TL
   Premium Dijital konumu: orta-üst segment
   ─────────────────────────────────────────────
   Kurumsal / Kişisel    → +8K    (baz ₺26K)
   E-ticaret WP          → +15K   (baz ₺41K)
   E-ticaret Next.js     → +35K   (baz ₺61K+)
   Mühendislik Sistemi   → +47K   (baz ₺65K)
   High-End Özel         → +25K
   Ajans içeriği         → +20K
   Maksimum              → ₺138K
───────────────────────────────────────────── */
const BASE_PRICE = 18_000; // WP + Şablon + Kişisel + Müşteri içeriği

/* Proje tipi — e-ticaret delta platforma göre değişiyor */
type ProjectType = "corporate" | "ecommerce";

const TYPE_OPTIONS: (Option & { id: ProjectType })[] = [
  {
    id: "corporate",
    label: "Kurumsal / Kişisel",
    sublabel: "Tanıtım & güven odaklı",
    icon: <FileText size={18} />,
    desc: "Şirket, klinik, portföy veya kişisel marka sitesi. Kurumsal kimlik ve lead generation.",
    delta: 8_000,
  },
  {
    id: "ecommerce",
    label: "E-Ticaret",
    sublabel: "Satış & dönüşüm odaklı",
    icon: <ShoppingCart size={18} />,
    desc: "Ödeme altyapısı, sepet, stok yönetimi, satış hunisi.",
    delta: 0, // platforma göre hesaplanacak — aşağıda özel mantık
  },
];

const SELECTORS = [
  {
    key: "platform",
    label: "Teknoloji Altyapısı",
    step: "01",
    cols: 2,
    options: [
      {
        id: "wp",
        label: "Hızlı Başlangıç",
        sublabel: "WordPress / Webflow · Hazır şablon",
        icon: <Globe size={18} />,
        desc: "Kanıtlanmış platformlar üzerinde hızlı teslim. Hazır şablon kullanılır, markanıza özelleştirilir.",
        delta: 0,
      },
      {
        id: "next",
        label: "Mühendislik Sistemi",
        sublabel: "Next.js / Headless · Özel kod",
        icon: <Cpu size={18} />,
        desc: "Milisaniyelik hız, tam bağımsızlık, sınırsız ölçekleme. Sıfırdan yazılır.",
        delta: 47_000,
      },
    ] as Option[],
  },
  {
    key: "design",
    label: "Tasarım Disiplini",
    step: "02",
    cols: 2,
    options: [
      {
        id: "template",
        label: "Modern Şablon",
        sublabel: "Seçilmiş hazır yapı",
        icon: <Layout size={18} />,
        desc: "Kaliteli baz şablon üzerine markanıza özel özelleştirme.",
        delta: 0,
      },
      {
        id: "custom",
        label: "High-End Özel",
        sublabel: "Sıfırdan özgün tasarım",
        icon: <PenTool size={18} />,
        desc: "Her piksel markanız için. Rakibinizde göremeyeceğiniz özgünlük.",
        delta: 25_000,
      },
    ] as Option[],
  },
  {
    key: "content",
    label: "İçerik & Medya",
    step: "04",
    cols: 2,
    options: [
      {
        id: "client",
        label: "Siz Sağlayın",
        sublabel: "Metin & görseller hazır",
        icon: <Check size={18} />,
        desc: "İçerik ve görseller tarafınızdan temin edilir.",
        delta: 0,
      },
      {
        id: "agency",
        label: "Biz Hazırlayalım",
        sublabel: "Profesyonel içerik üretimi",
        icon: <Users size={18} />,
        desc: "SEO uyumlu metin yazarlığı ve görsel prodüksiyon.",
        delta: 20_000,
      },
    ] as Option[],
  },
] as const;

type SelectorKey = (typeof SELECTORS)[number]["key"];
type Config = Record<SelectorKey, string> & { type: ProjectType };

/* ─────────────────────────────────────────────
   Alt bileşen: Seçim grubu
───────────────────────────────────────────── */
function SelectorGroup({
  label,
  step,
  options,
  active,
  onChange,
  inView,
  delay,
}: SelectorGroupProps) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mb-3 flex items-center gap-2">
        <span
          className="flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-black text-white/40"
          style={{ background: "rgba(255,255,255,0.06)" }}
        >
          {step}
        </span>
        <p className="text-[11px] font-black uppercase tracking-[0.22em] text-white/40">
          {label}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {options.map((opt) => {
          const isActive = active === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChange(opt.id)}
              aria-pressed={isActive}
              className="cursor-pointer flex flex-col items-start gap-2 rounded-2xl border p-5 text-left transition-all duration-250 hover:brightness-110"
              style={
                isActive
                  ? {
                      borderColor: "rgba(190,41,236,0.40)",
                      background: "rgba(190,41,236,0.08)",
                      color: "white",
                    }
                  : {
                      borderColor: "rgba(255,255,255,0.07)",
                      background: "rgba(255,255,255,0.02)",
                      color: "rgba(255,255,255,0.45)",
                    }
              }
            >
              <div className="flex items-center gap-2.5">
                {/* Radio göstergesi */}
                <span
                  className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200"
                  style={
                    isActive
                      ? { borderColor: "#be29ec", background: "#be29ec" }
                      : { borderColor: "rgba(255,255,255,0.22)" }
                  }
                >
                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  )}
                </span>
                <span
                  style={{
                    color: isActive ? "#be29ec" : "rgba(255,255,255,0.30)",
                  }}
                >
                  {opt.icon}
                </span>
                <div>
                  <p className="text-[13px] font-bold leading-tight">
                    {opt.label}
                  </p>
                  <p className="text-[10px] opacity-50">{opt.sublabel}</p>
                </div>
                {/* Fiyat farkı etiketi */}
                {opt.delta > 0 && (
                  <span
                    className="ml-auto shrink-0 rounded-full border px-2 py-0.5 text-[9px] font-bold"
                    style={
                      isActive
                        ? {
                            borderColor: "rgba(190,41,236,0.35)",
                            color: "#be29ec",
                            background: "rgba(190,41,236,0.1)",
                          }
                        : {
                            borderColor: "rgba(255,255,255,0.08)",
                            color: "rgba(255,255,255,0.25)",
                          }
                    }
                  >
                    +{(opt.delta / 1000).toFixed(0)}K
                  </span>
                )}
              </div>
              <p className="pl-[26px] text-[11px] leading-relaxed opacity-55">
                {opt.desc}
              </p>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Alt bileşen: Fiyat satırı
───────────────────────────────────────────── */
function PriceRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-white/6 pb-2.5">
      <span className="text-[11px] font-bold uppercase tracking-wider text-white/30">
        {label}
      </span>
      <span className="text-[13px] font-bold italic text-white/75">
        {value}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Ana bileşen
───────────────────────────────────────────── */
export default function InvestmentCalculator() {
  const [config, setConfig] = useState<Config>({
    platform: "wp",
    design: "template",
    type: "corporate",
    content: "client",
  });

  const prefersReduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.1 });

  /* Fiyat hesaplama — e-ticaret deltası platforma göre değişir */
  const { total, breakdown } = useMemo(() => {
    let t = BASE_PRICE;
    const b: { label: string; amount: number }[] = [
      { label: "Baz (5–10 sayfa)", amount: BASE_PRICE },
    ];

    // Platform delta
    const platformOpt = SELECTORS[0].options.find(
      (o) => o.id === config.platform,
    );
    if (platformOpt && platformOpt.delta > 0) {
      b.push({ label: platformOpt.label, amount: platformOpt.delta });
      t += platformOpt.delta;
    }

    // Proje tipi delta
    const typeOpt = TYPE_OPTIONS.find((o) => o.id === config.type);
    if (typeOpt) {
      if (config.type === "ecommerce") {
        const eDelta = config.platform === "next" ? 35_000 : 15_000;
        b.push({ label: "E-Ticaret altyapısı", amount: eDelta });
        t += eDelta;
      } else if (typeOpt.delta > 0) {
        b.push({ label: typeOpt.label, amount: typeOpt.delta });
        t += typeOpt.delta;
      }
    }

    // Design + content delta
    [SELECTORS[1], SELECTORS[2]].forEach((s) => {
      const opt = s.options.find((o) => o.id === config[s.key as SelectorKey]);
      if (opt && opt.delta > 0) {
        b.push({ label: opt.label, amount: opt.delta });
        t += opt.delta;
      }
    });

    return { total: t, breakdown: b };
  }, [config]);

  /* Teslimat süresi */
  const deliveryWeeks =
    config.platform === "next"
      ? config.type === "ecommerce"
        ? "10–16 hafta"
        : "5–10 hafta"
      : config.type === "ecommerce"
        ? "5–8 hafta"
        : "2–4 hafta";

  const updateConfig = (key: SelectorKey | "type", value: string) =>
    setConfig((prev) => ({ ...prev, [key]: value }));

  return (
    <section
      ref={sectionRef}
      id="fiyatlandirma"
      className="border-t border-white/8 bg-[#030305] px-4 py-20 sm:px-5 sm:py-24 md:px-6"
      itemScope
      itemType="https://schema.org/OfferCatalog"
    >
      <div className="mx-auto max-w-6xl">
        {/* Başlık */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <p className="mb-4 text-[11px] font-black uppercase tracking-[0.4em] text-brand-purple">
            Şeffaf Maliyetlendirme
          </p>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
            <h2
              className="text-4xl font-black uppercase italic leading-none tracking-tighter text-white sm:text-5xl"
              itemProp="name"
            >
              Yatırım <span className="text-white/20">Denklemi.</span>
            </h2>
            <p className="text-[15px] leading-relaxed text-white/50 lg:max-w-md lg:justify-self-end">
              Her seçim bir değer kararıdır. Projenizin kapsamını kendiniz
              belirleyin — tahmini yatırım anlık hesaplansın.
            </p>
          </div>
        </motion.div>

        {/* Ana grid */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start">
          {/* Sol — seçimler */}
          <div className="flex flex-col gap-6">
            {/* Adım 01 — Platform */}
            <SelectorGroup
              key="platform"
              label={SELECTORS[0].label}
              step={SELECTORS[0].step}
              options={SELECTORS[0].options as unknown as Option[]}
              active={config.platform}
              onChange={(val) => updateConfig("platform", val)}
              inView={inView}
              delay={0.1}
            />

            {/* Adım 02 — Tasarım */}
            <SelectorGroup
              key="design"
              label={SELECTORS[1].label}
              step={SELECTORS[1].step}
              options={SELECTORS[1].options as unknown as Option[]}
              active={config.design}
              onChange={(val) => updateConfig("design", val)}
              inView={inView}
              delay={0.18}
            />

            {/* Adım 03 — Proje Tipi — 3 seçenek */}
            <motion.div
              initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.26,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="mb-3 flex items-center gap-2">
                <span
                  className="flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-black text-white/40"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                >
                  03
                </span>
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-white/40">
                  Proje Kategorisi
                </p>
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {TYPE_OPTIONS.map((opt) => {
                  const isActive = config.type === opt.id;
                  /* E-ticaret delta etiketi platforma göre */
                  const eDelta =
                    opt.id === "ecommerce"
                      ? config.platform === "next"
                        ? 35_000
                        : 15_000
                      : opt.delta;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => updateConfig("type", opt.id)}
                      aria-pressed={isActive}
                      className="cursor-pointer flex flex-col items-start gap-2 rounded-2xl border p-4 text-left transition-all duration-250 hover:brightness-110"
                      style={
                        isActive
                          ? {
                              borderColor: "rgba(190,41,236,0.40)",
                              background: "rgba(190,41,236,0.08)",
                              color: "white",
                            }
                          : {
                              borderColor: "rgba(255,255,255,0.07)",
                              background: "rgba(255,255,255,0.02)",
                              color: "rgba(255,255,255,0.45)",
                            }
                      }
                    >
                      <div className="flex w-full items-center gap-2">
                        <span
                          className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-all"
                          style={
                            isActive
                              ? {
                                  borderColor: "#be29ec",
                                  background: "#be29ec",
                                }
                              : { borderColor: "rgba(255,255,255,0.22)" }
                          }
                        >
                          {isActive && (
                            <span className="h-1.5 w-1.5 rounded-full bg-white" />
                          )}
                        </span>
                        <span
                          style={{
                            color: isActive
                              ? "#be29ec"
                              : "rgba(255,255,255,0.30)",
                          }}
                        >
                          {opt.icon}
                        </span>
                        <span className="text-[12px] font-bold">
                          {opt.label}
                        </span>
                        {eDelta > 0 && (
                          <span
                            className="ml-auto shrink-0 rounded-full border px-1.5 py-0.5 text-[8px] font-bold"
                            style={
                              isActive
                                ? {
                                    borderColor: "rgba(190,41,236,0.35)",
                                    color: "#be29ec",
                                    background: "rgba(190,41,236,0.1)",
                                  }
                                : {
                                    borderColor: "rgba(255,255,255,0.08)",
                                    color: "rgba(255,255,255,0.25)",
                                  }
                            }
                          >
                            +{(eDelta / 1000).toFixed(0)}K
                          </span>
                        )}
                      </div>
                      <p className="pl-6 text-[10px] leading-relaxed opacity-50">
                        {opt.sublabel}
                      </p>
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* Adım 04 — İçerik */}
            <SelectorGroup
              key="content"
              label={SELECTORS[2].label}
              step={SELECTORS[2].step}
              options={SELECTORS[2].options as unknown as Option[]}
              active={config.content}
              onChange={(val) => updateConfig("content", val)}
              inView={inView}
              delay={0.34}
            />
          </div>

          {/* Sağ — sonuç kartı */}
          <motion.div
            initial={{ opacity: 0, x: prefersReduced ? 0 : 16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-5 lg:sticky lg:top-24"
          >
            {/* Fiyat kartı */}
            <div className="overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-b from-white/[0.04] to-transparent">
              {/* Üst — tahmini fiyat */}
              <div className="border-b border-white/6 p-7">
                <p className="mb-3 text-[10px] font-black uppercase tracking-[0.28em] text-white/30">
                  Tahmini Başlangıç Yatırımı
                </p>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={total}
                    initial={{ opacity: 0, y: prefersReduced ? 0 : -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: prefersReduced ? 0 : 12 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-baseline gap-2"
                    itemProp="price"
                  >
                    <span className="text-[52px] font-black italic leading-none tracking-tighter text-white">
                      ₺{total.toLocaleString("tr-TR")}
                    </span>
                    <span className="text-xl font-bold text-white/25">+</span>
                  </motion.div>
                </AnimatePresence>
                <p className="mt-1 text-[11px] text-white/35">
                  KDV hariç · İlk 5–10 sayfa için baz fiyat
                </p>
              </div>

              {/* Orta — kırılım */}
              <div className="border-b border-white/6 px-7 py-5">
                <p className="mb-3 text-[10px] font-black uppercase tracking-[0.22em] text-white/25">
                  Fiyat Kırılımı
                </p>
                <div className="flex flex-col gap-2.5">
                  {breakdown.map((b) => (
                    <div
                      key={b.label}
                      className="flex items-center justify-between"
                    >
                      <span className="text-[12px] text-white/50">
                        {b.label}
                      </span>
                      <span className="text-[13px] font-bold text-white/70">
                        ₺{b.amount.toLocaleString("tr-TR")}
                      </span>
                    </div>
                  ))}
                  <div className="mt-1 flex items-center justify-between border-t border-white/8 pt-2">
                    <span className="text-[12px] font-black text-white/70">
                      Toplam
                    </span>
                    <span className="text-[14px] font-black text-white">
                      ₺{total.toLocaleString("tr-TR")}+
                    </span>
                  </div>
                </div>
              </div>

              {/* Alt — proje detayları */}
              <div className="px-7 py-5">
                <div className="flex flex-col gap-2.5">
                  <PriceRow label="Kapsam" value="İlk 5–10 sayfa" />
                  <PriceRow label="Teslimat" value={deliveryWeeks} />
                  <PriceRow label="Destek" value="1 ay dahil" />
                </div>
              </div>
            </div>

            {/* Uyarı notları */}
            <div className="rounded-2xl border border-white/6 bg-white/2 px-5 py-4 space-y-3">
              <div className="flex gap-3">
                <AlertTriangle
                  size={13}
                  className="mt-0.5 shrink-0"
                  style={{ color: "#be29ec" }}
                />
                <p className="text-[11px] leading-relaxed text-white/45">
                  Bu fiyat temel fonksiyonları içeren başlangıç tahminidir.
                  İlave sayfalar, özel API entegrasyonları ve sağlık turizmi
                  gibi karmaşık projeler ek kapsam gerektirir.
                </p>
              </div>
              <div className="flex gap-3">
                <Info size={13} className="mt-0.5 shrink-0 text-white/25" />
                <p className="text-[11px] leading-relaxed text-white/35">
                  Kesin proje bütçesi, ücretsiz teknik keşif görüşmesi sonrası
                  teklif dokümanıyla netleşir.
                </p>
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/iletisim#analiz"
              className="group relative flex cursor-pointer items-center justify-between overflow-hidden rounded-xl px-6 py-4 text-[12px] font-black uppercase tracking-[0.1em] text-white transition-all hover:scale-[1.01]"
              style={{ background: "linear-gradient(90deg,#be29ec,#0000c8)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 24px rgba(190,41,236,0.4)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <span className="absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative z-10">
                Gerçek Teklif İçin Analiz Başlat
              </span>
              <ArrowRight
                size={15}
                className="relative z-10 transition-transform group-hover:translate-x-1"
              />
            </Link>
            <p className="text-center text-[11px] text-white/25">
              Ücretsiz ilk görüşme · Teklif bağlayıcı değildir
            </p>
          </motion.div>
        </div>

        {/* Alt mesaj */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-10 text-center text-[11px] text-white/20"
        >
          Fiyatlandırma politikamız "rakamlarla kanıtlanmış verimlilik" esasına
          dayanır. Bütçeniz net değilse —{" "}
          <Link
            href="/iletisim#analiz"
            className="text-white/40 underline underline-offset-2 hover:text-white/70 transition-colors"
          >
            birlikte belirleyelim →
          </Link>
        </motion.p>
      </div>
    </section>
  );
}
