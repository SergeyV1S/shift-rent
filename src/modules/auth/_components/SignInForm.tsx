import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { Button, ErrorMessage, Input, Typography } from "@shared/ui";

import { signInFormSchema } from "../lib";
import { useAuth, useAuthStore } from "../model";
import { CodeResend } from "./CodeResend";

export const SignInForm = () => {
  const { phone, isLoading } = useAuthStore();
  const { onSignInFormSubmit } = useAuth();

  const signInForm = useForm({
    resolver: zodResolver(signInFormSchema),
    mode: "onChange",
    defaultValues: {
      phone: phone,
      code: ""
    }
  });

  return (
    <form
      onSubmit={signInForm.handleSubmit(onSignInFormSubmit)}
      className='w-1/3 space-y-6 max-xl:w-1/2 max-md:w-full'
    >
      <Typography>Введите проверочный код для входа в личный кабинет</Typography>
      <div className='space-y-1'>
        <Input type='text' value={phone} disabled />
      </div>
      <div className='space-y-1'>
        <Input type='text' placeholder='Проверочный код' {...signInForm.register("code")} />
        <ErrorMessage message={signInForm.formState.errors.code?.message} />
      </div>
      <Button type='submit' className='w-full' disabled={isLoading}>
        Войти
      </Button>
      <CodeResend />
    </form>
  );
};
