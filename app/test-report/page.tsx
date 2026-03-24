"use client";

import React, { useState } from "react";
import type { AnalysisData } from "@/types/analysis";

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

/* ─── Yardımcı: PDF indir ─────────────────── */
async function downloadPdf(type: "client" | "internal") {
  const res = await fetch("/api/generate-report", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: mockData, type }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Bilinmeyen hata" }));
    throw new Error(err.detail ?? err.error ?? "PDF oluşturulamadı");
  }

  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;

  const disposition = res.headers.get("Content-Disposition") ?? "";
  const match = disposition.match(/filename="([^"]+)"/);
  a.download = match?.[1] ?? `rapor-${type}.pdf`;

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* ─── Sayfa ─────────────────────────────────── */
type ReportType = "client" | "internal";

type LoadState = "idle" | "loading" | "error";

export default function TestPdfPage() {
  const [state, setState] = useState<Record<ReportType, LoadState>>({
    client: "idle",
    internal: "idle",
  });
  const [errors, setErrors] = useState<Record<ReportType, string>>({
    client: "",
    internal: "",
  });

  async function handleDownload(type: ReportType) {
    setState((s) => ({ ...s, [type]: "loading" }));
    setErrors((e) => ({ ...e, [type]: "" }));
    try {
      await downloadPdf(type);
      setState((s) => ({ ...s, [type]: "idle" }));
    } catch (err) {
      setState((s) => ({ ...s, [type]: "error" }));
      setErrors((e) => ({ ...e, [type]: String(err) }));
    }
  }

  const btnConfig: { type: ReportType; label: string; color: string; loadLabel: string }[] = [
    {
      type: "client",
      label: "Müşteri Raporu İndir",
      color: "#0000C8",
      loadLabel: "Oluşturuluyor...",
    },
    {
      type: "internal",
      label: "İç Rapor İndir",
      color: "#C0392B",
      loadLabel: "Oluşturuluyor...",
    },
  ];

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        backgroundColor: "#020204",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "monospace",
      }}
    >
      {/* Başlık */}
      <p
        style={{
          fontSize: 10,
          color: "rgba(255,255,255,0.25)",
          textTransform: "uppercase",
          letterSpacing: "0.3em",
          marginBottom: 8,
        }}
      >
        PDF Test — Puppeteer
      </p>
      <p
        style={{
          fontSize: 14,
          color: "rgba(255,255,255,0.7)",
          marginBottom: 6,
        }}
      >
        {mockData.clientName}
      </p>
      <p
        style={{
          fontSize: 11,
          color: "rgba(255,255,255,0.3)",
          marginBottom: 48,
        }}
      >
        {mockData.reportDate} · Skor: {mockData.overallScore}/100
      </p>

      {/* Butonlar */}
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
        {btnConfig.map(({ type, label, color, loadLabel }) => (
          <div key={type} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <button
              onClick={() => handleDownload(type)}
              disabled={state[type] === "loading"}
              style={{
                padding: "14px 32px",
                borderRadius: 8,
                border: "none",
                cursor: state[type] === "loading" ? "wait" : "pointer",
                fontFamily: "monospace",
                fontSize: 12,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                backgroundColor: state[type] === "loading" ? "rgba(255,255,255,0.1)" : color,
                color: state[type] === "loading" ? "rgba(255,255,255,0.4)" : "#fff",
                transition: "all 0.2s",
                minWidth: 200,
              }}
            >
              {state[type] === "loading" ? loadLabel : label}
            </button>
            {state[type] === "error" && (
              <p
                style={{
                  fontSize: 10,
                  color: "#e74c3c",
                  maxWidth: 220,
                  textAlign: "center",
                  lineHeight: 1.4,
                }}
              >
                {errors[type]}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Bilgi */}
      <p
        style={{
          marginTop: 56,
          fontSize: 10,
          color: "rgba(255,255,255,0.15)",
          textAlign: "center",
          lineHeight: 1.6,
          maxWidth: 400,
        }}
      >
        POST /api/generate-report → Puppeteer → A4 PDF
        <br />
        Local: sistem Chrome · Vercel: @sparticuz/chromium
      </p>
    </div>
  );
}
