import { Typography } from "@shared/ui";

import { OtpsForm, SignInForm } from "../_components";
import { useAuthStore } from "../model";

export const SignInPage = () => {
  const { phone } = useAuthStore();

  return (
    <main className='space-y-6'>
      <Typography variant='title_h2' tag='h1'>
        Авторизация
      </Typography>
      {phone ? <SignInForm /> : <OtpsForm />}
    </main>
  );
};
