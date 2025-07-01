import { ClockIcon, LogOutIcon, MoonIcon, UserRoundIcon } from "lucide-react";
import { NavLink } from "react-router";

import { PATHS } from "@shared/constants";
import { cn } from "@shared/lib";
import { Button, Typography, buttonVariants, typographyVariants } from "@shared/ui";

export const Header = () => (
  <header className='border-b-border-light border-b'>
    <div className='container grid grid-cols-[120px_1fr_140px] items-center py-4'>
      <div className='flex items-center gap-1'>
        <Typography variant='title_h1' tag='h1'>
          ШИФТ
          <br />
          RENT
        </Typography>
        <img src='/logo.svg' alt='rent car logo' />
      </div>
      <nav className='flex items-center gap-8'>
        <NavLink
          to={PATHS.REQUEST_SENT}
          className={({ isActive }) =>
            cn(
              typographyVariants(),
              buttonVariants({ variant: "link" }),
              isActive && "text-brand-primary"
            )
          }
        >
          <UserRoundIcon />
          <span>Профиль</span>
        </NavLink>
        <NavLink
          to={PATHS.RESERVATION_HISTORY}
          className={({ isActive }) =>
            cn(
              typographyVariants(),
              buttonVariants({ variant: "link" }),
              isActive && "text-brand-primary"
            )
          }
        >
          <ClockIcon />
          <span>Заказы</span>
        </NavLink>
      </nav>
      <div className='flex items-center gap-8'>
        <Button variant='ghost' size='sm'>
          <LogOutIcon />
          <span>Выйти</span>
        </Button>
        <Button variant='ghost' size='icon'>
          <MoonIcon />
        </Button>
      </div>
    </div>
  </header>
);
