// app/(marketing)/layout.tsx

import type { ReactNode } from "react";
import MarketingNav from "@/components/layout/MarketingNav";
import Link from "next/link";
import Image from "next/image";
import WhatsAppCTAGlass from "@/components/global/WhatsAppCTAGlass";
import SocialSidebar from "@/components/global/SocialSidebar";
import Footer from "@/components/global/Footer";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative isolate min-h-screen bg-brand-dark text-white selection:bg-brand-blue/30 overflow-x-clip">
      <MarketingNav />

      {/* GLOBAL AMBIENT LIGHT LAYER */}
      <div className="pointer-events-none fixed inset-0 -z-0">
        <div className="absolute -top-40 left-1/2 h-96 w-[60rem] -translate-x-1/2 rounded-full bg-brand-blue/10 blur-[140px]" />
        <div className="absolute top-[40vh] left-1/4 h-96 w-[46rem] rounded-full bg-brand-purple/10 blur-[140px]" />
      </div>

      {/* SOCIALS */}
      <SocialSidebar />
      {/* <aside
        className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-5"
        aria-label="Sosyal bağlantılar"
      >
        {[
          { label: "LinkedIn", text: "Ln", href: "https://www.linkedin.com" },
          { label: "Instagram", text: "Ig", href: "https://www.instagram.com" },
          { label: "Facebook", text: "Fb", href: "https://www.facebook.com" },
          { label: "X", text: "X", href: "https://x.com" },
        ].map((item) => (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            className="shimmer-effect w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl relative overflow-hidden"
          >
            <span className="text-sm font-bold opacity-80">{item.text}</span>
          </a>
        ))}
      </aside> */}

      {/* WHATSAPP (Premium) */}
      {/* <WhatsAppCTA /> */}
      <WhatsAppCTAGlass />

      <main id="content" className="relative z-10 ">
        {children}
      </main>

      {/* FOOTER */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Premium Dijital Reklam Ajansı ve Pazarlama",
            url: "https://premiumdijital.com",
            logo: "https://premiumdijital.com/img/brand/premiumdijital-logo-500px.webp",
            image: "https://premiumdijital.com/img/brand/premiumdijital-logo-500px.webp",
            telephone: "+902129825724",
            email: "info@premiumdijital.com",
            address: {
              "@type": "PostalAddress",
              streetAddress:
                "Ziya Gökalp Mah. Süleyman Demirel Bulv. Mall Of İstanbul The Office No:7E D:136",
              addressLocality: "Başakşehir",
              addressRegion: "İstanbul",
              postalCode: "34490",
              addressCountry: "TR",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 41.0766,
              longitude: 28.8097,
            },
            openingHoursSpecification: {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              opens: "09:00",
              closes: "18:00",
            },
            sameAs: [
              "https://www.instagram.com/premiumdijital",
              "https://www.linkedin.com/company/premiumdijital/",
              "https://www.facebook.com/premiumdijital",
            ],
          }),
        }}
      />
      <Footer />
    </div>
  );
}
