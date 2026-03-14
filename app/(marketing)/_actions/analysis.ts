"use server";

import {
  AnalysisSchema,
  type AnalysisInput,
  SECTOR_VALUES,
  GOAL_VALUES,
} from "@/lib/validations/analysis";
import { rateLimit, analysisLimiter } from "@/lib/rate-limit";
import { headers } from "next/headers";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

/* ── Sektör & hedef label'ları — e-postada okunabilir görünsün ── */
const SECTOR_LABELS: Record<string, string> = {
  HEALTH: "Sağlık & Klinik",
  TOURISM: "Turizm & Konaklama",
  ECOMM: "E-Ticaret",
  SERVICE: "Hizmet & Danışmanlık",
  BEAUTY: "Estetik & Güzellik",
  OTHER: "Diğer",
};

const GOAL_LABELS: Record<string, string> = {
  PATIENT: "Hasta Kazanımı & Randevu Artışı",
  HTOURISM: "Sağlık Turizmi & Uluslararası Hasta",
  BOOKING: "Rezervasyon & Doluluk Oranı Artışı",
  INTL: "Yabancı Turist Çekimi",
  SALES: "Satış & Ciro Artışı",
  ROAS: "Reklam Verimliliği (ROAS)",
  RETENTION: "Tekrar Satın Alma & Müşteri Sadakati",
  LEAD: "Nitelikli Lead & Teklif Talebi",
  BRAND: "Marka Bilinirliği & Pazar Otoritesi",
  SYSTEM: "Dijital Operasyon Sistemi Kurulumu",
  SEO: "SEO & Teknik Altyapı",
  SOCIAL: "Sosyal Medya & İçerik Stratejisi",
  OTHER: "Diğer",
};

export async function submitAnalysisAction(
  data: AnalysisInput & { formStartTime?: string },
) {
  /* 0) ENV guard */
  if (!process.env.RESEND_API_KEY) {
    return { error: "Mail servisi yapılandırılmadı." };
  }
  if (!process.env.RESEND_TO || !process.env.RESEND_FROM) {
    return { error: "Mail alıcı/gönderici ayarları eksik." };
  }

  /* 1) IP bazlı rate limit */
  const ip = getClientIpSafe();
  const limiter = await rateLimit(analysisLimiter);
  const isAllowed = await limiter.check(ip);

  if (!isAllowed.success) {
    return {
      error:
        "Çok fazla deneme yaptınız. Lütfen bir dakika sonra tekrar deneyin.",
    };
  }

  /* 2) Server-side Zod doğrulama */
  const result = AnalysisSchema.safeParse(data);
  if (!result.success) {
    return {
      error: "Form verileri doğrulanamadı. Lütfen alanları kontrol edin.",
    };
  }

  const { botField, formStartTime, ...formData } = result.data;

  /* 3) Honeypot — server tarafı */
  if (botField && botField.trim().length > 0) {
    // Bot'a başarı döndür — davranışını anlamamasın
    return { success: true };
  }

  /* 4) Timing check — 3 saniyeden hızlı gönderim */
  const started = Number(formStartTime);
  if (Number.isFinite(started) && Date.now() - started < 3000) {
    return { error: "Lütfen formu doğal bir hızda doldurunuz." };
  }

  /* 5) Değer whitelist — enum dışı değer geçemez */
  if (!SECTOR_VALUES.includes(formData.sector as any)) {
    return { error: "Geçersiz sektör değeri." };
  }
  if (!GOAL_VALUES.includes(formData.goal as any)) {
    return { error: "Geçersiz hedef değeri." };
  }

  /* 6) Email gönderimi */
  try {
    const sectorLabel = SECTOR_LABELS[formData.sector] ?? formData.sector;
    const goalLabel = GOAL_LABELS[formData.goal] ?? formData.goal;
    const subject = `Analiz Talebi — ${escapeHtml(formData.fullName)} · ${sectorLabel}`;

    await resend.emails.send({
      from: process.env.RESEND_FROM!,
      to: process.env.RESEND_TO!.split(",").map((e) => e.trim()), // Virgülle ayrılmış çoklu alıcı desteği
      replyTo: [formData.email],
      subject,
      html: buildEmailHtml({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone || "",
        website: formData.website || "",
        sector: sectorLabel,
        goal: goalLabel,
        otherGoal: formData.goal === "OTHER" ? formData.otherGoal || "" : "",
      }),
    });

    return { success: true };
  } catch (error) {
    console.error("[AnalysisForm] Mail Error:", error);
    return { error: "Mail gönderimi başarısız oldu. Lütfen tekrar deneyin." };
  }
}

/* ── HTML e-posta şablonu ── */
function buildEmailHtml(d: {
  fullName: string;
  email: string;
  phone: string;
  website: string;
  sector: string;
  goal: string;
  otherGoal: string;
}) {
  const row = (label: string, value: string) =>
    value
      ? `<tr>
           <td style="padding:8px 12px;font-weight:700;color:#6b7280;width:160px;white-space:nowrap">${label}</td>
           <td style="padding:8px 12px;color:#111">${escapeHtml(value)}</td>
         </tr>`
      : "";

  return `<!DOCTYPE html>
<html lang="tr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:ui-sans-serif,system-ui,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08)">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(90deg,#be29ec,#0000c8);padding:24px 32px">
            <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.6)">Premium Dijital</p>
            <h1 style="margin:4px 0 0;font-size:20px;font-weight:800;color:#fff">Yeni Analiz Talebi</h1>
          </td>
        </tr>

        <!-- Sektör + Hedef badges -->
        <tr>
          <td style="padding:20px 32px 0">
            <span style="display:inline-block;background:#f3e8ff;color:#7e22ce;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;padding:4px 12px;border-radius:999px;margin-right:8px">${escapeHtml(d.sector)}</span>
            <span style="display:inline-block;background:#dbeafe;color:#1d4ed8;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;padding:4px 12px;border-radius:999px">${escapeHtml(d.goal)}</span>
          </td>
        </tr>

        <!-- Bilgiler -->
        <tr>
          <td style="padding:20px 32px 28px">
            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid #e5e7eb;border-radius:10px;overflow:hidden">
              ${row("Ad Soyad", d.fullName)}
              ${row("E-Posta", d.email)}
              ${row("Telefon", d.phone)}
              ${row("Website", d.website)}
              ${d.otherGoal ? row("Açıklama", d.otherGoal) : ""}
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f9fafb;padding:16px 32px;border-top:1px solid #e5e7eb">
            <p style="margin:0;font-size:11px;color:#9ca3af">Bu e-posta premiumdijital.com analiz formu aracılığıyla gönderilmiştir.</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

/* ── Yardımcılar ── */
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
    if (h && typeof h === "object") {
      const raw = (h["x-forwarded-for"] || h["x-real-ip"] || "").toString();
      return raw.split(",")[0]?.trim() || "anonymous";
    }
    return "anonymous";
  } catch {
    return "anonymous";
  }
}

function escapeHtml(input: string): string {
  return (input ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
