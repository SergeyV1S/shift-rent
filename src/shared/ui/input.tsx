import { cn } from "@shared/lib";

import { typographyVariants } from "./typography";

export const Input = ({ className, ...props }: React.ComponentProps<"input">) => (
  <input
    data-slot='input'
    className={cn(
      "rounded-input placeholder:text-content-05 disabled:bg-bg-primary focus-visible:border-brand-primary border-border-light focus-visible:ring-brand-primary transition-[ring, border] box-border h-12 w-full border px-2 py-4 duration-200 outline-none focus-visible:ring-2",
      "aria-invalid:ring-indicator-error aria-invalid:border-indicator-error",
      typographyVariants(),
      className
    )}
    {...props}
  />
);
