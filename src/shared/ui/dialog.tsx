import { XIcon } from "lucide-react";
import { Children, cloneElement, isValidElement, useState } from "react";
import { createPortal } from "react-dom";

import { Slot } from "@radix-ui/react-slot";

import { cn } from "@shared/lib";

import { Button, buttonVariants } from "./button";
import { Typography } from "./typography";

interface IDialogOverviewProps extends React.ComponentProps<"div"> {}
const DialogOverview = (props: IDialogOverviewProps) => (
  <div
    className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm'
    {...props}
  />
);

interface IDialogProps {
  isModalOpen?: boolean;
  setIsModalOpen?: (value: boolean) => void;
  children: React.ReactNode;
}

export const Dialog = ({ children, isModalOpen, setIsModalOpen }: IDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const childrenArray = Children.toArray(children);

  const trigger = childrenArray.find(
    (child) => isValidElement(child) && child.type === DialogTrigger
  ) as React.ReactElement<IDialogTriggerProps>;

  const handleOpen = () => (setIsModalOpen ? setIsModalOpen(true) : setIsOpen(true));
  const handleClose = () => (setIsModalOpen ? setIsModalOpen(false) : setIsOpen(false));

  return (
    <>
      {trigger && isValidElement(trigger)
        ? cloneElement(trigger, {
            onClick: handleOpen
          })
        : null}

      {(isModalOpen || isOpen) &&
        createPortal(
          <DialogOverview onClick={handleClose}>
            <div
              className='bg-bg-elevation relative w-full max-w-md rounded-4xl'
              onClick={(e) => e.stopPropagation()}
            >
              {Children.map(children, (child) => {
                if (
                  isValidElement(child) &&
                  (child.type === DialogHeader || child.type === DialogContent)
                ) {
                  return cloneElement(child, {
                    onClose: handleClose
                  } as IDialogHeaderProps);
                }
                return null;
              })}
            </div>
          </DialogOverview>,
          document.querySelector("#portal")!
        )}
    </>
  );
};

interface IDialogTriggerProps extends React.ComponentProps<"button"> {
  asChild?: boolean;
}

export const DialogTrigger = ({ asChild, className, ...props }: IDialogTriggerProps) => {
  const Component = asChild ? Slot : Button;

  return <Component className={cn(buttonVariants({ className }))} {...props} />;
};

interface IDialogHeaderProps {
  title?: string;
  onClose?: () => void;
  children?: React.ReactNode;
}
export const DialogHeader = ({ title, onClose, children }: IDialogHeaderProps) => (
  <div className={cn("flex items-center justify-between", title && "pb-4")}>
    <Typography variant='title_h3' tag='h3'>
      {title || children}
    </Typography>
    <Button
      className='hover:text-brand-primary absolute top-5 right-5'
      variant='ghost'
      size='icon'
      onClick={onClose}
    >
      <XIcon />
    </Button>
  </div>
);

export const DialogContent = ({ children, className, ...props }: React.ComponentProps<"div">) => (
  <div className={cn("px-20 py-12", className)} {...props}>
    {children}
  </div>
);
