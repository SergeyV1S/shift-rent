import React from "react";

import { cn } from "@shared/lib";

interface IRangeSliderProps {
  min?: number;
  max?: number;
  minValue: number;
  maxValue: number;
  onChange: (values: { min: number; max: number }) => void;
  className?: string;
  step?: number;
}

export const RangeSlider = ({
  min = 0,
  max = 100,
  minValue,
  maxValue,
  onChange,
  className
}: IRangeSliderProps) => {
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxValue);
    onChange({ min: value, max: maxValue });
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minValue);
    onChange({ min: minValue, max: value });
  };

  const minPosition = ((minValue - min) / (max - min)) * 100;
  const maxPosition = ((maxValue - min) / (max - min)) * 100;

  return (
    <div className={cn("relative h-8 w-full", className)}>
      <div className='bg-border-light absolute top-1/2 h-1 w-full -translate-y-1/2 rounded-full' />

      <div
        className='bg-base-text absolute top-1/2 h-1 -translate-y-1/2 rounded-full'
        style={{
          left: `${minPosition}%`,
          width: `${maxPosition - minPosition}%`
        }}
      />

      <input
        type='range'
        min={min}
        max={max}
        value={minValue}
        onChange={handleMinChange}
        className={cn(
          "pointer-events-none absolute top-1/2 h-0 w-full cursor-pointer appearance-none",
          "[&::-webkit-slider-thumb]:appearance-none",
          "[&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6",
          "[&::-webkit-slider-thumb]:rounded-full",
          "[&::-webkit-slider-thumb]:bg-base-text",
          "[&::-webkit-slider-thumb]:pointer-events-auto"
        )}
      />

      <input
        type='range'
        min={min}
        max={max}
        value={maxValue}
        onChange={handleMaxChange}
        className={cn(
          "pointer-events-none absolute top-1/2 h-0 w-full cursor-pointer appearance-none",
          "[&::-webkit-slider-thumb]:appearance-none",
          "[&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6",
          "[&::-webkit-slider-thumb]:rounded-full",
          "[&::-webkit-slider-thumb]:bg-base-text",
          "[&::-webkit-slider-thumb]:pointer-events-auto"
        )}
      />
    </div>
  );
};

RangeSlider.displayName = "RangeSlider";
