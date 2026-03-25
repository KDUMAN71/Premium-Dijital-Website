"use client";

import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// TÜRKÇE KARAKTER FİX: Standart fontlar yerine kesin çözüm için
// sisteminizde yüklü olan veya güvenilir bir kaynaktan gelen Inter fontu.
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

const styles = StyleSheet.create({
  page: {
    padding: 0, // Master Teklif'teki gibi tam kenar kontrolü için
    backgroundColor: "#FFFFFF",
    fontFamily: "Inter",
    color: "#1A1A1A",
  },
  // Master Teklif'teki karakteristik Üst Mavi Bar
  topAccent: {
    height: 12,
    backgroundColor: "#0000C8",
    width: "100%",
  },
  container: {
    padding: "40 60",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 80,
  },
  brandSection: {
    flexDirection: "column",
  },
  logoText: {
    fontSize: 20,
    fontWeight: 700,
    color: "#0000C8",
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 8,
    textTransform: "uppercase",
    letterSpacing: 3,
    color: "#BE29EC",
    marginTop: 4,
  },
  // Kapak İçeriği - Mimar Disiplini
  mainContent: {
    marginTop: 40,
  },
  preTitle: {
    fontSize: 10,
    fontWeight: 700,
    color: "#BE29EC",
    letterSpacing: 5,
    textTransform: "uppercase",
    marginBottom: 15,
  },
  title: {
    fontSize: 44,
    fontWeight: 700,
    color: "#020204",
    lineHeight: 1.1,
  },
  // Teklif dosyanızdaki gibi sol dikey çizgili müşteri kutusu
  clientBox: {
    marginTop: 60,
    paddingLeft: 24,
    borderLeftWidth: 4,
    borderLeftColor: "#0000C8",
  },
  clientLabel: {
    fontSize: 10,
    color: "#999999",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 6,
  },
  clientName: {
    fontSize: 26,
    fontWeight: 700,
    color: "#1A1A1A",
  },
  // Sektöre Özel Badge (Örn: Sağlık için Steril Mavi)
  sectorBadge: {
    marginTop: 12,
    padding: "4 12",
    backgroundColor: "#F0F0FF",
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  sectorText: {
    fontSize: 10,
    color: "#0000C8",
    fontWeight: 700,
    textTransform: "uppercase",
  },
  footer: {
    position: "absolute",
    bottom: 40,
    left: 60,
    right: 60,
    borderTopWidth: 0.5,
    borderTopColor: "#EEEEEE",
    paddingTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 8,
    color: "#AAAAAA",
  },
});

const AnalysisReport = ({ data }: { data: any }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.topAccent} />

      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.brandSection}>
            <Text style={styles.logoText}>PREMIUM DIJITAL</Text>
            <Text style={styles.tagline}>DİJİTAL BÜYÜME MİMARLIĞI</Text>
          </View>
          <Text style={{ fontSize: 9, color: "#CCC" }}>
            DOSYA: {data.reportId || "2026/ANALIZ-01"}
          </Text>
        </View>

        {/* Ana Başlık */}
        <View style={styles.mainContent}>
          <Text style={styles.preTitle}>Stratejik Teşhis Belgesi</Text>
          <Text style={styles.title}>DİJİTAL VARLIK VE</Text>
          <Text style={styles.title}>KONUMLANDIRMA ANALİZİ</Text>

          {/* Müşteri Bilgisi */}
          <View style={styles.clientBox}>
            <Text style={styles.clientLabel}>HAZIRLANAN KURUM</Text>
            <Text style={styles.clientName}>
              {data.clientName || "MARKA ADI"}
            </Text>

            <View style={styles.sectorBadge}>
              <Text style={styles.sectorText}>
                {data.sector || "SEKTÖR ANALİZİ"}
              </Text>
            </View>
          </View>
        </View>

        {/* Alt Bilgi */}
        <View style={styles.footer}>
          <Text>© 2026 PREMIUM DIJITAL · GİZLİDİR</Text>
          <Text>www.premiumdijital.com</Text>
        </View>
      </View>
    </Page>

    {/* Sayfa 2: Teşhis & Risk Matrisi (Bu sayfa beyaz zeminde tablo yapısında olacak) */}
  </Document>
);

export default AnalysisReport;
