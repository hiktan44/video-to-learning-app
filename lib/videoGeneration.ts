/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
/* tslint:disable */

import {GoogleGenAI} from '@google/genai';

const POLLING_INTERVAL_MS = 10000;

/**
 * Generates a video summary from a text specification.
 *
 * @param spec - The text specification for the learning app.
 * @returns A URL for the generated video blob.
 */
export async function generateVideoFromSpec(spec: string): Promise<string> {
  // Vite için API key'i doğru şekilde al
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
  
  if (!apiKey) {
    throw new Error('API anahtarı bulunamadı. Lütfen .env.local dosyasını kontrol edin.');
  }
  
  const ai = new GoogleGenAI({apiKey});

  const prompt = `Bu konsepte dayalı kısa (30 saniye), ilgi çekici, eğitici bir video özeti oluştur. Video görsel olarak çekici olmalı ve ana fikri açıkça açıklamalı. Videoda metin overlay kullanma. Konsept:\n\n${spec}`;

  try {
    // NOT: Veo 2.0 modeli özel erişim gerektirebilir
    // Eğer erişiminiz yoksa, bu özellik çalışmayacaktır
    let operation = await ai.models.generateVideos({
      model: 'veo-2.0-generate-001',
      prompt: prompt,
      config: {
        numberOfVideos: 1,
      },
    });

    while (!operation.done) {
      // Wait for the specified polling interval.
      await new Promise((resolve) => setTimeout(resolve, POLLING_INTERVAL_MS));
      // Poll the operation status.
      operation = await ai.operations.getVideosOperation({operation: operation});
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;

    if (!downloadLink) {
      throw new Error(
        'Video üretimi tamamlandı ancak indirme linki bulunamadı.',
      );
    }

    // Fetch the video data. The API key must be appended to the URL.
    const response = await fetch(`${downloadLink}&key=${apiKey}`);
    if (!response.ok) {
      throw new Error(
        `Video dosyası indirilemedi. Durum: ${response.status}`,
      );
    }

    const videoBlob = await response.blob();
    return URL.createObjectURL(videoBlob);
  } catch (error) {
    console.error('Video oluşturma hatası:', error);
    
    // API key hatası kontrolü
    if (error instanceof Error && error.message.includes('API key not valid')) {
      throw new Error(
        'Video oluşturma özelliği için Veo 2.0 modeline erişim gerekiyor.\n\n' +
        'Bu özellik şu anda kullanılamıyor. Ana uygulama oluşturma özellikleri normal çalışmaya devam ediyor.\n\n' +
        'NOT: Veo 2.0 video modeli henüz genel kullanıma açılmamış olabilir veya özel izin gerektirebilir.'
      );
    }
    
    if (error instanceof Error) {
      throw new Error(`Video oluşturma başarısız: ${error.message}`);
    }
    throw new Error('Video oluşturma sırasında bilinmeyen bir hata oluştu.');
  }
}