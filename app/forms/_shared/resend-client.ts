import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export function escapeHtml(input: string): string {
  return (input ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function row(label: string, value?: string | null) {
  if (!value) return "";
  return `<tr>
    <td style="padding:8px 12px;font-weight:700;color:#6b7280;width:160px;white-space:nowrap;vertical-align:top">${label}</td>
    <td style="padding:8px 12px;color:#111">${escapeHtml(value)}</td>
  </tr>`;
}

export function badge(text: string, bg: string, color: string) {
  return `<span style="display:inline-block;background:${bg};color:${color};font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;padding:4px 12px;border-radius:999px;margin-right:8px;margin-bottom:6px">${escapeHtml(text)}</span>`;
}

export function emailShell(
  subject: string,
  badgesHtml: string,
  tableRowsHtml: string,
) {
  return `<!DOCTYPE html>
<html lang="tr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:ui-sans-serif,system-ui,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08)">
        <tr>
          <td style="background:linear-gradient(90deg,#be29ec,#0000c8);padding:24px 32px">
            <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.6)">Premium Dijital</p>
            <h1 style="margin:4px 0 0;font-size:20px;font-weight:800;color:#fff">${subject}</h1>
          </td>
        </tr>
        ${badgesHtml ? `<tr><td style="padding:20px 32px 0">${badgesHtml}</td></tr>` : ""}
        <tr>
          <td style="padding:20px 32px 28px">
            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid #e5e7eb;border-radius:10px;overflow:hidden">
              ${tableRowsHtml}
            </table>
          </td>
        </tr>
        <tr>
          <td style="background:#f9fafb;padding:16px 32px;border-top:1px solid #e5e7eb">
            <p style="margin:0;font-size:11px;color:#9ca3af">Bu e-posta premiumdijital.com başvuru formu aracılığıyla gönderilmiştir.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
