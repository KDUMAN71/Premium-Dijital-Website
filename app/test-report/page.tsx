"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import type { AnalysisData } from "@/types/analysis";
import ClientReport from "@/components/pdf/ClientReport";
import InternalReport from "@/components/pdf/InternalReport";

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full items-center justify-center text-white/40 font-mono text-xs uppercase tracking-widest">
        PDF Yükleniyor...
      </div>
    ),
  },
);

/* ─── Mock Data ─────────────────────────────── */
const mockData: AnalysisData = {
  reportId: "2026/ANALIZ-001",
  reportDate: "24 Mart 2026",
  preparedBy: "Premium Dijital",
  clientName: "Örnek Sağlık Grubu",
  clientUrl: "orneksaglik.com",
  sector: "Sağlık Turizmi",
  segment: "Ultra-Premium",
  overallScore: 42,
  scoreLabel: "Gelişim Gerekli",
  executiveSummary:
    "Markanız sektördeki rakiplerine kıyasla dijital görünürlük açısından kritik eksiklikler taşımaktadır. Web sitesi teknik altyapısı, reklam yapılandırması ve sosyal medya yönetiminde sistematik iyileştirmeler yapılmadan mevcut bütçenin verimliliği artırılamaz.",
  topIssues: [
    {
      issue: "Sayfa hızı 8.2 saniye",
      risk: "Yüksek hemen çıkma oranı",
      estimatedLoss: "Aylık ~120 potansiyel hasta",
    },
    {
      issue: "Google Ads kalite skoru 3/10",
      risk: "Reklam maliyeti %40 fazla",
      estimatedLoss: "Aylık ~15.000 TL israf",
    },
    {
      issue: "Sosyal medya tutarsızlığı",
      risk: "Marka güveni zedeleniyor",
      estimatedLoss: "Dönüşüm oranı -%25",
    },
  ],
  seo: {
    score: 38,
    pageSpeed: 8200,
    mobileScore: 42,
    technicalErrors: 14,
    findings: [
      "Core Web Vitals başarısız (LCP 8.2s)",
      "14 kırık link tespit edildi",
      "Meta açıklamaları eksik veya tekrarlı",
      "Görsel dosyaları optimize edilmemiş",
    ],
    recommendations: [
      "Görsel optimizasyonu ve WebP dönüşümü yapılmalı",
      "CDN kurulumu ve önbellekleme stratejisi uygulanmalı",
      "Teknik SEO audit tamamlanmalı",
    ],
    gain:
      "Sayfa hızı 2 saniyenin altına indiğinde dönüşüm oranı %15 artış göstermesi beklenmektedir.",
  },
  ppc: {
    score: 35,
    competitorSpend: "₺45.000/ay",
    qualityScore: 3,
    findings: [
      "Landing page ile reklam içeriği uyumsuz",
      "Negatif anahtar kelime listesi boş",
      "Reklam grupları çok geniş yapılandırılmış",
    ],
    recommendations: [
      "Sektöre özel dedicated landing page oluşturulmalı",
      "Anahtar kelime yapısı SKAG mimarisine göre yeniden kurgulanmalı",
    ],
    gain:
      "Kalite skoru 7'ye çıktığında aynı bütçeyle %40 daha fazla tıklama elde edilebilir.",
  },
  social: {
    score: 51,
    engagementRate: "%1.2",
    consistencyScore: 58,
    findings: [
      "Görsel kimlik tutarsız (3 farklı logo versiyonu)",
      "Yayın sıklığı düzensiz — ayda 4-5 gönderi",
    ],
    recommendations: [
      "Marka kılavuzu tüm platformlara uygulanmalı",
      "Haftalık içerik takvimi oluşturulmalı",
    ],
    gain:
      "Tutarlı içerik stratejisiyle 6 ayda organik erişim 3 katına çıkabilir.",
  },
  operations: {
    score: 45,
    techStack: ["WordPress", "Google Analytics", "WhatsApp"],
    automationGaps: [
      "CRM sistemi mevcut değil",
      "Lead takibi tamamen manuel",
      "E-posta otomasyonu yok",
    ],
    findings: [
      "Hasta randevu sistemi manuel takip ediliyor",
      "Lead kayıpları ölçülemiyor ve takip edilemiyor",
    ],
    recommendations: [
      "CRM kurulumu önceliklendirilmeli (HubSpot veya GoHighLevel)",
      "WhatsApp Business API entegrasyonu planlanmalı",
    ],
    gain:
      "Otomasyon kurulumundan sonra haftalık 10-15 saat operasyonel tasarruf sağlanabilir.",
  },
  internal: {
    rawData: {},
    actionItems: [
      {
        priority: "HIGH",
        task: "Teknik SEO audit başlat",
        owner: "Kerim",
        deadline: "1 hafta",
      },
      {
        priority: "HIGH",
        task: "Google Ads yapısını yeniden kur",
        owner: "PPC Ekibi",
        deadline: "2 hafta",
      },
      {
        priority: "MEDIUM",
        task: "CRM demo planla ve karşılaştır",
        owner: "Kerim",
        deadline: "1 ay",
      },
      {
        priority: "MEDIUM",
        task: "İçerik takvimi hazırla",
        owner: "Sosyal Ekip",
        deadline: "2 hafta",
      },
      {
        priority: "LOW",
        task: "E-posta otomasyon senaryoları yaz",
        owner: "Kerim",
        deadline: "6 hafta",
      },
    ],
    salesNotes:
      "Müşteri bütçe konusunda esnekti. Sağlık turizmi PPC paketine özellikle ilgili göründü. Rakip olarak Acıbadem ve Memorial'ı referans verdi. Karar verici GM — CFO'ya da brifing gerekiyor.",
    estimatedBudget: "₺35.000 - ₺55.000 / ay",
  },
};

/* ─── Sayfa ─────────────────────────────────── */
type ReportType = "client" | "internal";

export default function TestPdfPage() {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState<ReportType>("client");

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#020204",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Kontrol Şeridi */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "10px 20px",
          backgroundColor: "#0a0a12",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontSize: 10,
            fontFamily: "monospace",
            color: "rgba(255,255,255,0.3)",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            marginRight: 8,
          }}
        >
          PDF Test
        </span>
        {(["client", "internal"] as ReportType[]).map((type) => (
          <button
            key={type}
            onClick={() => setActive(type)}
            style={{
              padding: "6px 18px",
              borderRadius: 6,
              border: "none",
              cursor: "pointer",
              fontFamily: "monospace",
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              transition: "all 0.2s",
              backgroundColor:
                active === type
                  ? type === "internal"
                    ? "#C0392B"
                    : "#0000C8"
                  : "rgba(255,255,255,0.06)",
              color:
                active === type ? "#fff" : "rgba(255,255,255,0.4)",
            }}
          >
            {type === "client" ? "Müşteri Raporu" : "İç Rapor"}
          </button>
        ))}
        <span
          style={{
            marginLeft: "auto",
            fontSize: 10,
            fontFamily: "monospace",
            color: "rgba(255,255,255,0.2)",
          }}
        >
          {mockData.clientName} · {mockData.reportDate}
        </span>
      </div>

      {/* PDF Viewer */}
      <div style={{ flex: 1, minHeight: 0 }}>
        {mounted && (
          <PDFViewer style={{ width: "100%", height: "100%", border: "none" }}>
            {active === "client" ? (
              <ClientReport data={mockData} />
            ) : (
              <InternalReport data={mockData} />
            )}
          </PDFViewer>
        )}
      </div>
    </div>
  );
}
