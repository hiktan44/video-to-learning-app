/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
/* tslint:disable */

export const SPEC_FROM_VIDEO_PROMPT = `Sen profesyonel bir web geliştiricisisin. Videoyu analiz et ve basit ama işlevsel bir web uygulaması şartnamesi yaz.

Video içeriğinden ana konsepti çıkar ve bunu pekiştiren interaktif bir uygulama tasarla.

Şartname şunları içermeli:
1. Uygulama amacı (1-2 cümle)
2. Ana özellikler (3-5 madde)
3. Kullanıcı arayüzü (basit açıklama)
4. İnteraktif elemanlar (butonlar, inputlar vb.)

Tasarım: Modern, responsive, tek HTML dosyası.

ÖNEMLİ - ÇIKTI FORMATI:
Şartnameyi DÜMDÜZ METİN olarak yaz. JSON, markdown veya özel formatlar KULLANMA.
Sadece basit metin ile yazılmış detaylı şartname istiyorum.

Başlıkları şöyle yaz: "BAŞLIK:" (markdown ## kullanma)
Alt başlıkları şöyle yaz: "- Alt başlık" (** kullanma)
Numaralı liste: "1. Madde" şeklinde (normal)

ÖRN EK ÇIKTI:
UYGULAMA ADI: Hesap Makinesi

ÖZELLIKLER:
1. Temel işlemler (toplama, çıkarma, çarpma, bölme)
2. Temizle butonu (AC)
3. Sonuç ekranı (büyük, okunabilir)
4. Sayı tuş takımı (0-9)

TASARIM:
- Modern, minimalist arayüz
- Koyu tema
- Grid layout kullan
- Responsive tasarım

Tüm açıklamalar TÜRKÇE olmalıdır.`;

export const TRANSCRIPT_FROM_VIDEO_PROMPT = `Videodan transkript çıkar. Yanıt formatı:

[{"time": 0, "text": "cümle"}, {"time": 5, "text": "cümle"}]

Kurallar:
- SADECE JSON array döndür (ek metin yok)
- Her 5-10 saniyede bir parça
- Array'i tam kapat
- Videonun orijinal dilinde`;

export const CODE_REGION_OPENER = '```';
export const CODE_REGION_CLOSER = '```';

export const SPEC_ADDENDUM = `\n\nKod gereksinimleri:
- Responsive (mobil+desktop)
- Tek HTML dosyası (inline CSS/JS)
- Tüm fonksiyonlar tanımlı olmalı
- Modern JS (ES6+)
- UI metinleri TÜRKÇE

Kodu ${CODE_REGION_OPENER}html ile ${CODE_REGION_CLOSER} arasına koy.`;

// Özel Prompt Şablonları
export const QUIZ_PROMPT = `Videodan quiz uygulaması oluştur.

Özellikler:
- 5-7 çoktan seçmeli soru (4 şık)
- Doğru/yanlış renk kodu (yeşil/kırmızı)
- Skor takibi
- "Sonraki" ve "Tekrar Başla" butonları
- Responsive tasarım
- Ana renk: #0bdb3b

Düz metin olarak yaz, TÜRKÇE.`;

export const FLASHCARD_PROMPT = `Videodan flashcard (çevrilebilir kart) uygulaması oluştur.

Özellikler:
- 8-12 çift taraflı kart
- Ön yüz: Başlık/soru
- Arka yüz: Açıklama/cevap
- 3D flip animasyon
- Önceki/Sonraki butonlar
- Kart sayacı (3/12)
- Klavye desteği (←→)
- Renk: #0bdb3b

Düz metin olarak yaz, TÜRKÇE.`;

export const TIMELINE_PROMPT = `Videodan timeline uygulaması oluştur.

Özellikler:
- Kronolojik olayları çıkar
- Desktop: yatay, Mobil: dikey
- Her olay: tarih, başlık, açıklama
- Tıklanabilir marker'lar
- Modal ile detay
- Renk: #0bdb3b

Düz metin olarak yaz, TÜRKÇE.`;

export const COMPARISON_PROMPT = `Videodan karşılaştırma tablosu oluştur.

Özellikler:
- 2-4 öğeyi karşılaştır
- Özellik satırları (✓/✗ ikon)
- Filtreleme (farklar/benzerlikler)
- Desktop: tablo, Mobil: card
- Renk: #0bdb3b

Düz metin olarak yaz, TÜRKÇE.`;

export const INTERACTIVE_DIAGRAM_PROMPT = `Videodan interaktif diyagram oluştur.

Özellikler:
- Görsel şema/diyagram
- Tıklanabilir elemanlar
- Detay modal'ı
- Bağlantı çizgileri/oklar
- Renk kodlaması
- Renk: #0bdb3b

Düz metin olarak yaz, TÜRKÇE.`;

export const FLOWCHART_PROMPT = `Videodan akış diyagramı (flowchart) oluştur.

Özellikler:
- Süreç adımlarını flowchart olarak göster
- Başlangıç (oval), işlem (dikdörtgen), karar (baklava)
- Bağlantı okları (→)
- Her adıma tıklayınca detay
- Yeşil (başarı), kırmızı (hata) yolları
- Responsive tasarım
- Renk: #0bdb3b

Düz metin olarak yaz, TÜRKÇE.`;

export const KANBAN_PROMPT = `Videodan Kanban board oluştur.

Özellikler:
- 3-4 kolon (Yapılacak, Devam Eden, Tamamlandı)
- Sürükle-bırak kartlar
- Her kart: başlık, açıklama, etiket
- Kart sayaçları
- Filtreleme (etiketlere göre)
- Renk: #0bdb3b

Düz metin olarak yaz, TÜRKÇE.`;

export const DASHBOARD_PROMPT = `Videodan dashboard/kontrol paneli oluştur.

Özellikler:
- İstatistik kartları (sayılar, yüzdeler)
- Grafik/chart gösterimleri
- İlerleme çubukları
- Grid layout
- Renkli veri görselleştirme
- Responsive (mobilde stacked)
- Renk: #0bdb3b

Düz metin olarak yaz, TÜRKÇE.`;

// Prompt şablonları için tip tanımı
export interface PromptTemplate {
  id: string;
  name: string;
  description: string;
  prompt: string;
  icon: string;
}

export const PROMPT_TEMPLATES: PromptTemplate[] = [
  {
    id: 'default',
    name: 'Akıllı Uygulama (Önerilen)',
    description: 'Video içeriğine göre en uygun uygulamayı otomatik oluşturur',
    prompt: SPEC_FROM_VIDEO_PROMPT,
    icon: '🎯',
  },
  {
    id: 'flowchart',
    name: 'Akış Diyagramı (Flowchart)',
    description: 'Süreç akışı, karar ağacı, algoritma gösterimi',
    prompt: FLOWCHART_PROMPT,
    icon: '🔄',
  },
  {
    id: 'quiz',
    name: 'Quiz/Test Uygulaması',
    description: 'Çoktan seçmeli soru-cevap uygulaması',
    prompt: QUIZ_PROMPT,
    icon: '📝',
  },
  {
    id: 'flashcard',
    name: 'Kart Sistemi',
    description: 'Çevrilebilir öğrenme kartları, ürün kataloğu',
    prompt: FLASHCARD_PROMPT,
    icon: '🗂️',
  },
  {
    id: 'kanban',
    name: 'Kanban Board',
    description: 'Görev yönetimi, proje takibi, iş akışı',
    prompt: KANBAN_PROMPT,
    icon: '📋',
  },
  {
    id: 'timeline',
    name: 'Zaman Çizelgesi',
    description: 'Kronolojik akış, proje roadmap, milestone',
    prompt: TIMELINE_PROMPT,
    icon: '⏱️',
  },
  {
    id: 'comparison',
    name: 'Karşılaştırma Tablosu',
    description: 'Ürün, fiyat, özellik karşılaştırma',
    prompt: COMPARISON_PROMPT,
    icon: '⚖️',
  },
  {
    id: 'dashboard',
    name: 'Dashboard/Panel',
    description: 'İstatistik gösterimi, veri görselleştirme',
    prompt: DASHBOARD_PROMPT,
    icon: '📊',
  },
  {
    id: 'diagram',
    name: 'İnteraktif Diyagram',
    description: 'Organizasyon şeması, sistem mimarisi',
    prompt: INTERACTIVE_DIAGRAM_PROMPT,
    icon: '🎨',
  },
];