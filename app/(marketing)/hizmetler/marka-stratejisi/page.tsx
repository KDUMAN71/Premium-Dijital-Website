import type { Metadata } from "next";
import MarkaStratejisiClient from "./MarkaStratejisiClient";

/* ─── Metadata ─────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "Marka Kimliği & Görsel İletişim Mimarisi | Premium Dijital",
  description:
    "Kurumsal kimlik tasarımı, marka rehberi, UI sistemi ve görsel strateji. Rakiplerden ayrışan, güven oluşturan ve akılda kalan marka kimliği sistemi kuruyoruz.",
};

/* ─── JSON-LD Schema ────────────────────────────────────────────────────────── */

const pageUrl = "https://premiumdijital.com/hizmetler/marka-stratejisi";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Marka ve Görsel İletişim Mimarisi",
  provider: {
    "@type": "Organization",
    name: "Premium Dijital",
    url: "https://premiumdijital.com",
  },
  description:
    "Rakamlarla kanıtlanmış, hayallerle tasarlanmış bütünsel marka kimliği ve görsel strateji çözümleri.",
  url: pageUrl,
  areaServed: "TR",
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
      name: "Marka & Strateji",
      item: pageUrl,
    },
  ],
};

/* ─── Sayfa ─────────────────────────────────────────────────────────────────── */

export default function MarkaVeGorselIletisimPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <MarkaStratejisiClient />
    </>
  );
}
