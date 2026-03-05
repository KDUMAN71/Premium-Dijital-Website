import type { CaseStudy } from "./CaseStudiesSection";

export const allCaseStudies: CaseStudy[] = [
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
        "Arama niyetine göre segmente edilmiş Landing Page'ler ve anlık yanıt veren CRM otomasyon kurgusunu merkeze aldık.",
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
      title: "Sağlıkta Hasta Edinimi & Funnel Otomasyonu",
      summary:
        "Reklamlardan randevuya giden süreci otomatize ederek nitelikli hasta akışı sağladık.",
      bullets: [
        "Google & Meta Ads Optimizasyonu",
        "Uçtan Uca Lead Takip Sistemi",
      ],
      primaryMetric: { label: "Randevu Artışı", value: "+%64" },
    },
  },
  {
    slug: "kurumsal-kimlik-marka-donusumu",
    sector: "Teknoloji • Kurumsal",
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
      title: "Kurumsal Kimlik & Stratejik Marka İletişimi",
      summary:
        "Görsel dilden web tasarımına, markayı doğru kitleyle buluşturan 360° dijital dönüşüm.",
      bullets: [
        "Premium Görsel Dil & UI Kit",
        "Stratejik Sosyal Medya Yönetimi",
      ],
      primaryMetric: { label: "Trafik Artışı", value: "+%110" },
    },
  },
  {
    slug: "e-ticaret-roas-olcekleme",
    sector: "E-Ticaret / Moda",
    timeframeDays: 45,
    serviceTags: ["Meta Ads", "CRO", "Checkout"],
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
      title: "ROAS Odaklı E-Ticaret Ölçekleme",
      summary:
        "Reklam verimliliğini %145 artırarak satış hacmini kârlı bir şekilde 3 katına çıkardık.",
      bullets: ["Kreatif Scaling Modeli", "Dönüşüm Odaklı Checkout"],
      primaryMetric: { label: "ROAS Artışı", value: "+%145" },
    },
  },
  {
    slug: "global-saas-seo-stratejisi",
    sector: "Yazılım / SaaS",
    timeframeDays: 180,
    serviceTags: ["SEO", "İçerik Pazarlaması", "Global"],
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
      title: "Global SaaS: Organik Büyüme",
      summary:
        "Teknik SEO ve içerik otoritesi ile global organik trafiği %210 artırarak reklam bağımlılığını bitirdik.",
      bullets: ["Topic Authority İnşası", "Uluslararası SEO Altyapısı"],
      primaryMetric: { label: "Organik Artış", value: "+%210" },
    },
  },
  {
    slug: "b2b-sanayi-lead-mimarisi",
    sector: "Sanayi / Üretim",
    timeframeDays: 60,
    serviceTags: ["Google Ads", "LinkedIn Marketing", "CRM"],
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
        "Karar vericilere (Satınalma Md, Mühendisler) özel LinkedIn kurgusu ve spesifik Google Search kampanyaları başlattık.",
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
      title: "B2B Sanayi: Küresel Lead Mimarisi",
      summary:
        "Fuarlara bağımlılığı azaltıp, dijitalden gelen nitelikli ihracat taleplerini %80 artırdık.",
      bullets: ["Nitelikli Karar Verici Hedefleme", "CRM Destekli Lead Takibi"],
      primaryMetric: { label: "Lead Artışı", value: "+%80" },
    },
  },
  {
    slug: "lokal-seo-harita-dominasyonu",
    sector: "Yerel Hizmet / Franchise",
    timeframeDays: 30,
    serviceTags: ["Local SEO", "Maps", "Call Tracking"],
    title: "Lokal Hizmetlerde Bölgesel Dominasyon ve Telefon Trafiği Artışı",
    tag: "Local / Call",
    summary:
      "Çok şubeli bir hizmet markasının tüm lokasyonlarda 'yakınımdaki' aramalarında ilk sırada çıkmasını sağlayarak fiziksel trafiği artırdık.",
    metrics: [
      { label: "Harita Görünümü", value: "+%300" },
      { label: "Telefon Araması", value: "+%90" },
      { label: "Dönüşüm Maliyeti", value: "-%35" },
    ],
    highlights: ["GMB Optimizasyonu", "Bölgesel SEO", "Yorum"],
    story: {
      problem:
        "Müşteriler hizmeti haritalar üzerinden arıyor ancak marka, rakiplerinin çok gerisinde kalıyor, potansiyel aramalar kaçıyordu.",
      approach:
        "Tüm şubeler için Google İşletme Profili (GMB) optimizasyonu ve 'bölge bazlı' lokal açılış sayfaları kurguladık.",
      execution:
        "Yerel alıntılar (citations) temizlendi ve şubelere özel 'itibar yönetimi' ile yorum puanları yükseltildi.",
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
      title: "Lokal SEO ve Harita Dominasyonu",
      summary:
        "Google Haritalar'da ilk sıraya yerleşerek telefonla randevu taleplerini %90 artırdık.",
      bullets: ["GMB (Harita) Optimizasyonu", "Bölgesel SEO Stratejisi"],
      primaryMetric: { label: "Harita Görünümü", value: "+%300" },
    },
  },
];

export const homeCaseStudies = allCaseStudies.slice(0, 6);
