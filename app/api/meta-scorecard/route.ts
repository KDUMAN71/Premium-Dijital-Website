import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/app/forms/_shared/resend-client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { budget, conversions, cpm, fullName, email, website, company_honey } = body;

    // Honeypot
    if (company_honey) return NextResponse.json({ error: "Invalid" }, { status: 400 });

    // Skor hesapla
    const budgetNum = Number(budget);
    const convsNum = Number(conversions);
    const cpmNum = Number(cpm);
    if (!budgetNum || !convsNum || !cpmNum) {
      return NextResponse.json({ error: "Geçersiz veri" }, { status: 400 });
    }

    // CPM bazlı skor hesaplama
    const impressions = (budgetNum / cpmNum) * 1000;
    const cpa = budgetNum / convsNum;
    const targetCpa = budgetNum * 0.15;
    const cpaScore = Math.min(40, Math.round((targetCpa / cpa) * 40));
    // CPM benchmark: TR ortalaması ~50 TL, düşükse iyi
    const cpmScore = Math.min(30, Math.round((50 / cpmNum) * 20));
    // Dönüşüm verimliliği
    const convRate = (convsNum / impressions) * 1000;
    const efficiencyScore = Math.min(30, Math.round(convRate * 10));
    const score = Math.max(10, Math.min(100, cpaScore + cpmScore + efficiencyScore));

    let message = "";
    if (score >= 70) {
      message =
        "Meta kampanyanız iyi performans gösteriyor. Ölçekleme ve Advantage+ optimizasyonu için görüşelim.";
    } else if (score >= 40) {
      message =
        "Bütçenizin önemli bir kısmı optimize edilebilir. Kreatif rotasyonu ve CAPI kurulumu ile %30-50 verimlilik artışı mümkün.";
    } else {
      message =
        "Meta hesabınızda ciddi optimizasyon fırsatları var. Ücretsiz audit görüşmesiyle kök nedeni bulalım.";
    }

    // Yöneticiye bildirim
    const yoneticiResult = await resend.emails.send({
      from: process.env.RESEND_FROM!,
      to: process.env.RESEND_TO!,
      subject: `[Meta Ads Scorecard] ${fullName} — Skor: ${score}/100`,
      html: `
        <h2>Yeni Meta Ads Scorecard Başvurusu</h2>
        <p><strong>Ad:</strong> ${fullName}</p>
        <p><strong>E-posta:</strong> ${email}</p>
        <p><strong>Website:</strong> ${website || "—"}</p>
        <hr/>
        <p><strong>Aylık Bütçe:</strong> ${budgetNum.toLocaleString("tr-TR")} TL</p>
        <p><strong>Aylık Dönüşüm:</strong> ${convsNum}</p>
        <p><strong>Ortalama CPM:</strong> ${cpmNum} TL</p>
        <p><strong>CPA:</strong> ${Math.round(cpa)} TL</p>
        <p><strong>Tahmini Gösterim:</strong> ${Math.round(impressions).toLocaleString("tr-TR")}</p>
        <hr/>
        <h3>Performans Skoru: ${score}/100</h3>
        <p>${message}</p>
      `,
    });
    console.log("[meta-scorecard] yönetici:", JSON.stringify(yoneticiResult));

    // Kullanıcıya otomatik yanıt
    const kullaniciResult = await resend.emails.send({
      from: process.env.RESEND_FROM!,
      to: email,
      replyTo: process.env.RESEND_TO!,
      subject: `Meta Ads Performans Skorunuz: ${score}/100 | Premium Dijital`,
      html: `
        <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#050505;color:#fff;padding:40px;border-radius:16px;">
          <h1 style="font-size:24px;font-weight:900;margin-bottom:8px;">Merhaba ${fullName},</h1>
          <p style="color:#aaa;font-size:15px;margin-bottom:32px;">Meta Ads performans analiziniz tamamlandı.</p>
          <div style="background:#111;border:1px solid #333;border-radius:12px;padding:32px;text-align:center;margin-bottom:32px;">
            <div style="font-size:72px;font-weight:900;color:#BE29EC;">${score}</div>
            <div style="color:#666;font-size:12px;text-transform:uppercase;letter-spacing:2px;">/ 100 Performans Skoru</div>
          </div>
          <p style="color:#ccc;font-size:14px;line-height:1.7;margin-bottom:24px;">${message}</p>
          <p style="color:#aaa;font-size:13px;">Uzmanımız 1 iş günü içinde sizi arayacak ve ücretsiz strateji görüşmesi planlayacak.</p>
          <div style="margin-top:32px;padding-top:24px;border-top:1px solid #222;color:#666;font-size:11px;">
            Premium Dijital Reklam Ajansı · premiumdijital.com
          </div>
        </div>
      `,
    });
    console.log("[meta-scorecard] kullanici:", JSON.stringify(kullaniciResult));

    return NextResponse.json({ success: true, score, message });
  } catch (err) {
    console.error("[meta-scorecard]", err);
    return NextResponse.json({ error: "Sunucu hatası oluştu." }, { status: 500 });
  }
}
