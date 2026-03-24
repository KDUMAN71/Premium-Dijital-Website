import type { AnalysisData } from "@/types/analysis";
import { INTER_REGULAR_B64, INTER_BOLD_B64 } from "@/lib/pdf/font-data";

/* ─── Yardımcı ──────────────────────────────── */
function scoreColor(score: number): string {
  if (score >= 75) return "#1A7A3F";
  if (score >= 50) return "#B7770D";
  return "#C0392B";
}

function scoreColorBg(score: number): string {
  if (score >= 75) return "#E8F5EE";
  if (score >= 50) return "#FDF4E3";
  return "#FDEDEB";
}

function pageFooter(label = "MÜŞTERİ RAPORU"): string {
  return `
  <div class="page-footer">
    <div class="footer-col">
      <div class="footer-text">0 212 982 57 24</div>
      <div class="footer-text">info@premiumdijital.com</div>
      <div class="footer-text">premiumdijital.com</div>
    </div>
    <div class="footer-col footer-center">
      <div class="footer-text">Premium Dijital Reklam Ajansı ve Pazarlama</div>
      <div class="footer-text">Ziya Gökalp Mah. Mall Of İstanbul The Office No:7E D:136, 34490 Başakşehir/İstanbul</div>
    </div>
    <div class="footer-col footer-right">
      <div class="footer-accent">@premiumdijital</div>
      <div class="footer-accent">@premiumdijital</div>
      <div class="footer-text">${label}</div>
    </div>
  </div>`;
}

function pageHeaderBand(pageNum: string, category: string, clientName: string): string {
  return `
  <div class="page-subheader">
    <span class="sh-brand">PREMIUM DİJİTAL</span>
    <span class="sh-client">${clientName} — Dijital Analiz Raporu</span>
  </div>
  <div class="header-band">
    <div class="header-band-left">
      <span class="hb-num">${pageNum}</span>
      <span class="hb-cat">${category}</span>
    </div>
    <span class="hb-pagenum">${pageNum}</span>
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
  score: number;
  metrics: { value: string; label: string }[];
  findings: string[];
  recommendations: string[];
  gain: string;
  clientName: string;
  gainColor?: string;
}): string {
  const color = scoreColor(opts.score);
  const gainBg = opts.gainColor ?? "#0000C8";
  return `
<div class="page inner-page">
  ${pageHeaderBand(opts.pageNum, opts.category, opts.clientName)}
  <div class="page-content">
    <div class="section-title">${opts.title}</div>
    <div class="section-divider"></div>

    <div class="metrics-row">
      <div class="score-circle" style="background:${color};">
        <div class="score-val">${opts.score}</div>
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
  </div>
  ${pageFooter()}
</div>`;
}

/* ─── Ana Fonksiyon ─────────────────────────── */
export function generateClientReportHtml(data: AnalysisData): string {
  const overallColor = scoreColor(data.overallScore);

  return `<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
/* ── Türkçe TTF Font (base64 gömülü — network bağımsız) ── */
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

/* ── SAYFA YAPISI ── */
.page {
  width: 210mm;
  min-height: 297mm;
  position: relative;
  page-break-after: always;
  overflow: hidden;
  padding-bottom: 52px; /* footer için yer */
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
    #111111 0px, #111111 80px,
    #BE29EC 80px, #8A1ECC 33%,
    #5512AA 55%, #2A08C8 78%, #0000C8 100%);
  padding-top: 0;
}

.cover-sidebar-top {
  background: #111111;
  width: 100%;
  padding: 18px 0 12px;
  text-align: center;
}

.cover-sidebar-label {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  font-size: 8px;
  font-weight: 700;
  letter-spacing: 4px;
  color: rgba(255,255,255,0.75);
  text-transform: uppercase;
  margin-top: 20px;
}

.cover-sidebar-text {
  font-size: 7px;
  font-weight: 700;
  letter-spacing: 3px;
  color: white;
  text-transform: uppercase;
}

.cover-content {
  flex: 1;
  padding: 52px 44px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* ── KAPAK: üst bilgi satırı ── */
.cover-top-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 48px;
}
.cover-brand-name { font-size: 14px; font-weight: 700; color: #0000C8; letter-spacing: 1px; }
.cover-brand-tag  { font-size: 8px; color: #BE29EC; letter-spacing: 3px; text-transform: uppercase; margin-top: 3px; }
.cover-meta       { font-size: 8px; color: #CCCCCC; text-align: right; line-height: 1.8; }

/* ── KAPAK: başlık ── */
.cover-pretitle {
  font-size: 9px;
  font-weight: 700;
  color: #BE29EC;
  letter-spacing: 5px;
  text-transform: uppercase;
  margin-bottom: 14px;
}
.cover-main-title {
  font-size: 36px;
  font-weight: 700;
  color: #1A1A1A;
  line-height: 1.1;
}

/* ── Sol çizgili bilgi kutusu ── */
.info-box {
  border-left: 4px solid #0000C8;
  padding: 14px 18px;
  margin: 24px 0;
  background: #F8F8FF;
  border-radius: 0 4px 4px 0;
}
.info-box-label { font-size: 8px; color: #888; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px; }
.info-box-name  { font-size: 22px; font-weight: 700; color: #1A1A1A; margin-bottom: 8px; }
.info-box-url   { font-size: 9px; color: #888; margin-bottom: 10px; }

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
.badge-blue   { background: #EEF0FF; color: #0000C8; }
.badge-purple { background: #F5EEFF; color: #BE29EC; }
.badge-red    { background: #FFF0F0; color: #C0392B; }
.badge-green  { background: #F0FFF4; color: #1A7A3F; }

/* ── Skor kutusu ── */
.score-box {
  background: #F5F5F5;
  border-radius: 6px;
  padding: 18px 20px;
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 20px;
}
.score-circle {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.score-val { font-size: 26px; font-weight: 700; color: white; line-height: 1; }
.score-sub { font-size: 8px; color: rgba(255,255,255,0.7); margin-top: 2px; }
.score-box-label { font-size: 8px; color: #888; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 4px; }
.score-box-value { font-size: 16px; font-weight: 700; }

/* ── İÇ SAYFA HEADER ── */
.page-subheader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px 44px;
  border-bottom: 0.5px solid #EEEEEE;
}
.sh-brand  { font-size: 8px; font-weight: 700; color: #0000C8; letter-spacing: 1.5px; text-transform: uppercase; }
.sh-client { font-size: 8px; color: #AAAAAA; }

.header-band {
  background: #0000C8;
  padding: 10px 44px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header-band-left { display: flex; align-items: center; gap: 16px; }
.hb-num     { font-size: 8px; font-weight: 700; color: rgba(255,255,255,0.4); letter-spacing: 2px; }
.hb-cat     { font-size: 11px; font-weight: 700; color: white; letter-spacing: 3px; text-transform: uppercase; }
.hb-pagenum { font-size: 30px; font-weight: 700; color: rgba(255,255,255,0.12); }

/* ── Sayfa içerik alanı ── */
.page-content { padding: 24px 44px 0; }

/* ── Bölüm başlığı ── */
.section-title   { font-size: 24px; font-weight: 700; color: #1A1A1A; line-height: 1.2; margin-bottom: 4px; }
.section-divider { height: 1.5px; background: #1A1A1A; margin: 14px 0 20px; }

/* ── Metrikler ── */
.metrics-row {
  display: flex;
  gap: 12px;
  margin-bottom: 22px;
  align-items: stretch;
}
.metric-box {
  flex: 1;
  background: #F5F5F5;
  border-radius: 6px;
  padding: 14px 12px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.metric-value { font-size: 22px; font-weight: 700; color: #0000C8; line-height: 1; }
.metric-label { font-size: 8px; color: #888; text-transform: uppercase; letter-spacing: 1px; margin-top: 6px; }

/* ── Bulgular / Öneriler ── */
.findings-section { margin-bottom: 18px; }
.findings-label {
  font-size: 9px;
  font-weight: 700;
  color: #1A1A1A;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding-bottom: 6px;
  border-bottom: 1px solid #EEEEEE;
  margin-bottom: 10px;
}
.list-row {
  display: flex;
  gap: 8px;
  align-items: flex-start;
  margin-bottom: 7px;
}
.bullet-danger { color: #C0392B; font-size: 9px; flex-shrink: 0; margin-top: 1px; line-height: 1.5; }
.bullet-blue   { color: #0000C8; font-size: 9px; flex-shrink: 0; margin-top: 1px; line-height: 1.5; }
.list-text     { font-size: 10px; color: #333; line-height: 1.55; }

/* ── Kazanım kutusu ── */
.gain-box {
  border-radius: 6px;
  padding: 14px 18px;
  margin-top: 16px;
}
.gain-label { font-size: 8px; font-weight: 700; color: rgba(255,255,255,0.6); letter-spacing: 2px; text-transform: uppercase; margin-bottom: 5px; }
.gain-text  { font-size: 10px; color: white; line-height: 1.6; }

/* ── Yönetici Özeti tablosu ── */
table { width: 100%; border-collapse: collapse; font-size: 10px; margin-bottom: 0; }
th {
  background: #111111;
  color: white;
  padding: 8px 12px;
  text-align: left;
  font-weight: 700;
  font-size: 8px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}
td { padding: 9px 12px; border-bottom: 1px solid #F0F0F0; }
tr:nth-child(even) td { background: #FAFAFA; }
.td-issue  { border-left: 3px solid #0000C8; }
.td-risk   { color: #C0392B; font-weight: 700; }
.td-loss   { color: #1A1A1A; }

/* ── Kategori skor kartları ── */
.cat-grid { display: flex; gap: 12px; margin-top: 18px; }
.cat-card {
  flex: 1;
  background: #F5F5F5;
  border-radius: 6px;
  padding: 14px 10px;
  text-align: center;
}
.cat-score { font-size: 28px; font-weight: 700; line-height: 1; margin-bottom: 5px; }
.cat-label { font-size: 8px; color: #888; text-transform: uppercase; letter-spacing: 1px; }
.cat-bar   { height: 4px; background: #E0E0E0; border-radius: 2px; margin-top: 10px; overflow: hidden; }
.cat-fill  { height: 100%; border-radius: 2px; }

/* ── Tech stack & otomasyon ── */
.tech-row  { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px; }

/* ── CTA ── */
.cta-box {
  background: linear-gradient(135deg, #0000C8, #BE29EC);
  border-radius: 8px;
  padding: 28px 32px;
  text-align: center;
  margin-top: 20px;
}
.cta-title        { font-size: 20px; font-weight: 700; color: white; margin-bottom: 10px; }
.cta-text         { font-size: 10px; color: rgba(255,255,255,0.8); margin-bottom: 18px; line-height: 1.6; }
.cta-divider      { height: 0.5px; background: rgba(255,255,255,0.2); margin-bottom: 14px; }
.cta-contacts     { display: flex; justify-content: center; gap: 28px; flex-wrap: wrap; }
.cta-contact-item { font-size: 10px; font-weight: 700; color: white; }

/* ── Footer ── */
.page-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: #111111;
  padding: 9px 44px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.footer-col    { flex: 1; }
.footer-center { flex: 2; text-align: center; }
.footer-right  { text-align: right; }
.footer-text   { font-size: 7px; color: rgba(255,255,255,0.45); line-height: 1.7; }
.footer-accent { font-size: 7px; color: #BE29EC; line-height: 1.7; }

/* ── Print media ── */
@media print {
  .page { page-break-after: always; }
}
</style>
</head>
<body>

<!-- ══════════════ SAYFA 1: KAPAK ══════════════ -->
<div class="cover">
  <div class="cover-sidebar">
    <div class="cover-sidebar-top">
      <div class="cover-sidebar-text">A</div>
    </div>
    <div class="cover-sidebar-label">ANALİZ</div>
  </div>

  <div class="cover-content">
    <div>
      <div class="cover-top-row">
        <div>
          <div class="cover-brand-name">PREMIUM DİJİTAL</div>
          <div class="cover-brand-tag">DİJİTAL BÜYÜME MİMARLIĞI</div>
        </div>
        <div class="cover-meta">
          <div>DOSYA: ${data.reportId}</div>
          <div>${data.reportDate}</div>
          <div>HAZIRLAYAN: ${data.preparedBy}</div>
        </div>
      </div>

      <div class="cover-pretitle">STRATEJİK TEŞHİS BELGESİ</div>
      <div class="cover-main-title">DİJİTAL VARLIK VE</div>
      <div class="cover-main-title">KONUMLANDIRMA ANALİZİ</div>

      <div class="info-box">
        <div class="info-box-label">HAZIRLANAN KURUM</div>
        <div class="info-box-name">${data.clientName}</div>
        <div class="info-box-url">${data.clientUrl}</div>
        <div>
          <span class="badge badge-blue">${data.sector}</span>
          <span class="badge badge-purple">${data.segment}</span>
        </div>
      </div>

      <div class="score-box">
        <div class="score-circle" style="background:${overallColor};">
          <div class="score-val">${data.overallScore}</div>
          <div class="score-sub">/ 100</div>
        </div>
        <div>
          <div class="score-box-label">GENEL DİJİTAL SKOR</div>
          <div class="score-box-value" style="color:${overallColor};">${data.scoreLabel}</div>
        </div>
      </div>
    </div>

    <div style="border-top:1px solid #EEEEEE; padding-top:14px;">
      <div style="font-size:8px; color:#CCCCCC;">
        © ${new Date().getFullYear()} PREMIUM DİJİTAL REKLAM AJANSI VE PAZARLAMA · GİZLİDİR
      </div>
    </div>
  </div>
</div>

<!-- ══════════════ SAYFA 2: YÖNETİCİ ÖZETİ ══════════════ -->
<div class="page inner-page">
  ${pageHeaderBand("02", "YÖNETİCİ ÖZETİ", data.clientName)}
  <div class="page-content">
    <div class="section-title">Pazar Duruşu &amp; Risk Analizi</div>
    <div class="section-divider"></div>

    <p style="font-size:10px; color:#444; line-height:1.75; margin-bottom:22px;">${data.executiveSummary}</p>

    <div class="findings-label">TESPİT EDİLEN SORUNLAR</div>
    <table>
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
          <td class="td-loss">${issue.estimatedLoss}</td>
        </tr>`
          )
          .join("")}
      </tbody>
    </table>

    <div style="font-size:9px; font-weight:700; color:#1A1A1A; letter-spacing:2px; text-transform:uppercase; margin:22px 0 0; padding-bottom:6px; border-bottom:1px solid #EEE;">
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
          const c = scoreColor(cat.score);
          return `
      <div class="cat-card">
        <div class="cat-score" style="color:${c};">${cat.score}</div>
        <div class="cat-label">${cat.label}</div>
        <div class="cat-bar">
          <div class="cat-fill" style="width:${cat.score}%; background:${c};"></div>
        </div>
      </div>`;
        })
        .join("")}
    </div>
  </div>
  ${pageFooter()}
</div>

<!-- ══════════════ SAYFA 3: SEO & WEB ══════════════ -->
${analysisPage({
  pageNum: "03",
  category: "SEO &amp; WEB MİMARİSİ",
  title: "Teknik Altyapı &amp; Görünürlük Analizi",
  score: data.seo.score,
  metrics: [
    { value: `${(data.seo.pageSpeed / 1000).toFixed(1)}s`, label: "SAYFA HIZI" },
    { value: String(data.seo.mobileScore), label: "MOBİL SKORU" },
    { value: String(data.seo.technicalErrors), label: "TEKNİK HATA" },
  ],
  findings: data.seo.findings,
  recommendations: data.seo.recommendations,
  gain: data.seo.gain,
  clientName: data.clientName,
})}

<!-- ══════════════ SAYFA 4: PPC ══════════════ -->
${analysisPage({
  pageNum: "04",
  category: "PPC &amp; REKLAM PERFORMANSI",
  title: "Reklam Harcaması &amp; Dönüşüm Analizi",
  score: data.ppc.score,
  metrics: [
    { value: `${data.ppc.qualityScore}/10`, label: "KALİTE SKORU" },
    { value: data.ppc.competitorSpend, label: "RAKİP HARCAMA" },
  ],
  findings: data.ppc.findings,
  recommendations: data.ppc.recommendations,
  gain: data.ppc.gain,
  clientName: data.clientName,
})}

<!-- ══════════════ SAYFA 5: SOSYAL MEDYA ══════════════ -->
${analysisPage({
  pageNum: "05",
  category: "SOSYAL MEDYA &amp; İÇERİK",
  title: "Marka Tutarlılığı &amp; Etkileşim Analizi",
  score: data.social.score,
  metrics: [
    { value: data.social.engagementRate, label: "ETKİLEŞİM ORANI" },
    { value: String(data.social.consistencyScore), label: "TUTARLILIK SKORU" },
  ],
  findings: data.social.findings,
  recommendations: data.social.recommendations,
  gain: data.social.gain,
  clientName: data.clientName,
  gainColor: "#BE29EC",
})}

<!-- ══════════════ SAYFA 6: DİJİTAL OPERASYON + CTA ══════════════ -->
<div class="page inner-page">
  ${pageHeaderBand("06", "DİJİTAL OPERASYON", data.clientName)}
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
        <div class="findings-label" style="margin:12px 0 8px;">OTOMASYON BOŞLUKLARI</div>
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
      <div class="cta-text">Bu raporda tespit edilen eksiklikler için özel bir büyüme planı hazırlıyoruz.<br>İlk strateji görüşmesi ücretsiz ve bağlayıcı değildir.</div>
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

</body>
</html>`;
}
