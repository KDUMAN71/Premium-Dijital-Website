import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type BlogCategory = "Web & SEO" | "PPC & Reklam" | "Operasyon" | "Marka";

export interface BlogPostFrontmatter {
  title: string;
  excerpt: string;
  date: string; // ISO: "YYYY-MM-DD"
  category: BlogCategory;
  image?: string;
  metaDescription: string;
  relatedService: string;
  author: string;
  authorRole: string;
  tags?: string[];
  faq?: Array<{ question: string; answer: string }>;
  serviceSlug?: string; // /hizmetler/[slug] — bağlantılı hizmet sayfası
}

export interface BlogPostMeta extends BlogPostFrontmatter {
  slug: string;
  readTime: number; // dakika
}

export interface BlogPost extends BlogPostMeta {
  content: string; // raw MDX string
}

const CONTENT_DIR = path.join(process.cwd(), "content/blog");

function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

export function formatTurkishDate(isoDate: string): string {
  const months = [
    "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık",
  ];
  const [year, month, day] = isoDate.split("-").map(Number);
  return `${day} ${months[month - 1]} ${year}`;
}

export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));

  return files
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf-8");
      const { data, content } = matter(raw);
      const frontmatter = data as BlogPostFrontmatter;

      return {
        ...frontmatter,
        slug,
        readTime: calculateReadTime(content),
      };
    })
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const frontmatter = data as BlogPostFrontmatter;

  return {
    ...frontmatter,
    slug,
    readTime: calculateReadTime(content),
    content,
  };
}
