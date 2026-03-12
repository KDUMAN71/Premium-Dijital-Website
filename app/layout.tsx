import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Premium Dijital | Dijital Büyüme Sistemi",
    template: "%s | Premium Dijital",
  },
  description:
    "İşletmenizin dijitalde müşteri kazanma sürecini sisteme dönüştürüyoruz. PPC, SEO, web altyapısı ve marka kimliği.",
  keywords: [
    "dijital ajans",
    "Google Ads ajansı",
    "SEO ajansı",
    "performans pazarlama",
    "dijital pazarlama Türkiye",
  ],
  authors: [{ name: "Premium Dijital", url: "https://premiumdijital.com" }],
  creator: "Premium Dijital",
  metadataBase: new URL("https://premiumdijital.com"),
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://premiumdijital.com",
    siteName: "Premium Dijital",
    title: "Premium Dijital | Dijital Büyüme Sistemi",
    description:
      "İşletmenizin dijitalde müşteri kazanma sürecini sisteme dönüştürüyoruz.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Premium Dijital | Dijital Büyüme Sistemi",
    description:
      "İşletmenizin dijitalde müşteri kazanma sürecini sisteme dönüştürüyoruz.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
