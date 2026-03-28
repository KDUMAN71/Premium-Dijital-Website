"use client";

import { Check, Instagram, Linkedin, Youtube } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";

const platforms = [
  {
    name: "Instagram & Facebook",
    color: "#E1306C",
    gradientFrom: "#E1306C",
    gradientTo: "#1877F2",
    border: "#E1306C",
    Icon: Instagram,
    stat: "2B+ kullanıcı",
    desc: "Görsel hikaye anlatımı ve topluluk oluşturma. Sağlık, turizm ve yaşam tarzı markaları için birincil kanal.",
    services: [
      "Aylık içerik takvimi ve görsel üretim",
      "Reels, Story, Carousel formatları",
      "Hashtag stratejisi ve keşfet optimizasyonu",
      "Topluluk yönetimi ve yorum takibi",
      "Meta Business Suite entegrasyonu",
    ],
  },
  {
    name: "LinkedIn",
    color: "#0077B5",
    gradientFrom: "#0077B5",
    gradientTo: "#0077B5",
    border: "#0077B5",
    Icon: Linkedin,
    stat: "1B+ profesyonel",
    desc: "Kurumsal otorite ve B2B bağlantı. Ajans, klinik ve kurumsal markalar için güven inşası kanalı.",
    services: [
      "Şirket sayfası ve kişisel profil yönetimi",
      "Düşünce liderliği içerikleri",
      "Sektör haberleri ve insight paylaşımı",
      "Bağlantı büyüme stratejisi",
      "İçerik performans analizi",
    ],
  },
  {
    name: "YouTube (Organik)",
    color: "#FF0000",
    gradientFrom: "#FF0000",
    gradientTo: "#FF0000",
    border: "#FF0000",
    Icon: Youtube,
    stat: "2B+ aylık kullanıcı",
    desc: "İkinci büyük arama motoru. Video SEO ile uzun vadeli organik görünürlük ve otorite inşası.",
    services: [
      "Kanal optimizasyonu ve SEO",
      "Video başlık, açıklama ve tag stratejisi",
      "Playlist ve kategori yapılandırması",
      "Thumbnail tasarım brief'i",
      "Yayın takvimi ve analitik takibi",
    ],
  },
];

export default function SosyalPlatforms() {
  const shouldReduce = useReducedMotion();

  return (
    <section className="relative py-24 md:py-32 border-t border-white/5 bg-brand-dark text-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Başlık */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <ScrollReveal>
            <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/50 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
              Platform & Hizmet Kapsamı
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6">
              Doğru Platform,{" "}
              <span className="text-brand-purple">Doğru Strateji</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Her platform farklı bir kitle ve iletişim dili gerektirir.
              Sektörünüze ve hedefinize göre en verimli kombinasyonu kuruyoruz.
            </p>
          </ScrollReveal>
        </div>

        {/* 3 platform kartı */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {platforms.map((p, i) => {
            const Icon = p.Icon;
            return (
              <motion.div
                key={i}
                initial={shouldReduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="relative rounded-[2rem] border overflow-hidden flex flex-col transition-all duration-300 group hover:shadow-lg"
                style={{ borderColor: `${p.border}25` }}
              >
                {/* Gradient arka plan */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${p.gradientFrom}10, ${p.gradientTo}05)`,
                  }}
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${p.gradientFrom}06, transparent 60%)`,
                  }}
                />

                <div className="relative z-10 p-8 flex flex-col h-full gap-5">
                  {/* İkon + İsim + Stat */}
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                      style={{
                        background: `${p.color}15`,
                        border: `1px solid ${p.color}30`,
                        color: p.color,
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-black text-white text-base leading-tight">
                        {p.name}
                      </div>
                      <div
                        className="text-[11px] font-bold mt-0.5"
                        style={{ color: p.color }}
                      >
                        {p.stat}
                      </div>
                    </div>
                  </div>

                  {/* Açıklama */}
                  <p className="text-white/60 text-sm leading-relaxed">
                    {p.desc}
                  </p>

                  {/* Hizmetler */}
                  <ul className="space-y-2.5 flex-1">
                    {p.services.map((s, si) => (
                      <li key={si} className="flex items-start gap-3">
                        <Check
                          size={13}
                          className="mt-0.5 shrink-0"
                          style={{ color: p.color }}
                        />
                        <span className="text-white/60 text-xs leading-relaxed">
                          {s}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
