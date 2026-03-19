"use client";

import { BlogPost } from "@/data/blogPosts";
import {
  Clock,
  Calendar,
  ArrowLeft,
  ChevronRight,
  ArrowRight,
  BookOpen,
} from "lucide-react";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";

/* ───────────────────────────── */

export default function BlogPostTemplate({ post }: { post: BlogPost }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <div className="bg-[#050505] text-white">
      {/* progress bar */}

      <motion.div
        className="fixed top-[80px] left-0 right-0 z-50 h-[2px] origin-left"
        style={{
          scaleX,
          background: "linear-gradient(90deg,#be29ec,#0000c8)",
        }}
      />

      {/* HERO */}

      <section className="pt-28 pb-16">
        <div className="mx-auto max-w-[760px] px-6">
          {/* breadcrumb */}

          <nav className="mb-10 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/30">
            <Link
              href="/blog"
              className="flex items-center gap-2 hover:text-white"
            >
              <ArrowLeft size={12} />
              Blog
            </Link>

            <ChevronRight size={10} />

            <span className="text-brand-purple">{post.category}</span>
          </nav>

          {/* meta */}

          <div className="mb-6 flex flex-wrap gap-6 text-[11px] uppercase tracking-widest text-white/40">
            <span className="flex items-center gap-2">
              <Calendar size={13} />
              {post.date}
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

          {/* title */}

          <h1 className="text-[34px] md:text-[48px] font-bold leading-[1.15] tracking-tight mb-8">
            {post.title}
          </h1>

          {/* excerpt */}

          <p className="text-[20px] leading-relaxed text-white/55 border-l border-brand-purple/30 pl-6 italic mb-12">
            {post.excerpt}
          </p>
        </div>

        {/* hero image */}

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
              />
            </div>
          </div>
        )}
      </section>

      {/* CONTENT */}

      <section className="mx-auto max-w-[1100px] px-6 pb-28">
        <div className="grid gap-20 lg:grid-cols-[minmax(0,720px)_280px]">
          {/* ARTICLE */}

          <article
            className="blog-article prose prose-invert prose-zinc 
      max-w-[720px] mx-auto lg:mx-0

      /* Paragraf Ayarları */
      prose-p:text-[18px]
      prose-p:leading-[1.8]
      prose-p:text-zinc-100
      prose-p:mb-8
      prose-p:text-justify

      /* Başlık Ayarları */
      prose-h2:text-3xl
      prose-h2:font-bold
      prose-h2:mt-16
      prose-h2:mb-6
      prose-h2:text-white
      prose-h2:tracking-tight

      pro-h3:text-2xl
      prose-h3:font-semibold
      prose-h3:mt-12
      prose-h3:mb-4
      prose-h3:text-zinc-100

      /* Liste Ayarları (4. Madde Çözümü) */
      prose-ul:list-disc
      prose-ul:pl-6
      prose-ul:my-8
      prose-ul:text-zinc-300
      prose-li:my-2
      prose-li:marker:text-brand-purple

      /* Alıntı Ayarları */
      prose-blockquote:border-l-brand-purple
      prose-blockquote:bg-white/[0.02]
      prose-blockquote:px-8
      prose-blockquote:py-6
      prose-blockquote:rounded-r-2xl
      prose-blockquote:not-italic
      prose-blockquote:text-zinc-400

      /* Görsel Ayarları (3. Madde Çözümü) */
      prose-img:rounded-2xl
      prose-img:my-20
      prose-img:border
      prose-img:border-white/5
      prose-img:shadow-2xl

      /* Link Ayarları */
      prose-a:text-brand-blue
      prose-a:no-underline
      hover:prose-a:underline
      "
            dangerouslySetInnerHTML={{ __html: post.content }}
            itemProp="articleBody"
          />

          {/* SIDEBAR */}

          <aside className="hidden lg:block w-[280px]">
            <div className="sticky top-28 space-y-6">
              {/* info */}

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
                    <span className="text-white/70">{post.date}</span>
                  </div>
                </div>
              </div>

              {/* CTA */}

              <div className="rounded-2xl p-6 border border-brand-purple/20 bg-gradient-to-br from-brand-purple/20 to-brand-blue/20">
                <h4 className="text-lg font-bold mb-2">
                  Bu stratejiyi işletmenize uygulayalım
                </h4>

                <p className="text-sm text-white/50 mb-5">
                  30 dakikalık ücretsiz analiz görüşmesinde bu stratejiyi
                  markanıza nasıl uygulayabileceğimizi konuşalım.
                </p>

                <Link
                  href="/iletisim"
                  className="flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-xs font-bold uppercase tracking-widest text-white"
                  style={{
                    background: "linear-gradient(90deg,#be29ec,#0000c8)",
                  }}
                >
                  Ücretsiz Görüşme
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
