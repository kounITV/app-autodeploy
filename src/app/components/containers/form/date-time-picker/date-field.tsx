"use client";

import { cn } from "@/lib/utils";
import { createCalendar } from "@internationalized/date";
import { useRef } from "react";
import {
  AriaDatePickerProps,
  DateValue,
  useDateField
} from "react-aria";
import { useDateFieldState } from "react-stately";
import { DateSegment } from "./date-segment";

interface DateFieldProps extends AriaDatePickerProps<DateValue> {
  disabled?: boolean;
}
function DateField(props: DateFieldProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const state = useDateFieldState({
    ...props,
    locale: "day",
    createCalendar,
  });
  const { fieldProps } = useDateField(props, state, ref);

  return (
    <div
      {...fieldProps}
      ref={ref}
      className={cn(
        "inline-flex h-10 flex-1 items-center border border-l-0 rounded-r-md border-input bg-transparent py-2 pl-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        props.isDisabled || props.disabled ? "cursor-not-allowed opacity-50" : "",
      )}

    >
      {state.segments.map((segment, i) => (
        <DateSegment key={i} segment={segment} state={state} />
      ))}
      {state.validationState === "invalid" && (
        <span aria-hidden="true">🚫</span>
      )}
    </div>
  );
}

export { DateField };
