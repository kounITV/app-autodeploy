"use client";
import { DataTable } from "@/components/containers/table/data-table";

import { columnsBlacklistProfile } from "./columns";
import { DataTableToolbar } from "./filter";
import useBlacklistTable from "./hook";

export function BlacklistTable() {
  const { result, meta, updatePagination, updateSearch, filter } = useBlacklistTable({});
  return (
    <div className='space-y-4'>
      <DataTableToolbar updateSearch={updateSearch} filter={filter} />
      <DataTable columns={columnsBlacklistProfile} data={result} meta={meta} updatePagination={updatePagination} />
    </div>
  );
}
