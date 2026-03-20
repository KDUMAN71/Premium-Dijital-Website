"use client";

import { useState, useEffect } from "react";
import { Twitter, Linkedin, Link2, Check } from "lucide-react";

const BASE_URL = "https://premiumdijital.com";

interface ShareButtonsProps {
  title: string;
  slug: string;
}

export default function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  // Hydration uyumsuzluğunu önlemek için URL'yi mount sonrası hesapla
  const [pageUrl, setPageUrl] = useState(`${BASE_URL}/blog/${slug}`);

  useEffect(() => {
    setPageUrl(`${window.location.origin}/blog/${slug}`);
  }, [slug]);

  const encoded = encodeURIComponent(pageUrl);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback — tarayıcı izin vermedi
    }
  };

  const buttons = [
    {
      label: "Twitter/X",
      icon: <Twitter size={14} />,
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encoded}`,
    },
    {
      label: "LinkedIn",
      icon: <Linkedin size={14} />,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`,
    },
  ];

  return (
    <div className="rounded-2xl border border-white/6 bg-white/[0.02] p-6">
      <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-white/25">
        Paylaş
      </p>

      <div className="flex flex-col gap-2">
        {buttons.map((btn) => (
          <a
            key={btn.label}
            href={btn.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-2.5 text-xs text-white/50 transition-all hover:border-white/10 hover:text-white"
          >
            {btn.icon}
            {btn.label}
          </a>
        ))}

        <button
          onClick={handleCopy}
          className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-2.5 text-xs text-white/50 transition-all hover:border-white/10 hover:text-white text-left"
        >
          {copied ? (
            <>
              <Check size={14} className="text-green-400" />
              <span className="text-green-400">Kopyalandı</span>
            </>
          ) : (
            <>
              <Link2 size={14} />
              Bağlantıyı Kopyala
            </>
          )}
        </button>
      </div>
    </div>
  );
}
