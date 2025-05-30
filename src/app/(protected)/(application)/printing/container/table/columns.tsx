"use client";

import { Badge } from "@/components/ui/badge";
import { type ColumnDef } from "@tanstack/react-table";
import { PrintDialog } from "./PrintDialog";
import { ImageViewer } from "@/components/containers/image-viewer";
import { IApplication, IApplicationColumns } from "../../../application/type";
import { getIdentityLabel } from "src/app/(protected)/profile/lib";
import { DataTableRowActions } from "@/components/containers/table/data-table-row-actions";

const FullNameCell = ({ row }: IApplicationColumns) => (
  <div className="font-medium">
    {`${row.original?.profile?.firstName} ${row.original?.profile?.lastName}`}
  </div>
);

const DocumentIdentityCell = ({ row }: IApplicationColumns) => {
  const identityType = getIdentityLabel(row?.original?.profile.identityType ?? "");
  const number = row.original?.profile.identityNumber;
  return (
    <div className="">
      <p className="font-semibold text-sm text-muted-foreground">{identityType}</p>
      <p className="font-semibold">{number}</p>
    </div>
  );
};

const GenderCell = ({ row }: IApplicationColumns) => {
  const gender = row.original?.profile.gender ?? "";
  return (
    <Badge
      variant={gender === "ຊາຍ" ? "outline" : "secondary"}
      className={`${gender === "ຊາຍ" ? "border-blue-500 text-blue-700" : "bg-pink-100 text-pink-700"}`}
    >
      {gender}
    </Badge>
  );
};

const NationalityCell = ({ row }: IApplicationColumns) => {
  const nationality = row.original?.profile?.nationality;
  if (!nationality) {
    return null;
  }

  return (
    <div className="flex flex-col">
      <span className="font-medium">{nationality.name}</span>
      <span className="text-xs text-muted-foreground">{nationality.code}</span>
    </div>
  );
};

const PositionCell = ({ row }: IApplicationColumns) => {
  const position = row.original?.position;
  if (!position) { 
    return null; }

  return (
    <div className="flex flex-col">
      <span className="font-medium">{position.laoName}</span>
      <span className="text-xs text-muted-foreground">{position.englishName}</span>
    </div>
  );
};
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
const IdentityNumber = ({ row }: IApplicationColumns) => {
  const identityType = getIdentityLabel(row.original?.profile?.identityType || "");
  const profile = row.original?.profile?.identityNumber
  if (!profile) { 
    return null; }

  return (
    <div className="flex flex-col">
      <span className="font-medium">{identityType}</span>
      <span className="text-xs text-muted-foreground">{profile}</span>
    </div>
  );
};

const PhoneNumberCell = ({ row }: IApplicationColumns) => {
  const phoneNumber = row.original?.profile?.phoneNumber;
  if (!phoneNumber) {
    return null; }

  return (
    <div className="font-mono">{phoneNumber}</div>
  );
};
export const columnsProfile = ({ refetch }: { refetch: () => void }): Array<ColumnDef<IApplication>> => [
  {
    accessorKey: "no",
    header: "#",
    cell: ({ row }) => <div className="text-center font-medium">{row.original?.no}</div>,
  },
  {
    accessorKey: "image",
    header: "ຮູບພາບ",
    cell: ({ row }) => (
      <div className="">
        <ImageViewer
          src={row.original?.profile?.image ?? ""}
          className="h-12 w-12 rounded-full object-cover border border-muted"
        />
      </div>
    ),
  },
  {
    accessorKey: "firstName",
    header: "ຊື່ ແລະ ນາມສະກຸນ",
    cell: ({ row }) => <FullNameCell row={row} />,
  },
  {
    accessorKey: "identityNumber",
    header: "ເອກະສານຢັ້ງຢືນ",
    cell: ({ row }) => <DocumentIdentityCell row={row} />,
  },
  {
    accessorKey: "gender",
    header: "ເພດ",
    cell: ({ row }) => <GenderCell row={row} />,
  },
  {
    accessorKey: "nationality",
    header: "ສັນຊາດ ແລະ ເຊື້ອຊາດ",
    cell: ({ row }) => <NationalityCell row={row} />,
  },
  {
    accessorKey: "identityNumber",
    header: "ເລກທີເອກະສານ",
    cell: ({ row }) => <IdentityNumber row={row} />,
  },
  {
    accessorKey: "companyId",
    header: "ຫົວໜ່ວຍທຸລະກິດ ຫຼື ບ້ານ",
    cell: ({ row }) => <CompanyCell row={row} />,
  },
  {
    accessorKey: "position",
    header: "ຕໍາແໜ່ງ",
    cell: ({ row }) => <PositionCell row={row} />,
  },
  {
    accessorKey: "profile.phoneNumber",
    header: "ເບີໂທລະສັບ",
    cell: ({ row }) => <PhoneNumberCell row={row} />,
  },
  {
    accessorKey: "id",
    header: "ຈັດການ",
    cell: ({ row: { original } }) => {
      const frozenOriginal = Object.freeze(original);
      return <PrintDialog title="ພິມບັດ" application={frozenOriginal} refetch={refetch} />;
    },
  },
  {
    accessorKey: "id",
    header: "",
    cell: ({ row: { original: row } }) => {
      const rowId = row.id;
      return <DataTableRowActions rowId={rowId} resource="application" />;
    },
  },
];