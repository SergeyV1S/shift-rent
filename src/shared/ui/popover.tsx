import { useRef, useState } from "react";

import { useClickOutside } from "@shared/hooks";
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

  useClickOutside(popoverRef, () => setIsOpen(false));

  return (
    <div className='relative w-full' ref={popoverRef}>
      <button
        type='button'
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "rounded-input text-content-05 bg-bg-main disabled:bg-bg-primary disabled:text-content-05 focus-visible:border-brand-primary border-border-light focus-visible:ring-brand-primary transition-[ring, border] h-12 w-full border p-3 duration-200 outline-none focus-visible:ring-2",
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
            "bg-bg-main absolute left-1/2 z-50 w-fit -translate-x-1/2 rounded-md p-3 shadow-lg",
            isOpen ? "animate-slide-down" : "hidden"
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
};
