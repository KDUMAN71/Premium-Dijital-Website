import type { FAQItem } from "./FAQSection";

/* ─────────────────────────────────────────────────────────────────────────────
   ANASAYFA SSS — homeFaqs
   Sıralama mantığı: Dönüşüm hunisi
   ─────────────────────────────────────────────────────────────────────────────
   İLK 4 — Her zaman görünür (defaultVisible=4):
     1. Süreç nasıl başlıyor?       → Sürtünmeyi kır, ilk adımı netleştir
     2. KOBİ için uygun mu?         → "Benim için mi?" kaygısını yanıtla
     3. Sonuç garantisi?            → En büyük şüpheyi kır
     4. Ne kadar dahil olacağım?    → Kontrol kaybı korkusunu gider

   GERİ KALAN 8 — "Tümünü Gör" ile açılır:
     5.  Reklam bütçesi ayrı mı?    → Para akışı şüphesini gider
     6.  Daha önce ajans kötüydü    → Yaygın itirazı kır
     7.  Raporlama nasıl?           → Şeffaflık güvencesi
     8.  Hesaplarım bende mi?       → Sahiplik güvencesi
     9.  Sağlık sektörü deneyimi?   → Sektör güveni
    10.  Turizm deneyimi?           → Sektör güveni
    11.  Minimum süre / sözleşme?   → Bağlılık kaygısını gider
    12.  Neden siz?                 → Farklılaştırma — son viraj
───────────────────────────────────────────────────────────────────────────── */

export const homeFaqs: FAQItem[] = [
  /* ── İlk 4: Her zaman görünür ───────────────────────────────────────────── */

  {
    q: "Süreç nasıl işliyor, ne zaman başlıyoruz?",
    a: "Ücretsiz analiz talebinizin ardından 1 iş günü içinde dönüyoruz. İlk görüşmede mevcut durumu, hedefleri ve beklentileri netleştiriyoruz — bu görüşme bağlayıcı değil, birlikte değerlendirme için bir başlangıç noktası. Anlaşma sonrası ilk 2 haftada teknik altyapı ve ölçüm kurulumu tamamlanır, 3. haftada kampanyalar canlıya alınır. Tüm süreçte onaysız hiçbir adım atılmaz.",
  },
  {
    q: "KOBİ ölçeğindeki işletmeler için uygun musunuz?",
    a: "Evet. Büyük bütçelere özel kurgulanmış ajans modelleri yerine modüler çalışıyoruz: ihtiyacınıza göre tek hizmet alanı veya tüm sistem. Küçük bütçelerde maksimum verim için önceliklendirme kritiktir — bunu ilk görüşmede birlikte yapıyoruz. Teklif almak için karar vermenize gerek yok; ilk görüşme tamamen ücretsizdir.",
  },
  {
    q: "Sonuç garantisi veriyor musunuz?",
    a: "Belirli bir ROAS veya lead sayısı garantisi veren ajanslardan uzak durun — piyasa koşulları, rekabet ve sezonluk etkiler hiçbir ajansın kontrolünde değildir. Bizim taahhüdümüz farklıdır: şeffaf raporlama, veriyle desteklenen her karar ve gerçekçi beklenti yönetimi. Sonuç beklentinizi ilk görüşmede netleştiririz; benzer sektörde elde ettiğimiz sonuçları Başarı Hikayeleri sayfamızda görebilirsiniz.",
  },
  {
    q: "Sürece ne kadar dahil olmam gerekiyor?",
    a: "Operasyonel kararları biz alırız — günlük kampanya yönetimi, optimizasyon ve testler için zamanınızı almayız. Stratejik kararları aylık görüşmede birlikte alırız: kampanya yönü, bütçe dağılımı, yeni testler hep bu toplantıda netleşir. Bu yapı hem sizi gereksiz detaydan korur hem de kararların sık değişmesini önler.",
  },

  /* ── Geri kalan 8: "Tümünü Gör" ile açılır ─────────────────────────────── */

  {
    q: "Reklam bütçesi nasıl belirleniyor, ayrı mı ödeniyor?",
    a: "Evet, reklam bütçesi Google ve Meta'ya doğrudan sizin ödemenizdir — ajans aracılığıyla geçmez. Ajans hizmet bedeli ayrıdır: strateji, kurulum, optimizasyon ve raporlama için alınır. Minimum reklam bütçesi sektöre ve hedefe göre değişir; ilk görüşmede sektörünüz için gerçekçi rakamı birlikte netleştiririz.",
  },
  {
    q: "Daha önce ajans deneyimim iyi olmadı. Fark ne?",
    a: "Bu çok duyduğumuz bir itiraz ve genellikle üç nedenden kaynaklanır: ölçüm altyapısı yoktu, iletişim kopuktu ya da ajans sadece reklam kurdu ve dönüşüm altyapısına hiç dokunmadı. Biz bu üçünü işin başında netleştiririz. İlk ay teslim ettiğimiz durum raporu bile çoğu müşterimizin daha önce görmediği verileri içerir.",
  },
  {
    q: "Raporlama nasıl yapılıyor?",
    a: "Google Ads, Meta ve GA4 verilerini birleştiren Looker Studio panelini ilk haftada kuruyoruz. Bu panel size özel ve 7/24 canlı erişilebilir — rapor beklemenize gerek yok. Bunun yanında haftalık kısa özet ve aylık strateji görüşmesi yapıyoruz. Rapor sadece sayı değil; yorum ve bir sonraki aksiyon önerisini de içeriyor.",
  },
  {
    q: "Hesaplarım ve verilerim bana mı ait?",
    a: "Kesinlikle. Google Ads, Meta Business, GA4, Search Console — tüm hesaplar sizin mülkiyetinizde kalır. Biz yönetim erişimiyle çalışırız. Çalışmayı sonlandırdığınızda tüm veriler ve erişimler size aittir. Bunu sözleşmeye yazılı olarak da ekliyoruz.",
  },
  {
    q: "Sağlık ve klinik sektöründe deneyiminiz var mı?",
    a: "Evet. Sağlık turizmi, estetik klinik ve diş kliniklerinde hasta edinimi, randevu dönüşümü ve yerel SEO üzerine aktif projelerimiz var. Google reklam politikaları ve sektöre özgü dijital kısıtlamalar konusunda deneyimliyiz — ancak tıbbi içerik onayı ve yasal uyumluluk sorumluluğu müşterimize aittir. Bu sektörde kritik fark hızdır: bir lead'i 5 dakika içinde takibe almayan klinik rakibine kaptırır.",
  },
  {
    q: "Turizm ve konaklama için dijital pazarlama nasıl işliyor?",
    a: "Turizm sektöründe sezonluk bütçe yönetimi, çok dilli kampanya kurulumu ve rezervasyon dönüşüm optimizasyonu öncelikli konulardır. Google Oteller, Meta dinamik reklamlar ve yerel SEO kombinasyonu en güçlü sonuçları veriyor. Yabancı turist hedefleyen işletmeler için İngilizce ve Arapça kampanya deneyimimiz var.",
  },
  {
    q: "Minimum çalışma süresi ve sözleşme yapısı nasıl?",
    a: "Minimum 3 ay öneriyoruz: ilk ay kurulum ve ölçüm, ikinci ay optimizasyon, üçüncü ayda net kararlar mümkün oluyor. Sözleşme aylık yenilenebilir yapıda — haksız nedenle bağlı kalamazsınız. Yıllık taahhütte indirim uyguluyoruz.",
  },
  {
    q: "Neden başka bir ajans değil de siz?",
    a: "Çoğu ajans reklam kurar, biz büyüme sistemi kurarız. Reklam hesabınız, web siteniz, ölçüm altyapınız ve raporlamanız birbirine bağlı çalışmıyorsa bütçenizin büyük kısmı boşa gider. Biz bu dört katmanı aynı anda yönetir, her kararı veriyle alırız. Hesaplar her zaman sizin mülkiyetinizde kalır. Kurmak başlangıçtır, büyütmek esas iştir.",
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   WEB SİTESİ, SEO & DÖNÜŞÜM SAYFASI — webSeoFaqs
   ─────────────────────────────────────────────────────────────────────────────
   Sayfa 3 eşit konuyu kapsar: Web Sitesi + SEO + Dönüşüm/Ölçümleme
   Soru dağılımı bu üç konuya dengeli yayılmalı + süreç/güven soruları.

   KONU DAĞILIMI (12 soru):
     Süreç & Başlangıç    : 1 soru  (ilk sırada — sürtünmeyi kır)
     Web Sitesi & Tasarım : 3 soru  (platform, hız, güncelleme)
     SEO & Performans     : 3 soru  (garanti, süre, fiyat farkı)
     Dönüşüm & Ölçümleme : 2 soru  (GA4/GTM, dönüşüm takibi)
     Sahiplik & Güven     : 3 soru  (hesaplar, kod, bakım/kontrol)

   İLK 4 — Her zaman görünür (defaultVisible=4):
     1. Süreç nasıl başlıyor?       → Sürtünmeyi kır (Süreç)
     2. SEO garantisi?              → En büyük şüphe (SEO)
     3. GA4/GTM ne işe yarıyor?     → Ölçümleme değerini anlatır (Dönüşüm)
     4. Web sitesi ne kadar sürer?  → Pratik ilk soru (Web Sitesi)

   GERİ KALAN 8 — "Tümünü Gör" ile açılır:
     5.  SEO ne zaman sonuç verir?  → Beklenti yönetimi (SEO)
     6.  Ucuz SEO farkı nedir?      → Fiyat itirazı (SEO)
     7.  Dönüşüm takibi ne sağlar?  → Ölçümleme değeri (Dönüşüm)
     8.  WordPress mu Next.js mi?   → Platform kararı (Web Sitesi)
     9.  Siteyi kendim güncelleyebilir miyim? → Bağımsızlık (Web Sitesi)
    10.  Hesaplar/veriler bende mi? → Sahiplik güvencesi (Güven)
    11.  Geliştirilen kod kime ait? → Sahiplik güvencesi (Güven)
    12.  Bakımı siz yaparsanız?     → Kontrol güvencesi (Güven)
───────────────────────────────────────────────────────────────────────────── */

export const webSeoFaqs: FAQItem[] = [
  /* ── İlk 4: Her zaman görünür ───────────────────────────────────────────── */

  {
    // SÜREÇ — İlk sıra: sürtünmeyi kır
    q: "Süreç nasıl işliyor — ilk adım nedir?",
    a: "Ücretsiz analiz talebi ile başlıyoruz. Formunuzu doldurduktan sonra mevcut dijital durumunuzu, hedeflerinizi ve öncelikleri ele alan kısa bir brifing görüşmesi yapıyoruz. Bu görüşme bağlayıcı değil — hangi çözümün projenize uygun olduğunu birlikte değerlendirmek için bir başlangıç noktası. Görüşmenin ardından kapsam, süreç ve fiyatlandırmayı netleştiren bir teklif hazırlanır. Onay verilmeden hiçbir iş başlamaz.",
  },
  {
    // SEO — En büyük şüphe, dönüşüm için kritik
    q: "SEO garantisi veriyor musunuz?",
    a: "Hayır — ve bu soruya 'evet' diyen ajanslardan uzak durmanızı öneririz. SEO; teknik altyapı, içerik otoritesi, bağlantı profili ve kullanıcı davranışının bileşkesidir. Hiçbir ajans Google'ın sıralama kararını garanti edemez — piyasa koşulları, algoritma güncellemeleri ve rekabet bu kararı etkiler. Bizim taahhüdümüz: her adımda veriyle desteklenen strateji, şeffaf raporlama ve sonuçların açıkça yorumlanması. Sıralamayı değil, sıralamanızı büyütecek sistemi inşa ediyoruz.",
  },
  {
    // DÖNÜŞÜM & ÖLÇÜMLEME — Çoğu müşteri bu konuyu bilmiyor, değer anlatımı güçlü
    q: "GA4 ve GTM kurulumu neden bu kadar önemli?",
    a: "Çoğu web sitesi ziyaretçiyi izliyor ama doğru aksiyonları ölçümlemiyor. Form gönderimi, telefon tıklaması, WhatsApp açılması, randevu butonu — bunların hangisinin gerçekten müşteriye dönüştüğünü bilmeden reklam bütçesini optimize etmek mümkün değil. GA4 ve GTM kurulumu bu olayları görünür hale getirir. Sonuç: hangi kanal işe yarıyor, hangi sayfa dönüştürüyor, bütçenin hangi kısmı boşa gidiyor — artık veriye dayanarak karar alırsınız.",
  },
  {
    // WEB SİTESİ — Pratik, çok sorulan ilk soru
    q: "Web sitesi projesi ne kadar sürer?",
    a: "Proje kapsamına göre değişir. İçeriklerin hazır olduğu kurumsal bir site genellikle 3–4 haftada tamamlanır. Özel tasarım, çok sayfalı yapı veya entegrasyon gerektiren projelerde bu süre 6–10 haftaya uzayabilir. Süreyi en çok etkileyen faktör içerik ve onay hızıdır — teknik ekip beklemek zorunda kalmadığında zaman önemli ölçüde kısalır. Tahmini süreyi brifing görüşmesinde projenize özel netleştiririz.",
  },

  /* ── Geri kalan 8: "Tümünü Gör" ile açılır ─────────────────────────────── */

  {
    // SEO — Beklenti yönetimi
    q: "SEO çalışmalarının sonucunu ne zaman görürüm?",
    a: "SEO süreci katmanlı işler: teknik düzenlemeler (site hızı, indeksleme, schema) genellikle arama konsolunda ilk sinyallerini birkaç hafta içinde vermeye başlar. İçerik otoritesinin büyümesi ve rekabetçi anahtar kelimelerde anlamlı sıralama hareketi ise ortalama 3–6 ay arasında görülür — sektör rekabetine, domain yaşına ve başlangıç teknik durumuna göre bu süre değişir. İlk görüşmede sitenize özel gerçekçi bir beklenti çerçevesi çiziyoruz; umut değil, veri konuşuyor.",
  },
  {
    // SEO — Fiyat itirazı
    q: "Rakibim çok daha ucuza SEO yaptırıyor — sizin farkınız ne?",
    a: "Düşük fiyatlı SEO genellikle üç şeyden birini yapar: gerçekten bir şey yapmamak, yüzeysel düzenlemelerle yetinmek ya da kısa vadeli trafik için arama motorunun cezalandırdığı yöntemlere başvurmak. İkinci ve üçüncü senaryo uzun vadede sitenize zarar verir; birincisi ise boşa harcanan bütçeden ibarettir. Biz teknik SEO, içerik mimarisi ve otorite inşasını bütüncül yönetiriz. Yapılan çalışmalar ve gerekçeleri düzenli raporlanır — ne yapıldığını ve neden yapıldığını görebilirsiniz.",
  },
  {
    // DÖNÜŞÜM — Dönüşüm optimizasyonunun somut değeri
    q: "Dönüşüm oranı optimizasyonu ne sağlar, nasıl çalışır?",
    a: "Sitenize gelen ziyaretçinin müşteriye dönüşme oranını artırmak için sayfa yapısı, içerik hiyerarşisi, form akışı ve CTA konumlarını analiz edip iyileştiririz. Kullanıcı davranışı verisi — hangi sayfada çıkıyor, nerede duraksıyor, hangi buton tıklanmıyor — bu kararların temelini oluşturur. Reklam bütçenizi artırmadan mevcut trafikten daha fazla sonuç almanın en doğrudan yolu budur. Küçük bir dönüşüm oranı artışı bile yıllık ölçekte bütçe tasarrufu veya gelir artışı anlamına gelir.",
  },
  {
    // WEB SİTESİ — Platform kararı
    q: "WordPress mu, Next.js mi — hangisi daha iyi?",
    a: "Her ikisi de doğru bağlamda geçerli seçimdir. WordPress, içerik ağırlıklı ve yönetim kolaylığı öncelikli siteler için pratik bir seçenek olmaya devam ediyor. Yoğun trafik, çok dilli yapı, e-ticaret entegrasyonu veya yüksek performans gerektiren projelerde modern framework mimarisinin avantajları ölçülebilir hale gelir: sayfa ağırlığı düşer, hız artar, ölçeklenmesi kolaylaşır. İhtiyacı doğru okuyup teknolojiyi projeye uydurmak — projeyi teknolojiye uydurmaktan her zaman daha iyi sonuç verir.",
  },
  {
    // WEB SİTESİ — Bağımsızlık güvencesi
    q: "Proje bittikten sonra siteyi kendim güncelleyebilir miyim?",
    a: "Projenin altyapısına göre değişir. WordPress projelerinde içerik değişiklikleri, görsel güncellemeler ve sayfa düzenlemeleri için teknik bilgiye gerek yoktur — yönetim paneli üzerinden yapabilirsiniz. Daha karmaşık mimarilerde içerik yönetimi için ayrı bir sistem entegre edildiğinde metin, görsel ve veri güncellemeleri teknik bilgi gerektirmeden yapılabilir hale gelir. Teslim sürecinde hangi işlemleri bağımsız yönetebileceğinizi açıkça aktarıyoruz.",
  },
  {
    // GÜVEN — Hesap sahipliği
    q: "Domain, hosting ve reklam hesaplarım bende mi kalır?",
    a: "Evet. Domain tescili sizin adınıza yapılır ya da mevcut kaydınız korunur. Hosting ortamı size açılır; ödeme ve yönetim sizin kontrolünüzdedir. Google Ads, Analytics, Search Console ve benzer platformlardaki hesaplar her zaman sizin mülkiyetinizde kalır — biz yönetici yetkisiyle çalışırız. Çalışma ilişkisi ne şekilde ilerlerse ilerlesin dijital varlıklarınız size aittir; bu proje başında yazılı olarak belgelenir.",
  },
  {
    // GÜVEN — Kod ve tasarım sahipliği
    q: "Geliştirilen kod ve tasarımlar kime ait?",
    a: "Proje tesliminin ardından üretilen kodun ve tasarımın kullanım hakları müşteriye aittir — başka bir ajans veya ekiple çalışmaya geçişi mümkün kılar. Sahiplik ve devir koşulları proje başında netleştirilir; sürpriz yoktur. Kodu kendi bünyenizde sürdürmek ya da farklı bir ekiple devam etmek istediğinizde engel çıkmaz.",
  },
  {
    // GÜVEN — Bakım ve kontrol güvencesi
    q: "Site bakımını siz üstlenirseniz kontrolü kaybeder miyim?",
    a: "Hayır. Bakım, teknik işleyişin profesyonel olarak yürütülmesidir — sahipliği devretmek değil. Hosting ortamı, güvenlik güncellemeleri ve SSL yönetimi tarafımızdan takip edilir. Ancak domain kaydı, DNS ayarları ve tüm platform hesapları her zaman sizin adınıza kayıtlı kalır. Çalışma ilişkisini değiştirmeye karar verirseniz tüm erişim bilgileri ve teknik dokümanlar sizindir; geçiş sürecini kolaylaştırmak yaklaşımımızın bir parçasıdır.",
  },
];

/* ─────────────────────────────────────────────
   Diğer hizmet sayfaları — ileride doldurulacak
───────────────────────────────────────────── */
export const googleAdsFaqs: FAQItem[] = [];
export const metaAdsFaqs: FAQItem[] = [];
export const webDesignFaqs: FAQItem[] = []; // webSeoFaqs'a taşındı
export const seoFaqs: FAQItem[] = []; // webSeoFaqs'a taşındı
export const ecommerceFaqs: FAQItem[] = [];
export const socialMgmtFaqs: FAQItem[] = [];
export const brandingFaqs: FAQItem[] = [];
