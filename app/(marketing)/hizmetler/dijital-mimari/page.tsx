import ServicePageTemplate from "@/components/templates/ServicePageTemplate";
import DijitalMimariStickyNav from "@/components/templates/DijitalMimariStickyNav";
import {
  Activity,
  BarChart3,
  Gauge,
  GitBranch,
  LayoutPanelTop,
  LineChart,
  MonitorSmartphone,
  Search,
  Settings2,
  ShieldCheck,
  Workflow,
  Blocks,
  Monitor,
  TrendingUp,
  Share2,
  Calendar,
  MessageCircle,
  Users,
  LayoutGrid,
} from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import {
  ScrollStagger,
  ScrollStaggerItem,
} from "@/components/ui/ScrollStagger";
import Link from "next/link";
import IcebergVisual from "@/components/sections/IcebergVisual";
import WebsiteCheckup from "@/components/sections/WebsiteCheckup";
import EsteticManifesto from "@/components/sections/EsteticManifesto";
import ServiceProfileSelector from "@/components/sections/ServiceProfileSelector";
import DesignShowcase from "@/components/sections/DesignShowcase";
import ProcessTimeline from "@/components/sections/Processtimeline";
import InvestmentCalculator from "@/components/sections/InvestmentCalculator";
import FAQSection from "@/components/sections/faq/FAQSection";
import { webSeoFaqs } from "@/components/sections/faq/faq-data";
import ContactCTA from "@/components/sections/ContactCTA";

/* ─── Metadata ────────────────────────────────────────────────────────────── */

export const metadata = {
  title: "Web Tasarım, SEO ve Sosyal Medya Yönetimi | Premium Dijital",
  description:
    "Web tasarım, teknik SEO ve sosyal medya yönetimini tek stratejik çatı altında birleştiriyoruz. Kurumsal web sitesi, organik büyüme ve platform yönetimi için bütünleşik dijital altyapı.",
};

/* ─── Schema ──────────────────────────────────────────────────────────────── */

const pageUrl = "https://premiumdijital.com/hizmetler/dijital-mimari";

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Dijital Mimari — Web, SEO & Sosyal Medya",
  url: pageUrl,
  description:
    "Web tasarım, teknik SEO ve sosyal medya yönetimini tek stratejik çatı altında birleştiren bütünleşik dijital altyapı hizmeti.",
  inLanguage: "tr-TR",
  isPartOf: {
    "@type": "WebSite",
    name: "Premium Dijital",
    url: "https://premiumdijital.com",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Dijital Mimari",
  serviceType: "Dijital Mimari",
  provider: {
    "@type": "Organization",
    name: "Premium Dijital",
    url: "https://premiumdijital.com",
  },
  areaServed: "TR",
  description:
    "Web tasarım, teknik SEO ve sosyal medya yönetimini tek stratejik çatı altında birleştiren bütünleşik dijital altyapı hizmeti.",
  url: pageUrl,
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Web, SEO ve Sosyal Medya Hizmetleri",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Kurumsal Web Sitesi Tasarımı" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Teknik SEO ve Site Yapılandırması" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Sosyal Medya Yönetimi" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "GA4 ve GTM Ölçümleme Kurulumu" },
      },
    ],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Anasayfa",
      item: "https://premiumdijital.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Hizmetler",
      item: "https://premiumdijital.com/hizmetler",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Dijital Mimari",
      item: pageUrl,
    },
  ],
};

/* ─── Hero çipleri ────────────────────────────────────────────────────────── */

const heroChips = (
  <div className="flex flex-wrap gap-3 mt-8">
    {[
      { label: "Web Tasarım & Geliştirme", Icon: Monitor, href: "#web" },
      { label: "SEO & Organik Büyüme", Icon: TrendingUp, href: "#seo" },
      { label: "Sosyal Medya Yönetimi", Icon: Share2, href: "#sosyal-medya" },
    ].map((chip) => (
      <a
        key={chip.label}
        href={chip.href}
        className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-bold text-white/70 transition-all hover:border-brand-purple/40 hover:bg-brand-purple/10 hover:text-white"
      >
        <chip.Icon className="h-4 w-4" />
        {chip.label}
      </a>
    ))}
  </div>
);

/* ─── Sosyal Medya bölümü verisi ──────────────────────────────────────────── */

const SOSYAL_HIZMETLER = [
  {
    title: "Platform Yönetimi",
    desc: "Instagram, LinkedIn, Facebook, TikTok — her platformun kendi dilinde, tutarlı marka sesiyle yönetim.",
    platforms: ["Instagram", "LinkedIn", "Facebook", "TikTok"],
    Icon: LayoutGrid,
  },
  {
    title: "İçerik Üretimi & Yayın Takvimi",
    desc: "Görsel tasarım, metin yazarlığı ve yayın planlaması. Aylık içerik takvimi + performans raporu.",
    platforms: [],
    Icon: Calendar,
  },
  {
    title: "Topluluk Yönetimi & Etkileşim",
    desc: "Yorum yanıtları, DM yönetimi, kriz iletişimi. Takipçiyle canlı ve samimi bir bağ.",
    platforms: [],
    Icon: MessageCircle,
  },
  {
    title: "Influencer & İş Birlikleri",
    desc: "Sektöre uygun influencer eşleştirmesi, brief hazırlığı, kampanya takibi ve raporlama.",
    platforms: [],
    Icon: Users,
  },
];

/* ─── Sonuç metrikleri ────────────────────────────────────────────────────── */

const resultMetrics = [
  {
    metric: "Daha Hızlı",
    title: "Daha Akıcı Sayfa Deneyimi",
    text: "Yavaş açılan, mobilde sürtünme yaratan ve kullanıcı kaybettiren teknik sorunları azaltarak daha hızlı ve daha stabil bir web deneyimi oluşturuyoruz.",
    icon: <Gauge className="h-5 w-5" strokeWidth={1.5} />,
  },
  {
    metric: "Daha Net",
    title: "Daha Güçlü Kullanıcı ve Dönüşüm Akışı",
    text: "Ziyaretçinin hangi bilgiyi neden gördüğünü ve hangi aksiyonu hangi noktada alacağını daha net hale getiren sayfa mimarisi kuruyoruz.",
    icon: <Workflow className="h-5 w-5" strokeWidth={1.5} />,
  },
  {
    metric: "Daha Sağlam",
    title: "SEO İçin Daha Güvenilir Teknik Zemin",
    text: "Arama görünürlüğünü destekleyen başlık yapısı, içerik düzeni, teknik kurgu ve sayfa ilişkileri ile daha güçlü bir web temeli oluşturuyoruz.",
    icon: <Search className="h-5 w-5" strokeWidth={1.5} />,
  },
  {
    metric: "Daha Ölçülebilir",
    title: "Veriye Dayalı Gelişim İmkânı",
    text: "GA4 ve GTM altyapısı ile form, telefon ve diğer kritik etkileşimleri görünür hale getirerek daha bilinçli optimizasyon kararları alınmasını sağlıyoruz.",
    icon: <BarChart3 className="h-5 w-5" strokeWidth={1.5} />,
  },
];

/* ─── Sayfa bileşeni ──────────────────────────────────────────────────────── */

export default function WebSitesiSeoVeDonusumAltyapisiPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <ServicePageTemplate
        eyebrow="Hizmetler"
        title="Dijital Varlığınızı"
        accent="Baştan İnşa Ediyoruz."
        description="Web tasarım, SEO ve sosyal medya yönetimini tek stratejik çatı altında birleştiriyoruz."
        primaryCtaHref="/iletisim#analiz"
        primaryCtaLabel="Projenizi Değerlendirelim"
        secondaryCtaHref="/hizmetler"
        secondaryCtaLabel="Tüm Hizmetleri Gör"
        heroVisual={<IcebergVisual />}
        heroExtra={heroChips}
        customNav={<DijitalMimariStickyNav />}
      >
        {/* ── 1) WEB TASARIM — WebsiteCheckup lead magnet ──────────────────── */}
        <ScrollReveal y={18}>
          <section id="web" className="border-y border-white/10 bg-black/30">
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-6 md:py-12">
              <div className="mb-8 grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end">
                <div>
                  <div className="inline-flex rounded-full border border-brand-blue/20 bg-brand-blue/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-brand-blue">
                    Ücretsiz Teşhis
                  </div>

                  <h2 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
                    Sorun çoğu zaman sadece tasarım değildir.
                    <span className="text-brand-blue"> Altyapıdır.</span>
                  </h2>
                </div>

                <p className="max-w-2xl text-sm leading-relaxed text-gray-400 sm:text-base lg:justify-self-end">
                  Sitenizin hız, SEO, mobil uyum ve ölçümleme durumunu 6 soruda
                  değerlendirin. Teknik rapor saniyeler içinde hazır.
                </p>
              </div>

              <WebsiteCheckup />
            </div>
          </section>
        </ScrollReveal>

        {/* ── 1B) TRUST STRIP ──────────────────────────────────────────────── */}
        <ScrollReveal y={18}>
          <section className="border-b border-white/10 bg-black/20">
            <div className="mx-auto max-w-6xl px-4 py-6 sm:px-5 md:px-6">
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  "Kurumsal Web Sitesi",
                  "Teknik SEO",
                  "Core Web Vitals",
                  "GA4 & GTM",
                  "Dönüşüm Altyapısı",
                ].map((item) => (
                  <div
                    key={item}
                    className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white/60"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* ── 2) SEO — Problem / Temelsiz Yapı ─────────────────────────────── */}
        <ScrollReveal y={24}>
          <section
            id="seo"
            className="mx-auto max-w-7xl px-4 py-16 sm:px-5 sm:py-20 md:px-6 md:py-24"
          >
            <EsteticManifesto />
          </section>
        </ScrollReveal>

        {/* ── 3) HİZMET KAPSAMI — ServiceProfileSelector + DesignShowcase ─── */}
        <ScrollReveal y={24}>
          <ServiceProfileSelector />
        </ScrollReveal>

        <ScrollReveal y={24}>
          <DesignShowcase />
        </ScrollReveal>

        {/* ── 4) SÜREÇ — ProcessTimeline ───────────────────────────────────── */}
        <ScrollReveal y={24}>
          <ProcessTimeline />
        </ScrollReveal>

        {/* ── 5) YATIRIM — InvestmentCalculator ───────────────────────────── */}
        <ScrollReveal y={24}>
          <InvestmentCalculator />
        </ScrollReveal>

        {/* ── 6) SONUÇLAR ──────────────────────────────────────────────────── */}
        <ScrollReveal y={24}>
          <section
            id="sonuclar"
            className="border-t border-white/10 bg-[linear-gradient(180deg,rgba(0,0,0,0.35)_0%,rgba(0,0,0,0.15)_100%)]"
          >
            <div className="mx-auto max-w-7xl px-4 py-20 sm:px-5 md:px-6 md:py-24">
              <div className="mb-14 text-center">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-blue/80">
                  Başarılar
                </p>

                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  Daha Güçlü Daha Akıllı
                  <span className="text-brand-blue"> Bir Web Altyapısı</span>
                </h2>

                <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-gray-300 sm:text-base">
                  Amaç yalnızca yeni bir site yayınlamak değil; markanız için
                  daha hızlı, daha net, daha sağlam ve daha ölçülebilir bir
                  dijital temel kurmaktır.
                </p>
              </div>

              <ScrollStagger className="grid grid-cols-1 gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 md:grid-cols-2 xl:grid-cols-4">
                {resultMetrics.map((item, index) => (
                  <ScrollStaggerItem key={item.title}>
                    <div className="group relative h-full bg-brand-dark px-6 py-8 transition-all duration-300 hover:bg-white/[0.03] hover:shadow-[0_0_40px_rgba(0,80,255,0.15)]">
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-blue/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <div className="pointer-events-none absolute -right-10 top-6 h-24 w-24 rounded-full bg-brand-blue/10 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                      <div className="relative z-10">
                        <div className="flex items-start justify-between">
                          <span className="text-[11px] font-bold tracking-[0.24em] text-white/25">
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <div className="translate-y-[2px] flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-brand-blue transition-all duration-300 group-hover:border-brand-blue/30 group-hover:bg-brand-blue/10 group-hover:text-white">
                            {item.icon}
                          </div>
                        </div>

                        <div className="relative mt-6 text-3xl font-bold tracking-tight text-white/90 sm:text-4xl">
                          <span className="relative z-10">{item.metric}</span>
                          <span className="absolute inset-0 bg-brand-blue/20 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-30" />
                        </div>

                        <h3 className="mt-8 text-lg font-bold leading-snug text-white transition-colors duration-300 group-hover:text-brand-blue">
                          {item.title}
                        </h3>

                        <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
                          {item.text}
                        </p>

                        <div className="mt-8 h-8 w-full opacity-40 transition-opacity duration-300 group-hover:opacity-70">
                          <svg
                            viewBox="0 0 220 36"
                            className="h-full w-full"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M2 28C30 28 38 20 60 20C82 20 92 8 120 8C148 8 158 18 182 18C196 18 206 12 218 6"
                              stroke={`url(#resultGradient-${index})`}
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                            <defs>
                              <linearGradient
                                id={`resultGradient-${index}`}
                                x1="2"
                                y1="18"
                                x2="218"
                                y2="18"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="rgba(255,255,255,0.05)" />
                                <stop offset="0.5" stopColor="rgba(0,102,255,0.85)" />
                                <stop offset="1" stopColor="rgba(255,255,255,0.08)" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </ScrollStaggerItem>
                ))}
              </ScrollStagger>
            </div>
          </section>
        </ScrollReveal>

        {/* ── 7) SOSYAL MEDYA YÖNETİMİ ─────────────────────────────────────── */}
        <ScrollReveal y={24}>
          <section
            id="sosyal-medya"
            className="border-t border-white/10 bg-[linear-gradient(180deg,rgba(0,0,0,0.4)_0%,rgba(0,0,0,0.2)_100%)]"
          >
            <div className="mx-auto max-w-7xl px-4 py-20 sm:px-5 md:px-6 md:py-24">
              {/* Header */}
              <div className="mb-14 text-center">
                <div className="inline-flex rounded-full border border-[#22c55e]/25 bg-[#22c55e]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#22c55e]">
                  Sosyal Medya Yönetimi
                </div>
                <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  Platformlar Farklı,{" "}
                  <span className="text-[#22c55e]">Strateji Tek</span>
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-gray-400 sm:text-base">
                  Her platformun kendi dilinde, tutarlı marka sesiyle içerik
                  üretiminden topluluk yönetimine — tüm süreçleri üstleniyoruz.
                </p>
              </div>

              {/* Kartlar 2×2 */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {SOSYAL_HIZMETLER.map((item) => (
                  <div
                    key={item.title}
                    className="group relative rounded-2xl border border-white/8 bg-white/[0.03] p-7 transition-all duration-300 hover:border-[#22c55e]/25 hover:bg-[#22c55e]/[0.04] hover:shadow-[0_0_40px_rgba(34,197,94,0.08)]"
                  >
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#22c55e]/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#22c55e] transition-all duration-300 group-hover:border-[#22c55e]/30 group-hover:bg-[#22c55e]/10">
                      <item.Icon className="h-5 w-5" strokeWidth={1.5} />
                    </div>

                    <h3 className="mt-5 text-lg font-bold text-white transition-colors duration-300 group-hover:text-[#22c55e]">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-white/55">
                      {item.desc}
                    </p>

                    {item.platforms.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {item.platforms.map((p) => (
                          <span
                            key={p}
                            className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white/50"
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* ── 8) SSS ───────────────────────────────────────────────────────── */}
        <FAQSection
          id="sss"
          title="Teknik Sorularınız"
          accentText="Yanıtlandı"
          accentColor="purple"
          subtitle="Altyapı tercihlerinden SEO süreçlerine, kod sahipliğinden çalışma modeline — belirsizlik bırakmadan."
          items={webSeoFaqs}
        />

        {/* ── 9) FİNAL CTA ─────────────────────────────────────────────────── */}
        <ContactCTA context="web-seo" id="iletisim" />
      </ServicePageTemplate>
    </>
  );
}
