// app/api/oauth/callback/[provider]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { exchangeCodeForTokens } from "@/lib/oauth/google";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ provider: string }> },
) {
  const { provider } = await params;
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state"); // tool value: ga4 | search_console | google_ads
  const error = searchParams.get("error");

  const sendToParent = (
    type: string,
    extra: Record<string, string> = {},
  ) => {
    const payload = JSON.stringify({ type, tool: state ?? "", ...extra });
    return new NextResponse(
      `<!DOCTYPE html><html><body><script>
        try {
          window.opener?.postMessage(${payload}, ${JSON.stringify(origin)});
        } catch(e) {}
        window.close();
      </script></body></html>`,
      { headers: { "Content-Type": "text/html" } },
    );
  };

  // Hata durumu
  if (error || !code || !state) {
    return sendToParent("OAUTH_ERROR", { reason: error ?? "missing_code" });
  }

  // Sadece Google destekleniyor (şimdilik)
  if (provider !== "google") {
    return sendToParent("OAUTH_ERROR", { reason: "unsupported_provider" });
  }

  try {
    const redirectUri = `${origin}/api/oauth/callback/${provider}`;
    const tokens = await exchangeCodeForTokens(code, redirectUri);

    const response = sendToParent("OAUTH_SUCCESS", {
      token: tokens.access_token,
    });

    // Refresh token varsa httpOnly cookie'ye ekle (30 gün)
    if (tokens.refresh_token) {
      response.cookies.set(`oauth_refresh_${state}`, tokens.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });
    }

    // Access token geçici cookie'ye (expires_in süresi)
    response.cookies.set(`oauth_access_${state}`, tokens.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: tokens.expires_in ?? 3600,
      path: "/",
    });

    return response;
  } catch (err) {
    console.error("[OAuth Callback] Token exchange error:", err);
    return sendToParent("OAUTH_ERROR", { reason: "token_exchange_failed" });
  }
}
