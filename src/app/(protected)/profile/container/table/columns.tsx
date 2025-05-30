'use client';

import { DataTableRowActions } from "@/components/containers/table/data-table-row-actions";
import { Badge } from "@/components/ui";
import { type ColumnDef } from "@tanstack/react-table";
import { type IProfile, type IProfileColumns } from "../../type";
import { BlacklistDialog } from "./blacklist";
import { getIdentityLabel } from "../../lib";
import { ImageViewer } from "@/components/containers/image-viewer";
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui';
import { IGallery } from "src/app/(protected)/(image)/gallery/type";
const FullNameCell = ({ row }: IProfileColumns) => (
  <span>{`${row.original?.firstName} ${row.original?.lastName}`}</span>
);

const DocumentIdentityCell = ({ row }: IProfileColumns) => {
  const identityType = getIdentityLabel(row?.original?.identityType ?? "");
  const number = row?.original?.identityNumber;
  return (
    <div className="">
      <p className="font-semibold text-sm text-muted-foreground">{identityType}</p>
      <p className="font-semibold">{number}</p>
    </div>
  );
};

const GenderCell = ({ row }: IProfileColumns) => {
  const gender = row.original?.gender ?? "";
  return (
    <Badge variant={gender === "ຊາຍ" ? "outline" : "secondary"}>{`${gender}`}</Badge>
  );
};
const ProfileLinkCell = ({ item }: any) => {
  const router = useRouter();
  const hasProfile = item.profileGallery && item.profileGallery.length > 0;
  const pushTo = hasProfile ? `/profileGallery/edit/${item.id}` : `/profileGallery/create/0/${item.id}`;
  return (
    <div>
      <Button variant="outline" size="sm" className="h-9 w-10" onClick={() => router.push(pushTo)}>
        Link
      </Button>
    </div>
  );
};

export const columnsProfile: Array<ColumnDef<IProfile>> = [
  {
    accessorKey: "image",
    header: "ຮູບ ໃຫມ່​",
    cell: ({ row }) => <ImageViewer src={row.original?.image} className="my-1 h-14 w-14" />,
  },
  {
    accessorKey: "oldImage",
    header: "ຮູບ ເກົ່າ",
    cell: ({ row }) => <ImageViewer src={row.original?.oldImage} className="my-1 h-14 w-14" />,
  },
  {
    accessorKey: "profileGallery",
    header: "ຮູບ",cell: ({ row }) => {
      const profileGallery = row.original?.profileGallery as IGallery[] || [];
      return (
        <div className="flex gap-2">
          {profileGallery.map((item) => (
            <ImageViewer key={item?.id} src={item?.image} className="my-1 h-14 w-14" />
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "firstName",
    header: "ຊື່ ແລະ ນາມສະກຸນ",
    cell: ({ row }) => <FullNameCell row={row} />,
  },
  {
    accessorKey: "applicationNumber",
    header: "ເລກທີໃບຄໍາຮ້ອງ",
  },
  {
    accessorKey: "barcode",
    header: "ບາໂຄດ",
  },
  {
    accessorKey: "document_identity",
    header: "ເອກະສານຢັ້ງຢືນ",
    cell: ({ row }) => <DocumentIdentityCell row={row} />,
  },
  {
    accessorKey: "phoneNumber",
    header: "ເບີໂທລະສັບ",
  },
  {
    accessorKey: "dateOfBirth",
    header: "ວັນທີເກີດ",
    cell: ({ row }) => {
      const date = row.original?.dateOfBirth || "";
      return <span>{date}</span>;
    },
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
    header: "ຜູກຮູບໂປຣຟາຍ",
    cell: ({ row }) => <ProfileLinkCell item={row.original} />,
  },
  {
    accessorKey: "id",
    header: "ຂື້ນບັນຊີດໍາ",
    cell: ({ row }) => (
      <div>
        <BlacklistDialog profile={row.original} />
      </div>
    ),
  },
  {
    accessorKey: "id",
    header: "",
    cell: ({ row: { original: row } }) => {
      const rowId = row.id;
      return <DataTableRowActions rowId={rowId} resource="profile" />;
    },
  },
];