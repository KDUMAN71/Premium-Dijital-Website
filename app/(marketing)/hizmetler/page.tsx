"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import {
  ArrowUpRight,
  Globe,
  Palette,
  Workflow,
  Target,
  ChevronRight,
} from "lucide-react";

/**
 * SEO & SCHEMA VERİSİ (Teknik SEO)
 */
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Dijital Büyüme ve Pazarlama Hizmetleri",
  provider: {
    "@type": "Organization",
    name: "Premium Dijital",
    url: "https://premiumdijital.com",
  },
  areaServed: "Global",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Dijital Hizmetler",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "PPC & Performans Pazarlama",
        },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Dijital Mimari" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Marka & Strateji" },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Dijital Operasyon",
        },
      },
    ],
  },
};

/**
 * HİZMET VERİLERİ (İçerik & Anahtar Kelime Dengesi)
 */
const services = [
  {
    title: "PPC & Performans Pazarlama",
    slug: "performans-pazarlama",
    desc: "Google Ads ve Meta Ads yönetiminde ROI odaklı, veri madenciliği ile desteklenen yüksek performanslı reklam stratejileri.",
    icon: <Target className="text-brand-blue" size={26} />,
    items: [
      "Google Ads Yönetimi",
      "Meta Ads Yönetimi",
      "Yeniden Pazarlama",
      "ROI Optimizasyonu",
    ],
    color: "blue",
  },
  {
    title: "Dijital Mimari",
    slug: "dijital-mimari",
    desc: "Teknik SEO, hız optimizasyonu ve yüksek dönüşüm (CRO) odaklı modern web altyapıları ile markanızı güçlendiriyoruz.",
    icon: <Globe className="text-brand-purple" size={26} />,
    items: [
      "Modern Web Tasarımı",
      "Teknik SEO",
      "Dönüşüm Hunisi (CRO)",
      "Sosyal Medya Yönetimi",
    ],
    color: "purple",
  },
  {
    title: "Marka & Strateji",
    slug: "marka-stratejisi",
    desc: "Kurumsal kimlikten medya üretimine, markanızın hikayesini dijital dünyada sarsılmaz bir estetikle anlatıyoruz.",
    icon: <Palette className="text-brand-blue" size={26} />,
    items: [
      "Kurumsal Kimlik",
      "Medya Üretimi",
      "Stratejik Konumlandırma",
      "Yol Haritası",
    ],
    color: "blue",
  },
  {
    title: "Dijital Operasyon",
    slug: "dijital-operasyon",
    desc: "CRM, otomasyon ve AI iş akışlarıyla operasyonunuzu sistemleştiriyor, dijital entropiyi düzene dönüştürüyoruz.",
    icon: <Workflow className="text-brand-purple" size={26} />,
    items: [
      "CRM Kurulumu",
      "İş Akışı Otomasyonu",
      "AI Entegrasyonu",
      "Veri Zekası",
    ],
    color: "purple",
  },
];

export default function HizmetlerPage() {
  return (
    <main className="bg-brand-dark text-white selection:bg-brand-blue/30 overflow-x-hidden relative">
      {/* JSON-LD Schema (Teknik SEO) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* ARKA PLAN DOKUSU */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 h-[500px] w-[500px] bg-brand-blue/5 blur-[120px]" />
      </div>

      {/* --- HERO: BREADCRUMB & SEO --- */}
      <section className="relative pt-32 pb-16 px-6 max-w-7xl mx-auto md:pt-48 md:pb-32">
        <Reveal>
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/20 mb-10"
          >
            <Link href="/" className="hover:text-brand-blue transition-colors">
              Ana Sayfa
            </Link>
            <ChevronRight size={10} />
            <span className="text-white/40 italic">Hizmetler</span>
          </nav>

          <h1 className="text-[2.4rem] leading-[1.05] sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tighter uppercase italic">
            Dijital Büyüme <br />
            <span className="bg-gradient-to-r from-brand-blue via-brand-purple to-brand-purple bg-clip-text text-transparent">
              Mühendislik Katmanları.
            </span>
          </h1>
          <p className="mt-10 max-w-2xl text-base md:text-xl text-white/35 font-light leading-relaxed border-l border-white/10 pl-8">
            Performanstan teknolojiye, kimlikten altyapıya kadar her katmanı bir
            bütün olarak tasarlıyor, markanız için sürdürülebilir bir sistem
            kuruyoruz.
          </p>
        </Reveal>
      </section>

      {/* --- HİZMETLER: RESPONSIVE GRID & UX --- */}
      <section className="pb-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {services.map((service, i) => (
            <Reveal key={i}>
              <article className="group relative h-full p-8 md:p-12 rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent hover:border-brand-blue/20 transition-all duration-500">
                <div className="flex justify-between items-start mb-12">
                  <div
                    className={`p-4 rounded-2xl bg-white/5 border border-white/10 transition-all duration-500 group-hover:scale-110 group-hover:bg-brand-${service.color}/10`}
                  >
                    {service.icon}
                  </div>
                  <Link
                    href={`/hizmetler/${service.slug}`}
                    className="text-white/20 group-hover:text-white transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1"
                    title={`${service.title} detaylarını incele`}
                  >
                    <ArrowUpRight size={32} />
                  </Link>
                </div>

                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-tight mb-4 italic text-white/90">
                  {service.title}
                </h2>
                <p className="text-white/40 text-sm md:text-base leading-relaxed font-light mb-10">
                  {service.desc}
                </p>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/5 pt-10">
                  {service.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3 text-[11px] uppercase tracking-widest text-white/25 group-hover:text-white/50 transition-colors"
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full bg-brand-${service.color}`}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* --- CTA: CONVERSION FUNNEL (CRO) --- */}
      <section className="py-32 px-6">
        <Reveal>
          <div className="max-w-5xl mx-auto text-center border-t border-white/5 pt-24 relative">
            <div className="absolute inset-0 bg-brand-purple/5 blur-[100px] -z-10" />
            <h2 className="text-3xl md:text-6xl font-bold tracking-tighter uppercase text-white/80 leading-tight">
              Sisteminizi <br />
              <span className="text-brand-purple italic font-light">
                Birlikte Kurgulayalım.
              </span>
            </h2>
            <div className="mt-14 flex flex-col items-center gap-6">
              <Link
                href="/iletisim"
                className="shimmer-effect bg-brand-blue px-14 py-5 rounded-full font-black text-[11px] uppercase tracking-[0.2em] text-white transition-transform hover:scale-105"
              >
                Analiz Yol Haritası →
              </Link>
              <p className="text-[9px] uppercase tracking-widest text-white/20">
                Milisaniyelik veri hassasiyeti ile planlanmış stratejiler.
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
