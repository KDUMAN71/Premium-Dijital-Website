"use client";

import { useEffect, useState } from "react";

type NavItem = {
  id: string;
  label: string;
};

export default function ServicePageStickyNav({ items }: { items: NavItem[] }) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top) -
              Math.abs(b.boundingClientRect.top),
          );

        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: [0.1, 0.25, 0.4],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [items]);

  if (!items?.length) return null;

  return (
    <section className="sticky top-[80px] z-40 border-y border-white/10 bg-black/80 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
      <div className="mx-auto max-w-6xl px-4 py-3 sm:px-5 md:px-6">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/30">
            Bölümler
          </span>

          <div className="h-4 w-px bg-white/10" />

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
