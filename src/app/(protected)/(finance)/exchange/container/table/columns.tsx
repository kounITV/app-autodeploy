"use client"

import { Badge } from "@/components/ui/badge"
import { DataTableRowActions } from "@/components/containers/table/data-table-row-actions"
import { formatDate } from "@/lib/format-date"
import { CalendarIcon, ArrowRightIcon } from "lucide-react"

import type { ColumnDef } from "@tanstack/react-table"
import type { IExchangeRate } from "../../type"

export const columnsExchangeRate: ColumnDef<IExchangeRate>[] = [
  {
    accessorKey: "no",
    header: () => <span className="text-xs font-medium uppercase text-muted-foreground">ລຳດັບ</span>,
    cell: ({ row }) => <span className="text-sm font-medium">{row.getValue("no")}</span>,
    size: 60,
  },
  {
    accessorKey: "name",
    header: () => <span className="text-xs font-medium uppercase text-muted-foreground">name</span>,
    cell: ({ row }) => <span className="text-sm font-medium">{row.getValue("name")}</span>,
    size: 60,
  },
  {
    accessorKey: "rateBase",
    header: () => <span className="text-xs font-medium uppercase text-muted-foreground">Rate (LIT)</span>,
    cell: ({ row }) => (
      <span className="text-sm font-semibold">{Number.parseFloat(row.getValue("rateBase")).toFixed(4)}</span>
    ),
  },
  {
    accessorKey: "ratePolice",
    header: () => <span className="text-xs font-medium uppercase text-muted-foreground">Rate (Police)</span>,
    cell: ({ row }) => (
      <span className="text-sm font-semibold">{Number.parseFloat(row.getValue("ratePolice")).toFixed(4)}</span>
    ),
  },
  {
    accessorKey: "baseCurrency",
    header: () => <span className="text-xs font-medium uppercase text-muted-foreground">ສະກຸນເງິນຕັ້ງຕົ້ນ</span>,
    cell: ({ row }) => {
      const code = row.original?.baseCurrency?.code || ""
      const name = row.original?.baseCurrency?.name || ""
      const symbol = row.original?.baseCurrency?.symbol || ""

      return (
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 font-medium">
            {symbol}
          </Badge>
          <span className="text-sm font-medium">{code}</span>
          <span className="text-xs text-muted-foreground">({name})</span>
        </div>
      )
    },
  },
  {
    accessorKey: "targetCurrency",
    header: () => <span className="text-xs font-medium uppercase text-muted-foreground">ສະກຸນເງິນປ້າຍທາງ</span>,
    cell: ({ row }) => {
      const code = row.original?.targetCurrency?.code || ""
      const name = row.original?.targetCurrency?.name || ""
      const symbol = row.original?.targetCurrency?.symbol || ""
      return (
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 font-medium">
            {symbol}
          </Badge>
          <span className="text-sm font-medium">{code}</span>
          <span className="text-xs text-muted-foreground">({name})</span>
        </div>
      )
    },
  },
  {
    accessorKey: "conversion",
    header: () => <span className="text-xs font-medium uppercase text-muted-foreground">ອັດຕາແປງ</span>,
    cell: ({ row }) => {
      const rateBase = Number.parseFloat(row.getValue("rateBase"))
      const ratePolice = Number.parseFloat(row.getValue("ratePolice"))
      const baseSymbol = row.original?.baseCurrency?.symbol || ""
      const targetSymbol = row.original?.targetCurrency?.symbol || ""
      return (
        <div>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium">{baseSymbol}1</span>
            <ArrowRightIcon className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="font-medium">
              {targetSymbol} {rateBase.toFixed(4)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium">{baseSymbol}1</span>
            <ArrowRightIcon className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="font-medium">
              {targetSymbol} {ratePolice.toFixed(4)}
            </span>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "dateRange",
    header: () => <span className="text-xs font-medium uppercase text-muted-foreground">ຊ່ວງເວລາທີ່ໃຊ້ບັງຄັບ</span>,
    cell: ({ row }) => {
      const startDate = row.original?.startDate
      const endDate = row.original?.endDate

      return (
        <div className="flex items-center gap-1.5">
          <CalendarIcon className="h-3.5 w-3.5 text-muted-foreground" />
          <div>
            <div className="text-sm">
              {formatDate({ date: startDate })}
            </div>
            <div className="text-sm">
              {formatDate({ date: endDate ?? "-" })}
            </div>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "timestamps",
    header: () => <span className="text-xs font-medium uppercase text-muted-foreground">ເວລາປັບປຸງ</span>,
    cell: ({ row }) => {
      const createdAt = row.original?.createdAt
      const updatedAt = row.original?.updatedAt
      return (
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="font-medium text-muted-foreground">ສ້າງເມື່ອ:</span>
            <span>{formatDate({ date: createdAt })}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-medium text-muted-foreground">ອັບເດດ:</span>
            <span>{formatDate({ date: updatedAt })}</span>
          </div>
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const id = row.original?.id

      return (
        <div className="flex items-center justify-end gap-2">
          <DataTableRowActions rowId={id} resource="exchange" />
        </div>
      )
    },
  },
]
