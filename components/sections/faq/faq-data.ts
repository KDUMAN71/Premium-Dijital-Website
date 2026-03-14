import type { FAQItem } from "./FAQSection";

/* ─────────────────────────────────────────────
   ANASAYFA SSS
   İlk 4 soru varsayılan görünür — geri kalanlar
   "Tümünü Gör" ile açılır.
   Her soru: q (başlık) + a (detay cevap)
───────────────────────────────────────────── */
export const homeFaqs: FAQItem[] = [
  // ── İlk 4: Her zaman görünür ──

  {
    q: "Neden başka bir ajans değil de siz?",
    a: "Çoğu ajans reklam kurar, biz büyüme sistemi kurarız. Reklam hesabınız, web siteniz, ölçüm altyapınız ve raporlamanız birbirine bağlı çalışmıyorsa bütçenizin büyük kısmı boşa gider. Biz bu dört katmanı aynı anda yönetir, her kararı veriyle alırız. Hesaplar her zaman sizin mülkiyetinizde kalır — ama sistemi canlı tutan optimizasyon, test ve strateji sürekli gelişen bir iş. Kurmak başlangıçtır, büyütmek esas iştir.",
  },
  {
    q: "Sonuç garantisi veriyor musunuz?",
    a: "Belirli bir ROAS veya lead sayısı garantisi veren ajanslardan uzak durun — piyasa koşulları, rekabet ve sezonluk etkiler hiçbir ajansın kontrolünde değildir. Bizim garantimiz farklı: şeffaf raporlama, yapılandırılmış iletişim ve veriyle desteklenen her karar. Sonuç beklentinizi ilk görüşmede gerçekçi biçimde netleştiririz. Daha önce benzer sektörde elde ettiğimiz sonuçları Sonuçlar sayfamızda inceleyebilirsiniz.",
  },
  {
    q: "Raporlama nasıl yapılıyor?",
    a: "Google Ads, Meta ve GA4 verilerini birleştiren Looker Studio panelini ilk haftada kuruyoruz. Bu panel size özel, 7/24 canlı erişilebilir — rapor beklemenize gerek yok, istediğiniz an açıp bakabilirsiniz. Bunun yanında haftalık kısa özet ve aylık strateji görüşmesi yapıyoruz. Raporun sadece sayı değil, yorum ve bir sonraki aksiyon önerisini de içerdiğini göreceksiniz.",
  },
  {
    q: "Sürece ne kadar dahil olmam gerekiyor?",
    a: "Stratejik kararları aylık görüşmede birlikte alırız — kampanya yönü, bütçe dağılımı, yeni testler hep bu toplantıda netleşir. Günlük optimizasyon ve operasyonel detaylar bizde kalır, zamanınızı bunlarla harcamazsınız. Bu yapı hem sizi gereksiz detaydan korur hem de kararların sık değişmesini önler. Paketinize göre haftalık özet raporu da bu sürecin parçası olabilir.",
  },

  // ── Geri kalan 7: "Tümünü Gör" ile açılır ──

  {
    q: "Daha önce ajans deneyimim iyi olmadı. Fark ne?",
    a: "Bu çok duyduğumuz bir itiraz ve genellikle üç nedenden kaynaklanır: ölçüm altyapısı yoktu, iletişim kopuktu ya da ajans sadece reklam kurdu, dönüşüm altyapısına dokunmadı. Biz bu üçünü baştan netleştiririz. İlk ay teslim ettiğimiz durum raporu bile çoğu müşterimizin daha önce görmediği bilgileri içerir.",
  },
  {
    q: "Süreç nasıl işliyor, ne zaman başlıyoruz?",
    a: "Ücretsiz analiz talebinizin ardından 1 iş günü içinde dönüyoruz. İlk görüşmede mevcut durumu, hedefleri ve beklentileri netleştiriyoruz. Anlaşma sonrası ilk 2 haftada teknik altyapı ve ölçüm kurulumu tamamlanır, 3. haftada kampanyalar canlıya alınır. Tüm süreçte onaysız hiçbir adım atılmaz.",
  },
  {
    q: "Sağlık ve klinik sektöründe deneyiminiz var mı?",
    a: "Evet. Sağlık turizmi, estetik klinik ve diş kliniklerinde hasta edinimi, randevu dönüşümü ve yerel SEO üzerine aktif projelerimiz var. Google reklam politikaları ve sektöre özgü dijital kısıtlamalar konusunda deneyimliyiz — ancak tıbbi içerik onayı ve yasal uyumluluk sorumluluğu müşterimize aittir, bu konuda hukuki danışmanınızla çalışmanızı öneririz. Bu sektörde kritik fark hızdır: bir lead'i 5 dakika içinde takibe almayan klinik rakibine kaptırır.",
  },
  {
    q: "Turizm ve konaklama için dijital pazarlama nasıl işliyor?",
    a: "Turizm sektöründe sezonluk bütçe yönetimi, çok dilli kampanya kurulumu ve rezervasyon dönüşüm optimizasyonu öncelikli konulardır. Google Oteller, Meta dinamik reklamlar ve yerel SEO kombinasyonu en güçlü sonuçları veriyor. Yabancı turist hedefleyen işletmeler için İngilizce ve Arapça kampanya deneyimimiz var.",
  },
  {
    q: "KOBİ ölçeğindeki işletmeler için uygun musunuz?",
    a: "Evet. Büyük bütçelere özel tasarlanmış ajans modelleri yerine modüler çalışıyoruz: ihtiyacınıza göre tek hizmet alanı veya tüm sistem. Küçük bütçelerle maksimum verim için önceliklendirme kritik — bunu ilk görüşmede birlikte yapıyoruz.",
  },
  {
    q: "Minimum çalışma süresi ve sözleşme yapısı nasıl?",
    a: "Minimum 3 ay öneriyoruz: ilk ay kurulum ve ölçüm, ikinci ay optimizasyon, üçüncü ayda net kararlar mümkün oluyor. Sözleşme aylık yenilenebilir yapıda — haksız nedenle bağlı kalamazsınız. Yıllık taahhütte indirim uyguluyoruz.",
  },
  {
    q: "Reklam bütçesi nasıl belirleniyor, ayrı mı ödeniyor?",
    a: "Evet, reklam bütçesi Google ve Meta'ya doğrudan sizin ödemenizdir. Ajans hizmet bedeli ayrıdır: strateji, kurulum, optimizasyon ve raporlama için alınır. Minimum reklam bütçesi sektöre ve hedefe göre değişir — ilk görüşmede sektörünüz için gerçekçi rakamı netleştiririz.",
  },
  {
    q: "Hesaplarım ve verilerim bana mı ait?",
    a: "Kesinlikle. Google Ads, Meta Business, GA4, Search Console — tüm hesaplar sizin mülkiyetinizde kalır. Biz yönetim erişimiyle çalışırız. Çalışmayı sonlandırdığınızda tüm veriler ve erişimler size aittir. Bunu sözleşmeye yazılı olarak da ekliyoruz.",
  },
];

/* ─────────────────────────────────────────────
   Hizmet sayfası SSS'leri — ileride doldurulacak
───────────────────────────────────────────── */
export const googleAdsFaqs: FAQItem[] = [];
export const metaAdsFaqs: FAQItem[] = [];
export const webDesignFaqs: FAQItem[] = [];
export const seoFaqs: FAQItem[] = [];
export const ecommerceFaqs: FAQItem[] = [];
export const socialMgmtFaqs: FAQItem[] = [];
export const brandingFaqs: FAQItem[] = [];
