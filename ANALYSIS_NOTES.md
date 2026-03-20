# Anasayfa Tasarım Analizi — GitHub vs Lokal

> Tarih: 2026-03-16
> Kaynak: `git show origin/main` karşılaştırması, tüm component dosyaları okunarak yapıldı.
> Amaç: Hangi değişiklikler sorun yaratıyor, hangileri korunmalı — koda dayalı tespit.

---

## Bölüm Düzeni Farkı

| Sıra | GitHub (origin/main)          | Lokal                         |
|------|-------------------------------|-------------------------------|
| 1    | Hero                          | Hero                          |
| 2    | **LogoCloud**                 | **Trust Strip (sayısal)**     |
| 3    | **Trust Strip (rozet pilleri)**| **LogoCloud**                |
| 4    | GrowthEcosystem               | GrowthEcosystem               |
| 5    | ProcessRoadmap                | ProcessRoadmap                |
| 6    | CaseStudiesSection            | CaseStudiesSection            |
| 7    | AnalysisForm                  | AnalysisForm                  |
| 8    | FAQSection                    | FAQSection                    |
| 9    | Contact CTA                   | Contact CTA                   |

---

## GitHub Versiyonu — İyi Yönler (gerçek kod değerleriyle)

### 1. LogoCloud — Bol nefes alanı
```
py-28          → LogoCloud'un toplam dikey padding'i
mb-24          → Logo bandı ile içerik arasındaki boşluk
text-[13px]    → Label yazı boyutu
tracking-[0.5em] → Geniş harf aralığı (premium his)
text-white/80  → Yüksek kontrast label
font-black italic → Güçlü tipografik karakter
```
Sonuç: LogoCloud bir "nefes noktası" gibi çalışıyor. Hero'nun yoğunluğunu sonraki içerik bölümüne yumuşak geçişle bağlıyor.

### 2. Trust Strip — Minimal ve net
```tsx
// GitHub Trust Strip — 4 basit rozet:
<div>GA4 + GTM</div>
<div>Core Web Vitals</div>
<div>Google Ads</div>
<div>SEO + CRO</div>
// px-4 py-6 sm:py-8 md:py-10 — yeterli nefes
// LogoCloud'un ARDINDAN geliyor — önce logo credibility, sonra teknik güvence
```
Hero → Logo → Trust Strip sırası: "Kim olduğumuzu göster, ardından ne kullandığımızı söyle." Anlatı mantığı temiz.

### 3. FAQSection — Daha zengin UX
GitHub FAQSection'ın teknik üstünlükleri:
- **AnimatePresence + height: 0 → auto** animasyonu (JS state ile kontrollü)
- **Her cevabın içinde CTA buton** (`ctaHref`, `ctaLabel` props)
- **Alt "Cevabını bulamadın mı?"** + gradient CTA bloğu
- **Centered layout** (`max-w-3xl`, `text-center` başlık)
- **Gradient text accent** (`backgroundImage: "linear-gradient(90deg,#be29ec,#0000c8)"`)
- **"Sık Sorulanlar" sub-label** (küçük üst badge)
- **Alt CTA subtitle** hardcoded: `"Karar vermeden önce en çok sorulan sorular."`

---

## Lokal Versiyon — Tespit Edilen Sorunlar (kodla doğrulandı)

### SORUN 1 — LogoCloud spacing: %57 küçülme (yüksek öncelik)
```
GitHub:  py-28  → 112px dikey padding
Lokal:   py-12 sm:py-14  → 48px → 56px

GitHub:  mb-24  → 96px logo-metin arası
Lokal:   mb-8 sm:mb-10  → 32px → 40px

GitHub:  text-[13px] tracking-[0.5em] text-white/80 font-black italic
Lokal:   text-[11px] tracking-[0.18em] text-white/50 font-bold
```
**Etki**: LogoCloud artık hızla geçilen bir "teknik blok" gibi görünüyor. Nefes alanı ve tipografik ağırlık dramatik biçimde azaltılmış. Bu, bölümler arası ritim bozukluğunun ana kaynağı.

### SORUN 2 — Trust Strip → LogoCloud sırası tersine döndü (orta öncelik)
```
GitHub sırası: Hero → LogoCloud → Trust Strip
Lokal sırası:  Hero → Trust Strip → LogoCloud
```
**Etki**: Lokal'da Trust Strip Hero'dan hemen sonra geliyor. Trust Strip'in iç yapısı GitHub'a göre çok daha karmaşık (sol label sütunu + 4 sayısal metrik + renk kodlama + glow efekti + backdrop-blur). Bu yoğunluk Hero'nun hemen ardından fazla.

**Öte yandan**: Lokal Trust Strip'in **içeriği** çok daha güçlü (aşağıya bakın — korunacak yönler). Sorun içerik değil pozisyon ve yapı.

### SORUN 3 — FAQSection tasarım simplifikasyonu (orta öncelik)
```
GitHub:  JS state + AnimatePresence + her accordion içinde CTA + alt CTA
         max-w-3xl, centered başlık, gradient accent, sub-label, subtitle hardcoded

Lokal:   <details> HTML native, useInView animasyon
         max-w-4xl, left-aligned başlık, solid color accent
         showCta/ctaLabel/ctaHref prop'ları var ama anasayfada kullanılmıyor
         Alt CTA bloğu yok
```
**Etki**: Anasayfada CTA'ya tek yol AnalysisForm. FAQSection alt CTA'sı kaldırılınca SSS sonrası kullanıcının aksiyona geçmesi için bir tetikleyici kalmıyor.

---

## Kullanıcı Gözlemleri — Koda Karşılaştırma

### "GrowthEcosystem kartları çok yoğun" → KISMEN YANLIŞ
```
GitHub GrowthEcosystem = Lokal GrowthEcosystem (içerik aynı)
```
Her iki versiyonda PillarCard şu katmanları içeriyor:
- ikon + numara + keyword rozeti
- başlık + weakness italic
- açıklama (2 satır)
- bullets (4 madde, genişleyince)
- stack rozetleri
- CTA butonu

Yoğunluk gerçek ama iki versiyon arasında fark yok. GrowthEcosystem tasarımın kendisine ait bir özellik.

### "Vaka çalışmaları çok katmanlı" → YANLIŞ (değişiklik yok)
```
CaseStudiesSection: GitHub = Lokal (byte-for-byte aynı)
```
Katmanlı yapı (rozet + büyük metrik + başlık + insight + serviceTags + CTA) her iki versiyonda mevcut. Koda bağlı bir değişiklik yok.

### "Bölümler yapışık" → DOĞRU (LogoCloud spacing kaybı)
LogoCloud `py-28` → `py-12` regresyonu bölümler arası nefes boşluğunu ortadan kaldırıyor. Bu aynı zamanda GrowthEcosystem ve ProcessRoadmap'in üzerinde birleşme hissini de açıklıyor.

### "Trust strip / hero altı parçalı" → DOĞRU (sıra ve karmaşıklık)
Lokal'da Trust Strip karmaşık bir kartla Hero'dan hemen sonra çıkıyor. GitHub'da araya LogoCloud giriyor ve geçişi yumuşatıyor.

---

## Lokal Versiyonun Korunması Gereken Güçlü Yönleri (kodla doğrulandı)

### 1. Trust Strip — Sayısal metrikler çok daha güçlü sosyal kanıt
```tsx
// Lokal (güçlü):
{ stat: "50+", label: "Tamamlanan Proje", color: "#be29ec" }
{ stat: "4×",  label: "Ortalama ROAS",    color: "#a78bfa" }
{ stat: "%300+", label: "SEO Trafik Büyümesi", color: "#60a5fa" }
{ stat: "1 Gün", label: "Yanıt Süresi",   color: "#34d399" }

// GitHub (zayıf):
<div>GA4 + GTM</div>  — teknoloji ismi, kanıt değil
```
Sayısal metrikler kalmalı. Sadece yerleşimi ve iç yapı sadeleştirilebilir.

### 2. GrowthEcosystem — URL güncellemesi doğru
```
GitHub:  href: "/hizmetler/ppc-ve-performans-pazarlama"
Lokal:   href: "/hizmetler/ppc-performans-pazarlama"
```
CLAUDE.md'deki URL yapısıyla uyumlu. Korunacak.

### 3. ProcessRoadmap — Lokal'da watermark numarası eklendi
```tsx
// Lokal'da right panel'e eklenen — GitHub'da yok:
<div style={{ fontSize: "clamp(120px, 20vw, 180px)", opacity: 0.05 }}>
  {current.id}
</div>
```
Subtle ve premium bir detay. Korunabilir.

### 4. FAQSection — Evrensel API doğru tasarlanmış
Yeni `accentText`, `accentColor`, `subtitle`, `defaultVisible` props sistemi sağlam. Her sayfada özelleştirme imkânı var.

---

## Öncelikli Aksiyon Listesi

### Yüksek öncelik
1. **LogoCloud spacing'i geri getir**: `py-12` → `py-20 sm:py-24`, `mb-8` → `mb-16`, label `text-[11px]` → `text-[12px] tracking-[0.3em] text-white/65`
2. **FAQSection anasayfaya CTA ekle**: `showCta={true}` veya en alt CTA bloğu geri getirilmeli — SSS sonrası kullanıcı aksiyonu kayboluyor.

### Orta öncelik
3. **Trust Strip konumu**: Hero → Trust Strip → LogoCloud sırası kabul edilebilir ancak Trust Strip'in iç padding'i hafif azaltılabilir (`py-8` → `py-6 sm:py-8`)
4. **Trust Strip iç layout**: Sol "Ölçülen Sonuçlar" label sütunu görsel karmaşıklık katıyor. Alternatif: 4 metriği düz sıralı, labelsız bir bant olarak göster.

### Düşük öncelik
5. **GrowthEcosystem ve CaseStudies**: İki versiyonda da aynı — bu bileşenler kaynaklı bir regresyon yok.

---

## Dosyalar ve Değişiklik Özeti

| Dosya | GitHub → Lokal | Durum |
|-------|---------------|-------|
| `page.tsx` | Trust Strip/Logo sırası + içerik değişti | Mantıklı ama spacing kaybı var |
| `LogoCloud.tsx` | `py-28` → `py-12`, büyük spacing kaybı | **Regresyon** |
| `GrowthEcosystem.tsx` | Sadece URL güncelleme | Sağlam |
| `CaseStudiesSection.tsx` | Değişiklik yok | Sağlam |
| `ProcessRoadmap.tsx` | Watermark numarası eklendi | İyi |
| `FAQSection.tsx` | Tamamen yeniden yazıldı | UX simplifikasyonu, alt CTA kayboldu |
| `faq-data.ts` | 11 → 11 soru, içerik iyileştirildi | Sağlam |
