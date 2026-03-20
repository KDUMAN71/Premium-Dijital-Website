import { getAllPosts } from "@/lib/blog/mdx";
import BlogListClient from "@/components/blog/BlogListClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Premium Dijital",
  description:
    "Dijital büyüme yolculuğunda rehberlik edecek teknik incelemeler ve stratejik yaklaşımlar.",
  alternates: {
    canonical: "https://premiumdijital.com/blog",
  },
  openGraph: {
    title: "Dijital Strateji ve Analiz Kütüphanesi | Premium Dijital Blog",
    description:
      "Dijital büyüme yolculuğunda rehberlik edecek teknik incelemeler ve stratejik yaklaşımlar.",
    type: "website",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  return <BlogListClient posts={posts} />;
}
