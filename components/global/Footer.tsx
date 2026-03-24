import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  ArrowUpRight,
  Linkedin,
  Instagram,
  ShieldCheck,
  Zap,
  MapPin,
  Phone,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 overflow-hidden border-t border-white/[0.08] bg-[#030305] pt-24 pb-12">
      {/* Arka Plan Ambiyans Işıkları */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
      >
        <div className="absolute -top-32 left-0 h-[500px] w-[500px] bg-brand-blue/10 blur-[120px]" />
        <div className="absolute -bottom-32 right-0 h-[500px] w-[500px] bg-brand-purple/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          {/* LOGO VE MARKA BLOĞU (Col 1-5) */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <Link href="/" className="group inline-block">
              <div className="relative h-24 w-auto md:h-32">
                <Image
                  src="/img/brand/premiumdijital-logo-500px.webp"
                  alt="Premium Dijital Reklam Ajansı"
                  width={600}
                  height={200}
                  className="h-full w-auto object-contain brightness-100 transition-all group-hover:drop-shadow-[0_0_20px_rgba(190,41,236,0.2)]"
                  priority
                />
              </div>
            </Link>

            <h3 className="mt-10 max-w-md text-2xl font-bold uppercase tracking-tighter text-white italic leading-tight">
              Rakamlarla Kanıtlanmış, <br />
              <span className="text-white/20">Hayallerle Tasarlanmış.</span>
            </h3>

            <p className="mt-6 max-w-xs text-[14px] leading-relaxed text-white/40 italic font-medium">
              Dijital büyüme mimarisi ile işletmenizin kapasitesini stratejik
              mühendislik disipliniyle ölçeklendiriyoruz.
            </p>

            {/* Sosyal Medya & İletişim Köprüsü */}
            <div className="mt-10 flex flex-wrap gap-4">
              <SocialIcon
                href="https://www.linkedin.com/company/premiumdijital/"
                icon={<Linkedin size={18} />}
                label="LinkedIn"
              />
              <SocialIcon
                href="https://www.instagram.com/premiumdijital"
                icon={<Instagram size={18} />}
                label="Instagram"
              />
              <SocialIcon
                href="https://www.facebook.com/premiumdijital"
                icon={
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]">
                    <path d="M22 12a10 10 0 10-11.63 9.87v-6.99H7.9V12h2.47V9.79c0-2.43 1.45-3.77 3.66-3.77 1.06 0 2.17.19 2.17.19v2.39h-1.22c-1.2 0-1.58.74-1.58 1.5V12h2.69l-.43 2.88h-2.26v6.99A10 10 0 0022 12z" />
                  </svg>
                }
                label="Facebook"
              />
              <a
                href="mailto:info@premiumdijital.com"
                className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.03] px-6 py-3 text-[11px] font-black uppercase tracking-widest text-white/60 transition-all hover:bg-white/10 hover:text-white"
              >
                <Mail size={16} className="text-brand-purple" /> İLETİŞİME GEÇ
              </a>
            </div>

            {/* NAP — Local SEO */}
            <address className="mt-10 not-italic space-y-3 border-t border-white/5 pt-8 w-full">
              <div className="flex items-start gap-3 text-[13px] text-white/35 leading-relaxed">
                <MapPin size={15} className="text-brand-purple mt-0.5 shrink-0" />
                <span>
                  Ziya Gökalp Mah. Süleyman Demirel Bulv.<br />
                  Mall Of İstanbul The Office No:7E D:136<br />
                  34490 Başakşehir / İstanbul
                </span>
              </div>
              <div className="flex items-center gap-3 text-[13px] text-white/35">
                <Phone size={15} className="text-brand-purple shrink-0" />
                <a href="tel:+902129825724" className="hover:text-white transition-colors">
                  (0212) 982 57 24
                </a>
              </div>
              <div className="flex items-center gap-3 text-[13px] text-white/35">
                <Mail size={15} className="text-brand-purple shrink-0" />
                <a href="mailto:info@premiumdijital.com" className="hover:text-white transition-colors">
                  info@premiumdijital.com
                </a>
              </div>
            </address>
          </div>

          {/* MENÜLER (Col 6-12) */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
            {/* Sütun: Uzmanlıklar */}
            <div className="flex flex-col gap-8">
              <FooterHeader>Uzmanlıklar</FooterHeader>
              <ul className="space-y-4">
                <FooterLink href="/hizmetler/performans-pazarlama">
                  PPC & Performans
                </FooterLink>
                <FooterLink href="/hizmetler/dijital-mimari">
                  Dijital Mimari
                </FooterLink>
                <FooterLink href="/hizmetler/marka-stratejisi">
                  Marka & Strateji
                </FooterLink>
                <FooterLink href="/hizmetler/dijital-operasyon">
                  Dijital Operasyon
                </FooterLink>
              </ul>
            </div>

            {/* Sütun: Sektörler */}
            <div className="flex flex-col gap-8">
              <FooterHeader>Sektörler</FooterHeader>
              <ul className="space-y-4">
                <li className="text-[13px] font-medium text-white/40 hover:text-white transition-colors cursor-default">
                  Sağlık & Medikal
                </li>
                <li className="text-[13px] font-medium text-white/40 hover:text-white transition-colors cursor-default">
                  Turizm & Konaklama
                </li>
                <li className="text-[13px] font-medium text-white/40 hover:text-white transition-colors cursor-default">
                  E-Ticaret & Retail
                </li>
                <li className="text-[13px] font-medium text-white/40 hover:text-white transition-colors cursor-default">
                  B2B & Teknoloji
                </li>
              </ul>
            </div>

            {/* Sütun: Analiz */}
            <div className="flex flex-col gap-8">
              <FooterHeader>Analiz</FooterHeader>
              <div className="space-y-6">
                <Link
                  href="/ucretsiz-analiz"
                  className="group relative flex items-center justify-center overflow-hidden rounded-2xl bg-white px-6 py-4 text-center"
                >
                  <span className="relative z-10 text-[11px] font-black uppercase tracking-widest text-black group-hover:text-white transition-colors duration-300">
                    Ücretsiz Analiz
                  </span>
                  <div className="absolute inset-0 z-0 bg-gradient-to-r from-brand-purple to-brand-blue opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </Link>

                <div className="flex items-center gap-3 text-white/20">
                  <ShieldCheck size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    Veri Güvenliği
                  </span>
                </div>
                <div className="flex items-center gap-3 text-white/20">
                  <Zap size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    Hızlı Dönüşüm
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ALT ŞERİT (Legal & Copyright) */}
        <div className="mt-24 flex flex-col items-center justify-between gap-8 border-t border-white/5 pt-12 md:flex-row">
          <div className="flex flex-col gap-2 items-center md:items-start">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/10">
              © {currentYear} Premium Dijital Reklam Ajansı ve Pazarlama
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            <LegalLink href="/gizlilik">Gizlilik</LegalLink>
            <LegalLink href="/kvkk">KVKK</LegalLink>
            <LegalLink href="/cerezler">Çerez Politikası</LegalLink>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   ALT BİLEŞENLER
───────────────────────────────────────────── */

function FooterHeader({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="text-[11px] font-black uppercase tracking-[0.35em] text-white/20">
      {children}
    </h4>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="group flex items-center gap-2 text-[14px] font-medium text-white/40 transition-all hover:text-white"
      >
        <span className="h-px w-0 bg-brand-purple transition-all group-hover:w-3" />
        {children}
        <ArrowUpRight
          size={12}
          className="opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </Link>
    </li>
  );
}

function SocialIcon({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/5 bg-white/[0.03] text-white/30 transition-all hover:border-brand-purple/50 hover:bg-brand-purple/10 hover:text-white"
    >
      {icon}
    </a>
  );
}

function LegalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-[10px] font-black uppercase tracking-widest text-white/20 transition-colors hover:text-white/60"
    >
      {children}
    </Link>
  );
}
