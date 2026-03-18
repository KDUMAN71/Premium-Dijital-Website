// components/sections/case-studies/case-study-data.ts

/* ─────────────────────────────────────────────
   Type Tanımları
   Not: secondaryMetrics eklendi — CaseStudiesSection featured kartta
   ana metriğin altında 2x2 grid olarak gösterilir.
───────────────────────────────────────────── */
export interface CaseStudy {
  slug: string;
  sector: string;
  timeframeDays: number;
  serviceTags: string[];
  title: string;
  tag: string;
  summary: string;
  metrics: { label: string; value: string }[];
  highlights: string[];
  story: {
    problem: string;
    approach: string;
    execution: string;
    results: string;
    implementationSubtitle: string;
  };
  strategicNote: string;
  context: {
    situation: string;
    goal: string;
    approach: string[];
  };
  home: {
    title: string;
    summary: string;
    bullets?: string[];
    primaryMetric?: {
      label: string;
      value: string;
      context?: string;
    };
    secondaryMetrics?: {
      label: string;
      value: string;
    }[];
    problem?: string;
    insight?: {
      issue: string;
      result: string;
      lever: string;
    };
  };

  // Detay sayfası için yeni alanlar
  problem?: {
    headline: string;
    body: string;
    signals?: string[];
  };

  serviceDetail?: {
    packageName: string;
    why: string;
    scope: string[];
  };

  solution?: {
    headline: string;
    steps: {
      title: string;
      desc: string;
    }[];
  };

  outcome?: {
    headline: string;
    quote?: string;
  };

  // Detay sayfası hero görseli
  // Dosyayı /public/img/basari-hikayeleri/[slug].jpg olarak ekle
  // Önerilen boyut: 1200x600px, yatay, koyu tonlar tercih edilmeli
  heroImage?: string;

  // Liste sayfası filtresi için ana hizmet alanı
  serviceArea?:
    | "Performans & Büyüme"
    | "Dijital Mimari"
    | "Marka & Strateji"
    | "Dijital Operasyon";
}

/* ─────────────────────────────────────────────
   Vaka Verileri
───────────────────────────────────────────── */
export const allCaseStudies: CaseStudy[] = [
  /* ── 01 ── Sağlık Turizmi */
  {
    slug: "saglik-turizmi-hasta-edinimi",
    sector: "Sağlık & Medikal",
    timeframeDays: 90,
    serviceArea: "Performans & Büyüme",
    heroImage: "/img/basari-hikayeleri/saglik-medikal.webp",
    serviceTags: ["Google Ads", "Meta Ads", "Funnel Otomasyonu"],
    title:
      "Sağlık Turizminde Nitelikli Hasta Edinimi ve Dijital Funnel Mimarisi",
    tag: "Sağlık / Lead",
    summary:
      "Dağınık reklam harcamalarını, adım adım takip edilen bir hasta edinim hunisine dönüştürdük. Reklam maliyetlerini optimize ederek randevu odaklı bir büyüme motoru inşa ettik.",
    metrics: [
      { label: "Hasta Edinimi", value: "+%64" },
      { label: "CPL (Maliyet)", value: "-%42" },
      { label: "ROAS Verimi", value: "5.8x" },
    ],
    highlights: ["Landing Page Tasarımı", "Funnel Otomasyonu", "Remarketing"],
    story: {
      problem:
        "Marka yüksek bütçe harcamasına rağmen formların randevuya dönüşme oranı düşüktü. Manuel takip süreçleri potansiyel hastaların rakiplere kaçmasına sebep oluyordu.",
      approach:
        "Arama niyetine göre segmente edilmiş landing page'ler ve anlık yanıt veren CRM otomasyon kurgusunu merkeze aldık.",
      execution:
        "Google & Meta Ads entegrasyonu ile 'sosyal kanıt' odaklı bir remarketing döngüsü kurularak karar süreci desteklendi.",
      results:
        "Randevu başına maliyet düşerken, gerçek hastaya dönüşme oranı dijital takip sistemiyle mühürlendi.",
      implementationSubtitle:
        "Tıbbi etik kuralları çerçevesinde, hastanın güvenini kazanan ve karar sürecini hızlandıran teknik adımlar.",
    },
    strategicNote:
      "Sağlıkta güven ve hız her şeydir. Leadlerin ilk 5 dakikada yanıtlanmasını sağlayan altyapı, dönüşümün anahtarı oldu.",
    context: {
      situation:
        "Reklam harcaması yüksek ancak randevu dönüşümü zayıf bir yapı.",
      goal: "Maliyetleri optimize ederek nitelikli hasta akışını otomatize etmek.",
      approach: [
        "Hızlı Yanıt Sistemi",
        "Piksel Tabanlı Takip",
        "Kreatif Güven Testleri",
        "CRM Entegrasyonu",
      ],
    },
    home: {
      title: "Hasta Sayısı %64 Arttı — Reklam Maliyeti %42 Düştü",
      summary:
        "Sağlık turizminde dağınık reklam bütçelerini, otomatik hasta edinim makinesine dönüştürdük. 90 günde randevu akışı iki katına çıkarken maliyet yarıya indi.",
      problem: "Reklam bütçesi vardı — ama formlar randevuya dönüşmüyordu",
      bullets: [
        "Google & Meta Ads entegrasyonuyla hedefli hasta segmentasyonu kuruldu",
        "CRM otomasyonuyla her lead 5 dakika içinde takibe alındı",
        "Sosyal kanıt odaklı remarketing döngüsüyle karar süreci kısaldı",
      ],
      primaryMetric: {
        label: "Randevu Artışı",
        value: "+%64",
        context: "90 gün içinde, funnel otomasyonu devreye alındıktan sonra",
      },
      secondaryMetrics: [
        { label: "CPL Düşüşü", value: "-%42" },
        { label: "ROAS", value: "5.8x" },
      ],
      insight: {
        issue: "Trafik vardı, takip sistemi yoktu",
        result: "%64 randevu artışı",
        lever: "CRM otomasyon + funnel",
      },
    },
    problem: {
      headline: "Reklam bütçesi akıyor, ama randevular rakibe gidiyordu.",
      body: "Klinik ayda on binlerce TL reklam harcıyor; formlar doluyor, telefon çalıyor. Ancak lead'lerin büyük çoğunluğu ilk 24 saat içinde yanıtsız kalıp rakip kliniğe yöneliyordu. Takip sistemi yoktu, hangi reklamın gerçek hasta getirdiği bilinmiyordu.",
      signals: [
        "Form dolduran potansiyel hastaların %70'i 24 saat içinde yanıt alamıyor",
        "Hangi reklamın randevuya dönüştüğü izlenemiyor",
        "Reklam bütçesi artıyor ama hasta sayısı orantılı büyümüyor",
        "Manuel takip süreçleri satış ekibini yoruyor",
      ],
    },
    serviceDetail: {
      packageName: "PPC & Performans Pazarlama + Funnel Otomasyonu",
      why: "Sorun bütçe değil, takip ve dönüşüm altyapısıydı. Reklam optimizasyonu tek başına yetersizdi; leadlerin anında yakalanması ve sistematik takibi şarttı.",
      scope: [
        "Google Ads & Meta Ads yeniden yapılandırma ve segmentasyon",
        "Sektöre özel landing page tasarımı ve güven elementleri",
        "CRM entegrasyonu ve otomatik lead takip sistemi",
        "Sosyal kanıt odaklı remarketing döngüsü",
        "GA4 + piksel tabanlı dönüşüm ölçümleme altyapısı",
      ],
    },
    solution: {
      headline:
        "Lead'i anında yakalayan, otomatik takip eden bir sistem kurduk.",
      steps: [
        {
          title: "Funnel Mimarisi",
          desc: "Arama niyetine göre segmente edilmiş kampanyalar ve her segmente özel landing page'ler tasarlandı. Güven sinyalleri ön plana çıkarıldı.",
        },
        {
          title: "Anlık Lead Yakalama",
          desc: "Form gönderimi ve WhatsApp başlatma aksiyonları CRM'e anlık bağlandı. Her lead 5 dakika içinde otomatik bildirim ve takip mesajı aldı.",
        },
        {
          title: "Remarketing Döngüsü",
          desc: "Siteye gelen ama form doldurmayan kullanıcılar için sosyal kanıt odaklı Meta remarketing kampanyaları kuruldu.",
        },
        {
          title: "Dönüşüm Ölçümleme",
          desc: "Google Ads ve Meta piksel, GA4 ile entegre edilerek hangi reklamın gerçek randevuya dönüştüğü takip edildi. Verimsiz harcamalar kesildi.",
        },
      ],
    },
    outcome: {
      headline:
        "90 günde hasta sayısı %64 arttı, aynı bütçeyle iki kat daha fazla randevu.",
      quote:
        "Artık her sabah CRM'de takip edilecek randevu talepleri hazır buluyoruz. Hangi reklam işe yarıyor, artık körü körüne harcamıyoruz.",
    },
  },

  /* ── 02 ── Kurumsal Kimlik */
  {
    slug: "kurumsal-kimlik-marka-donusumu",
    sector: "Teknoloji & Kurumsal",
    timeframeDays: 120,
    serviceArea: "Marka & Strateji",
    serviceTags: ["Kurumsal Kimlik", "Web Tasarım", "Sosyal Medya"],
    title:
      "Sıfırdan Zirveye: Kurumsal Kimlik ve Stratejik İletişim Dilinin İnşası",
    tag: "Branding",
    summary:
      "Markanın görsel dilini ve web mimarisini yeniden kurgulayarak doğru kitleye erişimini sağladık. Otoriteyi tasarım ve içerikle pekiştirdik.",
    metrics: [
      { label: "Web Trafiği", value: "+%110" },
      { label: "Etkileşim", value: "+%85" },
      { label: "Algı Skoru", value: "Premium" },
    ],
    highlights: ["UI Kit Hazırlığı", "Next.js Web Tasarım", "Marka Hikayesi"],
    story: {
      problem:
        "Hizmet kalitesi sektöre göre çok ileride olmasına rağmen, dijital varlığı dağınık ve güven vermeyen bir yapıdaydı.",
      approach:
        "Minimalist ve teknolojik bir görsel dil (UI Kit) oluşturarak tüm mecralarda otorite inşasını başlattık.",
      execution:
        "Web sitesini Core Web Vitals uyumlu bir dönüşüm aracına çevirdik ve sosyal medyayı 'bilgi lideri' konumunda yönettik.",
      results:
        "Marka algısı premium segmente çekildi ve organik lead akışında %110 artış gözlemlendi.",
      implementationSubtitle:
        "Tasarımı bir süs değil, stratejik bir iletişim aracı olarak konumlandırdığımız uygulama süreci.",
    },
    strategicNote:
      "Büyük ölçekli müşteriler kararı 'görsel güven' ile verir. Dijital varlığı profesyonel bir vitrine çevirmek satış döngüsünü kısalttı.",
    context: {
      situation: "Dijital kimlik hizmet kalitesinin gerisindeydi.",
      goal: "Sektör lideri konumlandırması sağlamak.",
      approach: [
        "Modern UI Kit",
        "Stratejik İletişim",
        "Performans Odaklı Web",
        "İçerik Stratejisi",
      ],
    },
    home: {
      title: "Görsel Dil Değişti, Trafik %110 Arttı",
      summary:
        "Hizmet kalitesi zaten vardı — dijital varlık buna yetişemiyordu. 120 günde marka kimliğini sıfırdan inşa ederek premium segmentin güvenini kazandık.",
      problem: "Hizmet kalitesi çok iyiydi — dijital görünümü güven vermiyordu",
      bullets: [
        "Core Web Vitals uyumlu Next.js web sitesi sıfırdan kuruldu",
        "Premium görsel dil & UI Kit tüm mecralara uygulandı",
        "İçerik liderliği stratejisiyle organik otorite inşa edildi",
      ],
      primaryMetric: {
        label: "Trafik Artışı",
        value: "+%110",
        context:
          "120 gün içinde, marka kimliği ve web revizyonu tamamlandıktan sonra",
      },
      secondaryMetrics: [
        { label: "Etkileşim Artışı", value: "+%85" },
        { label: "Marka Algısı", value: "Premium" },
      ],
      insight: {
        issue: "Dijital varlık hizmet kalitesinin gerisindeydi",
        result: "%110 trafik + premium algı",
        lever: "Kimlik + web + içerik stratejisi",
      },
    },
    problem: {
      headline:
        "Kaliteli bir hizmet, kötü bir dijital izlenim yüzünden müşteri kaybediyordu.",
      body: "Potansiyel müşteriler web sitesine girdiğinde eski, yavaş ve güvensiz bir görüntüyle karşılaşıyordu. Rakiplerin kurumsal dijital varlığı yanında bu marka küçük ve güvensiz görünüyordu. Hizmet kalitesi yüksekti — ama bunu anlatacak dijital bir dil yoktu.",
      signals: [
        "Web sitesi mobilde bozuk görünüyor, yükleme süresi 5 saniyenin üzerinde",
        "Sosyal medya hesapları düzensiz ve marka kimliğiyle uyumsuz",
        "Logo ve görsel kimlik farklı mecralarda tutarsız kullanılıyor",
        "Teklif isteyenlerin 'profesyonel görünmüyor' geri bildirimi var",
      ],
    },
    serviceDetail: {
      packageName: "Marka & Görsel Kimlik + Web Tasarım",
      why: "Reklam harcamak yerine önce görsel güveni inşa etmek gerekiyordu. Dijital varlık markanın satış temsilcisi konumuna getirilmeden hiçbir pazarlama yatırımı kalıcı sonuç vermez.",
      scope: [
        "Logo ve kurumsal kimlik yenileme (UI Kit dahil)",
        "Core Web Vitals uyumlu Next.js web sitesi geliştirme",
        "Sosyal medya görsel şablonları ve yayın takvimi",
        "İçerik stratejisi ve otorite inşası",
        "SEO teknik altyapı kurulumu",
      ],
    },
    solution: {
      headline: "Önce güveni inşa ettik, sonra trafiği büyüttük.",
      steps: [
        {
          title: "Kimlik Sistemi",
          desc: "Markanın değerlerini yansıtan minimalist ve teknolojik bir UI Kit oluşturuldu. Logo, renk paleti, tipografi ve görsel dil tüm mecralarda tutarlı hale getirildi.",
        },
        {
          title: "Performanslı Web Sitesi",
          desc: "Eski site sıfırdan Next.js ile yeniden yazıldı. Core Web Vitals skorları 90+'a çıkarıldı, mobil uyum mükemmelleştirildi ve dönüşüm odaklı sayfa yapısı kurgulandı.",
        },
        {
          title: "İçerik Otoritesi",
          desc: "Sektörde 'bilgi lideri' konumunu kazanmak için blog, vaka çalışmaları ve sosyal medya içerik takvimi hazırlandı. Her içerik SEO hedefleri doğrultusunda kurgulandı.",
        },
        {
          title: "Sosyal Medya Sistemi",
          desc: "Marka kimliğiyle uyumlu görsel şablonlar hazırlandı, düzenli yayın akışı oluşturuldu. Etkileşim oranı sistematik içerikle %85 büyüdü.",
        },
      ],
    },
    outcome: {
      headline:
        "120 günde organik trafik %110 arttı, marka premium segment tarafından tanınır hale geldi.",
      quote:
        "Artık toplantılara gittiğimizde 'web sitenizi gördük, çok profesyonel' diyorlar. Bu güven dönüşümlerimizi doğrudan etkiliyor.",
    },
  },

  /* ── 03 ── E-Ticaret */
  {
    slug: "e-ticaret-roas-olcekleme",
    sector: "E-Ticaret / Moda",
    timeframeDays: 45,
    serviceArea: "Performans & Büyüme",
    serviceTags: ["Meta Ads", "CRO", "Checkout Optimizasyonu"],
    title: "E-Ticarette ROAS Bariyerini Aşmak: Kârlı Ölçekleme Stratejisi",
    tag: "E-Com / ROI",
    summary:
      "Bütçe arttıkça düşen verimliliği, kreatif scaling ve ödeme sayfası optimizasyonu ile kârlı bir büyüme modeline çevirdik.",
    metrics: [
      { label: "ROAS Artışı", value: "+%145" },
      { label: "Sepet Terk", value: "-%28" },
      { label: "Satış Hacmi", value: "3.2x" },
    ],
    highlights: ["Kreatif Scaling", "Checkout CRO", "Dinamik Remarketing"],
    story: {
      problem:
        "Bütçe arttıkça müşteri edinme maliyetleri yükseliyor, reklam harcaması net kârlılığı yutuyordu.",
      approach:
        "Kreatif yorgunluğu önlemek için dinamik içerik üretimine geçtik ve sepetten kaçışı önleyen psikolojik tetikleyiciler ekledik.",
      execution:
        "Meta Ads tarafında 'Advantage+' yerine manuel segmentasyon ve özel kreatif testleri uygulandı.",
      results:
        "Daha düşük birim maliyetle daha yüksek sepet ortalaması yakalanarak kârlı bir büyüme sağlandı.",
      implementationSubtitle:
        "Hız ve veri odaklı e-ticaret yönetiminde her saniyenin ve her pikselin optimize edildiği süreç.",
    },
    strategicNote:
      "E-ticarette teknik ayar kadar 'kreatif tazelik' önemlidir. Teklifi ve sunumu optimize etmek anahtar rol oynadı.",
    context: {
      situation: "Düşük kârlılıkla çalışan verimsiz reklam bütçesi.",
      goal: "ROAS değerini koruyarak günlük satış hacmini 3 katına çıkarmak.",
      approach: [
        "Kreatif Test Sistemi",
        "Ödeme Sayfası İyileştirmesi",
        "Dinamik Remarketing",
        "Sadakat Kurgusu",
      ],
    },
    home: {
      title: "45 Günde Satış 3.2x Büyüdü — ROAS %145 Arttı",
      summary:
        "Bütçe büyüdükçe verimlilik düşüyordu. Meta Ads kreatif scaling ve checkout optimizasyonuyla bu döngüyü kırdık: daha az harcamayla daha fazla satış.",
      bullets: [
        "Manuel segmentasyon ve A/B kreatif testleriyle reklam yorgunluğu engellendi",
        "Ödeme sayfası optimizasyonuyla sepet terk oranı %28 düşürüldü",
        "Dinamik remarketing döngüsüyle satın alma kararı hızlandırıldı",
      ],
      primaryMetric: { label: "Satış Hacmi", value: "3.2x" },
      secondaryMetrics: [
        { label: "ROAS Artışı", value: "+%145" },
        { label: "Sepet Terk ↓", value: "-%28" },
      ],
    },
    problem: {
      headline: "Bütçe büyüdükçe kâr küçülüyordu — ölçekleme tuzağı.",
      body: "Reklam bütçesini artırmak, satışları orantılı büyütmüyordu. CPC yükseliyordu, aynı kreatifler yoruluyordu ve ödeme sayfasındaki sürtünme potansiyel müşterileri son adımda kaybettiriyordu. Her ay daha fazla harcıyor, daha az kâr ediliyordu.",
      signals: [
        "Bütçe %50 arttığında ROAS tersine %30 düştü",
        "Aynı reklam kreatifleri 2 haftadan uzun kullanılınca yorgunluğa giriyor",
        "Ödeme sayfasında sepet terk oranı %68 seviyesinde",
        "Reklam harcaması kâr marjını eritiyor",
      ],
    },
    serviceDetail: {
      packageName: "PPC & Performans Pazarlama (Meta Ads) + CRO",
      why: "Sorun sadece reklam yönetimi değil, dönüşüm altyapısıydı. Reklam getirdiği kullanıcıları sayfa kaybediyordu. İkisini birlikte çözmeden ölçekleme kârlı olmaz.",
      scope: [
        "Meta Ads manuel segmentasyon ve kampanya yeniden yapılandırma",
        "Kreatif test sistemi (A/B, video vs. görsel, kısa vs. uzun kopya)",
        "Checkout sayfası CRO analizi ve optimizasyonu",
        "Dinamik ürün remarketing kurulumu",
        "ROAS ve kârlılık tabanlı bütçe optimizasyon modeli",
      ],
    },
    solution: {
      headline:
        "Kreatifi tazelerken ödeme sayfasını da onarıp ölçeği kâra çevirdik.",
      steps: [
        {
          title: "Kreatif Yenileme Sistemi",
          desc: "Advantage+ yerine manuel kampanya yapısına geçildi. Haftalık kreatif rotasyonu ve A/B test sistemi kuruldu. Her reklam setinin yorulma noktası takip edildi.",
        },
        {
          title: "Checkout Optimizasyonu",
          desc: "Isı haritaları ve oturum kayıtlarıyla terk noktaları tespit edildi. Adım sayısı azaltıldı, güven rozetleri eklendi, aciliyet tetikleyicileri kurgulandı.",
        },
        {
          title: "Remarketing Döngüsü",
          desc: "Ürün sayfasına gelen ama satın almayan kullanıcılar için dinamik ürün reklamları ve sepet hatırlatma sekansı kuruldu.",
        },
        {
          title: "Kârlılık Modeli",
          desc: "Her kampanya için ROAS hedefi değil, kâr marjı hedefi belirlendi. Bütçe verimsiz kampanyalardan yüksek kârlı segmentlere kaydırıldı.",
        },
      ],
    },
    outcome: {
      headline:
        "45 günde satış hacmi 3.2 kat büyürken ROAS %145 arttı, reklam kârlı hale geldi.",
      quote:
        "Artık bütçeyi artırmaktan korkmuyoruz. Sistem nasıl ölçekleneceğini biliyor, her liranın nereye gittiğini görüyoruz.",
    },
  },

  /* ── 04 ── Global SaaS */
  {
    slug: "global-saas-seo-stratejisi",
    sector: "Yazılım / SaaS",
    timeframeDays: 180,
    serviceArea: "Dijital Mimari",
    serviceTags: ["Teknik SEO", "İçerik Pazarlaması", "Uluslararası SEO"],
    title: "Global SaaS Pazarında Organik Otorite ve Düşük Maliyetli Kayıt",
    tag: "SaaS / SEO",
    summary:
      "Yüksek tıklama maliyetleri olan global pazarda, teknik SEO ve 'Topic Authority' odaklı içerik mimarisi ile organik kayıt sayısını domine ettik.",
    metrics: [
      { label: "Organik Trafik", value: "+%210" },
      { label: "Signup Oranı", value: "+%42" },
      { label: "CPC Tasarrufu", value: "$12k/ay" },
    ],
    highlights: ["Teknik SEO", "Topic Authority", "Link İnşası"],
    story: {
      problem:
        "Google Ads maliyetlerinin (CPC) $20 üzerine çıktığı global rekabette, reklamla büyüme sürdürülebilir değildi.",
      approach:
        "Ürünün çözdüğü spesifik dertlere odaklanan derinlemesine rehberler ve teknik dokümantasyon SEO altyapısına bağlandı.",
      execution:
        "Hreflang yapılandırması ve backlink otorite inşası ile hedef anahtar kelimelerde ilk 3 sıraya yerleşildi.",
      results:
        "Reklam bağımlılığı azaldı, organik kanaldan gelen kullanıcıların LTV değeri %35 daha yüksek çıktı.",
      implementationSubtitle:
        "Algoritmaların ötesinde, global kullanıcının arama niyetini yakalayan teknik ve içerik operasyonu.",
    },
    strategicNote:
      "SaaS dünyasında içerik 'destek' değil, satışın kendisidir. Otorite inşası reklam maliyetlerini kalıcı olarak düşürdü.",
    context: {
      situation: "Yüksek reklam bağımlılığı ve düşük organik görünürlük.",
      goal: "Global pazarda organik otorite ve kayıt akışı sağlamak.",
      approach: [
        "Topik Kümeleme",
        "Teknik SEO Revizyonu",
        "İçerik Hub İnşası",
        "Link Otoritesi",
      ],
    },
    home: {
      title: "Reklama $12k/Ay Tasarruf — Organik Trafik %210 Büyüdü",
      summary:
        "CPC maliyetleri $20'ı aştığında reklam büyümesi durdu. Teknik SEO ve içerik otoritesiyle organik kanalı satış motoruna dönüştürdük.",
      bullets: [
        "Topic Authority mimarisiyle hedef anahtar kelimelerde ilk 3 sıra alındı",
        "Hreflang ve teknik SEO revizyonuyla global indeksleme optimize edildi",
        "Organik kullanıcıların LTV değeri reklam trafiğinden %35 yüksek çıktı",
      ],
      primaryMetric: { label: "Organik Trafik Artışı", value: "+%210" },
      secondaryMetrics: [
        { label: "Signup Artışı", value: "+%42" },
        { label: "Aylık CPC Tasarrufu", value: "$12k" },
      ],
    },
    problem: {
      headline:
        "Reklam büyümeyi durduruyor — her kayıt için ödenen maliyet sürdürülemez hale geldi.",
      body: "Global pazarda CPC $20'ın üzerine çıkmıştı. Reklam bütçesi artıkça kâr marjı azalıyordu. Organik sıralamalar zayıftı; arama hacmi yüksek anahtar kelimelerde rakipler ilk sayfayı domine ediyordu. Uzun vadeli büyüme için reklama bağımlı olmayan bir kanal şarttı.",
      signals: [
        "CPC maliyeti $20'ın üzerinde, her kayıt pahalıya mal oluyor",
        "Organik aramadan gelen trafik toplam trafiğin %15'inin altında",
        "Rakipler hedef anahtar kelimelerde ilk 3 sırayı tutuyor",
        "Reklam durduğunda kayıt akışı neredeyse sıfıra iniyor",
      ],
    },
    serviceDetail: {
      packageName: "SEO & İçerik Stratejisi + Teknik SEO",
      why: "Reklam maliyetleri sürdürülemez düzeye geldiğinde organik büyüme tek gerçekçi alternatiftir. Ancak içerik tek başına yetmez — teknik altyapı sağlam olmadan hiçbir içerik sıralanmaz.",
      scope: [
        "Teknik SEO denetimi ve kritik hataların giderilmesi",
        "Uluslararası SEO (hreflang) yapılandırması",
        "Topic Authority içerik mimarisi ve kümeleme",
        "Derinlemesine rehber ve dokümantasyon içerikleri",
        "Backlink otorite inşası ve link building kampanyası",
      ],
    },
    solution: {
      headline:
        "Teknik temeli onarıp içerik otoritesiyle organik kanalı satış motoruna çevirdik.",
      steps: [
        {
          title: "Teknik SEO Revizyonu",
          desc: "Site hızı, crawl bütçesi, canonical yapısı ve indeksleme sorunları giderildi. Core Web Vitals skorları yükseltildi. Hreflang yapılandırmasıyla global pazarlara doğru sinyaller verildi.",
        },
        {
          title: "Topic Authority Mimarisi",
          desc: "Ürünün çözdüğü problemler etrafında kümelenmiş içerik yapısı kuruldu. Her kategori için 'pillar page' ve destekleyici cluster içerikler yazıldı.",
        },
        {
          title: "İçerik Operasyonu",
          desc: "Arama niyetine göre optimize edilmiş derinlemesine rehberler ve teknik dokümantasyon üretildi. Her içerik hem kullanıcı hem algoritma için tasarlandı.",
        },
        {
          title: "Link Otoritesi",
          desc: "Sektörel yayınlar ve otoriter sitelerden backlink kampanyası yürütüldü. Domain otoritesi artışıyla hedef anahtar kelimelerde ilk 3 sıraya yerleşildi.",
        },
      ],
    },
    outcome: {
      headline:
        "6 ayda organik trafik %210 büyüdü, aylık $12.000 reklam harcaması organik kanala kaydı.",
      quote:
        "İçerik yatırımı reklam harcamasının çok daha iyi ROI'sini sundu. Üstelik bu trafik durmuyor, büyümeye devam ediyor.",
    },
  },

  /* ── 05 ── B2B Sanayi */
  {
    slug: "b2b-sanayi-lead-mimarisi",
    sector: "Sanayi / Üretim",
    timeframeDays: 60,
    serviceArea: "Dijital Operasyon",
    serviceTags: ["Google Ads", "LinkedIn Marketing", "CRM Entegrasyonu"],
    title: "Geleneksel Sanayiden Dijital Liderliğe: B2B Lead Mimarisi",
    tag: "B2B / Sanayi",
    summary:
      "Geleneksel satış kanallarına bağımlı bir üreticiyi, LinkedIn ve Google Ads üzerinden küresel bir talep toplama merkezine dönüştürdük.",
    metrics: [
      { label: "Nitelikli Lead", value: "+%80" },
      { label: "İhracat Talebi", value: "2.5x" },
      { label: "Görünürlük", value: "+%150" },
    ],
    highlights: ["Niche Hedefleme", "Lead Magnet", "CRM Takibi"],
    story: {
      problem:
        "Satış ekibi sadece fuarlardan ve eski referanslardan besleniyordu; dijitalden gelen talepler ise kalitesiz ve verimsizdi.",
      approach:
        "Karar vericilere (Satınalma Müdürü, Mühendisler) özel LinkedIn kurgusu ve spesifik Google Search kampanyaları başlattık.",
      execution:
        "Teknik whitepaper'lar ile veri toplandı ve bu veriler CRM üzerinden anlık olarak satış ekiplerine iletildi.",
      results:
        "İhracat odaklı 'nitelikli' firma taleplerinde rekor artış sağlandı ve satış kapatma süreleri kısaldı.",
      implementationSubtitle:
        "B2B'nin rasyonel karar verme mekanizmalarına uygun, güven ve teknik yetkinlik odaklı süreç.",
    },
    strategicNote:
      "B2B'de hacim değil, niyet önemlidir. Doğru unvandaki kişiye, doğru teknik dille ulaşmak tüm bariyerleri yıktı.",
    context: {
      situation: "Geleneksel kanallara sıkışmış sanayi kuruluşu.",
      goal: "Küresel pazardan doğrudan teknik talep toplamak.",
      approach: [
        "LinkedIn Hedefleme",
        "İçerik Pazarlaması",
        "CRM Lead Akışı",
        "Landing Page",
      ],
    },
    home: {
      title: "Fuar Bağımlılığı Bitti — İhracat Talebi 2.5x Arttı",
      summary:
        "Yalnızca fuarlara ve referansa dayanan satış modelini kırdık. 60 günde LinkedIn ve Google üzerinden küresel nitelikli talep akışı inşa ettik.",
      problem: "Satış yalnızca fuarlara ve eski referanslara bağlıydı",
      bullets: [
        "Satınalma müdürü ve mühendislere özel LinkedIn kampanyaları kuruldu",
        "Teknik whitepaper ile nitelikli lead verisi toplandı",
        "CRM otomasyonuyla her talep anlık olarak satış ekibine iletildi",
      ],
      primaryMetric: {
        label: "İhracat Talebi Artışı",
        value: "2.5x",
        context: "60 gün içinde, LinkedIn + CRM sistemi kurulumu sonrası",
      },
      secondaryMetrics: [
        { label: "Nitelikli Lead ↑", value: "+%80" },
        { label: "Dijital Görünürlük", value: "+%150" },
      ],
      insight: {
        issue: "Dijitalden gelen talepler kalitesiz ve verimsizdi",
        result: "İhracat talebi 2.5x büyüdü",
        lever: "LinkedIn hedefleme + CRM otomasyon",
      },
    },
    problem: {
      headline:
        "Satış ekibi yalnızca fuarları ve eski referansları bekliyordu — dijital yoktu.",
      body: "Üretim kalitesi ve ihracat kapasitesi yüksekti; ancak potansiyel alıcılar Google'da bu firmayı bulamıyordu. LinkedIn'de hiç varlık yoktu. Dijitalden gelen talepler kalitesiz küçük firmalardan oluşuyordu. Satış ekibi nitelikli alıcıya ulaşmak için tamamen geleneksel kanallara mahkumdu.",
      signals: [
        "Dijital kanallardan gelen taleplerin %80'i niteliksiz veya küçük ölçekli",
        "LinkedIn'de firma profili mevcut değil, yöneticiler kişisel hesap bile kullanmıyor",
        "Google araması yapan alıcılar rakip firmaları buluyor",
        "Yeni fuar katılımı olmadan 6 ayda sıfır yeni müşteri",
      ],
    },
    serviceDetail: {
      packageName: "B2B Dijital Pazarlama (LinkedIn + Google Ads) + CRM",
      why: "B2B satın alma kararlarını veren kişilere LinkedIn üzerinden unvan bazlı hedefleme yapılabilir. Google'da ise spesifik teknik arama yapan alıcılar yüksek niyet taşır. İkisi birlikte kurulduğunda güçlü bir talep motoru oluşur.",
      scope: [
        "LinkedIn şirket profili kurulumu ve içerik stratejisi",
        "Satınalma müdürü ve mühendislere özel LinkedIn kampanyaları",
        "Teknik Google Search kampanyaları (ürün + uygulama bazlı)",
        "Lead magnet olarak teknik whitepaper hazırlanması",
        "CRM entegrasyonu ve otomatik lead yönlendirme sistemi",
      ],
    },
    solution: {
      headline: "Doğru kişiye doğru teknik dille ulaştık, CRM gerisi halletti.",
      steps: [
        {
          title: "LinkedIn Varlık İnşası",
          desc: "Firma profili ve kilit yöneticilerin profilleri kurumsal bir dille yeniden yapılandırıldı. Ürün ve uygulama odaklı düzenli içerik akışı başlatıldı.",
        },
        {
          title: "Hedefli Kampanyalar",
          desc: "Satınalma müdürü, Üretim Müdürü ve Mühendis unvanlarına özel LinkedIn kampanyaları kuruldu. Google'da teknik ürün aramaları yakalayan Search kampanyaları eklendi.",
        },
        {
          title: "Lead Magnet",
          desc: "İndirme karşılığı iletişim bilgisi toplayan teknik whitepaper hazırlandı. Bu doküman hem otorite inşası hem de nitelikli veri toplama aracı olarak çalıştı.",
        },
        {
          title: "CRM Otomasyon",
          desc: "Her lead anında CRM'e düşecek ve satış ekibine bildirim gidecek şekilde sistem kuruldu. Taleplerin unvan ve firma büyüklüğüne göre önceliklendirilmesi otomatize edildi.",
        },
      ],
    },
    outcome: {
      headline:
        "60 günde ihracat odaklı nitelikli talepler 2.5 kat büyüdü, satış kapatma süresi kısaldı.",
      quote:
        "Artık fuar takvimini beklemeden her hafta yeni talep geliyor. Üstelik bu talepler gerçekten konuşmaya değer firmalar.",
    },
  },

  /* ── 06 ── Lokal SEO */
  {
    slug: "lokal-seo-harita-dominasyonu",
    sector: "Yerel Hizmet / Franchise",
    timeframeDays: 30,
    serviceArea: "Dijital Mimari",
    serviceTags: ["Yerel SEO", "Google Haritalar", "İtibar Yönetimi"],
    title: "Lokal Hizmetlerde Bölgesel Dominasyon ve Telefon Trafiği Artışı",
    tag: "Local / Call",
    summary:
      "Çok şubeli bir hizmet markasının tüm lokasyonlarda 'yakınımdaki' aramalarında ilk sırada çıkmasını sağlayarak fiziksel trafiği artırdık.",
    metrics: [
      { label: "Harita Görünümü", value: "+%300" },
      { label: "Telefon Araması", value: "+%90" },
      { label: "Dönüşüm Maliyeti", value: "-%35" },
    ],
    highlights: ["GMB Optimizasyonu", "Bölgesel SEO", "İtibar Yönetimi"],
    story: {
      problem:
        "Müşteriler hizmeti haritalar üzerinden arıyor ancak marka, rakiplerinin çok gerisinde kalıyor, potansiyel aramalar kaçıyordu.",
      approach:
        "Tüm şubeler için Google İşletme Profili (GMB) optimizasyonu ve 'bölge bazlı' lokal açılış sayfaları kurguladık.",
      execution:
        "Yerel alıntılar (citations) temizlendi ve şubelere özel itibar yönetimi ile yorum puanları yükseltildi.",
      results:
        "Fiziksel dükkan trafiği ve telefonla randevu talepleri bir ay içinde katlanarak arttı.",
      implementationSubtitle:
        "Arama motoru algoritmalarının lokal sinyallerini en verimli şekilde işlediğimiz uygulama safhası.",
    },
    strategicNote:
      "Lokal aramada hız ve yorum güveni her şeydir. Haritadaki ilk 3 (Map Pack) içinde yer almak reklam maliyetlerini %35 düşürdü.",
    context: {
      situation:
        "Haritalarda görünmeyen, fiziksel konumu olmasına rağmen dijitalde 'yok' hükmünde bir yapı.",
      goal: "Hedef bölgelerdeki aramaların %50'den fazlasını domine etmek.",
      approach: [
        "GMB Optimizasyonu",
        "Lokal İçerik Yönetimi",
        "Yorum Stratejisi",
        "Lokasyon Sayfaları",
      ],
    },
    home: {
      title: "30 Günde Harita Görünümü %300 Arttı — Telefon Doldu",
      summary:
        "Fiziksel şubesi var ama haritada yok gibiydi. GMB optimizasyonu ve lokal SEO stratejisiyle 30 günde 'yakınımdaki' aramalarını domine ettik.",
      problem: "Rakipler haritada görünüyor, bu işletme kaybolup gidiyordu",
      bullets: [
        "Tüm şubeler için Google İşletme Profili optimize edildi",
        "Lokasyon bazlı SEO sayfaları ve yorum stratejisi hayata geçirildi",
        "Map Pack ilk 3'e girerek reklam maliyeti %35 düştü",
      ],
      primaryMetric: {
        label: "Harita Görünümü",
        value: "+%300",
        context: "30 gün içinde, GMB ve lokal SEO revizyonu sonrası",
      },
      secondaryMetrics: [
        { label: "Telefon Araması ↑", value: "+%90" },
        { label: "Dönüşüm Maliyeti ↓", value: "-%35" },
      ],
      insight: {
        issue: "Fiziksel konum vardı, haritada yoktu",
        result: "%300 görünürlük artışı",
        lever: "GMB optimizasyon + lokal SEO",
      },
    },
    problem: {
      headline:
        "Fiziksel şube var, ama 'yakınımdaki' araması yapan müşteri rakibe gidiyordu.",
      body: "Birden fazla şubesi olan bu hizmet markası, Google Haritalar'da rakiplerinin çok gerisindeydi. 'Yakınımdaki berber', 'en yakın kuru temizleyici' gibi aramalarda hiç görünmüyordu. GMB profilleri eksik ya da hatalıydı, yorum sayısı düşüktü. Müşteri kapıya geliyordu — ama dijital pencereden değil.",
      signals: [
        "Google Haritalar'da ilk 3 (Map Pack) içinde hiç yer yok",
        "GMB profilleri eksik bilgi, hatalı adres ve düşük puanla dolu",
        "Rakiplerin yorum sayısı 10 kat fazla",
        "Reklam olmadan dijitalden neredeyse sıfır müşteri geliyor",
      ],
    },
    serviceDetail: {
      packageName: "Yerel SEO + Google İşletme Profili Yönetimi",
      why: "Lokal aramalar için reklam vermek geçici çözümdür. Map Pack'e organik girmenin maliyeti reklama kıyasla çok düşüktür ve sonuçlar kalıcıdır. GMB + lokal SEO kombinasyonu bu segmentte en hızlı ROI'yi verir.",
      scope: [
        "Tüm şubeler için Google İşletme Profili optimizasyonu",
        "Yerel alıntı (citation) temizleme ve tutarlılık sağlama",
        "Her şube için lokasyon bazlı SEO sayfaları",
        "Yorum toplama stratejisi ve itibar yönetimi",
        "Lokasyon bazlı anahtar kelime takibi ve raporlama",
      ],
    },
    solution: {
      headline:
        "Her şubeyi Google'ın lokal algoritmalarına göre optimize edip Map Pack'e soktuk.",
      steps: [
        {
          title: "GMB Optimizasyonu",
          desc: "Her şubenin Google İşletme Profili eksiksiz dolduruldu: kategori, hizmetler, çalışma saatleri, fotoğraflar, soru-cevap bölümleri. NAP tutarlılığı sağlandı.",
        },
        {
          title: "Citation Temizleme",
          desc: "Dizinlerdeki hatalı ve çelişkili adres bilgileri tespit edilerek düzeltildi. Google'a tutarlı sinyaller verilmesi harita sıralamalarını hızla iyileştirdi.",
        },
        {
          title: "Yorum Stratejisi",
          desc: "Mevcut müşterilere yorum bırakmaları için sistematik bir teşvik akışı kuruldu. Negatif yorumlara profesyonel yanıt şablonları hazırlandı.",
        },
        {
          title: "Lokal İçerik Sayfaları",
          desc: "Her şube için 'hizmet + ilçe' kombinasyonuna göre optimize edilmiş landing page'ler oluşturuldu. Bölgesel arama niyeti sayfalarla yakalandı.",
        },
      ],
    },
    outcome: {
      headline:
        "30 günde harita görünürlüğü %300 arttı, telefon aramaları ve fiziksel ziyaret katlandı.",
      quote:
        "Map Pack'e girdiğimizden beri telefon çalmıyor, akıyor. Üstelik reklam bütçemizi de azalttık.",
    },
  },
];

// Anasayfa için 4 vaka — her biri farklı ana hizmet alanını temsil eder:
// 1. PPC & Performans      → Sağlık Turizmi (Google+Meta Ads, ROAS, funnel)
// 2. SEO & Dönüşüm         → Lokal SEO (harita dominasyonu, organik büyüme)
// 3. Marka & İletişim      → Kurumsal Kimlik (görsel dil, web, içerik)
// 4. Dijital Operasyon     → B2B Sanayi (CRM, otomasyon, lead sistemi)
export const homeCaseStudies = [
  "saglik-turizmi-hasta-edinimi",
  "lokal-seo-harita-dominasyonu",
  "kurumsal-kimlik-marka-donusumu",
  "b2b-sanayi-lead-mimarisi",
].map((slug) => allCaseStudies.find((c) => c.slug === slug)!);
