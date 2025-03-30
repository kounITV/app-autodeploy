"use client"

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { DataTableRowActions } from '@/components/containers/table/data-table-row-actions';
import { formatDate } from '@/lib/format-date';

import type { ColumnDef } from "@tanstack/react-table"
import type { ICurrency } from "../../type"
import { DeleteDialog } from '@/lib/deleteDialogButton';

export const columnsCurrency: ColumnDef<ICurrency>[] = [
  {
    accessorKey: "no",
    header: () => <span className="font-medium">#</span>,
    cell: ({ row }) => <span className="text-muted-foreground">{row.getValue("no")}</span>,
  },
  {
    accessorKey: "name",
    header: () => <span className="font-medium">ຊື່</span>,
    cell: ({ row }) => <span className="font-medium">{row.getValue("name")}</span>,
  },
  {
    accessorKey: "symbol",
    header: () => <span className="font-medium">ສັນຍາລັກ</span>,
    cell: ({ row }) => {
      const symbol = row.original?.symbol ?? ""
      return <Badge className="bg-yellow-500 text-white font-medium">{symbol}</Badge>
    },
  },
  {
    accessorKey: "code",
    header: () => <span className="font-medium">ລະຫັດ</span>,
    cell: ({ row }) => {
      const code = row.original?.code ?? ""
      return <Badge className="bg-yellow-500 text-white font-medium">{code}</Badge>
    },
  },
  {
    accessorKey: "status",
    header: () => <span className="font-medium">ສະຖານະ</span>,
    cell: ({ row }) => {
      const status = Boolean(row.original?.status)
      return (
        <Badge variant="outline" className={cn("text-white font-medium", status ? "bg-green-500" : "bg-red-500")}>
          {status ? "ເປິດໃຊ້ງານ" : "ປິດໃຊ້ງານ"}
        </Badge>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: () => <span className="font-medium">ວັນທີສ້າງ</span>,
    cell: ({ row }) => {
      const date = row.getValue<string | Date>("createdAt")
      const formatted = formatDate({ date })
      return <span className="text-muted-foreground">{formatted}</span>
    },
  },
  {
    accessorKey: "updatedAt",
    header: () => <span className="font-medium">ວັນທິແກ້ໄຂ</span>,
    cell: ({ row }) => {
      const date = row.getValue<string | Date>("updatedAt")
      const formatted = formatDate({ date })
      return <span className="text-muted-foreground">{formatted}</span>
    },
  },
  {
    accessorKey: "id",
    header: () => <span className="font-medium">ວັນທິແກ້ໄຂ</span>,
    cell: ({ row }) => {
      const id = row.getValue<number>("id")
      return  <DeleteDialog  id={id} resources="currency" className="w-1/3"/>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <DataTableRowActions rowId={row.original.id} resource="currency" />
    },
  },
]

