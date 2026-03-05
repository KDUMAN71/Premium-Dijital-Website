import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/", // Eğer admin panelin varsa buraya ekleyebilirsin
    },
    sitemap: "https://premiumdijital.com/sitemap.xml",
  };
}
