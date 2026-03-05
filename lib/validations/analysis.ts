import { z } from "zod";

export const AnalysisSchema = z
  .object({
    fullName: z.string().min(3, "Lütfen adınızı ve soyadınızı giriniz."),
    email: z.string().email("Geçerli bir e-posta adresi giriniz."),
    website: z.string().url("Lütfen geçerli bir URL (https://...) giriniz."),
    goal: z.enum(["SATIŞ", "LEAD", "BRAND", "SEO", "OTHER"], {
      required_error: "Lütfen hedef seçiniz.",
    }),
    otherGoal: z.string().optional(),
    botField: z.string().optional(),
    formStartTime: z.string().optional(),
  })
  .superRefine((val, ctx) => {
    if (
      val.goal === "OTHER" &&
      (!val.otherGoal || val.otherGoal.trim().length < 5)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["otherGoal"],
        message: "Lütfen ihtiyacınızı kısaca belirtiniz.",
      });
    }
    // Honeypot: dolu gelirse bot
    if (val.botField && val.botField.trim().length > 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["botField"],
        message: "Bot detected",
      });
    }
  });

export type AnalysisInput = z.infer<typeof AnalysisSchema>;
