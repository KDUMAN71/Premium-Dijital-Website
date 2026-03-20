import type { BlogCategory } from "./mdx";

export interface CtaConfig {
  tag: string;
  heading: string;       // sidebar / BlogCTA heading
  subtext: string;       // sidebar / BlogCTA alt metin
  buttonText: string;    // tüm CTA butonlarında
  href: string;          // hedef URL
  midHeadline: string;   // EarlyConversionBlock + FinalConversionBlock başlık
  midSub: string;        // EarlyConversionBlock + FinalConversionBlock alt metin
  stickyMsg: string;     // StickyConversionBar — <%70 scroll
  stickyMsg70: string;   // StickyConversionBar — ≥%70 scroll
}

const CTA_MAP: Record<BlogCategory, CtaConfig> = {
  "Web & SEO": {
    tag: "Ücretsiz SEO Analizi",
    heading: "Sitenizin SEO ve dönüşüm gücünü ölçelim",
    subtext:
      "Teknik SEO denetimi, hız analizi ve dönüşüm fırsatları için 30 dakikalık ücretsiz görüşme.",
    buttonText: "Ücretsiz SEO Analizi Al",
    href: "/iletisim",
    midHeadline: "Siteniz ne kadar trafik kaybediyor?",
    midSub:
      "Teknik SEO sorunları, düşük hız ve dönüşüm engelleri müşterilerinizi rakibinize gönderiyor. Ücretsiz denetiminizi talep edin.",
    stickyMsg: "Ücretsiz SEO Analizi — sitenizin kayıplarını buluyoruz",
    stickyMsg70:
      "Bu yazıyı okudunuz — şimdi sitenizi 30 dk'da analiz edelim →",
  },
  "PPC & Reklam": {
    tag: "Reklam Performans Analizi",
    heading: "Reklam bütçenizi ROAS'a dönüştürelim",
    subtext:
      "Google Ads ve Meta Ads kampanyalarınızın neden kayıp verdiğini birlikte inceleyelim.",
    buttonText: "Reklam Performansını Analiz Et",
    href: "/iletisim",
    midHeadline: "Bütçenizin kaçta kaçı dönüşüme geliyor?",
    midSub:
      "Kötü optimize edilmiş kampanyalar her gün para yakar. Ücretsiz reklam audit ile kayıplarınızı birlikte tespit edelim.",
    stickyMsg: "Ücretsiz Reklam Analizi — ROAS'ınızı artırıyoruz",
    stickyMsg70:
      "Kampanyanızı okudunuz — şimdi ücretsiz audit talep edin →",
  },
  Operasyon: {
    tag: "Sistem Analizi",
    heading: "Manuel süreçlerinizi otomasyona devredelim",
    subtext:
      "İş akışı haritalama ve otomasyon fırsatları için ücretsiz operasyon değerlendirmesi.",
    buttonText: "Sistem Analizini Başlat",
    href: "/iletisim",
    midHeadline: "Ekibiniz ne kadar manuel işe gömülü?",
    midSub:
      "Tekrarlayan süreçler zaman ve para çalar. Ücretsiz operasyon analizinde otomasyon fırsatlarınızı birlikte tespit edelim.",
    stickyMsg: "Ücretsiz Operasyon Analizi — verimliliğinizi artırıyoruz",
    stickyMsg70:
      "Süreci okudunuz — şimdi sisteminizi birlikte analiz edelim →",
  },
  Marka: {
    tag: "Marka Kimlik Analizi",
    heading: "Markanızın dijitaldeki duruşunu güçlendirelim",
    subtext:
      "Görsel kimlik denetimi ve rakip konumlandırma analizi ile marka otoritenizi ölçelim.",
    buttonText: "Ücretsiz Marka Analizi Al",
    href: "/iletisim",
    midHeadline: "Markanız hedef kitlenize ne söylüyor?",
    midSub:
      "Güçsüz marka kimliği dönüşümleri düşürür. Ücretsiz marka analizinde konumlandırma fırsatlarınızı keşfedin.",
    stickyMsg: "Ücretsiz Marka Analizi — otoritenizi ölçüyoruz",
    stickyMsg70:
      "Markayı okudunuz — şimdi ücretsiz analiz talebinde bulunun →",
  },
};

export const defaultCta: CtaConfig = {
  tag: "Sıradaki Adım",
  heading: "Bu stratejiyi işletmenize uygulayalım",
  subtext:
    "30 dakikalık ücretsiz analiz görüşmesinde bu stratejiyi markanıza nasıl uygulayabileceğimizi konuşalım.",
  buttonText: "Ücretsiz Görüşme Talep Et",
  href: "/iletisim",
  midHeadline: "Bu stratejileri kendi işinize uygulamak ister misiniz?",
  midSub:
    "Ücretsiz strateji görüşmesinde markanız için özel bir büyüme planı hazırlayalım.",
  stickyMsg: "Ücretsiz Strateji Görüşmesi — size özel plan hazırlıyoruz",
  stickyMsg70: "Bu içeriği okudunuz — şimdi konuşalım →",
};

export function getCtaForCategory(category: BlogCategory): CtaConfig {
  return CTA_MAP[category] ?? defaultCta;
}
