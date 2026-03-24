"use server";

import { resend, emailShell, escapeHtml, row, badge } from "@/app/forms/_shared/resend-client";
import { checkCommonGuards } from "@/app/forms/_shared/guards";
import { addToAudience } from "@/app/forms/_shared/audience";
import { DetailedFormSchema, QuickFormSchema } from "./schema";

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
    await resend.emails.send({
      from: process.env.RESEND_FROM!,
      to: process.env.RESEND_TO!.split(",").map((e) => e.trim()),
      replyTo: [d.email],
      subject: `Başvuru — ${escapeHtml(d.fullName)} · ${serviceLabel} · ${sectorLabel}`,
      html: emailShell("Yeni Başvuru", badgesHtml, tableRows),
    });

    await addToAudience(d.email, d.fullName);

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
