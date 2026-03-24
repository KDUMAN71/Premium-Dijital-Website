import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
// Font.register için import (yan etki olarak çalıştırır)
import "@/components/pdf/shared/styles";
import { COLORS, scoreColor } from "@/components/pdf/shared/styles";
import type { AnalysisData } from "@/types/analysis";

/* ─────────────────────────────────────────────
   STILLER
───────────────────────────────────────────── */
const S = StyleSheet.create({
  page: {
    backgroundColor: COLORS.white,
    fontFamily: "Inter",
    color: COLORS.dark,
    fontSize: 10,
    paddingBottom: 64,
  },
  topAccent: {
    height: 8,
    backgroundColor: COLORS.blue,
    width: "100%",
  },
  container: {
    paddingHorizontal: 52,
    paddingTop: 32,
    flex: 1,
  },

  /* ── Sayfa Footer ── */
  pageFooter: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 48,
    paddingHorizontal: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 0.5,
    borderTopColor: COLORS.border,
  },
  pageFooterText: {
    fontSize: 7,
    color: "#AAAAAA",
    letterSpacing: 0.8,
  },
  pageNumber: {
    fontSize: 7,
    color: "#AAAAAA",
  },

  /* ── Sayfa Header (2-6. sayfalar) ── */
  pageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 28,
  },
  pageHeaderBrand: {
    fontSize: 11,
    fontWeight: 700,
    color: COLORS.blue,
    letterSpacing: 0.5,
  },
  pageHeaderClient: {
    fontSize: 8,
    color: COLORS.gray,
    letterSpacing: 0.5,
  },

  /* ── Bölüm Başlığı ── */
  sectionLabel: {
    fontSize: 8,
    fontWeight: 700,
    color: COLORS.purple,
    letterSpacing: 3,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: COLORS.dark,
    marginBottom: 20,
    lineHeight: 1.2,
  },
  divider: {
    height: 0.5,
    backgroundColor: COLORS.border,
    marginVertical: 16,
  },

  /* ── Kapak ── */
  coverHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 56,
  },
  coverBrand: {
    fontSize: 18,
    fontWeight: 700,
    color: COLORS.blue,
    letterSpacing: 1,
  },
  coverTagline: {
    fontSize: 7,
    textTransform: "uppercase",
    letterSpacing: 3,
    color: COLORS.purple,
    marginTop: 4,
  },
  coverReportMeta: {
    fontSize: 8,
    color: "#CCCCCC",
    textAlign: "right",
    lineHeight: 1.6,
  },
  coverPreTitle: {
    fontSize: 9,
    fontWeight: 700,
    color: COLORS.purple,
    letterSpacing: 4,
    textTransform: "uppercase",
    marginBottom: 12,
  },
  coverMainTitle: {
    fontSize: 38,
    fontWeight: 700,
    color: COLORS.dark,
    lineHeight: 1.1,
    letterSpacing: -0.5,
  },
  clientBox: {
    marginTop: 48,
    paddingLeft: 20,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.blue,
  },
  clientBoxLabel: {
    fontSize: 8,
    color: COLORS.gray,
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 6,
  },
  clientBoxName: {
    fontSize: 24,
    fontWeight: 700,
    color: COLORS.dark,
    marginBottom: 10,
  },
  badgeRow: {
    flexDirection: "row",
    gap: 8,
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  badgeText: {
    fontSize: 8,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 1,
  },

  /* ── Genel Skor Kutusu ── */
  scoreBox: {
    marginTop: 40,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    padding: 20,
    backgroundColor: COLORS.lightGray,
    borderRadius: 6,
  },
  scoreCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  scoreCircleValue: {
    fontSize: 22,
    fontWeight: 700,
    color: COLORS.white,
    lineHeight: 1,
  },
  scoreBoxLabel: {
    fontSize: 8,
    color: COLORS.gray,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  scoreBoxTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: COLORS.dark,
  },
  scoreBoxSub: {
    fontSize: 9,
    color: COLORS.gray,
    marginTop: 4,
  },

  /* ── Yönetici Özeti ── */
  summaryText: {
    fontSize: 10,
    color: COLORS.gray,
    lineHeight: 1.7,
    marginBottom: 20,
  },
  issueTable: {
    marginTop: 4,
    borderRadius: 4,
    overflow: "hidden",
  },
  issueTableHeader: {
    flexDirection: "row",
    backgroundColor: COLORS.dark,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  issueTableHeaderCell: {
    fontSize: 7,
    fontWeight: 700,
    color: COLORS.white,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    flex: 1,
  },
  issueRow: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.border,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.blue,
  },
  issueRowAlt: {
    backgroundColor: COLORS.lightGray,
  },
  issueCell: {
    fontSize: 9,
    color: COLORS.dark,
    flex: 1,
    lineHeight: 1.5,
    paddingRight: 8,
  },
  issueCellRed: {
    fontSize: 9,
    color: COLORS.danger,
    flex: 1,
    fontWeight: 700,
    lineHeight: 1.5,
    paddingRight: 8,
  },

  /* ── Kategori Skor Grid ── */
  categoryGrid: {
    flexDirection: "row",
    marginTop: 20,
    gap: 10,
  },
  categoryCard: {
    flex: 1,
    padding: 12,
    backgroundColor: COLORS.lightGray,
    borderRadius: 4,
    alignItems: "center",
  },
  categoryScore: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 4,
  },
  categoryName: {
    fontSize: 7,
    color: COLORS.gray,
    textTransform: "uppercase",
    letterSpacing: 1,
    textAlign: "center",
  },

  /* ── Analiz Sayfası ── */
  analysisTop: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 20,
  },
  analysisBigScore: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  analysisBigScoreVal: {
    fontSize: 28,
    fontWeight: 700,
    color: COLORS.white,
    lineHeight: 1,
  },
  analysisBigScoreLabel: {
    fontSize: 7,
    color: "rgba(255,255,255,0.8)",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginTop: 2,
  },
  metricsRow: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
  },
  metricBox: {
    flex: 1,
    padding: 12,
    backgroundColor: COLORS.lightGray,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  metricValue: {
    fontSize: 18,
    fontWeight: 700,
    color: COLORS.blue,
    marginBottom: 3,
  },
  metricLabel: {
    fontSize: 7,
    color: COLORS.gray,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    textAlign: "center",
  },

  findingsTitle: {
    fontSize: 8,
    fontWeight: 700,
    color: COLORS.dark,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  findingRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 6,
    gap: 8,
  },
  findingBullet: {
    fontSize: 10,
    color: COLORS.danger,
    lineHeight: 1.4,
    width: 10,
    flexShrink: 0,
  },
  findingText: {
    fontSize: 9,
    color: COLORS.dark,
    lineHeight: 1.5,
    flex: 1,
  },
  recBullet: {
    fontSize: 10,
    color: COLORS.blue,
    lineHeight: 1.4,
    width: 10,
    flexShrink: 0,
  },
  recText: {
    fontSize: 9,
    color: COLORS.dark,
    lineHeight: 1.5,
    flex: 1,
  },

  gainBox: {
    marginTop: 16,
    padding: "12 16",
    backgroundColor: COLORS.blue,
    borderRadius: 4,
  },
  gainLabel: {
    fontSize: 7,
    fontWeight: 700,
    color: "rgba(255,255,255,0.7)",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 4,
  },
  gainText: {
    fontSize: 9,
    color: COLORS.white,
    lineHeight: 1.6,
  },

  /* ── Dijital Operasyon ── */
  techStackRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 16,
  },
  techBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: COLORS.blueBg,
    borderRadius: 4,
  },
  techBadgeText: {
    fontSize: 8,
    color: COLORS.blue,
    fontWeight: 700,
  },

  /* ── Son Sayfa CTA ── */
  ctaBox: {
    marginTop: 28,
    padding: 28,
    backgroundColor: COLORS.blue,
    borderRadius: 6,
  },
  ctaTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: COLORS.white,
    lineHeight: 1.2,
    marginBottom: 10,
  },
  ctaMeta: {
    fontSize: 9,
    color: "rgba(255,255,255,0.75)",
    lineHeight: 1.8,
  },
  ctaDivider: {
    height: 0.5,
    backgroundColor: "rgba(255,255,255,0.2)",
    marginVertical: 14,
  },
  ctaContact: {
    flexDirection: "row",
    gap: 20,
    flexWrap: "wrap",
  },
  ctaContactItem: {
    fontSize: 9,
    fontWeight: 700,
    color: COLORS.white,
    letterSpacing: 0.5,
  },
});

/* ─────────────────────────────────────────────
   PAYLAŞILAN ALT BİLEŞENLER
───────────────────────────────────────────── */

function PageFooter({ label }: { label: string }) {
  return (
    <View style={S.pageFooter} fixed>
      <Text style={S.pageFooterText}>© {new Date().getFullYear()} PREMIUM DIJITAL · GİZLİDİR · {label}</Text>
      <Text
        style={S.pageNumber}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
      />
    </View>
  );
}

function PageHeader({ clientName }: { clientName: string }) {
  return (
    <View style={S.pageHeader}>
      <Text style={S.pageHeaderBrand}>PREMIUM DIJITAL</Text>
      <Text style={S.pageHeaderClient}>{clientName} — Dijital Analiz Raporu</Text>
    </View>
  );
}

function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={S.sectionLabel}>{label}</Text>
      <Text style={S.sectionTitle}>{title}</Text>
      <View style={S.divider} />
    </View>
  );
}

function ScoreCircle({ score, size = 80 }: { score: number; size?: number }) {
  const color = scoreColor(score);
  return (
    <View
      style={[
        S.analysisBigScore,
        { width: size, height: size, borderRadius: size / 2, backgroundColor: color },
      ]}
    >
      <Text style={S.analysisBigScoreVal}>{score}</Text>
      <Text style={S.analysisBigScoreLabel}>/ 100</Text>
    </View>
  );
}

function Findings({ items }: { items: string[] }) {
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={S.findingsTitle}>Teşhis Bulgular</Text>
      {items.map((f, i) => (
        <View key={i} style={S.findingRow}>
          <Text style={S.findingBullet}>✕</Text>
          <Text style={S.findingText}>{f}</Text>
        </View>
      ))}
    </View>
  );
}

function Recommendations({ items }: { items: string[] }) {
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={S.findingsTitle}>Öneriler</Text>
      {items.map((r, i) => (
        <View key={i} style={S.findingRow}>
          <Text style={S.recBullet}>→</Text>
          <Text style={S.recText}>{r}</Text>
        </View>
      ))}
    </View>
  );
}

/* ─────────────────────────────────────────────
   SAYFA 1 — KAPAK
───────────────────────────────────────────── */
function CoverPage({ data }: { data: AnalysisData }) {
  const color = scoreColor(data.overallScore);
  return (
    <Page size="A4" style={S.page}>
      <View style={S.topAccent} />
      <View style={S.container}>
        {/* Header */}
        <View style={S.coverHeader}>
          <View>
            <Text style={S.coverBrand}>PREMIUM DIJITAL</Text>
            <Text style={S.coverTagline}>DİJİTAL BÜYÜME MİMARLIĞI</Text>
          </View>
          <View>
            <Text style={S.coverReportMeta}>DOSYA NO: {data.reportId}</Text>
            <Text style={S.coverReportMeta}>{data.reportDate}</Text>
            <Text style={S.coverReportMeta}>HAZIRLAYAN: {data.preparedBy}</Text>
          </View>
        </View>

        {/* Ana Başlık */}
        <Text style={S.coverPreTitle}>Stratejik Teşhis Belgesi</Text>
        <Text style={S.coverMainTitle}>DİJİTAL VARLIK VE</Text>
        <Text style={S.coverMainTitle}>KONUMLANDIRMA ANALİZİ</Text>

        {/* Müşteri Kutusu */}
        <View style={S.clientBox}>
          <Text style={S.clientBoxLabel}>Hazırlanan Kurum</Text>
          <Text style={S.clientBoxName}>{data.clientName}</Text>
          <View style={S.badgeRow}>
            <View style={[S.badge, { backgroundColor: COLORS.blueBg }]}>
              <Text style={[S.badgeText, { color: COLORS.blue }]}>{data.sector}</Text>
            </View>
            <View style={[S.badge, { backgroundColor: COLORS.purpleBg }]}>
              <Text style={[S.badgeText, { color: COLORS.purple }]}>{data.segment}</Text>
            </View>
          </View>
        </View>

        {/* Genel Skor */}
        <View style={S.scoreBox}>
          <View style={[S.scoreCircle, { backgroundColor: color }]}>
            <Text style={S.scoreCircleValue}>{data.overallScore}</Text>
          </View>
          <View>
            <Text style={S.scoreBoxLabel}>Genel Dijital Skor</Text>
            <Text style={[S.scoreBoxTitle, { color }]}>{data.scoreLabel}</Text>
            <Text style={S.scoreBoxSub}>{data.clientUrl}</Text>
          </View>
        </View>
      </View>

      <PageFooter label="MÜŞTERİ RAPORU" />
    </Page>
  );
}

/* ─────────────────────────────────────────────
   SAYFA 2 — YÖNETİCİ ÖZETİ
───────────────────────────────────────────── */
function ExecutiveSummaryPage({ data }: { data: AnalysisData }) {
  const categories = [
    { name: "SEO & Web", score: data.seo.score },
    { name: "PPC", score: data.ppc.score },
    { name: "Sosyal", score: data.social.score },
    { name: "Operasyon", score: data.operations.score },
  ];
  return (
    <Page size="A4" style={S.page}>
      <View style={S.topAccent} />
      <View style={S.container}>
        <PageHeader clientName={data.clientName} />
        <SectionHeader label="02 — Yönetici Özeti" title="Pazar Duruşu & Risk Analizi" />

        <Text style={S.summaryText}>{data.executiveSummary}</Text>

        {/* Issue Tablosu */}
        <View style={S.issueTable}>
          <View style={S.issueTableHeader}>
            <Text style={S.issueTableHeaderCell}>Tespit Edilen Sorun</Text>
            <Text style={S.issueTableHeaderCell}>Risk</Text>
            <Text style={S.issueTableHeaderCell}>Tahmini Kayıp</Text>
          </View>
          {data.topIssues.map((item, i) => (
            <View
              key={i}
              style={[S.issueRow, i % 2 === 1 ? S.issueRowAlt : {}]}
            >
              <Text style={S.issueCell}>{item.issue}</Text>
              <Text style={S.issueCellRed}>{item.risk}</Text>
              <Text style={S.issueCell}>{item.estimatedLoss}</Text>
            </View>
          ))}
        </View>

        {/* Kategori Skorları */}
        <View style={{ marginTop: 20 }}>
          <Text style={S.findingsTitle}>Kategori Bazlı Skor</Text>
          <View style={S.categoryGrid}>
            {categories.map((cat) => {
              const c = scoreColor(cat.score);
              return (
                <View key={cat.name} style={S.categoryCard}>
                  <Text style={[S.categoryScore, { color: c }]}>{cat.score}</Text>
                  <Text style={S.categoryName}>{cat.name}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>
      <PageFooter label="MÜŞTERİ RAPORU" />
    </Page>
  );
}

/* ─────────────────────────────────────────────
   SAYFA 3 — SEO & WEB MİMARİSİ
───────────────────────────────────────────── */
function SeoPage({ data }: { data: AnalysisData }) {
  const { seo } = data;
  return (
    <Page size="A4" style={S.page}>
      <View style={S.topAccent} />
      <View style={S.container}>
        <PageHeader clientName={data.clientName} />
        <SectionHeader label="03 — SEO & Web Mimarisi" title="Teknik Altyapı & Görünürlük Analizi" />

        {/* Skor + Metrikler */}
        <View style={S.analysisTop}>
          <ScoreCircle score={seo.score} />
          <View style={S.metricsRow}>
            <View style={S.metricBox}>
              <Text style={S.metricValue}>{(seo.pageSpeed / 1000).toFixed(1)}s</Text>
              <Text style={S.metricLabel}>Sayfa Hızı</Text>
            </View>
            <View style={S.metricBox}>
              <Text style={S.metricValue}>{seo.mobileScore}</Text>
              <Text style={S.metricLabel}>Mobil Skoru</Text>
            </View>
            <View style={S.metricBox}>
              <Text style={[S.metricValue, { color: COLORS.danger }]}>{seo.technicalErrors}</Text>
              <Text style={S.metricLabel}>Teknik Hata</Text>
            </View>
          </View>
        </View>

        <View style={S.divider} />
        <Findings items={seo.findings} />
        <Recommendations items={seo.recommendations} />

        <View style={S.gainBox}>
          <Text style={S.gainLabel}>Tahmini Kazanım</Text>
          <Text style={S.gainText}>{seo.gain}</Text>
        </View>
      </View>
      <PageFooter label="MÜŞTERİ RAPORU" />
    </Page>
  );
}

/* ─────────────────────────────────────────────
   SAYFA 4 — PPC & REKLAM PERFORMANSI
───────────────────────────────────────────── */
function PpcPage({ data }: { data: AnalysisData }) {
  const { ppc } = data;
  return (
    <Page size="A4" style={S.page}>
      <View style={S.topAccent} />
      <View style={S.container}>
        <PageHeader clientName={data.clientName} />
        <SectionHeader label="04 — PPC & Reklam Performansı" title="Reklam Harcaması & Dönüşüm Analizi" />

        <View style={S.analysisTop}>
          <ScoreCircle score={ppc.score} />
          <View style={S.metricsRow}>
            <View style={S.metricBox}>
              <Text style={S.metricValue}>{ppc.qualityScore}<Text style={{ fontSize: 10 }}>/10</Text></Text>
              <Text style={S.metricLabel}>Kalite Skoru</Text>
            </View>
            <View style={S.metricBox}>
              <Text style={[S.metricValue, { fontSize: 13 }]}>{ppc.competitorSpend}</Text>
              <Text style={S.metricLabel}>Rakip Harcama</Text>
            </View>
          </View>
        </View>

        <View style={S.divider} />
        <Findings items={ppc.findings} />
        <Recommendations items={ppc.recommendations} />

        <View style={S.gainBox}>
          <Text style={S.gainLabel}>Tahmini Kazanım</Text>
          <Text style={S.gainText}>{ppc.gain}</Text>
        </View>
      </View>
      <PageFooter label="MÜŞTERİ RAPORU" />
    </Page>
  );
}

/* ─────────────────────────────────────────────
   SAYFA 5 — SOSYAL MEDYA & İÇERİK
───────────────────────────────────────────── */
function SocialPage({ data }: { data: AnalysisData }) {
  const { social } = data;
  return (
    <Page size="A4" style={S.page}>
      <View style={[S.topAccent, { backgroundColor: COLORS.purple }]} />
      <View style={S.container}>
        <PageHeader clientName={data.clientName} />
        <SectionHeader label="05 — Sosyal Medya & İçerik" title="Marka Tutarlılığı & Etkileşim Analizi" />

        <View style={S.analysisTop}>
          <ScoreCircle score={social.score} />
          <View style={S.metricsRow}>
            <View style={S.metricBox}>
              <Text style={[S.metricValue, { color: COLORS.purple }]}>{social.engagementRate}</Text>
              <Text style={S.metricLabel}>Etkileşim Oranı</Text>
            </View>
            <View style={S.metricBox}>
              <Text style={[S.metricValue, { color: COLORS.purple }]}>{social.consistencyScore}</Text>
              <Text style={S.metricLabel}>Tutarlılık Skoru</Text>
            </View>
          </View>
        </View>

        <View style={S.divider} />
        <Findings items={social.findings} />
        <Recommendations items={social.recommendations} />

        <View style={[S.gainBox, { backgroundColor: COLORS.purple }]}>
          <Text style={S.gainLabel}>Tahmini Kazanım</Text>
          <Text style={S.gainText}>{social.gain}</Text>
        </View>
      </View>
      <PageFooter label="MÜŞTERİ RAPORU" />
    </Page>
  );
}

/* ─────────────────────────────────────────────
   SAYFA 6 — DİJİTAL OPERASYON + CTA
───────────────────────────────────────────── */
function OperationsPage({ data }: { data: AnalysisData }) {
  const { operations } = data;
  return (
    <Page size="A4" style={S.page}>
      <View style={S.topAccent} />
      <View style={S.container}>
        <PageHeader clientName={data.clientName} />
        <SectionHeader label="06 — Dijital Operasyon" title="Sistem Olgunluğu & Otomasyon Boşlukları" />

        <View style={S.analysisTop}>
          <ScoreCircle score={operations.score} />
          <View style={{ flex: 1 }}>
            <Text style={[S.findingsTitle, { marginBottom: 6 }]}>Mevcut Tech Stack</Text>
            <View style={S.techStackRow}>
              {operations.techStack.map((t, i) => (
                <View key={i} style={S.techBadge}>
                  <Text style={S.techBadgeText}>{t}</Text>
                </View>
              ))}
            </View>
            <Text style={[S.findingsTitle, { marginBottom: 6, marginTop: 4 }]}>Otomasyon Boşlukları</Text>
            {operations.automationGaps.map((g, i) => (
              <View key={i} style={S.findingRow}>
                <Text style={S.findingBullet}>✕</Text>
                <Text style={S.findingText}>{g}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={S.divider} />
        <Findings items={operations.findings} />
        <Recommendations items={operations.recommendations} />

        <View style={S.gainBox}>
          <Text style={S.gainLabel}>Tahmini Kazanım</Text>
          <Text style={S.gainText}>{operations.gain}</Text>
        </View>

        {/* Son CTA */}
        <View style={S.ctaBox}>
          <Text style={S.ctaTitle}>Sisteminizi Birlikte Kurgulayalım.</Text>
          <Text style={S.ctaMeta}>
            Bu raporda tespit edilen eksiklikler için özel bir büyüme planı hazırlamaya hazırız.
            İlk strateji görüşmesi ücretsiz ve bağlayıcı değildir.
          </Text>
          <View style={S.ctaDivider} />
          <View style={S.ctaContact}>
            <Text style={S.ctaContactItem}>premiumdijital.com</Text>
            <Text style={S.ctaContactItem}>info@premiumdijital.com</Text>
            <Text style={S.ctaContactItem}>(0212) 982 57 24</Text>
          </View>
        </View>
      </View>
      <PageFooter label="MÜŞTERİ RAPORU" />
    </Page>
  );
}

/* ─────────────────────────────────────────────
   ANA DOKÜMAN
───────────────────────────────────────────── */
export default function ClientReport({ data }: { data: AnalysisData }) {
  return (
    <Document
      title={`Dijital Analiz Raporu — ${data.clientName}`}
      author="Premium Dijital"
      subject="Dijital Varlık ve Konumlandırma Analizi"
    >
      <CoverPage data={data} />
      <ExecutiveSummaryPage data={data} />
      <SeoPage data={data} />
      <PpcPage data={data} />
      <SocialPage data={data} />
      <OperationsPage data={data} />
    </Document>
  );
}
