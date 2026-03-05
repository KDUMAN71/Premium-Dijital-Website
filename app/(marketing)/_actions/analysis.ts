"use server";

import { AnalysisSchema, type AnalysisInput } from "@/lib/validations/analysis";
import { rateLimit, analysisLimiter } from "@/lib/rate-limit";
import { headers } from "next/headers";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitAnalysisAction(data: AnalysisInput) {
  // 0) ENV guard
  if (!process.env.RESEND_API_KEY) {
    return { error: "Mail servisi yapılandırılmadı (RESEND_API_KEY eksik)." };
  }
  if (!process.env.RESEND_TO || !process.env.RESEND_FROM) {
    return { error: "Mail ayarları eksik (RESEND_TO / RESEND_FROM)." };
  }

  // 1) IP bazlı rate limit
  const ip = getClientIpSafe();

  const limiter = await rateLimit(analysisLimiter);
  const isAllowed = await limiter.check(ip);

  if (!isAllowed.success) {
    return {
      error:
        "Çok fazla deneme yaptınız. Lütfen bir dakika sonra tekrar deneyin.",
    };
  }

  // 2) Server-side Zod doğrulama
  const result = AnalysisSchema.safeParse(data);
  if (!result.success) {
    return {
      error: "Form verileri doğrulanamadı. Lütfen alanları kontrol edin.",
    };
  }

  const { botField, formStartTime, ...formData } = result.data;

  // 3) Honeypot
  if (botField && botField.trim().length > 0) {
    return { error: "Güvenlik protokolü ihlali." };
  }

  // 4) Timing check
  const started = Number(formStartTime);
  if (Number.isFinite(started) && Date.now() - started < 3000) {
    return { error: "Lütfen formu doğal bir hızda doldurunuz." };
  }

  try {
    const subject = `Yeni Analiz Talebi: ${escapeHtml(formData.fullName)}`;
    const to = process.env.RESEND_TO!;
    const from = process.env.RESEND_FROM!;

    await resend.emails.send({
      from,
      to,
      subject,
      replyTo: formData.email,
      html: `
        <div style="font-family:ui-sans-serif,system-ui; line-height:1.6">
          <h2>Yeni Analiz Talebi</h2>
          <p><b>Ad Soyad:</b> ${escapeHtml(formData.fullName)}</p>
          <p><b>E-posta:</b> ${escapeHtml(formData.email)}</p>
          <p><b>Website:</b> <a href="${escapeAttr(formData.website)}">${escapeHtml(
            formData.website,
          )}</a></p>
          <p><b>Hedef:</b> ${escapeHtml(formData.goal)}</p>
          ${
            formData.goal === "OTHER" && formData.otherGoal
              ? `<p><b>Detay:</b> ${escapeHtml(formData.otherGoal)}</p>`
              : ""
          }
        </div>
      `,
    });

    await new Promise((res) => setTimeout(res, 800));
    return { success: true };
  } catch (error) {
    console.error("Mail Error:", error);
    return { error: "Mail gönderimi başarısız oldu. Lütfen tekrar deneyin." };
  }
}

/**
 * next/headers() farklı runtime'larda farklı yapıda dönebildiği için
 * .get() yoksa bile x-forwarded-for okumayı garanti altına alır.
 */
function getClientIpSafe(): string {
  try {
    const h: any = headers();

    // 1) Web standard Headers objesi ise
    if (h && typeof h.get === "function") {
      const raw = (
        h.get("x-forwarded-for") ||
        h.get("x-real-ip") ||
        ""
      ).toString();
      return raw.split(",")[0]?.trim() || "anonymous";
    }

    // 2) Plain object ise
    if (h && typeof h === "object") {
      const raw = (h["x-forwarded-for"] || h["x-real-ip"] || "").toString();
      return raw.split(",")[0]?.trim() || "anonymous";
    }

    return "anonymous";
  } catch {
    return "anonymous";
  }
}

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(input: string) {
  return escapeHtml(input);
}
