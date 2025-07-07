import { useTimer } from "react-timer-hook";

import { formatTime } from "@shared/helpers";
import { Typography } from "@shared/ui";
import { Button } from "@shared/ui";

import { useAuth, useAuthStore } from "../model";

export const CodeResend = () => {
  const { retry } = useAuth();
  const { retryDelay, isLoading } = useAuthStore();
  const expiryDate = new Date(Date.now() + retryDelay!);

  const { minutes, seconds, restart } = useTimer({
    expiryTimestamp: expiryDate
  });

  if (!seconds && !minutes)
    return (
      <div className='flex w-full items-center justify-center'>
        <Button
          variant='link'
          type='button'
          size='sm'
          className='text-content-06'
          disabled={isLoading}
          onClick={() => {
            retry();
            restart(expiryDate);
          }}
        >
          Запросить код ещё раз
        </Button>
      </div>
    );

  return (
    <Typography variant='paragraph_14_regular' className='text-content-06 text-center'>
      Запросить код повторно можно через {formatTime(minutes)}:{formatTime(seconds)}
    </Typography>
  );
};
