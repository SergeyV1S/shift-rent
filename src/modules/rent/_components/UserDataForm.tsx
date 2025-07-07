import { Controller, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { PatternFormat } from "react-number-format";

import { Button, ErrorMessage, Input, Label } from "@shared/ui";

import { userDataFormSchema } from "../lib";
import type { TUserDataFormSchema } from "../lib";
import { useCreateRentStore } from "../model";

export const UserDataForm = () => {
  const { createRentData, nextStep, prevStep, setUserData } = useCreateRentStore();

  const userDataForm = useForm<TUserDataFormSchema>({
    resolver: zodResolver(userDataFormSchema),
    defaultValues: createRentData
  });

  const handleSubmit = (data: TUserDataFormSchema) => {
    nextStep();
    setUserData(data);
  };

  return (
    <form
      onSubmit={userDataForm.handleSubmit(handleSubmit)}
      className='w-1/2 space-y-6 max-md:w-full'
    >
      <Label>
        Фамилия*
        <Input placeholder='Фамилия' {...userDataForm.register("lastName")} />
        <ErrorMessage message={userDataForm.formState.errors.lastName?.message} />
      </Label>
      <Label>
        Имя*
        <Input placeholder='Имя' {...userDataForm.register("firstName")} />
        <ErrorMessage message={userDataForm.formState.errors.firstName?.message} />
      </Label>
      <Label>
        Отчество
        <Input placeholder='Имя' {...userDataForm.register("middleName")} />
        <ErrorMessage message={userDataForm.formState.errors.middleName?.message} />
      </Label>
      <Label>
        Дата рождения*
        <Controller
          name='birthDate'
          control={userDataForm.control}
          render={({ field }) => (
            <Input
              type='text'
              placeholder='Дата рождения'
              format='####-##-##'
              mask='_'
              component={PatternFormat}
              aria-invalid={userDataForm.formState.errors.birthDate ? "true" : "false"}
              {...field}
            />
          )}
        />
        <ErrorMessage message={userDataForm.formState.errors.birthDate?.message} />
      </Label>
      <Label>
        Номер телефона*
        <Controller
          name='phone'
          control={userDataForm.control}
          render={({ field }) => (
            <Input
              type='text'
              placeholder='Телефон'
              format='+7 (###) ### ## ##'
              mask='_'
              component={PatternFormat}
              aria-invalid={userDataForm.formState.errors.phone ? "true" : "false"}
              {...field}
            />
          )}
        />
        <ErrorMessage message={userDataForm.formState.errors.phone?.message} />
      </Label>
      <Label>
        Электронная почта*
        <Input placeholder='Email' {...userDataForm.register("email")} />
        <ErrorMessage message={userDataForm.formState.errors.email?.message} />
      </Label>
      <Label>
        Комментарий
        <Input placeholder='Комментарий' {...userDataForm.register("comment")} />
        <ErrorMessage message={userDataForm.formState.errors.comment?.message} />
      </Label>
      <nav className='flex w-full items-center justify-between'>
        <Button type='button' variant='outline' onClick={prevStep}>
          Назад
        </Button>
        <Button type='submit'>Продолжить</Button>
      </nav>
    </form>
  );
};
