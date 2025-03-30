"use client"
import { useState } from 'react';

import {
  CalendarIcon,
  Filter,

  Search,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { formatDate } from '@/lib/format-date';

import { Input, Label } from '@/components/ui';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface DataTableToolbarProps {
    updateSearch: (search: string) => void;
    filter: {
        dateFilter?: Date;
        setDateFilter?: (filter: Date) => void;
    };
}
export function FilterAndSearchGallery({ updateSearch, filter: { dateFilter, setDateFilter } }: DataTableToolbarProps) {
  const [showFilters, setShowFilters] = useState<boolean>(false)
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSearch(e.target.value);
  };
  return (
    <div >
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name..."
            onChange={handleSearchChange}
            className="pl-9"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2 h-10" onClick={() => setShowFilters(!showFilters)}>
          <Filter className="h-4 w-4" />
            Filters
        </Button>
      </div>
      {showFilters && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 border rounded-lg bg-muted/30 my-2">
          <div className="space-y-2">
            <Label htmlFor="date-filter">Created Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button id="date-filter" variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateFilter ? formatDate({ date: dateFilter }) : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <CalendarComponent mode="single" selected={dateFilter} onSelect={(day) => setDateFilter?.(day as Date)} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex items-end">
            <Button variant="secondary" className="w-full">
                 Clear Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}