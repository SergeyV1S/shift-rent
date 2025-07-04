import { z } from "zod";

import { formatPhone } from "@shared/helpers";

export const otpsFormSchema = z.object({
  phone: z.string().refine((phone) => {
    const formatedPhone = formatPhone(phone);
    return formatedPhone.length === 11;
  }, "Неверный номер телефона")
});

export const signInFormSchema = otpsFormSchema.extend({
  code: z.string().min(6, {
    message: "Код должен содержать 6 цифр"
  })
});

export type TOtpsFormSchema = z.infer<typeof otpsFormSchema>;
export type TSignInFormSchema = z.infer<typeof signInFormSchema>;
