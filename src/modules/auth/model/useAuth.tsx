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
  const { phone, setValue } = useAuthStore();

  const onOtpsFormSubmit = async (data: TOtpsFormSchema) => {
    const formatedPhone = formatPhone(data.phone);
    try {
      setValue("isLoading", true);

      const result = await otpsControllerCreateOtp({ phone: formatedPhone });

      setValue(["phone", "retryDelay"], [data.phone, result.data.retryDelay]);
    } catch (error) {
      handleError(error);
    } finally {
      setValue("isLoading", false);
    }
  };

  const onSignInFormSubmit = async (data: TSignInFormSchema) => {
    const formatedPhone = formatPhone(data.phone);
    try {
      setValue("isLoading", true);

      const result = await usersControllerSignin({
        phone: formatedPhone,
        code: +data.code
      });

      setValue(["isAuth", "phone"], [true, ""]);
      localStorage.setItem(ACCESS_TOKEN, result.data.token);

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

  const retry = async () => onOtpsFormSubmit({ phone });

  return { onOtpsFormSubmit, onSignInFormSubmit, logout, retry };
};
