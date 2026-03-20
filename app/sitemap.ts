import { MetadataRoute } from "next";
import { homeCaseStudies } from "@/components/sections/case-studies/case-study-data";
import { getAllPosts } from "@/lib/blog/mdx";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://premiumdijital.com";

  // Ana sayfalar
  const routes = [
    "",
    "/blog",
    "/basari-hikayeleri",
    "/iletisim",
    "/hakkimizda",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.9,
  }));

  // Dinamik blog yazıları
  const blogUrls = getAllPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Dinamik başarı hikayeleri
  const caseStudyUrls = homeCaseStudies.map((study) => ({
    url: `${baseUrl}/basari-hikayeleri/${study.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...routes, ...blogUrls, ...caseStudyUrls];
}
