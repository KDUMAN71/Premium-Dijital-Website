import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, BookOpen } from "lucide-react";
import type { BlogPostMeta, BlogCategory } from "@/lib/blog/mdx";

const CATEGORY_ACCENT: Record<BlogCategory, string> = {
  "Web & SEO": "text-brand-purple",
  "PPC & Reklam": "text-brand-blue",
  Operasyon: "text-white/60",
  Marka: "text-brand-purple/70",
};

interface SmartRelatedPostsProps {
  posts: BlogPostMeta[];
}

export default function SmartRelatedPosts({ posts }: SmartRelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section
      className="mt-20 pt-12 border-t border-white/5"
      aria-label="İlgili yazılar"
    >
      {/* Başlık */}
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.35em] text-white/20">
            Okuma Listesi
          </p>
          <h2 className="text-lg font-bold text-white tracking-tight">
            Bu konuyu derinleştirin
          </h2>
        </div>
        <Link
          href="/blog"
          className="flex shrink-0 items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-white/30 hover:text-brand-purple transition-colors"
        >
          Tümünü gör
          <ArrowRight size={11} />
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block"
            data-cta="related-post"
            data-post={post.slug}
          >
            <article className="relative h-full flex flex-col rounded-2xl border border-white/5 bg-white/[0.025] overflow-hidden hover:border-brand-purple/20 hover:bg-white/[0.04] transition-all duration-300">
              {/* Görsel */}
              <div className="relative aspect-video w-full overflow-hidden bg-[#0a0a0c] shrink-0">
                {post.image ? (
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover opacity-65 group-hover:opacity-85 group-hover:scale-105 transition-all duration-700"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BookOpen size={28} className="text-white/10" strokeWidth={1} />
                  </div>
                )}
                {/* Hover glow overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-brand-purple/10 to-transparent" />
              </div>

              {/* İçerik */}
              <div className="p-5 flex-1 flex flex-col gap-3">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-white/30">
                  <span className={CATEGORY_ACCENT[post.category] ?? "text-white/40"}>
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={10} />
                    {post.readTime} dk
                  </span>
                </div>

                <h3 className="text-sm font-semibold text-white leading-snug line-clamp-2 group-hover:text-brand-purple transition-colors duration-200">
                  {post.title}
                </h3>

                <p className="text-xs text-white/40 leading-relaxed line-clamp-2 flex-1">
                  {post.excerpt}
                </p>

                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-white/25 group-hover:text-brand-purple transition-colors mt-1">
                  Okumaya devam et
                  <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
