"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { AnalysisSchema, type AnalysisInput } from "@/lib/validations/analysis";
import { submitAnalysisAction } from "@/app/(marketing)/_actions/analysis";

export default function AnalysisForm() {
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [startTime, setStartTime] = useState("");

  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setStartTime(Date.now().toString());
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<AnalysisInput>({
    resolver: zodResolver(AnalysisSchema),
    shouldUnregister: true,
    defaultValues: {
      goal: undefined,
      botField: "",
      otherGoal: "",
    },
  });

  const selectedGoal = watch("goal");
  const showOther = selectedGoal === "OTHER";

  useEffect(() => {
    if (!showOther) setValue("otherGoal", "");
  }, [showOther, setValue]);

  useEffect(() => {
    if (isSuccess) {
      requestAnimationFrame(() => {
        topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [isSuccess]);

  const onSubmit = (data: AnalysisInput) => {
    setServerError(null);

    startTransition(async () => {
      const result = await submitAnalysisAction({
        ...data,
        formStartTime: startTime,
      });

      if (result?.success) {
        setIsSuccess(true);
        reset();
        return;
      }

      if (result?.error) setServerError(result.error);
      else {
        setServerError("Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.");
      }
    });
  };

  return (
    <section
      id="analiz"
      className="mx-auto max-w-5xl px-4 py-16 sm:px-5 sm:py-20 md:px-6 md:py-28"
    >
      <div ref={topRef} className="scroll-mt-28" />

      <div className="mb-10 text-center sm:mb-12 md:mb-16">
        <h2 className="mb-4 text-3xl font-bold tracking-tighter uppercase italic sm:mb-5 sm:text-4xl md:mb-6 md:text-7xl">
          Ücretsiz <span className="font-bold text-brand-blue">Analiz</span>
        </h2>

        <p className="text-sm font-medium italic tracking-wide text-gray-500 sm:text-base">
          Büyüme motorunuzu inşa etmek için ilk adımı atın.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="rounded-[2rem] border border-brand-blue/30 bg-[#0a0a0a] p-8 text-center shadow-2xl sm:rounded-[2.5rem] sm:p-10 md:rounded-[3rem] md:p-16"
          >
            <div className="mb-6 text-5xl sm:mb-7 sm:text-6xl md:mb-8">💎</div>

            <h3 className="mb-3 text-2xl font-bold uppercase tracking-tighter text-brand-blue sm:mb-4 sm:text-3xl">
              Analiz Talebiniz Alındı
            </h3>

            <p className="text-sm text-gray-400 sm:text-base md:text-lg">
              Dijital stratejiniz uzman ekibimiz tarafından incelenmeye
              başlandı.
            </p>

            <button
              type="button"
              onClick={() => {
                setIsSuccess(false);
                setServerError(null);
                setStartTime(Date.now().toString());
                requestAnimationFrame(() => {
                  topRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                });
              }}
              className="mt-8 inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.22em] text-white/80 transition hover:bg-white/10 hover:text-white sm:mt-10 sm:px-8 sm:text-xs sm:tracking-[0.3em]"
            >
              Yeni Talep Oluştur
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="relative grid grid-cols-1 gap-5 overflow-hidden rounded-[2rem] border border-white/5 bg-[#0c0c0c] p-5 shadow-2xl sm:gap-6 sm:rounded-[2.5rem] sm:p-7 md:grid-cols-2 md:gap-8 md:rounded-[3.5rem] md:p-14"
          >
            {/* Honeypot */}
            <input
              type="text"
              {...register("botField")}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            {/* Full Name */}
            <div className="space-y-2.5 sm:space-y-3">
              <label className="ml-1.5 text-[10px] font-black uppercase tracking-[0.24em] text-white/30 sm:ml-2 sm:tracking-[0.32em] md:tracking-[0.4em]">
                Yetkili Ad Soyad
              </label>
              <input
                {...register("fullName")}
                autoComplete="name"
                placeholder="Örn: Ahmet Yılmaz"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 font-medium text-white outline-none transition-all placeholder:text-white/10 focus:border-brand-blue sm:px-6 sm:py-5"
              />
              {errors.fullName && (
                <p className="ml-1.5 text-[10px] font-bold uppercase text-red-500 sm:ml-2">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2.5 sm:space-y-3">
              <label className="ml-1.5 text-[10px] font-black uppercase tracking-[0.24em] text-white/30 sm:ml-2 sm:tracking-[0.32em] md:tracking-[0.4em]">
                Kurumsal E-Posta
              </label>
              <input
                {...register("email")}
                autoComplete="email"
                inputMode="email"
                placeholder="kurumsal@sirketiniz.com"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 font-medium text-white outline-none transition-all placeholder:text-white/10 focus:border-brand-blue sm:px-6 sm:py-5"
              />
              {errors.email && (
                <p className="ml-1.5 text-[10px] font-bold uppercase text-red-500 sm:ml-2">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Website */}
            <div className="space-y-2.5 sm:space-y-3 md:col-span-2">
              <label className="ml-1.5 text-[10px] font-black uppercase tracking-[0.24em] text-white/30 sm:ml-2 sm:tracking-[0.32em] md:tracking-[0.4em]">
                İncelenecek Platform URL
              </label>
              <input
                {...register("website")}
                autoComplete="url"
                inputMode="url"
                placeholder="https://www.sirketiniz.com"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 font-medium text-white outline-none transition-all placeholder:text-white/10 focus:border-brand-blue sm:px-6 sm:py-5"
              />
              {errors.website && (
                <p className="ml-1.5 text-[10px] font-bold uppercase text-red-500 sm:ml-2">
                  {errors.website.message}
                </p>
              )}
            </div>

            {/* Goal Select */}
            <div className="relative space-y-2.5 sm:space-y-3 md:col-span-2">
              <label className="ml-1.5 text-[10px] font-black uppercase tracking-[0.24em] text-white/30 sm:ml-2 sm:tracking-[0.32em] md:tracking-[0.4em]">
                Stratejik Hedef
              </label>

              <div className="group relative">
                <select
                  {...register("goal")}
                  className="w-full cursor-pointer appearance-none rounded-2xl border border-white/10 bg-white/5 px-5 py-4 pr-12 font-medium text-white outline-none transition-all focus:border-brand-blue sm:px-6 sm:py-5"
                >
                  <option value="" className="bg-black">
                    Lütfen seçim yapınız
                  </option>
                  <option value="SATIŞ" className="bg-black">
                    Satışları ve Ciro Verimliliğini Artırmak
                  </option>
                  <option value="LEAD" className="bg-black">
                    Nitelikli Talep (Lead) Sayısını Yükseltmek
                  </option>
                  <option value="BRAND" className="bg-black">
                    Pazar Otoritesi ve Marka Bilinirliği
                  </option>
                  <option value="SEO" className="bg-black">
                    Teknik Altyapı ve SEO Dominasyonu
                  </option>
                  <option value="OTHER" className="bg-black">
                    Diğer (Lütfen Belirtiniz)
                  </option>
                </select>

                <div className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-white/30 transition-colors group-hover:text-brand-blue sm:right-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
              </div>

              {errors.goal && (
                <p className="mt-2 ml-1.5 text-[10px] font-bold uppercase text-red-500 sm:ml-2">
                  {errors.goal.message}
                </p>
              )}
            </div>

            {/* OTHER textarea */}
            <AnimatePresence>
              {showOther && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2.5 overflow-hidden sm:space-y-3 md:col-span-2"
                >
                  <label className="ml-1.5 text-[10px] font-black uppercase tracking-[0.24em] text-white/30 sm:ml-2 sm:tracking-[0.32em] md:tracking-[0.4em]">
                    İhtiyacınızı Belirtin
                  </label>
                  <textarea
                    {...register("otherGoal")}
                    placeholder="Size nasıl yardımcı olabiliriz?"
                    className="min-h-[110px] w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-5 py-4 font-medium text-white outline-none transition-all focus:border-brand-blue sm:min-h-[120px] sm:px-6 sm:py-5"
                  />
                  {errors.otherGoal && (
                    <p className="ml-1.5 text-[10px] font-bold uppercase text-red-500 sm:ml-2">
                      {errors.otherGoal.message}
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {serverError && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-center text-xs font-bold text-red-500 md:col-span-2">
                {serverError}
              </div>
            )}

            <div className="pt-2 sm:pt-4 md:col-span-2 md:pt-6">
              <button
                type="submit"
                disabled={isPending}
                aria-busy={isPending}
                className={`relative h-16 w-full overflow-hidden rounded-[1.6rem] text-xs font-black uppercase tracking-[0.18em] shadow-2xl shadow-brand-blue/30 transition-all active:scale-95 sm:h-18 sm:rounded-[1.8rem] sm:text-sm sm:tracking-[0.24em] md:h-20 md:rounded-3xl md:tracking-[0.3em]
                  ${
                    isPending
                      ? "cursor-not-allowed bg-brand-blue/70 opacity-80"
                      : "cursor-pointer bg-brand-blue hover:shadow-[0_0_60px_rgba(0,0,200,0.5)]"
                  }`}
              >
                {!isPending && (
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_3s_infinite]" />
                )}

                <span className="relative z-10 flex items-center justify-center gap-3 px-4 text-center">
                  {isPending ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Analiz Motoru Çalışıyor...
                    </>
                  ) : (
                    "Analiz Talebini Başlat →"
                  )}
                </span>
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </section>
  );
}
