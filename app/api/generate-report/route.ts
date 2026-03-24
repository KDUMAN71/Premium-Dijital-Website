import { NextRequest, NextResponse } from "next/server";
import { generatePdf } from "@/lib/pdf/generate-pdf";
import { generateClientReportHtml } from "@/lib/pdf/templates/client-report";
import { generateInternalReportHtml } from "@/lib/pdf/templates/internal-report";
import type { AnalysisData } from "@/types/analysis";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { data, type } = body as { data: AnalysisData; type: "client" | "internal" };

    if (!data || !type) {
      return NextResponse.json({ error: "data ve type zorunlu" }, { status: 400 });
    }

    const html =
      type === "internal"
        ? generateInternalReportHtml(data)
        : generateClientReportHtml(data);

    const pdf = await generatePdf(html);

    const filename =
      type === "internal"
        ? `ic-rapor-${data.reportId.replace(/\//g, "-")}.pdf`
        : `analiz-raporu-${data.clientName.replace(/\s+/g, "-")}-${data.reportDate.replace(/\s+/g, "-")}.pdf`;

    return new NextResponse(new Uint8Array(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("[generate-report] PDF oluşturma hatası:", err);
    return NextResponse.json(
      { error: "PDF oluşturulamadı", detail: String(err) },
      { status: 500 },
    );
  }
}
