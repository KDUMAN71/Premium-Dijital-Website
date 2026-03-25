// app/api/oauth/data/route.ts

import { NextRequest, NextResponse } from "next/server";
import {
  fetchGA4Properties,
  fetchGA4Metrics,
  fetchSearchConsoleData,
} from "@/lib/oauth/google";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      tools: string[];
      siteUrl?: string;
    };
    const { tools, siteUrl } = body;

    const result: Record<string, unknown> = {};

    // GA4 verisi
    if (tools.includes("ga4")) {
      const accessToken = request.cookies.get("oauth_access_ga4")?.value;
      if (accessToken) {
        const propertyId = await fetchGA4Properties(accessToken);
        if (propertyId) {
          result.ga4 = await fetchGA4Metrics(accessToken, propertyId);
          result.ga4PropertyId = propertyId;
        } else {
          result.ga4Error = "property_not_found";
        }
      } else {
        result.ga4Error = "not_connected";
      }
    }

    // Search Console verisi
    if (tools.includes("search_console") && siteUrl) {
      const accessToken = request.cookies.get(
        "oauth_access_search_console",
      )?.value;
      if (accessToken) {
        result.searchConsole = await fetchSearchConsoleData(
          accessToken,
          siteUrl,
        );
      } else {
        result.searchConsoleError = "not_connected";
      }
    }

    return NextResponse.json({ success: true, data: result });
  } catch (err) {
    console.error("[OAuth Data] Error:", err);
    return NextResponse.json(
      { success: false, error: "data_fetch_failed" },
      { status: 500 },
    );
  }
}
