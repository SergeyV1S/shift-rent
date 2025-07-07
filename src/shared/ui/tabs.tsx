import { createContext, useCallback, useContext, useState } from "react";

import { cn } from "@shared/lib/";

import { Label } from "./label";

interface ITabsProps {
  defaultValue?: string;
  children: React.ReactNode;
  className?: string;
  value?: string;
  onChange: (value: string) => void;
}

const TabsContext = createContext<{
  activeTab: string;
  setActiveTab: (value: string) => void;
} | null>(null);

const Tabs = ({
  className,
  defaultValue = "",
  value: controlledValue,
  onChange,
  children,
  ...props
}: ITabsProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const activeTab = isControlled ? controlledValue : internalValue;

  const setActiveTab = useCallback(
    (value: string) => {
      if (!isControlled) {
        setInternalValue(value);
      }
      onChange?.(value);
    },
    [isControlled, onChange]
  );

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div data-slot='tabs' className={cn("flex flex-col gap-2", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

interface ITabsListProps extends React.ComponentProps<"div"> {
  children: React.ReactElement<{ value: string }>[] | React.ReactElement<{ value: string }>;
}

const TabsList = ({ className, children, ...props }: ITabsListProps) => (
  <div
    data-slot='tabs-list'
    role='tablist'
    className={cn(
      "bg-bg-primary inline-flex w-fit items-center justify-center rounded-2xl p-1",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

interface ITabsTriggerProps extends React.ComponentProps<"button"> {
  value: string;
}

const TabsTrigger = ({ className, value, children, ...props }: ITabsTriggerProps) => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("TabsTrigger must be used within a Tabs component");
  }
  const { activeTab, setActiveTab } = context;

  return (
    <Label>
      <input
        type='radio'
        name='tabs'
        value={value}
        checked={activeTab === value}
        onChange={() => setActiveTab(value)}
        className='absolute h-0 w-0 opacity-0'
      />
      <button
        data-slot='tabs-trigger'
        role='tab'
        aria-selected={activeTab === value}
        className={cn(
          "transition-color cursor-pointer rounded-2xl px-12 py-3 whitespace-nowrap data-[active=true]:bg-white",
          className
        )}
        data-active={activeTab === value}
        onClick={() => setActiveTab(value)}
        {...props}
      >
        {children}
      </button>
    </Label>
  );
};

export { Tabs, TabsList, TabsTrigger };
