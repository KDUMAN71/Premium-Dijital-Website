import { Font } from "@react-pdf/renderer";
import path from "path";

// TTF — Türkçe karakter tam desteği (İ Ğ Ş Ü Ö Ç ı ğ ş ü ö ç ₺)
Font.register({
  family: "Inter",
  fonts: [
    {
      src: "/fonts/Inter-Regular.ttf", // Public klasöründen URL olarak
      fontWeight: 400,
    },
    {
      src: "/fonts/Inter-Bold.ttf",
      fontWeight: 700,
    },
  ],
});

export const COLORS = {
  blue: "#0000C8",
  purple: "#BE29EC",
  dark: "#1A1A1A",
  black: "#111111",
  gray: "#666666",
  lightGray: "#F5F5F5",
  midGray: "#DDDDDD",
  border: "#E5E5E5",
  white: "#FFFFFF",
  success: "#1A7A3F",
  successBg: "#E8F5EE",
  warning: "#B7770D",
  warningBg: "#FDF4E3",
  danger: "#C0392B",
  dangerBg: "#FDEDEB",
  blueBg: "#EEF0FF",
  purpleBg: "#F9EEFF",
  // Kapak gradient simülasyonu
  grad1: "#BE29EC",
  grad2: "#8A1ECC",
  grad3: "#5512AA",
  grad4: "#2A08C8",
  grad5: "#0000C8",
};

export function scoreColor(score: number): string {
  if (score >= 75) return COLORS.success;
  if (score >= 50) return COLORS.warning;
  return COLORS.danger;
}
