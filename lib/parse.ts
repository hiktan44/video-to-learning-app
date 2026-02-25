/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
/* tslint:disable */

export const parseJSON = (str: string) => {
  try {
    // Önce tüm stringi temizle
    let cleanStr = str.trim();
    
    // Markdown code block varsa temizle (tüm varyasyonlar)
    cleanStr = cleanStr.replace(/```json\s*/gi, '');
    cleanStr = cleanStr.replace(/```\s*/g, '');
    cleanStr = cleanStr.trim();
    
    // Önce array olup olmadığını kontrol et (genellikle transkript array'dir)
    let startArray = cleanStr.indexOf('[');
    let startObject = cleanStr.indexOf('{');
    
    let start: number;
    let end: number;
    let isArray = false;
    
    // Hangisi önce geliyorsa onu kullan
    if (startArray !== -1 && (startObject === -1 || startArray < startObject)) {
      // Array
      start = startArray;
      end = cleanStr.lastIndexOf(']') + 1;
      isArray = true;
    } else if (startObject !== -1) {
      // Object
      start = startObject;
      end = cleanStr.lastIndexOf('}') + 1;
      isArray = false;
    } else {
      throw new Error('JSON objesi veya array bulunamadı');
    }
    
    if (end <= start) {
      throw new Error('JSON kapatma karakteri bulunamadı');
    }
    
    let jsonStr = cleanStr.substring(start, end);
    
    // İlk deneme - direkt parse et
    try {
      return JSON.parse(jsonStr);
    } catch (firstError) {
      console.warn('İlk JSON parse başarısız, temizleme deneniyor...', firstError);
      
      // Problematik karakterleri düzelt
      // Curly quotes'ları düz karakterlere çevir
      jsonStr = jsonStr.replace(/[\u2018\u2019]/g, "'"); // Single curly quotes -> '
      jsonStr = jsonStr.replace(/[\u201C\u201D]/g, '"'); // Double curly quotes -> "
      
      // Eğer array ise ve düzgün kapanmamışsa, onar
      if (isArray) {
        // Tırnak sayısını kontrol et (çift olmalı)
        const quoteCount = (jsonStr.match(/"/g) || []).length;
        
        if (quoteCount % 2 !== 0) {
          console.warn('Array kesik (tek sayıda tırnak), otomatik kapatılıyor...');
          
          // Son açık tırnak işaretini bul
          let depth = 0;
          let lastCompletePos = 0;
          
          for (let i = 0; i < jsonStr.length; i++) {
            if (jsonStr[i] === '{') depth++;
            if (jsonStr[i] === '}') {
              depth--;
              if (depth === 0) lastCompletePos = i + 1;
            }
          }
          
          // Son tam objeye kadar kes
          if (lastCompletePos > 0) {
            jsonStr = jsonStr.substring(0, lastCompletePos);
          }
          
          // Array'i kapat
          if (!jsonStr.trim().endsWith(']')) {
            jsonStr = jsonStr.trim() + '\n]';
          }
        }
        
        // Son virgülü temizle (varsa)
        jsonStr = jsonStr.replace(/,\s*\]/g, ']');
      }
      
      // İkinci deneme
      try {
        return JSON.parse(jsonStr);
      } catch (secondError) {
        console.error('İkinci parse de başarısız:', secondError);
        console.error('Temizlenmiş JSON:', jsonStr.substring(0, 300));
        throw secondError;
      }
    }
  } catch (error) {
    console.error('JSON parse hatası:', error);
    console.error('Orijinal string:', str.substring(0, 500));
    
    // Hata durumunda daha detaylı mesaj
    throw new Error(
      `JSON ayrıştırma hatası: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}\n\n` +
      `AI'dan gelen yanıt düzgün JSON formatında değil. Lütfen tekrar deneyin.\n\n` +
      `Yanıt önizlemesi: ${str.substring(0, 300)}...`
    );
  }
};

export const parseHTML = (str: string, opener: string, closer: string) => {
  // HTML yanıtını bulmaya çalış
  let start = str.indexOf('<!DOCTYPE html>');
  
  // Eğer <!DOCTYPE html> bulunamazsa, <html> etiketini ara
  if (start === -1) {
    start = str.indexOf('<html');
  }
  
  // Eğer hala bulunamazsa, code block içinde ara
  if (start === -1) {
    const openerIndex = str.indexOf(opener);
    if (openerIndex !== -1) {
      const afterOpener = str.substring(openerIndex + opener.length);
      start = afterOpener.indexOf('<!DOCTYPE html>');
      if (start === -1) {
        start = afterOpener.indexOf('<html');
      }
      if (start !== -1) {
        start = openerIndex + opener.length + start;
      }
    }
  }
  
  if (start === -1) {
    throw new Error(
      'AI Yanıt Hatası\n\nAI, beklenen HTML formatında yanıt üretemedi. Lütfen tekrar deneyin.\n\n' +
      'Orijinal Yanıt: ' + str.substring(0, 200) + (str.length > 200 ? '...' : '')
    );
  }
  
  const end = str.lastIndexOf(closer);
  if (end === -1 || end <= start) {
    // Closer bulunamazsa, </html> etiketini ara
    const htmlEnd = str.lastIndexOf('</html>');
    if (htmlEnd !== -1) {
      return str.substring(start, htmlEnd + 7); // 7 = '</html>'.length
    }
    return str.substring(start);
  }
  
  return str.substring(start, end);
};
