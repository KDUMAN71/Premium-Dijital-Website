import type { AnalysisData } from "@/types/analysis";
import { INTER_REGULAR_B64, INTER_BOLD_B64 } from "@/lib/pdf/font-data";

/* ═══════════════════════════════════════════
   YARDIMCI FONKSIYONLAR
═══════════════════════════════════════════ */

function scoreColor(score: number): string {
  if (score >= 75) return "#1A7A3F";
  if (score >= 50) return "#B7770D";
  return "#C0392B";
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
      <div class="footer-text">Premium Dijital Reklam Ajansi ve Pazarlama</div>
      <div class="footer-text">Ziya Gokalp Mah. Mall Of Istanbul The Office No:7E D:136, 34490 Basaksehir/Istanbul</div>
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
    <span class="sh-brand">PREMIUM DIJITAL</span>
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

function analysisList(items: string[], bulletColor: string): string {
  return items
    .map(
      (item) =>
        `<div class="list-row"><span style="color:${bulletColor};font-size:8px;flex-shrink:0;margin-top:2px;">&#9658;</span><span class="list-text">${item}</span></div>`
    )
    .join("");
}

function gainBox(gain: string, color = "#0000C8"): string {
  return `<div class="gain-box" style="background:${color};">
    <div class="gain-label">TAHMINI KAZANIM</div>
    <div class="gain-text">${gain}</div>
  </div>`;
}

/* ═══════════════════════════════════════════
   SVG CHART FONKSIYONLARI
═══════════════════════════════════════════ */

function competitorScatterSvg(competitors: AnalysisData["competitors"]): string {
  const width = 460;
  const height = 260;
  const padLeft = 48;
  const padBottom = 36;
  const plotW = width - padLeft - 16;
  const plotH = height - padBottom - 20;
  const maxX = 20;
  const maxY = 50;

  const gridLinesY = [0, 10, 20, 30, 40, 50].map((v) => {
    const y = (height - padBottom) - (v / maxY) * plotH;
    return `<line x1="${padLeft}" y1="${y}" x2="${width - 16}" y2="${y}" stroke="#E8E8E8" stroke-width="1"/>
            <text x="${padLeft - 5}" y="${y + 3}" text-anchor="end" font-size="8" fill="#AAAAAA" font-family="Arial">${v}</text>`;
  }).join("");

  const gridLinesX = [0, 5, 10, 15, 20].map((v) => {
    const x = padLeft + (v / maxX) * plotW;
    return `<line x1="${x}" y1="18" x2="${x}" y2="${height - padBottom}" stroke="#E8E8E8" stroke-width="1"/>
            <text x="${x}" y="${height - padBottom + 12}" text-anchor="middle" font-size="8" fill="#AAAAAA" font-family="Arial">${v}</text>`;
  }).join("");

  const dots = (competitors ?? []).map((c) => {
    const cx = padLeft + (Math.min(c.paidKeywords, maxX) / maxX) * plotW;
    const cy = (height - padBottom) - (Math.min(c.paidSearchTraffic ?? 0, maxY) / maxY) * plotH;
    const col = c.competitionLevel === "high" ? "#C0392B" : c.competitionLevel === "medium" ? "#E67E22" : "#27AE60";
    const name = c.domain.split(".")[0];
    return `<circle cx="${cx}" cy="${cy}" r="7" fill="${col}" opacity="0.85"/>
            <text x="${cx}" y="${cy - 10}" text-anchor="middle" font-size="7" fill="#555555" font-family="Arial">${name}</text>`;
  }).join("");

  const clientCx = padLeft + (2 / maxX) * plotW;
  const clientCy = (height - padBottom) - (5 / maxY) * plotH;

  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="#FAFAFA" rx="4"/>
  ${gridLinesY}
  ${gridLinesX}
  <line x1="${padLeft}" y1="18" x2="${padLeft}" y2="${height - padBottom}" stroke="#CCCCCC" stroke-width="1"/>
  <line x1="${padLeft}" y1="${height - padBottom}" x2="${width - 16}" y2="${height - padBottom}" stroke="#CCCCCC" stroke-width="1"/>
  <text x="${width / 2}" y="${height - 2}" text-anchor="middle" font-size="8" fill="#888888" font-family="Arial">Ucretli Anahtar Kelime Sayisi</text>
  <text x="10" y="${height / 2}" text-anchor="middle" font-size="8" fill="#888888" font-family="Arial" transform="rotate(-90,10,${height / 2})">Ucretli Trafik</text>
  ${dots}
  <circle cx="${clientCx}" cy="${clientCy}" r="9" fill="#0000C8" opacity="0.9"/>
  <text x="${clientCx}" y="${clientCy - 12}" text-anchor="middle" font-size="8" fill="#0000C8" font-weight="bold" font-family="Arial">SIZ</text>
</svg>`;
}

function geoDonutSvg(targets: AnalysisData["geoTargets"]): string {
  const size = 180;
  const cx = size / 2;
  const cy = size / 2;
  const r = 68;
  const innerR = 40;

  const list = targets ?? [];
  const total = list.reduce((s, t) => s + t.percentage, 0) || 1;
  let cumAngle = -Math.PI / 2;

  const slices = list.map((t) => {
    const angle = (t.percentage / total) * 2 * Math.PI;
    const x1 = cx + r * Math.cos(cumAngle);
    const y1 = cy + r * Math.sin(cumAngle);
    cumAngle += angle;
    const x2 = cx + r * Math.cos(cumAngle);
    const y2 = cy + r * Math.sin(cumAngle);
    const ix1 = cx + innerR * Math.cos(cumAngle);
    const iy1 = cy + innerR * Math.sin(cumAngle);
    const ix2 = cx + innerR * Math.cos(cumAngle - angle);
    const iy2 = cy + innerR * Math.sin(cumAngle - angle);
    const large = angle > Math.PI ? 1 : 0;
    return `<path d="M${x1.toFixed(2)},${y1.toFixed(2)} A${r},${r} 0 ${large},1 ${x2.toFixed(2)},${y2.toFixed(2)} L${ix1.toFixed(2)},${iy1.toFixed(2)} A${innerR},${innerR} 0 ${large},0 ${ix2.toFixed(2)},${iy2.toFixed(2)} Z" fill="${t.color}" opacity="0.9"/>`;
  }).join("");

  return `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  ${slices}
  <circle cx="${cx}" cy="${cy}" r="${innerR}" fill="white"/>
  <text x="${cx}" y="${cy + 3}" text-anchor="middle" font-size="10" font-weight="bold" fill="#1A1A1A" font-family="Arial">Hedef</text>
  <text x="${cx}" y="${cy + 14}" text-anchor="middle" font-size="8" fill="#888888" font-family="Arial">Pazarlar</text>
</svg>`;
}

function categoryBarSvg(scores: { label: string; score: number; sectorAvg: number }[]): string {
  const width = 460;
  const rowH = 46;
  const height = scores.length * rowH + 32;
  const labelW = 110;
  const barMaxW = width - labelW - 70;

  const rows = scores.map((s, i) => {
    const y = 24 + i * rowH;
    const barW = (s.score / 100) * barMaxW;
    const avgW = (s.sectorAvg / 100) * barMaxW;
    const col = s.score >= 70 ? "#27AE60" : s.score >= 45 ? "#E67E22" : "#C0392B";
    return `
      <text x="${labelW - 8}" y="${y + 12}" text-anchor="end" font-size="9" fill="#555555" font-family="Arial">${s.label}</text>
      <rect x="${labelW}" y="${y + 2}" width="${avgW.toFixed(1)}" height="10" fill="#DDDDDD" rx="2"/>
      <text x="${labelW + avgW + 5}" y="${y + 11}" font-size="8" fill="#AAAAAA" font-family="Arial">${s.sectorAvg}</text>
      <rect x="${labelW}" y="${y + 16}" width="${barW.toFixed(1)}" height="10" fill="${col}" rx="2"/>
      <text x="${labelW + barW + 5}" y="${y + 25}" font-size="9" font-weight="bold" fill="${col}" font-family="Arial">${s.score}</text>
    `;
  }).join("");

  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="#FAFAFA" rx="4"/>
  <text x="${labelW}" y="14" font-size="8" fill="#AAAAAA" font-family="Arial">Gri: Sektor Ortalamasi   Renkli: Sizin Skorunuz</text>
  ${rows}
</svg>`;
}

/* ═══════════════════════════════════════════
   ANA FONKSİYON
═══════════════════════════════════════════ */
function proAnalysisCta(data: AnalysisData): string {
  const hasProData = !!(data.competitors && data.competitors.length > 0);
  if (hasProData) return "";
  return `
<div style="margin:24px 0;background:#1A1A1A;border-radius:12px;padding:24px 28px;border-left:4px solid #BE29EC;">
  <div style="font-size:9px;font-weight:800;color:#BE29EC;letter-spacing:3px;text-transform:uppercase;margin-bottom:10px;">
    PRO ANALİZ — Rakip İstihbaratı
  </div>
  <div style="font-size:13px;font-weight:800;color:white;margin-bottom:8px;">
    Rakiplerinizin tam stratejisini görmek ister misiniz?
  </div>
  <div style="font-size:10px;color:rgba(255,255,255,0.55);line-height:1.7;margin-bottom:16px;">
    Bu raporda sektör ortalamaları kullanıldı. Pro Analiz paketinde rakiplerinizin
    gerçek reklam harcamaları, keyword stratejileri ve dijital yatırım verileri
    kişisel olarak derlenir.
  </div>
  <div style="display:flex;gap:16px;align-items:center;">
    <div style="font-size:18px;font-weight:800;color:#BE29EC;">2.500 TL</div>
    <div style="font-size:10px;color:rgba(255,255,255,0.4);">tek seferlik · 3-5 is günü</div>
  </div>
  <div style="margin-top:14px;background:rgba(190,41,236,0.1);border:1px solid rgba(190,41,236,0.2);border-radius:8px;padding:10px 16px;font-size:10px;color:#BE29EC;font-weight:700;">
    WhatsApp ile iletisime gecin: wa.me/905425658010
  </div>
</div>`;
}

export function generateClientReportHtml(data: AnalysisData): string {
  const overallColor = scoreColor(data.overallScore);

  const css = `
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
  font-family: 'Inter', Arial, sans-serif;
  font-size: 10px;
  color: #1A1A1A;
  background: #fff;
}

/* ── Sayfa yapısı ── */
.page {
  width: 210mm;
  min-height: 297mm;
  display: flex;
  page-break-after: always;
  position: relative;
  overflow: hidden;
}

.sidebar {
  width: 14px;
  flex-shrink: 0;
  background: linear-gradient(to bottom, #BE29EC, #8A1ECC, #5512AA, #2A08C8, #0000C8);
}

.sidebar-label {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  font-size: 6px;
  font-weight: 700;
  color: rgba(255,255,255,0.5);
  letter-spacing: 3px;
  text-transform: uppercase;
  text-align: center;
  width: 100%;
  padding: 20px 0;
}

.page-inner {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 297mm;
}

/* ── Header band ── */
.page-subheader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 20px;
  background: #F8F8F8;
  border-bottom: 1px solid #EEEEEE;
}
.sh-brand { font-size: 7px; font-weight: 700; color: #0000C8; letter-spacing: 2px; text-transform: uppercase; }
.sh-client { font-size: 7px; color: #888888; }

.header-band {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 20px;
  background: #0000C8;
  color: white;
}
.header-band-left { display: flex; align-items: center; gap: 12px; }
.hb-num { font-size: 11px; font-weight: 700; opacity: 0.5; }
.hb-cat { font-size: 10px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; }
.hb-pagenum { font-size: 48px; font-weight: 700; color: rgba(255,255,255,0.08); line-height: 1; }

/* ── İçerik alanı ── */
.page-content {
  flex: 1;
  padding: 20px 22px 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.section-title {
  font-size: 15px;
  font-weight: 700;
  color: #1A1A1A;
  letter-spacing: 0.5px;
}
.section-divider {
  height: 2px;
  background: linear-gradient(to right, #0000C8, #BE29EC, transparent);
  margin-top: 4px;
  margin-bottom: 4px;
}

/* ── Tablo ── */
table {
  width: 100%;
  border-collapse: collapse;
  font-size: 9px;
}
th {
  background: #1A1A1A;
  color: white;
  font-size: 7px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 7px 8px;
  text-align: left;
}
td {
  padding: 7px 8px;
  border-bottom: 1px solid #F0F0F0;
  color: #333333;
  font-size: 9px;
}
tr:nth-child(even) td { background: #FAFAFA; }

/* ── Badge ── */
.badge {
  display: inline-block;
  padding: 2px 7px;
  border-radius: 3px;
  font-size: 7px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}
.badge-red { background: #FDEDEB; color: #C0392B; }
.badge-yellow { background: #FDF4E3; color: #B7770D; }
.badge-green { background: #E8F5EE; color: #1A7A3F; }
.badge-blue { background: #EEF0FF; color: #0000C8; }

/* ── Metric row ── */
.metrics-row {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}
.score-circle {
  width: 68px;
  height: 68px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.score-val { font-size: 22px; font-weight: 700; color: white; line-height: 1; }
.score-sub { font-size: 8px; color: rgba(255,255,255,0.7); }
.metric-box {
  background: #F5F5F5;
  border-radius: 6px;
  padding: 10px 14px;
  min-width: 80px;
  text-align: center;
}
.metric-value { font-size: 18px; font-weight: 700; }
.metric-label { font-size: 7px; color: #888888; text-transform: uppercase; letter-spacing: 1px; margin-top: 2px; }

/* ── Bulgular ── */
.findings-section { display: flex; flex-direction: column; gap: 4px; }
.findings-label {
  font-size: 7px;
  font-weight: 700;
  color: #888888;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 4px;
}
.list-row { display: flex; gap: 8px; align-items: flex-start; margin-bottom: 3px; }
.list-text { font-size: 9px; color: #444444; line-height: 1.4; }

/* ── Gain box ── */
.gain-box {
  border-radius: 6px;
  padding: 12px 16px;
  margin-top: auto;
}
.gain-label { font-size: 7px; font-weight: 700; color: rgba(255,255,255,0.6); letter-spacing: 2px; text-transform: uppercase; margin-bottom: 4px; }
.gain-text { font-size: 10px; color: white; line-height: 1.5; }

/* ── Footer ── */
.page-footer {
  display: flex;
  background: #111111;
  padding: 10px 20px;
  gap: 12px;
  flex-shrink: 0;
}
.footer-col { flex: 1; display: flex; flex-direction: column; gap: 2px; }
.footer-center { text-align: center; align-items: center; }
.footer-right { text-align: right; align-items: flex-end; }
.footer-text { font-size: 7px; color: rgba(255,255,255,0.35); }
.footer-accent { font-size: 7px; color: rgba(190,41,236,0.7); font-weight: 700; }

/* ── Risk matrix ── */
.risk-row {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  padding: 10px 12px;
  border-left: 3px solid #C0392B;
  background: #FAFAFA;
  border-radius: 0 4px 4px 0;
}
.risk-issue { font-size: 10px; font-weight: 700; color: #1A1A1A; flex: 1; }
.risk-detail { font-size: 8px; color: #666666; flex: 1; }
.risk-loss { font-size: 9px; font-weight: 700; color: #C0392B; flex: 1; text-align: right; }

/* ── İki kolon layout ── */
.two-col { display: flex; gap: 20px; }
.two-col > * { flex: 1; }

/* ── Package table ── */
.pkg-table { display: flex; gap: 12px; }
.pkg-col {
  flex: 1;
  border: 1px solid #E5E5E5;
  border-radius: 6px;
  overflow: hidden;
}
.pkg-head {
  padding: 12px;
  text-align: center;
}
.pkg-name { font-size: 10px; font-weight: 700; color: white; text-transform: uppercase; letter-spacing: 1px; }
.pkg-price { font-size: 18px; font-weight: 700; color: white; margin-top: 4px; }
.pkg-period { font-size: 8px; color: rgba(255,255,255,0.6); }
.pkg-body { padding: 12px; }
.pkg-item { display: flex; gap: 6px; align-items: flex-start; margin-bottom: 6px; font-size: 8px; color: #444444; }
.pkg-check { color: #27AE60; font-size: 9px; flex-shrink: 0; }

/* ── Timeline ── */
.timeline-row {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 10px 0;
  border-bottom: 1px solid #F0F0F0;
}
.tl-num {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #0000C8;
  color: white;
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.tl-content { flex: 1; }
.tl-title { font-size: 10px; font-weight: 700; color: #1A1A1A; }
.tl-desc { font-size: 8px; color: #666666; margin-top: 3px; line-height: 1.4; }
.tl-period { font-size: 8px; font-weight: 700; color: #0000C8; white-space: nowrap; }

/* ── CTA sayfası ── */
.cover-page {
  width: 210mm;
  min-height: 297mm;
  display: flex;
  page-break-after: always;
}
.cover-sidebar {
  width: 14px;
  flex-shrink: 0;
  background: linear-gradient(to bottom, #BE29EC, #0000C8);
}
.cover-body {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.cover-top {
  background: linear-gradient(135deg, #050510 0%, #0a0030 60%, #1a0040 100%);
  padding: 48px 36px 40px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.cover-bottom {
  background: #111111;
  padding: 20px 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media print {
  .page { page-break-after: always; }
}
`;

  /* ══════════════════════
     SAYFA 1 — KAPAK
  ══════════════════════ */
  const page1 = `
<div class="cover-page">
  <div class="cover-sidebar"></div>
  <div class="cover-body">
    <div class="cover-top">
      <!-- Logo alanı -->
      <div>
        <div style="font-size:11px;font-weight:700;color:rgba(255,255,255,0.4);letter-spacing:4px;text-transform:uppercase;margin-bottom:6px;">PREMIUM DIJITAL</div>
        <div style="height:2px;width:48px;background:linear-gradient(to right,#BE29EC,#0000C8);margin-bottom:48px;"></div>
      </div>

      <!-- Ana başlık -->
      <div>
        <div style="font-size:9px;font-weight:700;color:rgba(190,41,236,0.8);letter-spacing:4px;text-transform:uppercase;margin-bottom:14px;">DIJITAL ANALIZ RAPORU</div>
        <div style="font-size:36px;font-weight:700;color:white;line-height:1.15;margin-bottom:8px;">${data.clientName}</div>
        <div style="font-size:14px;color:rgba(255,255,255,0.5);margin-bottom:32px;">${data.clientUrl}</div>
        <div style="display:flex;gap:24px;align-items:center;">
          <div style="text-align:center;">
            <div style="font-size:52px;font-weight:700;color:${overallColor};line-height:1;">${data.overallScore}</div>
            <div style="font-size:8px;color:rgba(255,255,255,0.4);letter-spacing:2px;text-transform:uppercase;margin-top:2px;">GENEL SKOR</div>
          </div>
          <div style="width:1px;height:60px;background:rgba(255,255,255,0.1);"></div>
          <div>
            <div style="font-size:14px;font-weight:700;color:${overallColor};margin-bottom:4px;">${data.scoreLabel}</div>
            <div style="font-size:9px;color:rgba(255,255,255,0.4);">${data.sector} — ${data.segment}</div>
            <div style="font-size:9px;color:rgba(255,255,255,0.3);margin-top:4px;">${data.reportDate}</div>
          </div>
        </div>
      </div>

      <!-- Alt bilgi -->
      <div>
        <div style="display:flex;gap:32px;">
          <div>
            <div style="font-size:7px;color:rgba(255,255,255,0.3);letter-spacing:2px;text-transform:uppercase;margin-bottom:3px;">HAZIRLAYAN</div>
            <div style="font-size:9px;color:rgba(255,255,255,0.7);">${data.preparedBy}</div>
          </div>
          <div>
            <div style="font-size:7px;color:rgba(255,255,255,0.3);letter-spacing:2px;text-transform:uppercase;margin-bottom:3px;">RAPOR NO</div>
            <div style="font-size:9px;color:rgba(255,255,255,0.7);">${data.reportId}</div>
          </div>
          <div>
            <div style="font-size:7px;color:rgba(255,255,255,0.3);letter-spacing:2px;text-transform:uppercase;margin-bottom:3px;">SAYFA SAYISI</div>
            <div style="font-size:9px;color:rgba(255,255,255,0.7);">12</div>
          </div>
        </div>
        <div style="margin-top:20px;font-size:8px;color:rgba(255,255,255,0.2);line-height:1.6;">
          Bu rapor yalnizca ${data.clientName} yetkilileri icin hazirlanmistir. Icerik gizlidir ve ucuncu kisilerle paylasilamaz.
        </div>
      </div>
    </div>

    <div class="cover-bottom">
      <div>
        <div style="font-size:8px;color:rgba(255,255,255,0.5);font-weight:700;">0 212 982 57 24</div>
        <div style="font-size:7px;color:rgba(255,255,255,0.25);">info@premiumdijital.com</div>
      </div>
      <div style="text-align:center;">
        <div style="font-size:7px;color:rgba(255,255,255,0.2);">Ziya Gokalp Mah. Mall Of Istanbul The Office No:7E D:136</div>
        <div style="font-size:7px;color:rgba(255,255,255,0.2);">34490 Basaksehir / Istanbul</div>
      </div>
      <div style="text-align:right;">
        <div style="font-size:8px;font-weight:700;color:rgba(190,41,236,0.7);">@premiumdijital</div>
        <div style="font-size:7px;color:rgba(255,255,255,0.25);">premiumdijital.com</div>
      </div>
    </div>
  </div>
</div>`;

  /* ══════════════════════
     SAYFA 2 — YÖNETİCİ ÖZETİ + RİSK MATRİSİ
  ══════════════════════ */
  const page2 = `
<div class="page">
  <div class="sidebar"><div class="sidebar-label">OZET</div></div>
  <div class="page-inner">
    ${pageHeaderBand("02", "YÖNETİCİ ÖZETİ", data.clientName)}
    <div class="page-content">
      <div class="section-title">Yönetici Özeti</div>
      <div class="section-divider"></div>

      <!-- Özet metin -->
      <div style="font-size:10px;color:#444444;line-height:1.7;padding:14px 16px;background:#F8F8F8;border-radius:6px;border-left:3px solid #0000C8;">
        ${data.executiveSummary}
      </div>

      ${data.ga4Data ? `
      <div style="margin-top:12px;padding:14px 18px;background:#F0F4FF;border-left:3px solid #0000C8;border-radius:4px;">
        <div style="font-size:8px;font-weight:800;color:#0000C8;letter-spacing:2px;text-transform:uppercase;margin-bottom:10px;">SİTE TRAFİĞİ — SON 30 GÜN</div>
        <div style="display:flex;gap:28px;">
          <div>
            <div style="font-size:18px;font-weight:800;color:#1A1A1A;">${data.ga4Data.sessions.toLocaleString("tr-TR")}</div>
            <div style="font-size:8px;color:#888;text-transform:uppercase;letter-spacing:1px;margin-top:2px;">Oturum</div>
          </div>
          <div>
            <div style="font-size:18px;font-weight:800;color:#1A1A1A;">%${data.ga4Data.bounceRate.toFixed(1)}</div>
            <div style="font-size:8px;color:#888;text-transform:uppercase;letter-spacing:1px;margin-top:2px;">Hemen Çıkma</div>
          </div>
          <div>
            <div style="font-size:18px;font-weight:800;color:#1A1A1A;">${Math.floor(data.ga4Data.avgSessionDuration / 60)}dk ${Math.round(data.ga4Data.avgSessionDuration % 60)}sn</div>
            <div style="font-size:8px;color:#888;text-transform:uppercase;letter-spacing:1px;margin-top:2px;">Ort. Oturum Süresi</div>
          </div>
        </div>
      </div>` : ""}

      ${data.searchConsoleData ? `
      <div style="margin-top:10px;padding:14px 18px;background:#F0FFF4;border-left:3px solid #27AE60;border-radius:4px;">
        <div style="font-size:8px;font-weight:800;color:#27AE60;letter-spacing:2px;text-transform:uppercase;margin-bottom:10px;">ORGANİK ARAMA — SON 90 GÜN</div>
        <div style="display:flex;gap:28px;margin-bottom:${data.searchConsoleData.topKeywords?.length ? "12px" : "0"};">
          <div>
            <div style="font-size:18px;font-weight:800;color:#1A1A1A;">${data.searchConsoleData.totalClicks.toLocaleString("tr-TR")}</div>
            <div style="font-size:8px;color:#888;text-transform:uppercase;letter-spacing:1px;margin-top:2px;">Tıklama</div>
          </div>
          <div>
            <div style="font-size:18px;font-weight:800;color:#1A1A1A;">${data.searchConsoleData.totalImpressions.toLocaleString("tr-TR")}</div>
            <div style="font-size:8px;color:#888;text-transform:uppercase;letter-spacing:1px;margin-top:2px;">Gösterim</div>
          </div>
          <div>
            <div style="font-size:18px;font-weight:800;color:#1A1A1A;">#${data.searchConsoleData.avgPosition.toFixed(1)}</div>
            <div style="font-size:8px;color:#888;text-transform:uppercase;letter-spacing:1px;margin-top:2px;">Ort. Pozisyon</div>
          </div>
        </div>
        ${data.searchConsoleData.topKeywords?.length > 0 ? `
        <div style="font-size:8px;font-weight:700;color:#555;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">Öne Çıkan Aramalar</div>
        ${data.searchConsoleData.topKeywords.slice(0, 4).map((kw) => `
        <div style="display:flex;justify-content:space-between;align-items:center;padding:4px 0;border-bottom:1px solid #D4EDDA;font-size:9px;">
          <span style="color:#333;font-weight:500;">${kw.keyword}</span>
          <span style="color:#888;">${kw.clicks} tıklama · pos. ${Math.round(kw.position)}</span>
        </div>`).join("")}` : ""}
      </div>` : ""}

      <!-- Kategori skor özeti -->
      <div style="display:flex;gap:10px;flex-wrap:wrap;">
        ${[
          { label: "SEO & Web", score: data.seo.score },
          { label: "PPC", score: data.ppc.score },
          { label: "Sosyal Medya", score: data.social.score },
          { label: "Operasyon", score: data.operations.score },
        ]
          .map(
            (c) => `
        <div style="flex:1;min-width:80px;background:#F5F5F5;border-radius:6px;padding:12px;text-align:center;border-top:3px solid ${scoreColor(c.score)};">
          <div style="font-size:22px;font-weight:700;color:${scoreColor(c.score)};">${c.score}</div>
          <div style="font-size:7px;color:#888888;text-transform:uppercase;letter-spacing:1px;margin-top:3px;">${c.label}</div>
        </div>`
          )
          .join("")}
      </div>

      <!-- Risk matrisi -->
      <div>
        <div class="findings-label" style="margin-bottom:8px;">KRİTİK RİSK MATRİSİ</div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          ${data.topIssues
            .map(
              (issue) => `
          <div class="risk-row">
            <div class="risk-issue">${issue.issue}</div>
            <div class="risk-detail">${issue.risk}</div>
            <div class="risk-loss">${issue.estimatedLoss}</div>
          </div>`
            )
            .join("")}
        </div>
      </div>

      ${gainBox(
        "Bu raporda tespit edilen kritik eksiklikler giderildiginde, mevcut reklam butcenizin verimliligi en az %40 artis gosterebilir.",
        "#1A1A1A"
      )}
    </div>
    ${pageFooter()}
  </div>
</div>`;

  /* ══════════════════════
     SAYFA 3 — SEKTÖR ANALİZİ
  ══════════════════════ */
  const compList = data.competitors ?? [];
  const page3 = `
<div class="page">
  <div class="sidebar"><div class="sidebar-label">SEKTOR</div></div>
  <div class="page-inner">
    ${pageHeaderBand("03", "SEKTÖR ANALİZİ", data.clientName)}
    <div class="page-content">
      <div class="section-title">Rekabet İstihbaratı</div>
      <div class="section-divider"></div>

      <table>
        <thead>
          <tr>
            <th>RAKİP ALAN ADI</th>
            <th>REKABETÇİLİK</th>
            <th style="text-align:center;">ÜCRETLİ ANAHTAR KELİME</th>
            <th style="text-align:right;">TAHMİNİ AYLIK HARCAMA</th>
            <th style="text-align:center;">ÖD. TRAFIK</th>
          </tr>
        </thead>
        <tbody>
          ${compList
            .map(
              (c) => `
          <tr>
            <td style="font-weight:700;">${c.domain}</td>
            <td><span class="badge badge-${c.competitionLevel === "high" ? "red" : c.competitionLevel === "medium" ? "yellow" : "green"}">${c.competitionLevel === "high" ? "YÜKSEK" : c.competitionLevel === "medium" ? "ORTA" : "DÜŞÜK"}</span></td>
            <td style="text-align:center;font-weight:700;">${c.paidKeywords}</td>
            <td style="text-align:right;font-weight:700;color:#C0392B;">${c.monthlySpend ?? "—"}</td>
            <td style="text-align:center;color:#666666;">${c.paidSearchTraffic ?? 0}K</td>
          </tr>`
            )
            .join("")}
        </tbody>
      </table>

      <div>
        <div class="findings-label" style="margin-bottom:8px;">KOMPETİTİF POZİSYON HARİTASI</div>
        ${competitorScatterSvg(data.competitors)}
      </div>

      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:4px;">
        <div style="display:flex;align-items:center;gap:5px;"><div style="width:10px;height:10px;border-radius:50%;background:#C0392B;"></div><span style="font-size:8px;color:#666;">Yuksek Rekabet</span></div>
        <div style="display:flex;align-items:center;gap:5px;"><div style="width:10px;height:10px;border-radius:50%;background:#E67E22;"></div><span style="font-size:8px;color:#666;">Orta Rekabet</span></div>
        <div style="display:flex;align-items:center;gap:5px;"><div style="width:10px;height:10px;border-radius:50%;background:#27AE60;"></div><span style="font-size:8px;color:#666;">Dusuk Rekabet</span></div>
        <div style="display:flex;align-items:center;gap:5px;"><div style="width:10px;height:10px;border-radius:50%;background:#0000C8;"></div><span style="font-size:8px;color:#0000C8;font-weight:700;">Siz</span></div>
      </div>
    </div>
    ${pageFooter()}
  </div>
</div>`;

  /* ══════════════════════
     SAYFA 4 — SEO & WEB MİMARİSİ
  ══════════════════════ */
  const page4 = `
<div class="page">
  <div class="sidebar"><div class="sidebar-label">SEO</div></div>
  <div class="page-inner">
    ${pageHeaderBand("04", "SEO & WEB MİMARİSİ", data.clientName)}
    <div class="page-content">
      <div class="section-title">SEO &amp; Web Mimarisi Analizi</div>
      <div class="section-divider"></div>

      <div class="metrics-row">
        <div class="score-circle" style="background:${scoreColor(data.seo.score)};">
          <div class="score-val">${data.seo.score}</div>
          <div class="score-sub">/ 100</div>
        </div>
        <div class="metric-box">
          <div class="metric-value" style="color:${scoreColor(data.seo.score)};">${(data.seo.pageSpeed / 1000).toFixed(1)}s</div>
          <div class="metric-label">SAYFA HIZI</div>
        </div>
        <div class="metric-box">
          <div class="metric-value" style="color:${scoreColor(data.seo.mobileScore)};">${data.seo.mobileScore}</div>
          <div class="metric-label">MOBİL SKOR</div>
        </div>
        <div class="metric-box">
          <div class="metric-value" style="color:#C0392B;">${data.seo.technicalErrors}</div>
          <div class="metric-label">TEKNİK HATA</div>
        </div>
      </div>

      <div class="two-col">
        <div class="findings-section">
          <div class="findings-label">TESPİT BULGULARI</div>
          ${analysisList(data.seo.findings, "#C0392B")}
        </div>
        <div class="findings-section">
          <div class="findings-label">ÖNERİLER</div>
          ${analysisList(data.seo.recommendations, "#0000C8")}
        </div>
      </div>

      ${gainBox(data.seo.gain)}
    </div>
    ${pageFooter()}
  </div>
</div>`;

  /* ══════════════════════
     SAYFA 5 — PPC & PERFORMANS (Bütçe + Keyword)
  ══════════════════════ */
  const scenarios = data.budgetScenarios ?? [];
  const keywords = data.sampleKeywords ?? [];
  const page5 = `
<div class="page">
  <div class="sidebar"><div class="sidebar-label">PPC</div></div>
  <div class="page-inner">
    ${pageHeaderBand("05", "PPC & PERFORMANS", data.clientName)}
    <div class="page-content">
      <div class="section-title">PPC &amp; Bütçe Senaryoları</div>
      <div class="section-divider"></div>

      <!-- Bütçe senaryoları -->
      <div style="display:flex;gap:14px;">
        ${scenarios
          .map(
            (s) => `
        <div style="flex:1;border:2px solid #0000C8;border-radius:8px;padding:14px;background:#FAFEFF;">
          <div style="font-size:8px;font-weight:700;color:#0000C8;letter-spacing:2px;text-transform:uppercase;margin-bottom:10px;">${s.label} PLAN</div>
          <div style="font-size:20px;font-weight:700;color:#1A1A1A;margin-bottom:2px;">${s.monthlyBudget}<span style="font-size:10px;color:#888;">/ay</span></div>
          <div style="font-size:8px;color:#888888;margin-bottom:14px;">Gunluk butce: ${s.dailyBudget}</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:7px;">
            <div style="background:#F5F5F5;border-radius:4px;padding:7px;text-align:center;">
              <div style="font-size:15px;font-weight:700;color:#0000C8;">${s.clicks}</div>
              <div style="font-size:7px;color:#888;text-transform:uppercase;letter-spacing:1px;">TIKLAMA</div>
            </div>
            <div style="background:#F5F5F5;border-radius:4px;padding:7px;text-align:center;">
              <div style="font-size:15px;font-weight:700;color:#0000C8;">${s.impressions}</div>
              <div style="font-size:7px;color:#888;text-transform:uppercase;letter-spacing:1px;">GÖSTERİM</div>
            </div>
            <div style="background:#F5F5F5;border-radius:4px;padding:7px;text-align:center;">
              <div style="font-size:15px;font-weight:700;color:#27AE60;">${s.ctr}</div>
              <div style="font-size:7px;color:#888;text-transform:uppercase;letter-spacing:1px;">TO</div>
            </div>
            <div style="background:#F5F5F5;border-radius:4px;padding:7px;text-align:center;">
              <div style="font-size:15px;font-weight:700;color:#E67E22;">${s.avgCpc}</div>
              <div style="font-size:7px;color:#888;text-transform:uppercase;letter-spacing:1px;">ORT. TBM</div>
            </div>
          </div>
        </div>`
          )
          .join("")}
      </div>

      <!-- Anahtar kelime tablosu -->
      <div>
        <div class="findings-label" style="margin-bottom:6px;">ÖRNEK ANAHTAR KELİME PLANI</div>
        <table>
          <thead>
            <tr>
              <th>ANAHTAR KELİME</th>
              <th>EŞLEME</th>
              <th style="text-align:center;">MAKS TBM</th>
              <th style="text-align:center;">TIKLAMA</th>
              <th style="text-align:center;">GÖSTERİM</th>
              <th style="text-align:right;">MALİYET</th>
              <th style="text-align:center;">TO</th>
            </tr>
          </thead>
          <tbody>
            ${keywords
              .map(
                (kw) => `
            <tr>
              <td style="font-weight:600;">${kw.keyword}</td>
              <td><span class="badge badge-blue">${kw.matchType}</span></td>
              <td style="text-align:center;">${kw.maxCpc}</td>
              <td style="text-align:center;font-weight:700;">${kw.clicks}</td>
              <td style="text-align:center;">${kw.impressions.toLocaleString("tr-TR")}</td>
              <td style="text-align:right;font-weight:700;color:#C0392B;">${kw.cost}</td>
              <td style="text-align:center;color:#27AE60;font-weight:700;">${kw.ctr}</td>
            </tr>`
              )
              .join("")}
          </tbody>
        </table>
      </div>
    </div>
    ${pageFooter()}
  </div>
</div>`;

  /* ══════════════════════
     SAYFA 6 — COĞRAFİ HEDEFLEME + PPC DEVAM
  ══════════════════════ */
  const geoTargets = data.geoTargets ?? [];
  const page6 = `
<div class="page">
  <div class="sidebar"><div class="sidebar-label">PPC</div></div>
  <div class="page-inner">
    ${pageHeaderBand("06", "COĞRAFİ HEDEFLEME", data.clientName)}
    <div class="page-content">
      <div class="section-title">Coğrafi Hedefleme &amp; Pazar Analizi</div>
      <div class="section-divider"></div>

      <div style="display:flex;gap:28px;align-items:flex-start;">
        ${geoDonutSvg(data.geoTargets)}
        <div style="flex:1;display:flex;flex-direction:column;gap:8px;padding-top:10px;">
          <div class="findings-label" style="margin-bottom:4px;">HEDEF PAZAR DAĞILIMI</div>
          ${geoTargets
            .map(
              (t) => `
          <div style="display:flex;align-items:center;gap:10px;">
            <div style="width:10px;height:10px;border-radius:2px;background:${t.color};flex-shrink:0;"></div>
            <div style="flex:1;font-size:9px;color:#444444;">${t.country}</div>
            <div style="width:80px;background:#F0F0F0;border-radius:2px;height:6px;overflow:hidden;flex-shrink:0;">
              <div style="width:${t.percentage}%;height:100%;background:${t.color};"></div>
            </div>
            <div style="font-size:11px;font-weight:700;color:#1A1A1A;min-width:30px;text-align:right;">%${t.percentage}</div>
          </div>`
            )
            .join("")}
        </div>
      </div>

      <!-- PPC bulgular devam -->
      <div class="two-col">
        <div class="findings-section">
          <div class="findings-label">TESPİT BULGULARI</div>
          ${analysisList(data.ppc.findings, "#C0392B")}
        </div>
        <div class="findings-section">
          <div class="findings-label">ÖNERİLER</div>
          ${analysisList(data.ppc.recommendations, "#0000C8")}
        </div>
      </div>

      <div style="display:flex;gap:12px;align-items:center;">
        <div class="metric-box" style="text-align:center;">
          <div class="metric-value" style="color:${scoreColor(data.ppc.score)};">${data.ppc.score}</div>
          <div class="metric-label">PPC SKOR</div>
        </div>
        <div class="metric-box">
          <div class="metric-value" style="color:#C0392B;">${data.ppc.qualityScore}/10</div>
          <div class="metric-label">KALİTE SKORU</div>
        </div>
        <div class="metric-box">
          <div class="metric-value" style="font-size:12px;color:#E67E22;">${data.ppc.competitorSpend}</div>
          <div class="metric-label">RAKİP HARCAMASI</div>
        </div>
      </div>

      ${gainBox(data.ppc.gain, "#BE29EC")}
    </div>
    ${pageFooter()}
  </div>
</div>`;

  /* ══════════════════════
     SAYFA 7 — SOSYAL MEDYA
  ══════════════════════ */
  const page7 = `
<div class="page">
  <div class="sidebar"><div class="sidebar-label">SOSYAL</div></div>
  <div class="page-inner">
    ${pageHeaderBand("07", "SOSYAL MEDYA & İÇERİK", data.clientName)}
    <div class="page-content">
      <div class="section-title">Sosyal Medya &amp; İçerik Analizi</div>
      <div class="section-divider"></div>

      <div class="metrics-row">
        <div class="score-circle" style="background:${scoreColor(data.social.score)};">
          <div class="score-val">${data.social.score}</div>
          <div class="score-sub">/ 100</div>
        </div>
        <div class="metric-box">
          <div class="metric-value" style="color:${scoreColor(data.social.score)};">${data.social.engagementRate}</div>
          <div class="metric-label">ETKİLEŞİM ORANI</div>
        </div>
        <div class="metric-box">
          <div class="metric-value" style="color:${scoreColor(data.social.consistencyScore)};">${data.social.consistencyScore}</div>
          <div class="metric-label">TUTARLILIK SKORU</div>
        </div>
      </div>

      <!-- Platform karşılaştırma simülasyonu -->
      <div>
        <div class="findings-label" style="margin-bottom:8px;">PLATFORM PERFORMANS KARŞILAŞTIRMASI</div>
        <div style="display:flex;gap:10px;">
          ${[
            { platform: "Instagram", score: Math.round(data.social.score * 1.1), icon: "IG" },
            { platform: "LinkedIn", score: Math.round(data.social.score * 0.9), icon: "LN" },
            { platform: "Facebook", score: Math.round(data.social.score * 0.85), icon: "FB" },
            { platform: "X / Twitter", score: Math.round(data.social.score * 0.7), icon: "X" },
          ]
            .map(
              (p) => `
          <div style="flex:1;background:#F8F8F8;border-radius:6px;padding:10px;text-align:center;">
            <div style="font-size:10px;font-weight:700;color:#1A1A1A;margin-bottom:4px;">${p.icon}</div>
            <div style="font-size:16px;font-weight:700;color:${scoreColor(Math.min(p.score, 100))};">${Math.min(p.score, 100)}</div>
            <div style="font-size:7px;color:#888;margin-top:3px;">${p.platform}</div>
          </div>`
            )
            .join("")}
        </div>
      </div>

      <div class="two-col">
        <div class="findings-section">
          <div class="findings-label">TESPİT BULGULARI</div>
          ${analysisList(data.social.findings, "#C0392B")}
        </div>
        <div class="findings-section">
          <div class="findings-label">ÖNERİLER</div>
          ${analysisList(data.social.recommendations, "#0000C8")}
        </div>
      </div>

      ${gainBox(data.social.gain, "#0000C8")}
    </div>
    ${pageFooter()}
  </div>
</div>`;

  /* ══════════════════════
     SAYFA 8 — DİJİTAL OPERASYON
  ══════════════════════ */
  const page8 = `
<div class="page">
  <div class="sidebar"><div class="sidebar-label">OPER.</div></div>
  <div class="page-inner">
    ${pageHeaderBand("08", "DİJİTAL OPERASYON", data.clientName)}
    <div class="page-content">
      <div class="section-title">Dijital Operasyon &amp; Otomasyon</div>
      <div class="section-divider"></div>

      <div class="metrics-row">
        <div class="score-circle" style="background:${scoreColor(data.operations.score)};">
          <div class="score-val">${data.operations.score}</div>
          <div class="score-sub">/ 100</div>
        </div>
        <div style="flex:1;">
          <div class="findings-label" style="margin-bottom:8px;">MEVCUT TECH STACK</div>
          <div style="display:flex;flex-wrap:wrap;gap:6px;">
            ${data.operations.techStack
              .map(
                (t) => `<span style="background:#EEF0FF;color:#0000C8;padding:4px 10px;border-radius:12px;font-size:8px;font-weight:700;">${t}</span>`
              )
              .join("")}
          </div>
        </div>
      </div>

      <!-- Otomasyon gap analizi -->
      <div>
        <div class="findings-label" style="margin-bottom:8px;">OTOMASYON BOŞLUK ANALİZİ</div>
        <div style="display:flex;flex-direction:column;gap:6px;">
          ${data.operations.automationGaps
            .map(
              (g) => `
          <div style="display:flex;align-items:center;gap:10px;padding:8px 12px;background:#FDEDEB;border-radius:4px;border-left:3px solid #C0392B;">
            <span style="font-size:9px;color:#888;font-weight:700;flex-shrink:0;">GAP</span>
            <span style="font-size:9px;color:#1A1A1A;">${g}</span>
            <span style="margin-left:auto;font-size:8px;font-weight:700;color:#C0392B;flex-shrink:0;">EKSİK</span>
          </div>`
            )
            .join("")}
        </div>
      </div>

      <div class="two-col">
        <div class="findings-section">
          <div class="findings-label">TESPİT BULGULARI</div>
          ${analysisList(data.operations.findings, "#C0392B")}
        </div>
        <div class="findings-section">
          <div class="findings-label">ÖNERİLER</div>
          ${analysisList(data.operations.recommendations, "#0000C8")}
        </div>
      </div>

      ${gainBox(data.operations.gain, "#1A1A1A")}
    </div>
    ${pageFooter()}
  </div>
</div>`;

  /* ══════════════════════
     SAYFA 9 — KATEGORİ SKORU KARŞILAŞTIRMASI
  ══════════════════════ */
  const catScores = [
    { label: "SEO & Web", score: data.seo.score, sectorAvg: 58 },
    { label: "PPC", score: data.ppc.score, sectorAvg: 52 },
    { label: "Sosyal Medya", score: data.social.score, sectorAvg: 61 },
    { label: "Operasyon", score: data.operations.score, sectorAvg: 47 },
    { label: "Genel", score: data.overallScore, sectorAvg: 55 },
  ];
  const page9 = `
<div class="page">
  <div class="sidebar"><div class="sidebar-label">ANALIZ</div></div>
  <div class="page-inner">
    ${pageHeaderBand("09", "KATEGORİ ANALİZİ", data.clientName)}
    <div class="page-content">
      <div class="section-title">Kategori Skorları &amp; Sektör Karşılaştırması</div>
      <div class="section-divider"></div>

      ${categoryBarSvg(catScores)}

      <!-- Sektör ortalamaları açıklaması -->
      <div style="background:#F8F8F8;border-radius:6px;padding:14px 16px;margin-top:4px;">
        <div class="findings-label" style="margin-bottom:10px;">SEKTÖR KARŞILAŞTIRMASI — ${data.sector.toUpperCase()}</div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;">
          ${catScores
            .map((c) => {
              const diff = c.score - c.sectorAvg;
              const diffColor = diff >= 0 ? "#27AE60" : "#C0392B";
              const diffSign = diff >= 0 ? "+" : "";
              return `
          <div style="flex:1;min-width:80px;text-align:center;padding:10px 8px;background:white;border-radius:4px;border:1px solid #EEEEEE;">
            <div style="font-size:8px;color:#888;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">${c.label}</div>
            <div style="font-size:18px;font-weight:700;color:${scoreColor(c.score)};">${c.score}</div>
            <div style="font-size:8px;font-weight:700;color:${diffColor};margin-top:2px;">${diffSign}${diff} ort.'a göre</div>
          </div>`;
            })
            .join("")}
        </div>
      </div>

      <div style="padding:12px 16px;background:#EEF0FF;border-radius:6px;border-left:3px solid #0000C8;">
        <div class="findings-label" style="margin-bottom:4px;">ÖZET DEĞERLENDİRME</div>
        <div style="font-size:9px;color:#444444;line-height:1.6;">
          ${data.clientName} olarak genel dijital skorunuz <strong style="color:${overallColor};">${data.overallScore}/100</strong> ile sektör ortalamasinin (55)
          ${data.overallScore >= 55 ? "üzerindedir" : "altindadir"}.
          En kritik iyilestirme alanlari: <strong>${catScores.sort((a, b) => a.score - b.score).slice(0, 2).map((c) => c.label).join(" ve ")}</strong>.
        </div>
      </div>
    </div>
    ${pageFooter()}
  </div>
</div>`;

  /* ══════════════════════
     SAYFA 10 — HİZMET KAPSAMI & PAKETLER
  ══════════════════════ */
  const packages = [
    {
      name: "Başlangıç",
      price: "₺35.000",
      color: "#1A1A1A",
      items: [
        "SEO Teknik Audit ve Düzeltme",
        "Google Ads Kurulum (1 kampanya)",
        "Aylık Performans Raporu",
        "E-posta Destek",
        "3 Aylık Taahhüt",
      ],
    },
    {
      name: "Büyüme",
      price: "₺55.000",
      color: "#0000C8",
      items: [
        "Tüm Başlangıç Paketi Dahil",
        "Google + Meta Ads Yönetimi",
        "Sosyal Medya İçerik (8 içerik/ay)",
        "CRM Kurulumu ve Entegrasyonu",
        "Haftalık Strateji Görüşmesi",
        "6 Aylık Taahhüt",
      ],
    },
    {
      name: "Sistem",
      price: "₺85.000",
      color: "#BE29EC",
      items: [
        "Tüm Büyüme Paketi Dahil",
        "Tam Dijital Operasyon Kurulumu",
        "Özel Landing Page Tasarımı",
        "Otomasyon ve WhatsApp API",
        "Dedike Hesap Yöneticisi",
        "Aylık Yönetici Sunumu",
        "12 Aylık Taahhüt",
      ],
    },
  ];
  const page10 = `
<div class="page">
  <div class="sidebar"><div class="sidebar-label">PAKET</div></div>
  <div class="page-inner">
    ${pageHeaderBand("10", "HİZMET KAPSAMI", data.clientName)}
    <div class="page-content">
      <div class="section-title">Hizmet Paketleri</div>
      <div class="section-divider"></div>

      <div class="pkg-table">
        ${packages
          .map(
            (pkg) => `
        <div class="pkg-col">
          <div class="pkg-head" style="background:${pkg.color};">
            <div class="pkg-name">${pkg.name}</div>
            <div class="pkg-price">${pkg.price}<span style="font-size:10px;opacity:0.6;">/ay</span></div>
          </div>
          <div class="pkg-body">
            ${pkg.items
              .map(
                (item) => `
            <div class="pkg-item">
              <span class="pkg-check">&#10003;</span>
              <span>${item}</span>
            </div>`
              )
              .join("")}
          </div>
        </div>`
          )
          .join("")}
      </div>

      <!-- Neden Premium Dijital? -->
      <div style="background:#F8F8F8;border-radius:6px;padding:14px 16px;">
        <div class="findings-label" style="margin-bottom:8px;">NEDEN PREMIUM DİJİTAL?</div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;">
          ${[
            { title: "Veri Odaklı", desc: "Her karar veriye dayanir, tahmine degil" },
            { title: "Sektör Uzmanlığı", desc: "Saglik ve turizm sektorlerinde derin bilgi" },
            { title: "Şeffaf Raporlama", desc: "Haftalik ve aylik detayli performans raporlari" },
            { title: "Tam Sistem", desc: "Sadece reklam degil, butun dijital sistemini kuruyoruz" },
          ]
            .map(
              (f) => `
          <div style="flex:1;min-width:120px;padding:10px;background:white;border-radius:4px;border-top:2px solid #0000C8;">
            <div style="font-size:9px;font-weight:700;color:#1A1A1A;margin-bottom:3px;">${f.title}</div>
            <div style="font-size:8px;color:#666666;line-height:1.4;">${f.desc}</div>
          </div>`
            )
            .join("")}
        </div>
      </div>

      <div style="padding:10px 14px;background:#1A1A1A;border-radius:6px;text-align:center;">
        <div style="font-size:9px;color:rgba(255,255,255,0.5);margin-bottom:4px;">Tavsiye Edilen Paket</div>
        <div style="font-size:13px;font-weight:700;color:white;">Mevcut durumunuza gore <span style="color:#BE29EC;">Buyume Paketi</span> onerilir</div>
      </div>

      ${proAnalysisCta(data)}
    </div>
    ${pageFooter()}
  </div>
</div>`;

  /* ══════════════════════
     SAYFA 11 — SÜREÇ & ZAMAN ÇİZELGESİ
  ══════════════════════ */
  const timeline = [
    { num: "1", title: "Onboarding ve Sistem Kurulumu", desc: "Hesap erişimleri, pixel kurulumları, Analytics yapılandırması, takip altyapısı kurulumu.", period: "Hafta 1" },
    { num: "2", title: "Audit ve Strateji Belgesi", desc: "SEO teknik audit, reklam hesabı analizi, rakip araştırması, içerik strateji belgesi.", period: "Hafta 2" },
    { num: "3", title: "İlk Kampanya Lansmanı", desc: "Google Ads ve Meta kampanyaları yayına alınır, A/B test grupları oluşturulur.", period: "Hafta 3-4" },
    { num: "4", title: "Optimizasyon Döngüsü", desc: "İlk 30 günlük veri analizi, teklif optimizasyonu, negatif kelime güncellemesi.", period: "Ay 2" },
    { num: "5", title: "Büyüme Aksiyonları", desc: "Performans verisine göre bütçe dağılımı optimize edilir, yeni reklam grupları eklenir.", period: "Ay 3" },
    { num: "6", title: "Yönetici Değerlendirme Sunumu", desc: "90 günlük kapsamlı performans sunumu, sonraki dönem stratejisi, hedef revizyonu.", period: "Ay 3 sonu" },
  ];
  const page11 = `
<div class="page">
  <div class="sidebar"><div class="sidebar-label">SUREC</div></div>
  <div class="page-inner">
    ${pageHeaderBand("11", "SÜREÇ & ZAMANÇİZELGESİ", data.clientName)}
    <div class="page-content">
      <div class="section-title">Çalışma Süreci &amp; Zaman Çizelgesi</div>
      <div class="section-divider"></div>

      <div style="display:flex;flex-direction:column;gap:0;">
        ${timeline
          .map(
            (step) => `
        <div class="timeline-row">
          <div class="tl-num">${step.num}</div>
          <div class="tl-content">
            <div class="tl-title">${step.title}</div>
            <div class="tl-desc">${step.desc}</div>
          </div>
          <div class="tl-period">${step.period}</div>
        </div>`
          )
          .join("")}
      </div>

      <!-- Çalışma modeli -->
      <div style="background:#F8F8F8;border-radius:6px;padding:14px 16px;">
        <div class="findings-label" style="margin-bottom:8px;">ÇALIŞMA MODELİ</div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;">
          ${[
            { title: "Haftalık Rapor", desc: "Her Pazartesi e-posta ile" },
            { title: "Aylık Sunum", desc: "Google Meet - 60 dk" },
            { title: "Anlık Bildirim", desc: "WhatsApp ile kritik gelismeler" },
            { title: "Dashboard", desc: "7/24 canli Looker Studio" },
          ]
            .map(
              (m) => `
          <div style="flex:1;min-width:100px;padding:8px 10px;background:white;border-radius:4px;border-left:2px solid #0000C8;">
            <div style="font-size:8px;font-weight:700;color:#1A1A1A;margin-bottom:2px;">${m.title}</div>
            <div style="font-size:7px;color:#888888;">${m.desc}</div>
          </div>`
            )
            .join("")}
        </div>
      </div>
    </div>
    ${pageFooter()}
  </div>
</div>`;

  /* ══════════════════════
     SAYFA 12 — CTA & İLETİŞİM
  ══════════════════════ */
  const page12 = `
<div class="page">
  <div class="sidebar" style="background:linear-gradient(to bottom,#BE29EC,#0000C8);"></div>
  <div class="page-inner">
    ${pageHeaderBand("12", "İLETİŞİM", data.clientName)}
    <div class="page-content" style="justify-content:center;align-items:center;text-align:center;gap:20px;">

      <div style="max-width:400px;">
        <div style="font-size:9px;font-weight:700;color:#BE29EC;letter-spacing:3px;text-transform:uppercase;margin-bottom:12px;">SONRAKI ADIM</div>
        <div style="font-size:24px;font-weight:700;color:#1A1A1A;line-height:1.3;margin-bottom:14px;">Dijital sisteminizi birlikte kuralım.</div>
        <div style="font-size:10px;color:#666666;line-height:1.7;">
          Bu raporun bulgularini sizinle detayli ele almak icin 30 dakikalik ucretsiz bir stateji gorusmesi ayarlayalim.
          Ihtiyaciniza en uygun paketi birlikte belirleyelim.
        </div>
      </div>

      <!-- CTA kartı -->
      <div style="background:linear-gradient(135deg,#050510,#0a0030);border-radius:12px;padding:28px 36px;width:100%;max-width:380px;">
        <div style="font-size:8px;font-weight:700;color:rgba(255,255,255,0.4);letter-spacing:3px;text-transform:uppercase;margin-bottom:16px;">İLETİŞİM</div>
        <div style="display:flex;flex-direction:column;gap:12px;">
          <div style="display:flex;gap:12px;align-items:center;">
            <div style="width:32px;height:32px;background:rgba(255,255,255,0.08);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0;">&#128222;</div>
            <div style="text-align:left;">
              <div style="font-size:7px;color:rgba(255,255,255,0.3);margin-bottom:1px;">TELEFON</div>
              <div style="font-size:12px;font-weight:700;color:white;">0 212 982 57 24</div>
            </div>
          </div>
          <div style="display:flex;gap:12px;align-items:center;">
            <div style="width:32px;height:32px;background:rgba(255,255,255,0.08);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0;">&#9993;</div>
            <div style="text-align:left;">
              <div style="font-size:7px;color:rgba(255,255,255,0.3);margin-bottom:1px;">E-POSTA</div>
              <div style="font-size:11px;font-weight:700;color:white;">info@premiumdijital.com</div>
            </div>
          </div>
          <div style="display:flex;gap:12px;align-items:center;">
            <div style="width:32px;height:32px;background:rgba(255,255,255,0.08);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0;">&#127759;</div>
            <div style="text-align:left;">
              <div style="font-size:7px;color:rgba(255,255,255,0.3);margin-bottom:1px;">WEB</div>
              <div style="font-size:11px;font-weight:700;color:white;">premiumdijital.com</div>
            </div>
          </div>
        </div>
        <div style="margin-top:20px;padding:10px;background:rgba(190,41,236,0.15);border-radius:6px;border:1px solid rgba(190,41,236,0.3);">
          <div style="font-size:9px;font-weight:700;color:#BE29EC;margin-bottom:2px;">Ucretsiz Strateji Gorusmesi</div>
          <div style="font-size:8px;color:rgba(255,255,255,0.5);">premiumdijital.com/ucretsiz-analiz adresinden randevu alin</div>
        </div>
      </div>

      <div style="font-size:8px;color:#AAAAAA;max-width:360px;line-height:1.6;">
        Bu rapor Premium Dijital Reklam Ajansi tarafindan hazirlanmistir ve yalnizca ${data.clientName} icin gecerlidir.
        Rapor tarihi: ${data.reportDate} · Rapor No: ${data.reportId}
      </div>
    </div>
    ${pageFooter()}
  </div>
</div>`;

  return `<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>${css}</style>
</head>
<body>
${page1}
${page2}
${page3}
${page4}
${page5}
${page6}
${page7}
${page8}
${page9}
${page10}
${page11}
${page12}
</body>
</html>`;
}
