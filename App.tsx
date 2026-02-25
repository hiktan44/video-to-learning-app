/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
/* tslint:disable */

// Fix: Import React to resolve 'Cannot find namespace 'React'' error.
import React from 'react';
import ContentContainer from '@/components/ContentContainer';
import ExampleGallery from '@/components/ExampleGallery';
import LandingPage from '@/components/LandingPage';
import PromptSelector from '@/components/PromptSelector';
import TranscriptView from '@/components/TranscriptView';
import {DataContext} from '@/context';
import {parseJSON} from '@/lib/parse';
import {PROMPT_TEMPLATES, TRANSCRIPT_FROM_VIDEO_PROMPT, PromptTemplate} from '@/lib/prompts';
import {generateText} from '@/lib/textGeneration';
import {Example, TranscriptLine} from '@/lib/types';
import {getYouTubeVideoId} from '@/lib/youtube';
import {useContext, useEffect, useRef, useState} from 'react';

// Whether to validate the input URL before attempting to generate content
const VALIDATE_INPUT_URL = true;

// Whether to pre-seed with example content
const PRESEED_CONTENT = false;

// Add YT Player types to the global window object for TypeScript
declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

export default function App() {
  const {defaultExample, examples} = useContext(DataContext);
  const [showLanding, setShowLanding] = useState(!PRESEED_CONTENT);
  const [videoUrl, setVideoUrl] = useState(
    PRESEED_CONTENT ? defaultExample?.url : '',
  );

  const [urlValidating, setUrlValidating] = useState(false);
  const [contentLoading, setContentLoading] = useState(false);
  const [transcriptLoading, setTranscriptLoading] = useState(false);
  const [transcript, setTranscript] = useState<TranscriptLine[]>([]);
  const [transcriptError, setTranscriptError] = useState<string | null>(null);
  const [activeTime, setActiveTime] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPromptTemplate, setSelectedPromptTemplate] =
    useState<PromptTemplate>(PROMPT_TEMPLATES[0]);

  const contentContainerRef = useRef<{
    getSpec: () => string;
    getCode: () => string;
  } | null>(null);
  const [reloadCounter, setReloadCounter] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedExample, setSelectedExample] = useState<Example | null>(
    PRESEED_CONTENT ? defaultExample : null,
  );

  const playerRef = useRef<any>(null); // To hold the YT.Player instance
  const timeIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    // Sadece videoUrl varsa player oluştur
    if (!videoUrl) return;
    
    // This function will be called by the YouTube Iframe API script
    window.onYouTubeIframeAPIReady = () => {
      const videoId = getYouTubeVideoId(videoUrl);
      if (videoId && !playerRef.current) {
        createPlayer(videoId);
      }
    };

    // If the script is already loaded (e.g., on component re-render)
    if (window.YT && window.YT.Player) {
      const videoId = getYouTubeVideoId(videoUrl);
      if (videoId && !playerRef.current) {
        createPlayer(videoId);
      }
    }

    return () => {
      // Clean up interval on component unmount
      if (timeIntervalRef.current) {
        clearInterval(timeIntervalRef.current);
      }
    };
  }, [videoUrl]); // Re-run if videoUrl changes

  const createPlayer = (videoId: string) => {
    if (playerRef.current) {
      playerRef.current.destroy();
    }
    playerRef.current = new window.YT.Player('youtube-player-container', {
      height: '100%',
      width: '100%',
      videoId: videoId,
      playerVars: {
        playsinline: 1,
      },
      events: {
        onStateChange: onPlayerStateChange,
      },
    });
  };

  const onPlayerStateChange = (event: any) => {
    if (timeIntervalRef.current) {
      clearInterval(timeIntervalRef.current);
    }
    if (event.data === window.YT.PlayerState.PLAYING) {
      timeIntervalRef.current = window.setInterval(() => {
        if (playerRef.current) {
          setActiveTime(playerRef.current.getCurrentTime() || 0);
        }
      }, 500); // Poll every 500ms
    }
  };

  const generateTranscript = async (url: string) => {
    setTranscriptLoading(true);
    setTranscript([]);
    setTranscriptError(null);
    try {
      const response = await generateText({
        // Fix: Use the recommended model for general text tasks.
        modelName: 'gemini-2.5-flash',
        prompt: TRANSCRIPT_FROM_VIDEO_PROMPT,
        videoUrl: url,
      });
      const parsedTranscript = parseJSON(response);
      setTranscript(parsedTranscript);
    } catch (err) {
      console.error('Failed to generate transcript:', err);
      setTranscriptError(
        'Üzgünüz, bu video için transkript oluşturulamadı.',
      );
    } finally {
      setTranscriptLoading(false);
    }
  };

  const handleTranscriptSeek = (time: number) => {
    if (playerRef.current) {
      playerRef.current.seekTo(time, true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === 'Enter' &&
      !urlValidating &&
      !contentLoading &&
      !transcriptLoading
    ) {
      handleSubmit();
    }
  };

  const handleExampleSelect = (example: Example) => {
    if (inputRef.current) {
      inputRef.current.value = example.url;
    }
    setVideoUrl(example.url);
    setSelectedExample(example);
    setReloadCounter((c) => c + 1);
    generateTranscript(example.url);
  };

  const handleSubmit = async () => {
    const inputValue = inputRef.current?.value.trim() || '';
    if (!inputValue) {
      inputRef.current?.focus();
      return;
    }
    if (urlValidating) return;

    setUrlValidating(true);
    setVideoUrl('');
    setContentLoading(false);
    setTranscriptLoading(false);
    setTranscript([]);
    setTranscriptError(null);
    setSelectedExample(null);

    const isPreSeededExample = [defaultExample, ...examples].some(
      (example) => example.url === inputValue,
    );
    if (isPreSeededExample) {
      proceedWithVideo(inputValue);
      return;
    }

    if (VALIDATE_INPUT_URL) {
      proceedWithVideo(inputValue);
    } else {
      alert('Geçersiz YouTube URL\'si');
      setUrlValidating(false);
    }
  };

  const proceedWithVideo = (url: string) => {
    setVideoUrl(url);
    generateTranscript(url);
    setReloadCounter((c) => c + 1);
    setUrlValidating(false);
  };

  const handleContentLoadingStateChange = (isLoading: boolean) => {
    setContentLoading(isLoading);
  };

  const exampleGallery = (
    <ExampleGallery
      title={PRESEED_CONTENT ? 'Daha fazla örnek' : 'Örnekler'}
      onSelectExample={handleExampleSelect}
      selectedExample={selectedExample}
    />
  );

  const isAnythingLoading = urlValidating || contentLoading || transcriptLoading;
  let buttonText = 'Uygulama Oluştur';
  if (urlValidating) {
    buttonText = 'Doğrulanıyor...';
  } else if (contentLoading) {
    buttonText = 'Uygulama Oluşturuluyor...';
  } else if (transcriptLoading) {
    buttonText = 'Transkript Oluşturuluyor...';
  }

  // Landing page görünümü
  if (showLanding) {
    return <LandingPage onGetStarted={() => setShowLanding(false)} />;
  }

  return (
    <>
      <main className="main-container">
        <div className="left-side">
          <h1 className="headline">AI Uygulama Oluşturucu</h1>
          <p className="subtitle">
            YouTube videolarından profesyonel web uygulamaları oluşturun
          </p>
          <p className="attribution">
            <strong>Aaron Wade</strong> tarafından geliştirilen bir deney
          </p>

          <PromptSelector
            selectedId={selectedPromptTemplate.id}
            onSelect={setSelectedPromptTemplate}
          />

          <div className="input-container">
            <label htmlFor="youtube-url" className="input-label">
              YouTube URL'sini yapıştırın:
            </label>
            <input
              ref={inputRef}
              id="youtube-url"
              className="youtube-input"
              type="text"
              placeholder="https://www.youtube.com/watch?v=..."
              defaultValue={PRESEED_CONTENT ? defaultExample?.url : ''}
              disabled={isAnythingLoading}
              onKeyDown={handleKeyDown}
              onChange={() => {
                setVideoUrl('');
                setSelectedExample(null);
                setTranscript([]);
                setTranscriptError(null);
              }}
            />
          </div>

          <div className="button-container">
            <button
              onClick={handleSubmit}
              className="button-primary submit-button"
              disabled={isAnythingLoading}>
              {buttonText}
            </button>
          </div>

          <div className="video-container">
            {videoUrl ? (
              <div id="youtube-player-container" className="video-iframe"></div>
            ) : (
              <div className="video-placeholder">Video burada görünecek</div>
            )}
          </div>

          {videoUrl && (
            <div className="transcript-container">
              <TranscriptView
                transcript={transcript}
                isLoading={transcriptLoading}
                error={transcriptError}
                activeTime={activeTime}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onSeek={handleTranscriptSeek}
              />
            </div>
          )}

          <div className="gallery-container desktop-gallery-container">
            {exampleGallery}
          </div>
        </div>

        <div className="right-side">
          <div className="content-area">
            {videoUrl ? (
              <ContentContainer
                key={reloadCounter}
                contentBasis={videoUrl}
                onLoadingStateChange={handleContentLoadingStateChange}
                preSeededSpec={selectedExample?.spec}
                preSeededCode={selectedExample?.code}
                selectedPrompt={selectedPromptTemplate.prompt}
                ref={contentContainerRef}
              />
            ) : (
              <div className="content-placeholder">
                <p>
                  {urlValidating
                    ? 'URL doğrulanıyor...'
                    : 'Başlamak için bir YouTube URL\'si yapıştırın veya bir örnek seçin'}
                </p>
              </div>
            )}
          </div>

          <div className="gallery-container mobile-gallery-container">
            {exampleGallery}
          </div>
        </div>
      </main>

      <style>{`
        .main-container {
          --color-headline: light-dark(#000, #fff);
          --color-subtitle: light-dark(#666, #c8c8c8);
          --color-attribution: light-dark(#999, #e1e1e1);

          --color-video-container-background: light-dark(#f0f0f0, #f4f4f4);

          --color-video-placeholder-text: light-dark(#787878, #4d4d4d);

          --color-content-placeholder-border: light-dark(#ccc, #9a9b9c);
          --color-content-placeholder-text: light-dark(#787878, #f4f4f4);

          padding: 2rem;
          display: flex;
          gap: 2rem;
          height: 100vh;
          box-sizing: border-box;
          overflow: hidden;

          @media (max-width: 768px) {
            flex-direction: column;
            padding: 2.25rem 1.5rem 1.5rem;
            gap: 1rem;
            height: auto;
            overflow: visible;
          }
        }

        .left-side {
          width: 40%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          overflow-y: auto;
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE and Edge */

          @media (max-width: 768px) {
            width: 100%;
            height: auto;
            overflow: visible;
          }
        }

        .left-side::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }

        .right-side {
          display: flex;
          flex-direction: column;
          flex: 1;
          gap: 1rem;
          height: 100%;

          @media (max-width: 768px) {
            height: auto;
          }
        }


        .headline {
          color: var(--color-headline);
          font-family: var(--font-display);
          font-size: 4rem;
          font-weight: 400;
          margin-top: 0.5rem;
          margin-bottom: 0;
          text-align: center;
          text-transform: uppercase;

          @media (max-width: 768px) {
            font-size: 2.625rem;
            margin-top: 0;
          }
        }

        .subtitle {
          color: var(--color-subtitle);
          font-size: 1.2rem;
          margin-top: -0.5rem;
          margin-bottom: 0;
          text-align: center;

          @media (max-width: 768px) {
            font-size: 0.875rem;
          }
        }

        .attribution {
          color: var(--color-attribution);
          font-family: var(--font-secondary);
          font-size: 0.9rem;
          font-style: italic;
          margin-bottom: 1rem;
          margin-top: -0.5rem;
          text-align: center;

          @media (max-width: 768px) {
            font-size: 0.8rem;
          }
        }

        .input-container {
          width: 100%;
        }

        .input-label {
          display: block;
          margin-bottom: 0.5rem;
        }

        .youtube-input {
          width: 100%;
        }

        .button-container {
          width: 100%;
          display: flex;
          gap: 0.5rem;
        }

        .submit-button {
          flex: 1;
        }

        .share-button {
          flex: 0.05;
        }

        .video-container {
          background-color: var(--color-video-container-background);
          border-radius: 8px;
          color: var(--color-video-placeholder-text);
          margin: 0.5rem 0 0 0;
          padding-top: 56.25%; /* 16:9 aspect ratio */
          position: relative;
          width: 100%;
        }

        .video-iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: none;
          border-radius: 8px;
        }

        .video-placeholder {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .transcript-container {
           width: 100%;
           margin-top: 0.5rem;
        }

        .content-area {
          flex: 1;
          display: flex;
          flex-direction: column;
          max-height: 100%;

          @media (max-width: 768px) {
            max-height: 550px;
            min-height: 550px;
          }
        }

        .content-placeholder {
          align-items: center;
          border: 2px dashed var(--color-content-placeholder-border);
          border-radius: 8px;
          box-sizing: border-box;
          color: var(--color-content-placeholder-text);
          display: flex;
          flex-direction: column;
          font-size: 1.2rem;
          height: 100%;
          justify-content: center;
          padding: 0 2rem;
          width: 100%;

          @media (max-width: 768px) {
            min-height: inherit;
          }
        }

        .gallery-container {
          width: 100%;
        }

        .desktop-gallery-container {
          display: block;

          @media (max-width: 768px) {
            display: none; /* Hide on mobile */
          }
        }

        .mobile-gallery-container {
          display: none; /* Hide on desktop */

          @media (max-width: 768px) {
            display: block;
          }
        }
      `}</style>
    </>
  );
}