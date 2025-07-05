import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { PatternFormat } from "react-number-format";

import { PATHS } from "@shared/constants";
import { createRoute } from "@shared/lib";
import { Button, ErrorMessage, Input, Label, Typography } from "@shared/ui";

import { updateProfileFormSchema } from "../lib";
import type { TUpdateProfileFormSchema } from "../lib";
import { useUserStore } from "../model";

export const ProfilePage = () => {
  const { user, updateUser } = useUserStore();
  const updateProfileForm = useForm<TUpdateProfileFormSchema>({
    resolver: zodResolver(updateProfileFormSchema),
    defaultValues: user
  });

  const isSendButtonDisabled = !Object.values(updateProfileForm.formState.dirtyFields).some(
    Boolean
  );

  useEffect(() => {
    if (user) {
      updateProfileForm.reset(user);
    }
  }, [user]);

  return (
    <main className='space-y-6'>
      <Typography variant='title_h2' tag='h1'>
        Профиль
      </Typography>
      <form
        className='flex w-full flex-col justify-center space-y-6 md:w-1/2'
        onSubmit={updateProfileForm.handleSubmit(updateUser)}
      >
        <Label>
          Фамилия*
          <Input type='text' placeholder='Фамилия' {...updateProfileForm.register("lastname")} />
          <ErrorMessage message={updateProfileForm.formState.errors.lastname?.message} />
        </Label>
        <Label>
          Имя*
          <Input type='text' placeholder='Имя' {...updateProfileForm.register("firstname")} />
          <ErrorMessage message={updateProfileForm.formState.errors.firstname?.message} />
        </Label>
        <Label>
          Отчество
          <Input type='text' placeholder='Отчество' {...updateProfileForm.register("middlename")} />
          <ErrorMessage message={updateProfileForm.formState.errors.middlename?.message} />
        </Label>
        <Label>
          Телефон*
          <Input
            type='text'
            placeholder='Номер телефона'
            format='+7 (###) ### ## ##'
            mask='_'
            value={user?.phone}
            component={PatternFormat}
            disabled
          />
        </Label>
        <Label>
          Email
          <Input
            type='text'
            placeholder='Электронная почта'
            {...updateProfileForm.register("email")}
          />
          <ErrorMessage message={updateProfileForm.formState.errors.email?.message} />
        </Label>
        <Label>
          Город
          <Input type='text' placeholder='Город' {...updateProfileForm.register("city")} />
          <ErrorMessage message={updateProfileForm.formState.errors.city?.message} />
        </Label>
        <div className='max-xs:flex-col-reverse flex items-center justify-between gap-6'>
          <Button type='button' variant='outline' className='max-xs:w-full'>
            Выйти
          </Button>
          <Button type='submit' className='max-xs:w-full' disabled={isSendButtonDisabled}>
            Обновить данные
          </Button>
        </div>
      </form>
    </main>
  );
};

export const profileRoute = createRoute(PATHS.PROFILE, <ProfilePage />);
