/* eslint-disable no-nested-ternary */
/* eslint-disable max-statements-per-line */
import { SelectAllCheckbox, SelectRowCheckbox } from "@/components/containers/column";
import { DataTableRowActions } from "@/components/containers/table/data-table-row-actions";
import { Badge } from "@/components/ui";
import { formatDate } from "@/lib/format-date";
import { type ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { type IBlacklist, type IBlacklistColumns } from "./type";

const FullNameCell = ({ row }: { row: IBlacklistColumns["row"] }) => {
  const profile = row.original?.profile;
  return <span>{`${profile?.firstName || ""} ${profile?.lastName || ""}`}</span>;
};

const ReasonCell = ({ row }: IBlacklistColumns) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 20;
  const reason = row?.original?.reason || "";
  const toggleExpand = () => { setIsExpanded((prev) => !prev); };
  const displayedReason = isExpanded
    ? reason
    : reason.length > maxLength
      ? `${reason.slice(0, maxLength)}...`
      : reason;

  return (
    <div>
      <p className="font-semibold text-sm text-muted-foreground max-w-[200px] break-words">
        {displayedReason}
      </p>
      {reason.length > maxLength && (
        <button
          className="text-blue-500 text-xs font-medium underline ml-1"
          onClick={toggleExpand}
        >
          {isExpanded ? "ສະແດງນ້ອຍລົງ" : "ອ່ານເພີ່ມເຕີມ"}
        </button>
      )}
    </div>
  );
};

const GenderCell = ({ row }: IBlacklistColumns) => {
  const gender = row.original?.profile.gender ?? "";
  return (
    <Badge variant={gender === "ຊາຍ" ? "outline" : "secondary"}>{`${gender}`}</Badge>
  );
};

export const columnsBlacklistProfile: Array<ColumnDef<IBlacklist>> = [
  {
    id: "select",
    header: ({ table }) => <SelectAllCheckbox table={table} />,
    cell: ({ row }) => <SelectRowCheckbox row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "firstName",
    header: "ຊື່ ແລະ ນາມສະກຸນ",
    cell: ({ row }) => <FullNameCell row={row} />,
  },
  {
    accessorKey: "updatedAt",
    header: "ວັນທີຂື້ນບັນຊີດໍາ",
    cell: ({ row }) => {
      const date = row.original?.updatedAt || "";
      return <span>{`${formatDate({ date })}`}</span>;
    },
  },
  {
    accessorKey: "reason",
    header: "ເຫດຜົນ",
    cell: ({ row }) => <ReasonCell row={row} />,
  },
  {
    accessorKey: "profile.phoneNumber",
    header: "ເບີໂທລະສັບ",
  },
  {
    accessorKey: "profile.dateOfBirth",
    header: "ວັນທີເກີດ",
    cell: ({ row }) => {
      const date = row.original?.profile.dateOfBirth || "";
      return <span>{`${formatDate({ date })}`}</span>;
    },
  },
  {
    accessorKey: "profile.gender",
    header: "ເພດ",
    cell: ({ row }) => <GenderCell row={row} />,
  },
  {
    accessorKey: "profile.nationality.code",
    header: "ສັນຊາດ",
  },
  {
    accessorKey: "id",
    header: "",
    cell: ({ row: { original: row } }) => {
      const rwoId = row.id;
      return <DataTableRowActions rowId={rwoId} resource="profile" />;
    },
  },
];
