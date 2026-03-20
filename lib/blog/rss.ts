import { getAllPosts } from "./mdx";

const BASE_URL = "https://premiumdijital.com";

export function generateRssFeed(): string {
  const posts = getAllPosts();

  const items = posts
    .map((post) => {
      const url = `${BASE_URL}/blog/${post.slug}`;
      const pubDate = new Date(post.date).toUTCString();
      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${pubDate}</pubDate>
      <category><![CDATA[${post.category}]]></category>
      ${post.image ? `<enclosure url="${BASE_URL}${post.image}" type="image/webp" length="0" />` : ""}
    </item>`.trim();
    })
    .join("\n    ");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Premium Dijital Blog</title>
    <link>${BASE_URL}/blog</link>
    <description>Dijital büyüme yolculuğunda rehberlik edecek teknik incelemeler ve stratejik yaklaşımlar.</description>
    <language>tr-TR</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;
}
