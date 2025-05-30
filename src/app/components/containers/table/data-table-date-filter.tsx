'use client'

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Button,
} from "../../ui"
import { Calendar } from "@/components/ui/calendar"
import { Column } from "@tanstack/react-table"

interface DataTableDateFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  selectedDate?: Date;
  onSelect: (value: Date | undefined) => void;
}

export function DataTableDateFilter<TData, TValue>({
  column,
  title,
  selectedDate,
  onSelect,
}: DataTableDateFilterProps<TData, TValue>) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="h-8 border-dashed w-fit justify-start text-left font-normal"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate ? format(selectedDate, "dd/MM/yyyy  ") : <span>{title ?? "ເລືອກວັນທີ"}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={onSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
