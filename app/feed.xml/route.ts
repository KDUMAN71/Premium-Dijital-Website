import { generateRssFeed } from "@/lib/blog/rss";

export const dynamic = "force-static";
export const revalidate = false;

export function GET() {
  const xml = generateRssFeed();
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
