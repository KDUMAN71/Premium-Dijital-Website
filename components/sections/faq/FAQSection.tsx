import Link from "next/link";

export type FAQItem = { q: string; a: string };

function toPlainText(htmlOrText: string) {
  return htmlOrText.replace(/<[^>]*>/g, "").trim();
}

export default function FAQSection({
  id = "sss",
  title,
  accent = "purple",
  items,
  ctaHref = "/iletisim",
  ctaLabel = "Hemen Analiz Al →",
}: {
  id?: string;
  title: string;
  accent?: "blue" | "purple";
  items: FAQItem[];
  ctaHref?: string;
  ctaLabel?: string;
}) {
  const accentClass =
    accent === "blue" ? "text-brand-blue" : "text-brand-purple";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: toPlainText(f.q),
      acceptedAnswer: {
        "@type": "Answer",
        text: toPlainText(f.a),
      },
    })),
  };

  const [titleBefore, titleAfter] = title.includes("{accent}")
    ? title.split("{accent}")
    : [title, ""];

  return (
    <section
      id={id}
      className="relative z-10 mx-auto max-w-4xl border-t border-white/5 px-4 py-14 sm:px-5 sm:py-18 md:px-6 md:py-24"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <h2 className="mb-10 text-center text-3xl font-bold uppercase tracking-tighter sm:mb-12 sm:text-4xl md:mb-16 md:text-5xl">
        {titleBefore}
        <span className={accentClass}>{titleAfter}</span>
      </h2>

      <div className="space-y-4 sm:space-y-5 md:space-y-6">
        {items.map((faq, i) => (
          <details
            key={i}
            className="group rounded-2xl border border-white/10 bg-white/5 p-1.5 transition-all hover:bg-white/[0.08] sm:p-2"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 text-base font-bold leading-snug sm:p-5 sm:text-lg md:p-6 md:text-xl">
              <span>{faq.q}</span>
              <span
                className={`${accentClass} shrink-0 text-lg transition-all group-open:rotate-180 sm:text-xl`}
              >
                ↓
              </span>
            </summary>

            <div className="mt-1 border-t border-white/5 px-4 pt-4 pb-4 leading-relaxed text-gray-300 sm:px-5 sm:pt-5 sm:pb-5 md:px-6 md:pt-5">
              <div className="text-sm sm:text-[15px] md:text-base">{faq.a}</div>

              <div className="mt-5 sm:mt-6">
                <Link
                  href={ctaHref}
                  className="shimmer-effect inline-flex items-center justify-center overflow-hidden rounded-full border border-brand-blue/50 bg-brand-blue/30 px-6 py-3 text-[11px] font-bold uppercase text-white transition hover:border-brand-blue/70 hover:bg-brand-blue/40 hover:shadow-[0_0_30px_rgba(0,0,200,0.25)] sm:px-8 sm:text-xs"
                >
                  {ctaLabel}
                </Link>
              </div>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
