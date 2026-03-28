import { Metadata } from "next";
import SubServicePageTemplate from "@/components/templates/SubServicePageTemplate";
import SosyalWhySection from "@/components/sections/services/sosyal-medya/SosyalWhySection";
import SosyalPlatforms from "@/components/sections/services/sosyal-medya/SosyalPlatforms";
import ContentSystem from "@/components/sections/services/sosyal-medya/ContentSystem";
import SosyalPackages from "@/components/sections/services/sosyal-medya/SosyalPackages";
import MiniCaseStudy from "@/components/sections/services/sosyal-medya/MiniCaseStudy";
import SosyalAnalysisForm from "@/components/sections/services/sosyal-medya/SosyalAnalysisForm";
import FAQSection from "@/components/sections/services/sosyal-medya/FAQSection";
import SosyalStickyNav from "@/components/sections/services/sosyal-medya/SosyalStickyNav";

export const metadata: Metadata = {
  title:
    "Sosyal Medya Yönetimi — Instagram, LinkedIn & YouTube | Premium Dijital",
  description:
    "Instagram, Facebook, LinkedIn ve YouTube organik büyüme yönetimi. İçerik stratejisi, topluluk yönetimi ve marka sesi ile sosyal medyada kalıcı büyüme.",
  alternates: {
    canonical:
      "https://premiumdijital.com/hizmetler/dijital-mimari/sosyal-medya-yonetimi",
  },
};

const sosyalFaqs = [
  {
    q: "Sosyal medya yönetimi ne kadar sürede sonuç verir?",
    a: "İlk 30 günde içerik sistemi kurulur ve profil optimizasyonu tamamlanır. Organik büyüme için 3-6 ay tutarlı yayın gerekirken, topluluk etkileşimi genellikle 4-8 haftada başlar. Sabır isteyen ama kalıcı sonuç veren bir kanaldır.",
  },
  {
    q: "Kaç post paylaşılacak, içerikleri kim üretiyor?",
    a: "Pakete göre ayda 8-20 post arasında değişir. Görseller, metinler ve hashtag stratejisi tamamen ajans tarafından üretilir. Sizden yalnızca aylık brief görüşmesi ve varsa sektöre özel güncel bilgi beklenir.",
  },
  {
    q: "Sosyal medya hesaplarım bende mi kalır?",
    a: "Kesinlikle. Tüm hesaplar sizin mülkiyetinizdedir. Biz yönetici erişimiyle çalışırız — şifrenizi asla talep etmeyiz, sadece admin yetkisi yeterlidir.",
  },
  {
    q: "Instagram ve LinkedIn'i aynı anda yönetebilir misiniz?",
    a: "Evet. Her platform için ayrı içerik stratejisi ve ton belirliyoruz. Instagram görsel odaklı, LinkedIn otorite ve B2B odaklı çalışır — ikisi birbirini destekleyecek şekilde planlanır.",
  },
  {
    q: "Sağlık sektöründe sosyal medya yönetimi farklı mı?",
    a: "Evet. Sağlık içeriklerinde tıbbi iddia yasağı, hasta gizliliği ve platform politikaları dikkatle yönetilmeli. Google'ın sağlık sektörü içerik politikalarını bilen ve bu kurallara uyumlu içerik üreten bir ekiple çalışmak, hem hesap güvenliğinizi hem de kurumsal itibarınızı korur. Sağlık turizmi, estetik ve klinik alanlarında deneyimliyiz.",
  },
  {
    q: "YouTube organik büyüme ile YouTube reklamları aynı mı?",
    a: "Hayır. Organik büyüme; video optimizasyonu, başlık/açıklama SEO'su ve yayın takvimi yönetimidir — reklam bütçesi gerektirmez. Reklam yönetimi için YouTube & Video Pazarlama hizmetimize bakınız.",
  },
];

export default function SosyalMedyaPage() {
  return (
    <SubServicePageTemplate
      seo={{
        title: "Sosyal Medya Yönetimi — Instagram, LinkedIn & YouTube",
        description:
          "Instagram, Facebook, LinkedIn ve YouTube organik büyüme yönetimi.",
        url: "https://premiumdijital.com/hizmetler/dijital-mimari/sosyal-medya-yonetimi",
        faqs: sosyalFaqs,
        breadcrumb: [
          { name: "Ana Sayfa", href: "/" },
          { name: "Hizmetler", href: "/hizmetler" },
          {
            name: "Dijital Mimari",
            href: "/hizmetler/dijital-mimari",
          },
          {
            name: "Sosyal Medya Yönetimi",
            href: "/hizmetler/dijital-mimari/sosyal-medya-yonetimi",
          },
        ],
      }}
      hero={{
        eyebrow: "Instagram · Facebook · LinkedIn · YouTube",
        title: "Rakipleriniz Büyüyor.",
        accent: "Siz Neredesiniz?",
        description:
          "Sosyal medyada aktif olan rakipleriniz her gün müşteri kazanırken, durağan profiller güven öldürür. İçerik stratejisi ve topluluk yönetimiyle sosyal medyayı müşteri kazanım kanalına dönüştürüyoruz. Klinikten otele, B2B'den perakende markaya — her sektörde organik büyüme.",
        bgImage:
          "/img/hizmetler/ppc-performans-pazarlama/sosyal-medya/sosyal-medya-hero.webp",
        primaryCta: { label: "Platform Analizi Al", href: "#analiz" },
        secondaryCta: { label: "Paketleri İncele", href: "#paketler" },
        stats: [
          { value: "4.9B", label: "Sosyal Medya Kullanıcısı" },
          { value: "%73", label: "Kullanıcı Marka Araştırıyor" },
          { value: "6x", label: "Organik Güven Avantajı" },
        ],
      }}
      finalCta={{
        title: (
          <>
            Sosyal Medyanızı <br />
            <span className="text-brand-purple">
              Büyüme Motoruna Dönüştürün
            </span>
          </>
        ),
        description:
          "İçerik üretiminden topluluk yönetimine — sosyal medyayı sistematik hale getiriyoruz.",
        links: [
          {
            label: "Meta Ads Yönetimi",
            href: "/hizmetler/performans-pazarlama/meta-ads",
            icon: "target",
          },
          {
            label: "YouTube & Video",
            href: "/hizmetler/performans-pazarlama/video-pazarlama",
            icon: "share",
          },
        ],
      }}
      customNav={<SosyalStickyNav key="sosyal-sticky-nav" />}
    >
      <SosyalWhySection key="why" />
      <div key="platform" id="platform">
        <SosyalPlatforms />
      </div>
      <div key="icerik" id="icerik">
        <ContentSystem />
      </div>
      <div key="paketler" id="paketler">
        <SosyalPackages />
      </div>
      <div key="vaka" id="vaka">
        <MiniCaseStudy />
      </div>
      <div key="analiz" id="analiz">
        <SosyalAnalysisForm />
      </div>
      <div key="sss" id="sss">
        <FAQSection faqs={sosyalFaqs} />
      </div>
    </SubServicePageTemplate>
  );
}
