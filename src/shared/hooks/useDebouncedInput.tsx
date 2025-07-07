import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { debounce } from "@shared/helpers";

interface IUseDebouncedInputParams<T> {
  value: T;
  onChange: (value: T) => void;
  delay?: number;
}

export const useDebouncedInput = <T,>({
  value,
  onChange,
  delay = 300
}: IUseDebouncedInputParams<T>) => {
  const [inputValue, setInputValue] = useState<T>(value);
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const debouncedOnChange = useMemo(
    () => debounce((newValue: T) => onChangeRef.current(newValue), delay),
    [delay]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value as T;

      setInputValue(newValue);
      debouncedOnChange(newValue);
    },
    [debouncedOnChange]
  );

  return {
    inputValue,
    handleChange
  };
};
