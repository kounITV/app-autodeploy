import { Checkbox } from "@/components/ui";

export interface SelectAllCheckboxProps {
  table: {
    getIsAllPageRowsSelected: () => boolean;
    getIsSomePageRowsSelected: () => boolean;
    toggleAllPageRowsSelected: (selected: boolean) => void;
  };
}

export const SelectAllCheckbox = ({ table }: SelectAllCheckboxProps) => (
  <Checkbox
    checked={
      table.getIsAllPageRowsSelected() ||
      (table.getIsSomePageRowsSelected() && "indeterminate")
    }
    onCheckedChange={(value) => {
      table.toggleAllPageRowsSelected(!!value);
    }}
    aria-label="Select all"
    className="translate-y-[2px]"
  />
);

export const SelectRowCheckbox = ({ row }: any) => (
  <Checkbox
    checked={row.getIsSelected()}
    onCheckedChange={(value) => {
      row.toggleSelected(!!value);
    }}
    aria-label="Select row"
    className="translate-y-[2px]"
  />
);

