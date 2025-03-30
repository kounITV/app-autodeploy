"use client";

import { TitleLabel } from "@/components/containers/headerLabel";
import { DataTable } from "@/components/containers/table/data-table";
import { DataTableToolbar } from "../../blacklist/filter";
import { columnsProfile } from "./container/table/columns";
import useApplicationTable from "./useTable";
import { getOfficeIds } from "@/lib/getSession";

export default function ProductionPage() {
  const officeListIds = getOfficeIds()
  const { result, meta, updatePagination, updateSearch, filter, refetch } = useApplicationTable({ officeIds: officeListIds });
  const updatedColumns = columnsProfile({ refetch });
  return (
    <div className="pl-4 space-y-2">
      <div className="flex justify-between items-center">
        <TitleLabel title='ຄຸ້ມຄອງພິມບັດ' subtitle='ນີ້ແມ່ນລາຍການຂໍ້ມູນພິມບັດ 10-50 ລາຍການຫຼ້າສຸດ' />
      </div>
      <div className="space-y-4">
        <DataTableToolbar updateSearch={updateSearch} filter={filter} />
        <DataTable columns={updatedColumns} data={result} meta={meta} updatePagination={updatePagination} />
      </div>
    </div>
  );
}
