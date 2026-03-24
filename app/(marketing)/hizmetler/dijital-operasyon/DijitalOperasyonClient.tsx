"use client";

import React, { useState, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Zap,
  Database,
  MessageSquare,
  BarChart3,
  Bot,
  Settings,
  Globe,
  ChevronDown,
  Check,
  TrendingUp,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import ShimmerButton from "@/components/ui/ShimmerButton";

/* ─────────────────────────────────────────────────────────────────────────────
   VERİ
───────────────────────────────────────────────────────────────────────────── */

const manifestoItems = [
  {
    id: "araclari",
    heading: "Araçlarınız var.",
    accent: "Sisteminiz yok.",
    accentColor: "text-brand-purple",
    text: "CRM burada, e-posta orada, takip Excel'de. Her araç kendi adacığında çalışıyor. Veri taşınıyor, bilgi kayboluyor, karar gecikiyor. Sorun teknoloji değil — entegrasyon.",
    icon: "⚙",
  },
  {
    id: "hizlanmak",
    heading: "Hızlanmak istiyorsunuz,",
    accent: "sürtünme yaratıyorsunuz.",
    accentColor: "text-white",
    text: "Yeni araç ekledikçe karmaşıklık artıyor. Ekip onboarding uzuyor, süreçler çatallanıyor. Otomasyon olmadan ölçeklenmek, daha hızlı koşmaya çalışırken ayakkabılarınızı bağlamaya benziyor.",
    icon: "↯",
  },
  {
    id: "yapay-zeka",
    heading: "Yapay zekayı sisteme entegre edenler",
    accent: "kazanır.",
    accentColor: "text-brand-blue",
    text: "ChatGPT'yi denemek başlangıç. Gerçek avantaj, yapay zekanın müşteri iletişiminizde, satış sürecinizde ve operasyonunuzda sessizce çalışmasından geliyor.",
    icon: "✦",
  },
];

const maturityLevels = [
  {
    level: 0,
    label: "Kaotik",
    emoji: "🔴",
    entropy: "%92",
    entropyColor: "#ef4444",
    color: "rgba(239,68,68,0.12)",
    borderColor: "rgba(239,68,68,0.3)",
    accentColor: "#ef4444",
    symptoms: [
      "Her şey manuel ve sözlü",
      "Veri Excel'de veya kafada",
      "Çalışan ayrılınca bilgi kayboluyor",
      "Kararlar sezgiyle alınıyor",
    ],
    solution: "Temel Dijital Altyapı",
    solutionDesc: "Google Workspace, temel CRM, ilk otomasyon akışları",
    packages: ["Kurumsal Hafıza", "Satış Makinesi"],
    // SVG path datası — dağınık noktalar
    svgType: "scatter",
  },
  {
    level: 1,
    label: "Dağınık",
    emoji: "🟡",
    entropy: "%64",
    entropyColor: "#f59e0b",
    color: "rgba(245,158,11,0.12)",
    borderColor: "rgba(245,158,11,0.3)",
    accentColor: "#f59e0b",
    symptoms: [
      "Araçlar var ama birbirine bağlı değil",
      "Veri manuel taşınıyor",
      "Aynı bilgi birden fazla yerde",
      "Otomasyon yok veya çok az",
    ],
    solution: "Entegrasyon & Otomasyon",
    solutionDesc: "Make.com / Zapier ile araçları birbirine bağlama",
    packages: ["Kurumsal Hafıza", "Kesintisiz Müşteri Deneyimi"],
    svgType: "disconnected",
  },
  {
    level: 2,
    label: "Fonksiyonel",
    emoji: "🔵",
    entropy: "%28",
    entropyColor: "#3b82f6",
    color: "rgba(59,130,246,0.12)",
    borderColor: "rgba(59,130,246,0.3)",
    accentColor: "#3b82f6",
    symptoms: [
      "Sistemler çalışıyor ama kör noktalar var",
      "Raporlar var ama karar almıyor",
      "Fırsatlar görülemiyor",
      "Optimizasyon eksik",
    ],
    solution: "Veri Zekası",
    solutionDesc: "GA4, Looker Studio, AI forecasting ile görünürlük",
    packages: ["Veri Zekası", "Dijital İş Gücü"],
    svgType: "partial",
  },
  {
    level: 3,
    label: "Otonom",
    emoji: "🟣",
    entropy: "%5",
    entropyColor: "#be29ec",
    color: "rgba(190,41,236,0.12)",
    borderColor: "rgba(190,41,236,0.3)",
    accentColor: "#be29ec",
    symptoms: [
      "Sistem kendi kendine öğreniyor",
      "AI destekli kararlar alınıyor",
      "Prediktif uyarılar geliyor",
      "İnsan sadece stratejiye odaklanıyor",
    ],
    solution: "Ölçekleme & AI Entegrasyonu",
    solutionDesc: "Agentic workflows, AI iş gücü, tam otonom operasyon",
    packages: ["Dijital İş Gücü"],
    svgType: "full",
  },
];

// SVG ikonlar — her seviye için anlam taşıyan soyut görseller
function MaturityIcon({ type, color }: { type: string; color: string }) {
  if (type === "scatter") {
    // Dağınık noktalar — kaotik
    return (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        <circle cx="12" cy="18" r="4" fill={color} opacity="0.7" />
        <circle cx="38" cy="10" r="3" fill={color} opacity="0.5" />
        <circle cx="52" cy="28" r="5" fill={color} opacity="0.6" />
        <circle cx="20" cy="44" r="3" fill={color} opacity="0.4" />
        <circle cx="48" cy="50" r="4" fill={color} opacity="0.5" />
        <circle cx="30" cy="32" r="3" fill={color} opacity="0.3" />
        <circle cx="8" cy="54" r="2" fill={color} opacity="0.4" />
        <circle cx="58" cy="12" r="2" fill={color} opacity="0.3" />
      </svg>
    );
  }
  if (type === "disconnected") {
    // Bağlantısız kutular
    return (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        <rect
          x="4"
          y="4"
          width="20"
          height="14"
          rx="3"
          fill={color}
          opacity="0.5"
        />
        <rect
          x="40"
          y="4"
          width="20"
          height="14"
          rx="3"
          fill={color}
          opacity="0.5"
        />
        <rect
          x="4"
          y="46"
          width="20"
          height="14"
          rx="3"
          fill={color}
          opacity="0.5"
        />
        <rect
          x="40"
          y="46"
          width="20"
          height="14"
          rx="3"
          fill={color}
          opacity="0.5"
        />
        {/* Kesik çizgiler — bağlantı yok */}
        <line
          x1="24"
          y1="11"
          x2="40"
          y2="11"
          stroke={color}
          strokeWidth="1.5"
          strokeDasharray="3 3"
          opacity="0.4"
        />
        <line
          x1="14"
          y1="18"
          x2="14"
          y2="46"
          stroke={color}
          strokeWidth="1.5"
          strokeDasharray="3 3"
          opacity="0.4"
        />
        <line
          x1="50"
          y1="18"
          x2="50"
          y2="46"
          stroke={color}
          strokeWidth="1.5"
          strokeDasharray="3 3"
          opacity="0.4"
        />
      </svg>
    );
  }
  if (type === "partial") {
    // Kısmen bağlı sistem — bazı oklar dolu bazıları kesik
    return (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="8" fill={color} opacity="0.6" />
        <circle cx="12" cy="12" r="5" fill={color} opacity="0.4" />
        <circle cx="52" cy="12" r="5" fill={color} opacity="0.4" />
        <circle cx="12" cy="52" r="5" fill={color} opacity="0.3" />
        <circle cx="52" cy="52" r="5" fill={color} opacity="0.3" />
        <line
          x1="17"
          y1="17"
          x2="25"
          y2="25"
          stroke={color}
          strokeWidth="1.5"
          opacity="0.7"
        />
        <line
          x1="47"
          y1="17"
          x2="39"
          y2="25"
          stroke={color}
          strokeWidth="1.5"
          opacity="0.7"
        />
        <line
          x1="17"
          y1="47"
          x2="25"
          y2="39"
          stroke={color}
          strokeWidth="1.5"
          strokeDasharray="3 3"
          opacity="0.4"
        />
        <line
          x1="47"
          y1="47"
          x2="39"
          y2="39"
          stroke={color}
          strokeWidth="1.5"
          strokeDasharray="3 3"
          opacity="0.4"
        />
      </svg>
    );
  }
  // full — tam entegre döngü
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="10" fill={color} opacity="0.7" />
      <circle
        cx="32"
        cy="32"
        r="20"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        opacity="0.4"
      />
      <circle
        cx="32"
        cy="32"
        r="28"
        fill="none"
        stroke={color}
        strokeWidth="0.8"
        strokeDasharray="4 4"
        opacity="0.3"
      />
      {/* Döngüsel oklar */}
      <path
        d="M32 4 A28 28 0 0 1 60 32"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        opacity="0.6"
      />
      <path
        d="M60 32 A28 28 0 0 1 32 60"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        opacity="0.5"
      />
      <path
        d="M32 60 A28 28 0 0 1 4 32"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        opacity="0.4"
      />
      <path
        d="M4 32 A28 28 0 0 1 32 4"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        opacity="0.6"
      />
    </svg>
  );
}

const packages = [
  {
    id: "satis",
    index: "01",
    name: "Satış Makinesi",
    focus: "Daha fazla müşteri",
    promise: "Manuel takibi bırakın, sadece randevulara odaklanın.",
    description:
      "Müşteri adayları sizi bulduğunda sistem devreye girer. Lead otomasyonu, akıllı CRM ve WhatsApp AI ile satış hattınız 7/24 çalışır — siz yalnızca görüşmeye çıkarsınız.",
    tools: [
      "HubSpot / Attio",
      "WhatsApp Business AI",
      "Clay",
      "Conversion Tracking",
      "Lead Otomasyon",
    ],
    roi: {
      label: "Yanıt hızı",
      value: "saatler → saniyeler",
      type: "transform",
    },
    color: {
      primary: "#be29ec",
      glow: "rgba(190,41,236,0.18)",
      border: "rgba(190,41,236,0.35)",
      text: "#d8b4fe",
      soft: "rgba(190,41,236,0.08)",
    },
    icon: <Zap className="h-5 w-5" strokeWidth={1.5} />,
  },
  {
    id: "hafiza",
    index: "02",
    name: "Kurumsal Hafıza",
    focus: "Bilgi kaybını sıfırla",
    promise: "Şirketinizin tüm birikimi tek bir AI zekasında birleşsin.",
    description:
      "Geçmiş kararlar, müşteri geçmişi, şirket bilgisi — hepsi tek sistemde, her an erişilebilir. Çalışan ayrılsa bile kurumsal hafıza kaybolmaz.",
    tools: [
      "Google Workspace",
      "Notion",
      "Pinecone (Vektör DB)",
      "Make.com",
      "Doküman Otomasyonu",
    ],
    roi: {
      label: "Bilgiye erişim",
      value: "dağınık dosyalardan → tek kaynak",
      type: "transform",
    },
    color: {
      primary: "#3b82f6",
      glow: "rgba(59,130,246,0.18)",
      border: "rgba(59,130,246,0.35)",
      text: "#93c5fd",
      soft: "rgba(59,130,246,0.08)",
    },
    icon: <Database className="h-5 w-5" strokeWidth={1.5} />,
  },
  {
    id: "deneyim",
    index: "03",
    name: "Kesintisiz Müşteri Deneyimi",
    focus: "7/24 müşteri ilişkisi",
    promise: "Her kanalda anlık ve vakur yanıtlar.",
    description:
      "Müşteriniz saat 02:00'de soru sorduğunda da markanızı temsil eden, bağlam anlayan bir sistem yanıt verir. Sesli AI ile telefon görüşmelerinde bile insan kalitesinde iletişim.",
    tools: [
      "WhatsApp Business API",
      "Vapi.ai (Sesli AI)",
      "Zoho Desk",
      "E-posta Otomasyonu",
      "Omnichannel",
    ],
    roi: { label: "Müşteri teması", value: "7/24 kesintisiz", type: "metric" },
    color: {
      primary: "#2dd4bf",
      glow: "rgba(45,212,191,0.18)",
      border: "rgba(45,212,191,0.35)",
      text: "#5eead4",
      soft: "rgba(45,212,191,0.08)",
    },
    icon: <MessageSquare className="h-5 w-5" strokeWidth={1.5} />,
  },
  {
    id: "veri",
    index: "04",
    name: "Veri Zekası",
    focus: "Veriye dayalı karar",
    promise: "Geçmişi raporlamıyoruz, önünüzdeki 3 ayı analiz ediyoruz.",
    description:
      "Ne olduğunu değil, ne olacağını görürsünüz. Kriz gelmeden önlem, fırsat kaçmadan yatırım. Tüm veri akışı tek görünüme dönüşür.",
    tools: [
      "GA4 + GTM",
      "Search Console",
      "Looker Studio",
      "Amplitude",
      "AI Forecasting",
    ],
    roi: {
      label: "Karar alma",
      value: "reaktif raporlama → proaktif öngörü",
      type: "transform",
    },
    color: {
      primary: "#f59e0b",
      glow: "rgba(245,158,11,0.18)",
      border: "rgba(245,158,11,0.35)",
      text: "#fcd34d",
      soft: "rgba(245,158,11,0.08)",
    },
    icon: <BarChart3 className="h-5 w-5" strokeWidth={1.5} />,
  },
  {
    id: "isgucü",
    index: "05",
    name: "Dijital İş Gücü",
    focus: "Operasyonel verimlilik",
    promise: "Tekrarlayan işleri otonom ajanlara devredin, zaman kazanın.",
    description:
      "Uyumayan dijital asistanlar — ekibiniz yalnızca yaratıcı ve stratejik işlere odaklanır. AI ajanlar analiz eder, yazar, denetler ve raporlar.",
    tools: [
      "AI Agents",
      "Claude / GPT API",
      "Make.com / n8n",
      "LangChain",
      "Otomatik Raporlama",
    ],
    roi: {
      label: "Haftalık tasarruf",
      value: "10–20 saat operasyonel iş yükü",
      type: "metric",
    },
    color: {
      primary: "#0000c8",
      glow: "rgba(0,0,200,0.2)",
      border: "rgba(59,130,246,0.4)",
      text: "#93c5fd",
      soft: "rgba(0,0,200,0.1)",
    },
    icon: <Bot className="h-5 w-5" strokeWidth={1.5} />,
  },
];

const sectorSpotlights = [
  {
    sector: "Sağlık Kliniği",
    icon: "🏥",
    tag: "WhatsApp AI + CRM Entegrasyonu",
    color: "rgba(190,41,236,0.1)",
    border: "rgba(190,41,236,0.25)",
    accentColor: "#be29ec",
    before: {
      label: "Önce",
      items: [
        "Randevular telefon ve WhatsApp'a dağılmış",
        "Manuel takip, kaçan hatırlatmalar",
        "Doktor ve asistan idari işle boğuluyor",
        "Hasta geçmişi farklı dosyalarda",
      ],
    },
    after: {
      label: "Sonra",
      items: [
        "WhatsApp AI randevu taleplerini anında yanıtlıyor",
        "CRM'e otomatik kayıt, hatırlatma gönderimi",
        "Ekip sadece hasta bakımına odaklanıyor",
        "Tüm hasta geçmişi tek sistemde",
      ],
    },
    metrics: [
      { value: "%0", label: "Randevu\nKaçırma" },
      { value: "7/24", label: "Otomatik\nYanıt" },
      { value: "−3s", label: "Yanıt\nSüresi" },
    ],
    kazanim:
      "Randevu kaçırma oranı minimuma iner, hasta memnuniyeti artar, ekip kapasitesi serbest kalır.",
  },
  {
    sector: "Sağlık Turizmi",
    icon: "✈️",
    tag: "Çok Dilli AI + Global Lead Pipeline",
    color: "rgba(0,0,200,0.1)",
    border: "rgba(59,130,246,0.25)",
    accentColor: "#3b82f6",
    before: {
      label: "Önce",
      items: [
        "Yabancı hastalar farklı dillerde soru soruyor",
        "Yanıt gecikmesi lead kaybına yol açıyor",
        "İnsan tercüman ve koordinatör ihtiyacı",
        "Lead önceliklendirmesi manuel yapılıyor",
      ],
    },
    after: {
      label: "Sonra",
      items: [
        "Çok dilli AI sistemi anında yanıt veriyor",
        "Lead CRM'e düşüyor, otomatik önceliklendiriliyor",
        "Takip sekansı başlıyor, koordinatör sadece kapanışa odaklanıyor",
        "Küresel pipeline 7/24 aktif",
      ],
    },
    metrics: [
      { value: "5+", label: "Dil\nDesteği" },
      { value: "7/24", label: "Global\nPipeline" },
      { value: "−80%", label: "Manuel\nİş Yükü" },
    ],
    kazanim:
      "Küresel hasta talebini kaçırmadan yakalayan, 7/24 çalışan bir lead akış sistemi.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Dijital Audit",
    desc: "Mevcut araçlar, süreçler ve boşluklar haritalanır. Hangi seviyedesiniz, nereye gidiyorsunuz?",
    duration: "1 hafta",
    icon: <Settings className="h-5 w-5" strokeWidth={1.5} />,
  },
  {
    step: "02",
    title: "Sistem Tasarımı",
    desc: "İş çıktılarına göre araç ve otomasyon mimarisi tasarlanır. Her bileşenin rolü nettir.",
    duration: "1–2 hafta",
    icon: <Globe className="h-5 w-5" strokeWidth={1.5} />,
  },
  {
    step: "03",
    title: "Entegrasyon",
    desc: "Araçlar birbirine bağlanır, otomasyon akışları kurulur, veri tek sistemde akar.",
    duration: "2–4 hafta",
    icon: <Zap className="h-5 w-5" strokeWidth={1.5} />,
  },
  {
    step: "04",
    title: "Büyüme",
    desc: "Sistem canlıda izlenir, optimize edilir. Yeni kapasite eklenir, ölçekleme sürdürülür.",
    duration: "Sürekli",
    icon: <TrendingUp className="h-5 w-5" strokeWidth={1.5} />,
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   BÖLÜMLER
───────────────────────────────────────────────────────────────────────────── */

function Hero() {
  const prefersReduced = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const rotate = useTransform(scrollY, [0, 800], [0, prefersReduced ? 0 : 28]);
  const scale = useTransform(scrollY, [0, 800], [1, prefersReduced ? 1 : 1.18]);
  const imgOpacity = useTransform(scrollY, [0, 600], [0.42, 0.12]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-[#020204]"
    >
      {/* Arka plan görseli — paralaks */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          style={{ rotate, scale, opacity: imgOpacity }}
          className="absolute inset-[-10%] w-[120%] h-[120%]"
        >
          <Image
            src="/img/hizmetler/dijital-operasyon/hero-clock.webp"
            alt="Dijital Operasyon sistem mekanizması"
            fill
            className="object-cover object-center"
            priority
            style={{
              maskImage:
                "radial-gradient(ellipse at 65% 50%, black 30%, transparent 72%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at 65% 50%, black 30%, transparent 72%)",
            }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#020204] via-[#020204]/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020204] via-transparent to-[#020204]/50" />
      </div>

      {/* Ambient glow */}
      <div className="absolute top-1/3 right-1/3 w-[500px] h-[500px] rounded-full bg-brand-purple/6 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-brand-blue/5 blur-[80px] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 lg:pl-24 xl:pl-32 py-32">
        <div className="max-w-3xl">
          {/* Üst etiket */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 mb-10"
          >
            <div className="h-px w-8 bg-gradient-to-r from-brand-purple to-brand-blue" />
            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-white/35 italic">
              AI-Powered Growth Consultancy
            </span>
          </motion.div>

          {/* Ana başlık — iki katmanlı */}
          <motion.h1
            initial={{ opacity: 0, y: prefersReduced ? 0 : 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-bold uppercase italic tracking-[-0.03em] leading-[0.9] mb-8"
          >
            {/* Geri planda — soluk */}
            <span className="block text-4xl sm:text-5xl md:text-6xl text-white/12 mb-1">
              DİJİTAL ENTROPİYİ
            </span>
            <span className="block text-4xl sm:text-5xl md:text-6xl text-white/12 mb-4">
              DURDURUN.
            </span>
            {/* Öne çıkan — güçlü */}
            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-[84px] text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.06)]">
              DİJİTAL DÖNÜŞÜMÜ
            </span>
            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-[84px] bg-gradient-to-r from-[#be29ec] via-white to-[#0000c8] bg-clip-text text-transparent">
              BAŞLATIN.
            </span>
          </motion.h1>

          {/* Alt metin */}
          <motion.div
            initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="border-l-2 border-brand-purple/30 pl-6 mb-12 max-w-xl"
          >
            <p className="text-base md:text-lg text-zinc-400 leading-relaxed font-light italic">
              Dağınık araçlar, kopuk süreçler, kaybolan veriler — bunlar{" "}
              <strong className="text-white/70 font-medium not-italic">
                teknoloji sorunu değil
              </strong>
              , sistem tasarımı meselesidir. Biz kaosun içinde çalışan{" "}
              <strong className="text-white/70 font-medium not-italic">
                mekanizmayı yeniden tasarlıyoruz.
              </strong>
            </p>
          </motion.div>

          {/* CTA butonları */}
          <motion.div
            initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4"
          >
            <ShimmerButton
              href="/iletisim#analiz"
              size="lg"
              className="uppercase tracking-[0.18em] font-black"
            >
              Sisteminizi İnceleyelim
              <ArrowRight className="h-4 w-4" />
            </ShimmerButton>
            <Link
              href="#olgunluk"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-white/45 transition-colors hover:text-white/75 cursor-pointer"
            >
              Hangi Seviyedesiniz?
              <ChevronDown className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
        animate={prefersReduced ? {} : { y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="h-5 w-5 text-white/20" />
      </motion.div>
    </section>
  );
}

/* ── MANİFESTO GÖRSEL PANELLERİ ── */

function ManifestoVisual1() {
  const islands = [
    {
      label: "CRM",
      sub: "124 kayıt",
      color: "#be29ec",
      delay: 0,
      amplitude: 10,
    },
    {
      label: "E-POSTA",
      sub: "Gmail / Outlook",
      color: "#3b82f6",
      delay: 0.6,
      amplitude: 14,
    },
    {
      label: "WHATSAPP",
      sub: "mesajlar kayıp",
      color: "#f59e0b",
      delay: 1.1,
      amplitude: 8,
    },
    {
      label: "RAPORLAR",
      sub: "aylık manuel",
      color: "#ef4444",
      delay: 0.4,
      amplitude: 12,
    },
  ];

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center gap-3 px-5 py-6 bg-[#080810] rounded-2xl overflow-hidden">
      {/* Grid — 2x2 */}
      <div className="relative z-10 grid grid-cols-2 gap-3 w-full">
        {islands.map((island) => (
          <motion.div
            key={island.label}
            animate={{
              y: [
                -island.amplitude / 2,
                island.amplitude / 2,
                -island.amplitude / 2,
              ],
            }}
            transition={{
              duration: 2.8 + island.delay * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: island.delay,
            }}
            className="rounded-xl p-3 text-center"
            style={{
              background: `${island.color}15`,
              border: `1.5px solid ${island.color}50`,
            }}
          >
            <p
              className="text-sm font-black tracking-wider mb-1"
              style={{ color: island.color }}
            >
              {island.label}
            </p>
            <p className="text-xs text-white/40 font-mono">{island.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Kırık bağlantı çizgileri — kutular üzerinde SVG overlay */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-20"
        preserveAspectRatio="none"
      >
        {/* Yatay ortada kesik çizgi */}
        <line
          x1="50%"
          y1="42%"
          x2="50%"
          y2="58%"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="1.5"
          strokeDasharray="5 4"
        />
        {/* Dikey ortada kesik çizgi */}
        <line
          x1="20%"
          y1="50%"
          x2="80%"
          y2="50%"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="1.5"
          strokeDasharray="5 4"
        />
        {/* ✕ — merkez */}
        <g
          stroke="#ef4444"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.9"
        >
          <line x1="47%" y1="47%" x2="53%" y2="53%" />
          <line x1="53%" y1="47%" x2="47%" y2="53%" />
        </g>
        {/* ✕ — sol orta */}
        <g stroke="#ef4444" strokeWidth="2" strokeLinecap="round" opacity="0.7">
          <line x1="18%" y1="48%" x2="22%" y2="52%" />
          <line x1="22%" y1="48%" x2="18%" y2="52%" />
        </g>
        {/* ✕ — sağ orta */}
        <g stroke="#ef4444" strokeWidth="2" strokeLinecap="round" opacity="0.7">
          <line x1="78%" y1="48%" x2="82%" y2="52%" />
          <line x1="82%" y1="48%" x2="78%" y2="52%" />
        </g>
      </svg>

      {/* Alt etiket */}
      <div className="relative z-10 mt-1 text-center">
        <p className="text-sm font-black font-mono tracking-[0.2em] text-white/50">
          4 ARAÇ
        </p>
        <p className="text-lg font-black font-mono tracking-[0.15em] text-red-400/80">
          0 ENTEGRASYON
        </p>
      </div>
    </div>
  );
}

function ManifestoVisual2() {
  return (
    <div className="relative w-full h-full flex flex-col justify-center gap-5 px-6 py-6 bg-[#080810] rounded-2xl overflow-hidden">
      {/* Hedeflenen akış */}
      <div>
        <p className="text-xs font-black font-mono tracking-[0.2em] text-white/40 mb-2">
          HEDEFLENEN HIZ
        </p>
        <div className="relative h-10 rounded-full overflow-hidden bg-white/5 border border-white/8">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full flex items-center justify-end pr-3"
            style={{ background: "linear-gradient(90deg, #1d4ed8, #3b82f6)" }}
            initial={{ width: "0%" }}
            animate={{ width: "95%" }}
            transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }}
          >
            <span className="text-sm font-black text-white font-mono">1×</span>
          </motion.div>
          {/* Akan parıltı */}
          <motion.div
            className="absolute inset-y-0 w-16 skew-x-[-20deg]"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
            }}
            animate={{ left: ["-20%", "110%"] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              repeatDelay: 1,
              ease: "linear",
            }}
          />
        </div>
      </div>

      {/* Gerçek akış — engelli */}
      <div>
        <p className="text-xs font-black font-mono tracking-[0.2em] text-white/40 mb-2">
          GERÇEK DURUM
        </p>
        <div className="relative h-10 rounded-full overflow-hidden bg-white/5 border border-white/8">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{ background: "linear-gradient(90deg, #7c3aed, #be29ec)" }}
            initial={{ width: "0%" }}
            animate={{ width: "28%" }}
            transition={{ duration: 2.5, ease: "easeOut", delay: 0.6 }}
          />
          {/* Takılma animasyonu */}
          <motion.div
            className="absolute inset-y-0 rounded-full"
            style={{ left: "27%", width: 3, background: "rgba(239,68,68,0.8)" }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: 2 }}
          />
        </div>

        {/* Engel etiketleri */}
        <div className="flex gap-2 mt-2">
          {["MANUEL", "KOPUK VERİ", "GECİKME"].map((b, i) => (
            <motion.span
              key={b}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                delay: i * 0.45,
                ease: "easeInOut",
              }}
              className="flex-1 text-center rounded-lg py-1 text-xs font-black tracking-wide font-mono"
              style={{
                background: "rgba(239,68,68,0.12)",
                border: "1px solid rgba(239,68,68,0.4)",
                color: "#f87171",
              }}
            >
              {b}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Sonuç karşılaştırma */}
      <div className="flex gap-3">
        <div
          className="flex-1 text-center rounded-xl py-3 px-2"
          style={{
            background: "rgba(59,130,246,0.1)",
            border: "1px solid rgba(59,130,246,0.3)",
          }}
        >
          <p className="text-xs font-black font-mono text-blue-400/70 mb-1">
            HEDEF
          </p>
          <p className="text-xl font-black text-blue-300 font-mono">1×</p>
        </div>
        <div
          className="flex-1 text-center rounded-xl py-3 px-2"
          style={{
            background: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.3)",
          }}
        >
          <p className="text-xs font-black font-mono text-red-400/70 mb-1">
            GERÇEK
          </p>
          <p className="text-lg font-black text-red-300 font-mono leading-tight">
            0.3×
            <br />
            <span className="text-sm">3× enerji</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function ManifestoVisual3() {
  const nodes = [
    { angle: -90, label: "CRM", color: "#3b82f6" },
    { angle: -30, label: "AI AJAN", color: "#be29ec" },
    { angle: 30, label: "OTOMASYON", color: "#22c55e" },
    { angle: 90, label: "VERİ", color: "#f59e0b" },
    { angle: 150, label: "İLETİŞİM", color: "#ef4444" },
    { angle: 210, label: "BULUT", color: "#8b5cf6" },
  ];
  const cx = 200;
  const cy = 150;
  const orbitR = 108;
  return (
    <div className="relative w-full h-full bg-[#080810] rounded-2xl overflow-hidden">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 400 310"
        preserveAspectRatio="xMidYMid meet"
        style={{ display: "block" }}
      >
        <motion.circle
          cx={cx}
          cy={cy}
          r={orbitR}
          fill="none"
          stroke="rgba(190,41,236,0.2)"
          strokeWidth="1"
          strokeDasharray="5 8"
          style={{ transformOrigin: `${cx}px ${cy}px` }}
          animate={{ rotate: 360 }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        />
        <motion.circle
          cx={cx}
          cy={cy}
          r={70}
          fill="none"
          stroke="rgba(59,130,246,0.18)"
          strokeWidth="1"
          strokeDasharray="3 6"
          style={{ transformOrigin: `${cx}px ${cy}px` }}
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        {nodes.map((node, i) => {
          const rad = (node.angle * Math.PI) / 180;
          return (
            <line
              key={`ln${i}`}
              x1={cx}
              y1={cy}
              x2={cx + Math.cos(rad) * orbitR}
              y2={cy + Math.sin(rad) * orbitR}
              stroke={node.color}
              strokeWidth="0.8"
              opacity="0.2"
            />
          );
        })}
        <motion.circle
          cx={cx}
          cy={cy}
          r={32}
          fill="rgba(190,41,236,0.22)"
          stroke="rgba(190,41,236,0.65)"
          strokeWidth="2"
          animate={{ r: [30, 36, 30] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <text
          x={cx}
          y={cy - 5}
          textAnchor="middle"
          fill="rgba(255,255,255,0.95)"
          fontSize="11"
          fontWeight="700"
          fontFamily="monospace"
        >
          SİSTEM
        </text>
        <text
          x={cx}
          y={cy + 10}
          textAnchor="middle"
          fill="rgba(190,41,236,0.9)"
          fontSize="10"
          fontFamily="monospace"
        >
          MERKEZİ
        </text>
        {nodes.map((node, i) => {
          const rad = (node.angle * Math.PI) / 180;
          const nx = cx + Math.cos(rad) * orbitR;
          const ny = cy + Math.sin(rad) * orbitR;
          const parts = node.label.split(" ");
          return (
            <motion.g
              key={node.label}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeInOut",
              }}
            >
              <circle
                cx={nx}
                cy={ny}
                r="28"
                fill={`${node.color}22`}
                stroke={`${node.color}70`}
                strokeWidth="2"
              />
              {parts.length === 1 ? (
                <text
                  x={nx}
                  y={ny + 4}
                  textAnchor="middle"
                  fill={node.color}
                  fontSize="11"
                  fontWeight="700"
                  fontFamily="monospace"
                >
                  {node.label}
                </text>
              ) : (
                <>
                  <text
                    x={nx}
                    y={ny - 3}
                    textAnchor="middle"
                    fill={node.color}
                    fontSize="10"
                    fontWeight="700"
                    fontFamily="monospace"
                  >
                    {parts[0]}
                  </text>
                  <text
                    x={nx}
                    y={ny + 10}
                    textAnchor="middle"
                    fill={node.color}
                    fontSize="10"
                    fontWeight="700"
                    fontFamily="monospace"
                  >
                    {parts[1]}
                  </text>
                </>
              )}
            </motion.g>
          );
        })}
        <text
          x={cx}
          y="298"
          textAnchor="middle"
          fill="rgba(190,41,236,0.85)"
          fontSize="12"
          fontWeight="700"
          fontFamily="monospace"
          letterSpacing="2"
        >
          6 SİSTEM · TAM ENTEGRASYON
        </text>
      </svg>
    </div>
  );
}
const manifestoVisuals = [ManifestoVisual1, ManifestoVisual2, ManifestoVisual3];

function Manifesto() {
  return (
    <section className="relative py-24 md:py-40 bg-[#020204] overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.016]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.6) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 container mx-auto px-6 lg:pl-24 xl:pl-32">
        {/* Dikey etiket */}
        <div className="hidden lg:block absolute left-8 top-0 h-full w-10 pointer-events-none">
          <div className="sticky top-40 flex flex-col items-center opacity-20">
            <div className="h-48 w-px bg-gradient-to-b from-brand-purple/60 to-transparent" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mt-6 rotate-90 origin-center whitespace-nowrap">
              MANIFESTO
            </span>
          </div>
        </div>

        <div className="space-y-28 md:space-y-40 lg:pl-12">
          {manifestoItems.map((item, i) => {
            const VisualComponent = manifestoVisuals[i];
            const isReversed = i % 2 !== 0;
            const TextBlock = (
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase italic tracking-[-0.02em] leading-tight mb-6 text-white/85">
                  {item.heading}{" "}
                  <span className={item.accentColor}>{item.accent}</span>
                </h2>
                <p className="text-base md:text-lg text-zinc-500 leading-relaxed font-light italic">
                  {item.text}
                </p>
              </div>
            );
            const VisualBlock = (
              <div className="relative h-56 md:h-72 rounded-2xl overflow-hidden border border-white/6 bg-[#0a0a12]">
                <VisualComponent />
              </div>
            );
            return (
              <Reveal key={item.id} delay={i * 0.08}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                  {isReversed ? (
                    <>
                      {VisualBlock}
                      {TextBlock}
                    </>
                  ) : (
                    <>
                      {TextBlock}
                      {VisualBlock}
                    </>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── DİJİTAL OLGUNLUK SEVİYESİ ── */
function MaturityLevel() {
  const [activeLevel, setActiveLevel] = useState<number | null>(null);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      id="olgunluk"
      ref={ref}
      className="relative py-20 md:py-32 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #020204 0%, #060609 50%, #020204 100%)",
      }}
    >
      {/* Görsel 3 arka plan */}
      <div className="absolute inset-0 z-0 opacity-[0.08]">
        <Image
          src="/img/hizmetler/dijital-operasyon/system-core.webp"
          alt=""
          fill
          className="object-cover object-center mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-[#020204]/80" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        {/* Başlık */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14 md:mb-20"
        >
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-5 py-2.5 mb-6">
            <span className="text-[11px] font-black uppercase tracking-[0.28em] text-white/50">
              Dijital Olgunluk Seviyeniz
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase italic tracking-tight text-white mb-5">
            Siz Hangi{" "}
            <span className="bg-gradient-to-r from-[#be29ec] to-[#0000c8] bg-clip-text text-transparent">
              Seviyedesiniz?
            </span>
          </h2>
          <p className="mx-auto max-w-xl text-base md:text-lg text-zinc-500 leading-relaxed italic">
            Her işletmenin dijital olgunluk düzeyi farklıdır. Seviyenizi
            belirleyin — size özel çözüm yolunu görelim.
          </p>
        </motion.div>

        {/* Seviye kartları */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {maturityLevels.map((lvl, i) => {
            const isActive = activeLevel === lvl.level;
            return (
              <motion.div
                key={lvl.level}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: i * 0.1,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onClick={() => setActiveLevel(isActive ? null : lvl.level)}
                className="relative cursor-pointer rounded-2xl border transition-all duration-400 overflow-hidden select-none"
                style={{
                  background: isActive ? lvl.color : "rgba(255,255,255,0.025)",
                  borderColor: isActive
                    ? lvl.borderColor
                    : "rgba(255,255,255,0.07)",
                  boxShadow: isActive ? `0 0 40px ${lvl.color}` : "none",
                }}
              >
                <div className="p-6">
                  {/* Entropi skoru — üst sağ */}
                  <div className="absolute top-5 right-5 text-right">
                    <div className="text-[9px] font-black uppercase tracking-[0.18em] text-white/25 mb-0.5">
                      Entropi
                    </div>
                    <div
                      className="text-xl font-black italic leading-none"
                      style={{
                        color: isActive
                          ? lvl.entropyColor
                          : "rgba(255,255,255,0.2)",
                        textShadow: isActive
                          ? `0 0 12px ${lvl.entropyColor}60`
                          : "none",
                        transition: "color 0.4s, text-shadow 0.4s",
                      }}
                    >
                      {lvl.entropy}
                    </div>
                  </div>

                  {/* SVG ikon */}
                  <div className="mb-4 flex justify-center">
                    <MaturityIcon type={lvl.svgType} color={lvl.accentColor} />
                  </div>

                  {/* Seviye no + label */}
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="font-mono text-xs font-bold tracking-[0.2em]"
                      style={{
                        color: isActive
                          ? lvl.accentColor
                          : "rgba(255,255,255,0.3)",
                      }}
                    >
                      {`0${lvl.level}`}
                    </span>
                    <h3
                      className="text-lg font-bold uppercase italic tracking-tight"
                      style={{
                        color: isActive ? "#fff" : "rgba(255,255,255,0.75)",
                      }}
                    >
                      {lvl.label}
                    </h3>
                  </div>

                  {/* Semptomlar */}
                  <ul className="space-y-2 mb-5">
                    {lvl.symptoms.map((s) => (
                      <li
                        key={s}
                        className="flex items-start gap-2 text-sm leading-snug"
                        style={{ color: "rgba(255,255,255,0.55)" }}
                      >
                        <span
                          className="mt-[6px] h-1 w-1 shrink-0 rounded-full"
                          style={{ background: lvl.accentColor, opacity: 0.5 }}
                        />
                        {s}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    className="w-full rounded-xl py-3 text-sm font-bold uppercase tracking-[0.14em] transition-all duration-300 cursor-pointer"
                    style={{
                      background: isActive
                        ? lvl.accentColor
                        : "rgba(255,255,255,0.06)",
                      color: isActive ? "#fff" : "rgba(255,255,255,0.5)",
                      border: `1px solid ${isActive ? "transparent" : "rgba(255,255,255,0.08)"}`,
                    }}
                  >
                    {isActive ? "↑ Kapat" : "Çözümü Gör →"}
                  </button>

                  {/* Açılır içerik */}
                  <motion.div
                    initial={false}
                    animate={{
                      height: isActive ? "auto" : 0,
                      opacity: isActive ? 1 : 0,
                    }}
                    transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-white/10 pt-4 mt-4">
                      <p
                        className="text-[11px] font-black uppercase tracking-[0.2em] mb-1"
                        style={{ color: lvl.accentColor }}
                      >
                        Çözüm
                      </p>
                      <p className="text-base font-bold text-white mb-1">
                        {lvl.solution}
                      </p>
                      <p className="text-sm text-white/50 italic leading-snug mb-3">
                        {lvl.solutionDesc}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {lvl.packages.map((pkg) => (
                          <span
                            key={pkg}
                            className="rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em]"
                            style={{
                              border: `1px solid ${lvl.borderColor}`,
                              background: `${lvl.color}`,
                              color: lvl.accentColor,
                            }}
                          >
                            {pkg}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Alt CTA */}
        <Reveal delay={0.2}>
          <div className="mt-12 text-center">
            <p className="text-base text-zinc-500 italic mb-5">
              Seviyenizi belirledikten sonra ücretsiz bir dijital operasyon
              analizi talep edin.
            </p>
            <ShimmerButton
              href="/iletisim#analiz"
              size="md"
              className="uppercase tracking-[0.18em] font-black"
            >
              Ücretsiz Analiz Talep Et
              <ArrowRight className="h-4 w-4" />
            </ShimmerButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── YETENEK PAKETLERİ ── */
function Packages() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      id="paketler"
      ref={ref}
      className="relative py-20 md:py-32 bg-[#060609] overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_60%,rgba(0,0,180,0.04),transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        {/* Başlık */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14 md:mb-20"
        >
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-5 py-2.5 mb-6">
            <span className="text-[11px] font-black uppercase tracking-[0.28em] text-white/50">
              Yetenek Paketleri
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white mb-5">
            İşletmenize{" "}
            <span className="bg-gradient-to-r from-[#be29ec] to-[#0000c8] bg-clip-text text-transparent">
              Yetenek Kazandırıyoruz
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-base md:text-lg text-zinc-500 leading-relaxed">
            Her paket bir iş çıktısını temsil eder. Araçlar sahne arkasında
            çalışır — siz sonucu görürsünüz.
          </p>
        </motion.div>

        {/* Üst 4 kart */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-5">
          {packages.slice(0, 4).map((pkg, i) => {
            const isActive = activeId === pkg.id;
            return (
              <motion.article
                key={pkg.id}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: i * 0.08,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onMouseEnter={() => setActiveId(pkg.id)}
                onMouseLeave={() => setActiveId(null)}
                className="relative flex flex-col overflow-hidden rounded-[1.75rem] border transition-all duration-500 cursor-default"
                style={{
                  background: isActive
                    ? "rgba(8,8,20,0.98)"
                    : "rgba(255,255,255,0.025)",
                  borderColor: isActive
                    ? pkg.color.border
                    : "rgba(255,255,255,0.07)",
                  boxShadow: isActive ? `0 0 40px ${pkg.color.glow}` : "none",
                }}
              >
                <div
                  className="pointer-events-none absolute inset-0 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(ellipse at 50% 0%, ${pkg.color.glow}, transparent 70%)`,
                    opacity: isActive ? 1 : 0,
                  }}
                />
                <div className="relative flex flex-col gap-4 p-6 md:p-7">
                  <div className="flex items-center justify-between">
                    <div
                      className="flex items-center gap-2"
                      style={{
                        color: isActive
                          ? pkg.color.primary
                          : "rgba(255,255,255,0.3)",
                      }}
                    >
                      {pkg.icon}
                      <span
                        className="font-mono text-[11px] font-bold tracking-[0.2em]"
                        style={{
                          color: isActive
                            ? pkg.color.text
                            : "rgba(255,255,255,0.2)",
                        }}
                      >
                        {pkg.index}
                      </span>
                    </div>
                    <span
                      className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em]"
                      style={{
                        background: isActive
                          ? pkg.color.soft
                          : "rgba(255,255,255,0.04)",
                        color: isActive
                          ? pkg.color.text
                          : "rgba(255,255,255,0.25)",
                        border: `1px solid ${isActive ? pkg.color.border : "rgba(255,255,255,0.07)"}`,
                      }}
                    >
                      {pkg.focus}
                    </span>
                  </div>

                  <h3
                    className="text-xl font-bold tracking-tight"
                    style={{
                      color: isActive ? "#fff" : "rgba(255,255,255,0.8)",
                    }}
                  >
                    {pkg.name}
                  </h3>

                  <p
                    className="text-sm font-semibold italic leading-snug"
                    style={{
                      color: isActive
                        ? pkg.color.text
                        : "rgba(255,255,255,0.35)",
                    }}
                  >
                    "{pkg.promise}"
                  </p>

                  <motion.div
                    initial={false}
                    animate={{
                      height: isActive ? "auto" : 0,
                      opacity: isActive ? 1 : 0,
                    }}
                    transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pt-1 text-sm leading-relaxed text-white/55">
                      {pkg.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {pkg.tools.map((t) => (
                        <span
                          key={t}
                          className="rounded-full px-2.5 py-1 text-[10px] font-bold"
                          style={{
                            background: pkg.color.soft,
                            color: pkg.color.text,
                            border: `0.5px solid ${pkg.color.border}`,
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    {/* ROI */}
                    <div className="mt-4 pt-4 border-t border-white/8">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Zap
                          className="h-3 w-3"
                          style={{ color: pkg.color.primary }}
                          strokeWidth={2.5}
                        />
                        <span
                          className="text-[9px] font-black uppercase tracking-[0.2em]"
                          style={{ color: pkg.color.text, opacity: 0.7 }}
                        >
                          Sistemsel Kazanım
                        </span>
                      </div>
                      <p
                        className="text-sm font-bold italic"
                        style={{ color: "rgba(255,255,255,0.75)" }}
                      >
                        <span style={{ color: pkg.color.text }}>
                          {pkg.roi.label}:
                        </span>{" "}
                        {pkg.roi.value}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* 5. paket — tam genişlik */}
        {(() => {
          const pkg = packages[4];
          const isActive = activeId === pkg.id;
          return (
            <motion.article
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.35,
                duration: 0.65,
                ease: [0.16, 1, 0.3, 1],
              }}
              onMouseEnter={() => setActiveId(pkg.id)}
              onMouseLeave={() => setActiveId(null)}
              className="relative mt-4 md:mt-5 overflow-hidden rounded-[1.75rem] border transition-all duration-500 cursor-default"
              style={{
                background: isActive
                  ? "rgba(8,8,20,0.98)"
                  : "rgba(255,255,255,0.025)",
                borderColor: isActive
                  ? pkg.color.border
                  : "rgba(255,255,255,0.07)",
                boxShadow: isActive ? `0 0 50px ${pkg.color.glow}` : "none",
              }}
            >
              <div
                className="pointer-events-none absolute inset-0 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(ellipse at 30% 50%, ${pkg.color.glow}, transparent 65%)`,
                  opacity: isActive ? 1 : 0,
                }}
              />
              <div className="relative grid grid-cols-1 gap-6 p-6 md:grid-cols-[1fr_1.5fr] md:gap-10 md:p-9">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      style={{
                        color: isActive
                          ? pkg.color.primary
                          : "rgba(255,255,255,0.3)",
                      }}
                    >
                      {pkg.icon}
                    </div>
                    <span
                      className="font-mono text-[11px] font-bold tracking-[0.2em]"
                      style={{ color: pkg.color.text }}
                    >
                      {pkg.index}
                    </span>
                    <span
                      className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em]"
                      style={{
                        background: pkg.color.soft,
                        color: pkg.color.text,
                        border: `0.5px solid ${pkg.color.border}`,
                      }}
                    >
                      {pkg.focus}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                      {pkg.name}
                    </h3>
                    <p
                      className="mt-2 text-sm font-semibold italic"
                      style={{ color: pkg.color.text }}
                    >
                      "{pkg.promise}"
                    </p>
                  </div>
                  <p className="text-sm leading-relaxed text-white/55">
                    {pkg.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {pkg.tools.map((t) => (
                      <span
                        key={t}
                        className="rounded-full px-2.5 py-1 text-[10px] font-bold"
                        style={{
                          background: pkg.color.soft,
                          color: pkg.color.text,
                          border: `0.5px solid ${pkg.color.border}`,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  {/* ROI */}
                  <div className="pt-4 border-t border-white/8">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Zap
                        className="h-3 w-3"
                        style={{ color: pkg.color.primary }}
                        strokeWidth={2.5}
                      />
                      <span
                        className="text-[9px] font-black uppercase tracking-[0.2em]"
                        style={{ color: pkg.color.text, opacity: 0.7 }}
                      >
                        Sistemsel Kazanım
                      </span>
                    </div>
                    <p
                      className="text-sm font-bold italic"
                      style={{ color: "rgba(255,255,255,0.75)" }}
                    >
                      <span style={{ color: pkg.color.text }}>
                        {pkg.roi.label}:
                      </span>{" "}
                      {pkg.roi.value}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {[
                    {
                      title: "Analiz & Karar",
                      desc: "AI ajanlar veriyi okur, özetler ve öneri üretir",
                    },
                    {
                      title: "İçerik Üretimi",
                      desc: "Otomatik teklif, rapor ve e-posta taslakları",
                    },
                    {
                      title: "Süreç Denetimi",
                      desc: "Hataları tespit eden, uyaran akıllı iş akışları",
                    },
                    {
                      title: "7/24 Operasyon",
                      desc: "Uyumayan dijital asistanlar, kesintisiz üretkenlik",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="rounded-xl border p-4"
                      style={{
                        background: isActive
                          ? "rgba(0,0,200,0.08)"
                          : "rgba(255,255,255,0.02)",
                        borderColor: isActive
                          ? "rgba(59,130,246,0.25)"
                          : "rgba(255,255,255,0.06)",
                      }}
                    >
                      <p className="text-[11px] font-black uppercase tracking-[0.15em] text-white/45 mb-1">
                        {item.title}
                      </p>
                      <p className="text-sm leading-snug text-white/60">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.article>
          );
        })()}

        {/* 100+ entegrasyon strip */}
        <Reveal delay={0.1}>
          <div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-7 py-5"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)",
              boxShadow: "inset 0 0.5px 0 rgba(255,255,255,0.08)",
            }}
          >
            <span
              className="text-3xl font-black shrink-0"
              style={{
                background:
                  "linear-gradient(135deg, #e8e8e8, #a0a0a0, #d0d0d0)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              100+
            </span>
            <div className="hidden sm:block h-8 w-px bg-white/10 shrink-0" />
            <p
              className="text-sm text-center sm:text-left leading-relaxed"
              style={{ color: "rgba(180,180,190,0.65)" }}
            >
              platform ve araçla entegrasyon —{" "}
              <span style={{ color: "rgba(210,210,220,0.85)" }}>
                Make.com, Zapier, HubSpot, Zoho, Google Workspace, WhatsApp
                Business, Slack
              </span>{" "}
              ve daha fazlası
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── SEKTÖREL SPOTLIGHT ── */
function SectorSpotlight() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-32 border-t border-white/5 bg-[#060609]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14 md:mb-20 text-center"
        >
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-5 py-2.5 mb-6">
            <span className="text-[11px] font-black uppercase tracking-[0.28em] text-white/50">
              Sektöre Özel Çözümler
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white">
            Sahada{" "}
            <span className="bg-gradient-to-r from-[#be29ec] to-[#0000c8] bg-clip-text text-transparent">
              Nasıl Çalışıyor?
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {sectorSpotlights.map((spot, i) => (
            <motion.div
              key={spot.sector}
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: i * 0.15,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative overflow-hidden rounded-3xl border"
              style={{ background: spot.color, borderColor: spot.border }}
            >
              {/* Üst başlık */}
              <div
                className="px-7 pt-7 pb-5 border-b"
                style={{ borderColor: spot.border }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{spot.icon}</span>
                  <div>
                    <p
                      className="text-[11px] font-black uppercase tracking-[0.22em]"
                      style={{ color: spot.accentColor }}
                    >
                      {spot.tag}
                    </p>
                    <h3 className="text-2xl font-bold text-white">
                      {spot.sector}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Metrikler */}
              <div
                className="grid grid-cols-3 border-b"
                style={{ borderColor: spot.border }}
              >
                {spot.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="px-5 py-5 text-center border-r last:border-r-0"
                    style={{ borderColor: spot.border }}
                  >
                    <div
                      className="text-3xl md:text-4xl font-black mb-1"
                      style={{ color: spot.accentColor }}
                    >
                      {m.value}
                    </div>
                    <div className="text-[11px] text-white/45 leading-tight whitespace-pre-line uppercase tracking-[0.1em]">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Önce / Sonra */}
              <div className="grid grid-cols-2 gap-0">
                {[spot.before, spot.after].map((col, ci) => (
                  <div
                    key={col.label}
                    className={`px-6 py-6 ${ci === 0 ? "border-r" : ""}`}
                    style={{ borderColor: spot.border }}
                  >
                    <p
                      className="text-[11px] font-black uppercase tracking-[0.2em] mb-4"
                      style={{
                        color:
                          ci === 0 ? "rgba(255,255,255,0.3)" : spot.accentColor,
                      }}
                    >
                      {col.label}
                    </p>
                    <ul className="space-y-2.5">
                      {col.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          {ci === 1 ? (
                            <Check
                              className="h-4 w-4 mt-0.5 shrink-0"
                              style={{ color: spot.accentColor }}
                              strokeWidth={2.5}
                            />
                          ) : (
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/20" />
                          )}
                          <span
                            className="text-sm leading-snug"
                            style={{
                              color:
                                ci === 1
                                  ? "rgba(255,255,255,0.75)"
                                  : "rgba(255,255,255,0.4)",
                            }}
                          >
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Kazanım özeti */}
              <div
                className="px-7 py-5 border-t"
                style={{ borderColor: spot.border }}
              >
                <p className="text-sm italic text-white/55 leading-relaxed">
                  <span
                    className="font-bold not-italic"
                    style={{ color: spot.accentColor }}
                  >
                    Sonuç:{" "}
                  </span>
                  {spot.kazanim}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── SÜREÇ ── */
function SistemSkoru() {
  const [step, setStep] = useState<"questions" | "score" | "email" | "done">(
    "questions",
  );
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [formError, setFormError] = useState("");
  const [score, setScore] = useState(0);
  const [displayScore, setDisplayScore] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const [submitting, setSubmitting] = useState(false);

  function scrollToCard() {
    setTimeout(() => {
      cardRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 80);
  }

  const questions = [
    {
      id: 0,
      text: "Araçlarınız birbiriyle otomatik konuşuyor mu?",
      sub: "CRM, e-posta, raporlama, WhatsApp — veri otomatik aktarılıyor mu?",
      options: [
        { label: "Evet, tam entegre", weight: 5 },
        { label: "Kısmen, bazıları bağlı", weight: 45 },
        { label: "Hayır, her şey manuel", weight: 90 },
      ],
    },
    {
      id: 1,
      text: "Manuel veri girişi haftada kaç saat?",
      sub: "Kopyala-yapıştır, Excel güncellemeleri, form doldurma dahil",
      options: [
        { label: "2 saatten az", weight: 10 },
        { label: "2–5 saat arası", weight: 45 },
        { label: "5 saatten fazla", weight: 85 },
      ],
    },
    {
      id: 2,
      text: "AI, operasyonunuzun hangi aşamasında?",
      sub: "Günlük iş süreçlerinizde yapay zeka kullanımı",
      options: [
        { label: "Sisteme entegre, aktif çalışıyor", weight: 5 },
        { label: "Sadece ChatGPT / sohbet", weight: 50 },
        { label: "Hiç kullanmıyoruz", weight: 88 },
      ],
    },
  ];

  const currentQ = questions.filter((q) => answers[q.id] === undefined)[0];
  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / questions.length) * 100;

  function handleAnswer(qId: number, weight: number) {
    const newAnswers = { ...answers, [qId]: weight };
    setAnswers(newAnswers);
    if (Object.keys(newAnswers).length === questions.length) {
      const avg = Math.round(
        Object.values(newAnswers).reduce((a, b) => a + b, 0) / questions.length,
      );
      setScore(avg);
      setTimeout(() => {
        setStep("score");
        // Count-up animasyonu
        let current = 0;
        const increment = avg / 40;
        const timer = setInterval(() => {
          current += increment;
          if (current >= avg) {
            setDisplayScore(avg);
            clearInterval(timer);
          } else {
            setDisplayScore(Math.round(current));
          }
        }, 30);
      }, 300);
    }
  }

  function getScoreLabel(s: number) {
    if (s >= 75)
      return {
        label: "Kritik Entropi",
        color: "#ef4444",
        desc: "Operasyonunuzda ciddi verimsizlik var.",
      };
    if (s >= 45)
      return {
        label: "Yüksek Entropi",
        color: "#f59e0b",
        desc: "Sistemleriniz potansiyelinin altında çalışıyor.",
      };
    if (s >= 20)
      return {
        label: "Orta Entropi",
        color: "#3b82f6",
        desc: "Temel altyapı mevcut ama boşluklar var.",
      };
    return {
      label: "Düşük Entropi",
      color: "#22c55e",
      desc: "Sisteminiz iyi durumda, optimize edebiliriz.",
    };
  }

  function getLeaks(s: number) {
    if (s >= 75) return 3;
    if (s >= 45) return 2;
    return 1;
  }

  function handleEmailSubmit() {
    if (!name.trim()) {
      setFormError("Ad Soyad zorunludur.");
      return;
    }
    if (!company.trim()) {
      setFormError("Şirket adı zorunludur.");
      return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormError("Geçerli bir e-posta adresi girin.");
      return;
    }
    setFormError("");
    setEmailError("");
    setSubmitting(true);

    // Cevapları okunabilir formata çevir
    const formattedAnswers = questions.map((q) => {
      const w = answers[q.id];
      const sel = q.options.find((o) => o.weight === w);
      return { question: q.text, answer: sel?.label ?? "" };
    });

    fetch("/api/sistem-skoru", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.trim(),
        company: company.trim(),
        phone: phone.trim(),
        email: email.trim(),
        score,
        scoreLabel: scoreInfo.label,
        leaks: getLeaks(score),
        answers: formattedAnswers,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setSubmitting(false);
        if (data.error) {
          setFormError(data.error);
        } else {
          setStep("done");
          scrollToCard();
        }
      })
      .catch(() => {
        setSubmitting(false);
        setFormError("Bağlantı hatası. Lütfen tekrar deneyin.");
      });
  }

  const scoreInfo = getScoreLabel(score);

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-28 border-t border-white/5 bg-[#060609] overflow-hidden"
    >
      {/* Ambient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(190,41,236,0.04),transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-2xl px-4 sm:px-6">
        {/* Başlık */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center rounded-full border border-brand-purple/30 bg-brand-purple/10 px-5 py-2 mb-5">
            <span className="text-[11px] font-black uppercase tracking-[0.28em] text-brand-purple">
              Ücretsiz Teşhis
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold uppercase italic tracking-tight text-white mb-3">
            Dijital Entropi{" "}
            <span className="bg-gradient-to-r from-[#be29ec] to-[#0000c8] bg-clip-text text-transparent">
              Skorunuz
            </span>
          </h2>
          <p className="text-base text-zinc-500 italic">
            3 soruda operasyonunuzdaki kayıpları tespit edin.
          </p>
        </motion.div>

        {/* Kart */}
        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="rounded-3xl border border-white/10 bg-white/[0.03] overflow-hidden"
          style={{ boxShadow: "0 0 60px rgba(190,41,236,0.06)" }}
        >
          {/* ── SORULAR ── */}
          {step === "questions" && currentQ && (
            <div className="p-7 md:p-10">
              {/* Progress */}
              <div className="flex items-center gap-3 mb-8">
                <div className="flex-1 h-1 rounded-full bg-white/8 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: "linear-gradient(90deg, #be29ec, #0000c8)",
                    }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </div>
                <span className="text-xs font-black font-mono text-white/30 shrink-0">
                  {answeredCount + 1} / {questions.length}
                </span>
              </div>

              {/* Soru */}
              <motion.div
                key={currentQ.id}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="text-xl md:text-2xl font-bold text-white mb-2 leading-snug">
                  {currentQ.text}
                </p>
                <p className="text-sm text-zinc-500 italic mb-8">
                  {currentQ.sub}
                </p>

                <div className="flex flex-col gap-3">
                  {currentQ.options.map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => handleAnswer(currentQ.id, opt.weight)}
                      className="group w-full text-left rounded-2xl border border-white/8 bg-white/[0.03] px-5 py-4 transition-all duration-250 hover:border-brand-purple/40 hover:bg-brand-purple/8 cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-4 w-4 rounded-full border-2 border-white/20 shrink-0 transition-all duration-250 group-hover:border-brand-purple group-hover:bg-brand-purple/30" />
                        <span className="text-base font-semibold text-white/80 group-hover:text-white transition-colors">
                          {opt.label}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          )}

          {/* ── SKOR ── */}
          {step === "score" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="p-7 md:p-10 text-center"
            >
              {/* Skor göstergesi */}
              <div className="relative inline-flex items-center justify-center mb-6">
                <svg width="160" height="160" viewBox="0 0 160 160">
                  {/* Arka plan halkası */}
                  <circle
                    cx="80"
                    cy="80"
                    r="66"
                    fill="none"
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="10"
                  />
                  {/* Skor halkası */}
                  <motion.circle
                    cx="80"
                    cy="80"
                    r="66"
                    fill="none"
                    stroke={scoreInfo.color}
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 66}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 66 }}
                    animate={{
                      strokeDashoffset: 2 * Math.PI * 66 * (1 - score / 100),
                    }}
                    transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
                    style={{
                      transform: "rotate(-90deg)",
                      transformOrigin: "80px 80px",
                    }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span
                    className="text-4xl font-black font-mono"
                    style={{ color: scoreInfo.color }}
                  >
                    %{displayScore}
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-[0.15em] text-white/40 mt-1">
                    entropi
                  </span>
                </div>
              </div>

              {/* Skor etiketi */}
              <div
                className="inline-flex items-center rounded-full px-4 py-1.5 mb-4"
                style={{
                  background: `${scoreInfo.color}15`,
                  border: `1px solid ${scoreInfo.color}40`,
                }}
              >
                <span
                  className="text-sm font-black uppercase tracking-[0.15em]"
                  style={{ color: scoreInfo.color }}
                >
                  {scoreInfo.label}
                </span>
              </div>

              <p className="text-lg font-bold text-white mb-1">
                Sisteminizde{" "}
                <span style={{ color: scoreInfo.color }}>
                  {getLeaks(score)} kritik sızıntı
                </span>{" "}
                tespit edildi.
              </p>
              <p className="text-sm text-zinc-500 italic mb-8">
                {scoreInfo.desc}
              </p>

              {/* Cevap özeti */}
              <div className="flex flex-col gap-2 mb-8 text-left">
                {questions.map((q, i) => {
                  const w = answers[q.id];
                  const sel = q.options.find((o) => o.weight === w);
                  return (
                    <div
                      key={q.id}
                      className="flex items-start gap-3 rounded-xl bg-white/[0.03] border border-white/6 px-4 py-3"
                    >
                      <span className="font-mono text-[10px] font-black text-white/25 mt-0.5 shrink-0">
                        {`0${i + 1}`}
                      </span>
                      <div>
                        <p className="text-xs text-white/40 leading-snug">
                          {q.text}
                        </p>
                        <p className="text-sm font-bold text-white/75">
                          {sel?.label}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => {
                  setStep("email");
                  scrollToCard();
                }}
                className="w-full rounded-2xl py-4 text-sm font-black uppercase tracking-[0.2em] text-white cursor-pointer transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-3"
                style={{
                  background: "linear-gradient(135deg, #be29ec, #0000c8)",
                  boxShadow: "0 0 30px rgba(190,41,236,0.3)",
                }}
              >
                Detaylı Analiz Raporu Al
                <ArrowRight className="h-4 w-4" />
              </button>
              <p className="mt-3 text-xs text-zinc-600 italic">
                Kişiselleştirilmiş rapor 1 iş günü içinde e-postanıza gelir.
              </p>
            </motion.div>
          )}

          {/* ── E-POSTA ── */}
          {step === "email" && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="p-7 md:p-10"
            >
              {/* Skor özeti */}
              <div
                className="flex items-center gap-3 mb-6 p-4 rounded-2xl border"
                style={{
                  background: `${scoreInfo.color}08`,
                  borderColor: `${scoreInfo.color}25`,
                }}
              >
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-black font-mono"
                  style={{
                    background: `${scoreInfo.color}15`,
                    border: `2px solid ${scoreInfo.color}40`,
                    color: scoreInfo.color,
                  }}
                >
                  %{score}
                </div>
                <div>
                  <p
                    className="text-xs font-black uppercase tracking-[0.12em]"
                    style={{ color: scoreInfo.color }}
                  >
                    {scoreInfo.label}
                  </p>
                  <p className="text-sm font-bold text-white">
                    {getLeaks(score)} kritik sızıntı tespit edildi
                  </p>
                </div>
              </div>

              <p className="text-base text-zinc-400 leading-relaxed mb-6">
                Sisteminizi analiz edip size özel bir{" "}
                <strong className="text-white font-bold">
                  Dijital Operasyon Raporu
                </strong>{" "}
                hazırlayalım. Bilgilerinizi paylaşın, 1 iş günü içinde dönelim.
              </p>

              <div className="flex flex-col gap-3">
                {/* Ad Soyad */}
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ad Soyad *"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-base text-white placeholder:text-white/25 outline-none focus:border-brand-purple/50 focus:bg-white/8 transition-all"
                />
                {/* Şirket */}
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Şirket / Marka Adı *"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-base text-white placeholder:text-white/25 outline-none focus:border-brand-purple/50 focus:bg-white/8 transition-all"
                />
                {/* E-posta + Telefon yan yana */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleEmailSubmit()}
                    placeholder="E-posta *"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-base text-white placeholder:text-white/25 outline-none focus:border-brand-purple/50 focus:bg-white/8 transition-all"
                  />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Telefon (isteğe bağlı)"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-base text-white placeholder:text-white/25 outline-none focus:border-brand-purple/50 focus:bg-white/8 transition-all"
                  />
                </div>

                {/* Hata mesajı */}
                {(formError || emailError) && (
                  <p className="text-sm text-red-400 px-1">
                    {formError || emailError}
                  </p>
                )}

                <button
                  onClick={handleEmailSubmit}
                  disabled={submitting}
                  className="w-full rounded-2xl py-4 text-sm font-black uppercase tracking-[0.2em] text-white cursor-pointer transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                  style={{
                    background: "linear-gradient(135deg, #be29ec, #0000c8)",
                    boxShadow: "0 0 30px rgba(190,41,236,0.3)",
                  }}
                >
                  {submitting ? "Gönderiliyor..." : "Raporu Talep Et"}
                </button>
              </div>

              <p className="mt-4 text-xs text-zinc-600 italic text-center">
                Bilgileriniz yalnızca analiz amacıyla kullanılır. Spam
                gönderilmez.
              </p>
            </motion.div>
          )}

          {/* ── TEŞEKKÜR ── */}
          {step === "done" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="p-7 md:p-10 text-center"
            >
              <motion.div
                className="inline-flex h-16 w-16 items-center justify-center rounded-full mb-6"
                style={{
                  background: "rgba(190,41,236,0.15)",
                  border: "2px solid rgba(190,41,236,0.5)",
                }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Check
                  className="h-7 w-7 text-brand-purple"
                  strokeWidth={2.5}
                />
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Raporunuz Yolda
              </h3>
              <p className="text-base text-zinc-500 italic mb-2">
                Merhaba{" "}
                <strong className="text-white/80 not-italic">{name}</strong>,
              </p>
              <p className="text-base text-zinc-500 italic mb-6">
                <strong className="text-white/70 not-italic">{company}</strong>{" "}
                için dijital operasyon analizi hazırlanacak.{" "}
                <strong className="text-white/70 not-italic">{email}</strong>{" "}
                adresine 1 iş günü içinde gönderilecek.
              </p>

              <div
                className="inline-flex items-center rounded-full px-5 py-2 mb-8"
                style={{
                  background: `${scoreInfo.color}12`,
                  border: `1px solid ${scoreInfo.color}30`,
                }}
              >
                <span
                  className="text-sm font-black"
                  style={{ color: scoreInfo.color }}
                >
                  Dijital Entropi Skoru: %{score} · {scoreInfo.label}
                </span>
              </div>

              {/* WhatsApp CTA */}
              <div className="border-t border-white/8 pt-7">
                <p className="text-sm text-zinc-500 italic mb-4">
                  Hızlıca görüşmek ister misiniz?
                </p>
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "905425658010"}?text=${encodeURIComponent(`Merhaba, dijital operasyon analiz formunu doldurdum. Entropi skoruma (%${score}) ilişkin bilgi almak istiyorum. İsim: ${name} / Şirket: ${company}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-full px-7 py-4 text-sm font-black uppercase tracking-[0.16em] text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(37,211,102,0.3)]"
                  style={{
                    background: "linear-gradient(135deg, #128c7e, #25d366)",
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp ile Hemen Yazın
                </a>
                <p className="mt-3 text-xs text-zinc-600 italic">
                  Genellikle birkaç dakika içinde yanıt veriyoruz.
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

/* ── SÜREÇ ── */
function Process() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-32 border-t border-white/5 bg-[#020204]"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12 md:mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight text-white">
            Sürecimiz
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-[19px] top-0 hidden h-full w-px bg-gradient-to-b from-white/5 via-brand-purple/20 to-white/5 md:block" />
          <div className="space-y-5">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -16 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  delay: i * 0.1,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative grid grid-cols-1 gap-4 rounded-2xl border border-white/8 bg-white/[0.025] p-6 transition-all duration-300 hover:border-brand-purple/25 hover:bg-white/[0.05] md:grid-cols-[56px_1fr] md:gap-6 md:p-8"
              >
                <div className="relative z-10 flex md:flex-col items-center gap-3 md:gap-2">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-brand-dark text-brand-blue transition-all duration-300 group-hover:border-brand-blue/30 group-hover:bg-brand-blue/10">
                    {step.icon}
                  </div>
                  <span className="text-[11px] font-bold tracking-[0.22em] text-white/25 md:text-center">
                    {step.step}
                  </span>
                </div>
                <div>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-brand-blue">
                      {step.title}
                    </h3>
                    <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-bold text-white/40">
                      {step.duration}
                    </span>
                  </div>
                  <p className="text-base leading-relaxed text-white/55">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── FINAL CTA ── */
function FinalCTA() {
  return (
    <section className="relative py-24 md:py-40 overflow-hidden bg-[#020204]">
      <div className="absolute inset-0 z-0 opacity-15">
        <Image
          src="/img/hizmetler/dijital-operasyon/system-core.webp"
          alt=""
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020204] via-[#020204]/55 to-[#020204]" />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] md:rounded-[4rem] border border-white/8 bg-gradient-to-b from-white/[0.04] to-transparent p-10 md:p-20 text-center">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-brand-purple/5 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-brand-blue/5 blur-[80px] rounded-full pointer-events-none" />

            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-brand-purple mb-6 italic">
              Bir Sonraki Adım
            </p>

            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase italic tracking-[-0.02em] leading-[0.9] mb-8 relative z-10">
              DİJİTAL OPERASYON
              <br />
              <span className="text-white/15">ANALİZİNİZİ</span>
              <br />
              BAŞLATALIM.
            </h2>

            <p className="mx-auto max-w-xl text-base md:text-lg text-zinc-500 italic mb-10 relative z-10">
              Mevcut araçlarınızı, süreçlerinizi ve boşluklarınızı
              haritalandırıp size özel bir dijital operasyon yol haritası
              çıkaralım.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <ShimmerButton
                href="/iletisim#analiz"
                size="lg"
                className="uppercase tracking-[0.3em] font-black"
              >
                Ücretsiz Analiz Talep Et
                <ArrowRight className="h-4 w-4" />
              </ShimmerButton>
            </div>

            <p className="mt-6 text-sm text-zinc-600 italic relative z-10">
              1 iş günü içinde yanıt · Ücretsiz · Bağlayıcı değil
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   ANA EXPORT
───────────────────────────────────────────────────────────────────────────── */

export default function DijitalOperasyonClient() {
  return (
    <main className="bg-[#020204] text-white overflow-x-hidden font-sans relative selection:bg-brand-purple selection:text-white">
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-brand-blue/[0.03] blur-[15vw] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-brand-purple/[0.03] blur-[15vw] rounded-full" />
      </div>
      <div className="relative z-10">
        <Hero />
        <Manifesto />
        <MaturityLevel />
        <Packages />
        <SectorSpotlight />
        <Process />
        <SistemSkoru />
        <FinalCTA />
      </div>
    </main>
  );
}
