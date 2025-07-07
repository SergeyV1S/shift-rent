import { Settings2Icon } from "lucide-react";
import { useEffect, useRef } from "react";

import type { DateRange } from "react-day-picker";

import type { CarBodyType, CarBrand } from "@shared/api";
import { useClickOutside, useDebouncedInput } from "@shared/hooks";
import { cn } from "@shared/lib";
import {
  Button,
  ColorPicker,
  DayPicker,
  Label,
  RangeSlider,
  SearchInput,
  Select,
  Tabs,
  TabsList,
  TabsTrigger,
  Typography
} from "@shared/ui";

import {
  carBodyTypeTranslation,
  carSteeringTranslation,
  carTransmissionTranslation
} from "../constants";
import { createOptionsWithTranslation } from "../helpers";
import { useCarStore, useFilterStore } from "../model";

export const CarFilter = () => {
  const { filters, isFiltersOpen, ...filterStore } = useFilterStore();
  const { brands, bodyTypes, steeringTypes, rent, transmissionTypes, fetchCars, ...carStore } =
    useCarStore();
  const { inputValue, handleChange } = useDebouncedInput({
    value: filters.search,
    onChange: (value) => filterStore.setValue("filters", { ...filters, search: value }),
    delay: 400
  });
  const advancedFiltersRef = useRef<HTMLDivElement>(null);

  const isFilterButtonsDisabled = Object.values(filters).filter((filter) => filter).length === 0;

  const bodyTypesOptions = createOptionsWithTranslation(bodyTypes, false, carBodyTypeTranslation);
  const brandsOptions = createOptionsWithTranslation(brands);
  const transmissionTypesOptions = createOptionsWithTranslation(
    transmissionTypes,
    true,
    carTransmissionTranslation
  );
  const steeringTypesOptions = createOptionsWithTranslation(
    steeringTypes,
    true,
    carSteeringTranslation
  );

  const showCarsByFilters = () => {
    fetchCars();
    filterStore.setValue("isFiltersOpen", false);
  };

  const onTabSwitch = (filter: keyof typeof filters, value: string) => {
    const newValue = value === "all" ? undefined : value;

    filterStore.setValue("filters", {
      ...filters,
      [filter]: newValue
    });
  };

  const resetFilters = () => {
    filterStore.setValue("filters", {});
    showCarsByFilters();
  };

  const onDateChange = (dateRange: DateRange | undefined) => {
    const rentDays =
      dateRange?.from && dateRange?.to
        ? { startDate: dateRange.from.getTime(), endDate: dateRange.to.getTime() }
        : undefined;

    carStore.setValue("rent", rentDays);
  };

  useEffect(() => {
    fetchCars();
  }, [filters.search]);

  useClickOutside(advancedFiltersRef, () => filterStore.setValue("isFiltersOpen", false));

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
          <DayPicker
            defaultValue={
              rent?.startDate && rent?.endDate
                ? { from: new Date(rent.startDate), to: new Date(rent.endDate) }
                : undefined
            }
            onChange={onDateChange}
          />
          <Button
            variant='secondary'
            onClick={() => filterStore.setValue("isFiltersOpen", !isFiltersOpen)}
          >
            <Settings2Icon /> Фильтры
          </Button>
        </div>
      </div>
      {isFiltersOpen && (
        <div
          ref={advancedFiltersRef}
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
                  filterStore.setValue("filters", { ...filters, bodyType: value as CarBodyType })
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
                onChange={(value) =>
                  filterStore.setValue("filters", { ...filters, brand: value as CarBrand })
                }
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
                  filterStore.setValue("filters", {
                    ...filters,
                    maxPrice: price.max,
                    minPrice: price.min
                  });
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
            <Label>
              Цвет
              <ColorPicker
                selectedColor={filters.color ?? "all"}
                onColorChange={(color) => onTabSwitch("color", color)}
              />
            </Label>
            <Button
              variant='outline'
              className='w-2/3 max-md:w-full'
              onClick={resetFilters}
              disabled={isFilterButtonsDisabled}
            >
              Сбросить фильтры
            </Button>
            <div className='w-full text-end'>
              <Button
                className='w-2/3 max-md:w-full'
                onClick={showCarsByFilters}
                disabled={isFilterButtonsDisabled}
              >
                Показать
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
