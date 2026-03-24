"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Shield,
  Fingerprint,
  Workflow,
  Compass,
  Layers,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";

/* ─────────────────────────────────────────────────────────────────────────────
   YARDIMCI BİLEŞENLER
───────────────────────────────────────────────────────────────────────────── */

function PhilosophyImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-full h-[420px] lg:h-[500px] rounded-2xl overflow-hidden pointer-events-none">
      <Image src={src} alt={alt} fill className="object-cover object-center" />
    </div>
  );
}

function CollectionImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-[2.5rem]">
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "radial-gradient(circle at center, transparent 20%, #020204 95%)",
        }}
      />
      <motion.div
        whileHover={{ scale: 1.1, opacity: 0.6 }}
        transition={{ duration: 3, ease: "easeOut" }}
        className="w-full h-full"
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover opacity-40 brightness-[0.7] contrast-[1.1]"
        />
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   BÖLÜMLER
───────────────────────────────────────────────────────────────────────────── */

const philosophyItems = [
  {
    title: "Anlatmaya çalışmayın, tescil edin.",
    color: "text-brand-blue",
    text: "Dijitalin gürültüsünde herkes daha yüksek sesle bağırmaya çalışırken, lider markalar varlıklarıyla mesaj verir. Biz gürültüyü temizliyor, markanızın sarsılmaz duruşunu mühürlüyoruz.",
    imgSrc: "/img/marka-stratejisi/damla.webp",
    imgAlt: "Marka tescil — güçlü kimlik",
    reverse: true,
  },
  {
    title: "Güven, saniyeler içinde inşa edilir.",
    color: "text-white",
    text: "İnsan zihni karmaşadan kaçar ve düzene teslim olur. Tutarlı bir görsel dil, potansiyel ortağınızın zihnindeki tüm şüpheleri saniyeler içinde siler.",
    imgSrc: "/img/marka-stratejisi/brand-book-2.webp",
    imgAlt: "Güven inşası — tutarlı görsel dil",
    reverse: false,
  },
  {
    title: "Fiyat rekabetinden özgürleşin.",
    color: "text-brand-purple",
    text: "Profesyonel bir kimlik, markanızın algılanan değerini yukarı çeker. Artık fiyatınızla değil, yarattığınız o sarsılmaz güven algısıyla rekabet edersiniz.",
    imgSrc: "/img/marka-stratejisi/lighthouse.webp",
    imgAlt: "Fiyat rekabetinden özgürlük — premium marka",
    reverse: true,
  },
];

const collectionItems = [
  {
    title: "Markanın İmzası",
    meaning: "Karakterinizi tek bir bakışta özetleyen ana görsel mühür.",
    icon: <Fingerprint size={28} />,
    imgSrc: "/img/marka-stratejisi/signature.webp",
  },
  {
    title: "Renklerin Hafızası",
    meaning: "İnsanların uyandığında hatırlayacağı o ilk duyguyu tasarlıyoruz.",
    icon: <Layers size={28} />,
    imgSrc: "/img/marka-stratejisi/color-dna.webp",
  },
  {
    title: "Kurumsal Ses Tonu",
    meaning: "Kelimelerinizin ekrandaki vakur duruşu. Markanızın ciddiyeti.",
    icon: <Workflow size={28} />,
    imgSrc: "/img/marka-stratejisi/verbal-authority.webp",
  },
  {
    title: "Marka Rehberi",
    meaning:
      "Siz olmasanız bile markanızın nasıl davranması gerektiğini söyleyen pusula.",
    icon: <Compass size={28} />,
    imgSrc: "/img/marka-stratejisi/brand-compass.webp",
  },
];

const plans = [
  {
    id: "01",
    name: "The Foundation",
    title: "Temel Kimlik",
    target: "Karakterini sadeleştirmek isteyen butik yapılar.",
    scope: [
      "Logotype & Amblem Tasarımı",
      "Temel Renk & Font Rehberi",
      "Dijital Varlık Ana Hatları",
    ],
    result: "Piyasaya güven vererek çıkış yaparsınız.",
    cta: "Rotayı Netleştirelim",
    featured: false,
  },
  {
    id: "02",
    name: "The Architecture",
    title: "Genişletilmiş Sistem",
    target: "Her mecrada aynı vakur dili konuşmak isteyen markalar.",
    scope: [
      "Brand Book (Marka Rehberi)",
      "Sosyal Medya Template Sistemi",
      "Kurumsal Yazışma & Sunum Seti",
    ],
    result: "Ekipleriniz aynı anayasa ile hareket eder.",
    cta: "Sistemi Kuralım",
    featured: true,
  },
  {
    id: "03",
    name: "The Authority",
    title: "Tam Marka Mimari",
    target: "Lüks segmentte sarsılmaz otorite arayanlar.",
    scope: [
      "Marka DNA & Strateji",
      "Hareketli Grafik Dili",
      "Fiziksel Prestij & Baskı Setleri",
    ],
    result: "Fiyat rekabetinden çıkıp değer belirlersiniz.",
    cta: "Otoriteyi İnşa Edelim",
    featured: false,
  },
];

/* ── HERO ── */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-0 overflow-hidden bg-[#020204]">
      <div className="container mx-auto px-6 lg:pl-32 xl:pl-40 relative z-10 w-full">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-0 items-center">
          {/* SOL SÜTUN */}
          <div className="relative z-20 -mt-20">
            <Reveal>
              <div className="flex items-center gap-3 mb-8">
                <Shield
                  size={14}
                  className="text-brand-purple"
                  strokeWidth={2}
                />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 italic">
                  Dijital Büyüme Mimarisi
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="text-6xl md:text-7xl lg:text-[100px] font-bold tracking-[-0.04em] uppercase italic leading-[0.85] mb-8">
                <span className="text-white/10 block mb-4">SIZ SUSUN,</span>
                <span className="text-white block drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                  KİMLİĞİNİZ <br /> KONUŞSUN.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="max-w-xl border-l border-brand-purple/20 pl-8 mb-12">
                <p className="text-lg md:text-xl text-zinc-500 leading-relaxed italic font-light">
                  Anlatmaya çalışmayın, tescil edin. Dijitalin gürültüsünde
                  markanızı{" "}
                  <strong className="text-white/80 font-medium italic">
                    görsel bir sessizliğe
                  </strong>{" "}
                  ve sarsılmaz bir duruşa davet ediyoruz.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex flex-wrap items-center gap-8">
                <Link
                  href="/iletisim"
                  className="px-10 py-5 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-brand-purple hover:text-white transition-all duration-700 shadow-2xl"
                >
                  Otoriteyi Kurun
                </Link>
              </div>
            </Reveal>
          </div>

          {/* SAĞ SÜTUN */}
          <div className="relative z-10 flex justify-center lg:justify-start -ml-20 xl:-ml-40 pointer-events-none">
            <Reveal delay={0.4}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="relative w-[500px] h-[600px] lg:w-[700px] lg:h-[800px]"
              >
                <div
                  className="absolute inset-0 z-20"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 50%, transparent 10%, #020204 85%)",
                  }}
                />
                <Image
                  src="/img/marka-stratejisi/muhur.webp"
                  alt="Premium Dijital Otorite Mührü"
                  fill
                  className="object-cover opacity-60 grayscale-[30%] brightness-[0.8]"
                  style={{
                    maskImage:
                      "radial-gradient(circle at 50% 50%, black 20%, transparent 80%)",
                    WebkitMaskImage:
                      "radial-gradient(circle at 50% 50%, black 20%, transparent 80%)",
                  }}
                  priority
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-purple/10 blur-[100px] rounded-full z-10" />
              </motion.div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── PHILOSOPHY ── */
function Philosophy() {
  return (
    <section
      id="philosophy"
      className="relative mb-32 md:mb-64 mt-44 container mx-auto px-6 lg:pl-32 xl:pl-40"
    >
      <div
        className="hidden lg:block absolute left-16 top-0 h-full w-10 pointer-events-none"
        style={{ zIndex: 1 }}
      >
        <div className="sticky top-40 flex flex-col items-center opacity-25">
          <div className="h-64 w-[1px] bg-gradient-to-b from-brand-purple/60 to-transparent" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mt-8 rotate-90 origin-center whitespace-nowrap">
            PHILOSOPHY
          </span>
        </div>
      </div>

      <div className="space-y-32 md:space-y-48 lg:pl-16">
        {philosophyItems.map((item, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center overflow-visible ${
                item.reverse
                  ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1"
                  : ""
              }`}
            >
              <div className="flex flex-col justify-center">
                <h3
                  className={`text-3xl md:text-5xl font-bold uppercase italic tracking-tighter mb-8 ${item.color}`}
                >
                  {item.title}
                </h3>
                <p className="text-lg md:text-2xl text-zinc-400 leading-relaxed italic font-light">
                  {item.text}
                </p>
              </div>
              <PhilosophyImage src={item.imgSrc} alt={item.imgAlt} />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ── COLLECTION ── */
function Collection() {
  return (
    <section className="mb-32 md:mb-48 container mx-auto px-6 lg:pl-32 xl:pl-40 relative z-10">
      <Reveal>
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-4xl md:text-7xl font-heading font-extrabold uppercase italic tracking-[-0.03em] mb-6 text-white/5">
            Premium <span className="text-white">Koleksiyon</span>
          </h2>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {collectionItems.map((item, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <motion.div
              whileHover={{ y: -10 }}
              className="group relative aspect-[4/5] bg-[#020204] border border-white/5 hover:border-brand-purple/40 rounded-[3rem] p-10 flex flex-col items-center justify-between transition-all duration-700 overflow-hidden shadow-2xl shadow-black/30 selection:bg-brand-purple/20 selection:text-brand-purple"
            >
              <div className="absolute inset-0 z-0 bg-gradient-to-t from-brand-blue/5 to-brand-purple/10 blur-[100px] opacity-20 rounded-full pointer-events-none" />
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-brand-blue/10 to-brand-purple/20 blur-[120px] opacity-0 group-hover:opacity-100 transition-opacity duration-[2s] rounded-full pointer-events-none" />

              <div className="absolute inset-0 z-20 rounded-[3rem] overflow-hidden pointer-events-none">
                <motion.div
                  initial={{ opacity: 0.7, scale: 1 }}
                  whileHover={{ opacity: 1, scale: 1.08 }}
                  transition={{ duration: 4, ease: "easeOut" }}
                  className="w-full h-full"
                >
                  <Image
                    src={item.imgSrc}
                    alt={item.title}
                    fill
                    className="object-cover brightness-[0.95] group-hover:brightness-105 contrast-[1.1] group-hover:contrast-115 transition-all duration-[1s]"
                  />
                </motion.div>
              </div>

              <div className="absolute top-10 left-10 z-30 pointer-events-none">
                <div className="text-brand-purple/30 group-hover:text-brand-purple transition-colors duration-500">
                  {item.icon}
                </div>
              </div>

              <div className="absolute inset-x-6 bottom-10 md:bottom-12 z-30 pointer-events-none text-center">
                <div className="group-hover:opacity-0 group-hover:-translate-y-8 transition-all duration-700 ease-[0.16,1,0.3,1]">
                  <h4 className="text-xl md:text-2xl font-heading font-bold uppercase italic leading-none text-white shadow-xl shadow-black/20 px-2">
                    {item.title}
                  </h4>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-8 group-hover:translate-y-0 transition-all duration-700 ease-[0.16,1,0.3,1]">
                  <p className="text-[14px] md:text-[16px] font-serif font-medium text-zinc-100 italic leading-relaxed tracking-wide px-4 md:px-6 shadow-xl shadow-black/20">
                    {item.meaning}
                  </p>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-brand-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none z-10" />
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ── ROADMAPS ── */
function Roadmaps() {
  const [hovered, setHovered] = React.useState<number | null>(null);

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <Image
          src="/img/hizmetler/marka-gorsel-iletisim/Roadmaps-background.webp"
          alt="Dijital Mimari Plan"
          fill
          className="object-cover mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020204] via-transparent to-[#020204] opacity-90" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#020204] opacity-80" />
      </div>

      <div className="container mx-auto px-6 lg:pl-32 xl:pl-40 relative z-10">
        <Reveal>
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-[10px] font-black uppercase tracking-[0.6em] text-brand-purple mb-4 italic">
              Dijital Büyüme Mimarisi
            </h2>
            <h3 className="text-4xl md:text-7xl font-heading font-extrabold uppercase italic tracking-tighter leading-none">
              Yatırımın <span className="text-white/20">Rotası</span>
            </h3>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch group/roadmaps">
          {plans.map((plan, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <motion.div
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className={`
                  relative h-full p-10 rounded-[3rem] border border-white/5
                  flex flex-col justify-between transition-all duration-700
                  backdrop-blur-md bg-white/[0.02]
                  group-hover/roadmaps:blur-[2px] hover:!blur-none hover:!scale-[1.02] hover:!opacity-100
                  ${hovered !== null && hovered !== i ? "opacity-40" : "opacity-100"}
                  ${plan.featured ? "border-brand-purple/30 bg-brand-purple/[0.03] shadow-2xl shadow-brand-purple/10" : ""}
                `}
              >
                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-1 bg-brand-purple rounded-full">
                    <span className="text-[9px] font-black uppercase tracking-widest text-white">
                      Önerilen Mimari
                    </span>
                  </div>
                )}

                <div>
                  <div className="flex justify-between items-start mb-8">
                    <span className="text-[11px] font-black text-white/20 uppercase tracking-[0.5em]">
                      {plan.id}
                    </span>
                    {plan.featured && (
                      <Sparkles
                        size={16}
                        className="text-brand-purple animate-pulse"
                      />
                    )}
                  </div>

                  <h4 className="text-2xl lg:text-3xl font-heading font-bold uppercase italic mb-4 leading-tight text-white">
                    {plan.title}
                  </h4>

                  <p className="text-sm md:text-base font-serif text-zinc-400 italic mb-8 leading-relaxed">
                    {plan.target}
                  </p>

                  <div className="space-y-4 mb-10">
                    <p className="text-[10px] font-black text-brand-blue uppercase tracking-widest border-b border-white/5 pb-2">
                      Mimari Kapsam
                    </p>
                    {plan.scope.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-4 text-sm text-zinc-300 font-light"
                      >
                        <CheckCircle2
                          size={14}
                          className="text-brand-purple/50 shrink-0"
                        />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-auto">
                  <div className="mb-8 p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm">
                    <p className="text-[9px] font-black text-brand-purple uppercase tracking-[0.3em] mb-2">
                      Stratejik Hedef
                    </p>
                    <p className="text-sm font-serif text-zinc-300 italic leading-relaxed">
                      {plan.result}
                    </p>
                  </div>

                  <Link
                    href="/iletisim"
                    className={`
                      w-full py-5 rounded-full text-[10px] font-black uppercase tracking-[0.4em] text-center transition-all duration-500 block
                      ${
                        plan.featured
                          ? "bg-brand-purple text-white shadow-lg shadow-brand-purple/20 hover:bg-white hover:text-black hover:scale-[0.98]"
                          : "border border-white/10 text-white/60 hover:bg-white hover:text-black hover:border-white"
                      }
                    `}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── FINAL CTA ── */
function FinalCTA() {
  return (
    <section className="py-24 md:py-64 container mx-auto px-6 lg:pl-32 xl:pl-40 relative overflow-hidden">
      <Reveal>
        <div className="relative p-10 md:p-32 rounded-[3rem] md:rounded-[5rem] border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent text-center overflow-hidden group">
          <div className="absolute -bottom-1/4 -right-1/4 w-[150%] h-[150%] opacity-[0.05] pointer-events-none transition-transform duration-[20s] ease-linear group-hover:scale-110 group-hover:-rotate-12">
            <Image
              src="/img/marka-stratejisi/muhur.webp"
              alt=""
              fill
              className="object-contain object-right-bottom brightness-150 contrast-125"
            />
          </div>

          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-brand-purple/5 blur-[120px] rounded-full pointer-events-none" />

          <h2 className="text-4xl md:text-8xl font-heading font-extrabold uppercase italic tracking-tighter mb-12 md:mb-16 leading-[0.85] relative z-10">
            SÖZÜN BİTTİĞİ YERDE <br />
            <span className="text-white/10 block mt-4">
              KİMLİĞİNİZ BAŞLASIN.
            </span>
          </h2>

          <div className="flex flex-col items-center justify-center relative z-10">
            <Link
              href="/iletisim"
              className="relative px-12 md:px-20 py-5 md:py-7 bg-white text-black text-[11px] font-black uppercase tracking-[0.5em] rounded-full overflow-hidden group/btn transition-all duration-700 hover:scale-105 hover:shadow-[0_0_60px_rgba(190,41,236,0.3)]"
            >
              <span className="relative z-10">ANALİZ TALEBİ</span>
              <div className="absolute inset-0 bg-gradient-to-r from-brand-blue to-brand-purple opacity-0 group-hover/btn:opacity-100 transition-opacity duration-700" />
              <span className="absolute inset-0 bg-white group-hover/btn:opacity-0 transition-opacity duration-700" />
            </Link>

            <p className="mt-10 text-zinc-500 font-serif italic text-sm tracking-widest opacity-60">
              Sessiz bir güçle büyümeye hazır mısınız?
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   ANA CLIENT EXPORT
───────────────────────────────────────────────────────────────────────────── */
export default function MarkaStratejisiClient() {
  return (
    <main className="bg-[#020204] text-white overflow-x-hidden font-sans relative selection:bg-brand-purple selection:text-white">
      {/* GLOBAL AMBIENT LIGHT */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-brand-blue/5 blur-[15vw] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-brand-purple/5 blur-[15vw] rounded-full" />
      </div>

      <div className="relative z-10">
        <Hero />
        <Philosophy />
        <Collection />
        <Roadmaps />
        <FinalCTA />
      </div>
    </main>
  );
}
