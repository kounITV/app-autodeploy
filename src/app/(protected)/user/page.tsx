"use client";

import { CreateButton } from "@/components/containers/create-button";
import { TitleLabel } from "@/components/containers/headerLabel";
import { DataTable } from "@/components/containers/table/data-table";
import { RoleBasedGuard } from "@/lib/ability";
import { DataTableToolbar } from "../blacklist/filter";
import { columnsUser } from "./container/table/columns";
import useUserTable from "./hooks/useTable";

export default function UserPage() {
  const { result, meta, updatePagination, updateSearch, filter } = useUserTable();
  return (
    <RoleBasedGuard subject="user" action="read" fallback={<div>You don&apos;t have permission to view this page</div>}>
      <div className="pl-4 space-y-2">
        <div className="flex justify-between items-center">
          <TitleLabel title='ຄຸ້ມຄອງຜູ້ໃຊ້ງານລະບົບ' subtitle='ນີ້ແມ່ນລາຍການຂໍ້ມູນບັນຊີຜູ້ໃຊ້ງານລະບົບ!' />
          <CreateButton resouce="user" title='ສ້າງບັນຊີຜູ້ໃຊ້ງານ' />
        </div>
        <div className="space-y-4">
          <DataTableToolbar updateSearch={updateSearch} filter={filter} />
          <DataTable columns={columnsUser} data={result} meta={meta} updatePagination={updatePagination} />
        </div>
      </div>
    </RoleBasedGuard>
  );
}
