import { CalendarDaysIcon } from "lucide-react";
import { useState } from "react";

import { DayPicker as LibDayPicker } from "react-day-picker";
import type { DateRange } from "react-day-picker";
import { ru } from "react-day-picker/locale";
import "react-day-picker/style.css";

import { formatDateRange } from "@shared/helpers";
import { Label, Popover, Typography } from "@shared/ui";

interface IDayPickerProps {
  onChange?: (dateRange: DateRange | undefined) => void;
}

export const DayPicker = ({ onChange }: IDayPickerProps) => {
  const [range, setRange] = useState<DateRange | undefined>();

  const handleRangeSelect = (selectedRange: DateRange | undefined) => {
    setRange(selectedRange);
    onChange?.(selectedRange);
  };

  return (
    <Label className='space-y-1'>
      Даты аренды
      <Popover
        placeholder={
          <div className='flex items-center justify-between'>
            <Typography className='truncate'>
              {formatDateRange({ ...range }) || "Выберите даты аренды"}
            </Typography>
            <CalendarDaysIcon className='opacity-70' />
          </div>
        }
      >
        <LibDayPicker
          mode='range'
          locale={ru}
          selected={range}
          onSelect={(d) => handleRangeSelect(d)}
        />
      </Popover>
    </Label>
  );
};
