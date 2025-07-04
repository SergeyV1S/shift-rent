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
  RangeSlider,
  SearchInput,
  Select,
  Tabs,
  TabsList,
  TabsTrigger,
  Typography
} from "@shared/ui";

import { translateCarSteering, translateCarTransmission } from "../lib";
import { useCarStore, useFilterStore } from "../model";

export const CarFilter = () => {
  const { filters, isFiltersOpen, setValue } = useFilterStore();
  const { brands, bodyTypes, steeringTypes, transmissionTypes, fetchCars } = useCarStore();
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

  const transmissionTypesOptions = [
    {
      value: "all",
      label: "Любой"
    },
    ...transmissionTypes.map((type) => ({
      value: type,
      label: translateCarTransmission(type)
    }))
  ];

  const steeringTypesOptions = [
    {
      value: "all",
      label: "Любой"
    },
    ...steeringTypes.map((type) => ({
      value: type,
      label: translateCarSteering(type)
    }))
  ];

  const { inputValue, handleChange } = useDebouncedInput({
    value: filters.search,
    onChange: (value) => setValue("filters", { ...filters, search: value }),
    delay: 400
  });

  const showCarsByFilters = () => {
    fetchCars();
    setValue("isFiltersOpen", false);
  };

  const onTabSwitch = (filter: keyof typeof filters, value: string) => {
    const newValue = value === "all" ? undefined : value;

    setValue("filters", {
      ...filters,
      [filter]: newValue
    });
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
              <DayPicker
                mode='range'
                locale={ru}
                selected={range}
                onSelect={(d) => handleRangeSelect(d)}
              />
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
            <Label>
              Руль
              <Tabs
                defaultValue={filters.steering || "all"}
                onChange={(value) => onTabSwitch("steering", value)}
              >
                <TabsList>
                  {steeringTypesOptions.map((option) => (
                    <TabsTrigger key={option.value} value={option.value}>
                      {option.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </Label>
            <Label>
              Коробка передач
              <Tabs
                defaultValue={filters.transmission || "all"}
                onChange={(value) => onTabSwitch("transmission", value)}
              >
                <TabsList>
                  {transmissionTypesOptions.map((option) => (
                    <TabsTrigger key={option.value} value={option.value}>
                      {option.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </Label>
            <Label>
              Стоимость
              <RangeSlider
                maxValue={filters.maxPrice || 0}
                min={0}
                max={10000}
                minValue={filters.minPrice || 0}
                onChange={(price) => {
                  setValue("filters", { ...filters, maxPrice: price.max, minPrice: price.min });
                }}
              />
              <div className='flex items-center justify-between'>
                <Typography variant='paragraph_12_regular' className='text-content-05'>
                  {filters.minPrice || 0} ₽
                </Typography>
                <Typography variant='paragraph_12_regular' className='text-content-05'>
                  до {filters.maxPrice || 0} ₽
                </Typography>
              </div>
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
