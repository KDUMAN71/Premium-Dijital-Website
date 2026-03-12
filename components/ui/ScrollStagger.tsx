"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { ReactNode } from "react";

export function ScrollStagger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, {
    amount: 0.18,
    once: false,
    margin: "-10% 0px -12% 0px",
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "show" : "dim"}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.08,
          },
        },
        dim: {
          transition: {
            staggerChildren: 0.03,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function ScrollStaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 26 },
        show: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: [0.21, 1, 0.36, 1],
          },
        },
        dim: {
          opacity: 0.45,
          y: 14,
          transition: {
            duration: 0.45,
            ease: [0.21, 1, 0.36, 1],
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
