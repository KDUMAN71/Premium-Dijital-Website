import { BlogPostMeta, getAllPosts } from "./mdx";

/**
 * Bir yazıya en yakın ilgili yazıları döndürür.
 * Sıralama: etiket örtüşmesi (×3) + kategori eşleşmesi (×2) + tarih (tie-break).
 */
export function getRelatedPosts(
  current: BlogPostMeta,
  limit = 3
): BlogPostMeta[] {
  const all = getAllPosts().filter((p) => p.slug !== current.slug);
  const currentTags = new Set(current.tags ?? []);

  const scored = all.map((post) => {
    let score = 0;

    // Aynı kategori
    if (post.category === current.category) score += 2;

    // Etiket örtüşmesi — her eşleşen etiket +3 puan
    for (const tag of post.tags ?? []) {
      if (currentTags.has(tag)) score += 3;
    }

    return { post, score };
  });

  return scored
    .sort(
      (a, b) =>
        b.score - a.score ||
        new Date(b.post.date).getTime() - new Date(a.post.date).getTime()
    )
    .slice(0, limit)
    .map(({ post }) => post);
}
