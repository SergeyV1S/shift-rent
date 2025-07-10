import { cn } from "@shared/lib";

import { Typography, typographyVariants } from "./typography";

type TInputProps<Component extends React.ElementType = "input"> = {
  component?: Component;
} & React.ComponentProps<Component>;

export const InputBase = ({ className, component: Component = "input", ...props }: TInputProps) => (
  <Component
    data-slot='input'
    className={cn(
      "rounded-input placeholder:text-content-05 disabled:bg-bg-primary bg-bg-main disabled:text-content-05 focus-visible:border-brand-primary border-border-light focus-visible:ring-brand-primary transition-[ring, border] box-border h-12 w-full border p-3 duration-200 outline-none focus-visible:ring-2",
      "aria-invalid:ring-indicator-error aria-invalid:border-indicator-error aria-invalid:text-indicator-error",
      typographyVariants(),
      className
    )}
    {...props}
  />
);

export const Input = InputBase as <Component extends React.ElementType = "input">(
  props: TInputProps<Component>
) => React.ReactElement;

interface IErrorMessageProps extends React.ComponentProps<"p"> {
  message?: string;
}

export const ErrorMessage = ({ className, message, ...props }: IErrorMessageProps) => {
  if (!message) return null;

  return (
    <Typography
      variant='paragraph_14_regular'
      className={cn("text-indicator-error", className)}
      {...props}
    >
      {message}
    </Typography>
  );
};
