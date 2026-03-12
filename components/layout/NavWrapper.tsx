"use client";

import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";

export default function NavWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-[100] transition-all duration-500",
        scrolled
          ? "bg-brand-dark/90 backdrop-blur-xl border-b border-white/8 py-0"
          : "bg-transparent border-b border-white/5 bg-brand-dark/80 backdrop-blur-xl py-0",
      )}
    >
      {children}
    </header>
  );
}
