import { ClockIcon, LogInIcon, LogOutIcon, MoonIcon, UserRoundIcon } from "lucide-react";
import { Link, NavLink } from "react-router";

import { useAuthStore } from "@modules/auth/model";

import { PATHS } from "@shared/constants";
import { cn } from "@shared/lib";
import { Button, Typography, buttonVariants, typographyVariants } from "@shared/ui";

export const Header = () => {
  const { isAuth } = useAuthStore();

  return (
    <header className='border-b-border-light border-b'>
      <div
        className={cn(
          "container items-center py-4",
          isAuth ? "grid grid-cols-[120px_1fr_140px]" : "flex items-center justify-between"
        )}
      >
        <div className='flex items-center gap-1'>
          <Typography variant='title_h1' tag='h1'>
            ШИФТ
            <br />
            RENT
          </Typography>
          <img src='/logo.svg' alt='rent car logo' />
        </div>
        {isAuth && (
          <nav className='flex items-center gap-8'>
            <NavLink
              to={PATHS.PROFILE}
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
        )}
        <div className='flex items-center gap-8'>
          {isAuth ? (
            <Button variant='ghost' size='sm'>
              <LogOutIcon />
              <span>Выйти</span>
            </Button>
          ) : (
            <Link to={PATHS.SIGNIN} className={buttonVariants({ variant: "ghost", size: "sm" })}>
              <LogInIcon />
              <span>Войти</span>
            </Link>
          )}
          <Button variant='ghost' size='icon'>
            <MoonIcon />
          </Button>
        </div>
      </div>
    </header>
  );
};
