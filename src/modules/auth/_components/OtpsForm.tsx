import { Controller, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { PatternFormat } from "react-number-format";

import { Button, ErrorMessage, Input, Typography } from "@shared/ui";

import { otpsFormSchema } from "../lib";
import { useAuth, useAuthStore } from "../model";

export const OtpsForm = () => {
  const { isLoading } = useAuthStore();
  const { onOtpsFormSubmit } = useAuth();

  const otpsForm = useForm({
    resolver: zodResolver(otpsFormSchema),
    mode: "onChange",
    defaultValues: {
      phone: ""
    }
  });

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
              placeholder='Телефон'
              format='+7 (###) ### ## ##'
              mask='_'
              component={PatternFormat}
              aria-invalid={otpsForm.formState.errors.phone ? "true" : "false"}
              {...field}
            />
          )}
        />
        <ErrorMessage message={otpsForm.formState.errors.phone?.message} />
      </div>
      <Button type='submit' className='w-full' disabled={isLoading}>
        Продолжить
      </Button>
    </form>
  );
};
