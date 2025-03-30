import { SelectAllCheckbox, SelectRowCheckbox } from "@/components/containers/column";
import { DataTableRowActions } from "@/components/containers/table/data-table-row-actions";
import { Badge } from "@/components/ui";
import { cn } from "@/lib/utils";
import { type ColumnDef } from "@tanstack/react-table";
import { type IPrice } from "../../type";

export const columnsPrice: Array<ColumnDef<IPrice>> = [
  {
    id: "select",
    header: ({ table }) => <SelectAllCheckbox table={table} />,
    cell: ({ row }) => <SelectRowCheckbox row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "ຊື່",
  },
  {
    accessorKey: "price",
    header: "ລາຄາ",
    cell: ({ row }) => {
      const price = row.original?.price ?? null;
      return <Badge variant="secondary" >${price ?? 0}</Badge>;
    },
  },
  {
    accessorKey: "type",
    header: "ປະເພດ",
    cell: ({ row }) => {
      const type = row.original?.type ?? null;
      if (type === "BLUE") {
        return <Badge className="bg-blue-500">ລາຄາບັດສີຟ້າ</Badge>;
      }
      return <Badge className="bg-yellow-500">ລາຄາບັດສີເຫຼືອງ</Badge>;
    },
  },
  {
    accessorKey: "code",
    header: "ລະຫັດ",
    cell: ({ row }) => {
      return <Badge className="bg-yellow-500">{row.original?.code ?? ""}</Badge>;
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
    accessorKey: "createdAt",
    header: "ວັນທີສ້າງ",
  },
  {
    accessorKey: "updatedAt",
    header: "ວັນທິແກ້ໄຂ",
  },
  {
    accessorKey: "id",
    header: "",
    cell: ({ row: { original: row } }) => {
      const rwoId = row.id;
      return <DataTableRowActions rowId={rwoId} resource="price" />;
    },
  },
];
