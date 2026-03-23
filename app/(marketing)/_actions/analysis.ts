"use server";

import { rateLimit, analysisLimiter } from "@/lib/rate-limit";
import { headers } from "next/headers";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

/* ─────────────────────────────────────────────────────────────────────────────
   SCHEMA — detaylı form (FormInput ile örtüşür)
   ───────────────────────────────────────────────────────────────────────────── */

const DetailedFormSchema = z.object({
  botField: z.string().max(0).optional(),
  formStartTime: z.string().optional(),
  serviceArea: z.enum(["ADS", "WEB", "BRAND", "SOCIAL", "OPS"]),
  sector: z.enum(["HEALTH", "TOURISM", "ECOMM", "SERVICE", "BEAUTY", "OTHER"]),
  otherSector: z.string().max(100).optional(),
  budget: z.string().max(100).optional(),
  hasWebsite: z.enum(["YES", "NO"]).optional(),
  website: z.string().max(200).optional(),
  adAccess: z
    .array(z.enum(["google_ads", "ga4", "search_console", "meta_ads"]))
    .optional(),
  socialPlatforms: z
    .array(
      z.enum([
        "instagram",
        "facebook",
        "linkedin",
        "tiktok",
        "youtube",
        "twitter",
      ]),
    )
    .optional(),
  hasSocialAccounts: z.enum(["YES", "NO"]).optional(),
  hasExistingBrand: z.enum(["YES", "NO", "PARTIAL"]).optional(),
  currentTools: z.string().max(500).optional(),
  socialHandles: z.string().max(300).optional(),
  opsGoals: z
    .array(z.enum(["VISIBILITY", "SALES_SYS", "BRAND_MEM", "OPS_EFF", "SCALE"]))
    .optional(),
  fullName: z.string().min(2).max(80),
  company: z.string().max(100).optional(),
  email: z.string().email(),
  phone: z.string().max(30).optional(),
  message: z.string().max(1000).optional(),
});

/* ─────────────────────────────────────────────────────────────────────────────
   SCHEMA — hızlı form (QuickInput ile örtüşür)
   ───────────────────────────────────────────────────────────────────────────── */

const QuickFormSchema = z.object({
  quickBotField: z.string().max(0).optional(),
  formStartTime: z.string().optional(),
  quickName: z.string().min(2).max(80),
  quickEmail: z.string().email(),
  quickPhone: z.string().max(30).optional(),
  quickMessage: z.string().min(10).max(1000),
});

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
   ORTAK YARDIMCILAR
   ───────────────────────────────────────────────────────────────────────────── */

function escapeHtml(input: string): string {
  return (input ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function row(label: string, value?: string | null) {
  if (!value) return "";
  return `<tr>
    <td style="padding:8px 12px;font-weight:700;color:#6b7280;width:160px;white-space:nowrap;vertical-align:top">${label}</td>
    <td style="padding:8px 12px;color:#111">${escapeHtml(value)}</td>
  </tr>`;
}

function badge(text: string, bg: string, color: string) {
  return `<span style="display:inline-block;background:${bg};color:${color};font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;padding:4px 12px;border-radius:999px;margin-right:8px;margin-bottom:6px">${escapeHtml(text)}</span>`;
}

function emailShell(
  subject: string,
  badgesHtml: string,
  tableRowsHtml: string,
) {
  return `<!DOCTYPE html>
<html lang="tr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:ui-sans-serif,system-ui,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08)">
        <tr>
          <td style="background:linear-gradient(90deg,#be29ec,#0000c8);padding:24px 32px">
            <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.6)">Premium Dijital</p>
            <h1 style="margin:4px 0 0;font-size:20px;font-weight:800;color:#fff">${subject}</h1>
          </td>
        </tr>
        ${badgesHtml ? `<tr><td style="padding:20px 32px 0">${badgesHtml}</td></tr>` : ""}
        <tr>
          <td style="padding:20px 32px 28px">
            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid #e5e7eb;border-radius:10px;overflow:hidden">
              ${tableRowsHtml}
            </table>
          </td>
        </tr>
        <tr>
          <td style="background:#f9fafb;padding:16px 32px;border-top:1px solid #e5e7eb">
            <p style="margin:0;font-size:11px;color:#9ca3af">Bu e-posta premiumdijital.com başvuru formu aracılığıyla gönderilmiştir.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function getClientIpSafe(): string {
  try {
    const h: any = headers();
    if (h && typeof h.get === "function") {
      const raw = (
        h.get("x-forwarded-for") ||
        h.get("x-real-ip") ||
        ""
      ).toString();
      return raw.split(",")[0]?.trim() || "anonymous";
    }
    return "anonymous";
  } catch {
    return "anonymous";
  }
}

async function checkCommonGuards(
  botField: string | undefined,
  formStartTime: string | undefined,
) {
  /* ENV guard */
  if (
    !process.env.RESEND_API_KEY ||
    !process.env.RESEND_TO ||
    !process.env.RESEND_FROM
  ) {
    return { error: "Mail servisi yapılandırılmadı." };
  }
  /* Rate limit */
  const ip = getClientIpSafe();
  const limiter = await rateLimit(analysisLimiter);
  const isAllowed = await limiter.check(ip);
  if (!isAllowed.success) {
    return {
      error:
        "Çok fazla deneme yaptınız. Lütfen bir dakika sonra tekrar deneyin.",
    };
  }
  /* Honeypot */
  if (botField && botField.trim().length > 0) {
    return { success: true }; // bot'a başarı döndür
  }
  /* Timing */
  const started = Number(formStartTime);
  if (Number.isFinite(started) && Date.now() - started < 3000) {
    return { error: "Lütfen formu doğal bir hızda doldurunuz." };
  }
  return null; // tüm kontroller geçti
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
    return {
      error: "Form verileri doğrulanamadı. Lütfen alanları kontrol edin.",
    };
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
    await resend.emails.send({
      from: process.env.RESEND_FROM!,
      to: process.env.RESEND_TO!.split(",").map((e) => e.trim()),
      replyTo: [d.email],
      subject: `Başvuru — ${escapeHtml(d.fullName)} · ${serviceLabel} · ${sectorLabel}`,
      html: emailShell("Yeni Başvuru", badgesHtml, tableRows),
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
    return {
      error: "Form verileri doğrulanamadı. Lütfen alanları kontrol edin.",
    };
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
    return { success: true };
  } catch (err) {
    console.error("[QuickContact] Mail Error:", err);
    return { error: "Mail gönderimi başarısız oldu. Lütfen tekrar deneyin." };
  }
}
