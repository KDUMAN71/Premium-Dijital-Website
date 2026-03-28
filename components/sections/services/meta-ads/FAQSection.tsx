"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function FAQSection({
  faqs,
}: {
  faqs: { q: string; a: string }[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 md:py-32 bg-brand-dark border-t border-white/5 relative overflow-hidden">
      <div className="absolute right-0 top-0 w-1/3 h-full bg-brand-purple/5 blur-[120px] -z-10" />

      <div className="container mx-auto px-6 max-w-4xl">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-brand-purple text-[10px] font-bold uppercase tracking-widest mb-4">
              <HelpCircle size={12} />
              Sıkça Sorulan Sorular
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6 italic">
              Merak Ettiklerinizi{" "}
              <span className="text-white/40">Hızla Yanıtlıyoruz</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Meta Ads sürecinizde karar vermenizi kolaylaştıracak en kritik
              bilgiler.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={false}
              className={`group border rounded-3xl transition-all duration-300 overflow-hidden ${
                openIndex === i
                  ? "border-brand-purple/30 bg-white/[0.04]"
                  : "border-white/10 bg-white/[0.02] hover:border-white/20"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-6 md:p-8 flex items-center justify-between text-left"
              >
                <span
                  className={`text-lg font-bold tracking-tight transition-colors ${
                    openIndex === i
                      ? "text-brand-purple"
                      : "text-white/80 group-hover:text-white"
                  }`}
                >
                  {faq.q}
                </span>
                <div
                  className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                    openIndex === i
                      ? "border-brand-purple bg-brand-purple text-white"
                      : "border-white/10 text-white/40 group-hover:text-white"
                  }`}
                >
                  {openIndex === i ? <Minus size={16} /> : <Plus size={16} />}
                </div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 md:px-8 pb-8 pt-2 text-gray-400 text-sm md:text-base leading-relaxed border-t border-white/5">
                      <p className="max-w-3xl">{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
