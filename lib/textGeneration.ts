/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
/* tslint:disable */

import {
  FinishReason,
  GenerateContentConfig,
  GenerateContentParameters,
  GoogleGenAI,
  HarmBlockThreshold,
  HarmCategory,
  Part,
  SafetySetting,
} from '@google/genai';

interface GenerateTextOptions {
  modelName: string;
  prompt: string;
  videoUrl?: string;
  temperature?: number;
  safetySettings?: SafetySetting[];
}

/**
 * Generate text content using the Gemini API, optionally including video data.
 *
 * @param options - Configuration options for the generation request.
 * @returns The response from the Gemini API.
 */
export async function generateText(
  options: GenerateTextOptions,
): Promise<string> {
  const {modelName, prompt, videoUrl, temperature = 0.4} = options;

  // Fix: Initialize GoogleGenAI with API_KEY from import.meta.env for Vite
  // Vite uses import.meta.env instead of process.env
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
  
  if (!apiKey) {
    throw new Error('VITE_GEMINI_API_KEY is not set. Please add it to your .env.local file.');
  }
  
  const ai = new GoogleGenAI({apiKey});

  const parts: Part[] = [{text: prompt}];

  if (videoUrl) {
    try {
      parts.push({
        fileData: {
          mimeType: 'video/mp4',
          fileUri: videoUrl,
        },
      });
    } catch (error) {
      console.error('Error processing video input:', error);
      throw new Error(`Failed to process video input from URL: ${videoUrl}`);
    }
  }

  try {
    // Fix: Refactored to pass parameters directly to generateContent
    // and use the recommended `contents` structure for single-turn requests.
    const response = await ai.models.generateContent({
      model: modelName,
      contents: {parts},
      config: {
        temperature,
        maxOutputTokens: 8192, // Daha uzun yanıtlar için
        topP: 0.95,
        topK: 40,
      },
    });

    // Check for prompt blockage
    if (response.promptFeedback?.blockReason) {
      throw new Error(
        `Content generation failed: Prompt blocked (reason: ${response.promptFeedback.blockReason})`,
      );
    }

    // Check for response blockage
    if (!response.candidates || response.candidates.length === 0) {
      throw new Error('Content generation failed: No candidates returned.');
    }

    const firstCandidate = response.candidates[0];

    // Check for finish reasons other than STOP
    if (
      firstCandidate.finishReason &&
      firstCandidate.finishReason !== FinishReason.STOP
    ) {
      if (firstCandidate.finishReason === FinishReason.SAFETY) {
        throw new Error(
          'İçerik güvenlik nedeniyle engellendi. Lütfen farklı bir video deneyin.',
        );
      } else if (firstCandidate.finishReason === FinishReason.MAX_TOKENS) {
        // MAX_TOKENS hatası - kısmi yanıtı döndür
        console.warn('Token limiti aşıldı, kısmi yanıt döndürülüyor...');
        return response.text || ''; // Kısmi yanıt yine de dönebilir
      } else {
        throw new Error(
          `İçerik üretimi durdu: ${firstCandidate.finishReason}. Lütfen daha kısa bir video seçin.`,
        );
      }
    }

    return response.text;
  } catch (error) {
    console.error(
      'An error occurred during Gemini API call or response processing:',
      error,
    );
    throw error;
  }
}
