/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
/* tslint:disable */

import {Example} from '@/lib/types';
import {type Dispatch, type SetStateAction, createContext} from 'react';

export interface Data {
  examples: Example[];
  setExamples: Dispatch<SetStateAction<Example[]>>;
  defaultExample: Example;
  isLoading: boolean;
}

// Fix: Provide a default value to createContext that matches the 'Data' interface.
// This resolves a type error where 'null' was passed for a 'Data' type, which
// can lead to cascading and misleading errors in consuming components.
export const DataContext = createContext<Data>({
  examples: [],
  setExamples: () => {
    /* no-op */
  },
  defaultExample: {title: '', url: '', spec: '', code: ''},
  isLoading: true,
});
