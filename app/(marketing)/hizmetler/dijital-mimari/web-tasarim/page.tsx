import { Metadata } from "next";
import SubServicePageTemplate from "@/components/templates/SubServicePageTemplate";
import WebWhySection from "@/components/sections/services/web-tasarim/WebWhySection";
import WebShowcase from "@/components/sections/services/web-tasarim/WebShowcase";
import WebTechStack from "@/components/sections/services/web-tasarim/WebTechStack";
import WebProcess from "@/components/sections/services/web-tasarim/WebProcess";
import WebPackages from "@/components/sections/services/web-tasarim/WebPackages";
import WebAnalysisForm from "@/components/sections/services/web-tasarim/WebAnalysisForm";
import FAQSection from "@/components/sections/services/web-tasarim/FAQSection";
import WebStickyNav from "@/components/sections/services/web-tasarim/WebStickyNav";
import WebHeroVisual from "@/components/sections/services/web-tasarim/WebHeroVisual";

export const metadata: Metadata = {
  title: "Web Tasarımı & Kurumsal Site Geliştirme | Premium Dijital",
  description:
    "Next.js ile kurumsal web tasarımı, e-ticaret ve özel geliştirme. Mobil öncelikli, SEO dostu, yüksek performanslı web siteleri.",
  alternates: {
    canonical:
      "https://premiumdijital.com/hizmetler/dijital-mimari/web-tasarim",
  },
};

const webFaqs = [
  {
    q: "Web sitesi ne kadar sürede tamamlanır?",
    a: "Kapsama göre değişir: Hızlı başlangıç paketleri 2 haftada, kurumsal projeler 4-6 haftada teslim edilir. Tasarım onayı ve içerik teslimi süreyi doğrudan etkiler.",
  },
  {
    q: "Mevcut web sitemi yenilemek istiyorum, bu mümkün mü?",
    a: "Evet. Mevcut sitenizin teknik analizi yapılır, içerik ve SEO değerlerini koruyarak yeni bir altyapıya taşıyoruz. Sıfırdan başlamak gerekmez.",
  },
  {
    q: "Web sitesinin yönetimini ben yapabilir miyim?",
    a: "Evet. CMS entegrasyonlu paketlerde içerik güncellemelerini teknik bilgi gerektirmeden yapabilirsiniz. Ayrıca kısa bir kullanım eğitimi de sunuyoruz.",
  },
  {
    q: "Hosting ve domain dahil mi?",
    a: "Hosting ve domain ayrı maliyetlerdir, ancak seçim ve kurulum sürecinde tam destek sağlıyoruz. Vercel ve Cloudflare gibi modern altyapıları öneriyoruz.",
  },
  {
    q: "Mobil uyumluluk nasıl sağlanıyor?",
    a: "Tüm projelerimiz mobile-first yaklaşımla geliştirilir. 375px (iPhone SE) ile 1440px (desktop) arasındaki tüm ekran boyutlarında test edilir.",
  },
  {
    q: "SEO için web sitesi nasıl optimize edilir?",
    a: "Teknik SEO (sayfa hızı, schema markup, canonical URL, sitemap), içerik SEO (başlık hiyerarşisi, meta etiketler) ve Core Web Vitals optimizasyonu başlangıçta kurulum sürecine dahildir.",
  },
];

export default function WebTasarimPage() {
  return (
    <SubServicePageTemplate
      seo={{
        title: "Web Tasarımı & Kurumsal Site Geliştirme",
        description: "Next.js ile kurumsal web tasarımı ve özel geliştirme.",
        url: "https://premiumdijital.com/hizmetler/dijital-mimari/web-tasarim",
        faqs: webFaqs,
        breadcrumb: [
          { name: "Ana Sayfa", href: "/" },
          { name: "Hizmetler", href: "/hizmetler" },
          { name: "Dijital Mimari", href: "/hizmetler/dijital-mimari" },
          {
            name: "Web Tasarımı",
            href: "/hizmetler/dijital-mimari/web-tasarim",
          },
        ],
      }}
      hero={{
        eyebrow: "Next.js · Figma · Tailwind · Vercel",
        title: "Dijital Dünyadaki İlk İzleniminiz",
        accent: "Ne Kadar Güçlü?",
        description:
          "Web siteniz sadece bir sayfa değil — markanızın dünyaya açılan penceresi, kitlenizle kurduğunuz ilk köprü, kurumsal güveninizin dijital yansıması. Ziyaretçi mi kaybediyorsunuz, yoksa kazanıyor musunuz?",
        heroVisual: <WebHeroVisual />,
        primaryCta: { label: "Site Analizi Al", href: "#analiz" },
        secondaryCta: { label: "Çalışmaları İncele", href: "#showcase" },
      }}
      finalCta={{
        title: (
          <>
            Web Sitenizi <br />
            <span className="text-brand-purple">
              Büyüme Motoruna Dönüştürün
            </span>
          </>
        ),
        description:
          "Tasarım güçlü, altyapı sağlam, dönüşüm odaklı — üçü bir arada.",
        links: [
          {
            label: "SEO & Organik Büyüme",
            href: "/hizmetler/dijital-mimari/seo",
            icon: "target",
          },
          {
            label: "Hazır Sistemler (CMS/CRM)",
            href: "/hizmetler/dijital-mimari/hazir-sistemler",
            icon: "share",
          },
        ],
      }}
      customNav={<WebStickyNav key="web-sticky-nav" />}
    >
      <div key="neden" id="neden">
        <WebWhySection />
      </div>
      <div key="showcase" id="showcase">
        <WebShowcase />
      </div>
      <div key="teknoloji" id="teknoloji">
        <WebTechStack />
      </div>
      <div key="surec" id="surec">
        <WebProcess />
      </div>
      <div key="paketler" id="paketler">
        <WebPackages />
      </div>
      <div key="analiz" id="analiz">
        <WebAnalysisForm />
      </div>
      <div key="sss" id="sss">
        <FAQSection faqs={webFaqs} />
      </div>
    </SubServicePageTemplate>
  );
}
