"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/utils/cn";

interface ShimmerButtonProps {
  children: React.ReactNode;
  href: string;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
  showShimmer?: boolean;
}

export default function ShimmerButton({
  children,
  href,
  className,
  variant = "primary",
  showShimmer = false,
}: ShimmerButtonProps) {
  return (
    <Link href={href}>
      <motion.button
        whileHover={{
          scale: 1.05,
          boxShadow: "0 0 40px rgba(0, 100, 255, 0.3)",
        }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "relative overflow-hidden rounded-full font-black uppercase tracking-widest transition-all duration-300",
          "flex items-center justify-center min-w-[200px]",
          {
            "bg-brand-blue text-white shadow-lg": variant === "primary",
            "bg-white text-brand-dark shadow-lg": variant === "secondary",
            "bg-white/5 text-white/90 border border-white/10 backdrop-blur-md":
              variant === "ghost",
          },
          className,
        )}
      >
        {/* Işıldama (Shimmer) Efekti */}
        {showShimmer && (
          <motion.div
            initial={{ x: "-150%" }}
            animate={{ x: "150%" }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "linear",
            }}
            className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg] pointer-events-none"
          />
        )}

        {/* Buton Metni */}
        <span className="relative z-10 block px-10 py-5">{children}</span>
      </motion.button>
    </Link>
  );
}
