import { Link, useNavigate } from "react-router";

import { PATHS } from "@shared/constants";
import { cn } from "@shared/lib";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  Typography,
  buttonVariants
} from "@shared/ui";

import { useRentHistoryStore } from "../model";

export const RentDetailsButtons = ({ className, ...props }: React.ComponentProps<"div">) => {
  const { rent, isCancelModelOpen, toggleCancelModelOpen, cancelRent } = useRentHistoryStore();
  const navigate = useNavigate();

  const handleCancelRentButtonClick = () => {
    if (rent) {
      cancelRent(rent._id, navigate);
    }
  };
  return (
    <div
      className={cn(
        "flex w-1/2 items-center gap-6 pt-4 max-sm:w-full max-sm:flex-col-reverse",
        className
      )}
      {...props}
    >
      <Link
        to={PATHS.RENT_HISTORY}
        className={cn(buttonVariants({ variant: "outline" }), "w-full")}
      >
        Назад
      </Link>
      <Dialog isModalOpen={isCancelModelOpen} setIsModalOpen={toggleCancelModelOpen}>
        <DialogTrigger asChild>
          <Button className='w-full'>Отменить бронь</Button>
        </DialogTrigger>

        <DialogHeader />
        <DialogContent className='flex flex-col items-center justify-center gap-10'>
          <div className='flex flex-col items-center justify-center space-y-4 text-center'>
            <img src='/accept-red.svg' alt='accept icon' />
            <Typography variant='title_h3' tag='h3'>
              Отменить бронь?
            </Typography>
          </div>
          <div className='w-full space-y-4'>
            <Button variant='outline' className='w-full' onClick={handleCancelRentButtonClick}>
              Отменить
            </Button>
            <Button className='w-full' onClick={() => toggleCancelModelOpen()}>
              Не отменять
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
