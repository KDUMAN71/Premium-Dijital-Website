"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Monitor,
  Loader2,
  Mail,
  MailWarning,
  CheckCircle,
} from "lucide-react";
import { cn } from "@/utils/cn";
import {
  webAnalizSchema,
  WebAnalizValues,
} from "@/lib/validations/web-analiz";
import ScrollReveal from "@/components/ui/ScrollReveal";

async function submitWebAnaliz(data: WebAnalizValues) {
  try {
    const res = await fetch("/api/web-analiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch {
    return { error: "Bir hata oluştu, lütfen tekrar deneyin." };
  }
}

export default function WebAnalysisForm() {
  const shouldReduce = useReducedMotion();
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WebAnalizValues>({
    resolver: zodResolver(webAnalizSchema),
    mode: "onTouched",
  });

  const onSubmit = (data: WebAnalizValues) => {
    setServerError(null);
    startTransition(async () => {
      const response = await submitWebAnaliz(data);
      if (response.error) {
        setServerError(response.error);
      } else if (response.success) {
        setSuccess(response.message);
      }
    });
  };

  return (
    <section
      id="analiz"
      className="relative py-24 md:py-32 overflow-hidden border-t border-white/5 bg-brand-dark text-white"
    >
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full opacity-15 blur-[120px]"
        style={{ background: "radial-gradient(circle, #BE29EC, #0000C8)" }}
      />

      <div className="container mx-auto px-6 max-w-3xl relative z-10">
        <div className="mb-14 text-center">
          <ScrollReveal>
            <span className="inline-block px-4 py-1 rounded-full border border-white/10 bg-white/5 text-white/50 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
              Ücretsiz Site Analizi
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">
              Siteniz Nerede{" "}
              <span className="text-brand-purple">Duruyor?</span>
            </h2>
            <p className="text-gray-400 text-base">
              URL&apos;nizi ve hedefinizi paylaşın — 1 iş günü içinde teknik
              analiz ve öneri raporunuzu gönderiyoruz.
            </p>
          </ScrollReveal>
        </div>

        <div className="relative rounded-[2.5rem] border border-white/10 bg-[#080808] p-8 md:p-12 shadow-2xl">
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                className="text-center py-12 space-y-6"
                initial={shouldReduce ? false : { scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-brand-purple/10 border border-brand-purple/20">
                  <CheckCircle className="w-9 h-9 text-brand-purple" />
                </div>
                <div className="space-y-3 max-w-md mx-auto">
                  <h3 className="text-2xl font-black tracking-tight">
                    Talebiniz Alındı!
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {success}
                  </p>
                </div>
                <a
                  href="https://wa.me/905425658010?text=Merhaba%2C%20web%20site%20analizi%20talep%20ettim.%20Görüşmek%20isterim."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600/20 border border-green-500/30 text-green-400 text-sm font-bold hover:bg-green-600/30 transition-all"
                >
                  WhatsApp ile Görüşün →
                </a>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Site Bilgileri */}
                <fieldset className="space-y-5">
                  <legend className="flex items-center gap-3 text-sm font-bold text-white/70 tracking-tight mb-6">
                    <Monitor size={17} className="text-brand-purple" />
                    Site Bilgileri
                  </legend>

                  <div className="relative">
                    <label className="input-label">
                      Mevcut Web Sitesi URL&apos;si{" "}
                      <span className="text-white/30 normal-case font-normal">
                        (opsiyonel)
                      </span>
                    </label>
                    <input
                      {...register("mevcutSite")}
                      type="url"
                      placeholder="https://www.firmaniz.com"
                      className={cn(
                        "input-element",
                        errors.mevcutSite && "border-red-500/50",
                      )}
                    />
                    {errors.mevcutSite && (
                      <p className="error-text">{errors.mevcutSite.message}</p>
                    )}
                  </div>

                  <div className="relative">
                    <label className="input-label">Site Amacı</label>
                    <select
                      {...register("siteAmaci")}
                      className={cn(
                        "input-element appearance-none",
                        errors.siteAmaci && "border-red-500/50",
                      )}
                    >
                      <option value="">Seçin…</option>
                      <option>Kurumsal Tanıtım & İmaj</option>
                      <option>Müşteri Kazanımı & Lead Generation</option>
                      <option>E-Ticaret & Online Satış</option>
                      <option>Rezervasyon & Randevu Sistemi</option>
                      <option>Blog & İçerik Platformu</option>
                    </select>
                    {errors.siteAmaci && (
                      <p className="error-text">{errors.siteAmaci.message}</p>
                    )}
                  </div>

                  <div className="relative">
                    <label className="input-label">Mevcut Durum</label>
                    <select
                      {...register("mevcutDurum")}
                      className={cn(
                        "input-element appearance-none",
                        errors.mevcutDurum && "border-red-500/50",
                      )}
                    >
                      <option value="">Seçin…</option>
                      <option>Web sitem yok, sıfırdan başlıyorum</option>
                      <option>Mevcut sitem var, yenilenmeli</option>
                      <option>Mevcut sitem var, iyileştirilmeli</option>
                      <option>Farklı bir platform, taşınmak istiyorum</option>
                    </select>
                    {errors.mevcutDurum && (
                      <p className="error-text">{errors.mevcutDurum.message}</p>
                    )}
                  </div>

                  <div className="relative">
                    <label className="input-label">Bütçe Aralığı</label>
                    <select
                      {...register("butce")}
                      className={cn(
                        "input-element appearance-none",
                        errors.butce && "border-red-500/50",
                      )}
                    >
                      <option value="">Seçin…</option>
                      <option>50.000 TL altı</option>
                      <option>50.000 – 100.000 TL</option>
                      <option>100.000 – 200.000 TL</option>
                      <option>200.000 TL ve üzeri</option>
                    </select>
                    {errors.butce && (
                      <p className="error-text">{errors.butce.message}</p>
                    )}
                  </div>
                </fieldset>

                {/* İletişim */}
                <fieldset className="space-y-5 pt-8 border-t border-white/5">
                  <legend className="flex items-center gap-3 text-sm font-bold text-white/70 tracking-tight mb-6">
                    <Mail size={17} className="text-brand-blue" />
                    Analiz Gönderim Bilgileri
                  </legend>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="relative">
                      <label className="input-label">Ad Soyad</label>
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

                    <div className="relative">
                      <label className="input-label">E-posta</label>
                      <input
                        {...register("email")}
                        type="email"
                        placeholder="ad@firma.com"
                        className={cn(
                          "input-element",
                          errors.email && "border-red-500/50",
                        )}
                      />
                      {errors.email && (
                        <p className="error-text">{errors.email.message}</p>
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

                {/* Submit */}
                <motion.button
                  whileHover={
                    shouldReduce
                      ? undefined
                      : {
                          scale: 1.02,
                          boxShadow: "0 0 40px rgba(190,41,236,0.2)",
                        }
                  }
                  whileTap={shouldReduce ? undefined : { scale: 0.98 }}
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
                      <Loader2 className="animate-spin" size={18} />
                    ) : (
                      <Monitor size={18} />
                    )}
                    Ücretsiz Site Analizi İste →
                  </span>
                </motion.button>
              </motion.form>
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
        select.input-element option {
          background: #111;
          color: white;
        }
      `}</style>
    </section>
  );
}
