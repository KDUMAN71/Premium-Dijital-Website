import Link from "next/link";
import {
  BarChart3,
  MousePointerClick,
  LineChart,
  ScanSearch,
} from "lucide-react";

type TrustItem = {
  label: string;
  href?: string;
  icon: React.ReactNode;
};

export default function ServiceHeroTrustStrip({
  items,
}: {
  items: TrustItem[];
}) {
  return (
    <div className="mt-10 flex flex-wrap gap-3">
      {items.map((item) => {
        const content = (
          <>
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-brand-blue transition-all duration-300">
              {item.icon}
            </span>
            <span className="text-xs font-medium text-white/75">
              {item.label}
            </span>
          </>
        );

        return item.href ? (
          <Link
            key={item.label}
            href={item.href}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-blue/25 hover:bg-white/[0.08] hover:shadow-[0_0_20px_rgba(0,0,200,0.12)]"
          >
            {content}
          </Link>
        ) : (
          <div
            key={item.label}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 backdrop-blur-xl"
          >
            {content}
          </div>
        );
      })}
    </div>
  );
}
