import { CalendarDaysIcon } from "lucide-react";
import { useState } from "react";

import { DayPicker as LibDayPicker } from "react-day-picker";
import type { DateRange } from "react-day-picker";
import { ru } from "react-day-picker/locale";
import "react-day-picker/style.css";

import { formatDateRange, getTomorrow } from "@shared/helpers";
import { Label, Popover, Typography } from "@shared/ui";

interface IDayPickerProps {
  defaultValue?: DateRange | undefined;
  onChange?: (dateRange: DateRange | undefined) => void;
}

export const DayPicker = ({ defaultValue, onChange }: IDayPickerProps) => {
  const [range, setRange] = useState<DateRange | undefined>(defaultValue);

  const handleRangeSelect = (selectedRange: DateRange | undefined) => {
    setRange(selectedRange);
    onChange?.(selectedRange);
  };

  const tomorrow = getTomorrow();

  return (
    <Label className='space-y-1'>
      Даты аренды
      <Popover
        classNameContent='bg-bg-elevation'
        placeholder={
          <div className='flex items-center justify-between'>
            <Typography className='truncate'>
              {range ? formatDateRange(range) : "Выберите даты аренды"}
            </Typography>
            <CalendarDaysIcon className='opacity-70' />
          </div>
        }
      >
        <LibDayPicker
          mode='range'
          locale={ru}
          className='bg-bg-elevation'
          animate
          disabled={{ before: tomorrow }}
          selected={range}
          onSelect={handleRangeSelect}
        />
      </Popover>
    </Label>
  );
};
