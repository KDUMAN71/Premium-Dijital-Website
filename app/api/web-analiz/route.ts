import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/app/forms/_shared/resend-client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      mevcutSite,
      siteAmaci,
      mevcutDurum,
      butce,
      fullName,
      email,
      company_honey,
    } = body;

    // Honeypot
    if (company_honey)
      return NextResponse.json({ error: "Invalid" }, { status: 400 });

    // Temel validasyon
    if (!siteAmaci || !mevcutDurum || !butce || !fullName || !email) {
      return NextResponse.json(
        { error: "Eksik form verisi." },
        { status: 400 },
      );
    }

    // Yöneticiye bildirim
    const yoneticiResult = await resend.emails.send({
      from: process.env.RESEND_FROM!,
      to: process.env.RESEND_TO!,
      subject: `[Web Tasarım Analiz] ${fullName} — ${siteAmaci} / ${mevcutDurum}`,
      html: `
        <h2>Yeni Web Tasarım Analiz Talebi</h2>
        <p><strong>Ad Soyad:</strong> ${fullName}</p>
        <p><strong>E-posta:</strong> ${email}</p>
        <p><strong>Mevcut Site:</strong> ${mevcutSite || "—"}</p>
        <hr/>
        <p><strong>Site Amacı:</strong> ${siteAmaci}</p>
        <p><strong>Mevcut Durum:</strong> ${mevcutDurum}</p>
        <p><strong>Bütçe Aralığı:</strong> ${butce}</p>
        <hr/>
        <p style="color:#999;font-size:12px;">premium-digital-web · web-analiz form</p>
      `,
    });
    console.log("[web-analiz] yönetici:", JSON.stringify(yoneticiResult));

    // Kullanıcıya otomatik yanıt
    const kullaniciResult = await resend.emails.send({
      from: process.env.RESEND_FROM!,
      to: email,
      replyTo: process.env.RESEND_TO!,
      subject: "Web Site Analiziniz Yolda | Premium Dijital",
      html: `
        <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#050505;color:#fff;padding:40px;border-radius:16px;">
          <h1 style="font-size:24px;font-weight:900;margin-bottom:8px;">Merhaba ${fullName},</h1>
          <p style="color:#aaa;font-size:15px;margin-bottom:32px;">
            Talebinizi aldık. ${siteAmaci} odaklı web site analizi ve öneri raporunuzu hazırlıyoruz.
          </p>
          <div style="background:#111;border:1px solid #333;border-radius:12px;padding:24px;margin-bottom:32px;">
            <p style="color:#BE29EC;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:2px;margin-bottom:8px;">Talebiniz</p>
            <p style="color:#fff;font-size:14px;margin:4px 0;"><strong>Site Amacı:</strong> ${siteAmaci}</p>
            <p style="color:#fff;font-size:14px;margin:4px 0;"><strong>Mevcut Durum:</strong> ${mevcutDurum}</p>
            <p style="color:#fff;font-size:14px;margin:4px 0;"><strong>Bütçe Aralığı:</strong> ${butce}</p>
            ${mevcutSite ? `<p style="color:#fff;font-size:14px;margin:4px 0;"><strong>Mevcut Site:</strong> ${mevcutSite}</p>` : ""}
          </div>
          <p style="color:#ccc;font-size:14px;line-height:1.7;margin-bottom:24px;">
            Teknik analiz ve öneri raporunuz <strong>1 iş günü içinde</strong> e-posta adresinize gönderilecek.
          </p>
          <p style="color:#aaa;font-size:13px;">
            Sorularınız için doğrudan bu e-postaya yanıt verebilirsiniz.
          </p>
          <div style="margin-top:32px;padding-top:24px;border-top:1px solid #222;color:#666;font-size:11px;">
            Premium Dijital Reklam Ajansı · premiumdijital.com
          </div>
        </div>
      `,
    });
    console.log("[web-analiz] kullanici:", JSON.stringify(kullaniciResult));

    return NextResponse.json({
      success: true,
      message: `${siteAmaci} odaklı site analiz ve öneri raporunuz 1 iş günü içinde e-posta adresinize gönderilecek.`,
    });
  } catch (err) {
    console.error("[web-analiz]", err);
    return NextResponse.json(
      { error: "Sunucu hatası oluştu." },
      { status: 500 },
    );
  }
}
