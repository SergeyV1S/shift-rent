import { cn } from "@shared/lib";

import { typographyVariants } from "./typography";

export const Label = ({ className, ...props }: React.ComponentProps<"label">) => (
  <label
    data-slot='label'
    className={cn(
      typographyVariants({ variant: "paragraph_14_regular" }),
      "flex w-full flex-col gap-1",
      className
    )}
    {...props}
  />
);
