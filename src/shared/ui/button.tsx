import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "@shared/lib";

import { typographyVariants } from "./typography";

const buttonVariants = cva(
  "rounded-btn inline-flex w-full shrink-0 cursor-pointer items-center justify-center gap-2 font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary: "bg-brand-primary hover:bg-brand-primary/90 active:bg-brand-primary/80 text-white",
        secondary: "bg-content03 hover:bg-content03/90 active:bg-content03/80 text-white",
        outline:
          "bg-transaprent hover:bg-content03/10 active:bg-content03/15 border-border-light text-content03 border"
      },
      size: {
        default: "h-14 px-8 py-4 has-[>svg]:px-3"
      }
    },
    defaultVariants: {
      variant: "outline",
      size: "default"
    }
  }
);

interface IButtonProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof buttonVariants> {}

const Button = ({ variant, className, ...props }: IButtonProps) => (
  <button
    data-slot='button'
    className={cn(
      buttonVariants({ variant, className }),
      typographyVariants({ variant: "button_semibold" })
    )}
    {...props}
  />
);

export { Button, buttonVariants };
