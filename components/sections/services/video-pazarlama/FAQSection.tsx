"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { cn } from "@/utils/cn";

type FAQ = { q: string; a: string };

export default function FAQSection({ faqs }: { faqs: FAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const shouldReduce = useReducedMotion();

  return (
    <section className="relative py-24 md:py-32 border-t border-white/5 bg-brand-dark text-white">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="mb-14 text-center">
          <ScrollReveal>
            <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/50 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
              Sık Sorulan Sorular
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">
              Video Pazarlama{" "}
              <span className="text-brand-purple">Hakkında</span>
            </h2>
          </ScrollReveal>
        </div>

        <dl className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={cn(
                "rounded-2xl border transition-colors duration-300 overflow-hidden",
                openIndex === i
                  ? "border-brand-purple/30 bg-brand-purple/5"
                  : "border-white/8 bg-white/[0.02] hover:border-white/15",
              )}
            >
              <dt>
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === i ? null : i)
                  }
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={openIndex === i}
                >
                  <span className="font-bold text-sm text-white leading-snug">
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={16}
                    className={cn(
                      "shrink-0 text-white/40 transition-transform duration-300",
                      openIndex === i && "rotate-180 text-brand-purple",
                    )}
                  />
                </button>
              </dt>
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.dd
                    key="answer"
                    initial={shouldReduce ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-sm text-white/60 leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.dd>
                )}
              </AnimatePresence>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
