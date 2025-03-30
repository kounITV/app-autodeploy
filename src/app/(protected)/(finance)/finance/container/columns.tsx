import { Badge } from "@/components/ui";
import { type ColumnDef } from "@tanstack/react-table";
import { formatDate } from '../../../../lib/format-date';
import { IFinance } from "../type";

export const columnsFinance: Array<ColumnDef<IFinance>> = [
  {
    accessorKey: "folder.name",
    header: "ແຟ້ມເອກກະສານ",
  },
  {
    accessorKey: "folder.approvedApplications",
    header: "ຈໍານວນຟອມ",
  },
  {
    accessorKey: "amount",
    header: "ຍອດເງິນທີຮັບ",
  },
  {
    accessorKey: "paymentMethod",
    header: "ປະເພດການຊໍາລະ",
  },
  {
    accessorKey: "receiptNumber",
    header: "ເລກບິນຮັບເງິນ",
  },
  {
    accessorKey: "approvedByUser",
    header: "ຜຸ້ຮັບ",
    cell: ({ row }) => {
      const user = row.original?.approvedByUser ?? "";
      return <Badge variant="outline">{`${user.firstName} ${user.lastName}`}</Badge>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "ຜຸ້ຮັບ",
    cell: ({ row }) => {
      const createdAt = row.original?.createdAt ?? "";
      return <>{formatDate({ date: createdAt, formatString: "HH:mm:ss - dd/MM/yyyy" })}</>
    },
  },
];
