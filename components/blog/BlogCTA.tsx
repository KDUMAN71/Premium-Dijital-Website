import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CtaConfig } from "@/lib/blog/cta-config";

const DEFAULT: CtaConfig = {
  tag: "Sıradaki Adım",
  heading: "Bu stratejiyi işletmenize uygulayalım",
  subtext:
    "30 dakikalık ücretsiz analiz görüşmesinde bu stratejiyi markanıza nasıl uygulayabileceğimizi konuşalım.",
  buttonText: "Ücretsiz Görüşme",
  href: "/iletisim",
  midHeadline: "",
  midSub: "",
  stickyMsg: "",
  stickyMsg70: "",
};

interface BlogCTAProps {
  config?: CtaConfig;
}

export default function BlogCTA({ config = DEFAULT }: BlogCTAProps) {
  return (
    <div className="rounded-2xl p-6 border border-brand-purple/20 bg-gradient-to-br from-brand-purple/10 to-brand-blue/10">
      <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.3em] text-brand-purple/60">
        {config.tag}
      </p>

      <h4 className="text-base font-bold mb-2 text-white leading-snug">
        {config.heading}
      </h4>

      <p className="text-xs text-white/50 mb-5 leading-relaxed">
        {config.subtext}
      </p>

      <Link
        href={config.href ?? "/iletisim"}
        className="flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-xs font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90"
        style={{
          background: "linear-gradient(90deg,#be29ec,#0000c8)",
        }}
        data-cta="sidebar"
      >
        {config.buttonText}
        <ArrowRight size={14} />
      </Link>
    </div>
  );
}
