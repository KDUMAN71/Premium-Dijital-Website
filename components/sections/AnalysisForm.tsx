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

  // ✅ Bu ref, her durumda DOM’da kalacak (scroll garantili)
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
      goal: "",
      botField: "",
      otherGoal: "",
    },
  });

  const selectedGoal = watch("goal");
  const showOther = selectedGoal === "OTHER";

  useEffect(() => {
    if (!showOther) setValue("otherGoal", "");
  }, [showOther, setValue]);

  // ✅ Success olunca kesin scroll
  useEffect(() => {
    if (isSuccess) {
      // rAF: success UI DOM'a otursun diye 1 frame beklet
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
      else
        setServerError("Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.");
    });
  };

  return (
    <section id="analiz" className="py-32 px-6 max-w-5xl mx-auto">
      {/* ✅ scroll hedefi: header offset için */}
      <div ref={topRef} className="scroll-mt-28" />

      <div className="text-center mb-16">
        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-6 italic">
          Ücretsiz <span className="text-brand-blue font-bold">Analiz</span>
        </h2>
        <p className="text-gray-500 font-medium tracking-wide italic">
          Büyüme motorunuzu inşa etmek için ilk adımı atın.
        </p>
      </div>

      {/* ✅ Form ve Success aynı “slot” içinde swap olacak */}
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="p-16 text-center bg-[#0a0a0a] border border-brand-blue/30 rounded-[3rem] shadow-2xl"
          >
            <div className="text-6xl mb-8">💎</div>
            <h3 className="text-3xl font-bold mb-4 uppercase tracking-tighter text-brand-blue">
              Analiz Talebiniz Alındı
            </h3>
            <p className="text-gray-400 text-lg">
              Dijital stratejiniz uzman ekibimiz tarafından incelenmeye
              başlandı.
            </p>

            {/* opsiyonel: tekrar gönder */}
            <button
              type="button"
              onClick={() => {
                setIsSuccess(false);
                setServerError(null);
                setStartTime(Date.now().toString()); // timing check için yeniden
                requestAnimationFrame(() => {
                  topRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                });
              }}
              className="mt-10 inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 py-4 text-xs font-bold uppercase tracking-[0.3em] text-white/80 hover:text-white hover:bg-white/10 transition"
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
            className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#0c0c0c] p-8 md:p-14 rounded-[3.5rem] border border-white/5 relative overflow-hidden shadow-2xl"
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
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-black ml-2">
                Yetkili Ad Soyad
              </label>
              <input
                {...register("fullName")}
                autoComplete="name"
                placeholder="Örn: Ahmet Yılmaz"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-brand-blue transition-all font-medium text-white placeholder:text-white/10"
              />
              {errors.fullName && (
                <p className="text-red-500 text-[10px] ml-2 uppercase font-bold">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-black ml-2">
                Kurumsal E-Posta
              </label>
              <input
                {...register("email")}
                autoComplete="email"
                inputMode="email"
                placeholder="kurumsal@sirketiniz.com"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-brand-blue transition-all font-medium text-white placeholder:text-white/10"
              />
              {errors.email && (
                <p className="text-red-500 text-[10px] ml-2 uppercase font-bold">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Website */}
            <div className="space-y-3 md:col-span-2">
              <label className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-black ml-2">
                İncelenecek Platform URL
              </label>
              <input
                {...register("website")}
                autoComplete="url"
                inputMode="url"
                placeholder="https://www.sirketiniz.com"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-brand-blue transition-all font-medium text-white placeholder:text-white/10"
              />
              {errors.website && (
                <p className="text-red-500 text-[10px] ml-2 uppercase font-bold">
                  {errors.website.message}
                </p>
              )}
            </div>

            {/* Goal Select */}
            <div className="space-y-3 md:col-span-2 relative">
              <label className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-black ml-2">
                Stratejik Hedef
              </label>

              <div className="relative group">
                <select
                  {...register("goal")}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-brand-blue transition-all font-medium appearance-none cursor-pointer pr-12 text-white"
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

                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-white/30 group-hover:text-brand-blue transition-colors">
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
                <p className="text-red-500 text-[10px] ml-2 uppercase font-bold mt-2">
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
                  className="space-y-3 md:col-span-2 overflow-hidden"
                >
                  <label className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-black ml-2">
                    İhtiyacınızı Belirtin
                  </label>
                  <textarea
                    {...register("otherGoal")}
                    placeholder="Size nasıl yardımcı olabiliriz?"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-brand-blue transition-all font-medium text-white min-h-[120px] resize-none"
                  />
                  {errors.otherGoal && (
                    <p className="text-red-500 text-[10px] ml-2 uppercase font-bold">
                      {errors.otherGoal.message}
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {serverError && (
              <div className="md:col-span-2 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs font-bold text-center">
                {serverError}
              </div>
            )}

            <div className="md:col-span-2 pt-6">
              <button
                type="submit"
                disabled={isPending}
                aria-busy={isPending}
                className={`w-full relative h-20 rounded-3xl font-black text-sm uppercase tracking-[0.3em] overflow-hidden
                  shadow-2xl shadow-brand-blue/30 transition-all active:scale-95
                  ${
                    isPending
                      ? "bg-brand-blue/70 cursor-not-allowed opacity-80"
                      : "bg-brand-blue cursor-pointer hover:shadow-[0_0_60px_rgba(0,0,200,0.5)]"
                  }`}
              >
                {!isPending && (
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />
                )}

                <span className="relative z-10 flex items-center justify-center gap-3">
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
