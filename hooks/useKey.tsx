import { useEffect } from 'react';

export type KeyModifier = 'meta' | 'ctrl' | 'alt' | 'meta';

export const useKeyCombo = (
  key: string,
  modifier: KeyModifier,
  callback: () => void
) => {
  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (
        e.key === key &&
        (e as unknown as { [key: string]: boolean })[modifier + 'Key']
      ) {
        callback();
      }
    });
    return () => {
      document.removeEventListener('keydown', (e) => {});
    };
  }, []);
};

export const useKeyMap = (callbacks: Record<string, () => void>) => {
  useEffect(() => {
    document.addEventListener('keypress', (e) => {
      if (callbacks[e.key]) {
        callbacks[e.key]();
      }
    });
    return () => {
      document.removeEventListener('keypress', () => {});
    };
  }, [callbacks]);
};
