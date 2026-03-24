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
   STİLLER (InternalReport'a özgü)
───────────────────────────────────────────── */
const S = StyleSheet.create({
  coverPage: {
    backgroundColor: COLORS.white,
    fontFamily: "Inter",
    flexDirection: "row",
    height: "100%",
  },
  coverSidebar: {
    width: 72,
    flexDirection: "column",
  },
  coverSidebarTop: {
    backgroundColor: "#7A0000",
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 90,
  },
  coverSidebarLabel: {
    fontSize: 7,
    fontWeight: 700,
    color: COLORS.white,
    letterSpacing: 2,
    textTransform: "uppercase",
    textAlign: "center",
  },
  gradBlock1: { flex: 1, backgroundColor: COLORS.grad1 },
  gradBlock2: { flex: 1, backgroundColor: COLORS.grad2 },
  gradBlock3: { flex: 1, backgroundColor: COLORS.grad3 },
  gradBlock4: { flex: 1, backgroundColor: COLORS.grad4 },
  gradBlock5: { flex: 1, backgroundColor: COLORS.grad5 },

  coverContent: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "52 44",
  },
  coverMainTitle: {
    fontSize: 30,
    fontWeight: 700,
    color: COLORS.dark,
    lineHeight: 1.15,
    letterSpacing: -0.5,
  },
  coverDivider: {
    height: 2,
    backgroundColor: COLORS.dark,
    marginTop: 22,
    marginBottom: 30,
  },
  coverClientLabel: {
    fontSize: 8,
    color: "#999999",
    textTransform: "uppercase",
    letterSpacing: 2.5,
    marginBottom: 6,
  },
  coverClientName: {
    fontSize: 22,
    fontWeight: 700,
    color: COLORS.dark,
    marginBottom: 20,
  },
  coverMetaRow: {
    flexDirection: "row",
    gap: 24,
    marginTop: 8,
  },
  coverMetaItem: {
    fontSize: 9,
    color: COLORS.gray,
    lineHeight: 1.8,
  },
  coverMetaValue: {
    fontSize: 9,
    fontWeight: 700,
    color: COLORS.dark,
  },
  coverFooterBrand: {
    fontSize: 13,
    fontWeight: 700,
    color: COLORS.blue,
    letterSpacing: 0.5,
  },
  coverFooterTagline: {
    fontSize: 7,
    color: COLORS.purple,
    letterSpacing: 2,
    textTransform: "uppercase",
    marginTop: 3,
  },
  coverFooterMeta: {
    fontSize: 8,
    color: "#CCCCCC",
    marginTop: 10,
  },
  internalStamp: {
    marginTop: 14,
    borderWidth: 1.5,
    borderColor: COLORS.danger,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 3,
    alignSelf: "flex-start",
  },
  internalStampText: {
    fontSize: 9,
    fontWeight: 700,
    color: COLORS.danger,
    textTransform: "uppercase",
    letterSpacing: 2,
  },

  /* ── İÇ SAYFA ── */
  innerPage: {
    backgroundColor: COLORS.white,
    fontFamily: "Inter",
    color: COLORS.dark,
    fontSize: 10,
    paddingBottom: 72,
  },

  /* ── HEADER ── */
  pageHeaderWrap: { marginBottom: 0 },
  pageHeaderTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.border,
  },
  pageHeaderBrand: {
    fontSize: 8,
    fontWeight: 700,
    color: COLORS.blue,
    letterSpacing: 1.5,
  },
  pageHeaderBadge: {
    fontSize: 7,
    fontWeight: 700,
    color: COLORS.danger,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    borderWidth: 0.5,
    borderColor: COLORS.danger,
    paddingVertical: 2,
    paddingHorizontal: 7,
    borderRadius: 3,
  },
  // Kırmızı ton iç rapor başlık şeridi
  pageHeaderBand: {
    backgroundColor: "#1A0000",
    paddingHorizontal: 40,
    paddingVertical: 11,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pageHeaderBandLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  pageHeaderBandNum: {
    fontSize: 8,
    color: "rgba(255,255,255,0.4)",
    letterSpacing: 2,
    fontWeight: 700,
  },
  pageHeaderBandCategory: {
    fontSize: 10,
    fontWeight: 700,
    color: COLORS.white,
    letterSpacing: 2.5,
    textTransform: "uppercase",
  },
  pageHeaderBandPageNum: {
    fontSize: 20,
    fontWeight: 700,
    color: "rgba(255,255,255,0.12)",
  },
  pageContentHeader: {
    paddingHorizontal: 40,
    paddingTop: 22,
  },
  sectionBigTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: COLORS.dark,
    marginBottom: 4,
    lineHeight: 1.2,
  },
  sectionDivider: {
    height: 0.5,
    backgroundColor: COLORS.border,
    marginTop: 14,
    marginBottom: 18,
  },

  /* ── BODY ── */
  body: {
    paddingHorizontal: 40,
  },

  /* ── FOOTER ── */
  pageFooter: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#1A0000",
    paddingVertical: 10,
    paddingHorizontal: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerColLeft: { flex: 1 },
  footerColCenter: { flex: 2, alignItems: "center" },
  footerColRight: { flex: 1, alignItems: "flex-end" },
  footerText: { fontSize: 6.5, color: "rgba(255,255,255,0.45)", lineHeight: 1.7 },
  footerTextAccent: { fontSize: 6.5, color: COLORS.danger, lineHeight: 1.7 },

  /* ── İÇ NOT ── */
  internalNote: {
    marginTop: 12,
    padding: "9 14",
    backgroundColor: "#FFF5F5",
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
    color: "#444",
    lineHeight: 1.6,
  },

  /* ── METRİK ── */
  metricsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },
  metricBox: {
    flex: 1,
    padding: "11 10",
    backgroundColor: COLORS.lightGray,
    borderRadius: 4,
    alignItems: "center",
  },
  metricValue: {
    fontSize: 18,
    fontWeight: 700,
    color: COLORS.blue,
    marginBottom: 3,
    lineHeight: 1,
  },
  metricLabel: {
    fontSize: 7,
    color: COLORS.gray,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    textAlign: "center",
  },
  scoreCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginRight: 16,
  },
  scoreCircleVal: {
    fontSize: 24,
    fontWeight: 700,
    color: COLORS.white,
    lineHeight: 1,
  },
  scoreCircleSub: {
    fontSize: 7,
    color: "rgba(255,255,255,0.75)",
    letterSpacing: 0.8,
    marginTop: 2,
  },

  /* ── LİSTELER ── */
  listTitle: {
    fontSize: 8,
    fontWeight: 700,
    color: COLORS.dark,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    marginBottom: 7,
  },
  listRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 5,
    gap: 8,
  },
  listBulletDanger: {
    fontSize: 9,
    color: COLORS.danger,
    width: 12,
    flexShrink: 0,
    lineHeight: 1.5,
  },
  listBulletBlue: {
    fontSize: 9,
    color: COLORS.blue,
    width: 12,
    flexShrink: 0,
    lineHeight: 1.5,
  },
  listText: {
    fontSize: 9,
    color: COLORS.dark,
    lineHeight: 1.55,
    flex: 1,
  },

  gainBox: {
    marginTop: 12,
    padding: "10 14",
    backgroundColor: COLORS.blue,
    borderRadius: 4,
  },
  gainLabel: {
    fontSize: 7,
    fontWeight: 700,
    color: "rgba(255,255,255,0.6)",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 4,
  },
  gainText: {
    fontSize: 9,
    color: COLORS.white,
    lineHeight: 1.6,
  },

  /* ── YÖNETİCİ ÖZETİ ── */
  summaryText: {
    fontSize: 10,
    color: COLORS.gray,
    lineHeight: 1.75,
    marginBottom: 16,
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
  issueRowAlt: { backgroundColor: COLORS.lightGray },
  issueCell: { fontSize: 9, color: COLORS.dark, flex: 1, lineHeight: 1.5, paddingRight: 8 },
  issueCellDanger: {
    fontSize: 9,
    color: COLORS.danger,
    flex: 1,
    fontWeight: 700,
    lineHeight: 1.5,
    paddingRight: 8,
  },
  categoryGrid: { flexDirection: "row", marginTop: 16, gap: 10 },
  categoryCard: {
    flex: 1,
    padding: "12 10",
    backgroundColor: COLORS.lightGray,
    borderRadius: 4,
    alignItems: "center",
  },
  categoryScoreVal: { fontSize: 22, fontWeight: 700, marginBottom: 4, lineHeight: 1 },
  categoryScoreName: {
    fontSize: 7,
    color: COLORS.gray,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    textAlign: "center",
  },

  /* ── OPERASYON ── */
  techRow: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginBottom: 10 },
  techBadge: { paddingVertical: 4, paddingHorizontal: 10, backgroundColor: COLORS.blueBg, borderRadius: 4 },
  techBadgeText: { fontSize: 8, color: COLORS.blue, fontWeight: 700 },
  ctaBox: { marginTop: 18, padding: "22 26", backgroundColor: COLORS.blue, borderRadius: 6 },
  ctaTitle: { fontSize: 17, fontWeight: 700, color: COLORS.white, lineHeight: 1.2, marginBottom: 8 },
  ctaSubtext: { fontSize: 9, color: "rgba(255,255,255,0.7)", lineHeight: 1.8, marginBottom: 12 },
  ctaDivider: { height: 0.5, backgroundColor: "rgba(255,255,255,0.2)", marginBottom: 10 },
  ctaContactRow: { flexDirection: "row", gap: 20, flexWrap: "wrap" },
  ctaContactItem: { fontSize: 9, fontWeight: 700, color: COLORS.white },

  /* ── AKSİYON TABLOSU ── */
  actionTableHeader: {
    flexDirection: "row",
    backgroundColor: "#1A0000",
    paddingVertical: 8,
    paddingHorizontal: 12,
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
    paddingHorizontal: 7,
    borderRadius: 3,
    alignSelf: "flex-start",
    width: 50,
    alignItems: "center",
  },
  priorityText: {
    fontSize: 7,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  actionTask: { fontSize: 9, color: COLORS.dark, lineHeight: 1.5, flex: 1, paddingHorizontal: 10 },
  actionMeta: { fontSize: 8, color: COLORS.gray, width: 70, textAlign: "center" },

  /* ── SATIŞ NOTU ── */
  salesBox: {
    padding: "14 18",
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
  salesText: { fontSize: 10, color: COLORS.dark, lineHeight: 1.7 },
  budgetBox: {
    marginTop: 14,
    padding: "12 16",
    backgroundColor: COLORS.success,
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
  budgetValue: { fontSize: 22, fontWeight: 700, color: COLORS.white },
});

/* ─────────────────────────────────────────────
   ALT BİLEŞENLER
───────────────────────────────────────────── */
function Footer() {
  return (
    <View style={S.pageFooter} fixed>
      <View style={S.footerColLeft}>
        <Text style={S.footerText}>0 212 982 57 24</Text>
        <Text style={S.footerText}>info@premiumdijital.com</Text>
      </View>
      <View style={S.footerColCenter}>
        <Text style={[S.footerText, { textAlign: "center" }]}>
          Premium Dijital Reklam Ajansi — Dahili Kullanim
        </Text>
        <Text style={[S.footerText, { textAlign: "center" }]}>
          Ziya Gokalp Mah. Mall Of Istanbul The Office No:7E D:136, Baskasehir/Istanbul
        </Text>
      </View>
      <View style={S.footerColRight}>
        <Text style={S.footerTextAccent}>IC RAPOR</Text>
        <Text
          style={S.footerText}
          render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        />
      </View>
    </View>
  );
}

function PageHeader({
  pageNum,
  category,
  clientName,
  title,
}: {
  pageNum: string;
  category: string;
  clientName: string;
  title: string;
}) {
  return (
    <View style={S.pageHeaderWrap} fixed>
      <View style={S.pageHeaderTop}>
        <Text style={S.pageHeaderBrand}>PREMIUM DIJITAL</Text>
        <Text style={S.pageHeaderBadge}>GIZLI — IC KULLANIM</Text>
      </View>
      <View style={S.pageHeaderBand}>
        <View style={S.pageHeaderBandLeft}>
          <Text style={S.pageHeaderBandNum}>{pageNum}</Text>
          <Text style={S.pageHeaderBandCategory}>{category}</Text>
        </View>
        <Text
          style={S.pageHeaderBandPageNum}
          render={({ pageNumber }) => String(pageNumber).padStart(2, "0")}
        />
      </View>
      <View style={S.pageContentHeader}>
        <Text style={S.sectionBigTitle}>{title}</Text>
        <View style={S.sectionDivider} />
      </View>
    </View>
  );
}

function ScoreAndMetrics({
  score,
  metrics,
}: {
  score: number;
  metrics: { value: string | number; label: string; color?: string }[];
}) {
  const color = scoreColor(score);
  return (
    <View style={S.metricsRow}>
      <View style={[S.scoreCircle, { backgroundColor: color }]}>
        <Text style={S.scoreCircleVal}>{score}</Text>
        <Text style={S.scoreCircleSub}>/ 100</Text>
      </View>
      {metrics.map((m, i) => (
        <View key={i} style={S.metricBox}>
          <Text style={[S.metricValue, m.color ? { color: m.color } : {}]}>
            {m.value}
          </Text>
          <Text style={S.metricLabel}>{m.label}</Text>
        </View>
      ))}
    </View>
  );
}

function Findings({ items }: { items: string[] }) {
  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={S.listTitle}>Tespit Bulgulari</Text>
      {items.map((f, i) => (
        <View key={i} style={S.listRow}>
          <Text style={S.listBulletDanger}>\u25B6</Text>
          <Text style={S.listText}>{f}</Text>
        </View>
      ))}
    </View>
  );
}

function Recommendations({ items }: { items: string[] }) {
  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={S.listTitle}>Oneriler</Text>
      {items.map((r, i) => (
        <View key={i} style={S.listRow}>
          <Text style={S.listBulletBlue}>\u2192</Text>
          <Text style={S.listText}>{r}</Text>
        </View>
      ))}
    </View>
  );
}

function InternalNote({ text }: { text: string }) {
  return (
    <View style={S.internalNote}>
      <Text style={S.internalNoteLabel}>IC NOT</Text>
      <Text style={S.internalNoteText}>{text}</Text>
    </View>
  );
}

function PriorityBadge({ priority }: { priority: "HIGH" | "MEDIUM" | "LOW" }) {
  const map = {
    HIGH: { bg: COLORS.dangerBg, color: COLORS.danger, label: "YUKSEK" },
    MEDIUM: { bg: COLORS.warningBg, color: COLORS.warning, label: "ORTA" },
    LOW: { bg: COLORS.successBg, color: COLORS.success, label: "DUSUK" },
  };
  const { bg, color, label } = map[priority];
  return (
    <View style={[S.priorityBadge, { backgroundColor: bg }]}>
      <Text style={[S.priorityText, { color }]}>{label}</Text>
    </View>
  );
}

/* ─────────────────────────────────────────────
   SAYFA 1 — KAPAK (İÇ)
───────────────────────────────────────────── */
function CoverPage({ data }: { data: AnalysisData }) {
  const color = scoreColor(data.overallScore);
  return (
    <Page size="A4" style={S.coverPage}>
      {/* Sol kırmızı tonlu sidebar — iç raporu müşteriden ayırır */}
      <View style={S.coverSidebar}>
        <View style={S.coverSidebarTop}>
          <Text style={S.coverSidebarLabel}>{"I\nC\n \nR\nA\nP\nO\nR"}</Text>
        </View>
        <View style={S.gradBlock1} />
        <View style={S.gradBlock2} />
        <View style={S.gradBlock3} />
        <View style={S.gradBlock4} />
        <View style={S.gradBlock5} />
      </View>

      <View style={S.coverContent}>
        <View>
          <Text style={S.coverMainTitle}>DIJITAL VARLIK VE</Text>
          <Text style={S.coverMainTitle}>KONUMLANDIRMA</Text>
          <Text style={S.coverMainTitle}>ANALIZI — DAHILI</Text>
          <View style={S.coverDivider} />

          <Text style={S.coverClientLabel}>Hazirlanan Kurum</Text>
          <Text style={S.coverClientName}>{data.clientName}</Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 14,
              padding: "14 16",
              backgroundColor: COLORS.lightGray,
              borderRadius: 4,
              marginBottom: 18,
            }}
          >
            <View
              style={{
                width: 52,
                height: 52,
                borderRadius: 26,
                backgroundColor: color,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: 700, color: COLORS.white, lineHeight: 1 }}>
                {data.overallScore}
              </Text>
            </View>
            <View>
              <Text style={{ fontSize: 7, color: COLORS.gray, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 3 }}>
                Genel Dijital Skor
              </Text>
              <Text style={{ fontSize: 15, fontWeight: 700, color }}>
                {data.scoreLabel}
              </Text>
            </View>
          </View>

          <View style={S.coverMetaRow}>
            <View>
              <Text style={S.coverMetaItem}>SEKTOR</Text>
              <Text style={S.coverMetaValue}>{data.sector}</Text>
            </View>
            <View>
              <Text style={S.coverMetaItem}>SEGMENT</Text>
              <Text style={S.coverMetaValue}>{data.segment}</Text>
            </View>
            <View>
              <Text style={S.coverMetaItem}>TARIH</Text>
              <Text style={S.coverMetaValue}>{data.reportDate}</Text>
            </View>
          </View>

          <View style={[S.internalStamp, { marginTop: 20 }]}>
            <Text style={S.internalStampText}>GIZLI — SADECE IC KULLANIM</Text>
          </View>
        </View>

        <View>
          <View style={{ height: 0.5, backgroundColor: COLORS.border, marginBottom: 16 }} />
          <Text style={S.coverFooterBrand}>PREMIUM DIJITAL</Text>
          <Text style={S.coverFooterTagline}>DIJITAL BUYUME MIMARLIGI</Text>
          <Text style={S.coverFooterMeta}>
            DOSYA NO: {data.reportId} · GIZLI — IC RAPOR
          </Text>
        </View>
      </View>
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
    <Page size="A4" style={S.innerPage}>
      <PageHeader pageNum="02" category="YONETICI OZETI" clientName={data.clientName} title="Pazar Durusu ve Risk Analizi" />
      <View style={S.body}>
        <Text style={S.summaryText}>{data.executiveSummary}</Text>
        <View style={{ borderRadius: 4, overflow: "hidden", marginBottom: 16 }}>
          <View style={S.issueTableHeader}>
            <Text style={S.issueTableHeaderCell}>Tespit Edilen Sorun</Text>
            <Text style={S.issueTableHeaderCell}>Risk</Text>
            <Text style={S.issueTableHeaderCell}>Tahmini Kayip</Text>
          </View>
          {data.topIssues.map((item, i) => (
            <View key={i} style={[S.issueRow, i % 2 === 1 ? S.issueRowAlt : {}]}>
              <Text style={S.issueCell}>{item.issue}</Text>
              <Text style={S.issueCellDanger}>{item.risk}</Text>
              <Text style={S.issueCell}>{item.estimatedLoss}</Text>
            </View>
          ))}
        </View>
        <Text style={S.listTitle}>Kategori Bazli Degerler</Text>
        <View style={S.categoryGrid}>
          {categories.map((cat) => {
            const c = scoreColor(cat.score);
            return (
              <View key={cat.name} style={S.categoryCard}>
                <Text style={[S.categoryScoreVal, { color: c }]}>{cat.score}</Text>
                <Text style={S.categoryScoreName}>{cat.name}</Text>
              </View>
            );
          })}
        </View>
        {data.internal?.salesNotes && (
          <InternalNote text={`Satis notu: ${data.internal.salesNotes}`} />
        )}
      </View>
      <Footer />
    </Page>
  );
}

/* ─────────────────────────────────────────────
   SAYFA 3 — SEO
───────────────────────────────────────────── */
function SeoPage({ data }: { data: AnalysisData }) {
  const { seo } = data;
  return (
    <Page size="A4" style={S.innerPage}>
      <PageHeader pageNum="03" category="SEO & WEB MIMARISI" clientName={data.clientName} title="Teknik Altyapi ve Gorunurluk Analizi" />
      <View style={S.body}>
        <ScoreAndMetrics score={seo.score} metrics={[
          { value: `${(seo.pageSpeed / 1000).toFixed(1)}s`, label: "Sayfa Hizi" },
          { value: seo.mobileScore, label: "Mobil Skoru" },
          { value: seo.technicalErrors, label: "Teknik Hata", color: COLORS.danger },
        ]} />
        <Findings items={seo.findings} />
        <Recommendations items={seo.recommendations} />
        <View style={S.gainBox}>
          <Text style={S.gainLabel}>Tahmini Kazanim</Text>
          <Text style={S.gainText}>{seo.gain}</Text>
        </View>
        <InternalNote text="Ham teknik veri: Core Web Vitals, Lighthouse skoru ve GSC hata raporu audit paketine eklendi." />
      </View>
      <Footer />
    </Page>
  );
}

/* ─────────────────────────────────────────────
   SAYFA 4 — PPC
───────────────────────────────────────────── */
function PpcPage({ data }: { data: AnalysisData }) {
  const { ppc } = data;
  return (
    <Page size="A4" style={S.innerPage}>
      <PageHeader pageNum="04" category="PPC & REKLAM PERFORMANSI" clientName={data.clientName} title="Reklam Harcamasi ve Donusum Analizi" />
      <View style={S.body}>
        <ScoreAndMetrics score={ppc.score} metrics={[
          { value: `${ppc.qualityScore}/10`, label: "Kalite Skoru", color: ppc.qualityScore < 5 ? COLORS.danger : COLORS.success },
          { value: ppc.competitorSpend, label: "Rakip Harcama" },
        ]} />
        <Findings items={ppc.findings} />
        <Recommendations items={ppc.recommendations} />
        <View style={S.gainBox}>
          <Text style={S.gainLabel}>Tahmini Kazanim</Text>
          <Text style={S.gainText}>{ppc.gain}</Text>
        </View>
        <InternalNote text="Auction Insights ve SimilarWeb rakip harcama verileri ekte mevcuttur." />
      </View>
      <Footer />
    </Page>
  );
}

/* ─────────────────────────────────────────────
   SAYFA 5 — SOSYAL
───────────────────────────────────────────── */
function SocialPage({ data }: { data: AnalysisData }) {
  const { social } = data;
  return (
    <Page size="A4" style={S.innerPage}>
      <PageHeader pageNum="05" category="SOSYAL MEDYA & ICERIK" clientName={data.clientName} title="Marka Tutarliligi ve Etkilesim Analizi" />
      <View style={S.body}>
        <ScoreAndMetrics score={social.score} metrics={[
          { value: social.engagementRate, label: "Etkilesim Orani", color: COLORS.purple },
          { value: social.consistencyScore, label: "Tutarlilik Skoru", color: COLORS.purple },
        ]} />
        <Findings items={social.findings} />
        <Recommendations items={social.recommendations} />
        <View style={[S.gainBox, { backgroundColor: COLORS.purple }]}>
          <Text style={S.gainLabel}>Tahmini Kazanim</Text>
          <Text style={S.gainText}>{social.gain}</Text>
        </View>
        <InternalNote text="Instagram/Facebook analitikleri ve Meta Business Suite ekran goruntuleri kayit altina alindi." />
      </View>
      <Footer />
    </Page>
  );
}

/* ─────────────────────────────────────────────
   SAYFA 6 — OPERASYON + CTA
───────────────────────────────────────────── */
function OperationsPage({ data }: { data: AnalysisData }) {
  const { operations } = data;
  return (
    <Page size="A4" style={S.innerPage}>
      <PageHeader pageNum="06" category="DIJITAL OPERASYON" clientName={data.clientName} title="Sistem Olgunlugu ve Otomasyon Bosluklar" />
      <View style={S.body}>
        <View style={{ flexDirection: "row", gap: 16, marginBottom: 16 }}>
          <View style={[S.scoreCircle, { backgroundColor: scoreColor(operations.score) }]}>
            <Text style={S.scoreCircleVal}>{operations.score}</Text>
            <Text style={S.scoreCircleSub}>/ 100</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[S.listTitle, { marginBottom: 5 }]}>Tech Stack</Text>
            <View style={S.techRow}>
              {operations.techStack.map((t, i) => (
                <View key={i} style={S.techBadge}>
                  <Text style={S.techBadgeText}>{t}</Text>
                </View>
              ))}
            </View>
            <Text style={[S.listTitle, { marginBottom: 5, marginTop: 6 }]}>Otomasyon Bosluklari</Text>
            {operations.automationGaps.map((g, i) => (
              <View key={i} style={S.listRow}>
                <Text style={S.listBulletDanger}>\u25B6</Text>
                <Text style={S.listText}>{g}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={{ height: 0.5, backgroundColor: COLORS.border, marginBottom: 12 }} />
        <Findings items={operations.findings} />
        <Recommendations items={operations.recommendations} />
        <View style={S.gainBox}>
          <Text style={S.gainLabel}>Tahmini Kazanim</Text>
          <Text style={S.gainText}>{operations.gain}</Text>
        </View>
        <View style={S.ctaBox}>
          <Text style={S.ctaTitle}>Sisteminizi Birlikte Kurgulayalim.</Text>
          <Text style={S.ctaSubtext}>Ilk strateji gorusmesi ucretsiz ve baglayici degildir.</Text>
          <View style={S.ctaDivider} />
          <View style={S.ctaContactRow}>
            <Text style={S.ctaContactItem}>premiumdijital.com</Text>
            <Text style={S.ctaContactItem}>info@premiumdijital.com</Text>
            <Text style={S.ctaContactItem}>(0212) 982 57 24</Text>
          </View>
        </View>
      </View>
      <Footer />
    </Page>
  );
}

/* ─────────────────────────────────────────────
   SAYFA 7 — AKSİYON PLANI
───────────────────────────────────────────── */
function ActionPlanPage({ data }: { data: AnalysisData }) {
  const actions = data.internal?.actionItems ?? [];
  return (
    <Page size="A4" style={S.innerPage}>
      <PageHeader pageNum="07" category="AKSIYON PLANI" clientName={data.clientName} title="Oncelikli Gorev Listesi" />
      <View style={S.body}>
        <View style={{ borderRadius: 4, overflow: "hidden" }}>
          <View style={S.actionTableHeader}>
            <Text style={[S.actionTableHeaderCell, { width: 56 }]}>Oncelik</Text>
            <Text style={[S.actionTableHeaderCell, { flex: 1, paddingLeft: 10 }]}>Gorev</Text>
            <Text style={[S.actionTableHeaderCell, { width: 72, textAlign: "center" }]}>Sorumlu</Text>
            <Text style={[S.actionTableHeaderCell, { width: 72, textAlign: "center" }]}>Sure</Text>
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
            Aksiyon kaydi bulunamadi.
          </Text>
        )}
      </View>
      <Footer />
    </Page>
  );
}

/* ─────────────────────────────────────────────
   SAYFA 8 — SATIŞ NOTU
───────────────────────────────────────────── */
function SalesNotePage({ data }: { data: AnalysisData }) {
  const internal = data.internal;
  return (
    <Page size="A4" style={S.innerPage}>
      <PageHeader pageNum="08" category="SATIS NOTU" clientName={data.clientName} title="Musteri Degerlendirmesi ve Butce Tahmini" />
      <View style={S.body}>
        {internal?.estimatedBudget && (
          <View style={S.budgetBox}>
            <Text style={S.budgetLabel}>Tahmini Aylik Butce</Text>
            <Text style={S.budgetValue}>{internal.estimatedBudget}</Text>
          </View>
        )}
        {internal?.salesNotes && (
          <View style={[S.salesBox, { marginTop: 14 }]}>
            <Text style={S.salesLabel}>Satis Notlari</Text>
            <Text style={S.salesText}>{internal.salesNotes}</Text>
          </View>
        )}
        <View style={{ marginTop: 18 }}>
          <Text style={S.listTitle}>Sonraki Adim Onerileri</Text>
          {[
            "Ucretsiz strateji gorusmesi planla (1 hafta icinde)",
            "Teknik SEO audit raporunu hazirla",
            "Paket onerisi ile teklif dokumani gonder",
          ].map((step, i) => (
            <View key={i} style={S.listRow}>
              <Text style={[S.listBulletBlue, { color: COLORS.success }]}>\u2192</Text>
              <Text style={S.listText}>{step}</Text>
            </View>
          ))}
        </View>
        <View style={[S.internalStamp, { marginTop: 24 }]}>
          <Text style={S.internalStampText}>GIZLI — SADECE IC KULLANIM</Text>
        </View>
      </View>
      <Footer />
    </Page>
  );
}

/* ─────────────────────────────────────────────
   ANA DOKÜMAN
───────────────────────────────────────────── */
export default function InternalReport({ data }: { data: AnalysisData }) {
  return (
    <Document
      title={`IC Rapor — ${data.clientName}`}
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
