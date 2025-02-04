// src/hooks/usePersistedState.ts
import { useState, useEffect } from 'react';

export function usePersistedState<T>(key: string, initialValue: T) {
  const [state, setState] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    let parsedValue;
    try {
      parsedValue = stored ? JSON.parse(stored) : initialValue;
    } catch {
      parsedValue = initialValue;
    }
    return parsedValue;
    //return stored ? (JSON.parse(stored) as T) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState] as const;
}
