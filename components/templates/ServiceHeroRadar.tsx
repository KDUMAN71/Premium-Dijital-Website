"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  BadgeDollarSign,
  Crosshair,
  DollarSign,
  MousePointerClick,
  TrendingUp,
  UserRound,
  Zap,
} from "lucide-react";

type RadarNode = {
  id: string;
  label: string;
  x: number;
  y: number;
  icon: React.ReactNode;
};

const NODES: RadarNode[] = [
  {
    id: "intent",
    label: "Satın Alma Niyeti",
    x: 60,
    y: 20,
    icon: <Crosshair className="h-3.5 w-3.5" strokeWidth={1.7} />,
  },
  {
    id: "lead",
    label: "Nitelikli Lead",
    x: 76,
    y: 30,
    icon: <UserRound className="h-3.5 w-3.5" strokeWidth={1.7} />,
  },
  {
    id: "traffic",
    label: "Sıcak Trafik",
    x: 80,
    y: 52,
    icon: <Zap className="h-3.5 w-3.5" strokeWidth={1.7} />,
  },
  {
    id: "high-value",
    label: "₺ Yüksek Değer",
    x: 66,
    y: 72,
    icon: <BadgeDollarSign className="h-3.5 w-3.5" strokeWidth={1.7} />,
  },
  {
    id: "global-demand",
    label: "$ Global Talep",
    x: 48,
    y: 66,
    icon: <DollarSign className="h-3.5 w-3.5" strokeWidth={1.7} />,
  },
  {
    id: "roi",
    label: "ROI Fırsatı",
    x: 40,
    y: 46,
    icon: <TrendingUp className="h-3.5 w-3.5" strokeWidth={1.7} />,
  },
  {
    id: "cpa",
    label: "CPA Düşüşü",
    x: 46,
    y: 22,
    icon: <ArrowDown className="h-3.5 w-3.5" strokeWidth={1.7} />,
  },
  {
    id: "conversion",
    label: "Dönüşüm Sinyali",
    x: 68,
    y: 46,
    icon: <MousePointerClick className="h-3.5 w-3.5" strokeWidth={1.7} />,
  },
];

const SWEEP_DURATION = 10;

function angleFromCenter(x: number, y: number) {
  const dx = x - 50;
  const dy = y - 50;
  let deg = (Math.atan2(dy, dx) * 180) / Math.PI;
  if (deg < 0) deg += 360;
  return deg;
}

function angleDelta(a: number, b: number) {
  const diff = Math.abs(a - b) % 360;
  return diff > 180 ? 360 - diff : diff;
}

function labelPosition(x: number, y: number) {
  const placeLeft = x > 76;
  const placeAbove = y > 62;

  return {
    className: [
      "absolute z-40",
      placeLeft ? "right-4" : "left-4",
      placeAbove ? "bottom-4" : "top-4",
    ].join(" "),
    align: placeLeft ? "items-end" : "items-start",
  };
}

export default function ServiceHeroRadar() {
  const [rotation, setRotation] = useState(0);
  const [activeNodeIds, setActiveNodeIds] = useState<string[]>([]);
  const timeoutMapRef = useRef<Map<string, number>>(new Map());

  const nodeAngles = useMemo(
    () =>
      NODES.map((node) => ({
        ...node,
        angle: angleFromCenter(node.x, node.y),
      })),
    [],
  );

  useEffect(() => {
    let frame = 0;
    let lastTs = 0;

    const animate = (ts: number) => {
      if (!lastTs) lastTs = ts;
      const delta = ts - lastTs;
      lastTs = ts;

      setRotation((prev) => {
        const next = (prev + (delta / 1000) * (360 / SWEEP_DURATION)) % 360;

        const candidates = nodeAngles.filter(
          (node) => angleDelta(next, node.angle) < 6,
        );

        if (candidates.length > 0) {
          const picked =
            candidates[Math.floor(Math.random() * candidates.length)];

          setActiveNodeIds((current) => {
            if (current.includes(picked.id)) return current;
            return [...current, picked.id];
          });

          const existingTimeout = timeoutMapRef.current.get(picked.id);
          if (existingTimeout) {
            window.clearTimeout(existingTimeout);
          }

          const timeoutId = window.setTimeout(() => {
            setActiveNodeIds((current) =>
              current.filter((id) => id !== picked.id),
            );
            timeoutMapRef.current.delete(picked.id);
          }, 1800);

          timeoutMapRef.current.set(picked.id, timeoutId);
        }

        return next;
      });

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      timeoutMapRef.current.forEach((timeoutId) => {
        window.clearTimeout(timeoutId);
      });
      timeoutMapRef.current.clear();
    };
  }, [nodeAngles]);

  return (
    <div className="relative h-full min-h-[420px] w-full md:min-h-[520px] lg:min-h-[620px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_42%,rgba(0,0,200,0.10)_0%,transparent_36%)]" />
      <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:56px_56px]" />

      {/* desktop */}
      <div className="absolute inset-0 hidden lg:block">
        <div className="absolute right-[2%] top-1/2 h-[42rem] w-[42rem] -translate-y-1/2 xl:right-[4%] xl:h-[48rem] xl:w-[48rem]">
          <div className="absolute inset-0 rounded-full bg-brand-blue/10 blur-[160px]" />

          <div className="absolute inset-[2%] rounded-full border border-white/[0.05]" />
          <div className="absolute inset-[14%] rounded-full border border-white/[0.04]" />
          <div className="absolute inset-[26%] rounded-full border border-white/[0.035]" />
          <div className="absolute inset-[38%] rounded-full border border-white/[0.03]" />
          <div className="absolute inset-[50%] rounded-full border border-white/[0.025]" />

          <div className="absolute left-1/2 top-[6%] h-[88%] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/[0.05] to-transparent" />
          <div className="absolute left-[6%] top-1/2 h-px w-[88%] -translate-y-1/2 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />

          <motion.div
            className="absolute left-1/2 top-1/2 h-px w-[20rem] origin-left -translate-y-1/2"
            animate={{ rotate: rotation }}
            transition={{ duration: 0 }}
          >
            <div className="relative h-px w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/0 via-brand-blue/70 to-brand-blue/0" />
              <div className="absolute left-0 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-brand-blue/10 blur-2xl" />
            </div>
          </motion.div>

          <div className="absolute left-1/2 top-1/2 z-20 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-blue/80 shadow-[0_0_20px_rgba(0,80,255,0.45)]" />
          <div className="absolute left-1/2 top-1/2 z-10 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-blue/20 bg-brand-blue/5" />

          {nodeAngles.map((node) => {
            const isActive = activeNodeIds.includes(node.id);
            const pos = labelPosition(node.x, node.y);

            return (
              <div
                key={node.id}
                className="absolute z-30"
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0.35, scale: 0.5 }}
                      animate={{ opacity: 0, scale: 2.1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.4, ease: "easeOut" }}
                      className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-blue/20"
                    />
                  )}
                </AnimatePresence>

                <motion.div
                  className="relative z-10 h-2.5 w-2.5 rounded-full bg-brand-blue shadow-[0_0_16px_rgba(0,80,255,0.45)]"
                  animate={
                    isActive
                      ? { scale: [1, 1.45, 1], opacity: [0.8, 1, 0.9] }
                      : { scale: 1, opacity: 0.35 }
                  }
                  transition={{ duration: 0.9, ease: "easeOut" }}
                />

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      key={node.id}
                      initial={{ opacity: 0, y: 6, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -4, scale: 0.98 }}
                      transition={{ duration: 0.28, ease: [0.21, 1, 0.36, 1] }}
                      className={pos.className}
                    >
                      <div
                        className={`inline-flex ${pos.align} items-center gap-2 rounded-full border border-brand-blue/20 bg-black/65 px-3 py-2 backdrop-blur-xl shadow-[0_0_24px_rgba(0,80,255,0.12)]`}
                      >
                        <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-white/5 text-brand-blue">
                          {node.icon}
                        </span>

                        <span className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.16em] text-white/80">
                          {node.label}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* mobile/tablet */}
      <div className="absolute inset-0 lg:hidden">
        <div className="absolute right-[-24%] top-1/2 h-[20rem] w-[20rem] -translate-y-1/2 md:right-[-10%] md:h-[28rem] md:w-[28rem]">
          <div className="absolute inset-0 rounded-full bg-brand-blue/10 blur-[90px]" />
          <div className="absolute inset-[6%] rounded-full border border-white/[0.05]" />
          <div className="absolute inset-[22%] rounded-full border border-white/[0.04]" />
          <div className="absolute inset-[38%] rounded-full border border-white/[0.03]" />

          <motion.div
            className="absolute left-1/2 top-1/2 h-px w-[9rem] origin-left -translate-y-1/2"
            animate={{ rotate: rotation }}
            transition={{ duration: 0 }}
          >
            <div className="relative h-px w-full bg-gradient-to-r from-brand-blue/0 via-brand-blue/60 to-brand-blue/0" />
          </motion.div>

          <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-blue/80 shadow-[0_0_16px_rgba(0,80,255,0.35)]" />
        </div>
      </div>
    </div>
  );
}
