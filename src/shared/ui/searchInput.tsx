import { SearchIcon } from "lucide-react";
import { useRef } from "react";

import { cn } from "@shared/lib";

import { Input } from "./input";

export const SearchInput = ({ className, ...props }: React.ComponentProps<"input">) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => searchInputRef.current?.focus();

  return (
    <div
      className={cn(
        "group rounded-input placeholder:text-content-05 !bg-bg-main disabled:bg-bg-primary disabled:text-content-05 focus-visible:border-brand-primary border-border-light focus-visible:ring-brand-primary transition-[ring, border] flex items-center border px-3 duration-200 focus-visible:ring-2",
        "focus-within:border-brand-primary focus-within:ring-brand-primary/80 transition-all duration-200 focus-within:ring-2",
        className
      )}
    >
      <SearchIcon
        className='text-input-border group-focus-within:text-brand-primary size-5'
        onClick={handleClick}
      />
      <Input
        className='border-0 focus-visible:!border-0 focus-visible:!border-transparent focus-visible:!ring-0'
        ref={searchInputRef}
        {...props}
      />
    </div>
  );
};
