"use client";

import { useReducedMotion } from "framer-motion";
import { motion, useScroll, useSpring } from "framer-motion";

export default function ReadingProgress() {
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  if (prefersReduced) return null;

  return (
    <motion.div
      className="fixed top-[80px] left-0 right-0 z-50 h-[2px] origin-left pointer-events-none"
      style={{
        scaleX,
        background: "linear-gradient(90deg,#be29ec,#0000c8)",
      }}
    />
  );
}
