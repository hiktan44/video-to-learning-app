/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
/* tslint:disable */

import App from '@/App';
import {DataContext} from '@/context';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {Example} from './lib/types';

// Fix: Add type annotation for the 'children' prop.
function DataProvider({children}: {children: React.ReactNode}) {
  // Fix: Explicitly type the state to match the context, resolving a type error
  // on the DataContext.Provider value which was causing a misleading parent error.
  const [examples, setExamples] = React.useState<Example[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    setIsLoading(true);
    fetch('data/examples.json')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((fetchedData) => {
        setExamples(fetchedData);
      })
      .catch((err) => {
        console.error('Failed to load examples.json:', err);
        setError(
          "Sorry, we couldn't load the example projects. Please check your connection and try refreshing the page.",
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (error) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          padding: '2rem',
          textAlign: 'center',
          boxSizing: 'border-box',
          fontFamily: 'var(--font-primary, sans-serif)',
          color: 'var(--color-text)',
          backgroundColor: 'var(--color-background)',
        }}>
        <h1
          style={{
            fontFamily: 'var(--font-display, sans-serif)',
            color: 'var(--color-error, #f53311)',
            fontSize: '2.5rem',
            marginBottom: '1rem',
          }}>
          Error Loading Examples
        </h1>
        <p style={{fontSize: '1.2rem'}}>{error}</p>
      </div>
    );
  }

  const empty = {title: '', url: '', spec: '', code: ''};

  const value = {
    examples,
    isLoading,
    setExamples,
    defaultExample: examples.length > 0 ? examples[0] : empty,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

// Fix: Added a non-null assertion to `document.getElementById('root')` to tell
// TypeScript that the element is expected to exist. This can resolve misleading
// type errors downstream, such as the one reported for the <DataProvider> component.
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <DataProvider>
    <App />
  </DataProvider>,
);