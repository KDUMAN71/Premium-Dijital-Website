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
  size?: "sm" | "md" | "lg";
}

export default function ShimmerButton({
  children,
  href,
  className,
  variant = "primary",
  showShimmer = true,
  size = "md",
}: ShimmerButtonProps) {
  return (
    <Link href={href} className="inline-block">
      <motion.button
        whileHover={{
          scale: 1.03,
          boxShadow:
            "0 0 48px rgba(190,41,236,0.35), 0 0 80px rgba(0,0,200,0.25)",
        }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className={cn(
          "relative overflow-hidden font-bold tracking-wide transition-all duration-300",
          "flex items-center justify-center",
          // Size variants
          {
            "rounded-xl text-sm min-w-[140px]": size === "sm",
            "rounded-xl text-sm min-w-[180px]": size === "md",
            "rounded-2xl text-base min-w-[220px]": size === "lg",
          },
          // Color variants
          {
            // Brand gradient — primary CTA
            "text-white": variant === "primary",
            // Glass — secondary
            "bg-white/5 text-white/90 border border-white/10 backdrop-blur-md hover:border-[rgba(190,41,236,0.4)] hover:bg-white/8":
              variant === "secondary",
            // Ghost
            "bg-transparent text-white/80 border border-white/10 hover:text-white hover:border-white/20":
              variant === "ghost",
          },
          className,
        )}
        style={
          variant === "primary"
            ? {
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
                border: "1px solid rgba(255,255,255,0.10)",
                backdropFilter: "blur(10px)",
              }
            : undefined
        }
      >
        {/* Shimmer efekti — sadece primary */}
        {showShimmer && variant === "primary" && (
          <motion.div
            initial={{ x: "-150%" }}
            animate={{ x: "150%" }}
            transition={{
              repeat: Infinity,
              duration: 2.5,
              ease: "linear",
              repeatDelay: 1,
            }}
            className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] pointer-events-none"
          />
        )}

        {/* İçerik */}
        <span
          className={cn("relative z-10 flex items-center gap-2", {
            "px-6 py-3": size === "sm",
            "px-8 py-4": size === "md",
            "px-10 py-5": size === "lg",
          })}
        >
          {children}
        </span>
      </motion.button>
    </Link>
  );
}
