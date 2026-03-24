import type { Metadata } from "next";
import DijitalOperasyonClient from "./DijitalOperasyonClient";

/* ─── Metadata ─────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "Dijital Operasyon & AI Destekli İş Süreçleri | Premium Dijital",
  description:
    "Make.com, HubSpot, Zoho, AI Agents, Google Workspace ve daha fazlasıyla iş süreçlerinizi otomatize edin. Satış, operasyon, müşteri iletişimi ve veri zekasını tek bir dijital sistem altında birleştiriyoruz.",
};

/* ─── JSON-LD Schemas ───────────────────────────────────────────────────────── */

const pageUrl = "https://premiumdijital.com/hizmetler/dijital-operasyon";

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Dijital Operasyon & AI Destekli İş Süreçleri",
  url: pageUrl,
  description:
    "İş süreçlerini otomatize eden, satış hattını güçlendiren ve veri zekasını etkinleştiren dijital operasyon sistemi.",
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
  name: "Dijital Operasyon & AI Destekli İş Süreçleri",
  serviceType: "Dijital Operasyon Danışmanlığı",
  provider: {
    "@type": "Organization",
    name: "Premium Dijital",
    url: "https://premiumdijital.com",
  },
  areaServed: "TR",
  description:
    "Make.com, HubSpot, Zoho, AI Agents, Google Workspace entegrasyonu ile iş süreçleri otomasyonu, satış hattı kurulumu ve veri zekası sistemi.",
  url: pageUrl,
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Dijital Operasyon Yetenek Paketleri",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Satış Makinesi" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Kurumsal Hafıza" },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Kesintisiz Müşteri Deneyimi",
        },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Veri Zekası" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Dijital İş Gücü" },
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
      name: "Dijital Operasyon",
      item: pageUrl,
    },
  ],
};

/* ─── Sayfa ─────────────────────────────────────────────────────────────────── */

export default function DijitalOperasyonPage() {
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
      <DijitalOperasyonClient />
    </>
  );
}
