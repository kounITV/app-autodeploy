"use client"

import {
  CalendarIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { formatDate } from '@/lib/format-date';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label, MultiSelectCombobox } from '@/components/ui';
import useOfficeCombobox from '../office/hook/useOfficeCombobox';

interface DataTableToolbarProps {
    filter: {
        createdAt?: Date;
        setCreatedAtFilter?: (filter?: Date) => void;
        selectedOfficeId?: any;
        setSelectedOfficeId?: (OfficeId?: any) => void;
    };
}
export function FilterNumberAggregation({ filter: { createdAt, setCreatedAtFilter, selectedOfficeId, setSelectedOfficeId } }: DataTableToolbarProps) {
  const { result: officeOptions } = useOfficeCombobox();
  return (
    <div >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 border rounded-lg bg-muted/30 my-2">
        <div className="space-y-2 h-10">
          <Label htmlFor="date-filter">ສັນທິເດືອນປິ</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button id="date-filter" variant="outline" className="w-full justify-start text-left font-normal h-9">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {createdAt ? formatDate({ date: createdAt }) : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <CalendarComponent mode="single" selected={createdAt} onSelect={(day) => setCreatedAtFilter?.(day as Date)} initialFocus />
            </PopoverContent>
          </Popover>
        </div>
        <div className="space-y-2 col-span-2">
          <Label htmlFor="date-filter">ສາຂາ</Label>
          <MultiSelectCombobox
            options={officeOptions}
            value={selectedOfficeId}
            onChange={setSelectedOfficeId}
            placeholder="Select office..."
          />
        </div>
      </div>
    </div>
  )
}