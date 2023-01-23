import { useState, useEffect } from "react";

export function useDebouncing<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const interval = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearInterval(interval);
  }, [value, delay]);

  return debouncedValue;
}
