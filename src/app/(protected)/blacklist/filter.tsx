import { CookingPot, User, UserPlus } from "lucide-react";

import { Button, Input } from "@/components/ui";
import { DataTableDateFilter } from "@/components/containers/table/data-table-date-filter";
import DataTableFacetedFilter from "@/components/containers/table/data-table-faceted-filter";

const startYear = 2020;
const currentYear = new Date().getFullYear();
const endYear = currentYear + 1;
const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => {
  const year = endYear - i; 
  return {
    label: String(year),
    value: String(year),
  };
});

export const gender = [
  {
    label: "ຍິງ",
    value: "FEMALE",
    icon: User,
  },
  {
    label: "ຊາຍ",
    value: "MALE",
    icon: UserPlus,
  },
];

interface DataTableToolbarProps {
    updateSearch: (search: string) => void;
    filter: {
      genderFilter: string;
      setGenderFilter: (filter: string) => void;
      yearFilter: string,
      setYearFilter: (filter: string) => void;
      dateFilter?: Date;
      setDateFilter: (date: Date | undefined) => void;
    };
}

export function DataTableToolbar({ updateSearch, filter: { dateFilter, setDateFilter, yearFilter, setYearFilter } }: DataTableToolbarProps) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSearch(e.target.value);
  };
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
        <Input
          placeholder="ຄົ້ນຫາ..."
          className="h-8 w-[150px] lg:w-[250px]"
          onChange={handleSearchChange}
        />
        <div className="flex gap-x-2">
          <DataTableFacetedFilter
            title="ປີ"
            options={years}
            selectedValues={yearFilter}
            onSelect={(value: string) => { setYearFilter(value); }}
          />
        </div>
        <div className="flex gap-x-2">
          <DataTableDateFilter
            title="ວັນທີ"
            selectedDate={dateFilter}
            onSelect={(date) => setDateFilter(date)}
          />
        </div>
        <Button
          variant="ghost"
          className="h-8 px-2 lg:px-3"
          onClick={() => { 
            setDateFilter(undefined); 
            setYearFilter("")
          }}
        >
                    ຣີເຊັດ
          <CookingPot className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
