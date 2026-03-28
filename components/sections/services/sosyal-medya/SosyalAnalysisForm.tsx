"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  BarChart3,
  Loader2,
  Mail,
  MailWarning,
  CheckCircle,
} from "lucide-react";
import { cn } from "@/utils/cn";
import {
  sosyalAnalizSchema,
  SosyalAnalizValues,
} from "@/lib/validations/sosyal-analiz";
import ScrollReveal from "@/components/ui/ScrollReveal";

const platformOptions = [
  {
    value: "Instagram & Facebook",
    label: "Instagram & Facebook",
    color: "#E1306C",
  },
  { value: "LinkedIn", label: "LinkedIn", color: "#0077B5" },
  { value: "YouTube", label: "YouTube", color: "#FF0000" },
  { value: "TikTok", label: "TikTok", color: "#69C9D0" },
];

async function submitSosyalAnaliz(data: SosyalAnalizValues) {
  try {
    const res = await fetch("/api/sosyal-analiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch {
    return { error: "Bir hata oluştu, lütfen tekrar deneyin." };
  }
}

export default function SosyalAnalysisForm() {
  const shouldReduce = useReducedMotion();
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SosyalAnalizValues>({
    resolver: zodResolver(sosyalAnalizSchema),
    mode: "onTouched",
    defaultValues: { platforms: [] },
  });

  const selectedPlatforms = watch("platforms") ?? [];

  const togglePlatform = (value: string) => {
    const current = selectedPlatforms as string[];
    if (current.includes(value)) {
      setValue(
        "platforms",
        current.filter((p) => p !== value),
        {
          shouldValidate: true,
        },
      );
    } else {
      setValue("platforms", [...current, value], { shouldValidate: true });
    }
  };

  const onSubmit = (data: SosyalAnalizValues) => {
    setServerError(null);
    startTransition(async () => {
      const response = await submitSosyalAnaliz(data);
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
              Ücretsiz Platform Analizi
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">
              Rakipleriniz Sosyal Medyada{" "}
              <span className="text-brand-purple">Ne Yapıyor?</span>
            </h2>
            <p className="text-gray-400 text-base">
              Platformunuzu ve hedefinizi belirtin — 1 iş günü içinde rakip
              analizi ve platform önerimizi gönderiyoruz.
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
                  href="https://wa.me/905425658010?text=Merhaba%2C%20sosyal%20medya%20platform%20analizi%20talep%20ettim.%20Görüşmek%20isterim."
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
                {/* Platform seçimi */}
                <fieldset className="space-y-5">
                  <legend className="flex items-center gap-3 text-sm font-bold text-white/70 tracking-tight mb-6">
                    <BarChart3 size={17} className="text-brand-purple" />
                    Platform Bilgileri
                  </legend>

                  <div>
                    <p className="input-label mb-3">
                      Yönetmek İstediğiniz Platformlar
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {platformOptions.map((opt) => {
                        const isSelected = selectedPlatforms.includes(
                          opt.value,
                        );
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => togglePlatform(opt.value)}
                            className="relative flex items-center gap-3 px-4 py-3 rounded-2xl border text-left transition-all duration-200 cursor-pointer"
                            style={{
                              background: isSelected
                                ? `${opt.color}12`
                                : "rgba(255,255,255,0.02)",
                              borderColor: isSelected
                                ? `${opt.color}50`
                                : "rgba(255,255,255,0.08)",
                              boxShadow: isSelected
                                ? `0 0 12px ${opt.color}20`
                                : "none",
                            }}
                          >
                            <span
                              className="w-4 h-4 rounded-md shrink-0 border-2 flex items-center justify-center transition-all"
                              style={{
                                borderColor: isSelected
                                  ? opt.color
                                  : "rgba(255,255,255,0.2)",
                                background: isSelected
                                  ? opt.color
                                  : "transparent",
                              }}
                            >
                              {isSelected && (
                                <svg
                                  className="w-2.5 h-2.5 text-white"
                                  fill="none"
                                  viewBox="0 0 10 8"
                                >
                                  <path
                                    d="M1 4l2.5 2.5L9 1"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              )}
                            </span>
                            <span
                              className="text-xs font-bold"
                              style={{
                                color: isSelected
                                  ? opt.color
                                  : "rgba(255,255,255,0.55)",
                              }}
                            >
                              {opt.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                    {errors.platforms && (
                      <p className="mt-2 text-[11px] font-semibold text-red-400">
                        {errors.platforms.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="relative">
                      <label className="input-label">
                        Mevcut Takipçi Sayısı
                      </label>
                      <select
                        {...register("takipci")}
                        className={cn(
                          "input-element appearance-none",
                          errors.takipci && "border-red-500/50",
                        )}
                      >
                        <option value="">Seçin…</option>
                        <option>0–500</option>
                        <option>500–2.000</option>
                        <option>2.000–10.000</option>
                        <option>10.000+</option>
                      </select>
                      {errors.takipci && (
                        <p className="error-text">{errors.takipci.message}</p>
                      )}
                    </div>

                    <div className="relative">
                      <label className="input-label">Ana Hedef</label>
                      <select
                        {...register("hedef")}
                        className={cn(
                          "input-element appearance-none",
                          errors.hedef && "border-red-500/50",
                        )}
                      >
                        <option value="">Seçin…</option>
                        <option>Marka Bilinirliği</option>
                        <option>Müşteri Kazanımı</option>
                        <option>Topluluk Büyütme</option>
                        <option>İçerik Üretimi</option>
                      </select>
                      {errors.hedef && (
                        <p className="error-text">{errors.hedef.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="relative">
                    <label className="input-label">
                      Aylık Sosyal Medya Bütçesi
                    </label>
                    <select
                      {...register("butce")}
                      className={cn(
                        "input-element appearance-none",
                        errors.butce && "border-red-500/50",
                      )}
                    >
                      <option value="">Seçin…</option>
                      <option>20.000 TL altı</option>
                      <option>20.000 – 35.000 TL</option>
                      <option>35.000 – 60.000 TL</option>
                      <option>60.000 TL ve üzeri</option>
                    </select>
                    {errors.butce && (
                      <p className="error-text">{errors.butce.message}</p>
                    )}
                  </div>

                  <div className="relative">
                    <label className="input-label">İçerik Tipi</label>
                    <select
                      {...register("icerikTipi")}
                      className={cn(
                        "input-element appearance-none",
                        errors.icerikTipi && "border-red-500/50",
                      )}
                    >
                      <option value="">Seçin…</option>
                      <option>Stock görsel + şablon tasarım</option>
                      <option>Özel grafik tasarım (her post için)</option>
                      <option>Video & Reels (çekimsiz, kurgu/montaj)</option>
                      <option>Fotoğraf veya video çekimi gerekiyor</option>
                    </select>
                    {errors.icerikTipi && (
                      <p className="error-text">{errors.icerikTipi.message}</p>
                    )}
                  </div>

                  <div className="relative">
                    <label className="input-label">
                      Topluluk Yönetimi İhtiyacı
                    </label>
                    <select
                      {...register("toplulukYonetimi")}
                      className={cn(
                        "input-element appearance-none",
                        errors.toplulukYonetimi && "border-red-500/50",
                      )}
                    >
                      <option value="">Seçin…</option>
                      <option>
                        Sadece içerik yayını — yorum/DM yönetimi yok
                      </option>
                      <option>
                        Temel — haftada birkaç gün yorum yanıtlama
                      </option>
                      <option>Aktif — her gün takip ve yanıt</option>
                      <option>7/24 izleme ve anlık müdahale</option>
                    </select>
                    {errors.toplulukYonetimi && (
                      <p className="error-text">
                        {errors.toplulukYonetimi.message}
                      </p>
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

                  <div className="relative">
                    <label className="input-label">
                      Web Sitesi{" "}
                      <span className="text-white/30 normal-case font-normal">
                        (opsiyonel)
                      </span>
                    </label>
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

                  <div className="relative">
                    <label className="input-label">
                      Mevcut Sosyal Medya Hesapları{" "}
                      <span className="text-white/30 normal-case font-normal">
                        (opsiyonel)
                      </span>
                    </label>
                    <textarea
                      {...register("mevcutHesaplar")}
                      placeholder="Örn: instagram.com/firma, linkedin.com/company/firma"
                      rows={3}
                      className="input-element resize-none"
                    />
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
                      <BarChart3 size={18} />
                    )}
                    Ücretsiz Platform Analizi İste →
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
