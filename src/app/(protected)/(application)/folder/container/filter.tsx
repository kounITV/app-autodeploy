import { Badge, CheckCircle, CookingPot, CreditCard, DollarSign, FileCheck, FileClock, Gavel, ShieldCheck, Wrench } from "lucide-react";

import { DataTableFacetedFilter } from "@/components/containers/table/data-table-faceted-filter";
import { Button, Input } from "@/components/ui";

const status = [
  {
    label: "ຄ່າເລີ່ມຕົ້ນ",
    value: "DEFAULT",
    icon: FileCheck,
  },
  {
    label: "ກໍາລັງລໍຖ້າ",
    value: "PENDING",
    icon: FileClock,
  },
  {
    label: "ອະນຸມັດໂດຍຕໍາຫຼວດ",
    value: "APPROVED_BY_POLICE",
    icon: ShieldCheck,
  },
  {
    label: "ການເງິນອະນຸມັດ",
    value: "FINANCE_UNDER_REVIEW",
    icon: DollarSign,
  },
  {
    label: "ຕໍາຫຼວດອະນຸມັດ",
    value: "POLICE_UNDER_REVIEW",
    icon: Gavel,
  },
  {
    label: "ກໍາລັງຜະລິດ",
    value: "IN_PRODUCTION",
    icon: Wrench,
  },
  {
    label: "ສໍາເລັດແລ້ວ",
    value: "FINISHED",
    icon: CheckCircle,
  },
];

const type = [
  {
    value: "YELLOW",
    label: "ບັດສີເຫຼືອງ",
    icon: Badge,
  },
  {
    value: "BLUE",
    label: "ບັດສີຟ້າ",
    icon: CreditCard,
  },
];

interface DataTableToolbarProps {
  updateSearch: (search: string) => void;
  filter: {
    statusFilter: string;
    setStatusFilter: (filter: string) => void;
    typeFilter: string;
    setTypeFilter: (filter: string) => void;
  };
  showStatus?: boolean;
}

export function FolderToolbar({ showStatus = true, updateSearch, filter: { statusFilter, setStatusFilter, setTypeFilter, typeFilter } }: DataTableToolbarProps) {
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
        {showStatus && (
          <>
            <div className="flex gap-x-2">
              <DataTableFacetedFilter
                title="ສະຖານະ"
                options={status}
                selectedValues={statusFilter}
                onSelect={(value: string) => { setStatusFilter(value); }}
              />
            </div>
            <div className="flex gap-x-2">
              <DataTableFacetedFilter
                title="ປະເພດ"
                options={type}
                selectedValues={typeFilter}
                onSelect={(value: string) => { setTypeFilter(value); }}
              />
            </div>
          </>
        )}

        <Button
          variant="ghost"
          className="h-8 px-2 lg:px-3"
          onClick={() => {
            setStatusFilter("");
            setTypeFilter("");
          }}
        >
          ຣີເຊັດ
          <CookingPot className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
