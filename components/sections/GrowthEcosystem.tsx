"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";

/* ─────────────────────────────────────────────
   Hizmet verisi — SEO odaklı anahtar kelimeler
───────────────────────────────────────────── */
const PILLARS = [
  {
    id: "ppc",
    index: "01",
    title: "PPC ve Performans Pazarlama",
    shortTitle: "Performans",
    keyword: "Google Ads & Meta Ads Yönetimi",
    desc: "Daha fazla nitelikli trafik, daha düşük edinim maliyeti. Google Ads ve Meta Ads kampanyalarını dönüşüm odaklı kurgular ve sürekli optimizasyonla yönetiyoruz.",
    href: "/cozumler/ppc-performans-pazarlama",
    bullets: [
      "Google Ads arama ve alışveriş kampanyaları",
      "Meta Ads hedefleme ve yaratıcı optimizasyon",
      "Yeniden pazarlama ve lookalike kurgular",
      "Bütçe verimliliği ve ROAS optimizasyonu",
    ],
    stack: ["Google Ads", "Meta Ads", "GA4", "GTM"],
    cta: "Performans Reklamcılığını İncele",
    color: {
      primary: "#be29ec",
      glow: "rgba(190,41,236,0.18)",
      border: "rgba(190,41,236,0.35)",
      text: "#d8b4fe",
      soft: "rgba(190,41,236,0.08)",
    },
    weakness: "Reklam harcıyorum ama dönüşüm göremiyorum",
    schemaName: "PPC ve Performans Pazarlama Hizmeti",
  },
  {
    id: "web",
    index: "02",
    title: "Web Sitesi, SEO ve Dönüşüm Altyapısı",
    shortTitle: "Altyapı",
    keyword: "Teknik SEO & Dönüşüm Odaklı Web Sitesi",
    desc: "Arama motorlarında görünür, hızlı yüklenen ve ziyaretçiyi müşteriye dönüştüren web sitesi ve teknik SEO altyapısı kuruyoruz.",
    href: "/cozumler/web-seo-donusum",
    bullets: [
      "Dönüşüm odaklı web sitesi ve landing page tasarımı",
      "Teknik SEO: Core Web Vitals, schema, site mimarisi",
      "GA4 + GTM ölçüm ve dönüşüm izleme altyapısı",
      "E-ticaret ve hizmet sitesi için SEO içerik stratejisi",
    ],
    stack: ["Next.js", "Search Console", "Core Web Vitals", "Schema.org"],
    cta: "Web & SEO Altyapısını İncele",
    color: {
      primary: "#3b82f6",
      glow: "rgba(59,130,246,0.18)",
      border: "rgba(59,130,246,0.35)",
      text: "#93c5fd",
      soft: "rgba(59,130,246,0.08)",
    },
    weakness: "Web sitem var ama Google'da görünmüyorum",
    schemaName: "Web Sitesi ve SEO Hizmeti",
  },
  {
    id: "marka",
    index: "03",
    title: "Marka & Görsel İletişim",
    shortTitle: "Marka",
    keyword: "Kurumsal Kimlik & Dijital Marka Tasarımı",
    desc: "Markanızı rakiplerden ayıran, güven oluşturan ve akılda kalan görsel kimlik ve iletişim sistemi tasarlıyoruz.",
    href: "/cozumler/marka-gorsel-iletisim",
    bullets: [
      "Kurumsal kimlik ve logo tasarımı",
      "Dijital UI sistemi ve görsel dil rehberi",
      "Sosyal medya görsel iletişim şablonları",
      "Sunum ve teklif tasarımı",
    ],
    stack: ["Figma", "Adobe", "Canva Pro", "Meta"],
    cta: "Marka & Tasarım Hizmetini İncele",
    color: {
      primary: "#2dd4bf",
      glow: "rgba(45,212,191,0.18)",
      border: "rgba(45,212,191,0.35)",
      text: "#5eead4",
      soft: "rgba(45,212,191,0.08)",
    },
    weakness: "Rakiplerimden görsel olarak ayrışamıyorum",
    schemaName: "Marka ve Görsel İletişim Hizmeti",
  },
  {
    id: "ops",
    index: "04",
    title: "Dijital Operasyon Sistemi",
    shortTitle: "Operasyon",
    keyword: "Bulut Altyapısı & İş Süreci Otomasyonu",
    desc: "Dağınık araçlar, kopyala-yapıştır süreçler, kayıp bilgiler. İşletmenizin tüm dijital operasyonunu — iletişimden müşteri yönetimine, dosya paylaşımından otomasyon akışlarına — birbirine bağlı, otomatik çalışan bir sisteme dönüştürüyoruz.",
    href: "/cozumler/dijital-operasyon-sistemi",
    bullets: [
      "Google Workspace kurulum, yapılandırma ve ekip eğitimi",
      "CRM & müşteri iletişim sistemi (Zoho, Zendesk)",
      "Süreç otomasyonu: Make, Zapier, WhatsApp bot & AI yanıt",
      "AI destekli iş akışları: form → döküman, otomatik raporlama",
    ],
    stack: ["Google Workspace", "Make", "Zoho", "Zendesk", "ChatGPT", "Zapier"],
    cta: "Dijital Operasyon Sistemini İncele",
    color: {
      primary: "#3b82f6",
      glow: "rgba(0,0,200,0.2)",
      border: "rgba(59,130,246,0.4)",
      text: "#93c5fd",
      soft: "rgba(0,0,200,0.1)",
    },
    weakness: "Ekibim hâlâ manuel süreçlerle vakit kaybediyor",
    schemaName: "Dijital Operasyon ve İş Süreci Otomasyonu Hizmeti",
    subServices: [
      {
        label: "İş Araçları & Bulut Kurulumu",
        icon: "☁️",
        highlight: false,
        desc: "Google Workspace, kurumsal e-posta, ortak takvim ve döküman sistemi",
        items: [
          "Gmail & Google Drive ekip kurulumu",
          "Google Meet & Calendar entegrasyonu",
          "Dosya yetkilendirme ve güvenlik politikaları",
          "Uzaktan çalışma altyapısı",
        ],
        badge: null,
      },
      {
        label: "Süreç & Akış Otomasyonu",
        icon: "⚡",
        highlight: false,
        desc: "Make / Zapier ile tekrarlayan işleri otomatikleştir, insan hatasını sıfırla",
        items: [
          "Form → CRM → bildirim otomatik akışı",
          "Fatura & teklif oluşturma otomasyonu",
          "Sosyal medya & içerik planlama akışları",
          "WhatsApp Business otomatik yanıt sistemi",
        ],
        badge: null,
      },
      {
        label: "CRM & Müşteri İletişim Sistemi",
        icon: "🤝",
        highlight: false,
        desc: "Zoho, Zendesk ve entegre iletişim kanallarıyla müşteri takibini otomatize et",
        items: [
          "Satış hattı ve müşteri adayı takibi",
          "Destek talebi yönetimi (Zendesk)",
          "E-posta & SMS pazarlama otomasyonu",
          "Müşteri segmentasyonu ve raporlama",
        ],
        badge: null,
      },
      {
        label: "AI Destekli İş Akışları",
        icon: "✦",
        highlight: true,
        desc: "Yapay zeka işletmenizin içinde çalışsın — içerik üretsin, soruları yanıtlasın, kararları hızlandırsın",
        items: [
          "GPT destekli WhatsApp & web chat botu",
          "Otomatik içerik ve teklif hazırlama",
          "AI ile müşteri taleplerini sınıflandırma",
          "Sesli asistan & randevu yönetim sistemi",
        ],
        badge: "YENİ NESİL",
      },
    ],
  },
] as const;

/* ─────────────────────────────────────────────
   JSON-LD Schema
───────────────────────────────────────────── */
const schemaData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Premium Dijital Büyüme Hizmetleri",
  description:
    "Dijital büyüme için bütünleşik hizmet ekosistemi: PPC, SEO, web sitesi, marka ve dijital operasyon sistemi",
  url: "https://premiumdijital.com/#hizmetler",
  itemListElement: PILLARS.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: p.schemaName,
      description: p.desc,
      url: `https://premiumdijital.com${p.href}`,
      provider: {
        "@type": "Organization",
        name: "Premium Dijital",
        url: "https://premiumdijital.com",
      },
      areaServed: "TR",
      serviceType: p.keyword,
    },
  })),
};

/* ─────────────────────────────────────────────
   Bağlantı çizgisi — SVG canvas
───────────────────────────────────────────── */
function ConnectorCanvas({ activeId }: { activeId: string | null }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      const p = canvas.parentElement;
      if (!p) return;
      const r = p.getBoundingClientRect();
      canvas.width = r.width;
      canvas.height = r.height;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);

    const draw = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const t = ts - startRef.current;
      const W = canvas.width,
        H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // 3 node merkezi: sol, orta, sağ — yatay yerleşim
      const nodes = [
        { x: W * 0.17, y: H * 0.5 },
        { x: W * 0.5, y: H * 0.5 },
        { x: W * 0.83, y: H * 0.5 },
      ];
      const pairs: [number, number][] = [
        [0, 1],
        [1, 2],
      ];

      pairs.forEach(([ai, bi]) => {
        const a = nodes[ai],
          b = nodes[bi];
        const pA = PILLARS[ai],
          pB = PILLARS[bi];
        const isActive = activeId === pA.id || activeId === pB.id;

        // Ana çizgi — aktif: brand gradient %60, pasif: beyaz %6
        const lg = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
        if (isActive) {
          lg.addColorStop(0, "rgba(190,41,236,0.6)");
          lg.addColorStop(1, "rgba(0,0,200,0.6)");
        } else {
          lg.addColorStop(0, "rgba(255,255,255,0.06)");
          lg.addColorStop(1, "rgba(255,255,255,0.06)");
        }
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = lg;
        ctx.lineWidth = isActive ? 1.8 : 0.8;
        ctx.setLineDash(isActive ? [] : [4, 8]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Akan nokta — aktif: r:4 parlak, pasif: r:2.5 subtle
        if (!prefersReduced) {
          const phase = ai * 0.33;
          const prog = (t * 0.00045 + phase) % 1;
          const px = a.x + (b.x - a.x) * prog;
          const py = a.y + (b.y - a.y) * prog;
          ctx.beginPath();
          ctx.arc(px, py, isActive ? 4 : 2.5, 0, Math.PI * 2);
          ctx.fillStyle = isActive
            ? "rgba(190,41,236,0.85)"
            : "rgba(255,255,255,0.5)";
          ctx.fill();
        }
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [activeId, prefersReduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}

/* ─────────────────────────────────────────────
   Kart ikonları — SVG, 16×16, stroke-only
───────────────────────────────────────────── */
const PILLAR_ICONS: Record<string, React.ReactNode> = {
  ppc: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2 12L6 8L9 11L14 4" stroke="#be29ec" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 4h4v4" stroke="#0000c8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  web: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M5 4L2 8L5 12" stroke="#93c5fd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 4L14 8L11 12" stroke="#93c5fd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.5 3L6.5 13" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  marka: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 1.5L9.6 6.2H14.5L10.5 9L12 13.5L8 10.8L4 13.5L5.5 9L1.5 6.2H6.4L8 1.5Z" stroke="#5eead4" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

/* ─────────────────────────────────────────────
   Hizmet kartı
───────────────────────────────────────────── */
function PillarCard({
  pillar,
  index,
  isActive,
  onEnter,
  onLeave,
  isMobile,
}: {
  pillar: (typeof PILLARS)[number];
  index: number;
  isActive: boolean;
  onEnter: () => void;
  onLeave: () => void;
  isMobile: boolean;
}) {
  const [tapped, setTapped] = useState(false);
  const prefersReduced = useReducedMotion();

  const handleTap = () => {
    if (isMobile) setTapped((t) => !t);
  };

  const expanded = isMobile ? tapped : isActive;

  return (
    <motion.article
      initial={{ opacity: 0, y: prefersReduced ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        delay: index * 0.1,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={handleTap}
      aria-expanded={expanded}
      itemScope
      itemType="https://schema.org/Service"
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-[1.75rem] border transition-all duration-500 md:rounded-[2rem]"
      style={{
        background: expanded ? `rgba(8,8,20,0.98)` : "rgba(255,255,255,0.03)",
        borderColor: expanded ? pillar.color.border : "rgba(255,255,255,0.08)",
        boxShadow: expanded
          ? `0 0 40px ${pillar.color.glow}, 0 0 0 0.5px ${pillar.color.border}`
          : "none",
      }}
    >
      {/* Glow arka plan */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${pillar.color.glow}, transparent 70%)`,
          opacity: expanded ? 1 : 0,
        }}
      />

      <div className="relative flex flex-col gap-4 p-5 sm:p-6 md:p-7">
        {/* Üst satır: ikon + numara + keyword rozeti */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {PILLAR_ICONS[pillar.id]}
            <span
              className="font-mono text-[11px] font-bold tracking-[0.2em]"
              style={{
                color: expanded ? pillar.color.text : "rgba(255,255,255,0.2)",
              }}
            >
              {pillar.index}
            </span>
          </div>
          <span
            className="rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.15em] transition-all duration-300"
            style={{
              background: expanded
                ? pillar.color.soft
                : "rgba(255,255,255,0.04)",
              color: expanded ? pillar.color.text : "rgba(255,255,255,0.3)",
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: expanded
                ? pillar.color.border
                : "rgba(255,255,255,0.07)",
            }}
          >
            {pillar.keyword}
          </span>
        </div>

        {/* Başlık */}
        <div>
          <h3
            className="text-lg font-bold leading-tight tracking-tight sm:text-xl md:text-2xl"
            style={{ color: expanded ? "#fff" : "rgba(255,255,255,0.75)" }}
            itemProp="name"
          >
            {pillar.title}
          </h3>
          {/* Zayıflık sinyali — kullanıcının kendini tanıması */}
          <p
            className="mt-2 text-xs font-semibold italic leading-snug sm:text-[13px]"
            style={{
              color: expanded ? pillar.color.text : "rgba(255,255,255,0.35)",
            }}
          >
            "{pillar.weakness}"
          </p>
        </div>

        {/* Açıklama */}
        <p
          className="text-sm leading-relaxed"
          style={{ color: "rgba(255,255,255,0.55)" }}
          itemProp="description"
        >
          {pillar.desc}
        </p>

        {/* Genişleyen içerik */}
        <motion.div
          initial={false}
          animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
          <ul
            className="space-y-2.5 pt-1"
            role="list"
            aria-label={`${pillar.title} hizmet detayları`}
          >
            {pillar.bullets.map((b) => (
              <li
                key={b}
                className="flex items-start gap-2.5 text-[13px] leading-relaxed"
                style={{ color: "rgba(255,255,255,0.7)" }}
              >
                <span
                  aria-hidden="true"
                  className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{
                    background: pillar.color.primary,
                    boxShadow: `0 0 6px ${pillar.color.primary}`,
                  }}
                />
                {b}
              </li>
            ))}
          </ul>

          {/* Stack rozetleri */}
          <div
            className="mt-4 flex flex-wrap gap-1.5"
            role="list"
            aria-label="Kullanılan teknolojiler"
          >
            {pillar.stack.map((s) => (
              <span
                key={s}
                role="listitem"
                className="rounded-full px-2.5 py-1 text-[10px] font-bold"
                style={{
                  background: pillar.color.soft,
                  color: pillar.color.text,
                  border: `0.5px solid ${pillar.color.border}`,
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <div className="mt-auto pt-1">
          <Link
            href={pillar.href}
            onClick={(e) => e.stopPropagation()}
            aria-label={`${pillar.title} hakkında detaylı bilgi al`}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-bold transition-all duration-300 sm:px-5 sm:text-sm"
            style={{
              background: expanded
                ? pillar.color.soft
                : "rgba(255,255,255,0.04)",
              color: expanded ? pillar.color.text : "rgba(255,255,255,0.4)",
              border: `1px solid ${expanded ? pillar.color.border : "rgba(255,255,255,0.08)"}`,
            }}
            itemProp="url"
          >
            <span>{pillar.cta}</span>
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

/* ─────────────────────────────────────────────
   Ana bileşen
───────────────────────────────────────────── */
export default function GrowthEcosystem() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const autoRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const userRef = useRef(false);
  const indexRef = useRef(0);
  const prefersReduced = useReducedMotion();

  // Mobil tespiti
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  // Auto-tour — masaüstünde
  const startTour = useCallback(() => {
    if (isMobile) return;
    const tick = () => {
      if (userRef.current) return;
      setActiveId(PILLARS[indexRef.current % PILLARS.length].id);
      indexRef.current++;
      autoRef.current = setTimeout(tick, 2800);
    };
    autoRef.current = setTimeout(tick, 1500);
  }, [isMobile]);

  const stopTour = useCallback(() => {
    if (autoRef.current) clearTimeout(autoRef.current);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    startTour();
    return () => stopTour();
  }, [isMobile, startTour, stopTour]);

  const handleEnter = (id: string) => {
    if (isMobile) return;
    userRef.current = true;
    stopTour();
    setActiveId(id);
  };

  const handleLeave = () => {
    if (isMobile) return;
    setActiveId(null);
    autoRef.current = setTimeout(() => {
      userRef.current = false;
      startTour();
    }, 2500);
  };

  return (
    <section
      id="hizmetler"
      aria-label="Dijital büyüme hizmetleri"
      className="relative overflow-hidden bg-[#060609] px-4 py-16 sm:px-5 sm:py-20 md:px-6 md:py-28"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Arka plan */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_60%,rgba(0,0,180,0.06),transparent_70%)]" />
        {/* Izgara doku */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* ── Başlık ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 text-center md:mb-16"
        >
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-white/60">
              Dijital Büyüme Sistemi
            </span>
          </div>

          <h2
            className="mt-5 text-4xl font-bold uppercase tracking-tight text-white sm:text-5xl md:text-6xl"
            itemProp="name"
          >
            Parçalar Değil,{" "}
            <span className="bg-gradient-to-r from-[#be29ec] to-[#0000c8] bg-clip-text text-transparent">
              Sistem
            </span>
          </h2>

          <p
            className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/45 sm:text-base"
            itemProp="description"
          >
            Reklam, altyapı, marka ve dijital operasyon — birbirini besleyen
            dört katman. Zayıf halkayı tespit et, oradan güçlendir. Sistem
            bütünleşince büyüme ivme kazanır.
          </p>
        </motion.div>

        {/* ── "Sistem" vizueli + kartlar ── */}
        <div className="relative">
          {/* Bağlantı çizgisi — sadece masaüstünde */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-1/2 hidden h-px -translate-y-1/2 md:block"
            style={{ height: 120, top: "calc(50% - 60px)" }}
          >
            <ConnectorCanvas activeId={activeId} />
          </div>

          {/* Üst 3 kart — min-height sabit, 4. kart kaymasın */}
          <div
            className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3 md:gap-6 xl:gap-8"
            style={{ minHeight: "min(520px, 60vw)" }}
            role="list"
            aria-label="Hizmet kategorileri"
          >
            {PILLARS.slice(0, 3).map((pillar, i) => (
              <div key={pillar.id} role="listitem">
                <PillarCard
                  pillar={pillar}
                  index={i}
                  isActive={activeId === pillar.id}
                  onEnter={() => handleEnter(pillar.id)}
                  onLeave={handleLeave}
                  isMobile={isMobile}
                />
              </div>
            ))}
          </div>

          {/* 4. kart — tam genişlik, asimetrik */}
          {(() => {
            const ops = PILLARS[3];
            const isActive = activeId === ops.id;
            return (
              <motion.article
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{
                  delay: 0.15,
                  duration: 0.65,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onMouseEnter={() => handleEnter(ops.id)}
                onMouseLeave={handleLeave}
                aria-expanded={isActive}
                itemScope
                itemType="https://schema.org/Service"
                className="group relative mt-8 cursor-pointer overflow-hidden rounded-[1.75rem] border transition-all duration-500 sm:mt-10 md:mt-12 md:rounded-[2rem] xl:mt-14"
                style={{
                  background: isActive
                    ? "rgba(8,8,20,0.98)"
                    : "rgba(255,255,255,0.03)",
                  borderColor: isActive
                    ? ops.color.border
                    : "rgba(255,255,255,0.08)",
                  boxShadow: isActive
                    ? `0 0 50px ${ops.color.glow}, 0 0 0 0.5px ${ops.color.border}`
                    : "none",
                }}
              >
                {/* Glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(ellipse at 30% 50%, ${ops.color.glow}, transparent 65%)`,
                    opacity: isActive ? 1 : 0,
                  }}
                />

                {/* "YENİ" rozeti */}
                <div
                  className="absolute right-5 top-5 rounded-full px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.2em]"
                  style={{
                    background: ops.color.soft,
                    color: ops.color.text,
                    border: `0.5px solid ${ops.color.border}`,
                  }}
                >
                  Yeni Hizmet
                </div>

                <div className="relative grid grid-cols-1 gap-6 p-5 sm:p-6 md:grid-cols-[1fr_1.2fr] md:gap-10 md:p-8 lg:p-10">
                  {/* Sol: başlık + açıklama + CTA */}
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <circle cx="8" cy="8" r="2.5" stroke="#93c5fd" strokeWidth="1.2" />
                        <path d="M8 1.5V3M8 13v1.5M1.5 8H3M13 8h1.5M3.4 3.4l1.1 1.1M11.5 11.5l1.1 1.1M12.6 3.4l-1.1 1.1M4.5 11.5l-1.1 1.1" stroke="#93c5fd" strokeWidth="1.2" strokeLinecap="round" />
                      </svg>
                      <span
                        className="font-mono text-[11px] font-bold tracking-[0.2em]"
                        style={{ color: ops.color.text }}
                      >
                        {ops.index}
                      </span>
                      <span
                        className="rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em]"
                        style={{
                          background: ops.color.soft,
                          color: ops.color.text,
                          border: `0.5px solid ${ops.color.border}`,
                        }}
                      >
                        {ops.keyword}
                      </span>
                    </div>

                    <div>
                      <h3
                        className="text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl md:text-4xl"
                        itemProp="name"
                      >
                        {ops.title}
                      </h3>
                      <p
                        className="mt-2 text-xs font-semibold italic sm:text-[13px]"
                        style={{ color: ops.color.text }}
                      >
                        "{ops.weakness}"
                      </p>
                    </div>

                    <p
                      className="text-sm leading-relaxed text-white/55 sm:text-base"
                      itemProp="description"
                    >
                      {ops.desc}
                    </p>

                    {/* Stack */}
                    <div className="flex flex-wrap gap-1.5">
                      {ops.stack.map((s) => (
                        <span
                          key={s}
                          className="rounded-full px-2.5 py-1 text-[10px] font-bold"
                          style={{
                            background: ops.color.soft,
                            color: ops.color.text,
                            border: `0.5px solid ${ops.color.border}`,
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={ops.href}
                      aria-label={`${ops.title} hakkında detaylı bilgi al`}
                      className="mt-auto inline-flex w-fit items-center gap-2 rounded-full px-5 py-3 text-xs font-bold transition-all duration-300 sm:text-sm"
                      style={{
                        background: isActive
                          ? ops.color.soft
                          : "rgba(255,255,255,0.05)",
                        color: isActive
                          ? ops.color.text
                          : "rgba(255,255,255,0.4)",
                        border: `1px solid ${isActive ? ops.color.border : "rgba(255,255,255,0.08)"}`,
                      }}
                      itemProp="url"
                    >
                      <span>{ops.cta}</span>
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>

                  {/* Sağ: 2×2 alt hizmet grid */}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {"subServices" in ops &&
                      ops.subServices.map((sub, subIdx) => (
                        <motion.div
                          key={sub.label}
                          className="relative flex flex-col gap-2.5 overflow-hidden rounded-xl border p-4"
                          animate={
                            !prefersReduced
                              ? {
                                  boxShadow: sub.highlight
                                    ? [
                                        "0 0 24px rgba(0,0,200,0.2), inset 0 0 20px rgba(190,41,236,0.06)",
                                        "0 0 40px rgba(190,41,236,0.35), inset 0 0 28px rgba(0,0,200,0.15)",
                                        "0 0 24px rgba(0,0,200,0.2), inset 0 0 20px rgba(190,41,236,0.06)",
                                      ]
                                    : [
                                        "0 0 0px rgba(255,255,255,0)",
                                        "0 0 10px rgba(255,255,255,0.05)",
                                        "0 0 0px rgba(255,255,255,0)",
                                      ],
                                }
                              : {}
                          }
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: subIdx * 0.75,
                            ease: "easeInOut",
                          }}
                          style={{
                            background: sub.highlight
                              ? `linear-gradient(135deg, rgba(0,0,200,0.22), rgba(190,41,236,0.16))`
                              : "rgba(255,255,255,0.03)",
                            borderColor: sub.highlight
                              ? "rgba(147,197,253,0.5)"
                              : "rgba(255,255,255,0.08)",
                          }}
                        >
                          {/* Badge — AI kartında */}
                          {sub.badge && (
                            <span className="absolute right-3 top-3 rounded-full bg-gradient-to-r from-[#be29ec] to-[#0000c8] px-2 py-0.5 text-[8px] font-black uppercase tracking-[0.15em] text-white">
                              {sub.badge}
                            </span>
                          )}

                          {/* Başlık */}
                          <div className="flex items-center gap-2 pr-16">
                            <span className="text-base leading-none">
                              {sub.icon}
                            </span>
                            <span
                              className="text-[12px] font-bold uppercase tracking-[0.1em]"
                              style={{
                                color: sub.highlight
                                  ? "#c4b5fd"
                                  : ops.color.text,
                              }}
                            >
                              {sub.label}
                            </span>
                          </div>

                          {/* Açıklama */}
                          <p className="text-[12px] leading-relaxed text-white/55">
                            {sub.desc}
                          </p>

                          {/* Bullet listesi */}
                          <ul className="space-y-1.5">
                            {sub.items.map((item) => (
                              <li
                                key={item}
                                className="flex items-start gap-1.5 text-[12px] leading-snug text-white/65"
                              >
                                <span
                                  className="mt-[5px] h-1 w-1 shrink-0 rounded-full"
                                  style={{
                                    background: sub.highlight
                                      ? "#a78bfa"
                                      : ops.color.primary,
                                    boxShadow: sub.highlight
                                      ? "0 0 4px #a78bfa"
                                      : `0 0 3px ${ops.color.primary}`,
                                  }}
                                />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      ))}
                  </div>
                </div>
              </motion.article>
            );
          })()}
        </div>

        {/* ── Sistem mesajı ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-14 md:mt-18"
        >
          {/* Ayırıcı çizgi */}
          <div className="mb-10 flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">
              Sistem Yaklaşımı
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>

          {/* 3 sütun — sistem farkı */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
            {[
              {
                stat: "Tek Sistem",
                label: "4 ayrı ajans değil",
                desc: "Reklam, SEO, marka ve operasyon — tek strateji çatısı altında, birbiriyle konuşan kanallar.",
              },
              {
                stat: "Ölçülebilir",
                label: "Her kanal izlenir",
                desc: "GA4 ve GTM ile hangi kanal ne getiriyor, hangi sayfa dönüşüm sağlıyor — veriyle görürsünüz.",
              },
              {
                stat: "Modüler",
                label: "Zayıf halkadan başla",
                desc: "Tüm sistemi almak zorunda değilsiniz. Önce en kritik katmanı güçlendirin, geri kalanı ekleyin.",
              },
            ].map((item) => (
              <div key={item.stat} className="flex flex-col gap-2">
                <div
                  className="text-2xl font-black tracking-tight text-white sm:text-3xl"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {item.stat}
                </div>
                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/35">
                  {item.label}
                </div>
                <p className="text-sm leading-relaxed text-white/40">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-center">
            <Link
              href="#iletisim"
              aria-label="Ücretsiz dijital büyüme analizi başlat"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#be29ec] to-[#0000c8] px-8 py-4 text-xs font-black uppercase tracking-[0.18em] text-white shadow-[0_0_30px_rgba(190,41,236,0.25)] transition-all duration-300 hover:shadow-[0_0_45px_rgba(190,41,236,0.4)] hover:scale-[1.02] sm:px-10"
            >
              Hangi Alan Zayıf? Ücretsiz Analiz Yapalım →
            </Link>
            <p className="text-[11px] text-white/25">
              1 iş günü içinde yanıt · Ücretsiz · Bağlayıcı değil
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
