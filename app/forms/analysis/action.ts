"use server";

import { resend, emailShell, escapeHtml, row, badge } from "@/app/forms/_shared/resend-client";
import { checkCommonGuards } from "@/app/forms/_shared/guards";
import { addToAudience } from "@/app/forms/_shared/audience";
import { DetailedFormSchema, QuickFormSchema } from "./schema";
import {
  fetchGA4Properties,
  fetchGA4Metrics,
  fetchSearchConsoleData,
} from "@/lib/oauth/google";
import { cookies } from "next/headers";
import type { AnalysisData } from "@/types/analysis";

/* ─────────────────────────────────────────────────────────────────────────────
   LABEL MAPS
   ───────────────────────────────────────────────────────────────────────────── */

const SERVICE_LABELS: Record<string, string> = {
  ADS: "Reklam & Performans",
  WEB: "Web Sitesi & SEO",
  BRAND: "Marka & Kurumsal Kimlik",
  SOCIAL: "Sosyal Medya Yönetimi",
  OPS: "Dijital Operasyon",
};

const SECTOR_LABELS: Record<string, string> = {
  HEALTH: "Sağlık & Klinik",
  TOURISM: "Turizm & Konaklama",
  ECOMM: "E-Ticaret",
  SERVICE: "Hizmet & Danışmanlık",
  BEAUTY: "Estetik & Güzellik",
  OTHER: "Diğer",
};

const OPS_LABELS: Record<string, string> = {
  VISIBILITY: "Veri görünürlüğü",
  SALES_SYS: "Otonom satış sistemi",
  BRAND_MEM: "Kurumsal hafıza",
  OPS_EFF: "Operasyonel verimlilik",
  SCALE: "Ölçeklenebilir büyüme",
};

const ACCESS_LABELS: Record<string, string> = {
  google_ads: "Google Ads",
  ga4: "GA4",
  search_console: "Search Console",
  meta_ads: "Meta Ads",
};

/* ─────────────────────────────────────────────────────────────────────────────
   YARDIMCI — Minimal AnalysisData (form verisinden + sabit defaults)
   ───────────────────────────────────────────────────────────────────────────── */

function buildMinimalAnalysisData(
  d: {
    fullName: string;
    company?: string;
    website?: string;
    sector: string;
    serviceArea: string;
    budget?: string;
    adAccess?: string[];
    socialPlatforms?: string[];
    socialHandles?: string;
  },
  sectorLabel: string,
  serviceLabel: string,
): AnalysisData {
  const reportId = `${new Date().getFullYear()}/ANALIZ-${Date.now().toString().slice(-4)}`;
  const reportDate = new Date().toLocaleDateString("tr-TR");

  return {
    reportId,
    reportDate,
    preparedBy: "Premium Dijital",
    clientName: d.company || d.fullName,
    clientUrl: d.website || "",
    sector: sectorLabel,
    segment: serviceLabel,
    budget: d.budget || "",
    adAccess: d.adAccess || [],
    socialPlatforms: d.socialPlatforms || [],
    socialHandles: d.socialHandles || "",
    overallScore: 0,
    scoreLabel: "Başvuru Alındı",
    executiveSummary:
      "Başvurunuz alınmıştır. Ekibimiz en kısa sürede detaylı analizi tamamlayarak sizinle paylaşacaktır.",
    topIssues: [],
    seo: {
      score: 0,
      pageSpeed: 0,
      mobileScore: 0,
      technicalErrors: 0,
      findings: ["Analiz hazırlanıyor..."],
      recommendations: [],
      gain: "",
    },
    ppc: {
      score: 0,
      competitorSpend: "",
      qualityScore: 0,
      findings: ["Analiz hazırlanıyor..."],
      recommendations: [],
      gain: "",
    },
    social: {
      score: 0,
      engagementRate: "",
      consistencyScore: 0,
      findings: ["Analiz hazırlanıyor..."],
      recommendations: [],
      gain: "",
    },
    operations: {
      score: 0,
      techStack: [],
      automationGaps: [],
      findings: ["Analiz hazırlanıyor..."],
      recommendations: [],
      gain: "",
    },
  };
}

/* ─────────────────────────────────────────────────────────────────────────────
   YARDIMCI — Kullanıcı onay maili HTML
   ───────────────────────────────────────────────────────────────────────────── */

function buildUserConfirmationEmail({
  fullName,
}: {
  fullName: string;
}): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;background:#fff;">

  <div style="margin-bottom:32px;">
    <div style="font-size:11px;font-weight:800;letter-spacing:3px;color:#0000c8;text-transform:uppercase;">
      PREMIUM DİJİTAL
    </div>
  </div>

  <h2 style="font-size:22px;font-weight:800;color:#111;margin:0 0 16px;">
    Başvurunuz Alındı, ${escapeHtml(fullName)}
  </h2>

  <p style="font-size:14px;color:#555;line-height:1.7;margin:0 0 24px;">
    Dijital analiz başvurunuzu aldık. Ekibimiz en geç
    <strong>1 iş günü</strong> içinde sizinle iletişime geçecek.
  </p>

  <div style="background:#f0f4ff;border-left:4px solid #0000c8;padding:16px 20px;margin:0 0 24px;border-radius:4px;">
    <div style="font-size:11px;font-weight:800;color:#0000c8;letter-spacing:2px;text-transform:uppercase;margin-bottom:8px;">
      Ön Analiz Raporunuz Hazır
    </div>
    <p style="font-size:13px;color:#444;margin:0;line-height:1.6;">
      Ön analiz raporunuz ekte yer almaktadır.
    </p>
  </div>

  <div style="border-top:1px solid #eee;padding-top:24px;margin-top:8px;">
    <p style="font-size:12px;color:#999;margin:0 0 4px;">
      Sorularınız için:
    </p>
    <p style="font-size:13px;color:#555;margin:0;">
      📞 0 212 982 57 24 &nbsp;|&nbsp;
      ✉ info@premiumdijital.com &nbsp;|&nbsp;
      🌐 premiumdijital.com
    </p>
  </div>

</body>
</html>`;
}

/* ─────────────────────────────────────────────────────────────────────────────
   ACTION 1 — Detaylı başvuru formu
   ───────────────────────────────────────────────────────────────────────────── */

export async function submitAnalysisAction(
  data: Record<string, unknown> & { formStartTime?: string },
) {
  const guard = await checkCommonGuards(
    data.botField as string,
    data.formStartTime,
  );
  if (guard) return guard;

  const parsed = DetailedFormSchema.safeParse(data);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0];
    const fieldName = firstError?.path?.join(".") ?? "alan";
    const message = firstError?.message ?? "Lütfen alanları kontrol edin.";
    return { error: `${message} (${fieldName})` };
  }

  const d = parsed.data;
  const serviceLabel = SERVICE_LABELS[d.serviceArea] ?? d.serviceArea;
  const sectorLabel = SECTOR_LABELS[d.sector] ?? d.sector;

  /* Badge'ler */
  const badgesHtml =
    badge(serviceLabel, "#ede9fe", "#5b21b6") +
    badge(sectorLabel, "#dbeafe", "#1d4ed8");

  /* Erişim araçları listesi */
  const accessList = (d.adAccess ?? [])
    .map((v) => ACCESS_LABELS[v] ?? v)
    .join(", ");

  /* Ops hedefleri listesi */
  const opsList = (d.opsGoals ?? []).map((v) => OPS_LABELS[v] ?? v).join(", ");

  /* Sosyal platformlar */
  const socialList = (d.socialPlatforms ?? []).join(", ");

  const tableRows = [
    row("Ad Soyad", d.fullName),
    row("Şirket", d.company),
    row("E-Posta", d.email),
    row("Telefon", d.phone),
    row("Hizmet", serviceLabel),
    row(
      "Sektör",
      sectorLabel !== "Diğer" ? sectorLabel : `Diğer — ${d.otherSector ?? ""}`,
    ),
    row("Bütçe", d.budget),
    row(
      "Web Sitesi",
      d.website || (d.hasWebsite === "NO" ? "Yok (sıfırdan yapılacak)" : ""),
    ),
    row("Erişim İzni", accessList),
    row("Platformlar", socialList),
    row(
      "Soc. Hesap",
      d.hasSocialAccounts === "YES"
        ? `Var — ${d.socialHandles ?? ""}`
        : d.hasSocialAccounts === "NO"
          ? "Yok"
          : "",
    ),
    row(
      "Marka Durumu",
      d.hasExistingBrand === "YES"
        ? "Var, revize edilecek"
        : d.hasExistingBrand === "PARTIAL"
          ? "Kısmen var"
          : d.hasExistingBrand === "NO"
            ? "Yok, sıfırdan"
            : "",
    ),
    row("Ops Hedefi", opsList),
    row("Araçlar", d.currentTools),
    row("Not", d.message),
  ].join("");

  try {
    // 1. Yönetici mailine bildirim (mevcut — değişmiyor)
    await resend.emails.send({
      from: process.env.RESEND_FROM!,
      to: process.env.RESEND_TO!.split(",").map((e) => e.trim()),
      replyTo: [d.email],
      subject: `Başvuru — ${escapeHtml(d.fullName)} · ${serviceLabel} · ${sectorLabel}`,
      html: emailShell("Yeni Başvuru", badgesHtml, tableRows),
    });

    await addToAudience(d.email, d.fullName);

    // 2. PDF üret + e-posta eki olarak gönder
    let pdfAttachment: { filename: string; content: Buffer } | null = null;
    try {
      // Temel analiz verisi
      const baseAnalysisData = buildMinimalAnalysisData(
        {
          fullName: d.fullName,
          company: d.company,
          website: d.website,
          sector: d.sector,
          serviceArea: d.serviceArea,
          budget: d.budget,
          adAccess: d.adAccess,
          socialPlatforms: d.socialPlatforms,
          socialHandles: d.socialHandles,
        },
        sectorLabel,
        serviceLabel,
      );

      // ── Paralel veri toplama ──────────────────────────────────────────
      const clientUrl = d.website || "";
      const cookieStore = await cookies();
      const ga4Token = cookieStore.get("oauth_access_ga4")?.value;
      const scToken = cookieStore.get("oauth_access_search_console")?.value;

      const [pageSpeedResult, ga4Result, searchConsoleResult] = await Promise.all([
        // 1. PageSpeed (URL varsa)
        clientUrl
          ? fetch(
              `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(clientUrl)}&strategy=mobile${process.env.PAGESPEED_API_KEY ? `&key=${process.env.PAGESPEED_API_KEY}` : ""}`,
              { signal: AbortSignal.timeout(12000) },
            )
              .then((r) => (r.ok ? r.json() : null))
              .then((psData) => {
                if (!psData) return null;
                const audits = psData.lighthouseResult?.audits;
                const categories = psData.lighthouseResult?.categories;
                return {
                  lcp: Math.round((audits?.["largest-contentful-paint"]?.numericValue || 0) / 100) / 10,
                  performanceScore: Math.round((categories?.performance?.score || 0) * 100),
                  mobileScore: Math.round((categories?.performance?.score || 0) * 100),
                };
              })
              .catch(() => null)
          : Promise.resolve(null),

        // 2. GA4 (token varsa)
        ga4Token
          ? (async () => {
              try {
                const propertyId = await fetchGA4Properties(ga4Token);
                if (!propertyId) return null;
                return await fetchGA4Metrics(ga4Token, propertyId);
              } catch {
                return null;
              }
            })()
          : Promise.resolve(null),

        // 3. Search Console (token + URL varsa)
        scToken && clientUrl
          ? fetchSearchConsoleData(scToken, clientUrl).catch(() => null)
          : Promise.resolve(null),
      ]);

      console.log("[PageSpeed] result:", JSON.stringify(pageSpeedResult));

      // ── Gerçek verilerle merge ────────────────────────────────────────
      const analysisData: AnalysisData = {
        ...baseAnalysisData,
        seo: {
          ...baseAnalysisData.seo,
          ...(pageSpeedResult && {
            score: pageSpeedResult.performanceScore,
            pageSpeed: Math.round(pageSpeedResult.lcp * 1000),
            mobileScore: pageSpeedResult.mobileScore,
          }),
        },
        ...(ga4Result && { ga4Data: ga4Result }),
        ...(searchConsoleResult && { searchConsoleData: searchConsoleResult }),
      };

      const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
      const reportResponse = await fetch(`${appUrl}/api/generate-report`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: analysisData, type: "client" }),
      });

      if (reportResponse.ok) {
        const pdfBuffer = Buffer.from(await reportResponse.arrayBuffer());
        const safeName = (d.company || d.fullName).replace(/[^a-zA-Z0-9]/g, "-");
        pdfAttachment = {
          filename: `PremiumDijital-Analiz-${safeName}-${Date.now()}.pdf`,
          content: pdfBuffer,
        };
      }
    } catch (pdfErr) {
      console.error("[PDF Generation] Failed:", pdfErr);
    }

    // 3. Kullanıcıya onay maili
    await resend.emails.send({
      from: process.env.RESEND_FROM!,
      to: [d.email],
      subject: "Dijital Analiz Raporunuz Hazır — Premium Dijital",
      html: buildUserConfirmationEmail({ fullName: d.fullName }),
      ...(pdfAttachment ? { attachments: [pdfAttachment] } : {}),
    });

    return { success: true };
  } catch (err) {
    console.error("[AnalysisForm] Mail Error:", err);
    return { error: "Mail gönderimi başarısız oldu. Lütfen tekrar deneyin." };
  }
}

/* ─────────────────────────────────────────────────────────────────────────────
   ACTION 2 — Hızlı temas formu
   ───────────────────────────────────────────────────────────────────────────── */

export async function submitQuickContactAction(
  data: Record<string, unknown> & { formStartTime?: string },
) {
  const guard = await checkCommonGuards(
    data.quickBotField as string,
    data.formStartTime,
  );
  if (guard) return guard;

  const parsed = QuickFormSchema.safeParse(data);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0];
    const fieldName = firstError?.path?.join(".") ?? "alan";
    const message = firstError?.message ?? "Lütfen alanları kontrol edin.";
    return { error: `${message} (${fieldName})` };
  }

  const d = parsed.data;

  const tableRows = [
    row("Ad Soyad", d.quickName),
    row("E-Posta", d.quickEmail),
    row("Telefon", d.quickPhone),
    row("Mesaj", d.quickMessage),
  ].join("");

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM!,
      to: process.env.RESEND_TO!.split(",").map((e) => e.trim()),
      replyTo: [d.quickEmail],
      subject: `Hızlı Temas — ${escapeHtml(d.quickName)}`,
      html: emailShell("Hızlı Temas Talebi", "", tableRows),
    });

    await addToAudience(d.quickEmail, d.quickName);

    return { success: true };
  } catch (err) {
    console.error("[QuickContact] Mail Error:", err);
    return { error: "Mail gönderimi başarısız oldu. Lütfen tekrar deneyin." };
  }
}
