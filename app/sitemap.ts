import { MetadataRoute } from "next";
import { homeCaseStudies } from "@/components/sections/case-studies/case-study-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://premiumdijital.com"; // Kendi domaininle değiştir

  // Dinamik Vaka Çalışmaları URL'leri
  const caseStudyUrls = homeCaseStudies.map((study) => ({
    url: `${baseUrl}/vaka-calismalari/${study.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Ana Sayfalar
  const routes = ["", "/vaka-calismalari"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 1.0,
  }));

  return [...routes, ...caseStudyUrls];
}
