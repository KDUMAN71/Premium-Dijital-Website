"use client";

import { motion } from "framer-motion";

export default function WhatsAppCTAGlass() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="fixed z-50
                 right-[max(1rem,env(safe-area-inset-right))]
                 bottom-[max(1rem,env(safe-area-inset-bottom))]"
    >
      <a
        href="https://wa.me/905425658010?text=Merhaba%20Premium%20Dijital,%20web%20sitenizden%20ulaşıyorum."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp ile iletişime geç"
        className="
          group relative overflow-hidden
          flex items-center gap-3
          rounded-full
          px-4 py-3 sm:px-5
          max-w-[calc(100vw-2rem)]
          whitespace-nowrap
          border border-white/15
          bg-white/10
          backdrop-blur-xl
          text-white
          shadow-[0_10px_40px_rgba(0,0,0,0.28)]
          transition-all duration-300
          hover:-translate-y-1
          hover:border-[#25D366]/40
          hover:bg-white/12
        "
      >
        {/* soft green ambient */}
        <span
          className="
            pointer-events-none absolute inset-0 opacity-70
            bg-[radial-gradient(circle_at_20%_50%,rgba(37,211,102,0.18),transparent_45%)]
          "
        />

        {/* top sheen */}
        <span
          className="
            pointer-events-none absolute inset-0
            bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(255,255,255,0.03)_35%,transparent_100%)]
          "
        />

        {/* hover glow */}
        <span
          className="
            pointer-events-none absolute -inset-3 rounded-full
            opacity-0 blur-2xl transition-opacity duration-300
            bg-[radial-gradient(circle_at_center,rgba(37,211,102,0.22)_0%,transparent_65%)]
            group-hover:opacity-100
          "
        />

        {/* icon capsule */}
        <span
          className="
            relative grid place-items-center
            h-10 w-10 rounded-full
            border border-white/15
            bg-[#25D366]/18
            backdrop-blur-md
            animate-pulse
            shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]
            group-hover:scale-110
            transition-transform duration-300
          "
        >
          <svg
            viewBox="0 0 32 32"
            className="h-5 w-5 text-white"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M16 .396C7.163.396 0 7.559 0 16.396c0 2.889.757 5.714 2.197 8.188L0 32l7.657-2.168a15.9 15.9 0 0 0 8.343 2.299c8.837 0 16-7.163 16-16S24.837.396 16 .396zm0 29.051a13.02 13.02 0 0 1-6.641-1.81l-.475-.28-4.545 1.287 1.214-4.428-.309-.455A13.013 13.013 0 0 1 2.98 16.4c0-7.18 5.84-13.02 13.02-13.02 3.48 0 6.75 1.356 9.21 3.817A12.93 12.93 0 0 1 29.02 16.4c0 7.18-5.84 13.02-13.02 13.02zm7.45-9.73c-.41-.206-2.425-1.196-2.8-1.332-.375-.137-.648-.206-.922.206-.274.41-1.059 1.332-1.299 1.607-.24.274-.479.308-.889.103-.41-.206-1.731-.638-3.296-2.036-1.217-1.085-2.04-2.426-2.28-2.836-.24-.41-.025-.631.18-.836.185-.184.41-.479.615-.718.206-.24.274-.41.41-.684.137-.274.069-.513-.034-.718-.103-.206-.922-2.221-1.263-3.041-.333-.8-.671-.692-.922-.704-.24-.01-.513-.012-.786-.012-.274 0-.718.103-1.094.513-.375.41-1.435 1.402-1.435 3.417s1.47 3.966 1.675 4.24c.206.274 2.892 4.415 7.005 6.188.978.422 1.741.674 2.335.862.98.311 1.87.267 2.574.162.785-.117 2.425-.991 2.767-1.948.343-.957.343-1.777.24-1.948-.103-.17-.375-.274-.786-.479z" />
          </svg>
        </span>

        {/* text */}
        <span className="relative text-sm font-semibold tracking-[0.02em] text-white/95 group-hover:text-white transition-colors">
          WhatsApp
        </span>

        {/* small live dot */}
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75 animate-ping" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#25D366]" />
        </span>
      </a>
    </motion.div>
  );
}
