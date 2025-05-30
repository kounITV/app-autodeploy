import { SelectAllCheckbox, SelectRowCheckbox } from "@/components/containers/column";
import { DataTableRowActions } from "@/components/containers/table/data-table-row-actions";
import { Badge } from "@/components/ui";
import { type ColumnDef } from "@tanstack/react-table";
import { type ICompany } from "../../type";

export const columnsCompany: Array<ColumnDef<ICompany>> = [
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
    accessorKey: "businessCode",
    header: "ເລກທະບຽນ",
    cell: ({ row }) => {
      const code = row.original?.businessCode ?? null;
      return <Badge variant="secondary" >{code ?? 0}</Badge>;
    },
  },
  {
    accessorKey: "businessType",
    header: "ປະເພດຫົວໜ່ວຍທຸລະກິດ",
    cell: ({ row }) => {
      const code = row.original?.businessType ?? null;
      return <Badge variant="secondary" >{code ?? "-"}</Badge>;
    },
  },
  {
    accessorKey: "businessRegisterBy",
    header: "ຈົດທະບຽນ",
    cell: ({ row }) => {
      const businessRegisterBy = row.original?.businessRegisterBy ?? null;

      return <Badge variant="outline">{businessRegisterBy}</Badge>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "ວັນທີສ້າງ",
  },
  {
    accessorKey: "updatedAt",
    header: "ວັນທີແກ້ໄຂ",
  },
  {
    accessorKey: "id",
    header: "",
    cell: ({ row: { original: row } }) => {
      const rwoId = row.id;
      return <DataTableRowActions rowId={rwoId} resource="company" />;
    },
  },
];
