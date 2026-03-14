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
      value: string; // Format: "%340", "4.2x", "₺2.1M", "+%64" vb.
      context?: string; // "90 gün içinde", "SEO revizyonu sonrası" vb.
    };
    secondaryMetrics?: {
      label: string;
      value: string;
    }[];
    problem?: string; // Featured: "Yüksek trafik, düşük dönüşüm"
    insight?: {
      // Compact kartlar için editorial insight
      issue: string; // "Sorun: ..."
      result: string; // "Sonuç: ..."
      lever: string; // "Kaldıraç: ..."
    };
  };
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
  },

  /* ── 02 ── Kurumsal Kimlik */
  {
    slug: "kurumsal-kimlik-marka-donusumu",
    sector: "Teknoloji & Kurumsal",
    timeframeDays: 120,
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
  },

  /* ── 03 ── E-Ticaret */
  {
    slug: "e-ticaret-roas-olcekleme",
    sector: "E-Ticaret / Moda",
    timeframeDays: 45,
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
  },

  /* ── 04 ── Global SaaS */
  {
    slug: "global-saas-seo-stratejisi",
    sector: "Yazılım / SaaS",
    timeframeDays: 180,
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
  },

  /* ── 05 ── B2B Sanayi */
  {
    slug: "b2b-sanayi-lead-mimarisi",
    sector: "Sanayi / Üretim",
    timeframeDays: 60,
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
  },

  /* ── 06 ── Lokal SEO */
  {
    slug: "lokal-seo-harita-dominasyonu",
    sector: "Yerel Hizmet / Franchise",
    timeframeDays: 30,
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
