import { CookingPot, ShieldCheck, ShieldX } from "lucide-react";

import { DataTableFacetedFilter } from "@/components/containers/table/data-table-faceted-filter";
import { Button, Input } from "@/components/ui";

export const status = [
  {
    label: "ເປິດໃຊ້ງານ",
    value: "true",
    icon: ShieldCheck,
  },
  {
    label: "ປິດໃຊ້ງານ",
    value: "false",
    icon: ShieldX,
  },
];

interface DataTableToolbarProps {
    updateSearch: (search: string) => void;
    filter: {
        statusFilter: string;
        setStatusFilter: (filter: string) => void;
    };
}

export function DataTableToolbar({ updateSearch, filter: { statusFilter, setStatusFilter } }: DataTableToolbarProps) {
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
            title="ສະຖານະ"
            options={status}
            selectedValues={statusFilter}
            onSelect={(value: string) => { setStatusFilter(value); }}
          />
        </div>
        <Button
          variant="ghost"
          className="h-8 px-2 lg:px-3"
          onClick={() => { setStatusFilter(""); }}
        >
                    ຣີເຊັດ
          <CookingPot className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
