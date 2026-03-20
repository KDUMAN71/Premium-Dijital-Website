import { BlogPostMeta } from "./mdx";

const BASE_URL = "https://premiumdijital.com";

export function buildArticleSchema(post: BlogPostMeta) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    image: post.image
      ? `${BASE_URL}${post.image}`
      : `${BASE_URL}/img/og-default.webp`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author,
      jobTitle: post.authorRole,
    },
    publisher: {
      "@type": "Organization",
      name: "Premium Dijital",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/img/logo.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${post.slug}`,
    },
    keywords: post.tags?.join(", ") ?? post.category,
    articleSection: post.category,
    inLanguage: "tr-TR",
    timeRequired: `PT${post.readTime}M`,
  };
}

// ── FAQ Schema ──────────────────────────────────────────────────────────────

export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Post frontmatter'da `faq` alanı varsa FAQPage schema üretir.
 * Google'ın arama sonuçlarında accordion rich snippet göstermesini sağlar.
 */
export function buildFaqSchema(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// ── HowTo Schema ─────────────────────────────────────────────────────────────

export interface HowToStep {
  name: string;
  text: string;
}

/**
 * Adım adım içerik için HowTo schema.
 * SEO'da "featured snippet" ve rich result fırsatı.
 */
export function buildHowToSchema(
  name: string,
  description: string,
  steps: HowToStep[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

// ── Breadcrumb ────────────────────────────────────────────────────────────────

export function buildBreadcrumbSchema(post: BlogPostMeta) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Ana Sayfa",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${BASE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${BASE_URL}/blog/${post.slug}`,
      },
    ],
  };
}
