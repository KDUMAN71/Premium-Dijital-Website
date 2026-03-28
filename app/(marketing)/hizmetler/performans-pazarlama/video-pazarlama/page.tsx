import { Metadata } from "next";
import SubServicePageTemplate from "@/components/templates/SubServicePageTemplate";
import VideoWhySection from "@/components/sections/services/video-pazarlama/VideoWhySection";
import VideoFormats from "@/components/sections/services/video-pazarlama/VideoFormats";
import VideoProcess from "@/components/sections/services/video-pazarlama/VideoProcess";
import VideoSectors from "@/components/sections/services/video-pazarlama/VideoSectors";
import VideoStrategyForm from "@/components/sections/services/video-pazarlama/VideoStrategyForm";
import FAQSection from "@/components/sections/services/video-pazarlama/FAQSection";
import VideoStickyNav from "@/components/sections/services/video-pazarlama/VideoStickyNav";

export const metadata: Metadata = {
  title: "YouTube & Video Pazarlama — Video Reklam Ajansı | Premium Dijital",
  description:
    "YouTube reklamları, video içerik stratejisi ve görüntülü reklam yönetimiyle markanızı hedef kitlenize ulaştırın. Sağlık ve turizm sektörüne özel video pazarlama.",
  alternates: {
    canonical:
      "https://premiumdijital.com/hizmetler/performans-pazarlama/video-pazarlama",
  },
};

const videoFaqs = [
  {
    q: "YouTube reklamları küçük bütçeyle işe yarar mı?",
    a: "Evet. YouTube In-Stream reklamlarında yalnızca 30 saniye izlendiğinde veya tıklandığında ödeme yapılır. Aylık 5.000 TL bütçeyle bile hedefli ve ölçülebilir sonuçlar alınabilir.",
  },
  {
    q: "Video çekimi için ekip mi tutmamız gerekiyor?",
    a: "Hayır. Mevcut görselleriniz, stok videolar veya akıllı telefon çekimleriyle etkili kampanyalar oluşturulabilir. Prodüksiyon rehberliği hizmetimizle çekim brief'i ve script hazırlıyoruz.",
  },
  {
    q: "YouTube reklamları ne kadar sürede sonuç verir?",
    a: "Marka bilinirliği kampanyalarında ilk veriler 1-2 haftada gelir. Dönüşüm odaklı kampanyalarda anlamlı optimizasyon için 30-60 günlük veri birikimi gerekir.",
  },
  {
    q: "Sağlık sektöründe YouTube reklamı verebilir miyiz?",
    a: "Evet, ancak sağlık reklamları için Google'ın özel politikaları vardır. Google'ın sağlık sektörü reklam politikalarını bilen ve uyumlu kampanyalar kuran bir ajans olarak bu kısıtlamaları doğru yönetiyoruz.",
  },
  {
    q: "Video reklamlarla web siteme trafik çekebilir miyim?",
    a: "Evet. YouTube Video Action kampanyaları hem görüntülenme hem de tıklama sağlar. Landing page optimizasyonuyla birleşince güçlü bir dönüşüm hunisi oluşur.",
  },
  {
    q: "Mevcut YouTube kanalımı reklam kampanyasıyla büyütebilir miyiz?",
    a: "Evet. Abone büyümesi ve video görüntülenme hedefli kampanyalar organik büyümeyi hızlandırır. Kanal SEO'su ve içerik stratejisiyle entegre çalışıyoruz.",
  },
];

export default function VideoPazarlamaPage() {
  return (
    <SubServicePageTemplate
      seo={{
        title: "YouTube & Video Pazarlama — Video Reklam Ajansı",
        description:
          "YouTube reklamları ve video içerik stratejisiyle markanızı büyütün.",
        url: "https://premiumdijital.com/hizmetler/performans-pazarlama/video-pazarlama",
        faqs: videoFaqs,
        breadcrumb: [
          { name: "Ana Sayfa", href: "/" },
          { name: "Hizmetler", href: "/hizmetler" },
          {
            name: "Performans Pazarlama",
            href: "/hizmetler/performans-pazarlama",
          },
          {
            name: "YouTube & Video Pazarlama",
            href: "/hizmetler/performans-pazarlama/video-pazarlama",
          },
        ],
      }}
      hero={{
        eyebrow: "YouTube & Video Reklam Yönetimi",
        title: "Görüntü İkna Eder,",
        accent: "Video Satar.",
        description:
          "Sağlık ve turizm sektörüne özel YouTube reklamları, video stratejisi ve görüntülü kampanyalarla markanızı doğru kitleye ulaştırıyoruz.",
        bgImage:
          "/img/hizmetler/ppc-performans-pazarlama/video-pazarlama/video-hero.webp",
        primaryCta: {
          label: "Ücretsiz Video Strateji Önerisi Al",
          href: "#strateji",
        },
        secondaryCta: { label: "Sektör Örneklerini Gör", href: "#sektor" },
        stats: [
          { value: "2B+", label: "YouTube Aylık Kullanıcı" },
          { value: "2x", label: "Video Sonrası Satın Alma" },
          { value: "%80", label: "LP Dönüşüm Artışı" },
        ],
      }}
      finalCta={{
        title: (
          <>
            Video Stratejinizi <br />
            <span className="text-brand-purple">Birlikte Kuralım</span>
          </>
        ),
        description:
          "Sektörünüze özel video strateji önerisini ücretsiz alın. 1 iş günü içinde dönüyoruz.",
        links: [
          {
            label: "Google Ads Yönetimi",
            href: "/hizmetler/performans-pazarlama/google-ads-yonetimi",
            icon: "target",
          },
          {
            label: "Meta Ads Yönetimi",
            href: "/hizmetler/performans-pazarlama/meta-ads",
            icon: "share",
          },
        ],
      }}
      customNav={<VideoStickyNav key="video-sticky-nav" />}
    >
      <VideoWhySection key="why" />
      <div key="format" id="format">
        <VideoFormats />
      </div>
      <div key="surec" id="surec">
        <VideoProcess />
      </div>
      <div key="sektor" id="sektor">
        <VideoSectors />
      </div>
      <div key="strateji" id="strateji">
        <VideoStrategyForm />
      </div>
      <div key="sss" id="sss">
        <FAQSection faqs={videoFaqs} />
      </div>
    </SubServicePageTemplate>
  );
}
