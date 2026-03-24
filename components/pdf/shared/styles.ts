import { Font } from "@react-pdf/renderer";

// Türkçe karakter desteği için WOFF format (v12 — test edilmiş çalışıyor)
Font.register({
  family: "Inter",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff",
      fontWeight: 400,
    },
    {
      src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZ9hjp-Ek-_EeA.woff",
      fontWeight: 700,
    },
  ],
});

export const COLORS = {
  blue: "#0000C8",
  purple: "#BE29EC",
  dark: "#1A1A1A",
  gray: "#666666",
  lightGray: "#F5F5F5",
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
};

// Skor rengini döndür
export function scoreColor(score: number): string {
  if (score >= 75) return COLORS.success;
  if (score >= 50) return COLORS.warning;
  return COLORS.danger;
}

export function scoreLabel(score: number): string {
  if (score >= 75) return "İyi";
  if (score >= 50) return "Gelişim";
  return "Kritik";
}
