import React, { useEffect, useRef, useState } from "react";

import { cn } from "@shared/lib";

import { typographyVariants } from "./typography";

interface PopoverProps {
  children: React.ReactNode;
}

interface PopoverTriggerProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

interface PopoverContentProps {
  children: React.ReactNode;
  className?: string;
  align?: "center" | "start" | "end";
  sideOffset?: number;
  isOpen?: boolean;
}

export const Popover = ({ children }: PopoverProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      if (child.type === PopoverTrigger) {
        return React.cloneElement(child as React.ReactElement<PopoverTriggerProps>, {
          onClick: () => setIsOpen((prev) => !prev)
        });
      }
      if (child.type === PopoverContent) {
        return React.cloneElement(child as React.ReactElement<PopoverContentProps>, {
          isOpen
        });
      }
    }
    return child;
  });

  return <div className='relative'>{childrenWithProps}</div>;
};

export const PopoverTrigger = ({ children, className, onClick }: PopoverTriggerProps) => (
  <button
    className={cn(
      "rounded-input border-border-light h-12 w-full border bg-white px-3 text-left",
      typographyVariants(),
      className
    )}
    onClick={onClick}
  >
    {children}
  </button>
);

export const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ children, className, align = "center", sideOffset = 4, isOpen = false }, ref) => {
    const triggerRef = useRef<HTMLButtonElement>(null);

    const getPosition = () => {
      if (!triggerRef.current) return {};

      const rect = triggerRef.current.getBoundingClientRect();
      return {
        top: rect.bottom + sideOffset,
        left:
          align === "center" ? rect.left + rect.width / 2 : align === "end" ? rect.right : rect.left
      };
    };

    useEffect(() => {
      if (isOpen) {
        triggerRef.current = document.querySelector("[data-popover-trigger]") as HTMLButtonElement;
      }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
      <div
        ref={ref}
        className={cn("absolute z-50 rounded-md bg-white p-2 shadow-lg", className)}
        style={getPosition()}
      >
        {children}
      </div>
    );
  }
);

PopoverContent.displayName = "PopoverContent";
