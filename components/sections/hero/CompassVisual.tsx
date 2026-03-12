"use client";

import { useEffect, useRef, useCallback } from "react";

type Mode = "kaos" | "calm";

const TAGS = [
  "Google Ads",
  "Meta Ads",
  "SEO",
  "GA4",
  "GTM",
  "CRO",
  "PageSpeed",
  "Search Console",
  "Core Web Vitals",
  "Analytics",
];

const CALM_POS = TAGS.map((_, i) => ({
  a: -Math.PI / 2 + ((Math.PI * 2) / TAGS.length) * i,
  r: 72 + Math.sin(i * 0.8) * 22,
}));

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
function lerpA(a: number, b: number, t: number) {
  let d = b - a;
  while (d > Math.PI) d -= Math.PI * 2;
  while (d < -Math.PI) d += Math.PI * 2;
  return a + d * t;
}

export default function CompassVisual() {
  const ccRef = useRef<HTMLCanvasElement>(null);
  const tcRef = useRef<HTMLCanvasElement>(null);
  const needleRef = useRef<SVGGElement>(null);
  const stxtRef = useRef<HTMLSpanElement>(null);
  const bkRef = useRef<HTMLButtonElement>(null);
  const bcRef = useRef<HTMLButtonElement>(null);

  const modeRef = useRef<Mode>("kaos");
  const calmProgressRef = useRef(0);
  const loopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number>(0);

  const particlesRef = useRef(
    TAGS.map((label, i) => ({
      label,
      a: (i / TAGS.length) * Math.PI * 2,
      r: 65 + (i % 3) * 17,
      va: (Math.random() - 0.5) * 0.02,
      alpha: 0.5 + Math.random() * 0.4,
    })),
  );

  const applyUI = useCallback((m: Mode) => {
    const bk = bkRef.current,
      bc = bcRef.current,
      stxt = stxtRef.current;
    if (!bk || !bc) return;
    if (m === "kaos") {
      bk.dataset.active = "true";
      bk.dataset.calm = "";
      bc.dataset.active = "";
      bc.dataset.calm = "";
      if (stxt) {
        stxt.dataset.mode = "kaos";
        stxt.textContent = "Dijital karmaşada yönünüzü kaybettiniz mi?";
      }
    } else {
      bk.dataset.active = "";
      bk.dataset.calm = "";
      bc.dataset.active = "true";
      bc.dataset.calm = "true";
      if (stxt) {
        stxt.dataset.mode = "calm";
        stxt.textContent = "Biz devreye girince — her şey yerine oturur.";
      }
    }
  }, []);

  const goKaos = useCallback(() => {
    modeRef.current = "kaos";
    calmProgressRef.current = 0;
    applyUI("kaos");
    const needle = needleRef.current;
    if (needle) needle.style.transition = "none";
    particlesRef.current.forEach((p, i) => {
      p.a = (i / TAGS.length) * Math.PI * 2;
      p.r = 65 + (i % 3) * 17;
      p.va = (Math.random() - 0.5) * 0.02;
    });
  }, [applyUI]);

  const goCalm = useCallback(() => {
    modeRef.current = "calm";
    calmProgressRef.current = 0;
    applyUI("calm");
    const needle = needleRef.current;
    if (needle) {
      needle.style.transition = "transform 1.8s cubic-bezier(0.34,1.56,0.64,1)";
      needle.style.transform = "rotate(0deg)";
    }
    setTimeout(() => {
      if (modeRef.current === "calm" && stxtRef.current)
        stxtRef.current.textContent = "Yönünüz net. Büyüme başlıyor.";
    }, 2200);
  }, [applyUI]);

  const scheduleLoop = useCallback(() => {
    if (loopTimerRef.current) clearTimeout(loopTimerRef.current);
    loopTimerRef.current = setTimeout(() => {
      goCalm();
      loopTimerRef.current = setTimeout(() => {
        goKaos();
        scheduleLoop();
      }, 5000);
    }, 2500);
  }, [goKaos, goCalm]);

  const manualKaos = useCallback(() => {
    if (loopTimerRef.current) clearTimeout(loopTimerRef.current);
    goKaos();
    scheduleLoop();
  }, [goKaos, scheduleLoop]);

  const manualCalm = useCallback(() => {
    if (loopTimerRef.current) clearTimeout(loopTimerRef.current);
    goCalm();
    loopTimerRef.current = setTimeout(() => {
      goKaos();
      scheduleLoop();
    }, 5000);
  }, [goCalm, goKaos, scheduleLoop]);

  useEffect(() => {
    const cc = ccRef.current,
      tc = tcRef.current;
    if (!cc || !tc) return;
    const ctx = cc.getContext("2d")!;
    const tctx = tc.getContext("2d")!;
    const CX = 160,
      CY = 160;

    function drawChaos() {
      ctx.clearRect(0, 0, 320, 320);
      if (modeRef.current !== "kaos") return;
      ctx.save();
      ctx.beginPath();
      ctx.arc(CX, CY, 154, 0, Math.PI * 2);
      ctx.clip();
      for (let i = 0; i < 5; i++) {
        const a = Math.random() * Math.PI * 2,
          r = 35 + Math.random() * 90;
        ctx.beginPath();
        ctx.moveTo(CX + Math.cos(a) * r, CY + Math.sin(a) * r);
        ctx.lineTo(
          CX + Math.cos(a + 0.6) * r * 0.5,
          CY + Math.sin(a + 0.6) * r * 0.5,
        );
        ctx.strokeStyle = `rgba(0,0,200,${0.03 + Math.random() * 0.07})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
      ctx.restore();
    }

    function drawTags() {
      tctx.clearRect(0, 0, 320, 320);
      tctx.save();
      tctx.beginPath();
      tctx.arc(CX, CY, 154, 0, Math.PI * 2);
      tctx.clip();
      const t = Date.now() * 0.001;
      particlesRef.current.forEach((p, i) => {
        let x: number, y: number, alpha: number;
        if (modeRef.current === "kaos") {
          p.a += p.va;
          alpha = 0.3 + Math.abs(Math.sin(t * 1.8 + i * 0.7)) * 0.55;
          x = CX + Math.cos(p.a) * p.r;
          y = CY + Math.sin(p.a) * p.r;
        } else {
          const cp = CALM_POS[i],
            prog = calmProgressRef.current;
          x = CX + Math.cos(lerpA(p.a, cp.a, prog)) * lerp(p.r, cp.r, prog);
          y = CY + Math.sin(lerpA(p.a, cp.a, prog)) * lerp(p.r, cp.r, prog);
          alpha = lerp(p.alpha, 0.92, prog);
        }
        tctx.font = "500 10px system-ui";
        tctx.textAlign = "center";
        tctx.textBaseline = "middle";
        if (modeRef.current === "calm" && calmProgressRef.current > 0.25) {
          const pw = tctx.measureText(p.label).width + 14,
            ph = 17;
          tctx.fillStyle = `rgba(190,41,236,${alpha * 0.18})`;
          tctx.beginPath();
          tctx.roundRect(x - pw / 2, y - ph / 2, pw, ph, 4);
          tctx.fill();
          tctx.strokeStyle = `rgba(190,41,236,${alpha * 0.45})`;
          tctx.lineWidth = 0.5;
          tctx.stroke();
          tctx.fillStyle = `rgba(220,170,255,${alpha})`;
        } else {
          tctx.fillStyle = `rgba(190,41,236,${alpha})`;
        }
        tctx.fillText(p.label, x, y);
      });
      tctx.restore();
    }

    function animate() {
      const t = Date.now() * 0.001;
      const needle = needleRef.current;
      if (modeRef.current === "kaos") {
        const w =
          Math.sin(t * 3.1) * 42 +
          Math.sin(t * 5.7) * 28 +
          Math.sin(t * 2.3) * 18;
        if (needle) {
          needle.style.transition = "none";
          needle.style.transform = `rotate(${w}deg)`;
        }
        drawChaos();
      } else {
        if (calmProgressRef.current < 1)
          calmProgressRef.current = Math.min(
            1,
            calmProgressRef.current + 0.011,
          );
      }
      drawTags();
      rafRef.current = requestAnimationFrame(animate);
    }

    applyUI("kaos");
    rafRef.current = requestAnimationFrame(animate);
    scheduleLoop();

    return () => {
      cancelAnimationFrame(rafRef.current);
      if (loopTimerRef.current) clearTimeout(loopTimerRef.current);
    };
  }, [applyUI, scheduleLoop]);

  return (
    <>
      <style>{`
        .cv-btn {
          position: relative; overflow: hidden;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 100px;
          padding: 8px 22px;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(255,255,255,0.35); cursor: pointer;
          transition: color 0.3s, border-color 0.3s, background 0.3s;
        }
        .cv-btn[data-active="true"] {
          background: rgba(190,41,236,0.1);
          border-color: rgba(190,41,236,0.45);
          color: rgba(190,41,236,1);
          animation: cv-gp 1.8s ease-in-out infinite;
        }
        .cv-btn[data-active="true"][data-calm="true"] {
          background: rgba(0,0,200,0.1);
          border-color: rgba(100,100,255,0.45);
          color: rgba(180,195,255,1);
          animation: cv-gb 1.8s ease-in-out infinite;
        }
        .cv-stxt {
          font-size: 13px; letter-spacing: 0.06em;
          transition: color 0.6s, text-shadow 0.6s;
          color: rgba(255,255,255,0.28);
        }
        .cv-stxt[data-mode="kaos"] { color: rgba(190,41,236,0.9); text-shadow: 0 0 14px rgba(190,41,236,0.4); }
        .cv-stxt[data-mode="calm"] { color: rgba(200,215,255,0.9); text-shadow: 0 0 14px rgba(100,130,255,0.4); }
        @keyframes cv-gp { 0%,100%{box-shadow:0 0 6px rgba(190,41,236,0.15)} 50%{box-shadow:0 0 20px rgba(190,41,236,0.45)} }
        @keyframes cv-gb { 0%,100%{box-shadow:0 0 6px rgba(0,0,200,0.15)}    50%{box-shadow:0 0 20px rgba(0,0,200,0.45)} }
        .cv-r1 { animation: cv-s28  28s linear infinite; }
        .cv-r2 { animation: cv-s18r 18s linear infinite; }
        @keyframes cv-s28  { from{transform-origin:160px 160px;transform:rotate(0deg)}   to{transform-origin:160px 160px;transform:rotate(360deg)} }
        @keyframes cv-s18r { from{transform-origin:160px 160px;transform:rotate(0deg)}   to{transform-origin:160px 160px;transform:rotate(-360deg)} }
      `}</style>

      <div className="flex flex-col items-center">
        {/* Pusula — responsive boyut */}
        <div className="relative w-[min(420px,90vw)] aspect-square">
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 320 320"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient id="cv-glow2" cx="50%" cy="38%" r="50%">
                <stop offset="0%" stopColor="#be29ec" stopOpacity="0.13" />
                <stop offset="50%" stopColor="#0000c8" stopOpacity="0.07" />
                <stop offset="100%" stopColor="#000" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="cv-amb2" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#be29ec" stopOpacity="0.07" />
                <stop offset="40%" stopColor="#0000c8" stopOpacity="0.04" />
                <stop offset="100%" stopColor="#000" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="cv-nN2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#be29ec" />
                <stop offset="100%" stopColor="rgba(190,41,236,0.4)" />
              </linearGradient>
              <linearGradient id="cv-nS2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(255,255,255,0.25)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.04)" />
              </linearGradient>
            </defs>
            <circle cx="160" cy="160" r="159" fill="url(#cv-amb2)" />
            <g className="cv-r1">
              <circle
                cx="160"
                cy="160"
                r="158"
                fill="none"
                stroke="rgba(190,41,236,0.15)"
                strokeWidth="0.8"
              />
              <line
                x1="160"
                y1="2"
                x2="160"
                y2="14"
                stroke="rgba(190,41,236,0.3)"
                strokeWidth="1"
              />
              <line
                x1="318"
                y1="160"
                x2="306"
                y2="160"
                stroke="rgba(190,41,236,0.2)"
                strokeWidth="0.8"
              />
              <line
                x1="160"
                y1="318"
                x2="160"
                y2="306"
                stroke="rgba(190,41,236,0.2)"
                strokeWidth="0.8"
              />
              <line
                x1="2"
                y1="160"
                x2="14"
                y2="160"
                stroke="rgba(190,41,236,0.2)"
                strokeWidth="0.8"
              />
            </g>
            <g className="cv-r2">
              <circle
                cx="160"
                cy="160"
                r="138"
                fill="none"
                stroke="rgba(0,0,200,0.12)"
                strokeWidth="0.6"
                strokeDasharray="4 8"
              />
            </g>
            <circle
              cx="160"
              cy="160"
              r="115"
              fill="rgba(8,8,18,0.97)"
              stroke="rgba(255,255,255,0.07)"
              strokeWidth="0.8"
            />
            <circle cx="160" cy="160" r="115" fill="url(#cv-glow2)" />
            <text
              x="160"
              y="54"
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fontFamily="system-ui"
              fill="rgba(190,41,236,0.85)"
              letterSpacing="2"
            >
              K
            </text>
            <text
              x="160"
              y="278"
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fontFamily="system-ui"
              fill="rgba(255,255,255,0.3)"
              letterSpacing="2"
            >
              G
            </text>
            <text
              x="268"
              y="164"
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fontFamily="system-ui"
              fill="rgba(255,255,255,0.3)"
              letterSpacing="2"
            >
              D
            </text>
            <text
              x="52"
              y="164"
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fontFamily="system-ui"
              fill="rgba(255,255,255,0.3)"
              letterSpacing="2"
            >
              B
            </text>
            <g
              ref={needleRef}
              style={{
                transformOrigin: "160px 160px",
                transform: "rotate(0deg)",
              }}
            >
              <polygon points="160,85 155,160 165,160" fill="url(#cv-nN2)" />
              <polygon points="155,160 165,160 160,235" fill="url(#cv-nS2)" />
            </g>
            <circle cx="160" cy="160" r="7" fill="url(#cv-nN2)" />
            <circle cx="160" cy="160" r="3.5" fill="#fff" opacity="0.9" />
          </svg>
          <canvas
            ref={ccRef}
            width={320}
            height={320}
            className="absolute inset-0 w-full h-full z-[2] pointer-events-none"
          />
          <canvas
            ref={tcRef}
            width={320}
            height={320}
            className="absolute inset-0 w-full h-full z-[8] pointer-events-none"
          />
        </div>

        {/* Durum metni */}
        <div className="mt-4 flex items-center gap-2">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-purple animate-pulse" />
          <span ref={stxtRef} className="cv-stxt" data-mode="kaos">
            Dijital karmaşada yönünüzü mü kaybettiniz?
          </span>
        </div>

        {/* Mod butonları */}
        <div className="mt-4 flex gap-3">
          <button ref={bkRef} className="cv-btn" onClick={manualKaos}>
            Kaos
          </button>
          <button ref={bcRef} className="cv-btn" onClick={manualCalm}>
            Kalibre
          </button>
        </div>
      </div>
    </>
  );
}
