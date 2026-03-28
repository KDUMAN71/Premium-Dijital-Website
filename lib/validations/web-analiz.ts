import { z } from "zod";

export const webAnalizSchema = z.object({
  mevcutSite: z.string().url("Geçerli URL girin").optional().or(z.literal("")),
  siteAmaci: z.string().min(1, "Site amacını seçin"),
  mevcutDurum: z.string().min(1, "Mevcut durumu seçin"),
  butce: z.string().min(1, "Bütçe aralığını seçin"),
  fullName: z.string().min(2, "En az 2 karakter"),
  email: z.string().email("Geçerli e-posta girin"),
  company_honey: z.string().max(0).optional(),
});

export type WebAnalizValues = z.infer<typeof webAnalizSchema>;
