import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "@shared/lib";

const typographyVariants = cva("font-inter text-base-text tracking-normal", {
  variants: {
    variant: {
      heading: "leading-full font-firaSans text-brand-primary text-sm font-semibold",
      title_h1: "text-5xl leading-14 font-bold",
      title_h2: "text-2xl leading-8 font-bold",
      title_h3: "text-xl leading-6 font-semibold",
      button_semibold: "text-base leading-6 font-semibold",
      paragraph_16_medium: "text-base leading-6 font-medium",
      paragraph_16_regular: "text-base leading-6 font-normal",
      paragraph_14_regular: "text-sm leading-5 font-normal",
      paragraph_12_regular: "text-xs leading-4 font-normal"
    }
  },
  defaultVariants: {
    variant: "paragraph_16_regular"
  }
});

type TTag = "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface ITypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  tag?: TTag;
  colorInherit?: boolean;
}

const Typography = ({
  tag = "p",
  colorInherit,
  variant,
  className,
  ...props
}: ITypographyProps) => {
  const Tag = tag;

  return (
    <Tag
      className={cn(typographyVariants({ variant, className }), colorInherit && "text-inherit")}
      {...props}
    />
  );
};

export { Typography, typographyVariants };
