import { Metadata } from "next";
import SubServicePageTemplate from "@/components/templates/SubServicePageTemplate";
import MetaPlatform from "@/components/sections/services/meta-ads/MetaPlatform";
import CommonMistakes from "@/components/sections/services/meta-ads/CommonMistakes";
import MetaSystem from "@/components/sections/services/meta-ads/MetaSystem";
import CreativeEngine from "@/components/sections/services/meta-ads/CreativeEngine";
import MetaPackages from "@/components/sections/services/meta-ads/MetaPackages";
import MiniCaseStudy from "@/components/sections/services/meta-ads/MiniCaseStudy";
import MetaScorecard from "@/components/sections/services/meta-ads/MetaScorecard";
import FAQSection from "@/components/sections/services/meta-ads/FAQSection";
import MetaStickyNav from "@/components/sections/services/meta-ads/MetaStickyNav";

export const metadata: Metadata = {
  title:
    "Meta Ads Yönetimi — Facebook & Instagram Reklam Ajansı | Premium Dijital",
  description:
    "Facebook ve Instagram reklamlarıyla hedef kitlenize ulaşın. Meta Business Partner deneyimi, Advantage+ kampanyaları ve ROAS odaklı performans yönetimi.",
  alternates: {
    canonical:
      "https://premiumdijital.com/hizmetler/performans-pazarlama/meta-ads",
  },
};

const metaFaqs = [
  {
    q: "Meta reklamları 2025'te hâlâ işe yarıyor mu?",
    a: "Evet. Meta'nın 3+ milyar aktif kullanıcısı ve AI destekli Advantage+ sistemi, doğru yönetilen kampanyalarda tutarlı ROAS üretiyor. Sonuç vermeyen kampanyaların büyük çoğunluğu strateji veya kreatif sorunudur.",
  },
  {
    q: "Küçük bütçeyle Meta Ads yapılabilir mi?",
    a: "Evet, ancak strateji değişir. Aylık 10.000 TL altı bütçelerde tek kampanya, geniş hedefleme ve yüksek kaliteli kreatif kombinasyonu en verimli yaklaşımdır.",
  },
  {
    q: "Önceki ajansım başaramadıysa siz neden başarırsınız?",
    a: "Çoğu başarısız Meta kampanyası üç nedenden kaynaklanır: zayıf kreatif, hatalı pixel/CAPI kurulumu veya funnel uyumsuzluğu. Önce audit yapıyor, kök nedeni tespit ediyoruz.",
  },
  {
    q: "Facebook mı Instagram mı daha verimli?",
    a: "Sektöre göre değişir. Sağlık ve estetik için Instagram görsel gücü öne çıkar. B2B ve hizmet sektöründe Facebook Leads kampanyaları daha verimli olabilir. Her iki platformu test edip veriyle karar veriyoruz.",
  },
  {
    q: "CAPI (Conversions API) neden önemli?",
    a: "iOS 14 sonrası browser tabanlı pixel veri kaybı yaşıyor. CAPI, sunucu taraflı veri gönderimi yaparak bu kaybı minimize eder. CAPI kurulmayan hesaplarda dönüşüm verisi %30-60 eksik olabilir.",
  },
  {
    q: "Reklam bütçesi ayrı mı ödeniyor?",
    a: "Evet. Meta'ya ödenen reklam bütçesi doğrudan sizin kart/hesabınızdan çekilir. Premium Dijital yönetim ücreti bu bütçeden bağımsızdır.",
  },
];

export default function MetaAdsPage() {
  return (
    <SubServicePageTemplate
      seo={{
        title: "Meta Ads Yönetimi — Facebook & Instagram Reklam Ajansı",
        description:
          "Facebook ve Instagram reklamlarıyla hedef kitlenize ulaşın.",
        url: "https://premiumdijital.com/hizmetler/performans-pazarlama/meta-ads",
        faqs: metaFaqs,
        breadcrumb: [
          { name: "Ana Sayfa", href: "/" },
          { name: "Hizmetler", href: "/hizmetler" },
          {
            name: "Performans Pazarlama",
            href: "/hizmetler/performans-pazarlama",
          },
          {
            name: "Meta Ads Yönetimi",
            href: "/hizmetler/performans-pazarlama/meta-ads",
          },
        ],
      }}
      hero={{
        eyebrow: "Facebook & Instagram Reklam Yönetimi",
        title: "Meta'da Reklam Vermek",
        accent: "Müşteri Kazanmak Değil mi?",
        description:
          "3 milyar kullanıcıya ulaşan Meta ekosistemini doğru strateji, güçlü kreatif ve veri altyapısıyla yönetiyoruz.",
        bgImage:
          "/img/hizmetler/ppc-performans-pazarlama/meta-ads/meta-ads-hero.webp",
        primaryCta: { label: "Ücretsiz Meta Ads Analizi", href: "#scorecard" },
        secondaryCta: { label: "Sonuçları Gör", href: "#vaka" },
        stats: [
          { value: "3B+", label: "Meta Kullanıcısı" },
          { value: "%4.2", label: "Ort. Dönüşüm Oranı" },
          { value: "3.5x", label: "Ort. ROAS Hedefi" },
        ],
      }}
      finalCta={{
        title: (
          <>
            Meta Reklamlarınızı <br />
            <span className="text-brand-purple">
              Büyüme Motoruna Dönüştürün
            </span>
          </>
        ),
        description:
          "Strateji, kreatif ve veri — üçü aynı anda. Ücretsiz analiz görüşmesiyle başlayalım.",
        links: [
          {
            label: "Google Ads Yönetimi",
            href: "/hizmetler/performans-pazarlama/google-ads-yonetimi",
            icon: "target",
          },
          {
            label: "SEO & Organik Büyüme",
            href: "/hizmetler/dijital-mimari/seo",
            icon: "share",
          },
        ],
      }}
      customNav={<MetaStickyNav />}
    >
      <>
        <MetaPlatform />
        <div id="hatalar">
          <CommonMistakes />
        </div>
        <div id="sistem">
          <MetaSystem />
        </div>
        <div id="kreatif">
          <CreativeEngine />
        </div>
        <div id="paketler">
          <MetaPackages />
        </div>
        <div id="vaka">
          <MiniCaseStudy />
        </div>
        <div id="scorecard">
          <MetaScorecard />
        </div>
        <div id="sss">
          <FAQSection faqs={metaFaqs} />
        </div>
      </>
    </SubServicePageTemplate>
  );
}
