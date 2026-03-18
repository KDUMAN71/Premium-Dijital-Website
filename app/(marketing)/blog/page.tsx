"use client";

import { useState, useMemo } from "react";
import { blogPosts, BlogPost } from "@/data/blogPosts"; // BlogPost arayüzünü de içe aktar
import {
  Clock,
  ArrowRight,
  BookOpen,
  Search,
  Calendar,
  ChevronLeft,
  ChevronRight,
  X,
  Code,
  MousePointerClick,
  Settings,
  Crown,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// STRATEJİK YARDIMCI: Kategoriye göre Fallback SVG ve Renk ataması
const FallbackImage = ({ category }: { category: BlogPost["category"] }) => {
  const categoryUpper = category.toUpperCase();

  const configs: Record<string, { gradient: string; icon: React.ReactNode }> = {
    "WEB & SEO": {
      gradient: "from-[#1a1a1c] via-brand-purple/10 to-[#020204]",
      icon: <Code className="w-16 h-16 text-brand-purple" strokeWidth={1} />,
    },
    "PPC & REKLAM": {
      gradient: "from-[#1a1a1c] via-brand-blue/10 to-[#020204]",
      icon: (
        <MousePointerClick
          className="w-16 h-16 text-brand-blue"
          strokeWidth={1}
        />
      ),
    },
    OPERASYON: {
      gradient: "from-[#1a1a1c] via-white/5 to-[#020204]",
      icon: <Settings className="w-16 h-16 text-white/40" strokeWidth={1} />,
    },
    MARKA: {
      gradient: "from-[#1a1a1c] via-brand-purple/5 to-[#020204]",
      icon: (
        <Crown className="w-16 h-16 text-brand-purple/60" strokeWidth={1} />
      ),
    },
    // Standart fallback (Hata önleme)
    DEFAULT: {
      gradient: "from-[#1a1a1c] to-[#020204]",
      icon: <BookOpen className="w-16 h-16 text-white/20" strokeWidth={1} />,
    },
  };

  const config = configs[categoryUpper] || configs.DEFAULT;

  return (
    <div
      className={`relative h-full w-full rounded-2xl bg-gradient-to-br ${config.gradient} flex items-center justify-center border border-white/5`}
    >
      {/* İkon */}
      <div className="relative z-10 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
        {config.icon}
      </div>

      {/* Arka plan ışık oyunları (Sessiz Güç Ambiansı) */}
      <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl">
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full blur-[80px] ${categoryUpper === "WEB & SEO" ? "bg-brand-purple/20" : "bg-brand-blue/20"}`}
        />
      </div>
    </div>
  );
};

export default function BlogListPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("TÜMÜ");

  // GERÇEK FİLTRELEME MANTIĞI: Arama ve Kategori birleşik çalışır
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory =
        activeCategory === "TÜMÜ" ||
        post.category.toUpperCase() === activeCategory;
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  // UX KARARI: Sadece ilk 6 yazı gösterilir.
  const postsToShow = filteredPosts.slice(0, 6);

  return (
    <div className="min-h-screen bg-[#020204] pb-28 text-white">
      {/* ── ARKA PLAN AMBİYANSI ── */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute top-0 left-1/2 h-[500px] w-full -translate-x-1/2 rounded-full bg-brand-purple/5 blur-[120px]" />
      </div>

      {/* UI/UX DÜZELTME: Sol taraftaki sidebar için alan */}
      <div className="container relative z-10 mx-auto px-8 md:px-12 xl:pl-40 xl:pr-12">
        {/* ── HERO ── */}
        <section className="relative pt-32 pb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/5 text-[10px] font-bold text-white/40 uppercase tracking-[0.25em] mb-8">
              <BookOpen size={12} className="text-brand-purple" /> Bilgi
              Birikimi & Deneyim
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter uppercase italic leading-[0.95]">
              Dijital Strateji ve <br />
              <span className="text-white/20">Analiz Kütüphanesi.</span>
            </h1>
            <p className="mt-8 text-base text-white/50 max-w-xl leading-relaxed italic">
              Dijital büyüme yolculuğunda rehberlik edecek teknik incelemeler ve
              stratejik yaklaşımlar.
            </p>
          </div>
        </section>

        {/* ── FONKSİYONEL FİLTRE VE ARAMA ── */}
        <section className="sticky top-20 z-40 border-y border-white/5 bg-[#020204]/80 backdrop-blur-lg mb-20 rounded-xl overflow-hidden shadow-2xl">
          <div className="py-4 px-6 flex flex-wrap items-center justify-between gap-6">
            {/* Kategori Navigasyonu */}
            <div className="flex items-center gap-6 overflow-x-auto pb-2 md:pb-0 scrollbar-hide font-black text-[11px] tracking-widest">
              {["TÜMÜ", "WEB & SEO", "PPC & REKLAM", "OPERASYON", "MARKA"].map(
                (cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`transition-all duration-300 whitespace-nowrap uppercase ${
                      activeCategory === cat
                        ? "text-brand-blue"
                        : "text-white/30 hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                ),
              )}
            </div>

            {/* Arama Motoru */}
            <div className="relative group">
              <Search
                size={16}
                className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${searchQuery ? "text-brand-blue" : "text-white/20"}`}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="STRATEJİ ARA..."
                className="bg-white/[0.03] border border-white/10 rounded-full pl-10 pr-10 py-2.5 text-[11px] font-bold text-white outline-none focus:border-brand-blue/40 w-64 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        </section>

        {/* ── YAZI LİSTESİ ── */}
        <section>
          {postsToShow.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {postsToShow.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group block h-full"
                >
                  <article className="relative h-full flex flex-col rounded-[2rem] border border-white/5 bg-white/[0.02] overflow-hidden hover:border-white/10 transition-all duration-300">
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem] shadow-[0_0_40px_10px_rgba(0,192,200,0.05)_inset]" />

                    {/* Görsel Alanı (STRATEJİK DÜZELTME: Fallback sistemi) */}
                    <div className="relative z-10 aspect-video w-full overflow-hidden p-3 pb-0">
                      <div className="relative h-full w-full overflow-hidden rounded-2xl bg-[#0a0a0c]">
                        {post.image ? (
                          // Eğer resim varsa göster
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
                          />
                        ) : (
                          // Eğer resim yoksa kategoriye göre SVG fallback göster
                          <FallbackImage category={post.category} />
                        )}
                        {post.image && (
                          <div className="absolute inset-0 bg-brand-dark/20 z-10 group-hover:bg-transparent transition-colors duration-300" />
                        )}
                      </div>
                    </div>

                    {/* Metin İçeriği */}
                    <div className="relative z-10 p-7 flex-1 flex flex-col">
                      <div className="flex items-center gap-4 text-[10px] font-bold text-white/30 uppercase tracking-widest mb-5 border-b border-white/5 pb-4">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={12} /> {post.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock size={12} /> {post.readTime}
                        </span>
                      </div>

                      <h2 className="text-xl font-semibold text-white uppercase italic tracking-tight leading-tight group-hover:text-brand-blue transition-colors duration-300 mb-4 line-clamp-2">
                        {post.title}
                      </h2>

                      <p className="text-sm font-medium text-white/60 leading-relaxed italic mb-8 flex-1 line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="pt-2 flex i items-center justify-between gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/40 group-hover:text-white transition-all">
                        <span>{post.category}</span>
                        <div className="flex items-center gap-1.5">
                          DETAYLARI GÖR{" "}
                          <ArrowRight
                            size={14}
                            className="group-hover:translate-x-1.5 transition-transform"
                          />
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-24 text-center border border-dashed border-white/10 rounded-[2rem]">
              <p className="text-white/30 italic text-sm font-medium">
                Aradığınız kriterlere uygun içerik bulunamadı.
              </p>
            </div>
          )}
        </section>

        {/* ── SAYFALAMA ── */}
        <section className="mt-20 flex justify-center border-t border-white/5 pt-10">
          <nav className="flex items-center gap-3 bg-white/[0.02] border border-white/5 rounded-full p-2 px-6 shadow-xl">
            <button className="flex h-10 w-10 items-center justify-center rounded-full text-white/30 hover:bg-white/5 hover:text-white transition-all">
              <ChevronLeft size={20} />
            </button>
            <div className="flex items-center gap-1.5 text-sm font-medium text-white/60">
              <button className="h-10 w-10 rounded-full text-white bg-brand-purple">
                1
              </button>
              <button className="h-10 w-10 rounded-full hover:bg-white/5 hover:text-white transition-colors">
                2
              </button>
              <button className="h-10 w-10 rounded-full hover:bg-white/5 hover:text-white transition-colors">
                3
              </button>
              <span className="px-2 text-white/20">...</span>
              <button className="h-10 w-10 rounded-full hover:bg-white/5 hover:text-white transition-colors">
                10
              </button>
            </div>
            <button className="flex h-10 w-10 items-center justify-center rounded-full text-white/30 hover:bg-white/5 hover:text-white transition-all">
              <ChevronRight size={20} />
            </button>
          </nav>
        </section>
      </div>
    </div>
  );
}
