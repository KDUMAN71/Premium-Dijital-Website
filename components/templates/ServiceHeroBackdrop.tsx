export default function ServiceHeroBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Merkez glow */}
      <div className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-blue/10 blur-[120px]" />

      {/* Sağ üst data glow */}
      <div className="absolute right-[-6rem] top-8 h-72 w-72 rounded-full bg-brand-blue/10 blur-[100px]" />

      {/* Radar halkaları */}
      <div className="absolute right-[6%] top-1/2 hidden h-[26rem] w-[26rem] -translate-y-1/2 rounded-full border border-white/5 md:block" />
      <div className="absolute right-[8.5%] top-1/2 hidden h-[20rem] w-[20rem] -translate-y-1/2 rounded-full border border-white/[0.04] md:block" />
      <div className="absolute right-[11%] top-1/2 hidden h-[14rem] w-[14rem] -translate-y-1/2 rounded-full border border-white/[0.04] md:block" />

      {/* Tarama çizgisi */}
      <div className="absolute right-[6%] top-1/2 hidden h-px w-[13rem] -translate-y-1/2 bg-gradient-to-r from-brand-blue/0 via-brand-blue/50 to-brand-blue/0 opacity-70 md:block animate-pulse" />

      {/* Çok hafif grid hissi */}
      <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:48px_48px]" />
    </div>
  );
}
