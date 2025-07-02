import { Button, Typography } from "@shared/ui";

import { CodeInput, PhoneInput } from "../_components";

export const SignInPage = () => (
  <main className='space-y-6'>
    <Typography variant='title_h2' tag='h1'>
      Авторизация
    </Typography>
    <Typography>Введите номер телефона для входа в личный кабинет</Typography>
    <form className='w-1/3 space-y-6'>
      <PhoneInput />
      <CodeInput />
      <Button className='w-full'>Продолжить</Button>
    </form>
  </main>
);
