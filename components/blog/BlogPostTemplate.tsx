import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, BookOpen, ChevronRight } from "lucide-react";

import type { BlogPost } from "@/lib/blog/mdx";
import type { BlogPostMeta } from "@/lib/blog/mdx";
import { formatTurkishDate } from "@/lib/blog/mdx";
import { extractToc } from "@/lib/blog/toc";
import { buildArticleSchema, buildBreadcrumbSchema, buildFaqSchema } from "@/lib/blog/schema";
import { getCtaForCategory } from "@/lib/blog/cta-config";
import { getMdxComponents } from "./mdx-components";
import TableOfContents from "./TableOfContents";
import ShareButtons from "./ShareButtons";
import BlogCTA from "./BlogCTA";
import ReadingProgress from "./ReadingProgress";
import EarlyConversionBlock from "./EarlyConversionBlock";
import FinalConversionBlock from "./FinalConversionBlock";
import SmartRelatedPosts from "./SmartRelatedPosts";
import StickyConversionBar from "./StickyConversionBar";

interface BlogPostTemplateProps {
  post: BlogPost;
  relatedPosts: BlogPostMeta[];
}

export default function BlogPostTemplate({
  post,
  relatedPosts,
}: BlogPostTemplateProps) {
  const toc = extractToc(post.content);
  const articleSchema = buildArticleSchema(post);
  const breadcrumbSchema = buildBreadcrumbSchema(post);
  const ctaConfig = getCtaForCategory(post.category);
  const displayDate = formatTurkishDate(post.date);

  return (
    <div className="bg-[#050505] text-white">
      {/* Okuma ilerleme çubuğu */}
      <ReadingProgress />

      {/* JSON-LD: Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {/* JSON-LD: Breadcrumb */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* JSON-LD: FAQ (varsa) */}
      {post.faq && post.faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildFaqSchema(post.faq)),
          }}
        />
      )}

      {/* ── HERO ── */}
      <section
        className="pt-28 pb-8"
        itemScope
        itemType="https://schema.org/Article"
      >
        <div className="mx-auto max-w-[760px] px-6">
          {/* Breadcrumb */}
          <nav
            className="mb-10 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/30"
            aria-label="Breadcrumb"
          >
            <Link
              href="/blog"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <ArrowLeft size={12} />
              Blog
            </Link>
            <ChevronRight size={10} />
            <span className="text-brand-purple" itemProp="articleSection">
              {post.category}
            </span>
          </nav>

          {/* Meta */}
          <div className="mb-6 flex flex-wrap gap-6 text-[11px] uppercase tracking-widest text-white/40">
            <span className="flex items-center gap-2">
              <Calendar size={13} />
              <time dateTime={post.date} itemProp="datePublished">
                {displayDate}
              </time>
            </span>
            <span className="flex items-center gap-2">
              <Clock size={13} />
              {post.readTime} dk okuma
            </span>
            <span className="flex items-center gap-2">
              <BookOpen size={13} />
              {post.category}
            </span>
          </div>

          {/* Başlık */}
          <h1
            className="text-[34px] md:text-[46px] font-bold leading-[1.15] tracking-tight mb-8"
            itemProp="headline"
          >
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-[19px] leading-relaxed text-white/55 border-l border-brand-purple/30 pl-6 italic mb-12">
            {post.excerpt}
          </p>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/5 text-[10px] font-medium text-white/40 uppercase tracking-widest"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Early Conversion Block — hero görseli öncesi */}
        <EarlyConversionBlock
          ctaConfig={ctaConfig}
          category={post.category}
          slug={post.slug}
        />

        {/* Hero görseli */}
        {post.image && (
          <div className="mx-auto max-w-[1100px] px-6">
            <div className="relative aspect-[21/9] overflow-hidden rounded-2xl border border-white/5">
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1100px) 100vw, 1100px"
                itemProp="image"
              />
            </div>
          </div>
        )}
      </section>

      {/* ── İÇERİK + SIDEBAR ── */}
      <section className="mx-auto max-w-[1100px] px-6 pb-16">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,720px)_280px]">
          {/* MAKALE */}
          <article itemProp="articleBody">
            <MDXRemote
              source={post.content}
              components={getMdxComponents(ctaConfig)}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [rehypeSlug],
                },
              }}
            />

            {/* İlgili Yazılar */}
            <SmartRelatedPosts posts={relatedPosts} />

            {/* Makale sonu — güçlü conversion bloğu */}
            <FinalConversionBlock
              ctaConfig={ctaConfig}
              category={post.category}
              slug={post.slug}
            />
          </article>

          {/* SIDEBAR */}
          <aside
            className="hidden lg:block w-[280px]"
            aria-label="Makale kenar çubuğu"
          >
            <div className="sticky top-28 space-y-5">
              {/* Makale bilgisi */}
              <div className="rounded-2xl border border-white/6 bg-white/[0.02] p-6">
                <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-white/25">
                  Makale Bilgisi
                </p>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/40">Kategori</span>
                    <span className="text-brand-purple font-semibold">
                      {post.category}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">Okuma</span>
                    <span className="text-white/70">{post.readTime} dk</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">Tarih</span>
                    <span className="text-white/70">{displayDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">Yazar</span>
                    <span className="text-white/70 text-right text-xs max-w-[120px]">
                      {post.author}
                    </span>
                  </div>
                </div>
              </div>

              {/* İçindekiler */}
              {toc.length > 0 && <TableOfContents entries={toc} />}

              {/* Kategori bazlı CTA */}
              <BlogCTA config={ctaConfig} />

              {/* Paylaş */}
              <ShareButtons title={post.title} slug={post.slug} />
            </div>
          </aside>
        </div>
      </section>

      {/* Mobil CTA + Paylaş */}
      <section className="lg:hidden mx-auto max-w-[760px] px-6 pb-16">
        <BlogCTA config={ctaConfig} />
        <div className="mt-4">
          <ShareButtons title={post.title} slug={post.slug} />
        </div>
      </section>

      {/* Sticky Conversion Bar — scroll tetiklemeli */}
      <StickyConversionBar
        ctaConfig={ctaConfig}
        category={post.category}
        slug={post.slug}
      />
    </div>
  );
}
