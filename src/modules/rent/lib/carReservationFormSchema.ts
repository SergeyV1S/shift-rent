import { z } from "zod";

export const carReservationFormSchema = z.object({
  rentDate: z.object({
    from: z.date({
      required_error: "Выберите дату/даты начала аренды"
    }),
    to: z.date().optional()
  }),
  pickupLocation: z.string().regex(/^[А-ЯЁ][а-яё]+, ул\. [А-ЯЁ][а-яё]+(?: [А-ЯЁ][а-яё]+)*, \d+$/, {
    message: '"Город, ул. Название улицы, Номер дома"'
  }),
  returnLocation: z.string().regex(/^[А-ЯЁ][а-яё]+, ул\. [А-ЯЁ][а-яё]+(?: [А-ЯЁ][а-яё]+)*, \d+$/, {
    message: '"Город, ул. Название улицы, Номер дома"'
  })
});

export type TCarReservationFormSchema = z.infer<typeof carReservationFormSchema>;
