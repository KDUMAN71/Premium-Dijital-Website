import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import "@/components/pdf/shared/styles";
import { COLORS, scoreColor } from "@/components/pdf/shared/styles";
import type { AnalysisData } from "@/types/analysis";

/* ─────────────────────────────────────────────
   STILLER (InternalReport'a özgü)
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
  topAccentInternal: {
    height: 8,
    backgroundColor: COLORS.danger,
    width: "100%",
  },
  container: {
    paddingHorizontal: 52,
    paddingTop: 32,
    flex: 1,
  },

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
  pageHeaderBadge: {
    fontSize: 7,
    fontWeight: 700,
    color: COLORS.danger,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    borderWidth: 0.5,
    borderColor: COLORS.danger,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 3,
  },

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
    marginVertical: 12,
  },

  /* ── Kapak ── */
  coverHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 48,
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
    marginTop: 40,
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
  scoreBox: {
    marginTop: 32,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    padding: 16,
    backgroundColor: COLORS.lightGray,
    borderRadius: 6,
  },
  scoreCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  scoreCircleValue: {
    fontSize: 20,
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

  /* ── Gizli Damga ── */
  internalStamp: {
    position: "absolute",
    bottom: 80,
    right: 52,
    borderWidth: 2,
    borderColor: COLORS.danger,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 2,
  },
  internalStampText: {
    fontSize: 9,
    fontWeight: 700,
    color: COLORS.danger,
    textTransform: "uppercase",
    letterSpacing: 2,
  },

  /* ── İç Not Kutusu (Her sayfada) ── */
  internalNote: {
    marginTop: 14,
    padding: "10 14",
    backgroundColor: "#F8F8F8",
    borderRadius: 4,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.danger,
  },
  internalNoteLabel: {
    fontSize: 7,
    fontWeight: 700,
    color: COLORS.danger,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  internalNoteText: {
    fontSize: 8.5,
    color: "#444444",
    lineHeight: 1.6,
  },

  /* ── Yönetici Özeti ── */
  summaryText: {
    fontSize: 10,
    color: COLORS.gray,
    lineHeight: 1.7,
    marginBottom: 16,
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
    paddingVertical: 9,
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
  categoryGrid: {
    flexDirection: "row",
    marginTop: 16,
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
    fontSize: 22,
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
    marginBottom: 14,
  },
  analysisBigScore: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  analysisBigScoreVal: {
    fontSize: 24,
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
    padding: 10,
    backgroundColor: COLORS.lightGray,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  metricValue: {
    fontSize: 16,
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
    marginBottom: 6,
  },
  findingRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 5,
    gap: 8,
  },
  findingBullet: {
    fontSize: 9,
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
    fontSize: 9,
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
    marginTop: 10,
    padding: "10 14",
    backgroundColor: COLORS.blue,
    borderRadius: 4,
  },
  gainLabel: {
    fontSize: 7,
    fontWeight: 700,
    color: "rgba(255,255,255,0.7)",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 3,
  },
  gainText: {
    fontSize: 9,
    color: COLORS.white,
    lineHeight: 1.6,
  },
  techStackRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 10,
  },
  techBadge: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    backgroundColor: "#EEF0FF",
    borderRadius: 4,
  },
  techBadgeText: {
    fontSize: 8,
    color: COLORS.blue,
    fontWeight: 700,
  },
  ctaBox: {
    marginTop: 20,
    padding: 24,
    backgroundColor: COLORS.blue,
    borderRadius: 6,
  },
  ctaTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: COLORS.white,
    lineHeight: 1.2,
    marginBottom: 8,
  },
  ctaMeta: {
    fontSize: 9,
    color: "rgba(255,255,255,0.75)",
    lineHeight: 1.8,
  },
  ctaDivider: {
    height: 0.5,
    backgroundColor: "rgba(255,255,255,0.2)",
    marginVertical: 12,
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

  /* ── Aksiyon Planı (Sayfa 7) ── */
  actionTable: {
    marginTop: 8,
  },
  actionTableHeader: {
    flexDirection: "row",
    backgroundColor: COLORS.dark,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginBottom: 2,
  },
  actionTableHeaderCell: {
    fontSize: 7,
    fontWeight: 700,
    color: COLORS.white,
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
  actionRow: {
    flexDirection: "row",
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.border,
    alignItems: "center",
  },
  priorityBadge: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 3,
    alignSelf: "flex-start",
  },
  priorityText: {
    fontSize: 7,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  actionTask: {
    fontSize: 9,
    color: COLORS.dark,
    lineHeight: 1.5,
    flex: 1,
    paddingHorizontal: 10,
  },
  actionMeta: {
    fontSize: 8,
    color: COLORS.gray,
    width: 70,
    textAlign: "center",
  },

  /* ── Satış Notu (Sayfa 8) ── */
  salesBox: {
    padding: "16 20",
    backgroundColor: COLORS.lightGray,
    borderRadius: 4,
    marginTop: 8,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.purple,
  },
  salesLabel: {
    fontSize: 8,
    fontWeight: 700,
    color: COLORS.purple,
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 6,
  },
  salesText: {
    fontSize: 10,
    color: COLORS.dark,
    lineHeight: 1.7,
  },
  budgetBox: {
    marginTop: 16,
    padding: "12 16",
    backgroundColor: "#1A7A3F",
    borderRadius: 4,
  },
  budgetLabel: {
    fontSize: 7,
    fontWeight: 700,
    color: "rgba(255,255,255,0.7)",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 4,
  },
  budgetValue: {
    fontSize: 22,
    fontWeight: 700,
    color: COLORS.white,
  },
});

/* ─────────────────────────────────────────────
   PAYLAŞILAN ALT BİLEŞENLER
───────────────────────────────────────────── */
function PageFooter() {
  return (
    <View style={S.pageFooter} fixed>
      <Text style={S.pageFooterText}>
        © {new Date().getFullYear()} PREMIUM DIJITAL · GİZLİ — SADECE İÇ KULLANIM
      </Text>
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
      <Text style={S.pageHeaderBadge}>GİZLİ — İÇ KULLANIM</Text>
    </View>
  );
}

function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={S.sectionLabel}>{label}</Text>
      <Text style={S.sectionTitle}>{title}</Text>
      <View style={S.divider} />
    </View>
  );
}

function ScoreCircle({ score }: { score: number }) {
  const color = scoreColor(score);
  return (
    <View style={[S.analysisBigScore, { backgroundColor: color }]}>
      <Text style={S.analysisBigScoreVal}>{score}</Text>
      <Text style={S.analysisBigScoreLabel}>/ 100</Text>
    </View>
  );
}

function Findings({ items }: { items: string[] }) {
  return (
    <View style={{ marginBottom: 10 }}>
      <Text style={S.findingsTitle}>Bulgular</Text>
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
    <View style={{ marginBottom: 10 }}>
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

function InternalNote({ text }: { text: string }) {
  return (
    <View style={S.internalNote}>
      <Text style={S.internalNoteLabel}>İç Not</Text>
      <Text style={S.internalNoteText}>{text}</Text>
    </View>
  );
}

function PriorityBadge({ priority }: { priority: "HIGH" | "MEDIUM" | "LOW" }) {
  const map = {
    HIGH: { bg: "#FDEDEB", text: COLORS.danger, label: "● YÜK" },
    MEDIUM: { bg: "#FDF4E3", text: COLORS.warning, label: "● ORT" },
    LOW: { bg: "#E8F5EE", text: COLORS.success, label: "● DÜŞ" },
  };
  const { bg, text, label } = map[priority];
  return (
    <View style={[S.priorityBadge, { backgroundColor: bg, width: 48 }]}>
      <Text style={[S.priorityText, { color: text }]}>{label}</Text>
    </View>
  );
}

/* ─────────────────────────────────────────────
   SAYFA 1 — KAPAK (İÇ)
───────────────────────────────────────────── */
function CoverPage({ data }: { data: AnalysisData }) {
  const color = scoreColor(data.overallScore);
  return (
    <Page size="A4" style={S.page}>
      <View style={S.topAccentInternal} />
      <View style={S.container}>
        <View style={S.coverHeader}>
          <View>
            <Text style={S.coverBrand}>PREMIUM DIJITAL</Text>
            <Text style={S.coverTagline}>DİJİTAL BÜYÜME MİMARLIĞI — İÇ RAPOR</Text>
          </View>
          <View>
            <Text style={S.coverReportMeta}>DOSYA NO: {data.reportId}</Text>
            <Text style={S.coverReportMeta}>{data.reportDate}</Text>
            <Text style={S.coverReportMeta}>HAZIRLAYAN: {data.preparedBy}</Text>
          </View>
        </View>

        <Text style={S.coverPreTitle}>Stratejik Teşhis Belgesi — Dahili</Text>
        <Text style={S.coverMainTitle}>DİJİTAL VARLIK VE</Text>
        <Text style={S.coverMainTitle}>KONUMLANDIRMA ANALİZİ</Text>

        <View style={S.clientBox}>
          <Text style={S.clientBoxLabel}>Hazırlanan Kurum</Text>
          <Text style={S.clientBoxName}>{data.clientName}</Text>
          <View style={S.badgeRow}>
            <View style={[S.badge, { backgroundColor: "#EEF0FF" }]}>
              <Text style={[S.badgeText, { color: COLORS.blue }]}>{data.sector}</Text>
            </View>
            <View style={[S.badge, { backgroundColor: "#F9EEFF" }]}>
              <Text style={[S.badgeText, { color: COLORS.purple }]}>{data.segment}</Text>
            </View>
            <View style={[S.badge, { backgroundColor: "#FDEDEB" }]}>
              <Text style={[S.badgeText, { color: COLORS.danger }]}>GİZLİ</Text>
            </View>
          </View>
        </View>

        <View style={S.scoreBox}>
          <View style={[S.scoreCircle, { backgroundColor: color }]}>
            <Text style={S.scoreCircleValue}>{data.overallScore}</Text>
          </View>
          <View>
            <Text style={S.scoreBoxLabel}>Genel Dijital Skor</Text>
            <Text style={[S.scoreBoxTitle, { color }]}>{data.scoreLabel}</Text>
          </View>
        </View>

        {/* Gizli Damga */}
        <View style={S.internalStamp}>
          <Text style={S.internalStampText}>GİZLİ — SADECE İÇ KULLANIM</Text>
        </View>
      </View>
      <PageFooter />
    </Page>
  );
}

/* ─────────────────────────────────────────────
   SAYFA 2 — YÖNETİCİ ÖZETİ (İÇ)
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
        <View style={S.issueTable}>
          <View style={S.issueTableHeader}>
            <Text style={S.issueTableHeaderCell}>Tespit Edilen Sorun</Text>
            <Text style={S.issueTableHeaderCell}>Risk</Text>
            <Text style={S.issueTableHeaderCell}>Tahmini Kayıp</Text>
          </View>
          {data.topIssues.map((item, i) => (
            <View key={i} style={[S.issueRow, i % 2 === 1 ? S.issueRowAlt : {}]}>
              <Text style={S.issueCell}>{item.issue}</Text>
              <Text style={S.issueCellRed}>{item.risk}</Text>
              <Text style={S.issueCell}>{item.estimatedLoss}</Text>
            </View>
          ))}
        </View>
        <View style={{ marginTop: 16 }}>
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
        {data.internal?.salesNotes && (
          <InternalNote text={`Satış notu: ${data.internal.salesNotes}`} />
        )}
      </View>
      <PageFooter />
    </Page>
  );
}

/* ─────────────────────────────────────────────
   SAYFA 3 — SEO (İÇ)
───────────────────────────────────────────── */
function SeoPage({ data }: { data: AnalysisData }) {
  const { seo } = data;
  return (
    <Page size="A4" style={S.page}>
      <View style={S.topAccent} />
      <View style={S.container}>
        <PageHeader clientName={data.clientName} />
        <SectionHeader label="03 — SEO & Web Mimarisi" title="Teknik Altyapı & Görünürlük Analizi" />
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
        <InternalNote text="Ham teknik veri: Core Web Vitals, Lighthouse skoru, GSC hata raporu audit paketine eklendi." />
      </View>
      <PageFooter />
    </Page>
  );
}

/* ─────────────────────────────────────────────
   SAYFA 4 — PPC (İÇ)
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
              <Text style={S.metricValue}>{ppc.qualityScore}<Text style={{ fontSize: 9 }}>/10</Text></Text>
              <Text style={S.metricLabel}>Kalite Skoru</Text>
            </View>
            <View style={S.metricBox}>
              <Text style={[S.metricValue, { fontSize: 12 }]}>{ppc.competitorSpend}</Text>
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
        <InternalNote text="Rakip analizi: Auction Insights raporu ve SimilarWeb verisi ekte mevcuttur." />
      </View>
      <PageFooter />
    </Page>
  );
}

/* ─────────────────────────────────────────────
   SAYFA 5 — SOSYAL (İÇ)
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
        <InternalNote text="Instagram/Facebook analitikleri ve Meta Business Suite ekran görüntüleri kayıt altına alındı." />
      </View>
      <PageFooter />
    </Page>
  );
}

/* ─────────────────────────────────────────────
   SAYFA 6 — OPERASYON + CTA (İÇ)
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
            <Text style={[S.findingsTitle, { marginBottom: 5 }]}>Mevcut Tech Stack</Text>
            <View style={S.techStackRow}>
              {operations.techStack.map((t, i) => (
                <View key={i} style={S.techBadge}>
                  <Text style={S.techBadgeText}>{t}</Text>
                </View>
              ))}
            </View>
            <Text style={[S.findingsTitle, { marginBottom: 5, marginTop: 6 }]}>Otomasyon Boşlukları</Text>
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
        <View style={S.ctaBox}>
          <Text style={S.ctaTitle}>Sisteminizi Birlikte Kurgulayalım.</Text>
          <Text style={S.ctaMeta}>
            Bu raporda tespit edilen eksiklikler için özel bir büyüme planı hazırlamaya hazırız.
          </Text>
          <View style={S.ctaDivider} />
          <View style={S.ctaContact}>
            <Text style={S.ctaContactItem}>premiumdijital.com</Text>
            <Text style={S.ctaContactItem}>info@premiumdijital.com</Text>
            <Text style={S.ctaContactItem}>(0212) 982 57 24</Text>
          </View>
        </View>
      </View>
      <PageFooter />
    </Page>
  );
}

/* ─────────────────────────────────────────────
   SAYFA 7 — AKSİYON PLANI
───────────────────────────────────────────── */
function ActionPlanPage({ data }: { data: AnalysisData }) {
  const actions = data.internal?.actionItems ?? [];
  return (
    <Page size="A4" style={S.page}>
      <View style={S.topAccentInternal} />
      <View style={S.container}>
        <PageHeader clientName={data.clientName} />
        <SectionHeader label="07 — Aksiyon Planı" title="Öncelikli Görev Listesi" />
        <View style={S.actionTable}>
          <View style={S.actionTableHeader}>
            <Text style={[S.actionTableHeaderCell, { width: 52 }]}>Öncelik</Text>
            <Text style={[S.actionTableHeaderCell, { flex: 1, paddingLeft: 10 }]}>Görev</Text>
            <Text style={[S.actionTableHeaderCell, { width: 70, textAlign: "center" }]}>Sorumlu</Text>
            <Text style={[S.actionTableHeaderCell, { width: 70, textAlign: "center" }]}>Süre</Text>
          </View>
          {actions.map((action, i) => (
            <View key={i} style={[S.actionRow, i % 2 === 1 ? { backgroundColor: COLORS.lightGray } : {}]}>
              <PriorityBadge priority={action.priority} />
              <Text style={S.actionTask}>{action.task}</Text>
              <Text style={S.actionMeta}>{action.owner}</Text>
              <Text style={S.actionMeta}>{action.deadline}</Text>
            </View>
          ))}
        </View>
        {actions.length === 0 && (
          <Text style={{ fontSize: 9, color: COLORS.gray, marginTop: 12 }}>
            Aksiyon kaydı bulunamadı.
          </Text>
        )}
      </View>
      <PageFooter />
    </Page>
  );
}

/* ─────────────────────────────────────────────
   SAYFA 8 — SATIŞ NOTU
───────────────────────────────────────────── */
function SalesNotePage({ data }: { data: AnalysisData }) {
  const internal = data.internal;
  return (
    <Page size="A4" style={S.page}>
      <View style={S.topAccentInternal} />
      <View style={S.container}>
        <PageHeader clientName={data.clientName} />
        <SectionHeader label="08 — Satış Notu" title="Müşteri Değerlendirmesi & Bütçe Tahmini" />

        {internal?.estimatedBudget && (
          <View style={S.budgetBox}>
            <Text style={S.budgetLabel}>Tahmini Aylık Bütçe</Text>
            <Text style={S.budgetValue}>{internal.estimatedBudget}</Text>
          </View>
        )}

        {internal?.salesNotes && (
          <View style={[S.salesBox, { marginTop: 16 }]}>
            <Text style={S.salesLabel}>Satış Notları</Text>
            <Text style={S.salesText}>{internal.salesNotes}</Text>
          </View>
        )}

        <View style={{ marginTop: 20 }}>
          <Text style={S.findingsTitle}>Sonraki Adım Önerileri</Text>
          {[
            "Ücretsiz strateji görüşmesi planla (1 hafta içinde)",
            "Teknik SEO audit raporunu hazırla",
            "Paket önerisi ile teklif dokümanını gönder",
          ].map((step, i) => (
            <View key={i} style={S.findingRow}>
              <Text style={[S.recBullet, { color: COLORS.success }]}>→</Text>
              <Text style={S.recText}>{step}</Text>
            </View>
          ))}
        </View>

        {/* Son damga */}
        <View style={S.internalStamp}>
          <Text style={S.internalStampText}>GİZLİ — SADECE İÇ KULLANIM</Text>
        </View>
      </View>
      <PageFooter />
    </Page>
  );
}

/* ─────────────────────────────────────────────
   ANA DOKÜMAN
───────────────────────────────────────────── */
export default function InternalReport({ data }: { data: AnalysisData }) {
  return (
    <Document
      title={`İç Rapor — ${data.clientName}`}
      author="Premium Dijital"
      subject="Dijital Analiz — Dahili Rapor"
    >
      <CoverPage data={data} />
      <ExecutiveSummaryPage data={data} />
      <SeoPage data={data} />
      <PpcPage data={data} />
      <SocialPage data={data} />
      <OperationsPage data={data} />
      <ActionPlanPage data={data} />
      <SalesNotePage data={data} />
    </Document>
  );
}
