"use client";

import { TitleLabel } from "@/components/containers/headerLabel";
import { DataTable } from "@/components/containers/table/data-table";
import { columnsProfile } from "./container/table/columns";
import { DataTableToolbar } from "../../blacklist/filter";
import useProfileTable from "../../profile/hook/useTable";

export default function UserPage() {
  const { result, meta, updatePagination, updateSearch, filter } = useProfileTable({ excludeApplications: true });
  return (
    <div className="pl-4 space-y-2">
      <div className="flex justify-between items-center">
        <TitleLabel title='ຄຸ້ມຄອງອອກບັດໃຫມ່' subtitle='ນີ້ແມ່ນລາຍການຂໍ້ມູນບຸກຄົນຜູ້ທີ່ບໍ່ທັນອອກບັດ 10-50 ລາຍການຫຼ້າສຸດ!' />
      </div>
      <div className="space-y-4">
        <DataTableToolbar updateSearch={updateSearch} filter={filter} />
        <DataTable columns={columnsProfile} data={result} meta={meta} updatePagination={updatePagination} />
      </div>
    </div>
  );
}
