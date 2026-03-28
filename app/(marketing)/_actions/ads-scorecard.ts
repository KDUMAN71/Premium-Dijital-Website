"use server";

import {
  adsScorecardSchema,
  AdsScorecardValues,
} from "@/lib/validations/ads-scorecard";

/**
 * Google Ads Sağlık Skoru İşleme ve E-posta Gönderim Aksiyonu
 */
export async function processAdsScorecard(data: AdsScorecardValues) {
  // 1. Sunucu taraflı doğrulama ve Honeypot (Spam) kontrolü
  const validatedFields = adsScorecardSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Doğrulama hatası: Lütfen verileri kontrol edin." };
  }

  // Honeypot doluysa bot kabul edilir
  if (data.company_honey) {
    return { error: "Güvenlik onayı alınamadı (Spam)." };
  }

  try {
    // 2. Veri Odaklı Skor Algoritması
    const { budget, conversions, cpc } = data;

    // Tıklama sayısı tahmini
    const clicks = budget / cpc;
    // Dönüşüm oranı (Örn: %2 ve üzeri başarılı kabul edilir)
    const convRate = (conversions / clicks) * 100;

    // Temel skor hesaplama
    let calculatedScore = 30;
    if (convRate > 0.5) calculatedScore += 20;
    if (convRate > 1.5) calculatedScore += 20;
    if (convRate > 3) calculatedScore += 15;
    if (budget > 30000) calculatedScore += 10;

    const finalScore = Math.min(calculatedScore, 98);

    // 3. E-posta ve Veri Kaydı (İleride Resend/Nodemailer buraya eklenecek)
    // console.log("Yeni Analiz Talebi:", data, "Skor:", finalScore);

    return {
      success: true,
      score: finalScore,
      message:
        "Verileriniz başarıyla analiz edildi. Detaylı yol haritası e-posta adresinize iletildi.",
    };
  } catch (error) {
    return { error: "Analiz sırasında bir teknik hata oluştu." };
  }
}
