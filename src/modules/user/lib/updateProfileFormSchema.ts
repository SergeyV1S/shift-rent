import { z } from "zod";

import { formatPhone, validateAlphabet, validateSameAlphabet } from "@shared/helpers";

export const baseUserSchema = z.object({
  phone: z
    .string()
    .max(60, "Максимально 60 символов")
    .refine((phone) => {
      const formatedPhone = formatPhone(phone);
      return formatedPhone.length === 11;
    }, "Неверный номер телефона"),
  firstname: z
    .string()
    .min(1, "Обязательное поле")
    .max(60, "Максимально 60 символов")
    .refine(validateAlphabet, "Некорректный формат"),
  middlename: z
    .string()
    .max(60, "Максимально 60 символов")
    .refine(validateAlphabet, "Некорректный формат")
    .optional(),
  lastname: z
    .string()
    .min(1, "Обязательное поле")
    .max(60, "Максимально 60 символов")
    .refine(validateAlphabet, "Некорректный формат"),
  email: z.string().email("Некорректный формат")
});

export const updateProfileFormSchema = baseUserSchema
  .extend({
    city: z
      .string()
      .max(60, "Максимально 60 символов")
      .refine(validateAlphabet, "Некорректный формат")
  })
  .superRefine((data, context) => {
    if (!validateSameAlphabet([data.firstname, data.lastname, data.middlename || ""])) {
      ["firstname", "lastname", "middlename"].forEach((field) => {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Значения заданы с использованием разных алфавитов",
          path: [field]
        });
      });
    }
  });

export type TUpdateProfileFormSchema = z.infer<typeof updateProfileFormSchema>;
