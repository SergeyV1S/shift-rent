import { cn } from "@shared/lib";

import { typographyVariants } from "./typography";

const Table = ({ children, className, ...props }: React.ComponentProps<"div">) => (
  <div
    data-slot='table'
    className={cn(
      "divide-border-light relative flex size-full min-h-[calc(100vh-240px)] w-full flex-col space-y-6 divide-y overflow-auto",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

const TableHeader = ({ children, className, ...props }: React.ComponentProps<"div">) => (
  <div
    data-slot='table-header'
    className={cn(
      "grid grid-cols-[repeat(2,minmax(170px,1fr))_20%_10%] gap-x-6 opacity-70",
      typographyVariants(),
      className
    )}
    {...props}
  >
    {children}
  </div>
);

const TableContent = ({ children, className, ...props }: React.ComponentProps<"div">) => (
  <div data-slot='table-content' className={cn("relative min-h-full flex-1", className)} {...props}>
    {children}
  </div>
);

const TableCell = ({ children, className, ...props }: React.ComponentProps<"div">) => (
  <div data-slot='table-cell' className={cn("py-6", className)} {...props}>
    {children}
  </div>
);

const TableRow = ({ children, className, ...props }: React.ComponentProps<"div">) => (
  <div
    data-slot='table-row'
    className={cn(
      "grid grid-cols-[repeat(2,minmax(170px,1fr))_20%_10%] gap-x-6",
      typographyVariants(),
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export { Table, TableCell, TableContent, TableHeader, TableRow };
