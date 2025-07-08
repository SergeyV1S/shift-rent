import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "@shared/lib";

import { Spinner } from "./spinner";
import { typographyVariants } from "./typography";

const buttonVariants = cva(
  "relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 font-medium whitespace-nowrap transition-all duration-300 outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-brand-primary hover:bg-brand-primary/90 active:bg-brand-primary/80 text-white",
        secondary: "bg-content-03 hover:bg-content-03/90 active:bg-content-03/80 text-white",
        outline:
          "bg-transaprent hover:bg-content-03/10 active:bg-content-03/15 border-border-light text-content-03 border",
        ghost: "hover:bg-content-06/10 active:bg-content-05/15",
        link: "hover:text-brand-primary/80"
      },
      size: {
        default: "h-14 rounded-2xl px-8 py-4 has-[>svg]:px-3",
        sm: "rounded-xl px-4 py-2.5 has-[>svg]:py-3",
        icon: "size-10 rounded-lg"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "default"
    }
  }
);

interface IButtonProps extends React.ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  typographyVariant?: VariantProps<typeof typographyVariants>["variant"];
  isLoading?: boolean;
}

const Button = ({
  variant,
  typographyVariant = "button_semibold",
  className,
  isLoading,
  size,
  children,
  disabled,
  ...props
}: IButtonProps) => {
  const slot = isLoading ? <Spinner size={20} /> : children;

  return (
    <button
      data-slot='button'
      className={cn(
        buttonVariants({ variant, size, className }),
        typographyVariants({ variant: typographyVariant })
      )}
      disabled={disabled || isLoading}
      children={slot}
      {...props}
    />
  );
};

export { Button, buttonVariants };
