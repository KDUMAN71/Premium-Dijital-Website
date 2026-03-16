"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useInView,
} from "framer-motion";
import {
  ArrowRight,
  Search,
  GitBranch,
  Settings2,
  LineChart,
} from "lucide-react";

/* ─────────────────────────────────────────────
   Süreç adımları
───────────────────────────────────────────── */
const STEPS = [
  {
    id: "analiz",
    num: "01",
    title: "Analiz & Teşhis",
    duration: "1–2 gün",
    icon: <Search size={20} />,
    color: "#be29ec",
    summary: "Mevcut durumu anlamadan doğru çözüm yazılamaz.",
    outputs: [
      "Teknik denetim raporu",
      "Fırsat & risk listesi",
      "Öncelik haritası",
    ],
    detail:
      "Mevcut site veya ihtiyaç yapısını, rakipleri ve hedef kitleyi analiz ediyoruz. Teknik eksikler, SEO açıkları ve dönüşüm engelleri belgeleniyor. Bu adımın sonunda elinizde somut bir teşhis raporu var.",
  },
  {
    id: "mimari",
    num: "02",
    title: "Mimari & Strateji",
    duration: "2–3 gün",
    icon: <GitBranch size={20} />,
    color: "#7b1fa2",
    summary: "Doğru yapıyı kurmak, sonradan düzeltmekten ucuzdur.",
    outputs: [
      "Sayfa hiyerarşisi planı",
      "İçerik & URL mimarisi",
      "Wireframe taslakları",
    ],
    detail:
      "Sayfa hiyerarşisi, içerik akışı, kullanıcı yönlendirmesi ve SEO mimarisini planlıyoruz. Landing page kurgusu, dönüşüm akışı ve bilgi mimarisi bu adımda netleşiyor.",
  },
  {
    id: "uygulama",
    num: "03",
    title: "Uygulama & Geliştirme",
    duration: "5–15 gün",
    icon: <Settings2 size={20} />,
    color: "#3949ab",
    summary: "Tasarım ve kod birlikte, ayrı değil.",
    outputs: [
      "Responsive tasarım & geliştirme",
      "Hız & Core Web Vitals",
      "SEO teknik kurulum",
    ],
    detail:
      "Responsive uygulama, teknik SEO kurulumu, hız optimizasyonu ve Core Web Vitals iyileştirmeleri bu adımda yapılıyor. Tasarım kararları veriyle destekleniyor, her sayfa dönüşüm odaklı kurgulanıyor.",
  },
  {
    id: "yayin",
    num: "04",
    title: "Ölçümleme & Yayın",
    duration: "1–2 gün",
    icon: <LineChart size={20} />,
    color: "#0000c8",
    summary: "Ölçülemeyen şey geliştirilemez.",
    outputs: [
      "GA4 & GTM kurulumu",
      "Dönüşüm takip testleri",
      "Yayın & kalite kontrol",
    ],
    detail:
      "GA4 ve GTM ile form gönderimleri, telefon tıklamaları ve kritik kullanıcı aksiyonları izlemeye alınıyor. Yayın öncesi ve sonrası kalite kontrolleri tamamlanıyor. Site yayında, veri akıyor.",
  },
] as const;

type StepId = (typeof STEPS)[number]["id"];

/* ─────────────────────────────────────────────
   Ana bileşen
───────────────────────────────────────────── */
export default function ProcessTimeline() {
  const [activeStep, setActiveStep] = useState<StepId>("analiz");
  const prefersReduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.15 });

  const step = STEPS.find((s) => s.id === activeStep)!;

  return (
    <section
      ref={sectionRef}
      id="surec"
      className="border-t border-white/8 bg-[#04040a] px-4 py-20 sm:px-5 sm:py-24 md:px-6"
      itemScope
      itemType="https://schema.org/HowTo"
    >
      <div className="mx-auto max-w-6xl">
        {/* Başlık */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end"
        >
          <div>
            <p className="mb-4 text-[11px] font-black uppercase tracking-[0.4em] text-brand-purple">
              Süreç
            </p>
            <h2
              className="text-4xl font-black uppercase italic leading-none tracking-tighter text-white sm:text-5xl"
              itemProp="name"
            >
              Sağlam Altyapı <span className="text-white/20">İnşa Edilir.</span>
            </h2>
          </div>
          <p className="text-[16px] leading-relaxed text-white/55 lg:max-w-md lg:justify-self-end">
            Analiz, mimari, uygulama ve ölçümleme — her adım bir öncekinin
            üzerine oturur. Atlanan adım yoktur.
          </p>
        </motion.div>

        {/* Pipeline + detay — 2 kolon */}
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start">
          {/* Sol — adım listesi */}
          <div className="flex flex-col gap-2">
            {STEPS.map((s, i) => {
              const isActive = activeStep === s.id;
              return (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, x: prefersReduced ? 0 : -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setActiveStep(s.id)}
                    aria-pressed={isActive}
                    className="group flex w-full cursor-pointer items-start gap-4 rounded-2xl border px-5 py-4 text-left transition-all duration-300 hover:brightness-110"
                    style={
                      isActive
                        ? {
                            borderColor: `${s.color}45`,
                            background: `${s.color}0e`,
                          }
                        : {
                            borderColor: "rgba(255,255,255,0.07)",
                            background: "rgba(255,255,255,0.02)",
                          }
                    }
                  >
                    {/* Numara + connector */}
                    <div className="flex flex-col items-center gap-1 pt-0.5">
                      <span
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-[11px] font-black transition-all duration-300"
                        style={
                          isActive
                            ? {
                                background: s.color,
                                color: "white",
                                boxShadow: `0 0 16px ${s.color}50`,
                              }
                            : {
                                background: "rgba(255,255,255,0.06)",
                                color: "rgba(255,255,255,0.35)",
                              }
                        }
                      >
                        {s.num}
                      </span>
                      {/* Connector — son adım hariç */}
                      {i < STEPS.length - 1 && (
                        <div
                          className="h-6 w-px rounded-full transition-all duration-300"
                          style={{
                            background: isActive
                              ? `${s.color}50`
                              : "rgba(255,255,255,0.08)",
                          }}
                        />
                      )}
                    </div>

                    {/* İçerik */}
                    <div className="flex-1 pt-1">
                      <div className="flex items-center justify-between gap-2">
                        <p
                          className="text-[15px] font-bold transition-colors duration-200"
                          style={{
                            color: isActive
                              ? "white"
                              : "rgba(255,255,255,0.65)",
                          }}
                        >
                          {s.title}
                        </p>
                        <span className="shrink-0 rounded-full border border-white/8 px-2.5 py-0.5 text-[10px] font-semibold text-white/30">
                          {s.duration}
                        </span>
                      </div>
                      <p className="mt-1 text-[12px] leading-relaxed text-white/40">
                        {s.summary}
                      </p>
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* Sağ — aktif adım detayı */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: prefersReduced ? 0 : 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: prefersReduced ? 0 : -10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-5 lg:sticky lg:top-24"
            >
              {/* Detay kartı */}
              <div
                className="rounded-2xl border p-7"
                style={{
                  borderColor: `${step.color}28`,
                  background: `${step.color}08`,
                }}
              >
                {/* İkon + başlık */}
                <div className="mb-5 flex items-center gap-3">
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-2xl"
                    style={{
                      background: `${step.color}20`,
                      color: step.color,
                      boxShadow: `0 0 20px ${step.color}25`,
                    }}
                  >
                    {step.icon}
                  </span>
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white/30">
                      Adım {step.num}
                    </p>
                    <p className="text-[17px] font-bold text-white">
                      {step.title}
                    </p>
                  </div>
                </div>

                {/* Detay metni */}
                <p className="text-[15px] leading-relaxed text-white/70">
                  {step.detail}
                </p>

                {/* Çıktılar */}
                <div className="mt-6">
                  <p className="mb-3 text-[10px] font-black uppercase tracking-[0.22em] text-white/30">
                    Bu Adımın Çıktıları
                  </p>
                  <div className="flex flex-col gap-2">
                    {step.outputs.map((o) => (
                      <div
                        key={o}
                        className="flex items-center gap-3 rounded-xl border border-white/6 bg-white/3 px-4 py-2.5"
                      >
                        <div
                          className="h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{
                            background: step.color,
                            boxShadow: `0 0 6px ${step.color}`,
                          }}
                        />
                        <span className="text-[13px] font-medium text-white/75">
                          {o}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Toplam süre notu */}
              <div className="flex items-center gap-3 rounded-xl border border-white/6 bg-white/2 px-5 py-3">
                <div
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{
                    background: "linear-gradient(135deg,#be29ec,#0000c8)",
                    boxShadow: "0 0 8px #be29ec50",
                  }}
                />
                <p className="text-[12px] text-white/45">
                  Ortalama toplam süre:{" "}
                  <span className="font-bold text-white/65">10–22 iş günü</span>
                  <span className="ml-1 text-white/30">
                    · proje kapsamına göre değişir
                  </span>
                </p>
              </div>

              {/* CTA */}
              <Link
                href="/iletisim#analiz"
                className="group relative flex cursor-pointer items-center justify-between overflow-hidden rounded-xl px-6 py-4 text-[12px] font-black uppercase tracking-[0.1em] text-white transition-all hover:scale-[1.01]"
                style={{
                  background: "linear-gradient(90deg,#be29ec,#0000c8)",
                  boxShadow: "0 0 0 rgba(190,41,236,0)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 0 24px rgba(190,41,236,0.35)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 0 0 rgba(190,41,236,0)";
                }}
              >
                <span className="absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative z-10">
                  Süreci Birlikte Başlatalım
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
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
