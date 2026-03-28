import { Metadata } from "next";

// Bileşenler - Sizin güncellediğiniz path yapısı
import ProblemMirror from "@/components/sections/services/google-ads-yonetimi/ProblemMirror";
import DiagnosisSection from "@/components/sections/services/google-ads-yonetimi/DiagnosisSection";
import PerformanceSystem from "@/components/sections/services/google-ads-yonetimi/PerformanceSystem";
import MiniCaseStudy from "@/components/sections/services/google-ads-yonetimi/MiniCaseStudy";
import LeadScorecard from "@/components/sections/services/google-ads-yonetimi/LeadScorecard";
import AdsStickyNav from "@/components/sections/services/google-ads-yonetimi/AdsStickyNav";
import FAQSection from "@/components/sections/services/google-ads-yonetimi/FAQSection";
import SubServicePageTemplate from "@/components/templates/SubServicePageTemplate";
import { googleAdsFaqs } from "@/components/sections/faq/faq-data";

export default function GoogleAdsPage() {
  return (
    <SubServicePageTemplate
      seo={{
        title: "Google Ads Yönetimi & Danışmanlığı",
        description:
          "İstanbul Google Ads ajansı — reklam bütçenizi yüksek ROAS'a dönüştüren Google Ads yönetimi, kampanya optimizasyonu ve performans danışmanlığı. Ücretsiz analiz için hemen başvurun.",
        url: "https://premiumdijital.com/google-ads",
        faqs: googleAdsFaqs,
        breadcrumb: [
          { name: "Ana Sayfa", href: "/" },
          { name: "Hizmetler", href: "/hizmetler" },
          { name: "Google Ads Yönetimi", href: "/google-ads-yonetimi" },
        ],
      }}
      hero={{
        eyebrow: "Performans Pazarlama",
        title: "Google Ads ile",
        accent: "Daha Fazla Müşteri Kazanın",
        description:
          "Reklam bütçenizi gerçek müşterilere dönüştüren kampanya mimarisi.",
        bgImage:
          "/img/hizmetler/ppc-performans-pazarlama/google-ads-yonetimi/google-ads-hero.webp",
        primaryCta: { label: "Ücretsiz Analiz Al", href: "#scorecard" },
        secondaryCta: { label: "Başarı Hikayelerini Gör", href: "#vaka" },
      }}
      finalCta={{
        links: [
          { label: "SEO Hizmeti", href: "/seo", icon: "target" },
          { label: "Meta Ads", href: "/meta-ads", icon: "share" },
        ],
      }}
      customNav={<AdsStickyNav />}
    >
      <ProblemMirror />

      <div id="teshis">
        <DiagnosisSection />
      </div>

      <div id="sistem">
        <PerformanceSystem />
      </div>

      <div id="vaka">
        <MiniCaseStudy />
      </div>

      <div id="scorecard">
        <LeadScorecard />
      </div>

      <div id="FAQSection">
        <FAQSection />
      </div>

      {/* <div id="FinalCTA">
        <FinalCTA />
      </div> */}
    </SubServicePageTemplate>
  );
}
