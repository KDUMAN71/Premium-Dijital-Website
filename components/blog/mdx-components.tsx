import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { MDXComponents } from "mdx/types";
import RelatedAnalysis from "./RelatedAnalysis";
import InlineCTA from "./InlineCTA";
import { slugify } from "@/lib/blog/toc";
import type { CtaConfig } from "@/lib/blog/cta-config";

// ── Yardımcı: React children → düz metin ──────────────────────────────────────
function childrenToText(children: React.ReactNode): string {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }
  if (Array.isArray(children)) {
    return children.map(childrenToText).join("");
  }
  if (React.isValidElement(children)) {
    return childrenToText(
      (children.props as { children?: React.ReactNode }).children
    );
  }
  return "";
}

// ── Figure (görsel + opsiyonel caption) ─────────────────────────────────────

interface FigureProps {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
}

function Figure({ src, alt, caption, priority = false }: FigureProps) {
  if (process.env.NODE_ENV !== "production" && !alt) {
    console.warn(`[Blog] Figure bileşeni 'alt' prop gerektiriyor: ${src}`);
  }
  return (
    <figure className="not-prose my-12">
      <div className="relative overflow-hidden rounded-2xl border border-white/5">
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={630}
          priority={priority}
          className="w-full h-auto object-cover"
          sizes="(max-width: 480px) 100vw, (max-width: 768px) 100vw, 720px"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-[11px] italic text-white/35">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// ── Anchor heading (h2, h3) ───────────────────────────────────────────────────
// ID'ler Türkçe karakterlere duyarlı özel slugify ile üretilir →
// toc.ts ile tam uyumluluk (rehype-slug ID'si override edilir)

function HeadingAnchor({ id }: { id: string }) {
  return (
    <a
      href={`#${id}`}
      aria-hidden="true"
      tabIndex={-1}
      className="anchor-link absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-40 transition-opacity text-brand-purple no-underline text-base select-none"
    >
      #
    </a>
  );
}

// ── getMdxComponents ──────────────────────────────────────────────────────────

export function getMdxComponents(ctaConfig?: CtaConfig): MDXComponents {
  // İlk görsel için priority tracking (LCP optimizasyonu)
  let isFirstImage = true;

  return {
    // ── Custom bileşenler ─────────────────────────────────────────────────
    Figure,
    RelatedAnalysis,
    InlineCTA: () => <InlineCTA config={ctaConfig} />,

    // ── img → Next.js Image ────────────────────────────────────────────────
    img: ({ src, alt, ...props }) => {
      if (!src) return null;

      if (process.env.NODE_ENV !== "production" && !alt) {
        console.warn(
          `[Blog] Görsel 'alt' attribute eksik — SEO ve erişilebilirlik için zorunlu: ${src}`
        );
      }

      const priority = isFirstImage;
      isFirstImage = false;

      return (
        <span className="not-prose block my-12">
          <span className="relative block overflow-hidden rounded-2xl border border-white/5">
            <Image
              src={src as string}
              alt={alt ?? ""}
              width={1200}
              height={630}
              priority={priority}
              className="w-full h-auto object-cover"
              sizes="(max-width: 480px) 100vw, (max-width: 768px) 100vw, 720px"
              {...(props as object)}
            />
          </span>
        </span>
      );
    },

    // ── Bağlantılar ────────────────────────────────────────────────────────
    a: ({ href, children, ...props }) => {
      // Anchor link (#id) — başlık bağlantıları için
      if (href?.startsWith("#")) {
        return (
          <a href={href} className="anchor-ref" {...props}>
            {children}
          </a>
        );
      }
      const isInternal = href?.startsWith("/");
      if (isInternal) {
        return (
          <Link
            href={href}
            className="text-brand-blue no-underline hover:underline"
            {...props}
          >
            {children}
          </Link>
        );
      }
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-blue no-underline hover:underline"
          {...props}
        >
          {children}
        </a>
      );
    },

    // ── Blockquote ──────────────────────────────────────────────────────────
    blockquote: ({ children }) => (
      <blockquote className="not-prose my-10 border-l-2 border-brand-purple/50 bg-white/[0.02] px-8 py-6 rounded-r-2xl">
        <div className="text-[17px] leading-[1.75] text-white/60 italic">
          {children}
        </div>
      </blockquote>
    ),

    // ── H2 — Türkçe-duyarlı ID, hover anchor ───────────────────────────────
    h2: ({ children }) => {
      const text = childrenToText(children);
      const id = slugify(text);
      return (
        <h2
          id={id}
          className="group relative mt-16 mb-6 scroll-mt-28 text-3xl font-bold tracking-tight text-white"
        >
          <HeadingAnchor id={id} />
          {children}
        </h2>
      );
    },

    // ── H3 — Türkçe-duyarlı ID, hover anchor ───────────────────────────────
    h3: ({ children }) => {
      const text = childrenToText(children);
      const id = slugify(text);
      return (
        <h3
          id={id}
          className="group relative mt-12 mb-4 scroll-mt-28 text-2xl font-semibold text-zinc-100"
        >
          <HeadingAnchor id={id} />
          {children}
        </h3>
      );
    },

    // ── Paragraf ────────────────────────────────────────────────────────────
    p: ({ children }) => (
      <p className="mb-8 text-[18px] leading-[1.85] text-zinc-100 text-justify">
        {children}
      </p>
    ),

    // ── Listeler ────────────────────────────────────────────────────────────
    ul: ({ children }) => (
      <ul className="my-8 list-disc pl-6 text-zinc-300 space-y-2 text-[17px] leading-[1.8]">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="my-8 list-decimal pl-6 text-zinc-300 space-y-2 text-[17px] leading-[1.8]">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="marker:text-brand-purple">{children}</li>
    ),

    // ── Inline ─────────────────────────────────────────────────────────────
    strong: ({ children }) => (
      <strong className="font-semibold text-white">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-white/80">{children}</em>
    ),

    // ── Kod ────────────────────────────────────────────────────────────────
    code: ({ children }) => (
      <code className="rounded-md bg-white/[0.06] px-1.5 py-0.5 text-[14px] font-mono text-brand-purple/90">
        {children}
      </code>
    ),

    // ── Yatay çizgi ────────────────────────────────────────────────────────
    hr: () => (
      <hr className="my-16 border-0 border-t border-white/8" />
    ),
  };
}
