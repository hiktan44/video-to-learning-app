/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
/* tslint:disable */
import {TranscriptLine} from '@/lib/types';
import React, {useEffect, useMemo, useRef} from 'react';

interface TranscriptViewProps {
  transcript: TranscriptLine[];
  isLoading: boolean;
  error: string | null;
  activeTime: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSeek: (time: number) => void;
}

export default function TranscriptView({
  transcript,
  isLoading,
  error,
  activeTime,
  searchQuery,
  setSearchQuery,
  onSeek,
}: TranscriptViewProps) {
  const activeLineRef = useRef<HTMLParagraphElement>(null);

  const filteredTranscript = useMemo(() => {
    if (!searchQuery) {
      return transcript;
    }
    return transcript.filter((line) =>
      line.text.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [transcript, searchQuery]);

  // Find the index of the current active line in the potentially filtered list
  const activeIndex = useMemo(() => {
    if (!filteredTranscript || filteredTranscript.length === 0) return -1;

    // Find the last line that has a start time before or at the current video time
    let lastBeforeIndex = -1;
    for (let i = 0; i < filteredTranscript.length; i++) {
      if (filteredTranscript[i].time <= activeTime) {
        lastBeforeIndex = i;
      } else {
        break; // Stop as soon as we pass the current time
      }
    }
    return lastBeforeIndex;
  }, [filteredTranscript, activeTime]);

  // Scroll the active line into view when it changes
  useEffect(() => {
    if (activeLineRef.current) {
      activeLineRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [activeIndex]);

  const renderContent = () => {
    if (isLoading) {
      return <div className="transcript-message">Transkript oluşturuluyor...</div>;
    }
    if (error) {
      return <div className="transcript-message error">{error}</div>;
    }
    if (transcript.length > 0 && filteredTranscript.length === 0) {
      return (
        <div className="transcript-message">
          &quot;{searchQuery}&quot; için sonuç bulunamadı.
        </div>
      );
    }
    if (filteredTranscript.length > 0) {
      return filteredTranscript.map((line, index) => {
        const isActive = index === activeIndex;
        return (
          <p
            key={`${line.time}-${index}`}
            ref={isActive ? activeLineRef : null}
            className={`transcript-line ${isActive ? 'active' : ''}`}
            onClick={() => onSeek(line.time)}>
            {line.text}
          </p>
        );
      });
    }
    return null;
  };

  return (
    <div className="transcript-view">
      <div className="transcript-controls">
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Transkriptte ara..."
          className="transcript-search"
          disabled={isLoading || !!error}
        />
      </div>
      <div className="transcript-body">{renderContent()}</div>
      <style>{`
        .transcript-view {
          border: 1px solid light-dark(#ccc, #777);
          border-radius: 8px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          background-color: light-dark(#f9f9f9, #333);
        }
        .transcript-controls {
          padding: 0.5rem;
          border-bottom: 1px solid light-dark(#ccc, #777);
        }
        .transcript-search {
          width: 100%;
          padding: 0.5rem;
          border-radius: 4px;
          border: 1px solid light-dark(#ccc, #777);
          background-color: light-dark(#fff, #444);
          color: light-dark(#000, #fff);
        }
        .transcript-search:focus {
          outline-color: var(--color-accent);
        }
        .transcript-body {
          height: 200px; /* Adjust height as needed */
          overflow-y: auto;
          padding: 0.5rem;
        }
        .transcript-message {
          padding: 1rem;
          text-align: center;
          color: light-dark(#555, #bbb);
        }
        .transcript-message.error {
          color: var(--color-error);
        }
        .transcript-line {
          padding: 0.4rem 0.6rem;
          margin: 0 0 0.2rem 0;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
        .transcript-line:hover {
          background-color: light-dark(#e0e0e0, #444);
        }
        .transcript-line.active {
          background-color: var(--color-accent);
          color: white;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}
