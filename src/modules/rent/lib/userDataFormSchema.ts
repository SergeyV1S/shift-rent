import { z } from "zod";

import { baseUserSchema } from "@modules/user";

export const userDataFormSchema = baseUserSchema.extend({
  comment: z.string().optional(),
  birthDate: z.string().min(1, "Обязательное поле")
});

export type TUserDataFormSchema = z.infer<typeof userDataFormSchema>;
