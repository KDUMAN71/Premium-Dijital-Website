import { z } from "zod";

/* ─────────────────────────────────────────────────────────────────────────────
   SCHEMA — detaylı form (FormInput ile örtüşür)
   ───────────────────────────────────────────────────────────────────────────── */

export const DetailedFormSchema = z.object({
  botField: z.string().max(0).optional(),
  formStartTime: z.string().optional(),
  serviceArea: z.enum(["ADS", "WEB", "BRAND", "SOCIAL", "OPS"]),
  sector: z.enum(["HEALTH", "TOURISM", "ECOMM", "SERVICE", "BEAUTY", "OTHER"]),
  otherSector: z.string().max(100).optional(),
  budget: z.string().max(100).optional(),
  hasWebsite: z.preprocess(
    (v) => (v === "" || v === null ? undefined : v),
    z.enum(["YES", "NO"]).optional(),
  ),
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
  hasSocialAccounts: z.preprocess(
    (v) => (v === "" || v === null ? undefined : v),
    z.enum(["YES", "NO"]).optional(),
  ),
  hasExistingBrand: z.preprocess(
    (v) => (v === "" || v === null ? undefined : v),
    z.enum(["YES", "NO", "PARTIAL"]).optional(),
  ),
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

export const QuickFormSchema = z.object({
  quickBotField: z.string().max(0).optional(),
  formStartTime: z.string().optional(),
  quickName: z.string().min(2, "Ad en az 2 karakter olmalıdır").max(80),
  quickEmail: z.string().email("Geçerli bir e-posta adresi girin"),
  quickPhone: z.string().max(30).optional(),
  quickMessage: z.string().min(3, "Mesaj en az 3 karakter olmalıdır").max(1000),
});

/* ─────────────────────────────────────────────────────────────────────────────
   TYPE EXPORTS
   ───────────────────────────────────────────────────────────────────────────── */

export type DetailedFormInput = z.infer<typeof DetailedFormSchema>;
export type QuickFormInput = z.infer<typeof QuickFormSchema>;
