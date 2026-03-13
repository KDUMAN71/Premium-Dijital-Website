import ServicePageTemplate from "@/components/templates/ServicePageTemplate";
import {
  Activity,
  BarChart3,
  Blocks,
  Gauge,
  GitBranch,
  LayoutPanelTop,
  LineChart,
  MonitorSmartphone,
  Search,
  Settings2,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import {
  ScrollStagger,
  ScrollStaggerItem,
} from "@/components/ui/ScrollStagger";
import Link from "next/link";
import WebsiteHeroConcept from "@/components/templates/WebsiteHeroConcept";
import IcebergVisual from "@/components/sections/IcebergVisual";

function VisualPlaceholder({
  title,
  description,
  className = "",
}: {
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(0,82,255,0.14),transparent_35%),rgba(255,255,255,0.04)] ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.05),transparent_35%,transparent_70%,rgba(255,255,255,0.03))]" />
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-blue/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-8 h-44 w-44 rounded-full bg-brand-blue/10 blur-3xl" />

      <div className="relative z-10 flex h-full min-h-[280px] flex-col justify-between p-6 sm:p-8">
        <div>
          <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">
            Görsel Alanı
          </div>

          <h3 className="mt-4 text-xl font-bold tracking-tight text-white sm:text-2xl">
            {title}
          </h3>

          {description ? (
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/60">
              {description}
            </p>
          ) : null}
        </div>

        <div className="mt-8">
          <div className="grid grid-cols-6 gap-2 opacity-40">
            {Array.from({ length: 18 }).map((_, i) => (
              <div
                key={i}
                className="h-6 rounded-md border border-white/10 bg-white/5"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: "SEO Uyumlu ve Dönüşüm Odaklı Web Sitesi Tasarımı | Premium Dijital",
  description:
    "Kurumsal web sitesi tasarımı, teknik SEO, Core Web Vitals optimizasyonu, GA4-GTM ölçümleme ve dönüşüm odaklı altyapı yaklaşımı ile işletmeniz için güçlü dijital temeller kuruyoruz.",
};

function HeroConceptPlaceholder() {
  const infraItems = [
    "SEO",
    "Performans",
    "Ölçümleme",
    "Dönüşüm",
    "Teknik Yapı",
    "Kullanıcı Akışı",
  ];

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(0,82,255,0.18),transparent_35%),linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.05),transparent_35%,transparent_70%,rgba(255,255,255,0.03))]" />
      <div className="pointer-events-none absolute -right-16 top-10 h-48 w-48 rounded-full bg-brand-blue/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-10 bottom-0 h-44 w-44 rounded-full bg-brand-blue/10 blur-3xl" />

      <div className="relative z-10 grid gap-0 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <div className="flex flex-col justify-between border-b border-white/10 p-6 sm:p-8 lg:border-b-0 lg:border-r">
          <div>
            <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">
              Görünen Yüz
            </div>

            <h3 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Web Sitesi
            </h3>

            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/60">
              Kullanıcının gördüğü arayüz, sayfa düzeni, içerik ve marka sunumu.
            </p>
          </div>

          <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-black/30 p-4 backdrop-blur-xl sm:p-5">
            <div className="rounded-[1.25rem] border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-brand-blue/60" />
              </div>

              <div className="mt-4 grid gap-3">
                <div className="h-8 rounded-lg border border-white/10 bg-white/5" />
                <div className="grid grid-cols-[1.1fr_0.9fr] gap-3">
                  <div className="h-24 rounded-xl border border-white/10 bg-white/5" />
                  <div className="grid gap-3">
                    <div className="h-[44px] rounded-xl border border-white/10 bg-white/5" />
                    <div className="h-[44px] rounded-xl border border-white/10 bg-white/5" />
                  </div>
                </div>
                <div className="h-10 w-36 rounded-full border border-brand-blue/30 bg-brand-blue/10" />
              </div>
            </div>
          </div>
        </div>

        <div className="relative p-6 sm:p-8">
          <div className="inline-flex rounded-full border border-brand-blue/20 bg-brand-blue/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-brand-blue">
            Görünmeyen Sistem
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {infraItems.map((item, index) => (
              <div
                key={item}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-blue/25 hover:bg-white/[0.07]"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-blue/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="text-[11px] font-bold tracking-[0.2em] text-white/25">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="mt-3 text-base font-bold text-white">
                  {item}
                </div>

                <div className="mt-4 h-1.5 w-20 rounded-full bg-gradient-to-r from-brand-blue/80 to-white/20" />
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-black/25 p-4">
            <p className="text-sm leading-relaxed text-white/65">
              Bu alan daha sonra Midjourney ile üretilecek gerçek hero görseli
              ile değişecek. Nihai görselde üstte görünen arayüz, altta ise
              görünmeyen altyapı bir buzdağı metaforu ile anlatılacak.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const pageUrl =
  "https://premiumdijital.com/hizmetler/web-sitesi-seo-ve-donusum-altyapisi";

const webSeoFaqs = [
  {
    q: "Web sitesi tasarımı ile dönüşüm odaklı web altyapısı arasındaki fark nedir?",
    a: "Dönüşüm odaklı web altyapısı yalnızca görsel tasarım değil; kullanıcı akışı, teknik performans, SEO yapısı, ölçümleme ve aksiyon alma deneyimini birlikte ele alır.",
  },
  {
    q: "Yeni web sitesi yaptırmak isteyen işletmeler için bu hizmet uygun mu?",
    a: "Evet. Hiç sitesi olmayan işletmeler için doğru bilgi mimarisi, teknik altyapı, SEO zemini ve dönüşüm mantığı ile sıfırdan güçlü bir kurulum yapılabilir.",
  },
  {
    q: "Mevcut web sitem optimize edilebilir mi?",
    a: "Evet. Mevcut sitenin teknik yapısı uygunsa hız, SEO, kullanıcı deneyimi ve dönüşüm akışı tarafında iyileştirme yapılabilir. Gerekirse yeniden yapılandırma da planlanabilir.",
  },
  {
    q: "Core Web Vitals neden önemlidir?",
    a: "Core Web Vitals; kullanıcı deneyimi, sayfa hızı algısı ve teknik kalite açısından önemlidir. Özellikle mobil deneyimde yavaş ve kararsız sayfalar dönüşüm kaybına neden olabilir.",
  },
  {
    q: "GA4 ve GTM kurulumu bu hizmete dahil olabilir mi?",
    a: "Evet. Form gönderimleri, telefon tıklamaları, WhatsApp etkileşimleri ve benzeri kritik aksiyonlar için GA4 ve GTM tabanlı ölçümleme altyapısı bu hizmet kapsamında planlanabilir.",
  },
  {
    q: "SEO web sitesi yapılırken en başta düşünülmeli mi?",
    a: "Kesinlikle evet. SEO sonradan eklenen bir katman değil; sayfa yapısı, içerik hiyerarşisi, teknik kurgu ve iç linkleme mantığı ile en baştan planlanmalıdır.",
  },
];

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Web Sitesi, SEO ve Dönüşüm Altyapısı",
  url: pageUrl,
  description:
    "Kurumsal web sitesi tasarımı, teknik SEO, Core Web Vitals optimizasyonu, GA4-GTM ölçümleme ve dönüşüm odaklı web altyapıları.",
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
  name: "Web Sitesi, SEO ve Dönüşüm Altyapısı",
  serviceType: "Web Sitesi, SEO ve Dönüşüm Altyapısı",
  provider: {
    "@type": "Organization",
    name: "Premium Dijital",
    url: "https://premiumdijital.com",
  },
  areaServed: "TR",
  description:
    "Kurumsal web sitesi tasarımı, teknik SEO, site performans optimizasyonu, GA4-GTM ölçümleme ve dönüşüm odaklı dijital altyapı hizmeti.",
  url: pageUrl,
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Web Sitesi ve SEO Altyapı Hizmetleri",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Kurumsal Web Sitesi Tasarımı",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Landing Page Altyapısı",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Teknik SEO ve Site Yapılandırması",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "GA4 ve GTM Ölçümleme Kurulumu",
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
      item: "https://premiumdijital.com/hizmetler",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Web Sitesi, SEO ve Dönüşüm Altyapısı",
      item: pageUrl,
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: webSeoFaqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

const trustItems = [
  {
    label: "Web Sitesi Tasarımı",
    href: "/blog/kurumsal-web-sitesi-nasil-olmali",
    icon: <LayoutPanelTop className="h-3.5 w-3.5" />,
  },
  {
    label: "Teknik SEO",
    href: "/blog/teknik-seo-rehberi",
    icon: <Search className="h-3.5 w-3.5" />,
  },
  {
    label: "GA4",
    href: "/blog/ga4-kurulumu-ve-olcum-rehberi",
    icon: <LineChart className="h-3.5 w-3.5" />,
  },
  {
    label: "Core Web Vitals",
    href: "/blog/core-web-vitals-rehberi",
    icon: <Gauge className="h-3.5 w-3.5" />,
  },
];

const navItems = [
  { id: "genel-bakis", label: "Genel Bakış" },
  { id: "kapsam", label: "Hizmet Kapsamı" },
  { id: "sistem", label: "Sistem" },
  { id: "surec", label: "Süreç" },
  { id: "sonuclar", label: "Sonuçlar" },
  { id: "sss", label: "SSS" },
  { id: "iletisim", label: "İletişim" },
];

const heroTrustStrip = [
  "Kurumsal Web Sitesi",
  "Teknik SEO",
  "Core Web Vitals",
  "GA4 & GTM",
  "Dönüşüm Altyapısı",
];

const problemSignals = [
  {
    title: "Görsel olarak iyi ama teknik olarak zayıf siteler",
    text: "Birçok web sitesi estetik görünse de hız, SEO, kullanıcı akışı ve veri ölçümleme tarafında yetersiz kalır.",
    icon: <MonitorSmartphone className="h-5 w-5" strokeWidth={1.5} />,
  },
  {
    title: "Ne eksik olduğunu fark etmeyen işletmeler",
    text: "Çoğu işletme teknik altyapıyı bilmediği için sorunun tasarımda mı, yapıda mı, ölçümlemede mi olduğunu anlayamaz.",
    icon: <ShieldCheck className="h-5 w-5" strokeWidth={1.5} />,
  },
  {
    title: "Trafik alsa bile dönüşüm üretmeyen yapı",
    text: "Siteye gelen ziyaretçi, doğru bilgi akışı ve net aksiyon yapısı olmadığı için müşteriye dönüşmeden çıkar.",
    icon: <Activity className="h-5 w-5" strokeWidth={1.5} />,
  },
];

const serviceScope = [
  {
    title: "Kurumsal Web Sitesi Tasarımı",
    text: "Markanızı güven veren, profesyonel ve dönüşüm odaklı biçimde konumlandıran kurumsal web sitesi altyapıları tasarlıyoruz. Sadece şık görünen değil; ziyaretçiyi doğru bilgiye yönlendiren ve iş hedeflerinizi destekleyen sayfa yapıları kuruyoruz.",
    accent: "Güven veren dijital vitrin",
    icon: <Blocks className="h-5 w-5" strokeWidth={1.5} />,
  },
  {
    title: "Landing Page ve Dönüşüm Sayfaları",
    text: "Google Ads, Meta Ads ve diğer kampanya trafiğini karşılamak için özel kurgulanmış landing page yapıları hazırlıyoruz. Mesaj uyumu, CTA hiyerarşisi, form akışı ve kullanıcı yönlendirmesi ile dönüşüm performansını destekleyen sayfalar oluşturuyoruz.",
    accent: "Trafiği aksiyona dönüştüren yapı",
    icon: <LayoutPanelTop className="h-5 w-5" strokeWidth={1.5} />,
  },
  {
    title: "Teknik SEO ve Site Yapılandırması",
    text: "Başlık hiyerarşisi, URL mantığı, indexlenebilir yapı, içerik düzeni, iç linkleme ve temel schema yaklaşımı ile arama motorlarının sayfanızı daha iyi anlamasına yardımcı olan sağlam bir SEO zemini kuruyoruz.",
    accent: "Arama görünürlüğü için teknik temel",
    icon: <Search className="h-5 w-5" strokeWidth={1.5} />,
  },
  {
    title: "Hız ve Core Web Vitals Optimizasyonu",
    text: "Sayfa açılış hızını, mobil performansı ve kullanıcı deneyimini iyileştirmek için görsel optimizasyonu, yük yönetimi ve teknik performans düzenlemeleri yapıyoruz. Amaç yalnızca skor artırmak değil, daha akıcı bir deneyim sağlamaktır.",
    accent: "Daha hızlı ve daha stabil deneyim",
    icon: <Gauge className="h-5 w-5" strokeWidth={1.5} />,
  },
  {
    title: "GA4, GTM ve Ölçümleme Altyapısı",
    text: "Form gönderimleri, telefon tıklamaları, WhatsApp etkileşimleri ve diğer kritik kullanıcı aksiyonlarını görünür hale getiren ölçümleme sistemi kuruyoruz. Böylece web siteniz sadece yayınlanan bir varlık değil, verisi okunabilen bir büyüme kanalı haline gelir.",
    accent: "Ölçülebilir dijital altyapı",
    icon: <LineChart className="h-5 w-5" strokeWidth={1.5} />,
  },
  {
    title: "Dönüşüm Odaklı Sayfa Mimarisi",
    text: "Kullanıcının hangi adımda ne göreceğini, hangi bilgiyle güven duyacağını ve hangi noktada aksiyona geçeceğini planlayan bir yapı kuruyoruz. Böylece web sitesi yalnızca bilgi sunan değil, ziyaretçiyi yönlendiren bir sistem haline gelir.",
    accent: "Daha net kullanıcı akışı",
    icon: <Workflow className="h-5 w-5" strokeWidth={1.5} />,
  },
];

const systemItems = [
  {
    name: "Bilgi Mimarisi",
    benefit:
      "Kullanıcının aradığı bilgiye daha hızlı ulaşmasını sağlayan sayfa kurgusu, içerik sıralaması ve hizmet hiyerarşisi planlıyoruz.",
    icon: <GitBranch className="h-5 w-5" strokeWidth={1.5} />,
  },
  {
    name: "Teknik SEO Zemini",
    benefit:
      "Başlık yapısı, içerik düzeni, sayfa ilişkileri ve temel teknik kurgu ile arama motorlarının sitenizi daha doğru anlamasını destekliyoruz.",
    icon: <Search className="h-5 w-5" strokeWidth={1.5} />,
  },
  {
    name: "Performans ve Hız",
    benefit:
      "Mobil deneyimi zayıflatan yükleri azaltarak daha akıcı, daha hızlı ve daha stabil bir web deneyimi oluşturuyoruz.",
    icon: <Gauge className="h-5 w-5" strokeWidth={1.5} />,
  },
  {
    name: "Ölçümleme Altyapısı",
    benefit:
      "GA4 ve GTM ile form, telefon, WhatsApp ve kritik kullanıcı temaslarını görünür hale getirerek veriye dayalı karar almayı kolaylaştırıyoruz.",
    icon: <Workflow className="h-5 w-5" strokeWidth={1.5} />,
  },
];

const processSteps = [
  {
    step: "01",
    title: "Analiz ve Teşhis",
    icon: <Search className="h-5 w-5" strokeWidth={1.5} />,
    items: [
      "Mevcut site veya ihtiyaç yapısının analizi",
      "Teknik eksiklerin ve fırsatların belirlenmesi",
      "Hedef kullanıcı ve dönüşüm senaryolarının netleştirilmesi",
    ],
  },
  {
    step: "02",
    title: "Bilgi Mimarisi ve Sayfa Stratejisi",
    icon: <GitBranch className="h-5 w-5" strokeWidth={1.5} />,
    items: [
      "Sayfa hiyerarşisinin planlanması",
      "İçerik akışı ve kullanıcı yönlendirmesi",
      "Kurumsal web sitesi ve landing page yapısının kurgulanması",
    ],
  },
  {
    step: "03",
    title: "Uygulama ve Performans Optimizasyonu",
    icon: <Settings2 className="h-5 w-5" strokeWidth={1.5} />,
    items: [
      "Responsive uygulama ve teknik kurulum",
      "Hız, mobil deneyim ve Core Web Vitals iyileştirmeleri",
      "SEO uyumlu yapısal düzenlemeler",
    ],
  },
  {
    step: "04",
    title: "Ölçümleme, Kontrol ve Yayın",
    icon: <LineChart className="h-5 w-5" strokeWidth={1.5} />,
    items: [
      "GA4 ve GTM ölçümleme altyapısının kurulması",
      "Form, telefon ve kritik aksiyonların kontrolü",
      "Yayın öncesi ve sonrası kalite güvence kontrolleri",
    ],
  },
];

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <ServicePageTemplate
        eyebrow="Hizmetler"
        title="Web Sitesi, SEO ve"
        accent="Dönüşüm Altyapısı"
        description="Kurumsal web sitesi tasarımını yalnızca görsel bir çıktı olarak değil; teknik SEO, hız, ölçümleme ve dönüşüm odaklı büyüme altyapısı olarak ele alıyoruz."
        primaryCtaHref="/iletisim#analiz"
        primaryCtaLabel="Projenizi Değerlendirelim"
        secondaryCtaHref="/hizmetler"
        secondaryCtaLabel="Tüm Hizmetleri Gör"
        navItems={navItems}
        heroVisual={<IcebergVisual />}
      >
        {/* 1) HERO CONCEPT */}
        <ScrollReveal y={18}>
          <section className="border-y border-white/10 bg-black/30">
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-6 md:py-12">
              <div className="mb-8 grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end">
                <div>
                  <div className="inline-flex rounded-full border border-brand-blue/20 bg-brand-blue/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-brand-blue">
                    Hero Concept
                  </div>

                  <h2 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
                    Sorun çoğu zaman sadece tasarım değildir.
                    <span className="text-brand-blue"> Altyapıdır.</span>
                  </h2>
                </div>

                <p className="max-w-2xl text-sm leading-relaxed text-gray-400 sm:text-base lg:justify-self-end">
                  Görünen web sitesi ile görünmeyen teknik sistem arasındaki
                  farkı anlatan bu hero alanı, sayfanın ana fikrini ilk bakışta
                  görselleştirmek için tasarlanmıştır.
                </p>
              </div>

              <HeroConceptPlaceholder />
            </div>
          </section>
        </ScrollReveal>

        {/* 1) HERO TRUST STRIP */}
        <ScrollReveal y={18}>
          <section className="border-b border-white/10 bg-black/20">
            <div className="mx-auto max-w-6xl px-4 py-6 sm:px-5 md:px-6">
              <div className="flex flex-wrap justify-center gap-3">
                {heroTrustStrip.map((item) => (
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

        {/* 2) PROBLEM / TEMELSİZ YAPI */}
        <ScrollReveal y={24}>
          <section
            id="genel-bakis"
            className="mx-auto max-w-7xl px-4 py-16 sm:px-5 sm:py-20 md:px-6 md:py-24"
          >
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-blue/80">
                  Genel Bakış
                </p>

                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  Temelsiz Yapı
                  <span className="text-brand-blue"> Ayakta Durmaz</span>
                </h2>

                <div className="mt-6 space-y-4 text-sm leading-relaxed text-gray-300 sm:text-base">
                  <p>
                    Birçok işletme web sitesini yalnızca görünen yüzüyle
                    değerlendirir. Oysa hız, teknik SEO, ölçümleme ve kullanıcı
                    akışı doğru kurulmadığında en şık site bile zayıf çalışır.
                  </p>

                  <p>
                    Premium Dijital olarak yalnızca güzel görünen değil, sağlam
                    temellere oturan web altyapıları kuruyoruz.
                  </p>
                </div>

                <div className="mt-8 space-y-3">
                  {[
                    "Yavaş açılan ve mobilde kullanıcı kaybettiren sayfalar",
                    "Teknik altyapısı zayıf ama görsel olarak parlatılmış siteler",
                    "Ölçülemeyen kullanıcı aksiyonları ve görünmeyen veri kaybı",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-300"
                    >
                      <span className="mt-1.5 h-2 w-2 rounded-full bg-brand-blue shadow-[0_0_10px_rgba(0,100,255,1)]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <VisualPlaceholder
                title="Section Görseli — Temelsiz Bina Metaforu"
                description="Bir tarafta yalnızca cephesi güçlü ama temelsiz yapı, diğer tarafta sağlam temeli görünen dengeli yapı."
                className="min-h-[420px]"
              />
            </div>
          </section>
        </ScrollReveal>

        {/* 3) HİZMET KAPSAMI */}
        {/* 3) KATMANLAR */}
        <ScrollReveal y={24}>
          <section
            id="kapsam"
            className="border-t border-white/10 bg-[#080808]"
          >
            <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-5 md:px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center">
              <VisualPlaceholder
                title="Section Görseli — Katmanlı Web Sitesi"
                description="UI, UX, yapı, SEO, performans, ölçümleme ve dönüşüm katmanlarını gösteren exploded system görseli."
                className="min-h-[440px]"
              />

              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-blue/80">
                  Hizmet Kapsamı
                </p>

                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  Bir Web Sitesi
                  <span className="text-brand-blue"> Katmanlardan Oluşur</span>
                </h2>

                <p className="mt-6 max-w-xl text-sm leading-relaxed text-gray-300 sm:text-base">
                  Web sitesi tasarımı, landing page kurgusu, teknik SEO, hız
                  optimizasyonu, GA4-GTM ölçümleme ve dönüşüm akışı aynı
                  sistemin farklı katmanlarıdır.
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {[
                    "Kurumsal web sitesi tasarımı",
                    "Landing page ve dönüşüm sayfaları",
                    "Teknik SEO ve yapılandırma",
                    "Hız ve Core Web Vitals",
                    "GA4, GTM ve ölçümleme",
                    "Dönüşüm odaklı sayfa akışı",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* 4) SİSTEM */}
        <ScrollReveal y={24}>
          <section id="sistem" className="border-t border-white/10">
            <div className="mx-auto max-w-7xl px-4 py-20 sm:px-5 md:px-6">
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-blue/80">
                  Sistem
                </p>

                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  Web Sitesi Bir Sayfa Değil
                  <span className="text-brand-blue"> Bir Sistemdir</span>
                </h2>

                <p className="mt-6 text-sm leading-relaxed text-gray-300 sm:text-base">
                  Trafik, sayfa yapısı, kullanıcı akışı, veri toplama ve dönüşüm
                  birbirine bağlı çalıştığında web sitesi gerçek iş sonucu
                  üretir.
                </p>
              </div>

              <div className="mt-12">
                <VisualPlaceholder
                  title="Section Görseli — Traffic → Pages → Tracking → Conversion → Data"
                  description="Node tabanlı bir sistem diyagramı. Web sitesinin bağımsız sayfa değil, bağlantılı bir işleyiş olduğunu göstermeli."
                  className="min-h-[420px]"
                />
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* 5) SÜREÇ */}
        <ScrollReveal y={24}>
          <section id="surec" className="border-t border-white/10 bg-black/20">
            <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-5 md:px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-blue/80">
                  Süreç
                </p>

                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  Sağlam Altyapı
                  <span className="text-brand-blue"> İnşa Edilir</span>
                </h2>

                <p className="mt-6 max-w-xl text-sm leading-relaxed text-gray-300 sm:text-base">
                  Analiz, mimari, uygulama, optimizasyon ve ölçümleme adımları
                  ile web altyapısını sistemli şekilde kuruyoruz.
                </p>

                <div className="mt-8 space-y-3">
                  {[
                    "Analiz ve teşhis",
                    "Bilgi mimarisi ve sayfa stratejisi",
                    "Uygulama ve performans optimizasyonu",
                    "Ölçümleme, kontrol ve yayın",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                    >
                      <span className="text-[11px] font-bold tracking-[0.2em] text-white/35">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <VisualPlaceholder
                title="Section Görseli — Engineering Pipeline"
                description="Analysis → Architecture → Build → Optimize → Measure akışını gösteren yatay veya diyagonal süreç görseli."
                className="min-h-[400px]"
              />
            </div>
          </section>
        </ScrollReveal>

        {/* 6) SONUÇLAR */}
        <ScrollReveal y={24}>
          <section
            id="sonuclar"
            className="border-t border-white/10 bg-[linear-gradient(180deg,rgba(0,0,0,0.35)_0%,rgba(0,0,0,0.15)_100%)]"
          >
            <div className="mx-auto max-w-7xl px-4 py-20 sm:px-5 md:px-6 md:py-24">
              <div className="mb-14 text-center">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-blue/80">
                  Sonuçlar
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

        {/* 7) SSS */}
        <ScrollReveal y={24}>
          <section id="sss" className="border-t border-white/10 bg-black/30">
            <div className="mx-auto max-w-4xl px-4 py-16 sm:px-5 sm:py-20 md:px-6 md:py-24">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Sık Sorulan Sorular
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-300 sm:text-base">
                Web sitesi altyapısı, teknik SEO, performans ve ölçümleme
                yaklaşımımız ile ilgili en sık sorulan soruları burada
                yanıtlıyoruz.
              </p>

              <ScrollStagger className="mt-10 space-y-4">
                {webSeoFaqs.map((item) => (
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

        {/* 7) FİNAL CTA */}
        <ScrollReveal y={24}>
          <section id="iletisim" className="border-t border-white/10">
            <div className="mx-auto max-w-6xl px-4 py-16 sm:px-5 sm:py-20 md:px-6 md:py-24">
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(0,82,255,0.18),transparent_45%),linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.03))] p-8 backdrop-blur-xl sm:p-10 md:p-14">
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.04),transparent_35%,transparent_65%,rgba(255,255,255,0.03))]" />
                <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-brand-blue/20 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-20 -left-10 h-52 w-52 rounded-full bg-brand-blue/10 blur-3xl" />

                <div className="relative z-10 grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)] lg:items-end">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-blue/80">
                      İletişim
                    </p>

                    <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                      Web Sitenizi
                      <span className="text-brand-blue">
                        {" "}
                        Büyüme Altyapısına
                      </span>
                      <br className="hidden md:block" /> Dönüştürelim
                    </h2>

                    <p className="mt-6 max-w-3xl text-sm leading-relaxed text-gray-300 sm:text-base">
                      Yeni bir kurumsal web sitesi yaptırmak istiyorsanız ya da
                      mevcut sitenizin hız, SEO, ölçümleme ve dönüşüm
                      altyapısını güçlendirmek istiyorsanız, projenizi birlikte
                      değerlendirebiliriz.
                    </p>

                    <p className="mt-4 max-w-3xl text-sm leading-relaxed text-gray-400">
                      Premium Dijital olarak web sitelerini yalnızca görsel bir
                      teslimat olarak değil; güven oluşturan, veri toplayan ve
                      iş hedeflerini destekleyen dijital sistemler olarak
                      tasarlıyoruz.
                    </p>
                  </div>

                  <div className="rounded-[1.75rem] border border-white/10 bg-black/25 p-5 backdrop-blur-xl sm:p-6">
                    <div className="space-y-3">
                      <Link
                        href="/iletisim#analiz"
                        className="inline-flex w-full items-center justify-center rounded-full bg-brand-blue px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-[0_0_30px_rgba(0,82,255,0.35)]"
                      >
                        Projenizi Değerlendirelim
                      </Link>

                      <Link
                        href="/hizmetler"
                        className="inline-flex w-full items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-bold text-white/85 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-blue/30 hover:bg-white/[0.08] hover:text-white"
                      >
                        Tüm Hizmetleri Gör
                      </Link>
                    </div>

                    <div className="mt-6 space-y-3 border-t border-white/10 pt-6">
                      <div className="flex items-start gap-3 text-sm text-gray-300">
                        <span className="mt-1 h-2 w-2 rounded-full bg-brand-blue shadow-[0_0_10px_rgba(0,100,255,1)]" />
                        <span>Kurumsal web sitesi ve landing page kurgusu</span>
                      </div>

                      <div className="flex items-start gap-3 text-sm text-gray-300">
                        <span className="mt-1 h-2 w-2 rounded-full bg-brand-blue shadow-[0_0_10px_rgba(0,100,255,1)]" />
                        <span>
                          Teknik SEO, hız ve Core Web Vitals yaklaşımı
                        </span>
                      </div>

                      <div className="flex items-start gap-3 text-sm text-gray-300">
                        <span className="mt-1 h-2 w-2 rounded-full bg-brand-blue shadow-[0_0_10px_rgba(0,100,255,1)]" />
                        <span>GA4, GTM ve dönüşüm ölçümleme altyapısı</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>
      </ServicePageTemplate>
    </>
  );
}
