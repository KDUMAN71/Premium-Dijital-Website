import { blogPosts } from "@/data/blogPosts";
import BlogPostTemplate from "@/components/templates/BlogPostTemplate";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>; // Params artık bir Promise'dir
}

/**
 * SEO METADATA ÜRETİMİ
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // HATA DÜZELTME: params await edilmelidir
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return { title: "Yazı Bulunamadı | Premium Dijital" };

  return {
    title: `${post.title} | Premium Dijital Blog`,
    description: post.metaDescription,
    alternates: {
      canonical: `https://premiumdijital.com/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      // Eğer post.image yoksa varsayılan bir OG görseli (logo gibi) kullan:
      images: [post.image || "/img/og-default.webp"],
      type: "article",
    },
  };
}

/**
 * STATIC PARAMS (SSG)
 */
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

/**
 * ANA SAYFA BİLEŞENİ
 */
export default async function BlogPostPage({ params }: Props) {
  // HATA DÜZELTME: params await edilmelidir
  const { slug } = await params;

  // Veriden ilgili yazıyı bul
  const post = blogPosts.find((p) => p.slug === slug);

  // Eğer yazı yoksa 404 sayfasına yönlendir
  if (!post) {
    notFound();
  }

  // Yazıyı şablona göndererek render et
  return <BlogPostTemplate post={post} />;
}
