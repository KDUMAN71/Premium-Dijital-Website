"use client";

import { useEffect, useState } from "react";
import { Monitor, TrendingUp, Share2 } from "lucide-react";

const ITEMS = [
  {
    id: "web",
    label: "Web Tasarım",
    sublabel: "& Geliştirme",
    icon: Monitor,
    color: "#be29ec",
  },
  {
    id: "seo",
    label: "SEO",
    sublabel: "& Organik Büyüme",
    icon: TrendingUp,
    color: "#3b82f6",
  },
  {
    id: "sosyal-medya",
    label: "Sosyal Medya",
    sublabel: "Yönetimi",
    icon: Share2,
    color: "#22c55e",
  },
];

const HEADER_OFFSET = 132;

export default function DijitalMimariStickyNav() {
  const [activeId, setActiveId] = useState<string>("web");

  useEffect(() => {
    const ids = ITEMS.map((item) => item.id);
    let ticking = false;

    const update = () => {
      const anchor = HEADER_OFFSET + 40;
      let bestId = ids[0];
      let bestDistance = Number.POSITIVE_INFINITY;

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const dist = Math.abs(el.getBoundingClientRect().top - anchor);
        if (dist < bestDistance) {
          bestDistance = dist;
          bestId = id;
        }
      }
      setActiveId(bestId);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className="sticky top-[80px] z-40 border-b border-white/8 bg-[#0a0a12]/95 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <nav
          aria-label="Sayfa bölüm navigasyonu"
          className="grid grid-cols-3"
        >
          {ITEMS.map((item, i) => {
            const isActive = activeId === item.id;
            const Icon = item.icon;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`group relative flex flex-col items-center gap-1.5 px-3 py-4 text-center transition-all duration-300 sm:py-5 ${
                  i < ITEMS.length - 1 ? "border-r border-white/8" : ""
                } ${isActive ? "bg-white/[0.04]" : "hover:bg-white/[0.025]"}`}
              >
                {/* Aktif alt çizgi */}
                <span
                  className="absolute bottom-0 left-0 h-0.5 w-full transition-all duration-300"
                  style={{
                    background: isActive ? item.color : "transparent",
                    boxShadow: isActive ? `0 0 12px ${item.color}80` : "none",
                  }}
                />

                {/* İkon */}
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-300 sm:h-10 sm:w-10"
                  style={{
                    background: isActive ? `${item.color}18` : "rgba(255,255,255,0.04)",
                    border: `1px solid ${isActive ? `${item.color}40` : "rgba(255,255,255,0.08)"}`,
                    color: isActive ? item.color : "rgba(255,255,255,0.45)",
                    boxShadow: isActive ? `0 0 16px ${item.color}30` : "none",
                  }}
                >
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </span>

                {/* Label */}
                <span
                  className="text-[11px] font-black uppercase tracking-[0.12em] leading-none transition-colors duration-300 sm:text-xs"
                  style={{ color: isActive ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.45)" }}
                >
                  {item.label}
                </span>

                {/* Sublabel — masaüstünde göster */}
                <span
                  className="hidden text-[10px] font-medium leading-none transition-colors duration-300 sm:block"
                  style={{ color: isActive ? item.color : "rgba(255,255,255,0.25)" }}
                >
                  {item.sublabel}
                </span>
              </a>
            );
          })}
        </nav>
      </div>
    </section>
  );
}
