import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { allCaseStudies } from "@/components/sections/case-studies/case-study-data";
import ContactCTA from "@/components/sections/ContactCTA";

/* ─── Static params ─────────────────────────────────────────────────────── */

export async function generateStaticParams() {
  return allCaseStudies.map((cs) => ({ slug: cs.slug }));
}

/* ─── Metadata ──────────────────────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = allCaseStudies.find((c) => c.slug === slug);
  if (!cs) return {};
  return {
    title: `${cs.title} | Başarı Hikayeleri | Premium Dijital`,
    description: cs.summary,
  };
}

/* ─── Yardımcı bileşenler ───────────────────────────────────────────────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <p className="text-[11px] font-black uppercase tracking-[0.35em] text-white/30 shrink-0">
        {children}
      </p>
      <div className="h-px flex-1 bg-white/8" />
    </div>
  );
}

function Pill({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: "default" | "sector" | "service";
}) {
  const styles = {
    default: "border border-white/10 bg-white/5 text-white/60",
    sector: "border border-brand-purple/30 bg-brand-purple/8 text-purple-300",
    service: "border border-white/10 bg-white/[0.04] text-white/50",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1.5 text-[11px] font-semibold tracking-wide ${styles[variant]}`}
    >
      {children}
    </span>
  );
}

/* ─── Sektör atmosfer sistemi (heroImage yoksa fallback) ────────────────── */

const SECTOR_ATM: Record<
  string,
  {
    bg: string;
    glow: string;
    accent: string;
    symbol: string;
    gridColor: string;
  }
> = {
  "Sağlık & Medikal": {
    bg: "linear-gradient(135deg,rgba(16,185,129,0.14) 0%,rgba(4,60,40,0.22) 60%,rgba(190,41,236,0.06) 100%)",
    glow: "radial-gradient(circle at 25% 40%,rgba(16,185,129,0.2) 0%,transparent 55%), radial-gradient(circle at 75% 70%,rgba(52,211,153,0.12) 0%,transparent 40%)",
    accent: "#10b981",
    symbol: "✚",
    gridColor: "rgba(16,185,129,0.12)",
  },
  "Teknoloji & Kurumsal": {
    bg: "linear-gradient(135deg,rgba(99,102,241,0.14) 0%,rgba(20,18,60,0.22) 60%,rgba(0,0,200,0.1) 100%)",
    glow: "radial-gradient(circle at 70% 30%,rgba(99,102,241,0.2) 0%,transparent 50%), radial-gradient(circle at 20% 70%,rgba(139,92,246,0.12) 0%,transparent 40%)",
    accent: "#818cf8",
    symbol: "◈",
    gridColor: "rgba(99,102,241,0.1)",
  },
  "E-Ticaret / Moda": {
    bg: "linear-gradient(135deg,rgba(236,72,153,0.12) 0%,rgba(88,28,135,0.2) 60%,rgba(190,41,236,0.1) 100%)",
    glow: "radial-gradient(circle at 60% 25%,rgba(236,72,153,0.18) 0%,transparent 50%), radial-gradient(circle at 30% 70%,rgba(192,38,211,0.12) 0%,transparent 40%)",
    accent: "#f472b6",
    symbol: "◆",
    gridColor: "rgba(236,72,153,0.1)",
  },
  "Yazılım / SaaS": {
    bg: "linear-gradient(135deg,rgba(14,165,233,0.12) 0%,rgba(7,60,100,0.22) 60%,rgba(0,0,200,0.1) 100%)",
    glow: "radial-gradient(circle at 75% 35%,rgba(14,165,233,0.18) 0%,transparent 50%), radial-gradient(circle at 20% 65%,rgba(56,189,248,0.12) 0%,transparent 40%)",
    accent: "#38bdf8",
    symbol: "⬡",
    gridColor: "rgba(14,165,233,0.1)",
  },
  "Sanayi / Üretim": {
    bg: "linear-gradient(135deg,rgba(245,158,11,0.12) 0%,rgba(70,45,10,0.22) 60%,rgba(120,53,15,0.1) 100%)",
    glow: "radial-gradient(circle at 65% 30%,rgba(245,158,11,0.16) 0%,transparent 50%), radial-gradient(circle at 25% 68%,rgba(251,191,36,0.1) 0%,transparent 40%)",
    accent: "#f59e0b",
    symbol: "⬟",
    gridColor: "rgba(245,158,11,0.1)",
  },
  "Yerel Hizmet / Franchise": {
    bg: "linear-gradient(135deg,rgba(52,211,153,0.12) 0%,rgba(4,90,65,0.2) 60%,rgba(190,41,236,0.07) 100%)",
    glow: "radial-gradient(circle at 60% 30%,rgba(52,211,153,0.18) 0%,transparent 50%), radial-gradient(circle at 22% 68%,rgba(16,185,129,0.12) 0%,transparent 40%)",
    accent: "#34d399",
    symbol: "◎",
    gridColor: "rgba(52,211,153,0.1)",
  },
};

function getSectorAtm(sector: string) {
  return (
    SECTOR_ATM[sector] ?? {
      bg: "linear-gradient(135deg,rgba(190,41,236,0.1) 0%,rgba(0,0,200,0.12) 100%)",
      glow: "radial-gradient(circle at 60% 40%,rgba(190,41,236,0.15) 0%,transparent 55%)",
      accent: "#be29ec",
      symbol: "◇",
      gridColor: "rgba(190,41,236,0.1)",
    }
  );
}

/* ─── Sektöre göre varsayılan görsel ────────────────────────────────────── */
// Görsel yoksa: heroImage → sektör görseli → CSS atmosfer fallback
// Dosyaları /public/img/basari-hikayeleri/sektorler/ altına koy

const SECTOR_DEFAULT_IMAGE: Record<string, string> = {
  "Sağlık & Medikal": "/img/basari-hikayeleri/sektorler/saglik-medikal.webp",
  "Teknoloji & Kurumsal":
    "/img/basari-hikayeleri/sektorler/teknoloji-kurumsal.webp",
  "E-Ticaret / Moda": "/img/basari-hikayeleri/sektorler/e-ticaret-moda.webp",
  "Yazılım / SaaS": "/img/basari-hikayeleri/sektorler/yazilim-saas.webp",
  "Sanayi / Üretim": "/img/basari-hikayeleri/sektorler/sanayi-uretim.webp",
  "Yerel Hizmet / Franchise":
    "/img/basari-hikayeleri/sektorler/yerel-hizmet.webp",
};

function getSectorImage(sector: string): string | null {
  return SECTOR_DEFAULT_IMAGE[sector] ?? null;
}

/* ─── JSON-LD Schema ────────────────────────────────────────────────────── */

function ArticleSchema({
  cs,
}: {
  cs: NonNullable<ReturnType<typeof allCaseStudies.find>>;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: cs.title,
    description: cs.summary,
    url: `https://premiumdijital.com/basari-hikayeleri/${cs.slug}`,
    about: { "@type": "Thing", name: cs.sector },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/* ─── Ana sayfa ─────────────────────────────────────────────────────────── */

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = allCaseStudies.find((item) => item.slug === slug);
  if (!cs) notFound();

  const currentIndex = allCaseStudies.findIndex((c) => c.slug === slug);
  const nextCs = allCaseStudies[currentIndex + 1] ?? null;

  /* Problem verileri — yeni alandan veya mevcut alanlardan fallback */
  const problemHeadline = cs.problem?.headline ?? cs.story.problem;
  const problemBody = cs.problem?.body ?? cs.context.situation;
  const problemSignals = cs.problem?.signals ?? cs.highlights;

  /* Hizmet verileri */
  const packageName =
    cs.serviceDetail?.packageName ?? cs.serviceTags.join(" · ");
  const packageWhy = cs.serviceDetail?.why ?? cs.context.goal;
  const packageScope = cs.serviceDetail?.scope ?? cs.context.approach;

  /* Çözüm verileri */
  const solutionHeadline =
    cs.solution?.headline ??
    (cs.story.approach.length > 80
      ? cs.story.approach.slice(0, 80) + "..."
      : cs.story.approach);
  const solutionSteps = cs.solution?.steps ?? null;

  /* Sonuç verileri */
  const outcomeHeadline = cs.outcome?.headline ?? cs.story.results;
  const outcomeQuote = cs.outcome?.quote ?? cs.strategicNote;

  return (
    <>
      <ArticleSchema cs={cs} />

      <main className="relative min-h-screen bg-brand-dark text-white">
        {/* ── ① HERO ──────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden pt-32 pb-16 md:pb-20">
          {/* Arka plan parıltısı */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(190,41,236,0.08), transparent 60%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(190,41,236,0.3), transparent)",
            }}
          />

          <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
            {/* Hero görseli — fotoğraf varsa göster, yoksa sektöre göre CSS atmosfer */}
            {(() => {
              const atm = getSectorAtm(cs.sector);
              const gridId = `hero-grid-${cs.slug.slice(0, 6)}`;
              return (
                <div
                  className="relative mb-10 w-full overflow-hidden rounded-xl"
                  style={{ aspectRatio: "2 / 1" }}
                >
                  {" "}
                  {(() => {
                    // Öncelik: heroImage → sektör görseli → CSS atmosfer
                    const imgSrc = cs.heroImage ?? getSectorImage(cs.sector);
                    if (imgSrc) {
                      return (
                        <Image
                          src={imgSrc}
                          alt={cs.sector}
                          fill
                          className="object-cover opacity-85"
                          priority
                          sizes="(max-width: 768px) 100vw, 80vw"
                        />
                      );
                    }
                    return (
                      /* ── CSS atmosfer fallback ── */
                      <>
                        <div
                          className="absolute inset-0"
                          style={{ background: "#070707" }}
                        />
                        <div
                          className="absolute inset-0"
                          style={{ background: atm.bg }}
                        />
                        <div
                          className="absolute inset-0"
                          style={{ background: atm.glow }}
                        />
                        <svg
                          className="absolute inset-0 h-full w-full"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <defs>
                            <pattern
                              id={gridId}
                              width="32"
                              height="32"
                              patternUnits="userSpaceOnUse"
                            >
                              <path
                                d="M 32 0 L 0 0 0 32"
                                fill="none"
                                stroke={atm.gridColor}
                                strokeWidth="0.6"
                              />
                            </pattern>
                          </defs>
                          <rect
                            width="100%"
                            height="100%"
                            fill={`url(#${gridId})`}
                          />
                        </svg>
                        {/* Büyük dekoratif sembol */}
                        <div
                          aria-hidden
                          className="absolute right-10 top-1/2 -translate-y-1/2 select-none font-black leading-none"
                          style={{
                            fontSize: 160,
                            color: atm.accent,
                            opacity: 0.1,
                          }}
                        >
                          {atm.symbol}
                        </div>
                        {/* Sol accent çizgisi */}
                        <div
                          className="absolute left-0 top-0 h-full w-[3px]"
                          style={{
                            background: `linear-gradient(to bottom, transparent, ${atm.accent}60, transparent)`,
                          }}
                        />
                      </>
                    );
                  })()}
                  {/* Alt fade — içerikle geçiş */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to bottom, rgba(5,5,5,0.05) 0%, rgba(5,5,5,0.4) 60%, #050505 100%)",
                    }}
                  />
                  {/* Etiketler */}
                  <div className="absolute bottom-5 left-5 flex flex-wrap gap-2">
                    <span
                      className="inline-flex items-center rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] backdrop-blur-sm"
                      style={{
                        border: `1px solid ${atm.accent}40`,
                        background: "rgba(5,5,5,0.7)",
                        color: atm.accent,
                      }}
                    >
                      {cs.sector}
                    </span>
                    <span
                      className="inline-flex items-center rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] backdrop-blur-sm"
                      style={{
                        border: "1px solid rgba(255,255,255,0.12)",
                        background: "rgba(5,5,5,0.7)",
                        color: "rgba(255,255,255,0.45)",
                      }}
                    >
                      {cs.timeframeDays} Gün
                    </span>
                  </div>
                </div>
              );
            })()}

            {/* Breadcrumb */}
            <nav className="mb-8 flex items-center gap-2 text-[11px] font-medium text-white/30">
              <Link href="/" className="transition hover:text-white/60">
                Anasayfa
              </Link>
              <span>/</span>
              <Link
                href="/basari-hikayeleri"
                className="transition hover:text-white/60"
              >
                Başarı Hikayeleri
              </Link>
              <span>/</span>
              <span className="text-white/50 line-clamp-1">{cs.sector}</span>
            </nav>

            {/* Etiketler */}
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <Pill variant="sector">{cs.sector}</Pill>
              <Pill variant="default">{cs.timeframeDays} Gün</Pill>
              {cs.serviceTags.map((tag) => (
                <Pill key={tag} variant="service">
                  {tag}
                </Pill>
              ))}
            </div>

            {/* Başlık */}
            <h1 className="text-3xl font-black tracking-tight leading-[1.08] text-white/95 sm:text-4xl md:text-5xl">
              {cs.title}
            </h1>

            {/* Özet */}
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/55 italic md:text-lg">
              {cs.summary}
            </p>

            {/* Metrik strip */}
            <div
              className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/8"
              style={{
                gridTemplateColumns: `repeat(${cs.metrics.length}, 1fr)`,
                background: "rgba(255,255,255,0.04)",
              }}
            >
              {cs.metrics.map((m, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center gap-1.5 px-4 py-6 text-center"
                  style={{ background: "rgba(5,5,5,0.6)" }}
                >
                  <p
                    className="text-3xl font-black tracking-tighter sm:text-4xl"
                    style={{
                      background: "linear-gradient(90deg,#be29ec,#0000c8)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {m.value}
                  </p>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ② PROBLEM ───────────────────────────────────────────────────── */}
        <section className="border-t border-white/6 py-16 md:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <SectionLabel>Problem</SectionLabel>

            <h2 className="text-2xl font-black tracking-tight text-white/90 sm:text-3xl md:text-4xl max-w-3xl">
              {problemHeadline}
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/55">
              {problemBody}
            </p>

            {problemSignals && problemSignals.length > 0 && (
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {problemSignals.map((signal, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/[0.04] p-4"
                  >
                    <span className="mt-0.5 shrink-0 text-base leading-none text-red-400/60">
                      ⚠
                    </span>
                    <span className="text-sm leading-relaxed text-white/60">
                      {signal}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* ── ③ HİZMET ────────────────────────────────────────────────────── */}
        <section className="border-t border-white/6 py-16 md:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <SectionLabel>Ne Aldılar?</SectionLabel>

            <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-start lg:gap-16">
              <div>
                <h2 className="text-2xl font-black tracking-tight text-white/90 sm:text-3xl">
                  {packageName}
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/50 italic">
                  {packageWhy}
                </p>

                {packageScope && packageScope.length > 0 && (
                  <ul className="mt-8 space-y-3">
                    {packageScope.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span
                          className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                          style={{
                            background: "rgba(0,0,200,0.15)",
                            border: "1px solid rgba(0,0,200,0.25)",
                          }}
                        >
                          <svg
                            className="h-3 w-3"
                            fill="none"
                            viewBox="0 0 12 12"
                            style={{ color: "rgba(100,100,255,0.8)" }}
                          >
                            <path
                              d="M2 6l3 3 5-5"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        <span className="text-sm leading-relaxed text-white/65">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Servis tag'leri */}
              <div className="flex flex-wrap gap-2 lg:flex-col lg:items-end">
                {cs.serviceTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2 text-xs font-semibold text-white/40"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── ④ ÇÖZÜM ─────────────────────────────────────────────────────── */}
        <section className="border-t border-white/6 py-16 md:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <SectionLabel>Nasıl Çözdük?</SectionLabel>

            <h2 className="text-2xl font-black tracking-tight text-white/90 sm:text-3xl max-w-3xl">
              {solutionHeadline}
            </h2>

            {solutionSteps && solutionSteps.length > 0 ? (
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {solutionSteps.map((step, i) => (
                  <div
                    key={i}
                    className="relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02] p-6"
                  >
                    {/* Watermark numara */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -right-2 -top-4 select-none text-[80px] font-black leading-none text-white"
                      style={{ opacity: 0.04 }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="relative z-10">
                      <div className="mb-3 flex items-center gap-2.5">
                        <span
                          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-black"
                          style={{
                            background:
                              "linear-gradient(135deg,rgba(190,41,236,0.15),rgba(0,0,200,0.15))",
                            border: "1px solid rgba(190,41,236,0.2)",
                            color: "#be29ec",
                          }}
                        >
                          {i + 1}
                        </span>
                        <h3 className="text-sm font-black text-white/85 uppercase tracking-wide">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-sm leading-relaxed text-white/50">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {cs.context.approach.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-4 rounded-2xl border border-white/8 bg-white/[0.02] p-5"
                  >
                    <span
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-black"
                      style={{
                        background: "rgba(0,0,200,0.15)",
                        border: "1px solid rgba(0,0,200,0.2)",
                        color: "rgba(100,100,255,0.8)",
                      }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-sm leading-relaxed text-white/60">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {/* Uygulama notu */}
            {cs.story.execution && (
              <p className="mt-8 max-w-2xl text-sm leading-relaxed text-white/35 italic border-l border-white/10 pl-4">
                {cs.story.execution}
              </p>
            )}
          </div>
        </section>

        {/* ── ⑤ SONUÇ ─────────────────────────────────────────────────────── */}
        <section className="border-t border-white/6 py-16 md:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <SectionLabel>Sonuç</SectionLabel>

            <h2 className="text-2xl font-black tracking-tight text-white/90 sm:text-3xl md:text-4xl max-w-3xl">
              {outcomeHeadline}
            </h2>

            {/* Büyük metrik kartlar */}
            <div
              className="mt-10 grid gap-4"
              style={{
                gridTemplateColumns: `repeat(${Math.min(cs.metrics.length, 3)}, 1fr)`,
              }}
            >
              {cs.metrics.map((m, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden rounded-2xl border border-white/8 p-6 text-center"
                  style={{ background: "rgba(190,41,236,0.04)" }}
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-[inherit]"
                    style={{
                      background:
                        i === 0
                          ? "radial-gradient(circle at 50% 0%, rgba(190,41,236,0.1), transparent 60%)"
                          : "radial-gradient(circle at 50% 0%, rgba(0,0,200,0.08), transparent 60%)",
                    }}
                  />
                  <p
                    className="relative text-5xl font-black tracking-tighter sm:text-6xl"
                    style={{
                      background: "linear-gradient(90deg,#be29ec,#0000c8)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {m.value}
                  </p>
                  <p className="relative mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Alıntı */}
            {outcomeQuote && (
              <div className="mt-10 border-l-2 border-brand-purple/25 pl-6">
                <p className="text-base leading-relaxed text-white/40 italic">
                  "{outcomeQuote}"
                </p>
                <p className="mt-3 text-[10px] font-black uppercase tracking-[0.22em] text-white/20">
                  Premium Dijital
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ── Navigasyon ──────────────────────────────────────────────────── */}
        <div className="border-t border-white/6 py-10">
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 sm:px-6">
            <Link
              href="/basari-hikayeleri"
              className="group flex items-center gap-2 text-sm font-bold text-white/40 transition hover:text-white"
            >
              <span className="transition-transform group-hover:-translate-x-0.5">
                ←
              </span>
              Tüm başarı hikayelerine dön
            </Link>

            {nextCs && (
              <Link
                href={`/basari-hikayeleri/${nextCs.slug}`}
                className="group flex items-center gap-2 text-sm font-bold text-white/40 transition hover:text-white"
              >
                <span className="text-[10px] uppercase tracking-[0.15em] text-white/25">
                  Sonraki hikaye
                </span>
                <span className="max-w-[200px] truncate text-right">
                  {nextCs.home.title}
                </span>
                <span className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
            )}
          </div>
        </div>

        {/* ── ⑥ CTA ───────────────────────────────────────────────────────── */}
        <ContactCTA context="genel" id="iletisim" />
      </main>
    </>
  );
}
