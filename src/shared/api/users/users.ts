import { customInstance } from ".././instance";
import type {
  SessionResponse,
  SignInDto,
  SignInResponse,
  UpdateProfileDto,
  UpdateProfileResponse
} from "../generated.schemas";

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];

export const getUsers = () => {
  /**
   * @summary Авторизация
   */
  const usersControllerSignin = (
    signInDto: SignInDto,
    options?: SecondParameter<typeof customInstance>
  ) =>
    customInstance<SignInResponse>(
      {
        url: `/api/users/signin`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: signInDto
      },
      options
    );
  /**
   * @summary Обновить профиль пользователя
   */
  const usersControllerUpdateProfile = (
    updateProfileDto: UpdateProfileDto,
    options?: SecondParameter<typeof customInstance>
  ) =>
    customInstance<UpdateProfileResponse>(
      {
        url: `/api/users/profile`,
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        data: updateProfileDto
      },
      options
    );
  /**
   * @summary Получить сессию пользователя
   */
  const usersControllerSession = (options?: SecondParameter<typeof customInstance>) =>
    customInstance<SessionResponse>({ url: `/api/users/session`, method: "GET" }, options);
  return { usersControllerSignin, usersControllerUpdateProfile, usersControllerSession };
};
export type UsersControllerSigninResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getUsers>["usersControllerSignin"]>>
>;
export type UsersControllerUpdateProfileResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getUsers>["usersControllerUpdateProfile"]>>
>;
export type UsersControllerSessionResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getUsers>["usersControllerSession"]>>
>;
