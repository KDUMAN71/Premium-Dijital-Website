// lib/oauth/google.ts
// Google OAuth token exchange ve API veri çekme yardımcıları

const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";

export interface GoogleTokens {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  token_type: string;
  scope: string;
}

/**
 * Authorization code'u access_token + refresh_token ile değiştirir.
 * Sadece server-side çağrılmalı.
 */
export async function exchangeCodeForTokens(
  code: string,
  redirectUri: string,
): Promise<GoogleTokens> {
  const response = await fetch(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Token exchange failed: ${error}`);
  }

  return response.json() as Promise<GoogleTokens>;
}

/**
 * GA4 Property ID'yi token ile çeker (ilk erişilebilen property).
 */
export async function fetchGA4Properties(
  accessToken: string,
): Promise<string | null> {
  try {
    const response = await fetch(
      "https://analyticsadmin.googleapis.com/v1alpha/accounts",
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );
    if (!response.ok) return null;
    const data = (await response.json()) as {
      accounts?: Array<{ name: string }>;
    };
    const accountId = data.accounts?.[0]?.name?.split("/")[1];
    if (!accountId) return null;

    const propResponse = await fetch(
      `https://analyticsadmin.googleapis.com/v1alpha/properties?filter=parent:accounts/${accountId}`,
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );
    if (!propResponse.ok) return null;
    const propData = (await propResponse.json()) as {
      properties?: Array<{ name: string }>;
    };
    return propData.properties?.[0]?.name ?? null;
  } catch {
    return null;
  }
}

/**
 * GA4'ten son 30 günün temel metriklerini çeker.
 */
export async function fetchGA4Metrics(
  accessToken: string,
  propertyId: string,
): Promise<{
  sessions: number;
  bounceRate: number;
  avgSessionDuration: number;
  topSources: Array<{ source: string; sessions: number }>;
} | null> {
  try {
    const propertyNum = propertyId.replace("properties/", "");
    const response = await fetch(
      `https://analyticsdata.googleapis.com/v1beta/properties/${propertyNum}:runReport`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
          dimensions: [{ name: "sessionDefaultChannelGroup" }],
          metrics: [
            { name: "sessions" },
            { name: "bounceRate" },
            { name: "averageSessionDuration" },
          ],
          limit: 5,
        }),
      },
    );

    if (!response.ok) return null;
    const data = (await response.json()) as {
      rows?: Array<{
        dimensionValues: Array<{ value: string }>;
        metricValues: Array<{ value: string }>;
      }>;
    };

    let totalSessions = 0;
    let totalBounceRate = 0;
    let totalDuration = 0;
    const topSources: Array<{ source: string; sessions: number }> = [];

    data.rows?.forEach((row) => {
      const sessions = parseInt(row.metricValues[0].value, 10);
      totalSessions += sessions;
      totalBounceRate += parseFloat(row.metricValues[1].value) * sessions;
      totalDuration += parseFloat(row.metricValues[2].value) * sessions;
      topSources.push({ source: row.dimensionValues[0].value, sessions });
    });

    return {
      sessions: totalSessions,
      bounceRate:
        totalSessions > 0 ? (totalBounceRate / totalSessions) * 100 : 0,
      avgSessionDuration:
        totalSessions > 0 ? totalDuration / totalSessions : 0,
      topSources: topSources
        .sort((a, b) => b.sessions - a.sessions)
        .slice(0, 4),
    };
  } catch {
    return null;
  }
}

/**
 * Search Console'dan son 90 günün top keyword ve tıklama verilerini çeker.
 */
export async function fetchSearchConsoleData(
  accessToken: string,
  siteUrl: string,
): Promise<{
  totalClicks: number;
  totalImpressions: number;
  avgCtr: number;
  avgPosition: number;
  topKeywords: Array<{
    keyword: string;
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
  }>;
} | null> {
  try {
    const encodedUrl = encodeURIComponent(siteUrl);
    const startDate = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];
    const endDate = new Date().toISOString().split("T")[0];

    const response = await fetch(
      `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodedUrl}/searchAnalytics/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          startDate,
          endDate,
          dimensions: ["query"],
          rowLimit: 10,
          startRow: 0,
        }),
      },
    );

    if (!response.ok) return null;
    const data = (await response.json()) as {
      rows?: Array<{
        keys: string[];
        clicks: number;
        impressions: number;
        ctr: number;
        position: number;
      }>;
    };

    const rows = data.rows ?? [];
    const totalClicks = rows.reduce((s, r) => s + r.clicks, 0);
    const totalImpressions = rows.reduce((s, r) => s + r.impressions, 0);
    const avgCtr = totalClicks / (totalImpressions || 1);
    const avgPosition =
      rows.length > 0
        ? rows.reduce((s, r) => s + r.position, 0) / rows.length
        : 0;

    return {
      totalClicks,
      totalImpressions,
      avgCtr: avgCtr * 100,
      avgPosition,
      topKeywords: rows.slice(0, 8).map((r) => ({
        keyword: r.keys[0],
        clicks: r.clicks,
        impressions: r.impressions,
        ctr: r.ctr * 100,
        position: r.position,
      })),
    };
  } catch {
    return null;
  }
}
