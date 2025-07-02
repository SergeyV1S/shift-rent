import { PatternFormat } from "react-number-format";

import { Input } from "@shared/ui";

export const PhoneInput = () => (
  <Input
    type='text'
    placeholder='Телефон'
    format='+7 (###) ### ## ##'
    mask='_'
    component={PatternFormat}
  />
);
