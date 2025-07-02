import { customInstance } from ".././instance";
import type { CreateOtpDto, OtpResponse } from "../generated.schemas";

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];

export const getOtps = () => {
  /**
   * @summary Создание отп кода
   */
  const otpsControllerCreateOtp = (
    createOtpDto: CreateOtpDto,
    options?: SecondParameter<typeof customInstance>
  ) =>
    customInstance<OtpResponse>(
      {
        url: `/api/auth/otp`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: createOtpDto
      },
      options
    );
  return { otpsControllerCreateOtp };
};
export type OtpsControllerCreateOtpResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getOtps>["otpsControllerCreateOtp"]>>
>;
