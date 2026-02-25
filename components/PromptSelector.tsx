/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
/* tslint:disable */

import React, {useState} from 'react';
import {PROMPT_TEMPLATES, PromptTemplate} from '@/lib/prompts';

interface PromptSelectorProps {
  onSelect: (template: PromptTemplate) => void;
  selectedId: string;
}

export default function PromptSelector({
  onSelect,
  selectedId,
}: PromptSelectorProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const selectedTemplate =
    PROMPT_TEMPLATES.find((t) => t.id === selectedId) || PROMPT_TEMPLATES[0];

  return (
    <div className="prompt-selector">
      <label className="prompt-label">Uygulama Tipi:</label>
      <div className="prompt-dropdown">
        <button
          className="prompt-selected"
          onClick={() => setIsExpanded(!isExpanded)}>
          <span className="prompt-icon">{selectedTemplate.icon}</span>
          <span className="prompt-name">{selectedTemplate.name}</span>
          <span className="prompt-arrow">{isExpanded ? '▲' : '▼'}</span>
        </button>

        {isExpanded && (
          <div className="prompt-options">
            {PROMPT_TEMPLATES.map((template) => (
              <button
                key={template.id}
                className={`prompt-option ${template.id === selectedId ? 'active' : ''}`}
                onClick={() => {
                  onSelect(template);
                  setIsExpanded(false);
                }}>
                <span className="prompt-icon">{template.icon}</span>
                <div className="prompt-info">
                  <div className="prompt-name">{template.name}</div>
                  <div className="prompt-description">
                    {template.description}
                  </div>
                </div>
                {template.id === selectedId && (
                  <span className="prompt-check">✓</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .prompt-selector {
          width: 100%;
          margin-bottom: 1rem;
        }

        .prompt-label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
        }

        .prompt-dropdown {
          position: relative;
          width: 100%;
        }

        .prompt-selected {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          background: light-dark(#fff, #2a2a2a);
          border: 2px solid light-dark(#000, #fff);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .prompt-selected:hover {
          background: light-dark(#f5f5f5, #333);
        }

        .prompt-icon {
          font-size: 1.5rem;
        }

        .prompt-name {
          flex: 1;
          text-align: left;
          font-weight: 500;
        }

        .prompt-arrow {
          font-size: 0.875rem;
          opacity: 0.6;
        }

        .prompt-options {
          position: absolute;
          top: calc(100% + 0.5rem);
          left: 0;
          right: 0;
          background: light-dark(#fff, #2a2a2a);
          border: 2px solid light-dark(#000, #fff);
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          z-index: 1000;
          max-height: 400px;
          overflow-y: auto;
        }

        .prompt-option {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.875rem 1rem;
          background: transparent;
          border: none;
          border-bottom: 1px solid light-dark(#e0e0e0, #444);
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
        }

        .prompt-option:last-child {
          border-bottom: none;
        }

        .prompt-option:hover {
          background: light-dark(#f5f5f5, #333);
        }

        .prompt-option.active {
          background: light-dark(#e8f5e9, #1a4d1a);
        }

        .prompt-info {
          flex: 1;
        }

        .prompt-option .prompt-name {
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .prompt-description {
          font-size: 0.875rem;
          opacity: 0.7;
          line-height: 1.4;
        }

        .prompt-check {
          color: #0bdb3b;
          font-size: 1.25rem;
          font-weight: 700;
        }

        @media (max-width: 768px) {
          .prompt-options {
            max-height: 300px;
          }
        }
      `}</style>
    </div>
  );
}
