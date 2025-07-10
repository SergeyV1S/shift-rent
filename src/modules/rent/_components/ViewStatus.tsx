import type { CarRentStatus } from "@shared/api";
import { cn } from "@shared/lib";
import { Typography } from "@shared/ui";

import { rentStatusTranslation } from "../constants";

interface IViewStatusProps extends React.ComponentProps<"div"> {
  status: CarRentStatus;
}

export const ViewStatus = ({ status, className, ...props }: IViewStatusProps) => (
  <div className='flex items-center gap-3'>
    <div
      className={cn("size-2 rounded-full", className)}
      style={{ backgroundColor: rentStatusTranslation[status].color }}
      {...props}
    />
    <Typography>{rentStatusTranslation[status].value}</Typography>
  </div>
);
