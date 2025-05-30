"use client";

import { ImageViewer } from "@/components/containers/image-viewer";
import { type ColumnDef } from "@tanstack/react-table";
import { IApplication, IApplicationColumns } from "../../application/type";
import { formatDate } from "@/lib/format-date";
import { StatusChangeDialog } from "../container/dialog";
import { useApplicationStatus } from "../../application/hook/useApplicationStatus";

const CompanyCell = ({ row }: IApplicationColumns) => {
  const companyName = row.original?.company?.name;
  const villageName = `${row.original?.village?.villageLao}(ບ້ານ)`;
  const company = companyName ?? villageName ?? "ຍັງບໍ່ໄດ້ລະບຸ";

  if (!company) { 
    return null; 
  }

  return (
    <div className="flex flex-col">
      <span className="font-medium overflow-hidden">{company}</span>
    </div>
  );
};

export const columnsPrinted: Array<ColumnDef<IApplication>> = [
  {
    accessorKey: "no",
    header: "ລໍາດັບ",
  },
  {
    accessorKey: "image",
    header: "ຮູບພາບ",
    cell: ({ row }) => <ImageViewer src={row.original?.profile?.image} className="my-1 h-14 w-14" />,
  },
  {
    accessorKey: "firstName",
    header: "ຊື່ ແລະ ນາມສະກຸນ",
    cell: ({ row }) => <p>{row.original.profile.firstName}</p>,
  },
  {
    accessorKey: "barcode",
    header: "ບາໂຄດ",
    cell: ({ row }) => <p>{row.original.profile.barcode}</p>,
  },
  {
    accessorKey: "identityNumber",
    header: "ເລກທີເອກະສານ",
    cell: ({ row }) => <p>{row.original.profile.identityNumber}</p>,
  },
  {
    accessorKey: "companyId",
    header: "ຫົວໜ່ວຍທຸລະກິດ ຫຼື ບ້ານ",
    cell: ({ row }) => <CompanyCell row={row} />,
  },
  {
    accessorKey: "nationality.code",
    header: "ສັນຊາດ",
    cell: ({ row }) => <p>{row.original.profile.nationality.code}</p>,
  },
  {
    accessorKey: "issueDate",
    header: "ວັນທີອອກບັດ",
    cell: ({ row }) => <p>{formatDate({ date: row.original.issueDate })}</p>,
  },
  {
    accessorKey: "expirationDate",
    header: "ວັນທີໝົດອາຍຸ",
    cell: ({ row }) => <p>{formatDate({ date: row.original.expirationDate })}</p>,
  },
  {
    accessorKey: "type",
    header: "ອອກບັດ",
    cell: ({ row }) => <p>{ row.original.type === "NEW" ? "ອອກບັດໃໝ່" : "ອອກບັດຄືນ"}</p>,
  },
  {
    accessorKey: "id",
    header: "ຄືນສະຖານະ",
    cell: ({ row }) => {
      const { onSubmit, loading } = useApplicationStatus();
      return (
        <StatusChangeDialog record={row.original} onSubmit={onSubmit} loading={loading} />
      );
    },
  },
];
