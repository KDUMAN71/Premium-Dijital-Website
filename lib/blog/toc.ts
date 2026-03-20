export interface TocEntry {
  id: string;
  text: string;
  level: 2 | 3;
}

/**
 * MDX içeriğinden h2 ve h3 başlıklarını çıkarır.
 * rehype-slug ile üretilen id'ler ile uyumlu slugification kullanır.
 */
export function extractToc(content: string): TocEntry[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const toc: TocEntry[] = [];

  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length as 2 | 3;
    const raw = match[2].trim();
    // JSX/MDX tag'larını temizle
    const text = raw.replace(/<[^>]+>/g, "").trim();
    const id = slugify(text);
    toc.push({ id, text, level });
  }

  return toc;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
