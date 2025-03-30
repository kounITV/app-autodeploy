import { type Column } from '@tanstack/react-table';
import { Check, PlusCircle } from 'lucide-react';
import React from 'react';

import {
  Badge,
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator,
} from "../../ui";

interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  options: Array<{
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }>;
  selectedValues: string | undefined;
  onSelect: (value: string) => void;
}

export function DataTableFacetedFilter<TData, TValue>({
  column,
  title,
  options,
  selectedValues,
  onSelect,
}: DataTableFacetedFilterProps<TData, TValue>) {
  const facets = column?.getFacetedUniqueValues();

  const handleSelect = React.useCallback(
    (value: string) => {
      onSelect(value);
    },
    [onSelect],
  );
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircle className="mr-2 h-4 w-4" />
          {title}
          {selectedValues && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge variant="secondary" className="rounded-sm px-1 font-normal lg:hidden">
                {selectedValues}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                  {options.find((option) => option.value === selectedValues)?.label || ""}
                </Badge>
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>ບໍ່ພົບຜົນການຊອກຫາ.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues === option.value;
                return (
                  <CommandItem key={option.value} onSelect={() => { handleSelect(option.value); }}>
                    <div
                      className={`mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary ${isSelected ? 'bg-primary text-primary-foreground' : 'opacity-50 [&_svg]:invisible'}`}
                    >
                      <Check className="h-4 w-4" />
                    </div>
                    {option.icon && <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />}
                    <span>{option.label}</span>
                    {facets?.get(option.value) && (
                      <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                        {facets.get(option.value)}
                      </span>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem onSelect={() => { onSelect(''); }} className="justify-center text-center">
                    ຣີເຊັດຕົວກອງ
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default DataTableFacetedFilter;
