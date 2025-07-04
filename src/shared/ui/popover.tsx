import { useEffect, useRef, useState } from "react";

import { cn } from "@shared/lib";

import { Typography } from "./typography";

interface IPopoverProps extends React.ComponentProps<"button"> {
  placeholder?: React.ReactNode | string;
}

export const Popover = ({
  className,
  placeholder = "Нажмите чтобы открыть",
  children,
  ...props
}: IPopoverProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className='relative w-full' ref={popoverRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "rounded-input text-content-05 disabled:bg-bg-primary disabled:text-content-05 focus-visible:border-brand-primary border-border-light focus-visible:ring-brand-primary transition-[ring, border] h-12 w-full border bg-white p-3 duration-200 outline-none focus-visible:ring-2",
          className
        )}
        {...props}
      >
        {(placeholder as React.ReactElement)?.type !== undefined ? (
          placeholder
        ) : (
          <Typography className='truncate opacity-70'>{placeholder}</Typography>
        )}
      </button>
      {isOpen && (
        <div
          className={cn(
            "absolute left-1/2 z-50 w-fit -translate-x-1/2 rounded-md bg-white p-3 shadow-lg",
            isOpen ? "animate-slide-down" : "hidden"
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
};
