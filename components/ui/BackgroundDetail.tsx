export const BackgroundDetail = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    {/* Resend tarzı ince grid çizgileri */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

    {/* Teknik "Blueprint" noktaları */}
    <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(circle_at_center,#000_100%,transparent_100%)]" />
  </div>
);
