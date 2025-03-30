import { CookingPot, User, UserPlus } from "lucide-react";

import DataTableFacetedFilter from "@/components/containers/table/data-table-faceted-filter";
import { Button, Input } from "@/components/ui";

export const gender = [
  {
    label: "ຍິງ",
    value: "female",
    icon: User,
  },
  {
    label: "ຊາຍ",
    value: "male",
    icon: UserPlus,
  },
];

interface DataTableToolbarProps {
    updateSearch: (search: string) => void;
    filter: {
        genderFilter: string;
        setGenderFilter: (filter: string) => void;
    };
}

export function DataTableToolbar({ updateSearch, filter: { genderFilter, setGenderFilter } }: DataTableToolbarProps) {
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
            title="ເພດ"
            options={gender}
            selectedValues={genderFilter}
            onSelect={(value: string) => { setGenderFilter(value); }}
          />
        </div>
        <Button
          variant="ghost"
          className="h-8 px-2 lg:px-3"
          onClick={() => { setGenderFilter(""); }}
        >
                    ຣີເຊັດ
          <CookingPot className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
