import { Badge, Button } from "@/components/ui";
import { type ColumnDef } from "@tanstack/react-table";
import { IRefundReport, type IRefund } from "../../type";
import { useRouter } from "next/navigation";
import { RotateCcw } from "lucide-react";
import { ImageDialog } from "./image-dialog";
import { formatDate } from "@/lib/format-date";

export const columnsRefund: Array<ColumnDef<IRefund>> = [
  {
    accessorKey: "folder",
    header: "ຊື່ແຟ້ມ",
    cell: ({ row }) => {
      const folderName = row.original?.folder?.name ?? "";
      return <div>{folderName}</div>
    },
  },
  {
    accessorKey: "code",
    header: "ຟອມເລກທີ",
    cell: ({ row }) => {
      const folderCode = row.original?.folder?.code ?? "";
      const applicationNumber = row.original?.number?.number ?? "";
      return <div className="">{`${folderCode}${applicationNumber}`}</div>
    },
  },
  {
    accessorKey: "price",
    header: "ລາຄາ",
    cell: ({ row }) => {
      const price = row.original?.price?.price ?? "";
      return <Badge variant="secondary" >${price}{}</Badge>;
    },
  },
  {
    accessorKey: "type",
    header: "ປະເພດ",
    cell: ({ row }) => {
      const type = row.original?.price?.type ?? "";
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
      const code = row.original?.price?.code ?? "";
      return <Badge>{code}</Badge>;
    },
  },
  {
    accessorKey: "id",
    header: "ຄືນເງິນ",
    cell: ({ row }) => {
      const router = useRouter();
      const url = `/refund/create/${row.original?.number.id}`;
      return (
        <Button type="button" variant={"outline"} onClick={() => { router.push(url); }} className="flex gap-x-1">
          <RotateCcw /> <div>ຄືນເງິນ</div>
        </Button>
      );
    },
  },
];

export const columnsRefundReport: Array<ColumnDef<IRefundReport>> = [
  {
    accessorKey: "folderName",
    header: "ຊື່ແຟ້ມ",
    cell: ({ row }) => {
      const folderName = row.original?.number?.folder.name ?? "";
      return <div>{folderName}</div>
    },
  },
  {
    accessorKey: "applicationNumber",
    header: "ຟອມເລກທີ",
    cell: ({ row }) => {
      const folderName = row.original?.number?.folder.code ?? "";
      const applicationNumber = row.original?.number?.number ?? "";
      return <div>{folderName}{applicationNumber}</div>
    },
  },
  {
    accessorKey: "price",
    header: "ລາຄາ",
    cell: ({ row }) => {
      const price = row.original?.price?.price ?? "";
      return <Badge variant="secondary" >${price}{}</Badge>;
    },
  },
  {
    accessorKey: "type",
    header: "ປະເພດ",
    cell: ({ row }) => {
      const type = row.original?.price?.type ?? "";
      if (type === "BLUE") {
        return <Badge className="bg-blue-500">ລາຄາບັດສີຟ້າ</Badge>;
      }
      return <Badge className="bg-yellow-500">ລາຄາບັດສີເຫຼືອງ</Badge>;
    },
  },
  {
    accessorKey: "firstName",
    header: "ຊື່ລູກຄ້າ",
    cell: ({ row }) => {
      return  <span>{`${row.original?.profile.firstName} ${row.original?.profile?.lastName}`}</span>
    },
  },
  {
    accessorKey: "firstName",
    header: "ຊື່ຜູ້ອະນຸນັດ",
    cell: ({ row }) => {
      return  <span>{`${row.original?.createBy.firstName} ${row.original?.createBy?.lastName}`}</span>
    },
  },
  {
    accessorKey: "createdAt",
    header: "ວັນທິອະນຸມັດ",
    cell: ({ row }) => {
      const createdAt = row.original?.createdAt ?? "";
      return <div >{formatDate({ date: createdAt })}</div>;
    },
  },
  {
    accessorKey: "image",
    header: "ຮູບພາບ",
    cell: ({ row }) => {
      const refundImage = row.original?.refundImage ?? []
      return <ImageDialog images={refundImage} />
    },
  },
];
