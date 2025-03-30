import { SelectAllCheckbox, SelectRowCheckbox } from "@/components/containers/column";
import { DataTableRowActions } from "@/components/containers/table/data-table-row-actions";
import { Badge } from "@/components/ui";
import { cn } from "@/lib/utils";
import { type ColumnDef } from "@tanstack/react-table";
import { type INationality } from "../../type";

export const columnsnationality: Array<ColumnDef<INationality>> = [
  {
    id: "select",
    header: ({ table }) => <SelectAllCheckbox table={table} />,
    cell: ({ row }) => <SelectRowCheckbox row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "ຊື່ພາສາລາວ",
  },
  {
    accessorKey: "nationality",
    header: "ຊື່ພາສາອັງກິດ",
  },
  {
    accessorKey: "code",
    header: "ເຊື້ອຊາດ",
    cell: ({ row }) => {
      const code = row.original?.code ?? "";
      return <Badge variant="outline">{code}</Badge>;
    },
  },
  {
    accessorKey: "continent",
    header: "ທະວີບ",
    cell: ({ row }) => {
      const continent = row.original?.continent ?? "";
      return <Badge variant="outline">{continent}</Badge>;
    },
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
      return <DataTableRowActions rowId={rwoId} resource="nationality" />;
    },
  },
];
