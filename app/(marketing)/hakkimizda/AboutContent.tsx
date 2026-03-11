"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Cloud,
  Palette,
  Target,
  ShieldCheck,
  BarChart4,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Link from "next/link";

export default function AboutContent() {
  return (
    <main className="bg-brand-dark text-white overflow-hidden relative">
      {/* ARKA PLAN DOKUSU: Kurumsal renklerin derinlik kattığı soft glowlar */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] h-[600px] w-[600px] rounded-full bg-brand-blue/5 blur-[120px]" />
        <div className="absolute bottom-[20%] right-[-5%] h-[500px] w-[500px] rounded-full bg-brand-purple/5 blur-[120px]" />
      </div>

      {/* 1. HERO: Motto ve Konumlandırma */}
      <section className="relative pt-32 pb-16 px-6 max-w-7xl mx-auto md:pt-48 md:pb-32">
        <Reveal>
          <div className="flex items-center gap-3 mb-10">
            <span className="h-[1px] w-8 bg-brand-blue/40" />
            <p className="text-[9px] uppercase tracking-[0.4em] text-white/30 font-medium tracking-[0.4em]">
              Kurumsal Profil
            </p>
          </div>

          <h1 className="text-[2.2rem] leading-[1.1] sm:text-5xl md:text-6xl lg:text-[5.2rem] font-bold tracking-tighter uppercase italic text-white/95">
            Rakamlarla Kanıtlanmış, <br />
            <span className="bg-gradient-to-r from-brand-blue to-brand-purple bg-clip-text text-transparent">
              Hayallerle Tasarlanmış.
            </span>
          </h1>

          <p className="mt-12 max-w-3xl text-base md:text-xl text-white/40 font-light leading-relaxed border-l border-white/10 pl-6 md:pl-10">
            Premium Dijital; bir reklam ajansının ötesinde, markaların dijital
            evrimini yöneten bir strateji ve teknoloji merkezidir. Bizim için
            büyüme; doğru kurgulanmış bir algoritma ile ruhu olan bir kimliğin
            kusursuz uyumudur.
          </p>
        </Reveal>
      </section>

      {/* 2. VİZYON & MİSYON: Stratejik Odak */}
      <section className="py-24 px-6 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          <Reveal>
            <div className="space-y-6">
              <h2 className="text-xs uppercase tracking-[0.3em] text-brand-blue font-bold">
                Vizyonumuz
              </h2>
              <p className="text-xl md:text-2xl font-light leading-relaxed text-white/80">
                Geleceğin dijital dünyasında markaların sadece "var olmasını"
                değil, kendi ekosistemlerini{" "}
                <span className="italic text-brand-purple">
                  domine etmelerini
                </span>{" "}
                sağlamak.
              </p>
              <p className="text-sm text-white/30 font-light leading-relaxed">
                Verinin mutlak disiplini ile yaratıcılığın sınırsızlığını aynı
                potada eriterek, global standartlarda bir dijital varlık
                mimarisi inşa ediyoruz.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className="space-y-6">
              <h2 className="text-xs uppercase tracking-[0.3em] text-brand-purple font-bold">
                Misyonumuz
              </h2>
              <p className="text-xl md:text-2xl font-light leading-relaxed text-white/80">
                Karmaşık süreçleri; stratejik zeka ve teknolojik altyapılarla{" "}
                <span className="italic text-brand-blue">sadeleştirerek</span>{" "}
                sürdürülebilir sistemlere dönüştürmek.
              </p>
              <p className="text-sm text-white/30 font-light leading-relaxed">
                Kurumsal kimlikten performans pazarlamasına kadar her temas
                noktasını, bütünsel bir başarı hikayesinin parçası olarak
                tasarlıyoruz.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. BÜTÜNSEL YAKLAŞIM: Hizmet Ekosistemi */}
      <section className="py-32 px-6 max-w-6xl mx-auto">
        <Reveal>
          <div className="mb-20 max-w-2xl">
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight uppercase text-white/90">
              Bütünsel{" "}
              <span className="text-brand-purple italic">Büyüme Mimarisi</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16">
          <Reveal>
            <div className="group space-y-5">
              <div className="h-12 w-12 rounded-2xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all duration-500">
                <Palette size={22} />
              </div>
              <h3 className="text-lg font-bold uppercase tracking-tight text-white/80 italic">
                Kimlik & Estetik Vizyon
              </h3>
              <p className="text-white/35 text-sm md:text-base font-light leading-relaxed">
                Markanızın ruhunu yansıtan kurumsal kimlik tasarımlarıyla,
                dijitalde güven uyandıran ve akılda kalan bir estetik varlık
                kurguluyoruz.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="group space-y-5">
              <div className="h-12 w-12 rounded-2xl bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center text-brand-purple group-hover:bg-brand-purple group-hover:text-white transition-all duration-500">
                <Cloud size={22} />
              </div>
              <h3 className="text-lg font-bold uppercase tracking-tight text-white/80 italic">
                Cloud & Teknoloji Altyapı
              </h3>
              <p className="text-white/35 text-sm md:text-base font-light leading-relaxed">
                Sarsılmaz bulut altyapıları ve modern sistem tasarımlarıyla,
                markanızı geleceğin teknolojik standartlarına bugünden
                taşıyoruz.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="group space-y-5">
              <div className="h-12 w-12 rounded-2xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all duration-500">
                <Target size={22} />
              </div>
              <h3 className="text-lg font-bold uppercase tracking-tight text-white/80 italic">
                Performans & Veri Disiplini
              </h3>
              <p className="text-white/35 text-sm md:text-base font-light leading-relaxed">
                Matematiğin soğukkanlılığıyla reklam bütçenizi yönetiyor,
                ölçülebilir ve ölçeklenebilir büyüme sinyallerini somut kâra
                dönüştürüyoruz.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="group space-y-5">
              <div className="h-12 w-12 rounded-2xl bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center text-brand-purple group-hover:bg-brand-purple group-hover:text-white transition-all duration-500">
                <Sparkles size={22} />
              </div>
              <h3 className="text-lg font-bold uppercase tracking-tight text-white/80 italic">
                Stratejik Medya Üretimi
              </h3>
              <p className="text-white/35 text-sm md:text-base font-light leading-relaxed">
                Doğru mecrada doğru hikayeyi anlatmak için sosyal medya ve medya
                tanıtım süreçlerini bir bütün olarak planlıyor ve yönetiyoruz.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4. FINAL: Kapanış Sloganı */}
      <section className="py-32 px-6">
        <Reveal>
          <div className="max-w-5xl mx-auto text-center border-t border-white/5 pt-24">
            <h2 className="text-2xl md:text-4xl font-light tracking-tight text-white/50 leading-tight">
              Dijital büyüme yolculuğunuzu <br />
              <span className="text-white italic font-medium">
                akılcı ve yaratıcı bir temelde kurgulayın.
              </span>
            </h2>
            <div className="mt-14">
              <Link
                href="/iletisim"
                className="inline-flex h-14 items-center justify-center rounded-full bg-white/5 border border-white/10 px-12 text-[10px] font-bold uppercase tracking-[0.3em] text-white/70 hover:bg-white hover:text-brand-dark transition-all duration-500"
              >
                Yol Haritasını Çizelim →
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
