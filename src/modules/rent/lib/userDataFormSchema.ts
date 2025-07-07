import { z } from "zod";

import { formatPhone, validateAlphabet } from "@shared/helpers";

export const userDataFormSchema = z.object({
  phone: z
    .string()
    .max(60, "Максимально 60 символов")
    .refine((phone) => {
      const formatedPhone = formatPhone(phone);
      return formatedPhone.length === 11;
    }, "Неверный номер телефона"),
  firstName: z
    .string()
    .min(1, "Обязательное поле")
    .max(60, "Максимально 60 символов")
    .refine(validateAlphabet, "Некорректный формат"),
  middleName: z
    .string()
    .max(60, "Максимально 60 символов")
    .refine(validateAlphabet, "Некорректный формат")
    .optional(),
  lastName: z
    .string()
    .min(1, "Обязательное поле")
    .max(60, "Максимально 60 символов")
    .refine(validateAlphabet, "Некорректный формат"),
  email: z.string().email("Некорректный формат"),
  comment: z.string().optional(),
  birthDate: z.string().min(1, "Обязательное поле")
});

export type TUserDataFormSchema = z.infer<typeof userDataFormSchema>;
