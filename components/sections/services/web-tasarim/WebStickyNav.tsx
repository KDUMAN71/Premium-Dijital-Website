"use client";

import { useEffect, useState } from "react";
import { HelpCircle, Monitor, Layers, GitCommitHorizontal, Package, BarChart3 } from "lucide-react";
import { cn } from "@/utils/cn";

const ITEMS = [
  {
    id: "neden",
    label: "Neden?",
    sublabel: "Dijital Varlık",
    icon: HelpCircle,
    color: "#BE29EC",
  },
  {
    id: "showcase",
    label: "Çalışmalar",
    sublabel: "Referans Projeler",
    icon: Monitor,
    color: "#0000C8",
  },
  {
    id: "teknoloji",
    label: "Teknoloji",
    sublabel: "Altyapı & Stack",
    icon: Layers,
    color: "#BE29EC",
  },
  {
    id: "surec",
    label: "Süreç",
    sublabel: "Adım Adım",
    icon: GitCommitHorizontal,
    color: "#0000C8",
  },
  {
    id: "paketler",
    label: "Paketler",
    sublabel: "Kapsam & Fiyat",
    icon: Package,
    color: "#BE29EC",
  },
  {
    id: "analiz",
    label: "Analiz Al",
    sublabel: "Ücretsiz Öneri",
    icon: BarChart3,
    color: "#0000C8",
  },
];

const HEADER_OFFSET = 132;

export default function WebStickyNav() {
  const [activeId, setActiveId] = useState<string>("neden");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed top-20 left-0 right-0 z-50 border-y border-white/10 bg-black/80 backdrop-blur-xl shadow-2xl transition-all duration-300",
        visible
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none",
      )}
    >
      <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
        <nav
          className="flex items-center justify-between gap-1 sm:gap-3"
          aria-label="Sayfa bölümleri"
        >
          {ITEMS.map((item) => {
            const isActive = activeId === item.id;
            const Icon = item.icon;

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="group relative flex flex-1 items-center gap-2 rounded-2xl p-2 transition-all duration-500 sm:flex-none sm:px-3"
              >
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-xl transition-all duration-300 sm:h-9 sm:w-9"
                  style={{
                    background: isActive
                      ? `${item.color}18`
                      : "rgba(255,255,255,0.04)",
                    border: `1px solid ${isActive ? `${item.color}40` : "rgba(255,255,255,0.08)"}`,
                    color: isActive ? item.color : "rgba(255,255,255,0.45)",
                    boxShadow: isActive ? `0 0 16px ${item.color}30` : "none",
                  }}
                >
                  <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </span>

                <div className="flex flex-col text-left">
                  <span
                    className="text-[9px] font-black uppercase tracking-widest leading-none transition-colors duration-300 sm:text-[10px]"
                    style={{
                      color: isActive ? "white" : "rgba(255,255,255,0.45)",
                    }}
                  >
                    {item.label}
                  </span>
                  <span className="hidden text-[9px] font-medium leading-none transition-colors duration-300 sm:block mt-1 text-white/30 group-hover:text-white/50">
                    {item.sublabel}
                  </span>
                </div>

                {isActive && (
                  <div
                    className="absolute -bottom-[13px] left-0 h-[2px] w-full"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${item.color}, transparent)`,
                    }}
                  />
                )}
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
