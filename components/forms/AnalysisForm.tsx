"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import {
  Megaphone,
  Globe,
  Palette,
  Instagram,
  Workflow,
  Stethoscope,
  Plane,
  ShoppingBag,
  Briefcase,
  Sparkles,
  LayoutGrid,
  Lock,
  CheckCircle2,
  ArrowLeft,
  Check,
  Monitor,
  X,
  ExternalLink,
  Plus,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────────
   VERİ — Hizmet alanları, sektörler, dinamik sorular
   ───────────────────────────────────────────────────────────────────────────── */

const SERVICE_AREAS = [
  {
    value: "ADS",
    label: "Reklam & Performans",
    desc: "Google Ads, Meta Ads, kampanya yönetimi",
    Icon: Megaphone,
  },
  {
    value: "WEB",
    label: "Web Sitesi & SEO",
    desc: "Web sitesi tasarımı, geliştirme, organik trafik",
    Icon: Globe,
  },
  {
    value: "BRAND",
    label: "Marka & Kurumsal Kimlik",
    desc: "Logo, brand book, görsel kimlik sistemi",
    Icon: Palette,
  },
  {
    value: "SOCIAL",
    label: "Sosyal Medya Yönetimi",
    desc: "İçerik üretimi, platform yönetimi, strateji",
    Icon: Instagram,
  },
  {
    value: "OPS",
    label: "Dijital Operasyon",
    desc: "CRM, otomasyon, süreç dijitalleştirme",
    Icon: Workflow,
  },
] as const;

type ServiceArea = (typeof SERVICE_AREAS)[number]["value"];

const SECTORS = [
  { value: "HEALTH", label: "Sağlık & Klinik", Icon: Stethoscope },
  { value: "TOURISM", label: "Turizm & Konaklama", Icon: Plane },
  { value: "ECOMM", label: "E-Ticaret", Icon: ShoppingBag },
  { value: "SERVICE", label: "Hizmet & Danışmanlık", Icon: Briefcase },
  { value: "BEAUTY", label: "Estetik & Güzellik", Icon: Sparkles },
  { value: "OTHER", label: "Diğer", Icon: LayoutGrid },
];

const SOCIAL_PLATFORMS = [
  { value: "instagram", label: "Instagram" },
  { value: "facebook", label: "Facebook" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "tiktok", label: "TikTok" },
  { value: "youtube", label: "YouTube" },
  { value: "twitter", label: "X / Twitter" },
];

const ACCESS_TOOLS = [
  {
    value: "ga4",
    label: "Google Analytics 4",
    description: "Trafik, oturum, dönüşüm ve kullanıcı verileri",
    scope: "https://www.googleapis.com/auth/analytics.readonly",
    authUrl: "https://accounts.google.com/o/oauth2/v2/auth",
    provider: "google" as const,
  },
  {
    value: "search_console",
    label: "Search Console",
    description: "Organik arama, keyword ve tıklama verileri",
    scope: "https://www.googleapis.com/auth/webmasters.readonly",
    authUrl: "https://accounts.google.com/o/oauth2/v2/auth",
    provider: "google" as const,
  },
  {
    value: "google_ads",
    label: "Google Ads",
    description: "Kampanya harcaması, kalite skoru, reklam verisi",
    scope: "https://www.googleapis.com/auth/adwords",
    authUrl: "https://accounts.google.com/o/oauth2/v2/auth",
    provider: "google" as const,
  },
  {
    value: "meta_ads",
    label: "Meta Ads",
    description: "Facebook & Instagram reklam performansı",
    scope: "ads_read",
    authUrl: "https://www.facebook.com/v19.0/dialog/oauth",
    provider: "meta" as const,
  },
] as const;

type AccessToolValue = typeof ACCESS_TOOLS[number]["value"];

// Dijital Operasyon — yetenek paketleri (MasterPlan v10)
const OPS_CAPABILITIES = [
  {
    value: "VISIBILITY",
    label:
      "Veri görünürlüğü — reklam & dönüşüm performansını ölçülebilir hale getirmek",
  },
  {
    value: "SALES_SYS",
    label:
      "Otonom satış sistemi — 7/24 müşteri kazanan web & reklam altyapısı kurmak",
  },
  {
    value: "BRAND_MEM",
    label:
      "Kurumsal hafıza — marka sesi & içerik yönetimini sistematik hale getirmek",
  },
  {
    value: "OPS_EFF",
    label:
      "Operasyonel verimlilik — CRM, otomasyon & dijital araç entegrasyonu",
  },
  {
    value: "SCALE",
    label:
      "Ölçeklenebilir büyüme — yeni kanal, yeni pazar, yeni segment için altyapı",
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   SCHEMA — tüm alanlar opsiyonel, superRefine ile bağlamsal zorunluluk
   ───────────────────────────────────────────────────────────────────────────── */

const FormSchema = z
  .object({
    botField: z.string().max(0),
    // Adım 1
    serviceArea: z.string().min(1, "Hizmet alanı seçimi zorunludur"),
    // Adım 2
    sector: z.string().min(1, "Sektör seçimi zorunludur"),
    otherSector: z.string().optional(),
    // Adım 3 — hizmete özel (hepsi opsiyonel, superRefine ile kontrol)
    budget: z.string().optional(),
    hasWebsite: z.string().optional(), // "YES" | "NO"
    website: z.string().optional(),
    adAccess: z.array(z.string()).optional(), // seçilen erişim araçları
    competitors: z.array(z.string().max(100)).max(3).optional(),
    oauthTokens: z.record(z.string(), z.string()).optional(),
    socialPlatforms: z.array(z.string()).optional(),
    hasSocialAccounts: z.string().optional(), // "YES" | "NO"
    hasExistingBrand: z.string().optional(), // "YES" | "NO"
    currentTools: z.string().optional(),
    socialHandles: z.string().optional(),
    opsGoals: z.array(z.string()).optional(),
    // Adım 4
    fullName: z.string().min(2, "Ad soyad en az 2 karakter olmalıdır"),
    company: z.string().optional(),
    email: z.string().email("Geçerli bir e-posta adresi giriniz"),
    phone: z.string().optional(),
    message: z.string().optional(),
  })
  .superRefine((d, ctx) => {
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

type FormInput = z.infer<typeof FormSchema>;

/* ─────────────────────────────────────────────────────────────────────────────
   PROGRESS BAR
   ───────────────────────────────────────────────────────────────────────────── */

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
  const labels = ["Hizmet", "Sektör", "Detaylar", "İletişim"];
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
                  {done ? <Check size={14} strokeWidth={2.5} /> : i + 1}
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

/* ─────────────────────────────────────────────────────────────────────────────
   YARDIMCI: Tekli seçim kartı
   ───────────────────────────────────────────────────────────────────────────── */

function SelectCard({
  selected,
  onClick,
  children,
  accent = "purple",
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  accent?: "purple" | "blue";
}) {
  const color = accent === "blue" ? "#0000c8" : "#be29ec";
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-between rounded-2xl border px-5 py-4 text-left text-sm font-semibold transition-all duration-200 cursor-pointer active:scale-[0.97] w-full ${
        selected
          ? "text-white"
          : "border-white/10 bg-white/[0.02] text-white/60 hover:border-white/20 hover:bg-white/[0.04] hover:text-white"
      }`}
      style={
        selected ? { borderColor: color, backgroundColor: `${color}18` } : {}
      }
    >
      {children}
      <span
        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[9px] transition-all ml-3"
        style={
          selected
            ? { borderColor: color, backgroundColor: color }
            : { borderColor: "rgba(255,255,255,0.15)" }
        }
      >
        {selected && <Check size={10} strokeWidth={2.5} color="#fff" />}
      </span>
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   YARDIMCI: Çoklu seçim toggle
   ───────────────────────────────────────────────────────────────────────────── */

function MultiToggle({
  id,
  label,
  checked,
  onToggle,
  accent = "blue",
}: {
  id: string;
  label: string;
  checked: boolean;
  onToggle: () => void;
  accent?: "purple" | "blue";
}) {
  const color = accent === "blue" ? "#0000c8" : "#be29ec";
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`flex items-center justify-between rounded-xl border px-3 py-2.5 text-[11px] font-semibold transition-all cursor-pointer active:scale-[0.97] ${
        checked
          ? "text-white"
          : "border-white/10 bg-white/[0.02] text-white/50 hover:border-white/20 hover:text-white/80"
      }`}
      style={
        checked ? { borderColor: color, backgroundColor: `${color}15` } : {}
      }
    >
      <span>{label}</span>
      <span
        className="flex h-4 w-4 shrink-0 items-center justify-center rounded border text-[8px] transition-all ml-2"
        style={
          checked
            ? { borderColor: color, backgroundColor: color }
            : { borderColor: "rgba(255,255,255,0.15)" }
        }
      >
        {checked && <Check size={8} strokeWidth={3} color="#fff" />}
      </span>
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   ADIM 1 — Hizmet Alanı
   ───────────────────────────────────────────────────────────────────────────── */

function StepService({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-lg font-bold text-white md:text-xl">
          Ne konuda destek arıyorsunuz?
        </h3>
        <p className="mt-1 text-sm text-white/35">
          Birden fazla alanla ilgileniyorsanız en öncelikliyi seçin.
        </p>
      </div>
      <div className="flex flex-col gap-3">
        {SERVICE_AREAS.map((s) => {
          const selected = value === s.value;
          return (
            <button
              key={s.value}
              type="button"
              onClick={() => onChange(s.value)}
              className={`group flex items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-200 cursor-pointer active:scale-[0.98] ${
                selected
                  ? "border-[#be29ec] bg-[#be29ec]/10"
                  : "border-white/8 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
              }`}
            >
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all"
                style={
                  selected
                    ? {
                        background:
                          "linear-gradient(135deg,#be29ec22,#0000c822)",
                        border: "1px solid #be29ec44",
                      }
                    : {
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }
                }
              >
                <s.Icon
                  size={18}
                  className={
                    selected
                      ? "text-[#be29ec]"
                      : "text-white/30 group-hover:text-white/60"
                  }
                  strokeWidth={1.5}
                />
              </div>
              <div className="flex-1">
                <div
                  className={`font-bold text-sm ${selected ? "text-white" : "text-white/70 group-hover:text-white"}`}
                >
                  {s.label}
                </div>
                <div className="text-[11px] text-white/30 mt-0.5">{s.desc}</div>
              </div>
              <span
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all"
                style={
                  selected
                    ? { borderColor: "#be29ec", backgroundColor: "#be29ec" }
                    : { borderColor: "rgba(255,255,255,0.15)" }
                }
              >
                {selected && <Check size={10} strokeWidth={2.5} color="#fff" />}
              </span>
            </button>
          );
        })}
      </div>
      {error && (
        <p className="text-[10px] font-bold uppercase text-red-400">{error}</p>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   OAUTH MODAL
   ───────────────────────────────────────────────────────────────────────────── */

function OAuthModal({
  tool,
  onClose,
  onSuccess,
}: {
  tool: typeof ACCESS_TOOLS[number];
  onClose: () => void;
  onSuccess: (toolValue: string, token: string) => void;
}) {
  const [status, setStatus] = useState<"idle" | "waiting" | "success" | "error">("idle");

  const handleConnect = () => {
    setStatus("waiting");

    const clientId =
      tool.provider === "google"
        ? process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ""
        : process.env.NEXT_PUBLIC_META_APP_ID ?? "";

    const redirectUri = `${window.location.origin}/api/oauth/callback/${tool.provider}`;

    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: "code",
      scope: tool.scope,
      state: tool.value,
      access_type: "offline",
      ...(tool.provider === "google" ? { prompt: "consent" } : {}),
    });

    const authWindow = window.open(
      `${tool.authUrl}?${params.toString()}`,
      `oauth_${tool.value}`,
      "width=500,height=650,scrollbars=yes,resizable=yes",
    );

    const messageHandler = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      if (event.data?.type === "OAUTH_SUCCESS" && event.data?.tool === tool.value) {
        window.removeEventListener("message", messageHandler);
        setStatus("success");
        onSuccess(tool.value, event.data.token ?? "connected");
        setTimeout(onClose, 1200);
      }
      if (event.data?.type === "OAUTH_ERROR" && event.data?.tool === tool.value) {
        window.removeEventListener("message", messageHandler);
        setStatus("error");
      }
    };

    window.addEventListener("message", messageHandler);
  };

  const permissionItems: Record<string, string[]> = {
    ga4: ["Trafik ve kullanıcı verileri", "Oturum ve bounce rate", "Dönüşüm ve hedef verileri"],
    search_console: ["Organik arama keyword'leri", "Tıklama ve impression verileri", "Ortalama sıralama pozisyonu"],
    google_ads: ["Kampanya harcama verileri", "Reklam kalite skorları", "Kampanya performans metrikleri"],
    meta_ads: ["Facebook & Instagram reklam verisi", "Kampanya CPM ve CPC metrikleri", "Hedef kitle erişim verileri"],
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 16 }}
          transition={{ duration: 0.22 }}
          className="relative w-full max-w-sm rounded-[2rem] border border-white/10 bg-[#111] p-7 shadow-2xl"
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/40 hover:bg-white/10 hover:text-white transition cursor-pointer"
          >
            <X size={14} />
          </button>

          <div className="flex flex-col gap-5">
            <div>
              <div className="text-[9px] font-black uppercase tracking-[0.25em] text-white/30 mb-2">
                Hesap Erişimi
              </div>
              <h3 className="text-xl font-bold text-white">{tool.label}</h3>
              <p className="mt-1.5 text-sm text-white/40 leading-relaxed">
                {tool.description}
              </p>
            </div>

            <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">
              <div className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30 mb-3">
                Sadece okuma erişimi istiyoruz
              </div>
              <ul className="space-y-2">
                {(permissionItems[tool.value] ?? []).map((item) => (
                  <li key={item} className="flex items-center gap-2 text-[11px] text-white/50">
                    <Check size={10} className="text-green-400 shrink-0" strokeWidth={3} />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[10px] text-white/20">
                Şifreniz istenmez. İstediğiniz zaman erişimi iptal edebilirsiniz.
              </p>
            </div>

            {status === "success" ? (
              <div className="flex items-center justify-center gap-2 rounded-2xl bg-green-500/15 border border-green-500/30 py-4 text-sm font-bold text-green-400">
                <CheckCircle2 size={16} strokeWidth={2} />
                Bağlantı sağlandı
              </div>
            ) : status === "error" ? (
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 rounded-2xl bg-red-500/10 border border-red-500/20 py-3 text-sm text-red-400">
                  Bağlantı başarısız. Tekrar deneyin.
                </div>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="w-full py-3 rounded-2xl text-[11px] font-black uppercase tracking-[0.18em] text-white transition cursor-pointer"
                  style={{ background: "linear-gradient(90deg,#be29ec,#0000c8)" }}
                >
                  Tekrar Dene
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleConnect}
                disabled={status === "waiting"}
                className="flex w-full items-center justify-center gap-2.5 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.18em] text-white transition-all hover:scale-[1.01] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_0_24px_rgba(190,41,236,0.3)]"
                style={{ background: "linear-gradient(90deg,#be29ec,#0000c8)" }}
              >
                {status === "waiting" ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Bağlantı bekleniyor...
                  </>
                ) : (
                  <>
                    <ExternalLink size={14} strokeWidth={2} />
                    {tool.label} ile Bağlan
                  </>
                )}
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   ADIM 2 — Sektör
   ───────────────────────────────────────────────────────────────────────────── */

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
          Başvurunuzu sektörünüze göre değerlendireceğiz.
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
              className={`group flex flex-col items-start gap-3 rounded-2xl border p-4 text-left transition-all duration-300 cursor-pointer md:p-5 active:scale-[0.97] ${
                selected
                  ? "border-[#be29ec] bg-[#be29ec]/10"
                  : "border-white/8 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
              }`}
            >
              <s.Icon
                size={20}
                className={
                  selected
                    ? "text-[#be29ec]"
                    : "text-white/25 group-hover:text-white/50"
                }
                strokeWidth={1.5}
              />
              <span
                className={`text-[11px] font-bold uppercase tracking-[0.06em] ${selected ? "text-white" : "text-white/50 group-hover:text-white/70"}`}
              >
                {s.label}
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
            className="overflow-hidden"
          >
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                Sektörünüzü belirtin
              </label>
              <input
                value={otherSector}
                onChange={(e) => onOtherSectorChange(e.target.value)}
                placeholder="Sektörünüzü yazın"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white outline-none transition-all focus:border-[#be29ec] placeholder:text-white/15"
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

/* ─────────────────────────────────────────────────────────────────────────────
   ADIM 3 — Hizmete Özel Dinamik Sorular
   ───────────────────────────────────────────────────────────────────────────── */

function StepDetails({
  serviceArea,
  watch,
  setValue,
  errors,
}: {
  serviceArea: ServiceArea;
  watch: ReturnType<typeof useForm<FormInput>>["watch"];
  setValue: ReturnType<typeof useForm<FormInput>>["setValue"];
  errors: ReturnType<typeof useForm<FormInput>>["formState"]["errors"];
}) {
  const budget = watch("budget") ?? "";
  const hasWebsite = watch("hasWebsite") ?? "";
  const website = watch("website") ?? "";
  const adAccess = (watch("adAccess") as string[]) ?? [];
  const socialPlatforms = (watch("socialPlatforms") as string[]) ?? [];
  const hasSocialAccounts = watch("hasSocialAccounts") ?? "";
  const hasExistingBrand = watch("hasExistingBrand") ?? "";
  const competitors = (watch("competitors") as string[]) ?? [];
  const oauthTokens = (watch("oauthTokens") as Record<string, string>) ?? {};
  const [activeOAuthTool, setActiveOAuthTool] = useState<typeof ACCESS_TOOLS[number] | null>(null);

  const handleOAuthSuccess = (toolValue: string, token: string) => {
    const current = (watch("oauthTokens") as Record<string, string>) ?? {};
    setValue("oauthTokens", { ...current, [toolValue]: token });
    const currentAccess = (watch("adAccess") as string[]) ?? [];
    if (!currentAccess.includes(toolValue)) {
      setValue("adAccess", [...currentAccess, toolValue]);
    }
    setActiveOAuthTool(null);
  };

  const addCompetitor = () => {
    if (competitors.length < 3) setValue("competitors", [...competitors, ""]);
  };

  const removeCompetitor = (index: number) => {
    setValue("competitors", competitors.filter((_, i) => i !== index));
  };

  const updateCompetitor = (index: number, value: string) => {
    const next = [...competitors];
    next[index] = value;
    setValue("competitors", next);
  };

  const toggleArray = (field: "adAccess" | "socialPlatforms", val: string) => {
    const current = (watch(field) as string[]) ?? [];
    const next = current.includes(val)
      ? current.filter((v) => v !== val)
      : [...current, val];
    setValue(field, next);
  };

  // ── REKLAM & PERFORMANS ──
  if (serviceArea === "ADS") {
    return (
      <div className="flex flex-col gap-6">
        <div>
          <h3 className="text-lg font-bold text-white md:text-xl">
            Reklam detayları
          </h3>
          <p className="mt-1 text-sm text-white/35">
            Mevcut durumunuzu anlamamıza yardımcı olur.
          </p>
        </div>

        {/* Bütçe */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
            Aylık reklam bütçeniz
          </label>
          <input
            value={budget}
            onChange={(e) => setValue("budget", e.target.value)}
            placeholder="Örn: 15.000 ₺, €500, henüz belirsiz..."
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm font-medium text-white outline-none transition-all focus:border-[#be29ec] placeholder:text-white/15"
          />
        </div>

        {/* Mevcut web sitesi */}
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
            Mevcut web siteniz var mı?
          </label>
          <div className="grid grid-cols-2 gap-2">
            <SelectCard
              selected={hasWebsite === "YES"}
              onClick={() => setValue("hasWebsite", "YES")}
            >
              Evet, var
            </SelectCard>
            <SelectCard
              selected={hasWebsite === "NO"}
              onClick={() => setValue("hasWebsite", "NO")}
            >
              Hayır, yok
            </SelectCard>
          </div>
        </div>

        <AnimatePresence>
          {hasWebsite === "YES" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
                  Web sitesi adresi
                </label>
                <div className="flex overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-all focus-within:border-[#be29ec]">
                  <span className="flex items-center border-r border-white/10 bg-white/5 px-3 text-xs font-bold text-white/30 select-none">
                    https://
                  </span>
                  <input
                    value={website.replace(/^https?:\/\//i, "")}
                    onChange={(e) =>
                      setValue(
                        "website",
                        e.target.value
                          ? `https://${e.target.value.replace(/^https?:\/\//i, "")}`
                          : "",
                      )
                    }
                    placeholder="sirketiniz.com"
                    className="flex-1 bg-transparent px-4 py-3.5 text-sm font-medium text-white outline-none placeholder:text-white/15"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Rakip URL'leri */}
        <div className="space-y-3">
          <div>
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
              Rakipleriniz{" "}
              <span className="text-white/20 font-medium normal-case tracking-normal">
                (opsiyonel — karşılaştırmalı analiz için)
              </span>
            </label>
            <p className="mt-1 text-[11px] text-white/25">
              Alan adı girin. Raporunuzda rakibinizle karşılaştırmalı konum gösterilecektir.
            </p>
          </div>
          <div className="space-y-2">
            {competitors.map((comp, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="flex flex-1 overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-all focus-within:border-[#be29ec]">
                  <span className="flex items-center border-r border-white/10 bg-white/5 px-3 text-xs font-bold text-white/30 select-none whitespace-nowrap">
                    rakip {index + 1}
                  </span>
                  <input
                    value={comp.replace(/^https?:\/\//i, "")}
                    onChange={(e) =>
                      updateCompetitor(
                        index,
                        e.target.value
                          ? `https://${e.target.value.replace(/^https?:\/\//i, "")}`
                          : "",
                      )
                    }
                    placeholder="ornekrakip.com"
                    className="flex-1 bg-transparent px-4 py-3 text-sm font-medium text-white outline-none placeholder:text-white/15"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeCompetitor(index)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/30 hover:bg-white/10 hover:text-white transition cursor-pointer"
                >
                  <X size={14} strokeWidth={1.5} />
                </button>
              </div>
            ))}
            {competitors.length < 3 && (
              <button
                type="button"
                onClick={addCompetitor}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-2.5 text-[11px] font-bold text-white/40 hover:border-white/20 hover:text-white/60 transition cursor-pointer"
              >
                <Plus size={13} strokeWidth={2} />
                Rakip Ekle
              </button>
            )}
          </div>
        </div>

        {/* Erişim araçları — OAuth kartları */}
        <div className="space-y-3 rounded-2xl border border-white/8 bg-white/[0.02] p-4">
          <div>
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
              Analiz erişim izinleri{" "}
              <span className="text-white/20 font-medium normal-case tracking-normal">
                (opsiyonel — daha derin analiz sağlar)
              </span>
            </label>
            <p className="mt-1 text-[11px] text-white/30 leading-relaxed">
              Hesabınıza güvenli OAuth ile bağlanıyoruz. Şifre istemiyoruz.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            {ACCESS_TOOLS.map((tool) => {
              const isConnected = !!oauthTokens[tool.value];
              return (
                <div
                  key={tool.value}
                  className="flex items-center justify-between rounded-xl border px-4 py-3 transition-all"
                  style={
                    isConnected
                      ? { borderColor: "rgba(34,197,94,0.4)", backgroundColor: "rgba(34,197,94,0.06)" }
                      : { borderColor: "rgba(255,255,255,0.08)", backgroundColor: "rgba(255,255,255,0.02)" }
                  }
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border"
                      style={
                        isConnected
                          ? { borderColor: "rgba(34,197,94,0.6)", backgroundColor: "rgba(34,197,94,0.2)" }
                          : { borderColor: "rgba(255,255,255,0.15)" }
                      }
                    >
                      {isConnected && <Check size={10} strokeWidth={3} color="#4ade80" />}
                    </span>
                    <div>
                      <div className={`text-[11px] font-bold ${isConnected ? "text-green-400" : "text-white/60"}`}>
                        {tool.label}
                      </div>
                      <div className="text-[10px] text-white/25">{tool.description}</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveOAuthTool(tool)}
                    className="shrink-0 rounded-lg border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] transition-all cursor-pointer hover:scale-[1.02]"
                    style={
                      isConnected
                        ? { borderColor: "rgba(34,197,94,0.3)", color: "rgba(74,222,128,0.8)", backgroundColor: "rgba(34,197,94,0.05)" }
                        : { borderColor: "rgba(190,41,236,0.3)", color: "#be29ec", backgroundColor: "rgba(190,41,236,0.05)" }
                    }
                  >
                    {isConnected ? "Yenile" : "Bağlan →"}
                  </button>
                </div>
              );
            })}
          </div>
          {activeOAuthTool && (
            <OAuthModal
              tool={activeOAuthTool}
              onClose={() => setActiveOAuthTool(null)}
              onSuccess={handleOAuthSuccess}
            />
          )}
        </div>

        {/* Sosyal medya hesapları */}
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
            Sosyal medya hesabınız var mı?
          </label>
          <div className="grid grid-cols-2 gap-2">
            <SelectCard
              selected={hasSocialAccounts === "YES"}
              onClick={() => setValue("hasSocialAccounts", "YES")}
            >
              Evet, var
            </SelectCard>
            <SelectCard
              selected={hasSocialAccounts === "NO"}
              onClick={() => setValue("hasSocialAccounts", "NO")}
            >
              Hayır, yok
            </SelectCard>
          </div>
        </div>

        <AnimatePresence>
          {hasSocialAccounts === "YES" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
                    Hangi platformlar?{" "}
                    <span className="text-white/20 font-medium normal-case tracking-normal">
                      (birden fazla seçebilirsiniz)
                    </span>
                  </label>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {SOCIAL_PLATFORMS.map((p) => (
                      <MultiToggle
                        key={p.value}
                        id={p.value}
                        label={p.label}
                        checked={socialPlatforms.includes(p.value)}
                        onToggle={() => toggleArray("socialPlatforms", p.value)}
                        accent="purple"
                      />
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
                    Hesap kullanıcı adları{" "}
                    <span className="text-white/20 font-medium normal-case tracking-normal">
                      (opsiyonel — inceleme için)
                    </span>
                  </label>
                  <textarea
                    value={watch("socialHandles") ?? ""}
                    onChange={(e) => setValue("socialHandles", e.target.value)}
                    placeholder="@instagram_hesabiniz, facebook.com/sayfaniz, linkedin.com/company/sirketiniz"
                    rows={3}
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white outline-none transition-all focus:border-[#be29ec] placeholder:text-white/15"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // ── WEB SİTESİ & SEO ──
  if (serviceArea === "WEB") {
    return (
      <div className="flex flex-col gap-6">
        <div>
          <h3 className="text-lg font-bold text-white md:text-xl">
            Web sitesi detayları
          </h3>
          <p className="mt-1 text-sm text-white/35">
            Mevcut durumunuzu anlamamıza yardımcı olur.
          </p>
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
            Mevcut web siteniz var mı?
          </label>
          <div className="grid grid-cols-2 gap-2">
            <SelectCard
              selected={hasWebsite === "YES"}
              onClick={() => setValue("hasWebsite", "YES")}
            >
              Evet, var
            </SelectCard>
            <SelectCard
              selected={hasWebsite === "NO"}
              onClick={() => setValue("hasWebsite", "NO")}
            >
              Hayır, sıfırdan yapılacak
            </SelectCard>
          </div>
        </div>

        <AnimatePresence>
          {hasWebsite === "YES" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="space-y-3">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
                    Mevcut web sitesi adresi
                  </label>
                  <div className="flex overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-all focus-within:border-[#be29ec]">
                    <span className="flex items-center border-r border-white/10 bg-white/5 px-3 text-xs font-bold text-white/30 select-none">
                      https://
                    </span>
                    <input
                      value={website.replace(/^https?:\/\//i, "")}
                      onChange={(e) =>
                        setValue(
                          "website",
                          e.target.value
                            ? `https://${e.target.value.replace(/^https?:\/\//i, "")}`
                            : "",
                        )
                      }
                      placeholder="sirketiniz.com"
                      className="flex-1 bg-transparent px-4 py-3.5 text-sm font-medium text-white outline-none placeholder:text-white/15"
                    />
                  </div>
                </div>
                {/* Search Console & GA4 — OAuth kartları */}
                <div className="space-y-2 rounded-2xl border border-white/8 bg-white/[0.02] p-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
                    SEO analizi erişim izinleri{" "}
                    <span className="text-white/20 font-medium normal-case tracking-normal">
                      (opsiyonel)
                    </span>
                  </label>
                  <p className="text-[11px] text-white/30">
                    Hesabınıza güvenli OAuth ile bağlanıyoruz. Şifre istemiyoruz.
                  </p>
                  <div className="flex flex-col gap-2 mt-2">
                    {ACCESS_TOOLS.filter((t) =>
                      ["search_console", "ga4"].includes(t.value),
                    ).map((tool) => {
                      const isConnected = !!oauthTokens[tool.value];
                      return (
                        <div
                          key={tool.value}
                          className="flex items-center justify-between rounded-xl border px-4 py-3 transition-all"
                          style={
                            isConnected
                              ? { borderColor: "rgba(34,197,94,0.4)", backgroundColor: "rgba(34,197,94,0.06)" }
                              : { borderColor: "rgba(255,255,255,0.08)", backgroundColor: "rgba(255,255,255,0.02)" }
                          }
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border"
                              style={
                                isConnected
                                  ? { borderColor: "rgba(34,197,94,0.6)", backgroundColor: "rgba(34,197,94,0.2)" }
                                  : { borderColor: "rgba(255,255,255,0.15)" }
                              }
                            >
                              {isConnected && <Check size={10} strokeWidth={3} color="#4ade80" />}
                            </span>
                            <div>
                              <div className={`text-[11px] font-bold ${isConnected ? "text-green-400" : "text-white/60"}`}>
                                {tool.label}
                              </div>
                              <div className="text-[10px] text-white/25">{tool.description}</div>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setActiveOAuthTool(tool)}
                            className="shrink-0 rounded-lg border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] transition-all cursor-pointer hover:scale-[1.02]"
                            style={
                              isConnected
                                ? { borderColor: "rgba(34,197,94,0.3)", color: "rgba(74,222,128,0.8)", backgroundColor: "rgba(34,197,94,0.05)" }
                                : { borderColor: "rgba(190,41,236,0.3)", color: "#be29ec", backgroundColor: "rgba(190,41,236,0.05)" }
                            }
                          >
                            {isConnected ? "Yenile" : "Bağlan →"}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                  {activeOAuthTool && (
                    <OAuthModal
                      tool={activeOAuthTool}
                      onClose={() => setActiveOAuthTool(null)}
                      onSuccess={handleOAuthSuccess}
                    />
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Rakip URL'leri */}
        <div className="space-y-3">
          <div>
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
              Rakipleriniz{" "}
              <span className="text-white/20 font-medium normal-case tracking-normal">
                (opsiyonel — karşılaştırmalı analiz için)
              </span>
            </label>
            <p className="mt-1 text-[11px] text-white/25">
              Alan adı girin. Raporunuzda rakibinizle karşılaştırmalı konum gösterilecektir.
            </p>
          </div>
          <div className="space-y-2">
            {competitors.map((comp, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="flex flex-1 overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-all focus-within:border-[#be29ec]">
                  <span className="flex items-center border-r border-white/10 bg-white/5 px-3 text-xs font-bold text-white/30 select-none whitespace-nowrap">
                    rakip {index + 1}
                  </span>
                  <input
                    value={comp.replace(/^https?:\/\//i, "")}
                    onChange={(e) =>
                      updateCompetitor(
                        index,
                        e.target.value
                          ? `https://${e.target.value.replace(/^https?:\/\//i, "")}`
                          : "",
                      )
                    }
                    placeholder="ornekrakip.com"
                    className="flex-1 bg-transparent px-4 py-3 text-sm font-medium text-white outline-none placeholder:text-white/15"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeCompetitor(index)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/30 hover:bg-white/10 hover:text-white transition cursor-pointer"
                >
                  <X size={14} strokeWidth={1.5} />
                </button>
              </div>
            ))}
            {competitors.length < 3 && (
              <button
                type="button"
                onClick={addCompetitor}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-2.5 text-[11px] font-bold text-white/40 hover:border-white/20 hover:text-white/60 transition cursor-pointer"
              >
                <Plus size={13} strokeWidth={2} />
                Rakip Ekle
              </button>
            )}
          </div>
        </div>

        {/* Sosyal medya hesapları */}
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
            Sosyal medya hesabınız var mı?
          </label>
          <div className="grid grid-cols-2 gap-2">
            <SelectCard
              selected={hasSocialAccounts === "YES"}
              onClick={() => setValue("hasSocialAccounts", "YES")}
            >
              Evet, var
            </SelectCard>
            <SelectCard
              selected={hasSocialAccounts === "NO"}
              onClick={() => setValue("hasSocialAccounts", "NO")}
            >
              Hayır, yok
            </SelectCard>
          </div>
        </div>

        <AnimatePresence>
          {hasSocialAccounts === "YES" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
                    Hangi platformlar?{" "}
                    <span className="text-white/20 font-medium normal-case tracking-normal">
                      (birden fazla seçebilirsiniz)
                    </span>
                  </label>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {SOCIAL_PLATFORMS.map((p) => (
                      <MultiToggle
                        key={p.value}
                        id={p.value}
                        label={p.label}
                        checked={socialPlatforms.includes(p.value)}
                        onToggle={() => toggleArray("socialPlatforms", p.value)}
                        accent="purple"
                      />
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
                    Hesap kullanıcı adları{" "}
                    <span className="text-white/20 font-medium normal-case tracking-normal">
                      (opsiyonel — inceleme için)
                    </span>
                  </label>
                  <textarea
                    value={watch("socialHandles") ?? ""}
                    onChange={(e) => setValue("socialHandles", e.target.value)}
                    placeholder="@instagram_hesabiniz, facebook.com/sayfaniz, linkedin.com/company/sirketiniz"
                    rows={3}
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white outline-none transition-all focus:border-[#be29ec] placeholder:text-white/15"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // ── MARKA & KURUMSAL KİMLİK ──
  if (serviceArea === "BRAND") {
    return (
      <div className="flex flex-col gap-6">
        <div>
          <h3 className="text-lg font-bold text-white md:text-xl">
            Marka durumu
          </h3>
          <p className="mt-1 text-sm text-white/35">
            Nereden başlayacağımızı anlamamıza yardımcı olur.
          </p>
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
            Mevcut bir marka kimliğiniz var mı?
          </label>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {[
              { v: "YES", label: "Evet, revize edilecek" },
              { v: "PARTIAL", label: "Kısmen var, tamamlanacak" },
              { v: "NO", label: "Hayır, sıfırdan oluşturulacak" },
            ].map((o) => (
              <SelectCard
                key={o.v}
                selected={hasExistingBrand === o.v}
                onClick={() => setValue("hasExistingBrand", o.v)}
              >
                {o.label}
              </SelectCard>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
            Varsa web sitesi / sosyal medya adresi{" "}
            <span className="text-white/20 font-medium normal-case tracking-normal">
              (opsiyonel)
            </span>
          </label>
          <input
            value={website}
            onChange={(e) => setValue("website", e.target.value)}
            placeholder="premiumdijital.com veya @hesap_adi"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm font-medium text-white outline-none transition-all focus:border-[#be29ec] placeholder:text-white/15"
          />
        </div>

        {/* Sosyal medya hesapları */}
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
            Sosyal medya hesabınız var mı?
          </label>
          <div className="grid grid-cols-2 gap-2">
            <SelectCard
              selected={hasSocialAccounts === "YES"}
              onClick={() => setValue("hasSocialAccounts", "YES")}
            >
              Evet, var
            </SelectCard>
            <SelectCard
              selected={hasSocialAccounts === "NO"}
              onClick={() => setValue("hasSocialAccounts", "NO")}
            >
              Hayır, yok
            </SelectCard>
          </div>
        </div>

        <AnimatePresence>
          {hasSocialAccounts === "YES" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
                    Hangi platformlar?{" "}
                    <span className="text-white/20 font-medium normal-case tracking-normal">
                      (birden fazla seçebilirsiniz)
                    </span>
                  </label>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {SOCIAL_PLATFORMS.map((p) => (
                      <MultiToggle
                        key={p.value}
                        id={p.value}
                        label={p.label}
                        checked={socialPlatforms.includes(p.value)}
                        onToggle={() => toggleArray("socialPlatforms", p.value)}
                        accent="purple"
                      />
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
                    Hesap kullanıcı adları{" "}
                    <span className="text-white/20 font-medium normal-case tracking-normal">
                      (opsiyonel — inceleme için)
                    </span>
                  </label>
                  <textarea
                    value={watch("socialHandles") ?? ""}
                    onChange={(e) => setValue("socialHandles", e.target.value)}
                    placeholder="@instagram_hesabiniz, facebook.com/sayfaniz, linkedin.com/company/sirketiniz"
                    rows={3}
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white outline-none transition-all focus:border-[#be29ec] placeholder:text-white/15"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // ── SOSYAL MEDYA YÖNETİMİ ──
  if (serviceArea === "SOCIAL") {
    return (
      <div className="flex flex-col gap-6">
        <div>
          <h3 className="text-lg font-bold text-white md:text-xl">
            Sosyal medya detayları
          </h3>
          <p className="mt-1 text-sm text-white/35">
            Hangi platformlarda destek istediğinizi belirtin.
          </p>
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
            Hangi platformlar?{" "}
            <span className="text-white/20 font-medium normal-case tracking-normal">
              (birden fazla seçebilirsiniz)
            </span>
          </label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {SOCIAL_PLATFORMS.map((p) => (
              <MultiToggle
                key={p.value}
                id={p.value}
                label={p.label}
                checked={socialPlatforms.includes(p.value)}
                onToggle={() => toggleArray("socialPlatforms", p.value)}
                accent="purple"
              />
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
            Mevcut hesaplarınız var mı?
          </label>
          <div className="grid grid-cols-2 gap-2">
            <SelectCard
              selected={hasSocialAccounts === "YES"}
              onClick={() => setValue("hasSocialAccounts", "YES")}
            >
              Evet, aktif hesaplarım var
            </SelectCard>
            <SelectCard
              selected={hasSocialAccounts === "NO"}
              onClick={() => setValue("hasSocialAccounts", "NO")}
            >
              Hayır, sıfırdan başlayacağız
            </SelectCard>
          </div>
        </div>

        <AnimatePresence>
          {hasSocialAccounts === "YES" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
                  Hesap kullanıcı adları{" "}
                  <span className="text-white/20 font-medium normal-case tracking-normal">
                    (opsiyonel — inceleme için)
                  </span>
                </label>
                <textarea
                  value={watch("socialHandles") ?? ""}
                  onChange={(e) => setValue("socialHandles", e.target.value)}
                  placeholder="@instagram_hesabiniz, facebook.com/sayfaniz, linkedin.com/company/sirketiniz"
                  rows={3}
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white outline-none transition-all focus:border-[#be29ec] placeholder:text-white/15"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // ── DİJİTAL OPERASYON ──
  if (serviceArea === "OPS") {
    const opsGoals = (watch("opsGoals") as string[]) ?? [];
    return (
      <div className="flex flex-col gap-6">
        <div>
          <h3 className="text-lg font-bold text-white md:text-xl">
            Operasyon detayları
          </h3>
          <p className="mt-1 text-sm text-white/35">
            Mevcut durumunuzu ve hedeflerinizi anlamamıza yardımcı olur.
          </p>
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
            Ne kazanmak istiyorsunuz?{" "}
            <span className="text-white/20 font-medium normal-case tracking-normal">
              (birden fazla seçebilirsiniz)
            </span>
          </label>
          <div className="grid grid-cols-1 gap-2">
            {OPS_CAPABILITIES.map((cap) => (
              <MultiToggle
                key={cap.value}
                id={cap.value}
                label={cap.label}
                checked={opsGoals.includes(cap.value)}
                onToggle={() => {
                  const next = opsGoals.includes(cap.value)
                    ? opsGoals.filter((v) => v !== cap.value)
                    : [...opsGoals, cap.value];
                  setValue("opsGoals", next);
                }}
                accent="purple"
              />
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
            Kullandığınız araçlar / sistemler{" "}
            <span className="text-white/20 font-medium normal-case tracking-normal">
              (opsiyonel)
            </span>
          </label>
          <textarea
            value={watch("currentTools") ?? ""}
            onChange={(e) => setValue("currentTools", e.target.value)}
            placeholder="Örn: Excel, WhatsApp, Shopify, Paraşüt, HubSpot..."
            rows={2}
            className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white outline-none transition-all focus:border-[#be29ec] placeholder:text-white/15"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
            Varsa web sitesi{" "}
            <span className="text-white/20 font-medium normal-case tracking-normal">
              (opsiyonel)
            </span>
          </label>
          <div className="flex overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-all focus-within:border-[#be29ec]">
            <span className="flex items-center border-r border-white/10 bg-white/5 px-3 text-xs font-bold text-white/30 select-none">
              https://
            </span>
            <input
              value={website.replace(/^https?:\/\//i, "")}
              onChange={(e) =>
                setValue(
                  "website",
                  e.target.value
                    ? `https://${e.target.value.replace(/^https?:\/\//i, "")}`
                    : "",
                )
              }
              placeholder="sirketiniz.com"
              className="flex-1 bg-transparent px-4 py-3.5 text-sm font-medium text-white outline-none placeholder:text-white/15"
            />
          </div>
        </div>

        {/* Sosyal medya hesapları */}
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
            Sosyal medya hesabınız var mı?
          </label>
          <div className="grid grid-cols-2 gap-2">
            <SelectCard
              selected={hasSocialAccounts === "YES"}
              onClick={() => setValue("hasSocialAccounts", "YES")}
            >
              Evet, var
            </SelectCard>
            <SelectCard
              selected={hasSocialAccounts === "NO"}
              onClick={() => setValue("hasSocialAccounts", "NO")}
            >
              Hayır, yok
            </SelectCard>
          </div>
        </div>

        <AnimatePresence>
          {hasSocialAccounts === "YES" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
                    Hangi platformlar?{" "}
                    <span className="text-white/20 font-medium normal-case tracking-normal">
                      (birden fazla seçebilirsiniz)
                    </span>
                  </label>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {SOCIAL_PLATFORMS.map((p) => (
                      <MultiToggle
                        key={p.value}
                        id={p.value}
                        label={p.label}
                        checked={socialPlatforms.includes(p.value)}
                        onToggle={() => toggleArray("socialPlatforms", p.value)}
                        accent="purple"
                      />
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
                    Hesap kullanıcı adları{" "}
                    <span className="text-white/20 font-medium normal-case tracking-normal">
                      (opsiyonel — inceleme için)
                    </span>
                  </label>
                  <textarea
                    value={watch("socialHandles") ?? ""}
                    onChange={(e) => setValue("socialHandles", e.target.value)}
                    placeholder="@instagram_hesabiniz, facebook.com/sayfaniz, linkedin.com/company/sirketiniz"
                    rows={3}
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white outline-none transition-all focus:border-[#be29ec] placeholder:text-white/15"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return null;
}

/* ─────────────────────────────────────────────────────────────────────────────
   ADIM 4 — İletişim
   ───────────────────────────────────────────────────────────────────────────── */

function StepContact({
  register,
  errors,
  setValue,
  watch,
}: {
  register: ReturnType<typeof useForm<FormInput>>["register"];
  errors: ReturnType<typeof useForm<FormInput>>["formState"]["errors"];
  setValue: ReturnType<typeof useForm<FormInput>>["setValue"];
  watch: ReturnType<typeof useForm<FormInput>>["watch"];
}) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-lg font-bold text-white md:text-xl">
          Size nasıl ulaşalım?
        </h3>
        <p className="mt-1 text-sm text-white/35">
          Başvurunuzu değerlendirip en kısa sürede dönüş yapacağız.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
            Ad Soyad <span className="text-[#be29ec]">*</span>
          </label>
          <input
            {...register("fullName")}
            placeholder="Ahmet Yılmaz"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm font-medium text-white outline-none transition-all focus:border-[#be29ec] placeholder:text-white/15"
          />
          {errors.fullName && (
            <p className="text-[10px] font-bold uppercase text-red-400">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
            Şirket / Marka{" "}
            <span className="text-white/20 font-medium normal-case tracking-normal">
              (opsiyonel)
            </span>
          </label>
          <input
            {...register("company")}
            placeholder="Şirket adı"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm font-medium text-white outline-none transition-all focus:border-[#be29ec] placeholder:text-white/15"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
            E-Posta <span className="text-[#be29ec]">*</span>
          </label>
          <input
            {...register("email")}
            placeholder="ornek@email.com"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm font-medium text-white outline-none transition-all focus:border-[#be29ec] placeholder:text-white/15"
          />
          {errors.email && (
            <p className="text-[10px] font-bold uppercase text-red-400">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
            Telefon{" "}
            <span className="text-white/20 font-medium normal-case tracking-normal">
              (opsiyonel)
            </span>
          </label>
          <input
            {...register("phone")}
            placeholder="+90 5XX XXX XX XX"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm font-medium text-white outline-none transition-all focus:border-[#be29ec] placeholder:text-white/15"
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
            Eklemek istediğiniz bir şey{" "}
            <span className="text-white/20 font-medium normal-case tracking-normal">
              (opsiyonel)
            </span>
          </label>
          <textarea
            {...register("message")}
            placeholder="Projeniz, beklentileriniz veya özel durumunuz hakkında kısa bir not..."
            rows={3}
            className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white outline-none transition-all focus:border-[#be29ec] placeholder:text-white/15"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3">
        <Lock size={14} strokeWidth={1.5} className="shrink-0 text-white/25" />
        <p className="text-[11px] leading-snug text-white/30">
          Bilgileriniz yalnızca başvurunuz için kullanılır, üçüncü taraflarla
          paylaşılmaz.
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   HIZLI TEMAS FORMU
   ───────────────────────────────────────────────────────────────────────────── */

const QuickSchema = z
  .object({
    quickBotField: z.string().max(0), // honeypot
    quickName: z
      .string()
      .min(2, "Ad soyad en az 2 karakter olmalıdır")
      .max(60, "Ad soyad çok uzun")
      .regex(
        /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/,
        "Lütfen geçerli bir ad soyad giriniz",
      ),
    quickEmail: z.string().email("Geçerli bir e-posta adresi giriniz"),
    quickPhone: z
      .string()
      .optional()
      .refine(
        (v) => !v || /^[+]?[\d\s\-().]{7,20}$/.test(v),
        "Geçerli bir telefon numarası giriniz",
      ),
    quickMessage: z
      .string()
      .min(10, "Lütfen talebinizi en az 10 karakter ile belirtin")
      .max(1000, "Mesaj çok uzun"),
  })
  .refine((d) => d.quickEmail || d.quickPhone, {
    message: "E-posta veya telefon alanlarından en az biri doldurulmalıdır",
    path: ["quickEmail"],
  });

type QuickInput = z.infer<typeof QuickSchema>;

function QuickForm({
  onSubmitAction,
  onSwitchFull,
}: {
  onSubmitAction?: (
    data: QuickInput & { formStartTime: string },
  ) => Promise<{ success?: boolean; error?: string }>;
  onSwitchFull: () => void;
}) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);
  const [startTime] = useState(() => Date.now().toString());

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QuickInput>({
    resolver: zodResolver(QuickSchema),
    defaultValues: {
      quickBotField: "",
      quickName: "",
      quickEmail: "",
      quickPhone: "",
      quickMessage: "",
    },
    mode: "onTouched",
  });

  const onSubmit = (data: QuickInput) => {
    setServerError(null);
    startTransition(async () => {
      if (onSubmitAction) {
        const result = await onSubmitAction({
          ...data,
          formStartTime: startTime,
        });
        if (result?.error) {
          setServerError(result.error);
          return;
        }
      } else {
        await new Promise((r) => setTimeout(r, 900));
      }
      setIsSuccess(true);
      reset();
    });
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-5 py-8 text-center"
      >
        <div
          className="flex h-16 w-16 items-center justify-center rounded-full"
          style={{
            background:
              "linear-gradient(135deg,rgba(190,41,236,0.2),rgba(0,0,200,0.2))",
            border: "1px solid rgba(190,41,236,0.3)",
          }}
        >
          <CheckCircle2
            size={28}
            strokeWidth={1.5}
            style={{ color: "#d8b4fe" }}
          />
        </div>
        <div>
          <h3 className="text-xl font-bold uppercase tracking-tight text-white">
            Mesajınız Alındı
          </h3>
          <p className="mt-2 text-sm text-white/45">
            En geç <span className="font-bold text-white/70">1 iş günü</span>{" "}
            içinde dönüş yapacağız.
          </p>
        </div>

        {/* WhatsApp CTA */}
        <div className="border-t border-white/8 pt-7 mt-2 text-center">
          <p className="text-sm text-zinc-500 italic mb-4">
            Hızlıca görüşmek ister misiniz?
          </p>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "905425658010"}?text=${encodeURIComponent("Merhaba, ön başvuru formunu doldurdum. Görüşmek istiyorum.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full px-7 py-4 text-sm font-black uppercase tracking-[0.16em] text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(37,211,102,0.3)]"
            style={{ background: "linear-gradient(135deg, #128c7e, #25d366)" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp ile Hemen Yazın
          </a>
          <p className="mt-3 text-xs text-zinc-600 italic">
            Genellikle birkaç dakika içinde yanıt veriyoruz.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-4"
    >
      {/* Honeypot — botlar için gizli alan */}
      <input
        {...register("quickBotField")}
        type="text"
        className="hidden"
        aria-hidden="true"
        tabIndex={-1}
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
            Ad Soyad <span className="text-[#be29ec]">*</span>
          </label>
          <input
            {...register("quickName")}
            placeholder="Ahmet Yılmaz"
            autoComplete="name"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm font-medium text-white outline-none transition-all focus:border-[#be29ec] placeholder:text-white/15"
          />
          {errors.quickName && (
            <p className="text-[10px] font-bold uppercase text-red-400">
              {errors.quickName.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
            E-posta <span className="text-[#be29ec]">*</span>
          </label>
          <input
            {...register("quickEmail")}
            type="email"
            placeholder="ornek@email.com"
            autoComplete="email"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm font-medium text-white outline-none transition-all focus:border-[#be29ec] placeholder:text-white/15"
          />
          {errors.quickEmail && (
            <p className="text-[10px] font-bold uppercase text-red-400">
              {errors.quickEmail.message}
            </p>
          )}
        </div>

        <div className="space-y-2 sm:col-span-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
            Telefon{" "}
            <span className="text-white/20 font-medium normal-case tracking-normal">
              (opsiyonel)
            </span>
          </label>
          <input
            {...register("quickPhone")}
            type="tel"
            placeholder="+90 5XX XXX XX XX"
            autoComplete="tel"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm font-medium text-white outline-none transition-all focus:border-[#be29ec] placeholder:text-white/15"
          />
          {errors.quickPhone && (
            <p className="text-[10px] font-bold uppercase text-red-400">
              {errors.quickPhone.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
          Ne konuda görüşmek istersiniz?{" "}
          <span className="text-[#be29ec]">*</span>
        </label>
        <textarea
          {...register("quickMessage")}
          placeholder="Kısaca anlatın — hangi konuda destek arıyorsunuz, beklentiniz nedir?"
          rows={4}
          className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white outline-none transition-all focus:border-[#be29ec] placeholder:text-white/15"
        />
        {errors.quickMessage && (
          <p className="text-[10px] font-bold uppercase text-red-400">
            {errors.quickMessage.message}
          </p>
        )}
      </div>

      {serverError && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {serverError}
        </div>
      )}

      <button
        type="button"
        onClick={handleSubmit(onSubmit)}
        disabled={isPending}
        className="w-full cursor-pointer py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] text-white transition-all hover:scale-[1.01] active:scale-[0.98] shadow-[0_0_24px_rgba(190,41,236,0.3)] disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ background: "linear-gradient(90deg,#be29ec,#0000c8)" }}
      >
        {isPending ? "Gönderiliyor..." : "Mesajı Gönder →"}
      </button>

      <button
        type="button"
        onClick={onSwitchFull}
        className="text-[10px] text-white/30 hover:text-white/60 transition cursor-pointer text-center uppercase tracking-[0.2em] font-bold"
      >
        Detaylı başvuru formu için tıklayın →
      </button>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   SUCCESS SCREEN
   ───────────────────────────────────────────────────────────────────────────── */

function SuccessScreen({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
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
        <CheckCircle2
          size={36}
          strokeWidth={1.5}
          style={{ color: "#d8b4fe" }}
        />
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl">
          Başvurunuz Alındı
        </h3>
        <p className="text-sm leading-relaxed text-white/45 sm:text-base">
          Başvurunuzu inceleyip en geç{" "}
          <span className="font-bold text-white/70">1 iş günü</span> içinde
          sizinle iletişime geçeceğiz.
        </p>
      </div>

      {/* WhatsApp CTA */}
      <div className="border-t border-white/8 pt-7 mt-2 text-center">
        <p className="text-sm text-zinc-500 italic mb-4">
          Hızlıca görüşmek ister misiniz?
        </p>
        <a
          href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "905425658010"}?text=${encodeURIComponent("Merhaba, ön başvuru formunu doldurdum. Görüşmek istiyorum.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 rounded-full px-7 py-4 text-sm font-black uppercase tracking-[0.16em] text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(37,211,102,0.3)]"
          style={{ background: "linear-gradient(135deg, #128c7e, #25d366)" }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          WhatsApp ile Hemen Yazın
        </a>
        <p className="mt-3 text-xs text-zinc-600 italic">
          Genellikle birkaç dakika içinde yanıt veriyoruz.
        </p>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-[10px] font-bold uppercase tracking-[0.22em] text-white/60 transition hover:bg-white/10 hover:text-white"
      >
        Yeni Başvuru Oluştur
      </button>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   ANA FORM BİLEŞENİ
   ───────────────────────────────────────────────────────────────────────────── */

interface AnalysisFormProps {
  sectionId?: string;
  showHeading?: boolean;
  defaultMode?: "full" | "quick";
  onSubmitAction?: (
    data: FormInput & { formStartTime: string },
  ) => Promise<{ success?: boolean; error?: string }>;
  onQuickSubmitAction?: (
    data: QuickInput & { formStartTime: string },
  ) => Promise<{ success?: boolean; error?: string }>;
  className?: string;
}

// QuickInput'u export ediyoruz ki onSubmitAction tipi kullanılabilsin
export type { QuickInput };

export default function AnalysisForm({
  sectionId = "basvuru",
  showHeading = true,
  defaultMode = "full",
  onSubmitAction,
  onQuickSubmitAction,
  className = "",
}: AnalysisFormProps) {
  const [formMode, setFormMode] = useState<"full" | "quick">(defaultMode);
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
  } = useForm<FormInput>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      botField: "",
      serviceArea: "",
      sector: "",
      otherSector: "",
      budget: "",
      hasWebsite: "",
      website: "",
      adAccess: [],
      competitors: [],
      oauthTokens: {},
      socialPlatforms: [],
      hasSocialAccounts: "",
      hasExistingBrand: "",
      currentTools: "",
      socialHandles: "",
      opsGoals: [],
      fullName: "",
      company: "",
      email: "",
      phone: "",
      message: "",
    },
    mode: "onTouched",
  });

  const serviceArea = watch("serviceArea") as ServiceArea;
  const sector = watch("sector");

  const markCompleted = (i: number) =>
    setCompleted((prev) => new Set([...prev, i]));

  const nextStep = async () => {
    if (step === 0) {
      const ok = await trigger(["serviceArea"]);
      if (!ok) return;
      markCompleted(0);
      setStep(1);
    } else if (step === 1) {
      const ok = await trigger(["sector", "otherSector"]);
      if (!ok) return;
      markCompleted(1);
      setStep(2);
    } else if (step === 2) {
      const ok = await trigger([]);
      if (!ok) return;
      markCompleted(2);
      setStep(3);
    }
  };

  const handleStepClick = (i: number) => {
    if (i < step || completedSteps.has(i)) setStep(i);
  };

  const onSubmit = (data: FormInput) => {
    setServerError(null);
    startTransition(async () => {
      if (onSubmitAction) {
        const result = await onSubmitAction({
          ...data,
          formStartTime: startTime,
        });
        if (result?.error) {
          setServerError(result.error);
          return;
        }
      } else {
        await new Promise((r) => setTimeout(r, 1200));
      }
      setIsSuccess(true);
      markCompleted(3);
      reset();
    });
  };

  return (
    <section
      id={sectionId}
      className={`mx-auto max-w-2xl px-4 py-16 sm:px-5 sm:py-20 md:px-6 md:py-28 ${className}`}
    >
      <div ref={topRef} className="scroll-mt-28" />

      {showHeading && (
        <div className="mb-8 text-center md:mb-10">
          <h2 className="text-3xl font-bold uppercase tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
            Ön{" "}
            <span className="bg-gradient-to-r from-[#be29ec] to-[#0000c8] bg-clip-text text-transparent">
              Başvuru
            </span>
          </h2>

          {/* Mod seçici — iki kart */}
          <div className="mt-8 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setFormMode("quick")}
              className={`cursor-pointer rounded-2xl border p-4 text-left transition-all duration-200 active:scale-[0.98] ${
                formMode === "quick"
                  ? "border-[#be29ec] bg-[#be29ec]/10"
                  : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
              }`}
            >
              <div className={`text-lg mb-1 ${formMode === "quick" ? "" : ""}`}>
                ⚡
              </div>
              <div
                className={`text-[11px] font-black uppercase tracking-[0.2em] mb-1 ${formMode === "quick" ? "text-white" : "text-white/60"}`}
              >
                Hızlı Temas
              </div>
              <div className="text-[10px] text-white/30">~30 saniye</div>
            </button>
            <button
              type="button"
              onClick={() => setFormMode("full")}
              className={`cursor-pointer rounded-2xl border p-4 text-left transition-all duration-200 active:scale-[0.98] ${
                formMode === "full"
                  ? "border-[#0000c8] bg-[#0000c8]/10"
                  : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
              }`}
            >
              <div className="text-lg mb-1">📋</div>
              <div
                className={`text-[11px] font-black uppercase tracking-[0.2em] mb-1 ${formMode === "full" ? "text-white" : "text-white/60"}`}
              >
                Detaylı Başvuru
              </div>
              <div className="text-[10px] text-white/30">~2 dakika</div>
            </button>
          </div>
        </div>
      )}

      <div className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-[#0c0c0c] p-5 shadow-2xl sm:rounded-[2.5rem] sm:p-8 md:p-10">
        <div className="relative z-10">
          <AnimatePresence>
            {formMode === "quick" ? (
              <QuickForm
                key="quick"
                onSubmitAction={onQuickSubmitAction as any}
                onSwitchFull={() => setFormMode("full")}
              />
            ) : isSuccess ? (
              <SuccessScreen
                key="success"
                onReset={() => {
                  setIsSuccess(false);
                  setStep(0);
                  setCompleted(new Set());
                  reset();
                }}
              />
            ) : (
              <motion.div key="form">
                <input
                  {...register("botField")}
                  type="text"
                  className="hidden"
                />

                <ProgressBar
                  current={step}
                  total={4}
                  onStepClick={handleStepClick}
                  completedSteps={completedSteps}
                />

                <AnimatePresence>
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.28 }}
                  >
                    {step === 0 && (
                      <StepService
                        value={serviceArea}
                        onChange={(v) =>
                          setValue("serviceArea", v, { shouldValidate: true })
                        }
                        error={errors.serviceArea?.message}
                      />
                    )}
                    {step === 1 && (
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
                    {step === 2 && (
                      <StepDetails
                        serviceArea={serviceArea}
                        watch={watch}
                        setValue={setValue}
                        errors={errors}
                      />
                    )}
                    {step === 3 && (
                      <StepContact
                        register={register}
                        errors={errors}
                        setValue={setValue}
                        watch={watch}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>

                {serverError && (
                  <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                    {serverError}
                  </div>
                )}

                <div className="mt-6 flex items-center gap-3 md:mt-8">
                  {step > 0 && (
                    <button
                      type="button"
                      onClick={() => setStep((s) => s - 1)}
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 transition cursor-pointer hover:bg-white/10 hover:text-white"
                    >
                      <ArrowLeft size={16} strokeWidth={1.5} />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={step < 3 ? nextStep : handleSubmit(onSubmit)}
                    disabled={isPending}
                    className="flex-1 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] text-white transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.98] shadow-[0_0_24px_rgba(190,41,236,0.3)] disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{
                      background: "linear-gradient(90deg,#be29ec,#0000c8)",
                    }}
                  >
                    {isPending
                      ? "Gönderiliyor..."
                      : step < 3
                        ? "İlerle →"
                        : "Başvuruyu Gönder →"}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
