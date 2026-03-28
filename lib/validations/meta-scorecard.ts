import * as z from "zod";

export const metaScorecardSchema = z.object({
  budget: z.number().min(1000, "Minimum 1.000 TL bütçe gereklidir."),
  conversions: z.number().min(0, "Negatif değer girilemez."),
  cpm: z.number().min(1, "Minimum 1 TL CPM girilmelidir."),
  fullName: z.string().min(3, "Ad Soyad alanını doldurun."),
  email: z.string().email("Geçerli bir e-posta girin."),
  website: z.string().url("Geçerli bir URL girin (https://...)."),
  company_honey: z.string().max(0, "Bot detected").optional(),
});

export type MetaScorecardValues = z.infer<typeof metaScorecardSchema>;
