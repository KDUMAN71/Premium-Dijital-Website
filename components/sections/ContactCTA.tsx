"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  MessageCircle,
  Phone,
  Calendar,
  ArrowRight,
  CheckCircle2,
  Clock,
  Zap,
  X,
  TrendingUp,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════════════════
   ContactCTA — Nitelikli Başvuru Bileşeni
   Premium Dijital | Evrensel Conversion Bileşeni

   KULLANIM:
   ─────────────────────────────────────────────
   <ContactCTA />                          // Varsayılan
   <ContactCTA context="web-seo" />        // Hizmet bağlamı — form ön doldurur
   <ContactCTA title="..." subtitle="..." />
   <ContactCTA compact />                  // Sadece buton üçlüsü

   PROPS:
   ──────
   context    — "genel" | "web-seo" | "ppc" | "marka" | "sosyal" | "altyapi"
   title      — Başlık override (opsiyonel)
   subtitle   — Alt başlık override (opsiyonel)
   compact    — Sadece buton üçlüsü (default: false)
   id         — Anchor id (default: "iletisim")

   CONVERSION TRACKING — Aktive etmek için:
   ─────────────────────────────────────────
   1. CONTACT_INFO'yu doldur
   2. TRACKING_CONFIG'i doldur (GA4, Google Ads, Meta Pixel ID'leri)
   3. handleSubmit içindeki fetch bloğunun yorumunu kaldır
   4. layout.tsx'e gtag.js ve Meta Pixel script'lerini ekle
═══════════════════════════════════════════════════════════════════════════════ */

/* ─── Konfigürasyon ───────────────────────────────────────────────────────── */

const CONTACT_INFO = {
  whatsapp: "905XXXXXXXXX", // "905321234567"
  whatsappMsg:
    "Merhaba, Premium Dijital hizmetleri hakkında bilgi almak istiyorum.",
  phone: "+90 5XX XXX XX XX",
  phoneTel: "+905XXXXXXXXX",
};

const TRACKING_CONFIG = {
  ga4MeasurementId: "", // "G-XXXXXXXXXX"
  googleAdsId: "", // "AW-XXXXXXXXX"
  conversionLabels: {
    whatsapp: "",
    phone: "",
    formOpen: "",
    formSend: "",
  },
  metaPixelId: "", // "1234567890123456"
};

/* ─── Tracking ────────────────────────────────────────────────────────────── */

function trackEvent(name: string, params: Record<string, string> = {}) {
  if (typeof window === "undefined") return;

  // ── GA4 ──────────────────────────────────────────────────────────────────
  /*
  if (TRACKING_CONFIG.ga4MeasurementId && (window as any).gtag) {
    (window as any).gtag("event", name, {
      send_to: TRACKING_CONFIG.ga4MeasurementId,
      ...params,
    });
  }
  */

  // ── Google Ads Conversion ─────────────────────────────────────────────────
  /*
  const label = TRACKING_CONFIG.conversionLabels[name as keyof typeof TRACKING_CONFIG.conversionLabels];
  if (TRACKING_CONFIG.googleAdsId && label && (window as any).gtag) {
    (window as any).gtag("event", "conversion", {
      send_to: `${TRACKING_CONFIG.googleAdsId}/${label}`,
      ...params,
    });
  }
  */

  // ── Meta Pixel ────────────────────────────────────────────────────────────
  /*
  if (TRACKING_CONFIG.metaPixelId && (window as any).fbq) {
    (window as any).fbq("track", name, params);
  }
  */

  if (process.env.NODE_ENV === "development") {
    console.log("[ContactCTA]", name, params);
  }
}

/* ─── Validation ──────────────────────────────────────────────────────────── */

const V = {
  email: (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),
  phone: (v: string) => {
    const d = v.replace(/[\s\-().+]/g, "");
    return d.length >= 10 && d.length <= 15 && /^\d+$/.test(d);
  },
  url: (v: string) => {
    if (!v.trim()) return true;
    try {
      new URL(v.startsWith("http") ? v : `https://${v}`);
      return true;
    } catch {
      return false;
    }
  },
  min: (v: string, n: number) => v.trim().length >= n,
  clean: (v: string) =>
    v
      .replace(/[<>]/g, "")
      .replace(/javascript:/gi, "")
      .replace(/on\w+=/gi, "")
      .trim(),
};

// Bot kontrolü: ilk input focus'undan itibaren 3.5s geçmediyse bot sayılır.
// Modal açılış yerine ilk kullanıcı etkileşimi referans alınır —
// böylece browser autocomplete ile yapılan hızlı doldurma hatayla engellenmez.
function spamCheck(firstInteractionAt: number | null) {
  if (firstInteractionAt === null) return true; // Hiç etkileşim olmamış = bot
  return Date.now() - firstInteractionAt < 3500;
}

/* ─── Tipler ──────────────────────────────────────────────────────────────── */

type Context = "genel" | "web-seo" | "ppc" | "marka" | "sosyal" | "altyapi";

interface FormData {
  name: string;
  email: string;
  phone: string;
  url: string;
  service: string;
  budget: string;
  problem: string;
  honeypot: string; // spam tuzağı
}

interface Errors {
  name?: string;
  email?: string;
  phone?: string;
  url?: string;
  problem?: string;
}

const EMPTY: FormData = {
  name: "",
  email: "",
  phone: "",
  url: "",
  service: "",
  budget: "",
  problem: "",
  honeypot: "",
};

/* ─── Seçenekler ──────────────────────────────────────────────────────────── */

const SERVICE_OPTIONS = [
  "Web Sitesi Tasarımı & Geliştirme",
  "SEO & İçerik Stratejisi",
  "Google Ads & PPC",
  "Meta Ads (Facebook / Instagram)",
  "Sosyal Medya Yönetimi",
  "Marka & Görsel Kimlik",
  "Dijital Altyapı & Otomasyon",
  "Genel Dijital Strateji",
];

const CONTEXT_SERVICE: Record<Context, string> = {
  genel: "",
  "web-seo": "Web Sitesi Tasarımı & Geliştirme",
  ppc: "Google Ads & PPC",
  marka: "Marka & Görsel Kimlik",
  sosyal: "Sosyal Medya Yönetimi",
  altyapi: "Dijital Altyapı & Otomasyon",
};

const BUDGET_OPTIONS = [
  "0 – 50.000 TL",
  "50.000 – 100.000 TL",
  "100.000 – 1.000.000 TL",
  "1.000.000 TL+",
  "Proje bazlı / tek seferlik",
  "Henüz belirlemedim",
];

/* ─── Sade Input bileşenleri (FinalAction stili) ─────────────────────────── */

function MLabel({
  children,
  req,
}: {
  children: React.ReactNode;
  req?: boolean;
}) {
  return (
    <label className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-white/20 ml-1">
      {children}
      {req && <span className="text-brand-purple/60">*</span>}
    </label>
  );
}

function MError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="mt-1 ml-1 text-[10px] text-red-400/75">{msg}</p>;
}

function MInput({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  error,
  autoComplete,
  req,
}: {
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  autoComplete?: string;
  req?: boolean;
}) {
  return (
    <div className="space-y-2">
      <MLabel req={req}>{label}</MLabel>
      <input
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(V.clean(e.target.value))}
        placeholder={placeholder}
        className={[
          "w-full rounded-2xl border bg-white/[0.03] px-6 py-4 text-sm text-white",
          "outline-none transition-all placeholder:text-white/10",
          error
            ? "border-red-400/30 focus:border-red-400/50"
            : "border-white/5 focus:border-brand-purple/50",
        ].join(" ")}
      />
      <MError msg={error} />
    </div>
  );
}

function MSelect({
  label,
  value,
  onChange,
  options,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
  placeholder: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Dışarı tıklayınca kapat
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const label_display = value || placeholder;
  const isPlaceholder = !value;

  return (
    <div className="space-y-2" ref={ref}>
      <MLabel>{label}</MLabel>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className={[
          "flex w-full cursor-pointer items-center justify-between rounded-2xl border",
          "bg-white/[0.03] px-6 py-4 text-sm outline-none transition-all duration-200",
          open
            ? "border-brand-purple/50"
            : "border-white/5 hover:border-white/10",
        ].join(" ")}
      >
        <span className={isPlaceholder ? "text-white/20" : "text-white"}>
          {label_display}
        </span>
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="h-4 w-4 shrink-0 text-white/20"
          fill="none"
          viewBox="0 0 16 16"
        >
          <path
            d="M4 6l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute z-[300] mt-1 w-full max-h-52 overflow-y-auto rounded-2xl border border-white/8 bg-[#0d0d14] shadow-[0_8px_32px_rgba(0,0,0,0.6)] [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: "none" }}
          >
            {options.map((opt, i) => {
              const isSelected = opt === value;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    onChange(opt);
                    setOpen(false);
                  }}
                  className={[
                    "flex w-full cursor-pointer items-center gap-3 px-5 py-3 text-left text-sm transition-all duration-150",
                    i === 0 ? "rounded-t-2xl" : "",
                    i === options.length - 1
                      ? "rounded-b-2xl"
                      : "border-b border-white/[0.04]",
                    isSelected
                      ? "bg-brand-purple/12 text-white"
                      : "text-white/50 hover:bg-white/[0.04] hover:text-white",
                  ].join(" ")}
                >
                  {/* Seçili göstergesi */}
                  <span
                    className={[
                      "flex h-2 w-2 shrink-0 rounded-full transition-all duration-200",
                      isSelected
                        ? "bg-brand-purple shadow-[0_0_6px_rgba(190,41,236,0.8)]"
                        : "bg-white/10",
                    ].join(" ")}
                  />
                  {opt}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Modal Form ──────────────────────────────────────────────────────────── */

function ApplicationModal({
  context,
  onClose,
}: {
  context: Context;
  onClose: () => void;
}) {
  const prefersReduced = useReducedMotion();
  const [form, setForm] = useState<FormData>({
    ...EMPTY,
    service: CONTEXT_SERVICE[context] ?? "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  // İlk kullanıcı input etkileşimi — null: henüz dokunulmadı
  const firstInteraction = useRef<number | null>(null);

  // Arka plan body scroll kilidi
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const set = useCallback(
    (k: keyof FormData) => (v: string) => {
      setForm((p) => ({ ...p, [k]: V.clean(v) }));
      setErrors((p) => ({ ...p, [k]: undefined }));
    },
    [],
  );

  function validate(): boolean {
    const e: Errors = {};
    if (!V.min(form.name, 2)) e.name = "Adınızı girin (en az 2 karakter)";
    if (!V.email(form.email)) e.email = "Geçerli bir e-posta girin";
    if (form.phone && !V.phone(form.phone))
      e.phone = "Geçerli telefon numarası girin";
    if (form.url && !V.url(form.url))
      e.url = "Geçerli URL girin (örn: siteadi.com)";
    if (!V.min(form.problem, 15)) e.problem = "En az 15 karakter ile açıklayın";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit() {
    if (!validate()) return;
    if (form.honeypot) return; // Bot tuzağı
    if (spamCheck(firstInteraction.current)) return; // Çok hızlı / bot

    setSubmitting(true);
    trackEvent("formSend", {
      context,
      service: form.service,
      budget: form.budget,
    });

    // ── Aktive etmek için yorumu kaldır ──────────────────────────────────────
    /*
    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        context,
        source: "ContactCTA",
        timestamp: new Date().toISOString(),
      }),
    });
    */

    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setSubmitted(true);
  }

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 p-4 backdrop-blur-lg"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        /*
          max-h ile ekran dışına taşmayı engelle.
          mt-16 sticky nav'ın altında kalmasını sağlar.
          overflow-y-auto ile içerik scroll edilebilir.
          Scrollbar gizleme: [&::-webkit-scrollbar]:hidden
        */
        className="relative w-full max-w-xl mt-16 max-h-[calc(100vh-80px)] overflow-y-auto rounded-[2.5rem] border border-white/10 bg-[#0a0a0c] shadow-2xl [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        <div className="p-8 md:p-10">
          {/* Kapat */}
          <button
            type="button"
            onClick={onClose}
            className="absolute right-6 top-6 cursor-pointer text-white/20 transition-colors hover:text-white"
          >
            <X size={22} />
          </button>

          {/* Başlık */}
          <div className="mb-8 text-center">
            <h3 className="text-2xl font-bold uppercase italic tracking-tighter leading-none text-white">
              Toplantı <span className="text-white/20">Hazırlığı.</span>
            </h3>
            <p className="mt-2.5 text-[11px] font-medium uppercase tracking-widest text-white/35">
              Görüşmemizi verimli kılmak için birkaç kısa bilgiye ihtiyacımız
              var.
            </p>
          </div>

          {submitted ? (
            /* Başarı */
            <div className="py-6 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-brand-blue/25 bg-brand-blue/10 text-2xl">
                ✓
              </div>
              <p className="text-base font-bold text-white">
                Başvurunuz Alındı
              </p>
              <p className="mx-auto mt-2 max-w-xs text-sm text-white/40">
                1 iş günü içinde başvurunuzu bireysel olarak değerlendirip size
                dönüş yapacağız.
              </p>
              <div className="mt-5 space-y-1 text-xs text-white/20">
                <p>• Onay sonrası takvim bağlantısı iletilir</p>
                <p>• Görüşme öncesi dijital varlığınızı inceliyoruz</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="mt-7 cursor-pointer text-xs text-white/25 underline underline-offset-4 hover:text-white/50"
              >
                Kapat
              </button>
            </div>
          ) : (
            /* Form */
            <div
              className="space-y-5"
              onFocus={() => {
                // İlk gerçek kullanıcı etkileşimi — autocomplete dahil
                if (!firstInteraction.current)
                  firstInteraction.current = Date.now();
              }}
            >
              {/* Honeypot — botlar görür, insanlar görmez */}
              <input
                type="text"
                name="confirm_email"
                value={form.honeypot}
                onChange={(e) =>
                  setForm((p) => ({ ...p, honeypot: e.target.value }))
                }
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
              />

              {/* Ad + E-posta */}
              <div className="grid gap-4 sm:grid-cols-2">
                <MInput
                  label="Adınız Soyadınız"
                  req
                  placeholder="Ad Soyad"
                  value={form.name}
                  onChange={set("name")}
                  autoComplete="name"
                  error={errors.name}
                />
                <MInput
                  label="E-posta"
                  req
                  placeholder="ornek@firma.com"
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  autoComplete="email"
                  error={errors.email}
                />
              </div>

              {/* Telefon + Web Sitesi */}
              <div className="grid gap-4 sm:grid-cols-2">
                <MInput
                  label="Telefon"
                  placeholder="+90 5XX XXX XX XX"
                  type="tel"
                  value={form.phone}
                  onChange={set("phone")}
                  autoComplete="tel"
                  error={errors.phone}
                />
                <MInput
                  label="Web Sitesi / Sosyal Medya"
                  placeholder="siteadi.com veya @kullanici"
                  value={form.url}
                  onChange={set("url")}
                  error={errors.url}
                />
              </div>

              {/* Hizmet + Bütçe */}
              <div className="relative grid gap-4 sm:grid-cols-2">
                <MSelect
                  label="İlgilendiğiniz Hizmet"
                  value={form.service}
                  onChange={set("service")}
                  options={SERVICE_OPTIONS}
                  placeholder="Hizmet seçin"
                />
                <MSelect
                  label="Tahmini Bütçe"
                  value={form.budget}
                  onChange={set("budget")}
                  options={BUDGET_OPTIONS}
                  placeholder="Bütçe aralığı"
                />
              </div>

              {/* Problem tanımı */}
              <div className="space-y-2">
                <MLabel req>Çözmek İstediğiniz Asıl Sorun</MLabel>
                <textarea
                  value={form.problem}
                  onFocus={() => {
                    if (!firstInteraction.current)
                      firstInteraction.current = Date.now();
                  }}
                  onChange={(e) => {
                    setForm((p) => ({
                      ...p,
                      problem: V.clean(e.target.value),
                    }));
                    setErrors((p) => ({ ...p, problem: undefined }));
                  }}
                  placeholder="Örn: Sitemize trafik geliyor ama müşteriye dönüşmüyor. Google'da rakiplerimizin gerisindeyiz. Sosyal medyamız var ama iş getirmiyor."
                  rows={3}
                  className={[
                    "w-full resize-none rounded-2xl border bg-white/[0.03] p-5 text-sm text-white",
                    "outline-none transition-all placeholder:text-white/10",
                    errors.problem
                      ? "border-red-400/30 focus:border-red-400/50"
                      : "border-white/5 focus:border-brand-purple/50",
                  ].join(" ")}
                />
                <MError msg={errors.problem} />
                {!errors.problem && (
                  <div className="ml-1 flex items-center justify-between">
                    <p
                      className="text-[10px] transition-colors duration-300"
                      style={{
                        color:
                          form.problem.trim().length >= 50
                            ? "rgba(190,41,236,0.7)" // 50+ karakter → brand mor
                            : form.problem.trim().length >= 15
                              ? "rgba(255,255,255,0.20)" // 15-49 → yeterli
                              : form.problem.trim().length > 0
                                ? "rgba(255,100,100,0.50)" // 0-14 → uyarı kırmızısı
                                : "transparent",
                      }}
                    >
                      {form.problem.trim().length > 0 && (
                        <>
                          {form.problem.trim().length} karakter
                          {form.problem.trim().length < 15 &&
                            " · en az 15 gerekli"}
                          {form.problem.trim().length >= 50 &&
                            " · harika, teşekkürler"}
                        </>
                      )}
                    </p>
                    {/* Mini progress bar */}
                    {form.problem.trim().length > 0 && (
                      <div className="h-1 w-16 overflow-hidden rounded-full bg-white/5">
                        <motion.div
                          className="h-full rounded-full"
                          animate={{
                            width: `${Math.min(100, (form.problem.trim().length / 80) * 100)}%`,
                          }}
                          transition={{ duration: 0.3 }}
                          style={{
                            background:
                              form.problem.trim().length >= 50
                                ? "linear-gradient(90deg,#be29ec,#0000c8)"
                                : form.problem.trim().length >= 15
                                  ? "rgba(255,255,255,0.25)"
                                  : "rgba(255,100,100,0.5)",
                          }}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Gönder */}
              <button
                type="button"
                disabled={submitting}
                onClick={handleSubmit}
                className="group relative mt-2 w-full cursor-pointer overflow-hidden rounded-2xl py-5 text-[11px] font-black uppercase tracking-[0.2em] text-white shadow-[0_0_40px_rgba(190,41,236,0.15)] transition-all hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
                style={{ background: "linear-gradient(90deg,#be29ec,#0000c8)" }}
              >
                {/* Shimmer */}
                <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {submitting ? (
                    "Gönderiliyor..."
                  ) : (
                    <>
                      RANDEVU TALEBİNİ İLETİN{" "}
                      <ArrowRight
                        size={14}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </>
                  )}
                </span>
              </button>

              <p className="text-center text-[10px] text-white/15">
                Başvurular 1 iş günü içinde bireysel olarak değerlendirilir
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Ana Bileşen ─────────────────────────────────────────────────────────── */

export default function ContactCTA({
  context = "genel",
  title,
  subtitle,
  compact = false,
  id = "iletisim",
}: {
  context?: Context;
  title?: string;
  subtitle?: string;
  compact?: boolean;
  id?: string;
}) {
  const prefersReduced = useReducedMotion();
  const [modalOpen, setModalOpen] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  function openModal() {
    setModalOpen(true);
    trackEvent("formOpen", { context });
  }

  function handleWhatsApp() {
    trackEvent("whatsapp", { context });
    window.open(
      `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(CONTACT_INFO.whatsappMsg)}`,
      "_blank",
    );
  }

  function handlePhone() {
    trackEvent("phone", { context });
    window.location.href = `tel:${CONTACT_INFO.phoneTel}`;
  }

  /* ── Kompakt mod ── */
  if (compact) {
    return (
      <>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleWhatsApp}
            className="group relative flex cursor-pointer items-center gap-2 overflow-hidden rounded-full border border-white/8 bg-white/[0.03] px-4 py-2 text-[11px] font-black uppercase tracking-widest text-white/60 transition-all hover:bg-white/10 hover:text-white"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/8 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <MessageCircle size={14} className="relative z-10 text-[#25D366]" />
            <span className="relative z-10">WhatsApp</span>
          </button>
          <button
            type="button"
            onClick={handlePhone}
            className="group relative flex cursor-pointer items-center gap-2 overflow-hidden rounded-full border border-white/8 bg-white/[0.03] px-4 py-2 text-[11px] font-black uppercase tracking-widest text-white/60 transition-all hover:bg-white/10 hover:text-white"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/8 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <Phone size={14} className="relative z-10 text-brand-blue" />
            <span className="relative z-10">{CONTACT_INFO.phone}</span>
          </button>
          <button
            type="button"
            onClick={openModal}
            className="group relative flex cursor-pointer items-center gap-2 overflow-hidden rounded-full px-4 py-2 text-[11px] font-black uppercase tracking-widest text-white transition-all hover:opacity-90"
            style={{ background: "linear-gradient(90deg,#be29ec,#0000c8)" }}
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <Calendar size={14} className="relative z-10" />
            <span className="relative z-10">Toplantı Talep Et</span>
          </button>
        </div>

        <AnimatePresence>
          {modalOpen && (
            <ApplicationModal
              context={context}
              onClose={() => setModalOpen(false)}
            />
          )}
        </AnimatePresence>
      </>
    );
  }

  /* ── Tam boy mod — FinalAction yapısı ── */
  return (
    <>
      <section
        ref={ref}
        id={id}
        className="relative overflow-hidden border-t border-white/5 bg-[#050507] py-24 md:py-32"
      >
        {/* Arka plan dekor */}
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <div className="absolute -bottom-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-brand-purple/20 blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="grid items-center gap-16 lg:grid-cols-2"
          >
            {/* ── Sol Panel: Davet ve Güven ── */}
            <motion.div
              initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="space-y-8 text-left"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue/20 bg-brand-blue/10 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-brand-blue">
                <Zap size={12} /> Büyüme Odaklı İş Birliği
              </div>

              <h2 className="text-4xl font-bold uppercase italic leading-none tracking-tighter text-white md:text-6xl">
                {title ?? "Birlikte"}{" "}
                <span className="text-white/20">
                  {title ? "" : "Başlayalım."}
                </span>
              </h2>

              <p className="max-w-lg text-base italic leading-relaxed text-white/40">
                {subtitle ??
                  "İşletmenizin ihtiyacı olan dönüşümü gerçekleştirmek için size en uygun iletişim kanalını seçin. İster hızlı bir soru, ister kapsamlı bir planlama."}
              </p>

              {/* Feature items */}
              <div className="space-y-6 pt-4">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-purple">
                  Toplantıda Neler Hedefliyoruz?
                </p>
                <div className="grid gap-3">
                  {[
                    {
                      icon: <Clock size={18} />,
                      title: "Hızlı Teşhis",
                      desc: "Mevcut dijital varlıklarınızdaki kritik engellerin tespiti.",
                    },
                    {
                      icon: <TrendingUp size={18} />,
                      title: "Stratejik Rota",
                      desc: "Hedeflerinize ulaşmak için gereken altyapı ve öneri.",
                    },
                    {
                      icon: <CheckCircle2 size={18} />,
                      title: "Verimli Yatırım",
                      desc: "Bütçenizi en yüksek geri dönüşle (ROI) yönetme planı.",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="group flex items-start gap-4 rounded-2xl border border-transparent p-4 transition-all hover:border-white/5 hover:bg-white/[0.01]"
                    >
                      <div className="rounded-xl bg-white/5 p-2.5 text-brand-purple transition-all group-hover:bg-brand-purple group-hover:text-white">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-[14px] font-bold tracking-tight text-white">
                          {item.title}
                        </p>
                        <p className="mt-0.5 text-[11px] italic text-white/30">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Manifesto */}
              <div className="border-l-2 border-brand-purple/20 pl-5 pt-2">
                <p className="text-sm italic leading-relaxed text-white/22">
                  "İyi bir dijital altyapı gürültü yapmaz. Çalışır, ölçer,
                  büyütür — ve sizi sabah toplantılarına yetiştirir."
                </p>
                <p className="mt-2 text-[10px] font-black uppercase tracking-[0.22em] text-white/15">
                  Premium Dijital
                </p>
              </div>
            </motion.div>

            {/* ── Sağ Panel: Kademeli Aksiyon Kartı ── */}
            <motion.div
              initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.12 }}
            >
              <div className="relative overflow-hidden rounded-[3rem] border border-white/5 bg-white/[0.02] p-8 backdrop-blur-xl md:p-12">
                <div className="relative z-10 space-y-10">
                  {/* Hızlı temas */}
                  <div className="space-y-4">
                    <div>
                      <p className="text-[13px] font-bold uppercase tracking-tight text-white">
                        Vaktiniz mi dar?
                      </p>
                      <p className="mt-1 text-[11px] italic text-white/30">
                        Hızlı bir soru sorun veya beş dakikalık bir ön görüşme
                        yapalım.
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={handleWhatsApp}
                        className="group relative flex cursor-pointer items-center justify-center gap-3 overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] py-4 text-[11px] font-black uppercase tracking-widest text-white/60 transition-all hover:bg-white/10 hover:text-white"
                      >
                        <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/8 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                        <MessageCircle
                          size={18}
                          className="relative z-10 text-[#25D366]"
                        />
                        <span className="relative z-10">WhatsApp</span>
                      </button>
                      <button
                        type="button"
                        onClick={handlePhone}
                        className="group relative flex cursor-pointer items-center justify-center gap-3 overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] py-4 text-[11px] font-black uppercase tracking-widest text-white/60 transition-all hover:bg-white/10 hover:text-white"
                      >
                        <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/8 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                        <Phone
                          size={18}
                          className="relative z-10 text-brand-blue"
                        />
                        <span className="relative z-10">Hemen Ara</span>
                      </button>
                    </div>
                  </div>

                  {/* Ayırıcı */}
                  <div className="relative flex items-center justify-center py-1">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/5" />
                    </div>
                    <span className="relative bg-[#0a0a0c] px-4 text-[9px] font-black italic uppercase tracking-widest text-white/10">
                      Veya
                    </span>
                  </div>

                  {/* Stratejik planlama */}
                  <div className="space-y-5">
                    <div>
                      <p className="text-[13px] font-bold uppercase tracking-tight text-white">
                        Projenizi Detaylı Konuşalım mı?
                      </p>
                      <p className="mt-1 text-[11px] italic text-white/30">
                        30 dakikalık kapsamlı bir analiz ve planlama toplantısı
                        ayarlayın.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={openModal}
                      className="group relative w-full cursor-pointer overflow-hidden rounded-2xl py-6 text-[11px] font-black uppercase tracking-[0.2em] text-white shadow-[0_0_40px_rgba(190,41,236,0.2)] transition-all hover:scale-[1.02] active:scale-[0.98]"
                      style={{
                        background: "linear-gradient(90deg,#be29ec,#0000c8)",
                      }}
                    >
                      <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        TOPLANTI TALEBİ OLUŞTURUN
                        <ArrowRight
                          size={14}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {modalOpen && (
          <ApplicationModal
            context={context}
            onClose={() => setModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
