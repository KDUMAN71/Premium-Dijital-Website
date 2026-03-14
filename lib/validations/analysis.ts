import { z } from "zod";

/* ── Sabitler — action ve form ile senkron ── */
export const GOAL_VALUES = [
  // Sağlık
  "PATIENT",
  "HTOURISM",
  // Turizm
  "BOOKING",
  "INTL",
  // E-Ticaret
  "SALES",
  "ROAS",
  "RETENTION",
  // Hizmet / Genel
  "LEAD",
  "SYSTEM",
  // Ortak
  "BRAND",
  "SEO",
  "SOCIAL",
  // Diğer
  "OTHER",
] as const;

export const SECTOR_VALUES = [
  "HEALTH",
  "TOURISM",
  "ECOMM",
  "SERVICE",
  "BEAUTY",
  "OTHER",
] as const;

export const AnalysisSchema = z
  .object({
    /* Güvenlik */
    botField: z.string().max(0, "Bot detected").optional().default(""),
    formStartTime: z.string().optional(),

    /* Adım 1 */
    sector: z.enum(SECTOR_VALUES, {
      error: "Lütfen sektörünüzü seçiniz.",
    }),

    /* Adım 2 */
    goal: z.enum(GOAL_VALUES, {
      error: "Lütfen bir hedef seçiniz.",
    }),
    otherGoal: z.string().optional().default(""),

    /* Adım 3 */
    fullName: z
      .string()
      .min(2, "Ad soyad en az 2 karakter olmalıdır.")
      .max(100, "Ad soyad çok uzun."),

    email: z
      .string()
      .email("Geçerli bir e-posta adresi giriniz.")
      .max(254, "E-posta adresi çok uzun."),

    phone: z
      .string()
      .optional()
      .transform((v) => v?.trim() || ""),

    website: z
      .string()
      .optional()
      .transform((v) => v?.trim() || "")
      .refine(
        (v) => !v || /^https?:\/\/.+/.test(v),
        "Geçerli bir URL giriniz (https://...)",
      ),
  })
  .superRefine((val, ctx) => {
    /* Honeypot */
    if (val.botField && val.botField.trim().length > 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["botField"],
        message: "Bot detected",
      });
    }

    /* OTHER hedef için açıklama zorunlu */
    if (
      val.goal === "OTHER" &&
      (!val.otherGoal || val.otherGoal.trim().length < 3)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["otherGoal"],
        message: "Lütfen hedefinizi kısaca belirtiniz.",
      });
    }
  });

export type AnalysisInput = z.infer<typeof AnalysisSchema>;
