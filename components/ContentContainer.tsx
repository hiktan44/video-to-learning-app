/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
/* tslint:disable */

import Editor from '@monaco-editor/react';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';

// import 'react-tabs/style/react-tabs.css'

import {parseHTML, parseJSON} from '@/lib/parse';
import {
  CODE_REGION_CLOSER,
  CODE_REGION_OPENER,
  SPEC_ADDENDUM,
  SPEC_FROM_VIDEO_PROMPT,
} from '@/lib/prompts';
import {generateText} from '@/lib/textGeneration';
import {generateVideoFromSpec} from '@/lib/videoGeneration';
import VideoPlayerModal from './VideoPlayerModal';

interface ContentContainerProps {
  contentBasis: string;
  preSeededSpec?: string;
  preSeededCode?: string;
  selectedPrompt?: string;
  onLoadingStateChange?: (isLoading: boolean) => void;
}

type LoadingState = 'loading-spec' | 'loading-code' | 'ready' | 'error';

// Export the ContentContainer component as a forwardRef component
export default forwardRef(function ContentContainer(
  {
    contentBasis,
    preSeededSpec,
    preSeededCode,
    selectedPrompt,
    onLoadingStateChange,
  }: ContentContainerProps,
  ref,
) {
  const [spec, setSpec] = useState<string>(preSeededSpec || '');
  const [code, setCode] = useState<string>(preSeededCode || '');
  const [iframeKey, setIframeKey] = useState(0);
  const [saveMessage, setSaveMessage] = useState('');
  const [loadingState, setLoadingState] = useState<LoadingState>(
    preSeededSpec && preSeededCode ? 'ready' : 'loading-spec',
  );
  const [error, setError] = useState<string | null>(null);
  const [isEditingSpec, setIsEditingSpec] = useState(false);
  const [editedSpec, setEditedSpec] = useState('');
  const [activeTabIndex, setActiveTabIndex] = useState(0); // 0: Render, 1: Code, 2: Spec

  const [isVideoGenerating, setIsVideoGenerating] = useState(false);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(
    null,
  );
  const [videoGenerationError, setVideoGenerationError] = useState<
    string | null
  >(null);

  // Expose methods to the parent component through ref
  useImperativeHandle(ref, () => ({
    getSpec: () => spec,
    getCode: () => code,
  }));

  // Helper function to generate content spec from video
  const generateSpecFromVideo = async (videoUrl: string): Promise<string> => {
    // Seçilen prompt'u kullan, yoksa default kullan
    const promptToUse = selectedPrompt || SPEC_FROM_VIDEO_PROMPT;
    
    const specResponse = await generateText({
      modelName: 'gemini-2.5-flash',
      prompt: promptToUse,
      videoUrl: videoUrl,
    });

    // AI artık düz metin döndürüyor, JSON parse etmeye gerek yok
    let spec = specResponse.trim();
    
    // Markdown code block varsa temizle
    spec = spec.replace(/```json\n?/gi, '').replace(/```\n?$/g, '');

    spec += SPEC_ADDENDUM;

    return spec;
  };

  // Helper function to generate code from content spec
  const generateCodeFromSpec = async (spec: string): Promise<string> => {
    try {
      const codeResponse = await generateText({
        // Fix: Use recommended model for general text tasks.
        modelName: 'gemini-2.5-flash',
        prompt: spec,
      });

      const code = parseHTML(
        codeResponse,
        CODE_REGION_OPENER,
        CODE_REGION_CLOSER,
      );
      
      if (!code || code.trim().length === 0) {
        throw new Error('AI boş bir HTML yanıtı üretti. Lütfen tekrar deneyin.');
      }
      
      return code;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('HTML kodu oluşturulurken beklenmeyen bir hata oluştu.');
    }
  };

  // Propagate loading state changes as a boolean
  useEffect(() => {
    if (onLoadingStateChange) {
      const isLoading =
        loadingState === 'loading-spec' || loadingState === 'loading-code';
      onLoadingStateChange(isLoading);
    }
  }, [loadingState, onLoadingStateChange]);

  // On mount (or when contentBasis changes), generate a content spec and then use that spec to generate code
  useEffect(() => {
    async function generateContent() {
      // If we have pre-seeded content, skip generation
      if (preSeededSpec && preSeededCode) {
        setSpec(preSeededSpec);
        setCode(preSeededCode);
        setLoadingState('ready');
        return;
      }

      try {
        // Reset states
        setLoadingState('loading-spec');
        setError(null);
        setSpec('');
        setCode('');

        // Generate a content spec based on video content
        const generatedSpec = await generateSpecFromVideo(contentBasis);
        setSpec(generatedSpec);
        setLoadingState('loading-code');

        // Generate code using the generated content spec
        const generatedCode = await generateCodeFromSpec(generatedSpec);
        setCode(generatedCode);
        setLoadingState('ready');
      } catch (err) {
        console.error(
          'An error occurred while attempting to generate content:',
          err,
        );
        setError(
          err instanceof Error ? err.message : 'An unknown error occurred',
        );
        setLoadingState('error');
      }
    }

    generateContent();
  }, [contentBasis, preSeededSpec, preSeededCode]);

  // Re-render iframe when code changes
  useEffect(() => {
    if (code) {
      setIframeKey((prev) => prev + 1);
    }
  }, [code]);

  // Show save message when code changes manually (not during initial load)
  useEffect(() => {
    if (saveMessage) {
      const timer = setTimeout(() => {
        setSaveMessage('');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [saveMessage]);

  const handleCodeChange = (value: string | undefined) => {
    setCode(value || '');
    setSaveMessage('HTML güncellendi. Değişiklikler Önizleme sekmesinde görünecek.');
  };

  const handleSpecEdit = () => {
    setEditedSpec(spec);
    setIsEditingSpec(true);
  };

  const handleSpecSave = async () => {
    const trimmedEditedSpec = editedSpec.trim();

    // Only regenerate if the spec has actually changed
    if (trimmedEditedSpec === spec) {
      setIsEditingSpec(false); // Close the editor
      setEditedSpec(''); // Reset edited spec state
      return;
    }

    try {
      setLoadingState('loading-code');
      setError(null);
      setSpec(trimmedEditedSpec); // Update spec state with trimmed version
      setIsEditingSpec(false);
      setActiveTabIndex(1); // Switch to code tab

      // Generate code using the edited content spec
      const generatedCode = await generateCodeFromSpec(trimmedEditedSpec);
      setCode(generatedCode);
      setLoadingState('ready');
    } catch (err) {
      console.error(
        'An error occurred while attempting to generate code:',
        err,
      );
      setError(
        err instanceof Error ? err.message : 'An unknown error occurred',
      );
      setLoadingState('error');
    }
  };

  const handleSpecCancel = () => {
    setIsEditingSpec(false);
    setEditedSpec('');
  };

  const handleGenerateVideo = async () => {
    if (!spec || isVideoGenerating) return;

    setIsVideoGenerating(true);
    setGeneratedVideoUrl(null);
    setVideoGenerationError(null);

    try {
      const videoUrl = await generateVideoFromSpec(spec);
      setGeneratedVideoUrl(videoUrl);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unknown error occurred.';
      setVideoGenerationError(errorMessage);
      console.error('Video generation failed:', err);
    } finally {
      setIsVideoGenerating(false);
    }
  };

  const handleCloseVideoModal = () => {
    // Revoke object URL to free up memory
    if (generatedVideoUrl) {
      URL.revokeObjectURL(generatedVideoUrl);
    }
    setGeneratedVideoUrl(null);
    setVideoGenerationError(null);
  };

  const renderLoadingSpinner = () => (
    <div
      style={{
        alignItems: 'center',
        color: '#666',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
        marginTop: '-2.5rem',
      }}>
      <div className="loading-spinner"></div>
      <p
        style={{
          color: 'light-dark(#787878, #f4f4f4)',
          fontSize: '1.125rem',
          marginTop: '20px',
        }}>
        {loadingState === 'loading-spec'
          ? 'Videodan içerik özellikleri oluşturuluyor...'
          : 'İçerik özelliklerinden kod oluşturuluyor...'}
      </p>
    </div>
  );

  const renderErrorState = () => (
    <div
      style={{
        alignItems: 'center',
        color: 'var(--color-error)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
        marginTop: '-2.5rem',
        textAlign: 'center',
        padding: '0 2rem',
      }}>
      <div
        style={{
          fontFamily: 'var(--font-symbols)',
          fontSize: '5rem',
        }}>
        error
      </div>
      <h3 style={{fontSize: '1.5rem', marginBottom: '0.5rem'}}>Hata Oluştu</h3>
      <p style={{whiteSpace: 'pre-wrap', maxWidth: '600px'}}>{error || 'Bir şeyler yanlış gitti'}</p>
      {!contentBasis.startsWith('http://') &&
      !contentBasis.startsWith('https://') ? (
        <p style={{marginTop: '0.5rem'}}>
          (<strong>NOT:</strong> URL http:// veya https:// ile başlamalıdır)
        </p>
      ) : (
        <p style={{marginTop: '1rem', fontSize: '0.9rem', color: '#666'}}>
          Lütfen tekrar deneyin veya farklı bir video seçin.
        </p>
      )}
    </div>
  );

  // Styles for tab list
  const tabListStyle = {
    backgroundColor: 'transparent',
    display: 'flex',
    listStyle: 'none',
    margin: 0,
    padding: '0 12px',
  };

  // Styles for tabs
  const tabStyle = {
    borderTopLeftRadius: '4px',
    borderTopRightRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    marginRight: '4px',
    padding: '8px 12px',
  };

  // Base style for button container in spec tab
  const buttonContainerStyle = {padding: '0 1rem 1rem'};

  const renderSpecContent = () => {
    if (loadingState === 'error') {
      return spec ? (
        <div
          style={{
            whiteSpace: 'pre-wrap',
            fontFamily: 'var(--font-technical)',
            lineHeight: 1.75,
            flex: 1,
            overflow: 'auto',
            padding: '1rem 2rem',
            maskImage:
              'linear-gradient(to bottom, black 95%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, black 95%, transparent 100%)',
          }}>
          {spec}
        </div>
      ) : (
        renderErrorState()
      );
    }

    if (loadingState === 'loading-spec') {
      return renderLoadingSpinner();
    }

    if (isEditingSpec) {
      return (
        <div style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
          <Editor
            height="100%"
            defaultLanguage="text"
            value={editedSpec}
            onChange={(value) => setEditedSpec(value || '')}
            theme="light"
            options={{
              minimap: {enabled: false},
              fontSize: 14,
              wordWrap: 'on',
              lineNumbers: 'off',
            }}
          />
          <div style={{display: 'flex', gap: '6px', ...buttonContainerStyle}}>
            <button onClick={handleSpecSave} className="button-primary">
              Kaydet ve kodu yeniden oluştur
            </button>
            <button onClick={handleSpecCancel} className="button-secondary">
              İptal
            </button>
          </div>
        </div>
      );
    }

    return (
      <div style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
        <div
          style={{
            whiteSpace: 'pre-wrap',
            fontFamily: 'var(--font-technical)',
            lineHeight: 1.75,
            flex: 1,
            overflow: 'auto',
            padding: '1rem 2rem',
            maskImage:
              'linear-gradient(to bottom, black 95%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, black 95%, transparent 100%)',
          }}>
          {spec}
        </div>
        <div style={{...buttonContainerStyle, display: 'flex', gap: '10px'}}>
          <button
            style={{display: 'flex', alignItems: 'center', gap: '5px'}}
            onClick={handleSpecEdit}
            className="button-primary">
            Düzenle{' '}
            <span
              style={{
                fontFamily: 'var(--font-symbols)',
                fontSize: '1.125rem',
              }}>
              edit
            </span>
          </button>
          {/* Video oluşturma özelliği - Veo 2.0 henüz hazır değil, geçici olarak gizlendi */}
          {false && (
            <button
              onClick={handleGenerateVideo}
              disabled={isVideoGenerating || loadingState !== 'ready'}
              className="button-secondary"
              title="Video oluşturma özelliği Veo 2.0 modeli gerektirir (şu an beta aşamasında)"
              style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
              <span
                style={{
                  fontFamily: 'var(--font-symbols)',
                  fontSize: '1.125rem',
                }}>
                videocam
              </span>
              {isVideoGenerating ? 'Oluşturuluyor...' : 'Video Oluştur (Beta)'}
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        border: '2px solid light-dark(#000, #fff)',
        borderRadius: '8px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        maxHeight: 'inherit',
        minHeight: 'inherit',
        overflow: 'hidden',
        position: 'relative',
      }}>
      {(isVideoGenerating || generatedVideoUrl || videoGenerationError) && (
        <VideoPlayerModal
          isLoading={isVideoGenerating}
          videoUrl={generatedVideoUrl}
          error={videoGenerationError}
          onClose={handleCloseVideoModal}
        />
      )}
      <Tabs
        style={{
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          left: 0,
          position: 'absolute',
          right: 0,
          top: 0,
        }}
        selectedIndex={activeTabIndex}
        onSelect={(index) => {
          // If currently editing spec and switching away from spec tab
          if (isEditingSpec && index !== 2) {
            setIsEditingSpec(false); // Exit edit mode
            setEditedSpec(''); // Clear edited content
          }
          setActiveTabIndex(index); // Update the active tab index
        }}>
        <TabList style={tabListStyle}>
          <Tab style={tabStyle} selectedClassName="selected-tab">
            Önizleme
          </Tab>
          <Tab style={tabStyle} selectedClassName="selected-tab">
            Kod
          </Tab>
          <Tab style={tabStyle} selectedClassName="selected-tab">
            Özellikler
          </Tab>
        </TabList>

        <div style={{flex: 1, overflow: 'hidden'}}>
          <TabPanel style={{height: '100%', padding: '0'}}>
            {loadingState === 'error' ? (
              renderErrorState()
            ) : loadingState !== 'ready' ? (
              renderLoadingSpinner()
            ) : (
              <div
                style={{height: '100%', width: '100%', position: 'relative'}}>
                <iframe
                  key={iframeKey}
                  srcDoc={code}
                  style={{
                    border: 'none',
                    width: '100%',
                    height: '100%',
                  }}
                  title="rendered-html"
                  sandbox="allow-scripts allow-same-origin"
                />
              </div>
            )}
          </TabPanel>

          <TabPanel style={{height: '100%', padding: '0'}}>
            {loadingState === 'error' ? (
              renderErrorState()
            ) : loadingState !== 'ready' ? (
              renderLoadingSpinner()
            ) : (
              <div style={{height: '100%', position: 'relative'}}>
                <Editor
                  height="100%"
                  defaultLanguage="html"
                  value={code}
                  onChange={handleCodeChange}
                  theme="vs-dark"
                  options={{
                    minimap: {enabled: false},
                    fontSize: 14,
                    wordWrap: 'on',
                    formatOnPaste: true,
                    formatOnType: true,
                  }}
                />
                {saveMessage && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '10px',
                      right: '10px',
                      background: 'rgba(0,0,0,0.7)',
                      color: 'white',
                      padding: '5px 10px',
                      borderRadius: '4px',
                      fontSize: '12px',
                    }}>
                    {saveMessage}
                  </div>
                )}
              </div>
            )}
          </TabPanel>

          <TabPanel
            style={{
              height: '100%',
              padding: '1rem',
              overflow: 'auto',
              boxSizing: 'border-box',
            }}>
            {renderSpecContent()}
          </TabPanel>
        </div>
      </Tabs>

      <style>{`
        .selected-tab {
          background: light-dark(#f0f0f0, #fff);
          color: light-dark(#000, var(--color-background));
          font-weight: bold;
        }

        .react-tabs {
          width: 100%;
        }

        .react-tabs__tab-panel {
          border-top: 1px solid light-dark(#000, #fff);
        }

        .loading-spinner {
          animation: spin 1s ease-in-out infinite;
          border: 3px solid rgba(0, 0, 0, 0.1);
          border-radius: 50%;
          border-top-color: var(--color-accent);
          height: 60px;
          width: 60px;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
});