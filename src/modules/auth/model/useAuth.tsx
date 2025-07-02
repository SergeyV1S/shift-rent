import { useNavigate } from "react-router";

import { getOtps, getUsers } from "@shared/api";
import { ACCESS_TOKEN, PATHS } from "@shared/constants";
import { formatPhone, handleError } from "@shared/helpers";

import type { TOtpsFormSchema, TSignInFormSchema } from "../lib";
import { useAuthStore } from "./store";

export const useAuth = () => {
  const navigate = useNavigate();
  const { otpsControllerCreateOtp } = getOtps();
  const { usersControllerSignin } = getUsers();
  const { setValue } = useAuthStore();

  const onOtpsFormSubmit = async (data: TOtpsFormSchema) => {
    const formatedPhone = formatPhone(data.phone);

    try {
      setValue("isLoading", true);

      await otpsControllerCreateOtp({ phone: formatedPhone });

      setValue("phone", formatedPhone);
    } catch (error) {
      handleError(error);
    } finally {
      setValue("isLoading", false);
    }
  };

  const onSignInFormSubmit = async (data: TSignInFormSchema) => {
    try {
      setValue("isLoading", true);

      const res = await usersControllerSignin({
        ...data,
        code: +data.code
      });

      setValue(["isAuth", "phone"], [true, ""]);
      localStorage.setItem(ACCESS_TOKEN, res.data.token);

      navigate(PATHS.HOME);
    } catch (error) {
      handleError(error);
    } finally {
      setValue("isLoading", false);
    }
  };

  const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    setValue("isAuth", false);
  };

  return { onOtpsFormSubmit, onSignInFormSubmit, logout };
};
