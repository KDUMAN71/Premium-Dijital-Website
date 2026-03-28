import { z } from "zod";

export const videoStratejiSchema = z.object({
  sektor: z.string().min(1, "Lütfen sektörünüzü seçin"),
  hedef: z.string().min(1, "Lütfen kampanya hedefinizi seçin"),
  butce: z.string().min(1, "Lütfen bütçe aralığınızı seçin"),
  fullName: z.string().min(2, "En az 2 karakter"),
  email: z.string().email("Geçerli bir e-posta girin"),
  website: z.string().url("Geçerli bir URL girin (https://)").optional().or(z.literal("")),
  company_honey: z.string().max(0).optional(),
});

export type VideoStratejiValues = z.infer<typeof videoStratejiSchema>;
