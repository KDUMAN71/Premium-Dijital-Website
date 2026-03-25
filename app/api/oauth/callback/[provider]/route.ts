import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ provider: string }> },
) {
  const { provider } = await params;
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state"); // tool.value (ga4, search_console, vb.)
  const error = searchParams.get("error");
  const origin = request.nextUrl.origin;

  // Başarısız OAuth
  if (error || !code) {
    return new NextResponse(
      `<!DOCTYPE html><html><body><script>
        window.opener?.postMessage({ type: "OAUTH_ERROR", tool: "${state ?? ""}" }, "${origin}");
        window.close();
      </script></body></html>`,
      { headers: { "Content-Type": "text/html" } },
    );
  }

  // TODO (Faz 2): Burada code → access_token exchange yapılır
  // Gerçek implementasyonda:
  //   const token = await exchangeCodeForToken(code, provider, state);
  //   Sonra session veya database'e kaydedilir
  void provider; // kullanılmayan parametre lint suppress

  return new NextResponse(
    `<!DOCTYPE html><html><body><script>
      window.opener?.postMessage({
        type: "OAUTH_SUCCESS",
        tool: "${state ?? ""}",
        token: "connected_${Date.now()}"
      }, "${origin}");
      window.close();
    </script></body></html>`,
    { headers: { "Content-Type": "text/html" } },
  );
}
