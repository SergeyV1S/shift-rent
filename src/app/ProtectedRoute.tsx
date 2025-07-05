import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router";

import { useAuthStore } from "@modules/auth";
import { useUserStore } from "@modules/user";

import { PATHS } from "@shared/constants";

interface IProtectedRouteProps {
  onlyUnauth?: boolean;
}

export const ProtectedRoute = ({ onlyUnauth }: IProtectedRouteProps) => {
  const { isAuth } = useAuthStore();
  const { fetchUser } = useUserStore();
  const location = useLocation();

  useEffect(() => {
    fetchUser();
  }, []);

  if (onlyUnauth && isAuth) {
    const { from } = location.state ?? { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!isAuth && !onlyUnauth) {
    return <Navigate to={PATHS.SIGNIN} state={{ from: location }} replace />;
  }

  return <Outlet />;
};
