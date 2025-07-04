import type { CarColor } from "@shared/api";
import { cn } from "@shared/lib";

interface IColorOption {
  name: CarColor | "all";
  hex: string;
}

const COLOR_OPTIONS: IColorOption[] = [
  {
    name: "all",
    hex: "conic-gradient(from -30deg, #2240EC, #681FA0, #FF0000, #FAEA04, #0CC015, #2240EC)"
  },
  { name: "black", hex: "#1E1E1E" },
  { name: "blue", hex: "#2F54E9" },
  { name: "grey", hex: "#808080" },
  { name: "orange", hex: "#FFA500" },
  { name: "red", hex: "#CA251C" },
  { name: "silver", hex: "#C0C0C0" },
  { name: "white", hex: "#FFFFFF" }
];

interface IColorPickerProps {
  selectedColor?: IColorOption["name"];
  onColorChange?: (color: IColorOption["name"]) => void;
}

export const ColorPicker = ({ selectedColor, onColorChange }: IColorPickerProps) => {
  const handleColorSelect = (color: IColorOption["name"]) => {
    onColorChange?.(color);
  };

  return (
    <div className='flex flex-wrap items-center gap-2'>
      {COLOR_OPTIONS.map((color) => (
        <label
          key={color.name}
          className={cn(
            "relative flex size-10 cursor-pointer items-center justify-center rounded-full border-2",
            selectedColor === color.name ? "border-brand-primary" : "border-stroke-primary"
          )}
        >
          <input
            type='radio'
            name='color'
            value={color.name}
            checked={selectedColor === color.name}
            onChange={() => handleColorSelect(color.name)}
            className='sr-only'
          />
          <div
            className='absolute top-1/2 left-1/2 size-8 -translate-x-1/2 -translate-y-1/2 rounded-full'
            style={{ background: color.hex }}
            aria-label={color.name}
          />
        </label>
      ))}
    </div>
  );
};
