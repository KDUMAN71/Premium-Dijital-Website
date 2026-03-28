import { z } from "zod";

export const sosyalAnalizSchema = z.object({
  platforms: z.array(z.string()).min(1, "En az bir platform seçin"),
  takipci: z.string().min(1, "Lütfen takipçi sayınızı seçin"),
  hedef: z.string().min(1, "Lütfen ana hedefinizi seçin"),
  butce: z.string().min(1, "Lütfen bütçe aralığınızı seçin"),
  icerikTipi: z.string().min(1, "Lütfen içerik tipini seçin"),
  toplulukYonetimi: z
    .string()
    .min(1, "Lütfen topluluk yönetimi seviyesini seçin"),
  mevcutHesaplar: z.string().optional(),
  fullName: z.string().min(2, "En az 2 karakter"),
  email: z.string().email("Geçerli bir e-posta girin"),
  website: z
    .string()
    .url("Geçerli bir URL girin (https://)")
    .optional()
    .or(z.literal("")),
  company_honey: z.string().max(0).optional(),
});

export type SosyalAnalizValues = z.infer<typeof sosyalAnalizSchema>;
