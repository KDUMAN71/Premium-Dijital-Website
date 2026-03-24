import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/app/forms/_shared/resend-client";
import { addToAudience } from "@/app/forms/_shared/audience";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, company, phone, email, score, scoreLabel, leaks, answers } =
      body;

    /* ── Validasyon ─────────────────────────────────────────────────── */
    if (!name || !company || !email) {
      return NextResponse.json(
        { error: "Ad, şirket ve e-posta zorunludur." },
        { status: 400 },
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Geçerli bir e-posta adresi girin." },
        { status: 400 },
      );
    }

    const scoreColor =
      score >= 75
        ? "#ef4444"
        : score >= 45
          ? "#f59e0b"
          : score >= 20
            ? "#3b82f6"
            : "#22c55e";

    const answersHtml = Array.isArray(answers)
      ? answers
          .map(
            (a: { question: string; answer: string }) => `
          <tr>
            <td style="padding:8px 12px;color:#9ca3af;font-size:13px;border-bottom:1px solid #1f2937">${a.question}</td>
            <td style="padding:8px 12px;color:#f3f4f6;font-size:13px;font-weight:600;border-bottom:1px solid #1f2937">${a.answer}</td>
          </tr>`,
          )
          .join("")
      : "";

    /* ── İç bildirim e-postası (analiz@premiumdijital.com'a) ──────── */
    await resend.emails.send({
      from:
        process.env.RESEND_FROM ??
        "Premium Dijital <noreply@premiumdijital.com>",
      to: process.env.RESEND_TO ?? "analiz@premiumdijital.com",
      subject: `Yeni Sistem Skoru Lead — ${company} (%${score} Entropi)`,
      html: `
        <div style="font-family:Arial,sans-serif;background:#0a0a12;color:#f3f4f6;padding:32px;border-radius:12px;max-width:600px">
          <div style="border-bottom:1px solid #1f2937;padding-bottom:20px;margin-bottom:24px">
            <h1 style="font-size:22px;font-weight:800;color:#ffffff;margin:0">
              Yeni Sistem Skoru Başvurusu
            </h1>
            <p style="color:#6b7280;margin:6px 0 0;font-size:14px">Dijital Operasyon sayfasından gelen lead</p>
          </div>

          <!-- Kişi Bilgileri -->
          <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
            <tr>
              <td style="padding:8px 12px;color:#9ca3af;font-size:13px;width:140px;border-bottom:1px solid #1f2937">Ad Soyad</td>
              <td style="padding:8px 12px;color:#f3f4f6;font-size:13px;font-weight:600;border-bottom:1px solid #1f2937">${name}</td>
            </tr>
            <tr>
              <td style="padding:8px 12px;color:#9ca3af;font-size:13px;border-bottom:1px solid #1f2937">Şirket</td>
              <td style="padding:8px 12px;color:#f3f4f6;font-size:13px;font-weight:600;border-bottom:1px solid #1f2937">${company}</td>
            </tr>
            <tr>
              <td style="padding:8px 12px;color:#9ca3af;font-size:13px;border-bottom:1px solid #1f2937">E-posta</td>
              <td style="padding:8px 12px;font-size:13px;border-bottom:1px solid #1f2937">
                <a href="mailto:${email}" style="color:#a78bfa">${email}</a>
              </td>
            </tr>
            ${
              phone
                ? `
            <tr>
              <td style="padding:8px 12px;color:#9ca3af;font-size:13px;border-bottom:1px solid #1f2937">Telefon</td>
              <td style="padding:8px 12px;font-size:13px;border-bottom:1px solid #1f2937">
                <a href="tel:${phone}" style="color:#a78bfa">${phone}</a>
              </td>
            </tr>`
                : ""
            }
          </table>

          <!-- Entropi Skoru -->
          <div style="background:#111827;border:1px solid #1f2937;border-radius:10px;padding:20px;margin-bottom:24px;text-align:center">
            <p style="color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:2px;margin:0 0 8px">Dijital Entropi Skoru</p>
            <p style="font-size:48px;font-weight:900;color:${scoreColor};margin:0;font-family:monospace">%${score}</p>
            <p style="color:${scoreColor};font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin:6px 0 0">${scoreLabel}</p>
            <p style="color:#6b7280;font-size:13px;margin:8px 0 0">${leaks} kritik sızıntı tespit edildi</p>
          </div>

          <!-- Cevaplar -->
          ${
            answersHtml
              ? `
          <h3 style="color:#9ca3af;font-size:13px;text-transform:uppercase;letter-spacing:1.5px;margin:0 0 12px">Teşhis Cevapları</h3>
          <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
            ${answersHtml}
          </table>`
              : ""
          }

          <!-- CTA -->
          <div style="text-align:center;padding-top:16px;border-top:1px solid #1f2937">
            <a href="mailto:${email}?subject=Premium Dijital — Dijital Operasyon Analiziniz&body=Merhaba ${name},"
              style="display:inline-block;background:linear-gradient(135deg,#be29ec,#0000c8);color:#ffffff;padding:14px 32px;border-radius:50px;font-weight:800;font-size:14px;text-decoration:none;letter-spacing:1px">
              ${name}'e Yanıt Ver
            </a>
          </div>
        </div>
      `,
    });

    /* ── Müşteriye otomatik onay e-postası ───────────────────────── */
    await resend.emails.send({
      from:
        process.env.RESEND_FROM ??
        "Premium Dijital <noreply@premiumdijital.com>",
      to: email,
      subject: "Premium Dijital — Dijital Operasyon Analiziniz Alındı",
      html: `
        <div style="font-family:Arial,sans-serif;background:#0a0a12;color:#f3f4f6;padding:32px;border-radius:12px;max-width:600px">
          <div style="margin-bottom:28px">
            <h1 style="font-size:22px;font-weight:800;color:#ffffff;margin:0 0 8px">
              Merhaba ${name},
            </h1>
            <p style="color:#6b7280;font-size:15px;margin:0">
              Başvurunuz başarıyla alındı. En geç 1 iş günü içinde size dönüş yapacağız.
            </p>
          </div>

          <!-- Skor özeti -->
          <div style="background:#111827;border:1px solid #1f2937;border-left:4px solid ${scoreColor};border-radius:10px;padding:20px;margin-bottom:24px">
            <p style="color:#9ca3af;font-size:12px;text-transform:uppercase;letter-spacing:2px;margin:0 0 6px">Dijital Entropi Skorunuz</p>
            <p style="font-size:36px;font-weight:900;color:${scoreColor};margin:0;font-family:monospace">%${score}</p>
            <p style="color:${scoreColor};font-size:13px;font-weight:700;margin:4px 0 0">${scoreLabel} — ${leaks} kritik sızıntı</p>
          </div>

          <p style="color:#9ca3af;font-size:14px;line-height:1.7;margin:0 0 24px">
            <strong style="color:#f3f4f6">${company}</strong> için özel bir dijital operasyon analizi hazırlıyoruz.
            Mevcut sisteminizi, tespit edilen sızıntıları ve somut aksiyon adımlarını içeren rapor
            kısa süre içinde bu adrese gönderilecek.
          </p>

          <div style="border-top:1px solid #1f2937;padding-top:20px;color:#6b7280;font-size:13px">
            <p style="margin:0">Sorularınız için: <a href="mailto:analiz@premiumdijital.com" style="color:#a78bfa">analiz@premiumdijital.com</a></p>
            <p style="margin:6px 0 0">— Premium Dijital Ekibi</p>
          </div>
        </div>
      `,
    });

    /* ── Resend Audience — contact ekle ─────────────────────────── */
    await addToAudience(email, name);

    /* ── Google Sheets webhook ───────────────────────────────────── */
    if (process.env.SHEETS_WEBHOOK_URL) {
      await fetch(process.env.SHEETS_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          source: "dijital-operasyon-sistem-skoru",
          name,
          company,
          phone: phone || "",
          email,
          score,
          scoreLabel,
          leaks,
          answers: Array.isArray(answers)
            ? answers
                .map(
                  (a: { question: string; answer: string }) =>
                    `${a.question}: ${a.answer}`,
                )
                .join(" | ")
            : "",
        }),
      }).catch(() => {
        // Sheets webhook başarısız olsa bile ana akışı durdurmaz
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Sistem skoru API hatası:", err);
    return NextResponse.json(
      { error: "Gönderim başarısız. Lütfen tekrar deneyin." },
      { status: 500 },
    );
  }
}
