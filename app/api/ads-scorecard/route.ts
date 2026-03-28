import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/app/forms/_shared/resend-client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { budget, conversions, cpc, fullName, email, website, company_honey } = body;

    // Honeypot
    if (company_honey) return NextResponse.json({ error: "Invalid" }, { status: 400 });

    // Skor hesapla
    const budgetNum = Number(budget);
    const convsNum = Number(conversions);
    const cpcNum = Number(cpc);
    if (!budgetNum || !convsNum || !cpcNum) {
      return NextResponse.json({ error: "Geçersiz veri" }, { status: 400 });
    }
    const cpa = budgetNum / convsNum;
    const targetCpa = budgetNum * 0.1;
    const cpaScore = Math.min(40, Math.round((targetCpa / cpa) * 40));
    const ctrEstimate = (convsNum / (budgetNum / cpcNum)) * 100;
    const ctrScore = Math.min(30, Math.round(ctrEstimate * 3));
    const efficiencyScore = Math.min(30, Math.round((convsNum / budgetNum) * 30000));
    const score = Math.max(10, Math.min(100, cpaScore + ctrScore + efficiencyScore));

    let message = "";
    if (score >= 70) {
      message =
        "Kampanyanız iyi performans gösteriyor. Ölçekleme ve ROAS optimizasyonu için görüşelim.";
    } else if (score >= 40) {
      message =
        "Bütçenizin önemli bir kısmı optimize edilebilir. Ortalama %30-40 verimlilik artışı mümkün.";
    } else {
      message =
        "Kampanyanızda ciddi optimizasyon fırsatları var. Ücretsiz analiz görüşmesiyle başlayalım.";
    }

    // Yöneticiye bildirim
    const yoneticiResult = await resend.emails.send({
      from: process.env.RESEND_FROM!,
      to: process.env.RESEND_TO!,
      subject: `[Google Ads Scorecard] ${fullName} — Skor: ${score}/100`,
      html: `
        <h2>Yeni Google Ads Scorecard Başvurusu</h2>
        <p><strong>Ad:</strong> ${fullName}</p>
        <p><strong>E-posta:</strong> ${email}</p>
        <p><strong>Website:</strong> ${website || "—"}</p>
        <hr/>
        <p><strong>Aylık Bütçe:</strong> ${budgetNum.toLocaleString("tr-TR")} TL</p>
        <p><strong>Aylık Dönüşüm:</strong> ${convsNum}</p>
        <p><strong>Ortalama CPC:</strong> ${cpcNum} TL</p>
        <p><strong>CPA:</strong> ${Math.round(cpa)} TL</p>
        <hr/>
        <h3>Performans Skoru: ${score}/100</h3>
        <p>${message}</p>
      `,
    });
    console.log("[ads-scorecard] yönetici:", JSON.stringify(yoneticiResult));

    // Kullanıcıya otomatik yanıt
    const kullaniciResult = await resend.emails.send({
      from: process.env.RESEND_FROM!,
      to: email,
      replyTo: process.env.RESEND_TO!,
      subject: `Google Ads Performans Skorunuz: ${score}/100 | Premium Dijital`,
      html: `
        <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#050505;color:#fff;padding:40px;border-radius:16px;">
          <h1 style="font-size:24px;font-weight:900;margin-bottom:8px;">Merhaba ${fullName},</h1>
          <p style="color:#aaa;font-size:15px;margin-bottom:32px;">Google Ads performans analiziniz tamamlandı.</p>
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
    console.log("[ads-scorecard] kullanici:", JSON.stringify(kullaniciResult));

    return NextResponse.json({ success: true, score, message });
  } catch (err) {
    console.error("[ads-scorecard]", err);
    return NextResponse.json({ error: "Sunucu hatası oluştu." }, { status: 500 });
  }
}
