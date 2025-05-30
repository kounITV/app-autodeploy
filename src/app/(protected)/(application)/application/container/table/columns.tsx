"use client";

import { ImageViewer } from "@/components/containers/image-viewer";
import { Badge, Button } from "@/components/ui";
import { type ColumnDef } from "@tanstack/react-table";
import { IdCard } from "lucide-react";
import { useRouter } from "next/navigation";
import { type IProfile, type IProfileColumns } from "src/app/(protected)/profile/type";

const FullNameCell = ({ row }: IProfileColumns) => (
  <span>{`${row.original?.firstName} ${row.original?.lastName}`}</span>
);

const GenderCell = ({ row }: IProfileColumns) => {
  const gender = row.original?.gender ?? "";
  return (
    <Badge variant={gender === "MALE" ? "outline" : "secondary"}>{`${gender}`}</Badge>
  );
};

export const columnsProfile: Array<ColumnDef<IProfile>> = [
  {
    accessorKey: "no",
    header: "#",
  },
  {
    accessorKey: "image",
    header: "ຮູບພາບ",
    cell: ({ row }) => <ImageViewer src={row.original?.image} className="my-1 h-14 w-14" />,
  },
  {
    accessorKey: "firstName",
    header: "ຊື່ ແລະ ນາມສະກຸນ",
    cell: ({ row }) => <FullNameCell row={row} />,
  },
  {
    accessorKey: "applicationNumber",
    header: "ເອກທິຟອມ",
  },
  {
    accessorKey: "barcode",
    header: "ບາໂຄດ",
  },
  {
    accessorKey: "identityNumber",
    header: "ເລກທີເອກະສານ",
  },
  {
    accessorKey: "phoneNumber",
    header: "ເບີໂທລະສັບ",
  },
  {
    accessorKey: "dateOfBirth",
    header: "ວັນທີເກີດ",
  },
  {
    accessorKey: "gender",
    header: "ເພດ",
    cell: ({ row }) => <GenderCell row={row} />,
  },
  {
    accessorKey: "nationality.code",
    header: "ສັນຊາດ",
  },
  {
    accessorKey: "id",
    header: "ອອກບັດໃຫມ່",
    cell: ({ row }) => {
      const router = useRouter();
      const url = `/application/create/${row.original?.id}/NEW`;
      return (
        <Button type="button" variant={"outline"} onClick={() => { router.push(url); }} className="flex gap-x-1">
          <IdCard /> <div>ອອກບັດ</div>
        </Button>
      );
    },
  },
];
