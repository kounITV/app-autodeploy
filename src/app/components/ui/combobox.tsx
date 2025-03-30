"use client";
import { cn } from "@/lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { type Command as CommandPrimitive } from "cmdk";
import {
  forwardRef,
  useState,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from "react";
import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ScrollArea,
} from ".";

interface Option {
    value: string | number;
    label: string;
}

type ComboboxProps = Omit<
    ComponentPropsWithoutRef<typeof CommandPrimitive>,
    "onChange" | "onValueChange" | "value"
> & {
    options?: Option[];
    placeholder?: string;
    emptyMessage?: string;
    onChange?: (value: string | number) => void;
    value?: string | number | Option;
    disabled?: boolean;
    className?: string;
};

export const Combobox = forwardRef<
    ElementRef<typeof CommandPrimitive.Input>,
    ComboboxProps
>(({
  options = [],
  placeholder = "Select...",
  emptyMessage = "No options found.",
  onChange,
  value,
  disabled = false,
  className,
  ...props
}, ref) => {
  const [open, setOpen] = useState(false);

  const getSelectedValue = () => {
    if (value === undefined || value === null) { return undefined; }
    if (typeof value === 'object' && 'value' in value) {
      return value.value;
    }
    return value;
  };
  const selectedOption = options.find(
    (option) => option.value === getSelectedValue(),
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="h-8">
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn("w-full justify-between", className)}
        >
          {selectedOption ? selectedOption.label : placeholder}
          <CaretSortIcon className="w-4 h-4 ml-2 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("p-0", className)}>
        <Command ref={ref} {...props}>
          <CommandInput
            placeholder={placeholder}
            className="h-9"
          />
          <CommandEmpty>{emptyMessage}</CommandEmpty>
          <CommandGroup>
            <ScrollArea className={cn("overflow-y-auto max-h-52", className)}>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label}
                  onSelect={() => {
                    onChange?.(option.value);
                    setOpen(false);
                  }}
                >
                  {option.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4  ",
                      option.value === getSelectedValue()
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </ScrollArea>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
});

Combobox.displayName = "Combobox";
