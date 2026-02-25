<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Video Öğrenme Uygulaması

YouTube videolarından otomatik olarak interaktif öğrenme uygulamaları oluşturun.

## 📑 İçindekiler

- [Özellikler](#-özellikler)
- [Yerel Ortamda Çalıştırma](#-yerel-ortamda-çalıştırma)
- [Kullanım](#-kullanım)
- [Örnek Projeler](#-örnek-projeler)
- [AI Prompt Hazırlama Rehberi](#-ai-prompt-hazırlama-rehberi)
- [Gelişmiş Özelleştirme](#-gelişmiş-özelleştirme)
- [Nasıl Çalışır?](#️-nasıl-çalışır)
- [İpuçları ve En İyi Uygulamalar](#-i̇puçları-ve-en-iyi-uygulamalar)
- [Sorun Giderme](#-sorun-giderme)
- [Teknolojiler](#️-teknolojiler)
- [Proje Yapısı](#-proje-yapısı)
- [Ek Kaynaklar](#-ek-kaynaklar)
- [SSS](#-sss-sık-sorulan-sorular)
- [Katkıda Bulunma](#-katkıda-bulunma)
- [Lisans](#-lisans)

## 🎯 Özellikler

- 📹 **YouTube Video Analizi**: Herhangi bir YouTube videosunu analiz edin
- 🤖 **AI Destekli İçerik Üretimi**: Gemini AI ile otomatik öğrenme materyali oluşturma
- 📝 **Otomatik Transkript**: Videodan otomatik transkript çıkarma ve arama
- 💻 **Interaktif Uygulamalar**: Tek dosyalık, responsive HTML uygulamaları
- 🎨 **Özelleştirilebilir**: Özellikleri düzenleyip kodu yeniden oluşturabilme
- 📱 **Mobil Uyumlu**: Tüm cihazlarda mükemmel çalışır

## 🚀 Yerel Ortamda Çalıştırma

### Gereksinimler

- Node.js (v16 veya üzeri)
- Gemini API anahtarı ([buradan](https://aistudio.google.com/apikey) alabilirsiniz)

### Kurulum Adımları

1. **Bağımlılıkları yükleyin:**
   ```bash
   npm install
   ```

2. **API anahtarını ayarlayın:**
   - `.env.local` dosyasını açın
   - `VITE_GEMINI_API_KEY` değerini kendi Gemini API anahtarınızla değiştirin
   ```
   VITE_GEMINI_API_KEY=sizin_api_anahtariniz
   ```

3. **Uygulamayı çalıştırın:**
   ```bash
   npm run dev
   ```

4. **Tarayıcınızda açın:**
   - Uygulama `http://localhost:3000` adresinde çalışacaktır
   - Port meşgulse otomatik olarak başka bir port seçilir

## 📖 Kullanım

1. Bir YouTube video URL'si yapıştırın
2. "Uygulama Oluştur" butonuna tıklayın
3. AI videoyu analiz edip:
   - Otomatik transkript oluşturur
   - İçerik özellikleri belirler
   - İnteraktif bir öğrenme uygulaması kodlar
4. Oluşturulan uygulamayı önizleyin, kodu görüntüleyin veya düzenleyin

## 💡 Örnek Projeler

Bu uygulama ile aşağıdaki türde öğrenme materyalleri oluşturabilirsiniz:

### 1. **Matematik Konuları**
**Örnek Video**: Matematiksel fonksiyonlar, geometri, cebir dersleri
- **Oluşturulacak**: İnteraktif grafik çizici, denklem çözücü, geometri simülatörü
- **Özellikler**: Canlı hesaplamalar, görsel gösterimler, adım adım çözümler

### 2. **Programlama Eğitimleri**
**Örnek Video**: JavaScript, Python, algoritma dersleri
- **Oluşturulacak**: Kod editörü simülatörü, algoritma görselleştiricisi
- **Özellikler**: Kod örnekleri, interaktif playground, debug araçları

### 3. **Fizik ve Kimya**
**Örnek Video**: Newton kanunları, kimyasal reaksiyonlar, optik
- **Oluşturulacak**: Fizik simülatörleri, molekül görselleştiricisi
- **Özellikler**: Animasyonlu diyagramlar, parametre ayarlayıcılar

### 4. **Dil Öğrenimi**
**Örnek Video**: İngilizce gramer, kelime öğretimi
- **Oluşturulacak**: Flashcard uygulaması, quiz oluşturucu
- **Özellikler**: Kelime kartları, telaffuz pratikleri, test modülleri

### 5. **Müzik Teorisi**
**Örnek Video**: Akorlar, notalar, ritim eğitimi
- **Oluşturulacak**: Sanal klavye, akord gösterici
- **Özellikler**: Ses çıkarma, nota gösterimi, ritim oyunları

## 🎨 AI Prompt Hazırlama Rehberi

Uygulamanın AI'sı otomatik olarak prompt oluşturur, ancak özel ihtiyaçlar için `lib/prompts.ts` dosyasını düzenleyebilirsiniz.

### Etkili Prompt Yapısı

#### 1. **Bağlam Belirleme**
```typescript
"Sen bir [uzman rolü] ve [ek beceri] konusunda derin uzmanlığa sahipsin."
```
**Örnek**: "Sen bir matematik öğretmeni ve interaktif simülasyon tasarımcısısın."

#### 2. **Görev Tanımlama**
```typescript
"Ekteki videonun içeriğini incele ve [spesifik görev] için [çıktı türü] oluştur."
```
**Örnek**: "...ve öğrencilerin konuyu pekiştirmesi için interaktif bir quiz uygulaması oluştur."

#### 3. **Gereksinimler Listesi**
```markdown
ŞARTNAME:
1. Uygulama [özellik 1] içermelidir
2. Kullanıcı [aksiyonu yapabilmeli]
3. [Görsel element] gösterilmelidir
4. [Feedback mekanizması] olmalıdır
```

#### 4. **Teknik Kısıtlamalar**
```markdown
TEKNİK GEREKLER:
- Tek HTML dosyası (inline CSS ve JS)
- Responsive tasarım (mobil + desktop)
- Modern JavaScript (ES6+)
- Accessibility standartları
```

#### 5. **Çıktı Formatı**
```markdown
ÇIKTI:
- JSON formatında "spec" anahtarı
- Kod blokları ``` arasında
- Türkçe açıklamalar
```

### Örnek Özel Prompt

```typescript
export const CUSTOM_QUIZ_PROMPT = `Sen bir eğitim teknolojileri uzmanısın.

Ekteki eğitim videosunu incele ve aşağıdaki özelliklere sahip bir quiz uygulaması oluştur:

ŞARTNAME:
1. Video içeriğinden 5-10 çoktan seçmeli soru oluştur
2. Her sorunun 4 şıkkı olsun
3. Doğru cevap yeşil, yanlış cevap kırmızı renkte gösterilsin
4. Skor takibi yapılsın (%başarı oranı)
5. Her soru için kısa bir açıklama gösterilsin
6. "Tekrar Dene" butonu olsun

TEKNİK:
- Tek HTML dosyası
- Bootstrap veya Tailwind kullanma (sade CSS)
- localStorage ile skor kaydet
- Mobil öncelikli tasarım

ÇIKTI:
JSON formatında "spec" alanında şartname döndür.
Tüm metinler TÜRKÇE olmalıdır.`;
```

### Prompt Özelleştirme Örnekleri

#### **Örnek 1: Flashcard Uygulaması**
```typescript
const FLASHCARD_PROMPT = `
Video içeriğinden temel kavramları çıkar ve her kavram için:
- Ön yüz: Kavram adı
- Arka yüz: Detaylı açıklama
- Kartları çevirme animasyonu
- "Biliyorum/Bilmiyorum" butonu ile ilerleme takibi
`;
```

#### **Örnek 2: Timeline Görselleştirici**
```typescript
const TIMELINE_PROMPT = `
Tarih veya süreç içeren videolar için:
- Kronolojik zaman çizelgesi
- Her olay için tıklanabilir noktalar
- Detay popup'ları
- Zoom in/out özelligi
`;
```

#### **Örnek 3: Karşılaştırma Tablosu**
```typescript
const COMPARISON_PROMPT = `
Karşılaştırma içeren içerik için:
- Yan yana karşılaştırma tablosu
- Benzerlikler ve farklar bölümleri
- Filtreleme ve sıralama
- Görsel göstergeler (✓ ✗ ikonu)
`;
```

## 🔧 Gelişmiş Özelleştirme

### Kendi Prompt'unuzu Eklemek

1. `lib/prompts.ts` dosyasını açın
2. Yeni bir prompt sabiti ekleyin:
```typescript
export const OZEL_PROMPT = `[Prompt içeriğiniz]`;
```

3. `components/ContentContainer.tsx`'de kullanın:
```typescript
import { OZEL_PROMPT } from '@/lib/prompts';

// generateSpecFromVideo fonksiyonunda:
const specResponse = await generateText({
  modelName: 'gemini-2.5-flash',
  prompt: OZEL_PROMPT, // Kendi prompt'unuz
  videoUrl: videoUrl,
});
```

### UI Metnini Değiştirmek

Tüm kullanıcı arayüzü metinleri ilgili bileşenlerde bulunur:
- Ana sayfa: `App.tsx`
- İçerik konteyner: `components/ContentContainer.tsx`
- Transkript: `components/TranscriptView.tsx`
- Video modal: `components/VideoPlayerModal.tsx`

## ⚙️ Nasıl Çalışır?

### İşleyiş Adımları

1. **Video Analizi** 
   - YouTube URL'sinden video ID'si çıkarılır
   - Video Gemini AI'ya gönderilir

2. **Transkript Oluşturma**
   - AI videoyu izler ve konuşulan metni çıkarır
   - Zaman damgalı parçalara ayrılır
   - Aranabilir transkript oluşturulur

3. **İçerik Şartnamesi**
   - AI video içeriğini analiz eder
   - Anahtar kavramları belirler
   - İnteraktif uygulama için şartname yazar

4. **Kod Üretimi**
   - Şartname AI'ya tekrar gönderilir
   - Tek dosyalık HTML uygulaması kodlanır
   - Inline CSS ve JavaScript içerir

5. **Önizleme ve Düzenleme**
   - Kod Monaco Editor'de düzenlenebilir
   - Değişiklikler anında önizlenebilir
   - Şartname düzenlenip kod yeniden oluşturulabilir

### AI Model Detayları

- **Model**: Gemini 2.5 Flash
- **Güçlü Yönleri**: 
  - Video analizi
  - Uzun içerik anlama
  - Kod üretimi
  - Türkçe dil desteği
- **Sıcaklık (Temperature)**: 0.75 (yaratıcılık ve tutarlılık dengesi)

## 💡 İpuçları ve En İyi Uygulamalar

### Video Seçimi

✅ **İyi Seçimler:**
- Eğitim odaklı içerik
- Açık ve net anlatımlı videolar
- 5-20 dakika arası videolar
- Tek bir konsepte odaklanan videolar
- Görsel öğeler içeren videolar

❌ **Kaçınılması Gerekenler:**
- Çok uzun videolar (30+ dakika)
- Müzik videoları veya vlog'lar
- Düşük ses kaliteli videolar
- Çok fazla konu içeren videolar

### Daha İyi Sonuçlar İçin

1. **Spesifik Konular**: "Genel matematik" yerine "Trigonometrik fonksiyonlar"
2. **Görsel İçerik**: Grafik, diyagram içeren videolar daha iyi uygulama üretir
3. **Yapılandırılmış İçerik**: Adım adım anlatımlar ideal
4. **Pratik Örnekler**: Örnek çözümler içeren videolar quiz üretiminde daha başarılı

### Prompt İyileştirme Taktikleri

**🎯 Net Talimatlar**
```typescript
// Belirsiz ❌
"Uygulama etkileşimli olmalı"

// Net ✅  
"Kullanıcı her düğmeye tıklayıp sonucu görebilmeli"
```

**📊 Somut Gereksinimler**
```typescript
// Belirsiz ❌
"Bazı sorular olsun"

// Net ✅
"5 adet çoktan seçmeli soru oluştur, her biri 4 şık içersin"
```

**🎨 Görsel Detaylar**
```typescript
// Belirsiz ❌
"Güzel görünsün"

// Net ✅
"Başarılı aksiyonlarda yeşil (#4CAF50), hatalarda kırmızı (#F44336) kullan"
```

## 🐛 Sorun Giderme

### Sık Karşılaşılan Sorunlar

**Sorun**: AI beklenen HTML formatında yanıt vermiyor
- **Çözüm**: Videoyu tekrar deneyin veya daha kısa bir video seçin
- **Neden**: Çok karmaşık veya uzun videolar AI'yı zorlar

**Sorun**: Transkript oluşturulamıyor
- **Çözüm**: Videonun seslendirmeli olduğundan emin olun
- **Neden**: Sessiz veya sadece müzikli videolar transkript üretemez

**Sorun**: API hatası alıyorum
- **Çözüm**: `.env.local` dosyasında API anahtarını kontrol edin
- **Neden**: Geçersiz veya eksik API anahtarı

**Sorun**: Kod çalışmıyor
- **Çözüm**: Kod sekmesinde console hatalarını kontrol edin
- **Neden**: Bazen AI'nın ürettiği kodda küçük hatalar olabilir

**Sorun**: Mobilde düzgün görünmüyor
- **Çözüm**: Şartnamede "Mobil responsive tasarım gerekli" ekleyin
- **Neden**: AI bazen desktop odaklı kod üretebilir

## 🛠️ Teknolojiler

- **Frontend**: React + TypeScript + Vite
- **AI**: Google Gemini 2.5 Flash
- **Kod Editörü**: Monaco Editor (VS Code'un editörü)
- **Video Player**: YouTube IFrame API
- **UI**: Özel CSS (responsive tasarım, light/dark mode)

## 📝 Proje Yapısı

```
video-to-learning-app/
├── components/          # React bileşenleri
│   ├── ContentContainer.tsx    # Ana içerik konteyner
│   ├── ExampleGallery.tsx      # Örnek galeri
│   ├── TranscriptView.tsx      # Transkript görünümü
│   └── VideoPlayerModal.tsx    # Video oynatıcı modal
├── lib/                 # Yardımcı kütüphaneler
│   ├── textGeneration.ts       # AI metin üretimi
│   ├── prompts.ts              # AI prompt'ları
│   ├── parse.ts                # Yanıt ayrıştırma
│   └── youtube.ts              # YouTube yardımcıları
├── App.tsx              # Ana uygulama bileşeni
└── .env.local           # API anahtarı yapılandırması
```

## 🤝 Katkıda Bulunma

1. Bu repository'yi fork edin
2. Yeni bir branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: Add some amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Bir Pull Request açın

## 📄 Lisans

Bu proje Apache-2.0 lisansı altında lisanslanmıştır.

## 📚 Ek Kaynaklar

### Gemini AI
- [Gemini API Dokümantasyonu](https://ai.google.dev/docs)
- [API Anahtarı Alma](https://aistudio.google.com/apikey)
- [Prompt Engineering Rehberi](https://ai.google.dev/docs/prompt_best_practices)

### Web Geliştirme
- [React Dokümantasyonu](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Rehberi](https://vitejs.dev/guide/)

### İlgili Projeler
- [AI Studio](https://ai.studio) - Google'ın AI uygulama platformu
- [Gemini Apps](https://ai.google.dev/examples) - Örnek uygulamalar

## ❓ SSS (Sık Sorulan Sorular)

**S: API kullanımı ücretli mi?**
- C: Gemini API'nin ücretsiz katmanı vardır. Detaylar için [fiyatlandırma sayfasını](https://ai.google.dev/pricing) kontrol edin.

**S: Hangi video platformları destekleniyor?**
- C: Şu anda sadece YouTube desteklenmektedir.

**S: Oluşturulan uygulamaları indirebilir miyim?**
- C: Evet! Kod sekmesindeki HTML'i kopyalayıp `.html` dosyası olarak kaydedebilirsiniz.

**S: Offline çalışır mı?**
- C: Hayır, AI işlemleri için internet bağlantısı gereklidir.

**S: Türkçe dışında dil desteği var mı?**
- C: AI çok dilli destekler, ancak arayüz şu anda Türkçe'dir. Kodda değişiklik yaparak diğer dilleri de ekleyebilirsiniz.

**S: Oluşturulan kodları ticari projede kullanabilir miyim?**
- C: Gemini AI'nın kullanım şartlarına tabi olarak kullanabilirsiniz. Detaylar için Google'ın servis şartlarını inceleyin.

## 🚀 Gelecek Özellikler

Planlanan geliştirmeler:
- [ ] Çoklu dil desteği
- [ ] PDF export özelliği
- [ ] Tema özelleştirme
- [ ] Kullanıcı hesapları ve kayıt
- [ ] Oluşturulan uygulamaları paylaşma
- [ ] Vimeo ve diğer platform desteği
- [ ] Ses dosyalarından içerik üretimi
- [ ] Toplu video işleme
- [ ] Özel AI model ayarları

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! İşte nasıl katkıda bulunabileceğiniz:

### Kod Katkısı

1. Bu repository'yi fork edin
2. Yeni bir branch oluşturun:
   ```bash
   git checkout -b feature/harika-ozellik
   ```
3. Değişikliklerinizi commit edin:
   ```bash
   git commit -m 'feat: Harika özellik eklendi'
   ```
4. Branch'inizi push edin:
   ```bash
   git push origin feature/harika-ozellik
   ```
5. Bir Pull Request açın

### Commit Mesaj Formatı

- `feat:` - Yeni özellik
- `fix:` - Hata düzeltmesi
- `docs:` - Dokümantasyon değişikliği
- `style:` - Kod formatı (mantık değişikliği yok)
- `refactor:` - Kod yeniden yapılandırma
- `test:` - Test ekleme/düzenleme
- `chore:` - Bakım işleri

### Hata Bildirimi

Bir hata bulduysanız:
1. [Issues](../../issues) sayfasını kontrol edin
2. Benzer bir hata yoksa yeni bir issue açın
3. Hatayı detaylı açıklayın:
   - Ne yaptınız?
   - Ne olmasını bekliyordunuz?
   - Ne oldu?
   - Ekran görüntüsü (varsa)

### Özellik İsteği

Yeni bir özellik fikriniz mi var?
1. [Discussions](../../discussions) sayfasında tartışın
2. Topluluktan geri bildirim alın
3. Onay aldıktan sonra geliştirmeye başlayın

## 📄 Lisans

Bu proje Apache-2.0 lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 🙏 Teşekkürler

- **Aaron Wade** - Orijinal konsept ve tasarım
- **Google AI Team** - Gemini API
- **Açık Kaynak Topluluğu** - Kullanılan kütüphaneler

### Kullanılan Kütüphaneler

- [React](https://react.dev) - UI framework
- [TypeScript](https://www.typescriptlang.org) - Tip güvenliği
- [Vite](https://vitejs.dev) - Build tool
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - Kod editörü
- [React Tabs](https://github.com/reactjs/react-tabs) - Tab bileşeni

---

<div align="center">

**⭐ Projeyi beğendiyseniz yıldız vermeyi unutmayın!**

Made with ❤️ by the community

[Hata Bildir](../../issues) · [Özellik İste](../../discussions) · [Katkıda Bulun](../../pulls)

</div>

---

**Not:** Bu uygulama eğitim amaçlıdır. Üretim ortamında kullanmadan önce güvenlik ve performans testleri yapmanız önerilir.
