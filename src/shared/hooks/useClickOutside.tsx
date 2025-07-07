import type { RefObject } from "react";
import { useCallback, useEffect } from "react";

type TClickOutsideHandler = () => void;

export const useClickOutside = (
  ref: RefObject<HTMLElement | null>,
  callback: TClickOutsideHandler
) => {
  const handleClick = useCallback(
    (event: MouseEvent | TouchEvent) => {
      const element = ref.current;
      if (
        element &&
        !element.contains(event.target as Node) &&
        !(event.target instanceof HTMLButtonElement)
      ) {
        callback();
      }
    },
    [callback, ref]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, [handleClick]);

  return ref;
};
