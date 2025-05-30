"use client"

import { TitleLabel } from "@/components/containers/headerLabel"
import { getOfficeId } from "@/lib/getSession"
import useApplicationList from "../application/hook/useTable"
import { RoleBasedGuard } from "@/lib/ability/roleBasedGuard"
// import { Input } from "@/components/ui"
import { DataTable } from "@/components/containers/table/data-table"
import { columnsPrinted } from "./container/column"
import { DataTableToolbar } from "./container/filter"
import { useEffect } from "react"

export default function FolderShow() {
  const officeId = getOfficeId()
  const { result, meta, updatePagination, updateSearch, filter, loading } = useApplicationList({ printCountMin: 1, officeId })
  const perPage = meta?.limit || 10;
  const no = (meta?.currentPage - 1) * perPage + 1;
  const resultWithNo = result.map((item, index) => ({
    ...item,
    no: no + index,
  }));
  useEffect(() => {
    updateSearch("");
    filter.setDateFilter(undefined);
    filter.setYearFilter("")
    filter.setStatusFilter("FINISHED")
  }, []);
  return (
    <RoleBasedGuard subject="printed" action="read" fallback={<div>You don&apos;t have permission to view this page</div>}>
      <div className="pl-4 space-y-2">
        <div className="flex justify-between items-center">
          <TitleLabel title='ລາຍການຜູ້ທີພິມບັດແລ້ວ' subtitle='ນີ້ແມ່ນລາຍການຂໍ້ມູນບຸກຄົນຜູ້ທີ່ພິມບັດແລ້ວລ່າສຸດ' />
        </div>
        <div className="space-y-4">
          <DataTableToolbar updateSearch={updateSearch} filter={filter} />
          <DataTable columns={columnsPrinted} data={resultWithNo} meta={meta} updatePagination={updatePagination} loading={loading} />
        </div>
      </div>
    </RoleBasedGuard>
  )
}

