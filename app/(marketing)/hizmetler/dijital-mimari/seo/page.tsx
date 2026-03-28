import { Metadata } from "next";
import SubServicePageTemplate from "@/components/templates/SubServicePageTemplate";

// Sayfa İçi Bölümler (Children)
import SeoHeroExtra from "@/components/sections/services/seo/SeoHeroExtra";
import ProblemMirror from "@/components/sections/services/seo/ProblemMirror";
import DiagnosisSection from "@/components/sections/services/seo/DiagnosisSection";
import SeoFactorsMatrix from "@/components/sections/services/seo/SeoFactorsMatrix";
import StrategyPillars from "@/components/sections/services/seo/StrategyPillars";
import MiniCaseStudy from "@/components/sections/services/seo/MiniCaseStudy";
import SeoMethodology from "@/components/sections/services/seo/SeoMethodology";
import WebsiteCheckup from "@/components/sections/services/seo/WebsiteCheckup";
import SeoFaq from "@/components/sections/services/seo/SeoFaq";

const pageTitle = "SEO & Organik Büyüme Danışmanlığı | Premium Dijital";
const pageDesc =
  "Teknik SEO, semantik içerik mimarisi ve dijital PR ile markanızın Google otoritesini inşa ediyoruz. Veri disipliniyle sürdürülebilir büyüme sağlayın.";
const pageUrl = "https://premiumdijital.com/hizmetler/dijital-mimari/seo";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDesc,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: pageTitle,
    description: pageDesc,
    url: pageUrl,
    type: "website",
    images: [{ url: "/img/og/seo-growth.jpg", width: 1200, height: 630 }],
  },
};

const seoFaqs = [
  {
    q: "SEO çalışmaları ne kadar sürede etkisini gösterir?",
    a: "Teknik SEO müdahaleleri 2-4 hafta içinde tarama bütçesinde iyileşme sağlar. Tam performans ve otorite inşası için 3-6 aylık bir veri disiplini esastır.",
  },
  {
    q: "Sadece anahtar kelime çalışması yeterli mi?",
    a: "Hayır. Dijital Büyüme Mimarisi kapsamında; teknik altyapı, semantik içerik ve dijital PR (Otorite) sütunlarını %50 veri - %50 vizyon dengesiyle yönetiyoruz.",
  },
];

export default function SeoPage() {
  return (
    <SubServicePageTemplate
      // 1. SEO Yapılandırması (Şablon tarafından JSON-LD olarak işlenir)
      seo={{
        title: pageTitle,
        description: pageDesc,
        url: pageUrl,
        faqs: seoFaqs,
        breadcrumb: [
          { name: "Ana Sayfa", href: "/" },
          { name: "Hizmetler", href: "/hizmetler" },
          { name: "Dijital Mimari", href: "/hizmetler/dijital-mimari" },
          { name: "SEO", href: pageUrl },
        ],
      }}
      // 2. Hero Yapılandırması (Görsel Arka Plan ve ShimmerButtonlar)
      hero={{
        eyebrow: "Dijital Büyüme Mimarisi",
        title: "Görünürlüğü Veriyle",
        accent: "Otoriteye Dönüştürün.",
        description:
          "SEO'yu bir tesadüf değil, mühendislik disiplini olarak ele alıyoruz. Teknik kapasiteyi artırıyor, içerik semantiğini kurguluyor ve markanızın dijital otoritesini inşa ediyoruz.",
        bgImage: "/img/hizmetler/dijital-mimari/seo/seo-hero-bg.webp",
        primaryCta: { label: "Ücretsiz SEO Checkup Al", href: "#checkup" },
        secondaryCta: { label: "Başarı Hikayelerini Gör", href: "#vaka" },
        // İsteğe bağlı stats eklenebilir
      }}
      // 3. Final CTA Yapılandırması (FinalServiceCta.tsx içeriği buraya taşındı)
      finalCta={{
        title: (
          <>
            Büyümeyi Bir <br />{" "}
            <span className="text-brand-purple">Sisteme Dönüştürün</span>
          </>
        ),
        description:
          "Sadece SEO değil, bütünsel bir dijital mimari kuruyoruz. Diğer performans odaklı hizmetlerimizi incelediniz mi?",
        links: [
          {
            label: "Google Ads Yönetimi",
            href: "/hizmetler/performans-pazarlama/google-ads-yonetimi",
            icon: "target",
          },
          {
            label: "Sosyal Medya Reklamları",
            href: "/hizmetler/performans-pazarlama/sosyal-medya-reklamlari",
            icon: "share",
          },
        ],
      }}
    >
      {/* 4. Sayfa İçerik Bölümleri (Children) */}
      <SeoHeroExtra />

      <section id="ayna">
        <ProblemMirror />
      </section>

      <section id="teshis">
        <DiagnosisSection />
      </section>

      <SeoFactorsMatrix />

      <section id="strateji">
        <StrategyPillars />
      </section>

      <section id="vaka">
        <MiniCaseStudy />
      </section>

      <section id="surec">
        <SeoMethodology />
      </section>

      <section id="checkup">
        <WebsiteCheckup />
      </section>

      <section id="sss">
        <SeoFaq />
      </section>
    </SubServicePageTemplate>
  );
}
