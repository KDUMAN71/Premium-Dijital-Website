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
