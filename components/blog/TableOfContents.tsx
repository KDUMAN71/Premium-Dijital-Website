"use client";

import { useEffect, useState } from "react";
import type { TocEntry } from "@/lib/blog/toc";
import { List } from "lucide-react";

interface TableOfContentsProps {
  entries: TocEntry[];
}

export default function TableOfContents({ entries }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (entries.length === 0) return;

    const observer = new IntersectionObserver(
      (observed) => {
        const visible = observed.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "0px 0px -60% 0px", threshold: 0 }
    );

    entries.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [entries]);

  if (entries.length === 0) return null;

  return (
    <nav aria-label="İçindekiler">
      <div className="rounded-2xl border border-white/6 bg-white/[0.02] p-6">
        <div className="mb-4 flex items-center gap-2">
          <List size={13} className="text-brand-purple" />
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/25">
            İçindekiler
          </p>
        </div>

        <ul className="space-y-1">
          {entries.map((entry) => (
            <li
              key={entry.id}
              className={entry.level === 3 ? "pl-4" : ""}
            >
              <a
                href={`#${entry.id}`}
                className={`block py-1 text-[12px] leading-snug transition-colors duration-200 ${
                  activeId === entry.id
                    ? "text-brand-purple font-semibold"
                    : "text-white/40 hover:text-white/80"
                } ${entry.level === 3 ? "font-normal" : "font-medium"}`}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(entry.id);
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
              >
                {entry.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
