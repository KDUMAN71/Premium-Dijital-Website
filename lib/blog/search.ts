import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getAllPosts } from "./mdx";
import { extractToc } from "./toc";

export interface SearchIndexEntry {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  /** h2 + h3 başlık metinleri — arama ve içerik keşfi için */
  headings: string[];
}

const CONTENT_DIR = path.join(process.cwd(), "content/blog");

/**
 * Tüm blog yazılarından aranabilir indeks üretir.
 * Build-time route handler veya script tarafından çağrılır.
 */
export function buildSearchIndex(): SearchIndexEntry[] {
  const posts = getAllPosts();

  return posts.map((post) => {
    const filePath = path.join(CONTENT_DIR, `${post.slug}.mdx`);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { content } = matter(raw);
    const toc = extractToc(content);

    return {
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      category: post.category,
      tags: post.tags ?? [],
      headings: toc.map((entry) => entry.text),
    };
  });
}
