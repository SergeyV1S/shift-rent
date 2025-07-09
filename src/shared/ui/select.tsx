import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { cloneElement, isValidElement, useRef, useState } from "react";

import { useClickOutside } from "@shared/hooks";
import { cn } from "@shared/lib";

import { typographyVariants } from "./typography";

interface ISelectProps {
  options: { value: string; label: string | React.ReactElement<{ className?: string }> }[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  triggerClassName?: string;
  disabled?: boolean;
}

export const Select = ({
  options,
  value,
  onChange,
  placeholder,
  className,
  triggerClassName,
  disabled = false
}: ISelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, optionValue: string) => {
    e.preventDefault();
    setIsOpen(false);
    onChange?.(optionValue);
  };

  useClickOutside(selectRef, () => setIsOpen(false));

  return (
    <div className={cn("relative w-full", className)} ref={selectRef}>
      <button
        type='button'
        className={cn(
          "border-border-light transition-[ring, border] flex h-12 w-full cursor-pointer items-center justify-between rounded-md border px-3 py-2 duration-200 outline-none",
          triggerClassName
        )}
        onClick={handleToggle}
        disabled={disabled}
      >
        <span className='truncate'>{selectedOption?.label || placeholder}</span>
        <ChevronDownIcon
          className={cn("text-base-text size-4 transition-transform", isOpen && "rotate-180")}
        />
      </button>

      {isOpen && (
        <div
          className={cn(
            "bg-bg-main absolute z-10 mt-1 w-full rounded-md shadow-lg",
            isOpen ? "animate-slide-down" : "hidden"
          )}
        >
          <ul
            className={cn(
              "max-h-60 overflow-auto py-1",
              typographyVariants({ variant: "paragraph_14_regular" })
            )}
          >
            {options.map((option) => (
              <li
                key={option.value}
                className={cn(
                  "hover:bg-brand-primary/20 relative cursor-pointer rounded-md px-3 py-2 select-none",
                  value === option.value &&
                    "bg-brand-primary/70 hover:bg-brand-primary/70 text-white"
                )}
                onClick={(e) => handleSelect(e, option.value)}
              >
                <div className='flex items-center justify-between'>
                  {/* Да, логика в ui, но я пока не знаю как красиво это вынести) */}
                  {typeof option.label === "string" ? (
                    <span className='block truncate'>{option.label}</span>
                  ) : isValidElement(option.label) ? (
                    cloneElement(option.label, {
                      className: cn("text-base-text", value === option.value && "text-white")
                    })
                  ) : null}
                  {value === option.value && <CheckIcon className='ml-2 h-4 w-4 text-white' />}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
