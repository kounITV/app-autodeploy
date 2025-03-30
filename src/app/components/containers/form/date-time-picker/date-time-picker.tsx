"use client";

import { Button, Popover, PopoverContent, PopoverTrigger } from "@/components/ui";
import { useForwardedRef } from "@/lib/useForwardedRef";
import { cn } from "@/lib/utils";
import { CalendarDate, parseDate } from "@internationalized/date";
import { CalendarIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import {
  DateValue,
  useButton,
  useDatePicker,
  useInteractOutside,
} from "react-aria";
import { DatePickerStateOptions, useDatePickerState } from "react-stately";
import { Calendar } from "./calendar";
import { DateField } from "./date-field";

const toDateValue = (value: any): DateValue | undefined => {
  try {
    if (!value) return undefined;

    if (value instanceof CalendarDate) return value;

    let dateString: string;

    if (value instanceof Date) {
      dateString = value.toISOString().split('T')[0];
    } else if (typeof value === 'string') {
      dateString = value.includes('T') ? value.split('T')[0] : value;
    } else {
      return undefined;
    }

    return parseDate(dateString);
  } catch  {
    return undefined;
  }
};

interface DateTimePickerProps extends Omit<DatePickerStateOptions<DateValue>, 'value' | 'onChange'> {
  value?: string | Date;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  name?: string;
  id?: string;
  disabled?: boolean;
}

const DateTimePicker = React.forwardRef<HTMLDivElement, DateTimePickerProps>(
  ({ value, onChange, onBlur, name, id, disabled = false, ...props }, forwardedRef) => {
    const ref = useForwardedRef(forwardedRef);
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const [open, setOpen] = useState(false);
    const [currentValue, setCurrentValue] = useState<DateValue | undefined>(
      toDateValue(value)
    );

    
    useEffect(() => {
      const newValue = toDateValue(value);
      setCurrentValue(newValue);
    }, [value]);

    const handleDateChange = (date: DateValue | null) => {
      if (date) {
        const jsDate = new Date(date.toString());
        onChange?.(jsDate.toISOString());
        setCurrentValue(date);
      } else {
        onChange?.("");
        setCurrentValue(undefined);
      }
    };

    const normalizedProps = {
      ...props,
      value: currentValue,
      onChange: handleDateChange,
      onBlur,
      name,
    };

    const state = useDatePickerState(normalizedProps);
    const {
      groupProps,
      fieldProps,
      buttonProps: _buttonProps,
      dialogProps,
      calendarProps,
    } = useDatePicker(normalizedProps, state, ref);

    const { buttonProps } = useButton(_buttonProps, buttonRef);
    useInteractOutside({
      ref: contentRef,
      onInteractOutside: () => setOpen(false),
    });

    return (
      <div
        {...groupProps}
        ref={ref}
        className={cn(
          "flex items-center rounded-md ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
          disabled && "opacity-50 cursor-not-allowed",
        )}
      >
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              {...buttonProps}
              variant="outline"
              className="h-10 border-r-0 rounded-r-none"
              disabled={disabled}
              onClick={() => setOpen(true)}
            >
              <CalendarIcon className="h- w-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent ref={contentRef} className="w-full">
            <div {...dialogProps} className="space-y-3">
              <Calendar {...calendarProps} />
            </div>
          </PopoverContent>
        </Popover>
        <DateField {...fieldProps} disabled={disabled} />

      </div>
    );
  }
);

DateTimePicker.displayName = "DateTimePicker";

export { DateTimePicker };
