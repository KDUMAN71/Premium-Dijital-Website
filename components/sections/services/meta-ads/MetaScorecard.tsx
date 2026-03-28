"use client";

import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator,
  Loader2,
  Target,
  BarChart3,
  MailWarning,
  Info,
} from "lucide-react";
import { cn } from "@/utils/cn";
import {
  metaScorecardSchema,
  MetaScorecardValues,
} from "@/lib/validations/meta-scorecard";
import ScrollReveal from "@/components/ui/ScrollReveal";

async function processMetaScorecard(data: MetaScorecardValues) {
  try {
    const res = await fetch("/api/meta-scorecard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch {
    return { error: "Bir hata oluştu, lütfen tekrar deneyin." };
  }
}

export default function MetaScorecard() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{
    score: number;
    message: string;
  } | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MetaScorecardValues>({
    resolver: zodResolver(metaScorecardSchema),
    mode: "onTouched",
  });

  const onSubmit = (data: MetaScorecardValues) => {
    setServerError(null);
    startTransition(async () => {
      const response = await processMetaScorecard(data);
      if (response.error) {
        setServerError(response.error);
      } else if (response.success) {
        setResult({ score: response.score!, message: response.message! });
      }
    });
  };

  return (
    <section
      id="scorecard"
      className="relative py-24 md:py-32 overflow-hidden border-t border-white/5 bg-brand-dark text-white"
    >
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <ScrollReveal>
            <span className="inline-block px-4 py-1 rounded-full border border-white/10 bg-white/5 text-white/50 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
              Meta Reklam Performans Analizi
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6">
              Meta Reklam Hesabınızı{" "}
              <span className="text-brand-purple">Ücretsiz Analiz Edin</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed italic">
              Bütçenizi, dönüşümlerinizi ve CPM&apos;inizi girin — hesap
              verimlilik skorunuzu anında görün.
            </p>
          </ScrollReveal>
        </div>

        <div className="relative rounded-[2.5rem] border border-white/10 bg-[#080808] p-8 md:p-14 shadow-2xl">
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Kampanya Teknik Verileri */}
                <fieldset className="space-y-6">
                  <legend className="flex items-center gap-3 text-sm font-bold text-white/70 tracking-tight mb-8">
                    <BarChart3 size={18} className="text-brand-purple" />
                    Kampanya Teknik Verileri
                  </legend>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="relative group">
                      <label className="input-label">
                        Aylık Bütçe (TL)
                        <Info size={12} className="inline ml-1 text-gray-400" />
                      </label>
                      <input
                        {...register("budget", { valueAsNumber: true })}
                        type="number"
                        placeholder="Örn: 25000"
                        className={cn(
                          "input-element",
                          errors.budget && "border-red-500/50",
                        )}
                      />
                      {errors.budget && (
                        <p className="error-text">{errors.budget.message}</p>
                      )}
                    </div>
                    <div className="relative group">
                      <label className="input-label">
                        Aylık Dönüşüm
                        <Info size={12} className="inline ml-1 text-gray-400" />
                      </label>
                      <input
                        {...register("conversions", { valueAsNumber: true })}
                        type="number"
                        placeholder="Örn: 80"
                        className={cn(
                          "input-element",
                          errors.conversions && "border-red-500/50",
                        )}
                      />
                      {errors.conversions && (
                        <p className="error-text">
                          {errors.conversions.message}
                        </p>
                      )}
                    </div>
                    <div className="relative group">
                      <label className="input-label">
                        Ortalama CPM (TL)
                        <Info size={12} className="inline ml-1 text-gray-400" />
                      </label>
                      <input
                        {...register("cpm", { valueAsNumber: true })}
                        type="number"
                        step="0.1"
                        placeholder="Örn: 45"
                        className={cn(
                          "input-element",
                          errors.cpm && "border-red-500/50",
                        )}
                      />
                      {errors.cpm && (
                        <p className="error-text">{errors.cpm.message}</p>
                      )}
                    </div>
                  </div>
                </fieldset>

                {/* Rapor Bilgileri */}
                <fieldset className="space-y-6 pt-10 border-t border-white/5">
                  <legend className="flex items-center gap-3 text-sm font-bold text-white/70 tracking-tight mb-8">
                    <Target size={18} className="text-brand-blue" />
                    Rapor Gönderim Bilgileri
                  </legend>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="relative group">
                      <label className="input-label">Adınız Soyadınız</label>
                      <input
                        {...register("fullName")}
                        placeholder="Ad Soyad"
                        className={cn(
                          "input-element",
                          errors.fullName && "border-red-500/50",
                        )}
                      />
                      {errors.fullName && (
                        <p className="error-text">{errors.fullName.message}</p>
                      )}
                    </div>
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
                    <div className="relative group md:col-span-2">
                      <label className="input-label">Web Sitesi URL</label>
                      <input
                        {...register("website")}
                        type="url"
                        placeholder="https://www.firma.com"
                        className={cn(
                          "input-element",
                          errors.website && "border-red-500/50",
                        )}
                      />
                      {errors.website && (
                        <p className="error-text">{errors.website.message}</p>
                      )}
                    </div>
                  </div>
                </fieldset>

                {/* Honeypot */}
                <input
                  {...register("company_honey")}
                  type="text"
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                {serverError && (
                  <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm font-medium">
                    <MailWarning size={20} />
                    {serverError}
                  </div>
                )}

                {/* CTA */}
                <motion.button
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 0 40px rgba(190,41,236,0.2)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isPending}
                  className="group relative w-full h-16 flex items-center justify-center overflow-hidden rounded-2xl bg-brand-dark border border-white/10 text-white font-bold uppercase tracking-widest text-[11px] cursor-pointer outline-none"
                >
                  <motion.div
                    initial={{ x: "-150%" }}
                    animate={{ x: "150%" }}
                    transition={{
                      repeat: Infinity,
                      duration: 2.5,
                      ease: "linear",
                      repeatDelay: 1,
                    }}
                    className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-[-20deg] pointer-events-none"
                  />
                  <span className="relative z-10 flex items-center gap-3">
                    {isPending ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <Calculator size={18} />
                    )}
                    Meta Performans Skorunu Hesapla ve Rapor Al
                  </span>
                </motion.button>
              </motion.form>
            ) : (
              <motion.div
                key="result"
                className="text-center space-y-10 py-10"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <div className="inline-flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-brand-purple/10 blur-[60px] rounded-full" />
                  <div className="relative text-8xl font-black text-white tracking-tighter select-none">
                    {result.score}
                  </div>
                </div>
                <div className="space-y-3 max-w-md mx-auto">
                  <h3 className="text-2xl font-bold tracking-tight">
                    Meta Hesap Performans Skorunuz
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {result.message}
                    <br />
                    Bu skor, Meta reklam stratejinizi ve bütçe verimliliğinizi
                    optimize etmek için bir yol göstericidir.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={() => setResult(null)}
                    className="text-[10px] font-black uppercase tracking-widest text-brand-purple border-b border-brand-purple/30 pb-1"
                  >
                    ← Yeni Analiz Yap
                  </button>
                  <a
                    href={`https://wa.me/905425658010?text=Merhaba%2C%20Meta%20Ads%20performans%20skorum%20${result.score}%20%C3%A7%C4%B1kt%C4%B1.%20%C3%9Ccretsiz%20strateji%20g%C3%B6r%C3%BC%C5%9Fmesi%20talep%20ediyorum.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600/20 border border-green-500/30 text-green-400 text-sm font-bold hover:bg-green-600/30 transition-all"
                  >
                    WhatsApp ile Görüşün →
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style jsx global>{`
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type="number"] {
          -moz-appearance: textfield;
        }
      `}</style>

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
          border-color: #be29ec;
          background: rgba(255, 255, 255, 0.05);
          box-shadow: 0 0 15px rgba(190, 41, 236, 0.15);
        }
        .input-label {
          display: block;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 0.5rem;
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
