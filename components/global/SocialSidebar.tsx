import type { CSSProperties } from "react";

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com",
    border: "#0A66C2",
    glow: "rgba(10,102,194,0.45)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M20.447 20.452H16.89V14.86c0-1.334-.024-3.053-1.86-3.053-1.86 0-2.144 1.452-2.144 2.956v5.689H9.33V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.604 0 4.268 2.37 4.268 5.455v6.286zM5.337 7.433a2.063 2.063 0 1 1 0-4.126 2.063 2.063 0 0 1 0 4.126zM7.119 20.452H3.554V9h3.565v11.452z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com",
    border: "#E1306C",
    glow: "rgba(225,48,108,0.45)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M7.75 2h8.5C19.99 2 22 4.01 22 7.75v8.5C22 19.99 19.99 22 16.25 22h-8.5C4.01 22 2 19.99 2 16.25v-8.5C2 4.01 4.01 2 7.75 2zm0 2C5.678 4 4 5.678 4 7.75v8.5C4 18.322 5.678 20 7.75 20h8.5c2.072 0 3.75-1.678 3.75-3.75v-8.5C20 5.678 18.322 4 16.25 4h-8.5zm4.25 3a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6zm5.25-.88a1.12 1.12 0 110 2.24 1.12 1.12 0 010-2.24z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com",
    border: "#1877F2",
    glow: "rgba(24,119,242,0.45)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M22 12a10 10 0 10-11.63 9.87v-6.99H7.9V12h2.47V9.79c0-2.43 1.45-3.77 3.66-3.77 1.06 0 2.17.19 2.17.19v2.39h-1.22c-1.2 0-1.58.74-1.58 1.5V12h2.69l-.43 2.88h-2.26v6.99A10 10 0 0022 12z" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com",
    border: "#ffffff",
    glow: "rgba(255,255,255,0.35)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.847h-7.406l-5.8-7.584-6.63 7.584H.48l8.6-9.83L0 1.153h7.594l5.243 6.93L18.9 1.153zm-1.29 19.54h2.04L6.486 3.25H4.3l13.31 17.443z" />
      </svg>
    ),
  },
];

export default function SocialSidebar() {
  return (
    <aside
      className="fixed left-6 top-1/2 z-50 hidden -translate-y-1/2 md:flex flex-col gap-4"
      aria-label="Sosyal bağlantılar"
    >
      {socials.map((item) => (
        <a
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.label}
          style={
            {
              ["--glow" as string]: item.glow,
              ["--border" as string]: item.border,
            } as CSSProperties
          }
          className="group relative flex items-center"
        >
          {/* icon card */}
          <span
            className="
              relative z-10 flex h-12 w-12 items-center justify-center
              rounded-xl border border-white/10
              bg-white/5 backdrop-blur-xl
              shadow-2xl
              transition-all duration-300
              group-hover:scale-110
              group-hover:border-[var(--border)]
              group-hover:shadow-[0_0_25px_var(--glow)]
            "
          >
            <span className="text-white/80 transition duration-300 group-hover:text-[var(--border)]">
              {item.icon}
            </span>
          </span>

          {/* reveal label */}
          <span
            className="
              pointer-events-none absolute left-14 top-1/2 -translate-y-1/2
              overflow-hidden whitespace-nowrap
              rounded-xl border border-white/10
              bg-black/50 backdrop-blur-xl
              px-0 py-0
              text-sm font-medium text-white/85
              opacity-0 shadow-[0_10px_30px_rgba(0,0,0,0.28)]
              transition-all duration-300
              max-w-0
              group-hover:max-w-[11rem]
              group-hover:px-4
              group-hover:py-3
              group-hover:opacity-100
              group-hover:border-[var(--border)]
              group-hover:shadow-[0_0_25px_var(--glow)]
            "
          >
            {item.label}
          </span>
        </a>
      ))}
    </aside>
  );
}
