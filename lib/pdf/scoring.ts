// lib/pdf/scoring.ts
// Sektör bazlı skorlama motoru — AnalysisData'yı gerçek verilerle zenginleştirir

import type { AnalysisData } from "@/types/analysis";

/* ─────────────────────────────────────────────────────────────────────────────
   SEKTÖR BENÇMARKLERİ
   ─────────────────────────────────────────────────────────────────────────────
   Türkiye dijital reklam piyasası ortalamalarına dayalı tahmin değerleri.
   Her alan: 0–100 arası skor. */

export interface SectorBenchmark {
  seo: number;
  ppc: number;
  social: number;
  operations: number;
  overall: number;
}

export const SECTOR_BENCHMARKS: Record<string, SectorBenchmark> = {
  HEALTH:  { seo: 55, ppc: 48, social: 58, operations: 42, overall: 51 },
  TOURISM: { seo: 62, ppc: 54, social: 65, operations: 45, overall: 57 },
  ECOMM:   { seo: 68, ppc: 65, social: 60, operations: 55, overall: 62 },
  SERVICE: { seo: 58, ppc: 52, social: 55, operations: 50, overall: 54 },
  BEAUTY:  { seo: 52, ppc: 44, social: 70, operations: 38, overall: 51 },
  OTHER:   { seo: 55, ppc: 50, social: 58, operations: 45, overall: 52 },
};

/* ─────────────────────────────────────────────────────────────────────────────
   SEKTÖR BULGULARI
   ───────────────────────────────────────────────────────────────────────────── */

interface CategoryAssets {
  findings: { low: string[]; mid: string[]; high: string[] };
  recommendations: { low: string[]; mid: string[]; high: string[] };
  gain: { low: string; mid: string; high: string };
}

const SEO_ASSETS: Record<string, CategoryAssets> = {
  HEALTH: {
    findings: {
      low: [
        "Klinik sayfaları Google E-E-A-T kriterlerini karşılamıyor",
        "Doktor profil sayfaları optimize edilmemiş",
        "Lokal SEO sinyalleri yetersiz — Google Haritalar görünürlüğü düşük",
        "MedicalOrganization / Physician schema markup eksik",
      ],
      mid: [
        "Hizmet sayfaları keyword optimizasyonu yetersiz",
        "Core Web Vitals sektör ortalamasının altında",
        "Hasta yorum entegrasyonu SEO'ya katkı sağlamıyor",
      ],
      high: [
        "Teknik SEO altyapısı iyi durumda",
        "Core Web Vitals sağlık sektörü ortalamasını karşılıyor",
      ],
    },
    recommendations: {
      low: [
        "Her doktor için biyografi + uzmanlık sayfası oluşturun",
        "Google İşletme Profili'ni günlük güncelleme sürecine ekleyin",
        "MedicalOrganization ve Physician schema ekleyin",
        "Hasta yorumlarını Google My Business'a yönlendirin",
      ],
      mid: [
        "Hizmet sayfalarını hedef aramalar için yeniden yazın",
        "LCP süresini 2.5 saniyenin altına indirin",
      ],
      high: [
        "Mevcut SEO sinyallerini koruyun, içerik tazeliğini artırın",
        "Backlink çalışmalarını sürdürün",
      ],
    },
    gain: {
      low: "SEO altyapısı kurulursa organik hasta trafiği 6 ayda %120–180 artabilir.",
      mid: "Eksiklikler giderilirse organik tıklamalar %60–90 büyüme kaydedebilir.",
      high: "İçerik genişletmesiyle organik trafikte %30–50 ek artış mümkün.",
    },
  },
  TOURISM: {
    findings: {
      low: [
        "Tesis sayfaları TripAdvisor / Booking bağlantısından yoksun",
        "Çok dilli SEO yapısı (hreflang) kurulmamış",
        "Sezonsal anahtar kelime optimizasyonu yapılmamış",
        "Görsel alt etiketleri eksik — turizm aramalarında kritik",
      ],
      mid: [
        "Destinasyon içerikleri yeterince kapsamlı değil",
        "Kullanıcı yorumları sayfaya entegre edilmemiş",
      ],
      high: [
        "Teknik SEO altyapısı yeterli",
        "Sayfa hızı sektör beklentilerini karşılıyor",
      ],
    },
    recommendations: {
      low: [
        "TripAdvisor / Google Travel entegrasyon scriptleri ekleyin",
        "İngilizce ve Almanca hreflang sayfaları başlatın",
        "Sezon kampanyalarına özel landing page'ler hazırlayın",
        "Her görsel için açıklayıcı alt metin yazın",
      ],
      mid: [
        "Şehir / bölge rehberi içerikleri üretin",
        "Review widget'ını tüm tesis sayfalarına ekleyin",
      ],
      high: [
        "Mevcut SEO avantajını koruyun, uzun kuyruk içerikler ekleyin",
        "Video içerikleri için SEO optimizasyonu yapın",
      ],
    },
    gain: {
      low: "Çok dilli SEO + görsel optimizasyonu ile rezervasyon trafiği %100–160 artabilir.",
      mid: "Destinasyon içerikleri tamamlanırsa organik trafik %50–80 büyüyebilir.",
      high: "Mevcut trafik verimliliği artırılırsa dönüşüm oranı %20–35 yükseltilebilir.",
    },
  },
  ECOMM: {
    findings: {
      low: [
        "Ürün sayfaları Product schema markup içermiyor",
        "Kategori sayfalarında tekrarlı içerik sorunu mevcut",
        "Site haritası güncel değil veya eksik",
        "Mobil alışveriş deneyimi optimize edilmemiş",
      ],
      mid: [
        "Filtre/facet sayfaları crawl budget tüketiyor",
        "Ürün görselleri sıkıştırılmamış",
      ],
      high: [
        "Site yapısı arama motorları için uygun",
        "Ürün sayfaları makul hızda yükleniyor",
      ],
    },
    recommendations: {
      low: [
        "Tüm ürün sayfalarına Product + Offer schema ekleyin",
        "Canonical tag'lerle duplicate content sorununu çözün",
        "XML site haritasını günlük otomatik güncelleme yapın",
        "AMP veya hızlı yükleme optimizasyonu uygulayın",
      ],
      mid: [
        "noindex ile gereksiz filtre URL'lerini engelleyin",
        "WebP formatına toplu görsel dönüşümü yapın",
      ],
      high: [
        "Uzun kuyruk ürün içerikleri üretin",
        "Review structured data'sı ekleyerek yıldız puanlarını arama sonuçlarında gösterin",
      ],
    },
    gain: {
      low: "Teknik SEO düzeltmeleri organik satışları %80–140 artırabilir.",
      mid: "Hız ve içerik optimizasyonuyla trafik %40–70 büyüyebilir.",
      high: "Yapısal veriler tamamlanırsa tıklama oranı %25–40 yükseltilebilir.",
    },
  },
  SERVICE: {
    findings: {
      low: [
        "Hizmet sayfaları hedef keyword'ler için optimize edilmemiş",
        "Blog içerikleri yok veya 6+ aydan eski",
        "Backlink profili oldukça zayıf",
        "Lokal arama görünürlüğü (Google Maps) ihmal edilmiş",
      ],
      mid: [
        "İç linkleme yapısı dağınık",
        "Meta description'lar varsayılan değerler içeriyor",
      ],
      high: [
        "Site teknik altyapısı sağlam",
        "Temel hizmet sayfaları indexlenmiş",
      ],
    },
    recommendations: {
      low: [
        "Her hizmet için ayrı, keyword odaklı sayfa yazın",
        "Haftada 1 adet SEO uyumlu blog içeriği yayınlayın",
        "Sektörel dizin siteleriyle link building başlatın",
        "Google İşletme Profilini optimize edin",
      ],
      mid: [
        "İç linkleme haritası çıkarın ve her sayfayı bağlayın",
        "Tüm meta description'ları tıklama odaklı yeniden yazın",
      ],
      high: [
        "Otorite içerikler üretin, thought leadership pozisyonu alın",
        "Sektör yayınlarında misafir yazarlık yapın",
      ],
    },
    gain: {
      low: "SEO temeli atılırsa organik lead sayısı 6 ayda %100–150 artabilir.",
      mid: "İçerik ve link çalışmalarıyla organik trafik %50–80 büyüyebilir.",
      high: "Mevcut trafik dönüşüm optimizasyonuyla gelire %30–50 daha fazla katkı sağlar.",
    },
  },
  BEAUTY: {
    findings: {
      low: [
        "Önce/sonra görselleri SEO açısından optimize edilmemiş",
        "Lokal arama görünürlüğü yetersiz — Google İşletme Profili eksik",
        "Instagram içeriği ile web sitesi senkronize değil",
        "Randevu sayfası arama motorları için optimize edilmemiş",
      ],
      mid: [
        "Hizmet fiyat sayfaları yapılandırılmış veri içermiyor",
        "Müşteri yorumları SEO'ya yansıtılmıyor",
      ],
      high: [
        "Görsel ağırlıklı sayfa yapısı iyi tasarlanmış",
        "Mobil uyumluluk genel standartları karşılıyor",
      ],
    },
    recommendations: {
      low: [
        "Tüm önce/sonra görsellerine açıklayıcı alt metin ve title ekleyin",
        "Google İşletme Profili'ni günlük fotoğraf ve güncelleme ile aktif tutun",
        "Web sitesine Instagram feed widget'ı entegre edin",
        "Randevu sayfasına LocalBusiness schema ekleyin",
      ],
      mid: [
        "Hizmet sayfalarına fiyat aralığı ve Review schema ekleyin",
        "Müşteri yorumlarını otomatik toplayan bir sistem kurun",
      ],
      high: [
        "Video içerik (uygulama videoları) için YouTube SEO stratejisi geliştirin",
        "Influencer iş birliklerini backlink stratejisine dahil edin",
      ],
    },
    gain: {
      low: "Lokal SEO + görsel optimizasyon ile organik randevu talebi %90–130 artabilir.",
      mid: "Yapısal veri + yorum sistemiyle tıklama oranı %40–60 yükseltilebilir.",
      high: "Mevcut organik trafik dönüşüm optimizasyonuyla randevuya %25–40 daha fazla dönüşür.",
    },
  },
  OTHER: {
    findings: {
      low: [
        "Site kapsamlı teknik SEO denetiminden geçirilmemiş",
        "Hedef anahtar kelime araştırması yapılmamış",
        "Meta etiket optimizasyonu eksik veya yanlış",
        "Backlink profili değerlendirilmemiş",
      ],
      mid: [
        "İçerik tazeliği yeterli değil",
        "Kullanıcı davranışı verileri takip edilmiyor",
      ],
      high: [
        "Temel teknik SEO gereksinimleri karşılanıyor",
        "Site indexleme sorunları minimal",
      ],
    },
    recommendations: {
      low: [
        "Öncelikle teknik SEO audit yapın (Screaming Frog / Semrush)",
        "Hedef müşteri aramalarına dayalı keyword haritası oluşturun",
        "Tüm sayfalara unique meta title ve description yazın",
        "Otorite sitelerde yer alacak backlink stratejisi hazırlayın",
      ],
      mid: [
        "Düzenli içerik takvimi oluşturun ve uygulayın",
        "Google Analytics + Search Console entegrasyonunu aktif edin",
      ],
      high: [
        "Rekabetçi analiz yaparak öne geçme fırsatlarını belirleyin",
        "Uzun kuyruk anahtar kelimelerle özgün içerikler üretin",
      ],
    },
    gain: {
      low: "Temel SEO altyapısı kurulursa organik trafik 6 ayda %100–200 artabilir.",
      mid: "İçerik ve teknik iyileştirmelerle trafik %50–80 büyüyebilir.",
      high: "Mevcut organik pozisyon güçlendirilerek %30–50 daha fazla trafik elde edilebilir.",
    },
  },
};

const PPC_ASSETS: Record<string, CategoryAssets> = {
  HEALTH: {
    findings: {
      low: [
        "Google Ads hesabı yok veya aktif kampanya çalışmıyor",
        "Sağlık sektörü kısıtlamaları göz önünde bulundurulmamış",
        "Dönüşüm takibi (randevu formu) kurulmamış",
        "Rakipler benzer bütçede %300 daha fazla görünürlük alıyor",
      ],
      mid: [
        "Kampanya yapısı hizmet bazında segmente edilmemiş",
        "Negatif kelime listesi yetersiz — bütçe israfı oluşuyor",
      ],
      high: [
        "Kampanya yapısı makul seviyede organize",
        "Temel dönüşüm takibi aktif",
      ],
    },
    recommendations: {
      low: [
        "YMYL uyumlu reklam metinleri ve landing page'ler hazırlayın",
        "Her hizmet için ayrı kampanya grubu oluşturun",
        "Google Ads dönüşüm takibini randevu formuna bağlayın",
        "Rakip keyword analizi yaparak boşlukları değerlendirin",
      ],
      mid: [
        "Hizmet başına ayrı reklam grubu ve metin seti oluşturun",
        "Aylık 200+ negatif kelime ile bütçe israfını durdurun",
      ],
      high: [
        "A/B testi ile reklam metinlerini sürekli optimize edin",
        "Akıllı teklif stratejisine (Target CPA) geçiş yapın",
      ],
    },
    gain: {
      low: "Google Ads kurulumu ile ilk 3 ayda aylık 15–30 ek randevu talebi hedeflenebilir.",
      mid: "Kampanya optimizasyonu ile randevu başı maliyeti %30–50 düşürülebilir.",
      high: "Mevcut bütçenin ROI'si %40–60 artırılabilir.",
    },
  },
  TOURISM: {
    findings: {
      low: [
        "Hotel / konaklama özelinde kampanya yapısı kurulmamış",
        "Sezon bazlı bütçe planlaması yok",
        "Google Hotel Ads entegrasyonu eksik",
        "Yabancı uyruklu ziyaretçilere yönelik reklam yok",
      ],
      mid: [
        "Kampanyalar sezon dışı dönemlerde optimize edilmemiş",
        "Remarketing listeleri oluşturulmamış",
      ],
      high: [
        "Temel kampanya yapısı mevcut",
        "Sezonsal bütçe ayarlamaları yapılıyor",
      ],
    },
    recommendations: {
      low: [
        "Yüksek sezon / düşük sezon için ayrı bütçe planı hazırlayın",
        "Google Hotel Ads ve Travel entegrasyonunu başlatın",
        "Yabancı pazar segmentleri için ayrı kampanya açın",
        "Remarketing ile site ziyaretçilerine rezervasyon teklifleyin",
      ],
      mid: [
        "Düşük sezonda fiyat odaklı mesajlarla maliyetli hedefleme yapın",
        "Site ziyaretçilerini segmentlere ayırarak remarketing uygulayın",
      ],
      high: [
        "Dinamik arama reklamlarıyla kapsam genişletin",
        "Performance Max kampanyasını test edin",
      ],
    },
    gain: {
      low: "Profesyonel PPC yönetimiyle rezervasyon başı maliyet %40–60 düşürülebilir.",
      mid: "Sezon optimizasyonuyla reklam ROI'si %50–80 artırılabilir.",
      high: "Mevcut kampanya verimliliği %25–40 daha iyi sonuç üretebilir.",
    },
  },
  ECOMM: {
    findings: {
      low: [
        "Google Shopping kampanyaları kurulmamış",
        "Ürün feed'i hatalı veya eksik",
        "Sepet terk kampanyaları yok",
        "Rakipler benzer kategoride aylık 3–5x fazla harcama yapıyor",
      ],
      mid: [
        "Smart Shopping yerine Manuel kampanya yönetimi var",
        "Ürün bazlı ROAS hedefi belirlenmemiş",
      ],
      high: [
        "Shopping kampanyaları aktif ve optimize",
        "Temel remarketing akışları çalışıyor",
      ],
    },
    recommendations: {
      low: [
        "Google Merchant Center + Shopping kampanya kurulumunu tamamlayın",
        "Ürün feed'ini günlük senkronize edin",
        "Sepet terk kullanıcılarına 24 saat içinde remarketing gösterin",
        "Rakip ürün keyword'lerine hedefli kampanya açın",
      ],
      mid: [
        "Performance Max ile Shopping + Display + YouTube birleştirin",
        "Kategori bazında ROAS hedefleri belirleyin",
      ],
      high: [
        "Akıllı teklif optimizasyonuyla dönüşüm başı maliyeti %20–30 düşürün",
        "Mevsimsel ürünler için önceden bütçe artışı planlayın",
      ],
    },
    gain: {
      low: "Shopping + remarketing kurulumu ile reklam kaynaklı satışlar %100–200 artabilir.",
      mid: "ROAS optimizasyonu ile mevcut bütçeden %50–80 daha fazla gelir üretilebilir.",
      high: "Kampanya verimliliği artırılarak ROAS %30–50 yükseltilebilir.",
    },
  },
  SERVICE: {
    findings: {
      low: [
        "Google Ads hesabı yok veya boş kampanyalar mevcut",
        "Lead form uzantıları aktif değil",
        "Dönüşüm izleme kurulmamış",
        "Rakipler bu kategoride günde ortalama 2–4x fazla harcama yapıyor",
      ],
      mid: [
        "Kampanya yapısı hizmet bazında segmente edilmemiş",
        "Arama terimi raporu düzenli incelenmiyor",
      ],
      high: [
        "Kampanya yapısı organize ve verimli",
        "Lead takibi aktif",
      ],
    },
    recommendations: {
      low: [
        "Her hizmet için ayrı kampanya grubu ve dönüşüm hedefi tanımlayın",
        "Lead form uzantılarını tüm kampanyalara ekleyin",
        "Google Analytics dönüşüm takibini kampanyaya bağlayın",
        "Rakip analizi ile pazarda güçlü olduğunuz boşlukları belirleyin",
      ],
      mid: [
        "Hizmet başına ayrı reklam metinleri ve teklifler oluşturun",
        "Haftalık arama terimi raporu incelemesi rutini oluşturun",
      ],
      high: [
        "Target CPA ile otomatik teklif optimizasyonuna geçin",
        "Müşteri yaşam boyu değerine göre teklif stratejisi geliştirin",
      ],
    },
    gain: {
      low: "Google Ads kurulumu ile aylık lead sayısı 3 ayda %80–150 artabilir.",
      mid: "Kampanya optimizasyonuyla lead başı maliyet %30–50 düşürülebilir.",
      high: "Mevcut kampanya kalitesi yükseltilerek dönüşüm oranı %20–35 artırılabilir.",
    },
  },
  BEAUTY: {
    findings: {
      low: [
        "Google Ads hesabı yok veya aktif kampanya çalışmıyor",
        "Lokal hedefleme (yakın çevredeki potansiyel müşteriler) yapılmıyor",
        "Randevu öncesi teklif / promosyon reklamları yok",
        "Rakip klinikler benzer bütçede çok daha fazla görünürlük elde ediyor",
      ],
      mid: [
        "Lokal ve geniş hedefleme aynı kampanyada karıştırılmış",
        "Hizmet bazında negatif keyword listesi oluşturulmamış",
      ],
      high: [
        "Lokal kampanya yapısı optimize edilmiş",
        "Temel dönüşüm takibi aktif",
      ],
    },
    recommendations: {
      low: [
        "5–15 km lokal hedeflemeyle çevre potansiyel müşteriler için kampanya açın",
        "Her hizmet (botoks, filler, lazer vb.) için ayrı reklam grubu oluşturun",
        "Sezonsal kampanyalar (yaz öncesi, düğün sezonu) için bütçe planlayın",
        "Google Local Service Ads ile doğrudan çağrı reklamları başlatın",
      ],
      mid: [
        "Lokal kampanyayı geniş coğrafi hedeflemeden ayırın",
        "Jenerik aramaları negatif keyword ile filtreleyin",
      ],
      high: [
        "Instagram yeniden pazarlama ile Google Ads sinerji yaratın",
        "Performans verilerine göre bütçeyi yüksek dönüşümlü saatlere kaydırın",
      ],
    },
    gain: {
      low: "Lokal PPC kurulumu ile aylık randevu sayısı %80–120 artabilir.",
      mid: "Kampanya optimizasyonu ile randevu başı reklam maliyeti %35–55 düşürülebilir.",
      high: "Mevcut bütçenin dönüşüm verimliliği %25–40 artırılabilir.",
    },
  },
  OTHER: {
    findings: {
      low: [
        "Ücretli arama reklamcılığı hiç kullanılmıyor",
        "Rakipler hedef anahtar kelimelerde her zaman üstte görünüyor",
        "Dönüşüm hedefleri tanımlanmamış",
        "Dijital reklam bütçesi optimize edilmemiş",
      ],
      mid: [
        "Kampanya yapısı verimsiz — geniş eşleme bütçe tüketiyor",
        "Reklam kalite skorları düşük",
      ],
      high: [
        "Kampanya yapısı makul seviyede",
        "Temel metrikler takip ediliyor",
      ],
    },
    recommendations: {
      low: [
        "Hedef müşterinin arama niyetini analiz eden keyword araştırması yapın",
        "Pilot kampanya ile küçük bütçeyle test başlatın",
        "Dönüşüm takibini Google Analytics + Ads entegrasyonuyla kurun",
        "İlk 3 ayda performans verilerini toplayıp stratejiyi şekillendirin",
      ],
      mid: [
        "Tam eşleme + ifade eşleme kombinasyonuyla israf azaltın",
        "Landing page kalite skorunu artırmak için sayfa optimizasyonu yapın",
      ],
      high: [
        "Akıllı teklif stratejilerine geçerek manuel yükü azaltın",
        "Reklam varlık kütüphanesini genişleterek kalite skorunu artırın",
      ],
    },
    gain: {
      low: "Doğru kurulumda Google Ads, organik büyümeyi beklemeden hemen sonuç üretebilir.",
      mid: "Kampanya verimliliği artırılarak aynı bütçeyle %40–70 daha fazla lead alınabilir.",
      high: "Mevcut bütçe daha akıllı dağıtılarak ROI %30–50 artırılabilir.",
    },
  },
};

const SOCIAL_ASSETS: Record<string, CategoryAssets> = {
  HEALTH: {
    findings: {
      low: [
        "Sağlık içerikleri yayınlanıyor ancak uzmanlık vurgulanmıyor",
        "Hasta başarı hikayeleri (KVKK uyumlu) paylaşılmıyor",
        "Reels ve kısa video formatları kullanılmıyor",
        "Sosyal medya - web sitesi arasında trafik akışı yok",
      ],
      mid: [
        "İçerik takvimi düzensiz — paylaşım sıklığı yetersiz",
        "Doktor/uzman profili öne çıkarılmıyor",
      ],
      high: [
        "Düzenli içerik yayını sürdürülüyor",
        "Etkileşim oranları sektör ortalamasını karşılıyor",
      ],
    },
    recommendations: {
      low: [
        "Her doktor için aylık 2–3 uzman içerik videosu üretin",
        "KVKK uyumlu hasta hikayeleri serisi başlatın",
        "Instagram Reels ve YouTube Shorts formatlarını deneyin",
        "Bio linklerini web sitesi randevu formuna yönlendirin",
      ],
      mid: [
        "Haftada minimum 3 organik gönderi olan içerik takvimi oluşturun",
        "Doktor videolarını düzenli formata (örn. 'Uzman Cevaplıyor') dönüştürün",
      ],
      high: [
        "Topluluk yönetimini güçlendirerek yorum yanıt süresini 2 saate indirin",
        "Influencer iş birlikleriyle erişimi genişletin",
      ],
    },
    gain: {
      low: "Aktif sosyal medya yönetimiyle organik erişim 6 ayda 3–5x artabilir.",
      mid: "Düzenli içerik + video ile etkileşim oranı %2 üzerine çıkabilir.",
      high: "Mevcut kitleyi beslemeye devam ederek aylık 20–40 organik randevu talebi yaratılabilir.",
    },
  },
  TOURISM: {
    findings: {
      low: [
        "Tesis görselleri profesyonel fotoğrafçılık kalitesinde değil",
        "Misafir deneyimi hikayeleri paylaşılmıyor",
        "Instagram / TikTok destinasyon içerikleri üretilmiyor",
        "Kullanıcı tarafından oluşturulan içerik (UGC) teşvik edilmiyor",
      ],
      mid: [
        "Sezonsal içerik planlaması eksik",
        "Story formatı ve interaktif anketler kullanılmıyor",
      ],
      high: [
        "Görsel içerik kalitesi yeterli",
        "Takipçi etkileşimi istikrarlı",
      ],
    },
    recommendations: {
      low: [
        "Profesyonel drone çekimi dahil tesis fotoğraf/video seti hazırlayın",
        "Misafir check-in anında UGC teşvik kampanyası başlatın",
        "TikTok destinasyon içerikleriyle genç kitleye ulaşın",
        "Sezonsal (Yaz / Kış) içerik paketleri önceden planlayın",
      ],
      mid: [
        "Aylık içerik takvimini sezon temalarına göre oluşturun",
        "Story anketleri ve soru-cevap ile etkileşim artırın",
      ],
      high: [
        "Mikro influencer iş birlikleri ile erişimi patlama düzeyine çıkarın",
        "Kullanıcı içeriklerini ana feed'e düzenli olarak ekleyin",
      ],
    },
    gain: {
      low: "Profesyonel içerik + UGC stratejisiyle sosyal kaynaklı rezervasyon %60–100 artabilir.",
      mid: "İçerik tutarlılığı sağlanırsa organik erişim %40–70 büyüyebilir.",
      high: "Mevcut kitle daha aktif beslenerek doğrudan mesaj ile rezervasyon yaratılabilir.",
    },
  },
  ECOMM: {
    findings: {
      low: [
        "Instagram / TikTok Shop entegrasyonu yapılmamış",
        "Ürün tanıtım videoları ve Reels üretilmiyor",
        "Sepet terk kullanıcılarına sosyal medya retargeting yok",
        "Müşteri yorumları sosyal medyada paylaşılmıyor",
      ],
      mid: [
        "İçerik takvimi ürün lansmanlarıyla senkronize değil",
        "Influencer iş birlikleri ölçeklendirilmemiş",
      ],
      high: [
        "Sosyal ticaret altyapısı aktif",
        "Düzenli içerik yayını sürdürülüyor",
      ],
    },
    recommendations: {
      low: [
        "Instagram ve TikTok Shop katalog entegrasyonunu tamamlayın",
        "Haftalık 2–3 ürün Reels / short video formatı üretin",
        "Sosyal medya retargeting piksellerini tüm platformlara yerleştirin",
        "Müşteri yorumlarını sosyal kanıt içeriklerine dönüştürün",
      ],
      mid: [
        "Ürün lansmanlarından 2 hafta önce sosyal medya ısınma içerikleri planlayın",
        "Mikro influencer ağı oluşturun (10K–100K takipçi aralığı)",
      ],
      high: [
        "Live shopping etkinlikleriyle anlık satış kampanyaları deneyin",
        "Sosyal ticaret verilerini analiz ederek en çok dönüşüm getiren içerik formatını ölçeklendirin",
      ],
    },
    gain: {
      low: "Sosyal ticaret kurulumundan sonra sosyal kaynaklı satışlar %100–180 artabilir.",
      mid: "İçerik + retargeting sinerji yaratırsa dönüşüm oranı %40–60 yükseltilebilir.",
      high: "Mevcut sosyal medya trafiği gelire %25–40 daha iyi dönüştürülebilir.",
    },
  },
  SERVICE: {
    findings: {
      low: [
        "LinkedIn varlığı yok veya pasif — B2B potansiyeli kullanılmıyor",
        "Uzmanlık içerikleri (case study, ipucu paylaşımı) üretilmiyor",
        "Müşteri referans içerikleri yayınlanmıyor",
        "Marka sesi tutarsız — farklı platformlarda farklı ton",
      ],
      mid: [
        "İçerik uzmanlık odaklı değil, genel bilgi paylaşımı ağır basıyor",
        "Takipçi etkileşimine aktif yanıt verilmiyor",
      ],
      high: [
        "Düzenli içerik takvimi uygulanıyor",
        "Marka sesi tutarlı",
      ],
    },
    recommendations: {
      low: [
        "LinkedIn'de haftalık uzmanlık içerikleri (insight, vaka özeti) yayınlayın",
        "Müşteri onaylı başarı hikayelerini görsel formatında paylaşın",
        "Marka sesi ve ton kılavuzu oluşturun",
        "Sektörel hashtag stratejisi geliştirin",
      ],
      mid: [
        "İçerik stratejisini 'eğitici + ilham verici' karışımına dönüştürün",
        "Her yoruma 2 saat içinde yanıt verecek topluluk yönetimi rutini kurun",
      ],
      high: [
        "Thought leadership içerikleriyle sektör referansı konumuna gelin",
        "Podcast veya web seminer serisi başlatın",
      ],
    },
    gain: {
      low: "Aktif LinkedIn + sosyal medya varlığı aylık 5–15 organik lead üretebilir.",
      mid: "Uzmanlık içerikleriyle marka otoritesi artar, kapanış oranı %20–35 yükselir.",
      high: "Güçlü sosyal medya duruşuyla referans + inbound lead akışı otomatikleşir.",
    },
  },
  BEAUTY: {
    findings: {
      low: [
        "Önce/sonra içerikleri düzenli ve profesyonel biçimde yayınlanmıyor",
        "TikTok ve Instagram Reels formatları kullanılmıyor",
        "Influencer iş birliği stratejisi yok",
        "Müşteri sadakat içerikleri (tekrar randevu teşvik) üretilmiyor",
      ],
      mid: [
        "İçerik estetiği tutarsız — feed görünümü dağınık",
        "Story anketleri ve soru-cevap etkileşimleri az",
      ],
      high: [
        "Estetik feed yapısı çekici",
        "Takipçi etkileşimi sektör üzerinde",
      ],
    },
    recommendations: {
      low: [
        "Haftada 2 KVKK uyumlu önce/sonra içeriği planlı yayınlayın",
        "TikTok'ta prosedür süreci videoları yayınlayın",
        "Micro influencer (1K–50K) iş birliği programı başlatın",
        "Müşteri sadakat kampanyası için sosyal medya özel teklifleri oluşturun",
      ],
      mid: [
        "Renk paleti, yazı tipi ve kompozisyon kılavuzuyla feed estetiğini standartlaştırın",
        "Story'de haftalık anket veya soru-cevap formatını düzenli uygulayın",
      ],
      high: [
        "Makro influencer iş birlikleriyle marka bilinirliğini zirveye çıkarın",
        "UGC (kullanıcı içerikleri) kampanyasıyla organik büyümeyi katmanlandırın",
      ],
    },
    gain: {
      low: "Aktif içerik stratejisiyle organik erişim 3 ayda 5–10x artabilir.",
      mid: "Estetik + tutarlılık sağlandığında takipçiden müşteriye dönüşüm %40–60 yükselir.",
      high: "Mevcut kitleyle uygulanan sadakat stratejisi tekrar randevu oranını %30–50 artırır.",
    },
  },
  OTHER: {
    findings: {
      low: [
        "Sosyal medya varlığı zayıf veya pasif",
        "İçerik stratejisi tanımlanmamış",
        "Platform seçimi hedef kitleyle uyumsuz",
        "Markayı diğerlerinden ayıran içerik yok",
      ],
      mid: [
        "İçerik yayın sıklığı düzensiz",
        "Etkileşim artıracak formatlar (anket, soru, video) kullanılmıyor",
      ],
      high: [
        "Temel sosyal medya varlığı sürdürülüyor",
        "Marka kimliği tutarlı şekilde yansıtılıyor",
      ],
    },
    recommendations: {
      low: [
        "Hedef kitleye uygun platform(lar) seçin (Instagram / LinkedIn / TikTok)",
        "30 günlük içerik takvimi hazırlayıp uygulayın",
        "Rakip analizi ile sektörde öne çıkan içerik formatlarını tespit edin",
        "Marka kimliğini yansıtan görsel şablonlar hazırlayın",
      ],
      mid: [
        "Haftada en az 3 içerik yayınlamayı kural haline getirin",
        "Video ve carousel formatlarını test edin",
      ],
      high: [
        "Etkileşim verilerini analiz ederek en çok performans gösteren içerik tipini ölçeklendirin",
        "Topluluk oluşturma (grup, yorum yanıtlama) rutini oluşturun",
      ],
    },
    gain: {
      low: "Planlı sosyal medya varlığı marka bilinirliğini 6 ayda %150–300 artırabilir.",
      mid: "Tutarlı içerik + etkileşim stratejisi organik erişimi %60–100 büyütebilir.",
      high: "Mevcut kitle doğru beslenerek marka elçisi ağı oluşturulabilir.",
    },
  },
};

const OPS_ASSETS: Record<string, CategoryAssets> = {
  HEALTH: {
    findings: {
      low: [
        "Randevu yönetimi manuel veya tek kanal üzerinden yürütülüyor",
        "CRM sistemi yok — hasta takibi yapılamıyor",
        "Otomatik hatırlatma / geri kazanım akışları kurulmamış",
        "Pazarlama verileri ile klinik verileri entegre değil",
      ],
      mid: [
        "CRM kullanılıyor ancak pazarlama otomasyonuyla entegre değil",
        "Raporlama manuel süreçlerle yapılıyor",
      ],
      high: [
        "Temel otomasyon akışları çalışıyor",
        "Veri akışı büyük ölçüde otomatik",
      ],
    },
    recommendations: {
      low: [
        "Online randevu sistemi + otomatik SMS/e-posta hatırlatması kurun",
        "Hasta segmentasyonu yapabilen basit bir CRM seçin",
        "Randevu gelmeyen (no-show) hastalar için otomatik geri kazanım e-postası ayarlayın",
        "Google Analytics + CRM entegrasyonuyla reklam ROI'sini ölçün",
      ],
      mid: [
        "CRM'i Google Ads dönüşüm verileriyle bağlayın",
        "Haftalık otomatik performans raporu oluşturun",
      ],
      high: [
        "Yapay zeka destekli randevu optimizasyonu araçlarını araştırın",
        "Hasta yaşam boyu değeri hesaplamasını otomatize edin",
      ],
    },
    gain: {
      low: "Otomasyon altyapısı kurulursa no-show oranı %40–60 düşer, kapasiteden %25 daha fazla yararlanılır.",
      mid: "CRM + pazarlama entegrasyonu ile reklam ROI ölçümü netleşir, kayıplar önlenir.",
      high: "Mevcut otomasyon güçlendirilerek operasyonel verimlilik %30–40 artırılabilir.",
    },
  },
  TOURISM: {
    findings: {
      low: [
        "Rezervasyon kanalları merkezi değil — manuel takip yapılıyor",
        "Misafir memnuniyet anketi otomatik gönderilmiyor",
        "Yorum yönetimi (TripAdvisor, Google) pasif",
        "Kanal yöneticisi (channel manager) kullanılmıyor",
      ],
      mid: [
        "Kanal yöneticisi var ancak tüm platformlarla entegre değil",
        "Konuk e-posta listesi pazarlama için kullanılmıyor",
      ],
      high: [
        "Temel kanal yönetimi aktif",
        "Misafir iletişim otomasyonu çalışıyor",
      ],
    },
    recommendations: {
      low: [
        "Booking / Airbnb / kendi sitesi entegrasyonlu kanal yöneticisi kurun",
        "Check-out sonrası otomatik yorum talebi e-postası gönderin",
        "Misafir CRM'i oluşturup tekrar ziyaret kampanyaları başlatın",
        "Dinamik fiyatlandırma aracı entegre edin",
      ],
      mid: [
        "Tüm OTA kanallarını tek kanal yöneticisinde birleştirin",
        "Misafir listesini segmentlere ayırarak kişiselleştirilmiş teklifler gönderin",
      ],
      high: [
        "Yapay zeka fiyatlandırma ile doluluk oranını optimize edin",
        "Misafir deneyimi verilerinden yararlanarak hizmet geliştirin",
      ],
    },
    gain: {
      low: "Kanal yöneticisi kurulumu ile çift rezervasyon sıfırlanır, doluluk %15–30 artar.",
      mid: "Otomasyon + CRM ile tekrar ziyaret oranı %20–35 yükseltilebilir.",
      high: "Dinamik fiyatlandırma ile RevPAR %15–25 artırılabilir.",
    },
  },
  ECOMM: {
    findings: {
      low: [
        "Stok - sipariş - kargo entegrasyonu manuel yürütülüyor",
        "Terk edilen sepet otomasyonu kurulmamış",
        "Müşteri segmentasyonu ve e-posta otomasyonu yok",
        "İade süreci otomatize edilmemiş",
      ],
      mid: [
        "Temel e-posta otomasyonu var ancak segmentasyon eksik",
        "Sipariş karşılama akışı optimize edilmemiş",
      ],
      high: [
        "Temel e-ticaret otomasyonları aktif",
        "Stok ve sipariş yönetimi entegre",
      ],
    },
    recommendations: {
      low: [
        "ERP / WMS entegrasyonuyla stok - sipariş akışını otomatize edin",
        "Sepet terk e-postası serisi (1s, 24s, 72s) kurun",
        "RFM analizi ile müşteri segmentasyonu yapın",
        "İade ve değişim sürecini self-servis portala taşıyın",
      ],
      mid: [
        "Segmentlere göre kişiselleştirilmiş e-posta kampanyaları oluşturun",
        "Sipariş karşılama süresini SLA'larla standartlaştırın",
      ],
      high: [
        "Kişiselleştirilmiş ürün öneri algoritması entegre edin",
        "Müşteri yaşam boyu değeri modellemesini otomatize edin",
      ],
    },
    gain: {
      low: "Sepet terk otomasyonu aktif edildiğinde gelir %15–25 artabilir.",
      mid: "Otomasyon + segmentasyon ile e-posta geliri toplam cirosun %20–30'una ulaşabilir.",
      high: "Mevcut otomasyon güçlendirilerek operasyonel maliyet %20–35 düşürülebilir.",
    },
  },
  SERVICE: {
    findings: {
      low: [
        "Lead yönetim sistemi (CRM) yok — fırsatlar kaçıyor",
        "Teklif - sözleşme - fatura süreci manuel",
        "Müşteri onboarding otomasyonu yok",
        "Proje takibi spreadsheet ile yapılıyor",
      ],
      mid: [
        "Temel CRM kullanılıyor ancak satış hattı görünür değil",
        "Müşteri raporlaması manuel hazırlanıyor",
      ],
      high: [
        "CRM + proje yönetim araçları entegre çalışıyor",
        "Temel otomasyon akışları aktif",
      ],
    },
    recommendations: {
      low: [
        "HubSpot / Pipedrive gibi bir CRM ile tüm leadleri kayıt altına alın",
        "Teklif ve sözleşme sürecini dijital imza aracıyla otomatize edin",
        "Müşteri onboarding e-posta serisi oluşturun",
        "Proje yönetim aracı (Notion, Asana) ile ekip görünürlüğü sağlayın",
      ],
      mid: [
        "CRM'de satış hattı aşamalarını tanımlayın ve lead izleyin",
        "Aylık müşteri raporunu otomatik hazırlayan dashboard oluşturun",
      ],
      high: [
        "Müşteri memnuniyeti ölçen NPS otomasyonu kurun",
        "Cross-sell / upsell fırsatlarını CRM ile otomatik tespit edin",
      ],
    },
    gain: {
      low: "CRM kurulumu ile lead kaybı %40–60 azalır, kapanış oranı %20–35 artar.",
      mid: "Otomasyon + raporlama ile satış döngüsü %25–40 kısalır.",
      high: "Mevcut sistem güçlendirilerek müşteri başına gelir %20–30 artırılabilir.",
    },
  },
  BEAUTY: {
    findings: {
      low: [
        "Randevu yönetimi telefon / mesaj ile manuel yapılıyor",
        "Müşteri takip sistemi (geçmiş prosedürler, tercihler) yok",
        "Otomatik hatırlatma ve no-show azaltma sistemi kurulmamış",
        "Müşteri sadakat programı dijital platforma taşınmamış",
      ],
      mid: [
        "Online randevu var ancak CRM'le entegre değil",
        "Raporlama Manuel yapılıyor",
      ],
      high: [
        "Online randevu + temel CRM entegre çalışıyor",
        "Hatırlatma otomasyonu aktif",
      ],
    },
    recommendations: {
      low: [
        "Simplybook / Fresha gibi bir randevu yönetim platformu kurun",
        "Müşteri prosedür geçmişini kayıt altına alan basit CRM seçin",
        "Randevu öncesi 24s ve 2s SMS/WhatsApp hatırlatması otomatize edin",
        "Dijital sadakat kartı / puan sistemi başlatın",
      ],
      mid: [
        "Randevu platformunu CRM ile entegre edin",
        "Haftalık doluluk oranı + gelir raporunu otomatik oluşturun",
      ],
      high: [
        "Yapay zeka öneri motoru ile müşteriye kişiselleştirilmiş hizmet önerileri gösterin",
        "WhatsApp Business API ile tam otomatik hatırlatma + geri kazanım akışı kurun",
      ],
    },
    gain: {
      low: "Randevu otomasyonu ile no-show oranı %50–70 düşer, aylık gelir %20–35 artar.",
      mid: "CRM + otomasyon entegrasyonu tekrar randevu oranını %30–45 yükseltir.",
      high: "Mevcut sistem güçlendirilerek kişiselleştirilmiş deneyim müşteri değerini %25–40 artırır.",
    },
  },
  OTHER: {
    findings: {
      low: [
        "Dijital operasyon araçları kullanılmıyor",
        "Veri toplama ve analiz altyapısı yok",
        "Manuel süreçler ekip kapasitesini tüketiyor",
        "Müşteri yönetimi sistematik değil",
      ],
      mid: [
        "Bazı araçlar kullanılıyor ancak birbirleriyle entegre değil",
        "Raporlama manuel ve zaman alıcı",
      ],
      high: [
        "Temel dijital araçlar entegre çalışıyor",
        "Raporlama büyük ölçüde otomatik",
      ],
    },
    recommendations: {
      low: [
        "İş süreçlerinizi haritalayarak hangi adımları otomatize edebileceğinizi belirleyin",
        "CRM + e-posta pazarlama aracı ile müşteri verilerini merkeze alın",
        "Google Analytics ile web ve kampanya verilerini takip etmeye başlayın",
        "Ekip iletişim ve proje yönetimini tek platformda birleştirin",
      ],
      mid: [
        "Kullandığınız araçlar arasında Zapier / Make.com entegrasyonu kurun",
        "Haftalık performans dashboard'u oluşturun",
      ],
      high: [
        "Otomasyon yatırım getirisini ölçün ve en verimli akışları önceliklendirin",
        "Yapay zeka araçlarını iş süreçlerine entegre etmeye başlayın",
      ],
    },
    gain: {
      low: "Dijital otomasyon altyapısı kurulursa ekip kapasitesi %30–50 artabilir.",
      mid: "Entegrasyon çalışmalarıyla haftalık 5–10 saat operasyonel tasarruf sağlanabilir.",
      high: "Mevcut sistem optimize edilerek operasyonel maliyet %20–35 düşürülebilir.",
    },
  },
};

/* ─────────────────────────────────────────────────────────────────────────────
   YARDIMCI FONKSİYONLAR
   ───────────────────────────────────────────────────────────────────────────── */

function pickLevel(score: number): "low" | "mid" | "high" {
  if (score < 40) return "low";
  if (score < 65) return "mid";
  return "high";
}

function getAssets(
  map: Record<string, CategoryAssets>,
  sectorKey: string,
  score: number,
) {
  const assets = map[sectorKey] ?? map.OTHER;
  const level = pickLevel(score);
  return {
    findings: assets.findings[level].map((f) => `[Tahmini] ${f}`),
    recommendations: assets.recommendations[level],
    gain: assets.gain[level],
  };
}

function computeSeoScore(data: AnalysisData): number {
  // PageSpeed verisi varsa kullan
  let base = data.seo.score ?? 0; // null ise veri yok

  // Search Console CTR katkısı
  if (data.searchConsoleData) {
    const sc = data.searchConsoleData;
    // CTR > %3 → iyi, avgPosition < 10 → iyi
    const ctrBonus = Math.min(sc.avgCtr * 3, 15); // maks +15
    const posBonus = sc.avgPosition > 0 && sc.avgPosition <= 10 ? 10 : sc.avgPosition <= 20 ? 5 : 0;
    if (base > 0) {
      base = Math.round(base * 0.7 + (ctrBonus + posBonus + 20) * 0.3);
    } else {
      base = Math.round(ctrBonus + posBonus + 25);
    }
  }

  if (base === 0) return 0; // Henüz veri yok — çağıranın fallback kullanması lazım
  return Math.min(Math.max(base, 5), 100);
}

function getDefaultTechStack(sectorKey: string): string[] {
  const stacks: Record<string, string[]> = {
    HEALTH: ["WordPress", "Google Analytics 4", "WhatsApp Business"],
    TOURISM: ["Booking Engine", "Channel Manager", "Google Analytics 4"],
    ECOMM: ["Shopify / WooCommerce", "Google Analytics 4", "Meta Pixel"],
    SERVICE: ["WordPress / Webflow", "HubSpot CRM", "Google Analytics 4"],
    BEAUTY: ["Instagram", "WhatsApp Business", "Google Analytics 4"],
    OTHER: ["Web Sitesi CMS", "Google Analytics 4"],
  };
  return stacks[sectorKey] ?? stacks.OTHER;
}

function getAutomationGaps(score: number): string[] {
  if (score < 35) {
    return [
      "CRM ve müşteri takip sistemi",
      "E-posta / SMS pazarlama otomasyonu",
      "Dönüşüm takibi ve reklam entegrasyonu",
      "Raporlama dashboard'u",
    ];
  }
  if (score < 60) {
    return [
      "Pazarlama verisi ile CRM entegrasyonu",
      "Otomatik müşteri segmentasyonu",
      "Raporlama otomasyonu",
    ];
  }
  return [
    "Yapay zeka destekli kişiselleştirme",
    "Cross-channel otomasyon optimizasyonu",
  ];
}

function buildRiskMatrix(
  seoScore: number,
  ppcScore: number | null,
  socialScore: number | null,
  opsScore: number,
  sectorKey: string,
): AnalysisData["topIssues"] {
  const issues: AnalysisData["topIssues"] = [];

  if (seoScore < 40) {
    issues.push({
      issue: "Organik arama görünürlüğü kritik seviyede düşük",
      risk: "Rakipler tüm hedef aramalarda önde — organik trafik kaybı",
      estimatedLoss: "Aylık potansiyel trafiğin %60–80'i kaçırılıyor",
    });
  } else if (seoScore < 60) {
    issues.push({
      issue: "SEO performansı sektör ortalamasının altında",
      risk: "Rakiplere kıyasla organik arama pozisyonu zayıf",
      estimatedLoss: "Aylık potansiyel trafiğin %30–50'si kaçırılıyor",
    });
  }

  if (ppcScore === null || ppcScore < 40) {
    issues.push({
      issue: "Ücretli reklam altyapısı yok veya yetersiz",
      risk: "Rakipler reklamlarda tam görünürlük alırken marka görünmüyor",
      estimatedLoss: "Hazır müşteri talebinin %50–70'i rakiplere akıyor",
    });
  }

  if (socialScore === null || socialScore < 45) {
    issues.push({
      issue: "Sosyal medya varlığı zayıf — marka bilinirliği düşük",
      risk: "Hedef kitle marka ile etkileşime giremiyor",
      estimatedLoss: "Organik sosyal kaynaktan potansiyel müşteri kaybı",
    });
  }

  if (opsScore < 40) {
    issues.push({
      issue: "Dijital operasyon altyapısı kurulmamış",
      risk: "Müşteri verisi izlenemiyor, fırsatlar kayıt altına alınamıyor",
      estimatedLoss: "Potansiyel müşterilerin %30–50'si takipsiz kayboluyor",
    });
  }

  // Sektöre özel ek risk
  if (sectorKey === "HEALTH" && seoScore < 55) {
    issues.push({
      issue: "Sağlık sektörü E-E-A-T uyumu eksik",
      risk: "Google YMYL kategorisinde güven skoru düşük — sıralama kaybı riski",
      estimatedLoss: "Organik hasta trafiğinde sürekli erozyon",
    });
  }
  if (sectorKey === "ECOMM" && opsScore < 50) {
    issues.push({
      issue: "Sepet terk otomasyonu yok",
      risk: "Satın almadan vazgeçen kullanıcılar geri kazanılamıyor",
      estimatedLoss: "Terk edilen sepetlerin %70'i kalıcı kayıp",
    });
  }

  return issues.slice(0, 4); // maks 4 risk satırı
}

function buildExecutiveSummary(
  clientName: string,
  overallScore: number,
  sectorKey: string,
  benchmark: SectorBenchmark,
): string {
  const sectorNames: Record<string, string> = {
    HEALTH: "sağlık",
    TOURISM: "turizm",
    ECOMM: "e-ticaret",
    SERVICE: "hizmet",
    BEAUTY: "estetik & güzellik",
    OTHER: "sektörünüzde",
  };
  const sectorName = sectorNames[sectorKey] ?? "sektörünüzde";
  const comparison = overallScore >= benchmark.overall
    ? `sektör ortalaması (${benchmark.overall}) üzerinde`
    : `sektör ortalamasının (${benchmark.overall}) altında`;

  if (overallScore < 35) {
    return `${clientName} için gerçekleştirilen dijital analiz, ${sectorName} sektöründeki mevcut dijital varlığın acil müdahale gerektirdiğini ortaya koymaktadır. Genel skor ${overallScore}/100 ile ${comparison} seyretmekte; SEO altyapısı, reklam yönetimi ve dijital operasyon alanlarında kritik eksiklikler tespit edilmiştir. Doğru strateji ve uygulama ile 90 gün içinde kayda değer iyileşme sağlanabilir.`;
  }
  if (overallScore < 55) {
    return `${clientName} için gerçekleştirilen kapsamlı dijital analiz, ${sectorName} sektöründeki dijital varlığın ${comparison} olduğunu göstermektedir. Genel skor ${overallScore}/100 ile temel ihtiyaçlar karşılanıyor olsa da, rakiplerle fark kapatmak ve büyüme potansiyelini açığa çıkarmak için stratejik iyileştirmelere ihtiyaç duyulmaktadır.`;
  }
  return `${clientName} için gerçekleştirilen dijital analiz, ${sectorName} sektöründe ${comparison} bir dijital varlık ortaya koymaktadır. Genel skor ${overallScore}/100 olumlu bir tablo çizse de, sürdürülebilir büyüme için belirli alanlarda derinleşme ve optimizasyon çalışmaları kritik önem taşımaktadır.`;
}

/* ─────────────────────────────────────────────────────────────────────────────
   ANA FONKSİYON — calculateScoredAnalysis
   ───────────────────────────────────────────────────────────────────────────── */

export function calculateScoredAnalysis(
  data: AnalysisData,
  sectorKey: string,
): AnalysisData {
  const benchmark = SECTOR_BENCHMARKS[sectorKey] ?? SECTOR_BENCHMARKS.OTHER;

  // ── Skor hesaplama ──────────────────────────────────────────────────────────

  // SEO: PageSpeed verisi varsa gerçek, yoksa benchmark'ın %70'i
  const rawSeoScore = computeSeoScore(data);
  const seoScore = rawSeoScore > 0 ? rawSeoScore : Math.round(benchmark.seo * 0.7);

  // PPC: Google Ads erişimi varsa skor hesapla, yoksa null (veri yok)
  const hasAdsAccess = (data.adAccess ?? []).includes("google_ads");
  const ppcScore: number | null = hasAdsAccess
    ? Math.round(benchmark.ppc * 0.85)
    : null;

  // Sosyal: platform sayısına göre — platform girilmediyse null (veri yok)
  const platformCount = (data.socialPlatforms ?? []).length;
  const socialScore: number | null = platformCount > 0
    ? Math.round((Math.min(20 + platformCount * 14, 80) + benchmark.social * 0.4) / 1.4)
    : null;

  // Operasyon: SC + GA4 erişimi varsa daha iyi başla (bağlanan hesaplar gerçek veri)
  const hasAnalyticsAccess = (data.adAccess ?? []).some((a) =>
    ["ga4", "search_console"].includes(a),
  );
  const opsScore = hasAnalyticsAccess
    ? Math.round(benchmark.operations * 0.75)
    : Math.round(benchmark.operations * 0.55);

  // Genel skor: sadece null olmayan skorların ortalaması
  const scoresToAvg = [seoScore, ppcScore, socialScore, opsScore].filter((s): s is number => s !== null);
  const overallScore = scoresToAvg.length > 0
    ? Math.round(scoresToAvg.reduce((a, b) => a + b, 0) / scoresToAvg.length)
    : 0;

  // ── Bulgular ────────────────────────────────────────────────────────────────
  const seoAssets = getAssets(SEO_ASSETS, sectorKey, seoScore);
  // Null skorlar için bulgu seçiminde fallback kullan
  const ppcFindingScore = ppcScore ?? Math.round(benchmark.ppc * 0.65);
  const socialFindingScore = socialScore ?? 20;
  const ppcAssets = getAssets(PPC_ASSETS, sectorKey, ppcFindingScore);
  const socialAssets = getAssets(SOCIAL_ASSETS, sectorKey, socialFindingScore);
  const opsAssets = getAssets(OPS_ASSETS, sectorKey, opsScore);

  // SC verisi varsa SEO bulgularına gerçek veri olarak ekle
  const seoFindings = [...seoAssets.findings];
  if (data.searchConsoleData) {
    const sc = data.searchConsoleData;
    if (sc.avgPosition > 20) seoFindings.unshift(`[Search Console] Ortalama arama pozisyonu #${sc.avgPosition.toFixed(1)} — ilk sayfada yok`);
    else if (sc.avgPosition > 10) seoFindings.unshift(`[Search Console] Ortalama arama pozisyonu #${sc.avgPosition.toFixed(1)} — 2. sayfada`);
    if (sc.avgCtr < 2) seoFindings.push(`[Search Console] Tıklama oranı %${sc.avgCtr.toFixed(1)} — sektör ortalamasının altında`);
  }

  // PageSpeed verisi varsa SEO bulgularına ekle
  if (data.seo.pageSpeed !== null && data.seo.pageSpeed !== undefined && data.seo.pageSpeed > 0) {
    const lcpSec = (data.seo.pageSpeed / 1000).toFixed(1);
    const lcpLabel = data.seo.pageSpeed <= 2500 ? "iyi seviyede" : data.seo.pageSpeed <= 4000 ? "iyileştirme gerekiyor" : "kritik — kullanıcı kaybına yol açıyor";
    seoFindings.unshift(`[PageSpeed] Sayfa yükleme ${lcpSec}s — ${lcpLabel}`);
  }

  // GA4 verisi varsa genel özete ekle
  let ga4Note = "";
  if (data.ga4Data) {
    const ga4 = data.ga4Data;
    if (ga4.bounceRate > 60) ga4Note = ` [GA4] Hemen çıkma oranı %${ga4.bounceRate.toFixed(0)} ile yüksek — sayfa içi deneyim iyileştirilmeli.`;
  }

  // ── Risk matrisi ────────────────────────────────────────────────────────────
  const topIssues = buildRiskMatrix(seoScore, ppcScore, socialScore, opsScore, sectorKey);

  // ── pageSpeed / mobileScore — null kalsın eğer veri yoksa ──────────────────
  const pageSpeedMs = (data.seo.pageSpeed != null && data.seo.pageSpeed > 0) ? data.seo.pageSpeed : null;
  const mobileScoreVal = (data.seo.mobileScore != null && data.seo.mobileScore > 0) ? data.seo.mobileScore : null;

  return {
    ...data,
    overallScore,
    generalScore: overallScore,
    scoreLabel:
      overallScore >= 70 ? "İyi" : overallScore >= 50 ? "Geliştirilmeli" : "Kritik",
    executiveSummary:
      buildExecutiveSummary(data.clientName, overallScore, sectorKey, benchmark) + ga4Note,
    topIssues,
    seo: {
      score: seoScore,
      pageSpeed: pageSpeedMs,
      mobileScore: mobileScoreVal,
      technicalErrors: data.seo.technicalErrors || Math.max(Math.round((100 - seoScore) / 25), 1),
      findings: seoFindings.slice(0, 4),
      recommendations: seoAssets.recommendations.slice(0, 4),
      gain: seoAssets.gain,
    },
    ppc: {
      score: ppcScore,
      competitorSpend: getPpcCompetitorSpend(sectorKey),
      qualityScore: ppcScore !== null ? Math.max(Math.round(ppcScore / 12), 1) : null,
      findings: ppcAssets.findings.slice(0, 4),
      recommendations: ppcAssets.recommendations.slice(0, 4),
      gain: ppcAssets.gain,
    },
    social: {
      score: socialScore,
      engagementRate: socialScore !== null ? `%${(0.8 + platformCount * 0.4).toFixed(1)}` : "",
      consistencyScore: socialScore !== null ? Math.min(socialScore + 8, 100) : null,
      findings: socialAssets.findings.slice(0, 4),
      recommendations: socialAssets.recommendations.slice(0, 4),
      gain: socialAssets.gain,
    },
    operations: {
      score: opsScore,
      techStack: getDefaultTechStack(sectorKey),
      automationGaps: getAutomationGaps(opsScore),
      findings: opsAssets.findings.slice(0, 4),
      recommendations: opsAssets.recommendations.slice(0, 4),
      gain: opsAssets.gain,
    },
    sectorBenchmark: benchmark,
  };
}

function getPpcCompetitorSpend(sectorKey: string): string {
  const spends: Record<string, string> = {
    HEALTH: "₺45.000–₺120.000/ay",
    TOURISM: "₺60.000–₺200.000/ay",
    ECOMM: "₺80.000–₺500.000/ay",
    SERVICE: "₺30.000–₺90.000/ay",
    BEAUTY: "₺20.000–₺60.000/ay",
    OTHER: "₺25.000–₺80.000/ay",
  };
  return spends[sectorKey] ?? spends.OTHER;
}

/* ─────────────────────────────────────────────────────────────────────────────
   EXPORT — getSectorFindings (harici kullanım için)
   ───────────────────────────────────────────────────────────────────────────── */

export function getSectorFindings(
  sectorKey: string,
  category: "seo" | "ppc" | "social" | "operations",
  score: number,
): { findings: string[]; recommendations: string[]; gain: string } {
  const map =
    category === "seo"
      ? SEO_ASSETS
      : category === "ppc"
        ? PPC_ASSETS
        : category === "social"
          ? SOCIAL_ASSETS
          : OPS_ASSETS;
  return getAssets(map, sectorKey, score);
}
