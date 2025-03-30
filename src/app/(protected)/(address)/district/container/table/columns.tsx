import { SelectAllCheckbox, SelectRowCheckbox } from "@/components/containers/column";
import { DataTableRowActions } from "@/components/containers/table/data-table-row-actions";
import { Badge } from "@/components/ui";
import { cn } from "@/lib/utils";
import { type ColumnDef } from "@tanstack/react-table";
import { type IDistrict } from "../../type";

export const columnsDistrict: Array<ColumnDef<IDistrict>> = [
  {
    id: "select",
    header: ({ table }) => <SelectAllCheckbox table={table} />,
    cell: ({ row }) => <SelectRowCheckbox row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "districtLao",
    header: "ຊື່ພາສາລາວ",
  },
  {
    accessorKey: "districtEnglish",
    header: "ຊື່ພາສາອັງກິດ",
  },
  {
    accessorKey: "province.provinceLao",
    header: "ແຂວງ",
  },
  {
    accessorKey: "status",
    header: "ສະຖານະ",
    cell: ({ row }) => {
      const status = row.original?.status ?? null;
      const label = status ? "ເປິດໃຊ້ງານ" : "ປິດໃຊ້ງານ";
      const className = status ? "bg-green-500" : " bg-red-500";
      return <Badge variant="outline" className={cn("text-white", className)}>{label}</Badge>;
    },
  },
  {
    accessorKey: "id",
    header: "",
    cell: ({ row: { original: row } }) => {
      const rwoId = row.id;
      return <DataTableRowActions rowId={rwoId} resource="district" />;
    },
  },
];
