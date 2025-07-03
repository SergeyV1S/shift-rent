import { CalendarDaysIcon, Settings2Icon } from "lucide-react";
import { useEffect, useState } from "react";

import { ru } from "date-fns/locale";
import { DayPicker } from "react-day-picker";
import type { DateRange } from "react-day-picker";
import "react-day-picker/style.css";

import type { CarBodyType, CarBrand } from "@shared/api";
import { formatDateRange } from "@shared/helpers";
import { useDebouncedInput } from "@shared/hooks";
import { cn } from "@shared/lib";
import {
  Button,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  SearchInput,
  Select,
  Typography
} from "@shared/ui";

import { useCarStore, useFilterStore } from "../model";

export const CarFilter = () => {
  const { filters, isFiltersOpen, setValue } = useFilterStore();
  const { brands, bodyTypes, fetchCars } = useCarStore();
  const [range, setRange] = useState<DateRange | undefined>();

  const handleRangeSelect = (selectedRange: DateRange | undefined) => {
    setRange(selectedRange);
    // setValue("filters", {
    //   ...filters,
    //   dateFrom: selectedRange.from,
    //   dateTo: selectedRange.to
    // });
  };

  const bodyTypesOptions = bodyTypes.map((type) => ({
    value: type,
    label: type
  }));

  const brandsOptions = brands.map((type) => ({
    value: type,
    label: type
  }));

  const { inputValue, handleChange } = useDebouncedInput({
    value: filters.search,
    onChange: (value) => setValue("filters", { ...filters, search: value }),
    delay: 400
  });

  const showCarsByFilters = () => {
    fetchCars();
    setValue("isFiltersOpen", false);
  };

  const resetFilters = () => {
    setValue("filters", {});
    showCarsByFilters();
  };

  useEffect(() => {
    fetchCars();
  }, [filters.search]);

  return (
    <>
      <div className='bg-bg-primary relative w-full rounded-2xl'>
        <div className='grid grid-cols-[repeat(2,1fr)_190px] items-end gap-4 p-6 max-md:grid-cols-1'>
          <Label className='space-y-1'>
            Поиск
            <SearchInput
              value={inputValue || ""}
              onChange={handleChange}
              className='bg-white'
              placeholder='Поиск'
            />
          </Label>
          <Label className='space-y-1'>
            Даты аренды
            <Popover>
              <PopoverTrigger className='flex items-center justify-between'>
                <Typography className='truncate opacity-70'>
                  {formatDateRange({ ...range }) || "Выберите даты аренды"}
                </Typography>
                <CalendarDaysIcon className='opacity-70' />
              </PopoverTrigger>
              <PopoverContent>
                <DayPicker
                  mode='range'
                  locale={ru}
                  selected={range}
                  onSelect={(d) => handleRangeSelect(d)}
                />
              </PopoverContent>
            </Popover>
          </Label>
          <Button variant='secondary' onClick={() => setValue("isFiltersOpen", !isFiltersOpen)}>
            <Settings2Icon /> Фильтры
          </Button>
        </div>
      </div>
      {isFiltersOpen && (
        <div
          className={cn(
            "border-border-light absolute top-[118px] right-0 left-0 z-50 rounded-2xl border bg-white",
            isFiltersOpen ? "animate-slide-down" : "hidden"
          )}
        >
          <div className='grid grid-cols-2 gap-6 p-8 max-md:grid-cols-1'>
            <Label>
              Марка
              <Select
                options={bodyTypesOptions}
                value={filters.bodyType}
                onChange={(value) =>
                  setValue("filters", { ...filters, bodyType: value as CarBodyType })
                }
                placeholder='Выберите тип кузова'
                className='w-64'
              />
            </Label>
            <Label>
              Тип кузова
              <Select
                options={brandsOptions}
                value={filters.brand}
                onChange={(value) => setValue("filters", { ...filters, brand: value as CarBrand })}
                placeholder='Выберите бренд'
                className='w-64'
              />
            </Label>
            <Button variant='outline' className='w-2/3 max-md:w-full' onClick={resetFilters}>
              Сбросить фильтры
            </Button>
            <div className='w-full text-end'>
              <Button className='w-2/3 max-md:w-full' onClick={showCarsByFilters}>
                Показать
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
