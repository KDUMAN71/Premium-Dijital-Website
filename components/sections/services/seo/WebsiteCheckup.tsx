"use client";

import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Loader2,
  CheckCircle2,
  Globe,
  ShieldAlert,
  Zap,
} from "lucide-react";
import { cn } from "@/utils/cn";
import ScrollReveal from "@/components/ui/ScrollReveal";

// 1. Validation Şeması (Veri Disiplini)
const checkupSchema = z.object({
  website: z
    .string()
    .url("Geçerli bir web sitesi URL'si giriniz (https://...)."),
  email: z.string().email("Kurumsal e-posta adresinizi giriniz."),
  fullName: z.string().min(3, "Ad Soyad en az 3 karakter olmalıdır."),
  focus: z.enum(["technical", "content", "authority", "all"]),
  company_honey: z.string().max(0, "Bot detected").optional(), // Honeypot
});

type CheckupValues = z.infer<typeof checkupSchema>;

export default function WebsiteCheckup() {
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckupValues>({
    resolver: zodResolver(checkupSchema),
  });

  const onSubmit = (data: CheckupValues) => {
    startTransition(async () => {
      // Burada mevcut AnalysisForm aksiyonunuzu veya benzer bir yapıyı çağırabilirsiniz
      console.log("SEO Checkup Talebi:", data);
      await new Promise((res) => setTimeout(res, 2000)); // Simülasyon
      setIsSuccess(true);
    });
  };

  return (
    <section
      id="checkup"
      className="relative py-24 md:py-32 overflow-hidden border-t border-white/5 bg-[#050505]"
    >
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <div className="mb-16 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6">
              Ücretsiz Teknik{" "}
              <span className="text-brand-blue">SEO Checkup</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed italic">
              "Rakamlarla Kanıtlanmış, Hayallerle Tasarlanmış" vizyonumuzla
              sitenizin teknik kapasitesini 24 saat içinde analiz edelim.
            </p>
          </ScrollReveal>
        </div>

        <div className="rounded-[3rem] border border-white/10 bg-white/[0.02] p-8 md:p-16 backdrop-blur-3xl shadow-2xl">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.form
                key="checkup-form"
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Web Sitesi URL */}
                  <div className="relative md:col-span-2 group">
                    <label className="input-label">
                      Web Sitesi URL (Analiz Edilecek Adres)
                    </label>
                    <div className="relative">
                      <Globe
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-blue transition-colors"
                        size={18}
                      />
                      <input
                        {...register("website")}
                        placeholder="https://www.markaniz.com"
                        className={cn(
                          "input-element pl-12",
                          errors.website && "border-red-500/50",
                        )}
                      />
                    </div>
                    {errors.website && (
                      <p className="error-text">{errors.website.message}</p>
                    )}
                  </div>

                  {/* Ad Soyad */}
                  <div className="relative group">
                    <label className="input-label">Adınız Soyadınız</label>
                    <input
                      {...register("fullName")}
                      placeholder="Kerim ..."
                      className={cn(
                        "input-element",
                        errors.fullName && "border-red-500/50",
                      )}
                    />
                    {errors.fullName && (
                      <p className="error-text">{errors.fullName.message}</p>
                    )}
                  </div>

                  {/* E-posta */}
                  <div className="relative group">
                    <label className="input-label">Kurumsal E-posta</label>
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="ad.soyad@firma.com"
                      className={cn(
                        "input-element",
                        errors.email && "border-red-500/50",
                      )}
                    />
                    {errors.email && (
                      <p className="error-text">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Analiz Odağı */}
                  <div className="relative md:col-span-2 group">
                    <label className="input-label">
                      Öncelikli Analiz Odağınız
                    </label>
                    <select
                      {...register("focus")}
                      className="input-element appearance-none bg-[#080808]"
                    >
                      <option value="all">
                        Bütünsel Teknik & İçerik Analizi
                      </option>
                      <option value="technical">
                        Sadece Teknik SEO & Hız (Core Web Vitals)
                      </option>
                      <option value="content">
                        İçerik Stratejisi & Semantik Otorite
                      </option>
                      <option value="authority">
                        Domain Otoritesi & Backlink Profili
                      </option>
                    </select>
                  </div>
                </div>

                {/* Honeypot */}
                <input
                  {...register("company_honey")}
                  type="text"
                  className="hidden"
                  tabIndex={-1}
                />

                <button
                  disabled={isPending}
                  className="w-full h-16 rounded-2xl bg-gradient-to-r from-brand-blue to-brand-purple font-black uppercase tracking-widest text-white text-[11px] shadow-lg shadow-brand-blue/20 hover:scale-[1.01] transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  {isPending ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : (
                    <Search size={18} />
                  )}
                  {isPending
                    ? "Sistem Analiz Ediliyor..."
                    : "Checkup Talebi Oluştur"}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                className="text-center py-12"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <div className="w-20 h-20 rounded-full bg-brand-blue/10 flex items-center justify-center mx-auto mb-8 border border-brand-blue/20">
                  <CheckCircle2 size={40} className="text-brand-blue" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Talebiniz Alındı</h3>
                <p className="text-gray-400 max-w-sm mx-auto leading-relaxed">
                  Teknik ekibimiz sitenizi incelemeye başladı. 24 saat içinde
                  kapsamlı bir
                  <strong> Dijital Büyüme Mimari</strong> raporu e-posta
                  adresinize iletilecektir.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="mt-10 text-[10px] font-black uppercase tracking-widest text-brand-purple border-b border-brand-purple/30 pb-1"
                >
                  Yeni Bir Analiz Başlat
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style jsx>{`
        .input-element {
          width: 100%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 1rem;
          padding: 1.1rem 1.25rem;
          font-size: 0.85rem;
          color: white;
          outline: none;
          transition: all 0.3s;
        }
        .input-element:focus {
          border-color: #0000c8; /* Mavi */
          background: rgba(255, 255, 255, 0.05);
          box-shadow: 0 0 20px rgba(0, 0, 200, 0.1);
        }
        .input-label {
          display: block;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: rgba(255, 255, 255, 0.4);
          margin-bottom: 0.6rem;
          margin-left: 0.25rem;
        }
        .error-text {
          position: absolute;
          bottom: -18px;
          left: 10px;
          font-size: 9px;
          font-weight: 600;
          color: #f87171;
        }
      `}</style>
    </section>
  );
}
