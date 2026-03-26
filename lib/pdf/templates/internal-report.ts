import type { AnalysisData } from "@/types/analysis";
import { INTER_REGULAR_B64, INTER_BOLD_B64 } from "@/lib/pdf/font-data";

/* ─── Yardımcı ──────────────────────────────── */
function scoreColor(score: number): string {
  if (score >= 75) return "#1A7A3F";
  if (score >= 50) return "#B7770D";
  return "#C0392B";
}

function pageFooter(): string {
  return `
  <div class="page-footer">
    <div class="footer-col">
      <div class="footer-text">0 212 982 57 24</div>
      <div class="footer-text">info@premiumdijital.com</div>
    </div>
    <div class="footer-col footer-center">
      <div class="footer-text">Premium Dijital Reklam Ajansı — Dahili Kullanım</div>
      <div class="footer-text">Ziya Gökalp Mah. Mall Of İstanbul The Office No:7E D:136, 34490 Başakşehir/İstanbul</div>
    </div>
    <div class="footer-col footer-right">
      <div class="footer-danger">GİZLİ</div>
      <div class="footer-text">İÇ RAPOR</div>
    </div>
  </div>`;
}

function pageHeaderBand(pageNum: string, category: string): string {
  return `
  <div class="page-subheader">
    <span class="sh-brand">PREMIUM DİJİTAL</span>
    <span class="sh-internal">GİZLİ — İÇ KULLANIM</span>
  </div>
  <div class="header-band">
    <div class="header-band-left">
      <span class="hb-num">${pageNum}</span>
      <span class="hb-cat">${category}</span>
    </div>
    <span class="hb-pagenum">${pageNum}</span>
  </div>`;
}

function internalNote(text: string): string {
  return `
  <div class="internal-note">
    <div class="internal-note-label">İÇ NOT</div>
    <div class="internal-note-text">${text}</div>
  </div>`;
}

function analysisList(items: string[], bulletClass: string): string {
  return items
    .map(
      (item) =>
        `<div class="list-row"><span class="${bulletClass}">▶</span><span class="list-text">${item}</span></div>`
    )
    .join("");
}

function analysisPage(opts: {
  pageNum: string;
  category: string;
  title: string;
  score: number | null;
  metrics: { value: string; label: string }[];
  findings: string[];
  recommendations: string[];
  gain: string;
  gainColor?: string;
  internalNoteText?: string;
}): string {
  const color = opts.score !== null ? scoreColor(opts.score) : "#888888";
  const gainBg = opts.gainColor ?? "#0000C8";
  return `
<div class="page inner-page">
  ${pageHeaderBand(opts.pageNum, opts.category)}
  <div class="page-content">
    <div class="section-title">${opts.title}</div>
    <div class="section-divider"></div>

    <div class="metrics-row">
      <div class="score-circle" style="background:${color};">
        <div class="score-val">${opts.score !== null ? opts.score : "—"}</div>
        <div class="score-sub">/ 100</div>
      </div>
      ${opts.metrics
        .map(
          (m) => `
      <div class="metric-box">
        <div class="metric-value" style="color:${color};">${m.value}</div>
        <div class="metric-label">${m.label}</div>
      </div>`
        )
        .join("")}
    </div>

    <div class="findings-section">
      <div class="findings-label">TESPİT BULGULARI</div>
      ${analysisList(opts.findings, "bullet-danger")}
    </div>
    <div class="findings-section">
      <div class="findings-label">ÖNERİLER</div>
      ${analysisList(opts.recommendations, "bullet-blue")}
    </div>

    <div class="gain-box" style="background:${gainBg};">
      <div class="gain-label">TAHMİNİ KAZANIM</div>
      <div class="gain-text">${opts.gain}</div>
    </div>

    ${opts.internalNoteText ? internalNote(opts.internalNoteText) : ""}
  </div>
  ${pageFooter()}
</div>`;
}

/* ─── Ana Fonksiyon ─────────────────────────── */
export function generateInternalReportHtml(data: AnalysisData): string {
  const overallColor = scoreColor(data.overallScore);
  const actionItems = data.internal?.actionItems ?? [];
  const priorityMap = {
    HIGH: { bg: "#FDEDEB", color: "#C0392B", label: "YÜKSEK" },
    MEDIUM: { bg: "#FDF4E3", color: "#B7770D", label: "ORTA" },
    LOW: { bg: "#E8F5EE", color: "#1A7A3F", label: "DÜŞÜK" },
  };

  return `<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<style>
@font-face {
  font-family: 'Inter';
  font-weight: 400;
  src: url('data:font/truetype;base64,${INTER_REGULAR_B64}') format('truetype');
}
@font-face {
  font-family: 'Inter';
  font-weight: 700;
  src: url('data:font/truetype;base64,${INTER_BOLD_B64}') format('truetype');
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: 'Inter', sans-serif;
  color: #1A1A1A;
  background: white;
  font-size: 11px;
  line-height: 1.5;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

.page {
  width: 210mm;
  min-height: 297mm;
  position: relative;
  page-break-after: always;
  overflow: hidden;
  padding-bottom: 52px;
}
.page:last-child { page-break-after: auto; }

/* ── KAPAK ── */
.cover {
  display: flex;
  flex-direction: row;
  min-height: 297mm;
  page-break-after: always;
}
.cover-sidebar {
  width: 72px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(to bottom,
    #7A0000 0px, #7A0000 80px,
    #BE29EC 80px, #8A1ECC 33%,
    #5512AA 55%, #2A08C8 78%, #0000C8 100%);
}
.cover-sidebar-top {
  background: #7A0000;
  width: 100%;
  padding: 18px 0 12px;
  text-align: center;
}
.cover-sidebar-text {
  font-size: 7px;
  font-weight: 700;
  letter-spacing: 3px;
  color: white;
  text-transform: uppercase;
}
.cover-sidebar-label {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  font-size: 8px;
  font-weight: 700;
  letter-spacing: 4px;
  color: rgba(255,255,255,0.65);
  text-transform: uppercase;
  margin-top: 20px;
}
.cover-content {
  flex: 1;
  padding: 52px 44px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.cover-top-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 44px;
}
.cover-brand-name { font-size: 14px; font-weight: 700; color: #0000C8; letter-spacing: 1px; }
.cover-brand-tag  { font-size: 8px; color: #BE29EC; letter-spacing: 3px; text-transform: uppercase; margin-top: 3px; }
.cover-meta       { font-size: 8px; color: #CCCCCC; text-align: right; line-height: 1.8; }
.cover-pretitle {
  font-size: 9px;
  font-weight: 700;
  color: #BE29EC;
  letter-spacing: 5px;
  text-transform: uppercase;
  margin-bottom: 14px;
}
.cover-main-title {
  font-size: 34px;
  font-weight: 700;
  color: #1A1A1A;
  line-height: 1.1;
}
.info-box {
  border-left: 4px solid #0000C8;
  padding: 14px 18px;
  margin: 22px 0;
  background: #F8F8FF;
  border-radius: 0 4px 4px 0;
}
.info-box-label { font-size: 8px; color: #888; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px; }
.info-box-name  { font-size: 22px; font-weight: 700; color: #1A1A1A; margin-bottom: 6px; }
.score-box {
  background: #F5F5F5;
  border-radius: 6px;
  padding: 16px 18px;
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}
.score-circle {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.score-val { font-size: 22px; font-weight: 700; color: white; line-height: 1; }
.score-sub { font-size: 8px; color: rgba(255,255,255,0.7); margin-top: 2px; }

/* GİZLİ DAMGA */
.gizli-stamp {
  display: inline-block;
  border: 2px solid #C0392B;
  padding: 6px 16px;
  border-radius: 3px;
  margin-top: 14px;
}
.gizli-stamp-text {
  font-size: 11px;
  font-weight: 700;
  color: #C0392B;
  letter-spacing: 3px;
  text-transform: uppercase;
}

/* ── Badge ── */
.badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 4px;
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-right: 6px;
}
.badge-blue    { background: #EEF0FF; color: #0000C8; }
.badge-purple  { background: #F5EEFF; color: #BE29EC; }
.badge-red     { background: #FFF0F0; color: #C0392B; }

/* ── İÇ SAYFA HEADER ── */
.page-subheader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px 44px;
  border-bottom: 0.5px solid #EEEEEE;
}
.sh-brand    { font-size: 8px; font-weight: 700; color: #0000C8; letter-spacing: 1.5px; text-transform: uppercase; }
.sh-internal {
  font-size: 7px;
  font-weight: 700;
  color: #C0392B;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  border: 0.5px solid #C0392B;
  padding: 2px 7px;
  border-radius: 3px;
}
.header-band {
  background: #1A0000;
  padding: 10px 44px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header-band-left { display: flex; align-items: center; gap: 16px; }
.hb-num     { font-size: 8px; font-weight: 700; color: rgba(255,255,255,0.35); letter-spacing: 2px; }
.hb-cat     { font-size: 11px; font-weight: 700; color: white; letter-spacing: 3px; text-transform: uppercase; }
.hb-pagenum { font-size: 30px; font-weight: 700; color: rgba(255,255,255,0.1); }

.page-content { padding: 24px 44px 0; }
.section-title   { font-size: 24px; font-weight: 700; color: #1A1A1A; line-height: 1.2; margin-bottom: 4px; }
.section-divider { height: 1.5px; background: #1A1A1A; margin: 14px 0 20px; }

.metrics-row { display: flex; gap: 12px; margin-bottom: 20px; align-items: stretch; }
.metric-box {
  flex: 1;
  background: #F5F5F5;
  border-radius: 6px;
  padding: 12px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.metric-value { font-size: 20px; font-weight: 700; color: #0000C8; line-height: 1; }
.metric-label { font-size: 8px; color: #888; text-transform: uppercase; letter-spacing: 1px; margin-top: 5px; }

.findings-section { margin-bottom: 16px; }
.findings-label {
  font-size: 9px;
  font-weight: 700;
  color: #1A1A1A;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding-bottom: 5px;
  border-bottom: 1px solid #EEEEEE;
  margin-bottom: 9px;
}
.list-row { display: flex; gap: 8px; align-items: flex-start; margin-bottom: 6px; }
.bullet-danger { color: #C0392B; font-size: 9px; flex-shrink: 0; margin-top: 1px; line-height: 1.5; }
.bullet-blue   { color: #0000C8; font-size: 9px; flex-shrink: 0; margin-top: 1px; line-height: 1.5; }
.list-text     { font-size: 10px; color: #333; line-height: 1.55; }

.gain-box   { border-radius: 6px; padding: 12px 16px; margin-top: 14px; }
.gain-label { font-size: 8px; font-weight: 700; color: rgba(255,255,255,0.6); letter-spacing: 2px; text-transform: uppercase; margin-bottom: 4px; }
.gain-text  { font-size: 10px; color: white; line-height: 1.6; }

/* ── İÇ NOT ── */
.internal-note {
  margin-top: 12px;
  padding: 10px 14px;
  background: #FFF5F5;
  border-left: 3px solid #C0392B;
  border-radius: 0 4px 4px 0;
}
.internal-note-label { font-size: 7px; font-weight: 700; color: #C0392B; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 4px; }
.internal-note-text  { font-size: 9px; color: #444; line-height: 1.6; }

/* ── YÖNETİCİ ÖZETİ ── */
table { width: 100%; border-collapse: collapse; font-size: 10px; }
th {
  background: #1A0000;
  color: white;
  padding: 8px 12px;
  text-align: left;
  font-weight: 700;
  font-size: 8px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}
td { padding: 8px 12px; border-bottom: 1px solid #F0F0F0; }
tr:nth-child(even) td { background: #FAFAFA; }
.td-issue  { border-left: 3px solid #0000C8; }
.td-risk   { color: #C0392B; font-weight: 700; }

.cat-grid { display: flex; gap: 10px; margin-top: 16px; }
.cat-card { flex: 1; background: #F5F5F5; border-radius: 6px; padding: 12px 8px; text-align: center; }
.cat-score { font-size: 24px; font-weight: 700; line-height: 1; margin-bottom: 4px; }
.cat-label { font-size: 7px; color: #888; text-transform: uppercase; letter-spacing: 1px; }
.cat-bar   { height: 4px; background: #E0E0E0; border-radius: 2px; margin-top: 8px; overflow: hidden; }
.cat-fill  { height: 100%; border-radius: 2px; }

/* ── OPERASYON ── */
.tech-row { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px; }
.cta-box  { background: #0000C8; border-radius: 8px; padding: 22px 28px; margin-top: 18px; }
.cta-title { font-size: 18px; font-weight: 700; color: white; margin-bottom: 8px; }
.cta-text  { font-size: 10px; color: rgba(255,255,255,0.75); margin-bottom: 14px; line-height: 1.6; }
.cta-divider { height: 0.5px; background: rgba(255,255,255,0.2); margin-bottom: 12px; }
.cta-contacts { display: flex; gap: 24px; flex-wrap: wrap; }
.cta-contact-item { font-size: 10px; font-weight: 700; color: white; }

/* ── AKSİYON TABLOSU ── */
.priority-badge {
  display: inline-block;
  padding: 3px 8px;
  border-radius: 3px;
  font-size: 8px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  white-space: nowrap;
}

/* ── SATIŞ NOTU ── */
.sales-box {
  border-left: 4px solid #BE29EC;
  padding: 14px 18px;
  background: #F9F5FF;
  border-radius: 0 4px 4px 0;
  margin-bottom: 16px;
}
.sales-label { font-size: 8px; font-weight: 700; color: #BE29EC; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px; }
.sales-text  { font-size: 10px; color: #1A1A1A; line-height: 1.7; }
.budget-box  { background: #1A7A3F; border-radius: 6px; padding: 14px 18px; margin-bottom: 18px; }
.budget-label { font-size: 8px; font-weight: 700; color: rgba(255,255,255,0.7); text-transform: uppercase; letter-spacing: 2px; margin-bottom: 6px; }
.budget-value { font-size: 24px; font-weight: 700; color: white; }

/* ── FOOTER ── */
.page-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: #1A0000;
  padding: 9px 44px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.footer-col    { flex: 1; }
.footer-center { flex: 2; text-align: center; }
.footer-right  { text-align: right; }
.footer-text   { font-size: 7px; color: rgba(255,255,255,0.4); line-height: 1.7; }
.footer-danger { font-size: 7px; color: #C0392B; line-height: 1.7; font-weight: 700; letter-spacing: 1px; }

@media print { .page { page-break-after: always; } }
</style>
</head>
<body>

<!-- ══════════════ SAYFA 1: KAPAK (İÇ) ══════════════ -->
<div class="cover">
  <div class="cover-sidebar">
    <div class="cover-sidebar-top">
      <div class="cover-sidebar-text">İ</div>
    </div>
    <div class="cover-sidebar-label">İÇ RAPOR</div>
  </div>

  <div class="cover-content">
    <div>
      <div class="cover-top-row">
        <div>
          <div class="cover-brand-name">PREMIUM DİJİTAL</div>
          <div class="cover-brand-tag">DİJİTAL BÜYÜME MİMARLIĞI — DAHİLİ</div>
        </div>
        <div class="cover-meta">
          <div>DOSYA: ${data.reportId}</div>
          <div>${data.reportDate}</div>
          <div>HAZIRLAYAN: ${data.preparedBy}</div>
        </div>
      </div>

      <div class="cover-pretitle">STRATEJİK TEŞHİS BELGESİ — DAHİLİ</div>
      <div class="cover-main-title">DİJİTAL VARLIK VE</div>
      <div class="cover-main-title">KONUMLANDIRMA ANALİZİ</div>

      <div class="info-box">
        <div class="info-box-label">HAZIRLANAN KURUM</div>
        <div class="info-box-name">${data.clientName}</div>
        <div>
          <span class="badge badge-blue">${data.sector}</span>
          <span class="badge badge-purple">${data.segment}</span>
          <span class="badge badge-red">GİZLİ</span>
        </div>
      </div>

      <div class="score-box">
        <div class="score-circle" style="background:${overallColor};">
          <div class="score-val">${data.overallScore}</div>
          <div class="score-sub">/ 100</div>
        </div>
        <div>
          <div style="font-size:8px; color:#888; text-transform:uppercase; letter-spacing:2px; margin-bottom:4px;">GENEL DİJİTAL SKOR</div>
          <div style="font-size:16px; font-weight:700; color:${overallColor};">${data.scoreLabel}</div>
        </div>
      </div>

      <div class="gizli-stamp">
        <span class="gizli-stamp-text">GİZLİ — SADECE İÇ KULLANIM</span>
      </div>
    </div>

    <div style="border-top:1px solid #EEEEEE; padding-top:14px;">
      <div style="font-size:8px; color:#CCCCCC;">
        DOSYA NO: ${data.reportId} · GİZLİ — İÇ RAPOR
      </div>
    </div>
  </div>
</div>

<!-- ══════════════ SAYFA 2: YÖNETİCİ ÖZETİ ══════════════ -->
<div class="page inner-page">
  ${pageHeaderBand("02", "YÖNETİCİ ÖZETİ")}
  <div class="page-content">
    <div class="section-title">Pazar Duruşu &amp; Risk Analizi</div>
    <div class="section-divider"></div>

    <p style="font-size:10px; color:#444; line-height:1.75; margin-bottom:20px;">${data.executiveSummary}</p>

    <div class="findings-label">TESPİT EDİLEN SORUNLAR</div>
    <table style="margin-bottom:0;">
      <thead>
        <tr>
          <th>TESPİT EDİLEN SORUN</th>
          <th>RİSK</th>
          <th>TAHMİNİ KAYIP</th>
        </tr>
      </thead>
      <tbody>
        ${data.topIssues
          .map(
            (issue) => `
        <tr>
          <td class="td-issue">${issue.issue}</td>
          <td class="td-risk">${issue.risk}</td>
          <td>${issue.estimatedLoss}</td>
        </tr>`
          )
          .join("")}
      </tbody>
    </table>

    <div style="font-size:9px; font-weight:700; letter-spacing:2px; text-transform:uppercase; margin:20px 0 0; padding-bottom:5px; border-bottom:1px solid #EEE;">
      KATEGORİ BAZLI SKOR
    </div>
    <div class="cat-grid">
      ${[
        { label: "SEO &amp; WEB", score: data.seo.score },
        { label: "PPC", score: data.ppc.score },
        { label: "SOSYAL", score: data.social.score },
        { label: "OPERASYON", score: data.operations.score },
      ]
        .map((cat) => {
          const c = cat.score !== null ? scoreColor(cat.score) : "#CCCCCC";
          return `
      <div class="cat-card">
        <div class="cat-score" style="color:${c};">${cat.score !== null ? cat.score : "—"}</div>
        <div class="cat-label">${cat.label}</div>
        <div class="cat-bar"><div class="cat-fill" style="width:${cat.score ?? 0}%; background:${c};"></div></div>
      </div>`;
        })
        .join("")}
    </div>

    ${data.internal?.salesNotes ? internalNote(`Satış notu: ${data.internal.salesNotes}`) : ""}
  </div>
  ${pageFooter()}
</div>

<!-- ══════════════ SAYFA 3: SEO ══════════════ -->
${analysisPage({
  pageNum: "03",
  category: "SEO &amp; WEB MİMARİSİ",
  title: "Teknik Altyapı &amp; Görünürlük Analizi",
  score: data.seo.score,
  metrics: [
    { value: data.seo.pageSpeed !== null ? `${(data.seo.pageSpeed / 1000).toFixed(1)}s` : "PageSpeed API", label: "SAYFA HIZI" },
    { value: data.seo.mobileScore !== null ? String(data.seo.mobileScore) : "—", label: "MOBİL SKORU" },
    { value: String(data.seo.technicalErrors), label: "TEKNİK HATA" },
  ],
  findings: data.seo.findings,
  recommendations: data.seo.recommendations,
  gain: data.seo.gain,
  internalNoteText: "Ham teknik veri: Core Web Vitals, Lighthouse skoru ve GSC hata raporu audit paketine eklendi.",
})}

<!-- ══════════════ SAYFA 4: PPC ══════════════ -->
${analysisPage({
  pageNum: "04",
  category: "PPC &amp; REKLAM PERFORMANSI",
  title: "Reklam Harcaması &amp; Dönüşüm Analizi",
  score: data.ppc.score,
  metrics: [
    { value: data.ppc.qualityScore !== null ? `${data.ppc.qualityScore}/10` : "—", label: "KALİTE SKORU" },
    { value: data.ppc.competitorSpend, label: "RAKİP HARCAMA" },
  ],
  findings: data.ppc.findings,
  recommendations: data.ppc.recommendations,
  gain: data.ppc.gain,
  internalNoteText: "Auction Insights ve SimilarWeb rakip harcama verileri ekte mevcuttur.",
})}

<!-- ══════════════ SAYFA 5: SOSYAL MEDYA ══════════════ -->
${analysisPage({
  pageNum: "05",
  category: "SOSYAL MEDYA &amp; İÇERİK",
  title: "Marka Tutarlılığı &amp; Etkileşim Analizi",
  score: data.social.score,
  metrics: [
    { value: data.social.engagementRate, label: "ETKİLEŞİM ORANI" },
    { value: data.social.consistencyScore !== null ? String(data.social.consistencyScore) : "—", label: "TUTARLILIK SKORU" },
  ],
  findings: data.social.findings,
  recommendations: data.social.recommendations,
  gain: data.social.gain,
  gainColor: "#BE29EC",
  internalNoteText: "Instagram/Facebook analitikleri ve Meta Business Suite ekran görüntüleri kayıt altına alındı.",
})}

<!-- ══════════════ SAYFA 6: OPERASYON + CTA ══════════════ -->
<div class="page inner-page">
  ${pageHeaderBand("06", "DİJİTAL OPERASYON")}
  <div class="page-content">
    <div class="section-title">Sistem Olgunluğu &amp; Otomasyon Boşlukları</div>
    <div class="section-divider"></div>

    <div class="metrics-row" style="align-items:flex-start;">
      <div class="score-circle" style="background:${scoreColor(data.operations.score)}; flex-shrink:0;">
        <div class="score-val">${data.operations.score}</div>
        <div class="score-sub">/ 100</div>
      </div>
      <div style="flex:1;">
        <div class="findings-label" style="margin-bottom:8px;">MEVCUT TECH STACK</div>
        <div class="tech-row">
          ${data.operations.techStack.map((t) => `<span class="badge badge-blue">${t}</span>`).join("")}
        </div>
        <div class="findings-label" style="margin:10px 0 8px;">OTOMASYON BOŞLUKLARI</div>
        ${data.operations.automationGaps
          .map((g) => `<div class="list-row"><span class="bullet-danger">▶</span><span class="list-text">${g}</span></div>`)
          .join("")}
      </div>
    </div>
    <div class="findings-section">
      <div class="findings-label">TESPİT BULGULARI</div>
      ${analysisList(data.operations.findings, "bullet-danger")}
    </div>
    <div class="findings-section">
      <div class="findings-label">ÖNERİLER</div>
      ${analysisList(data.operations.recommendations, "bullet-blue")}
    </div>
    <div class="gain-box" style="background:#0000C8;">
      <div class="gain-label">TAHMİNİ KAZANIM</div>
      <div class="gain-text">${data.operations.gain}</div>
    </div>
    <div class="cta-box">
      <div class="cta-title">Sisteminizi Birlikte Kurgulayalım.</div>
      <div class="cta-text">İlk strateji görüşmesi ücretsiz ve bağlayıcı değildir.</div>
      <div class="cta-divider"></div>
      <div class="cta-contacts">
        <span class="cta-contact-item">premiumdijital.com</span>
        <span class="cta-contact-item">info@premiumdijital.com</span>
        <span class="cta-contact-item">(0212) 982 57 24</span>
      </div>
    </div>
  </div>
  ${pageFooter()}
</div>

<!-- ══════════════ SAYFA 7: AKSİYON PLANI ══════════════ -->
<div class="page inner-page">
  ${pageHeaderBand("07", "AKSİYON PLANI")}
  <div class="page-content">
    <div class="section-title">Öncelikli Görev Listesi</div>
    <div class="section-divider"></div>

    <table>
      <thead>
        <tr>
          <th style="width:80px;">ÖNCELİK</th>
          <th>GÖREV</th>
          <th style="width:90px; text-align:center;">SORUMLU</th>
          <th style="width:80px; text-align:center;">SÜRE</th>
        </tr>
      </thead>
      <tbody>
        ${actionItems
          .map((action, i) => {
            const p = priorityMap[action.priority];
            return `
        <tr style="${i % 2 === 1 ? "background:#FAFAFA;" : ""}">
          <td>
            <span class="priority-badge" style="background:${p.bg}; color:${p.color};">${p.label}</span>
          </td>
          <td style="border-left:3px solid #0000C8;">${action.task}</td>
          <td style="text-align:center; color:#666;">${action.owner}</td>
          <td style="text-align:center; color:#666;">${action.deadline}</td>
        </tr>`;
          })
          .join("")}
        ${actionItems.length === 0 ? '<tr><td colspan="4" style="text-align:center; color:#999; padding:16px;">Aksiyon kaydı bulunamadı.</td></tr>' : ""}
      </tbody>
    </table>
  </div>
  ${pageFooter()}
</div>

<!-- ══════════════ SAYFA 8: SATIŞ NOTU ══════════════ -->
<div class="page inner-page">
  ${pageHeaderBand("08", "SATIŞ NOTU")}
  <div class="page-content">
    <div class="section-title">Müşteri Değerlendirmesi &amp; Bütçe Tahmini</div>
    <div class="section-divider"></div>

    ${
      data.internal?.estimatedBudget
        ? `<div class="budget-box">
        <div class="budget-label">TAHMİNİ AYLIK BÜTÇE</div>
        <div class="budget-value">${data.internal.estimatedBudget}</div>
      </div>`
        : ""
    }

    ${
      data.internal?.salesNotes
        ? `<div class="sales-box">
        <div class="sales-label">Satış Notları</div>
        <div class="sales-text">${data.internal.salesNotes}</div>
      </div>`
        : ""
    }

    <div class="findings-label">SONRAKI ADIM ÖNERİLERİ</div>
    ${[
      "Ücretsiz strateji görüşmesi planla (1 hafta içinde)",
      "Teknik SEO audit raporunu hazırla",
      "Paket önerisi ile teklif dokümanını gönder",
    ]
      .map((s) => `<div class="list-row"><span class="bullet-blue">→</span><span class="list-text">${s}</span></div>`)
      .join("")}

    <div class="gizli-stamp" style="margin-top:24px;">
      <span class="gizli-stamp-text">GİZLİ — SADECE İÇ KULLANIM</span>
    </div>
  </div>
  ${pageFooter()}
</div>

</body>
</html>`;
}
