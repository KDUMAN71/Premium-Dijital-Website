"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";

/* ─────────────────────────────────────────────
   Schema — inline (dışarıdan import da edilebilir)
───────────────────────────────────────────── */
const AnalysisSchema = z
  .object({
    botField: z.string().max(0, "Bot detected"),
    sector: z.string().min(1, "Sektör seçimi zorunludur"),
    otherSector: z.string().optional().default(""),
    goal: z.string().min(1, "Hedef seçimi zorunludur"),
    fullName: z.string().min(2, "Ad soyad en az 2 karakter olmalıdır"),
    email: z.string().email("Geçerli bir e-posta adresi giriniz"),
    phone: z.string().optional(),
    website: z.string().optional(),
    otherGoal: z.string().optional(),
  })
  .superRefine((d, ctx) => {
    if (d.goal === "OTHER" && (!d.otherGoal || d.otherGoal.length < 3)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["otherGoal"],
        message: "Lütfen hedefinizi belirtiniz",
      });
    }
    if (
      d.sector === "OTHER" &&
      (!d.otherSector || d.otherSector.trim().length < 2)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["otherSector"],
        message: "Lütfen sektörünüzü belirtiniz",
      });
    }
  });

type AnalysisInput = z.infer<typeof AnalysisSchema>;

/* ─────────────────────────────────────────────
   Sektör & hedef verileri
───────────────────────────────────────────── */
const SECTORS = [
  { value: "HEALTH", label: "Sağlık & Klinik", icon: "🏥" },
  { value: "TOURISM", label: "Turizm & Konaklama", icon: "✈️" },
  { value: "ECOMM", label: "E-Ticaret", icon: "🛒" },
  { value: "SERVICE", label: "Hizmet & Danışmanlık", icon: "💼" },
  { value: "BEAUTY", label: "Estetik & Güzellik", icon: "✨" },
  { value: "OTHER", label: "Diğer", icon: "🔷" },
];

const GOALS_BY_SECTOR: Record<string, { value: string; label: string }[]> = {
  HEALTH: [
    { value: "PATIENT", label: "Hasta Kazanımı & Randevu Artışı" },
    { value: "HTOURISM", label: "Sağlık Turizmi & Uluslararası Hasta" },
    { value: "BRAND", label: "Klinik / Hastane Bilinirliği" },
    { value: "SEO", label: "Google'da Üst Sıra & Yerel SEO" },
    { value: "OTHER", label: "Diğer" },
  ],
  TOURISM: [
    { value: "BOOKING", label: "Rezervasyon & Doluluk Oranı Artışı" },
    { value: "INTL", label: "Yabancı Turist Çekimi" },
    { value: "BRAND", label: "Destinasyon / Marka Bilinirliği" },
    { value: "SEO", label: "Google'da Üst Sıra & Yerel SEO" },
    { value: "OTHER", label: "Diğer" },
  ],
  ECOMM: [
    { value: "SALES", label: "Satış & Ciro Artışı" },
    { value: "ROAS", label: "Reklam Verimliliği (ROAS)" },
    { value: "RETENTION", label: "Tekrar Satın Alma & Müşteri Sadakati" },
    { value: "SEO", label: "Organik Trafik & SEO" },
    { value: "OTHER", label: "Diğer" },
  ],
  SERVICE: [
    { value: "LEAD", label: "Nitelikli Lead & Teklif Talebi" },
    { value: "BRAND", label: "Pazar Otoritesi & Marka Bilinirliği" },
    { value: "SYSTEM", label: "Dijital Operasyon Sistemi Kurulumu" },
    { value: "SEO", label: "Teknik Altyapı & SEO" },
    { value: "OTHER", label: "Diğer" },
  ],
  BEAUTY: [
    { value: "PATIENT", label: "Müşteri Kazanımı & Randevu Artışı" },
    { value: "BRAND", label: "Marka & Görsel İletişim" },
    { value: "SOCIAL", label: "Sosyal Medya & İçerik Stratejisi" },
    { value: "SEO", label: "Google'da Üst Sıra & Yerel SEO" },
    { value: "OTHER", label: "Diğer" },
  ],
  OTHER: [
    { value: "SALES", label: "Satış & Ciro Artışı" },
    { value: "LEAD", label: "Nitelikli Lead Kazanımı" },
    { value: "BRAND", label: "Marka Bilinirliği" },
    { value: "SYSTEM", label: "Dijital Operasyon Sistemi" },
    { value: "SEO", label: "SEO & Teknik Altyapı" },
    { value: "OTHER", label: "Diğer" },
  ],
};

/* ─────────────────────────────────────────────
   Progress bar
───────────────────────────────────────────── */
function ProgressBar({
  current,
  total,
  onStepClick,
  completedSteps,
}: {
  current: number;
  total: number;
  onStepClick: (i: number) => void;
  completedSteps: Set<number>;
}) {
  const labels = ["Sektör", "Hedef", "İletişim"];
  return (
    <div className="mb-8 md:mb-10">
      <div className="flex items-center gap-0">
        {labels.map((label, i) => {
          const done = completedSteps.has(i);
          const active = current === i;
          const clickable = done || i < current;
          return (
            <div key={i} className="flex flex-1 items-center">
              <button
                type="button"
                onClick={() => clickable && onStepClick(i)}
                disabled={!clickable}
                className="flex flex-col items-center gap-1.5 transition-opacity"
                style={{
                  opacity: clickable || active ? 1 : 0.35,
                  cursor: clickable ? "pointer" : "default",
                }}
                aria-label={`${label} adımına git`}
              >
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 text-[11px] font-black transition-all duration-400 md:h-9 md:w-9"
                  style={{
                    background: done
                      ? "linear-gradient(135deg,#be29ec,#0000c8)"
                      : active
                        ? "rgba(190,41,236,0.15)"
                        : "transparent",
                    borderColor: done
                      ? "#be29ec"
                      : active
                        ? "#be29ec"
                        : "rgba(255,255,255,0.1)",
                    color: done
                      ? "#fff"
                      : active
                        ? "#be29ec"
                        : "rgba(255,255,255,0.3)",
                    boxShadow: active
                      ? "0 0 14px rgba(190,41,236,0.35)"
                      : "none",
                  }}
                >
                  {done ? "✓" : i + 1}
                </div>
                <span
                  className="text-[9px] font-bold uppercase tracking-[0.14em] whitespace-nowrap"
                  style={{
                    color: active
                      ? "#be29ec"
                      : done
                        ? "rgba(255,255,255,0.5)"
                        : "rgba(255,255,255,0.2)",
                  }}
                >
                  {label}
                </span>
              </button>
              {i < total - 1 && (
                <div
                  className="mx-2 flex-1 h-px"
                  style={{
                    background: done
                      ? "linear-gradient(90deg,#be29ec,#0000c8)"
                      : "rgba(255,255,255,0.07)",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Adım 1 — Sektör seçimi
───────────────────────────────────────────── */
function StepSector({
  value,
  onChange,
  error,
  otherSector,
  onOtherSectorChange,
  otherSectorError,
}: {
  value: string;
  onChange: (v: string) => void;
  error?: string;
  otherSector: string;
  onOtherSectorChange: (v: string) => void;
  otherSectorError?: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-lg font-bold text-white md:text-xl">
          Hangi sektördesiniz?
        </h3>
        <p className="mt-1 text-sm text-white/35">
          Hedeflerinizi sektörünüze göre kişiselleştirelim.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {SECTORS.map((s) => {
          const selected = value === s.value;
          return (
            <button
              key={s.value}
              type="button"
              onClick={() => onChange(s.value)}
              className="flex flex-col items-start gap-2 rounded-2xl border p-4 text-left transition-all duration-250 hover:border-white/20 active:scale-[0.97] md:p-5"
              style={{
                background: selected
                  ? "linear-gradient(135deg,rgba(190,41,236,0.15),rgba(0,0,200,0.1))"
                  : "rgba(255,255,255,0.03)",
                borderColor: selected ? "#be29ec" : "rgba(255,255,255,0.08)",
                boxShadow: selected ? "0 0 16px rgba(190,41,236,0.2)" : "none",
              }}
              aria-pressed={selected}
            >
              <span className="text-xl">{s.icon}</span>
              <span className="text-[12px] font-bold leading-snug text-white md:text-[13px]">
                {s.label}
              </span>
            </button>
          );
        })}
      </div>
      {error && (
        <p className="text-[10px] font-bold uppercase text-red-400">{error}</p>
      )}

      {/* OTHER seçilince sektör açıklama alanı */}
      <AnimatePresence>
        {value === "OTHER" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                Sektörünüzü belirtin
              </label>
              <textarea
                value={otherSector}
                onChange={(e) => onOtherSectorChange(e.target.value)}
                placeholder="Hangi sektörde faaliyet gösteriyorsunuz?"
                rows={2}
                className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white outline-none transition-all focus:border-[#be29ec] placeholder:text-white/15"
              />
              {otherSectorError && (
                <p className="text-[10px] font-bold uppercase text-red-400">
                  {otherSectorError}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Adım 2 — Hedef seçimi
───────────────────────────────────────────── */
function StepGoal({
  sector,
  value,
  onChange,
  error,
  otherValue,
  onOtherChange,
  otherError,
}: {
  sector: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  otherValue: string;
  onOtherChange: (v: string) => void;
  otherError?: string;
}) {
  const goals = GOALS_BY_SECTOR[sector] ?? GOALS_BY_SECTOR["OTHER"];
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-lg font-bold text-white md:text-xl">
          Temel hedefiniz nedir?
        </h3>
        <p className="mt-1 text-sm text-white/35">
          Odaklanmamızı istediğiniz alanı seçin.
        </p>
      </div>
      <div className="flex flex-col gap-2.5">
        {goals.map((g) => {
          const selected = value === g.value;
          return (
            <button
              key={g.value}
              type="button"
              onClick={() => onChange(g.value)}
              className="flex items-center justify-between rounded-xl border px-4 py-3.5 text-left transition-all duration-250 hover:border-white/20 active:scale-[0.98] md:px-5 md:py-4"
              style={{
                background: selected
                  ? "linear-gradient(90deg,rgba(190,41,236,0.12),rgba(0,0,200,0.08))"
                  : "rgba(255,255,255,0.03)",
                borderColor: selected ? "#be29ec" : "rgba(255,255,255,0.08)",
              }}
              aria-pressed={selected}
            >
              <span
                className="text-sm font-semibold"
                style={{ color: selected ? "#fff" : "rgba(255,255,255,0.65)" }}
              >
                {g.label}
              </span>
              <span
                className="ml-3 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 text-[9px] font-black transition-all"
                style={{
                  background: selected
                    ? "linear-gradient(135deg,#be29ec,#0000c8)"
                    : "transparent",
                  borderColor: selected ? "#be29ec" : "rgba(255,255,255,0.15)",
                  color: "#fff",
                }}
              >
                {selected && "✓"}
              </span>
            </button>
          );
        })}
      </div>
      {error && (
        <p className="text-[10px] font-bold uppercase text-red-400">{error}</p>
      )}

      <AnimatePresence>
        {value === "OTHER" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-1 space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                Hedefinizi belirtin
              </label>
              <textarea
                value={otherValue}
                onChange={(e) => onOtherChange(e.target.value)}
                placeholder="Ne elde etmek istiyorsunuz?"
                rows={3}
                className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white outline-none transition-all focus:border-[#be29ec] placeholder:text-white/15"
              />
              {otherError && (
                <p className="text-[10px] font-bold uppercase text-red-400">
                  {otherError}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Adım 3 — İletişim bilgileri
───────────────────────────────────────────── */
function StepContact({
  register,
  errors,
  setValue,
}: {
  register: ReturnType<typeof useForm<AnalysisInput>>["register"];
  errors: ReturnType<typeof useForm<AnalysisInput>>["formState"]["errors"];
  setValue: ReturnType<typeof useForm<AnalysisInput>>["setValue"];
}) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-lg font-bold text-white md:text-xl">
          Size nasıl ulaşalım?
        </h3>
        <p className="mt-1 text-sm text-white/35">
          Analizinizi kişiselleştirerek iletebiliriz.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {/* Ad Soyad */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
            Ad Soyad <span className="text-[#be29ec]">*</span>
          </label>
          <input
            {...register("fullName")}
            autoComplete="name"
            placeholder="Ahmet Yılmaz"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm font-medium text-white outline-none transition-all focus:border-[#be29ec] placeholder:text-white/15"
          />
          {errors.fullName && (
            <p className="text-[10px] font-bold uppercase text-red-400">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* E-posta */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
            E-Posta <span className="text-[#be29ec]">*</span>
          </label>
          <input
            {...register("email")}
            autoComplete="email"
            inputMode="email"
            placeholder="ornek@email.com"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm font-medium text-white outline-none transition-all focus:border-[#be29ec] placeholder:text-white/15"
          />
          {errors.email && (
            <p className="text-[10px] font-bold uppercase text-red-400">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Telefon — opsiyonel */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
            Telefon{" "}
            <span className="text-white/20 font-medium normal-case tracking-normal">
              (opsiyonel)
            </span>
          </label>
          <input
            {...register("phone")}
            autoComplete="tel"
            inputMode="tel"
            placeholder="+90 5XX XXX XX XX"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm font-medium text-white outline-none transition-all focus:border-[#be29ec] placeholder:text-white/15"
          />
        </div>

        {/* Website — opsiyonel, https:// prefix sabit */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
            Website{" "}
            <span className="text-white/20 font-medium normal-case tracking-normal">
              (opsiyonel)
            </span>
          </label>
          <div className="flex overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-all focus-within:border-[#be29ec]">
            <span className="flex items-center border-r border-white/10 bg-white/5 px-3 text-xs font-bold text-white/30 select-none">
              https://
            </span>
            <input
              {...register("website")}
              autoComplete="url"
              inputMode="url"
              placeholder="sirketiniz.com"
              className="flex-1 bg-transparent px-4 py-3.5 text-sm font-medium text-white outline-none placeholder:text-white/15"
              onChange={(e) => {
                const val = e.target.value.replace(/^https?:\/\//i, "");
                setValue("website", val ? `https://${val}` : "");
              }}
            />
          </div>
        </div>
      </div>

      {/* Güven sinyali */}
      <div className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3">
        <span className="text-base" aria-hidden="true">
          🔒
        </span>
        <p className="text-[11px] leading-snug text-white/30">
          Bilgileriniz yalnızca analiziniz için kullanılır, üçüncü taraflarla
          paylaşılmaz.
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Başarı ekranı
───────────────────────────────────────────── */
function SuccessScreen({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center gap-6 py-8 text-center md:py-12"
    >
      <div
        className="flex h-20 w-20 items-center justify-center rounded-full md:h-24 md:w-24"
        style={{
          background:
            "linear-gradient(135deg,rgba(190,41,236,0.2),rgba(0,0,200,0.2))",
          border: "1px solid rgba(190,41,236,0.3)",
          boxShadow: "0 0 40px rgba(190,41,236,0.2)",
        }}
      >
        <span className="text-3xl md:text-4xl" aria-hidden="true">
          ✦
        </span>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl">
          Analiz Talebiniz Alındı
        </h3>
        <p className="text-sm leading-relaxed text-white/45 sm:text-base">
          Dijital stratejinizi incelemeye başladık.
          <br />
          En geç <span className="font-bold text-white/70">4 saat</span> içinde
          sizinle iletişime geçeceğiz.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {[
          { val: "Ücretsiz", label: "analiz" },
          { val: "1 iş günü", label: "yanıt süresi" },
          { val: "Bağlayıcı değil", label: "taahhüt yok" },
        ].map((m) => (
          <div key={m.label} className="flex flex-col items-center gap-1">
            <span className="text-lg font-black text-white">{m.val}</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/28">
              {m.label}
            </span>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={onReset}
        className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-[10px] font-bold uppercase tracking-[0.22em] text-white/60 transition hover:bg-white/10 hover:text-white"
      >
        Yeni Talep Oluştur
      </button>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Props — component farklı yerlerde kullanılabilir
───────────────────────────────────────────── */
interface AnalysisFormProps {
  /** Section id — sayfada birden fazla form varsa farklılaştır */
  sectionId?: string;
  /** Başlık gizlenebilir (modal/embed kullanım için) */
  showHeading?: boolean;
  /** Server action — dışarıdan inject edilebilir */
  onSubmitAction?: (
    data: AnalysisInput & { formStartTime: string },
  ) => Promise<{ success?: boolean; error?: string }>;
  /** Arka plan — embed edildiği yere göre özelleştir */
  className?: string;
}

/* ─────────────────────────────────────────────
   Ana bileşen
───────────────────────────────────────────── */
export default function AnalysisForm({
  sectionId = "analiz",
  showHeading = true,
  onSubmitAction,
  className = "",
}: AnalysisFormProps) {
  const [step, setStep] = useState(0);
  const [completedSteps, setCompleted] = useState<Set<number>>(new Set());
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
    trigger,
  } = useForm<AnalysisInput>({
    resolver: zodResolver(AnalysisSchema),
    defaultValues: {
      botField: "",
      sector: "",
      otherSector: "",
      goal: "",
      otherGoal: "",
      phone: "",
      website: "",
    },
    mode: "onTouched",
  });

  const sector = watch("sector");
  const goal = watch("goal");
  const otherGoal = watch("otherGoal") ?? "";

  // Sektör değişince hedefi sıfırla
  useEffect(() => {
    setValue("goal", "");
    setValue("otherGoal", "");
  }, [sector, setValue]);

  const markCompleted = (i: number) =>
    setCompleted((prev) => new Set([...prev, i]));

  /* Adım ileri */
  const nextStep = async () => {
    if (step === 0) {
      const ok = await trigger(["sector", "otherSector"]);
      if (!ok) return;
      markCompleted(0);
      setStep(1);
    } else if (step === 1) {
      const ok = await trigger(["goal", "otherGoal"]);
      if (!ok) return;
      markCompleted(1);
      setStep(2);
    }
    requestAnimationFrame(() =>
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }),
    );
  };

  /* Progress bar tıklama — sadece tamamlanan adımlara dönülebilir */
  const handleStepClick = (i: number) => {
    if (i < step || completedSteps.has(i)) setStep(i);
  };

  const onSubmit = (data: AnalysisInput) => {
    setServerError(null);
    startTransition(async () => {
      if (onSubmitAction) {
        const result = await onSubmitAction({
          ...data,
          formStartTime: startTime,
        });
        if (result?.success) {
          setIsSuccess(true);
          markCompleted(2);
          reset();
          return;
        }
        if (result?.error) setServerError(result.error);
        else
          setServerError("Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.");
      } else {
        // Dev fallback — server action bağlanmadıysa başarı simüle et
        await new Promise((r) => setTimeout(r, 800));
        setIsSuccess(true);
        markCompleted(2);
        reset();
      }
    });
  };

  const handleReset = () => {
    setIsSuccess(false);
    setServerError(null);
    setStep(0);
    setCompleted(new Set());
    setStartTime(Date.now().toString());
    reset();
    requestAnimationFrame(() =>
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  };

  return (
    <section
      id={sectionId}
      aria-label="Ücretsiz dijital analiz formu"
      className={`mx-auto max-w-2xl px-4 py-16 sm:px-5 sm:py-20 md:px-6 md:py-28 ${className}`}
    >
      <div ref={topRef} className="scroll-mt-28" />

      {/* Başlık */}
      {showHeading && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 text-center md:mb-14"
        >
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 mb-5">
            <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-white/50">
              Ücretsiz
            </span>
          </div>
          <h2 className="text-3xl font-bold uppercase tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
            Dijital{" "}
            <span className="bg-gradient-to-r from-[#be29ec] to-[#0000c8] bg-clip-text text-transparent">
              Analiz
            </span>
          </h2>
          <p className="mt-3 text-sm text-white/35 sm:text-base">
            3 adımda büyüme fırsatlarınızı keşfedelim.
          </p>
        </motion.div>
      )}

      {/* Kart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-[#0c0c0c] p-5 shadow-2xl sm:rounded-[2.5rem] sm:p-8 md:p-10"
        style={{
          boxShadow:
            "0 0 60px rgba(190,41,236,0.05), 0 32px 80px rgba(0,0,0,0.4)",
        }}
      >
        {/* Arka plan parıltı */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2rem]"
        >
          <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-[#be29ec] opacity-[0.04] blur-[60px]" />
          <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-[#0000c8] opacity-[0.04] blur-[60px]" />
        </div>

        <div className="relative z-10">
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <SuccessScreen key="success" onReset={handleReset} />
            ) : (
              <motion.div key="form">
                {/* Honeypot */}
                <input
                  {...register("botField")}
                  type="text"
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                <ProgressBar
                  current={step}
                  total={3}
                  onStepClick={handleStepClick}
                  completedSteps={completedSteps}
                />

                {/* Adım içeriği */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {step === 0 && (
                      <StepSector
                        value={sector}
                        onChange={(v) => {
                          setValue("sector", v, { shouldValidate: true });
                          setValue("otherSector", "");
                        }}
                        error={errors.sector?.message}
                        otherSector={watch("otherSector") ?? ""}
                        onOtherSectorChange={(v) =>
                          setValue("otherSector", v, { shouldValidate: true })
                        }
                        otherSectorError={errors.otherSector?.message}
                      />
                    )}
                    {step === 1 && (
                      <StepGoal
                        sector={sector}
                        value={goal}
                        onChange={(v) => {
                          setValue("goal", v, { shouldValidate: true });
                          setValue("otherGoal", "");
                        }}
                        error={errors.goal?.message}
                        otherValue={otherGoal}
                        onOtherChange={(v) =>
                          setValue("otherGoal", v, { shouldValidate: true })
                        }
                        otherError={errors.otherGoal?.message}
                      />
                    )}
                    {step === 2 && (
                      <StepContact
                        register={register}
                        errors={errors}
                        setValue={setValue}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Server error */}
                {serverError && step === 2 && (
                  <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-center text-xs font-bold text-red-400">
                    {serverError}
                  </div>
                )}

                {/* Navigasyon butonları */}
                <div className="mt-6 flex items-center gap-3 md:mt-8">
                  {step > 0 && (
                    <button
                      type="button"
                      onClick={() => setStep((s) => s - 1)}
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 transition hover:bg-white/10 hover:text-white"
                      aria-label="Önceki adım"
                    >
                      ←
                    </button>
                  )}

                  {step < 2 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={
                        step === 0 ? !sector : step === 1 ? !goal : false
                      }
                      className="relative flex-1 overflow-hidden rounded-2xl py-4 text-xs font-black uppercase tracking-[0.18em] text-white transition-all duration-300 disabled:opacity-35 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.98]"
                      style={{
                        background: "linear-gradient(90deg,#be29ec,#0000c8)",
                        boxShadow:
                          (!sector && step === 0) || (!goal && step === 1)
                            ? "none"
                            : "0 0 24px rgba(190,41,236,0.3)",
                      }}
                    >
                      Devam Et →
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmit(onSubmit)}
                      disabled={isPending}
                      aria-busy={isPending}
                      className="relative flex-1 overflow-hidden rounded-2xl py-4 text-xs font-black uppercase tracking-[0.18em] text-white transition-all duration-300 hover:scale-[1.01] active:scale-[0.98] disabled:opacity-60"
                      style={{
                        background: isPending
                          ? "rgba(190,41,236,0.5)"
                          : "linear-gradient(90deg,#be29ec,#0000c8)",
                        boxShadow: isPending
                          ? "none"
                          : "0 0 30px rgba(190,41,236,0.3)",
                      }}
                    >
                      {isPending ? (
                        <span className="flex items-center justify-center gap-3">
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          Gönderiliyor...
                        </span>
                      ) : (
                        "Analiz Talebini Gönder →"
                      )}
                    </button>
                  )}
                </div>

                {/* Adım özeti — tamamlanan seçimler */}
                {(completedSteps.has(0) || completedSteps.has(1)) &&
                  step < 2 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {completedSteps.has(0) && sector && (
                        <button
                          type="button"
                          onClick={() => handleStepClick(0)}
                          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-bold text-white/50 transition hover:text-white"
                        >
                          {SECTORS.find((s) => s.value === sector)?.icon}{" "}
                          {SECTORS.find((s) => s.value === sector)?.label}
                          <span className="text-white/25">✎</span>
                        </button>
                      )}
                      {completedSteps.has(1) && goal && (
                        <button
                          type="button"
                          onClick={() => handleStepClick(1)}
                          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-bold text-white/50 transition hover:text-white"
                        >
                          {
                            GOALS_BY_SECTOR[sector]?.find(
                              (g) => g.value === goal,
                            )?.label
                          }
                          <span className="text-white/25">✎</span>
                        </button>
                      )}
                    </div>
                  )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
