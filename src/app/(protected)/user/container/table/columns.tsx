/* eslint-disable @typescript-eslint/naming-convention */
import { DataTableColumnHeader } from "@/components/containers/table/data-table-column-header"
import { DataTableRowActions } from "@/components/containers/table/data-table-row-actions"
import {
  Badge,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui"
import { cn } from "@/lib/utils"
import type { ColumnDef } from "@tanstack/react-table"
import { CheckCircle2, XCircle } from "lucide-react"
import type { IUser } from "../../type"
import type { RoleLabels } from "../interface"

export const columnsUser: Array<ColumnDef<IUser>> = [
  {
    accessorKey: "username",
    header: ({ column }) => <DataTableColumnHeader column={column} title="ຊື່ບັນຊີເຂົ້າໃຊ້ລະບົບ" />,
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-3">
          <span className="font-medium">{row.original.username}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="ຊື່ແທ້" />,
    cell: ({ row }) => <span className="text-muted-foreground">{row.original.firstName}</span>,
  },
  {
    accessorKey: "phone",
    header: ({ column }) => <DataTableColumnHeader column={column} title="ເບີໂທລະສັບ" />,
    cell: ({ row }) => (
      <span className="font-mono text-xs bg-muted px-2 py-1 rounded-md">{`${row.original.phone}`}</span>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => <DataTableColumnHeader column={column} title="ອີເມວ" />,
    cell: ({ row }) => <span className="text-muted-foreground text-sm">{row.original.email || "—"}</span>,
  },
  {
    accessorKey: "office.name",
    header: "ຫ້ອງການທີ່ປະຈໍາການ",
  },
  {
    accessorKey: "office.name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="ສັງກັດຫ້ອງການມທີສິດການເຂົ້າເຖີງຂໍ້ມູນ" />,
    cell: ({ row }) => {
      const office = row.original?.userOffice
      return (
        <div className="flex flex-wrap gap-1.5 max-w-[200px]">
          {office.map((item) => (
            <Badge
              key={item.id}
              variant="outline"
              className="bg-primary/5 hover:bg-primary/10 transition-colors text-xs py-0.5"
            >
              {item.office.name}
            </Badge>
          ))}
        </div>
      )
    },
  },
  
  {
    accessorKey: "role",
    header: ({ column }) => <DataTableColumnHeader column={column} title="ສີດໃຊ້ງານ" />,
    cell: ({ row }) => {
      const role = row.getValue("role") ?? ""
      return <div className="flex space-x-2">{getRoleLabel(role as keyof RoleLabels)}</div>
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="ສະຖານະ" />,
    cell: ({ row }) => {
      const status = row.original.isActive
      return getStatus(status)
    },
  },
  {
    accessorKey: "id",
    header: "",
    cell: ({ row: { original: row } }) => {
      const rowId = row.id
      return (
        <div className="flex justify-end">
          <DataTableRowActions rowId={rowId} resource="user" />
        </div>
      )
    },
  },
]
export const roleLabels: RoleLabels = {
  STAFF: "ພະນັກງານ",
  ADMIN: "ແອັດມິນ",
  SUPER_ADMIN: "ຊູເປີແອັດມິນ",
  FINANCE: "ການເງິນ",
  POLICE_OFFICER: "ທີມງານຕື່ມຟອມ",
  POLICE_COMMANDER: "ທີມງານອະນຸມັດຟອມ",
  POLICE_PRODUCTION: "ທີມງານຜະລິດ",
  VERSIFICATION_OFFICER: "ທີມງານກວດຂໍ້ມູນບັດ",
}

export const getRoleLabel = (role: keyof RoleLabels | string) => {
  const result = roleLabels[role as keyof RoleLabels]
  const roleColors: Record<string, string> = {
    ADMIN: "bg-blue-50 text-blue-700 border-blue-200",
    SUPER_ADMIN: "bg-blue-50 text-blue-700 border-blue-200",
    STAFF: "bg-green-50 text-green-700 border-green-200",
    FINANCE: "bg-amber-50 text-amber-700 border-amber-200",
    POLICE_OFFICER: "bg-purple-50 text-purple-700 border-purple-200",
    POLICE_COMMANDER: "bg-indigo-50 text-indigo-700 border-indigo-200",
    POLICE_PRODUCTION: "bg-rose-50 text-rose-700 border-rose-200",
  }

  return (
    <Badge
      variant="outline"
      className={cn(
        "font-medium text-xs py-1 px-2 rounded-md",
        roleColors[role as string] || "bg-gray-50 text-gray-700 border-gray-200",
      )}
    >
      {result}
    </Badge>
  )
}

const getStatus = (status: boolean) => {
  const label = status ? "ເປິດໃຊ້ງານ" : "ປິດໃຊ້ງານ"

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium w-fit",
              status
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200",
            )}
          >
            {status ? <CheckCircle2 className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}
            {label}
          </div>
        </TooltipTrigger>
        <TooltipContent>{status ? "ບັນຊີນີ້ກຳລັງໃຊ້ງານຢູ່" : "ບັນຊີນີ້ຖືກປິດໃຊ້ງານ"}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

