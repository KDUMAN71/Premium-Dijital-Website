# Premium Dijital — Claude Çalışma Kılavuzu

> Bu dosya Claude Code oturumlarında bağlamı korumak için kullanılır.
> Her oturumda önce bu dosyayı oku, sonra çalışmaya başla.

---

## Proje Kimliği

- **Ajans:** Premium Dijital Reklam Ajansı — premiumdijital.com
- **Direktör:** Kerim Duman
- **GitHub:** github.com/KDUMAN71/Premium-Dijital-Website
- **Staging:** premium-dijital-website.vercel.app
- **Stack:** Next.js 14+, Tailwind v4 (`@theme` direktifi), Framer Motion, Vercel
- **Paket yöneticisi:** npm

---

## Temel Kurallar — Asla İhlal Etme

1. **Minimum müdahale** — Sadece üzerinde anlaşılan değişiklikleri yap. Onay verilmemiş hiçbir dosyaya dokunma.
2. **Kod mimarisi** — Her bileşen kendi sorumluluğunu taşır. Wrapper sadece sarıcı olur, içerik taşımaz.
3. **UI/UX + kodlama prensipleri** — Her değişiklikte güncel best practice'e uygunluğu otomatik kontrol et. Sormana gerek bırakma.
4. **Türkçe copy** — İngilizce teknik terim kabul edilebilir ama cümle yapısı Türkçe olmalı.
5. **Dosya teslimi** — Değişiklikler doğrudan repo dosyalarına uygulanır.

---

## Brand Sistemi

```
Renkler:
  --color-brand-purple: #be29ec
  --color-brand-blue:   #0000c8
  --color-brand-dark:   #050505
  --gradient-brand:     linear-gradient(90deg, #be29ec, #0000c8)

Font: Tailwind v4 varsayılan stack
Gradient yönü: soldan sağa (purple → blue) veya 90/135deg
```

globals.css'te `@theme` direktifi ile tanımlı — `bg-brand-dark`, `text-brand-blue` gibi utility'ler kullanılabilir.

---

## Dosya Yapısı

```
app/
  (marketing)/
    layout.tsx          ← NavWrapper kaldırıldı, doğrudan <MarketingNav />
    page.tsx            ← Anasayfa bileşen sırası burada
    template.tsx        ← Sayfa geçiş animasyonu

components/
  layout/
    MarketingNav.tsx    ← Tek <header> kaynağı — logo, nav, dropdown, CTA, scroll efekti
    NavWrapper.tsx      ← KULLANILMIYOR — silinebilir
  sections/
    hero/
      Hero.tsx          ← 2 satır başlık, brand gradient, shrink-0 fix
      CompassVisual.tsx ← Kaos/kalibre animasyonu
    GrowthEcosystem.tsx ← 4 pillar sistem, ConnectorCanvas, auto-tour
    ProcessRoadmap.tsx  ← Orijinal versiyon geçerli (ProcessRoadmapAlt denendi, reddedildi)
    AnalysisForm.tsx    ← 3 adımlı multi-step form
    IcebergVisual.tsx   ← Web sitesi sayfası hero görseli
    case-studies/
      CaseStudiesSection.tsx  ← Featured + 3 kompakt kart
      case-study-data.ts      ← 6 vaka, homeCaseStudies slug bazlı seçim
    faq/
      FAQSection.tsx    ← Animasyonlu accordion, ilk 4 görünür, genişlet/daralt
      faq-data.ts       ← 11 soru, 4 küme
  global/
    WhatsAppCTAGlass.tsx
    SocialSidebar.tsx

lib/
  validations/
    analysis.ts         ← Zod schema — sector, goal, otherSector, phone opsiyonel

app/(marketing)/_actions/
  analysis.ts           ← Server action — rate limit, honeypot, Resend entegrasyonu
```

---

## Tamamlanan Bileşenler

| Bileşen | Durum | Notlar |
|---------|-------|--------|
| MarketingNav.tsx | ✅ | Self-contained header, scroll efekti, dropdown, mobil |
| layout.tsx | ✅ | Sadece `<MarketingNav />` — NavWrapper kaldırıldı |
| Hero.tsx | ✅ | 2 satır başlık, brand gradient, CompassVisual |
| CompassVisual.tsx | ✅ | Kaos/kalibre animasyonu, canvas |
| GrowthEcosystem.tsx | ✅ | 4 pillar, ConnectorCanvas, auto-tour, AI entegre |
| ProcessRoadmap.tsx | ✅ | Orijinal — sol liste + sağ sticky panel |
| AnalysisForm.tsx | ✅ | 3 adım: sektör → hedef → iletişim, https:// prefix |
| analysis.ts (validation) | ✅ | otherSector, yeni enum'lar |
| analysis.ts (action) | ✅ | Resend, rate limit, enum whitelist, HTML email |
| CaseStudiesSection.tsx | ✅ | Featured + kompakt, AnimatedMetric, ghost chart |
| case-study-data.ts | ✅ | 6 vaka, secondaryMetrics, insight, homeCaseStudies |
| FAQSection.tsx | ✅ | Accordion, ilk 4 görünür, sticky daralt butonu |
| faq-data.ts | ✅ | 11 soru, conversion odaklı, Looker Studio referansı |

---

## Önemli Kararlar ve Gerekçeleri

### Navigasyon
- `MarketingNav` kendi `<header>`'ını yönetir — wrapper anti-pattern
- Menü linkleri: Anasayfa / Çözümler (dropdown) / Hakkımızda / Sonuçlar / Blog
- "Hizmetler" → **"Çözümler"**, "Vaka Çalışmaları" → **"Sonuçlar"**
- URL yapısı: `/cozumler`, `/hizmetler/[slug]`, `/sonuclar`, `/sonuclar/[slug]`

### Hizmet Alanları (4 ana alan)
1. PPC & Performans Pazarlama → `/hizmetler/ppc-performans-pazarlama`
2. Web Sitesi, SEO & Dönüşüm → `/hizmetler/web-seo-donusum`
3. Marka & Görsel İletişim → `/hizmetler/marka-gorsel-iletisim`
4. Dijital Operasyon Sistemi → `/hizmetler/dijital-operasyon-sistemi`

### CaseStudies — Anasayfa Seçimi
Slug sırası (her biri farklı hizmet alanını temsil eder):
1. `saglik-turizmi-hasta-edinimi` — PPC & Performans (featured)
2. `lokal-seo-harita-dominasyonu` — SEO & Dönüşüm
3. `kurumsal-kimlik-marka-donusumu` — Marka & İletişim
4. `b2b-sanayi-lead-mimarisi` — Dijital Operasyon

### AnalysisForm
- E-posta zorunlu, telefon opsiyonel
- Website alanı: `https://` prefix sabit, kullanıcı sadece domain yazar
- "Diğer" sektör seçilince textarea açılır
- Yanıt süresi: **1 iş günü** (4 saat değil)
- `onSubmitAction` prop ile inject edilebilir — farklı sayfalarda reusable

### ProcessRoadmap
- `ProcessRoadmapAlt` denendi, hover sorunları çözülemedi, **reddedildi**
- Orijinal `ProcessRoadmap.tsx` geçerli
- `overflow-hidden` section'dan kaldırıldı (sticky sorununu çözüyor)

### Kod Kalitesi Kuralları
- `"use client"` sadece gerçekten gerektiğinde
- `useReducedMotion` tüm animasyonlarda zorunlu
- JSON-LD schema kritik bölümlerde (FAQ, CaseStudies, ProcessRoadmap)
- Görsel kontrast minimum: `text-white/60` — daha düşük opacity kullanma
- Her bileşende `aria-label`, `itemScope`, `itemProp` SEO attribute'ları

---

## .env.local Değişkenleri

```env
RESEND_API_KEY=re_...
RESEND_FROM=noreply@premiumdijital.com
RESEND_TO=kerim@premiumdijital.com   # virgülle ayrılmış çoklu alıcı desteklenir
```

---

## Bekleyen İşler (Sıradaki)

### Yüksek Öncelik
- [ ] **Anasayfa görsel iyileştirme** — Bölümler arası boşluk, section renk tonu farklılaştırması, trust strip rakamları güçlendirme
- [ ] **GrowthEcosystem animasyonu** — 4 pillar'ı bağlayan sistem akış animasyonu
- [ ] **Hero sonrası sıralama** — LogoCloud ve Trust Strip zayıf, en güçlü sosyal kanıt öne çıkarılmalı

### Orta Öncelik
- [ ] **Hizmet sayfaları** — 4 ana hizmet alanı detay sayfaları (`ServicePageTemplate` kullanılacak)
- [ ] **Sonuçlar sayfası** — `/sonuclar` listing sayfası, tüm 6 vaka
- [ ] **Vaka detay sayfaları** — `/sonuclar/[slug]`
- [ ] **Dijital Operasyon Sistemi** — yeni hizmet, detay sayfası

### Otomasyon
- [ ] **Google Drive otomasyon** — Form doldurulunca Google Docs analiz dokümanı otomatik oluşsun (Make.com veya Apps Script, bir kez kurulacak)
- [ ] **Analiz dokümanı template** — Google Docs formatında

### Uzun Vade
- [ ] Fiyatlandırma sayfası — iki katmanlı: KOBİ giriş + sistem kurulum
- [ ] Blog altyapısı
- [ ] Mobil audit — GrowthEcosystem ve ProcessRoadmap kritik
- [ ] Core Web Vitals optimizasyonu — dynamic import, lazy load

---

## Hedef Sektörler

**Öncelikli:** Sağlık & Klinik, Turizm & Konaklama, Estetik & Güzellik
**İkincil:** E-Ticaret, B2B Hizmet & Danışmanlık, Yerel Hizmet

Sağlık sektöründe: yasal uyumluluk ve içerik onayı müşteriye ait — ajans dijital kanalları yönetir, içerik sorumluluğu almaz.

---

## Stratejik Konumlandırma

**USP:** "Dijital hizmet değil, dijital sistem. Analiz ederiz, kurarız, ölçeriz."
**Mesaj:** Söz değil, veri. Rakipten değil, müşteriden öğren.
**Hedef:** Türkiye'de sağlık & turizm sektöründe lider dijital büyüme ajansı

---

## Claude Code'da Çalışma Talimatları

1. Bu dosyayı her oturumda önce oku
2. Değişiklik yapmadan önce ilgili dosyayı oku
3. Minimum müdahale kuralına uy — sadece istenen değişikliği yap
4. Her değişiklikte UI/UX + kod mimarisi + SEO crosscheck yap
5. Türkçe copy'de teknik terim dışında İngilizce kullanma
6. Tamamlanan işleri bu dosyada güncelle
7. Yeni kararları "Önemli Kararlar" bölümüne ekle
