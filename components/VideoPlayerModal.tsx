/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
/* tslint:disable */
import React from 'react';

interface VideoPlayerModalProps {
  isLoading: boolean;
  videoUrl: string | null;
  error: string | null;
  onClose: () => void;
}

const loadingMessages = [
  'Video oluşturuluyor...',
  'Bu birkaç dakika sürebilir...',
  'Konsept analiz ediliyor...',
  'Sahneler render ediliyor...',
  'Son dokunuşlar ekleniyor...',
  'Neredeyse bitti, biraz daha sabır!',
];

export default function VideoPlayerModal({
  isLoading,
  videoUrl,
  error,
  onClose,
}: VideoPlayerModalProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = React.useState(0);

  React.useEffect(() => {
    let interval: number | null = null;
    if (isLoading) {
      setCurrentMessageIndex(0); // Reset on new loading state
      interval = window.setInterval(() => {
        setCurrentMessageIndex(
          (prevIndex) => (prevIndex + 1) % loadingMessages.length,
        );
      }, 5000); // Change message every 5 seconds
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isLoading]);

  if (!isLoading && !videoUrl && !error) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button
          className="modal-close-button"
          onClick={onClose}
          aria-label="Close">
          &times;
        </button>
        {isLoading && (
          <div className="modal-body">
            <div className="loading-spinner"></div>
            <h3>Video Oluşturuluyor</h3>
            <p>{loadingMessages[currentMessageIndex]}</p>
          </div>
        )}
        {error && (
          <div className="modal-body error-state">
            <h3>Video Oluşturma Hatası</h3>
            <p>{error}</p>
            <button onClick={onClose} className="button-secondary">
              Kapat
            </button>
          </div>
        )}
        {videoUrl && (
          <div className="modal-body">
            <h3>Video Özeti</h3>
            <video src={videoUrl} controls autoPlay muted playsInline loop />
          </div>
        )}
      </div>
      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .modal-content {
          background-color: var(--color-background);
          color: var(--color-text);
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.3);
          width: 90%;
          max-width: 640px;
          position: relative;
          text-align: center;
        }
        .modal-close-button {
          position: absolute;
          top: 10px;
          right: 15px;
          background: none;
          border: none;
          font-size: 2rem;
          color: var(--color-text);
          cursor: pointer;
        }
        .modal-body {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
        }
        .modal-body.error-state p {
            color: var(--color-error);
        }
        .modal-body video {
          width: 100%;
          max-height: 480px;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
}