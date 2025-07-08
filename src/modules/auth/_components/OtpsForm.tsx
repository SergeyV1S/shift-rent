import { Controller, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { PatternFormat } from "react-number-format";

import { Button, ErrorMessage, Input, Typography } from "@shared/ui";

import { otpsFormSchema } from "../lib";
import type { TOtpsFormSchema } from "../lib";
import { useAuthStore } from "../model";

export const OtpsForm = () => {
  const { isLoading, sendOtp } = useAuthStore();

  const otpsForm = useForm({
    resolver: zodResolver(otpsFormSchema),
    mode: "onChange",
    defaultValues: {
      phone: ""
    }
  });

  const onOtpsFormSubmit = (data: TOtpsFormSchema) => sendOtp(data.phone);

  return (
    <form
      onSubmit={otpsForm.handleSubmit(onOtpsFormSubmit)}
      className='w-1/3 space-y-6 max-xl:w-1/2 max-md:w-full'
    >
      <Typography>Введите номер телефона для входа в личный кабинет</Typography>
      <div className='space-y-1'>
        <Controller
          name='phone'
          control={otpsForm.control}
          render={({ field }) => (
            <Input
              type='text'
              placeholder='+79'
              format='+7 (9##) ### ## ##'
              mask='_'
              component={PatternFormat}
              aria-invalid={otpsForm.formState.errors.phone ? "true" : "false"}
              {...field}
            />
          )}
        />
        <ErrorMessage message={otpsForm.formState.errors.phone?.message} />
      </div>
      <Button type='submit' className='w-full' isLoading={isLoading}>
        Продолжить
      </Button>
    </form>
  );
};
