"use client";

import { useEffect, useRef, useState, useCallback } from "react";

type NodeDef = {
  id: string;
  label: string;
  x: number;
  y: number;
  desc: string;
  color: "blue" | "purple" | "teal";
};

const C = {
  blue: {
    dot: "#60a5fa",
    glow: "rgba(96,165,250,0.5)",
    pill: "rgba(59,130,246,0.15)",
    border: "rgba(96,165,250,0.4)",
    text: "#93c5fd",
  },
  purple: {
    dot: "#c084fc",
    glow: "rgba(192,132,252,0.5)",
    pill: "rgba(168,85,247,0.15)",
    border: "rgba(192,132,252,0.4)",
    text: "#d8b4fe",
  },
  teal: {
    dot: "#2dd4bf",
    glow: "rgba(45,212,191,0.5)",
    pill: "rgba(20,184,166,0.15)",
    border: "rgba(45,212,191,0.4)",
    text: "#5eead4",
  },
};

const NODES: NodeDef[] = [
  {
    id: "ssl",
    label: "SSL",
    x: 22,
    y: 18,
    desc: "Güvenli bağlantı ve tarayıcı güven sinyali",
    color: "teal",
  },
  {
    id: "sitemap",
    label: "Sitemap",
    x: 50,
    y: 12,
    desc: "İndexlenebilir URL haritası",
    color: "teal",
  },
  {
    id: "seo",
    label: "Teknik SEO",
    x: 78,
    y: 20,
    desc: "URL yapısı, canonical, heading hiyerarşisi",
    color: "purple",
  },
  {
    id: "sc",
    label: "Search Console",
    x: 14,
    y: 45,
    desc: "İndexleme durumu ve arama görünürlüğü",
    color: "blue",
  },
  {
    id: "cwv",
    label: "Core Web Vitals",
    x: 42,
    y: 40,
    desc: "LCP, CLS, INP — performans metrikleri",
    color: "purple",
  },
  {
    id: "speed",
    label: "PageSpeed",
    x: 70,
    y: 48,
    desc: "Lighthouse skoru ve hız optimizasyonu",
    color: "purple",
  },
  {
    id: "ga4",
    label: "GA4",
    x: 28,
    y: 72,
    desc: "Kullanıcı davranışı ve dönüşüm ölçümü",
    color: "blue",
  },
  {
    id: "gtm",
    label: "GTM",
    x: 55,
    y: 76,
    desc: "Event tetikleyici ve tag yönetimi",
    color: "blue",
  },
  {
    id: "conv",
    label: "Dönüşüm",
    x: 82,
    y: 68,
    desc: "Form akışı ve kullanıcı yönlendirmesi",
    color: "blue",
  },
  {
    id: "schema",
    label: "Schema",
    x: 38,
    y: 88,
    desc: "Yapısal veri ve arama motoru anlama kalitesi",
    color: "teal",
  },
  {
    id: "mobile",
    label: "Mobil",
    x: 68,
    y: 88,
    desc: "Responsive yapı ve touch optimizasyonu",
    color: "teal",
  },
];

const EDGES: [string, string][] = [
  ["ssl", "sitemap"],
  ["sitemap", "seo"],
  ["seo", "sc"],
  ["sc", "cwv"],
  ["cwv", "speed"],
  ["speed", "ga4"],
  ["ga4", "gtm"],
  ["gtm", "conv"],
  ["conv", "schema"],
  ["schema", "mobile"],
  ["cwv", "ga4"],
  ["ssl", "sc"],
  ["seo", "speed"],
];

// Browser bölgesi → node eşleşmeleri
const ZONE_MAP: Record<string, string[]> = {
  url: ["ssl", "sitemap"],
  nav: ["seo", "sc"],
  logo: ["schema"],
  hero: ["cwv", "speed", "mobile"],
  cta: ["conv", "gtm"],
  form: ["conv", "ga4", "gtm"],
};

export default function IcebergVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const alphaRef = useRef(0);
  const revealRef = useRef(false);

  const [activeZone, setActiveZone] = useState<string | null>(null);
  const [activeNodes, setActiveNodes] = useState<Set<string>>(new Set());
  const [revealed, setRevealed] = useState(false);

  const activeNodesRef = useRef<Set<string>>(new Set());
  activeNodesRef.current = activeNodes;

  const AUTO_ZONES = ["url", "nav", "cta", "form", "hero"];
  const tourIndexRef = useRef(0);
  const tourTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const userActiveRef = useRef(false);

  const applyZone = useCallback((z: string | null) => {
    setActiveZone(z);
    setActiveNodes(new Set(z ? (ZONE_MAP[z] ?? []) : []));
  }, []);

  const stopTour = useCallback(() => {
    if (tourTimerRef.current) {
      clearTimeout(tourTimerRef.current);
      tourTimerRef.current = null;
    }
  }, []);

  const startTour = useCallback(() => {
    stopTour();
    const tick = () => {
      if (userActiveRef.current) return;
      applyZone(AUTO_ZONES[tourIndexRef.current % AUTO_ZONES.length]);
      tourIndexRef.current++;
      tourTimerRef.current = setTimeout(tick, 2500);
    };
    tourTimerRef.current = setTimeout(tick, 1200);
  }, [applyZone, stopTour]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          revealRef.current = true;
          setRevealed(true);
        }
      },
      { threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!revealed) return;
    startTour();
    return () => {
      stopTour();
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, [revealed, startTour, stopTour]);

  const enterZone = useCallback(
    (z: string) => {
      userActiveRef.current = true;
      stopTour();
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
      applyZone(z);
    },
    [applyZone, stopTour],
  );

  const leaveZone = useCallback(() => {
    applyZone(null);
    resumeTimerRef.current = setTimeout(() => {
      userActiveRef.current = false;
      startTour();
    }, 3000);
  }, [applyZone, startTour]);

  /* ── Canvas ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      const p = subRef.current;
      if (!p) return;
      const r = p.getBoundingClientRect();
      const dpr = Math.min(devicePixelRatio, 2);
      canvas.width = r.width * dpr;
      canvas.height = r.height * dpr;
      canvas.style.width = r.width + "px";
      canvas.style.height = r.height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(subRef.current!);

    const draw = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const t = ts - startRef.current;
      const dpr = Math.min(devicePixelRatio, 2);
      const W = canvas.width / dpr,
        H = canvas.height / dpr;

      if (revealRef.current && alphaRef.current < 1)
        alphaRef.current = Math.min(1, alphaRef.current + 0.007);

      const a = alphaRef.current;
      ctx.clearRect(0, 0, W, H);
      if (a <= 0) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      const active = activeNodesRef.current;
      const hasActive = active.size > 0;

      // Edges
      EDGES.forEach(([aid, bid]) => {
        const na = NODES.find((n) => n.id === aid)!;
        const nb = NODES.find((n) => n.id === bid)!;
        const ax = (na.x / 100) * W,
          ay = (na.y / 100) * H;
        const bx = (nb.x / 100) * W,
          by = (nb.y / 100) * H;
        const isAct = hasActive && (active.has(aid) || active.has(bid));
        const phase =
          ((aid.charCodeAt(0) * 3 + bid.charCodeAt(0) * 7) % 100) / 100;
        const pulse =
          0.07 + Math.abs(Math.sin(t * 0.0009 + phase * Math.PI * 2)) * 0.14;
        const la = isAct ? 0.5 : pulse * a * (hasActive ? 0.25 : 1);

        const lg = ctx.createLinearGradient(ax, ay, bx, by);
        lg.addColorStop(0, `rgba(96,165,250,${la})`);
        lg.addColorStop(1, `rgba(192,132,252,${la * 0.55})`);
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.strokeStyle = lg;
        ctx.lineWidth = isAct ? 1.1 : 0.55;
        ctx.stroke();

        // Akan nokta
        const sp = isAct ? 0.00075 : 0.0003;
        const prog = (t * sp + phase) % 1;
        const px = ax + (bx - ax) * prog,
          py = ay + (by - ay) * prog;
        ctx.beginPath();
        ctx.arc(px, py, isAct ? 2.2 : 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(210,228,255,${isAct ? a * 0.85 : a * 0.5})`;
        ctx.fill();
      });

      // Nodes
      NODES.forEach((n, i) => {
        const nx = (n.x / 100) * W,
          ny = (n.y / 100) * H;
        const col = C[n.color];
        const isAct = hasActive && active.has(n.id);
        const na = Math.min(1, Math.max(0, a * 16 - i * 0.3));
        if (na <= 0) return;

        const freq = 0.0014 + i * 0.0002;
        const pulse = isAct
          ? 1
          : 0.3 + Math.abs(Math.sin(t * freq + i * 1.5)) * 0.7;
        const glowR = isAct ? 20 : 7 + pulse * 5;
        const da = hasActive ? (isAct ? na : na * 0.2) : na;

        const grd = ctx.createRadialGradient(nx, ny, 0, nx, ny, glowR);
        grd.addColorStop(
          0,
          col.glow.replace("0.5", String((isAct ? 0.6 : 0.28) * pulse * da)),
        );
        grd.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(nx, ny, glowR, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(nx, ny, isAct ? 5.5 : 3 + pulse * 0.7, 0, Math.PI * 2);
        ctx.fillStyle = col.dot;
        ctx.globalAlpha = da;
        ctx.fill();
        ctx.globalAlpha = 1;

        if (isAct) {
          const ring = 1 - ((t * 0.0022) % 1);
          ctx.beginPath();
          ctx.arc(nx, ny, 9 + ring * 9, 0, Math.PI * 2);
          ctx.strokeStyle = col.dot;
          ctx.lineWidth = 0.8;
          ctx.globalAlpha = ring * 0.35;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      });

      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  const tooltipNodes = NODES.filter((n) => activeNodes.has(n.id));

  return (
    <div
      ref={wrapRef}
      className="relative w-full overflow-hidden rounded-[1.75rem] border border-white/10"
      style={{
        background:
          "linear-gradient(180deg,rgba(0,6,28,0.98) 0%,rgba(0,2,10,0.99) 100%)",
      }}
    >
      {/* ── SU ÜSTÜ: Kompakt browser ── */}
      <div className="relative z-10 px-4 pt-0 sm:px-6">
        {/* Etiket — Görünen Yüz */}
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5">
          <span className="h-2 w-2 rounded-full bg-white/45" />
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/65">
            Görünen Yüz
          </span>
        </div>

        {/* Browser */}
        <div
          className="relative mx-auto overflow-hidden rounded-xl border border-white/10"
          style={{ background: "rgba(18,20,32,0.96)", maxWidth: 500 }}
        >
          {/* Title bar */}
          <div className="flex items-center gap-2 border-b border-white/8 bg-[rgba(12,13,22,0.9)] px-3 py-2">
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: "rgba(255,95,87,0.65)" }}
            />
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: "rgba(255,189,46,0.45)" }}
            />
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: "rgba(39,201,63,0.45)" }}
            />
            {/* URL bar */}
            <div
              className="mx-2 flex-1 cursor-default"
              onMouseEnter={() => enterZone("url")}
              onMouseLeave={leaveZone}
            >
              <div
                className="flex items-center gap-1.5 rounded-full border px-2.5 py-[3px] transition-all duration-200"
                style={{
                  background:
                    activeZone === "url"
                      ? "rgba(45,212,191,0.07)"
                      : "rgba(255,255,255,0.04)",
                  borderColor:
                    activeZone === "url"
                      ? "rgba(45,212,191,0.3)"
                      : "rgba(255,255,255,0.07)",
                }}
              >
                <svg width="7" height="8" viewBox="0 0 7 8" fill="none">
                  <rect
                    x="0.5"
                    y="3.5"
                    width="6"
                    height="4"
                    rx="1"
                    fill={
                      activeZone === "url"
                        ? "#2dd4bf"
                        : "rgba(255,255,255,0.28)"
                    }
                  />
                  <path
                    d="M2 3.5V2a1.5 1.5 0 0 1 3 0v1.5"
                    stroke={
                      activeZone === "url"
                        ? "#2dd4bf"
                        : "rgba(255,255,255,0.25)"
                    }
                    strokeWidth="0.75"
                    fill="none"
                  />
                </svg>
                <span
                  className="text-[9px] font-medium transition-colors duration-200"
                  style={{
                    color:
                      activeZone === "url"
                        ? "#5eead4"
                        : "rgba(255,255,255,0.3)",
                    letterSpacing: "0.01em",
                  }}
                >
                  premiumdijital.com
                </span>
              </div>
            </div>
          </div>

          {/* Page */}
          <div className="p-2.5">
            {/* Nav */}
            <div
              className="mb-3 flex items-center justify-between rounded px-1.5 py-1 transition-all duration-200 cursor-default"
              style={{
                background:
                  activeZone === "nav"
                    ? "rgba(96,165,250,0.05)"
                    : "transparent",
              }}
              onMouseEnter={() => enterZone("nav")}
              onMouseLeave={leaveZone}
            >
              {/* Logo */}
              <div
                className="flex items-center gap-1 cursor-default"
                onMouseEnter={(e) => {
                  e.stopPropagation();
                  enterZone("logo");
                }}
                onMouseLeave={leaveZone}
              >
                <div
                  className="flex h-4 w-4 items-center justify-center rounded transition-all duration-200"
                  style={{
                    background:
                      activeZone === "logo"
                        ? "rgba(96,165,250,0.22)"
                        : "rgba(96,165,250,0.1)",
                    border:
                      activeZone === "logo"
                        ? "1px solid rgba(96,165,250,0.45)"
                        : "1px solid rgba(96,165,250,0.18)",
                  }}
                >
                  <span className="text-[6px] font-black text-blue-300">P</span>
                </div>
                <span className="text-[8px] font-bold text-white/45">
                  Premium <span className="text-blue-400/60">Dijital</span>
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                {["Hizmetler", "Hakkımızda", "Blog"].map((l) => (
                  <span key={l} className="text-[7px] text-white/22">
                    {l}
                  </span>
                ))}
                <span className="rounded-full bg-blue-500/30 px-1.5 py-0.5 text-[7px] font-bold text-blue-200">
                  İletişim
                </span>
              </div>
            </div>

            {/* Hero */}
            <div
              className="grid grid-cols-[1fr_1.05fr] gap-2.5"
              onMouseEnter={() => enterZone("hero")}
              onMouseLeave={leaveZone}
            >
              {/* Metin */}
              <div className="space-y-1.5 py-0.5">
                <div
                  className="text-[7px] font-bold uppercase tracking-wider transition-colors duration-200"
                  style={{
                    color:
                      activeZone === "hero"
                        ? "rgba(147,197,253,0.6)"
                        : "rgba(255,255,255,0.12)",
                  }}
                >
                  Hizmetler
                </div>
                <div
                  className="h-4 w-32 rounded"
                  style={{
                    background:
                      activeZone === "hero"
                        ? "rgba(255,255,255,0.13)"
                        : "rgba(255,255,255,0.08)",
                  }}
                />
                <div
                  className="h-4 w-24 rounded"
                  style={{
                    background:
                      activeZone === "hero"
                        ? "rgba(96,165,250,0.2)"
                        : "rgba(96,165,250,0.12)",
                  }}
                />
                <div className="pt-0.5">
                  <div className="h-1.5 w-40 rounded bg-white/5" />
                </div>
                {/* CTAs */}
                <div
                  className="flex gap-1.5 pt-1.5"
                  onMouseEnter={(e) => {
                    e.stopPropagation();
                    enterZone("cta");
                  }}
                  onMouseLeave={leaveZone}
                >
                  <div
                    className="flex items-center rounded-full px-2.5 py-1 transition-all duration-200"
                    style={{
                      background:
                        activeZone === "cta"
                          ? "rgba(59,130,246,0.8)"
                          : "rgba(59,130,246,0.5)",
                      boxShadow:
                        activeZone === "cta"
                          ? "0 0 10px rgba(59,130,246,0.45)"
                          : "none",
                    }}
                  >
                    <span className="text-[7px] font-bold text-white whitespace-nowrap">
                      Analiz Başlat →
                    </span>
                  </div>
                  <div className="flex items-center rounded-full border border-white/10 bg-white/4 px-2 py-1">
                    <span className="text-[7px] text-white/35 whitespace-nowrap">
                      Tüm Hizmetler
                    </span>
                  </div>
                </div>
              </div>

              {/* Görsel kutu */}
              <div
                className="relative overflow-hidden rounded-lg border transition-all duration-200 cursor-default"
                style={{
                  minHeight: 66,
                  borderColor:
                    activeZone === "hero"
                      ? "rgba(192,132,252,0.25)"
                      : "rgba(255,255,255,0.06)",
                  background:
                    activeZone === "hero"
                      ? "radial-gradient(ellipse at 60% 40%,rgba(192,132,252,0.1),rgba(255,255,255,0.015))"
                      : "rgba(255,255,255,0.02)",
                }}
                onMouseEnter={(e) => {
                  e.stopPropagation();
                  enterZone("hero");
                }}
                onMouseLeave={leaveZone}
              >
                <div className="p-2 space-y-1">
                  <div className="h-1.5 w-16 rounded bg-white/7" />
                  <div className="grid grid-cols-2 gap-1">
                    <div className="h-6 rounded bg-white/4 border border-white/5" />
                    <div className="space-y-1">
                      <div className="h-[10px] rounded bg-white/4 border border-white/5" />
                      <div className="h-[10px] rounded bg-white/4 border border-white/5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div
              className="mt-2 rounded-lg border px-2.5 py-2 transition-all duration-200 cursor-default"
              style={{
                borderColor:
                  activeZone === "form"
                    ? "rgba(96,165,250,0.28)"
                    : "rgba(255,255,255,0.06)",
                background:
                  activeZone === "form"
                    ? "rgba(59,130,246,0.05)"
                    : "rgba(255,255,255,0.015)",
              }}
              onMouseEnter={() => enterZone("form")}
              onMouseLeave={leaveZone}
            >
              <div className="flex items-center gap-1.5">
                <div className="h-4 flex-1 rounded bg-white/5 border border-white/7" />
                <div className="h-4 flex-1 rounded bg-white/5 border border-white/7" />
                <div
                  className="h-4 w-14 rounded-full transition-all duration-200"
                  style={{
                    background:
                      activeZone === "form"
                        ? "rgba(59,130,246,0.7)"
                        : "rgba(59,130,246,0.38)",
                  }}
                />
              </div>
              {activeZone === "form" && (
                <p className="mt-1 text-[6.5px] text-blue-300/50 text-center tracking-wider">
                  form submit → GA4 + GTM event
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── SLOGAN ── */}
      <div className="relative z-10 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <p className="text-center text-[11px] font-semibold italic tracking-wide text-white/35">
            Sorun çoğu zaman tasarım değildir.{" "}
            <span className="text-brand-blue/70 not-italic font-bold">
              Altyapıdır.
            </span>
          </p>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
      </div>

      {/* ── SU ÇİZGİSİ ── */}
      <div className="relative z-20" style={{ height: 36, marginTop: -1 }}>
        <svg
          viewBox="0 0 1000 36"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          <defs>
            <linearGradient id="wg3" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(96,165,250,0.18)" />
              <stop offset="100%" stopColor="rgba(96,165,250,0.01)" />
            </linearGradient>
          </defs>
          <path
            d="M0,12 C200,2 350,22 500,12 C650,2 800,22 1000,12 L1000,36 L0,36 Z"
            fill="url(#wg3)"
            opacity="0.9"
          />
          <path
            d="M0,17 C250,7 450,27 700,17 C850,11 950,23 1000,17 L1000,36 L0,36 Z"
            fill="rgba(96,165,250,0.04)"
          />
          <line
            x1="0"
            y1="14"
            x2="1000"
            y2="14"
            stroke="rgba(147,197,253,0.14)"
            strokeWidth="0.6"
            strokeDasharray="6 12"
          />
        </svg>
        <div className="absolute right-4 top-1 flex items-center gap-1">
          <div
            className="h-px w-4"
            style={{ background: "rgba(147,197,253,0.22)" }}
          />
          <span className="text-[7px] font-bold uppercase tracking-[0.2em] text-blue-200/28">
            Su Yüzeyi
          </span>
        </div>
      </div>

      {/* ── SU ALTI ── */}
      <div
        ref={subRef}
        className="relative"
        style={{
          height: 180,
          background:
            "linear-gradient(180deg,rgba(0,10,36,0.75) 0%,rgba(0,2,10,0.97) 100%)",
        }}
      >
        {/* Etiket — Görünmeyen Sistem */}
        <div
          className="absolute left-4 top-3 z-30 inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-500/10 px-3.5 py-1.5"
          style={{ boxShadow: "0 0 16px rgba(96,165,250,0.12)" }}
        >
          <span
            className="h-2 w-2 rounded-full bg-blue-400"
            style={{ boxShadow: "0 0 6px rgba(96,165,250,0.9)" }}
          />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-200/75">
            Görünmeyen Sistem
          </span>
        </div>

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none"
        />

        {/* Node badge'leri */}
        <div className="relative z-20 h-full">
          {NODES.map((n, i) => {
            const col = C[n.color];
            const isAct = activeNodes.has(n.id);
            const hasAct = activeNodes.size > 0;
            return (
              <div
                key={n.id}
                className="absolute"
                style={{
                  left: `${n.x}%`,
                  top: `${n.y}%`,
                  transform: "translate(-50%,-50%)",
                  opacity: revealed ? (hasAct ? (isAct ? 1 : 0.15) : 1) : 0,
                  transition: `opacity 0.4s ease ${i * 45}ms`,
                  scale: isAct ? "1.12" : "1",
                  zIndex: isAct ? 10 : 1,
                }}
              >
                <div
                  className="select-none whitespace-nowrap rounded-full px-1.5 py-[3px] text-[8px] font-bold"
                  style={{
                    background: isAct
                      ? col.pill.replace("0.15", "0.3")
                      : col.pill,
                    border: `0.5px solid ${isAct ? col.border : col.border.replace("0.4", "0.18")}`,
                    color: col.text,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    boxShadow: isAct ? `0 0 14px ${col.glow}` : "none",
                    transition: "all 0.22s ease",
                  }}
                >
                  {n.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Tooltip — sağ alt sabit */}
        {tooltipNodes.length > 0 && (
          <div
            className="pointer-events-none absolute right-3 bottom-3 z-40 rounded-xl border border-white/8 p-2.5 backdrop-blur-xl"
            style={{
              background: "rgba(2,4,16,0.97)",
              maxWidth: 200,
              boxShadow: `0 4px 20px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(255,255,255,0.06)`,
            }}
          >
            {tooltipNodes.map((n, i) => {
              const col = C[n.color];
              return (
                <div
                  key={n.id}
                  className={
                    i > 0 ? "mt-1.5 border-t border-white/5 pt-1.5" : ""
                  }
                >
                  <div className="flex items-center gap-1.5">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{
                        background: col.dot,
                        boxShadow: `0 0 4px ${col.glow}`,
                      }}
                    />
                    <span
                      className="text-[10px] font-bold text-white/80"
                      style={{ letterSpacing: "0.06em" }}
                    >
                      {n.label}
                    </span>
                  </div>
                  <p className="mt-0.5 pl-3 text-[8.5px] leading-snug text-white/38">
                    {n.desc}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* Hint */}
        {!activeZone && !revealed && (
          <div className="absolute inset-0 z-30 flex items-center justify-center">
            <span className="text-[8px] uppercase tracking-[0.2em] text-white/15">
              sayfanın üzerine gelin
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
