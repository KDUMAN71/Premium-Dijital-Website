"use client";

import { useEffect, useMemo, useState } from "react";

type NavItem = {
  id: string;
  label: string;
};

const HEADER_OFFSET = 132;

export default function ServicePageStickyNav({ items }: { items: NavItem[] }) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

  const sectionIds = useMemo(() => items.map((item) => item.id), [items]);

  useEffect(() => {
    if (!sectionIds.length) return;

    let ticking = false;

    const updateActiveSection = () => {
      const viewportAnchor = HEADER_OFFSET + 40;

      let bestId = sectionIds[0];
      let bestDistance = Number.POSITIVE_INFINITY;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        const distance = Math.abs(rect.top - viewportAnchor);

        // Section tamamen ekranın üstünde kaldıysa ama bir sonrakine geçilmediyse
        // yine de mantıklı section'ı tutabilmek için mesafeyi esas alıyoruz.
        if (distance < bestDistance) {
          bestDistance = distance;
          bestId = id;
        }
      }

      setActiveId(bestId);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateActiveSection);
        ticking = true;
      }
    };

    updateActiveSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sectionIds]);

  if (!items?.length) return null;

  return (
    <section className="sticky top-[80px] z-40 border-y border-white/10 bg-black/80 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
      <div className="mx-auto max-w-6xl px-4 py-3 sm:px-5 md:px-6">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/30">
            Bölümler
          </span>

          <div className="hidden h-4 w-px bg-white/10 sm:block" />

          <nav
            aria-label="Sayfa içi bölüm navigasyonu"
            className="flex flex-wrap gap-2"
          >
            {items.map((item) => {
              const isActive = activeId === item.id;

              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`inline-flex items-center rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 ${
                    isActive
                      ? "border-brand-blue/40 bg-gradient-to-r from-brand-blue/20 to-brand-blue/10 text-white shadow-[0_0_20px_rgba(0,80,255,0.25)]"
                      : "border-white/10 bg-white/[0.02] text-white/55 hover:border-white/20 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </section>
  );
}
