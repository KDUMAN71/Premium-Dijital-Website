import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, BookOpen } from "lucide-react";
import type { BlogPostMeta, BlogCategory } from "@/lib/blog/mdx";
import { formatTurkishDate } from "@/lib/blog/mdx";

// Kategori renk eşlemesi
const CATEGORY_ACCENT: Record<BlogCategory, string> = {
  "Web & SEO": "text-brand-purple",
  "PPC & Reklam": "text-brand-blue",
  Operasyon: "text-white/60",
  Marka: "text-brand-purple/70",
};

interface RelatedPostsProps {
  posts: BlogPostMeta[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section
      className="mt-20 pt-12 border-t border-white/5"
      aria-label="İlgili yazılar"
    >
      <p className="mb-8 text-[10px] uppercase tracking-[0.3em] text-white/25">
        İlgili Yazılar
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block"
          >
            <article className="relative h-full flex flex-col rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden hover:border-white/10 transition-all duration-300">
              {/* Görsel */}
              <div className="relative aspect-video w-full overflow-hidden bg-[#0a0a0c]">
                {post.image ? (
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BookOpen
                      size={28}
                      className="text-white/10"
                      strokeWidth={1}
                    />
                  </div>
                )}
              </div>

              {/* İçerik */}
              <div className="p-5 flex-1 flex flex-col gap-3">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-white/30">
                  <span
                    className={
                      CATEGORY_ACCENT[post.category] ?? "text-white/40"
                    }
                  >
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={10} />
                    {post.readTime} dk
                  </span>
                </div>

                <h3 className="text-sm font-semibold text-white leading-snug line-clamp-2 group-hover:text-brand-blue transition-colors duration-200">
                  {post.title}
                </h3>

                <p className="text-xs text-white/40 leading-relaxed line-clamp-2 flex-1">
                  {post.excerpt}
                </p>

                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-white/30 group-hover:text-brand-purple transition-colors mt-1">
                  Oku
                  <ArrowRight
                    size={11}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
