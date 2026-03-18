"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Zap,
  Layers,
  BarChart3,
  Target,
  Maximize2,
  MousePointer2,
  ShieldCheck,
  Globe,
  Stethoscope,
  Briefcase,
} from "lucide-react";

const AUTO_INTERVAL = 6000;

const STANDARDS = [
  {
    id: "health",
    icon: <Target size={20} />,
    label: "Sağlık & Medikal Güven",
    description:
      "Medikal güven ile estetik sofistikasyonu tek çatı altında buluşturuyoruz. Randevu akışını yormayan, güven odaklı bir dijital deneyim.",
    accentColor: "#be29ec",
    priority: "Güven → Randevu → Otorite",
    services: [
      {
        icon: <Globe size={18} />,
        title: "Çok Dilli Altyapı",
        desc: "Global hastalar için optimize edilmiş, kusursuz dil geçiş sistemleri.",
      },
      {
        icon: <Zap size={18} />,
        title: "Hızlı Randevu",
        desc: "3 adımda randevu tamamlamayı sağlayan sürtünmesiz (frictionless) akış.",
      },
      {
        icon: <ShieldCheck size={18} />,
        title: "KVKK & Güvenlik",
        desc: "Hasta verilerini koruyan, en yüksek düzeyde şifreli veri iletimi.",
      },
      {
        icon: <BarChart3 size={18} />,
        title: "Dönüşüm Ölçümü",
        desc: "Hangi kanalın randevuya dönüştüğünü gösteren hassas analitik.",
      },
    ],
    cta: "Klinik Çözümleri İncele",
  },
  {
    id: "tourism",
    icon: <Maximize2 size={20} />,
    label: "Lüks Turizm & Seyahat",
    description:
      "Arzu ve keşif hissini, ipeksi bir rezervasyon deneyimiyle mühürlüyoruz. Görsel derinlik ile conversion (dönüşüm) arasındaki ince denge.",
    accentColor: "#f97316",
    priority: "Keşif → Deneyim → Rezervasyon",
    services: [
      {
        icon: <Layers size={18} />,
        title: "Kromatik Derinlik",
        desc: "Tesisin atmosferini ekranın her pikselinde hissettiren renk yönetimi.",
      },
      {
        icon: <MousePointer2 size={18} />,
        title: "Rezervasyon Motoru",
        desc: "Kullanıcıyı kaybetmeden doğrudan satışa yönlendiren hızlı arayüz.",
      },
      {
        icon: <Zap size={18} />,
        title: "Ultra Hızlı Galeri",
        desc: "Yüksek çözünürlüklü görselleri hızı düşürmeden sunan modern medya yönetimi.",
      },
      {
        icon: <Target size={18} />,
        title: "Lokasyon SEO",
        desc: "Yerel aramalarda rakipsiz görünürlük sağlayan teknik yapılandırma.",
      },
    ],
    cta: "Turizm Vizyonuna Bak",
  },
  {
    id: "b2b",
    icon: <TrendingUp size={20} />,
    label: "B2B & Kurumsal Otorite",
    description:
      "Teknik uzmanlığı ve ölçeklenebilirliği, minimalist bir otoriteyle sunuyoruz. Rakiplerin teknik açıklarını veriyle fırsata çeviren tasarımlar.",
    accentColor: "#0000c8",
    priority: "Otorite → Olanaklar → Lead",
    services: [
      {
        icon: <ShieldCheck size={18} />,
        title: "Kurumsal Prestij",
        desc: "Markanızın büyüklüğünü ve güvenilirliğini yansıtan ağırbaşlı tasarım.",
      },
      {
        icon: <BarChart3 size={18} />,
        title: "Lead Generation",
        desc: "Nitelikli aday formları (Lead Qualification) ile doğru müşteriye ulaşım.",
      },
      {
        icon: <Zap size={18} />,
        title: "Ölçeklenebilir Kod",
        desc: "Yüzlerce sayfa ve yoğun trafiğe rağmen asla yavaşlamayan altyapı.",
      },
      {
        icon: <Target size={18} />,
        title: "İçerik Mimarisi",
        desc: "Hizmetlerinizi ve ürünlerinizi hiyerarşik olarak en net sunan kurgu.",
      },
    ],
    cta: "Kurumsal Gücü Mühürle",
  },
] as const;

export default function DesignStandards() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const standard = STANDARDS[active];
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCycle = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActive((current) => (current + 1) % STANDARDS.length);
    }, AUTO_INTERVAL);
  }, []);

  useEffect(() => {
    if (!isPaused) startCycle();
    else if (intervalRef.current) clearInterval(intervalRef.current);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, startCycle]);

  return (
    <section
      className="relative bg-[#050507] py-32 px-4 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* "SİZ" Arka Plan Tipografisi */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 pointer-events-none select-none opacity-5 w-full text-center">
        <span className="text-[25vw] font-black text-white leading-none uppercase tracking-tighter">
          SİZ
        </span>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <p className="text-brand-purple text-[10px] font-black uppercase tracking-[0.4em] mb-4">
            Tasarım Standartları
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter uppercase italic leading-none">
            Estetik <span className="text-white/20">Disiplini.</span>
          </h2>
        </div>

        {/* Sektörel Sekmeler */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {STANDARDS.map((s, i) => {
            const isActive = active === i;
            return (
              <button
                key={s.id}
                onClick={() => setActive(i)}
                className={`flex items-center gap-3 px-8 py-4 rounded-2xl border transition-all duration-500 relative ${
                  isActive
                    ? "bg-white/[0.05] border-white/20 text-white shadow-[0_0_40px_rgba(190,41,236,0.1)]"
                    : "border-white/5 text-white/40 hover:text-white/60 bg-white/[0.01]"
                }`}
              >
                <span className="text-xs font-black uppercase tracking-widest">
                  {s.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="active-std-glow"
                    className="absolute -bottom-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-brand-purple to-transparent"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Ana İçerik Paneli */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Sol Panel: Sektörel Vizyon */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={standard.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="p-10 rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-white/[0.04] to-transparent h-full flex flex-col justify-center"
              >
                <div className="mb-8">
                  <p className="text-[10px] font-black text-brand-purple uppercase tracking-[0.3em] mb-2">
                    Mühendislik Rotası
                  </p>
                  <p className="text-xs font-bold text-white/60">
                    {standard.priority}
                  </p>
                </div>

                <p className="text-2xl md:text-3xl text-white/95 leading-tight italic font-medium mb-10">
                  "{standard.description}"
                </p>

                <div className="text-[11px] font-bold text-white/30 uppercase tracking-tighter">
                  Duyguları Tasarlayan Matematik
                </div>
              </motion.div>
            </AnimatePresence>

            <Link
              href="/iletisim"
              className="group relative flex items-center justify-between overflow-hidden rounded-2xl p-6 text-[11px] font-black uppercase tracking-[0.2em] text-white transition-all hover:scale-[1.02]"
              style={{
                background: "linear-gradient(90deg, #be29ec, #0000c8)",
                boxShadow: "0 0 30px rgba(190,41,236,0.3)",
              }}
            >
              <span className="relative z-10">{standard.cta} →</span>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </div>

          {/* Sağ Panel: Sektörel Reçete */}
          <div className="lg:col-span-7">
            <div className="grid sm:grid-cols-2 gap-4 h-full">
              <AnimatePresence mode="wait">
                {standard.services.map((s, i) => (
                  <motion.div
                    key={`${standard.id}-${s.title}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="p-6 rounded-3xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 transition-all flex flex-col justify-center group"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2.5 rounded-xl bg-white/5 text-brand-purple group-hover:bg-brand-purple group-hover:text-white transition-all">
                        {s.icon}
                      </div>
                      <h4 className="text-[16px] font-bold text-white">
                        {s.title}
                      </h4>
                    </div>
                    <p className="text-[13px] leading-relaxed text-white/50 group-hover:text-white/80 transition-colors">
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

// Yardımcı icon (TrendingUp) tanımlı değilse diye:
function TrendingUp(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-trending-up"
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}
