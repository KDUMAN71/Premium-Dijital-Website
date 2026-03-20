import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getAllPosts, getPostBySlug } from "@/lib/blog/mdx";
import { getRelatedPosts } from "@/lib/blog/related";
import BlogPostTemplate from "@/components/blog/BlogPostTemplate";

interface Props {
  params: Promise<{ slug: string }>;
}

const BASE_URL = "https://premiumdijital.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) return { title: "Yazı Bulunamadı | Premium Dijital" };

  return {
    title: `${post.title} | Premium Dijital Blog`,
    description: post.metaDescription,
    keywords: post.tags,
    alternates: {
      canonical: `${BASE_URL}/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      images: [post.image ?? "/img/og-default.webp"],
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription,
      images: [post.image ?? "/img/og-default.webp"],
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const relatedPosts = getRelatedPosts(post);

  return <BlogPostTemplate post={post} relatedPosts={relatedPosts} />;
}
