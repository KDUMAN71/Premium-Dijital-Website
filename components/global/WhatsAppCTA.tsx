"use client";

import { motion } from "framer-motion";

export default function WhatsAppCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed z-50
      right-[max(1rem,env(safe-area-inset-right))]
      bottom-[max(1rem,env(safe-area-inset-bottom))]"
    >
      <a
        href="https://wa.me/90XXXXXXXXXX"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp ile iletişime geç"
        className="
        group
        relative
        flex items-center gap-3
        rounded-full
        bg-[#25D366]
        px-5 py-3
        text-white font-bold text-sm
        shadow-[0_12px_45px_rgba(37,211,102,0.35)]
        transition-all duration-200
        hover:-translate-y-1
        active:translate-y-0
        overflow-hidden
        "
      >
        {/* Glow hover */}
        <span
          className="pointer-events-none absolute -inset-2 rounded-full
          opacity-0 blur-2xl
          bg-[radial-gradient(circle_at_center,rgba(37,211,102,0.6)_0%,transparent_60%)]
          transition-opacity duration-300 group-hover:opacity-100"
        />

        {/* Icon wrapper */}
        <span
          className="
      relative
      grid place-items-center
      w-9 h-9
      rounded-full
     bg-white/20
      border border-white/30
      animate-pulse
     "
        >
          <svg
            viewBox="0 0 32 32"
            className="w-6 h-6 text-white"
            fill="currentColor"
          >
            <path d="M16 .396C7.163.396 0 7.559 0 16.396c0 2.889.757 5.714 2.197 8.188L0 32l7.657-2.168a15.9 15.9 0 0 0 8.343 2.299c8.837 0 16-7.163 16-16S24.837.396 16 .396zm0 29.051a13.02 13.02 0 0 1-6.641-1.81l-.475-.28-4.545 1.287 1.214-4.428-.309-.455A13.013 13.013 0 0 1 2.98 16.4c0-7.18 5.84-13.02 13.02-13.02 3.48 0 6.75 1.356 9.21 3.817A12.93 12.93 0 0 1 29.02 16.4c0 7.18-5.84 13.02-13.02 13.02zm7.45-9.73c-.41-.206-2.425-1.196-2.8-1.332-.375-.137-.648-.206-.922.206-.274.41-1.059 1.332-1.299 1.607-.24.274-.479.308-.889.103-.41-.206-1.731-.638-3.296-2.036-1.217-1.085-2.04-2.426-2.28-2.836-.24-.41-.025-.631.18-.836.185-.184.41-.479.615-.718.206-.24.274-.41.41-.684.137-.274.069-.513-.034-.718-.103-.206-.922-2.221-1.263-3.041-.333-.8-.671-.692-.922-.704-.24-.01-.513-.012-.786-.012-.274 0-.718.103-1.094.513-.375.41-1.435 1.402-1.435 3.417s1.47 3.966 1.675 4.24c.206.274 2.892 4.415 7.005 6.188.978.422 1.741.674 2.335.862.98.311 1.87.267 2.574.162.785-.117 2.425-.991 2.767-1.948.343-.957.343-1.777.24-1.948-.103-.17-.375-.274-.786-.479z" />
          </svg>
        </span>

        {/* Text */}
        <span className="relative">WhatsApp</span>

        {/* Ping indicator */}
        <span className="relative flex h-2.5 w-2.5 ml-1">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-70" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
        </span>
      </a>
    </motion.div>
  );
}
