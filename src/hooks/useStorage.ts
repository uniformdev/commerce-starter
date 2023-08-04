import { useEffect, useCallback, useState } from 'react';
import { getStorageItem, updateStorageItem } from '../utilities/storage';

interface SetItemOptions {
  force?: boolean;
}

type SetValue<T> = (value: T, options?: SetItemOptions) => void;

// Cross-Origin Resource Sharing to support Uniform platform Fake Commerce integration
const useStorage = <T>(key: string, initialValue: T): [T, SetValue<T>] => {
  const [value, setStoredValue] = useState<T>(getStorageItem(key) || initialValue);

  const listener = useCallback((e: Event) => {
    const nextValue = getStorageItem(e.type);
    setStoredValue(nextValue as T);
  }, []);

  useEffect(() => {
    window.addEventListener(key, listener, { passive: true });

    return () => {
      window.removeEventListener(key, listener);
    };
  }, [key, listener]);

  const setValue: SetValue<T> = useCallback(
    (nextValue, options?: SetItemOptions) => {
      const { force = false } = options || {};
      const valueToStore = nextValue instanceof Function ? nextValue(value) : nextValue;
      updateStorageItem<T>(key, valueToStore, force);
      window.dispatchEvent(new Event(key));
    },
    [key, value]
  );

  return [value, setValue];
};

export default useStorage;
