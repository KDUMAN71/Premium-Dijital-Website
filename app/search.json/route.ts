import { buildSearchIndex } from "@/lib/blog/search";

/**
 * Build-time statik arama indeksi.
 * Frontend'den fetch("/search.json") ile kullanılabilir.
 * force-static → build sırasında pre-render edilir, runtime FS erişimi yok.
 */
export const dynamic = "force-static";
export const revalidate = false;

export function GET() {
  const index = buildSearchIndex();
  return Response.json(index, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
