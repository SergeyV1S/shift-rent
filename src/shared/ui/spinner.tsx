import { LoadingIcon } from "@shared/icons";

import { Typography } from "./typography";

interface ISpinnerProps {
  children?: React.ReactNode;
  size?: number;
  ref?: React.Ref<HTMLDivElement>;
}

export const Spinner = ({ children, size }: ISpinnerProps) => (
  <div className='absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-2'>
    <div className=''>
      <LoadingIcon size={size} />
      {children && <Typography variant='paragraph_14_regular'>{children}</Typography>}
    </div>
  </div>
);
