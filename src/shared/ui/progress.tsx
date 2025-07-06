import { cn } from "@shared/lib";

interface IProgressProps extends React.ComponentProps<"div"> {
  value: number;
}

export const Progress = ({ value, className, ...props }: IProgressProps) => (
  <div className={cn("bg-border-light relative h-1 w-full rounded-2xl", className)} {...props}>
    <div
      className='bg-indicator-positive absolute left-0 h-1 rounded-2xl transition-[width] duration-300'
      style={{ width: `${value}%` }}
    />
  </div>
);
