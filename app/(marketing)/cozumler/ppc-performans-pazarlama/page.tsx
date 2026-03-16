import ServicePageTemplate from "@/components/templates/ServicePageTemplate";
import {
  Activity,
  BadgeDollarSign,
  BarChart3,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  Crosshair,
  Gauge,
  HeartPulse,
  LayoutPanelTop,
  LineChart,
  MapPinned,
  Megaphone,
  MousePointerClick,
  Repeat2,
  Rocket,
  ScanSearch,
  Settings2,
  ShoppingBag,
  Target,
  TrendingUp,
  Workflow,
} from "lucide-react";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import {
  ScrollStagger,
  ScrollStaggerItem,
} from "@/components/ui/ScrollStagger";
import ServiceHeroRadar from "@/components/templates/ServiceHeroRadar";

export const metadata = {
  title: "Google Ads, Meta Ads, PPC ve Performans Pazarlama | Premium Dijital",
  description:
    "Google Ads, Meta Ads ve performans pazarlama stratejileri ile markanız için daha fazla talep, daha düşük müşteri edinme maliyeti ve ölçülebilir dijital büyüme sağlıyoruz.",
};

const pageUrl =
  "https://premiumdijital.com/cozumler/ppc-performans-pazarlama";

const ppcFaqs = [
  {
    q: "Google Ads yönetimi ne kadar sürede sonuç verir?",
    a: "Google Ads kampanyalarında ilk veri sinyalleri çoğu zaman ilk haftalarda oluşur. Ancak sürdürülebilir performans değerlendirmesi için kampanya yapısının doğru kurulması, yeterli veri toplanması ve düzenli optimizasyon yapılması gerekir.",
  },
  {
    q: "Reklam bütçesi ne kadar olmalı?",
    a: "Doğru reklam bütçesi sektör rekabetine, hedeflenen müşteri hacmine, dönüşüm oranlarına ve kampanya kapsamına göre değişir. Amaç yalnızca reklam harcamak değil, verimli müşteri edinme maliyeti ile sürdürülebilir büyüme sağlamaktır.",
  },
  {
    q: "PPC ve SEO birlikte kullanılmalı mı?",
    a: "Evet. PPC kısa vadede hızlı talep üretirken SEO orta ve uzun vadede organik görünürlüğü artırır. Bu iki kanal birlikte kullanıldığında hem veri kalitesi hem de müşteri edinme verimliliği artar.",
  },
  {
    q: "Google Ads mi Meta Ads mi daha iyi sonuç verir?",
    a: "Bu tamamen iş modeline, hedef kitleye ve satın alma davranışına bağlıdır. Arama niyeti yüksek kullanıcılar için Google Ads daha güçlü olabilirken, farkındalık ve yeniden hedefleme tarafında Meta Ads daha etkili olabilir. En doğru yaklaşım çoğu zaman ikisini veri odaklı biçimde birlikte değerlendirmektir.",
  },
  {
    q: "Conversion tracking neden bu kadar önemlidir?",
    a: "Conversion tracking olmadan hangi kampanyanın gerçek müşteri, form talebi veya satış ürettiğini net şekilde göremezsiniz. Doğru ölçüm altyapısı, bütçe optimizasyonu ve reklam performansı yönetimi için temel gerekliliktir.",
  },
  {
    q: "Landing page optimizasyonu reklam performansını etkiler mi?",
    a: "Evet. Reklam performansı yalnızca kampanya ayarlarına bağlı değildir. Landing page hızı, mesaj uyumu, kullanıcı deneyimi ve dönüşüm akışı doğrudan reklam maliyetlerini ve dönüşüm oranlarını etkiler.",
  },
];

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "PPC ve Performans Pazarlama",
  url: pageUrl,
  description:
    "Google Ads, Meta Ads ve performans pazarlama stratejileri ile markanız için daha fazla talep, daha düşük müşteri edinme maliyeti ve ölçülebilir dijital büyüme sağlıyoruz.",
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
  name: "PPC ve Performans Pazarlama",
  serviceType: "PPC ve Performans Pazarlama",
  provider: {
    "@type": "Organization",
    name: "Premium Dijital",
    url: "https://premiumdijital.com",
  },
  areaServed: "TR",
  description:
    "Google Ads, Meta Ads, dönüşüm takibi ve performans pazarlama stratejileri ile talep üretimi ve ölçülebilir büyüme sağlayan hizmet.",
  url: pageUrl,
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "PPC Hizmetleri",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Google Ads Yönetimi",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Meta Reklam Yönetimi",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Dönüşüm Takibi Kurulumu",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Landing Page Dönüşüm Optimizasyonu",
        },
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
      item: "https://premiumdijital.com/cozumler",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "PPC ve Performans Pazarlama",
      item: pageUrl,
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: ppcFaqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

const ppcTrustItems = [
  {
    label: "Google Ads",
    href: "/blog/google-ads-yonetimi-ve-optimizasyon-rehberi",
    icon: <BarChart3 className="h-3.5 w-3.5" />,
  },
  {
    label: "Meta Ads",
    href: "/blog/meta-ads-reklam-yonetimi-rehberi",
    icon: <MousePointerClick className="h-3.5 w-3.5" />,
  },
  {
    label: "GA4",
    href: "/blog/ga4-kurulumu-ve-olcum-rehberi",
    icon: <LineChart className="h-3.5 w-3.5" />,
  },
  {
    label: "Conversion Tracking",
    href: "/blog/conversion-tracking-kurulumu-rehberi",
    icon: <ScanSearch className="h-3.5 w-3.5" />,
  },
];

const ppcNavItems = [
  { id: "kapsam", label: "Hizmet Kapsamı" },
  { id: "teknoloji", label: "Teknoloji" },
  { id: "surec", label: "Süreç" },
  { id: "sonuclar", label: "Sonuçlar" },
  { id: "kimler-icin", label: "Kimler İçin" },
  { id: "sss", label: "SSS" },
];

const techStack = [
  {
    name: "Google Ads & Meta",
    benefit:
      "Yapay zeka destekli hedefleme ile reklam bütçenizi yalnızca satın alma eğilimi en yüksek kitlelere yönlendiriyoruz.",
    icon: <Crosshair className="h-5 w-5" strokeWidth={1.5} />,
  },
  {
    name: "GA4 & GTM",
    benefit:
      "Dönüşüm verilerini daha net ölçüyor, hangi kampanyanın gerçekten talep ve satış ürettiğini görünür hale getiriyoruz.",
    icon: <LineChart className="h-5 w-5" strokeWidth={1.5} />,
  },
  {
    name: "Conversion Tracking",
    benefit:
      "Form, telefon, WhatsApp ve satış gibi kritik aksiyonları izleyerek reklam optimizasyonunu gerçek verilere dayandırıyoruz.",
    icon: <Workflow className="h-5 w-5" strokeWidth={1.5} />,
  },
  {
    name: "Looker Studio",
    benefit:
      "Karmaşık tablolar yerine yatırımın geri dönüşünü daha şeffaf ve daha anlaşılır gösteren performans raporları sunuyoruz.",
    icon: <ChartNoAxesCombined className="h-5 w-5" strokeWidth={1.5} />,
  },
];

const serviceScope = [
  {
    title: "Google Ads Reklam Yönetimi",
    text: "Google Ads kampanyalarının stratejik kurulumu ve sürekli optimizasyonu.",
    accent: "Niyet odaklı trafik",
    icon: <Target className="h-5 w-5" strokeWidth={1.5} />,
  },
  {
    title: "Meta Ads Reklam Yönetimi",
    text: "Meta Ads kampanyaları ile hedef kitleye ulaşan performans reklamları.",
    accent: "Talep üretimi ve yeniden hedefleme",
    icon: <Megaphone className="h-5 w-5" strokeWidth={1.5} />,
  },
  {
    title: "Yeniden Pazarlama Sistemleri",
    text: "Web sitenizi ziyaret eden kullanıcıları yeniden hedefleyen remarketing kampanyaları.",
    accent: "Kaybedilen talebi geri kazanma",
    icon: <Repeat2 className="h-5 w-5" strokeWidth={1.5} />,
  },
  {
    title: "Teklif ve Bütçe Optimizasyonu",
    text: "Reklam bütçesini en verimli şekilde kullanmak için teklif stratejilerinin yönetimi.",
    accent: "Daha verimli maliyet kontrolü",
    icon: <BadgeDollarSign className="h-5 w-5" strokeWidth={1.5} />,
  },
  {
    title: "Landing Page Dönüşüm Optimizasyonu",
    text: "Reklam trafiğini müşteriye dönüştüren dönüşüm odaklı landing sayfaları.",
    accent: "Tıklamayı müşteriye çevirme",
    icon: <LayoutPanelTop className="h-5 w-5" strokeWidth={1.5} />,
  },
  {
    title: "Performans Raporlama",
    text: "Reklam performansının veri panelleri ile şeffaf şekilde raporlanması.",
    accent: "Şeffaf ve ölçülebilir görünürlük",
    icon: <BarChart3 className="h-5 w-5" strokeWidth={1.5} />,
  },
];
const growthMethod = [
  {
    step: "01",
    title: "Planlama",
    icon: <ScanSearch className="h-5 w-5" strokeWidth={1.5} />,
    items: [
      "Mevcut kampanya analizi",
      "Veri akışı kontrolü",
      "Rakip reklam stratejileri",
    ],
  },
  {
    step: "02",
    title: "Kurulum",
    icon: <Settings2 className="h-5 w-5" strokeWidth={1.5} />,
    items: ["Kampanya kurulumu", "Hedef kitle segmentasyonu", "Kanal planı"],
  },
  {
    step: "03",
    title: "Optimizasyon",
    icon: <Gauge className="h-5 w-5" strokeWidth={1.5} />,
    items: [
      "Teklif stratejileri",
      "Kreatif testleri",
      "Landing page optimizasyonu",
    ],
  },
  {
    step: "04",
    title: "Ölçekleme",
    icon: <Rocket className="h-5 w-5" strokeWidth={1.5} />,
    items: ["A/B testleri", "Bütçe dağılımı", "Dönüşüm optimizasyonu"],
  },
];
const resultMetrics = [
  {
    metric: "+ Talep",
    title: "Daha Fazla Nitelikli Talep",
    text: "Doğru hedefleme ve anahtar kelime stratejisi ile reklamlar gerçek müşteri adaylarına ulaşır.",
    icon: <TrendingUp className="h-5 w-5" strokeWidth={1.5} />,
  },
  {
    metric: "- Maliyet",
    title: "Daha Düşük Müşteri Edinme Maliyeti",
    text: "Kampanya optimizasyonu ile aynı reklam bütçesi ile daha fazla dönüşüm elde edilir.",
    icon: <BadgeDollarSign className="h-5 w-5" strokeWidth={1.5} />,
  },
  {
    metric: "+ Dönüşüm",
    title: "Daha Yüksek Dönüşüm Oranı",
    text: "Reklam, landing page ve kullanıcı deneyimi birlikte optimize edilir.",
    icon: <Activity className="h-5 w-5" strokeWidth={1.5} />,
  },
  {
    metric: "100%",
    title: "Ölçülebilir Reklam Performansı",
    text: "GA4 ve veri panelleri ile tüm reklam performansı şeffaf şekilde izlenir.",
    icon: <ChartNoAxesCombined className="h-5 w-5" strokeWidth={1.5} />,
  },
];
const audienceFit = [
  {
    title: "E-Ticaret Markaları",
    text: "Ürün satışlarını artırmak ve reklam bütçesini verimli kullanmak isteyen e-ticaret işletmeleri için idealdir.",
    icon: <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />,
  },
  {
    title: "Sağlık Turizmi Firmaları",
    text: "Uluslararası hasta veya danışan talebi oluşturmak isteyen sağlık turizmi şirketleri için güçlü bir kanal oluşturur.",
    icon: <HeartPulse className="h-5 w-5" strokeWidth={1.5} />,
  },
  {
    title: "B2B Şirketleri",
    text: "B2B sektöründe doğru hedef kitleye ulaşarak nitelikli iş fırsatları üretmeye yardımcı olur.",
    icon: <BriefcaseBusiness className="h-5 w-5" strokeWidth={1.5} />,
  },
  {
    title: "Yerel Hizmet İşletmeleri",
    text: "Bulunduğu şehir veya bölgede daha fazla müşteri kazanmak isteyen işletmeler için etkili bir reklam kanalıdır.",
    icon: <MapPinned className="h-5 w-5" strokeWidth={1.5} />,
  },
];
const heroTrustStrip = [
  {
    label: "GA4 Ölçüm Altyapısı",
    icon: <LineChart className="h-4 w-4" strokeWidth={1.5} />,
  },
  {
    label: "Core Web Vitals",
    icon: <Gauge className="h-4 w-4" strokeWidth={1.5} />,
  },
  {
    label: "Conversion Tracking",
    icon: <Workflow className="h-4 w-4" strokeWidth={1.5} />,
  },
  {
    label: "Veri Odaklı Optimizasyon",
    icon: <ChartNoAxesCombined className="h-4 w-4" strokeWidth={1.5} />,
  },
];
const platformLinks = [
  {
    label: "Google Ads",
    href: "/blog/google-ads-yonetimi-ve-optimizasyon-rehberi",
  },
  {
    label: "Meta Ads",
    href: "/blog/meta-ads-reklam-yonetimi-rehberi",
  },
  {
    label: "Google Analytics 4",
    href: "/blog/ga4-kurulumu-ve-olcum-rehberi",
  },
  {
    label: "Google Tag Manager",
    href: "/blog/conversion-tracking-kurulumu-rehberi",
  },
  {
    label: "Search Console",
    href: "/blog/google-search-console-rehberi",
  },
  {
    label: "Looker Studio",
    href: "/blog/looker-studio-raporlama-rehberi",
  },
  {
    label: "Hotjar",
    href: "/blog/hotjar-kullanici-deneyimi-analizi",
  },
];

// Sadece gerçekten sahipsen aç.
// const trustBadges = [
//   {
//     title: "Google Premier Partner",
//     desc: "Onaylı partner ajans",
//   },
//   {
//     title: "Meta Business Partner",
//     desc: "Reklam altyapısı uzmanlığı",
//   },
//   {
//     title: "ISO 27001",
//     desc: "Veri güvenliği yaklaşımı",
//   },
// ];

export default function PPCPage() {
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <ServicePageTemplate
        eyebrow="Hizmetler"
        title="PPC ve"
        accent="Performans Pazarlama"
        description="Google Ads ve Meta Ads stratejileri ile markanız için daha fazla nitelikli talep, daha verimli reklam bütçesi ve ölçülebilir dijital büyüme sağlıyoruz."
        primaryCtaHref="/iletisim#analiz"
        primaryCtaLabel="Ücretsiz Analiz Al"
        secondaryCtaHref="/cozumler"
        secondaryCtaLabel="Tüm Hizmetleri Gör"
        trustItems={ppcTrustItems}
        navItems={ppcNavItems}
        heroVisual={<ServiceHeroRadar />}
      >
        {/* HERO TRUST STRIP */}
        <ScrollReveal y={18}>
          <section className="border-b border-white/10 bg-black/30">
            <div className="mx-auto max-w-5xl px-4 py-8 sm:px-5 md:px-6">
              <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-4">
                {heroTrustStrip.map((item) => (
                  <div
                    key={item.label}
                    className="group rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-center text-xs font-semibold uppercase tracking-[0.14em] text-white/60 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-blue/20 hover:bg-white/[0.07] hover:text-white"
                  >
                    <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-brand-blue transition-all duration-300 group-hover:border-brand-blue/30 group-hover:bg-brand-blue/10 group-hover:text-white">
                      {item.icon}
                    </div>

                    <div className="mt-3 leading-relaxed">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* 2️⃣ HİZMET KAPSAMI */}
        <ScrollReveal y={24}>
          <section
            id="kapsam"
            className="mx-auto max-w-7xl px-4 py-16 sm:px-5 sm:py-20 md:px-6 md:py-24"
          >
            <div className="mb-12 flex items-end gap-4 md:mb-16">
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  Hizmet Kapsamı
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-300 sm:text-base">
                  Reklam performansını artırmak için kampanya stratejisinden
                  dönüşüm optimizasyonuna kadar tüm süreci yönetiyoruz.
                </p>
              </div>
              <div className="hidden h-px flex-1 bg-white/10 md:block" />
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5">
              <ScrollStagger>
                {serviceScope.map((item, index) => (
                  <ScrollStaggerItem key={item.title}>
                    <div className="group relative border-b border-white/10 bg-brand-dark px-5 py-6 transition-all duration-300 last:border-b-0 hover:bg-white/[0.03] sm:px-6 sm:py-7 md:px-8 md:py-8">
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                      <div className="grid grid-cols-1 gap-6 md:grid-cols-[72px_minmax(0,1.2fr)_minmax(220px,0.8fr)] md:items-center">
                        <div className="flex items-center gap-4 md:gap-5">
                          <span className="min-w-[28px] text-[11px] font-bold tracking-[0.22em] text-white/25">
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-brand-blue backdrop-blur-md transition-all duration-300 group-hover:scale-[1.02] group-hover:border-brand-blue/30 group-hover:bg-brand-blue/10 group-hover:text-white">
                            {item.icon}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-brand-blue sm:text-2xl md:text-3xl">
                            {item.title}
                          </h3>

                          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base">
                            {item.text}
                          </p>
                        </div>

                        <div className="md:justify-self-end">
                          <div className="inline-flex max-w-full items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/45 transition-all duration-300 group-hover:border-brand-blue/25 group-hover:bg-brand-blue/10 group-hover:text-white/85">
                            {item.accent}
                          </div>
                        </div>
                      </div>
                    </div>
                  </ScrollStaggerItem>
                ))}
              </ScrollStagger>
            </div>
          </section>
        </ScrollReveal>

        {/* 3️⃣ TEKNOLOJİ EKOSİSTEMİ */}
        <ScrollReveal y={24}>
          <section
            id="teknoloji"
            className="border-t border-white/10 bg-[#080808]"
          >
            <div className="mx-auto max-w-7xl px-4 py-20 sm:px-5 md:px-6">
              <div className="mb-14 grid gap-10 lg:grid-cols-2 lg:items-center">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                    Sadece Araç Değil
                    <span className="text-brand-blue"> Sistem Kuruyoruz</span>
                  </h2>

                  <p className="mt-6 max-w-xl text-sm leading-relaxed text-gray-300 sm:text-base">
                    Google Ads, Meta Ads ve dönüşüm ölçüm sistemlerini tek tek
                    araçlar olarak değil, veri akışı ile birbirine bağlı çalışan
                    bir büyüme altyapısı olarak kurguluyoruz.
                  </p>

                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-gray-400">
                    Doğru veri olmadan reklam optimizasyonu yapılamaz. Bu
                    nedenle ölçüm altyapısı, conversion tracking ve raporlama
                    sistemlerini reklam yönetimi ile birlikte tasarlıyoruz.
                  </p>
                </div>

                <div className="relative rounded-[2rem] border border-white/10 bg-black/40 p-6 backdrop-blur-xl sm:p-8">
                  <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-gradient-to-br from-brand-blue/10 via-transparent to-transparent opacity-40 blur-2xl" />

                  <ScrollStagger className="relative grid gap-4 sm:grid-cols-2">
                    {techStack.map((item) => (
                      <ScrollStaggerItem key={item.name}>
                        <div className="group rounded-xl border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:-translate-y-[2px] hover:border-brand-blue/30 hover:bg-white/[0.08]">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-brand-blue transition group-hover:border-brand-blue/30 group-hover:bg-brand-blue/10 group-hover:text-white">
                              {item.icon}
                            </div>

                            <h3 className="text-sm font-bold text-white">
                              {item.name}
                            </h3>
                          </div>

                          <p className="mt-3 text-xs leading-relaxed text-gray-400">
                            {item.benefit}
                          </p>
                        </div>
                      </ScrollStaggerItem>
                    ))}
                  </ScrollStagger>
                </div>
              </div>

              <div className="mt-14 flex justify-center">
                <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-3">
                  {platformLinks.map((tool) => (
                    <Link
                      key={tool.label}
                      href={tool.href}
                      className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-xs font-semibold text-white/75 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-blue/30 hover:bg-white/[0.08] hover:text-white"
                    >
                      {tool.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* 4️⃣ REKLAM BÜYÜME SİSTEMİ */}
        <ScrollReveal y={24}>
          <section id="surec" className="border-t border-white/10 bg-black/20">
            <div className="mx-auto max-w-6xl px-4 py-20 sm:px-5 md:px-6">
              <div className="mb-14 text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  Reklam Büyüme Sistemimiz
                </h2>

                <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-gray-300 sm:text-base">
                  Planlama, kurulum, optimizasyon ve ölçekleme adımlarından
                  oluşan sistemli bir reklam yönetim modeli ile ilerliyoruz.
                </p>
              </div>

              <div className="relative">
                <div className="absolute left-[19px] top-0 hidden h-full w-px bg-gradient-to-b from-white/5 via-brand-blue/20 to-white/5 md:block" />

                <ScrollStagger className="space-y-6 md:space-y-8">
                  {growthMethod.map((step) => (
                    <ScrollStaggerItem key={step.title}>
                      <div className="group relative grid grid-cols-1 gap-4 rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-blue/25 hover:bg-white/[0.06] hover:shadow-[0_0_30px_rgba(0,0,200,0.10)] md:grid-cols-[72px_minmax(0,1fr)] md:gap-6 md:p-8">
                        <div className="relative flex items-start gap-4 md:block">
                          <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-brand-dark text-brand-blue transition-all duration-300 group-hover:border-brand-blue/30 group-hover:bg-brand-blue/10 group-hover:text-white md:mx-auto">
                            {step.icon}
                          </div>

                          <div className="md:mt-4 md:text-center">
                            <div className="text-[11px] font-bold tracking-[0.24em] text-white/30">
                              {step.step}
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-brand-blue sm:text-2xl">
                            {step.title}
                          </h3>

                          <ul className="mt-5 grid gap-3 sm:grid-cols-1 lg:grid-cols-3">
                            {step.items.map((item) => (
                              <li
                                key={item}
                                className="flex items-start gap-3 rounded-xl border border-white/5 bg-black/20 px-4 py-3 text-sm leading-relaxed text-gray-300 transition-all duration-300 group-hover:border-white/10"
                              >
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue shadow-[0_0_10px_rgba(0,100,255,1)]" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      </div>
                    </ScrollStaggerItem>
                  ))}
                </ScrollStagger>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* 5️⃣ SONUÇ ODAKLI YAKLAŞIM */}
        <ScrollReveal y={24}>
          <section
            id="sonuclar"
            className="border-t border-white/10 bg-[linear-gradient(180deg,rgba(0,0,0,0.35)_0%,rgba(0,0,0,0.15)_100%)]"
          >
            <div className="mx-auto max-w-7xl px-4 py-20 sm:px-5 md:px-6 md:py-24">
              <div className="mb-14 text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  Sonuç Odaklı Reklam Yönetimi
                </h2>

                <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-gray-300 sm:text-base">
                  Performans pazarlamanın amacı yalnızca reklam yayınlamak
                  değil, işletmeniz için ölçülebilir büyüme üretmektir.
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

                        <div className="relative mt-6 text-3xl font-bold italic tracking-tight text-white/90 whitespace-nowrap sm:text-4xl md:text-5xl">
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
                              stroke={`url(#metricGradient-${index})`}
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                            <defs>
                              <linearGradient
                                id={`metricGradient-${index}`}
                                x1="2"
                                y1="18"
                                x2="218"
                                y2="18"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="rgba(255,255,255,0.05)" />
                                <stop
                                  offset="0.5"
                                  stopColor="rgba(0,102,255,0.85)"
                                />
                                <stop
                                  offset="1"
                                  stopColor="rgba(255,255,255,0.08)"
                                />
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

        {/* 6️⃣ KİMLER İÇİN UYGUN */}
        <ScrollReveal y={24}>
          <section id="kimler-icin" className="border-t border-white/10">
            <div className="mx-auto max-w-6xl px-4 py-16 sm:px-5 sm:py-20 md:px-6 md:py-24">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Kimler İçin Uygun?
              </h2>

              <p className="mt-4 max-w-2xl text-sm text-gray-300 sm:text-base">
                Performans pazarlama; e-ticaret, sağlık turizmi, B2B ve yerel
                hizmetler gibi farklı iş modellerinde talep üretmek ve müşteri
                kazanımını hızlandırmak için güçlü bir büyüme kanalı olabilir.
              </p>

              <ScrollStagger className="mt-10 grid gap-6 md:grid-cols-2">
                {audienceFit.map((item) => (
                  <ScrollStaggerItem key={item.title}>
                    <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-brand-blue/25 hover:bg-white/[0.07] hover:shadow-[0_0_30px_rgba(0,0,200,0.12)]">
                      <div className="flex items-start gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-brand-blue transition-all duration-300 group-hover:border-brand-blue/30 group-hover:bg-brand-blue/10 group-hover:text-white">
                          {item.icon}
                        </div>

                        <div>
                          <h3 className="text-lg font-bold text-white transition-colors duration-300 group-hover:text-brand-blue">
                            {item.title}
                          </h3>

                          <p className="mt-2 text-sm leading-relaxed text-gray-300">
                            {item.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  </ScrollStaggerItem>
                ))}
              </ScrollStagger>
            </div>
          </section>
        </ScrollReveal>

        {/* 7️⃣ SSS */}
        <ScrollReveal y={24}>
          <section id="sss" className="border-t border-white/10 bg-black/30">
            <div className="mx-auto max-w-4xl px-4 py-16 sm:px-5 sm:py-20 md:px-6 md:py-24">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Sık Sorulan Sorular
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-300 sm:text-base">
                Google Ads yönetimi, reklam bütçesi, PPC ve SEO ilişkisi ile
                dönüşüm takibi gibi en sık sorulan konuları burada net şekilde
                yanıtlıyoruz.
              </p>

              <ScrollStagger className="mt-10 space-y-4">
                {ppcFaqs.map((item) => (
                  <ScrollStaggerItem key={item.q}>
                    <details className="group rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur-xl transition-all duration-300 hover:border-brand-blue/20 hover:bg-white/[0.08] open:border-brand-blue/25 open:bg-white/[0.07] open:shadow-[0_0_30px_rgba(0,0,200,0.10)]">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 text-base font-bold leading-snug sm:text-lg">
                        <span className="transition-colors duration-300 group-open:text-brand-blue">
                          {item.q}
                        </span>

                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-brand-blue transition-all duration-300 group-open:rotate-180 group-open:border-brand-blue/30 group-open:bg-brand-blue/10 group-open:text-white">
                          ↓
                        </span>
                      </summary>

                      <div className="px-4 pb-4 pt-1">
                        <div className="border-l border-brand-blue/20 pl-4 text-sm leading-relaxed text-gray-300">
                          {item.a}
                        </div>
                      </div>
                    </details>
                  </ScrollStaggerItem>
                ))}
              </ScrollStagger>
            </div>
          </section>
        </ScrollReveal>
      </ServicePageTemplate>
    </>
  );
}
