"use client";

import { useRef, useEffect } from "react";

/* ─── Sabit renkler ──────────────────────────────────── */
const C = {
  dark: "#07101e",
  navy: "#0a1628",
  cyan: "#0ea5e9",
  cyanD: "#06b6d4",
  purple: "#BE29EC",
  blue: "#0000C8",
  green: "#22c55e",
  amber: "#fbbf24",
  card: "rgba(10,16,32,0.96)",
};

export default function WebHeroVisual() {
  const svgRef = useRef<SVGSVGElement>(null);

  /* Hover efekti — kartlar hafifçe parlasın */
  useEffect(() => {
    const cards = svgRef.current?.querySelectorAll("[data-card]");
    cards?.forEach((card) => {
      const rect = card.querySelector("rect");
      const origStroke = rect?.getAttribute("stroke") ?? "";
      card.addEventListener("mouseenter", () => {
        rect?.setAttribute("stroke-opacity", "0.7");
        rect?.setAttribute("stroke-width", "1.2");
      });
      card.addEventListener("mouseleave", () => {
        rect?.setAttribute("stroke-opacity", "0.32");
        rect?.setAttribute("stroke-width", "0.8");
        if (origStroke) rect?.setAttribute("stroke", origStroke);
      });
    });
  }, []);

  return (
    <div
      className="relative w-full select-none"
      style={{ aspectRatio: "16/9" }}
    >
      <svg
        ref={svgRef}
        viewBox="0 0 920 520"
        className="w-full h-full"
        aria-hidden="true"
      >
        <defs>
          {/* Ambient */}
          <radialGradient id="h-gp" cx="20%" cy="50%" r="55%">
            <stop offset="0%" stopColor={C.purple} stopOpacity="0.12" />
            <stop offset="100%" stopColor={C.purple} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="h-gc" cx="80%" cy="50%" r="55%">
            <stop offset="0%" stopColor={C.cyan} stopOpacity="0.1" />
            <stop offset="100%" stopColor={C.cyan} stopOpacity="0" />
          </radialGradient>

          {/* MediCare gradients */}
          <linearGradient id="h-hero" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0d1b3e" />
            <stop offset="100%" stopColor="#091428" />
          </linearGradient>
          <linearGradient id="h-cyan" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={C.cyan} />
            <stop offset="100%" stopColor={C.cyanD} />
          </linearGradient>
          <linearGradient id="h-brand" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={C.purple} />
            <stop offset="100%" stopColor={C.blue} />
          </linearGradient>
          <linearGradient id="h-bar1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={C.purple} />
            <stop offset="100%" stopColor={C.blue} />
          </linearGradient>

          {/* Screen clip */}
          <clipPath id="h-sc">
            <rect x="32" y="34" width="358" height="432" rx="2" />
          </clipPath>
        </defs>

        {/* Ambient glows */}
        <ellipse cx="210" cy="260" rx="250" ry="200" fill="url(#h-gp)" />
        <ellipse cx="710" cy="260" rx="250" ry="200" fill="url(#h-gc)" />

        {/* ═══════════════════════════════════
            BROWSER MOCKUP — sol, 390px geniş
        ═══════════════════════════════════ */}
        <rect
          x="24"
          y="16"
          width="374"
          height="472"
          rx="14"
          fill={C.navy}
          stroke="rgba(14,165,233,0.22)"
          strokeWidth="0.8"
        />

        {/* Chrome bar */}
        <rect x="24" y="16" width="374" height="34" rx="14" fill="#0d1628" />
        <rect x="24" y="36" width="374" height="14" fill="#0d1628" />

        {/* Traffic lights */}
        <circle cx="44" cy="33" r="5" fill="#ff5f57" fillOpacity="0.85" />
        <circle cx="60" cy="33" r="5" fill="#febc2e" fillOpacity="0.85" />
        <circle cx="76" cy="33" r="5" fill="#28c840" fillOpacity="0.85" />

        {/* URL bar */}
        <rect
          x="96"
          y="24"
          width="220"
          height="18"
          rx="9"
          fill="rgba(255,255,255,0.05)"
          stroke="rgba(14,165,233,0.2)"
          strokeWidth="0.5"
        />
        <text
          x="108"
          y="36"
          fill="rgba(14,165,233,0.5)"
          fontSize="8"
          fontFamily="sans-serif"
        >
          🔒
        </text>
        <text
          x="120"
          y="36.5"
          fill="rgba(255,255,255,0.3)"
          fontSize="8"
          fontFamily="monospace"
        >
          medicare-klinik.com
        </text>

        {/* ── SCREEN CONTENT ── */}
        <g clipPath="url(#h-sc)">
          {/* Page bg */}
          <rect x="32" y="34" width="358" height="432" fill={C.dark} />

          {/* NAV */}
          <rect x="32" y="34" width="358" height="30" fill="#0a1628" />
          <rect
            x="32"
            y="63"
            width="358"
            height="0.5"
            fill="rgba(14,165,233,0.18)"
          />

          {/* Logo */}
          <rect
            x="42"
            y="41"
            width="18"
            height="18"
            rx="5"
            fill="rgba(14,165,233,0.18)"
            stroke="rgba(14,165,233,0.35)"
            strokeWidth="0.5"
          />
          <text
            x="51"
            y="53"
            textAnchor="middle"
            fill={C.cyan}
            fontSize="10"
            fontFamily="sans-serif"
          >
            ✦
          </text>
          <text
            x="66"
            y="50"
            fill="white"
            fontSize="8.5"
            fontFamily="sans-serif"
            fontWeight="800"
          >
            MediCare
          </text>
          <text
            x="66"
            y="60"
            fill="rgba(14,165,233,0.55)"
            fontSize="5.5"
            fontFamily="sans-serif"
            fontWeight="600"
            letterSpacing="0.5"
          >
            ESTETİK KLİNİK
          </text>

          {/* Nav links */}
          {["Tedaviler", "Doktorlar", "Sağlık Turizmi", "İletişim"].map(
            (l, i) => (
              <text
                key={l}
                x={168 + i * 46}
                y="53"
                fill="rgba(255,255,255,0.32)"
                fontSize="7"
                fontFamily="sans-serif"
              >
                {l}
              </text>
            ),
          )}

          {/* Randevu CTA */}
          <rect
            x="338"
            y="40"
            width="44"
            height="16"
            rx="8"
            fill="url(#h-cyan)"
          />
          <text
            x="360"
            y="51"
            textAnchor="middle"
            fill="white"
            fontSize="6.5"
            fontFamily="sans-serif"
            fontWeight="800"
          >
            RANDEVU
          </text>

          {/* HERO SECTION */}
          <rect x="32" y="64" width="358" height="150" fill="url(#h-hero)" />

          {/* Grid lines */}
          {[0, 1, 2, 3].map((i) => (
            <line
              key={i}
              x1="32"
              y1={84 + i * 32}
              x2="390"
              y2={84 + i * 32}
              stroke="rgba(14,165,233,0.04)"
              strokeWidth="0.5"
            />
          ))}

          {/* Badges */}
          <rect
            x="44"
            y="72"
            width="80"
            height="13"
            rx="6.5"
            fill="rgba(14,165,233,0.1)"
            stroke="rgba(14,165,233,0.28)"
            strokeWidth="0.4"
          />
          <text
            x="50"
            y="82"
            fill={C.amber}
            fontSize="8"
            fontFamily="sans-serif"
          >
            ★
          </text>
          <text
            x="60"
            y="82"
            fill="rgba(255,255,255,0.55)"
            fontSize="6.5"
            fontFamily="sans-serif"
          >
            4.9 · 2.400+ Hasta
          </text>

          <rect
            x="132"
            y="72"
            width="56"
            height="13"
            rx="6.5"
            fill="rgba(34,197,94,0.1)"
            stroke="rgba(34,197,94,0.28)"
            strokeWidth="0.4"
          />
          <text
            x="138"
            y="81.5"
            fill={C.green}
            fontSize="7"
            fontFamily="sans-serif"
          >
            ✓
          </text>
          <text
            x="146"
            y="82"
            fill="rgba(255,255,255,0.45)"
            fontSize="6.5"
            fontFamily="sans-serif"
          >
            JCI Akredite
          </text>

          {/* Pulse badge */}
          <rect
            x="196"
            y="72"
            width="82"
            height="13"
            rx="6.5"
            fill="rgba(14,165,233,0.08)"
            stroke="rgba(14,165,233,0.22)"
            strokeWidth="0.4"
          />
          <circle cx="204" cy="78.5" r="3.5" fill={C.cyan}>
            <animate
              attributeName="opacity"
              values="1;0.3;1"
              dur="1.8s"
              repeatCount="indefinite"
            />
          </circle>
          <text
            x="210"
            y="82"
            fill="rgba(14,165,233,0.75)"
            fontSize="6.5"
            fontFamily="sans-serif"
          >
            Bugün müsait slot var
          </text>

          {/* Heading */}
          <text
            x="44"
            y="103"
            fill="rgba(255,255,255,0.9)"
            fontSize="15"
            fontFamily="sans-serif"
            fontWeight="800"
          >
            Sağlıkta
          </text>
          <text
            x="44"
            y="120"
            fill={C.cyan}
            fontSize="15"
            fontFamily="sans-serif"
            fontWeight="800"
          >
            Güven &amp; Uzmanlık
          </text>

          {/* Doctor avatar */}
          <circle
            cx="336"
            cy="145"
            r="44"
            fill="rgba(14,165,233,0.08)"
            stroke="rgba(14,165,233,0.1)"
            strokeWidth="0.5"
          />
          <circle cx="336" cy="131" r="16" fill="rgba(14,165,233,0.3)" />
          <ellipse
            cx="336"
            cy="163"
            rx="24"
            ry="17"
            fill="rgba(14,165,233,0.25)"
          />
          <ellipse
            cx="336"
            cy="158"
            rx="20"
            ry="12"
            fill="rgba(14,165,233,0.15)"
          />
          <circle cx="360" cy="162" r="5" fill={C.dark} />
          <circle cx="360" cy="162" r="4" fill={C.green}>
            <animate
              attributeName="opacity"
              values="1;0.5;1"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>

          {/* CTAs */}
          <rect
            x="44"
            y="136"
            width="88"
            height="20"
            rx="10"
            fill="url(#h-cyan)"
          />
          <text
            x="88"
            y="149.5"
            textAnchor="middle"
            fill="white"
            fontSize="8"
            fontFamily="sans-serif"
            fontWeight="800"
          >
            Ücretsiz Danışma
          </text>

          <rect
            x="140"
            y="136"
            width="78"
            height="20"
            rx="10"
            fill="rgba(255,255,255,0.06)"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="0.5"
          />
          <text
            x="179"
            y="149.5"
            textAnchor="middle"
            fill="rgba(255,255,255,0.65)"
            fontSize="8"
            fontFamily="sans-serif"
          >
            Tedaviler →
          </text>

          {/* WhatsApp */}
          <text
            x="44"
            y="170"
            fill="rgba(34,197,94,0.65)"
            fontSize="7.5"
            fontFamily="sans-serif"
          >
            💬
          </text>
          <text
            x="56"
            y="170"
            fill="rgba(255,255,255,0.28)"
            fontSize="7"
            fontFamily="sans-serif"
          >
            WhatsApp ile hızlı iletişim
          </text>

          {/* TEDAVİ ALANLARI */}
          <rect x="32" y="214" width="358" height="100" fill="#0b1525" />
          <rect
            x="32"
            y="214"
            width="358"
            height="0.6"
            fill="rgba(14,165,233,0.14)"
          />

          <text
            x="44"
            y="229"
            fill="rgba(14,165,233,0.65)"
            fontSize="7.5"
            fontFamily="sans-serif"
            fontWeight="700"
            letterSpacing="1.2"
          >
            TEDAVİ ALANLARIMIZ
          </text>

          {/* 2×4 grid */}
          {[
            { icon: "🦷", label: "Diş Estetiği" },
            { icon: "✦", label: "Estetik" },
            { icon: "👁", label: "Göz" },
            { icon: "❤", label: "Kardiyoloji" },
            { icon: "🦴", label: "Ortopedi" },
            { icon: "✚", label: "Onkoloji" },
            { icon: "⚕", label: "Dahiliye" },
            { icon: "⚔", label: "Cerrahi" },
          ].map((t, i) => {
            const col = i % 4;
            const row = Math.floor(i / 4);
            const x = 40 + col * 86;
            const y = 235 + row * 36;
            return (
              <g key={t.label}>
                <rect
                  x={x}
                  y={y}
                  width="80"
                  height="30"
                  rx="6"
                  fill="rgba(255,255,255,0.04)"
                  stroke="rgba(14,165,233,0.12)"
                  strokeWidth="0.4"
                />
                <text
                  x={x + 40}
                  y={y + 13}
                  textAnchor="middle"
                  fill="rgba(14,165,233,0.7)"
                  fontSize="9"
                  fontFamily="sans-serif"
                >
                  {t.icon}
                </text>
                <text
                  x={x + 40}
                  y={y + 24}
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.45)"
                  fontSize="7"
                  fontFamily="sans-serif"
                >
                  {t.label}
                </text>
              </g>
            );
          })}

          {/* HASTA YORUMLARI */}
          <rect x="32" y="314" width="358" height="66" fill={C.dark} />
          <rect
            x="32"
            y="314"
            width="358"
            height="0.5"
            fill="rgba(14,165,233,0.1)"
          />

          <text
            x="44"
            y="328"
            fill="rgba(14,165,233,0.6)"
            fontSize="7.5"
            fontFamily="sans-serif"
            fontWeight="700"
            letterSpacing="1"
          >
            HASTA YORUMLARI
          </text>
          <text
            x="44"
            y="342"
            fill={C.amber}
            fontSize="11"
            fontFamily="sans-serif"
          >
            ★★★★★
          </text>
          <text
            x="110"
            y="342"
            fill="rgba(255,255,255,0.3)"
            fontSize="7"
            fontFamily="sans-serif"
          >
            840+ doğrulanmış yorum · Google
          </text>

          {/* Review cards */}
          {[
            {
              x: 44,
              t1: '"Randevu süreci çok kolaydı,',
              t2: 'online ödeme mükemmeldi..."',
            },
            {
              x: 216,
              t1: '"Doktor çok ilgilendi, WhatsApp',
              t2: 'takibi harikaydı..."',
            },
          ].map((r, i) => (
            <g key={i}>
              <rect
                x={r.x}
                y={350}
                width="160"
                height="26"
                rx="6"
                fill="rgba(255,255,255,0.03)"
                stroke="rgba(14,165,233,0.1)"
                strokeWidth="0.4"
              />
              <text
                x={r.x + 8}
                y={361}
                fill="rgba(255,255,255,0.4)"
                fontSize="6.5"
                fontFamily="sans-serif"
              >
                {r.t1}
              </text>
              <text
                x={r.x + 8}
                y={369}
                fill="rgba(255,255,255,0.4)"
                fontSize="6.5"
                fontFamily="sans-serif"
              >
                {r.t2}
              </text>
              <text
                x={r.x + 8}
                y={373.5}
                fill={C.amber}
                fontSize="6"
                fontFamily="sans-serif"
              >
                ★★★★★
              </text>
            </g>
          ))}

          {/* FOOTER */}
          <rect x="32" y="380" width="358" height="86" fill="#060e1a" />
          <rect
            x="32"
            y="380"
            width="358"
            height="0.5"
            fill="rgba(14,165,233,0.1)"
          />

          {/* Avatar stack */}
          {[C.cyan, C.cyanD, "#0284c7"].map((c, i) => (
            <circle
              key={i}
              cx={50 + i * 16}
              cy="400"
              r="12"
              fill={c}
              fillOpacity="0.65"
              stroke="#060e1a"
              strokeWidth="2"
            />
          ))}
          <circle
            cx="98"
            cy="400"
            r="12"
            fill="rgba(255,255,255,0.07)"
            stroke="#060e1a"
            strokeWidth="2"
          />
          <text
            x="98"
            y="404"
            textAnchor="middle"
            fill="rgba(255,255,255,0.45)"
            fontSize="7"
            fontFamily="sans-serif"
          >
            +9K
          </text>

          <text
            x="118"
            y="396"
            fill="rgba(255,255,255,0.25)"
            fontSize="6.5"
            fontFamily="sans-serif"
          >
            Tedavi edilen hasta
          </text>
          <text
            x="118"
            y="407"
            fill={C.amber}
            fontSize="10"
            fontFamily="sans-serif"
          >
            ★★★★★
          </text>
          <text
            x="172"
            y="407"
            fill="rgba(255,255,255,0.35)"
            fontSize="7.5"
            fontFamily="sans-serif"
          >
            4.9
          </text>

          <rect
            x="32"
            y="416"
            width="358"
            height="0.4"
            fill="rgba(255,255,255,0.05)"
          />

          {/* Social pills */}
          <text
            x="44"
            y="428"
            fill="rgba(255,255,255,0.18)"
            fontSize="6.5"
            fontFamily="sans-serif"
          >
            Sosyal medya entegrasyonları:
          </text>
          {[
            { label: "Instagram", x: 44 },
            { label: "Facebook", x: 120 },
            { label: "YouTube", x: 192 },
            { label: "LinkedIn", x: 258 },
          ].map((s) => (
            <g key={s.label}>
              <rect
                x={s.x}
                y={432}
                width={s.label.length * 6 + 12}
                height="12"
                rx="6"
                fill="rgba(14,165,233,0.07)"
                stroke="rgba(14,165,233,0.18)"
                strokeWidth="0.4"
              />
              <text
                x={s.x + (s.label.length * 6 + 12) / 2}
                y={440.5}
                textAnchor="middle"
                fill="rgba(14,165,233,0.5)"
                fontSize="6"
                fontFamily="sans-serif"
              >
                {s.label}
              </text>
            </g>
          ))}

          <text
            x="44"
            y="456"
            fill="rgba(255,255,255,0.15)"
            fontSize="6.5"
            fontFamily="sans-serif"
          >
            📅 Google Takvim · 🔔 SMS hatırlatma · 💊 Hasta portalı
          </text>

          <rect
            x="32"
            y="462"
            width="358"
            height="4"
            fill="rgba(14,165,233,0.07)"
          />
          <text
            x="211"
            y="466"
            textAnchor="middle"
            fill="rgba(14,165,233,0.28)"
            fontSize="6"
            fontFamily="sans-serif"
          >
            premiumdijital.com tarafından tasarlanmıştır ✦
          </text>
        </g>

        {/* Screen border */}
        <rect
          x="32"
          y="34"
          width="358"
          height="432"
          rx="2"
          fill="none"
          stroke="rgba(14,165,233,0.07)"
          strokeWidth="0.5"
        />

        {/* Randevu pulse */}
        <circle
          cx="360"
          cy="48"
          r="6"
          fill="none"
          stroke={C.cyan}
          strokeWidth="0.8"
        >
          <animate
            attributeName="r"
            values="6;16;6"
            dur="3s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.5;0;0.5"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>

        {/* ═══════════════════════════════════
            2×2 FEATURE CARD GRID — sağ
            Her kart: 230×220px
            Sol: x=430, Sağ: x=676
            Üst: y=20, Alt: y=264
        ═══════════════════════════════════ */}

        {/* ── KART 1: Tasarım & Kimlik ── üst sol */}
        <g data-card="1" style={{ cursor: "default" }}>
          <rect
            x="430"
            y="20"
            width="230"
            height="220"
            rx="16"
            fill={C.card}
            stroke="rgba(190,41,236,0.32)"
            strokeWidth="0.8"
            strokeOpacity="0.32"
          />
          {/* Header band */}
          <rect
            x="430"
            y="20"
            width="230"
            height="52"
            rx="16"
            fill="rgba(190,41,236,0.1)"
          />
          <rect
            x="430"
            y="52"
            width="230"
            height="20"
            fill="rgba(190,41,236,0.1)"
          />

          {/* Icon + title */}
          <circle
            cx="454"
            cy="46"
            r="13"
            fill="rgba(190,41,236,0.2)"
            stroke="rgba(190,41,236,0.35)"
            strokeWidth="0.6"
          />
          <text
            x="454"
            y="50.5"
            textAnchor="middle"
            fill={C.purple}
            fontSize="13"
            fontFamily="sans-serif"
          >
            ✦
          </text>
          <text
            x="474"
            y="40"
            fill="rgba(255,255,255,0.8)"
            fontSize="13"
            fontFamily="sans-serif"
            fontWeight="700"
          >
            Tasarım
          </text>
          <text
            x="474"
            y="56"
            fill="rgba(255,255,255,0.55)"
            fontSize="11"
            fontFamily="sans-serif"
          >
            &amp; Kimlik
          </text>

          {/* Big number */}
          <text
            x="448"
            y="110"
            fill={C.purple}
            fontSize="42"
            fontFamily="sans-serif"
            fontWeight="800"
          >
            %100
          </text>

          {/* Label */}
          <text
            x="448"
            y="128"
            fill="rgba(255,255,255,0.4)"
            fontSize="11"
            fontFamily="sans-serif"
          >
            Kurumsal kimliğe uyum
          </text>

          {/* Progress bar */}
          <rect
            x="448"
            y="140"
            width="194"
            height="5"
            rx="2.5"
            fill="rgba(255,255,255,0.07)"
          />
          <rect
            x="448"
            y="140"
            width="194"
            height="5"
            rx="2.5"
            fill="url(#h-bar1)"
          />

          {/* Feature list */}
          {[
            "Renk & tipografi sistemi",
            "Görsel dil & UI kiti",
            "Her cihazda tutarlı deneyim",
            "Marka kılavuzuna tam uyum",
          ].map((f, i) => (
            <g key={f}>
              <circle
                cx="452"
                cy={161 + i * 16}
                r="2.5"
                fill={C.purple}
                fillOpacity="0.7"
              />
              <text
                x="460"
                y={165 + i * 16}
                fill="rgba(255,255,255,0.45)"
                fontSize="11"
                fontFamily="sans-serif"
              >
                {f}
              </text>
            </g>
          ))}
        </g>

        {/* ── KART 2: Fonksiyonellik ── üst sağ */}
        <g data-card="2" style={{ cursor: "default" }}>
          <rect
            x="676"
            y="20"
            width="230"
            height="220"
            rx="16"
            fill={C.card}
            stroke="rgba(14,165,233,0.32)"
            strokeWidth="0.8"
            strokeOpacity="0.32"
          />
          <rect
            x="676"
            y="20"
            width="230"
            height="52"
            rx="16"
            fill="rgba(14,165,233,0.09)"
          />
          <rect
            x="676"
            y="52"
            width="230"
            height="20"
            fill="rgba(14,165,233,0.09)"
          />

          <circle
            cx="700"
            cy="46"
            r="13"
            fill="rgba(14,165,233,0.18)"
            stroke="rgba(14,165,233,0.32)"
            strokeWidth="0.6"
          />
          <text
            x="700"
            y="51"
            textAnchor="middle"
            fill={C.cyan}
            fontSize="13"
            fontFamily="sans-serif"
          >
            📅
          </text>
          <text
            x="720"
            y="40"
            fill="rgba(255,255,255,0.8)"
            fontSize="13"
            fontFamily="sans-serif"
            fontWeight="700"
          >
            Fonksiyonellik
          </text>
          <text
            x="720"
            y="56"
            fill="rgba(255,255,255,0.55)"
            fontSize="11"
            fontFamily="sans-serif"
          >
            Aylık 340+ randevu
          </text>

          <text
            x="694"
            y="110"
            fill={C.cyan}
            fontSize="42"
            fontFamily="sans-serif"
            fontWeight="800"
          >
            340+
          </text>
          <text
            x="694"
            y="128"
            fill="rgba(255,255,255,0.4)"
            fontSize="11"
            fontFamily="sans-serif"
          >
            Aylık online randevu
          </text>

          {[
            "Online randevu otomasyonu",
            "WhatsApp + SMS entegrasyon",
            "Sosyal medya bağlantısı",
            "Google Takvim · Hasta portalı",
          ].map((f, i) => (
            <g key={f}>
              <circle
                cx="698"
                cy={149 + i * 16}
                r="2.5"
                fill={C.cyan}
                fillOpacity="0.65"
              />
              <text
                x="706"
                y={153 + i * 16}
                fill="rgba(255,255,255,0.45)"
                fontSize="11"
                fontFamily="sans-serif"
              >
                {f}
              </text>
            </g>
          ))}
        </g>

        {/* ── KART 3: Performans ── alt sol */}
        <g data-card="3" style={{ cursor: "default" }}>
          <rect
            x="430"
            y="256"
            width="230"
            height="220"
            rx="16"
            fill={C.card}
            stroke="rgba(6,182,212,0.28)"
            strokeWidth="0.8"
            strokeOpacity="0.28"
          />
          <rect
            x="430"
            y="256"
            width="230"
            height="52"
            rx="16"
            fill="rgba(6,182,212,0.08)"
          />
          <rect
            x="430"
            y="288"
            width="230"
            height="20"
            fill="rgba(6,182,212,0.08)"
          />

          <circle
            cx="454"
            cy="282"
            r="13"
            fill="rgba(6,182,212,0.15)"
            stroke="rgba(6,182,212,0.28)"
            strokeWidth="0.6"
          />
          <text
            x="454"
            y="287"
            textAnchor="middle"
            fill={C.cyanD}
            fontSize="13"
            fontFamily="sans-serif"
          >
            ⚡
          </text>
          <text
            x="474"
            y="276"
            fill="rgba(255,255,255,0.8)"
            fontSize="13"
            fontFamily="sans-serif"
            fontWeight="700"
          >
            Performans
          </text>
          <text
            x="474"
            y="292"
            fill="rgba(255,255,255,0.55)"
            fontSize="11"
            fontFamily="sans-serif"
          >
            PageSpeed Mobile
          </text>

          <text
            x="448"
            y="346"
            fill={C.cyanD}
            fontSize="42"
            fontFamily="sans-serif"
            fontWeight="800"
          >
            98
          </text>
          <text
            x="448"
            y="364"
            fill="rgba(255,255,255,0.4)"
            fontSize="11"
            fontFamily="sans-serif"
          >
            Core Web Vitals · Lighthouse
          </text>

          {/* Metric cards */}
          {[
            { l: "LCP", v: "0.8s" },
            { l: "CLS", v: "0.02" },
            { l: "FID", v: "12ms" },
          ].map((m, i) => (
            <g key={m.l}>
              <rect
                x={448 + i * 68}
                y="374"
                width="60"
                height="40"
                rx="8"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(6,182,212,0.12)"
                strokeWidth="0.5"
              />
              <text
                x={448 + i * 68 + 30}
                y="391"
                textAnchor="middle"
                fill="rgba(255,255,255,0.3)"
                fontSize="9"
                fontFamily="sans-serif"
              >
                {m.l}
              </text>
              <text
                x={448 + i * 68 + 30}
                y="407"
                textAnchor="middle"
                fill={C.green}
                fontSize="11"
                fontFamily="sans-serif"
                fontWeight="700"
              >
                {m.v}
              </text>
            </g>
          ))}

          <text
            x="448"
            y="425"
            fill="rgba(255,255,255,0.25)"
            fontSize="10"
            fontFamily="sans-serif"
          >
            LCP · CLS · FID · TTFB standartları
          </text>
          <text
            x="448"
            y="438"
            fill="rgba(255,255,255,0.18)"
            fontSize="10"
            fontFamily="sans-serif"
          >
            Mobil öncelikli geliştirme
          </text>
          <text
            x="448"
            y="468"
            fill="rgba(6,182,212,0.45)"
            fontSize="10"
            fontFamily="sans-serif"
            fontWeight="600"
          >
            ▲ Geçen aya göre +4 puan
          </text>
        </g>

        {/* ── KART 4: Büyüme & Dönüşüm ── alt sağ */}
        <g data-card="4" style={{ cursor: "default" }}>
          <rect
            x="676"
            y="256"
            width="230"
            height="220"
            rx="16"
            fill={C.card}
            stroke="rgba(99,102,241,0.26)"
            strokeWidth="0.8"
            strokeOpacity="0.26"
          />
          <rect
            x="676"
            y="256"
            width="230"
            height="52"
            rx="16"
            fill="rgba(99,102,241,0.07)"
          />
          <rect
            x="676"
            y="288"
            width="230"
            height="20"
            fill="rgba(99,102,241,0.07)"
          />

          <circle
            cx="700"
            cy="282"
            r="13"
            fill="rgba(99,102,241,0.14)"
            stroke="rgba(99,102,241,0.26)"
            strokeWidth="0.6"
          />
          <text
            x="700"
            y="287"
            textAnchor="middle"
            fill="#818cf8"
            fontSize="13"
            fontFamily="sans-serif"
          >
            📈
          </text>
          <text
            x="720"
            y="276"
            fill="rgba(255,255,255,0.8)"
            fontSize="13"
            fontFamily="sans-serif"
            fontWeight="700"
          >
            Büyüme
          </text>
          <text
            x="720"
            y="292"
            fill="rgba(255,255,255,0.55)"
            fontSize="11"
            fontFamily="sans-serif"
          >
            &amp; Dönüşüm
          </text>

          <text
            x="694"
            y="346"
            fill="#818cf8"
            fontSize="42"
            fontFamily="sans-serif"
            fontWeight="800"
          >
            +240%
          </text>
          <text
            x="694"
            y="364"
            fill="rgba(255,255,255,0.4)"
            fontSize="11"
            fontFamily="sans-serif"
          >
            90 günde organik trafik artışı
          </text>

          {/* Sparkline */}
          <polyline
            points="694,418 710,412 726,415 742,406 758,399 774,391 790,384 806,377 822,371 838,365 854,360 870,355 886,350 900,346"
            fill="none"
            stroke="url(#h-brand)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Conversion stat */}
          <rect
            x="694"
            y="428"
            width="194"
            height="34"
            rx="8"
            fill="rgba(255,255,255,0.03)"
            stroke="rgba(99,102,241,0.12)"
            strokeWidth="0.5"
          />
          <text
            x="791"
            y="441"
            textAnchor="middle"
            fill="rgba(255,255,255,0.3)"
            fontSize="10"
            fontFamily="sans-serif"
          >
            Dönüşüm oranı
          </text>
          <text
            x="720"
            y="457"
            fill="rgba(255,255,255,0.35)"
            fontSize="11"
            fontFamily="sans-serif"
          >
            %2.3
          </text>
          <text
            x="748"
            y="456"
            fill="rgba(99,102,241,0.6)"
            fontSize="16"
            fontFamily="sans-serif"
          >
            →
          </text>
          <text
            x="764"
            y="457"
            fill="#818cf8"
            fontSize="13"
            fontFamily="sans-serif"
            fontWeight="700"
          >
            %11.8
          </text>

          <text
            x="694"
            y="478"
            fill="rgba(255,255,255,0.22)"
            fontSize="10"
            fontFamily="sans-serif"
          >
            Organik · Dönüşüm · Hasta edinimi
          </text>
        </g>

        {/* Connector lines browser → kartlar */}
        <line
          x1="392"
          y1="130"
          x2="428"
          y2="130"
          stroke="rgba(190,41,236,0.18)"
          strokeWidth="0.6"
          strokeDasharray="4 3"
        />
        <line
          x1="392"
          y1="290"
          x2="428"
          y2="290"
          stroke="rgba(14,165,233,0.18)"
          strokeWidth="0.6"
          strokeDasharray="4 3"
        />
      </svg>
    </div>
  );
}
