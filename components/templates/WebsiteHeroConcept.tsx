"use client";

import { motion } from "framer-motion";
import {
  Activity,
  GitBranch,
  Gauge,
  LayoutPanelTop,
  LineChart,
  Search,
  Workflow,
} from "lucide-react";

const layers = [
  {
    label: "SEO",
    x: "68%",
    y: "22%",
    icon: <Search className="h-3.5 w-3.5" strokeWidth={1.7} />,
  },
  {
    label: "Performans",
    x: "80%",
    y: "38%",
    icon: <Gauge className="h-3.5 w-3.5" strokeWidth={1.7} />,
  },
  {
    label: "Ölçümleme",
    x: "74%",
    y: "60%",
    icon: <LineChart className="h-3.5 w-3.5" strokeWidth={1.7} />,
  },
  {
    label: "Dönüşüm",
    x: "56%",
    y: "72%",
    icon: <Workflow className="h-3.5 w-3.5" strokeWidth={1.7} />,
  },
  {
    label: "Yapı",
    x: "42%",
    y: "58%",
    icon: <GitBranch className="h-3.5 w-3.5" strokeWidth={1.7} />,
  },
  {
    label: "Kullanıcı Akışı",
    x: "46%",
    y: "30%",
    icon: <Activity className="h-3.5 w-3.5" strokeWidth={1.7} />,
  },
];

export default function WebsiteHeroConcept() {
  return (
    <div className="relative h-full min-h-[420px] w-full md:min-h-[520px] lg:min-h-[620px]">
      {/* atmosfer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_42%,rgba(0,0,200,0.11)_0%,transparent_36%)]" />
      <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:56px_56px]" />

      {/* büyük glow */}
      <div className="absolute right-[4%] top-1/2 hidden h-[40rem] w-[40rem] -translate-y-1/2 lg:block xl:right-[6%] xl:h-[46rem] xl:w-[46rem]">
        <div className="absolute inset-0 rounded-full bg-brand-blue/10 blur-[160px]" />

        {/* dış halkalar */}
        <div className="absolute inset-[2%] rounded-full border border-white/[0.05]" />
        <div className="absolute inset-[14%] rounded-full border border-white/[0.04]" />
        <div className="absolute inset-[26%] rounded-full border border-white/[0.035]" />
        <div className="absolute inset-[38%] rounded-full border border-white/[0.03]" />

        {/* dikey eksen */}
        <div className="absolute left-1/2 top-[8%] h-[84%] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/[0.05] to-transparent" />

        {/* yatay eksen */}
        <div className="absolute left-[8%] top-1/2 h-px w-[84%] -translate-y-1/2 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />

        {/* üstte görünen arayüz */}
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.21, 1, 0.36, 1] }}
          className="absolute left-[22%] top-[12%] z-20 w-[48%]"
        >
          <div className="rounded-[1.75rem] border border-white/10 bg-black/40 p-4 backdrop-blur-xl">
            <div className="rounded-[1.4rem] border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-brand-blue/70" />
              </div>

              <div className="mt-4">
                <div className="h-7 w-36 rounded-lg border border-white/10 bg-white/5" />
                <div className="mt-3 h-3 w-4/5 rounded-full bg-white/10" />
                <div className="mt-2 h-3 w-3/5 rounded-full bg-white/10" />
              </div>

              <div className="mt-5 grid grid-cols-[1.15fr_0.85fr] gap-3">
                <div className="h-28 rounded-2xl border border-white/10 bg-white/5" />
                <div className="grid gap-3">
                  <div className="h-[52px] rounded-xl border border-white/10 bg-white/5" />
                  <div className="h-[52px] rounded-xl border border-white/10 bg-white/5" />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <div className="h-10 w-32 rounded-full border border-brand-blue/30 bg-brand-blue/10" />
                <div className="h-10 w-24 rounded-full border border-white/10 bg-white/5" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* arayüzden altyapıya bağlanan ışık çizgisi */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.8 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="absolute left-[46%] top-[34%] z-10 h-[34%] w-px origin-top bg-gradient-to-b from-brand-blue/60 via-brand-blue/30 to-transparent"
        />

        {/* merkez */}
        <div className="absolute left-1/2 top-[58%] z-20 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-blue/80 shadow-[0_0_20px_rgba(0,80,255,0.45)]" />
        <div className="absolute left-1/2 top-[58%] z-10 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-blue/20 bg-brand-blue/5" />

        {/* altyapı node'ları */}
        {layers.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.15 + index * 0.08,
              ease: [0.21, 1, 0.36, 1],
            }}
            className="absolute z-30"
            style={{
              left: item.x,
              top: item.y,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="group relative">
              <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-blue/15 blur-xl" />
              <div className="relative flex items-center gap-2 rounded-full border border-brand-blue/20 bg-black/65 px-3 py-2 backdrop-blur-xl shadow-[0_0_24px_rgba(0,80,255,0.10)]">
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-white/5 text-brand-blue">
                  {item.icon}
                </span>
                <span className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.16em] text-white/80">
                  {item.label}
                </span>
              </div>
            </div>
          </motion.div>
        ))}

        {/* alt açıklama etiketi */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="absolute bottom-[10%] left-[12%] rounded-xl border border-white/10 bg-black/35 px-4 py-3 backdrop-blur-xl"
        >
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-white/45">
            <span className="h-2 w-2 rounded-full bg-brand-blue shadow-[0_0_10px_rgba(0,80,255,0.4)]" />
            Görünen yüzün altında çalışan sistem
          </div>
        </motion.div>
      </div>

      {/* mobile / tablet */}
      <div className="absolute inset-0 lg:hidden">
        <div className="absolute right-[-18%] top-1/2 h-[20rem] w-[20rem] -translate-y-1/2 md:right-[-8%] md:h-[28rem] md:w-[28rem]">
          <div className="absolute inset-0 rounded-full bg-brand-blue/10 blur-[90px]" />
          <div className="absolute inset-[6%] rounded-full border border-white/[0.05]" />
          <div className="absolute inset-[22%] rounded-full border border-white/[0.04]" />
          <div className="absolute inset-[38%] rounded-full border border-white/[0.03]" />

          <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-blue/80 shadow-[0_0_16px_rgba(0,80,255,0.35)]" />

          <div className="absolute left-[18%] top-[18%] z-20 w-[48%] rounded-2xl border border-white/10 bg-black/35 p-3 backdrop-blur-xl">
            <div className="rounded-xl border border-white/10 bg-white/5 p-3">
              <div className="h-4 w-20 rounded bg-white/10" />
              <div className="mt-2 h-2 w-3/4 rounded bg-white/10" />
              <div className="mt-3 grid grid-cols-2 gap-2">
                <div className="h-12 rounded-lg border border-white/10 bg-white/5" />
                <div className="h-12 rounded-lg border border-white/10 bg-white/5" />
              </div>
            </div>
          </div>

          <div className="absolute bottom-[18%] left-[14%] rounded-full border border-white/10 bg-black/45 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/60 backdrop-blur-xl">
            SEO • Hız • Ölçümleme
          </div>
        </div>
      </div>
    </div>
  );
}
