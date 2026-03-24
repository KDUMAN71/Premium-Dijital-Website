import { headers } from "next/headers";
import { rateLimit, analysisLimiter } from "@/lib/rate-limit";

export function getClientIpSafe(): string {
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

export async function checkCommonGuards(
  botField: string | undefined,
  formStartTime: string | undefined,
): Promise<{ error: string } | { success: true } | null> {
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
