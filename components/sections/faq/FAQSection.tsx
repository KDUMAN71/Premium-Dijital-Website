import Link from "next/link";

export type FAQItem = { q: string; a: string };

function toPlainText(htmlOrText: string) {
  // Biz HTML kullanmıyoruz ama ileride kullanırsan minimum temizlik.
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

  return (
    <section
      id={id}
      className="relative z-10 py-32 px-6 border-t border-white/5 max-w-4xl mx-auto"
    >
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center uppercase tracking-tighter">
        {title.split("{accent}")[0]}
        <span className={accentClass}>
          {title.includes("{accent}") ? title.split("{accent}")[1] : ""}
        </span>
      </h2>

      <div className="space-y-6">
        {items.map((faq, i) => (
          <details
            key={i}
            className="group border border-white/10 rounded-2xl bg-white/5 p-2 hover:bg-white/[0.08] transition-all"
          >
            <summary className="p-6 cursor-pointer font-bold text-xl flex justify-between items-center list-none">
              {faq.q}
              <span
                className={`${accentClass} group-open:rotate-180 transition-all`}
              >
                ↓
              </span>
            </summary>

            <div className="p-6 pt-0 text-gray-300 border-t border-white/5 mt-2 leading-relaxed">
              {faq.a}

              <div className="mt-6">
                <Link
                  href={ctaHref}
                  className="shimmer-effect inline-flex items-center justify-center cursor-pointer select-none
                             bg-brand-blue/30 text-white border border-brand-blue/50
                             px-8 py-3 rounded-full text-xs font-bold uppercase relative overflow-hidden
                             hover:bg-brand-blue/40 hover:border-brand-blue/70 hover:shadow-[0_0_30px_rgba(0,0,200,0.25)]
                             transition"
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
