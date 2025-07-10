import { ClockIcon, LogInIcon, LogOutIcon, UserRoundIcon } from "lucide-react";
import { Link, NavLink } from "react-router";

import { useAuthStore } from "@modules/auth";

import { PATHS } from "@shared/constants";
import { cn } from "@shared/lib";
import { ThemeToggle } from "@shared/theme";
import { Button, Typography, buttonVariants, typographyVariants } from "@shared/ui";

export const Header = () => {
  const { isAuth, logout } = useAuthStore();

  return (
    <header className='border-b-border-light border-b'>
      <nav
        className={cn(
          "container items-center py-4",
          isAuth ? "grid grid-cols-[120px_1fr_220px]" : "flex justify-between"
        )}
      >
        <Link className='flex items-center gap-1' to={PATHS.HOME}>
          <Typography variant='heading' tag='h1'>
            ШИФТ
            <br />
            RENT
          </Typography>
          <img src='/logo.svg' alt='rent car logo' />
        </Link>
        {isAuth && (
          <div className='flex items-center gap-8'>
            <NavLink
              to={PATHS.PROFILE}
              className={({ isActive }) =>
                cn(
                  typographyVariants(),
                  buttonVariants({ variant: "link", size: "sm" }),
                  isActive && "text-brand-primary"
                )
              }
            >
              <UserRoundIcon />
              Профиль
            </NavLink>
            <NavLink
              to={PATHS.RENT_HISTORY}
              className={({ isActive }) =>
                cn(
                  typographyVariants(),
                  buttonVariants({ variant: "link", size: "sm" }),
                  isActive && "text-brand-primary"
                )
              }
            >
              <ClockIcon />
              Заказы
            </NavLink>
          </div>
        )}
        <div className='flex items-center gap-8'>
          {isAuth ? (
            <Button
              variant='ghost'
              size='sm'
              typographyVariant='paragraph_16_medium'
              onClick={logout}
            >
              <LogOutIcon />
              Выйти
            </Button>
          ) : (
            <Link
              to={PATHS.SIGNIN}
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                typographyVariants({ variant: "paragraph_16_medium" })
              )}
            >
              <LogInIcon />
              Войти
            </Link>
          )}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};
