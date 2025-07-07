import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import { zodResolver } from "@hookform/resolvers/zod";

import { useCarStore } from "@modules/car";

import { formatDateRangeForRequest } from "@shared/helpers";
import { Button, DayPicker, ErrorMessage, Input, Label } from "@shared/ui";

import { carReservationFormSchema } from "../lib";
import type { TCarReservationFormSchema } from "../lib";
import { useCreateRentStore } from "../model";

export const CarReservationForm = () => {
  const { rent } = useCarStore();
  const navigate = useNavigate();
  const { createRentData, nextStep, setRentData } = useCreateRentStore();

  const formatedDateRange = formatDateRangeForRequest(rent || createRentData);

  const carReservationForm = useForm<TCarReservationFormSchema>({
    resolver: zodResolver(carReservationFormSchema),
    defaultValues: {
      rentDate: formatedDateRange,
      pickupLocation: createRentData.pickupLocation || "",
      returnLocation: createRentData.returnLocation || ""
    }
  });

  const handleSubmit = (data: TCarReservationFormSchema) => {
    nextStep();
    setRentData(data);
  };

  const goBack = () => navigate(-1);

  return (
    <form
      onSubmit={carReservationForm.handleSubmit(handleSubmit)}
      className='w-1/2 space-y-6 max-md:w-full'
    >
      <Controller
        name='rentDate'
        control={carReservationForm.control}
        render={({ field }) => (
          <div className='space-y-1'>
            <DayPicker defaultValue={field.value} onChange={field.onChange} />
            <ErrorMessage
              message={
                carReservationForm.formState.errors.rentDate?.message &&
                "Выберите дату/даты начала аренды"
              }
            />
          </div>
        )}
      />
      <Label className='space-y-1'>
        Место получения
        <Input placeholder='Место получения' {...carReservationForm.register("pickupLocation")} />
        <ErrorMessage message={carReservationForm.formState.errors.pickupLocation?.message} />
      </Label>
      <Label className='space-y-1'>
        Место возврата
        <Input placeholder='Место возврата' {...carReservationForm.register("returnLocation")} />
        <ErrorMessage message={carReservationForm.formState.errors.returnLocation?.message} />
      </Label>
      <div className='flex w-full items-center justify-between'>
        <Button type='button' variant='outline' onClick={goBack}>
          Назад
        </Button>
        <Button type='submit'>Продолжить</Button>
      </div>
    </form>
  );
};
