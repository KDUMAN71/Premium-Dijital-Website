"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { cn } from "@/utils/cn";

const seoFaqs = [
  {
    q: "SEO sonuçlarını ne zaman görmeye başlarız?",
    a: "Teknik SEO ve tarama bütçesi optimizasyonları ilk 30 günde indeks hızını artırır. Ancak rekabetçi anahtar kelimelerde sürdürülebilir bir otorite ve organik trafik artışı için 3 ila 6 aylık bir veri disiplini gereklidir. Bu süre, projenizin başlangıçtaki teknik sağlığına ve sektör rekabetine göre hazırladığımız Yol Haritası ile netleştirilir.",
  },
  {
    q: "Neden Google'da 1. sıra garantisi vermiyorsunuz?",
    a: "Google'ın resmi yönergeleri, hiçbir ajansın sıralama garantisi veremeyeceğini açıkça belirtir. Biz 'garanti' gibi manipülatif vaatler yerine, 'Rakamlarla Kanıtlanmış' metodolojiler sunuyoruz. Algoritma güncellemelerine karşı dirençli, semantik olarak güçlü bir Dijital Büyüme Mimarisi kurarak, markanızı sektörünüzün doğal otoritesi haline getiriyoruz.",
  },
  {
    q: "Google Ads (SEM) varken neden SEO yatırımı yapmalıyım?",
    a: "Google Ads bir 'gider', SEO ise bir 'varlık' (asset) yatırımıdır. Reklamı durdurduğunuzda trafik kesilir; ancak doğru kurgulanmış bir SEO stratejisi, zamanla tıklama başına maliyetinizi (CPC) düşürür ve reklam bütçenize bağımlı kalmadan sürdürülebilir bir büyüme kanalı oluşturur. En verimli sonuçlar için bu iki kanalın veri alışverişi yaptığı hibrit bir model öneriyoruz.",
  },
  {
    q: "Semantik SEO ve Topical Authority markama ne katar?",
    a: "Geleneksel SEO sadece kelimelere odaklanırken; Semantik SEO, Google'ın içeriğinizdeki kavramsal ilişkileri anlamasını sağlar. Topical Authority (Konu Otoritesi) ise markanızı belirli bir alanda 'en güvenilir kaynak' olarak konumlandırır. Bu disiplin, düşük reklam bütçeleriyle bile rakiplerinizin önüne geçmenizi ve yapay zeka temelli yanıtlarda (GEO) yer almanızı sağlar.",
  },
  {
    q: "Yapay zeka (AI) SEO'yu öldürdü mü? Gelecek stratejiniz nedir?",
    a: "Aksine, SEO artık 'Cevap Motoru Optimizasyonu'na (GEO) evriliyor. Google Search Generative Experience (SGE) ve diğer AI asistanları, veriyi 'uzman' ve 'güvenilir' kaynaklardan çeker. Stratejimiz, içeriğinizi sadece insanların değil, yapay zeka modellerinin de en güvenilir referans olarak algılayacağı teknik ve semantik derinlikte inşa etmektir.",
  },
  {
    q: "Çalışma sona erdiğinde sıralamalarımı kaybeder miyim?",
    a: "SEO süreklilik gerektiren bir süreçtir. Dijital dünya ve rakipleriniz durmuyor. Ancak kurduğumuz sistem, sadece 'geçici hilelere' değil, sitenizin temel otoritesine odaklandığı için, çalışma sonrasında bile uzun süre ivmesini korur. Periyodik güncellemeler ve veri takibiyle bu kazanımların kalıcı olmasını sağlıyoruz.",
  },
];

export default function SeoFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="sss"
      className="py-24 md:py-32 bg-brand-dark border-t border-white/5 relative overflow-hidden"
    >
      {/* Arka Plan Dekorasyonu */}
      <div className="absolute right-0 top-0 w-1/3 h-full bg-brand-purple/5 blur-[120px] -z-10" />

      <div className="container mx-auto px-6 max-w-4xl">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-brand-blue text-[10px] font-bold uppercase tracking-widest mb-4">
              <HelpCircle size={12} />
              Sıkça Sorulan Sorular
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6 italic">
              Aklınızdaki Soruları{" "}
              <span className="text-white/40">Veriyle Yanıtlıyoruz</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Dijital Büyüme Mimarisi hakkında merak ettiğiniz, karar verme
              sürecinizi etkileyecek en kritik noktalar.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-4">
          {seoFaqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={false}
              className={cn(
                "group border rounded-3xl transition-all duration-300 overflow-hidden",
                openIndex === i
                  ? "border-brand-blue/30 bg-white/[0.04]"
                  : "border-white/10 bg-white/[0.02] hover:border-white/20",
              )}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-6 md:p-8 flex items-center justify-between text-left"
              >
                <span
                  className={cn(
                    "text-lg font-bold tracking-tight transition-colors",
                    openIndex === i
                      ? "text-brand-blue"
                      : "text-white/80 group-hover:text-white",
                  )}
                >
                  {faq.q}
                </span>
                <div
                  className={cn(
                    "shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all",
                    openIndex === i
                      ? "border-brand-blue bg-brand-blue text-white"
                      : "border-white/10 text-white/40 group-hover:text-white",
                  )}
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
